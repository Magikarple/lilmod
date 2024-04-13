/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fFuckdollImpreg = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He, His,
		he, his, him
	} = getPronouns(slave);

	const bonus = random(6, 20);
	seX(slave, slave.mpreg ? "anal" : 'vaginal', V.PC, "penetrative", bonus + 1);

	if (slave.mpreg === 1) {
		V.analTotal += bonus + 1;
	} else {
		V.vaginalTotal += bonus + 1;
	}

	r.push(`You decide to use the Fuckdoll's fertile womb to grow a child.`);
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
		r.push(`inside ${his}`);
		if (slave.mpreg === 1) {
			r.push(`asshole.`);
		} else {
			r.push(`vagina.`);
		}
	} else if (slave.fuckdoll <= 70) {
		r.push(`${He} can follow intermediate commands, so you order ${him} into a position for use of ${his}`);
		if (slave.mpreg === 1) {
			r.push(`rear`);
		} else {
			r.push(`front`);
		}
		r.push(`hole. ${He} obediently`);
		if (hasAllLimbs(slave)) {
			r.push(`gets down on all fours and`);
		}
		r.push(`cocks ${his} hips, offering ${his}`);
		if (slave.mpreg === 1) {
			r.push(`asspussy`);
		} else {
			r.push(`cunt`);
		}
		r.push(`until you insert your`);
		if (V.PC.dick > 0) {
			r.push(`cock`);
		} else {
			r.push(`strap-on`);
		}
		r.push(`into ${his}`);
		if (slave.mpreg === 1) {
			r.push(`winking`);
		} else {
			r.push(`wet`);
		}
		r.push(`channel.`);
	} else {
		r.push(`${He} can follow advanced commands, so you bring ${him} over to your chair`);
		if (hasAnyLegs(slave)) {
			r.push(`and order ${him} to squat down onto your cock and ride.`);
		} else {
			r.push(`and impale ${him} on your cock, ordering ${him} to do ${his} feeble best to bounce.`);
		}
	}
	if (slave.fuckdoll <= 20) {
		r.push(`${He}'s not fully used to being raped without warning, so ${he} struggles, ${his} muscles spasming delightfully.`);
	} else if (slave.fuckdoll <= 40) {
		r.push(`Aware that ${he} is supposed to relax and accept rape, ${he} does ${his} best to let you take ${him} without resistance.`);
	} else {
		r.push(`You command ${him} to milk your cock with ${his}`);
		if (slave.mpreg === 1) {
			r.push(`anal`);
		} else {
			r.push(`vaginal`);
		}
		r.push(`walls, and ${he} obediently starts to flex ${his} well-developed`);
		if (slave.mpreg === 1) {
			r.push(`cunt`);
		} else {
			r.push(`anal`);
		}
		r.push(`muscles, squeezing you from base to tip.`);
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
	r.push(`You climax, your cum shooting forward to splash against ${his} womb, and return ${he} to`);
	if (hasAnyLegs(slave)) {
		r.push(`a standing position`);
	} else {
		r.push(`where ${he} was resting`);
	}
	r.push(`to allow your seed to find ${his} mark.`);
	if (slave.mpreg === 1) {
		if (slave.anus > 2) {
			r.push(`Your cum flows out of ${his} gaping rear hole and down the material of ${his} suit.`);
		} else if (slave.anus === 2) {
			r.push(`Your cum drips out of ${his} well-fucked rear hole and down the material of ${his} suit.`);
		} else {
			r.push(`${His} tight rear hole retains almost every drop of your cum. A few escape and run down the material of ${his} suit.`);
		}
		r.push(`The Fuckdoll will be cleaned by another slave.`);
		if (slave.anus === 0) {
			if (slave.fetish !== Fetish.MINDBROKEN) {
				r.push(`As you return to your business, ${he} shakes slightly in place, and a few low moans come out of ${his} face hole. This is probably a reaction to losing ${his} anal virginity.`);
			} else {
				r.push(`${He} gives no external indication that ${he}'s aware that ${he}'s just lost ${his} virginity.`);
			}
			r.push(`In any case, <span class="virginity loss">${his} rear hole has been broken in.</span>`);
			slave.anus = 1;
		}
	} else {
		if (slave.vagina >= 10) {
			r.push(`Your cum steadily flows from its prolapsed front hole and down the material of ${his} suit.`);
		} else if (slave.vagina > 2) {
			r.push(`Your cum flows out of ${his} gaping front hole and down the material of ${his} suit.`);
		} else if (slave.vagina === 2) {
			r.push(`Your cum drips out of ${his} well-fucked front hole and down the material of ${his} suit.`);
		} else {
			r.push(`${His} tight front hole retains almost every drop of your cum. A few escape and run down the material of ${his} suit.`);
		}
		r.push(`The Fuckdoll will be cleaned by another slave.`);
		if (slave.vagina === 0) {
			if (slave.fetish !== Fetish.MINDBROKEN) {
				r.push(`As you return to your business, ${he} shakes slightly in place, and a few low moans come out of ${his} face hole. This is probably a reaction to losing ${his} virginity.`);
			} else {
				r.push(`${He} gives no external indication that ${he}'s aware that ${he}'s just lost ${his} virginity.`);
			}
			r.push(`In any case, <span class="virginity loss">${his} front hole has been broken in.</span>`);
			slave.vagina = 1;
		}
	}

	r.push(`You repeat this ritual throughout the week, ensuring that ${he} will be an <span class="pregnant">incubator for your child.</span>`);
	knockMeUp(slave, 100, 2, -1);

	if (FutureSocieties.isActive('FSRestart') && V.eugenicsFullControl !== 1) {
		if (slave.breedingMark !== 1 || V.propOutcome === 0) {
			r.push(`Rumors spread about you knocking up your playthings; the Societal Elite are <span class="elites loss">very displeased</span> by these rumors.`);
			V.failedElite += 5;
		}
	}
	App.Events.addParagraph(node, r);
	return node;
};
