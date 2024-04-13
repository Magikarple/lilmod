App.Events.RESSImpregnationPlease = class RESSImpregnationPlease extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seePreg !== 0,
			() => V.PC.dick !== 0,
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => (s.fetish === "pregnancy" || s.energy > 95),
				s => s.devotion > 50,
				s => s.vagina !== 0,
				s => s.anus > 0,
				hasAnyArms,
				canWalk,
				isFertile,
				s => s.eggType === "human",
				s => s.fetishKnown === 1,
				s => !(s.geneticQuirks.superfetation === 2 && (s.intelligence + s.intelligenceImplant > 15) && s.womb.length > 0) || (s.belly < (s.pregAdaptation * 1750)) // Material conditional: only false if first condition is true and second is false
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {His, He, he, his, him, himself} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		let isFaceUp = true;
		const isPregnantAndSuperfetation = (eventSlave.geneticQuirks.superfetation === 2 && eventSlave.pregKnown === 1);

		let r = [];
		r.push(`Taken by a mood,`);
		r.push(contextualIntro(V.PC, eventSlave, true));
		if (isPregnantAndSuperfetation) {
			if (eventSlave.belly >= 750000) {
				r.push(`barely makes into your office before turning and leaning against ${his} ${belly} belly. Once ${he} manages to get comfortable against the strained mass, ${he} wiggles ${his} exposed`);
				if (eventSlave.mpreg === 1) {
					r.push(`asshole`);
				} else {
					r.push(`pussylips`);
				}
				r.push(`with a strange light`);
				if (canSee(eventSlave)) {
					r.push(`in ${his} eyes.`);
				} else {
					r.push(`on ${his} face.`);
				}
				isFaceUp = false;
			} else if (eventSlave.belly >= 450000) {
				r.push(`slowly waddles into your office with a strange light`);
				if (canSee(eventSlave)) {
					r.push(`in ${his} eyes.`);
				} else {
					r.push(`on ${his} face.`);
				}
				r.push(`${He} carefully turns before your desk and leans forward with a grunt against ${his} ${belly} belly, allowing it to part ${his} legs while exposing ${his}`);
				if (eventSlave.mpreg === 1) {
					r.push(`asshole`);
				} else {
					r.push(`pussylips`);
				}
				r.push(`to you. ${He} gingerly rubs ${his} agitated stomach as ${he} wiggles ${his} bottom at you.`);
				isFaceUp = false;
			} else if (eventSlave.belly >= 300000) {
				r.push(`slowly waddles into your office with a strange light`);
				if (canSee(eventSlave)) {
					r.push(`in ${his} eyes.`);
				} else {
					r.push(`on ${his} face.`);
				}
				r.push(`${He} carefully turns before your desk and leans forward with a grunt against ${his} ${belly} belly, allowing it to part ${his} legs while exposing ${his}`);
				if (eventSlave.mpreg === 1) {
					r.push(`asshole`);
				} else {
					r.push(`pussylips`);
				}
				r.push(`to you.`);
				isFaceUp = false;
			} else if (eventSlave.belly >= 150000) {
				r.push(`nearly trips under ${his} own weight as ${he} waddles into your office with a strange light`);
				if (canSee(eventSlave)) {
					r.push(`in ${his} eyes.`);
				} else {
					r.push(`on ${his} face.`);
				}
				r.push(`${He} maneuvers over to the couch, leans forward with a grunt as ${his} ${belly} belly pushes into the floor, spreading ${his} legs and exposing ${his}`);
				if (eventSlave.mpreg === 1) {
					r.push(`asshole`);
				} else {
					r.push(`pussylips`);
				}
				r.push(`to you.`);
				isFaceUp = false;
			} else if (eventSlave.belly >= 60000) {
				r.push(`waddles into your office with a strange light`);
				if (canSee(eventSlave)) {
					r.push(`in ${his} eyes.`);
				} else {
					r.push(`on ${his} face.`);
				}
				r.push(`${He} maneuvers over to the couch, leans forward, spreads ${his} legs and exposes ${his}`);
				if (eventSlave.mpreg === 1) {
					r.push(`asshole`);
				} else {
					r.push(`pussylips`);
				}
				r.push(`to you.`);
				isFaceUp = false;
			} else if (eventSlave.belly >= 10000) {
				r.push(`hastily waddles into your office with a strange light`);
				if (canSee(eventSlave)) {
					r.push(`in ${his} eyes.`);
				} else {
					r.push(`on ${his} face.`);
				}
				r.push(`${He} sits down on the couch and scoots down so ${his} butt is right at the edge of the couch and ${his} ${belly} belly is sticking up in the air. ${He} then spreads ${his} legs and exposes ${his}`);
				if (eventSlave.mpreg === 1) {
					r.push(`asshole`);
				} else {
					r.push(`pussylips`);
				}
				r.push(`to you.`);
			} else {
				r.push(`hurries into your office with a strange light`);
				if (canSee(eventSlave)) {
					r.push(`in ${his} eyes.`);
				} else {
					r.push(`on ${his} face.`);
				}
				r.push(`${He} sits down on the couch and scoots down so ${his} butt is right at the edge of the couch. ${He} then spreads ${his} legs and uses ${hasBothArms(eventSlave) ? "one" : `${his}`} hand to spread ${his}`);
				if (eventSlave.mpreg === 1) {
					r.push(`asshole`);
				} else {
					r.push(`pussylips`);
				}
				r.push(`for you.`);
			}
			if (!canTalk(eventSlave)) {
				r.push(`${He} pantomimes pregnancy with`);
				if (!hasBothArms(eventSlave)) {
					r.push(`${his}`);
				} else if (eventSlave.belly < 10000) {
					r.push(`${his} other`);
				} else {
					r.push(`one`);
				}
				r.push(`hand, lewdly gesturing to ask you to cum inside ${his} still very fertile`);
				if (eventSlave.mpreg === 1) {
					r.push(`asspussy.`);
				} else {
					r.push(`pussy.`);
				}
			} else {
				r.push(Spoken(eventSlave, `"Please put another baby in me, ${Master}, I have plenty of room still,"`));
				if (eventSlave.lips > 70) {
					r.push(`${he} begs through ${his} dick-sucking lips.`);
				} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
					r.push(`${he} begs through ${his} ridiculous piercings.`);
				} else {
					r.push(`${he} begs.`);
				}
				r.push(Spoken(eventSlave, `"I can't stand it. I need to make you another slave, ${Master}. Please stuff my body with as many future slaves as my womb can hold. Make me your slave production line."`));
			}
		} else {
			r.push(`hurries into your office with a strange light`);
			if (canSee(eventSlave)) {
				r.push(`in ${his} eyes.`);
			} else {
				r.push(`on ${his} face.`);
			}
			r.push(`${He} sits down on the couch and scoots down so ${his} butt is right at the edge of the couch. ${He} then spreads ${his} legs and uses ${hasBothArms(eventSlave) ? "one" : `${his}`} hand to spread ${his}`);
			if (eventSlave.mpreg === 1) {
				r.push(`asshole`);
			} else {
				r.push(`pussylips`);
			}
			r.push(`for you.`);
			App.Events.addParagraph(node, r);
			r = [];

			if (!canTalk(eventSlave)) {
				r.push(`${He}`);
				if (hasBothArms(eventSlave)) {
					r.push(`pantomimes pregnancy with ${his} other hand,`);
				} else {
					r.push(`shifts to pantomiming pregnancy with ${his} hand,`);
				}
				r.push(`lewdly gesturing to ask you to cum inside ${his} fertile`);
				if (eventSlave.mpreg === 1) {
					r.push(`ass`);
				}
				r.push(`pussy.`);
			} else {
				r.push(Spoken(eventSlave, `"Please knock me up, ${Master},"`));
				if (eventSlave.lips > 70) {
					r.push(`${he} begs through ${his} dick-sucking lips.`);
				} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
					r.push(`${he} begs through ${his} ridiculous piercings.`);
				} else {
					r.push(`${he} begs.`);
				}
				r.push(Spoken(eventSlave, `"I can't stand it. I need to make you another slave, ${Master}. Please use my body as your slave factory."`));
			}
		}
		if (canSee(eventSlave)) {
			r.push(`${He} stares at you doe-eyed,`);
		} else {
			r.push(`${He} faces you with the look of a child begging for candy,`);
		}
		r.push(`desperately awaiting your answer.`);
		App.Events.addParagraph(node, r);

		let responses = [new App.Events.Result(`Put a slave in ${him}`, impregnate)];
		if (eventSlave.mpreg === 0) {
			responses.push(new App.Events.Result(`Use ${his} ass but give ${him} what ${he} wants`, impregnateAss));
			responses.push(new App.Events.Result(`Sneak it into ${his} ass instead`, sneak));
		} else {
			responses.push(new App.Events.Result(`Use ${his} ass but finish across ${his} back`, back));
		}
		if (cumSlaves().length >= 5) {
			responses.push(new App.Events.Result(`Use the Dairy cockmilk to impregnate ${him}`, dairy));
		}
		App.Events.addResponses(node, responses);

		function impregnate() {
			r = [];
			if (eventSlave.mpreg === 1) {
				if (!canDoAnal(eventSlave)) {
					r.push(`You slowly undo ${his} chastity, allowing ${him} to be overwhelmed with anticipation of the deed to come.`);
				}
			} else if (eventSlave.chastityVagina) {
				r.push(`You slowly undo ${his} chastity, allowing ${him} to be overwhelmed with anticipation of the deed to come.`);
			}
			r.push(`Despite ${himself}, ${he} breaks down when ${he} feels your cock enter ${his}`);
			if (eventSlave.mpreg === 1) {
				if (eventSlave.anus === 1) {
					r.push(`deliciously tight`);
				} else if (eventSlave.anus === 2) {
					r.push(`well experienced`);
				} else {
					r.push(`fucked-out`);
				}
				r.push(`ass.`);
			} else {
				if (eventSlave.vagina === 1) {
					r.push(`deliciously tight`);
				} else if (eventSlave.vagina === 2) {
					r.push(`well experienced`);
				} else {
					r.push(`fucked-out`);
				}
				r.push(`cunt.`);
			}
			if (isPregnantAndSuperfetation) {
				r.push(`${He} grinds against you`);
			} else {
				r.push(`${He} smiles up reassuringly at you`);
			}
			r.push(`to let you know ${he}'s not in pain or anguish, blinking away ${his} happy tears.`);
			if (isFaceUp) {
				r.push(`${He} reaches up to hug ${himself} close to you,`);
				if (eventSlave.bellyPreg >= 5000) {
					r.push(`but the gravid swell of ${his} current pregnancy thwarts ${his} efforts as you take ${him}.`);
				} else if (eventSlave.belly >= 5000 && eventSlave.boobs < 600) {
					r.push(`${his} big ${eventSlave.inflationType}-stuffed belly pushing against you as you take ${him}.`);
				} else if (V.PC.belly >= 5000) {
					r.push(`but the best ${he} can do is press ${himself} against your bulging middle.`);
				} else if (eventSlave.boobs < 600 && eventSlave.belly < 5000) {
					r.push(`and ${his} modest breasts let ${him} snuggle close to you, face-to-face, as you take ${him}.`);
				} else if (eventSlave.boobs < 10000) {
					r.push(`and ${his} big tits`);
					if (eventSlave.bellyFluid >= 2000) {
						r.push(`and ${eventSlave.inflationType}-stuffed belly`);
					}
					r.push(`form a soft cushion between you as you take ${him}.`);
				} else {
					r.push(`but ${his} massive tits stop ${him} from bringing ${himself} too close to you as you take ${him}.`);
				}
			} else {
				r.push(`${He} reaches back to take your hand, slowly bringing it back to the swell of ${his} baby bump.`);
			}
			r.push(`${He} enjoys ${himself} immensely, but ${he} loses it again when ${he} feels your`);
			if (V.PC.balls >= 30) {
				if (isPregnantAndSuperfetation) {
					r.push(`seed inflating ${his} womb until ${his} stomach is`);
					if (eventSlave.belly >= 2000) {
						r.push(`noticeably larger than when ${he} started.`);
					} else {
						r.push(`distended and wobbling with cum.`);
					}
				} else {
					r.push(`seed fill ${his} cramped womb and start to backflow.`);
				}
			} else if (V.PC.balls >= 14) {
				r.push(`seed pumping into ${him} until ${his} womb is stuffed with cum.`);
			} else if (V.PC.balls >= 9) {
				r.push(`seed pouring into ${him}.`);
			} else {
				r.push(`seed.`);
			}
			r.push(`${He} starts blubbering inelegantly and`);
			if (!canTalk(eventSlave)) {
				r.push(`gesturing`);
			} else if ((eventSlave.lips > 70) || (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2)) {
				r.push(`lisping`);
			} else {
				r.push(`whimpering`);
			}
			r.push(`<span class="devotion inc">${his} thanks.</span>`);
			eventSlave.devotion += 4;
			if (eventSlave.mpreg === 1) {
				seX(eventSlave, "anal", V.PC, "penetrative");
			} else {
				seX(eventSlave, "vaginal", V.PC, "penetrative");
			}
			knockMeUp(eventSlave, 50, 2, -1);
			return r;
		}

		function impregnateAss() {
			r = [];
			r.push(`You tell ${him} that impregnation will be ${his} reward if ${he}'s a good little`);
			if (eventSlave.chastityVagina || eventSlave.chastityAnus) {
				r.push(`buttslut as you undo ${his} chastity.`);
			} else {
				r.push(`buttslut.`);
			}
			r.push(`${He} visibly resolves to do ${his} anal best. You recline on the couch and ${he} squats over you, one leg on the floor and the other bent up on the cushion, with`);
			if (isPregnantAndSuperfetation && isFaceUp && eventSlave.belly >= 5000) {
				r.push(`${his} ${belly} belly pressing against you.`);
			} else if (hasBothArms(eventSlave)) {
				r.push(`one hand on the back of the couch and the other rubbing ${his} pussy.`);
			} else {
				r.push(`${his} hand on the back of the couch.`);
			}
			r.push(`${He}`);
			if (eventSlave.anus === 1) {
				r.push(`winces in pain as ${he} lowers ${his} tight`);
			} else if (eventSlave.anus === 2) {
				r.push(`moans with discomfort as ${he} lowers ${his} tight`);
			} else {
				r.push(`barely reacts as ${he} lowers ${his} huge`);
			}
			r.push(`butthole down onto your cock. ${He} gets quite a workout, raising and lowering ${his} body to fuck ${his} own ass on your stationary dick.`);
			if (isFaceUp) {
				r.push(`Since ${he}'s facing you, you get a great view of ${his} body in motion.`);
			} else {
				r.push(`${He}'s so heavy with child, you eventually have to give ${him} a hand as ${he} steadily tires.`);
			}
			r.push(`${His}`);
			if (eventSlave.clit) {
				r.push(`clitoral`);
			}
			r.push(`stimulation is having an effect, and after a while ${he}`);
			if (!canTalk(eventSlave)) {
				r.push(`takes ${his} hand away to make an unintelligible gesture. After ${he} repeats it, you figure out that ${he} means ${he} wishes ${he} could get pregnant anally.`);
			} else {
				r.push(`pants,`, Spoken(eventSlave, `"That's so good, ${Master}. I wish you could get my ass pregnant."`));
			}
			r.push(`When you're close, you scoot back to pull yourself out and ${he} spears ${his} cunt down onto your cock. The sudden difference of sensation brings you to violent climax, and ${he} <span class="devotion inc">cries with joy</span> at feeling your hot`);
			if (V.PC.balls >= 30) {
				if (isPregnantAndSuperfetation) {
					r.push(`seed inflating ${his} womb until ${his} stomach is`);
					if (eventSlave.belly >= 2000) {
						r.push(`noticeably larger than when ${he} started.`);
					} else {
						r.push(`distended and wobbling with cum.`);
					}
				} else {
					r.push(`seed fill ${his} cramped womb and start to backflow.`);
				}
				if (eventSlave.belly >= 30000) {
					r.push(`You barely managed to keep your grip on ${him} as ${his} middle ballooned between you.`);
				}
			} else if (V.PC.balls >= 14) {
				r.push(`seed pumping into ${him} until ${his} womb is stuffed with cum.`);
			} else if (V.PC.balls >= 9) {
				r.push(`seed pouring into ${him}.`);
			} else {
				r.push(`seed.`);
			}
			eventSlave.devotion += 4;
			seX(eventSlave, "vaginal", V.PC, "penetrative");
			seX(eventSlave, "anal", V.PC, "penetrative");
			knockMeUp(eventSlave, 50, 0, -1);
			return r;
		}

		function sneak() {
			r = [];
			r.push(`Despite ${himself}, ${he} breaks down when ${he}`);
			if (canSee(eventSlave)) {
				r.push(`sees`);
			} else if (canHear(eventSlave)) {
				r.push(`hears`);
			} else {
				r.push(`notices`);
			}
			r.push(`you coming over and kneeling down to line your cock up with the entrance to ${his}`);
			if (eventSlave.vagina === 1) {
				r.push(`deliciously tight`);
			} else if (eventSlave.vagina === 2) {
				r.push(`well experienced`);
			} else {
				r.push(`fucked-out`);
			}
			r.push(`cunt. ${His} happy tears turn to a ragged gasp of surprise and pain when you`);
			if (eventSlave.chastityAnus) {
				r.push(`undo ${his} anal chastity,`);
			}
			r.push(`slide your dickhead down to ${his}`);
			if (eventSlave.anus === 1) {
				r.push(`painfully inexperienced`);
			} else if (eventSlave.anus === 2) {
				r.push(`tight`);
			} else {
				r.push(`loose`);
			}
			r.push(`ass and shove it up there instead. ${He} knows better than to protest, but the expression on ${his} face is a wonderful mix of submission, anguish and disappointment as ${he} takes the anal fuck. To stop ${his} fugue of disappointment you give ${him} a light slap on the cheek to get ${his} attention, and then instruct ${him} that it's not ${his} place`);
			if (isPregnantAndSuperfetation) {
				r.push(`to decide how pregnant ${he} gets to be.`);
			} else {
				r.push(`to plan ${his} pregnancies.`);
			}
			r.push(`They'll happen when they happen, and until then ${he}'ll take it up the butt like a good slut. ${He} <span class="trust dec">nods and wipes ${his} eyes</span> even as`);
			if (eventSlave.anus === 1) {
				r.push(`${he} grimaces involuntarily at your painful use of ${his} tight butthole.`);
			} else if (eventSlave.anus === 2) {
				r.push(`${he} takes your cock up ${his} tight ass.`);
			} else {
				r.push(`${his} gaping anus makes occasional lewd noises as you pound it.`);
			}
			eventSlave.trust -= 5;
			seX(eventSlave, "anal", V.PC, "penetrative");
			return r;
		}


		function back() {
			r = [];
			r.push(`You tell ${him} that impregnation will be ${his} reward if ${he}'s a good little`);
			if (eventSlave.chastityVagina || eventSlave.chastityAnus) {
				r.push(`buttslut as you undo ${his} chastity.`);
			} else {
				r.push(`buttslut.`);
			}
			r.push(`${He} visibly resolves to do ${his} anal best. You recline on the couch and ${he} squats over you, one leg on the floor and the other bent up on the cushion, with`);
			if (isPregnantAndSuperfetation && isFaceUp && eventSlave.belly >= 5000) {
				r.push(`${his} ${belly} belly pressing against you.`);
			} else if (hasBothArms(eventSlave)) {
				r.push(`one hand on the back of the couch and the other`);
				if (eventSlave.nipples !== "fuckable") {
					r.push(`pinching`);
				} else {
					r.push(`fingering`);
				}
				r.push(`a nipple.`);
			} else {
				r.push(`${his} hand on the back of the couch.`);
			}

			r.push(`${He}`);
			if (eventSlave.anus === 1) {
				r.push(`winces in pain as ${he} lowers ${his} tight`);
			} else if (eventSlave.anus === 2) {
				r.push(`moans with discomfort as ${he} lowers ${his} tight`);
			} else {
				r.push(`barely reacts as ${he} lowers ${his} huge`);
			}
			r.push(`butthole down onto your cock. ${He} gets quite a workout, raising and lowering ${his} body to fuck ${his} own ass on your stationary dick.`);
			if (isFaceUp) {
				r.push(`Since ${he}'s facing you, you get a great view of ${his} body in motion.`);
			} else {
				r.push(`${He}'s so heavy with child, you eventually have to give ${him} a hand as ${he} steadily tires.`);
			}
			r.push(`${His} stimulation is having an effect, and after a while ${he}`);
			if (!canTalk(eventSlave)) {
				r.push(`takes ${his} hand away to make an unintelligible gesture. After ${he} repeats it, you figure out that ${he} means ${he} is thrilled to be able to get anally pregnant`);
				if (isPregnantAndSuperfetation) {
					r.push(`pregnant and is about to conceive again`);
				} else {
					r.push(`pregnant.`);
				}
			} else {
				r.push(`pants,`, Spoken(eventSlave, `"That's so good, ${Master}. I'm so glad my ass is fertile."`));
			}
			r.push(`When you're at your limit, you quickly pull`);
			if (isFaceUp) {
				r.push(`out, slide slightly further under ${him}`);
			} else {
				r.push(`out`);
			}
			r.push(`and thrust up between ${his} asscheeks, blowing your hot seed`);
			if (V.PC.balls >= 30) {
				r.push(`across ${his} entire back.`);
			} else if (V.PC.balls >= 9) {
				r.push(`across ${his} back.`);
			} else {
				r.push(`across ${his} lower back.`);
			}
			r.push(`${He} stops riding you and`);
			if (canSee(eventSlave)) {
				r.push(`stares at`);
			} else {
				r.push(`faces`);
			}
			r.push(`you with a look of <span class="devotion dec">disbelief.</span> You shrug; it must have slipped out under all ${his} enthusiasm.`);
			eventSlave.devotion -= 5;
			seX(eventSlave, "anal", V.PC, "penetrative");
			return r;
		}

		function dairy() {
			r = [];
			r.push(`You tell ${him} ${he}'ll be having everyone's children. ${He} looks puzzled until you put ${him} on the couch, legs spread`);
			if ((eventSlave.mpreg === 1 && eventSlave.chastityAnus) || eventSlave.chastityVagina) {
				r.push(`and chastity removed`);
			}
			r.push(r.pop() + `,`);
			r.push(`and produce a large, soft injector full of fresh cum. At this ${he} giggles and thanks you; ${he} rapturously rubs ${his} ${belly} belly as you gently push the injector home. For the rest of the week, ${he} appears in your office morning and night, receiving the seed of every slave you're currently having cockmilked. ${He} goes about ${his} other business with a <span class="devotion inc">deeply pleased</span> expression on ${his} face. Whenever ${he} has a spare moment ${he} steals down to the Dairy to hug the slaves there or otherwise show them a little affection.`);
			eventSlave.devotion += 10;
			if (cumSlaves().length > 0) {
				knockMeUp(eventSlave, 90, 2, cumSlaves().random().ID);
			}
			return r;
		}
	}
};
