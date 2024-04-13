/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fFuckdollAnal = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He, His,
		he, his, him
	} = getPronouns(slave);

	seX(slave, "anal", V.PC, "penetrative");
	r.push(`You decide to use the Fuckdoll's`);
	if (slave.anus > 3) {
		r.push(`gaping`);
	} else if (slave.anus === 3) {
		r.push(`loose`);
	} else if (slave.anus === 2) {
		r.push(`relaxed`);
	} else if (slave.anus === 1) {
		r.push(`tight`);
	}
	r.push(`rear hole.`);
	if (slave.fuckdoll <= 10) {
		r.push(`Since ${he} is not well adapted to life as a living sex toy yet, ${he} won't respond to position commands. So, you simply`);
		if (hasAnyLegs(slave)) {
			r.push(`walk over to ${him}`);
		} else {
			r.push(`flip ${him} over`);
		}
		r.push(`and ram`);
		if (V.PC.dick !== 0) {
			r.push(`your cock`);
		} else {
			r.push(`a strap-on`);
		}
		r.push(`up ${his} rear hole.`);
	} else if (slave.fuckdoll <= 80) {
		r.push(`${He} can follow intermediate commands, so you order ${him} to present ${his} rear hole. ${He} obediently`);
		if (hasAnyLegs(slave)) {
			r.push(`bends over, arches ${his} back, and`);
		} else {
			r.push(`flips over and`);
		}
		r.push(`winks ${his} anus until you insert`);
		if (V.PC.dick !== 0) {
			r.push(`your cock.`);
		} else {
			r.push(`a strap-on.`);
		}
	} else {
		r.push(`${He} can follow advanced commands, so you bring ${him} over to your chair`);
		if (hasAnyLegs(slave)) {
			r.push(`and order ${him} to squat down onto your`);
			if (V.PC.dick !== 0) {
				r.push(`cock`);
			} else {
				r.push(`strap-on`);
			}
			r.push(`and slide ${his} anus up and down`);
			if (V.PC.dick !== 0) {
				r.push(`your`);
			} else {
				r.push(`the`);
			}
			r.push(`shaft.`);
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
		r.push(`${He}'s not fully used to having things suddenly forced up ${his} ass, so ${he} struggles, and ${his} sphincter spasms deliciously.`);
	} else if (slave.fuckdoll <= 40) {
		r.push(`Aware that ${he} is supposed to relax and accept anal rape, ${he} does ${his} best to accommodate the sodomy.`);
	} else {
		r.push(`You command ${him} to milk your`);
		if (V.PC.dick !== 0) {
			r.push(`cock`);
		} else {
			r.push(`strap-on`);
		}
		r.push(`with ${his} asshole, and ${he} obediently tightens ${his} sphincter against the invading phallus rhythmically.`);
	}
	if (slave.fuckdoll <= 60) {
		if (slave.energy > 60) {
			r.push(`Denied any other outlet for ${his} powerful sex drive, ${he} orgasms.`);
		}
	} else {
		r.push(`Tuned to enjoy any use by total denial of all other stimulation, ${he} orgasms repeatedly as you fuck ${his} anus.`);
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
	r.push(`You climax${(V.PC.dick !== 0) ? `, filling ${his} rectum with your cum,` : ``} and return ${him} to`);
	if (hasAnyLegs(slave)) {
		r.push(`a standing position.`);
	} else {
		r.push(`where ${he} was resting.`);
	}
	if (V.PC.dick !== 0) {
		if (slave.anus > 2) {
			r.push(`Your cum flows out of ${his} gaped rear hole and down the material of ${his} suit.`);
		} else if (slave.anus === 2) {
			r.push(`Your cum drips out of ${his} loosened rear hole and down the material of ${his} suit.`);
		} else {
			r.push(`${His} tight rear hole retains every drop of your cum.`);
		}
		if (canImpreg(slave, V.PC)) {
			r.push(knockMeUp(slave, 5, 0, -1));
		}
		r.push(`The Fuckdoll will be cleaned by another slave.`);
	}
	if (slave.anus === 0) {
		if (slave.fetish !== Fetish.MINDBROKEN) {
			r.push(`As you return to your business, ${he} shakes slightly in place, and a few low moans come out of ${his} face hole. This is probably a reaction to losing ${his} anal virginity.`);
		} else {
			r.push(`${He} gives no external indication that ${he}'s aware that ${he}'s just lost ${his} anal virginity.`);
		}
		r.push(`In any case, <span class="virginity loss">${his} rear hole has been broken in.</span>`);
		slave.anus = 1;
	}
	App.Events.addParagraph(node, r);
	return node;
};
