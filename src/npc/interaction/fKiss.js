/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fKiss = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He, His,
		he, his, him, himself, wife, woman, girl
	} = getPronouns(slave);

	const {title: Master, say: say} = getEnunciation(slave);

	const {womanP} = getPronouns(V.PC).appendSuffix("P");
	/** @type {FC.MouthAccessory|""} */
	let assignedGag = "";
	r.push(`You tell ${slave.slaveName} to`);
	switch (slave.mouthAccessory) {
		case "none":
			if (canMove(slave)) {
				r.push(`approach you.`);
			} else {
				r.push(`have another slave help ${him} to your desk.`);
			}
			break;
		case "dildo gag":
			if (hasAnyArms(slave) && canMove(slave)) {
				r.push(`remove ${his} dildo gag and approach you.`);
			} else {
				r.push(`have another slave remove ${his} dildo gag and set ${him} down on your desk.`);
			}
			assignedGag = slave.mouthAccessory;
			slave.mouthAccessory = "none";
			break;
		case "massive dildo gag":
			if (hasAnyArms(slave) && canMove(slave)) {
				r.push(`pull ${his} enormous dildo gag out of the depths of ${his} throat and approach you.`);
			} else {
				r.push(`have another slave pull the enormous dildo gag out of the depths of ${his} throat and set ${him} down on your desk.`);
			}
			assignedGag = slave.mouthAccessory;
			slave.mouthAccessory = "none";
			break;
		default:
			if (hasAnyArms(slave) && canMove(slave)) {
				r.push(`undo ${his} gag and approach you.`);
			} else {
				r.push(`have another slave undo ${his} gag and set ${him} down on your desk.`);
			}
			assignedGag = slave.mouthAccessory;
			slave.mouthAccessory = "none";
	}

	if (slave.fetish === Fetish.MINDBROKEN && slave.relationship !== -3) {
		r.push(`${He} complies mechanically. ${He} remembers that when ${getWrittenTitle(slave)}'s commands are not obeyed, there is punishment.`);
	} else if (slave.relationship === -2) {
		r.push(`${He} hurriedly complies, happy to be near the object of ${his} longing. Once ${he}'s close, you take a moment to gaze deeply`);
		if (canSee(slave)) {
			r.push(`into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from the ${womanP} ${he} loves overwhelming, and ${his} eyes flick downward after a moment.`);
		} else {
			r.push(`upon ${his} face. ${He} senses the intense look from the ${womanP} ${he} loves and finds it overwhelming, and after a moment glances away.`);
		}
		r.push(`${He} blushes furiously.`);
	} else if (slave.relationship === -3) {
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${He} complies mechanically. ${He} remembers that when ${getWrittenTitle(slave)}'s commands are not obeyed, there is punishment. You kiss ${him} deeply and intensely; ${he} doesn't understand why.`);
		} else if (slave.devotion + slave.trust >= 175) {
			r.push(`${He} complies in a ${wife}ly fashion, moving ${his} body as ${he} approaches to best catch your desire. Once ${he}'s close, you take a moment to gaze deeply`);
			if (canSee(slave)) {
				r.push(`into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from the ${womanP} ${he}'s married to affirming, and looks down with a smile, running ${his} eyes over your`);
				if (V.PC.boobs >= 300) {
					r.push(`bosom.`);
				} else {
					r.push(`chest.`);
				}
			} else {
				r.push(`upon ${his} face. ${He} senses the intense look from the ${womanP} ${he}'s married to and finds it affirming, and looks down with a smile.`);
			}
		} else if (slave.devotion < -20 && slave.trust > 20) {
			r.push(`${He} complies. Once ${he}'s close, you take a moment to gaze deeply`);
			if (canSee(slave)) {
				r.push(`into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from the ${womanP} ${he}'s forcibly married to disturbing, and quickly breaks eye contact.`);
			} else {
				r.push(`upon ${his} face. ${He} senses the intense look from the ${womanP} ${he}'s forcibly married to and finds it disturbing, and quickly turns ${his} face away.`);
			}
		} else if (slave.devotion < -20) {
			r.push(`${He} complies fearfully. Once ${he}'s close, you take a moment to gaze deeply`);
			if (canSee(slave)) {
				r.push(`into ${his} tearing ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from the ${womanP} ${he}'s forcibly married to horrifying, and quickly breaks eye contact.`);
			} else {
				r.push(`upon ${his} tear-streaked face. ${He} senses the intense look from the ${womanP} ${he}'s forcibly married to and finds it horrifying, and quickly turns ${his} face away.`);
			}
		} else {
			r.push(`${He} complies obediently. Once ${he}'s close, you take a moment to gaze deeply`);
			if (canSee(slave)) {
				r.push(`into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from the ${womanP} ${he}'s married to reassuring, and looks down with a slight smile, running ${his} eyes over your`);
				if (V.PC.boobs >= 300) {
					r.push(`bosom.`);
				} else {
					r.push(`chest.`);
				}
			} else {
				r.push(`upon ${his} face. ${He} senses the intense look from the ${womanP} ${he}'s married to and finds it reassuring, and looks down with a slight smile.`);
			}
		}
	} else if (slave.devotion > 75) {
		r.push(`${He} hurriedly complies, happy to be near you. Once ${he}'s close, you take a moment to gaze deeply`);
		if (canSee(slave)) {
			r.push(`into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from ${his} beloved ${getWrittenTitle(slave)} disconcerting, and ${his} eyes flick downward after a moment.`);
		} else {
			r.push(`upon ${his} face. ${He} senses the intense look from ${his} beloved ${getWrittenTitle(slave)} and finds it disconcerting, and after a moment glances away.`);
		}
		r.push(`${He} blushes furiously.`);
	} else if (slave.devotion > 50) {
		r.push(`${He} hurriedly complies, happy to be near you. Once ${he}'s close, you take a moment to gaze deeply`);
		if (canSee(slave)) {
			r.push(`into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense attention from ${his} ${getWrittenTitle(slave)} disconcerting, and ${he} looks down after a moment, blushing.`);
		} else {
			r.push(`upon ${his} face. ${He} finds the intense attention from ${his} ${getWrittenTitle(slave)} disconcerting, and ${he} looks down after a moment, blushing.`);
		}
	} else if (slave.devotion > 20) {
		r.push(`${He} hurriedly complies, happy to be near you. Once ${he}'s close, you take a moment to gaze deeply`);
		if (canSee(slave)) {
			r.push(`into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense attention from ${his} ${getWrittenTitle(slave)} worrying, and ${he} looks down after a moment, blushing nervously.`);
		} else {
			r.push(`upon ${his} face. ${He} finds the intense attention from ${his} ${getWrittenTitle(slave)} worrying, and ${he} looks down after a moment, blushing nervously.`);
		}
	} else if (slave.devotion >= -20 && slave.trust >= -20) {
		r.push(`${He} visibly considers disobedience, but decides that complying with such an apparently harmless order is safe, for now. Once ${he}'s close, you take a moment to gaze deeply`);
		if (canSee(slave)) {
			r.push(`into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense attention from ${his} ${getWrittenTitle(slave)} worrying, and ${he} looks down after a moment, ${his} lower lip trembling with nervousness.`);
		} else {
			r.push(`upon ${his} face. ${He} finds the intense attention from ${his} ${getWrittenTitle(slave)} worrying, and turns away after a moment, ${his} lower lip trembling with nervousness.`);
		}
	} else if (slave.trust < -20) {
		r.push(`The command terrifies ${him}, but ${he}'s more frightened still of the consequences of disobedience, and ${he} complies. Once ${he}'s close, you take a moment to gaze deeply`);
		if (canSee(slave)) {
			r.push(`into ${his} ${App.Desc.eyesColor(slave)}. After a mere instant of locked gazes, ${he} looks down fearfully, and begins to shake with terror, tears leaking silently down ${his} cheeks.`);
		} else {
			r.push(`upon ${his} face. After a mere instant of locked faces, ${he} looks down fearfully, and begins to shake with terror, tears leaking silently down ${his} cheeks.`);
		}
	} else {
		r.push(`${He} pauses, obviously considering whether to resist, but eventually decides to save ${his} strength to fight more onerous orders, and gives in. Once ${he}'s close, you take a moment to gaze deeply`);
		if (canSee(slave)) {
			r.push(`into ${his} ${App.Desc.eyesColor(slave)}. ${He} stares back, but after a few moments ${he} loses the contest of wills and looks down.`);
		} else {
			r.push(`upon ${his} face. ${He} faces you defiantly, but after a few moments ${he} loses the contest of wills and looks down.`);
		}
	}

	r.push(`You extend a`);
	if (V.PC.title === 1) {
		r.push(`manly`);
	} else {
		r.push(`feminine`);
	}
	r.push(`hand and graze your fingertips along the line of ${his} cheekbone.`);
	if (slave.lipsTat !== 0) {
		r.push(`Your fingers trace ${his} facial tattoos, slowly picking out the patterns against ${his} ${slave.skin} skin.`);
	}
	if (slave.piercing.lips.weight + slave.piercing.tongue.weight > 2) {
		r.push(`You touch each of ${his} facial piercings, one by one, feeling the hard metal contrast with ${his} pliant flesh.`);
	}
	r.push(`Then, you gently raise ${his}`);
	if (slave.face > 95) {
		r.push(`heartrendingly beautiful`);
	} else if (slave.face > 10) {
		r.push(`lovely`);
	} else if (slave.face >= -10) {
		r.push(`pretty`);
	} else if (slave.face >= -40) {
		r.push(`homely`);
	} else {
		r.push(`ugly`);
	}
	r.push(`chin and kiss ${him} right on ${his}`);
	if (slave.lips > 95) {
		r.push(`facepussy.`);
	} else {
		if (slave.lips > 70) {
			r.push(`pillowlike`);
		} else if (slave.lips > 40) {
			r.push(`generous`);
		} else if (slave.lips > 20) {
			r.push(`plush`);
		}
		r.push(`lips.`);
	}

	if (slave.relationship === -3) {
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`${His} mouth opens to accept the kiss, and is compliant with your questing tongue. You kiss your broken ${wife} deeply. ${His} posture remains completely unchanged. Being kissed affects ${him} as little as being penetrated, being struck, being loved, or being your ${wife}: not at all. When you pull away,`);
			if (canSee(slave)) {
				r.push(`${his} ${App.Desc.eyesColor(slave)} track you carefully, awaiting further use of ${his} body.`);
			} else {
				r.push(`${he} exposes ${himself} to you, awaiting further use of ${his} body.`);
			}
		} else if (slave.devotion + slave.trust >= 175) {
			r.push(`${His} mouth accepts yours with love, matching itself perfectly to your insistent lips and tongue.`);
			if (App.Medicine.Modification.teeth.get(slave.teeth).sharp) {
				r.push(`(Though you're quite careful around ${his} sharp dentition.)`);
			}
			r.push(`${He} melts into you, sighing ever so gently. When you finally break the kiss, ${his} mouth freezes in the shape it was in when last your lips touched, and a momentary look of longing crosses ${his} face.`);
			if (hasAnyArms(slave)) {
				r.push(`A hand reaches dumbly up to ${his} mouth to trace ${his} lips where yours last touched.`);
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
				r.push(Spoken(slave, `"I love you, ${Master}," ${he} says dreamily.`));
			}
		} else if (slave.devotion < -20 && slave.trust > 20) {
			r.push(`${He} reflexively turns ${his} head away from you, but you catch your ${wife} by ${his} jaw and kiss ${him} harder. You wrap your arms around ${him} so ${he} cannot escape. ${He} wriggles desperately, but ${his} struggles slowly subside as ${he} realizes that you're not taking this any farther. When you bore of it and pull away, ${he} glares at you.`);
			if (!hasAnyArms(slave) && !canTalk(slave)) {
				r.push(`${His}`);
				if (canSee(slave)) {
					r.push(`eyes demand`);
				} else {
					r.push(`expression demands`);
				}
				r.push(`an answer: are you done?`);
			} else if (!canTalk(slave)) {
				r.push(`${He} signs irritably, asking if you're done.`);
			} else {
				r.push(`${He} splutters, "Are you done, ${Master}?"`);
			}
		} else if (slave.devotion < -20) {
			r.push(`${He} is nearly frozen with fear, and does not resist as you kiss ${him} deeply. In fact, ${he} barely reacts at all. ${He} opens ${his} mouth mechanically in response to your insistent tongue, but it's like kissing a doll. ${He} is so filled with terror that ${he} remains stiff even as it becomes clear to ${him} you're not going to hurt ${him}. When you bore of making out with your ${wife} and pull away, ${he} stares at you in utter incomprehension.`);
			if (!hasAnyArms(slave) && !canTalk(slave)) {
				r.push(`${His}`);
				if (canSee(slave)) {
					r.push(`eyes beg`);
				} else {
					r.push(`expression begs`);
				}
				r.push(`for an answer: is that it?`);
			} else if (!canTalk(slave)) {
				r.push(`${He} signs spastically, begging fearfully to know if that's it.`);
			} else {
				r.push(`${He} asks nervously before cringing, "I-is that it, ${Master}?"`);
			}
		} else {
			r.push(`${He} accepts the kiss willingly. As you are so close to ${him}, you sense considerable turmoil in the`);
			if (slave.physicalAge > 30) {
				r.push(`${woman};`);
			} else {
				r.push(`${girl};`);
			}
			r.push(`${he}'s doing ${his} duty as a ${wife} by complying with your wishes, and is probably struggling with the mixture of resistance, obedience and perhaps even devotion forced to the forefront of ${his} mind by your lips and tongue. When you finally break the kiss,`);
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
				r.push(`${He} signs hesitantly, asking if that's it.`);
			} else {
				r.push(`${He} asks hesitantly, "I-is that it, ${Master}?"`);
			}
		}
	} else if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`${His} mouth opens to accept the kiss, and is compliant with your questing tongue. ${His} posture remains completely unchanged. Being kissed affects ${him} as little as being penetrated, being struck, or being loved: not at all. When you pull away,`);
		if (canSee(slave)) {
			r.push(`${his} ${App.Desc.eyesColor(slave)} track you carefully, awaiting further use of ${his} body.`);
		} else {
			r.push(`${he} exposes ${himself} to you, awaiting further use of ${his} body.`);
		}
	} else if (slave.relationship === -2) {
		r.push(`${His} mouth accepts yours with love, matching itself perfectly to your insistent lips and tongue.`);
		if (App.Medicine.Modification.teeth.get(slave.teeth).sharp) {
			r.push(`(Though you're quite careful around ${his} sharp dentition.)`);
		}
		r.push(`${He} melts into you, sighing ever so gently. When you finally break the kiss, ${his} mouth freezes in the shape it was in when last your lips touched, and a momentary look of longing crosses ${his} face.`);
		if (hasAnyArms(slave)) {
			r.push(`A hand reaches dumbly up to ${his} mouth to trace ${his} lips where yours last touched.`);
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
			r.push(Spoken(slave, `"I love you, ${Master},"`));
			r.push(`${he} ${say}s dreamily.`);
		}
	} else if (slave.devotion > 50 && slave.fetish === "dom" && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
		r.push(`${He} giggles into you and kisses you back with vigor, ${his} head pressing insistently forward. The two of you make out rather`);
		if (slave.teeth === "pointy") {
			r.push(`aggressively, ${his} sharp teeth drawing a bit of blood from your lips and tongue.`);
		} else if (slave.teeth === "fangs") {
			r.push(`aggressively, ${his} fangs drawing a bit of blood from your lips and tongue.`);
		} else if (slave.teeth === "fang") {
			r.push(`aggressively, ${his} pointy fang drawing a bit of blood from your lips and tongue.`);
		} else {
			r.push(`aggressively.`);
		}
		r.push(`${He} takes ${his} tendency towards sexual dominance right up to the edge of insubordination, ${his} active tongue only retreating when yours presses against it. When you finally shove ${him} away, ${he}'s breathing hard through ${his} grin.`);
		if (slave.accent >= 3) {
			r.push(`${He} does ${his} best to communicate excitement with ${his}`);
			if (canSee(slave)) {
				r.push(`${App.Desc.eyesColor(slave)},`);
			} else {
				r.push(`facial expressions,`);
			}
			r.push(`since ${he} does not speak ${V.language} well enough to express ${himself}.`);
		} else if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${He} does ${his} best to communicate excitement with ${his}`);
			if (canSee(slave)) {
				r.push(`${App.Desc.eyesColor(slave)}.`);
			} else {
				r.push(`facial expressions.`);
			}
		} else if (!canTalk(slave)) {
			r.push(`${He} signs that ${he} liked that.`);
		} else {
			r.push(Spoken(slave, `"That was fun, ${Master},"`));
			r.push(`${he} ${say}s cheerfully.`);
		}
	} else if (slave.devotion > 50 && slave.fetish === "cumslut" && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
		r.push(`${He} stiffens with arousal. ${His} sexuality is complex, focusing on cum, but with a heavy layer of oral fixation. As your tongue plunders ${his} mouth, ${he} reacts almost as though ${he}'s receiving oral, whimpering and moaning into you and pressing ${himself} lewdly against your`);
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
		if (App.Medicine.Modification.teeth.get(slave.teeth).sharp) {
			if (slave.teeth === "pointy") {
				r.push(`${He}'s very careful to avoid spearing your tongue with ${his} sharp teeth.`);
			} else if (slave.teeth === "fangs") {
				r.push(`${He}'s very careful to avoid spearing your tongue with ${his} fangs.`);
			} else if (slave.teeth === "fang") {
				r.push(`${He}'s very careful to avoid poking you with ${his} fang.`);
			}
		}
		r.push(`${He} achieves a weak orgasm before you tire of making out with ${him}.`);
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
			r.push(Spoken(slave, `"That was fun, ${Master},"`));
			r.push(`${he} ${say}s lustfully.`);
		}
	} else if (slave.devotion > 50) {
		r.push(`${His} mouth accepts yours with devotion, matching itself carefully to your insistent lips and tongue.`);
		if (App.Medicine.Modification.teeth.get(slave.teeth).sharp) {
			if (slave.teeth === "pointy") {
				r.push(`${He} is exquisitely careful to keep ${his} sharp teeth clear of you.`);
			} else if (slave.teeth === "fangs") {
				r.push(`${He} is exquisitely careful to keep ${his} fangs from poking you.`);
			} else if (slave.teeth === "fang") {
				r.push(`${He} is exquisitely careful to keep ${his} fang from getting into trouble.`);
			}
		}
		r.push(`${He} presses ${himself} against you, ${his} warmth wonderful against your`);
		if (V.PC.boobs >= 1400) {
			r.push(`expansive`);
			if (V.PC.boobsImplant / V.PC.boobs >= .60) {
				r.push(`firm`);
			} else {
				r.push(`soft`);
			}
			r.push(`chest.`);
		} else if (V.PC.boobs >= 1200) {
			r.push(`huge`);
			if (V.PC.boobsImplant / V.PC.boobs >= .60) {
				r.push(`firm`);
			} else {
				r.push(`soft`);
			}
			r.push(`breasts.`);
		} else if (V.PC.boobs >= 1000) {
			r.push(`big`);
			if (V.PC.boobsImplant / V.PC.boobs >= .60) {
				r.push(`firm`);
			} else {
				r.push(`soft`);
			}
			r.push(`breasts.`);
		} else if (V.PC.boobs >= 800) {
			r.push(`soft breasts.`);
		} else if (V.PC.boobs >= 500) {
			r.push(`breasts.`);
		} else if (V.PC.boobs >= 300) {
			r.push(`small chest.`);
		} else if (V.PC.title > 0) {
			r.push(`manly chest.`);
		} else {
			r.push(`flat chest.`);
		}
		r.push(`When you finally break the kiss, ${he} runs ${his} tongue rapturously across ${his} moistened lips${hasAnyArms(slave) ? ` and then runs a finger across them as well` : ``}, an openly sexual look on ${his} ${slave.skin} face.`);
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
			r.push(Spoken(slave, `"I love you, ${Master},"`));
			r.push(`${he} ${say}s forthrightly.`);
		}
	} else if (slave.devotion > 20) {
		r.push(`${He} accepts the kiss willingly. As you are so close to ${him}, you sense considerable turmoil in the`);
		if (slave.physicalAge > 30) {
			r.push(`${woman};`);
		} else {
			r.push(`${girl};`);
		}
		r.push(`${he}'s doing ${his} duty as a slave by complying with your wishes, and is probably struggling with the mixture of resistance, obedience and perhaps even devotion forced to the forefront of ${his} mind by your lips and tongue. When you finally break the kiss,`);
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
			r.push(`${He} signs hesitantly, asking if that's it.`);
		} else {
			r.push(`${He} asks hesitantly,`);
			r.push(Spoken(slave, `"I-is that it, ${Master}?"`));
		}
	} else if (slave.devotion >= -20 && slave.trust < -20) {
		r.push(`${He} accepts the kiss fearfully. As you kiss ${his} unresisting mouth, ${his} eagerness to avoid punishment leads ${him} to kiss you back, though nervousness makes ${him} mechanical. You kiss ${him} harder, enjoying ${his} fear, and the physical intimacy slowly does its work. ${He} becomes softer and more natural, ${his} resistance easing. When you pull away from ${him} for a moment, ${he}`);
		if (canSee(slave)) {
			r.push(`looks`);
		} else {
			r.push(`gazes`);
		}
		r.push(`at you for a long moment, ${his} mouth still hanging open, before visibly catching ${himself} with a reminder that ${he}'s a slave and you're ${his} owner.`);
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
			r.push(
				`${He} asks hesitantly,`,
				Spoken(slave, `"I-is that it, ${Master}?"`)
			);
		}
	} else if (slave.trust < -50) {
		r.push(`${He} is nearly frozen with fear, and does not resist as you kiss ${him}. In fact, ${he} barely reacts at all. ${He} opens ${his} mouth mechanically in response to your insistent tongue, but it's like kissing a doll. ${He} is so filled with terror that ${he} remains stiff even as it becomes clear to ${him} you're not going to hurt ${him}. When you bore of making out with the poor`);
		if (slave.physicalAge > 30) {
			r.push(`${woman}`);
		} else {
			r.push(`${girl}`);
		}
		r.push(`and pull away, ${he} stares at you in utter incomprehension.`);
		if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${His}`);
			if (canSee(slave)) {
				r.push(`eyes beg`);
			} else {
				r.push(`expression begs`);
			}
			r.push(`for an answer: is that it?`);
		} else if (!canTalk(slave)) {
			r.push(`${He} signs spastically, begging fearfully to know if that's it.`);
		} else {
			r.push(
				`${He} asks nervously before cringing,`,
				Spoken(slave, `"I-is that it, ${Master}?"`)
			);
		}
	} else {
		r.push(`${He} reflexively turns ${his} head away from you, but you catch ${his} jaw and kiss ${him} harder. Spluttering, ${he} flees backwards, but you tip forward with ${him} and pin ${him} against your desk, plundering ${his} mouth without mercy. ${He} wriggles desperately, but ${his} struggles slowly subside as ${he} realizes that you're not taking this any farther. When you bore of it and pull away, ${he} stares at you in utter incomprehension.`);
		if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${His}`);
			if (canSee(slave)) {
				r.push(`eyes demand`);
			} else {
				r.push(`expression demands`);
			}
			r.push(`an answer: is that it?`);
		} else if (!canTalk(slave)) {
			r.push(`${He} signs irritably, asking whether that's it.`);
		} else {
			r.push(
				`${He} splutters,`,
				Spoken(slave, `"Is that it, ${Master}!?"`)
			);
		}
	}

	if (assignedGag) {
		slave.mouthAccessory = assignedGag;
	}
	App.Events.addParagraph(node, r);
	return node;
};
