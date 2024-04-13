App.Events.RESSTerrifiedInspection = class RESSTerrifiedInspection extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				canTalk,
				s => s.assignment !== Job.QUARTER,
				s => s.trust < -50,
				s => s.devotion <= 20,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself
		} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const hands = (hasBothArms(eventSlave)) ? `hands` : `hand`;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(
			App.UI.DOM.slaveDescriptionDialog(eventSlave),
			`appears in the door of your office for a scheduled inspection. ${He} hesitates in the doorway,`,
		);
		if (canSee(eventSlave)) {
			r.push(`staring fixedly downward with huge ${App.Desc.eyesColor(eventSlave)},`);
		} else {
			r.push(`${his} face towards the floor,`);
		}
		r.push(`before stumbling forward to stand in front of your desk. ${His} chest is rising and falling with panicked hyperventilation. The poor ${SlaveTitle(eventSlave)} is terrified of you for some reason.`);
		r.toParagraph();
		r.push(`You let ${him} stand there naked and shivering while you finish what you're working on. ${He} holds ${his} ${eventSlave.skin}`);
		if (hasBothArms(eventSlave)) {
			r.push(`hands down at ${his} sides, just like ${he}'s supposed to, but they twitch`);
		} else {
			r.push(`hand down at ${his} side, just like ${he}'s supposed to, but it twitches`);
		}
		r.push(`inward occasionally, betraying ${his} desire to shield ${his}`);
		if (eventSlave.nipples === "huge") {
			r.push(`prominent nipples`);
		} else if (eventSlave.boobs > 1000) {
			r.push(`big tits`);
		} else {
			r.push(`chest`);
		}
		r.push(`and`);
		if (eventSlave.dick >= 10) {
			r.push(`massive, limp dick`);
		} else if (eventSlave.dick > 7) {
			r.push(`huge, limp dick`);
		} else if (eventSlave.dick > 3) {
			r.push(`big, limp dick`);
		} else if (eventSlave.dick > 0) {
			r.push(`limp little prick`);
		} else if (eventSlave.clit > 1) {
			r.push(`absurd clit`);
		} else if (eventSlave.labia > 0) {
			r.push(`pretty petals`);
		} else if (eventSlave.vagina === -1) {
			r.push(`smooth, featureless groin`);
		} else {
			r.push(`pussy`);
		}
		r.push(`from your view. The wait gives license to ${his} fears. ${His}`);
		if (eventSlave.lips > 70) {
			r.push(`ridiculous`);
		} else if (eventSlave.lips > 0) {
			r.push(`plush`);
		}
		r.push(`lips are quivering, and tears are quickly gathering at the corners of ${his} eyes.`);

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Confirm ${his} fears about you`, confirm),
			new App.Events.Result(`Conduct a straightforward inspection`, conduct),
		]);

		function confirm() {
			const r = new SpacedTextAccumulator();
			if (canSee(eventSlave)) {
				r.push(`You throw ${him} a black cloth bag and tell ${him} to put it over ${his} head. ${He} obeys hurriedly, though ${he} cannot quite restrain ${his} tears from running down ${his} ${eventSlave.skin} cheeks as ${he} dons the bag, blinding ${himself}.`);
			}
			r.push(`${He} trembles, blind and terrified, for several agonized minutes before a strangled sob escapes ${him}. ${He} immediately cringes, expecting to be punished, but nothing happens. You let ${him} stand there for almost an hour, until you're sure ${he}'s let ${his} guard down, and then approach ${him} quietly. You consider ${his} body, your personal property, carefully; and on careful consideration, you aim a vicious flick at ${his}`);
			if (eventSlave.balls > 3) {
				r.push(`nutsack.`);
			} else if (eventSlave.dick > 0) {
				r.push(`cockhead.`);
			} else if (eventSlave.clit > 1) {
				r.push(`prominent clit.`);
			} else if (eventSlave.labia > 0) {
				r.push(`prominent labia.`);
			} else if (eventSlave.nipples === "huge") {
				r.push(`one of ${his} vulnerable nipples.`);
			} else {
				r.push(`one of ${his} nipples.`);
			}
			r.push(`A flick barely registers on the list of ways you can administer pain to a slave, but after so much sensory deprivation, it knocks ${him} halfway to the ground with a shriek of surprise and agony. ${He} crouches involuntarily, cherishing ${his} stinging`);
			if (eventSlave.balls > 3) {
				r.push(`testicles`);
			} else if (eventSlave.dick > 0) {
				r.push(`prick`);
			} else if (eventSlave.clit > 1) {
				r.push(`bitch button`);
			} else if (eventSlave.labia > 0) {
				r.push(`pussylips`);
			} else {
				r.push(`nipple`);
			}
			r.push(`with both hands, sobbing. You`);
			if (canSee(eventSlave)) {
				r.push(`pluck the bag off ${his} head and`);
			}
			r.push(`tell ${him} to get out. ${He} half-walks, half-crawls away,`);
			if (canSee(eventSlave)) {
				r.push(`shielding ${his} eyes from the sudden brightness,`);
			}
			r.push(`<span class="trust dec">choking on ${his} tears.</span>`);
			eventSlave.trust -= 5;
			r.toParagraph();
			return r.container();
		}

		function conduct() {
			const title = (eventSlave.rudeTitle === 1) ? PoliteRudeTitle(eventSlave) : Master;
			const r = new SpacedTextAccumulator();
			r.push(`You order ${him} to spin slowly in place in a matter-of-fact tone of voice. ${He} does,`);
			if (eventSlave.weight > 160) {
				r.push(`${his} fat body wobbling a little with the motion.`);
			} else if (eventSlave.belly >= 10000) {
				r.push(`${his} ${belly}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnant`);
				}
				r.push(`belly swinging wide as ${he} turns.`);
			} else if (eventSlave.weight > 95) {
				r.push(`${his} chubby body wobbling a little with the motion.`);
			} else if (eventSlave.weight > 30) {
				r.push(`${his} chubby belly wobbling a little with the motion.`);
			} else if (eventSlave.dick > 1) {
				r.push(`${his} soft dick waving a little with the motion.`);
			} else if (eventSlave.boobs > 800) {
				r.push(`${his} udders swaying a little with the motion.`);
			} else if (eventSlave.butt > 4) {
				r.push(`${his} ass jiggling a little with the motion.`);
			} else if (eventSlave.muscles > 5) {
				r.push(`${his} abs playing across ${his} midsection as ${he} does`);
			} else {
				r.push(`${his} trim rear catching your eye.`);
			}
			r.push(`In the same straightforward tone, you ask about ${his} health. ${He} swallows nervously and stammers,`);
			if (eventSlave.preg > eventSlave.pregData.normalBirth/8 && eventSlave.preg < eventSlave.pregData.normalBirth/3.33) {
				r.push(`"I, I haven't been feeling good in the morning,`);
			} else if (eventSlave.health.condition < -20) {
				r.push(`"I, I don't feel very good,`);
			} else if (eventSlave.preg.isBetween(0, eventSlave.pregData.normalBirth / 6.66)) {
				r.push(`"I, I feel a little off. The food`);
				if (canTaste(eventSlave)) {
					r.push(Spoken(eventSlave, `tastes`));
				} else {
					r.push(Spoken(eventSlave, `seems`));
				}
				r.push(Spoken(eventSlave, `weird lately and my breasts are really sensitive,`));
			} else if (eventSlave.health.condition > 20) {
				r.push(`"I'm, I'm okay,`);
			} else {
				r.push(`"I, I feel healthy,`);
			}
			if (eventSlave.preg > eventSlave.pregData.normalBirth-2 && eventSlave.pregControl !== "labor suppressors") {
				r.push(`and I think it might be time soon,`);
			}
			r.push(`${title}."`);
			r.toParagraph();
			r.push(`You then conduct a more thorough inspection, from the top of ${his} ${eventSlave.hColor}-haired head on down. ${He} complies submissively, obviously expecting to be abused at any moment. ${He} obediently`);
			if (eventSlave.boobs > 1000) {
				r.push(`lifts each of ${his} massive breasts one by one to display each of them from all angles.`);
			} else if (eventSlave.belly >= 5000) {
				r.push(`allows you to do as you will to ${his} gravid stomach.`);
			} else {
				r.push(`opens ${his} mouth and sticks out ${his} tongue on command.`);
			}
			r.push(`${He} even obeys an instruction to`);
			if (eventSlave.dick > 1) {
				r.push(`take ${himself} by the dickhead and pull ${his} member flat up against ${his} abdomen.`);
			} else if (eventSlave.dick > 0) {
				r.push(`take ${his} little dickhead between a thumb and forefinger and hold ${himself} out straight to reveal how tiny ${he} really is.`);
			} else if (eventSlave.clit > 1) {
				r.push(`push back ${his} hood to reveal all of ${his} enormous clit.`);
			} else if (eventSlave.labia > 1) {
				r.push(`spread ${his} meaty labia to reveal ${his} cunt.`);
			} else if (eventSlave.vagina === -1) {
				r.push(`really show off ${his} smooth groin, displaying every bit of it, down to the tiny hole that's its only feature.`);
			} else {
				r.push(`spread ${his} pussylips to show off ${his} cunt.`);
			}
			r.toParagraph();
			r.push(`Finally the inspection reaches ${his} backdoor, so you tell ${him} to turn around, bend over, and pull ${his} buttocks apart as wide as ${he} can. ${He} tenses in fear, obviously expecting anal rape, but after a moment of hesitation, ${he} obeys. ${He} turns,`);
			if (eventSlave.belly >= 10000) {
				r.push(`carefully bends,`);
			} else {
				r.push(`bends,`);
			}
			r.push(`and`);
			if (eventSlave.butt > 5) {
				r.push(`grabs a handful of buttcheek in`);
				if (hasBothArms(eventSlave)) {
					r.push(`both hands,`);
				} else {
					r.push(`${his} hand,`);
				}
				r.push(`trembling as ${he} spreads ${his} ass to reveal`);
			} else if (eventSlave.butt > 2) {
				r.push(`harshly pulls ${his} own buttcheeks apart, clearly hoping that if ${he} treats ${himself} this way, you won't. ${He} reveals`);
			} else {
				r.push(`even though ${his} trim ass has already revealed everything, uses ${his} ${hands} to spread ${himself} even wider to show off`);
			}
			if (eventSlave.anus > 2) {
				r.push(`${his} poor, overused asshole, which despite ${his} terror is still gaping a little.`);
			} else if (eventSlave.anus > 1) {
				r.push(`${his} asshole, which is clenched tight in terror.`);
			} else {
				r.push(`${his} invitingly tight asshole, which is clenched hard in terror.`);
			}
			r.push(`Maintaining your neutral tone, you ask ${him} how ${he} feels about anal sex.`);
			if (eventSlave.anus === 0) {
				r.push(
					Spoken(eventSlave, `"It's s-scary, ${title}. I'm afraid it'll h-hurt,"`),
					`${he} gasps out.`
				);
			} else if (eventSlave.fetishKnown === 1 && eventSlave.fetish === "buttslut") {
				r.push(
					Spoken(eventSlave, `"It's o-okay, ${title}. I d-don't hate it,"`),
					`${he} gasps out.`
				);
			} else if (eventSlave.sexualFlaw === "hates anal") {
				r.push(
					Spoken(eventSlave, `"I h-hate it, ${title}. It's d-dirty and it hurt,"`),
					`${he} gasps out.`
				);
			} else if (eventSlave.anus > 2) {
				r.push(
					Spoken(eventSlave, `"It's not that bad, ${title}. I'm used to getting assfucked, I guess,"`),
					`${he} ${say}s haltingly.`
				);
			} else {
				r.push(
					Spoken(eventSlave, `"I h-hate it, ${title}. I'm n-not used to it, and it hurts,"`),
					`${he} gasps out.`
				);
			}
			r.push(`Without another word, you tell ${him} ${he} can go. ${He} looks around to gape uncomprehendingly at you for a moment before letting go of ${his} buttocks, straightening up, and`);
			if (eventSlave.belly >= 10000) {
				r.push(`quickly waddling,`);
			} else {
				r.push(`fleeing,`);
			}
			r.push(`feeling rather mystified that you <span class="trust inc">didn't use ${him}.</span>`);
			eventSlave.trust += 4;
			r.toParagraph();
			return r.container();
		}
	}
};
