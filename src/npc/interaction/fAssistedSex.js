/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fAssistedSex = function(slave) {
	const frag = new DocumentFragment();

	const {
		He,
		he, his, him, himself
	} = getPronouns(slave);

	seX(slave, "oral", V.PC);

	const text = new SpacedTextAccumulator(frag);

	text.push(
		intro(),
		setup(),
		consummation(),
		cleanup(),
	);

	text.toParagraph();

	return frag;

	function intro() {
		const text = [];

		text.push(`You order ${his} servants forward so that ${he} can tease you with ${his} enormously swollen body.`);

		if (slave.devotion > 95) {
			text.push(`Smirking, ${he} leans backwards,`);
			if (hasBothArms(slave)) {
				text.push(`raising ${his} hands above ${his} head`);
			} else if (hasAnyArms(slave)) {
				text.push(`raising ${his} hand above ${his} head`);
			} else {
				text.push(`with two slender arms rising upward behind ${him}, making it look like ${he} has limbs once more`);
			}
			text.push(`as a gaggle of ${his} trained menials slide underneath ${his} belly, lifting the monolithic organ off the ground and setting the tightly packed orb to wobbling.`);
		} else if (slave.trust < -20 && slave.devotion > -10) {
			text.push(`Smiling nervously, ${he} leans backwards,`);
			if (hasBothArms(slave)) {
				text.push(`raising ${his} hands above ${his} head`);
			} else if (hasAnyArms(slave)) {
				text.push(`raising ${his} hand above ${his} head`);
			} else {
				text.push(`with two slender arms rising upward behind ${him}, making it look like ${he} has limbs once more`);
			}
			text.push(`as a gaggle of ${his} trained menials slide underneath ${his} belly, lifting the monolithic organ off the ground and setting the tightly packed orb to wobbling.`);
		} else {
			if (hasBothArms(slave)) {
				text.push(`${He} covers ${his}`);
				if (canSee(slave)) {
					text.push(`eyes`);
				} else {
					text.push(`face`);
				}
				text.push(`with ${his} hands,`);
			} else if (hasAnyArms(slave)) {
				text.push(`${He} tries to cover ${his}`);
				if (canSee(slave)) {
					text.push(`eyes`);
				} else {
					text.push(`face`);
				}
				text.push(`with ${his} hand,`);
			} else {
				text.push(`Two slender arms snake around from behind ${him}, almost making it look like ${he} has limbs once more. They cover ${his} quivering`);
				if (canSee(slave)) {
					text.push(`eyes`);
				} else {
					text.push(`expression`);
				}
			}

			text.push(`as a gaggle of ${his} trained menials slide underneath ${his} belly, lifting the monolithic organ off the ground and setting the tightly packed orb to wobbling.`);

			if (hasBothArms(slave)) {
				text.push(`Two more servants take hold of ${his} arms, forcing ${him} to lift them above ${his} head.`);
			} else if (hasAnyArms(slave)) {
				text.push(`Another servant takes hold of ${his} arm, forcing ${him} to lift it above ${his} head.`);
			} else {
				text.push(`The hands covering ${his}`);
				if (canSee(slave)) {
					text.push(`eyes`);
				} else {
					text.push(`head`);
				}
				text.push(`draw away, revealing ${his} crying face, then lift above ${his} head in a deliberately provocative pose.`);
			}

			text.push(`${He} tenses in a moment of instinctive resistance, then surrenders ${his} body to ${his} aides' total control, clearly afraid of punishment.`);
		}

		return text.join(' ');
	}

	function setup() {
		const text = [];

		text.push(`You remove your clothes and lie back on the office couch,`);

		if (V.PC.dick !== 0) {
			text.push(`allowing your exposed, full-mast dick to loll in front of you.`);
		} else {
			text.push(`spreading your exposed, oozing twat.`);
		}

		return text.join(' ');
	}

	function consummation() {
		const text = [];

		if (slave.devotion > 95) {
			text.push(`Licking ${his} lips,`);
		} else if (slave.trust < -20 && slave.devotion > -10) {
			text.push(`Breathing heavily,`);
		} else {
			text.push(`With a fake smile,`);
		}

		text.push(`${he} draws toward you, half-floating on a river of silent, groping hands. When ${he} is mere`);

		if (V.showInches === 2) {
			text.push(`inches`);
		} else {
			text.push(`centimeters`);
		}

		text.push(`away from you, ${his} servants lift ${him} higher, and ${he}`);

		if (V.PC.dick !== 0) {
			text.push(`teases your dick with a series of masterful — and carefully balanced — belly oscillations, rubbing the thick nub of ${his} belly button in small semicircles around your oozing cockhead as ${he} does so. Right when you feel ready to explode, ${he} rotates around, bringing`);

			if (slave.butt > 11) {
				text.push(`${his} overgrown, wobbling ass cheeks`);
			} else if (slave.butt > 5) {
				text.push(`${his} huge, wobbling ass cheeks`);
			} else if (Math.floor(slave.buttImplant/slave.butt) > .60) {
				text.push(`${his} saline-inflated ass cheeks`);
			} else if (slave.butt > 2) {
				text.push(`${his} wobbling ass cheeks`);
			} else {
				text.push(`the shallow inverted bowls of ${his} petite ass cheeks`);
			}

			text.push(`level with your erection. Two of ${his} servants reach around ${his} inflated profile and push ${his} cheeks together, wrapping your dick in a firm layer of butt cleavage. ${He} lifts ${his} ass, then drops it, again and again, smacking your chest on the downswing as ${his} servants manipulate ${his} hotdogging to maximize your pleasure.`);

			if (canDoVaginal(slave)) {
				text.push(`When you feel the tension within you reaching its apex, you signal to ${his} servants to hold ${him} in place. With ${his} silent menials, still as statues, anchoring ${his} bloated body at the perfect angle for fucking while contorting their anonymous bodies to frame ${him} in a manner that maximizes ${his} visual attractiveness, you grab hold of ${his} flanks and ram into ${his} pregnant pussy, driving ${him} to the first of many orgasms in just a few casual thrusts.`);
				text.push(VCheck.Vaginal(slave, 1));
				text.push(`When you feel your own orgasm approaching, you pull out, ejaculating`);
			} else if (canDoAnal(slave)) {
				text.push(`When you feel the tension within you reaching its apex, you signal to ${his} servants to hold ${him} in place. With ${his} silent menials, still as statues, anchoring ${his} bloated body at the perfect angle for fucking while contorting their anonymous bodies to frame ${him} in a manner that maximizes ${his} visual attractiveness, you grab hold of ${his} flanks and ram into ${his} asshole, driving ${him} to the first of many orgasms with just a few casual thrusts.`);
				text.push(VCheck.Anal(slave, 1));
				text.push(`When you feel your own orgasm approaching, you pull out, ejaculating`);
			} else {
				text.push(`When you feel the tension with your reaching its apex, you signal to ${his} servants and they pull ${him} forward. You ejaculate`);
			}

			text.push(`a thick stream of semen all over ${his} ass and back, ${he} shifts into a kneeling position on the ground in front of you, tilted sideways so that ${his} massive fecundity can pool on the ground beside ${him}, and gently sucks you off, cleaning your dick with ${his} mouth.`);
		} else {
			text.push(`Presses the thick nub of ${his} belly button into your pussy, rubbing it back and forth against your engorged clit as ${he} performs a series of masterful — and carefully balanced — belly oscillations. After ${he} has you quaking at the edge of release, ${he} rolls forward and buries ${his} head in your lap, plying you with ${his}`);

			if (slave.devotion > 95) {
				text.push(`devoted tongue`);
			} else if (slave.trust < -20 && slave.devotion > -10) {
				text.push(`dedicated tongue`);
			} else {
				text.push(`tongue`);
			}

			text.push(`and driving you into a series of crashing orgasms. When ${his} tongue tires, ${he} tries to draw away, but you grab hold of ${his} head and hold ${him} in place until you are finished.`);
		}

		return text.join(' ');
	}

	function cleanup() {
		return `Once you are satisfied, you send ${him} away to clean ${himself} up before returning to ${his} duties.`;
	}
};
