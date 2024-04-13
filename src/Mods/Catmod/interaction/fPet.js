/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fPet = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He, His,
		he, his, him, himself, girl
	} = getPronouns(slave);

	const {title: Master} = getEnunciation(slave);

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

	r.push(`Once ${he}'s at an acceptable petting range, you bring the overgrown cat into your embrace and gingerly run a hand from the top of ${his} head down ${his} spine, coursing through the soft fur in a massage-like petting motion.`);

	if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`${He} accepts the petting robotically, barely even comprehending what you're doing. The pleasant scritch of your fingers against ${his} back produces some sort of guttural purring sound, but that conveys the extent of the mindbroken cat's response.`);
	} else if (slave.devotion > 75) {
		r.push(`The cat${girl} loudly purrs and eagerly rubs up against you, arching ${his} back to give you a full range over the silky fur. ${His} tail flicks back and forth happily as you pet ${him}, flicking up to tease against your chin as you pet the purring kitten. When you finally retract your hand, ${slave.slaveName} bats ${his} eyelashes at you, still purring a little.`);
		if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${His}`);
			if (canSee(slave)) {
				r.push(`eyes glimmer`);
			} else {
				r.push(`expression stares`);
			}
			r.push(`at you contentedly.`);
		} else if (!canTalk(slave)) {
			r.push(`${He} signs a little thank-you for the pets.`);
		} else {
			r.push(`${He} mrowls,`);
			r.push(Spoken(slave, `"Why'd you stop, ${Master}? Can I suck you off so you keep going?"`));
		}
	} else if (slave.devotion > 50) {
		r.push(`The cat${girl} presents ${his} back to you eagerly for petting, purring softly as you stroke your hand up and down ${his} soft fur. It's easy to let your hand practically get lost in the silky material, especially since the eager cat does all ${he} can to keep your hand running up and down ${his} spine in tender petting motions. When you finally retract your hand, ${slave.slaveName} bats ${his} eyelashes at you, still purring a little.`);
		if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${His}`);
			if (canSee(slave)) {
				r.push(`eyes glimmer`);
			} else {
				r.push(`expression stares`);
			}
			r.push(`at you contentedly.`);
		} else if (!canTalk(slave)) {
			r.push(`${He} signs that ${he} loves you.`);
		} else {
			r.push(`${He} mrowls,`);

			r.push(Spoken(slave, `"That felt great, ${Master}. Can you pet me more often?"`));
		}
	} else if (slave.devotion > 20) {
		r.push(`The cat${girl} puts up a little façade of resistance, but just about immediately melts into your hands, giving you a full range of motion to pet and rub at ${his} silky fur. ${He} lets you pet along the full length of ${his} spine, rubbing under ${his} chin and exploring the curves of ${his} ass and breasts in a way that's, for once, entirely nonsexual. After about a minute, ${he} starts to purr at your petting, rumbling against your chest, and ${he} flutters ${his} eyelashes wistfully when you finally remove your hand.`);
		if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${His}`);
			if (canSee(slave)) {
				r.push(`eyes glint`);
			} else {
				r.push(`expression stares`);
			}
			r.push(`at you with a smug aura.`);
		} else if (!canTalk(slave)) {
			r.push(`${He} signs a little thank-you for the pets.`);
		} else {
			r.push(`${He} mrowls,`);
			r.push(Spoken(slave, `"Thanks, ${Master}. That was nice."`));
		}
	} else if (slave.devotion < -20 && slave.trust >= 20) {
		r.push(`${He} glowers at you as you start to pet ${him}, clearly doing ${his} best to express nonverbal dissatisfaction with you. Despite that, ${he} can't help but to shiver somewhat as you gingerly pet the fluffy cat, rumbling with a deep purr that betrays ${his} distaste for you. ${He} glares up at you the entire time, even as ${he} purrs, ${his} tail swishing about in the air as you pet the furry thing vigorously. When you finally retract your hand, ${he} acts like ${he} didn't enjoy it.`);
		if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${His}`);
			if (canSee(slave)) {
				r.push(`eyes glower`);
			} else {
				r.push(`expression glowers`);
			}
			r.push(`at you.`);
		} else if (!canTalk(slave)) {
			r.push(`${He} makes a rude sign gesture.`);
		} else {
			r.push(`${He} mrowls,`);
			r.push(Spoken(slave, `"I'm a person, not some kind of dumb animal."`));
		}
	} else if (slave.devotion >= -20 && slave.trust >= -20) {
		r.push(`${He} flinches back when you raise your hand towards ${him}, expecting to be hit. The tender petting that occurs obviously shocks ${him}, and for the first minute it looks like ${he}'s expecting you to change your mind at any moment and hit ${him} anyway. When you don't, only then does the scared cat${girl} allow ${himself} to get pet properly, slightly arching ${his} back to give you a range of motion against the silky fur as you stroke and play with your bioengineered cat${girl}. When you finally retract your hand, ${he} bats ${his} eyelashes at you, confused.`);
		if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${He} just stares at you, blinking a few times.`);
		} else if (!canTalk(slave)) {
			r.push(`${He} makes a confused sign gesture.`);
		} else {
			r.push(`${He} mrowls,`);
			r.push(Spoken(slave, `"I-Is that it, ${Master}..?"`));
		}
	} else if (slave.trust < -20) {
		r.push(`${He} flinches back when you raise your hand towards ${him}, expecting to be hit. The tender petting that occurs obviously shocks ${him}, and for the first minute it looks like ${he}'s expecting you to change your mind at any moment and hit ${him} anyway. When you don't, only then does the scared cat${girl} allow ${himself} to get pet properly, slightly arching ${his} back to give you a range of motion against the silky fur as you stroke and play with your bioengineered cat${girl}. When you finally retract your hand, ${he} bats ${his} eyelashes at you, confused.`);
		if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${He} just stares at you, blinking a few times.`);
		} else if (!canTalk(slave)) {
			r.push(`${He} makes a confused sign gesture.`);
		} else {
			r.push(`${He} mrowls,`);
			r.push(Spoken(slave, `"I-Is that it, ${Master}..?"`));
		}
	} else {
		r.push(`The cat${girl} puts up a little façade of resistance, but doesn't really fight back against your petting, giving you a full range of motion to pet and rub at ${his} silky fur. ${He} lets you pet along the full length of ${his} spine, rubbing under ${his} chin and exploring the curves of ${his} ass and breasts in a way that's, for once, entirely nonsexual. Despite ${himself}, ${he} can't help but to purr a little by the time you finally remove ${his} hands.`);
		if (!hasAnyArms(slave) && !canTalk(slave)) {
			r.push(`${His}`);
			if (canSee(slave)) {
				r.push(`eyes glint`);
			} else {
				r.push(`expression stares`);
			}
			r.push(`at you uncertainly.`);
		} else if (!canTalk(slave)) {
			r.push(`${He} makes a huffy mrowling noise.`);
		} else {
			r.push(`${He} mrowls,`);
			r.push(Spoken(slave, `"Thanks, I guess..."`));
		}
	}
	App.Events.addParagraph(node, r);
	return node;
};
