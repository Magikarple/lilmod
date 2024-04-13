App.Events.RESSRestrictedSmart = class RESSRestrictedSmart extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canTalk,
				canHear,
				s => s.assignment !== Job.QUARTER,
				s => s.rules.speech === "restrictive",
				s => s.intelligence > 15,
				s => s.trust >= -20,
				s => s.devotion <= 20,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let r = [];
		r.push(`During a routine inspection of`);
		r.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), ","));
		r.push(`you notice that ${he}'s behaving a little strangely. ${He}'s participating in the inspection with almost manic attention, trying to anticipate your directions and hanging desperately on your every word. After a moment, you reflect that ${he}'s a smart ${girl}, and is probably suffering for a lack of conversation. As you regard ${him}`);
		if (!hasAnyLegs(eventSlave)) {
			r.push(`sitting`);
			if (hasAnyArms(eventSlave)) {
				r.push(`helplessly`);
			} else {
				r.push(`limblessly`);
			}
		} else if (!canStand(eventSlave)) {
			r.push(`kneeling`);
		} else {
			r.push(`standing`);
		}
		r.push(`there, ${his}`);
		if (canSee(eventSlave)) {
			r.push(`eyes almost scream`);
		} else {
			r.push(`face almost screams`);
		}
		r.push(`at you for some sort of stimulation. ${His} life is not without mental interest, but talking is one of the quintessential human behaviors, and having it taken away is very difficult for someone as intelligent as ${him}. A mute almost might have it easier, for ${he} is also denied the volubility through sign language that mute slaves under less restrictive rules often enjoy.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Discuss ${his} future with ${him}`, discuss),
			canDoAnal(eventSlave)
				? new App.Events.Result(`Let ${him} talk during a rough buttfuck`, buttfuck, eventSlave.anus === 0 ? `This option will take ${his} anal virginity` : null)
				: new App.Events.Result(),
			canDoVaginal(eventSlave)
				? new App.Events.Result(`Let ${him} try to talk during a vigorous fucking`, fucking, eventSlave.vagina === 0 ? `This option will take ${his} virginity` : null)
				: new App.Events.Result(),
		]);

		function discuss() {
			r = [];
			r.push(`You announce matter-of-factly that ${he}'s allowed to speak temporarily, and that you'll be discussing where ${he} is and where ${he} sees ${himself} in the near future. ${He}'s disconcerted by the subject but so desperate for conversation that ${he}'s overjoyed anyway.`);
			r.push(Spoken(eventSlave, `"I understand what you're doing, ${Master},"`), `${he} ${say}s forthrightly.`, Spoken(eventSlave, `"I'm to be broken down into a devoted slave."`), `${He} looks thoughtful.`, Spoken(eventSlave, `"I'll help you with that. It'll be easier if I do, won't it?"`), `${He} looks up, and you`);
			if (canSee(eventSlave)) {
				r.push(`nod in affirmation`);
			} else {
				r.push(`acknowledge ${him}`);
			}
			r.push(`${he} gives you a rueful smile.`, Spoken(eventSlave, `"A good slut would offer to give you oral now, I think. So, ${Master}, may I please be allowed to ${V.PC.dick === 0 ? "lick your pussy" : "suck your cock"}"?`));
			if (canSee(eventSlave)) {
				r.push(`You nod,`);
			} else {
				r.push(`You acknowledge,`);
			}
			r.push(`and tell ${him} that the rules are back in effect.`);
			if (isAmputee(eventSlave)) {
				r.push(`As you get ${his} helpless form into position,`);
			} else if (eventSlave.belly >= 300000) {
				r.push(`As ${he} struggles to get into position with ${his} ${belly} stomach in the way,`);
			} else if (!canStand(eventSlave)) {
				r.push(`As ${he} shifts into position,`);
			} else if (eventSlave.belly >= 10000) {
				r.push(`As ${he} gently lowers ${his}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`gravid`);
				} else {
					r.push(`bloated`);
				}
				r.push(`form to`);
				if (hasBothLegs(eventSlave)) {
					r.push(`its knees,`);
				} else {
					r.push(`the ground,`);
				}
			} else {
				r.push(`As ${he} gets down on`);
				if (hasBothLegs(eventSlave)) {
					r.push(`${his} knees,`);
				} else {
					r.push(`the ground,`);
				}
			}
			r.push(`${he} <span class="devotion inc">focuses on the task</span> in front of ${him} with all ${his} considerable intelligence, clearly having decided to make things easier on ${himself} by conforming to ${his} new life.`);
			eventSlave.devotion += 4;
			seX(eventSlave, "oral", V.PC, "penetrative");
			return r;
		}

		function buttfuck() {
			r = [];
			if (isAmputee(eventSlave)) {
				r.push(`You lay ${his} fuckpuppet torso across`);
			} else if (!canStand(eventSlave)) {
				r.push(`You help ${him} lie back on`);
			} else if (eventSlave.belly >= 5000) {
				r.push(`You tip ${his}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`motherly`);
				} else {
					r.push(`swollen`);
				}
				r.push(`body backwards onto`);
			} else {
				r.push(`You push ${him} backwards onto`);
			}
			r.push(`your desk, groping ${his}`);
			if (eventSlave.butt > 15) {
				r.push(`absurd`);
			} else if (eventSlave.butt > 10) {
				r.push(`immense`);
			} else if (eventSlave.butt > 7) {
				r.push(`huge`);
			} else if (eventSlave.butt > 4) {
				r.push(`big`);
			} else if (eventSlave.butt > 1) {
				r.push(`moderate`);
			} else {
				r.push(`meager`);
			}
			r.push(`butt. You instruct ${him} that ${he}'ll be allowed to talk if ${he} wants, but not yet, as you`);
			if (V.PC.dick === 0) {
				r.push(`push a couple of fingers up`);
			} else {
				r.push(`line your cock up with`);
			}
			if (eventSlave.anus > 2) {
				r.push(`${his} gaping asshole.`);
			} else if (eventSlave.anus > 1) {
				r.push(`${his} sizable asshole.`);
			} else {
				r.push(`${his} tight asshole.`);
			}
			r.push(`As you penetrate ${him}, you tell ${him} that the time to talk is now.`);
			if (eventSlave.anus > 2) {
				r.push(`To make the sex sufficiently uncomfortable, you`);
				if (V.PC.dick === 0) {
					r.push(`finger fuck`);
				} else {
					r.push(`dick`);
				}
				r.push(`${him} without mercy.`);
			} else if (eventSlave.anus > 1) {
				r.push(`To make the sex sufficiently uncomfortable, you pull yourself out with every stroke, putting ${him} through initial anal penetration over and over.`);
			} else {
				r.push(`${His} butt is so tight that just a simple assfuck makes ${him} uncomfortable enough.`);
			}
			r.push(`${He} opens ${his} mouth, closes it again, grunts at the burning sensation of your rough use of ${his} poor ass, and then shuts up. You ask ${him} if ${he}'s sure ${he} doesn't have anything to say, and ${he} makes ${his} one verbal comment of the day:`, Spoken(eventSlave, `"No, ${Master}."`), `${He} understands the lesson here: fail to <span class="devotion inc">conform,</span> <span class="trust dec">get assraped.</span> It's as simple as that.`);
			eventSlave.devotion += 3;
			eventSlave.trust -= 3;
			r.push(VCheck.Anal(eventSlave, 1));
			return r;
		}

		function fucking() {
			r = [];
			if (isAmputee(eventSlave)) {
				r.push(`You lay ${his} fuckpuppet torso across`);
			} else if (!canStand(eventSlave)) {
				r.push(`You help ${him} lie back on`);
			} else if (eventSlave.belly >= 5000) {
				r.push(`You tip ${his}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`motherly`);
				} else {
					r.push(`swollen`);
				}
				r.push(`body backwards onto`);
			} else {
				r.push(`You push ${him} backwards onto`);
			}
			r.push(`your desk, groping ${his}`);
			if (eventSlave.butt > 15) {
				r.push(`absurd`);
			} else if (eventSlave.butt > 10) {
				r.push(`immense`);
			} else if (eventSlave.butt > 7) {
				r.push(`huge`);
			} else if (eventSlave.butt > 4) {
				r.push(`big`);
			} else if (eventSlave.butt > 1) {
				r.push(`moderate`);
			} else {
				r.push(`meager`);
			}
			r.push(`butt. You instruct ${him} that ${he}'ll be allowed to talk if ${he} wants, but not yet, as you`);
			if (V.PC.dick === 0) {
				r.push(`push a dildo into`);
			} else {
				r.push(`line your cock up with`);
			}
			r.push(`${his}`);
			if (eventSlave.anus > 2) {
				r.push(`gaping`);
			} else if (eventSlave.anus > 1) {
				r.push(`sizable`);
			} else {
				r.push(`tight`);
			}
			r.push(`pussy. As you penetrate ${him}, you tell ${him} that the time to talk is now.`);
			if (eventSlave.vagina > 2) {
				r.push(`To make the sex sufficiently overwhelming, you`);
				if (V.PC.dick === 0) {
					r.push(`ram`);
				} else {
					r.push(`dick`);
				}
				r.push(`${him} without mercy.`);
			} else if (eventSlave.vagina > 1) {
				r.push(`To make the sex sufficiently overwhelming, you pull yourself out with every stroke, putting ${him} through initial penetration over and over.`);
			} else {
				r.push(`${His} cunt is so tight that just a simple fucking overwhelms ${him} with pleasure.`);
			}
			r.push(`${He} opens ${his} mouth, closes it again, groaning at the sensation of your rough use of ${his} body, and then stops trying. You ask ${him} if ${he}'s sure ${he} doesn't have anything to say, and ${he} lets off an orgasmic moan. There's <span class="devotion inc">no need to talk</span> when your owner is <span class="trust inc">fucking your brains out.</span>`);
			eventSlave.devotion += 3;
			eventSlave.trust += 3;
			r.push(VCheck.Vaginal(eventSlave, 1));
			return r;
		}
	}
};
