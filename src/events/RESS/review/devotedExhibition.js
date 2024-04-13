App.Events.RESSDevotedExhibition = class RESSDevotedExhibition extends App.Events.BaseEvent {
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
				s => s.devotion > 50,
				s => s.anus > 0,
				s => s.vagina !== 0,
				s => s.trust > 20,
				s => s.assignment !== Job.QUARTER,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(
			`You make a habit of circulating through the arcology's public spaces when you can, to maintain your reputation for hands-on control and to keep a personal eye on the atmosphere. Citizens high and low avail themselves of the opportunity to greet you, introduce themselves, or bring small matters to your attention. Today, one of your prominent citizens brought up an unusually important subject, so you performed a walk and talk with him, ending out on a balcony. He goes away satisfied, but you spent longer than you intended away from the penthouse. As such, you missed the start of`,
			contextualIntro(PC, eventSlave, true)
		);
		r.addToLast(`'s weekly inspection. ${He} finds you out on the balcony, directed to you by ${V.assistant.name},`);
		if (eventSlave.weight > 160) {
			r.push(`breathing hard from the effort of hauling ${his} fat ass`);
		} else if (eventSlave.belly >= 100000) {
			r.push(`utterly exhausted from waddling with ${his} very heavy ${belly} belly`);
		} else if (eventSlave.boobs >= 10000) {
			r.push(`breathing hard from the effort of hauling ${his} gigantic tits in ${his} rush`);
		} else if (eventSlave.belly >= 10000) {
			r.push(`breathing hard from the effort of hauling ${his} heavy belly in ${his} rush`);
		} else if (eventSlave.muscles > 5) {
			r.push(`breathing easily despite ${his} rush`);
		} else if (eventSlave.muscles < -95) {
			r.push(`barely conscious from the effort of coming`);
		} else if (eventSlave.muscles < -30) {
			r.push(`utterly exhausted from ${his} rush`);
		} else {
			r.push(`panting a little from ${his} rush`);
		}
		r.push(`down to meet you. ${He}'s nude, having stripped in your office, and meets your gaze`);
		if (eventSlave.trust > 60) {
			r.push(`confidently, trusting`);
		} else {
			r.push(`somewhat hesitantly, not sure`);
		}
		r.push(`that ${he} did the right thing by coming to you rather than waiting.`);

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Inspect ${him} normally`, normally),
			new App.Events.Result(`Inspect ${him} and then leave ${him} out for the public to use`, leave),
			(eventSlave.fetishKnown === 1 && eventSlave.fetish !== Fetish.NONE)
				? new App.Events.Result(`Fuck ${him} like ${he} likes it`, like)
				: new App.Events.Result()
		]);

		function normally() {
			const r = new SpacedTextAccumulator();
			r.push(`You pay no attention to the unusual circumstances, and conduct a normal inspection of ${his} naked body. ${He} understands that ${he} did the right thing, and <span class="trust inc">trusts</span> you a bit more. Since you're paying no attention to the unusual location for the inspection, ${he} does ${his} very best to perform ${his} role normally, too. ${He}`);
			if (eventSlave.boobs > 2000) {
				r.push(`lifts ${his} enormous boobs one by one,`);
			} else if (eventSlave.boobs > 1000) {
				r.push(`hefts ${his} heavy breasts one by one,`);
			} else if (eventSlave.boobs > 300) {
				r.push(`squeezes ${his} boobs one by one,`);
			} else {
				if (eventSlave.nipples !== "fuckable") {
					r.push(`pinches`);
				} else {
					r.push(`fingers`);
				}
				r.push(`the nipples capping ${his} flat tits,`);
			}
			if (eventSlave.skill.oral > 60) {
				r.push(`opens ${his} mouth and wiggles ${his} expert tongue,`);
			} else if (eventSlave.lips > 40) {
				r.push(`opens ${his} mouth and licks ${his} puffy lips,`);
			} else {
				r.push(`opens ${his} mouth and sticks out ${his} tongue,`);
			}
			if (eventSlave.balls > 1) {
				r.push(`pulls ${his} ballsack gently downward to display the outline of ${his} testes,`);
			} else if (eventSlave.dick > 0) {
				r.push(`lifts ${his} dick by its tip and turns sideways to display it,`);
			} else if (eventSlave.labia > 0) {
				r.push(`carefully spreads ${his} generous petals to show off ${his} pussy,`);
			} else if (eventSlave.clit > 0) {
				r.push(`eases ${his} clitoral hood back to completely reveal ${his} massive clitoris,`);
			} else if (eventSlave.vagina === -1) {
				r.push(`lets you see the featureless, mannequin place between ${his} legs,`);
			} else {
				r.push(`spreads ${his} pussy,`);
			}
			r.push(`turns around and`);
			if (eventSlave.butt > 5) {
				r.push(`pulls ${his} massive buttocks apart to reveal`);
			} else if (eventSlave.butt > 2) {
				r.push(`spreads ${his} healthy buttocks to reveal`);
			} else {
				r.push(`bends over to display`);
			}
			r.push(`${his}`);
			if (eventSlave.anus > 2) {
				r.push(`whorish rear pussy,`);
			} else if (eventSlave.anus > 1) {
				r.push(`inviting backdoor,`);
			} else {
				r.push(`tight anus,`);
			}
			r.push(`winks it once, and then straightens, done.`);
			eventSlave.trust += 5;
			r.toParagraph();
			return r.container();
		}

		function leave() {
			const r = new SpacedTextAccumulator();
			r.push(`You pay no attention to the unusual circumstances, and conduct a normal inspection of ${his} naked body. When done, you rise from your seat and produce a short strap. ${His} breath quickens as you bind ${his}`);
			if (hasBothArms(eventSlave)) {
				r.push(`hands and pull them`);
			} else if (hasAnyArms(eventSlave)) {
				r.push(`hand and pulls it`);
			} else {
				r.push(`body and pulls ${him}`);
			}
			r.push(`down towards a bench; you secure ${him} so ${he} can crouch or kneel, naked and vulnerable. As you leave, ${he} understands, and glances around the balcony. Fixing on the nearest citizen paying attention to ${him}, ${he} looks him straight in the eye`);
			switch (eventSlave.fetish) {
				case "submissive":
					r.push(`and begs him submissively to do whatever he wants to ${him}.`);
					break;
				case "cumslut":
					r.push(`and begs him to come over and feed ${him} his`);
					if (canTaste(eventSlave)) {
						r.push(`delicious`);
					} else {
						r.push(`warm`);
					}
					r.push(`cum.`);
					break;
				case "humiliation":
					r.push(`as ${he} begins to wordlessly writhe and blush with the <span class="devotion inc">excitement</span> of this humiliating situation.`);
					eventSlave.devotion += 2;
					break;
				case "buttslut":
					r.push(`and then turns as best ${he} can to offer him ${his} backdoor, begging him to stuff his cock up ${his} ass.`);
					break;
				case "boobs":
					r.push(`and swings ${his} torso from side to side, bouncing ${his} breasts around lewdly.`);
					break;
				case "pregnancy":
					r.push(`and begs him to come over and shoot his seed into ${him}.`);
					break;
				case "dom":
				case "sadist":
					r.push(`and challenges him to come over and fuck ${him}.`);
					break;
				case "masochist":
					r.push(`and, applying a bit of reverse psychology, begins to beg him not to spank ${his} helpless behind.`);
					break;
				default:
					r.push(`and implores him to fuck ${him}.`);
			}
			r.push(`You detail another slave to fetch ${him} after the public loses interest. A couple of hours later, you catch sight of ${him} limping towards the showers, thoroughly disheveled. ${His} ${eventSlave.skin} face and chest are spattered with cum, ${he}'s got`);
			if (eventSlave.dick > 0) {
				r.push(`${his} own ejaculate`);
			} else {
				r.push(`pussyjuice`);
			}
			r.push(`all over ${his} thighs, and ${his} well-fucked butthole is dripping semen. ${He}'s certainly worked hard <span class="reputation inc">improving your reputation.</span>`);
			repX(1250, "event", eventSlave);
			seX(eventSlave, "mammary", "public", "penetrative", 10);
			seX(eventSlave, "oral", "public", "penetrative", 10);
			r.push(VCheck.Anal(eventSlave, 10));
			if (canDoVaginal(eventSlave)) {
				r.push(VCheck.Vaginal(eventSlave, 10));
				seX(eventSlave, "vaginal", "public", "penetrative", 10);
			}
			r.toParagraph();
			return r.container();
		}

		function like() {
			let didVaginal = false;
			let didAnal = false;
			const r = new SpacedTextAccumulator();
			r.push(`${He}'s completely unsurprised when you crook a finger at ${him} after a brief inspection, and skips over, looking excited. It's not in vain.`);
			if (eventSlave.fetish === Fetish.SUBMISSIVE) {
				r.push(`You shove ${him} across the back of a balcony bench and take ${him} as ${he} moans with pleasure, happy you're using ${his} body. ${He} pays no attention to the <span class="reputation inc">mildly appreciative</span> stares from passersby.`);
				repX(250, "event", eventSlave);
				if (canDoVaginal(eventSlave)) {
					didVaginal = true;
				} else {
					didAnal = true;
				}
			} else if (eventSlave.fetish === "cumslut") {
				r.push(`You push ${him} down to ${his} knees and`);
				if (V.PC.dick !== 0) {
					r.push(`shove your cock down ${his} throat`);
					if (V.PC.vagina !== -1) {
						r.push(`so far ${he} can almost reach your pussy with the tip of ${his} tongue`);
					}
				} else {
					r.push(`ride ${his} face`);
				}
				r.addToLast(`. ${He} pays no attention to the <span class="reputation inc">mildly appreciative</span> stares from passersby, moaning into you as ${he} pleasures your`);
				if (V.PC.dick !== 0) {
					r.push(`dick.`);
				} else {
					r.push(`cunt.`);
				}
				repX(250, "event", eventSlave);
				seX(eventSlave, "oral", V.PC, "penetrative");
			} else if (eventSlave.fetish === "humiliation") {
				r.push(`You sit down on a balcony bench and pull ${him} down to sit on your`);
				if (V.PC.dick === 0) {
					r.push(`strap-on,`);
				} else {
					r.push(`cock,`);
				}
				r.push(`and then pull ${his} legs as wide as they'll go as you fuck ${him}, displaying everything to the whole balcony`);
				if (eventSlave.belly >= 120000) {
					r.addToLast(`; ${his} ${belly} stomach hangs so low that it blocks the view, however`);
				} else {
					if (V.PC.vagina !== -1) {
						if (V.PC.dick !== 0) {
							r.addToLast(`: incidentally including your own pussy, which slides up and down as you piston the cock above it in and out of ${him}`);
						}
					}
				}
				r.addToLast(`. ${He} <span class="devotion inc">laps up</span> the <span class="reputation inc">openly aroused</span> stares from ${his} growing audience.`);
				repX(500, "event", eventSlave);
				eventSlave.devotion += 3;
				if (canDoVaginal(eventSlave)) {
					didVaginal = true;
				} else {
					didAnal = true;
				}
			} else if (eventSlave.fetish === "buttslut") {
				r.push(`You shove ${him} across the back of a balcony bench and fuck ${his} ass as ${he} moans with pleasure, happy you're using ${his} favorite hole. ${He} pays no attention to the <span class="reputation inc">mildly appreciative</span> stares from passersby, too focused on ${his} well-filled rectum to care.`);
				repX(250, "event", eventSlave);
				didAnal = true;
			} else if (eventSlave.fetish === "boobs") {
				r.push(`You push ${him} down to ${his} knees and`);
				if (V.PC.dick !== 0) {
					r.push(`press your cock between ${his} tits.`);
				} else {
					r.push(`ride ${his} breasts.`);
				}
				r.push(`${He} pays no attention to the <span class="reputation inc">mildly appreciative</span> stares from passersby, enjoying the feeling of your`);
				if (V.PC.dick !== 0) {
					r.push(`dick pounding ${his}`);
					if (eventSlave.nipples !== "fuckable") {
						r.push(`cleavage.`);
					} else {
						r.push(`breast.`);
					}
				} else {
					r.push(`cunt rubbing against one of ${his}`);
					if (eventSlave.nipples !== "fuckable") {
						r.push(`hard`);
					} else {
						r.push(`engorged`);
					}
					r.push(`nipples.`);
				}
				repX(250, "event", eventSlave);
				seX(eventSlave, "mammary", V.PC, "penetrative");
			} else if (eventSlave.fetish === "pregnancy") {
				r.push(`You shove ${him} across the back of a balcony bench and whisper in ${his} ear that you're going to breed ${him} in public. ${He} pays no attention to the <span class="reputation inc">mildly appreciative</span> stares from passersby, too aroused by the idea to care.`);
				if (!canDoVaginal(eventSlave)) {
					r.push(`It's ${his} butt you're fucking, but ${he} doesn't let that disrupt ${his} fantasy.`);
				} else if (V.PC.dick === 0) {
					r.push(`The phallus in ${him} is a strap-on, but ${he} doesn't let that disrupt ${his} fantasy.`);
				} else if (eventSlave.pregKnown === 1) {
					r.push(`${He}'s already knocked up, but ${he} doesn't let that disrupt ${his} fantasy of getting even more pregnant.`);
				} else if (!isFertile(eventSlave)) {
					r.push(`${He}'s not fertile, but ${he} doesn't let that disrupt ${his} fantasy.`);
				}
				repX(250, "event", eventSlave);
				if (canDoVaginal(eventSlave)) {
					didVaginal = true;
				} else {
					didAnal = true;
				}
			} else if (eventSlave.fetish === "dom") {
				r.push(`You shove ${him} back against a wall and seat your`);
				if (V.PC.dick !== 0) {
					r.push(`cock`);
				} else {
					r.push(`strap-on`);
				}
				r.push(`inside ${him} while ${he} wraps ${his} legs around you, taking a good grip on ${his} butt, and hauling ${him} off the wall again, holding ${him} in midair`);
				if (eventSlave.belly >= 600000) {
					r.push(`(though ${his} ${belly} belly is resting on the ground)`);
				}
				r.addToLast(`. ${He} pays no attention to the <span class="reputation inc">mildly appreciative</span> stares from passersby, concentrating on fucking as hard as ${he} possibly can.`);
				repX(250, "event", eventSlave);
				if (canDoVaginal(eventSlave)) {
					didVaginal = true;
				} else {
					didAnal = true;
				}
			} else if (eventSlave.fetish === "sadist") {
				r.push(`You sit down on a balcony bench and pull ${him} down to sit on your`);
				if (V.PC.dick === 0) {
					r.push(`strap-on,`);
				} else {
					r.push(`cock,`);
				}
				r.push(`and then hand ${him} a tablet after pulling up a feed from a nearby cellblock. ${He} ignores the <span class="reputation inc">mildly appreciative</span> stares from passersby as you fuck ${him}, enthralled by the scenes of abuse and rape on the tablet in ${his} trembling hands.`);
				repX(250, "event", eventSlave);
				if (canDoVaginal(eventSlave)) {
					didVaginal = true;
				} else {
					didAnal = true;
				}
			} else if (eventSlave.fetish === "masochist") {
				r.push(`You spin ${him} around cruelly, jerking ${him} back against your torso and shoving your`);
				if (V.PC.dick === 0) {
					r.push(`strap-on`);
				} else {
					r.push(`cock`);
				}
				r.push(`up ${his} butthole without bending ${him} over first. ${He} ignores the <span class="reputation inc">mildly appreciative</span> stares from passersby as you fuck ${him}, too lost in the delicious agony of a harsh standing anal fuck to care.`);
				repX(250, "event", eventSlave);
				didAnal = true;
			} else {
				r.push(`You appeal to ${his} uncomplicated tastes by letting ${him} ride you as you sit on a balcony bench, your hands idly`);
				if (eventSlave.nipples !== "fuckable") {
					r.push(`playing with`);
				} else {
					r.push(`fingering`);
				}
				r.push(`${his} nipples as ${he} rocks ${his} hips against you. ${He} pays no attention to the <span class="reputation inc">mildly appreciative</span> stares from passersby, concentrating on your face, smiling as you react to ${his} efforts.`);
				repX(250, "event", eventSlave);
				if (canDoVaginal(eventSlave)) {
					didVaginal = true;
				} else {
					didAnal = true;
				}
			}
			if (didAnal) {
				r.push(VCheck.Anal(eventSlave, 1));
			} else if (didVaginal) {
				r.push(VCheck.Vaginal(eventSlave, 1));
			}
			if (eventSlave.fetishStrength === 100 || eventSlave.fetish === Fetish.NONE) {
				r.push(`Since ${he}'s totally sure of what gets ${him} off, this public display that you know it too makes ${him} <span class="trust inc">trust you.</span>`);
				eventSlave.trust += 5;
			} else {
				r.push(`Since ${he}'s developing ${his} kinks, this public display of ${his} sexual identity <span class="lightcoral">advances ${his} fetish.</span>`);
				eventSlave.fetishStrength += 4;
			}
			r.toParagraph();
			return r.container();
		}
	}
};
