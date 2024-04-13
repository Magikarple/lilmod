App.Events.RESSTorpedoSqueeze = class RESSTorpedoSqueeze extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => s.assignment !== Job.QUARTER,
				s => s.boobs > 600,
				s => s.boobShape === "torpedo-shaped",
				s => s.devotion >= -50,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const arms = hasBothArms(eventSlave) ? `arms` : `arm`;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(`The penthouse bathroom has a long counter and mirror arrangement with many sinks, so a number of slaves can get ready at once. During those moments of the day when`);
		if (V.slaves.length > 10) {
			r.push(`many`);
		} else {
			r.push(`more than one`);
		}
		r.push(
			`of them have just been awoken and showered and are hurrying to prettify themselves, this row of sinks presents one of the nicer sights in the arcology, a neatly spaced line of slave butts and a matching line of breasts reflected in the mirror.`,
			contextualIntro(V.PC, eventSlave, true),
			`is especially impressive. ${His}`
		);
		if (eventSlave.boobs > 4000) {
			r.push(`monstrous`);
		} else if (eventSlave.boobs > 2000) {
			r.push(`huge`);
		} else {
			r.push(`big`);
		}
		r.push(`torpedo-shaped tits stick out a long way when ${he}'s standing upright in the nude like this.`);
		r.toParagraph();
		r.push(`With ${his}`);
		if (eventSlave.belly >= 100000) {
			if (eventSlave.bellyPreg >= 1500) {
				r.push(`${belly} pregnant`);
			} else {
				r.push(belly);
			}
			r.push(`belly`);
		} else if (eventSlave.weight > 130) {
			r.push(`fat belly`);
		} else if (eventSlave.belly >= 10000) {
			if (eventSlave.bellyFluid >= 10000) {
				r.push(`${eventSlave.inflationType}-stuffed`);
			} else if (eventSlave.bellyPreg >= 1500) {
				r.push(`enormously pregnant`);
			} else {
				r.push(`enormously distended`);
			}
			r.push(`belly`);
		} else if (eventSlave.weight > 30) {
			r.push(`soft belly`);
		} else if (eventSlave.belly >= 1500) {
			if (eventSlave.bellyFluid >= 1500) {
				r.push(`${eventSlave.inflationType}-filled`);
			} else if (eventSlave.bellyPreg >= 1500) {
				r.push(`pregnant`);
			} else {
				r.push(`implant rounded`);
			}
			r.push(`belly`);
		} else if (eventSlave.muscles > 30) {
			r.push(`ripped abs`);
		} else if (eventSlave.muscles > 5) {
			r.push(`toned stomach`);
		} else {
			r.push(`middle`);
		}
		r.push(`against the edge of the counter as ${he} leans forward a little to`);
		if (eventSlave.makeup !== 0) {
			r.push(`finish ${his} makeup,`);
		} else {
			r.push(`apply lotion to ${his} face,`);
		}
		r.push(`${his} ${eventSlave.nipples} nipples are`);
		if (eventSlave.boobs > 6000) {
			r.push(`pressed against the mirror.`);
		} else if (eventSlave.boobs > 4000) {
			r.push(`almost brushing the mirror.`);
		} else if (eventSlave.boobs > 2000) {
			r.push(`halfway to the mirror.`);
		} else {
			r.push(`over the sink.`);
		}
		r.push(`${He}'s concentrating on ${his} task, and every little motion of ${his} ${arms} makes ${his} spectacularly pointed breasts sway a little.`);

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Give them a surprise massage`, surprise),
			(canDoAnal(eventSlave) || canDoVaginal(eventSlave))
				? new App.Events.Result(`Make ${him} bounce them painfully`, bounce, ((eventSlave.vagina === 0 && canDoVaginal(eventSlave)) || (eventSlave.anus === 0 && canDoAnal(eventSlave))) ? `This option will take ${his} virginity` : null)
				: new App.Events.Result()
		]);

		function surprise() {
			const r = new SpacedTextAccumulator();
			r.push(`You move stealthily up behind ${him} in a predatory crouch, your arms forward and your fingers spread. When ${he} reaches up to`);
			if (eventSlave.makeup !== 0) {
				r.push(`do ${his} eyes,`);
			} else {
				r.push(`massage ${his} forehead,`);
			}
			r.push(`you take advantage of ${his} newly vulnerable flanks and reach around ${him} to take ${his} torpedo tits in hand. ${He}`);
			if (eventSlave.voice !== 0) {
				r.push(`howls`);
			} else {
				r.push(`makes the raspy noise that mute slaves make when`);
			}
			r.push(`in shock, writhing away from the grasping digits. Your hands aren't particularly cold, but ${he}'s deliciously warm from the shower and you're holding onto ${him} firmly. ${His}`);
			if (eventSlave.butt > 12) {
				r.push(`titanic ass`);
			} else if (eventSlave.butt > 5) {
				r.push(`massive ass`);
			} else if (eventSlave.butt > 2) {
				r.push(`plush bottom`);
			} else {
				r.push(`trim behind`);
			}
			r.push(`bumps into you as ${he} recoils, and ${he} freezes, realizing who you are. You slide your grip back towards ${him}, down away from the point of each tit, grab ${his} back where ${he}'s broader, and knead ${him} gently, moving forward down ${his} breasts.`);
			if (eventSlave.fetish === "boobs") {
				if (eventSlave.fetishKnown !== 1) {
					r.push(`${His} chest swells in your embrace as ${he} sucks in ${his} breath, stiffening with arousal. ${He} seems to <span class="lightcoral">love breast play,</span> and if properly encouraged, might orgasm to it.`);
					eventSlave.fetishKnown = 1;
				} else {
					r.push(`${He} stiffens with arousal, since breast play is the main sexual event as far as ${he}'s concerned.`);
					if (canAchieveErection(eventSlave) && (eventSlave.chastityPenis === 1)) {
						r.push(`There's an audible little smack as ${he} achieves an erection, bringing ${his} dickhead against the bottom of the counter.`);
					}
				}
			} else if (eventSlave.devotion > 50) {
				r.push(`${He} softens into your`);
				if (V.PC.boobs >= 300) {
					r.push(`bosom,`);
				} else {
					r.push(`chest,`);
				}
				r.push(`wriggling ${his} back into you to get comfortable.`);
			} else if (eventSlave.devotion > 20) {
				r.push(`${He} makes an effort to relax, and you can feel the stiffness go out of ${his} back, pressed against your`);
				if (V.PC.boobs >= 300) {
					r.push(`bosom.`);
				} else {
					r.push(`chest.`);
				}
			} else {
				r.push(`${He} remains stiff and afraid, shivering a little against your`);
				if (V.PC.boobs >= 300) {
					r.push(`bosom.`);
				} else {
					r.push(`chest.`);
				}
			}
			r.push(`${He} expects to get fucked, but you just massage ${his} breasts thoroughly, give ${his}`);
			if (eventSlave.pregKnown === 1) {
				r.push(`belly`);
			} else {
				r.push(`butt`);
			}
			r.push(`a possessive pat, and continue on your way. ${He} thanks you`);
			if (eventSlave.devotion > 50) {
				r.push(`with touching sincerity`);
			} else if (eventSlave.devotion > 20) {
				r.push(`sincerely`);
			} else {
				r.push(`hesitantly`);
			}
			r.push(`and returns to ${his} business, <span class="mediumaquamarine">smiling a little.</span>`);
			eventSlave.trust += 4;
			if (eventSlave.lactation > 0) {
				eventSlave.lactationDuration = 2;
				eventSlave.boobs -= eventSlave.boobsMilk;
				eventSlave.boobsMilk = 0;
			} else {
				r.push(induceLactation(eventSlave, 3));
			}
			r.toParagraph();
			return r.container();
		}

		function bounce() {
			const r = new SpacedTextAccumulator();
			r.push(`Appearing behind ${him}, you order ${him} to bounce up and down. You don't mention ${his} prominent tits, but ${he} knows exactly what you mean and is`);
			if (eventSlave.devotion > 50) {
				r.push(`eager to please.`);
			} else if (eventSlave.devotion > 20) {
				r.push(`willing to please.`);
			} else {
				r.push(`willing to debase ${himself} to avoid punishment.`);
			}
			r.push(`${He} bounces up and down, watching for your reaction in the mirror. Harder, you tell ${him}, and ${he} bounces harder. Harder, you tell ${him} again, and then again. ${He} jumps up and down hard enough that ${his} promontories slap painfully against ${him},`);
			if (eventSlave.fetish === "masochist") {
				if (eventSlave.fetishKnown !== 1) {
					r.push(`making ${him} gasp with arousal. ${He} stares at ${himself} in shock, and then at your reflection, mystified and a little frightened that you might have seen. You did see, and you're not perplexed. ${eventSlave.slaveName} is a <span class="lightcoral">sexual masochist,</span> and if properly encouraged, can probably be trained to be a proper slut for pain.`);
					eventSlave.fetishKnown = 1;
				} else {
					r.push(`making the masochistic ${SlaveTitle(eventSlave)} gasp with arousal.`);
				}
			} else if (eventSlave.devotion > 50) {
				r.push(`extracting a gasp as ${he} willingly causes ${himself} considerable discomfort at your command.`);
			} else if (eventSlave.devotion > 20) {
				r.push(`making ${him} wince. ${He} starts to look afraid.`);
			} else {
				r.push(`and ${he} starts to cry, more from fear than from the pain.`);
			}
			r.toParagraph();
			r.push(`Pleased, you tell ${him} to keep it up as best ${he} can, and trap ${his} hips against the edge of the counter before sliding`);
			if (V.PC.dick !== 0) {
				r.push(`your cock`);
			} else {
				r.push(`a strap-on`);
			}
			if (canDoVaginal(eventSlave)) {
				r.push(`into ${his} pussy.`);
			} else {
				r.push(`up ${his} asshole.`);
			}
			r.push(`It's not a comfortable angle, and between the rough penetration and the continued mammary torture,`);
			if (eventSlave.fetish === "masochist") {
				r.push(`${he} orgasms promptly`);
				if (eventSlave.balls > 0) {
					r.addToLast(`, scattering cum all over the counter`);
				}
			} else {
				r.push(`tears begin to run down ${his} cheeks`);
			}
			r.addToLast(`. When you climax, you grab the undersides of ${his} breasts and hoist ${him} up in a parody of exaltation, thrusting as far into ${him} as you can manage`);
			if (V.PC.dick !== 0) {
				r.push(`and`);
				if (canDoVaginal(eventSlave)) {
					r.push(`coming inside ${him}`);
				} else {
					r.push(`blowing your load in ${his} butt`);
				}
			}
			r.addToLast(`. The thrust, the lift, and the harsh hold on ${his} poor boobs extracts`);
			if (eventSlave.voice !== 0) {
				r.push(`a shriek`);
			} else {
				r.push(`the pathetic little gasping noise that mute slaves make when in agony`);
			}
			r.push(`from ${his}`);
			if (eventSlave.lactation > 0) {
				r.addToLast(`, not to mention`);
				if (eventSlave.lactation === 1) {
					r.push(`a few drops of ${milkFlavor(eventSlave)}milk`);
				} else {
					r.push(`an ejaculation-like stream of ${milkFlavor(eventSlave)}milk`);
				}
				r.push(`from each of ${his} nipples`);
			}
			r.addToLast(`. You discard your toy on the counter,`);
			if (eventSlave.fetish === "masochist") {
				r.push(`leaving the poor pain addict in a state of <span class="hotpink">high sexual satiation,</span> even if ${he} does move ${his} battered breasts gingerly as ${he} climbs down.`);
				eventSlave.devotion += 4;
			} else {
				r.push(`leaving ${him} to climb down ${himself}, <span class="gold">fearfully</span> watching your receding back as ${he} gets off the counter, favoring ${his} battered breasts.`);
				eventSlave.trust -= 4;
			}
			r.push(VCheck.Simple(eventSlave, 1));
			r.toParagraph();
			return r.container();
		}
	}
};
