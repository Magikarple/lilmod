App.Events.RESSSoreShoulders = class RESSSoreShoulders extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => canTalk(s, false),
				s => s.assignment !== Job.QUARTER,
				s => s.muscles > 5,
				s => s.devotion > 20,
				s => s.diet !== "slimming",
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
		const arms = hasBothArms(eventSlave) ? `arms` : `arm`;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(
			App.UI.DOM.slaveDescriptionDialog(eventSlave),
			`comes before you for a routine inspection. The`,
		);
		if (eventSlave.muscles > 95) {
			r.push(`heavily muscled`);
		} else if (eventSlave.muscles > 30) {
			r.push(`ripped`);
		} else {
			r.push(`toned`);
		}
		r.push(`${SlaveTitle(eventSlave)} is looking good, but as ${he} raises ${his} ${arms} over ${his} head to spin ${his} nude torso under your gaze, ${he} winces slightly.`);
		if (canSee(eventSlave)) {
			r.push(`${His} ${App.Desc.eyesColor(eventSlave)} flick up to see if you noticed, and ${his} face falls a little when ${he} sees that you did. You raise one eyebrow, and the obedient slave explains ${himself}.`);
		} else if (canHear(eventSlave)) {
			r.push(`${His} ears perk up to hear if you noticed. You clear your throat, startling ${him} and making ${him} explain ${himself}.`);
		} else {
			r.push(`${He} tries to affect a stoic expression, but when you tentatively touch one of ${his} shoulders, ${he} grimaces slightly and quickly opts to explain ${himself}.`);
		}
		if (!canTalk(eventSlave)) {
			r.push(`${He} uses gestures to beg your pardon, and explains that yesterday was arm day for ${him}, and ${he} went out a little hard. ${His} shoulders are a little sore, but ${he} gestures that ${he}'s all right.`);
		} else {
			r.push(
				Spoken(eventSlave, `"Sorry, ${Master},"`),
				`${he} ${say}s apologetically.`,
				Spoken(eventSlave, `"I'm okay. Yesterday was arm day for me, and I went out a little too hard. My shoulders are kinda sore, but I'm alright."`)
			);
		}

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Make ${him} work it out`, make, virginityWarning()),
			new App.Events.Result(`Give ${him} a massage`, give),
		]);

		function virginityWarning() {
			if ((eventSlave.anus === 0 && canDoAnal(eventSlave)) || (eventSlave.vagina === 0 && canDoVaginal(eventSlave))) {
				return `This option will take ${his} virginity`;
			}
		}

		function make() {
			const r = new SpacedTextAccumulator();
			r.push(`You tell ${him} to get ready to go into a handstand. ${He} looks puzzled, but anticipatory, and hurries to comply.`);
			if (eventSlave.boobs > 2000) {
				r.push(`${He} has to be careful doing it, since ${his} huge boobs come down and almost smother the poor slave once ${he}'s inverted.`);
			}
			if (eventSlave.belly >= 300000) {
				r.push(`${His} belly is so hugely distended, ${he}'ll practically require your assistance to stay inverted.`);
			} else if (eventSlave.weight > 130) {
				r.push(`${His} belly is so fat that ${he} has to take precautions to handle the massive shift in its mass when ${he} inverts.`);
			}
			r.push(`You get up from behind your desk,`);
			if (V.PC.dick === 0) {
				r.push(`don a strap-on,`);
			}
			r.push(`and stand behind ${him}. You grab ${him} by the ankles, and ${he} giggles self-consciously, aware that in this position, ${his}`);
			if (eventSlave.vagina > -1) {
				r.push(`holes are on display pretty much as openly as they can possibly be.`);
			} else {
				r.push(`butthole is on display pretty much as openly as it can possibly be.`);
			}
			r.push(`${He} groans with soreness as you lift ${him} by ${his} legs, pulling ${him} upward until ${he}'s in a full handstand, ${his} knees clasping you on either side to steady ${him}. Carefully, you maneuver your`);
			if (V.PC.dick === 0) {
				r.push(`phallus`);
			} else {
				r.push(`cock`);
			}
			r.push(`to line it up with ${his}`);
			if (eventSlave.vagina > -1) {
				r.push(`pussy.`);
			} else {
				r.push(`asspussy.`);
			}
			r.push(`Realizing what you intend, ${he} arches ${his} back and cocks ${his} hips,`);
			if (eventSlave.belly >= 5000) {
				r.push(`pushing ${his} already bulging stomach even further out from ${him}, all the while`);
			}
			r.push(`grunting and shivering as ${his} sore muscles stretch to support ${him} in the necessary gymnastic pose to angle ${his} hole just right.`);
			r.toParagraph();
			r.push(`With the combined pain and pleasure of the stretch already overstimulating ${him}, ${he} gives a huge sobbing gasp as you enter ${him}. You move your hands to ${his}`);
			if (eventSlave.weight > 95) {
				r.push(`soft`);
			} else if (eventSlave.weight > 10) {
				r.push(`plush`);
			} else if (eventSlave.muscles > 30) {
				r.push(`well-muscled`);
			} else {
				r.push(`trim`);
			}
			r.push(`hips one at a time, and then begin to slowly move ${his} inverted body towards you and away from you, impaling ${him}. ${His} whole body shakes with pleasure and exertion, and when ${he} orgasms, you have to support ${him} to stop ${him} crashing to the ground`);
			if (eventSlave.belly >= 300000) {
				r.addToLast(`, a struggle thanks to ${his} excessive weight`);
			}
			r.addToLast(`. You let ${him} down onto the floor slowly`);
			if (eventSlave.vagina > -1) {
				r.addToLast(`, but tell ${him} that after a short break, ${he}'s to get back up so you can see to ${his} anus`);
			}
			r.addToLast(`. ${He}'s breathing very hard and still coming down off a terrific head rush, so ${he} just <span class="devotion inc">blows you a kiss.</span>`);
			eventSlave.devotion += 4;
			r.push(VCheck.Both(eventSlave, 1));
			r.toParagraph();
			return r.container();
		}

		function give() {
			const frag = document.createDocumentFragment();
			const r = new SpacedTextAccumulator(frag);
			r.push(`You vault your desk, fold yourself into a cross-legged pose with your back against its front,`);
			if (canSee(eventSlave)) {
				r.push(`and point to the floor in front of you.`);
				if (eventSlave.attrXX > 65 && V.PC.boobs >= 300) {
					r.push(`(As you do, ${he} watches the effects of the motion on your breasts with something like reverence`);
					if (V.PC.boobsImplant > 0) {
						r.addToLast(`, even though they don't move much thanks to your implants`);
					}
					r.addToLast(`.)`);
				} else if (eventSlave.attrXY > 65 && V.PC.boobs < 300) {
					r.push(`(As you do, ${he} takes in the powerful play of your muscles with something like reverence`);
					if (V.PC.balls >= 5) {
						r.addToLast(`. ${He} certainly notices the motion of your massive nuts too`);
					}
					r.addToLast(`.)`);
				}
			} else if (canHear(eventSlave)) {
				r.push(`and loudly tap the floor in front of you.`);
			} else {
				r.push(`and reach out to lightly tug ${him} towards you.`);
			}
			r.push(`${He} hurries over and gets down on the floor with you, conforming to your manual guidance that ${he} should sit with ${his} back to you. You place your hands on either side of ${his} neck, run them capably down ${his} spine, and then back up to explore ${his} shoulders. ${He} gasps as ${he} realizes that you intend to give ${him} a massage, <span class="trust inc">impressed</span> and a little perturbed that you would do this for ${him}. Indeed, it's unusual for a slaveowner to do something like this, but it's easily justifiable as hands-on maintenance of your property. You tell ${him} so as your fingers begin to probe ${his} muscles in more detail, eliciting a shiver`);
			if (canTalk(eventSlave)) {
				r.addToLast(`.`);
			} else {
				r.push(
					`and a tiny`,
					Spoken(eventSlave, `"Yes, ${Master}."`)
				);
			}
			r.push(`${He} begins to breathe rather hard, and you notice`);
			if (eventSlave.belly >= 120000) {
				r.push(`${him} starting to shift ${his} hips uncomfortably. ${His} ${belly} belly blocks any view of ${his} crotch in the reflective wall opposite ${him}, but you can smell the precum beginning to flow under the crotch hiding orb.`);
			} else if (eventSlave.chastityPenis === 1) {
				r.push(`${him} starting to shift ${his} hips uncomfortably, though of course you see in the reflective wall opposite ${him} that ${his} cock remains as caged as ever.`);
			} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
				r.push(`${him} starting to shift ${his} hips uncomfortably, though of course you see in the reflective wall opposite ${him} that ${his} cock remains as limp as ever.`);
			} else if (eventSlave.dick > 0) {
				r.push(`${him} starting to shift ${his} hips uncomfortably. You see in the reflective wall opposite ${him} that ${his} cock is almost agonizingly hard.`);
			} else if (eventSlave.vagina === -1) {
				r.push(`${him} starting to shift ${his} ass uncomfortably. ${He} must really want it, and of course, ${he} knows that ${his} butt is ${his} main source of stimulation now.`);
			} else {
				r.push(`the wonderful aroma of female arousal beginning to permeate the office as ${he} starts to shift ${his} hips uncomfortably.`);
			}
			eventSlave.trust += 2;

			r.toParagraph();
			App.Events.addResponses(frag, [
				new App.Events.Result(`Tell ${him} ${he}'s free to masturbate`, masturbate),
				(eventSlave.anus > 0)
					? new App.Events.Result(`Fuck ${his} ass`, fuck)
					: new App.Events.Result(),
			]);

			return r.container();

			function masturbate() {
				const r = new SpacedTextAccumulator();
				r.push(`You lean forward until your lips graze one of ${his} ears, and tell ${him} that ${he} can touch ${himself} if ${he} wants.`);
				if (!canTalk(eventSlave)) {
					r.push(`${He} raises a shaky hand to gesture <span class="trust inc">${his} thanks</span> as the other`);
				} else {
					r.push(`<span class="trust inc">"Thank you</span> ${Master}!" ${he} squeaks as a hand`);
				}
				r.push(`dives for ${his} crotch. ${He}`);
				if (eventSlave.vagina === -1 && eventSlave.dick === 0) {
					r.push(`rubs ${his} perineum and anus`);
				} else if (eventSlave.chastityVagina) {
					r.push(`rubs ${his} perineum`);
				} else if (eventSlave.vagina > -1) {
					r.push(`schlicks ${himself}`);
				} else if (eventSlave.chastityPenis === 1) {
					r.push(`rubs ${his} perineum and anus`);
				} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
					r.push(`rubs ${his} soft bitchclit`);
				} else {
					r.push(`jacks off`);
				}
				r.push(`shamelessly as you complete the massage, moaning with satisfaction as the competing sources of endorphins suffuse ${him}.`);
				eventSlave.trust += 2;
				r.toParagraph();
				return r.container();
			}

			function fuck() {
				const r = new SpacedTextAccumulator();
				r.push(`You gently push ${his} shoulders forward. ${He} moans as the forward lean stretches ${his} hip flexors, and then breathes deeply with relief as you pull ${his} legs back and out of their crossed position. The rush of a completed stretch crashes into ${him}, and ${he} relaxes completely. This change of position leaves ${him} with ${his}`);
				if (eventSlave.butt > 6) {
					r.push(`massive ass`);
				} else if (eventSlave.butt > 3) {
					r.push(`big butt`);
				} else {
					r.push(`rear`);
				}
				r.push(`pointed right at you, and ${he} knows what's coming next. ${His}`);
				if (eventSlave.anus > 2) {
					r.push(`loose butthole relaxes completely into a gape that positively begs to be penetrated.`);
				} else if (eventSlave.anus > 1) {
					r.push(`relaxed anus opens into a slight gape that positively begs to be penetrated.`);
				} else {
					r.push(`tight anus relaxes slightly, ${his} rosebud begging to be fucked.`);
				}
				r.push(`You rise partway to kneel behind ${him},`);
				if (V.PC.dick === 0) {
					r.push(`sliding fingers inside the slave's ass and humping your pussy against the heel of that hand`);
				} else {
					r.push(`using a hand to guide your member inside the slave's ass`);
					if (V.PC.vagina !== -1) {
						r.addToLast(`, not without teasing your own pussylips a bit`);
					}
				}
				r.addToLast(`. ${He} gasps when your other hand grabs one of ${his} shoulders and continues the massage. You quickly find that working out a knot in ${his} muscles produces reflexive reactions across ${his} whole body, notably including ${his} anal sphincter. After you've driven ${him} into a state of <span class="devotion inc">mindless satiation</span> and climaxed yourself, you let ${him} slump to the floor and curl up around ${his} sweaty body.`);
				eventSlave.devotion += 2;
				r.push(VCheck.Anal(eventSlave, 1));
				r.toParagraph();
				return r.container();
			}
		}
	}
};
