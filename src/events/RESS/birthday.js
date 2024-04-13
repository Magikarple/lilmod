App.Events.RESSBirthday = class RESSBirthday extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeAge !== 0,
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canWalk,
				canTalk,
				s => s.devotion > 50,
				s => s.rules.speech !== "restrictive",
				s => s.birthWeek >= 51,
				s => V.week - s.weekAcquired > 50, // I need a better way to determine a slave has been a slave for a long time outside of the player's ownership.
				s => s.tankBaby === 0
			]
		];
	}

	get weight() {
		return 8;
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const hands = hasBothArms(eventSlave) ? "hands" : "hand";

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(
			`You come across`,
			contextualIntro(V.PC, eventSlave, true),
			`in the kitchen. ${He} has a normal slave meal on a plate in front of ${him}, but also has a pack of hot wax candles from your sex gear. Oddly, ${he} has a candle upright in the food and is trying to light it. You ask what ${he}'s doing, and ${he} explains meekly,`,
			Spoken(eventSlave, `"I don't know, ${Master}. I've been a slave so long. I just`)
		);
		if (canSee(eventSlave)) {
			r.push(Spoken(eventSlave, `saw`));
		} else if (canHear(eventSlave)) {
			r.push(Spoken(eventSlave, `heard`));
		} else {
			r.push(Spoken(eventSlave, `realized`));
		}
		r.push(
			Spoken(eventSlave, `the date today and this seemed like the right thing to do. I'm sorry."`),
			`It's probably ${his} birthday. Apparently ${he}'s losing ${his} grasp on the concept.`
		);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Bake ${him} a cake`, cake, virginityWarning()),
			new App.Events.Result(`Teach ${him} a new meaning of birthdays`, meaning),
			new App.Events.Result(`Punish ${him} for making a mess`, punish),

		]);

		function cake() {
			r = [];
			r.push(`You bake a simple cake while patiently explaining birthdays. ${He} slowly remembers, and`);
			if (canSee(eventSlave)) {
				r.push(`looks repeatedly at the date display`);
			} else {
				r.push(`focuses intently on the date as ${he} repeats it to ${himself}`);
			}
			r.push(`to ingrain ${his} birthday back in ${his} mind. When the cake is done, you quickly dust it with confectionary sugar, stand a hot wax candle in the middle of it, and invite ${him} to think of a wish and blow it out. ${He} sits on your lap and the two of you take turns feeding each other warm cake. When the cake is gone ${he} gets up to do the dishes and you turn to go. As you go, ${he} asks`);
			if (eventSlave.lips > 70) {
				r.push(`through ${his} massive dick-sucking lips,`);
			} else if ((eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2)) {
				r.push(`through ${his} inconvenient oral piercings,`);
			}
			r.push(Spoken(eventSlave, `"${Master}, may I tell you what my wish was?"`));
			if (isPlayerReceptive(eventSlave) && canPenetrate(eventSlave)) {
				r.push(
					`You nod, and ${he} slowly turns around with ${his} eyes closed and dick erect,`,
					Spoken(eventSlave, `"To feel your warmth embracing me, ${Master}."`)
				);
				if (V.PC.vagina > 0) {
					r.push(`You push ${him} back on the couch, straddle ${him}, and spear yourself on ${his} cock, gently riding ${him} to orgasm.`);
					seX(eventSlave, "penetrative", V.PC, "vaginal");
					if (canImpreg(V.PC, eventSlave)) {
						knockMeUp(V.PC, 20, 0, eventSlave.ID);
					}
				} else if (V.PC.anus > 0) {
					r.push(`You push ${him} back on the couch, straddle ${him}, and gently push ${his} hard cock into your ass, riding ${him} to orgasm.`);
					seX(eventSlave, "penetrative", V.PC, "anal");
					if (canImpreg(V.PC, eventSlave)) {
						knockMeUp(V.PC, 20, 1, eventSlave.ID);
					}
				} else {
					r.push(`You push ${him} back on the couch, kneel over ${his} face, and take ${his} hard cock in your mouth, sucking ${him} to completion as ${he} gets you off with ${his} mouth in turn.`);
					seX(eventSlave, "penetrative", V.PC, "oral");
				}
			} else {
				r.push(`You nod, and ${he} kneels on the kitchen chair with ${his} eyes closed,`);
				if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
					r.push(`${his} ${hands} spreading ${his} buttocks; ${his} pussy moist and inviting and ${his} anus begging for penetration. "Take me, ${Master}."`);
					r.push(VCheck.Both(eventSlave, 1));
				} else if (canDoVaginal(eventSlave)) {
					r.push(`${his} ${hands} spreading ${his} buttocks; ${his} pussy moist and inviting. "Take me, ${Master}."`);
					r.push(VCheck.Vaginal(eventSlave, 1));
				} else if (canDoAnal(eventSlave)) {
					r.push(
						`${his} ${hands} spreading ${his} buttocks, and ${his} mouth open.`,
						Spoken(eventSlave, `"Buttsex, ${Master}."`)
					);
					r.push(VCheck.Anal(eventSlave, 1));
				} else {
					r.push(
						`${hands} to ${his} breasts, and mouth wide open.`,
						Spoken(eventSlave, `"To ${canTaste(eventSlave) ? `taste you` : `have you inside me`}, ${Master}."`)
					);
					seX(eventSlave, "oral", V.PC, "penetrative");
				}
			}
			r.push(`${He} feels so much <span class="devotion inc">closer to you</span> than before.`);
			eventSlave.devotion += 4;
			return r;
		}

		function virginityWarning() {
			if (isPlayerReceptive(eventSlave) && canPenetrate(eventSlave)) {
				return `This option will penetrate you`;
			} else if (canDoVaginal(eventSlave) && canDoAnal(eventSlave) && (eventSlave.vagina === 0 && eventSlave.anus === 0)) {
				return `This option will take ${his} virginities`;
			} else if (canDoVaginal(eventSlave) && eventSlave.vagina === 0) {
				return `This option will take ${his} virginity`;
			} else if (canDoAnal(eventSlave) && eventSlave.anus === 0) {
				return `This option will take ${his} anal virginity`;
			}
		}

		function meaning() {
			eventSlave.devotion += 4;
			return `You explain at length that ${he} will feel this way once a year, and that this day is special. On the day that makes ${him} feel this way, ${he} is to cover ${his} nipples with whipped cream, add a pattern with chocolate syrup, garnish each with a cherry, and present ${himself} to ${his} ${getWrittenTitle(eventSlave)}. ${He} nods in understanding and gets to work. When ${he}'s done, you help ${him} reach the confection on ${his} left breast ${himself} while you eat the one on ${his} right. When you're done, ${he} <span class="devotion inc">kisses you impulsively.</span> ${He} tastes like whipped cream and chocolate.`;
		}

		function punish() {
			eventSlave.devotion -= 5;
			return `${He} begs your forgiveness and quickly cleans up the food and candles. ${He} can't seem to shake the feeling that <span class="devotion dec">something is wrong with this.</span>`;
		}
	}
};
