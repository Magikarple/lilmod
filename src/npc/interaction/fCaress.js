/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fCaress = function(slave) {
	const frag = new DocumentFragment();

	const {
		He, His,
		he, his, him, himself, hers, woman, girl
	} = getPronouns(slave);

	const {title: Master, say} = getEnunciation(slave);

	const {woman: womanP} = getPronouns(V.PC);

	const text = new SpacedTextAccumulator(frag);

	text.push(
		intro(),
		setup(),
		consummation(),
	);

	text.toParagraph();

	return frag;

	function intro() {
		const text = [];

		text.push(`You tell ${slave.slaveName} to`);

		if (!hasAnyLegs(slave)) {
			text.push(`have another slave set ${him} down on your desk.`);
		} else if (tooBigBreasts(slave)) {
			text.push(`have another slave help ${him} heft ${his} tits so ${he} can be near you.`);
		} else if (tooBigBelly(slave)) {
			text.push(`have another slave help ${him} heft ${his} belly so ${he} can be near you.`);
		} else if (tooBigButt(slave)) {
			text.push(`have another slave help ${him} heft ${his} ass cheeks so ${he} can be near you.`);
		} else if (tooBigDick(slave)) {
			text.push(`have another slave help ${him} heft ${his} cock so ${he} can be near you.`);
		} else if (tooBigBalls(slave)) {
			text.push(`have another slave help ${him} heft ${his} balls so ${he} can be near you.`);
		} else if (tooFatSlave(slave)) {
			text.push(`have another slave help ${him} up so ${he} can be near you.`);
		} else {
			text.push(`move closer towards you.`);
		}

		return text.join(' ');
	}

	function setup() {
		const text = [];

		if (slave.fetish === Fetish.MINDBROKEN && slave.relationship !== -3) {
			text.push(`${He} complies mechanically. ${He} remembers that when getWrittenTitle(slave)'s commands are not obeyed, there is punishment.`);
		} else if (slave.relationship === -2) {
			text.push(`${He} eagerly complies, happy to be near the object of ${his} longing. Once ${he}'s close, you hold ${his} face in your palms and gaze deeply`);

			if (canSee(slave)) {
				text.push(`into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from the ${womanP} ${he} loves overwhelming, and ${his} eyes flick downward after a moment.`);
			} else {
				text.push(`upon ${his} face. ${He} senses the intense look from the ${womanP} ${he} loves and finds it overwhelming, and after a moment glances away.`);
			}

			text.push(`${He} blushes furiously.`);
		} else if (slave.relationship === -3) {
			if (slave.fetish === Fetish.MINDBROKEN) {
				text.push(`${He} complies mechanically. ${He} remembers that when ${getWrittenTitle(slave)}'s commands are not obeyed, there is punishment. Once ${he}'s close, you hold ${his} face in your palms and look into ${his} blank ${App.Desc.eyesColor(slave)}. ${He} doesn't react.`);
			} else if (slave.devotion+slave.trust >= 175) {
				text.push(`${He} happily complies, eager to be close to the ${womanP} who married ${him}. Once ${he}'s close, you hold ${his} face in your palms and look into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from the ${womanP} ${he}'s married to affirming, and looks down with a`);

				if (canSee(slave)) {
					text.push(`smile, running ${his} eyes over your`);
					if (V.PC.boobs >= 300) {
						text.push(`bosom.`);
					} else {
						text.push(`chest.`);
					}
				} else {
					text.push(`smile.`);
				}
			} else if (slave.devotion < -20 && slave.trust > 20) {
				text.push(`${He} complies. Once ${he}'s close, you hold ${his} face in your palms and look into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from the ${womanP} ${he}'s forcibly married to disturbing, and`);

				if (canSee(slave)) {
					text.push(`breaks eye contact.`);
				} else {
					text.push(`turns ${his} face away.`);
				}
			} else if (slave.devotion < -20) {
				text.push(`${He} complies out of fear. Once ${he}'s close, you hold ${his} shaking face in your palms and look into ${his} teary ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from the ${womanP} ${he}'s forcibly married to terrifying, and`);

				if (canSee(slave)) {
					text.push(`breaks eye contact.`);
				} else {
					text.push(`turns ${his} face away.`);
				}
			} else {
				text.push(`${He} complies obediently. Once ${he}'s close, you hold ${his} face in your palms and look into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from the ${womanP} ${he}'s married to reassuring, and looks down with a slight`);

				if (canSee(slave)) {
					text.push(`smile, running ${his} eyes over your`);
					if (V.PC.boobs >= 300) {
						text.push(`bosom.`);
					} else {
						text.push(`chest.`);
					}
				} else {
					text.push(`smile.`);
				}
			}
		} else if (slave.devotion > 75) {
			text.push(`${He} hurriedly complies, happy to be near you. Once ${he}'s close, you hold ${his} face in your palms and look into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from ${his} beloved ${getWrittenTitle(slave)} disconcerting, and ${his} eyes flick downward after a moment. ${He} blushes furiously.`);
		} else if (slave.devotion > 50) {
			text.push(`${He} hurriedly complies, happy to be near you. Once ${he}'s close, you hold ${his} face in your palms and look into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense attention from ${his} ${getWrittenTitle(slave)} disconcerting, and ${he} looks down after a moment, blushing.`);
		} else if (slave.devotion > 20) {
			text.push(`${He} hurriedly complies, happy to be near you. Once ${he}'s close, you hold ${his} face in your palms and look into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense attention from ${his} ${getWrittenTitle(slave)} worrying, and ${he} looks down after a moment, blushing nervously.`);
		} else if (slave.devotion >= -20 && slave.trust >= -20) {
			text.push(`${He} visibly considers disobedience, but decides that complying with such an apparently harmless order is safe, for now. Once ${he}'s close, you hold ${his} face in your palms and look into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense attention from ${his} ${getWrittenTitle(slave)} worrying, and ${he} looks down after a moment, ${his} lower lip trembling with nervousness.`);
		} else if (slave.trust < -20) {
			text.push(`The command terrifies ${him}, but ${he}'s more frightened still of the consequences of disobedience, and ${he} complies. Once ${he}'s close, you hold ${his} face in your palms and look into ${his} ${App.Desc.eyesColor(slave)}. ${He} looks down fearfully, and begins to shake with terror, tears leaking silently down ${his} cheeks.`);
		} else {
			text.push(`${He} pauses, obviously considering whether to resist, but eventually decides to save ${his} strength to fight more onerous orders, and gives in. Once ${he}'s close, you hold ${his} face in your palms and look into ${his} ${App.Desc.eyesColor(slave)}. ${He} stares back, but after a few moments ${he} loses the contest of wills and looks down.`);
		}

		return text.join(' ');
	}

	function consummation() {
		const text = [];


		text.push(`You delicately lift ${his} head and touch your fingertips to ${his} chin, tenderly brushing along the line of ${his} mouth with your`);

		if (V.PC.title === 1) {
			text.push(`manly`);
		} else {
			text.push(`feminine`);
		}

		text.push(`thumb.`);

		if (slave.lipsTat !== 0) {
			text.push(`Your fingers trace ${his} facial tattoos, slowly picking out the patterns against ${his} ${slave.skin} skin.`);
		}

		if (slave.piercing.lips.weight + slave.piercing.tongue.weight > 2) {
			text.push(`You touch each of ${his} facial piercings, one by one, feeling the hard metal contrast with ${his} pliant flesh.`);
		}

		text.push(`Then, you gently tilt ${his}`);

		if (slave.face > 95) {
			text.push(`overwhelmingly stunning`);
		} else if (slave.face > 10) {
			text.push(`alluring`);
		} else if (slave.face >= -10) {
			text.push(`appealing`);
		} else if (slave.face >= -40) {
			text.push(`plain`);
		} else {
			text.push(`rough`);
		}

		text.push(`head back and lightly touch ${his}`);

		if (slave.lips > 95) {
			text.push(`facepussy`);
		} else {
			if (slave.lips > 70) {
				text.push(`pillowlike`);
			} else if (slave.lips > 40) {
				text.push(`generous`);
			} else if (slave.lips > 20) {
				text.push(`plush`);
			}
			text.push(`lips`);
		}

		text.push(`with your fingertips. You use your fingers and thumbs to slowly slide along ${his} mouth, ${his} chin, ${his} cheeks then around ${his} face. You use a deft touch to thoroughly explore the shape of ${his}`);

		if (slave.face > 95) {
			text.push(`gorgeous`);
		} else if (slave.face > 10) {
			text.push(`nice`);
		} else if (slave.face >= -10) {
			text.push(`cute`);
		} else if (slave.face >= -40) {
			text.push(`fair`);
		} else {
			text.push(`prominent`);
		}

		text.push(`cheekbones. Grazing ${his} temple and brushing ${his} forehead simultaneously, you smoothly motion along ${his} eyelids and nose, and tenderly stroke ${his} face with both hands as you take ${his} head lightly and trace around it, gently massaging as you go. You work your way down, slowly and gradually, along ${his} neck with one hand, then the other, briefly pausing before continuing your path down to ${his} shoulders and`);

		if (slave.fetish !== Fetish.MINDBROKEN) {
			text.push(`${he} starts to gasp as`);
		} else {
			text.push(`starts to shudder as`);
		}

		text.push(`you slide your hands down ${his} side, across ${his} back and along ${his} belly taking every moment to savor the contours of ${his} body before going back up again to ${his} face.`);

		if (slave.fetish === Fetish.MINDBROKEN) {
			text.push(`${His} posture doesn't change. ${He} initially only reacts slightly to your physical touch but then stops reacting completely. When you stop, ${his} ${App.Desc.eyesColor(slave)} track the movements of your hands briefly but then stare blankly ahead of ${him}, awaiting further use of ${his} body.`);
		} else if (slave.relationship === -2) {
			text.push(`${His} eyes gradually close and ${he} slowly leans ${his} head back, relaxing as ${he} feels your caress. ${He} gently gasps as ${he} feels your warm`);

			if (V.PC.title === 1) {
				text.push(`manly`);
			} else {
				text.push(`feminine`);
			}

			text.push(`hand. When you finally stop gently caressing ${him}, ${his} eyes remain closed and ${his} mouth still in a rapturous shape for a moment before ${he} slowly opens ${his} eyes and smiles at you, ${he} has an eager look on ${his} face.`);

			if (hasAnyArms(slave)) {
				text.push(`A hand reaches dumbly up to ${his} face mimicking your last movements.`);
			}

			if (slave.accent >= 3) {
				text.push(`${He} does ${his} best to communicate love with ${his} ${App.Desc.eyesColor(slave)}, since ${he} does not speak ${V.language} well enough to express ${himself}.`);
			} else if (!hasAnyArms(slave) && !canTalk(slave)) {
				text.push(`${He} does ${his} best to communicate love with ${his} ${App.Desc.eyesColor(slave)}.`);
			} else if (!canTalk(slave)) {
				text.push(`${He} signs that ${he} loves you.`);
			} else {
				text.push(`${Spoken(slave, `"I love you, ${Master},"`)} ${he} ${say}s dreamily.`);
			}

			text.push(`${He} looks as though ${he} wants much more than your mere caress.`);
		} else if (slave.devotion > 50 && slave.fetish === "dom" && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
			text.push(`As you start to touch ${his}`);

			if (slave.face > 95) {
				text.push(`gorgeous`);
			} else if (slave.face > 10) {
				text.push(`lovely`);
			} else if (slave.face >= -10) {
				text.push(`pretty`);
			} else if (slave.face >= -40) {
				text.push(`homely`);
			} else {
				text.push(`ugly`);
			}

			text.push(`face, ${he} smiles at you and takes your hand in ${hers}, following its movements. ${He} tries hard to stop ${himself} from losing ${himself} in your masterful hands. ${He} takes ${his} tendency towards sexual dominance right up to the edge of insubordination, when ${he} starts to caress your face in turn. When you finally stop, ${his} eyes are closed and ${he}'s smiling.`);

			if (slave.accent >= 3) {
				text.push(`${He} does ${his} best to communicate excitement with ${his} ${App.Desc.eyesColor(slave)}, since ${he} does not speak ${V.language} well enough to express ${himself}.`);
			} else if (!hasAnyArms(slave) && !canTalk(slave)) {
				text.push(`${He} does ${his} best to communicate excitement with ${his} ${App.Desc.eyesColor(slave)}.`);
			} else if (!canTalk(slave)) {
				text.push(`${He} signs that ${he} liked that.`);
			} else {
				text.push(`${Spoken(slave, `"That was fun, ${Master},"`)} ${he} ${say}s cheerfully.`);
			}

			text.push(`${He} looks at you, ${his} eyes almost begging you to give ${him} more than your mere caress.`);
		} else if (slave.devotion > 50 && slave.fetish === "cumslut" && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
			text.push(`${He} stiffens at your touch but slowly relaxes to your fingers on ${his} face. As you move your fingers along ${his} lips, ${he} reacts almost as though ${he}'s receiving oral. ${He} starts to gently suck your fingers, moaning into your hand and pressing ${himself} lewdly against your`);

			if (V.PC.boobs >= 1400) {
				text.push(`giant tits.`);
			} else if (V.PC.boobs >= 1200) {
				text.push(`huge breasts.`);
			} else if (V.PC.boobs >= 1000) {
				text.push(`big breasts.`);
			} else if (V.PC.boobs >= 800) {
				text.push(`prominent breasts.`);
			} else if (V.PC.boobs >= 650) {
				text.push(`unremarkable breasts.`);
			} else if (V.PC.boobs >= 500) {
				text.push(`breasts.`);
			} else if (V.PC.boobs >= 300) {
				text.push(`tiny breasts.`);
			} else if (V.PC.title > 0) {
				text.push(`manly chest.`);
			} else {
				text.push(`non-existent breasts.`);
			}

			if (slave.teeth === "pointy") {
				text.push(`${He}'s very careful to avoid spearing your finger with ${his} sharp teeth.`);
			} else if (slave.teeth === "fangs") {
				text.push(`${He} holds perfectly still so you may trace ${his} fangs without getting poked.`);
			} else if (slave.teeth === "fang") {
				text.push(`You give ${his} lone fang a little extra attention as you work.`);
			}

			text.push(`${He} achieves a weak orgasm before you stop caressing ${him}.`);

			if (slave.accent >= 3) {
				text.push(`${He} does ${his} best to communicate undiminished lust with ${his} ${App.Desc.eyesColor(slave)}, since ${he} does not speak ${V.language} well enough to express ${himself}.`);
			} else if (!hasAnyArms(slave) && !canTalk(slave)) {
				text.push(`${He} does ${his} best to communicate undiminished lust with ${his} ${App.Desc.eyesColor(slave)}.`);
			} else if (!canTalk(slave)) {
				text.push(`${He} signs that ${he} liked that.`);
			} else {
				text.push(`${Spoken(slave, `"That was fun, ${Master},"`)} ${he} ${say}s lustfully.`);
			}

			text.push(`${He} looks at you as if ${he} wants more than your hands touching ${him}.`);
		} else if (slave.devotion > 50) {
			text.push(`${He} accepts your touch with devotion, leaning ${his} head back at your gentle caress along ${his} face. ${He} leans ${his} body forward, pressing ${himself} against you, and you feel the intense heat from ${his} body against your`);

			const firm = V.PC.boobsImplant / V.PC.boobs >= .60 ? "firm" : "soft";
			if (V.PC.boobs >= 1400) {
				text.push(`expansive ${firm} chest.`);
			} else if (V.PC.boobs >= 1200) {
				text.push(`huge ${firm} breasts.`);
			} else if (V.PC.boobs >= 1000) {
				text.push(`big ${firm} breasts.`);
			} else if (V.PC.boobs >= 800) {
				text.push(`soft breasts.`);
			} else if (V.PC.boobs >= 500) {
				text.push(`breasts.`);
			} else if (V.PC.boobs >= 300) {
				text.push(`small chest.`);
			} else if (V.PC.title > 0) {
				text.push(`manly chest.`);
			} else {
				text.push(`flat chest.`);
			}

			text.push(`${He} gradually closes ${his} eyes and when you finally stop,`);

			if (hasAnyArms(slave)) {
				text.push(`${he} runs ${his} hand delightfully across ${his} face where you last touched ${him},`);
			} else {
				text.push(`there is`);
			}

			text.push(`a euphoric look on ${his} ${slave.skin} face.`);

			if (slave.accent >= 3) {
				text.push(`${He} does ${his} best to communicate devotion with ${his} ${App.Desc.eyesColor(slave)}, since ${he}'s not confident in ${his} ability to express it in ${V.language}.`);
			} else if (!hasAnyArms(slave) && !canTalk(slave)) {
				text.push(`${He} does ${his} best to communicate devotion with ${his} ${App.Desc.eyesColor(slave)}.`);
			} else if (!canTalk(slave)) {
				text.push(`${He} signs that ${he} loves you.`);
			} else {
				text.push(`${Spoken(slave, `"I love you, ${Master},"`)} ${he} ${say}s jubilantly.`);
			}

			text.push(`${He} looks at you longingly, almost as if ${he}'s bursting to say that ${he} wants more than your mere caress.`);
		} else if (slave.devotion > 20) {
			text.push(`${He} accepts your touch willingly. As you are so close to ${him}, you sense considerable turmoil in the`);

			if (slave.physicalAge > 30) {
				text.push(`${woman};`);
			} else {
				text.push(`${girl};`);
			}

			text.push(`${he}'s doing ${his} duty as a slave by complying with your wishes, and is probably struggling with the mixture of resistance, obedience and perhaps even devotion forced to the forefront of ${his} mind by your touch across ${his} face. When you finally move your hand away, ${his} ${App.Desc.eyesColor(slave)} gaze into yours searchingly, looking for answers that are not there.`);

			if (!hasAnyArms(slave) && !canTalk(slave)) {
				text.push(`${His} eyes beg for an answer: is that it?`);
			} else if (!canTalk(slave)) {
				text.push(`${He} signs hesitantly, asking if that's it.`);
			} else {
				text.push(`${He} asks hesitantly, ${Spoken(slave, `"I-is that it, ${Master}?"`)}`);
			}
		} else if (slave.devotion >= -20 && slave.trust < -20) {
			text.push(`${He} shakes at your touch fearfully. As you move your hand along ${his} unresisting face, ${his} eagerness to avoid punishment leads ${him} to stiffen, ${his} nervousness is made apparent. You continue stroking ${his} cheek, enjoying ${his} fear, and the physical intimacy slowly does its work. ${He} starts to relax, ${his} resistance easing and ${his} eyes start to close. When finally move your hand away, ${he} looks at you for a long moment, ${his} eyes darting up at you, before visibly catching ${himself} with a reminder that ${he}'s a slave and you're ${his} owner.`);

			if (!hasAnyArms(slave) && !canTalk(slave)) {
				text.push(`${His} eyes beg for an answer: is that it?`);
			} else if (!canTalk(slave)) {
				text.push(`${He} signs hesitantly, asking if that's it.`);
			} else {
				text.push(`${He} asks hesitantly, ${Spoken(slave, `"I-is that it, ${Master}?"`)}`);
			}
		} else if (slave.trust < -50) {
			text.push(`${He} is nearly frozen with fear, and does not resist as you start to caress ${his} face. In fact, ${he} barely reacts at all. ${He} stares at you as you move your fingers across ${his} stiff face, but it's like touching a statue. ${He} is so filled with terror that ${he} remains stiff even as it becomes clear to ${him} you're not going to hurt ${him}. When you bore of touching the`);

			if (slave.physicalAge > 30) {
				text.push(`${woman}`);
			} else {
				text.push(`${girl}`);
			}

			text.push(`and move your hand away, ${he} stares at you in utter incomprehension.`);

			if (!hasAnyArms(slave) && !canTalk(slave)) {
				text.push(`${His} eyes beg for an answer: is that it?`);
			} else if (!canTalk(slave)) {
				text.push(`${He} signs spastically, begging fearfully to know if that's it.`);
			} else {
				text.push(`${He} asks nervously, ${Spoken(slave, `"I-is that it, ${Master}?"`)}`);
			}

			text.push(`Then ${he} cringes.`);
		} else {
			text.push(`${He} reflexively turns away from you, but you catch ${his} head with one hand and slowly but gently move your other hand along ${his} face. Spluttering, ${he} leans backwards, but you tip forward with ${him} and pin ${him} against your desk, not stopping your gentle touch on ${his} head. ${He} tries to wriggle out of your grasp desperately, but ${his} struggles slowly subside as ${he} realizes that you're not taking this any farther. When you bore of it and move your hand away, ${he} stares at you in utter incomprehension.`);

			if (!hasAnyArms(slave) && !canTalk(slave)) {
				text.push(`${His} eyes demand an answer: is that it?`);
			} else if (!canTalk(slave)) {
				text.push(`${He} signs irritably, asking whether that's it.`);
			} else {
				text.push(`${He} splutters, ${Spoken(slave, `"Is that it, ${Master}!?"`)}`);
			}
		}

		return text.join(' ');
	}
};
