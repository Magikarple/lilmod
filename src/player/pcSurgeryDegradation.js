/**
 * @typedef {"skinTone"|"restoreFace"|"ageDown"|"ageUp"|"breastReductionImplant"|"breastShrinkage"|"breastEnlargementImplant"|"breastEnlargement"|"flatChest"|"breasts"|"buttReductionImplant"|"buttShrinkage"|"buttEnlargementImplant"|"buttEnlargement"|"ballEnlargement"|"ballShrinkage"|"ballEnlargementHorm"|"ballShrinkageHorm"|"ballBigShrinkage"|"tightPussy"|"reVirgin"|"herm2female"|"herm2male"|"herm2truefemale"|"herm2truemale"|"male2female"|"male2herm"|"male2truefemale"|"male2hermfemale"|"female2male"|"female2herm"|"female2truemale"|"female2hermmale"|"tummyTuck"|"ovulationRestart"} surgeryType
 */

/**
 * @param {surgeryType} surgeryType the type of surgery to describe
 * @returns {DocumentFragment} a DocumentFragment that shows the result of the player's surgery
 */
App.UI.PCSurgeryDegradation = function(surgeryType) {
	const frag = new DocumentFragment();
	let r = [];

	const {
		HeU, HisU,
		heU, hisU, himU, himselfU
	} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");

	switch (surgeryType) {
		case "skinTone":
			r.push(`After a few hours, you awaken in the recovery wing to find every`);
			if (V.showInches === 2) {
				r.push(`inch`);
			} else {
				r.push(`centimeter`);
			}
			r.push(`of your body burning; though from what you did manage to see, you are, in fact, ${V.PC.skin} now.`);
			if (!["pure white", "ivory", "white", "extremely pale", "very pale", "pale", "extremely fair", "very fair", "fair", "light", "light olive", "tan", "olive", "bronze", "dark olive", "dark", "light beige", "beige", "dark beige", "light brown", "brown", "dark brown", "black", "ebony", "pure black"].includes(V.PC.skin)) {
				r.push(`The surgeon's assistant immediately covers ${hisU} mouth to hide ${hisU} giggle at the sight of you.`);
			} else {
				r.push(`The surgeon's assistant carefully seats ${himselfU} besides you with a large drum of cream.`);
			}
			r.push(`"This stuff is specially formulated to soothe burns like this and should have you feeling much better after a few applications.${(V.PC.dick !== 0) ? ` Now please, try not to get hard while I apply this. It will hurt like hell.` : ``}" ${HeU} spends the next half hour gingerly applying the cream across every`);
			if (V.showInches === 2) {
				r.push(`inch`);
			} else {
				r.push(`centimeter`);
			}
			r.push(`of your body. ${HisU} touch is so soft, it is hard to not get aroused, and as your body tenses, a wave of pain washes over you. "Calm down, and take a few applications first. Though I forgot to tell you, your erogenous zones were especially affected and will need plenty of extra attention." ${HeU} winks at you. You doubt the validity of that claim but understand exactly what ${heU} means by it. The next few days will be very enjoyable, but for now, you opt to stay perfectly still and will the cream to work faster.`);
			break;
		case "restoreFace":
			r.push(`After a few hours, you awaken in the recovery wing with a face both sore and somewhat numb.`);
			if (V.PC.belly >= 10000 || V.PC.boobs >= 1400) {
				r.push(`Struggling to sit`);
			} else {
				r.push(`Sitting`);
			}
			r.push(`up, you catch sight of yourself in the mirror-covered wall across from your bed. Your face is back to the way it was before you had it altered (not counting any additional years added to it) and looking just as good as you remember. You attempt to smile at yourself, only to find your face doesn't want to comply; guess the drugs haven't completely worn off yet. You lie back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			break;
		case "ageDown":
			r.push(`After a few hours, you awaken in the recovery wing with a face both sore and somewhat numb. Sitting up, you catch sight of yourself in the mirror-covered wall across from your bed. An oddly familiar face is staring back at you; it takes you a moment to register in your groggy state that it isn't your past self but rather the result of the age reduction surgery. You attempt to smile at yourself, only to find your face doesn't want to comply; guess the drugs haven't completely worn off yet. You lie back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			applyAgeImplant(V.PC);
			break;
		case "ageUp":
			r.push(`After a few hours, you awaken in the recovery wing with a face both sore and somewhat numb. Sitting up, you catch sight of yourself in the mirror-covered wall across from your bed. An oddly familiar face is staring back at you; it takes you a moment to register in your groggy state that you are in fact looking at the result of the age increasing surgery. You attempt to smile at yourself, only to find your face doesn't want to comply; guess the drugs haven't completely worn off yet. You lie back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			applyAgeImplantOlder(V.PC);
			break;
		case "breastReductionImplant":
			r.push(`After a few hours, you awaken in the recovery wing with a sore chest.`);
			if (V.PC.belly >= 10000) {
				r.push(`Struggling to sit`);
			} else {
				r.push(`Sitting`);
			}
			r.push(`up, you immediately notice how much lighter your breasts are. Pulling the covers off yourself, you observe your implant free boobs in the mirror-covered wall across from your bed. "So do you like them?", asks the surgeon's assistant, seating ${himselfU} behind you and wrapping ${hisU} hands around to your natural breasts. "We made sure to tighten them up a bit, get rid of that sag from not having the silicone pouch in them anymore." ${HeU} begins groping your breasts, feeling for any oddities. "I know you're still a little sore, but bear with it." ${HeU} moves on to your nipples and begins teasing them.`);
			if (V.PC.lactation > 0) {
				r.push(`${HeU} lets out a surprised squeak when a gush of milk escapes your breasts and a moan escapes your lips.`);
				if (V.PC.pregKnown === 1) {
					r.push(`"Should have expected that with the pregnancy and all.`);
				} else {
					r.push(`"You did recently have a child didn't you? Or have you just been enjoying your nipples too much?`);
				}
				r.push(`Either way, this is a good thing. Your breasts work."`);
			}
			r.push(`You can't help but moan under your building arousal as ${heU} massages and teases your breasts. "Enjoying yourself are we? Let me finish you off." ${HeU} sneaks a hand down to your`);
			if (V.PC.dick !== 0) {
				r.push(`stiff prick and begins stroking its length, quickly bringing you to orgasm and relieving you of your built up tension.`);
			} else {
				r.push(`stiff clit and begins teasing it as well, quickly bringing you to orgasm and relieving you of your built up tension.`);
			}
			r.push(`${HeU} states, while licking ${hisU} fingers, "I always did enjoy the way you taste. Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around." Satisfied, you lie back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			break;
		case "breastShrinkage":
			r.push(`After a few hours, you awaken in the recovery wing with a sore chest.`);
			if (V.PC.belly >= 10000) {
				r.push(`Struggling to sit`);
			} else {
				r.push(`Sitting`);
			}
			r.push(`up, you immediately notice how much lighter your breasts are. Pulling the covers off yourself, you observe your`);
			if (V.PC.boobs >= 1400) {
				r.push(`smaller, but still ridiculously huge,`);
			} else if (V.PC.boobs >= 1200) {
				r.push(`smaller G-cup`);
			} else if (V.PC.boobs >= 1000) {
				r.push(`smaller F-cup`);
			} else if (V.PC.boobs >= 800) {
				r.push(`smaller DD-cup`);
			} else if (V.PC.boobs >= 650) {
				r.push(`smaller D-cup`);
			} else if (V.PC.boobs >= 500) {
				r.push(`smaller C-cup`);
			} else if (V.PC.boobs >= 400) {
				r.push(`smaller B-cup`);
			} else {
				r.push(`downright tiny`);
			}
			r.push(`boobs in the mirror-covered wall across from your bed. "So do you like them?", asks the surgeon's assistant, seating ${himselfU} behind you and wrapping ${hisU} hands around to your shrunken breasts. "We made sure to tighten them up a bit, get rid of that sagginess from weight and the mass removed." ${HeU} begins groping your breasts, feeling for any oddities. "I know you're still a little sore, but bear with it." ${HeU} moves on to your nipples and begins teasing them.`);
			if (V.PC.lactation > 0) {
				r.push(`${HeU} lets out a surprised squeak when a gush of milk escapes your breasts and a moan escapes your lips. "`);
				if (V.PC.pregKnown === 1) {
					r.push(`Should have expected that with the pregnancy and all.`);
				} else {
					r.push(`You did recently have a child didn't you? Or have you just been enjoying your nipples too much?`);
				}
				r.push(`Either way, this is a good thing. Your breasts work."`);
			}
			r.push(`You can't help but moan under your building arousal as ${heU} massages and teases your breasts. "Enjoying yourself are we? Let me finish you off." ${HeU} sneaks a hand down to your`);
			if (V.PC.dick !== 0) {
				r.push(`stiff prick and begins stroking its length, quickly bringing you to orgasm and relieving you of your built up tension.`);
			} else {
				r.push(`stiff clit and begins teasing it as well, quickly bringing you to orgasm and relieving you of your built up tension.`);
			}
			r.push(`${HeU} states, while licking ${hisU} fingers, "I always did enjoy the way you taste. Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around." Satisfied, you lie back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			break;
		case "breastEnlargementImplant":
			r.push(`After a few hours, you awaken in the recovery wing with a sore chest.`);
			if (V.PC.belly >= 10000 || V.PC.boobs >= 1400) {
				r.push(`Struggling to sit`);
			} else {
				r.push(`Sitting`);
			}
			r.push(`up, you immediately notice how much heavier your breasts are. Pulling the covers off yourself, you observe your new, round`);
			if (V.PC.boobs >= 1400) {
				r.push(`H-cup`);
			} else if (V.PC.boobs >= 1200) {
				r.push(`G-cup`);
			} else if (V.PC.boobs >= 1000) {
				r.push(`F-cup`);
			}
			r.push(`boobs in the mirror-covered wall across from your bed. "So do you like them?", asks the surgeon's assistant, seating ${himselfU} behind you and wrapping ${hisU} hands around to your heaving breasts. "We did everything we could to keep them looking natural,`);
			if (V.PC.boobsImplant/V.PC.boobs >= .70) {
				r.push(`but the implants were way too big for that."`);
			} else if (V.PC.boobsImplant/V.PC.boobs >= .50) {
				r.push(`but you can definitely tell."`);
			} else {
				r.push(`and I say we did a pretty good job."`);
			}
			r.push(`${HeU} begins groping your breasts, feeling the implant within for any oddities. "I know you're still a little sore, but bear with it." ${HeU} moves on to your nipples and begins teasing them.`);
			if (V.PC.lactation > 0) {
				r.push(`${HeU} lets out a surprised squeak when a gush of milk escapes your breasts and a moan escapes your lips. "`);
				if (V.PC.pregKnown === 1) {
					r.push(`Should have expected that with the pregnancy and all.`);
				} else {
					r.push(`You did recently have a child didn't you? Or have you just been enjoying your nipples too much?`);
				}
				r.push(`Either way, this is a good thing. Your breasts work."`);
			}
			r.push(`You can't help but moan under your building arousal as ${heU} massages and teases your implant-laden breasts. "Enjoying yourself are we? Let me finish you off." ${HeU} sneaks a hand down to your`);
			if (V.PC.dick !== 0) {
				r.push(`stiff prick and begins stroking its length, quickly bringing you to orgasm and relieving you of your built up tension.`);
			} else {
				r.push(`stiff clit and begins teasing it as well, quickly bringing you to orgasm and relieving you of your built up tension.`);
			}
			r.push(`${HeU} states, while licking ${hisU} fingers, "I always did enjoy the way you taste. Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around." Satisfied, you lie back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			break;
		case "breastEnlargement":
			r.push(`After a few hours, you awaken in the recovery wing with a sore chest.`);
			if (V.PC.belly >= 10000 || V.PC.boobs >= 1400) {
				r.push(`Struggling to sit`);
			} else {
				r.push(`Sitting`);
			}
			r.push(`up, you immediately notice how much heavier your breasts are. Pulling the covers off yourself, you observe your new, soft`);
			if (V.PC.boobs >= 1400) {
				r.push(`H-cup`);
			} else if (V.PC.boobs >= 1200) {
				r.push(`G-cup`);
			} else if (V.PC.boobs >= 1000) {
				r.push(`F-cup`);
			} else if (V.PC.boobs >= 800) {
				r.push(`DD-cup`);
			} else if (V.PC.boobs >= 650) {
				r.push(`D-cup`);
			} else if (V.PC.boobs >= 500) {
				r.push(`C-cup`);
			} else if (V.PC.boobs >= 400) {
				r.push(`B-cup`);
			} else {
				r.push(`A-cup`);
			}
			r.push(`boobs in the mirror-covered wall across from your bed. "So, do you like them?", asks the surgeon's assistant, seating ${himselfU} behind you and wrapping ${hisU} hands around to your heaving breasts. "We did everything we could to keep them perky,`);
			if (V.PC.boobs >= 1400) {
				r.push(`quite a feat given their size."`);
			} else {
				r.push(`not that hard given your natural perk."`);
			}
			r.push(`${HeU} begins groping your breasts, feeling the added mass for any oddities. "I know you're still a little sore, but bear with it." ${HeU} moves on to your nipples and begins teasing them.`);
			if (V.PC.lactation > 0) {
				r.push(`${HeU} lets out a surprised squeak when a gush of milk escapes your breasts and a moan escapes your lips. "`);
				if (V.PC.pregKnown === 1) {
					r.push(`Should have expected that with the pregnancy and all.`);
				} else {
					r.push(`You did recently have a child didn't you? Or have you just been enjoying your nipples too much?`);
				}
				r.push(`Either way, this is a good thing. Your breasts work."`);
			}
			r.push(`You can't help but moan under your building arousal as ${heU} massages and teases your fat tits. "Enjoying yourself are we? Let me finish you off." ${HeU} sneaks a hand down to your`);
			if (V.PC.dick !== 0) {
				r.push(`stiff prick and begins stroking its length, quickly bringing you to orgasm and relieving you of your built up tension.`);
			} else {
				r.push(`stiff clit and begins teasing it as well, quickly bringing you to orgasm and relieving you of your built up tension.`);
			}
			r.push(`${HeU} states, while licking ${hisU} fingers, "I always did enjoy the way you taste. Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around." Satisfied, you lie back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			break;
		case "flatChest":
			r.push(`After a few hours, you awaken in the recovery wing with a sore chest.`);
			if (V.PC.belly >= 10000) {
				r.push(`Struggling to sit`);
			} else {
				r.push(`Sitting`);
			}
			r.push(`up, you immediately notice the absence of the usual weight on your chest. Pulling the covers off yourself, you observe your flat chest in the mirror-covered wall across from your bed. "So do you like it?", asks the surgeon's assistant, seating ${himselfU} behind you and wrapping ${hisU} hands around to your chest. "I honestly couldn't live without my pair." ${HeU} begins groping your chest, feeling for any oddities. "I know you're still a little sore, but bear with it." ${HeU} moves on to your nipples and begins teasing them.`);
			if (V.PC.lactation > 0) {
				r.push(`${HeU} lets out a surprised squeak when a gush of milk escapes your tits and a moan escapes your lips. "`);
				if (V.PC.pregKnown === 1) {
					r.push(`Should have expected that with the pregnancy and all.`);
				} else {
					r.push(`You did recently have a child didn't you? Or have you just been enjoying your nipples too much?`);
				}
				r.push(`Either way, this is a good thing. Your breasts still work, but it's still strange coming from such a flat chest."`);
			}
			r.push(`You can't help but moan under your building arousal as ${heU} massages and teases your nipples. "Enjoying yourself are we? Let me finish you off." ${HeU} sneaks a hand down to your`);
			if (V.PC.dick !== 0) {
				r.push(`stiff prick and begins stroking its length, quickly bringing you to orgasm and relieving you of your built up tension.`);
			} else {
				r.push(`stiff clit and begins teasing it as well, quickly bringing you to orgasm and relieving you of your built up tension.`);
			}
			r.push(`${HeU} states, while licking ${hisU} fingers, "I always did enjoy the way you taste. Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around." Satisfied, you lie back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			break;
		case "breasts":
			r.push(`After a few hours, you awaken in the recovery wing with a sore chest.`);
			if (V.PC.belly >= 10000 || V.PC.boobs >= 1400) {
				r.push(`Struggling to sit`);
			} else {
				r.push(`Sitting`);
			}
			r.push(`up, you immediately notice a new weight on your chest. Pulling the covers off yourself, you observe your new, soft C-cup boobs in the mirror-covered wall across from your bed. "So do you like them?", asks the surgeon's assistant, seating ${himselfU} behind you and wrapping ${hisU} hands around to your heaving breasts. "With these, you should be able to compete with any girls around you." ${HeU} begins groping your breasts, feeling the added mass for any oddities. "I know you're still a little sore, but bear with it." ${HeU} moves on to your nipples and begins teasing them.`);
			if (V.PC.lactation > 0) {
				r.push(`${HeU} lets out a surprised squeak when a gush of milk escapes your breasts and a moan escapes your lips. "`);
				if (V.PC.pregKnown === 1) {
					r.push(`Should have expected that with the pregnancy and all.`);
				} else {
					r.push(`You did recently have a child didn't you? Or have you just been enjoying your nipples too much?`);
				}
				r.push(`Either way, this is a good thing. Your breasts work."`);
			}
			r.push(`You can't help but moan under your building arousal as ${heU} massages and teases your new tits. "Enjoying yourself are we? Let me finish you off." ${HeU} sneaks a hand down to your`);
			if (V.PC.dick !== 0) {
				r.push(`stiff prick and begins stroking its length, quickly bringing you to orgasm and relieving you of your built up tension.`);
			} else {
				r.push(`stiff clit and begins teasing it as well, quickly bringing you to orgasm and relieving you of your built up tension.`);
			}
			r.push(`${HeU} states, while licking ${hisU} fingers, "I always did enjoy the way you taste. Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around." Satisfied, you lie back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			break;
		case "buttReductionImplant":
			r.push(`After a few hours, you awaken in the recovery wing, face-down in a bed made to accommodate a person with your body type, with a sore ass. You push yourself up and look at the mass under the cover behind you that is your rear, taking note of how much smaller it is now than when you arrived. "So do you like it?", asks the surgeon's assistant, seating ${himselfU} beside you and bringing ${hisU} hands to your butt. "Size isn't everything in an ass, shape is important too." ${HeU} begins groping your bottom, feeling around for any oddities. "I know you're still a little sore, but bear with it. There, everything feels good, now rest up and you'll be set! Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around." Groggy, you lie back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			break;
		case "buttShrinkage":
			r.push(`After a few hours, you awaken in the recovery wing, face-down in a bed made to accommodate a person with your body type, with a sore ass. You push yourself up and look at the mass under the cover behind you that is your rear, taking note of how much smaller it is now than when you arrived. "So do you like it?", asks the surgeon's assistant, seating ${himselfU} beside you and bringing ${hisU} hands to your butt. "Size isn't everything in an ass, shape is important too, though I think you've got a good balance. We didn't need to do much reshaping." ${HeU} begins groping your bottom, feeling around for any oddities. "I know you're still a little sore, but bear with it. There, everything feels good, now rest up and you'll be set! Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around." Groggy, you lie back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			break;
		case "buttEnlargementImplant":
			r.push(`After a few hours, you awaken in the recovery wing, face-down in a bed made to accommodate a person with your body type, with a sore ass. You push yourself up and look at the mass under the cover behind you that is your rear, taking note of how much bigger it is now than when you arrived. "So do you like it?", asks the surgeon's assistant, seating ${himselfU} beside you and bringing ${hisU} hands to your`);
			if (V.PC.butt >= 5) {
				r.push(`enormous`);
			} else if (V.PC.butt >= 4) {
				r.push(`huge`);
			} else {
				r.push(`big`);
			}
			r.push(`rounded butt. "Size isn't everything in an ass, shape is important too, though I think you've got a good balance. We didn't need to do much reshaping when we put in the implant." ${HeU} begins groping your bottom, feeling the silicone-filled implant for any oddities. "I know you're still a little sore, but bear with it. There, everything feels good, now rest up and you'll be set! Though you may need some help righting yourself until you get used to its added weight. Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around." Groggy, you lie back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			break;
		case "buttEnlargement":
			r.push(`After a few hours, you awaken in the recovery wing, face-down in a bed made to accommodate a person with your body type, with a sore ass. You push yourself up and look at the mass under the cover behind you that is your rear, taking note of how much bigger it is now than when you arrived. "So do you like it?", asks the surgeon's assistant, seating ${himselfU} beside you and bringing ${hisU} hands to your`);
			if (V.PC.butt >= 5) {
				r.push(`enormous`);
			} else if (V.PC.butt >= 4) {
				r.push(`huge`);
			} else {
				r.push(`big`);
			}
			r.push(`soft butt. "Size isn't everything in an ass, shape is important too, though I think you've got a good balance. We didn't need to do much reshaping when we added the fat." ${HeU} begins groping your bottom, feeling around for any oddities. "So soft... I know you're still a little sore, but bear with it. There, everything feels good, now rest up and you'll be set! Though you may need some help righting yourself until you get used to its added weight. Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around." Groggy, you lie back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			break;
		case "ballEnlargement":
			r.push(`After a few hours, you awaken in the recovery wing with a distinct soreness`);
			if (V.PC.balls >= 14) {
				r.push(`and the sense that something massive is pushing your legs apart.`);
			} else if (V.PC.balls >= 9) {
				r.push(`and tight feeling between your legs.`);
			} else {
				r.push(`between your legs.`);
			}
			r.push(`You pull the covers off of yourself to catch sight of the result of the surgery and`);
			if (V.PC.boobs >= 1400 && V.PC.belly >= 10000) {
				r.push(`find that not only can you barely see around your breasts, but any attempts to do so are immediately thwarted by your big, pregnant belly. You settle for a position peeking over your tits but around your middle to view the mirror-covered wall across from your bed. Your balls are much bigger than you expected them to be after the surgery.`);
			} else if (V.PC.boobs >= 1400) {
				r.push(`find that your enormous breasts make it difficult to get a good look so you settle for the mirror-covered wall across from your bed. Your balls are much bigger than you expected them to be after the surgery.`);
			} else if (V.PC.belly >= 10000) {
				r.push(`find that your big, pregnant belly makes it impossible to get a good look at your crotch so you settle for peeking around it at the mirror-covered wall across from your bed. Your balls are much bigger than you expected them to be after the surgery.`);
			} else {
				r.push(`find your balls are much bigger than you expected them to be.`);
			}
			r.push(`"So, what do you think of them?", asks the surgeon's assistant, seating ${himselfU} beside you and placing a hand upon your`);
			if (V.PC.balls >= 30) {
				r.push(`watermelon-sized`);
			} else if (V.PC.balls >= 14) {
				r.push(`cantaloupe-sized`);
			} else if (V.PC.balls >= 9) {
				r.push(`softball-like`);
			} else {
				r.push(`large`);
			}
			r.push(`testicles. "Nice and heavy, you should feel them with every move you make." ${HeU} begins groping your scrotum, feeling around for any oddities in the gel. "I know you're still a little sore, but bear with it. Enjoying the massage are you?" ${heU} asks, poking at the tip of your erection with ${hisU} free hand. "Why don't we find out if they are working properly?" ${HeU} leans over your dick${(V.PC.belly >= 5000) ? `, ${hisU} face brushing the underside of your pregnancy,` : ``}`);
			if (V.PC.balls >= 10) {
				r.push(`and licks up the rivulet of precum running down its length. "As good as always." Taking your dick to the hilt, ${heU} begins earnestly sucking you off while fondling your overfilled balls. The new sensation quickly overwhelms your control and you release your massive load deep in ${hisU} throat. Like a good assistant, ${heU} gulps down the gushing fluid until ${heU} takes you deep enough for it to pour down ${hisU} throat directly. "Shame just adding gel doesn't mean more cum." Satisfied, you lie back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			} else {
				r.push(`and licks the bead of precum building on its end. "As good as always." Taking your dick to the hilt, ${heU} begins earnestly sucking you off while fondling your overfilled balls. The new sensation quickly overwhelms your control and you release your load deep in ${hisU} throat. Like a good assistant, ${heU} diligently swallows it down, making sure not a drop is missed. "Shame just adding gel doesn't mean more cum." Satisfied, you lie back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			}
			V.PC.scrotum = V.PC.balls-2;
			break;
		case "ballShrinkage":
			r.push(`After a few hours, you awaken in the recovery wing with a distinct soreness`);
			if (V.PC.ballsImplant >= 9) {
				r.push(`and tight feeling between your legs.`);
			} else {
				r.push(`between your legs.`);
			}
			r.push(`You pull the covers off of yourself to catch sight of the result of the surgery and`);
			if (V.PC.boobs >= 1400 && V.PC.belly >= 10000) {
				r.push(`find that not only can you barely see around your breasts, but any attempts to do so are immediately thwarted by your big, pregnant belly. You settle for a position peeking over your tits but around your middle to view the mirror-covered wall across from your bed. Your balls are now closer to the typical size one would expect.`);
			} else if (V.PC.boobs >= 1400) {
				r.push(`find that your enormous breasts make it difficult to get a good look so you settle for the mirror-covered wall across from your bed. Your balls are now closer to the typical size one would expect.`);
			} else if (V.PC.belly >= 10000) {
				r.push(`find that your big, pregnant belly makes it impossible to get a good look at your crotch so you settle for peeking around it at the mirror-covered wall across from your bed. Your balls are now closer to the typical size one would expect.`);
			} else {
				r.push(`find your balls are now closer to the typical size one would expect.`);
			}
			r.push(`"So, what do you think of them?", asks the surgeon's assistant, seating ${himselfU} beside you and placing a hand upon your`);
			if (V.PC.balls >= 9) {
				r.push(`softball-like`);
			} else if (V.PC.balls >= 5) {
				r.push(`large`);
			} else {
				r.push(`normal`);
			}
			r.push(`testicles. "Starting to feel lighter?" ${HeU} begins groping your scrotum, feeling around for any oddities. "I know you're still a little sore, but bear with it. Enjoying the massage are you?" ${heU} asks, poking at the tip of your erection with ${hisU} free hand. "Why don't we find out if they are still working properly?" ${HeU} leans over your dick${(V.PC.belly >= 5000) ? `, ${hisU} face brushing the underside of your pregnancy,` : ``} and licks the bead of precum building on its end. "As good as always." Taking your dick to the hilt, ${heU} begins earnestly sucking you off while fondling your loosened balls. The new sensation quickly overwhelms your control and you release your load deep in ${hisU} throat. Like a good assistant, ${heU} diligently swallows it down, making sure not a drop is missed. "Shame just can't just suck the gel out of them. That would be too much fun!" Satisfied, you lie back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			V.PC.scrotum = V.PC.balls+3;
			break;
		case "ballEnlargementHorm":
			r.push(`After a few hours, you awaken in the recovery wing with a distinct soreness`);
			if (V.PC.balls >= 14) {
				r.push(`and the sense that something massive is pushing your legs apart.`);
			} else if (V.PC.balls >= 9) {
				r.push(`and tight feeling between your legs.`);
			} else {
				r.push(`between your legs.`);
			}
			r.push(`You pull the covers off of yourself to catch sight of the result of the surgery and`);
			if (V.PC.boobs >= 1400 && V.PC.belly >= 10000) {
				r.push(`find that not only can you barely see around your breasts, but any attempts to do so are immediately thwarted by your big, pregnant belly. You settle for a position peeking over your tits but around your middle to view the mirror-covered wall across from your bed. Your balls are much bigger than you expected them to be after the surgery.`);
			} else if (V.PC.boobs >= 1400) {
				r.push(`find that your enormous breasts make it difficult to get a good look so you settle for the mirror-covered wall across from your bed. Your balls are much bigger than you expected them to be after the surgery.`);
			} else if (V.PC.belly >= 10000) {
				r.push(`find that your big, pregnant belly makes it impossible to get a good look at your crotch so you settle for peeking around it at the mirror-covered wall across from your bed. Your balls are much bigger than you expected them to be after the surgery.`);
			} else {
				r.push(`find your balls are much bigger than you expected them to be.`);
			}
			r.push(`"So, what do you think of them?", asks the surgeon's assistant, seating ${himselfU} beside you and placing a hand upon your`);
			if (V.PC.balls >= 30) {
				r.push(`watermelon-sized`);
			} else if (V.PC.balls >= 14) {
				r.push(`cantaloupe-sized`);
			} else if (V.PC.balls >= 9) {
				r.push(`softball-like`);
			} else {
				r.push(`large`);
			}
			r.push(`testicles. "Nice and heavy, they'll be making more cum than ever before." ${HeU} begins groping your scrotum, feeling around for any oddities in the testicles. "I know you're still a little sore from all that growth, but please bear with it." After a few minutes of gentle massage ${heU} looks up at you. "Enjoying the massage are you?" ${heU} asks, poking at the tip of your erection with ${hisU} free hand. "Why don't we find out if they are working properly?" ${HeU} leans over your dick${(V.PC.belly >= 5000) ? `, ${hisU} face brushing the underside of your pregnancy,` : ``}`);
			if (V.PC.balls >= 10) {
				r.push(`and licks up the rivulet of precum running down its length. "As good as always." Taking your dick to the hilt, ${heU} begins earnestly sucking you off while fondling your overfilled balls. The new sensation quickly overwhelms your control and you release your massive load deep in ${hisU} throat. Like a good assistant, ${heU} struggles to gulp down the torrent of fluid until ${heU} takes you deep enough for it to pour down ${hisU} throat directly. "Now this is the kind of size enhancement I can get behind, not that gel that does nothing for making juicy cum." Satisfied, you lie back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			} else {
				r.push(`and licks the droplets of precum running down its length. "As good as always." Taking your dick to the hilt, ${heU} begins earnestly sucking you off while fondling your overfilled balls. The new sensation quickly overwhelms your control and you release a surprisingly large load deep in ${hisU} throat. Like a good assistant, ${heU} gulps down the gushing fluid, making sure ${heU} doesn't spill a drop. "Now this is the kind of size enhancement I can get behind, not that gel that does nothing for making juicy cum." Satisfied, you lie back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			}
			V.PC.scrotum = V.PC.balls-2;
			break;
		case "ballShrinkageHorm":
			r.push(`After a few hours, you awaken in the recovery wing with a distinct soreness`);
			if (V.PC.balls >= 14) {
				r.push(`and the sense that something massive is pushing your legs apart.`);
			} else if (V.PC.balls >= 9) {
				r.push(`and tight feeling between your legs.`);
			} else {
				r.push(`between your legs.`);
			}
			r.push(`You pull the covers off of yourself to catch sight of the result of the surgery and`);
			if (V.PC.boobs >= 1400 && V.PC.belly >= 10000) {
				r.push(`find that not only can you barely see around your breasts, but any attempts to do so are immediately thwarted by your big, pregnant belly. You settle for a position peeking over your tits but around your middle to view the mirror-covered wall across from your bed. Your balls are now closer to the typical size one would expect.`);
			} else if (V.PC.boobs >= 1400) {
				r.push(`find that your enormous breasts make it difficult to get a good look so you settle for the mirror-covered wall across from your bed. Your balls are now closer to the typical size one would expect.`);
			} else if (V.PC.belly >= 10000) {
				r.push(`find that your big, pregnant belly makes it impossible to get a good look at your crotch so you settle for peeking around it at the mirror-covered wall across from your bed. Your balls are now closer to the typical size one would expect.`);
			} else {
				r.push(`find your balls are now closer to the typical size one would expect.`);
			}
			r.push(`"So, what do you think of them?", asks the surgeon's assistant, seating ${himselfU} beside you and placing a hand upon your`);
			if (V.PC.balls >= 14) {
				r.push(`cantaloupe-sized`);
			} else if (V.PC.balls >= 9) {
				r.push(`softball-like`);
			} else {
				r.push(`large`);
			}
			r.push(`testicles. "Still nice and heavy, I wonder if they'll start making more cum without that gel in the way?" ${HeU} begins groping your scrotum, feeling around for any oddities in the testicles. "I know you're still a little sore from removing that gel, but please bear with it." After a few minutes of gentle massage ${heU} looks up at you. "Enjoying the massage are you?" ${heU} asks, poking at the tip of your erection with ${hisU} free hand. "Why don't we find out if they are working properly?" ${HeU} leans over your dick${(V.PC.belly >= 5000) ? `, ${hisU} face brushing the underside of your pregnancy,` : ``}`);
			if (V.PC.balls >= 10) {
				r.push(`and licks up the rivulet of precum running down its length. "As good as always." Taking your dick to the hilt, ${heU} begins earnestly sucking you off while fondling your slightly emptier sack. The new sensation quickly overwhelms your control and you release your massive load deep in ${hisU} throat. Like a good assistant, ${heU} struggles to gulp down the torrent of fluid until ${heU} takes you deep enough for it to pour down ${hisU} throat directly. "You know, I think getting rid of that gel did boost your production a little." Satisfied, you lie back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			} else {
				r.push(`and licks the droplets of precum running down its length. "As good as always." Taking your dick to the hilt, ${heU} begins earnestly sucking you off while fondling your slightly emptier sack. The new sensation quickly overwhelms your control and you release a large load deep in ${hisU} throat. Like a good assistant, ${heU} gulps down the gushing fluid, making sure ${heU} doesn't spill a drop. "You know, I think getting rid of that gel did boost your production a little." Satisfied, you lie back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			}
			V.PC.scrotum = V.PC.balls+3;
			break;
		case "ballBigShrinkage":
			r.push(`After a few hours, you awaken in the recovery wing with a distinct soreness and tight feeling between your legs. You pull the covers off of yourself to catch sight of the result of the surgery and`);
			if (V.PC.boobs >= 1400 && V.PC.belly >= 10000) {
				r.push(`find that not only can you barely see around your breasts, but any attempts to do so are immediately thwarted by your big, pregnant belly. You settle for a position peeking over your tits but around your middle to view the mirror-covered wall across from your bed. Your balls are now closer to the typical size one would expect.`);
			} else if (V.PC.boobs >= 1400) {
				r.push(`find that your enormous breasts make it difficult to get a good look so you settle for the mirror-covered wall across from your bed. Your balls are now closer to the typical size one would expect.`);
			} else if (V.PC.belly >= 10000) {
				r.push(`find that your big, pregnant belly makes it impossible to get a good look at your crotch so you settle for peeking around it at the mirror-covered wall across from your bed. Your balls are now closer to the typical size one would expect.`);
			} else {
				r.push(`find your balls have had a dramatic size adjustment.`);
			}
			r.push(`"So, what do you think of them?", asks the surgeon's assistant, seating ${himselfU} beside you and placing a hand upon your`);
			if (V.PC.balls >= 9) {
				r.push(`softball-like`);
			} else {
				r.push(`large`);
			}
			r.push(`testicles. "Starting to feel lighter?" ${HeU} begins groping your scrotum, feeling around for any oddities. "I know you're still a little sore after removing so much gel on top of the testicle growth." After a few minutes of gentle massage ${heU} looks up at you. "Enjoying the massage are you?" ${heU} asks, poking at the tip of your erection with ${hisU} free hand. "Why don't we find out if those hormones are working properly?" ${HeU} leans over your dick${(V.PC.belly >= 5000) ? `, ${hisU} face brushing the underside of your pregnancy,` : ``} and licks up the droplets of precum running down its length. "As good as always." Taking your dick to the hilt, ${heU} begins earnestly sucking you off while fondling your loosened balls. The new sensation quickly overwhelms your control and you release a surprisingly large load deep in ${hisU} throat. Like a good assistant, ${heU} gulps down the gushing fluid, making sure ${heU} doesn't spill a drop. "Their new size might not be what you were hoping for, but they're sure producing a lot of yummy cum now!" Satisfied, you lie back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			V.PC.scrotum = V.PC.balls+10;
			break;
		case "tightPussy":
			r.push(`After a few hours, you awaken in the recovery wing with a distinct soreness between your legs. You pull the covers off of yourself to catch sight of the result of the surgery and`);
			if (V.PC.boobs >= 1400 && V.PC.belly >= 10000) {
				r.push(`find that not only can you barely see around your breasts, but any attempts to do so are immediately thwarted by your big, pregnant belly. You settle for a position peeking over your tits but around your middle to view the mirror-covered wall across from your bed. Your pussy isn't gaping, so that's a good sign. You can't tell much more until you get a good feel of it.`);
			} else if (V.PC.boobs >= 1400) {
				r.push(`find that your enormous breasts make it difficult to get a good look so you settle for the mirror-covered wall across from your bed. Your pussy isn't gaping, so that's a good sign. You can't tell much more until you get a good feel of it.`);
			} else if (V.PC.belly >= 10000) {
				r.push(`find that your big, pregnant belly makes it impossible to get a good look at your crotch so you settle for peeking around it at the mirror-covered wall across from your bed. Your pussy isn't gaping, so that's a good sign. You can't tell much more until you get a good feel of it.`);
			} else {
				r.push(`find your pussy is much tighter than it was.${V.PC.vagina > 0 ? " No hymen though, so you can't pass as a virgin." : ""}`);
			}
			if (V.PC.vagina === 0) {
				r.push(` You carefully put a finger into your pussy and notice a barrier before you manage to insert the second knuckle. You try to push a little further and you feel a pressure inside you. Indeed, you are a virgin again and you have a tight vagina, like new.`);
			}
			r.push(`"So, do you like it? Does it feel any tighter?", asks the surgeon's assistant, seating ${himselfU} beside you and tracing your labia with a finger. "Feel anything? Or do we need to take this a little further?" ${HeU} begins ${V.PC.vagina > 0 ?"fingering your new pussy" : "playing with the tip of the finger in your vulvar vestibule"}, feeling around for any oddities and teasing you at the same time. "I know you're still a little sore, but bear with it. Plus, I know it must feel good.`);
			if (V.PC.dick !== 0) {
				r.push(`See? He agrees with me," ${heU} says, poking at the tip of your erection with ${hisU} free hand. "Shall we see if it's working right?" ${HeU} circles around till ${heU} is between your legs and`);
				if (V.PC.belly >= 10000) {
					r.push(`disappears behind the curvature of your pregnancy.`);
				} else {
					r.push(`disappears between your thighs.`);
				}
				r.push(`You feel`);
				if (V.PC.balls >= 9) {
					r.push(`${himU} lift your engorged sack and leave it resting atop ${hisU} head`);
				} else {
					r.push(`${hisU} head brush against your sack`);
				}
				r.push(`as ${heU} brings ${hisU} mouth to your cunt and begins to enthusiastically eat you out.`);
				if (V.PC.vagina === 0) {
					r.push(`${HisU} long tongue enters your vagina and you feel ${heU} rhythmically pressing into your new hymen with just enough pressure for you to feel it.`);
				}
				r.push(`${HeU} is quite good at ${hisU} job and quickly brings you to climax; your neglected dick spraying cum across your belly. ${HeU} rises from your crotch to lick up your wayward cum. "I always did like the taste of you. Feel free to rest as long as you need before departing.`);
				if (V.PC.degeneracy > 0) {
					r.push(`Ah, I forgot, while you were sedated ${V.doctor.state > 0 ? "your" : "a renowned "} doctor came, did an examination, issued a virginity certificate and made a public declaration that you are a virgin.`);
					V.PC.degeneracy = Math.max(V.PC.degeneracy, 0);
					if (V.PC.degeneracy > 0) {
						V.PC.degeneracy = Math.floor(V.PC.degeneracy / 2);
						if (V.PC.degeneracy >= 100) {
							V.PC.degeneracy = Math.min(50 + Math.floor(V.PC.degeneracy / 3), 99);
						}
					}
				}
				r.push(`If you need, or want, me, I'll be around." Satisfied, you settle back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			} else {
				r.push(`See? Your cute little clit agrees with me," ${heU} says, poking at the tip of your peeking clit with ${hisU} free hand. "Shall we see if it's working right?" ${HeU} circles around till ${heU} is between your legs and`);
				if (V.PC.belly >= 10000) {
					r.push(`disappears behind the curvature of your pregnancy.`);
				} else {
					r.push(`disappears between your thighs.`);
				}
				r.push(`You feel ${hisU} face brush your inner legs as ${heU} brings ${hisU} mouth to your cunt and begins to enthusiastically eat you out.`);
				if (V.PC.vagina === 0) {
					r.push(`${HisU} long tongue enters your vagina and you feel ${heU} rhythmically pressing into your new hymen with just enough pressure for you to feel it.`);
				}
				r.push(`${HeU} is quite good at ${hisU} job and quickly brings you to climax; your new${V.PC.vagina === 0 ? " virgin" : ""} pussy squirting girlcum across ${hisU} face. ${HeU} rises from your crotch and licks ${hisU} lips. "I always did like the taste of you. Feel free to rest as long as you need before departing.`);
				if (V.PC.degeneracy > 0 && V.PC.vagina === 0) {
					r.push(`Ah, I forgot, ${V.doctor.state > 0 ? "your" : "a renowned "} doctor came while you were sedated, did an examination, issued a virginity certificate and <span class="reputation inc">made a public statement that you are a virgin.</span>`);
					V.PC.degeneracy = Math.max(V.PC.degeneracy - 10, 0); /** -10 points */
					if (V.PC.degeneracy > 0) {
						V.PC.degeneracy = V.PC.degeneracy - Math.max(Math.floor(V.PC.degeneracy / 2), 50); /** reduces half of the points from 11 to 60 */
						if (V.PC.degeneracy > 50) {
							V.PC.degeneracy = Math.min(50 + Math.floor((V.PC.degeneracy - 50) / 3), 99); /** reduces 2/3 of the points from 61 to 99, caps at 99 */
						}
					}
				}
				r.push(`If you need, or want, me, I'll be around." Satisfied, you settle back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			}
			break;
		case "reVirgin":
			r.push(`After a few hours, you awaken in the recovery wing with a distinct soreness between your legs. You pull the covers off of yourself to catch sight of the result of the surgery. You spread your legs and push your labia apart to try to see your insides in the ceiling mirror, but your vaginal opening is now too small and the mirror is far away. You carefully put a finger into your pussy and notice a barrier before you manage to insert the second knuckle. You try to push a little further and you feel a pressure inside you. Indeed, you are a virgin again and you have a tight vagina, like new.`);
			r.push(`"So, do you feel it? Does it feel tight?", asks the surgeon's assistant, seating ${himselfU} beside you and tracing your labia with a finger. "May I?" ${HeU} asks you, teasing your vaginal entrance. ${HeU} doesn't wait for your answer and inserts the tip of ${hisU} finger, proving around for any oddities and teasing you at the same time. "I know you're still a little sore, but bear with it. Plus, I know it must feel good.`);
			if (V.PC.dick !== 0) {
				r.push(`See? He agrees with me," ${heU} says, poking at the tip of your erection with ${hisU} free hand. "Shall we see if it's working right?" ${HeU} circles around till ${heU} is between your legs and`);
				if (V.PC.belly >= 10000) {
					r.push(`disappears behind the curvature of your pregnancy.`);
				} else {
					r.push(`disappears between your thighs.`);
				}
				r.push(`You feel`);
				if (V.PC.balls >= 9) {
					r.push(`${himU} lift your engorged sack and leave it resting atop ${hisU} head`);
				} else {
					r.push(`${hisU} head brush against your sack`);
				}
				r.push(`as ${heU} brings ${hisU} mouth to your cunt and begins to enthusiastically eat you out. ${HisU} long tongue enters your vagina and you feel ${heU} rhythmically pressing into your new hymen with just enough pressure for you to feel it. ${HeU} is quite good at ${hisU} job and quickly brings you to climax; your neglected dick spraying cum across your belly. ${HeU} rises from your crotch to lick up your wayward cum. "I always did like the taste of you. Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around." Satisfied, you settle back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			} else {
				r.push(`See? Your cute little clit agrees with me," ${heU} says, poking at the tip of your peeking clit with ${hisU} free hand. "Shall we see if it's working right?" ${HeU} circles around till ${heU} is between your legs and`);
				if (V.PC.belly >= 10000) {
					r.push(`disappears behind the curvature of your pregnancy.`);
				} else {
					r.push(`disappears between your thighs.`);
				}
				r.push(`You feel ${hisU} face brush your inner legs as ${heU} brings ${hisU} mouth to your cunt and begins to enthusiastically eat you out. ${HisU} long tongue enters your vagina and you feel ${heU} rhythmically pressing into your new hymen with just enough pressure for you to feel it. ${HeU} is quite good at ${hisU} job and quickly brings you to climax; your virgin pussy squirting girlcum across ${hisU} face. ${HeU} rises from your crotch and licks ${hisU} lips. "I always did like the taste of you. Feel free to rest as long as you need before departing.`);
				if (V.PC.degeneracy > 0 && V.PC.vagina === 0) {
					r.push(`Ah, I forgot, ${V.doctor.state > 0 ? "your" : "a renowned "} doctor came while you were sedated, did an examination, issued a virginity certificate and <span class="reputation inc">made a public statement that you are a virgin.</span>`);
					V.PC.degeneracy = Math.max(V.PC.degeneracy - 10, 0); /** -10 points */
					if (V.PC.degeneracy > 0) {
						V.PC.degeneracy = V.PC.degeneracy - Math.max(Math.floor(V.PC.degeneracy / 2), 50); /** reduces half of the points from 11 to 60 */
						if (V.PC.degeneracy > 50) {
							V.PC.degeneracy = Math.min(50 + Math.floor((V.PC.degeneracy - 50) / 3), 99); /** reduces 2/3 of the points from 61 to 99, caps at 99 */
						}
					}
				}
				r.push(`If you need, or want, me, I'll be around." Satisfied, you settle back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			}
			break;
		case "herm2female":
			r.push(`After a few hours, you awaken in the recovery wing with a distinct soreness between your legs. You pull the covers off of yourself to catch sight of the result of the surgery and`);
			if (V.PC.boobs >= 1400) {
				r.push(`find that your enormous breasts make it difficult to get a good look so you settle for the mirror-covered wall across from your bed. Your penis is gone, leaving you with just a vagina. Given the soreness in your lower belly, your prostate and other male reproductive organs have been removed as well. You can't tell much more until you get a good feel of it.`);
			} else {
				r.push(`find your penis and testicles removed, leaving you with just a vagina. Given the soreness in your lower belly, your prostate and other male reproductive organs have been removed as well.`);
			}
			r.push(`"So, how do you feel?", asks the surgeon's assistant, seating ${himselfU} beside you and resting a hand on your pubic mound, making you wince in discomfort. "I'd take it easy for a few days, your body is going to take some time to get used to not having a penis anymore and to recover. Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around." Exhausted from the procedure, you settle back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			break;
		case "herm2male":
			r.push(`After a few hours, you awaken in the recovery wing with a distinct soreness between your legs. You pull the covers off of yourself to catch sight of the result of the surgery and`);
			if (V.PC.boobs >= 1400) {
				r.push(`find that your enormous breasts make it difficult to get a good look so you settle for the mirror-covered wall across from your bed. Your pussy is gone, leaving you with just a cock and balls. Given the soreness in your lower belly, your womb and ovaries are gone too. You can't tell much more until you get a good feel of it.`);
			} else {
				r.push(`find your pussy is gone, leaving you with just a cock and balls. Given the soreness in your lower belly, your womb and ovaries are gone too.`);
			}
			r.push(`"So, how do you feel?", asks the surgeon's assistant, seating ${himselfU} beside you and resting a hand on your pubic mound, making you wince in discomfort. "I'd take it easy for a few days, your body is going to take some time to recover from surgery. Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around." Exhausted from the procedure, you settle back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			break;
		case "herm2truefemale":
			r.push(`After a few hours, you awaken in the recovery wing with a distinct soreness between your legs and pain practically all over your body. You pull the covers off of yourself to catch sight of the result of the surgery and`);
			if (V.PC.boobs >= 1400) {
				r.push(`find that your enormous breasts make it difficult to get a good look so you settle for the mirror-covered wall across from your bed. Your penis is gone, leaving you with just a vagina. Given the soreness in your lower belly, your prostate and other male reproductive organs have been removed as well. You can't tell much more until you get a good feel of it. Your body has also undergone large-scale reconstructive surgery; it is unlikely anyone will recognize you as a man anymore.`);
			} else {
				r.push(`find your penis and testicles removed, leaving you with just a vagina. Given the soreness in your lower belly, your prostate and other male reproductive organs have been removed as well. You can't tell much more until you get a good feel of it, but you're too sore to try. Your body has also undergone large-scale reconstructive surgery; it is unlikely anyone will recognize you as a man anymore.`);
			}
			r.push(`"So, how do you feel?", asks the surgeon's assistant, seating ${himselfU} beside you. "I'd take it easy for the rest of the week, your body is going to take some time to get used to not having a penis anymore and to recover from all the changes. But if it makes you feel any better, you certainly are a lovely woman. Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around." Exhausted from the procedure, you settle back down to recover for the rest of your stay.`);
			break;
		case "herm2truemale":
			r.push(`After a few hours, you awaken in the recovery wing with a distinct soreness between your legs and pain practically all over your body. You pull the covers off of yourself to catch sight of the result of the surgery and find your pussy is gone, leaving you with just a cock and balls. Given the soreness in your lower belly, your womb and ovaries are gone too. You can't tell much more until you get a good feel of it, but you're too sore to try. Your body has also undergone large-scale reconstructive surgery; it is unlikely anyone will recognize you a woman anymore. "So, how do you feel?", asks the surgeon's assistant, seating ${himselfU} beside you. "I'd take it easy for the rest of the week, your body is going to take some time to recover from all the changes. But if it makes you feel any better, you certainly are a handsome man. Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around." Exhausted from the procedure, you settle back down to recover for the rest of your stay.`);
			break;
		case "male2female":
			r.push(`After a few hours, you awaken in the recovery wing with a distinct soreness between your legs and in your lower belly. You pull the covers off of yourself to catch sight of the result of the surgery and find`);
			if (V.PC.boobs >= 1400) {
				r.push(`that your enormous breasts make it difficult to get a good look, so you settle for the mirror-covered wall across from your bed. Your dick is gone, along with the rest of your male reproductive organs, leaving you with a pussy, a new fertile set of ovaries, and a fresh womb. You can't tell much more until you get a good feel of it, but you're too sore to try.`);
			} else {
				r.push(`your dick is gone, along with the rest of your male reproductive organs, leaving you with a pussy, a new fertile set of ovaries, and a fresh womb. You can't tell much more until you get a good feel of it, but you're too sore to try.`);
			}
			r.push(`"So, how do you feel?", asks the surgeon's assistant, seating ${himselfU} beside you and placing a hand on your belly. "I'd take it easy for the rest of the week, your body is going to take some time to recover from all the changes. Now, this might be uncomfortable, but it would be best to check if your new parts are functioning correctly." ${HeU} circles around until ${heU} is between your legs and disappears between your thighs. You feel face brush your inner legs as ${heU} brings ${hisU} mouth to your fresh pussy and begins to enthusiastically eat you out. ${HeU} is quite good at ${hisU} job and quickly brings you to climax, your new vagina squirting girlcum across ${hisU} face. ${HeU} rises from your crotch and licks ${hisU} lips. "Your new taste is good too. Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around. Oh! And before you leave, we'll write a prescription for some birth control for you. You don't have to use it, but it'll be there for you." Exhausted from the procedure, you settle back down to recover for the rest of your stay.`);
			break;
		case "male2herm":
			r.push(`After a few hours, you awaken in the recovery wing with a distinct soreness between your legs and in your lower belly. You pull the covers off of yourself to catch sight of the result of the surgery and find`);
			if (V.PC.boobs >= 1400) {
				r.push(`that your enormous breasts make it difficult to get a good look so you settle for the mirror-covered wall across from your bed. You see`);
				if (V.PC.balls < 5) {
					r.push(`your new pussy peeking from under your testicles.`);
				} else {
					r.push(`that your balls are big enough to completely obscure your new pussy.`);
				}
				r.push(`Your lower belly is slightly larger too, likely from your new womb. You can't tell much more until you get a good feel of it, but you're too sore to try.`);
			} else {
				if (V.PC.balls < 5) {
					r.push(`your new pussy peeking from under your testicles.`);
				} else {
					r.push(`that your balls are big enough to completely obscure your new pussy.`);
				}
				r.push(`Your lower belly is slightly larger too, likely from your new womb. You can't tell much more until you get a good feel of it, but you're too sore to try.`);
			}
			r.push(`"So, how do you feel?", asks the surgeon's assistant, seating ${himselfU} beside you and placing a hand on your belly. "I'd take it easy for the rest of the week, your body is going to take some time to recover from all the changes. Now, this might be uncomfortable, but it would be best to check if your new parts are functioning correctly." ${HeU} circles around until ${heU} is between your legs and disappears between your thighs. You feel`);
			if (V.PC.balls >= 9) {
				r.push(`${himU} lift your engorged sack and leave it resting atop ${hisU} head`);
			} else {
				r.push(`${hisU} head brush against your sack`);
			}
			r.push(`as ${heU} brings ${hisU} mouth to your fresh pussy and begins to enthusiastically eat you out. ${HeU} is quite good at ${hisU} job and quickly brings you to climax; your new vagina squirting girlcum across ${hisU} face and your neglected dick spraying cum across your belly. ${HeU} rises from your crotch to lick up your wayward cum. "I always did like the taste of you and your new flavor is good too. Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around. Oh! And before you leave, we'll write a prescription for some birth control for you. You don't have to use it, but it'll be there for you. Just try not to mix your two halves, unless you want to watch your middle steadily swell with your own child." Exhausted from the procedure, you settle back down to recover for the rest of your stay.`);
			break;
		case "male2truefemale":
			r.push(`After a few hours, you awaken in the recovery wing with a distinct soreness between your legs and pain practically all over your body. You pull the covers off of yourself to catch sight of the result of the surgery and find`);
			if (V.PC.boobs >= 1400) {
				r.push(`that your enormous breasts make it difficult to get a good look so you settle for the mirror-covered wall across from your bed. Your dick is gone, along with the rest of your male reproductive organs, leaving you with a pussy, a new fertile set of ovaries and a fresh womb. You can't tell much more until you get a good feel of it, but you're too sore to try. Your body has also undergone large-scale reconstructive surgery; it is unlikely anyone will recognize you as a man anymore.`);
			} else {
				r.push(`your dick is gone, along with the rest of your male reproductive organs, leaving you with a pussy, a new fertile set of ovaries and a fresh womb. You can't tell much more until you get a good feel of it, but you're too sore to try.`);
				if (V.PC.boobs < 300) {
					r.push(`You do take a moment to fondle your new C-cup breasts though; they feel nice.`);
				}
				r.push(`Your body has also undergone large-scale reconstructive surgery; it is unlikely anyone will recognize you as a man anymore.`);
			}
			r.push(`"So, how do you feel?", asks the surgeon's assistant, seating ${himselfU} beside you and placing a hand on your belly. "I'd take it easy for the rest of the week, your body is going to take some time to recover from all the changes. Now, this might be uncomfortable, but it would be best to check if your new parts are functioning correctly." ${HeU} circles around until ${heU} is between your legs and disappears between your thighs. You feel face brush your inner legs as ${heU} brings ${hisU} mouth to your fresh pussy and begins to enthusiastically eat you out. ${HeU} is quite good at ${hisU} job and quickly brings you to climax; your new vagina squirting girlcum across ${hisU} face. ${HeU} rises from your crotch and licks ${hisU} lips. "Your new taste is good too. Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around. Oh! And before you leave, we'll write a prescription for some birth control for you. You don't have to use it, but it'll be there for you." Exhausted from the procedure, you settle back down to play with your tits and recover for the rest of your stay.`);
			if (V.PC.boobs < 300) {
				V.PC.boobs = 500;
			}
			break;
		case "male2hermfemale":
			r.push(`After a few hours, you awaken in the recovery wing with a distinct soreness between your legs and in your lower belly. You pull the covers off of yourself to catch sight of the result of the surgery and find`);
			if (V.PC.boobs >= 1400) {
				r.push(`that your enormous breasts make it difficult to get a good look so you settle for the mirror-covered wall across from your bed. You see`);
				if (V.PC.balls < 5) {
					r.push(`your new pussy peeking from under your testicles.`);
				} else {
					r.push(`that your balls are big enough to completely obscure your new pussy.`);
				}
				r.push(`Your lower belly is slightly larger too, likely from your new womb. You can't tell much more until you get a good feel of it, but you're too sore to try. Your body has also undergone large-scale reconstructive surgery; it is unlikely anyone will recognize you as a man anymore.`);
			} else {
				if (V.PC.balls < 5) {
					r.push(`your new pussy peeking from under your testicles.`);
				} else {
					r.push(`that your balls are big enough to completely obscure your new pussy.`);
				}
				r.push(`Your lower belly is slightly larger too, likely from your new womb. You can't tell much more until you get a good feel of it, but you're too sore to try.`);
				if (V.PC.boobs < 300) {
					r.push(`You do take a moment to fondle your new C-cup breasts though; they feel nice.`);
				}
				r.push(`Your body has also undergone large-scale reconstructive surgery; it is unlikely anyone will recognize you as a man anymore.`);
			}
			r.push(`"So, how do you feel?", asks the surgeon's assistant, seating ${himselfU} beside you and placing a hand on your belly. "I'd take it easy for the rest of the week, your body is going to take some time to recover from all the changes. Now, this might be uncomfortable, but it would be best to check if your new parts are functioning correctly." ${HeU} circles around until ${heU} is between your legs and disappears between your thighs. You feel`);
			if (V.PC.balls >= 9) {
				// FIXME: review this
			} else {
				r.push(`${hisU} head brush against your sack`);
			}
			r.push(`as ${heU} brings ${hisU} mouth to your fresh pussy and begins to enthusiastically eat you out. ${HeU} is quite good at ${hisU} job and quickly brings you to climax; your new vagina squirting girlcum across ${hisU} face and your neglected dick spraying cum across your belly. ${HeU} rises from your crotch to lick up your wayward cum. "I always did like the taste of you and your new flavor is good too. Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around. Oh! And before you leave, we'll write a prescription for some birth control for you. You don't have to use it, but it'll be there for you. Just try not to mix your two halves, unless you want to watch your middle steadily swell with your own child." Exhausted from the procedure, you settle back down to play with your tits and recover for the rest of your stay.`);
			if (V.PC.boobs < 300) {
				V.PC.boobs = 500;
			}
			break;
		case "female2male":
			r.push(`After a few hours, you awaken in the recovery wing with a distinct soreness between your legs and in your lower belly. You pull the covers off of yourself to catch sight of the result of the surgery and find`);
			if (V.PC.boobs >= 1400) {
				r.push(`that your enormous breasts make it difficult to get a good look so you settle for the mirror-covered wall across from your bed. Your pussy is gone, replaced with a cock and balls. Given the soreness in your lower belly, your womb and ovaries are gone too. You can't tell much more until you get a good feel of it, but you're too sore to try.`);
			} else {
				r.push(`your pussy is gone, replaced with a cock and balls. Given the soreness in your lower belly, your womb and ovaries are gone too. You can't tell much more until you get a good feel of it, but you're too sore to try.`);
			}
			r.push(`"So, how do you feel?", asks the surgeon's assistant, seating ${himselfU} beside you and placing a hand on your belly. "I'd take it easy for the rest of the week, your body is going to take some time to recover from all the changes. Now, this might be uncomfortable, but it would be best to check if your new parts are functioning correctly," ${heU} states, teasing your penis. A lewd moan escapes your lips as you are overcome by the sensation. ${HeU} leans over your dick and licks the bead of precum building on its end. "Tasty." Taking your dick to the hilt, ${heU} begins earnestly sucking you off while fondling your sensitive balls. Within moments you release your first load deep in ${hisU} throat. Like a good assistant, ${heU} diligently swallows it down, making sure not a drop is missed. "While I liked the taste of your pussy, this is nice too. Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around." Exhausted from the procedure, you settle back down to recover for the rest of your stay.`);
			break;
		case "female2herm":
			r.push(`After a few hours, you awaken in the recovery wing with a distinct soreness between your legs and in your lower belly. You pull the covers off of yourself to catch sight of the result of the surgery and find`);
			if (V.PC.boobs >= 1400) {
				r.push(`that your enormous breasts make it difficult to get a good look so you settle for the mirror-covered wall across from your bed. You see your new cock and balls, as well as the bottom of your pussy, just barely peeking out from under them. Your lower belly pain is likely caused by the addition of a prostrate and other organs. You can't tell much more until you get a good feel of it, but you're too sore to try, though your new dick disagrees as it grows erect.`);
			} else {
				r.push(`your new cock and balls, as well as the bottom of your pussy, just barely peeking out from under them. Your lower belly pain is likely caused by the addition of a prostrate and other organs. You can't tell much more until you get a good feel of it, but you're too sore to try, though your new dick disagrees as it grows erect.`);
			}
			r.push(`"So, how do you feel?", asks the surgeon's assistant, seating ${himselfU} beside you and placing a hand on your belly. "I'd take it easy for the rest of the week, your body is going to take some time to recover from all the changes. Now, this might be uncomfortable, but it would be best to check if your new parts are functioning correctly." ${HeU} wraps a hand around your throbbing shaft. "But you seem eager to experience ejaculation." ${HeU} leans over your dick and licks the bead of precum building on its end. "Tasty." Taking your dick to the hilt, ${heU} begins earnestly sucking you off while fondling your sensitive balls. Within moments you release your first load deep in ${hisU} throat. Like a good assistant, ${heU} diligently swallows it down, making sure not a drop is missed. "Not bad, though I'm sorry I couldn't pay more attention to your moist pussy. Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around." Exhausted from the procedure, you settle back down to recover for the rest of your stay.`);
			break;
		case "female2truemale":
			r.push(`After a few hours, you awaken in the recovery wing with a distinct soreness between your legs and in your lower belly. You pull the covers off of yourself to catch sight of the result of the surgery and find your pussy is gone, replaced with a cock and balls. Given the soreness in your lower belly, your womb and ovaries are gone too. You can't tell much more until you get a good feel of it, but you're too sore to try. Your body has also undergone large-scale reconstructive surgery; it is unlikely anyone will recognize you a woman anymore. "So, how do you feel?", asks the surgeon's assistant, seating ${himselfU} beside you and placing a hand on your belly. "I'd take it easy for the rest of the week, your body is going to take some time to recover from all the changes. Now, this might be uncomfortable, but it would be best to check if your new parts are functioning correctly," ${heU} states, teasing your penis. A lewd moan escapes your lips as you are overcome by the sensation. ${HeU} leans over your dick and licks the bead of precum building on its end. "Tasty." Taking your dick to the hilt, ${heU} begins earnestly sucking you off while fondling your sensitive balls. Within moments you release your first load deep in ${hisU} throat. Like a good assistant, ${heU} diligently swallows it down, making sure not a drop is missed. "While I liked the taste of your pussy, this is nice too. Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around." Exhausted from the procedure, you settle back down to recover for the rest of your stay.`);
			break;
		case "female2hermmale":
			r.push(`After a few hours, you awaken in the recovery wing with a distinct soreness between your legs and in your lower belly. You pull the covers off of yourself to catch sight of the result of the surgery and find your new cock and balls, as well as the bottom of your pussy, just barely peeking out from under them. Your lower belly pain is likely caused by the addition of a prostrate and other organs. Your body has also undergone large-scale reconstructive surgery; it is unlikely anyone will recognize you a woman anymore. You can't tell much more until you get a good feel of it, but you're too sore to try, though your new dick disagrees as it grows erect. "So, how do you feel?", asks the surgeon's assistant, seating ${himselfU} beside you and placing a hand on your belly. "I'd take it easy for the rest of the week, your body is going to take some time to recover from all the changes. Now, this might be uncomfortable, but it would be best to check if your new parts are functioning correctly." ${HeU} wraps a hand around your throbbing shaft. "But you seem eager to experience ejaculation." ${HeU} leans over your dick and licks the bead of precum building on its end. "Tasty." Taking your dick to the hilt, ${heU} begins earnestly sucking you off while fondling your sensitive balls. Within moments you release your first load deep in ${hisU} throat. Like a good assistant, ${heU} diligently swallows it down, making sure not a drop is missed. "Not bad, though I'm sorry I couldn't pay more attention to your pussy. Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around." Exhausted from the procedure, you settle back down to recover for the rest of your stay.`);
			break;
		case "tummyTuck":
			r.push(`After a few hours, you awaken in the recovery wing with a lingering soreness to your stomach. You pull the covers off of yourself to catch sight of the result of the surgery and`);
			if (V.PC.boobs >= 1400) {
				r.push(`find that your enormous breasts make it difficult to get a good look. Spreading them apart, you find your belly has been restored almost perfectly to the way it was prior to your pregnancy.`);
			} else {
				r.push(`find your belly has been restored almost perfectly to the way it was prior to your pregnancy.`);
			}
			r.push(`"So, good enough to show off?", asks the surgeon's assistant, seating ${himselfU} beside you and tracing your navel with a finger. "It was a very simple procedure, so you're free to go whenever," ${heU} says, a crestfallen tone in ${hisU} voice.`);
			break;
		case "ovulationRestart":
			r.push(`After a few hours, you awaken in the recovery wing with a distinct soreness in your lower belly. You pull the covers off of yourself to catch sight of the result of the surgery and find`);
			if (V.PC.boobs >= 1400) {
				r.push(`find that your enormous breasts make it difficult to get a good look. Spreading them apart, you find nothing but a pair of small, stitched incisions over your ovaries.`);
			} else {
				r.push(`find nothing but a pair of small, stitched incisions over your ovaries.`);
			}
			r.push(`"Everything went well", says the surgeon's assistant, seating ${himselfU} beside you and tracing your labia with a finger. "Now we won't know if they are functional until you have your first period. Funny hearing that again, right? Anyway, everything is hooked up so I'm sure you'll find out in a few weeks. So, how about a little warm up to get you ready?" ${HeU} circles around till ${heU} is between your legs and disappears between your thighs. You feel face brush your inner legs as ${heU} brings ${hisU} mouth to your cunt and begins to enthusiastically eat you out. ${HeU} is quite good at ${hisU} job and quickly brings you to climax; your pussy squirting girlcum across ${hisU} face. ${HeU} rises from your crotch and licks ${hisU} lips. "As much as I'd like to really check your fertility, I lack the proper 'instruments' to do so and, well, I doubt you'd want me to be the father of your next child..." ${HeU} faces the floor before turning back to you. "Feel free to rest as long as you need before departing. If you need, or want, me, I'll be around." Satisfied, you settle back down to sleep off the rest of the anesthesia before returning to your arcology.`);
			break;
		default:
			r.push(`You have surgery. This is a WIP, if you can't tell.`);
	}
	App.Events.addParagraph(frag, r);
	return frag;
};
