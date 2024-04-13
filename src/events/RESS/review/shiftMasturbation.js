App.Events.RESSShiftMasturbation = class RESSShiftMasturbation extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canTalk,
				s => [Job.CONCUBINE, Job.FUCKTOY, Job.MASTERSUITE].includes(s.assignment),
				s => s.devotion > 20,
				s => s.trust >= -20,
				s => canDoAnal(s) || canDoVaginal(s),
				s => (s.chastityPenis !== 1 || s.dick === 0),
				canWalk,
				s => s.rules.release.masturbation === 1,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(`Your fucktoys have to eat, sleep, and look after themselves, just like anyone, so they can't spend every moment offering themselves to you.`);
		if (S.Concubine) {
			r.push(`Your concubine, ${S.Concubine.slaveName}`);
		} else if (V.HeadGirlID !== 0) {
			r.push(`Your Head Girl, ${S.HeadGirl.slaveName}`);
		} else if (V.assistant.name === "your personal assistant") {
			r.push(`Your personal assistant`);
		} else {
			r.push(`Your personal assistant, ${capFirstChar(V.assistant.name)},`);
		}
		r.push(`manages a schedule for them, constantly changing it up to keep the sluts from getting predictable.`);
		r.push(contextualIntro(V.PC, eventSlave, true, false, true));
		r.push(`has just come on shift.`);
		r.toParagraph();

		r.push(`And has ${he} ever come on shift. ${He} enters your office at something not far removed from a run, displaying evident signs of sexual excitation, a blush visible on ${his} ${eventSlave.skin} cheeks. Between ${his} job, the mild drugs in ${his} food, and ${his} life, ${he}'s beside ${himself} with need. ${He} realizes you're working and tries to compose ${himself}, but gives up after a short struggle and flings ${himself} down on the couch. ${He} scoots down so ${his}`);
		if (eventSlave.butt > 5) {
			r.push(`enormous`);
		} else if (eventSlave.butt > 2) {
			r.push(`healthy`);
		} else {
			r.push(`trim`);
		}
		r.push(`butt is hanging off the edge of the cushion, and spreads ${his} legs up and back`);
		if (eventSlave.belly >= 5000) {
			r.push(`to either side of ${his} ${belly}`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`pregnant`);
			}
			r.push(`belly`);
		}
		r.push(`as wide as they'll go`);
		if (eventSlave.boobs > 1000) {
			r.addToLast(`, hurriedly shoving ${his} tits out of the way`);
		}
		r.addToLast(`. ${He} uses both hands to frantically`);
		if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
			if (eventSlave.hormoneBalance >= 100) {
				r.push(`rub ${his} hormone-dysfunctional penis,`);
			} else if (eventSlave.balls > 0 && eventSlave.ballType === "sterile") {
				r.push(`rub ${his} limp, useless penis,`);
			} else if (eventSlave.balls === 0) {
				r.push(`rub ${his} limp, balls-less penis,`);
			} else {
				r.push(`rub ${his} soft penis,`);
			}
		} else if (eventSlave.dick > 4) {
			r.push(`jack off ${his} titanic erection,`);
		} else if (eventSlave.dick > 2) {
			r.push(`jack ${himself} off,`);
		} else if (eventSlave.dick > 0) {
			r.push(`rub ${his} pathetic little hard-on,`);
		} else if (eventSlave.vagina === -1) {
			r.push(`frantically rubs the sensitive area beneath ${his} asspussy,`);
		} else if (eventSlave.clit > 0) {
			r.push(`rub ${his} huge, engorged clit,`);
		} else if (eventSlave.labia > 0) {
			r.push(`play with ${his} clit and ${his} generous labia,`);
		} else {
			r.push(`rub ${his} pussy,`);
		}
		r.push(`but after a moment ${he} clearly decides this isn't enough stimulation. ${He}`);
		if (eventSlave.dick > 0) {
			r.push(`uses two fingers to collect the precum dribbling from ${his} dickhead.`);
		} else {
			r.push(`fucks ${himself} vigorously with two fingers to collect some girl lube.`);
		}
		r.push(`${He} brings these fingers up to ${his} face to check ${his} work, hesitates, visibly decides ${he} doesn't care, and reaches down to`);
		if (eventSlave.anus > 2) {
			r.push(`slide them into ${his} loose asspussy. ${He} sighs with pleasure at the sensation.`);
		} else if (eventSlave.anus > 1) {
			r.push(`shove them up ${his} butt. ${He} wriggles a little at the makeshift lubrication but is clearly enjoying ${himself}.`);
		} else {
			r.push(`push them up ${his} tight butt. The pain of anal penetration with only makeshift lubrication extracts a huge sobbing gasp from ${him}, and ${he} tears up a little even as ${he} masturbates furiously.`);
		}

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Leave ${him} to it`, leave),
			new App.Events.Result(`Lend ${him} some assistance`, lend, virginityWarning()),
			new App.Events.Result(`Show the slut off`, show),
		]);

		function virginityWarning() {
			if (canDoVaginal(eventSlave) && eventSlave.vagina === 0) {
				return `This option will take ${his} virginity`;
			} else if (!canDoVaginal(eventSlave) && eventSlave.anus === 0) {
				return `This option will take ${his} anal virginity`;
			}
		}

		function leave() {
			const r = new SpacedTextAccumulator();
			r.push(`You have work to do. You ignore the shameless slut, who gets ${himself} off in no time at all,`);
			if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) { // Review! Previously: <<if ($activeSlave.dick > 0) && !canAchieveErection($activeSlave.balls == 0)>>
				r.push(`${his} limp dick dribbling cum onto ${his}`);
				if (eventSlave.pregKnown === 1) {
					r.push(`pregnant`);
				}
				r.push(`stomach.`);
			} else if (eventSlave.dick > 0) {
				r.push(`orgasming so strongly ${he} manages to hit ${himself} in the face with ${his} own cum.`);
			} else if (eventSlave.vagina === -1) {
				r.push(`indulging in the anal self-stimulation that's ${his} best remaining avenue to an orgasm.`);
			} else {
				r.push(`the smell of female pleasure filling the office.`);
			}
			r.push(`${He} gets up, washes ${himself} off and rearranges ${his} body on the couch again, languidly this time. ${He} returns to masturbating, gently playing with ${himself} with one hand and`);
			if (eventSlave.nipples !== "fuckable") {
				r.push(`teasing`);
			} else {
				r.push(`fingering`);
			}
			r.push(`a nipple with the other.`);
			r.toParagraph();
			return r.container();
		}

		function lend() {
			let didAnal = false;
			let didVaginal = false;
			const r = new SpacedTextAccumulator();
			r.push(`You stand and ask ${him} mockingly if ${he} could use some assistance. ${He} gapes at you for a lust-hazed moment before nodding happily,`);
			if (!canTalk(eventSlave)) {
				r.push(`gesturing ${his} thanks.`);
			} else {
				r.push(
					`squealing,`,
					Spoken(eventSlave, `"Yes please, ${Master}!"`)
				);
			}
			r.push(`${He} stops wanking and takes ${his} ${hasBothArms(eventSlave) ? "hands" : "hand"} away, laying ${himself} wide for you like a horny human buffet. You make a show of selecting, but decide on ${his}`);
			if (canDoVaginal(eventSlave)) {
				if (eventSlave.vagina > 2) {
					r.push(`slutty pussy.`);
				} else if (eventSlave.vagina > 1) {
					r.push(`experienced pussy.`);
				} else {
					r.push(`tight pussy.`);
				}
				didVaginal = true;
			} else {
				if (eventSlave.anus > 2) {
					r.push(`slutty anal slit.`);
				} else if (eventSlave.anus > 1) {
					r.push(`well prepared asshole.`);
				} else {
					r.push(`still-tight butt.`);
				}
				didAnal = true;
			}
			r.push(`${He} calmed down a little while offering ${himself} to you, so ${he} manages not to climax immediately when you`);
			if (V.PC.dick === 0) {
				r.push(`push your strap-on into ${him},`);
			} else {
				r.push(`thrust your dick into ${him},`);
			}
			r.push(`but ${he}'s in a rare mood. You reward ${him} by guiding ${his} hands back to ${his} crotch as you ramp up the pace, at which ${he} looks up at you with something like wordless glee. ${He} goes back to`);
			if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
				r.push(`playing with ${his} limp dick,`);
			} else if (eventSlave.dick > 4) {
				r.push(`jerking off ${his} giant cock,`);
			} else if (eventSlave.dick > 2) {
				r.push(`jerking off,`);
			} else if (eventSlave.dick > 0) {
				r.push(`teasing ${his} girly little dick,`);
			} else if (eventSlave.clit > 2) {
				r.push(`jerking off ${his} ridiculous clit,`);
			} else if (eventSlave.labia > 0) {
				r.push(`spreading and teasing ${his} petals,`);
			} else if (eventSlave.vagina === -1) {
				r.push(`playing with ${his} asspussy,`);
			} else {
				r.push(`rubbing ${his} clit,`);
			}
			if (!canTalk(eventSlave)) {
				r.push(`making little raspy pleasure noises.`);
			} else {
				r.push(`mewling with pleasure.`);
			}
			if (didAnal) { // Review! Moved this block up from below "skips off to wash" for better flow
				r.push(VCheck.Anal(eventSlave, 1));
			} else if (didVaginal) {
				r.push(VCheck.Vaginal(eventSlave, 1));
			}
			r.push(`When you're finally done, ${he}'s fairly tired, but ${he} manages to give ${his}`);
			if (eventSlave.butt > 5) {
				r.push(`huge,`);
			} else if (eventSlave.butt > 2) {
				r.push(`big,`);
			} else {
				r.push(`cute,`);
			}
			r.push(`well-fucked butt a little wiggle for you, <span class="trust inc">`);
			if (canSee(eventSlave)) {
				r.push(`looking`);
			} else {
				r.push(`smiling`);
			}
			r.push(`at you gratefully,</span> as ${he} skips off to wash.`);
			eventSlave.trust += 4;
			r.toParagraph();
			return r.container();
		}

		function show() {
			const r = new SpacedTextAccumulator();
			r.push(`It takes a trifling command at your desk to surreptitiously slave one of the office cameras to ${his} impromptu masturbation session, and send the feed to many of the public screens. After a few minutes,`);
			if (canSee(eventSlave)) {
				r.push(`${he} notices the setup through one of the office's glass walls.`);
			} else {
				r.push(`you inform the eager masturbator that ${his} show is live across the arcology.`);
			}
			if (eventSlave.fetish === "humiliation" && eventSlave.fetishStrength > 60 && eventSlave.fetishKnown === 1) {
				r.push(`${He} climaxes almost instantly at the realization, which plays right into ${his} fetish.`);
			} else {
				r.push(`${He} pauses for a moment at the realization, but goes back to ${his} business, blushing a little harder.`);
			}
			r.push(`${He} even plays it up a little for ${his} audience; when ${he}`);
			if (eventSlave.belly >= 120000 && eventSlave.dick > 0) {
				r.push(`climaxes, ${he} makes sure they can see the way ${his} enormously distended body spasms with orgasm.`);
			} else if (eventSlave.belly >= 10000 && eventSlave.dick > 0) {
				r.push(`finally orgasms, ${he} attempts to hike ${his} hips over ${his} head and direct the cum into ${his} mouth. However, ${his}`);
				if (eventSlave.bellyPreg >= 5000) {
					r.push(`advanced pregnancy`);
				} else {
					r.push(`${belly} belly`);
				}
				r.push(`thwarts ${his} efforts and ${he} ends up cumming on ${his} stomach's underside. ${He} brushes some cum off with ${his} fingers and brings it to ${his} mouth, smiling at the`);
				if (canTaste(eventSlave)) {
					r.push(`taste.`);
				} else {
					r.push(`sensation.`);
				}
			} else if (eventSlave.dick.isBetween(0, 5) && eventSlave.belly >= 5000) {
				r.push(`finally orgasms, ${he} attempts to hike ${his} hips over ${his} head and direct the cum into ${his} mouth. However, ${he} ends up just coating ${his}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnancy`);
				} else {
					r.push(`${belly} belly`);
				}
				r.push(`in ${his} own cum.`);
			} else if (eventSlave.dick > 4 && eventSlave.belly >= 5000) {
				r.push(`finally orgasms, ${he} attempts to hike ${his} hips over ${his} head and direct the cum into ${his} mouth. ${His} dick is large enough to extend past ${his}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnancy,`);
				} else {
					r.push(`${belly} belly,`);
				}
				r.push(`allowing ${him} to blow ${his} load into ${his} waiting maw.`);
			} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
				r.push(`finally manages to extract an orgasm from ${his} limp dick, ${he} hikes ${his} hips over ${his} head to direct it into ${his} mouth.`);
			} else if (eventSlave.dick > 0) {
				r.push(`finally empties ${his} balls, ${he} hikes ${his} hips over ${his} head to direct the cum into ${his} mouth.`);
			} else if (eventSlave.vagina === -1) {
				r.push(`climaxes, ${he} makes sure they can see the way ${his} asspussy spasms with orgasm.`);
			} else {
				r.push(`finally climaxes, ${he} carefully licks ${his} hands clean, showing off ${his} enjoyment of ${his} own`);
				if (canTaste(eventSlave)) {
					r.push(`taste.`);
				} else {
					r.push(`fluids.`);
				}
			}
			r.push(`Authenticity is hard to fake, and the many citizens who saw the broadcast don't doubt <span class="reputation inc">your ability to train</span> a shameless slut.`);
			repX(1250, "event", eventSlave);
			r.toParagraph();
			return r.container();
		}
	}
};
