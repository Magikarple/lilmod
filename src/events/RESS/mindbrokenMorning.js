App.Events.RESSMindbrokenMorning = class RESSMindbrokenMorning extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.weatherToday.severity < 3
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish === Fetish.MINDBROKEN,
				canWalk,
				s => s.clothes !== "a Fuckdoll suit",
				isFaceVisible
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {His, He, he, his, him, himself} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		let r = [];

		r.push(`It's a sunny morning, with rare mild weather, and you're stuck at your desk, as usual. After the typical rush of slaves clears the kitchen after the breakfast hour, you see one peel off to stand out on a balcony for a moment with the light on ${his} face. You pay little attention to such a trifle, but then notice that it's`);
		r.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), "."));
		App.Events.addParagraph(node, r);
		r = [];

		r.push(`You head out and find that ${he}'s looking up at the sun with ${his} ${App.Desc.eyesColor(eventSlave)} closed, letting the warmth and light envelop ${his}`);
		if (eventSlave.face > 95) {
			r.push(`incredible`);
		} else if (eventSlave.face > 40) {
			r.push(`gorgeous`);
		} else if (eventSlave.face > 10) {
			r.push(`pretty`);
		} else {
			r.push(`homely`);
		}
		if (eventSlave.belly >= 5000) {
			r.push(`face and taut, ${belly} dome of a belly`);
		} else {
			r.push(`face.`);
		}
		r.push(`${He} hasn't gotten completely ready for ${his} day yet, and ${his} ${eventSlave.skin} skin is clean and quite bare. Despite ${his} small remaining mental capacity, it seems ${he}'s still capable of the minor pleasure of enjoying the sunlight. It is very probably the only enjoyable thing ${he}'ll register today.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Let ${him} be`, leave),
			(canDoVaginal(eventSlave) || canDoAnal(eventSlave))
				? new App.Events.Result(`See if an orgasm will cheer ${him} up`, orgasm, virginityWarning())
				: new App.Events.Result(),
		]);

		function leave() {
			if (eventSlave.relationship === -3) {
				if (eventSlave.kindness) {
					eventSlave.kindness += 2;
				} else {
					eventSlave.kindness = 2;
				}
			}
			return `Satisfied that there's no need for immediate intervention, you head back to your desk. A few minutes later, ${he} heads in to finish getting ready and get to work, saving ${V.assistant.name} the necessity of directing ${him}. As the broken slave passes your office, you think for a moment that you see a bit of moisture glinting in ${his} eyes, but soon correct yourself: it's just a reflection from the glass walls of the arcology. ${He} makes it to ${his} assignment on time, and no one notices anything unusual about ${him} today.`;
		}

		function virginityWarning() {
			if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0)) {
				return `This option will take ${his} virginity`;
			} else if (!canDoVaginal(eventSlave) && (eventSlave.anus === 0)) {
				return `This option will take ${his} anal virginity`;
			}
		}

		function orgasm() {
			r = [];
			r.push(`You`);
			if (V.PC.dick === 0) {
				r.push(`don a strap-on and`);
			}
			r.push(`slide your hands around ${his}`);
			if (eventSlave.belly >= 150000) {
				r.push(`${belly} distended`);
			} else if (eventSlave.weight > 95) {
				r.push(`fat`);
			} else if (eventSlave.belly >= 5000) {
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnancy-swollen`);
				} else if (eventSlave.bellyImplant >= 3000) {
					r.push(`implant-swollen`);
				} else {
					r.push(`${eventSlave.inflationType}-bloated`);
				}
			} else if (eventSlave.weight > 30) {
				r.push(`pudgy`);
			} else if (eventSlave.waist < -95) {
				r.push(`cartoonishly narrow`);
			} else if (eventSlave.muscles > 30) {
				r.push(`ripped`);
			} else if (eventSlave.waist < -10) {
				r.push(`wasp`);
			} else if (eventSlave.weight > 10) {
				r.push(`soft`);
			} else if (eventSlave.muscles > 5) {
				r.push(`toned`);
			} else if (eventSlave.weight >= -10) {
				r.push(`trim`);
			} else {
				r.push(`skinny`);
			}
			r.push(`waist, feeling the warmth of ${his} skin, and gently step forward until ${he}'s between you and the balcony railing. ${He} is silently obedient, not reacting at all other than to obey your direction as to where ${he} should go. For example, when ${he} feels`);
			if (V.PC.dick === 0) {
				r.push(`the phallus`);
			} else {
				r.push(`your hardening dick`);
			}
			r.push(`pressing against ${him}, ${he}`);
			if (eventSlave.height >= 170) {
				r.push(`unconsciously bends forward a little and cocks ${his} hips to position ${himself}`);
			} else {
				r.push(`rises up on the balls of ${his} feet to bring ${his} short body up to the right height`);
			}
			if (canDoVaginal(eventSlave)) {
				r.push(`for penetration. ${His}`);
				if (eventSlave.vagina > 2) {
					r.push(`loose cunt`);
				} else if (eventSlave.vagina > 1) {
					r.push(`pussy`);
				} else {
					r.push(`tight little pussy`);
				}
				r.push(`is already moist in expectation, making entry easy.`);
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else {
				r.push(`for anal. ${He} relaxes ${his}`);
				if (eventSlave.anus > 2) {
					r.push(`loose anus`);
				} else if (eventSlave.anus > 1) {
					r.push(`asshole`);
				} else {
					r.push(`tight little asshole`);
				}
				r.push(`completely, making entry easy.`);
				r.push(VCheck.Anal(eventSlave, 1));
			}
			r.push(`Your hands rove, teasing ${his} ${eventSlave.nipples} nipples,`);
			if (eventSlave.boobs > 1000) {
				r.push(`hefting ${his} heavy tits,`);
			} else if (eventSlave.boobs > 300) {
				r.push(`squeezing ${his} healthy breasts,`);
			} else {
				r.push(`pressing ${him} flat chest,`);
			}
			if (eventSlave.belly >= 1500) {
				r.push(`massaging ${his} rounded`);
				if (eventSlave.belly > 10000) {
					r.push(`belly and fondling ${his} popped navel.`);
				} else {
					r.push(`belly.`);
				}
			} else {
				r.push(`and`);
				if (eventSlave.weight > 130) {
					r.push(`groping ${his} huge gut.`);
				} else if (eventSlave.weight > 95) {
					r.push(`groping ${his} fat belly.`);
				} else if (eventSlave.muscles > 30) {
					r.push(`fondling ${his} abs.`);
				} else if (eventSlave.weight > 10) {
					r.push(`groping ${his} plush belly.`);
				} else {
					r.push(`fondling ${his} flat stomach.`);
				}
			}
			r.push(`${His} face is complacent and unaffected even as ${his} body responds,`);
			if (eventSlave.chastityPenis === 1) {
				r.push(`since ${his} body is used to its caged cock being neglected in favor of ${his}`);
				if (eventSlave.vagina > -1) {
					r.push(`pussy.`);
				} else {
					r.push(`asspussy.`);
				}
			} else if (eventSlave.dick > 0 && eventSlave.hormoneBalance >= 100) {
				r.push(`${his} useless dick sporting a drop of precum.`);
			} else if (eventSlave.dick > 0 && (eventSlave.balls === 0 || eventSlave.ballType === "sterile")) {
				r.push(`${his} soft dick twitching feebly.`);
			} else if (eventSlave.dick > 4) {
				r.push(`${his} giant penis protruding through a gap in the railing.`);
			} else if (eventSlave.dick > 2) {
				r.push(`${his} penis pressing hard against the railing.`);
			} else if (eventSlave.dick > 0) {
				r.push(`${his} pathetic hard-on barely protruding from between ${his} thighs.`);
			} else if (eventSlave.clit > 0) {
				r.push(`${his} huge clit stiff under a brush from your fingers.`);
			} else if (eventSlave.vagina === -1) {
				r.push(`${his} asspussy ready and relaxed under a brush from your fingers.`);
			} else {
				r.push(`${his} pussy warm and wet under a brush from your fingers.`);
			}
			r.push(`Even ${his} eventual orgasm is entirely mechanical, a simple tightening of ${his}`);
			if (canDoVaginal(eventSlave)) {
				if (eventSlave.vagina > 2) {
					r.push(`gaping cunt,`);
				} else if (eventSlave.vagina > 1) {
					r.push(`traveled pussy,`);
				} else {
					r.push(`tight vagina,`);
				}
			} else {
				if (eventSlave.anus > 2) {
					r.push(`gaping`);
				} else if (eventSlave.anus > 1) {
					r.push(`loosened`);
				} else {
					r.push(`tight`);
				}
				r.push(`sphincter,`);
			}
			r.push(`a gasp of air into ${his} lungs, and a slight shiver. There is a flaw at the corner of ${his} mouth that might be transitory pleasure, but a look`);
			if (canSee(eventSlave)) {
				r.push(`into ${his}`);
				if (hasBothEyes(eventSlave)) {
					r.push(`eyes`);
				} else {
					r.push(`eye`);
				}
			} else {
				r.push(`at ${his} face`);
			}
			r.push(`confirms that it is not so.`);
			return r;
		}
	}
};
