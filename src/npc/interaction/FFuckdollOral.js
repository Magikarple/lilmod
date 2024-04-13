// cSpell:ignore beribbon

/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fFuckdollOral = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He,
		he, his, him
	} = getPronouns(slave);

	seX(slave, "oral", V.PC, "penetrative");
	r.push(`You decide to use the Fuckdoll's`);
	if (slave.lips > 95) {
		r.push(`facepussy.`);
	} else {
		r.push(`face hole.`);
	}
	if (slave.fuckdoll <= 10) {
		r.push(`Since ${he} is not well adapted to life as a living sex toy yet, ${he} won't respond to position commands. So, you simply`);
		if (hasBothLegs(slave)) {
			r.push(`shove ${him} into a kneeling position`);
		} else {
			r.push(`set ${him} on the couch`);
		}
		r.push(`and straddle ${his} face.`);
	} else if (slave.fuckdoll <= 80) {
		r.push(`${He} can follow intermediate commands, so you order ${him} into a position for use of ${his} face hole. ${He} obediently`);
		if (hasBothLegs(slave)) {
			r.push(`gets to ${his} knees`);
		} else {
			r.push(`cranes ${his} neck up`);
		}
		r.push(`and sticks ${his} tongue out as far as it will go, wiggling it invitingly. You straddle ${his} face.`);
	} else {
		r.push(`${He} can follow advanced commands, so you order ${him} into a position for use of ${his} face hole. ${He} instantly`);
		if (hasAnyLegs(slave)) {
			if (V.PC.dick !== 0) {
				r.push(`bends at the waist and turns ${his} head upward, placing ${his} throat horizontally and at waist height.`);
			} else {
				r.push(`gets to ${his} knees and turns ${his} head upward at just the right angle for a pussy to ride ${his} face hole.`);
			}
		} else {
			r.push(`cranes ${his} neck up and sticks ${his} tongue out as far as it will go, wiggling it invitingly.`);
		}
		r.push(`You straddle ${his} face.`);
	}
	if (slave.fuckdoll <= 20) {
		r.push(`${He}'s not fully used to being surprised with face rape, so ${he} struggles, and ${his} difficulty breathing`);
		if (V.PC.dick !== 0) {
			r.push(`makes ${his} throat spasm around your dickhead.`);
		} else {
			r.push(`feels lovely on your cunt.`);
		}
	} else if (slave.fuckdoll <= 50) {
		r.push(`Aware that ${he} is supposed to relax and let you rape ${his} face, ${he} does ${his} best to let you`);
		if (V.PC.dick !== 0) {
			r.push(`fuck ${his} throat.`);
		} else {
			r.push(`ride ${his} face.`);
		}
	} else {
		r.push(`You command ${him} to`);
		if (V.PC.dick !== 0) {
			r.push(`milk your dick, and ${he} begins to suck with almost frightening force.`);
		} else {
			r.push(`pleasure your cunt, and ${he} begins to eat you out with almost frightening hunger.`);
		}
	}
	if (slave.fuckdoll <= 60) {
		if (slave.energy > 80) {
			r.push(`Denied any other outlet for ${his} extreme sex drive, ${he} orgasms from nothing more than oral stimulation.`);
		}
	} else {
		r.push(`${He}'s so perfectly tuned that ${he} begins to orgasm from nothing more than oral stimulation, and ${he} continues to shiver with repeated orgasms as ${he} sucks.`);
	}
	r.push(`You climax,`);
	if (V.PC.dick !== 0) {
		r.push(`blowing your load down ${his} throat,`);
	} else {
		r.push(`giving ${him} a good amount of femcum to swallow,`);
	}
	r.push(`and return ${him} to`);
	if (hasAnyLegs(slave)) {
		r.push(`a standing position.`);
	} else {
		r.push(`where ${he} was resting.`);
	}
	if (V.PC.dick !== 0) {
		if (slave.lips > 95) {
			r.push(`${He} gives sloppy blowjobs, ${his} lips being too big for much control, and strings of your cum beribbon ${his} suit. The Fuckdoll will be cleaned by another slave.`);
		} else {
			r.push(`${He} swallows repeatedly as ${he} returns to ${his} resting posture.`);
		}
	}
	App.Events.addParagraph(node, r);
	return node;
};
