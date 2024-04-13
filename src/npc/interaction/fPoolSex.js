/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fPoolSex = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He,
		he, his, him, himself, hers
	} = getPronouns(slave);

	r.push(`You order ${him} to meet you in the spa for some quality time in the penthouse's rejuvenating gelatin pool. When you get there, ${he}'s already in ${his} bathing attire, reclined at the side of the pool farthest from you with ${his} massive ${slave.skin} stomach hanging over the edge and half sunk in the thick, steaming ooze, flushed and sweaty.`);
	if (slave.devotion > 95) {
		if (!isAmputee(slave)) {
			r.push(`${He}'s resting ${his} head on one arm, but ${he} gives you a little wave`);
			if (!hasBothArms(slave)) {
				r.push(`anyway`);
			} else {
				r.push(`with the other`);
			}
			r.push(`before setting it to rubbing the flank of one`);
			if (slave.boobs >= 20000) {
				r.push(`massively overgrown tit`);
			} else if (Math.floor(slave.boobsImplant / slave.boobs) >= .60) {
				r.push(`fat, augmented tit`);
			} else if (slave.boobs >= 3000) {
				r.push(`huge breast`);
			} else {
				r.push(`petite breast`);
			}
			r.push(`as ${he}`);
		} else {
			r.push(`${He}'s resting on a small pile of pillows, enjoying the feeling against the flanks of ${his} colossal belly. ${He} wiggles a welcome to you and then`);
		}
		if (canSee(slave)) {
			r.push(`watches`);
		} else {
			r.push(`waits patiently as`);
		}
		r.push(`you strip down and change into your swimming outfit. When it's clear that you're ready to join ${him}, ${he} motions at the pool's holographic console and coos in delight as its mobility assistance devices kick in, rolling ${him} into the curative gel. You sink yourself into the pool, taking a moment to bask in the feeling of the warm, curative-laced goo as it relaxes your muscles${(V.PC.preg > 30) ? ` and soothes your stretched skin` : ``}, then wade toward your waiting slave.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`${He} smiles and beckons you toward ${him}, rubbing circles in the exploded sides of ${his} colossal belly, then gasps as you take a handful of the ooze and shove it right in ${his} face. ${He} sputters indignantly and then`);
		if (hasAnyArms(slave)) {
			r.push(`scoops up a handful ${himself}, flinging it at you. The two of you spend several minutes goo fighting before, eventually, you decide that your`);
		} else {
			r.push(`wobbles back and forth, ineffectually trying to fight back as you cover ${him} in thick wads of gel, over and over. After several minutes of this, you decide that your`);
		}
		if (V.PC.dick !== 0) {
			r.push(`solid, quivering erection is in need of ${his} tender care.`);
			if (canSee(slave)) {
				r.push(`Seeing`);
			} else {
				r.push(`Sensing`);
			}
			r.push(`the change in your demeanor, ${he} rolls back to recline at the pool's edge and, once you've joined ${him},`);
			if (hasAnyArms(slave)) {
				r.push(`reaches down to masturbate your ooze-lubricated dick.`);
			} else {
				r.push(`rolls forward and reaches down to tease your cockhead with ${his} mouth${(slave.boobs > 600) ? ` and tits` : ``}.`);
			}
			r.push(`When you feel yourself at the edge of orgasm, you slide in between ${his}`);
			if (slave.butt > 11) {
				r.push(`debilitatingly enormous, cushiony ass`);
			} else if (slave.butt > 5) {
				r.push(`massive, cushiony ass`);
			} else if (Math.floor(slave.buttImplant / slave.butt) > .60) {
				r.push(`implant-swollen ass`);
			} else if (slave.butt > 2) {
				r.push(`plush ass`);
			} else {
				r.push(`back`);
			}
			r.push(`and the pool's silk-lined wall. Reaching, you tease ${his}`);
			if (canDoVaginal(slave)) {
				r.push(`kitty`);
			} else {
				r.push(`asshole`);
			}
			r.push(`with your fingers and ${he} crushes backward into you, moaning and rotating ${his} hips in response to your attention. Once you're certain ${he}'s ready, you slide into ${him}, driving you both to orgasm.`);
			if (canDoVaginal(slave)) {
				r.push(VCheck.Vaginal(slave, 1));
			} else {
				r.push(VCheck.Anal(slave, 1));
			}
		} else {
			r.push(`ooze-stimulated quim is in need of ${his} tender care. Seeing the change in your demeanor, ${he} rolls back to recline at the pool's edge and, once you've joined ${him},`);
			if (hasAnyArms(slave)) {
				r.push(`reaches down to masturbate your pussy, squeezing and rubbing your clit.`);
			} else {
				r.push(`rolls sideways and rubs your vulva as best ${he} can.`);
			}
			if (slave.dick >= 1) {
				r.push(`When you feel yourself at the edge of orgasm, you have the pool's mobility aids rotate ${him} into a position level with the pool's edge, then hop up on that ledge yourself so that you can don a dildo and ream ${his}`);
				if (canDoVaginal(slave)) {
					r.push(`pussy. ${VCheck.Vaginal(slave, 1)}`);
				} else {
					r.push(`asshole. ${VCheck.Anal(slave, 1)}`);
				}
				r.push(`Satisfied that the angles are right, you grab hold of ${his} hips and slide half on top of ${him}, resting your lower half on the rear swell of ${his} obscenely bloated belly. Pressing your strap-on to ${his} needy hole, you tease ${him} for a moment before ramming home, driving the both of you to repeated orgasm.`);
			} else {
				r.push(`When you feel yourself at the edge of orgasm, you have the pool's mobility aids rotate ${him} into a position level with the pool's edge, then hop up on that ledge yourself so that your pussies are level. Satisfied that the angles are right, you grab hold of ${his} hips and slide half on top of ${him}, resting your lower half on the rear swell of ${his} obscenely bloated belly. Pressing your lower lips to ${hers}, you rub your clits together, driving the both of you to repeated orgasm.`);
				seX(slave, "vaginal", V.PC);
			}
		}
	} else if (slave.trust < -20 && slave.devotion > -10) {
		if (hasAnyArms(slave)) {
			r.push(`${He}'s resting ${his} head on one arm, but ${he} nods at you in acknowledgment as`);
		} else {
			r.push(`${He}'s resting on a small pile of pillows, enjoying the sensations against the flanks of ${his} colossal belly. ${He} nods as you enter, not stopping ${his} rubbing, and`);
			if (canSee(slave)) {
				r.push(`watches`);
			} else {
				r.push(`waits patiently as`);
			}
		}
		r.push(`you strip down and change into your swimming outfit. When it's clear that you're ready to join ${him}, ${he} motions at the pool's holographic console and its mobility assistance devices kick in, rolling ${him} into the curative gel. You sink yourself into the pool, taking a moment to bask in the feeling of the warm, curative-laced goo as it relaxes your muscles${(V.PC.preg > 30) ? ` and soothes your stretched skin` : ``}, then wade toward your waiting slave.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`${He} smiles politely, rubbing circles in the exploded sides of ${his} colossal belly, then gasps as you take a handful of the ooze and shove it right in ${his} face. ${He} sputters indignantly and then`);
		if (hasAnyArms(slave)) {
			r.push(`scoops up a handful ${himself}, flinging it at you. The two of you spend several minutes goo fighting before, eventually, you decide that your`);
		} else {
			r.push(`wobbles back and forth, ineffectually trying to fight back as you cover ${him} in thick wads of gel, over and over. After several minutes of this, you decide that your`);
		}
		if (V.PC.dick !== 0) {
			r.push(`solid, quivering erection is in need of ${his} tender care.`);
			if (canSee(slave)) {
				r.push(`Seeing`);
			} else {
				r.push(`Sensing`);
			}
			r.push(`the change in your demeanor, ${he} rolls back to recline at the pool's edge and, once you've joined ${him},`);
			if (hasAnyArms(slave)) {
				r.push(`reaches down to masturbate your ooze-lubricated dick.`);
			} else {
				r.push(`rolls forward and reaches down to tease your cockhead with ${his} mouth${(slave.boobs > 600) ? ` and tits` : ``}.`);
			}
			r.push(`When you feel yourself at the edge of orgasm, you slide in between ${his}`);
			if (slave.butt > 11) {
				r.push(`debilitatingly enormous, cushiony ass`);
			} else if (slave.butt > 5) {
				r.push(`massive, cushiony ass`);
			} else if (Math.floor(slave.buttImplant / slave.butt) > .60) {
				r.push(`implant-swollen ass`);
			} else if (slave.butt > 2) {
				r.push(`plush ass`);
			} else {
				r.push(`back`);
			}
			r.push(`and the pool's silk-lined wall. Reaching, you tease ${his}`);
			if (canDoVaginal(slave)) {
				r.push(`kitty`);
			} else {
				r.push(`asshole`);
			}
			r.push(`with your fingers and ${he} crushes backward into you, moaning and rotating ${his} hips in response to your attention. Once you're certain ${he}'s ready, you slide into ${him}, driving you both to orgasm.`);
			if (canDoVaginal(slave)) {
				r.push(VCheck.Vaginal(slave, 1));
			} else {
				r.push(VCheck.Anal(slave, 1));
			}
		} else {
			r.push(`ooze-stimulated quim is in need of ${his} tender care. Seeing the change in your demeanor, ${he} rolls back to recline at the pool's edge and, once you've joined ${him},`);
			if (hasAnyArms(slave)) {
				r.push(`reaches down to masturbate your pussy, squeezing and rubbing your clit.`);
			} else {
				r.push(`rolls sideways and rubs your vulva as best ${he} can.`);
			}
			if (slave.dick >= 1) {
				r.push(`When you feel yourself at the edge of orgasm, you have the pool's mobility aids rotate ${him} into a position level with the pool's edge, then hop up on that ledge yourself so that you can don a dildo and ream ${his}`);
				if (canDoVaginal(slave)) {
					r.push(`pussy. ${VCheck.Vaginal(slave, 1)}`);
				} else {
					r.push(`asshole. ${VCheck.Anal(slave, 1)}`);
				}
				r.push(`Satisfied that the angles are right, you grab hold of ${his} hips and slide half on top of ${him}, resting your lower half on the rear swell of ${his} obscenely bloated belly. Pressing your strap-on to ${his} needy hole, you tease ${him} for a moment before ramming home, driving the both of you to repeated orgasm.`);
			} else {
				r.push(`When you feel yourself at the edge of orgasm, you have the pool's mobility aids rotate ${him} into a position level with the pool's edge, then hop up on that ledge yourself so that your pussies are level. Satisfied that the angles are right, you grab hold of ${his} hips and slide half on top of ${him}, resting your lower half on the rear swell of ${his} obscenely bloated belly. Pressing your lower lips to ${hers}, you rub your clits together, driving the both of you to repeated orgasm.`);
				seX(slave, "vaginal", V.PC);
			}
		}
	} else {
		if (hasAnyArms(slave)) {
			r.push(`${He}'s resting ${his} head on one arm, but ${he} starts as you enter, watching tensely as`);
		} else {
			r.push(`${He}'s resting on a small pile of pillows, savoring the sensations against the flanks of ${his} colossal belly and`);
			if (slave.boobs >= 20000) {
				r.push(`massively overgrown tits`);
			} else if (Math.floor(slave.boobsImplant / slave.boobs) >= .60) {
				r.push(`fat, augmented tits`);
			} else if (slave.boobs >= 3000) {
				r.push(`huge breasts`);
			} else {
				r.push(`petite breasts`);
			}
			r.push(`${He} starts as you enter, watching tensely as`);
		}
		r.push(`you strip down and change into your swimming outfit. When you're ready to join ${him}, you motion at the pool's holographic console and its mobility assistance devices kick in, rolling ${him} into the curative gel. You sink yourself into the pool, taking a moment to bask in the feeling of the warm, curative-laced goo as it relaxes your muscles${(V.PC.preg > 30) ? ` and soothes your stretched skin` : ``}, then wade toward your worried looking slave.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`${He} smiles politely, rubbing circles in the exploded sides of ${his} colossal belly, then cries out in surprise as you take a handful of the ooze and shove it right in ${his} face. ${He} sputters, blushing, and wobbles back and forth, clearly trying not to react as you cover ${him} in thick wads of gel, over and over. After several minutes of this, you decide that your`);
		if (V.PC.dick !== 0) {
			r.push(`solid, quivering erection is in need of ${his} tender care. You force ${him} back into a reclining position at the pool's edge and order ${him} to`);
			if (hasAnyArms(slave)) {
				r.push(`masturbate your ooze-lubricated dick.`);
			} else {
				r.push(`tease your cockhead with ${his} mouth.`);
			}
			r.push(`${He} complies, bringing you to the edge of orgasm, and, before ${he} can fully push you over the edge, you slide in between ${his}`);
			if (slave.butt > 7) {
				r.push(`debilitatingly enormous, cushiony ass`);
			} else if (slave.butt > 4) {
				r.push(`massive, cushiony ass`);
			} else if (slave.butt > 2) {
				r.push(`implant-swollen ass`);
			} else if (slave.buttImplant === 1) {
				r.push(`plush ass`);
			} else {
				r.push(`back`);
			}
			r.push(`and the pool's silk-lined wall. Reaching, you tease ${his}`);
			if (canDoVaginal(slave)) {
				r.push(`kitty`);
			} else {
				r.push(`asshole`);
			}
			r.push(`with your fingers and rub one hand back and forth along the line of ${his} tensed shoulders as ${he} slowly gives in to lust. Once you're certain ${he}'s ready, you slide into ${him}, driving you both to orgasm.`);
			if (canDoVaginal(slave)) {
				r.push(VCheck.Vaginal(slave, 1));
			} else {
				r.push(VCheck.Anal(slave, 1));
			}
		} else {
			r.push(`ooze-stimulated quim is in need of ${his} tender care. You force ${him} back to recline at the pool's edge and, once you've joined ${him},`);
			if (hasAnyArms(slave)) {
				r.push(`set ${him} to masturbating your pussy, squeezing and rubbing your clit.`);
			} else {
				r.push(`set ${him} to rubbing your vulva with ${his} belly button.`);
			}
			if (slave.dick >= 1) {
				r.push(`When you feel yourself at the edge of orgasm, you have the pool's mobility aids rotate ${him} into a position level with the pool's edge, then hop up on that ledge yourself so that you can don a dildo and ream ${his}`);
				if (canDoVaginal(slave)) {
					r.push(`pussy. ${VCheck.Vaginal(slave, 1)}`);
				} else {
					r.push(`asshole. ${VCheck.Anal(slave, 1)}`);
				}
				r.push(`Satisfied that the angles are right, you grab hold of ${his} hips and slide half on top of ${him}, resting your lower half on the rear swell of ${his} obscenely bloated belly. Pressing your strap-on to ${his} needy hole, you tease ${him} for a moment before ramming home, driving the both of you to repeated orgasm.`);
				r.push(VCheck.Anal(slave, 1));
			} else {
				r.push(`When you feel yourself at the edge of orgasm, you have the pool's mobility aids rotate ${him} into a position level with the pool's edge, then hop up on that ledge yourself so that your pussies are level. Satisfied that the angles are right, you grab hold of ${his} hips and slide half on top of ${him}, resting your lower half on the rear swell of ${his} obscenely bloated belly. Pressing your lower lips to ${hers}, you rub your clits together, driving the both of you to repeated orgasm.`);
				seX(slave, "vaginal", V.PC);
			}
		}
	}
	r.push(`After you've finished with ${him}, you escort ${him} to the spa's attached showers so that the two of you can enjoy a bit more time together as you clean off, then allow ${him} to return to ${his} duties as you return to your own.`);
	App.Events.addParagraph(node, r);
	return node;
};
