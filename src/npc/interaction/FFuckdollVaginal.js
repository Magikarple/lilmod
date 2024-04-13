/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fFuckdollVaginal = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He, His,
		he, his, him
	} = getPronouns(slave);

	seX(slave, "vaginal", V.PC, "penetrative");
	r.push(`You decide to use the Fuckdoll's`);
	if (slave.vagina > 3) {
		r.push(`cavernous`);
	} else if (slave.vagina === 3) {
		r.push(`soft`);
	} else if (slave.vagina === 2) {
		r.push(`inviting`);
	} else if (slave.vagina === 1) {
		r.push(`tight`);
	}
	r.push(`front hole.`);
	if (slave.fuckdoll <= 10) {
		r.push(`Since ${he} is not well adapted to life as a living sex toy yet, ${he} won't respond to position commands. So, you simply`);
		if (hasAnyLegs(slave)) {
			r.push(`push ${him} down to lie on the couch`);
		} else {
			r.push(`set ${him} on your desk`);
		}
		r.push(`and shove`);
		if (V.PC.dick !== 0) {
			r.push(`your cock`);
		} else {
			r.push(`a strap-on`);
		}
		r.push(`inside ${his} vagina.`);
	} else if (slave.fuckdoll <= 70) {
		r.push(`${He} can follow intermediate commands, so you order ${him} into a position for use of ${his} front hole. ${He} obediently`);
		if (hasAllLimbs(slave)) {
			r.push(`gets down on all fours and`);
		} else if (hasAnyLegs(slave)) {
			r.push(`bends over and`);
		}
		r.push(`cocks ${his} hips, offering ${his} cunt until you insert`);
		if (V.PC.dick !== 0) {
			r.push(`your cock`);
		} else {
			r.push(`a strap-on`);
		}
		r.push(`into ${his} wet channel.`);
	} else {
		r.push(`${He} can follow advanced commands, so you bring ${him} over to your chair`);
		if (hasAnyLegs(slave)) {
			r.push(`and order ${him} to squat down onto your`);
			if (V.PC.dick !== 0) {
				r.push(`cock`);
			} else {
				r.push(`strap-on`);
			}
			r.push(`and ride.`);
		} else {
			r.push(`and impale ${him} on`);
			if (V.PC.dick !== 0) {
				r.push(`your cock,`);
			} else {
				r.push(`your strap-on,`);
			}
			r.push(`ordering ${him} to do ${his} feeble best to bounce.`);
		}
	}
	if (slave.fuckdoll <= 20) {
		r.push(`${He}'s not fully used to being raped without warning, so ${he} struggles, ${his} muscles spasming delightfully.`);
	} else if (slave.fuckdoll <= 40) {
		r.push(`Aware that ${he} is supposed to relax and accept rape, ${he} does ${his} best to let you take ${him} without resistance.`);
	} else {
		r.push(`You command ${him} to milk your`);
		if (V.PC.dick !== 0) {
			r.push(`cock`);
		} else {
			r.push(`strap-on`);
		}
		r.push(`with ${his} vaginal walls, and ${he} obediently starts to flex ${his} well-developed cunt muscles, squeezing`);
		if (V.PC.dick !== 0) {
			r.push(`you`);
		} else {
			r.push(`your strap-on`);
		}
		r.push(`from base to tip.`);
	}
	if (slave.fuckdoll <= 60) {
		if (slave.energy > 40) {
			r.push(`Denied any other outlet for ${his} healthy sex drive, ${he} orgasms.`);
		}
	} else {
		r.push(`${He} orgasmed for the first time as you entered ${him}, and ${he} continues to do so as you fuck ${him}. ${He}'s perfectly tuned.`);
	}
	if (slave.voice === 0) {
		r.push(`Though ${he} is mute, ${his} breath hisses loudly`);
		if (slave.lips > 95) {
			r.push(`past the lips of ${his} facepussy.`);
		} else {
			r.push(`through ${his} mouth insert.`);
		}
	} else {
		r.push(`${He} moans,`);
		if (slave.lips > 95) {
			r.push(`and the lips of ${his} facepussy quiver.`);
		} else {
			r.push(`struggling to force the sound past ${his} mouth insert.`);
		}
	}
	r.push(`You climax${(V.PC.dick !== 0) ? `, your cum shooting forward to splash against ${his} womb,` : ``} and return ${him} to`);
	if (hasAnyLegs(slave)) {
		r.push(`a standing position.`);
	} else {
		r.push(`where ${he} was resting.`);
	}
	if (V.PC.dick !== 0) {
		if (slave.vagina > 2) {
			r.push(`Your cum flows out of ${his} gaping front hole and down the material of ${his} suit.`);
		} else if (slave.vagina === 2) {
			r.push(`Your cum drips out of ${his} well-fucked front hole and down the material of ${his} suit.`);
		} else {
			r.push(`${His} tight front hole retains almost every drop of your cum. A few escape and run down the material of ${his} suit.`);
		}
		if (canImpreg(slave, V.PC)) {
			r.push(knockMeUp(slave, 5, 1, -1));
		}
		r.push(`The Fuckdoll will be cleaned by another slave.`);
	}
	if (slave.vagina === 0) {
		if (slave.fetish !== Fetish.MINDBROKEN) {
			r.push(`As you return to your business, ${he} shakes slightly in place, and a few low moans come out of ${his} face hole. This is probably a reaction to losing ${his} virginity.`);
		} else {
			r.push(`${He} gives no external indication that ${he}'s aware that ${he}'s just lost ${his} virginity.`);
		}
		r.push(`In any case, <span class="lime">${his} front hole has been broken in.</span>`);
		slave.vagina = 1;
	}
	App.Events.addParagraph(node, r);
	return node;
};
