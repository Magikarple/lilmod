App.Events.RESSTittymonsterInspection = class RESSTittymonsterInspection extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.assignment !== Job.QUARTER,
				s => s.boobs > 25000,
				s => s.belly < 100000,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, hers
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;
		const arms = hasBothArms(eventSlave) ? "arms" : "arm";

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(
			`You enter your office from other business a few minutes after the scheduled start of`,
			contextualIntro(PC, eventSlave, true)
		);
		r.addToLast(`'s inspection. The`);
		if (V.boobAccessibility === 1) {
			r.push(`accessibility aids for slaves with immobilizing breasts`);
		} else {
			r.push(`slaves who helped ${him} in`);
		}
		r.push(`have gone, leaving ${him} waiting for you in front of your desk. The sight is an arresting one. ${He}'s kneeling, but ${his} boobs are so enormous that they're resting on the ground in front of ${him}, completely concealing ${his} body below the chest`);
		if (eventSlave.belly >= 120000) {
			r.addToLast(`, save for the protruding mass of ${his}`);
			if (eventSlave.pregType > 8) {
				r.push(`hyper pregnant`);
			} else if (eventSlave.pregType > 4) {
				r.push(`${pregNumberName(eventSlave.pregType, 1)}-filled`);
			} else {
				r.push(`overly distended`);
			}
			r.push(`belly`);
		}
		r.addToLast(`. With ${his} ${arms} tucked back, and ${his} torso,`);
		if (eventSlave.belly < 120000) {
			if (eventSlave.bellyPreg > 100) {
				r.push(`pregnancy,`);
			} else if (eventSlave.belly > 100) {
				r.push(`swollen stomach,`);
			} else {
				r.push(`abdomen,`);
			}
		}
		r.push(`and legs hidden, ${he} appears to consist of a`);
		if (eventSlave.face > 95) {
			r.push(`gorgeous`);
		} else if (eventSlave.face > 50) {
			r.push(`beautiful`);
		} else if (eventSlave.face >= 10) {
			r.push(`pretty`);
		} else if (eventSlave.face >= 0) {
			r.push(`nice`);
		} else {
			r.push(`homely`);
		}
		r.addToLast(`${eventSlave.faceShape !== "normal" ? `, ${eventSlave.faceShape}` : ``} face, a`);
		if (eventSlave.collar === "none") {
			r.push(`bare`);
		} else {
			r.push(`collared`);
		}
		r.push(`neck, ${eventSlave.skin},`);
		if (eventSlave.muscles > 95) {
			r.push(`hugely muscled`);
		} else if (eventSlave.muscles > 30) {
			r.push(`strong`);
		} else if (eventSlave.shoulders > 0) {
			r.push(`broad`);
		} else if (eventSlave.shoulders < 0) {
			r.push(`feminine`);
		} else if (eventSlave.muscles > 5) {
			r.push(`toned`);
		} else {
			r.push(`soft`);
		}
		r.push(`shoulders, and below that, breasts`);
		if (eventSlave.belly >= 120000) {
			r.push(`parted by ${his} ${belly} dome of a stomach`);
		}
		r.addToLast(`. ${He} greets you`);
		if (eventSlave.devotion > 50) {
			r.push(`devotedly, behaving for all the world like ${he}'s pleased to be`);
		} else if (eventSlave.devotion >= -20) {
			r.push(`properly, with just a hint of unhappiness about being`);
		} else {
			r.push(`with more than a hint of resentment over being`);
		}
		r.push(`pinned to the floor by ${his} own tits.`);

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Continue ${his} inspection as scheduled`, scheduled),
			new App.Events.Result(`Use ${him} as a cushion`, cushion),
			(canDoAnal(eventSlave) || canDoVaginal(eventSlave))
				? new App.Events.Result(`Enjoy ${his} helplessness`, helplessness, virginityWarning())
				: new App.Events.Result()
		]);

		function virginityWarning(){
			if (canDoVaginal(eventSlave) && eventSlave.vagina === 0) {
				return `This option will take ${his} virginity`;
			} else if (!canDoVaginal(eventSlave) && (eventSlave.anus === 0)) {
				return `This option will take ${his} anal virginity`;
			}
		}

		function scheduled() {
			const r = new SpacedTextAccumulator();
			r.push(`You're already late for this little meeting; you wouldn't want to keep ${him} here when you both have more productive things to do. ${His} inspection is exemplarily routine; ${he} has nothing significant to report. When all is said and done, you dismiss ${him}, and ${he} stands up,`);
			if (eventSlave.devotion > 20) {
				r.push(`genuinely`);
			} else {
				r.push(`quickly`);
			}
			r.push(`thanks you for your time, and leaves.`);
			r.toParagraph();
			return r.container();
		}

		function cushion() {
			const r = new SpacedTextAccumulator();
			r.push(`You tell ${him} ${he}'s looking very nice today. Surprised, ${he} manages`);
			if (eventSlave.devotion > 20) {
				r.push(`to thank you prettily, wondering`);
			} else {
				r.push(`to thank you hesitantly, worrying about`);
			}
			r.push(`what comes next. You pick up a tablet, come around your desk, and fold yourself into a lotus position, just in front of ${him} and with your back to ${him}. Struck by this strange and trusting maneuver, ${he} keeps still, letting you get yourself situated. You slide backward until you are pressed against the mound of breasts behind you, and then relax into their soft, fleshy mass. Your back nestles naturally into ${his} cleavage, and the give of ${his} huge mammaries conforms to you, allowing you to rest your elbows comfortably on each breast as though they were armrests. Feeling the weight of you against ${his} chest, ${eventSlave.slaveName} throws ${his} arms back, bracing ${himself} against the floor.`);
			if (eventSlave.belly >= 15000) {
				r.push(`You can feel ${his} full, taut,`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnancy`);
				} else {
					r.push(`belly`);
				}
				r.push(`just barely once you have sunk deep into ${his} cleavage.`);
			}
			r.push(`You begin to tap away at the tablet, and ${he} realizes`);
			if (eventSlave.devotion > 20) {
				r.push(`with pleased surprise`);
			} else {
				r.push(`with mixed resentment and relief`);
			}
			r.push(`that you intend to use ${him} as a sort of human cushion for a while. From where ${he}'s sitting, ${he}`);
			if (canSee(eventSlave)) {
				r.push(`can easily read over your shoulder, and you make no attempt to stop ${him};`);
			} else {
				r.push(`could read over your shoulder, if ${he} could see;`);
			}
			r.push(`keeping secrets from your slaves is generally impractical, and`);
			if (eventSlave.devotion > 20) {
				r.push(`this ${SlaveTitle(eventSlave)} is trustworthy.`);
			} else {
				r.push(`there's nothing ${he} could do with your secrets, even if ${he} were to try.`);
			}
			r.push(`After an hour or so, you inspect ${him} and dismiss ${him}, and ${he} leaves <span class="trust inc">trusting ${his} bizarre place</span> in your world.`);
			eventSlave.trust += 4;
			r.toParagraph();
			return r.container();
		}

		function helplessness() {
			const r = new SpacedTextAccumulator();
			r.push(`You give ${him} no orders at all, since ${his} helplessness makes ${him}`);
			if (eventSlave.devotion > 20) {
				r.push(`cooperation`);
			} else {
				r.push(`consent`);
			}
			r.push(`completely unnecessary for what you're planning. ${He} makes to turn as you come around behind ${him}, but ${he} can manage only a partial crane of ${his} shoulders and neck to`);
			if (canSee(eventSlave)) {
				r.push(`see`);
			} else {
				r.push(`figure out`);
			}
			r.push(`what you're doing. Seizing ${his} ankles, you haul ${his} legs out from under ${his} boobs and body, and then push ${him} forward, balancing ${his} body atop ${his} tits as though they were an exercise ball.`);
			if (eventSlave.devotion > 20) {
				r.push(`${He} giggles at this,`);
			} else {
				r.push(`${He} struggles a little at the sudden discomfort,`);
			}
			r.push(`and tries to steady ${himself} with ${his} hands, so you pull them around behind ${him} and pin ${his} arms to ${his} ${eventSlave.skin} back with one of your hands. You`);
			if (V.PC.dick !== 0) {
				r.push(`shove your dick up`);
			} else {
				r.push(`pull on a strap-on with your other hand and insert it into`);
			}
			r.push(`${his} defenseless`);
			if (canDoVaginal(eventSlave)) {
				r.push(`pussy.`);
			} else {
				r.push(`asshole.`);
			}
			r.push(`Then you fuck ${him}.`);
			r.push(VCheck.Simple(eventSlave, 1));
			r.toParagraph();

			r.push(`You're physically fit to begin with, and between that and all the practice you get, you pride yourself on your`);
			if (V.PC.dick !== 0) {
				if (V.PC.vagina !== -1) {
					r.push(`master level futa skills.`);
				} else {
					r.push(`cocksmanship.`);
				}
			} else {
				r.push(`power with a strap-on.`);
			}
			r.push(`You can fuck hard, and ${eventSlave.slaveName} gets fucked hard. Having all of ${his} weight on ${his} tits, and being sawed back and forth on top of those tits, is not comfortable.`);
			if (canDoVaginal(eventSlave)) {
				if (eventSlave.vagina < 3) {
					r.push(`Worse, only the most veteran cunt could accept this kind of treatment without some pain, and ${hers} is far tighter than you're treating it.`);
				}
			} else {
				if (eventSlave.anus < 3) {
					r.push(`Worse, only the most veteran asspussy could accept this kind of treatment without some pain, and ${hers} is far tighter than you're treating it.`);
				}
			}
			if (eventSlave.voice === 0) {
				r.push(`Since ${he} cannot groan, ${he} begins to gasp raggedly`);
			} else {
				r.push(`${He} begins to grunt and groan`);
			}
			r.push(`with each forward thrust as you penetrate ${him}, pressing ${him} forward across ${his} cushion of boobs. ${He} tries to take some of the weight off with ${his} feet, but after some vain scrabbling ${he}'s obliged to <span class="devotion inc">give up and take it.</span>`);
			r.toParagraph();

			r.push(`When you're finished, you withdraw and drop ${him}, letting ${him} slump against ${his} sore breasts. ${He}'s too tired and overstimulated to do anything but stay limp, and ${his} relaxed`);
			if (canDoVaginal(eventSlave)) {
				r.push(`pussy`);
			} else {
				r.push(`butthole`);
			}
			if (V.PC.dick !== 0) {
				r.push(`releases drips of your cum to go sliding down ${his} thighs.`);
			} else {
				r.push(`glistens attractively with lube.`);
			}
			r.push(`You direct`);
			if (V.boobAccessibility === 1 || V.pregAccessibility === 1) {
				r.push(`the accessibility assistance functions of your office to`);
			} else {
				r.push(`the slaves who helped ${him} in to return and`);
			}
			r.push(`help ${him} get cleaned up, and turn to your desk to get some work done as they struggle with the mountain of exhausted, fucked-out tits discarded in the middle of your office.`);
			eventSlave.devotion += 4;
			r.toParagraph();
			return r.container();
		}
	}
};
