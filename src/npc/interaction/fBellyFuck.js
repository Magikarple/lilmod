/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fBellyFuck = function(slave) {
	const frag = new DocumentFragment();

	const {
		He,
		he, his, him, himself
	} = getPronouns(slave);

	seX(slave, canDoVaginal(slave) ? "vaginal" : "anal", V.PC);

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

		text.push(`You have ${him} brought to you so that you can fuck ${his} hyperpregnant body.`);

		if (tooBigBelly(slave)) {
			text.push(`${He} is pinned to the ground by ${his}`);

			if (slave.bellyPreg >= 1000000) {
				text.push(`impossibly exploded baby bump,`);
			} else if (slave.bellyPreg >= 750000) {
				text.push(`massively swollen baby bump,`);
			} else if (slave.bellyPreg >= 600000) {
				text.push(`titanic baby belly,`);
			} else {
				text.push(`massive belly,`);
			}

			text.push(`and won't be a particularly able lover because of this, but enjoying ${his} immobility is half the point.`);
		} else if (!hasAnyLegs(slave)) {
			text.push(`${He} has no limbs to stand on, so ${he} is left resting atop ${his}`);

			if (slave.bellyPreg >= 1000000) {
				text.push(`impossibly exploded baby bump.`);
			} else if (slave.bellyPreg >= 750000) {
				text.push(`massively swollen baby bump.`);
			} else if (slave.bellyPreg >= 600000) {
				text.push(`titanic baby belly.`);
			} else {
				text.push(`massive belly.`);
			}

			text.push(`${He} won't be a particularly able lover, but enjoying ${his} immobility is half the point.`);
		} else if (!canStand(slave)) {
			text.push(`${He} can't support ${himself}, so ${he} is left leaning against ${his}`);

			if (slave.bellyPreg >= 1000000) {
				text.push(`impossibly exploded baby bump.`);
			} else if (slave.bellyPreg >= 750000) {
				text.push(`massively swollen baby bump.`);
			} else if (slave.bellyPreg >= 600000) {
				text.push(`titanic baby belly.`);
			} else {
				text.push(`massive belly.`);
			}

			text.push(`${He} won't be a particularly able lover, but enjoying ${his} immobility is half the point.`);
		} else {
			text.push(`${He} can still stand despite ${his}`);
			if (slave.bellyPreg >= 1000000) {
				text.push(`impossibly exploded baby bump,`);
			} else if (slave.bellyPreg >= 750000) {
				text.push(`massively swollen baby bump,`);
			} else if (slave.bellyPreg >= 600000) {
				text.push(`titanic baby belly,`);
			} else {
				text.push(`massive belly,`);
			}

			text.push(`though ${he} is still too restricted to be a particularly able lover, but enjoying this obstacle is half the point.`);
		}

		text.push(`Once ${he} is situated in the center of your office, you walk a circle around ${him}, taking special care to`);

		if (slave.bellyTat === "a heart") {
			text.push(`trace a hand over the obliterated heart-shaped tattoo on the front of ${his} immensely stretched belly.`);
		} else if (slave.bellyTat === "a star") {
			text.push(`trace a hand over the obliterated star-shaped tattoo on the front of ${his} immensely stretched belly.`);
		} else if (slave.bellyTat === "a butterfly") {
			text.push(`trace a hand over the obliterated butterfly tattoo on the front of ${his} immensely stretched belly.`);
		} else {
			text.push(`trace a hand over the obliterated, stretched out expanse of slightly darker flesh where ${his} belly button used to be.`);
		}

		return text.join(' ');
	}

	function setup() {
		const text = [];

		if (slave.devotion > 95) {
			text.push(`${He} purrs in response to your touch, leaning forward against ${his} belly, and`);

			if (!hasAnyLegs(slave)) {
				text.push(`wiggles`);
			} else {
				text.push(`lifts ${his} toes off the ground as ${he}`);
				if (hasBothLegs(slave)) {
					text.push(`spreads ${his} legs`);
				} else {
					text.push(`moves ${his} leg`);
				}
			}

			text.push(`in preparation for you.`);
		} else if (slave.trust < -20 && slave.devotion > -10) {
			text.push(`${He} groans at your touch.`);
		} else {
			text.push(`${He} winces at your touch.`);
		}

		text.push(`When you get to ${his} rear, you slap ${his}`);

		if (slave.butt > 11) {
			text.push(`insanely enormous ass,`);
		} else if (slave.butt > 5) {
			text.push(`huge ass,`);
		} else if (Math.floor(slave.buttImplant/slave.butt) > .60) {
			text.push(`jiggly, saline-filled ass,`);
		} else if (slave.butt > 2) {
			text.push(`thick ass,`);
		} else {
			text.push(`pert ass,`);
		}

		text.push(`and then spread ${his} cheeks for easier access to ${his}`);

		if (canDoVaginal(slave)) {
			text.push(
				`cunt.`,
				VCheck.Vaginal(slave, 1),
			);
		} else {
			text.push(
				`asshole.`,
				VCheck.Anal(slave, 1),
			);
		}

		return text.join(' ');
	}

	function consummation() {
		const text = [];

		text.push(`Heaving upward, you push ${him} fully onto ${his} belly, then lean into ${him}, fucking ${him} in a unique spin on the wheelbarrow position`);

		if (V.PC.dick === 0) {
			text.push(`with your strap-on`);
		}

		text.push(`and setting ${his} tightly packed gut to jiggling. ${He} moans in mixed pain and pleasure as you bring ${him} over the edge and, by the time you finish with ${him} and allow ${him} to return to ${his} duties, it's clear`);

		if (slave.belly > slave.pregAdaptation * 2000) {
			text.push(`that your recent escapades <span class="health dec">have done lasting damage to ${his} body.</span>`);
			healthDamage(slave, 10);
		} else {
			text.push(`that you've left ${him} thoroughly exhausted.`);
		}

		return text.join(' ');
	}
};
