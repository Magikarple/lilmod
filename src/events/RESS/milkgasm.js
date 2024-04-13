// cSpell:ignore hurtss, RESSMilkgasm

App.Events.RESSMilkgasm = class RESSMilkgasm extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canMove,
				s => s.devotion >= -20,
				s => (canDoAnal(s) || canDoVaginal(s)),
				s => s.lactation > 1,
				s => s.boobs > 500
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(
			`${eventSlave.slaveName} is implanted with slow-release lactation drugs. ${His} lactation is dissimilar to that of a normal mother. It's the same stuff, but it's produced at a much, much higher volume. To stay comfortable,`,
			contextualIntro(V.PC, eventSlave, true),
			`has to use milkers every couple of`
		);
		if (eventSlave.assignment !== Job.MILKED) {
			r.push(`hours even though ${he} isn't assigned to give milk as ${his} primary job.`);
		} else {
			r.push(`hours.`);
		}
		r.push(`Any more than that, and ${he} gets painfully sore; any less than that, and`);
		if (eventSlave.nipples === "inverted" || eventSlave.nipples === "fuckable") {
			r.push(`${his} ${milkFlavor(eventSlave)}milk, backed up behind ${his} ${eventSlave.nipples} nipples, leaves ${him} in agony.`);
		} else {
			r.push(`${he} begins to spontaneously squirt cream whenever ${his} breasts are subjected to the slightest motion.`);
		}
		App.Events.addParagraph(node, r);

		r = [];
		r.push(`${He} constantly passes by your desk as you work, going back and forth between the milkers and ${his} other tasks. Even if you didn't know which was which, it would be easy to tell which way ${he} was going. One way, ${he}`);
		if (!canWalk(eventSlave)) {
			r.push(`crawls`);
		} else if (shoeHeelCategory(eventSlave) > 1) {
			r.push(`totters`);
		} else if (eventSlave.belly >= 10000) {
			r.push(`waddles`);
		} else {
			r.push(`walks`);
		}
		if (hasAnyArms(eventSlave)) {
			r.push(`gingerly, supporting ${his} udders with`);
			if (hasBothArms(eventSlave)) {
				r.push(`both hands`);
			} else {
				r.push(`${his} hand`);
			}
			if (eventSlave.belly >= 10000) {
				r.push(`and ${his} ${belly}`);
				if (eventSlave.belly >= 3000) {
					r.push(`pregnant`);
				} else {
					r.push(`rounded`);
				}
				r.push(`belly`);
			}
		} else {
			r.push(`gingerly, doing everything in ${his} limited capacity to keep them steady`);
		}
		r.push(r.pop() + ",");
		if (eventSlave.nipples === "inverted") {
			r.push(`wincing`);
		} else {
			r.push(`dribbling a little bit of ${milkFlavor(eventSlave)}milk`);
		}
		r.push(`as ${he} goes. The other way, ${he} has a distinctly relieved expression and ${his} breasts are much saggier.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Have some fun with ${him} once ${he}'s using the milkers`, fun, virginityWarning()),
			new App.Events.Result(`Delay ${his} milking and then fuck ${him} in public`, fuck, virginityWarning()),
			(eventSlave.nipples === "inverted" || eventSlave.nipples === "partially inverted" || eventSlave.nipples === "fuckable")
				? new App.Events.Result(`Delay ${his} milking and torture ${him} with the pressure`, torture, virginityWarning())
				: new App.Events.Result(),
		]);

		function fun() {
			r = [];
			r.push(`${eventSlave.slaveName} is face-down on a special bench much like one used for massages,`);
			if (eventSlave.belly >= 1500) {
				r.push(`though with a hole for ${his}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnant belly`);
				} else if (eventSlave.bellyImplant >= 3000) {
					r.push(`implant-filled belly`);
				} else {
					r.push(`${eventSlave.inflationType}-filled belly`);
				}
				r.push(`to fit into,`);
			}
			r.push(`with ${his} breasts hanging down so the milkers can work away at ${his} nipples. As such, ${his} back and ass are on display as ${he} grunts and groans with relief. ${He} starts at your hand on ${his} back but`);
			if (eventSlave.devotion > 20) {
				r.push(`quickly`);
			} else {
				r.push(`slowly`);
			}
			r.push(`relaxes.`);
			if (canDoVaginal(eventSlave)) {
				r.push(`The stimulation of the milking has ${him} soaking wet, and ${he} whimpers with pleasure as you enter ${his} sopping pussy. ${He}'s so wet that ${his} plentiful vaginal secretions make it`);
				if (canDoAnal(eventSlave)) {
					r.push(`very easy for you to switch`);
					if (V.PC.dick === 0) {
						r.push(`your strap-on`);
					} else {
						r.push(`your dick`);
					}
					r.push(`to the cow's butt.`);
					r.push(VCheck.Both(eventSlave, 1));
				} else {
					r.push(`clear that ${he} needs a second round.`);
					r.push(VCheck.Vaginal(eventSlave, 2));
				}
			} else if (eventSlave.chastityVagina) {
				r.push(`This milk cow's vagina is protected by a chastity belt, but ${his} butthole isn't. You fuck it`);
				if (V.PC.dick === 0) {
					r.push(`with a strap-on`);
				}
				r.push(`instead as ${he} bucks and grinds against the chair.`);
				r.push(VCheck.Anal(eventSlave, 1));
			} else {
				r.push(`Perversely, this milk cow has no pussy, so you spit on ${his} ass and sodomize ${him}`);
				if (V.PC.dick === 0) {
					r.push(`with a strap-on`);
				}
				r.push(`instead as ${he} bucks and grinds against the chair.`);
				r.push(VCheck.Anal(eventSlave, 1));
			}
			r.push(`When ${he} comes, the milkers detect ${his} orgasm to your fucking and shunt the ${milkFlavor(eventSlave)}milk into different reservoirs. Though you've never been able to taste much difference, there's a belief out there that 'milk-cum', the squirts of milk a slave milk ${girl} produces when climaxing with ${his} ${getWrittenTitle(eventSlave)}, have special aphrodisiac powers. <span class="cash inc">It can be sold at a special premium.</span> Naturally, <span class="devotion inc">${his} devotion to you has also increased.</span>`);
			cashX(100, "event", eventSlave);
			eventSlave.devotion += 4;
			return r;
		}

		function fuck() {
			r = [];
			r.push(`${eventSlave.slaveName} obeys`);
			if (eventSlave.devotion > 20) {
				r.push(`without hesitation`);
			} else {
				r.push(`hesitantly`);
			}
			r.push(`when you order ${him} to kneel next to your desk the next time ${he} tries to go to the milkers. ${His} equanimity is severely tested over the next hours as you ignore ${him}. The occasional glance at ${him} shows ${him} growing increasingly frantic as ${his} breasts grow heavier and ${his} nipples`);
			if (eventSlave.nipples !== "fuckable") {
				r.push(`get prouder.`);
			} else {
				r.push(`begin to prolapse.`);
			}
			if (eventSlave.preg > eventSlave.pregData.normalBirth / 1.33) {
				r.push(`Soon, ${his}`);
				if (eventSlave.pregType > 1) {
					r.push(`children's`);
				} else {
					r.push(`child's`);
				}
				r.push(`kicking is forcing ${milkFlavor(eventSlave)}milk out of ${his} swollen breasts.`);
			}
			r.push(`Eventually, the slight rising and falling of ${his} ribcage as ${he} inhales and exhales induces enough motion in ${his} overfull breasts that ${milkFlavor(eventSlave)}milk spurts out of ${him} with each breath. Satisfied that ${he}'s ready, you`);
			if (V.PC.dick === 0) {
				r.push(`don a strap-on and`);
			}
			r.push(`lead the whimpering, dripping slave out to a public street. Here, you hold ${him} upright so you can fuck ${him} standing. When ${he} finally comes through the pain of ${his} overfull udders, you reach forward and squeeze them. Making ${him} ${!canTalk(eventSlave) ? "silently" : ""} scream in pain and relief as ${he} sprays jets of ${milkFlavor(eventSlave)}milk. ${He} continually experiences aftershock orgasms as you continue pounding. You offer ${his} breasts to the growing crowd, many of whom come forward to taste ${his} cream.`);
			if (!canDoVaginal(eventSlave)) {
				r.push(`You fuck ${his} butt until they've sucked ${him} empty.`);
				r.push(VCheck.Anal(eventSlave, 1));
			} else {
				if (!canDoAnal(eventSlave)) {
					r.push(`You fuck ${his} pussy until they've sucked ${him} empty.`);
					r.push(VCheck.Vaginal(eventSlave, 1));
				} else {
					r.push(`You fuck ${his} pussy and ass, one after the other, until they've sucked ${him} empty.`);
					r.push(VCheck.Both(eventSlave, 1));
				}
			}
			r.push(`<span class="devotion inc">${His} submission to you has increased</span> and the <span class="reputation inc">public certainly appreciated the service.</span>`);
			eventSlave.devotion += 4;
			repX(500, "event", eventSlave);
			return r;
		}

		function torture() {
			r = [];
			r.push(`${eventSlave.slaveName} obeys`);
			if (eventSlave.devotion > 20) {
				r.push(`without hesitation`);
			} else {
				r.push(`hesitantly`);
			}
			r.push(`when you order ${him} to kneel next to your desk the next time ${he} tries to go to the milkers. ${His} devotion is severely tested over the next hours as you ignore ${him}. The occasional glance at ${him} shows ${him} growing increasingly frantic as ${his} breasts grow heavier and ${his} inverted nipples, which prevent any release of pressure without the strong suction of the`);
			if (eventSlave.nipples !== "fuckable") {
				r.push(`milkers to protrude them,`);
			} else {
				r.push(`milkers,`);
			}
			r.push(`grow more tender. Eventually, ${he} loses all composure and begins to beg you abjectly to give ${his} relief.`);
			if (canSee(eventSlave)) {
				r.push(`Your cruel smile`);
			} else if (canHear(eventSlave)) {
				r.push(`Your cruel snickers`);
			} else {
				r.push(`Your cruel prodding`);
			}
			r.push(`at the kneeling ${girl} with tears streaming down ${his} ${eventSlave.skin} cheeks fills ${him} with <span class="trust dec">anticipatory horror.</span> You tell ${him} to get on ${hasAnyArms(eventSlave) ? "all fours" : "the floor"} like the`);
			if (eventSlave.pregKnown === 1) {
				r.push(`pregnant`);
			}
			r.push(`cow ${he} is.`);
			if (eventSlave.belly >= 750000) {
				r.push(`${He} is so horribly`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnant`);
				} else {
					r.push(`bloated`);
				}
				r.push(`that it is a struggle just to shift onto ${his} ${belly} stomach in the hope that ${he} can even reach the floor with all ${hasAnyArms(eventSlave) ? "four" : `${his}`} limbs. Even worse, ${his} efforts are absolutely agonizing to ${his} engorged breasts; when ${he} finally does get onto the mass that is ${his} middle, the sudden shift of ${his} breasts causes ${him} to shriek with pain.`);
			} else if (eventSlave.belly >= 300000) {
				r.push(`${He} has to crawl onto ${his} ${belly} stomach to even get all ${hasAnyArms(eventSlave) ? "four" : `${his}`} limbs on the ground. The drastic shifting of ${his} breasts is agonizing and ${he} shrieks in spite of ${himself}.`);
			} else if (eventSlave.belly >= 100000) {
				r.push(`${He} slowly does, ${his} ${belly} stomach coming to rest on the floor beneath ${him}, but the simple movement is agonizing and seems to last forever causing ${him} to shriek in spite of ${himself}.`);
			} else if (eventSlave.belly >= 10000) {
				r.push(`${He} gingerly does, taking care to give ${his} ${belly} stomach room, but the simple movement is agonizing and seems to last forever causing ${him} to shriek in spite of ${himself}.`);
			} else {
				r.push(`${He} does, but the simple movement is agonizing and ${he} shrieks in spite of ${himself}.`);
			}
			r.push(`You slide`);
			if (V.PC.dick !== 0) {
				r.push(`your turgid cock`);
			} else {
				r.push(`a big strap-on`);
			}
			r.push(`into ${him} and seize ${him} by ${his}`);
			if (eventSlave.weight > 160) {
				r.push(`extremely well padded`);
			} else if (eventSlave.weight > 95) {
				r.push(`well padded`);
			} else if (eventSlave.weight > 30) {
				r.push(`chubby`);
			} else if (eventSlave.muscles > 30) {
				r.push(`muscular`);
			} else if (eventSlave.weight > 10) {
				r.push(`plush`);
			} else if (eventSlave.weight >= -30) {
				r.push(`trim`);
			} else {
				r.push(`skinny`);
			}
			r.push(`hips. ${He} knows what's coming and tries to ready ${himself}, but as you begin to pound ${him} without mercy, the motion of ${his} breasts forces a huge sobbing scream out of ${him}.`);
			if (canTalk(eventSlave)) {
				r.push(Spoken(eventSlave, `"Please, ${Master}! AAAH! It hurts! It AAAH hurtss- so b-baAAAH!"`));
			}
			r.push(`It hurts so badly, in fact, that ${he} doesn't seem to notice what you're doing to ${his} lower half, other than the motion it produces in ${his} upper half. Amused by the realization,`);
			if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
				r.push(`you pull your`);
				if (V.PC.dick !== 0) {
					r.push(`dick`);
				} else {
					r.push(`phallus`);
				}
				r.push(`out of ${him} and shove it up ${his} butthole without warning.`);
			} else {
				r.push(`you insert a couple of fingers alongside your`);
				if (V.PC.dick !== 0) {
					r.push(`dick.`);
				} else {
					r.push(`phallus.`);
				}
			}
			r.push(`${He} just goes on ${canTalk(eventSlave) ? "screaming" : "complaining"} about how much ${his} boobs hurt. Eventually, you tire of ${his} bellowing, so you reach around and pop`);
			if (eventSlave.nipples !== "fuckable") {
				r.push(`${his} nipples out one by one.`);
			} else {
				r.push(`finger into each nipple.`);
			}
			r.push(`The ${canTalk(eventSlave) ? "shrieking" : "whining"} reaches a paroxysm, but once they're`);
			if (eventSlave.nipples !== "fuckable") {
				r.push(`protruded,`);
			} else {
				r.push(`opened,`);
			}
			r.push(`the ${milkFlavor(eventSlave)}milk begins to jet out of ${him} in a pair of uninterrupted streams. ${He} collapses forward onto ${his} face, crying with relief as the pain in ${his} breasts recedes. As it does, ${he} finally begins to notice`);
			if (canDoAnal(eventSlave)) {
				r.push(`the pain in ${his} backdoor as you continue to abuse`);
				if (eventSlave.anus === 0) {
					eventSlave.anus++;
					r.push(`it, and that ${he} is <span class="virginity loss">no longer an anal virgin.</span>`);
				} else {
					r.push(`it.`);
				}
				if (canDoVaginal(eventSlave) && eventSlave.vagina === 0) {
					eventSlave.vagina++;
					r.push(`${He}'ll eventually realize that ${his} <span class="virginity loss">virginity was taken</span> while ${he} was distracted by ${his} breasts.`);
				}
				r.push(VCheck.Both(eventSlave, 1));
			} else {
				r.push(`the pain in ${his} cunt as you continue to abuse`);
				if (eventSlave.vagina === 0) {
					eventSlave.vagina++;
					r.push(`it, and that ${he} is <span class="virginity loss">no longer a virgin.</span>`);
				} else {
					r.push(`it.`);
				}
				r.push(VCheck.Vaginal(eventSlave, 1));
			}
			eventSlave.trust -= 4;
			return r;
		}

		function virginityWarning(){
			if ((eventSlave.anus === 0 && canDoAnal(eventSlave)) || (eventSlave.vagina === 0 && canDoVaginal(eventSlave))) {
				return `This option will take ${his} virginity`;
			}
		}
	}
};
