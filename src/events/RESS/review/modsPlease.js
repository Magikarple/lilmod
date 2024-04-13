App.Events.RESSModsPlease = class RESSModsPlease extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.modRequestsAllowed > 0,
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				canTalk,
				s => s.assignment !== Job.QUARTER,
				s => s.trust > 50,
				s => s.devotion > 20,
				s => s.dick !== 0 || s.vagina !== -1,
				s => s.nipples !== "fuckable",
				s => s.rules.speech === "permissive",
				s => s.piercing.corset.weight === 0,
				s => s.piercing.tongue.weight === 0,
				s => s.piercing.anus.weight === 0,
				s => s.piercing.nipple.weight === 0,
				s => s.piercing.dick.weight === 0,
				s => s.piercing.vagina.weight === 0,
				s => s.lipsTat === 0 || s.lipsTat === "none",
				s => s.vaginaTat === 0 || s.vaginaTat === "none",
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let r = [];
		r.push(
			App.UI.DOM.slaveDescriptionDialog(eventSlave),
			`is such a good ${SlaveTitle(eventSlave)} that ${he} enjoys being inspected, even if the inspection doesn't immediately transition into sex. At the moment, ${he}'s luxuriating under your gaze, eagerly offering the sight of every`
		);
		if (V.showInches === 2) {
			r.push(`inch`);
		} else {
			r.push(`centimeter`);
		}
		r.push(`of ${his} nude body with you. ${He} is confident in ${his} appearance, and more than happy to share it.`);
		App.Events.addParagraph(node, r);

		r = [];
		if (canSee(eventSlave)) {
			r.push(`Seeing`);
		} else {
			r.push(`Feeling`);
		}
		r.push(`your intent gaze, ${he}`);
		if (SlaveStatsChecker.checkForLisp(eventSlave)) {
			r.push(`lisps,`);
		} else {
			r.push(`asks,`);
		}
		r.push(Spoken(eventSlave, `"${Master}, may I please ask you for something?"`));

		r.push(`At your`);
		if (canSee(eventSlave)) {
			r.push(`nod,`);
		} else {
			r.push(`acknowledgment,`);
		}
		r.push(he);
		if (eventSlave.fetishKnown === 1 && eventSlave.fetish !== Fetish.NONE) {
			if (eventSlave.fetish === Fetish.SUBMISSIVE) {
				r.push(
					`gives a submissive shudder, and turns to show you ${his} bare back.`,
					Spoken(eventSlave, `"${Master}, may I have a corset piercing? I would love to feel more, um, bound. Tied up. Please?"`)
				);
				r.push(`${He} awaits your answer coquettishly,`);
				if (canSee(eventSlave)) {
					r.push(`${his} ${App.Desc.eyesColor(eventSlave)} huge.`);
				} else {
					r.push(`a look of begging on ${his} face.`);
				}
			} else if (eventSlave.fetish === "cumslut") {
				r.push(
					`blows you a wet kiss.`,
					Spoken(eventSlave, `"${Master}, may I have a tongue piercing? It would take my dicksucking to the next level. Please?"`)
				);
				r.push(`${He} sticks out ${his} tongue helpfully, leaving ${his} favorite fuckhole wide open so you can see down ${his} hungry throat.`);
			} else if (eventSlave.fetish === "humiliation") {
				r.push(`blushes with humiliation.`,
					Spoken(eventSlave, `"${Master}, may I have a t-tattoo? L-like, on my face. A mean one. Please?"`)
				);
				r.push(`${He} hangs ${his} head.`);
			} else if (eventSlave.fetish === "buttslut") {
				r.push(`spins around to show off ${his} favorite fuckhole, bending over`);
				if (eventSlave.belly >= 5000) {
					r.push(`as far as ${he} can with ${his} ${belly}`);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnant`);
					}
					r.push(`belly in the way`);
				} else {
					r.push(`farther than usual`);
				}
				r.push(`to indicate the area between it and`);
				if (eventSlave.vagina > -1) {
					r.push(`${his} cunt.`);
				} else if (eventSlave.balls > 0 && eventSlave.scrotum > 0) {
					r.push(`${his} ballsack.`);
				} else if (eventSlave.dick === 0) {
					r.push(`${his} featurelessly smooth groin and its little cumhole.`);
				} else {
					r.push(`the base of ${his} soft bitchclit.`);
				}
				r.push(Spoken(eventSlave, `"${Master}, may I have a piercing right here? Right below my butthole? It would keep me so ready for a buttfuck. I mean, more than I already am. Please?"`));
				r.push(`The shameless buttslut begins to wink ${his} asshole meaningfully.`);
			} else if (eventSlave.fetish === "boobs") {
				r.push(`wiggles ${his} shoulders to give ${his} boobs some motion.`,
					Spoken(eventSlave, `"${Master}, may I have some nipple piercings? It would be like having someone playing with my nipples, but, like, all the time. Please?"`)
				);
				r.push(`${He} starts to bounce flirtily.`);
			} else if (eventSlave.fetish === "pregnancy") {
				r.push(`blushes suddenly and hangs ${his} head.`);
				if (eventSlave.belly >= 10001) {
					r.push(Spoken(eventSlave, `"${Master}, may I have a piercing? Right here? A big one?" ${He} indicates ${his} popped navel. "I feel it like it would get my belly more attention, plus I'd hate to not take advantage of my new outie. Please?`));
				} else {
					r.push(Spoken(eventSlave, `"${Master}, may I have a tattoo? Right here?"`),
						`${He} indicates ${his}`);
					if (eventSlave.belly > 1500) {
						r.push(`rounded belly.`);
					} else {
						r.push(`abdomen.`);
					}
					r.push(Spoken(eventSlave, `"I would love an advertisement that I want to be, um, filled up.`));
					if (eventSlave.pregKnown === 1) {
						r.push(Spoken(eventSlave, `Well, when I'm empty again.`));
					}
					r.push(Spoken(eventSlave, `Please?"`));
				}
				r.push(`${He}`);
				if (canSee(eventSlave)) {
					r.push(`looks`);
				} else {
					r.push(`gazes`);
				}
				r.push(`at you hopefully.`);
			} else if (eventSlave.fetish === "dom") {
				r.push(`tosses ${his} head, a`);
				if (canSee(eventSlave)) {
					r.push(`gleam in ${his} eye`);
				} else {
					r.push(`devious look on ${his} face`);
				}
				r.push(
					Spoken(eventSlave, `"${Master}, may I have a tattoo? Right here?"`),
					`${He} indicates ${his} eyebrow, temple, and cheek.`,
					Spoken(eventSlave, `"It would be cool if other girls saw me and were all, 'I'm about to get fucked.' Please?"`)
				);
				r.push(`${He} smiles at you hopefully.`);
			} else if (eventSlave.fetish === "sadist") {
				r.push(`tosses ${his} head, a`);
				if (canSee(eventSlave)) {
					r.push(`gleam in ${his} eye.`);
				} else {
					r.push(`malicious look on ${his} face.`);
				}
				if (canAchieveErection(eventSlave)) {
					r.push(Spoken(eventSlave, `"${Master}, may I have a shaft piercing? If I get to stick it in another girl, I'd love to`));
					if (canSee(eventSlave)) {
						r.push(Spoken(eventSlave, `see her face`));
					} else {
						r.push(`feel her shudder`);
					}
					r.push(Spoken(eventSlave, `when that extra little bit of metal slides inside ${him}. Please?"`));
				} else if (eventSlave.dick > 0) {
					r.push(Spoken(eventSlave, `"${Master}, may I have a tongue piercing? If I get to eat another girl out, I'd love to listen to her squeal when that little bit of metal scrapes against her. Please? Please?"`));
				} else {
					r.push(Spoken(eventSlave, `"${Master}, may I have a labia piercing? If I get to trib another girl, I'd love to`));
					if (canSee(eventSlave)) {
						r.push(Spoken(eventSlave, `see her face`));
					} else {
						r.push(Spoken(eventSlave, `feel her shudder`));
					}
					r.push(Spoken(eventSlave, `when that little bit of metal grinds against her. Please?"`));
				}
				r.push(`${He} shudders at the thought,`);
				if (canSee(eventSlave)) {
					r.push(`looking`);
				} else {
					r.push(`gazing`);
				}
				r.push(`at you hopefully.`);
			} else if (eventSlave.fetish === "masochist") {
				r.push(`bites ${his} lower lip, looking aroused.`);
				if (eventSlave.dick > 0) {
					r.push(Spoken(eventSlave, `"${Master}, may I have a dick piercing? Right th-through my cock. Oh f-fuck it would hurt. Please?"`));
				} else {
					r.push(Spoken(eventSlave, `"${Master}, may I have a pussy piercing? Right th-through me. Oh f-fuck it would hurt. Please?"`));
				}
				r.push(`${He} shivers at the thought,`);
				if (canSee(eventSlave)) {
					r.push(`looking`);
				} else {
					r.push(`gazing`);
				}
				r.push(`at you hopefully.`);
			}
		} else {
			r.push(`bats ${his} eyes at you, and turns halfway to display ${his} boobs in profile.`,
				Spoken(eventSlave, `"${Master}, may I have my nipples pierced? It's silly and girly, but I guess— I guess I'd like something silly and girly. Please?"`));
			r.push(`${He} blushes prettily and`);
			if (canSee(eventSlave)) {
				r.push(`looks`);
			} else {
				r.push(`gazes`);
			}
			r.push(`at you hopefully.`);
		}

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Perform it yourself`, perform),
			new App.Events.Result(`${He}'s beautiful just the way ${he} is`, beautiful),
			new App.Events.Result(`No, and slaves should not make requests of this kind`, no),
		]);

		function perform() {
			const frag = document.createDocumentFragment();
			r = [];
			r.push(`You stand up from behind your desk and head towards the body modification studio,`);
			if (canSee(eventSlave)) {
				r.push(`crooking a finger at`);
			} else {
				r.push(`calling`);
			}
			r.push(`${him} as you as you go. ${He} follows bouncily, thanking you profusely, and then thanking you again when it becomes apparent to ${him} that you intend to do the body art yourself. ${He} snuggles into the chair, relaxing as the restraints bind ${him} in. They're not really necessary to modify a willing ${girl}, never mind one this enthusiastic, but they could possibly prevent ${him} from flinching, and it's not like ${he} resents being bound at this point.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`Manipulating the machine, you`);
			if (eventSlave.fetishKnown === 1 && eventSlave.fetish !== Fetish.NONE) {
				if (eventSlave.fetish === Fetish.SUBMISSIVE) {
					r.push(`place the first piercing, eliciting a hum of mild pain and abject submission from ${eventSlave.slaveName}. The piercing session goes on and on, with the slave sinking into a boneless, mindless state in which ${his} being is completely in your hands. ${He}'s almost sleepy when you finally release ${him}, but ${he} rises and`);
					if (canSee(eventSlave)) {
						r.push(`turns, craning around to see in the mirror.`);
					} else {
						r.push(`gingerly feeling around ${his} new piercings.`);
					}
					r.push(`${He} <span class="devotion inc">smiles devotedly,</span> and asks you when ${he}'ll be healed enough that ${he} can be laced up.`);
					eventSlave.piercing.corset.weight = 1;
				} else if (eventSlave.fetish === "cumslut") {
					r.push(`hold ${his} mouth agape and place the first piercing. ${He} can't make much of a facial expression with ${his} mouth that wide, but there is a lewd`);
					if (canSee(eventSlave)) {
						r.push(`glint in ${his} eye`);
					} else {
						r.push(`look on ${his} face`);
					}
					r.push(`when ${he} realizes ${he}'s getting more than one. When you're done, ${he}'s sore enough that ${he} gestures ${his} thanks, <span class="devotion inc">smiling devotedly,</span> and begs you to try ${him} out when ${he}'s healed up.`);
					eventSlave.piercing.tongue.weight = 2;
				} else if (eventSlave.fetish === "humiliation") {
					r.push(`activate the ink gun, its low buzzing drawing a moan of anticipation out of ${eventSlave.slaveName}. Working at a touchscreen, you exercise your artistic talents, inscribing the slave's status as a sex object on ${his} forehead. The pain is intense, but ${he} tolerates it, the tears running fast out of the corners of ${his} eyes and low groans rising out of ${his} throat. When ${he}'s finally allowed to rise`);
					if (canSee(eventSlave)) {
						r.push(`and sees ${himself} in a mirror,`);
					} else if (canHear(eventSlave)) {
						r.push(`and listens intently on your descriptions of ${his} new face,`);
					}
					r.push(`${he} blushes furiously and cries harder, knowing that ${his} status as a humiliation slut is now permanent. This culmination of ${his} deeply perverse sense of self <span class="devotion inc">draws ${him} closer to you.</span>`);
					eventSlave.lipsTat = "degradation";
				} else if (eventSlave.fetish === "buttslut") {
					r.push(`place a spreader to keep ${his} legs and cheeks apart and start piercing. ${He} whines with the pain, and then gasps when ${he} realizes that the piercing is going on much longer than ${he} expected. You give ${him} a couple of huge piercings below ${his} anus, big enough that ${he}'ll never be free of them rubbing against ${his} slutty butthole. Not done yet, you put some small, smooth studs around it, just to make sure nobody can possibly misunderstand where to fuck this bitch. ${He} gets up gingerly, but <span class="devotion inc">smiling sluttily.</span>`);
					eventSlave.piercing.anus.weight = 2;
				} else if (eventSlave.fetish === "boobs") {
					if (eventSlave.nipples.includes("inverted")) {
						r.push(`use a couple of its actuators to stimulate ${his} nipples until they're almost all the way protruded, and then direct them to pull them out all the way. ${He} screams wholeheartedly at the pain, yelling on and on until ${he}'s out of breath and relaxes against the restraints, gasping and crying.`);
					} else {
						r.push(`use its actuators to pull ${his} nipples out as far as they will go, forcing a gasp of pain out of ${him}.`);
					}
					r.push(`${He} expects a simple nipple piercing, one for each boob; what ${he} gets is a set of heavy rings in each nipple. ${He}'s no masochist, so the pleasure will come later, but ${he} moans as ${he} feels the gradual addition of weight to ${his} nipples. ${He} rises very carefully, trying to keep ${his} boobs still, and <span class="devotion inc">smiles devotedly</span> at you. Soon enough, ${he}'ll be able to orgasm by walking.`);
					eventSlave.piercing.nipple.weight = 2;
				} else if (eventSlave.fetish === "pregnancy") {
					if (eventSlave.belly >= 10001) {
						r.push(`hold ${his} ${belly} stomach steady and pierce ${his} navel with the largest, heaviest ring available. There is a lewd`);
						if (canSee(eventSlave)) {
							r.push(`glint in ${his} eye`);
						} else {
							r.push(`look on ${his} face`);
						}
						r.push(`as ${he} feels the new weight settle against ${his} middle. ${He} rises very carefully, trying to keep ${his} new piercing from moving, and <span class="devotion inc">smiles devotedly</span> at you. Soon enough, all eyes will be on ${his} belly as ${he} waddles by.`);
						eventSlave.piercing.navel.weight = 2;
					} else {
						r.push(`activate the ink gun, its low buzzing drawing a moan of anticipation out of ${eventSlave.slaveName}. Working at a touchscreen, you exercise your artistic talents, beautifying ${his}`);
						if (eventSlave.belly >= 150) {
							r.push(`${belly} stomach`);
						} else {
							r.push(`abdomen`);
						}
						r.push(`with an inducement to fuck ${him}.`);
						if (canSee(eventSlave)) {
							if (eventSlave.belly >= 5000) {
								r.push(`${He} can't see what you are inking into the underside of ${his} belly, but ${he} tries anyway.`);
							} else {
								r.push(`${He}'s just able to crane ${his} head enough to see the work, and eagerly watches.`);
							}
							r.push(`When you're done, ${he} stares at ${himself} for a long time,`);
						} else {
							r.push(`Once you finish ${his} new tattoo, you describe it to ${him} in detail. ${He} pauses for a moment,`);
						}
						r.push(`a curiously mixed expression on ${his} face. This is ${his} life now; it's permanently a part of ${him}, and <span class="devotion inc">${he} knows it.</span>`);
						eventSlave.vaginaTat = "lewd crest";
					}
				} else if (eventSlave.fetish === "dom") {
					r.push(`activate the ink gun, its low buzzing drawing a moan of anticipation out of ${eventSlave.slaveName}. Working at a touchscreen, you exercise your artistic talents, making the side of ${his} face fierce with tribal patterns. Tattooing over such thin and sensitive skin is intensely painful, but ${he} tolerates it, permitting nothing but a low and continuing growl to escape. ${He}'s obviously tired out by the pain when ${he}'s finally allowed to rise, but ${he}`);
					if (canSee(eventSlave)) {
						r.push(`looks at ${himself} in the mirror`);
					} else if (canHear(eventSlave)) {
						r.push(`listens to your description`);
					} else {
						r.push(`traces the design with ${his} fingertips`);
					}
					r.push(`with <span class="devotion inc">obvious approval.</span>`);
					eventSlave.lipsTat = "tribal patterns";
				} else if (eventSlave.fetish === "sadist") {
					if (canAchieveErection(eventSlave)) {
						r.push(`take hold of ${his} most intimate parts and put a set of massive piercings straight through ${his} shaft. ${He} shrieks with agony, the noise going on and on before diminishing into breathless sobbing. Much later, when ${he} gets gingerly up from the chair, ${he} doesn't look eager to stick ${his} cock in anything, but ${he}'s <span class="devotion inc">thankful enough.</span>`);
						eventSlave.piercing.dick.weight = 2;
					} else if (eventSlave.dick > 0) {
						r.push(`hold ${his} mouth agape and place the first piercing. ${He} can't make much of a facial expression with ${his} mouth that wide, but there is a lewd`);
						if (canSee(eventSlave)) {
							r.push(`glint in ${his} eye`);
						} else {
							r.push(`look on ${his} face`);
						}
						r.push(`when ${he} realizes ${he}'s getting more than one. When you're done, ${he}'s sore enough that ${he} gestures ${his} thanks, <span class="devotion inc">smiling devotedly;</span> ${he} looks eager to try out ${his} new piercing on a fresh pussy.`);
						eventSlave.piercing.tongue.weight = 2;
					} else {
						r.push(`take hold of ${his} most intimate parts and put a set of massive piercings straight through ${his} pussylips. ${He} shrieks with agony, the noise going on and on before diminishing into breathless sobbing. Much later, when ${he} gets gingerly up from the chair, ${he} doesn't look eager to trib anything, but ${he}'s <span class="devotion inc">thankful enough.</span>`);
						eventSlave.piercing.vagina.weight = 2;
					}
				} else if (eventSlave.fetish === "masochist") {
					r.push(`take hold of ${his} most intimate parts and put a series of massive piercing straight through ${his}`);
					if (eventSlave.dick > 0) {
						r.push(`shaft.`);
						eventSlave.piercing.dick.weight = 2;
					} else {
						r.push(`pussylips.`);
						eventSlave.piercing.vagina.weight = 2;
					}
					r.push(`${He} shrieks with agony and then orgasms as strongly as you've ever seen a slave climax, ${his} every fiber tensing against the restraints. For a long, long time ${he} has to work to breathe, the overstimulation clearing slowly. When you finally let ${him} up, ${he} hasn't remembered how to talk yet, but ${his} gaze says it for ${him}. It looks like ${he}'s just had <span class="devotion inc">the best sex of ${his} life.</span>`);
				}
			} else {
				if (eventSlave.nipples.includes("inverted")) {
					r.push(`use a couple of its actuators to stimulate ${his} nipples until they're almost all the way protruded, and then direct them to pull them out all the way. ${He} screams wholeheartedly at the pain, yelling on and on until ${he}'s out of breath and relaxes against the restraints, gasping and crying.`);
				} else {
					r.push(`use its actuators to pull ${his} nipples out as far as they will go, forcing a gasp of pain out of ${him}.`);
				}
				r.push(`This done, you give ${him} a simple pair of barbell nipple piercings. The machine makes this take less time than it takes to describe it, and after a shocked squeal of pain ${he}'s released. ${He} rises carefully, trying to keep ${his} boobs still, and <span class="devotion inc">smiles thankfully</span> at you. ${He}`);
				if (canSee(eventSlave)) {
					r.push(`glances at ${himself} in the mirror,`);
				} else {
					r.push(`listens to your description of ${him},`);
				}
				r.push(`looking pleased.`);
				eventSlave.piercing.nipple.weight = 1;
			}
			eventSlave.devotion += 5; // TODO: consider surgeryDamage
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function beautiful() {
			eventSlave.trust += 4;
			return `You tell ${him} firmly that ${he}'s beautiful just the way ${he} is. ${He} blushes and giggles at the absurdly trite statement. You conclude the inspection, and ${he} continues on to the next item in ${his} life as a sex slave, <span class="trust inc">pleased and reassured</span> that you have a plan for what ${he} should look like.`;
		}

		function no() {
			V.modRequestsAllowed = 0;
			return `You tell ${him} firmly that you don't intend to apply body modifications to ${him}, your tone communicating that further requests on this subject are not permitted. ${He} understands clearly and looks a little crushed, but trusts that ${he} won't be punished for violating a rule you hadn't promulgated. You repair the oversight immediately, directing your personal assistant to spread notice that decisions about body modifications are yours alone.`;
		}
	}
};
