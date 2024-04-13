/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fEmbrace = function(slave) {
	const frag = new DocumentFragment();

	const {
		He, His,
		he, his, him, himself, wife, hers, woman, girl
	} = getPronouns(slave);

	const {title: Master, say} = getEnunciation(slave);

	const {woman: womanP} = getPronouns(V.PC);
	const bosom = V.PC.boobs >= 300 ? "bosom" : "chest";

	const text = new SpacedTextAccumulator(frag);

	text.push(
		intro(),
		setup(),
		consummation(),
		aftermath(),
	);

	text.toParagraph();

	return frag;

	function intro() {
		const text = [];

		text.push(`You tell ${slave.slaveName} to`);

		if (hasAnyLegs(slave)) {
			text.push(`stand in front of you.`);
		} else {
			text.push(`have another slave set ${him} down on your desk.`);
		}

		if (slave.fetish === Fetish.MINDBROKEN && slave.relationship !== -3) {
			text.push(`${He} complies automatically. ${He} remembers that when ${getWrittenTitle(slave)}'s commands are not obeyed, there is punishment.`);
		} else if (slave.relationship === -2) {
			text.push(`${He} excitedly complies, happy to be near the object of ${his} longing. Once ${he}'s close, you take ${his} completely relaxed head in your hands and gaze deeply`);

			if (canSee(slave)) {
				text.push(`into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from the ${womanP} ${he} loves overwhelming, and ${his} eyes flick downward after a moment.`);
			} else {
				text.push(`upon ${his} face. ${He} senses the intense look from the ${womanP} ${he} loves and finds it overwhelming, and after a moment glances away.`);
			}

			text.push(`${He} blushes furiously.`);
		} else if (slave.relationship === -3) {
			if (slave.fetish === Fetish.MINDBROKEN) {
				text.push(`${He} complies mechanically. ${He} remembers that when ${getWrittenTitle(slave)}'s commands are not obeyed, there is punishment. Once ${he}'s close, you hold ${his} face in your palms and look into ${his} blank ${App.Desc.eyesColor(slave)}. ${He} shows no reaction.`);
			} else if (slave.devotion+slave.trust >= 175) {
				text.push(`${He} lovingly complies, hurrying to come close to the ${womanP} who married ${him}. Once ${he}'s close, you take your willing ${wife}'s head in your hands and gaze deeply into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from the ${womanP} ${he}'s married to affirming, and looks down with a`);

				if (canSee(slave)) {
					text.push(`smile, running ${his} eyes over your ${bosom}.`);
				} else {
					text.push(`smile.`);
				}
			} else if (slave.devotion < -20 && slave.trust > 20) {
				text.push(`${He} complies. Once ${he}'s close, you take your reluctant ${wife}'s head in your hands and gaze deeply into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from the ${womanP} ${he}'s forcibly married to disturbing, and`);

				if (canSee(slave)) {
					text.push(`breaks eye contact.`);
				} else {
					text.push(`turns ${his} face away.`);
				}
			} else if (slave.devotion < -20) {
				text.push(`${He} complies out of fear. Once ${he}'s close, you take your unwilling ${wife}'s head in your hands and gaze deeply into ${his} teary ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from the ${womanP} ${he}'s forcibly married to terrifying, and`);

				if (canSee(slave)) {
					text.push(`breaks eye contact.`);
				} else {
					text.push(`turns ${his} face away.`);
				}
			} else {
				text.push(`${He} complies obediently. Once ${he}'s close, you take your willing ${wife}'s head in your hands and gaze deeply into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from the ${womanP} ${he}'s married to reassuring, and looks down with a slight`);

				if (canSee(slave)) {
					text.push(`smile, running ${his} eyes over your ${bosom}.`);
				} else {
					text.push(`smile.`);
				}
			}
		} else if (slave.devotion > 75) {
			text.push(`${He} elatedly complies, joyful at being near to you. Once ${he}'s close, you take ${his} completely relaxed head in your hands and gaze deeply into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense look from ${his} beloved ${getWrittenTitle(slave)} disconcerting, and ${his} eyes flick downward after a moment. ${He} blushes furiously.`);
		} else if (slave.devotion > 50) {
			text.push(`${He} dotingly complies, being near you filling ${him} with delight. Once ${he}'s close, you take ${his} completely relaxed head in your hands and gaze deeply into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense attention from ${his} ${getWrittenTitle(slave)} disconcerting, and ${he} looks down after a moment, blushing.`);
		} else if (slave.devotion > 20) {
			text.push(`${He} joyfully complies, happy to be near you. Once ${he}'s close, you take ${his} willing head in your hands and gaze deeply into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense attention from ${his} ${getWrittenTitle(slave)} worrying, and ${he} looks down after a moment, blushing nervously.`);
		} else if (slave.devotion >= -20 && slave.trust >= -20) {
			text.push(`${He} visibly considers disobedience, but decides that complying with such an apparently harmless order is safe, for now. Once ${he}'s close, you take ${his} head in your hands and gaze deeply into ${his} ${App.Desc.eyesColor(slave)}. ${He} finds the intense attention from ${his} ${getWrittenTitle(slave)} worrying, and ${he} looks down after a moment, ${his} lower lip trembling with nervousness.`);
		} else if (slave.trust < -20) {
			text.push(`The command terrifies ${him}, but ${he}'s more frightened still of the consequences of disobedience, and ${he} complies. Once ${he}'s close, you take ${his} trembling head in your hands and gaze deeply into ${his} ${App.Desc.eyesColor(slave)} for a moment. ${He} looks down fearfully, and begins to shake with terror, tears streaking down ${his} cheeks.`);
		} else {
			text.push(`${He} pauses, obviously considering whether to resist, but eventually decides to save ${his} strength to fight more onerous orders, and gives in. Once ${he}'s close, you take a moment to gaze deeply into ${his} ${App.Desc.eyesColor(slave)}. ${He} stares back, but after a few moments ${he} loses the contest of wills and looks down.`);
		}

		return text.join(' ');
	}

	function setup() {
		const text = [];

		text.push(`You walk around ${him} and put your hands around ${his} abdomen,`);

		if (hasAnyLegs(slave)) {
			text.push(`to gently pull ${him} close towards you`);
		} else {
			text.push(`moving close towards ${him} on your desk`);
		}

		text.push(`and then wrap your arms around ${his} shoulders.`);

		if (hasAnyLegs(slave)) {
			text.push(`You press your hips against ${hers},`);
		} else {
			text.push(`You use your arms to prop ${him} up against you,`);
		}

		if (slave.trust > 20) {
			text.push(`letting ${him} lean while taking the weight of ${him} against you.`);
		} else {
			text.push(`but ${he} tries to lean away from you, pushing against your arms.`);
		}

		text.push(`You lovingly squeeze ${him} in your long, cradling embrace.`);

		return text.join(' ');
	}

	function consummation() {
		const text = [];

		if (slave.boobs < 2600) {
			if (slave.nipples === "huge") {
				text.push(`You feel ${his} large, erect nipples against your`);
			} else if (slave.nipples === "puffy") {
				text.push(`You feel ${his} erect, puffy nipples against your`);
			} else if (slave.nipples === "flat") {
				text.push(`You feel the bumps of ${his} flat nipples against your`);
			} else if (slave.nipples === "partially inverted") {
				text.push(`You feel ${his} partially inverted nipples against your`);
			} else if (slave.nipples === "inverted") {
				text.push(`You feel ${his} inverted nipples against your`);
			} else if (slave.nipples === "fuckable") {
				text.push(`You feel the slits of ${his} nipples against your`);
			} else {
				text.push(`You feel ${his} erect nipples against your`);
			}

			text.push(`hands as you move your arms down around ${his} breasts.`);

			if (slave.devotion > 20) {
				text.push(`You take your time to stay in this position, feeling ${his} heart beat against you. ${He} starts to breathe faster before you keep one arm wrapped around ${him} as you move to ${his} front.`);
			} else {
				text.push(`As you move to ${his} front, with one arm still around ${him}, ${he} again tries to break away but you keep ${him} held tightly and you whisper the alternatives to ${him}, reminding ${him}.`);
			}
			text.push(`You wrap your arms around ${his} back as you press ${his} breasts against your ${bosom}.`);
		} else {
			text.push(`${His} massive tits are too large for you to wrap your arms around so you start to wrap your arms around ${his} waist. You feel ${his} heart beat against your chest, ${he} starts to breathe faster as you press ${his} back against your ${bosom}.`);
		}

		return text.join(' ');
	}

	function aftermath() {
		const text = [];

		if (slave.fetish === Fetish.MINDBROKEN) {
			text.push(`${His} posture doesn't change. ${He} initially only reacts slightly to your physical touch but eventually ${he} relaxes in the warmth of your embrace against ${him}. You know that this may only be a physiological reaction, nothing more. For a brief moment you think you detect a spark of life in ${his} dull eyes but just as quickly, it is gone. When you stop, ${his} ${App.Desc.eyesColor(slave)} track the movements of your hands briefly but then ${he} stares blankly ahead of ${him}, not understanding what is happening.`);
		} else if (slave.relationship === -2) {
			text.push(`In the warmth of your embrace, ${he} turns towards you, ${his} passionate ${App.Desc.eyesColor(slave)} staring intently at your face. ${He} leans closer to you and kisses you as you hold ${him}. ${His} heart beats faster and then gradually slows as ${he} grows accustomed to your body against ${hers}. Eventually, ${he} relaxes totally and ${his} eyes gradually close, melting in your arms. When you finally stop and relax your embrace, ${his} eyes remain closed and ${his} mouth still in a rapturous shape for a moment before ${he} slowly opens ${his} eyes and smiles at you with a blissful look on ${his} face.`);

			if (hasAnyArms(slave)) {
				text.push(`${His} hand reaches to your arms and ${he} strokes them longingly.`);
			}

			if (!hasAnyArms(slave) && !canTalk(slave)) {
				text.push(`${He} slowly opens them and does ${his} best to communicate love with ${his} ${App.Desc.eyesColor(slave)}.`);
			} else if (!canTalk(slave)) {
				text.push(`${He} signs that ${he} loves you.`);
			} else {
				text.push(`${Spoken(slave, `"I love you, ${Master},"`)} ${he} ${say}s dreamily.`);
			}

			text.push(`${He} looks at you, almost begging you with ${his} eyes that ${he} wants much more than a mere embrace.`);
		} else if (slave.devotion > 50 && slave.fetish === "dom" && slave.fetishKnown === 1 && slave.fetishStrength > 60) {
			text.push(`In your soft, warm embrace, ${he} tries hard to stop ${himself} from losing ${himself} in your arms.`);

			if (hasAnyArms(slave)) {
				text.push(`${He} starts to embrace you`);

				if (hasBothArms(slave)) {
					text.push(`in ${his} arms`);
				} else {
					text.push(`with ${his} arm`);
				}

				text.push(`as well. When you gently squeeze ${him} in your arms, ${he} breathes more heavily and starts to lovingly squeeze you as well, ${his} tendency towards sexual dominance encouraging ${him} to compete with you in embraces against each other.`);
			} else {
				text.push(`When you gently squeeze ${him} in your arms, ${he} breathes more heavily before relaxing against you.`);
			}

			text.push(`When you finally stop and relax your embrace, ${his} eyes are closed and ${he}'s smiling blissfully.`);

			if (!hasAnyArms(slave) && !canTalk(slave)) {
				text.push(`${He} slowly opens them and does ${his} best to communicate excitement with ${his} ${App.Desc.eyesColor(slave)}.`);
			} else if (!canTalk(slave)) {
				text.push(`${He} signs that ${he} liked that.`);
			} else {
				text.push(`${Spoken(slave, `"I love you, ${Master},"`)} ${he} ${say}s cheerfully.`);
			}

			text.push(`${He} eagerly looks at you, ${his} eyes almost seem to say that ${he} wants you to give ${his} ${Master} more than a mere hug.`);
		} else if (slave.devotion > 50) {
			text.push(`${He} sighs devotedly in your arms and slowly relaxes. ${He} turns towards you, ${his} doting ${App.Desc.eyesColor(slave)} staring intently at your face. You feel ${his} heart beating faster against your chest as you softly squeeze your arms tighter.`);

			if (hasAnyArms(slave)) {
				text.push(`${His} ${hasBothArms(slave) ? `hands` : `hand`} reach to your arms and ${he} strokes them longingly as you squeeze.`);
			}

			const firm = V.PC.boobsImplant/V.PC.boobs >= .60 ? "firm" : "soft";
			text.push(`${He} gradually closes ${his} eyes as ${he} leans ${his} body against yours, melting in your warm embrace, and you feel the intense heat from ${his} body against your`);

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

			text.push(`When you finally stop,`);

			if (hasAnyArms(slave)) {
				text.push(`${he} reaches to your face with ${his} hand and gently strokes your cheek,`);
			} else {
				text.push(`${he} turns to you,`);
			}

			text.push(`a euphoric look on ${his} ${slave.skin} face.`);

			if (!hasAnyArms(slave) && !canTalk(slave)) {
				text.push(`${He} does ${his} best to communicate devotion with ${his} ${App.Desc.eyesColor(slave)}.`);
			} else if (!canTalk(slave)) {
				text.push(`${He} signs that ${he} loves you.`);
			} else if (slave.accent >= 3) {
				text.push(`${He} does ${his} best to communicate devotion with ${his} ${App.Desc.eyesColor(slave)}, since ${he}'s not confident in ${his} ability to express it in ${V.language}.`);
			} else {
				text.push(`${Spoken(slave, `"I love you, ${Master}," ${he} `)} ${say}s elatedly.`);
			}

			text.push(`${He} looks at you longingly, almost as if ${he}'s bursting to say that ${he} wants more than a mere embrace.`);
		} else if (slave.devotion > 20) {
			text.push(`${He} willingly gives ${himself} up to your embracing arms. As you are so close to ${him}, you sense considerable uneasiness in the`);

			if (slave.physicalAge > 30) {
				text.push(`${woman};`);
			} else {
				text.push(`${girl};`);
			}

			text.push(`${he}'s doing ${his} duty as a slave by complying with your wishes, and is probably struggling with the mixture of resistance, obedience and perhaps even devotion forced to the forefront of ${his} mind by your soft embrace against ${his} body. ${He} gradually closes ${his} eyes in the feeling of your gentle arms. When you finally stop and relax your embrace, ${his} ${App.Desc.eyesColor(slave)} open to gaze puzzlingly at you. Even though ${he} has accepted life as a sex slave, ${he} looks as though ${he} is unsure of what to make of this non-sexual physical contact.`);

			if (!hasAnyArms(slave) && !canTalk(slave)) {
				text.push(`${His} eyes beg for an answer: is that it?`);
			} else if (!canTalk(slave)) {
				text.push(`${He} signs hesitantly, asking if that's it.`);
			} else {
				text.push(`${He} asks hesitantly, ${Spoken(slave, `"I-is that it, ${Master}?"`)}`);
			}
		} else if (slave.devotion >= -20 && slave.trust < -20) {
			text.push(`${He} shakes at your touch fearfully. As you softly press ${his} trembling body against you, ${his} eagerness to avoid punishment leads ${him} to stiffen in your arms. While ${he} continues to shudder, you continue embracing ${him}, enjoying ${his} fear, and the physical intimacy slowly does its work. ${He} starts to relax, ${his} resistance easing and ${his} eyes start to close. When you relax your arms for a moment, ${he} opens ${his} eyes to look at you for a long moment, ${his} eyes darting up to your face, before visibly catching ${himself} with a reminder that ${he}'s a slave and you're ${his} owner.`);

			if (!hasAnyArms(slave) && !canTalk(slave)) {
				text.push(`${His} eyes beg for an answer: is that it?`);
			} else if (!canTalk(slave)) {
				text.push(`${He} signs hesitantly, asking if that's it.`);
			} else {
				text.push(`${He} asks hesitantly, ${Spoken(slave, `"I-is that it, ${Master}?"`)}`);
			}
		} else if (slave.trust < -50) {
			text.push(`${He} is nearly frozen with fear, and does not resist as you start to squeeze your arms around ${him}. In fact, ${he} barely reacts at all. ${He} stares at your arms as they continue squeezing, but it's like touching a statue. ${He} is so filled with terror that ${he} remains stiff even as it becomes clear to ${him} you're not going to hurt ${him}. When you bore of embracing the still`);

			if (slave.physicalAge > 30) {
				text.push(`${woman}`);
			} else {
				text.push(`${girl}`);
			}

			text.push(`and release ${him}, ${he} stares at you in utter incomprehension.`);

			if (!hasAnyArms(slave) && !canTalk(slave)) {
				text.push(`${His} eyes beg for an answer: is that it?`);
			} else if (!canTalk(slave)) {
				text.push(`${He} signs spastically, begging fearfully to know if that's it.`);
			} else {
				text.push(`${He} asks nervously, ${Spoken(slave, `"I-is that it, ${Master}?"`)}`);
			}

			text.push(`Then ${he} cringes, unsure of what you are going to do next.`);
		} else {
			text.push(`${He} reflexively tries to break free from your arms, but you keep ${him} wrapped in them. Shuddering, ${he} desperately leans away from you, but you tip forward with ${him} and pin ${him} against your desk, continuing your hold on ${him}. ${He} tries to wriggle out of your grasp desperately, but ${his} struggles slowly subside as ${he} realizes that you're not taking this any farther. When you bore of it and release ${him}, ${he} stares at you in utter incomprehension.`);

			if (!hasAnyArms(slave) && !canTalk(slave)) {
				text.push(`${His} eyes demand an answer: is that it?`);
			} else if (!canTalk(slave)) {
				text.push(`${He} signs irritably, asking whether that's it.`);
			} else {
				text.push(`${He} splutters, ${Spoken(slave, `"Is that it, ${Master}!?"`)}`);
			}

			text.push(`${He} shakes uncontrollably, apprehensive at what you are going to do next.`);
		}

		return text.join(' ');
	}
};
