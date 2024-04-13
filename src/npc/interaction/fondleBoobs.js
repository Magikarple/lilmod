/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fondleBoobs = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He, His,
		he, his, hers, him, himself, woman, girl
	} = getPronouns(slave);

	const {title: Master, say: say} = getEnunciation(slave);

	r.push(`You call ${him} over so you can fondle ${his}`);
	if (slave.boobs >= 20000) {
		r.push(`colossal tits.`);
	} else if (slave.boobs >= 10000) {
		r.push(`massive tits.`);
	} else if (slave.boobs >= 5000) {
		r.push(`monster tits.`);
	} else if (slave.boobs >= 1000) {
		r.push(`huge tits.`);
	} else if (slave.boobsImplant > 250) {
		r.push(`fake tits.`);
	} else if (slave.boobs >= 650) {
		r.push(`big tits.`);
	} else if (slave.boobs >= 300) {
		r.push(`small tits.`);
	} else {
		r.push(`flat tits.`);
	}

	if (slave.nipples === "huge") {
		r.push(`${His} nipples are so large they give ${his} breasts an unavoidably lewd appeal as they jut outward.`);
	} else if (slave.nipples === "puffy") {
		r.push(`${His} puffy nipples beg to be sucked.`);
	} else if (slave.nipples === "flat") {
		r.push(`${His} nipples form lewd little circles amid ${his} areolae.`);
	} else if (slave.nipples === "partially inverted" && slave.piercing.nipple.weight === 0) {
		r.push(`${His} partially inverted nipples should protrude at the slightest stimulation.`);
	} else if (slave.nipples === "inverted" && slave.piercing.nipple.weight === 0) {
		r.push(`${His} inverted nipples form lewd little creases across ${his} areolae.`);
	} else if (slave.nipples === "fuckable") {
		if (slave.lactation) {
			r.push(`${His} nipplecunts are leaking milk and begging to be penetrated.`);
		} else {
			r.push(`${His} nipplecunts form lewd little slits across ${his} areolae.`);
		}
	} else {
		r.push(`${His} erect nipples point enticingly outwards.`);
	}

	if (slave.boobsTat === "tribal patterns") {
		r.push(`The tattoos on ${his} breasts certainly draw attention to ${his} nipples.`);
	}

	if (slave.piercing.nipple.weight > 1 && !hasAnyLegs(slave)) {
		r.push(`You play with the chain between ${his} nipples.`);
	} else if (slave.piercing.nipple.weight > 1) {
		r.push(`You pull ${him} over by the chain between ${his} nipples.`);
	} else if (slave.piercing.nipple.weight === 1) {
		r.push(`${His} nipple piercings glint enticingly.`);
	}

	if (isAmputee(slave)) {
		r.push(`${His} limbless`);
		if (V.seeRace === 1) {
			r.push(slave.race);
		}
		r.push(`torso is a sight to behold. You place your hands on ${his} breasts and you gently massage`);
		if (slave.boobs >= 20000) {
			r.push(`${his} colossal tits, doing your best to not miss`);
			if (V.showInches === 2) {
				r.push(`an inch`);
			} else {
				r.push(`a centimeter`);
			}
			r.push(`of their immense size,`);
		} else if (slave.boobs >= 10000) {
			r.push(`${his} massive tits, your hands sinking deep into their soft flesh,`);
		} else if (slave.boobs >= 5000) {
			r.push(`${his} monster tits, bouncing their weighty mass in your hands,`);
		} else if (slave.boobs > 1000) {
			r.push(`${his} huge tits, bouncing them up and down in your hands, while simultaneously`);
			if (slave.nipples === "fuckable") {
				r.push(`slipping your fingers in and out of ${his} ${slave.nipples} nipples,`);
			} else {
				r.push(`rubbing ${his} ${slave.nipples} nipples with your fingers and thumbs,`);
			}
		} else if (slave.boobs > 650) {
			r.push(`${his} large tits, jiggling them enticingly with your hands,`);
		} else if (slave.boobs > 300) {
			r.push(`${his} cute breasts, cupping them and gently`);
			if (slave.nipples === "fuckable") {
				r.push(`slipping your fingers in and out of ${his} ${slave.nipples} nipples,`);
			} else {
				r.push(`playing with ${his} nipples between your fingers and thumbs,`);
			}
		} else {
			r.push(`${his} flat breasts, gently`);
			if (slave.nipples === "fuckable") {
				r.push(`slipping your fingers in and out of ${his} ${slave.nipples} nipples,`);
			} else {
				r.push(`playing with ${his} nipples between your fingers and thumbs,`);
			}
		}
		r.push(`teasing them and pulling them gently towards you. Moving your head close to ${his} breasts, you nuzzle on a nipple with your lips and even lick it delicately with your tongue.`);
		if (slave.nipples !== "fuckable") {
			r.push(`Then you alternate, gently nibbling with your teeth on the other nipple. You squeeze the tips of ${his}`);
			if (slave.lactation > 0) {
				r.push(`milky`);
			}
			r.push(`nipples with your thumbs and fingers and tweak them in your fingertips, then you dab ${his} nipples with your thumbs, flicking them in different directions.`);
		} else {
			r.push(`Then you alternate, gently probing the depths of the other nipple. You dig deep into both ${his} breasts, teasing what was once the tips of ${his}`);
			if (slave.lactation > 0) {
				r.push(`milky`);
			}
			r.push(`nipples with your fingers before vigorously fingering ${his} tits.`);
		}
		r.push(`${He} starts to pant heavily while ${he} lies helpless at your playing with ${his} breasts and ${he} cannot do anything against the relentless fondling. ${He} wriggles and squirms at the continued stimulation, getting aroused at the expert way you move around ${his} tits and nipples.`);
	} else if (slave.fetish === "boobs" && slave.fetishStrength > 60 && slave.fetishKnown === 1) {
		r.push(`${He} comes over excitedly at the thought of ${his} breasts getting touched. ${He} stands in between you and your desk, already presenting ${his} breasts for you. You place your hands on ${his} breasts and you gently massage`);
		if (slave.boobs >= 20000) {
			r.push(`${his} colossal tits, before sinking your body into their immense softness,`);
		} else if (slave.boobs >= 10000) {
			r.push(`${his} massive tits, before sinking your arms into their soft mass,`);
		} else if (slave.boobs >= 5000) {
			r.push(`${his} monster tits, bouncing their weighty mass in your hands,`);
		} else if (slave.boobs > 1000) {
			r.push(`${his} huge tits, bouncing them up and down in your hands, while simultaneously`);
			if (slave.nipples === "fuckable") {
				r.push(`slipping your fingers in and out of ${his} ${slave.nipples} nipples,`);
			} else {
				r.push(`rubbing ${his} ${slave.nipples} nipples with your fingers and thumbs,`);
			}
		} else if (slave.boobs > 650) {
			r.push(`${his} large tits, jiggling them enticingly with your hands,`);
		} else if (slave.boobs > 300) {
			r.push(`${his} cute breasts, cupping them and gently`);
			if (slave.nipples === "fuckable") {
				r.push(`slipping your fingers in and out of ${his} ${slave.nipples} nipples,`);
			} else {
				r.push(`playing with ${his} nipples between your fingers and thumbs,`);
			}
		} else {
			r.push(`${his} flat breasts gently`);
			if (slave.nipples === "fuckable") {
				r.push(`slipping your fingers in and out of ${his} engorged ${slave.nipples} nipples,`);
			} else {
				r.push(`playing with ${his} hard, erect nipples between your fingers and thumbs,`);
			}
		}
		r.push(`teasing them and pulling them gently towards you. Moving your head close to ${his} breasts, you nuzzle on a nipple with your lips and even lick it delicately with your tongue.`);
		if (slave.nipples !== "fuckable") {
			r.push(`Then you alternate, gently nibbling with your teeth on the other nipple. You squeeze the tips of ${his}`);
			if (slave.lactation > 0) {
				r.push(`milky`);
			}
			r.push(`nipples with your thumbs and fingers and tweak them in your fingertips, then you dab ${his} nipples with your thumbs, flicking them in different directions. ${He} moans at your playing with ${his} breasts, rubbing ${himself} while you do, growing intensely aroused at the expert way you move around ${his} tits and nipples. You continue, rolling ${his} ${slave.nipples} nipples between your fingers and thumbs while ${he} gets increasingly frenzied at the continued stimulation. When it seems like ${he}'s close, you give them a hard pull, sending ${him} gasping over the edge of ecstasy.`);
		} else {
			r.push(`Then you alternate, gently probing the depths of the other nipple. You dig deep into both ${his} breasts, teasing what was once the tips of ${his}`);
			if (slave.lactation > 0) {
				r.push(`milky`);
			}
			r.push(`nipples with your fingers before vigorously fingering ${his} tits. ${He} moans at your playing with ${his} breasts, rubbing ${himself} while you do, growing intensely aroused at the expert way you move around ${his} tits and nipples. You continue, adding more fingers into ${his} ${slave.nipples} nipples while ${he} gets increasingly frenzied at the continued stimulation. When it seems like ${he}'s close, you cram your whole fist in, sending ${him} gasping over the edge of ecstasy.`);
		}
	} else if (slave.devotion > 50 && slave.fetish === "dom" && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
		r.push(`${He} eagerly comes over to you, puffing ${his} chest out at you. When you place your hands on ${his}`);
		if (slave.boobs >= 20000) {
			r.push(`colossal tits,`);
		} else if (slave.boobs >= 10000) {
			r.push(`massive tits,`);
		} else if (slave.boobs >= 5000) {
			r.push(`monster tits,`);
		} else if (slave.boobs >= 1000) {
			r.push(`huge tits,`);
		} else if (slave.boobsImplant > 250) {
			r.push(`fake tits,`);
		} else if (slave.boobs >= 650) {
			r.push(`big tits,`);
		} else if (slave.boobs >= 300) {
			r.push(`cute breasts,`);
		} else {
			r.push(`flat breasts,`);
		}
		if (hasAnyArms(slave)) {
			r.push(`${he} places ${his} ${(hasBothArms(slave)) ? "hands" : "hand"}on your`);
			if (V.PC.boobs >= 300) {
				r.push(`bosom`);
			} else if (V.PC.title === 0) {
				r.push(`flat chest`);
			} else {
				r.push(`manly chest`);
			}
			r.push(`in turn, ${his} tendency towards sexual dominance encouraging ${him} to compete with you in fondling each other.`);
		}
		r.push(`You both alternate between taking your mouth to ${his}`);
		if (slave.lactation > 0) {
			r.push(`milky`);
		}
		r.push(`nipples and ${hers} to yours, gently nuzzling and nibbling while simultaneously fondling each other all the while. Both of you continue to passionately lick, nibble, stroke and fondle one other until tiredly, ${he} slows down. When you eventually stop, ${he} looks up at you happily.`);
		if (slave.accent >= 3) {
			r.push(`${He} does ${his} best to communicate excitement with ${his}`);
			if (canSee(slave)) {
				r.push(`${App.Desc.eyesColor(slave)},`);
			} else {
				r.push(`face,`);
			}
			r.push(`since ${he} does not speak ${V.language} well enough to express ${himself}.`);
		} else if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${He} does ${his} best to communicate excitement with ${his}`);
			if (canSee(slave)) {
				r.push(`${App.Desc.eyesColor(slave)}.`);
			} else {
				r.push(`face.`);
			}
		} else if (!canTalk(slave)) {
			r.push(`${He} signs that ${he} liked that.`);
		} else {
			r.push(Spoken(slave, `"That was fun, ${Master},"`));
			r.push(`${he} ${say}s cheerfully.`);
		}
		if (canSee(slave)) {
			r.push(`${He} looks at you with ${his} ${App.Desc.eyesColor(slave)}, smiling.`);
		} else {
			r.push(`${He} smiles at you.`);
		}
	} else if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishStrength > 60 && slave.fetishKnown === 1) {
		r.push(`${He} eagerly comes over to you, to stand between you and your desk. You lean over while ${he} submissively lies down upon it, face-up, with ${his} breasts pointed to the air. You place your hands on ${his}`);
		if (slave.boobs >= 20000) {
			r.push(`colossal tits, before sinking your body into their immense softness,`);
		} else if (slave.boobs >= 10000) {
			r.push(`massive tits, before sinking your arms into their soft mass,`);
		} else if (slave.boobs >= 5000) {
			r.push(`monster tits, bouncing their weighty mass in your hands,`);
		} else if (slave.boobs > 1000) {
			r.push(`huge tits, bouncing them up and down in your hands, while simultaneously`);
			if (slave.nipples === "fuckable") {
				r.push(`slipping your fingers in and out of ${his} ${slave.nipples} nipples,`);
			} else {
				r.push(`rubbing ${his} ${slave.nipples} nipples with your fingers and thumbs,`);
			}
		} else if (slave.boobs > 650) {
			r.push(`large tits, jiggling them enticingly with your hands,`);
		} else if (slave.boobs > 300) {
			r.push(`cute breasts, cupping them and gently`);
			if (slave.nipples === "fuckable") {
				r.push(`slipping your fingers in and out of ${his} ${slave.nipples} nipples,`);
			} else {
				r.push(`playing with ${his} nipples between your fingers and thumbs,`);
			}
		} else {
			r.push(`flat breasts, gently`);
			if (slave.nipples === "fuckable") {
				r.push(`slipping your fingers in and out of ${his} engorged ${slave.nipples} nipples,`);
			} else {
				r.push(`playing with ${his} hard, erect nipples between your fingers and thumbs,`);
			}
		}
		r.push(`teasing them and pulling them gently towards you. Moving your head close to ${his} breasts, you nuzzle on a nipple with your lips and even lick it delicately with your tongue.`);
		if (slave.nipples !== "fuckable") {
			r.push(`Then you alternate, gently nibbling with your teeth on the other nipple. You squeeze the tips of ${his}`);
			if (slave.lactation > 0) {
				r.push(`milky`);
			}
			r.push(`nipples with your thumbs and fingers and tweak them in your fingertips, then you dab ${his} nipples with your thumbs, flicking them in different directions.`);
		} else {
			r.push(`Then you alternate, gently probing the depths of the other nipple. You dig deep into both ${his} breasts, teasing what was once the tips of ${his}`);
			if (slave.lactation > 0) {
				r.push(`milky`);
			}
			r.push(`nipples with your fingers before vigorously fingering ${his} tits.`);
		}
		r.push(`${He} moans passionately at the continued stimulation of ${his} breasts and nipples. When you finally stop, ${he} reaches up to your face with ${his} hand and lovingly strokes it, a blissful look on ${his} ${slave.skin} face.`);
		if (slave.accent >= 3) {
			r.push(`${He} does ${his} best to communicate devotion with ${his}`);
			if (canSee(slave)) {
				r.push(`${App.Desc.eyesColor(slave)},`);
			} else {
				r.push(`face,`);
			}
			r.push(`since ${he}'s not confident in ${his} ability to express it in ${V.language}.`);
		} else if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${He} does ${his} best to communicate devotion with ${his}`);
			if (canSee(slave)) {
				r.push(`${App.Desc.eyesColor(slave)}.`);
			} else {
				r.push(`face.`);
			}
		} else if (!canTalk(slave)) {
			r.push(`${He} signs that ${he} loves you.`);
		} else {
			r.push(Spoken(slave, `"Please don't stop, ${Master},"`));
			r.push(`${he} ${say}s quietly.`);
		}
		r.push(`${He}`);
		if (canSee(slave)) {
			r.push(`looks`);
		} else {
			r.push(`gazes`);
		}
		r.push(`at you longingly, eager for more.`);
	} else if (slave.fetish === "masochist" && slave.fetishStrength > 60 && slave.fetishKnown === 1) {
		r.push(`${He} hurriedly comes over to you, to stand between you and your desk. You lean over while ${he} lies down upon it, face-up, with ${his} breasts pointed to the air. ${He} gasps as you slap your hands on ${his}`);
		if (slave.boobs >= 20000) {
			r.push(`colossal tits, before sinking your body into their immense softness before pulling back and struggling to grasp both nipples at once,`);
		} else if (slave.boobs >= 10000) {
			r.push(`massive tits, using your entire arms to roughly jiggle them before pulling back to maul ${his} nipples,`);
		} else if (slave.boobs >= 5000) {
			r.push(`monster tits, bouncing their weighty mass roughly with all your might before sliding your hands to ${his} nipples,`);
		} else if (slave.boobs > 1000) {
			r.push(`huge tits, bouncing them roughly up and down in your hands, while simultaneously`);
			if (slave.nipples === "fuckable") {
				r.push(`shoving your fingers in and out of ${his} ${slave.nipples} nipples,`);
			} else {
				r.push(`flicking ${his} nipples hard with your fingers and thumbs,`);
			}
		} else if (slave.boobs > 650) {
			r.push(`large tits, jiggling them enticingly with your hands,`);
		} else if (slave.boobs > 300) {
			r.push(`cute breasts, cupping them and roughly`);
			if (slave.nipples === "fuckable") {
				r.push(`slipping your fingers in and out of ${his} ${slave.nipples} nipples,`);
			} else {
				r.push(`playing with ${his} nipples between your fingers and thumbs,`);
			}
		} else {
			r.push(`flat breasts, roughly`);
			if (slave.nipples === "fuckable") {
				r.push(`slipping your fingers in and out of ${his} engorged ${slave.nipples} nipples,`);
			} else {
				r.push(`playing with ${his} hard, erect nipples between your fingers and thumbs,`);
			}
		}
		r.push(`teasing them and firmly pulling them in all directions.`);
		if (slave.nipples !== "fuckable") {
			r.push(`Moving your head close to ${his} breasts, you put your lips on a nipple and close your lips firmly around it to pull strongly on it. Then you alternate, bite hard with your teeth on the other. You firmly squeeze the tips of ${his}`);
			if (slave.lactation > 0) {
				r.push(`milky`);
			}
			r.push(`nipples with your thumbs and fingers and tweak them in your fingertips, then you push ${his} nipples with your thumbs, flicking them hard in different directions.`);
		} else {
			r.push(`Moving your head close to ${his} breasts, you put your lips over a nipple and close your lips firmly over the slit to suck strongly on it. Then you alternate, bite hard with your teeth on the other. You firmly push the tips of your fingers down into the depths of ${his}`);
			if (slave.lactation > 0) {
				r.push(`milky`);
			}
			r.push(`nipples to tweak what was once their tip.`);
		}
		r.push(`${He} moans passionately at the continued punishment of ${his} breasts and nipples. Your rough play leaves red marks on ${his} breasts and nipples and ${he} becomes even more aroused. When you finally stop ${he} rubs the marks on ${his} breasts with ${his} hands, an ecstatic look on ${his} ${slave.skin} face.`);
		if (slave.accent >= 3) {
			r.push(`${He} does ${his} best to communicate pleasure with ${his}`);
			if (canSee(slave)) {
				r.push(`${App.Desc.eyesColor(slave)},`);
			} else {
				r.push(`face,`);
			}
			r.push(`since ${he}'s not confident in ${his} ability to express it in ${V.language}.`);
		} else if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${He} does ${his} best to communicate ${his} pleasure with ${his}`);
			if (canSee(slave)) {
				r.push(`${App.Desc.eyesColor(slave)}.`);
			} else {
				r.push(`face.`);
			}
		} else if (!canTalk(slave)) {
			r.push(`${He} signs that ${he} loves it.`);
		} else {
			r.push(Spoken(slave, `"Please punish me more, ${Master},"`));
			r.push(`${he} ${say}s quietly.`);
		}
		r.push(`${He}`);
		if (canSee(slave)) {
			r.push(`looks`);
		} else {
			r.push(`gazes`);
		}
		r.push(`at you longingly, hungry for more.`);
	} else if (slave.devotion > 50) {
		r.push(`${He} devotedly comes over to you, to stand between you and your desk, ${his} doting`);
		r.push(App.Desc.eyesColor(slave));
		r.push(`gazing deep into yours. You place your hands on ${his}`);
		if (slave.boobs >= 20000) {
			r.push(`colossal tits, before sinking your body into their immense softness,`);
		} else if (slave.boobs >= 10000) {
			r.push(`massive tits, before sinking into your arms around their soft mass,`);
		} else if (slave.boobs >= 5000) {
			r.push(`monster tits, bouncing their weighty mass in your hands,`);
		} else if (slave.boobs > 1000) {
			r.push(`huge tits, bouncing them up and down in your hands, while simultaneously`);
			if (slave.nipples === "fuckable") {
				r.push(`slipping your fingers in and out of ${his} ${slave.nipples} nipples,`);
			} else {
				r.push(`rubbing ${his} ${slave.nipples} nipples with your fingers and thumbs,`);
			}
		} else if (slave.boobs > 650) {
			r.push(`large tits, jiggling them enticingly with your hands,`);
		} else if (slave.boobs > 300) {
			r.push(`cute breasts, cupping them and gently`);
			if (slave.nipples === "fuckable") {
				r.push(`slipping your fingers in and out of ${his} ${slave.nipples} nipples,`);
			} else {
				r.push(`playing with ${his} nipples between your fingers and thumbs,`);
			}
		} else {
			r.push(`flat breasts, gently`);
			if (slave.nipples === "fuckable") {
				r.push(`slipping your fingers in and out of ${his} engorged ${slave.nipples} nipples,`);
			} else {
				r.push(`playing with ${his} hard, erect nipples between your fingers and thumbs,`);
			}
		}
		r.push(`teasing them and pulling them gently towards you.`);
		if (slave.nipples !== "fuckable") {
			r.push(`Moving your head close to ${his} breasts, you nuzzle on a nipple with your lips and even lick it delicately with your tongue. Then you alternate, gently nibbling with your teeth on the other nipple. You squeeze the tips of ${his}`);
			if (slave.lactation > 0) {
				r.push(`milky`);
			}
			r.push(`nipples with your thumbs and fingers and tweak them in your fingertips, then you dab ${his} nipples with your thumbs, flicking them in different directions.`);
		} else {
			r.push(`Moving your head close to ${his} breasts, you nuzzle on a nipple slit with your lips and even lick it delicately with your tongue. Then you alternate, gently probing the depths of the other nipple. You dig deep into both ${his} breasts, teasing what was once the tips of ${his}`);
			if (slave.lactation > 0) {
				r.push(`milky`);
			}
			r.push(`nipples with your fingers before vigorously fingering ${his} tits.`);
		}
		r.push(`${He} moans passionately at the continued stimulation of ${his} breasts and nipples. When you finally stop, ${he} reaches up to your face with ${his} hand and lovingly strokes it, a blissful look on ${his} ${slave.skin} face.`);
		if (slave.accent >= 3) {
			r.push(`${He} does ${his} best to communicate devotion with ${his}`);
			if (canSee(slave)) {
				r.push(`${App.Desc.eyesColor(slave)},`);
			} else {
				r.push(`face,`);
			}
			r.push(`since ${he}'s not confident in ${his} ability to express it in ${V.language}.`);
		} else if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${He} does ${his} best to communicate devotion with ${his}`);
			if (canSee(slave)) {
				r.push(`${App.Desc.eyesColor(slave)}.`);
			} else {
				r.push(`face.`);
			}
		} else if (!canTalk(slave)) {
			r.push(`${He} signs that ${he} loves you.`);
		} else {
			r.push(Spoken(slave, `"I love you, ${Master},"`));
			r.push(`${he} ${say}s euphorically.`);
		}
		r.push(`${He}`);
		if (canSee(slave)) {
			r.push(`looks`);
		} else {
			r.push(`gazes`);
		}
		r.push(`at you longingly, eager for more.`);
	} else if (slave.devotion > 20) {
		r.push(`${He} willingly gives ${himself} up to you. You place your hands on ${his}`);
		if (slave.boobs >= 20000) {
			r.push(`colossal tits, before sinking your body into their immense softness,`);
		} else if (slave.boobs >= 10000) {
			r.push(`massive tits, before sinking into your arms around their soft mass,`);
		} else if (slave.boobs >= 5000) {
			r.push(`monster tits, bouncing their weighty mass in your hands,`);
		} else if (slave.boobs > 1000) {
			r.push(`huge tits, bouncing them up and down in your hands, while simultaneously`);
			if (slave.nipples === "fuckable") {
				r.push(`slipping your fingers in and out of ${his} ${slave.nipples} nipples,`);
			} else {
				r.push(`rubbing ${his} ${slave.nipples} nipples with your fingers and thumbs,`);
			}
		} else if (slave.boobs > 650) {
			r.push(`large tits, jiggling them enticingly with your hands,`);
		} else if (slave.boobs > 300) {
			r.push(`cute breasts, cupping them and gently`);
			if (slave.nipples === "fuckable") {
				r.push(`slipping your fingers in and out of ${his} ${slave.nipples} nipples,`);
			} else {
				r.push(`playing with ${his} nipples between your fingers and thumbs,`);
			}
		} else {
			r.push(`flat breasts, gently`);
			if (slave.nipples === "fuckable") {
				r.push(`slipping your fingers in and out of ${his} engorged ${slave.nipples} nipples,`);
			} else {
				r.push(`playing with ${his} hard, erect nipples between your fingers and thumbs,`);
			}
		}
		r.push(`teasing them and pulling them towards you.`);
		if (slave.nipples !== "fuckable") {
			r.push(`Moving your head close to ${his} breasts, you nuzzle on a nipple with your lips and even lick it delicately with your tongue. Then you alternate, gently nibbling with your teeth on the other nipple. You squeeze the tips of ${his}`);
			if (slave.lactation > 0) {
				r.push(`milky`);
			}
			r.push(`nipples with your thumbs and fingers and tweak them in your fingertips, then you dab ${his} nipples with your thumbs, flicking them in different directions.`);
		} else {
			r.push(`Moving your head close to ${his} breasts, you nuzzle on a nipple slit with your lips and even lick it delicately with your tongue. Then you alternate, gently probing the depths of the other nipple. You dig deep into both ${his} breasts, teasing what was once the tips of ${his}`);
			if (slave.lactation > 0) {
				r.push(`milky`);
			}
			r.push(`nipples with your fingers before vigorously fingering ${his} tits.`);
		}
		r.push(`You sense considerable uneasiness in the`);
		if (slave.physicalAge > 30) {
			r.push(`${woman};`);
		} else {
			r.push(`${girl};`);
		}
		r.push(`${he}'s doing ${his} duty as a slave by complying with your wishes, and is probably struggling with the mixture of resistance, obedience and perhaps even devotion forced to the forefront of ${his} mind by your hands on ${his} breasts. ${He} gradually loses ${himself} in the feeling of your gentle hands. When you finally stop, ${his}`);
		if (canSee(slave)) {
			r.push(App.Desc.eyesColor(slave));
			r.push(`gaze`);
		} else {
			r.push(`face gazes`);
		}
		r.push(`puzzlingly at you. Even though ${he} has accepted life as a sex slave, ${he} looks as though ${he} is unsure of what to make of this.`);
		if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${His}`);
			if (canSee(slave)) {
				r.push(`eyes beg`);
			} else {
				r.push(`expression begs`);
			}
			r.push(`for an answer: is that it?`);
		} else if (!canTalk(slave)) {
			r.push(`${He} signs hesitantly, asking if that's it.`);
		} else {
			r.push(`${He} asks hesitantly, "I-is that it, ${Master}?"`);
		}
	} else if (slave.devotion >= -20 && slave.trust < -20) {
		r.push(`${He} shakes at your touch fearfully. As you softly place your hands on ${his}`);
		if (slave.boobs >= 20000) {
			r.push(`colossal tits,`);
		} else if (slave.boobs >= 10000) {
			r.push(`massive tits,`);
		} else if (slave.boobs >= 5000) {
			r.push(`monster tits,`);
		} else if (slave.boobs >= 1000) {
			r.push(`huge tits,`);
		} else if (slave.boobs > 650) {
			r.push(`large tits,`);
		} else if (slave.boobs > 300) {
			r.push(`cute breasts,`);
		} else {
			r.push(`flat breasts,`);
		}
		r.push(`${his} eagerness to avoid punishment leads ${him} to stiffen as you start to massage them. ${He} finally starts to relax as you continue to massage ${his} breasts with your`);
		if (V.PC.title === 1) {
			r.push(`manly`);
		} else {
			r.push(`feminine`);
		}
		r.push(`hands,`);
		if (slave.nipples !== "fuckable") {
			r.push(`playing with ${his}`);
			if (slave.lactation > 0) {
				r.push(`milky`);
			}
			r.push(`${slave.nipples} nipples so that they become hard in between your fingers and thumbs. You squeeze the tips of ${his} nipples with your thumbs and fingers and tweak them in your fingertips, then you dab ${his} nipples with your thumbs, flicking them in different directions. When you firmly pull ${his} nipples`);
			if (slave.lactation > 0) {
				r.push(`milk streams out of them and`);
			}
			r.push(`${he} lets out a gasp.`);
		} else {
			r.push(`playing with ${his}`);
			if (slave.lactation > 0) {
				r.push(`milky`);
			}
			r.push(`${slave.nipples} nipples so that they become sodden with fluid around your fingers. You plunge the depths of ${his} nipple cunts and vigorously work the unusual orifice. When you finally withdraw from ${his} nipples,`);
			if (slave.lactation > 0) {
				r.push(`a stream of pent-up milk flows out after you and`);
			}
			r.push(`${he} lets out a gasp.`);
		}
		r.push(`${His} body softens as`);
		if (canSee(slave)) {
			r.push(`${his} ${App.Desc.eyesColor(slave)} dart up to your face, before visibly catching ${himself} with a reminder`);
		} else {
			r.push(`${he} remembers`);
		}
		r.push(`that ${he}'s a slave and you're ${his} owner. When you finally stop, ${he} shivers but says nothing, uneasy at what you are going to do next.`);
	} else if (slave.trust < -50) {
		r.push(`${He} is nearly frozen with fear, and does not resist as you start to massage ${his}`);
		if (slave.boobs >= 20000) {
			r.push(`colossal tits.`);
		} else if (slave.boobs >= 10000) {
			r.push(`massive tits.`);
		} else if (slave.boobs >= 5000) {
			r.push(`monster tits.`);
		} else if (slave.boobs >= 1000) {
			r.push(`huge tits.`);
		} else if (slave.boobs > 650) {
			r.push(`large tits.`);
		} else if (slave.boobs > 300) {
			r.push(`cute breasts.`);
		} else {
			r.push(`flat breasts.`);
		}
		r.push(`In fact, ${he} barely reacts at all. ${He}`);
		if (canSee(slave)) {
			r.push(`stares`);
		} else {
			r.push(`glowers`);
		}
		r.push(`at you, but ${he} remains motionless. ${He} is so filled with terror that ${he} remains stiff even as it becomes clear to ${him} you're not going to hurt ${him}. ${He} trembles as you continue to massage ${his} breasts with your`);
		if (V.PC.title === 1) {
			r.push(`manly`);
		} else {
			r.push(`feminine`);
		}
		r.push(`hands, playing with ${his}`);
		if (slave.nipples !== "fuckable") {
			if (slave.lactation > 0) {
				r.push(`milky`);
			}
			r.push(`${slave.nipples} nipples so that they become hard in between your fingers and thumbs. You squeeze the tips of ${his} nipples with your thumbs and fingers and tweak them in your fingertips, then you dab ${his} nipples with your thumbs, flicking them in different directions. When you firmly pull ${his} nipples,`);
			if (slave.lactation > 0) {
				r.push(`milk streams out of them and`);
			}
			r.push(`${he} gasps audibly, unable to contain ${himself} at your relentless assault upon ${his} areola. When you put your mouth on ${his} breasts to nibble on ${his} nipples, ${he} bites ${his} lip, desperately trying to hide ${his} arousal at ${his} stimulated nipples.`);
		} else {
			if (slave.lactation > 0) {
				r.push(`milky`);
			}
			r.push(`${slave.nipples} nipples so that they tighten around your fingers. You push deeper in, rubbing their sides gently before forcing the entirety of your hands into ${his} breasts. When you cease fisting ${his} nipples and pull out${(slave.lactation > 0) ? ` alongside a stream of backed up milk` : ``}, ${he} gasps audibly, unable to contain ${himself} at your relentless assault upon ${his} boobs. When you put your mouth on ${his} breasts to lick ${his} slit, ${he} bites ${his} lip, desperately trying to hide ${his} arousal at ${his} stimulated nipples.`);
		}
		r.push(`When you finally stop, ${he} shakes uncontrollably but says nothing, apprehensive at what you are going to do next.`);
	} else {
		r.push(`${He} tries to refuse you, so you push ${him} down on top of your desk and squeeze ${his} ${slave.skin} breasts in your`);
		if (V.PC.title === 1) {
			r.push(`manly`);
		} else {
			r.push(`feminine`);
		}
		r.push(`hands. ${He} tries to push you off ${his}`);
		if (slave.boobs >= 20000) {
			r.push(`colossal tits.`);
		} else if (slave.boobs >= 10000) {
			r.push(`massive tits.`);
		} else if (slave.boobs >= 5000) {
			r.push(`monster tits.`);
		} else if (slave.boobs >= 1000) {
			r.push(`huge tits,`);
		} else if (slave.boobs > 650) {
			r.push(`large tits,`);
		} else if (slave.boobs > 300) {
			r.push(`cute breasts,`);
		} else {
			r.push(`flat breasts,`);
		}
		r.push(`but you continue to massage them, playing with ${his}`);
		if (slave.nipples !== "fuckable") {
			if (slave.lactation > 0) {
				r.push(`milky`);
			}
			r.push(`${slave.nipples} nipples so that they become hard in between your fingers and thumbs. You squeeze the tips of ${his} nipples with your thumbs and fingers and tweak them in your fingertips, then you dab ${his} nipples with your thumbs, flicking them in different directions. When you firmly pull ${his} nipples,`);
			if (slave.lactation > 0) {
				r.push(`milk streams out of them and`);
			}
			r.push(`${he} gasps audibly, unable to contain ${himself} at your relentless assault upon ${his} areola. When you put your mouth on ${his} breasts to nibble on ${his} nipples, ${he} bites ${his} lip, desperately trying to hide ${his} arousal at ${his} stimulated nipples.`);
		} else {
			if (slave.lactation > 0) {
				r.push(`milky`);
			}
			r.push(`${slave.nipples} nipples so that they tighten around your fingers. You push deeper in, rubbing their sides gently before forcing the entirety of your hands into ${his} breasts. When you cease fisting ${his} nipples and pull out${(slave.lactation > 0) ? ` alongside a stream of backed up milk` : ``}, ${he} gasps audibly, unable to contain ${himself} at your relentless assault upon ${his} boobs. When you put your mouth on ${his} breasts to lick ${his} slit, ${he} bites ${his} lip, desperately trying to hide ${his} arousal at ${his} stimulated nipples.`);
		}
		r.push(`When you finally stop, ${he} shakes uncontrollably, apprehensive at what you are going to do next.`);
	}

	if (slave.lactation > 0) {
		slave.lactationDuration = 2;
		slave.boobs -= slave.boobsMilk;
		slave.boobsMilk = 0;
	} else {
		r.push(induceLactation(slave));
	}
	App.Events.addParagraph(node, r);
	return node;
};
