// cSpell:ignore AAGHHH

App.Events.RESSVocalDisobedience = class RESSVocalDisobedience extends App.Events.BaseEvent {
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
				s => s.devotion < -50,
				s => s.trust >= -20,
				s => s.rules.speech === "restrictive"
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const rudeTitle = eventSlave.rudeTitle === 1 ? PoliteRudeTitle(eventSlave) : Master;
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let r = [];
		r.push(
			`One morning, despite the fact that ${he} is not allowed to speak without being spoken to,`,
			contextualIntro(V.PC, eventSlave, true),
		);
		if (canSee(eventSlave)) {
			r.push(`looks you directly in the eye`);
		} else {
			r.push(`faces you`);
		}
		r.push(`and asks`);
		if (SlaveStatsChecker.checkForLisp(eventSlave)) {
			r.push(`boldly through ${his}`);
			if (eventSlave.lips > 70) {
				r.push(`massive dick-sucking lips,`);
			} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
				r.push(`inconvenient oral piercings,`);
			} else {
				r.push(`lisp,`);
			}
			r.push(
				Spoken(eventSlave, `"I'm tired, can I have the day off?"`),
				`${He} didn't even call you ${getWrittenTitle(eventSlave)}.`
			);
		} else {
			r.push(
				`boldly,`,
				Spoken(eventSlave, `"I'm tired, can I have the day off, ${rudeTitle}?"`)
			);
		}

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Give ${him} a rough spanking`, spanking, virginityWarning()),
			(canDoAnal(eventSlave) || canDoVaginal(eventSlave))
				? new App.Events.Result(`Sentence ${him} to public use`, sentence, virginityWarning())
				: new App.Events.Result(),
			new App.Events.Result(`Give ${him} the day off`, off),
		]);

		function virginityWarning() {
			if ((eventSlave.anus === 0 && canDoAnal(eventSlave)) || (eventSlave.vagina === 0 && canDoVaginal(eventSlave))) {
				return `This option will take ${his} virginity`;
			}
		}

		function spanking() {
			r = [];
			if (hasAnyLegs(eventSlave)) {
				r.push(`You tie the protesting slave to your desk`);
				if (eventSlave.belly >= 5000) {
					r.push(`with ${his} chest against the top of the desk with ${his} ${belly}`);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnant`);
					}
					r.push(`belly hanging of the side, so that`);
				} else {
					r.push(`so that ${his} chest is against the top of the desk and`);
				}
				r.push(`${he}'s standing upright with ${his} ass in the air.`);
			} else {
				if (eventSlave.belly >= 300000) {
					r.push(`You carefully balance the protesting, defenseless torso atop ${his} own ${belly}`);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnancy.`);
					} else {
						r.push(`stomach.`);
					}
				} else if (eventSlave.belly >= 5000) {
					r.push(`You place the protesting, defenseless torso on your lap, face-down with ${his} ${belly}`);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnant`);
					}
					r.push(`belly between your legs.`);
				} else {
					r.push(`You place the protesting, defenseless torso on your desk, face-down.`);
				}
			}
			r.push(`You spank ${him} severely, leaving ${his} buttocks bright pink. ${He} must count the strokes or have ${his} punishment start over. Sobbing, ${he} counts`);
			if (eventSlave.lips > 70) {
				r.push(`through ${his} massive dick-sucking lips,`);
			} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
				r.push(`through ${his} inconvenient oral piercings`);
			}
			r.push(
				Spoken(eventSlave, `"Six, AAGHHH, seven, AAGHHH, seven"`),
				`and then realizes ${his} mistake and begs for mercy — in vain, of course. You finish ${him} off with a rough`
			);
			if (canDoVaginal(eventSlave)) {
				r.push(`fuck, with ${him} jerking against ${his} restraints every time you stroke into ${his} sore buttocks.`);
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else if (canDoAnal(eventSlave)) {
				r.push(`assfuck, with ${him} jerking against ${his} restraints every time you stroke into ${his} sore buttocks.`);
				r.push(VCheck.Anal(eventSlave, 1));
			} else {
				r.push(`throatfuck, with ${him} jerking against ${his} restraints every time you hilt yourself and slap ${his} ass.`);
				seX(eventSlave, "oral", V.PC, "penetrative");
			}
			r.push(`<span class="trust dec">${He} learns from the experience.</span>`);
			eventSlave.trust -= 5;
			return r;
		}

		function sentence() {
			r = [];
			r.push(`When ${he}`);
			if (canSee(eventSlave)) {
				r.push(`sees ${he}'s being taken to a sex booth,`);
			} else if (canHear(eventSlave)) {
				r.push(`hears the sounds of a public sex parlor,`);
			} else {
				r.push(`finally figures out ${his} destination,`);
			}
			r.push(`${he} begins to cry. ${He} begs`);
			if (eventSlave.lips > 70) {
				r.push(`through ${his} massive dick-sucking lips,`);
			} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
				r.push(`through ${his} inconvenient oral piercings,`);
			} else {
				r.push(`through ${his} tears,`);
			}
			r.push(
				Spoken(eventSlave, `"Please, no, ${Master}, I'll be good —"`),
				`but is cut off when the machine closes around ${his} head. It will offer ${his}`
			);
			if (canDoAnal(eventSlave) && canDoVaginal(eventSlave)) {
				r.push(`ass and pussy`);
			} else if (canDoAnal(eventSlave)) {
				r.push(`ass`);
			} else {
				r.push(`pussy`);
			}
			r.push(`to anyone who pays for the rest of the week, and keep ${his} fed and cleaned. ${His} world will become nothing but silent, featureless darkness and dick. <span class="cash inc">You earn some money off ${him},</span> and by the end of the night ${his}`);
			if (canDoAnal(eventSlave) && canDoVaginal(eventSlave)) {
				r.push(`holes get`);
			} else {
				r.push(`hole gets`);
			}
			if ((canDoAnal(eventSlave) && eventSlave.anus === 0) || (canDoVaginal(eventSlave) && eventSlave.vagina === 0)) {
				r.push(`well stretched.`);
			} else {
				r.push(`<span class="lime">well stretched.</span>`);
			}
			r.push(`<span class="devotion inc">${He} learns from the experience.</span>`);
			if (canDoAnal(eventSlave) && canDoVaginal(eventSlave)) {
				if (eventSlave.vagina === 0 && eventSlave.anus === 0) {
					r.push(`<span class="virginity loss">${He}'s lost both ${his} virginity and anal cherry.</span>`);
				} else if (eventSlave.vagina === 0) {
					r.push(`<span class="virginity loss">${He}'s lost ${his} virginity.</span>`);
				} else if (eventSlave.anus === 0) {
					r.push(`<span class="virginity loss"> ${He}'s lost ${his} anal cherry.</span>`);
				}
				eventSlave.vagina++;
				eventSlave.anus++;
				seX(eventSlave, "vaginal", "public", "penetrative", 10);
				seX(eventSlave, "anal", "public", "penetrative", 10);
				if (eventSlave.eggType === "human" && canGetPregnant(eventSlave)) {
					r.push(knockMeUp(eventSlave, 25, 2, -2));
				}
			} else if (canDoAnal(eventSlave)) {
				if (eventSlave.anus === 0) {
					r.push(`<span class="virginity loss"> ${He}'s lost ${his} anal cherry.</span>`);
				}
				eventSlave.anus++;
				seX(eventSlave, "anal", "public", "penetrative", 5);
				if (eventSlave.eggType === "human" && canGetPregnant(eventSlave)) {
					r.push(knockMeUp(eventSlave, 50, 1, -2));
				}
			} else {
				if (eventSlave.vagina === 0) {
					r.push(`<span class="virginity loss">${He}'s lost ${his} virginity.</span>`);
				}
				eventSlave.vagina++;
				seX(eventSlave, "vaginal", "public", "penetrative", 20);
				if (eventSlave.eggType === "human" && canGetPregnant(eventSlave)) {
					r.push(knockMeUp(eventSlave, 50, 0, -2));
				}
			}
			eventSlave.devotion += 4;
			cashX(50, "event", eventSlave);
			return r;
		}

		function off() {
			eventSlave.devotion -= 5;
			return `${He} skips away happily and spends the rest of the day lounging around. ${His} obedience to you <span class="devotion dec">has decreased.</span>`;
		}
	}
};
