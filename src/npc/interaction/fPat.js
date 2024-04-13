/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fPat = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He, His,
		he, his, him, himself, woman, girl, wife
	} = getPronouns(slave);

	const {title: Master, say: say} = getEnunciation(slave);

	const {
		hisP, womanP,
	} = getPronouns(V.PC).appendSuffix("P");

	slave.partners.add(-1);
	const isBald = slave.hStyle.includes("bald") || slave.bald === 1;

	r.push(`You tell ${slave.slaveName} to`);
	if (!hasAnyLegs(slave)) {
		r.push(`have another slave set ${him} up onto your desk.`);
	} else if (tooBigBreasts(slave)) {
		r.push(`have another slave help ${him} heft ${his} tits so ${he} can be near you.`);
	} else if (tooBigBelly(slave)) {
		r.push(`have another slave help ${him} heft ${his} belly so ${he} can be near you.`);
	} else if (tooBigButt(slave)) {
		r.push(`have another slave help ${him} heft ${his} ass cheeks so ${he} can be near you.`);
	} else if (tooBigDick(slave)) {
		r.push(`have another slave help ${him} heft ${his} cock so ${he} can be near you.`);
	} else if (tooBigBalls(slave)) {
		r.push(`have another slave help ${him} heft ${his} balls so ${he} can be near you.`);
	} else if (tooFatSlave(slave)) {
		r.push(`have another slave help ${him} up so ${he} can be near you.`);
	} else {
		r.push(`move closer towards you.`);
	}

	/* approach*/

	if (slave.fetish === Fetish.MINDBROKEN && slave.relationship !== -3) {
		r.push(`${He} complies robotically. ${He} remembers that when ${getWrittenTitle(slave)}'s commands are not obeyed, there is punishment.`);
	} else if (slave.relationship === -2) {
		r.push(`${He} eagerly complies, happy to be near the object of ${his} longing. Once ${he}'s close, you hold ${his} face in your palms and gaze deeply`);
		if (canSee(slave)) {
			r.push(`into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from the ${womanP} ${he} loves overwhelming, and ${his} eyes flick downward after a moment.`);
		} else {
			r.push(`upon ${his} face. ${He} finds the intense look from the ${womanP} ${he} loves overwhelming, and after a moment glances away.`);
		}
		r.push(`${He} blushes furiously.`);
	} else if (slave.relationship === -3) {
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} complies mechanically. ${He} remembers that when ${getWrittenTitle(slave)}'s commands are not obeyed, there is punishment. Once ${he}'s close, you hold ${his} face in your palms and look into ${his} empty ${App.Desc.eyesColor(slave)}. ${He} shows no reaction`);
		} else if (slave.devotion+slave.trust >= 175) {
			r.push(`${He} complies in a ${wife}ly fashion, moving ${his} body as ${he} approaches to best enflame your desire, eager to be close to the ${womanP} who married ${him}. Once ${he}'s close, you hold ${his} face in your palms and gaze`);
			if (canSee(slave)) {
				r.push(`deeply into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from the ${womanP} ${he}'s married to affirming, and looks down with a smile, running ${his} eyes over your`);
				if (V.PC.boobs >= 300) {
					r.push(`bosom.`);
				} else {
					r.push(`chest.`);
				}
			} else {
				r.push(`upon ${his} face. ${He} finds the intense look from the ${womanP} ${he}'s married to affirming, and looks down with a smile.`);
			}
		} else if (slave.devotion < -20 && slave.trust > 20) {
			r.push(`${He} complies. Once ${he}'s close, you hold ${his} face in your palms and take a moment to gaze deeply`);
			if (canSee(slave)) {
				r.push(`into ${his} tearful ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from the ${womanP} ${he}'s forcibly married too disturbing, and breaks eye contact.`);
			} else {
				r.push(`upon ${his} face. ${He} can feel the intense gaze of the ${womanP} ${he}'s forcibly married to, and finds it disturbing. ${He} quickly turns ${his} face away.`);
			}
		} else if (slave.devotion < -20) {
			r.push(`${He} complies out of fear. Once ${he}'s close, you hold ${his} quivering face in your palms and take a moment to gaze deeply`);
			if (canSee(slave)) {
				r.push(`into ${his} teary ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from the ${womanP} ${he}'s forcibly married to terrifying, and quickly breaks eye contact.`);
			} else {
				r.push(`upon ${his} tear-streaked face. ${He} can feel the intense look from the ${womanP} ${he}'s forcibly married to, and it is horrifying, causing ${him} to turn ${his} face away after only a moment.`);
			}
		} else {
			r.push(`${He} complies obediently. Once ${he}'s close, you hold ${his} face in your palms and take a moment to gaze deeply`);
			if (canSee(slave)) {
				r.push(`into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from the ${womanP} ${he}'s married to reassuring, and looks down with a slight smile, running ${his} eyes over your`);
				if (V.PC.boobs >= 300) {
					r.push(`bosom.`);
				} else {
					r.push(`chest.`);
				}
			} else {
				r.push(`upon ${his} face. The intense look from the ${womanP} ${he}'s married to is reassuring to ${him}, and ${he} looks down with a slight smile.`);
			}
		}
	} else if (slave.devotion > 75) {
		r.push(`${He} hurriedly complies, happy to be near you. Once ${he}'s close, you hold ${his} face in your palms and take a moment to gaze deeply`);
		if (canSee(slave)) {
			r.push(`into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from ${his} beloved ${getWrittenTitle(slave)} disconcerting, and ${his} eyes flick downward after a moment.`);
		} else {
			r.push(`upon ${his} face. ${He} can feel the intense look from ${his} beloved ${Master} and it is disconcerting, causing ${him} to glance away after only a moment, ${his} face flushed.`);
		}
		r.push(`${He} blushes furiously.`);
	} else if (slave.devotion > 50) {
		r.push(`${He} hurriedly complies, happy to be near you. Once ${he}'s close, you hold ${his} face in your palms and take a moment to gaze deeply`);
		if (canSee(slave)) {
			r.push(`into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense attention from ${his} ${getWrittenTitle(slave)} disconcerting, and ${he} looks down after a moment, blushing.`);
		} else {
			r.push(`upon ${his} face. ${He} finds the intense attention from ${his} ${getWrittenTitle(slave)} disconcerting, and it causes ${him} to glance away after only a moment, blushing.`);
		}
	} else if (slave.devotion > 20) {
		r.push(`${He} hurriedly complies, happy to be near you. Once ${he}'s close, you hold ${his} face in your palms and take a moment to gaze deeply`);
		if (canSee(slave)) {
			r.push(`into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense attention from ${his} ${getWrittenTitle(slave)} worrying, and ${he} looks down after a moment, blushing nervously.`);
		} else {
			r.push(`upon ${his} face. ${He} finds the intense attention from ${his} ${getWrittenTitle(slave)} worrying, and ${he} looks down after a moment, blushing nervously.`);
		}
	} else if (slave.devotion < -20 && slave.trust >= 20) {
		r.push(`${He} seems to visibly consider disobedience, but apparently decides your order is harmless enough. ${He} does as ${he} is told,`);
		if (canSee(slave)) {
			r.push(`giving you a defiant stare as ${he} does so.`);
		} else {
			r.push(`defiantly staring in your direction.`);
		}
	} else if (slave.devotion >= -20 && slave.trust >= -20) {
		r.push(`${He} visibly considers disobedience, but decides that complying with such an apparently harmless order is safe, for now. Once ${he}'s close, you hold ${his} face in your palms and take a moment to gaze deeply`);
		if (canSee(slave)) {
			r.push(`into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense attention from ${his}`);
			getWrittenTitle(slave);
			r.push(`troubling, and ${he} looks down after a moment, ${his} lower lip trembling with nervousness.`);
		} else {
			r.push(`upon ${his} face. ${He} finds the intense attention from ${his} ${getWrittenTitle(slave)} worrying, and turns away after a moment, ${his} lower lip trembling with nervousness.`);
		}
	} else if (slave.trust < -20) {
		r.push(`The command terrifies ${him}, but ${he}'s more frightened still of the consequences of disobedience, and ${he} complies. Once ${he}'s close, you hold ${his} face in your palms and take a moment to gaze deeply`);
		if (canSee(slave)) {
			r.push(`into ${his} ${App.Desc.eyesColor(slave)}. After a mere instant of locked faces, ${he} looks down fearfully and begins to shake with terror, tears leaking silently down ${his} cheeks.`);
		} else {
			r.push(`upon ${his} face. After a mere instant of locked faces, ${he} looks down fearfully and begins to shake with terror, tears leaking silently down ${his} cheeks.`);
		}
	} else {
		r.push(`${He} pauses, obviously considering whether to resist, but eventually decides to save ${his} strength to fight more onerous orders, and gives in. Once ${he}'s close, you hold ${his} face in your palms and take a moment to gaze deeply`);
		if (canSee(slave)) {
			r.push(`into ${his} ${App.Desc.eyesColor(slave)}. ${He} stares back, but after a few moments ${he} loses the contest of wills and looks down.`);
		} else {
			r.push(`upon ${his} face. ${He} faces you defiantly, but after a few moments ${he} loses the contest of wills and looks down.`);
		}
	}

	/* action */

	r.push(`You walk around ${him}, drawing closer and slowly resting your hand on ${his} head. You let it rest for a few seconds to get ${him} accustomed to your touch.`);
	if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`Tenderly and lovingly you brush your fingers along ${his} head, enjoying the feeling of your poor mentally shattered slave's inability to resist you. ${He} initially reacts slightly to your physical touch, but soon stops reacting completely. Nevertheless, you continue to gingerly stroke ${his}`);
		if (isBald) {
			r.push(`shaven scalp,`);
		} else {
			r.push(`hair,`);
		}
		r.push(`as you gently press ${his} body into your chest${!hasAnyLegs(slave) ? ` and onto your lap` : ``}. The warmth from your slave's body, and the action of petting ${his} head, combined with the sound of ${his} breathing, allow you to feel more relaxed by the minute.`);
	} else if ((slave.relationship === -3) && slave.devotion+slave.trust >= 175) {
		r.push(`Tenderly and lovingly you brush your fingers along ${his} head, enjoying the feeling of your slave's utterly willing submission. ${He} slowly leans ${his} body closer and closer to you${!hasAnyLegs(slave) ? ` and finally onto your lap` : ``}, relaxing as ${he} feels your caress. As ${he} shifts ${his} weight to your chest, ${he} feels all of the daily stresses of the day melt away, and a deep, happy sigh escapes ${his} lips. You smile fondly, allowing all of the troubles of being an arcology owner dissipate, in a similar fashion to your slave. For now, just for now, you are just a ${womanP} and ${hisP} devoted and content ${wife}.`);
	} else if (slave.relationship === -2) {
		r.push(`Tenderly and lovingly you brush your fingers along ${his} head, for a moment, appreciating how easily your slave submits to your desire to pat ${his} head. ${He} slowly leans ${his} body closer and closer to you${!hasAnyLegs(slave) ? ` allowing you to move ${him} onto your lap` : ``}, relaxing as ${he} feels your caresses. As ${his} weight falls onto you, all of the stress from ${his} body melts away, and a small, respectful sigh escapes ${his} pursed lips. You smile fondly, allowing all of the troubles of being an arcology owner drift away, in a similar fashion to your slave. For now, just for now, you are just a ${womanP} and ${hisP} devoted and content servant.`);
	} else if (slave.devotion > 50 && slave.fetish === "dom" && slave.fetishKnown === 1 && slave.fetishStrength > 60 && hasAnyArms(slave)) {
		r.push(`As you start to touch ${him} ${he} smiles at you and takes your hand, following its movements. You tenderly and lovingly kiss it and let it rest on the side of ${his} head, before continuing with your ministrations. As opposed to your more submissive slaves, ${slave.slaveName} takes an active role in your petting, gently guiding where your hand goes along ${his} head. You enjoy the feel of ${his} hand on yours, as well as ${his}`);
		if (isBald) {
			r.push(`smooth scalp.`);
		} else {
			r.push(`hair.`);
		}
	} else if (slave.devotion > 50 && slave.fetish === Fetish.SUBMISSIVE && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
		r.push(`${He} stiffens at your touch but slowly relaxes at the sensation of your hand on ${his} head. You tenderly and lovingly stroke your fingers along ${his} scalp, enjoying the feeling of your slave's subservience. ${He} gently, submissively, presses ${his} head against your hand, like a dog. As you continue`);
		if (isBald) {
			r.push(`kneading ${his} shaved scalp,`);
		} else {
			r.push(`stroking ${his} hair,`);
		}
		r.push(`${he} starts to clutch ${his} thighs, and if you listen you can hear subdued whimpers. ${He} looks up at you with adoring eyes, and relishes in the pureness of this act as ${his} master's pet to ${his} beloved ${getWrittenTitle(slave)}.`);
	} else if (slave.devotion > 50) {
		r.push(`${He} accepts it with devotion, leaning back into your gentle caresses. You tenderly and lovingly brush your fingers along ${his} head, enjoying the feeling of your slave's willingness to set aside ${his} dignity for headpats. ${He} leans ${his} body backward, pressing ${himself} against you. You can feel the intense heat from ${his} body against your`);
		if (V.PC.boobs >= 300) {
			r.push(`soft breasts.`);
		} else {
			r.push(`manly chest.`);
		}
		r.push(`You take your time enjoying the sensation of`);
		if (isBald) {
			r.push(`rubbing your slave's smooth scalp,`);
		} else {
			r.push(`gently running your fingers through your slave's hair,`);
		}
		r.push(`and your slave smiles happily as you do. As you continue with your ministrations, you can see all of the stress present in your slave's shoulders dissipate, and you feel a good deal of your own tension start to melt away as well.`);
	} else if (slave.devotion > 20) {
		r.push(`${He} willingly accepts it. As you tenderly and lovingly brush your fingers along ${his} head, enjoying the feeling of your slave's roiling emotions, and finally submission. You can still sense considerable turmoil in the`);
		if (slave.physicalAge > 30) {
			r.push(`${woman};`);
		} else {
			r.push(`${girl};`);
		}
		r.push(`${he}'s doing ${his} duty as a slave by complying with your wishes, and is probably struggling with the mixture of resistance, obedience and perhaps even devotion forced to the forefront of ${his} mind by your touch. As you continue your ministrations, your slave slowly, and with more then a bit of uncertainty, finally starts to relax. ${He} looks at you with confusion and trepidation. Your eyes betray nothing however — you simply smile and press ${his} head into your`);
		if (V.PC.boobs >= 300) {
			r.push(`soft breasts,`);
		} else {
			r.push(`masculine chest,`);
		}
		r.push(`all the while enjoying the feeling of your`);
		if (isBald) {
			r.push(`hands gliding over ${his} smooth head.`);
		} else {
			r.push(`fingers gliding through ${his} hair.`);
		}
	} else if (slave.devotion < -20 && slave.trust >= 20) {
		r.push(`${He} doesn't react to your touch, remaining as still as statue, the same defiant expression on ${his} face. ${He} still doesn't react when you brush your fingers down the side of ${his} head or when you`);
		if (isBald) {
			r.push(`stroke ${his} smooth head.`);
		} else {
			r.push(`run your fingers through ${his} hair.`);
		}
		r.push(`${He} does react when you gently rest your thumb on ${his} lips, however, by suddenly giving you a fierce bite. Cursing, you pull your hand back and examine it — ${he} didn't bite deep enough to draw blood, but the area is now red and puffy. Furious, you backhand ${him} across the`);
		if (random(1, 100) > 80) {
			slave.minorInjury = either("black eye", "bruise", "split lip");
			r.push(`face, giving ${him} a <span class="health dec">${slave.minorInjury}.</span>`);
		} else {
			r.push(`face.`);
		}
	} else if (slave.devotion >= -20 && slave.trust < -20) {
		r.push(`${He} shakes at your touch fearfully. As you tenderly brush your fingers down ${his} unresisting head, you appreciate this expression of your slave's subservience, ${his} eagerness to avoid punishment making ${him} stiffen, ${his} nervousness easily apparent. You continue stroking ${him}, enjoying ${his} fear, as the physical intimacy slowly does its work. ${He} starts to relax, ${his} resistance easing as ${his} eyes start to close. Your hands continue to gently scratch at ${his} scalp, and you enjoy the sensation as well as the feeling of power over your hapless slave. Gently, slowly, so not as to spook ${him}, you ease your property's head back into your`);
		if (V.PC.boobs >= 300) {
			r.push(`breasts.`);
		} else {
			r.push(`chest.`);
		}
		r.push(`Nevertheless your slave starts at the action, but at your insistence finally gives in to the motion, and finally relaxes against you.`);
	} else if (slave.trust < -50) {
		r.push(`${He} is nearly frozen with fear and does not resist as you tenderly and lovingly brush your fingers along ${his} head, enjoying your slave's complete and utter submission to you. In fact, ${he} barely reacts at all. But being an arcology owner has taught you many things, not least of which is patience. With time and a gentle hand, your slave's shoulders slowly start to relax, so slowly if you weren't paying attention you wouldn't have noticed. With a sense of satisfaction, you continue your actions, enjoying the feeling of your`);
		if (isBald) {
			r.push(`hand gliding over ${his} smooth head.`);
		} else {
			r.push(`fingers combing through ${his} hair and gently scritching ${his} scalp.`);
		}
		r.push(`You settle with this for now, knowing that any attempt at further intimacy will likely scare your slave off, but you enjoy it nonetheless.`);
	} else {
		r.push(`${He} reflexively turns away from you, but you tenderly hold ${his} chin and maneuver ${him} in position with one hand and slowly but gently move your other hand to the top of ${his} head. Spluttering, ${he} leans backwards, but you catch ${him} by the shoulder and pin ${him} against you, where you feel the intense heat from ${his} body against your`);
		if (V.PC.boobs >= 300) {
			r.push(`soft breasts,`);
		} else {
			r.push(`manly chest,`);
		}
		r.push(`before resuming your gentle stroking. ${He} desperately tries to wriggle out of your grasp, but ${his} struggles slowly subside as ${he} realizes that you're not taking this any farther. Tenderly and lovingly you stroke your fingers over ${his} head, appreciating the feeling of your slave's rebelliousness.`);
	}

	r.push(`You pat ${him} softly move your palm down the side of ${his} head with a soothing touch as you pet ${him}. Gently you start to run your hand down the back of ${his} head, softly stroking and caressing ${him}. You delicately lift ${his} head and touch your fingertips to ${his} chin, tenderly brushing along the line of ${his} mouth with your`);
	if (V.PC.title === 1) {
		r.push(`manly`);
	} else {
		r.push(`feminine`);
	}
	r.push(`thumb.`);

	if (isBald) {
		r.push(`Then, you gently touch ${his}`);
	} else {
		r.push(`You hold a strand of ${his} hair and softly place it behind ${his} ear, taking the chance to gently caress ${his}`);
	}
	if (slave.face > 95) {
		r.push(`overwhelmingly stunning`);
	} else if (slave.face > 10) {
		r.push(`alluring`);
	} else if (slave.face >= -10) {
		r.push(`appealing`);
	} else if (slave.face >= -40) {
		r.push(`plain`);
	} else {
		r.push(`rough`);
	}
	r.push(`face and lightly touch ${his}`);
	if (slave.lips > 95) {
		r.push(`facepussy`);
	} else {
		if (slave.lips > 70) {
			r.push(`pillowlike`);
		} else if (slave.lips > 40) {
			r.push(`generous`);
		} else if (slave.lips > 20) {
			r.push(`plush`);
		}
		r.push(`lips`);
	}
	r.push(`with your fingertips. You move your hand to the side of your slave's head, stroking ${his} temple gently.`);
	if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`This causes an unconscious shiver to travel down ${his} spine.`);
	} else if (slave.devotion > 50) {
		r.push(`This causes ${him} to shudder in delight and to move ${his} hand to your hip, squeezing it gently.`);
	} else if (slave.devotion > 20) {
		r.push(`This causes ${him} to shudder in delight.`);
	} else if (slave.devotion >= -20) {
		r.push(`This causes ${him} to shiver unconsciously.`);
	} else if (slave.trust <= -50) {
		r.push(`This forces ${his} back rigid, in an effort not to move`);
		if (V.showInches === 2) {
			r.push(`an inch,`);
		} else {
			r.push(`a centimeter,`);
		}
		r.push(`out of fear.`);
	} else if (slave.trust < -20) {
		r.push(`This would cause ${him} to shiver with delight, but ${his} distaste for the situation makes that impossible.`);
	}

	r.push(`You move your hand down to caress ${his} forehead, and then slide your hand along ${his} cheek. The last thing you do is take ${his} head lightly and trace around it, gently massaging as you go. Finally you pat ${him} a few times before letting ${him} up.`);

	/* outro + reaction */

	if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`When you stop,`);
		if (canSee(slave)) {
			r.push(`${his} ${App.Desc.eyesColor(slave)} track the movements of your hands briefly before returning to their usual stare,`);
		} else {
			r.push(`${he} stands at attention before you,`);
		}
		r.push(`awaiting further use of ${his} body.`);
	} else if (slave.relationship === -2) {
		r.push(`When you finally stop petting ${him},`);
		if (canSee(slave)) {
			r.push(`${his} eyes remain closed just for a second`);
		}
		r.push(`and ${his} mouth stands open in slack-jawed joy, before ${he} slowly`);
		if (canSee(slave)) {
			r.push(`opens ${his} eyes`);
		} else {
			r.push(`turns ${his} gaze towards you`);
		}
		r.push(`and smiles warmly at you. Pleasure lights up ${his} face`);
		if (hasAnyArms(slave)) {
			r.push(`as ${his} hand traces the path yours took up to ${his} head and mimics your last movements.`);
		} else {
			r.push(`as ${his} gaze drifts off to the right in memory, tilting ${his} head from side to side in sympathetic memory of how it felt to have your hand on ${his} head.`);
		}
		if (slave.accent >= 3) {
			r.push(`${He} does ${his} best to communicate love with ${his}`);
			if (canSee(slave)) {
				r.push(`${App.Desc.eyesColor(slave)},`);
			} else {
				r.push(`facial expressions,`);
			}
			r.push(`since ${he} does not speak ${V.language} well enough to express ${himself}.`);
		} else if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${He} does ${his} best to communicate love with ${his}`);
			if (canSee(slave)) {
				r.push(`${App.Desc.eyesColor(slave)}.`);
			} else {
				r.push(`facial expressions.`);
			}
		} else if (!canTalk(slave)) {
			r.push(`${He} signs that ${he} loves you.`);
		} else {
			r.push(
				Spoken(slave, `"I love you, ${Master},"`),
				`${he} ${say}s, dreamily.`
			);
		}
		r.push(`${He} looks as though ${he} wants much more than your mere caress.`);
	} else if (slave.devotion > 50 && slave.fetish === "dom" && slave.fetishKnown === 1 && slave.fetishStrength > 60 && hasAnyArms(slave)) {
		r.push(`${He} tries hard to stop from losing ${himself} in your incredibly skilled hands. ${He} takes ${his} tendency towards sexual dominance right up to the edge of insubordination, when ${he} starts to caress your face in turn. When you finally stop, ${his} eyes are closed and ${he}'s smiling. When you are finally finished stroking your slave, they remove their hand from yours. Then you give them a playful flick on the nose, and the mischievous twinkle in your eye is only half playful, reminding ${him} of ${his} place in these walls.`);
		if (slave.accent >= 3) {
			r.push(`${He} does ${his} best to communicate enjoyment with ${his}`);
			if (canSee(slave)) {
				r.push(`${App.Desc.eyesColor(slave)},`);
			} else {
				r.push(`facial expressions,`);
			}
			r.push(`since ${he} does not speak ${V.language} well enough to express ${himself}.`);
		} else if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${He} does ${his} best to communicate enjoyment with ${his}`);
			if (canSee(slave)) {
				r.push(`${App.Desc.eyesColor(slave)}.`);
			} else {
				r.push(`facial expressions.`);
			}
		} else if (!canTalk(slave)) {
			r.push(`${He} signs that ${he} liked that and would love to pet you next time.`);
		} else {
			r.push(
				Spoken(slave, `"That was nice, ${Master},"`),
				`${he} ${say}s cheerfully.`,
				Spoken(slave, `"Maybe next time I can stroke you..."`)
			);
		}
		r.push(`${He} looks at you, ${his}`);
		if (canSee(slave)) {
			r.push(`lovely ${App.Desc.eyesColor(slave)}`);
		} else {
			r.push(`face`);
		}
		r.push(`practically begging you to let ${him} take this farther.`);
	} else if (slave.devotion > 50 && slave.fetish === Fetish.SUBMISSIVE && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
		r.push(`As you stroke ${his} head, ${he} reacts almost as though you're stroking ${his} nether regions, and begins to moan and press ${himself} lewdly against your`);
		if (V.PC.boobs >= 1400) {
			r.push(`giant tits.`);
		} else if (V.PC.boobs >= 1200) {
			r.push(`huge breasts.`);
		} else if (V.PC.boobs >= 1000) {
			r.push(`big breasts.`);
		} else if (V.PC.boobs >= 800) {
			r.push(`prominent breasts.`);
		} else if (V.PC.boobs >= 650) {
			r.push(`unremarkable breasts.`);
		} else if (V.PC.boobs >= 500) {
			r.push(`breasts.`);
		} else if (V.PC.boobs >= 300) {
			r.push(`tiny breasts.`);
		} else if (V.PC.title > 0) {
			r.push(`manly chest.`);
		} else {
			r.push(`non-existent breasts.`);
		}
		r.push(`${He} achieves a weak orgasm before you finally stop caressing ${his} head; ${he} is your pet, after all.`);
		if (slave.accent >= 3) {
			r.push(`${He} does ${his} best to communicate undiminished lust with ${his}`);
			if (canSee(slave)) {
				r.push(`${App.Desc.eyesColor(slave)},`);
			} else {
				r.push(`facial expressions,`);
			}
			r.push(`since ${he} does not speak ${V.language} well enough to express ${himself}.`);
		} else if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${He} does ${his} best to communicate undiminished lust with ${his}`);
			if (canSee(slave)) {
				r.push(`${App.Desc.eyesColor(slave)}.`);
			} else {
				r.push(`facial expressions.`);
			}
		} else if (!canTalk(slave)) {
			r.push(`${He} signs that ${he} liked that.`);
		} else {
			r.push(
				Spoken(slave, `"That was fun, ${Master},"`),
				`${he} ${say}s lustfully.`,
				Spoken(slave, `"But why stop there?"`)
			);
		}
		r.push(`${He} looks at you as if ${he} wants more than your hands touching ${his} head.`);
	} else if (slave.devotion > 50) {
		r.push(`${He} gradually closes ${his} eyes and when you finally stop,`);
		if (hasAnyArms(slave)) {
			r.push(`${he} runs ${his} hand delightedly across ${his} face and`);
		}
		r.push(`a euphoric look quickly lights up ${his} features.`);
		if (slave.accent >= 3) {
			r.push(`${He} does ${his} best to communicate devotion with ${his}`);
			if (canSee(slave)) {
				r.push(`${App.Desc.eyesColor(slave)},`);
			} else {
				r.push(`facial expressions,`);
			}
			r.push(`since ${he}'s not confident in ${his} ability to express it in ${V.language}.`);
		} else if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${He} does ${his} best to communicate devotion with ${his}`);
			if (canSee(slave)) {
				r.push(`${App.Desc.eyesColor(slave)}.`);
			} else {
				r.push(`facial expressions.`);
			}
		} else if (!canTalk(slave)) {
			r.push(`${He} signs that ${he} loves you.`);
		} else {
			r.push(
				Spoken(slave, `"I love you, ${Master},"`),
				`${he} ${say}s jubilantly.`
			);
		}
		r.push(`${He}`);
		if (canSee(slave)) {
			r.push(`looks`);
		} else {
			r.push(`gazes`);
		}
		r.push(`at you longingly, almost as if ${he}'s bursting to say that ${he} wants more than your mere caress.`);
	} else if (slave.devotion > 20) {
		r.push(`When you finally move your hand away,`);
		if (canSee(slave)) {
			r.push(`${his} ${App.Desc.eyesColor(slave)} gaze into yours searchingly,`);
		} else {
			r.push(`${he} gazes at you,`);
		}
		r.push(`looking for answers that are not there.`);
		if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${His}`);
			if (canSee(slave)) {
				r.push(`eyes beg`);
			} else {
				r.push(`expression begs`);
			}
			r.push(`for an answer: is that it?`);
		} else if (!canTalk(slave)) {
			r.push(`${He} signs hesitantly, asking if that's all.`);
		} else {
			r.push(
				`${He} asks hesitantly,`,
				Spoken(slave, `"I-is that all, ${Master}?"`)
			);
		}
	} else if (slave.devotion < -20 && slave.trust >= 20) {
		r.push(`${He} does little more than give another defiant glare as you pull away.`);
		/* TODO: write this */
	} else if (slave.devotion >= -20 && slave.trust < -20) {
		r.push(`When you finally move your hand away, ${he}`);
		if (canSee(slave)) {
			r.push(`looks`);
		} else {
			r.push(`gazes`);
		}
		r.push(`at you for a long moment, as if looking for answers, before visibly catching ${himself} with a reminder that ${he}'s a slave and you're ${his} owner.`);
		if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${His}`);
			if (canSee(slave)) {
				r.push(`eyes hesitantly question`);
			} else {
				r.push(`expression hesitantly questions`);
			}
			r.push(`for an answer: is that it?`);
		} else if (!canTalk(slave)) {
			r.push(`${He} signs hesitantly, asking if that's all.`);
		} else {
			r.push(
				`${He} asks hesitantly,`,
				Spoken(slave, `"I-is that all, ${Master}?"`)
			);
		}
	} else if (slave.trust < -50) {
		r.push(`${He} stares`);
		if (canSee(slave)) {
			r.push(`at you`);
		} else {
			r.push(`blankly`);
		}
		r.push(`as you move your fingers across ${his} stiff head, but it's like touching a statue. ${He} is so filled with terror that ${he} remains rigid even as it becomes clear to ${him} you're not going to hurt ${him}. When you bore of touching the`);
		if (slave.physicalAge > 30) {
			r.push(`${woman}`);
		} else {
			r.push(`${girl}`);
		}
		r.push(`and move your hand away, ${he} turns to you in utter incomprehension.`);
		if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${His}`);
			if (canSee(slave)) {
				r.push(`eyes beg`);
			} else {
				r.push(`expression begs`);
			}
			r.push(`beg for an answer: is that it?`);
		} else if (!canTalk(slave)) {
			r.push(`${He} signs spastically, asking fearfully to know if that's all.`);
		} else {
			r.push(
				`${He} stammers fearfully, although somewhat less then before this session,`,
				Spoken(slave, `"I-is that all, ${Master}?"`)
			);
		}
		r.push(`${He} then cringes.`);
	} else {
		r.push(`When you bore of it and take your hand away, ${he} faces you in utter incomprehension.`);
		if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${His}`);
			if (canSee(slave)) {
				r.push(`eyes demand`);
			} else {
				r.push(`expression demands`);
			}
			r.push(`an answer: is that it?`);
		} else if (!canTalk(slave)) {
			r.push(`${He} signs irritably, asking whether that's all.`);
		} else {
			r.push(
				`${He} scowls, muttering,`,
				Spoken(slave, `"Is that all, ${Master}?"`)
			);
		}
	}
	App.Events.addParagraph(node, r);
	return node;
};
