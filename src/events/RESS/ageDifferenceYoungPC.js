App.Events.RESSAgeDifferenceYoungPC = class RESSAgeDifferenceYoungPC extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.PC.actualAge < 25,
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canWalk,
				canTalk,
				canHear,
				s => s.devotion > 20,
				s => s.trust > 20,
				s => s.actualAge > 35,
				s => (canDoAnal(s) || canDoVaginal(s)),
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself, mother, woman
		} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let r = [];
		r.push(`As another long week draws to a close,`);
		r.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), ","));
		r.push(`happens to`);
		if (eventSlave.belly >= 10000) {
			r.push("waddle");
		} else {
			r.push("walk");
		}
		r.push(`past your office toward bed. There's nothing inherently abnormal about ${his} actions, but you do notice as ${he} steps past the doorway that an expression of worry and concern adorns ${his} ${eventSlave.skin} face. When you call ${him} into your office, ${his} face visibly brightens up in an attempt to conceal ${his} obvious distress as ${he} comes before you. Notably, although ${he} stands still and patiently awaits further orders, you notice ${he}`);
		if (canSee(eventSlave)) {
			r.push(`never manages to meet your eyes.`);
		} else {
			r.push(`keeps ${his} sightless eyes downcast.`);
		}
		r.push(`When you ask ${him} what's troubling ${him}, ${his} face plainly falls.`);
		App.Events.addParagraph(node, r);
		r = [];

		if (!isParentP(PC, eventSlave)) {
			r.push(Spoken(eventSlave, `"${Master}, you're so young,"`));
			r.push(`${he} ${say}s penitently before smiling shyly in an attempt to insert some levity into ${his} confession.`);
			r.push(Spoken(eventSlave, `"It's just that I'm old enough to be your ${mother}, ${Master}. It's a little weird, isn't it?"`));
		} else {
			r.push(Spoken(eventSlave, `"${Master}, you're so`));
			if (PC.title === 1) {
				r.push(Spoken(eventSlave, `handsome,"`));
			} else {
				r.push(`beautiful,"`);
			}r.push(`${he} ${say}s penitently before smiling shyly in an attempt to insert some levity into ${his} confession.`);
			r.push(Spoken(eventSlave, `"It's just that you've become so attractive since`));
			if (PC.mother === eventSlave.ID) {
				r.push(Spoken(eventSlave, `I gave birth to you, I just can't compete,`));
			} else {
				r.push(Spoken(eventSlave, `your mother gave birth to you, I just can't compete, and I don't even come close to her looks,`));
			}
			r.push(Spoken(eventSlave, `${Master}. It's a little weird, isn't it, for such an old ${woman} to be graced with such a lovely ${Master}?"`));
		}

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Gently acclimate ${him} to the age difference with some lovemaking`, lovemaking, virginityWarning(false)),
			new App.Events.Result(`Cruelly torment ${him} about the age difference`, torment, virginityWarning(false)),
			isFertile(eventSlave)
				? new App.Events.Result(`Give ${him} an afternoon off for some quality time with a local Frat House`, afternoon, virginityWarning(true))
				: new App.Events.Result(),

		]);

		function virginityWarning(knockedUp){
			if (knockedUp) {
				let t = `This option will render ${eventSlave.slaveName} pregnant`;
				if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0)) {
					t += ` and take ${his} virginity`;
				} else if (!canDoVaginal(eventSlave) && (eventSlave.anus === 0)) {
					t += ` and take ${his} anal virginity`;
				}
				return t;
			} else if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0)) {
				return `This option will take ${his} virginity`;
			} else if (!canDoVaginal(eventSlave) && (eventSlave.anus === 0)) {
				return `This option will take ${his} anal virginity`;
			}
		}

		function lovemaking() {
			r = [];
			r.push(`As you cross the breadth of your office to reach ${eventSlave.slaveName}, ${he} presents ${himself} for your sexual usage out of habit. However, you take ${him} by surprise by drawing ${him} into your arms, running the tips of your fingers`);
			if (eventSlave.hStyle.includes("bald") || eventSlave.bald === 1) {
				r.push(`across ${his} scalp,`);
			} else {
				r.push(`through ${his} ${eventSlave.hColor} hair,`);
			}
			r.push(`and looking into ${his} ${App.Desc.eyesColor(eventSlave)}.`);
			if (canSee(eventSlave)) {
				r.push(`${He} meets your gaze for a brief moment before blushing girlishly, as if forgetting how many years your senior ${he} is.`);
			} else {
				r.push(`${He} seems to feel the intensity of your gaze despite ${his} sightless eyes and blushes girlishly, as if forgetting how many years your senior ${he} is.`);
			}
			r.push(`In lieu of words, you lift ${his} chin with a single beckoning finger and steal ${his} breath from ${his} lips with a firm kiss. Once ${he}'s recovered ${his} wits ${he} clings to you with almost animalistic attachment. After a few moments ${he} moves to get down on ${his} knees, clearly defaulting to ${his} role as a sex slave in response to your unexpected intimacy. Instead, you`);
			if (eventSlave.belly >= 300000) {
				r.push(`help ${him} to ${his} feet and guide ${him} to bed, aiding the`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`child-laden`);
				} else {
					r.push(`tremendously swollen`);
				}
				r.push(`older ${woman} onto the sheets before gently mounting ${him}.`);
			} else { // check canLift() here!
				if (eventSlave.belly >= 5000) {
					r.push(`carefully`);
				}
				r.push(`lift ${him} up from ${his} low position beneath you and carry ${him} to bed, laying the flushed older ${woman} down on the sheets before gently positioning yourself on top of ${him}.`);
			}
			r.push(`Together, the two of you make fiercely intimate love, while you whisper romantic reassurances into ${his} ear, nip at ${his} neck,`);
			if (eventSlave.bellyPreg >= 300000) {
				r.push(`run your hands across ${his} squirming brood,`);
			} else if (eventSlave.preg > eventSlave.pregData.normalBirth / 2) {
				r.push(`stroke ${his} pregnant belly,`);
			} else if (eventSlave.belly >= 5000) {
				r.push(`caress the curve of ${his} ${belly} belly,`);
			}
			r.push(`and bring ${him} to climax again and again. After a final frantic orgasm together in ${his}`);
			if (canDoVaginal(eventSlave)) {
				r.push(`pussy`);
			} else {
				r.push(`anus`);
			}
			r.push(`${he}`);
			if (canSee(eventSlave)) {
				r.push(`looks`);
			} else {
				r.push(`gazes sightlessly`);
			}
			r.push(`up at you with <span class="devotion inc">adoration</span> and a new <span class="trust inc">trust</span> in ${his} young ${getWrittenTitle(eventSlave)}.`);
			eventSlave.devotion += 4;
			eventSlave.trust += 4;
			if (canDoVaginal(eventSlave)) {
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else {
				r.push(VCheck.Anal(eventSlave, 1));
			}
			return r;
		}

		function torment() {
			const frag = document.createDocumentFragment();
			r = [];
			r.push(`As you close in on ${eventSlave.slaveName} predatorily, ${his} face blanches with visible regret at ${his} prior candidness. By the time you have ${him} bent over`);
			if (eventSlave.belly >= 300000) {
				r.push(`${his} ${belly} belly`);
			} else {
				r.push(`your desk`);
			}
			r.push(`and begun spanking ${his}`);
			if (eventSlave.butt > 12) {
				r.push(`absurd ass,`);
			} else if (eventSlave.butt > 6) {
				r.push(`massive behind,`);
			} else if (eventSlave.butt > 3) {
				r.push(`bountiful bottom,`);
			} else {
				r.push(`cute ass,`);
			}
			r.push(`${he} seems almost resigned to accept any of the standard punishments you've been known to dole out. When your lips lightly brush`);
			if (eventSlave.earShape !== "none" && eventSlave.earT !== "none") {
				r.push(`one of ${his} ears,`);
			} else {
				r.push(`where ${his} ear used to be,`);
			}
			r.push(`${he} flinches harder at the gentle touch than any of your harsh, disciplinary spanks. When you start whispering wicked reminders about ${his} sexual submission and subservience to so young a ${getWrittenTitle(eventSlave)}, ${he} begins to sob quietly`);
			if (eventSlave.belly >= 300000) {
				if (eventSlave.boobs > 600) {
					r.push(`into ${his} breasts.`);
				} else if (!hasAnyArms(eventSlave)) {
					r.push(`with no means to hide it.`);
				} else {
					r.push(`into ${his} hands.`);
				}
			} else {
				r.push(`against the hard surface of your desk.`);
			}
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`By the time you deign to`);
			if (V.PC.dick === 0) {
				r.push(`don a strap-on and`);
			}
			r.push(`mount ${his} ass, ${he} seems catatonic at the revelation that ${his} body is owned by so cruel a ${Master}, nearly half ${his} age. Even when you accompany each brutal thrust with a harsh spank and a harsh jab at the dearth in years between the two of you, ${he} merely winces at the`);
			if (canDoVaginal(eventSlave)) {
				r.push(`force`);
			} else {
				r.push(`anal pain`);
			}
			r.push(`of your coupling. Judging by the`);
			if (!canSee(eventSlave)) {
				r.push(`exceptionally`);
			}
			r.push(`empty look in ${his} eyes that persists past ${his} dismissal from your office, ${he} might <span class="trust dec">not feel any better</span> about the age difference but you've definitely <span class="devotion inc">fucked ${him} into compliance.</span>`);
			eventSlave.devotion += 4;
			eventSlave.trust -= 4;
			if (canDoVaginal(eventSlave)) {
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else {
				r.push(VCheck.Anal(eventSlave, 1));
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function afternoon() {
			const frag = document.createDocumentFragment();
			App.Events.addParagraph(frag, [`You direct ${V.assistant.name} to clear ${eventSlave.slaveName}'s schedule and to find a local Frat House willing to 'host' a ${woman} of ${his} age and experience. Perhaps a group of virile college boys running a train on ${eventSlave.slaveName} might accustom ${him} to younger sexual partners. When ${eventSlave.slaveName} leaves the penthouse, ${he}'s dressed up to look like a frumpy old world ${woman === "woman" ? "MILF" : "DILF"} and is clearly skeptical about your age-play therapy.`]);

			r = [];
			r.push(`${eventSlave.slaveName} returns to the penthouse naked, disheveled, and absolutely covered in a thick coating of drying cum. Despite ${his} appearance, however, ${he} is practically beaming with happiness. It seems young cock agrees with ${him}, and by the state of ${his}`);
			if (eventSlave.mpreg === 1) {
				r.push(`cum-drenched asshole`);
			} else {
				r.push(`messy pussy`);
			}
			r.push(`${his} youthful partners particularly enjoyed filling ${him} with their potent seed. Unsurprisingly, at a routine check up later that week, ${eventSlave.slaveName} joyfully discovers that ${he} was impregnated during ${his} Frat House excursion. It seems that being bred by a bunch of horny college boys has eliminated ${his} prior worries about the importance of age and also caused ${him} to <span class="fetish gain">fetishize impregnation.</span> <span class="devotion inc">${He} has become more submissive to you</span> for giving ${him} the means to broaden ${his} sexual horizons.`);
			eventSlave.devotion += 4;
			eventSlave.preg = 1;
			eventSlave.pregWeek = 1;
			eventSlave.pregKnown = 1;
			eventSlave.pregType = setPregType(eventSlave);
			WombImpregnate(eventSlave, eventSlave.pregType, 0, 1);
			eventSlave.fetish = "pregnancy";
			eventSlave.fetishKnown = 1;
			eventSlave.fetishStrength = 10;
			if (eventSlave.mpreg === 1) {
				seX(eventSlave, "anal", "public", "penetrative", 10);
				if (eventSlave.anus === 0) {
					eventSlave.anus++;
				}
			} else {
				seX(eventSlave, "vaginal", "public", "penetrative", 10);
				if (eventSlave.vagina === 0) {
					eventSlave.vagina++;
				}
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
