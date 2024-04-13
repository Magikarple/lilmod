// cSpell:ignore faceful

App.Events.RESSSpaBoobs = class RESSSpaBoobs extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.spa > 0,
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				canTalk,
				s => s.assignment !== Job.QUARTER,
				s => s.boobs > 2000,
				s => s.devotion > 20,
				s => s.trust > 20,
				s => canDoAnal(s) || canDoVaginal(s),
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, hers
		} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(
			`The steamy air and hot water of the spa aren't only for slaves assigned to rest there full-time. When you head in to soak the day's stress away one evening, you see the back of`,
			contextualIntro(PC, eventSlave, true)
		);
		r.addToLast(`'s head resting against the edge of the warm pool; ${he}'s clearly come in after work.`);
		if (canHear(eventSlave)) {
			r.push(`${He} doesn't hear you come in and stays fully relaxed.`);
		} else {
			r.push(`${He}'s relaxed enough to exit the state of "high alert" ${his} deafness usually forces ${him} to be in.`);
		}
		r.push(`By the time you've showered`);
		if (S.Attendant) {
			r.addToLast(`, fucked the compliant ${S.Attendant.slaveName},`);
		}
		r.push(`and gotten ready to enter the pool, ${he}'s reached such a state of blissful relaxation that ${he} slides ${his} body off the ledge around the side of the pool and floats face-up with ${his} eyes closed.`);
		r.toParagraph();
		r.push(`The sight is comical.`);
		if (eventSlave.belly >= 5000 || eventSlave.weight > 95) {
			r.push(`Four`);
		} else {
			r.push(`Three`);
		}
		r.push(`things break the surface of the water: ${his} ${eventSlave.skin} face,`);
		if (eventSlave.belly >= 5000 || eventSlave.weight > 95) {
			r.push(`${his}`);
			if (eventSlave.belly >= 5000) {
				r.push(belly);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`gravid`);
				}
			} else {
				r.push(`fat`);
			}
			r.push(`belly, and two enormous breasts.`);
		} else {
			r.push(`and two enormous breasts.`);
		}
		if (eventSlave.nipples === "huge") {
			r.push(`Each is capped by a gigantic nipple, soft with relaxation and the heat of the spa, but hugely prominent.`);
		}
		if (eventSlave.areolae > 1) {
			r.push(`${His} areolae spread widely around each nipple.`);
		}
		if (eventSlave.boobsImplant/eventSlave.boobs >= .50) {
			r.push(`${His} implants keep ${his} tits shaped in exactly the same way regardless of currents in the water, betraying their fake nature.`);
		} else if (eventSlave.boobsImplant === 0) {
			r.push(`${His} all-natural boobs move gently with currents in the water.`);
		} else {
			r.push(`${His} boobs bob gently to the currents in the water with just a bit more firmness than one would expect.`);
		}
		if (eventSlave.belly >= 500000) {
			r.push(`It's amazing ${he} can manage to stay afloat with ${his} middle that hugely distended.`);
		} else if (eventSlave.weight > 95) {
			r.push(`Water soundly laps against the sides of the flabby island that is ${his} gut.`);
		}
		r.push(`In any case, ${he}'s completely lost in the warmth and comfort of the water — and the relief of having the weight taken off ${his} chest`);
		if (eventSlave.belly >= 100000) {
			r.push(`and stomach`);
		}
		r.push(`for a brief moment.`);

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Sit against the side of the pool with ${him} in your lap`, sit, (eventSlave.anus === 0) ? `This option will take ${his} anal virginity` : null),
			new App.Events.Result(`Fuck ${him} under the water`, fuck, virginityWarning()),
		]);

		function virginityWarning() {
			if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0)) {
				return `This option will take ${his} virginity`;
			} else if (!canDoVaginal(eventSlave) && (eventSlave.anus === 0)) {
				return `This option will take ${his} anal virginity`;
			}
		}

		function sit() {
			const r = new SpacedTextAccumulator();
			r.push(`You`);
			if (V.PC.dick === 0) {
				r.push(`don a waterproof, vibrating strap-on and`);
			}
			r.push(`step into the pool and`);
			if (eventSlave.belly >= 450000) {
				r.push(`struggle to`);
			}
			r.push(`lift ${him} half-out of the water in a bridal carry, your arms behind ${his} shoulders and the backs of ${his} knees.`);
			if (canSee(eventSlave)) {
				r.push(`${His} eyes open`);
			} else {
				r.push(`${He} mumbles`);
			}
			r.push(`sleepily`);
			if (eventSlave.belly >= 1500) {
				r.push(`as ${he} rests a hand on ${his} ${belly} belly,`);
			}
			r.push(`and ${he} ${say}s`);
			if (eventSlave.lips > 70) {
				r.push(`through ${his} huge lips,`);
			} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
				r.push(`through ${his} piercings,`);
			} else {
				r.push(`quietly,`);
			}
			r.push(`"Hi, ${Master}." You sit against the side of the pool, letting ${his}`);
			if (eventSlave.butt > 8) {
				r.push(`massive`);
			} else if (eventSlave.butt > 5) {
				r.push(`huge`);
			} else if (eventSlave.butt > 2) {
				r.push(`healthy`);
			} else {
				r.push(`trim`);
			}
			r.push(`bottom sink down into your lap. ${He} shimmies ${himself} atop your`);
			if (V.PC.dick === 0) {
				r.push(`phallus,`);
			} else {
				r.push(`dick,`);
			}
			r.push(`gently seating it between ${his} buttocks, and cranes ${his} neck back to kiss the bottom of your chin. ${He} gradually comes out of ${his} heat stupor, riding ${himself} back and forth more and more until the`);
			if (eventSlave.anus > 2) {
				r.push(`slit of ${his} asspussy`);
			} else if (eventSlave.anus > 1) {
				r.push(`opening of ${his} anus`);
			} else {
				r.push(`pucker of ${his} butt`);
			}
			r.push(`rests against your`);
			if (V.PC.dick === 0) {
				r.push(`strongly vibrating strap-on.`);
			} else {
				r.push(`cock.`);
			}
			r.push(`You take ${his} hips and firmly thrust into ${his} rectum, eliciting a little whimper, but ${he} begins to bounce gently in the water, sodomizing ${himself}, ${his} gigantic breasts moving up and down and making concentric ripples spread outward. ${He}'s still very relaxed and ${his} first orgasm takes ${him} by surprise,`);
			if (eventSlave.balls > 0) {
				r.push(`${his} cum floating to the surface;`);
				if (canSee(eventSlave)) {
					r.push(`${he} points at it and giggles`);
				} else {
					r.push(`${he} feels it brush ${his} skin and giggles`);
				}
				r.push(`before getting`);
			} else {
				r.push(`making ${him} twitch and shudder with aftershocks as ${he} gets`);
			}
			r.push(`${his} feet up on the ledge to ride you harder. When you're done you let ${him} float again, but curiosity about how ${his} fucked butt feels under the water leads you to reach a hand`);
			if (hasBothLegs(eventSlave)) {
				r.push(`between ${his} legs`);
			} else {
				r.push(`underneath ${him}`);
			}
			r.push(`and grope ${his} anus. ${His} warm, relaxed`);
			if (eventSlave.anus > 2) {
				r.push(`asspussy`);
			} else if (eventSlave.anus > 1) {
				r.push(`backdoor`);
			} else {
				r.push(`tightness`);
			}
			r.push(`is so enticing you push ${him} to ${his} feet and take ${him} a second time, standing in the shoulder-depth water. By the time you're done ${he}'s so <span class="devotion inc">sexually exhausted</span> that you carry ${him} to the shower.`);
			r.push(VCheck.Anal(eventSlave, 2));
			eventSlave.devotion += 4;
			r.toParagraph();
			return r.container();
		}

		function fuck() {
			const r = new SpacedTextAccumulator();
			r.push(`You gather some necessary items into a pool bag and step stealthily into the water, taking ${him} by an ankle and towing ${him} toward the deep end. "Hi, ${Master}," comes a sleepy greeting from the slave as you pull ${him} through the water, ${his} boobs making twin bow waves. ${He} manages a shocked squeal as you quickly secure a weight belt`);
			if (eventSlave.belly >= 120000) {
				r.push(`above ${his}`);
			} else {
				r.push(`around ${his}`);
			}
			if (eventSlave.belly >= 1500) {
				r.push(`${belly}`);
			} else if (eventSlave.weight > 95) {
				r.push(`soft`);
			}
			r.push(`middle and drop ${him}, letting ${him} sink so swiftly that`);
			if (eventSlave.butt > 5) {
				r.push(`${his} massive bottom pads ${him} against a painful thump on`);
			} else if (eventSlave.butt > 2) {
				r.push(`${his} healthy bottom pads ${him} against a painful thump on`);
			} else {
				r.push(`${his} bottom receives a painful thump against`);
			}
			r.push(`the bottom of the pool. Before ${he} can panic, ${he} feels your mouth against ${his}`);
			if (eventSlave.lips > 70) {
				r.push(`dick-sucking`);
			} else if (eventSlave.lips > 20) {
				r.push(`lovely`);
			}
			r.push(`lips, breathing for ${him}. You have two long, flexible snorkels designed for exactly this, but you keep ${hers} away from ${him} and breathe ${his} air into ${him} for a short time, and ${he} <span class="trust inc">trusts</span> you enough to rely on you. When you finally give ${him} ${his} snorkel ${he} laughs, bubbles rising from around the mouthpiece, and then hugs you impulsively, intentionally giving you a huge faceful of boob. You pull ${his} weight belt down and tighten it around ${his} ankles so ${he}'s pinned standing on the bottom, and then`);
			if (V.PC.vagina !== -1) {
				r.push(`spread ${his} knees so you can scissor your pussy against ${him} in the near-zero gravity, the tangle of limbs and breasts swaying gently as you grind.`);
			} else {
				r.push(`insert yourself into the`);
				if (canDoVaginal(eventSlave)) {
					if (eventSlave.vagina > 3) {
						r.push(`welcoming gape of ${his} pussy.`);
					} else if (eventSlave.vagina > 2) {
						r.push(`loose embrace of ${his} pussy.`);
					} else if (eventSlave.vagina > 1) {
						r.push(`welcoming embrace of ${his} pussy.`);
					} else {
						r.push(`tight tight embrace of ${his} pussy.`);
					}
					r.push(`${He} enjoys the sensation of such an unusual fucking, wriggling against ${his} weighted feet and moaning through ${his} snorkel as you gently take ${him} under water. ${His} enormous breasts quiver in near-zero gravity with each thrust, until you notice the delicious motion and take one in each hand.`);
					r.push(VCheck.Vaginal(eventSlave, 1));
				} else {
					if (eventSlave.anus > 2) {
						r.push(`loose slit of ${his} asspussy.`);
					} else if (eventSlave.anus > 1) {
						r.push(`welcoming pucker of ${his} anus.`);
					} else {
						r.push(`tight pucker of ${his} butt.`);
					}
					r.push(`${He} exaggerates ${his} discomfort, wriggling against ${his} weighted feet and squealing through ${his} snorkel as you gently sodomize ${him} under water. ${His} enormous breasts quiver in near-zero gravity with each thrust, until you notice the delicious motion and take one in each hand.`);
					r.push(VCheck.Anal(eventSlave, 1));
				}
			}
			r.push(`The amount of air you can pull through the snorkel just isn't enough to facilitate the throes of your lovemaking, so by the time you're done, ${he}'s so exhausted ${he} can barely float to the edge of the pool. Fortunately ${his} lovely tits make for quite the flotation device, so you gently guide ${him} to the shallow end`);
			if (V.PC.dick || eventSlave.balls) {
				r.addToLast(`, leaving a trail of cum in your wake`);
			}
			r.addToLast(`.`);
			eventSlave.trust += 4;
			r.toParagraph();
			return r.container();
		}
	}
};
