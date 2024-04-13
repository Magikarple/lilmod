// cSpell:ignore anyth

App.Events.RESSBadDream = class RESSBadDream extends App.Events.BaseEvent {
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
				s => s.devotion <= 20,
				s => s.trust < -20,
				s => s.rules.living === "spare",
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, hers
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let r = [];
		r.push(
			`Passing near the slave dormitory late at night, you hear a quiet cry within. This is strange; most slaves housed there are not inclined or not allowed to have sex in the middle of the night, and in any case, the noise wasn't one of pleasure. Looking in, you see a jerky movement near the door. It's`,
			App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), ","),
			`and ${he}'s obviously having a bad dream. ${He} raises`
		);
		if (hasBothArms(eventSlave)) {
			r.push(`an`);
		} else {
			r.push(`${his}`);
		}
		r.push(`arm to fend off some imagined danger, and in doing so, pushes the sheet down around ${his} waist. ${He} sleeps naked, like all your slaves, and the movement bares ${his}`);
		if (eventSlave.boobs > 2000) {
			r.push(`udders`);
		} else if (eventSlave.boobs > 1000) {
			r.push(`heavy breasts`);
		} else if (eventSlave.boobs > 400) {
			r.push(`boobs`);
		} else {
			r.push(`little tits`);
		}
		if (eventSlave.belly >= 5000) {
			r.push(`and ${belly}`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`pregnant`);
			}
			r.push(`belly`);
		}
		r.push(`to the cool night air. The low blue light outlines ${his} nipples as they`);
		if (eventSlave.nipples !== "fuckable") {
			r.push(`stiffen`);
		} else {
			r.push(`swell`);
		}
		r.push(`at the sudden change of temperature,`);
		switch (eventSlave.nipples) {
			case "tiny":
				r.push(`pricking up into little buds.`);
				break;
			case "flat":
				r.push(`becoming visible against ${his} areolae.`);
				break;
			case "puffy":
				r.push(`the puffy promontories jutting even farther out.`);
				break;
			case "partially inverted":
				r.push(`just starting to poke past their inversion.`);
				break;
			case "inverted":
				r.push(`the twin domes formed by their inverted shapes becoming more prominent.`);
				break;
			case "huge":
				r.push(`becoming so large they cast long shadows across ${his} bed.`);
				break;
			case "fuckable":
				r.push(`the fuckable holes steadily closing and starting to poke outwards.`);
				break;
			default:
				r.push(`becoming attractively erect.`);
		}
		r.push(`Still dreaming, ${he} clasps ${his}`);
		if (hasBothArms(eventSlave)) {
			r.push(`arms`);
		} else {
			r.push(`arm`);
		}
		r.push(`protectively over ${his}`);
		if (eventSlave.pregKnown === 1) {
			r.push(`unborn`);
			if (eventSlave.pregType > 1) {
				r.push(`children,`);
			} else {
				r.push(`child,`);
			}
		} else {
			r.push(`vulnerable chest,`);
		}
		r.push(`and rolls to one side. Halfway into a fetal position, ${he} turns ${his} head against ${his} pillow, murmuring`);
		if (eventSlave.accent <= 2) {
			r.push(Spoken(eventSlave, `"N-no — please no — I'll d-do anyth-thing — no..."`));
		} else {
			r.push(`earnest protests in ${his} mother tongue.`);
		}

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
		/* TODO: add a positive variant */
			new App.Events.Result(`Let ${him} be`, leave),
			new App.Events.Result(`Hug ${him}`, hug),
			(canDoAnal(eventSlave) || canDoVaginal(eventSlave))
				? new App.Events.Result(`Rape ${him}`, rape, ((eventSlave.vagina === 0 && canDoVaginal(eventSlave)) || (eventSlave.anus === 0) && canDoAnal(eventSlave)) ? `This option will take ${his} virginity` : null)
				: new App.Events.Result(),
		]);

		function leave() {
			return `It may be for the best to not disturb ${his} restless slumber, you decide. Admiring the attractive view for just a moment longer, you turn back and head to your own bed. The next morning, it appears as though ${eventSlave.slaveName} doesn't even remember this nightmare.`;
		}

		function hug() {
			r = [];
			r.push(`You reach out to hug ${him}, but as soon as your hand touches ${his} shoulder, ${he} writhes instinctively away.`);
			if (canSee(eventSlave)) {
				r.push(`${His} eyes fly open, searching frantically for ${his} assailant. Seeing that it's you, ${he} screams and scrabbles away even harder. After making it a few feet, ${he} collects ${his} wits enough to bring ${himself} to a stop and stop screaming, though ${he} continues to sob, staring at you in terror.`);
			} else {
				r.push(`${He} gropes frantically for ${his} assailant, before making contact with you. ${He} screams and scrabbles away, only stopping when ${he} collides with the nearest solid object.`);
				if (canHear(eventSlave)) {
					r.push(`Only after several call outs that it is you does ${he} stop screaming, though ${he} continues to sob, listening to your every breath in terror.`);
				} else {
					r.push(`After screaming ${himself} hoarse, ${he} realizes that ${his} assault has abruptly ended, and gently feels around ${his} surroundings with a shaking hand to discover ${himself} back in ${his} room.`);
				}
			}
			r.push(`${He} remains frozen in place as you slowly advance on ${him} and give ${him} a light embrace. ${His} tears gradually stop, but ${he} does not relax,`);
			if (canSee(eventSlave)) {
				r.push(`remaining dumbly stiff`);
			} else {
				r.push(`continuing to quake in fear`);
			}
			r.push(`within your arms. Eventually you let ${him} go, and ${he} crawls pathetically back under ${his} sheet, still weeping softly. It seems ${he} is <span class="trust dec">more afraid of you</span> than ever, and if you thought that a simple hug could win ${him} over, you were wrong.`);
			if (canSee(eventSlave)) {
				eventSlave.trust -= 4;
			} else if (canHear(eventSlave)) {
				eventSlave.trust -= 5;
			} else {
				eventSlave.trust -= 6;
			}
			return r;
		}

		function rape() {
			const frag = document.createDocumentFragment();
			r = [];
			r.push(`You snatch the sheet off ${him}, shove ${his} uppermost shoulder down so ${his} face is smashed into the pillow, and bring your knees down between ${his} legs, spreading them to force ${hers} apart. You use the hand that isn't controlling ${his} torso to locate ${his}`); // TODO: add support for one-handed PC?
			if (canDoVaginal(eventSlave)) {
				if (eventSlave.vagina > 2) {
					r.push(`amusingly loose cunt`);
				} else if (eventSlave.vagina > 1) {
					r.push(`large womanhood`);
				} else if (eventSlave.vagina > 0) {
					r.push(`tight pussy`);
				} else {
					r.push(`poor virgin pussy`);
				}
			} else {
				if (eventSlave.anus > 2) {
					r.push(`amusingly broad asshole`);
				} else if (eventSlave.anus > 1) {
					r.push(`big butthole`);
				} else if (eventSlave.anus > 0) {
					r.push(`tight rosebud`);
				} else {
					r.push(`poor virgin anus`);
				}
			}
			r.push(`in the dark as ${he} begins to <span class="trust dec">struggle and scream.</span> ${He} comes fully awake when ${he} feels your rough fingers searching for and then finding ${his}`);
			if (eventSlave.vagina >= 0 && canDoVaginal(eventSlave)) {
				r.push(`vagina,`);
			} else {
				r.push(`crinkled hole,`);
			}
			r.push(`and ${his} noise increases to the point where it becomes annoying. You stuff ${his} face into the pillow and take ${him} mercilessly, using the pillow to cut off ${his} breath whenever ${he} struggles too much, until oncoming suffocation forces ${him} to go still and take it like a good little bitch.`);
			App.Events.addParagraph(frag, r);
			App.Events.addParagraph(frag, [`<span class="devotion dec">Sometimes dreams do come true.</span>`]);
			App.Events.addParagraph(frag, [VCheck.Simple(eventSlave, 1)]);
			eventSlave.trust -= 4;
			eventSlave.devotion -= 4;
			return frag;
		}
	}
};
