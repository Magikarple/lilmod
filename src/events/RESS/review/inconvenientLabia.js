App.Events.RESSInconvenientLabia = class RESSInconvenientLabia extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => s.labia > 1,
				s => s.vagina >= 0,
				s => s.muscles > 5 || s.diet === "muscle building",
				s => s.belly < 10000,
				s => s.devotion > 20,
				s => s.trust > 20,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, girl, hers
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);

		/* "pulling down the compression shorts $he was wearing" */
		if (isItemAccessible.entry("sport shorts", "clothes")) {
			if (eventSlave.boobs >= 650) {
				App.Events.drawEventArt(node, eventSlave, "sport shorts and a sports bra");
			} else {
				App.Events.drawEventArt(node, eventSlave, "sport shorts");
			}
		} else {
			App.Events.drawEventArt(node, eventSlave, "spats and a tank top");
		}

		let r = [];
		App.Events.addParagraph(node, [
			`You see`,
			contextualIntro(V.PC, eventSlave, true),
			`moving gingerly as ${he} heads out of the workout room, as though ${he}'s suffering some pain in ${his} groin. Since ${he}'s coming off a workout rather than any duty that would explain a sore pussy, you head over to ${him} to investigate. ${He} greets you properly, looking a little rueful.`
		]);
		if (!canTalk(eventSlave)) {
			r.push(`${He} gestures impatiently at ${his} pussy, pulling down the compression shorts ${he} was wearing to display ${his} generous labia. ${He} humorously pantomimes them moving about as ${he} exercises and indicates pain.`);
		} else {
			if (eventSlave.lips > 70) {
				r.push(`${He} lisps through ${his} massive lips,`);
			} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
				r.push(`${He} lisps through ${his} huge piercings,`);
			}
			r.push(
				Spoken(eventSlave, `"${Master}, my pussylips are really big. They make running on the treadmill really painful, even wearing my compression shorts,"`),
				`${he} explains.`,
				Spoken(eventSlave, `"They just kind of get in the way."`)
			);
		}
		r.push(`${He} looks doubtful, as though ${he}'s wondering whether to make a request. Finally ${he} makes up ${his} mind to ask:`);
		if (!canTalk(eventSlave)) {
			r.push(`${he} waves towards the surgery, and gestures about the labiaplasty ${he} knows some slaves receive, asking you if ${he} can have ${hers} reduced.`);
		} else {
			r.push(Spoken(eventSlave, `"May I have labiaplasty, ${Master}? It would make working out so much easier on my poor pussy."`));
		}

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Let ${him} have labiaplasty to resolve the issue`, labiaplasty),
			canDoVaginal(eventSlave)
				? new App.Events.Result(`Let ${him} know ${he}'s got a wonderful vagina`, reassure, eventSlave.vagina === 0 ? `This option will take ${his} virginity` : null)
				: new App.Events.Result()
		]);

		function labiaplasty() {
			r = [];
			r.push(`When you assent, ${he} cheers up immediately, looking remarkably happy for a ${girl} who's just learned ${his} vagina is about to have a surgical operation performed on it. Then again, having those huge pussylips constantly getting in ${his} way when ${he} runs must be extremely uncomfortable, so it's not shocking ${he} would consider a radical solution to ${his} problem. When ${he} exits the remote surgery, ${he} looks <span class="health dec">sorer than ever,</span> of course, but ${he} <span class="devotion inc">smiles gratefully</span> at you the next time ${he}`);
			if (canSee(eventSlave)) {
				r.push(`sees`);
			} else {
				r.push(`meets`);
			}
			r.push(`you, and lets you know ${he}'s really looking forward to recovering enough for ${him} to take ${his} beloved ${getWrittenTitle(eventSlave)} into ${his} <span class="orange">newly streamlined cunt.</span>`);
			eventSlave.devotion += 4;
			eventSlave.labia = 0;
			surgeryDamage(eventSlave, 10);
			return r;
		}

		function reassure() {
			r = [];
			r.push(`By way of an answer, you embrace ${him} and give ${him} a deep kiss on ${his}`);
			if (eventSlave.lips > 70) {
				r.push(`enormous`);
			} else if (eventSlave.lips > 40) {
				r.push(`pillowlike`);
			} else if (eventSlave.lips > 20) {
				r.push(`big`);
			} else {
				r.push(`pretty`);
			}
			r.push(`lips, spreading a blush across ${his} ${eventSlave.skin} cheeks. Your hands rove down ${his}`);
			if (eventSlave.belly >= 1500) {
				if (eventSlave.bellyPreg >= 1500) {
					r.push(`pregnant`);
				} else {
					r.push(`swollen`);
				}
			} else if (eventSlave.weight > 190) {
				r.push(`expansive`);
			} else if (eventSlave.weight > 160) {
				r.push(`ponderous`);
			} else if (eventSlave.weight > 130) {
				r.push(`big, soft`);
			} else if (eventSlave.weight > 95) {
				r.push(`plump`);
			} else if (eventSlave.weight > 10) {
				r.push(`plush`);
			} else if (eventSlave.weight < -10) {
				r.push(`thin`);
			} else {
				r.push(`nice`);
			}
			r.push(`body, coming to rest on ${his}`);
			if (eventSlave.butt > 15) {
				r.push(`immeasurable`);
			} else if (eventSlave.butt > 10) {
				r.push(`mind-blowing`);
			} else if (eventSlave.butt > 7) {
				r.push(`spectacular`);
			} else if (eventSlave.butt > 5) {
				r.push(`magnificent`);
			} else if (eventSlave.butt > 3) {
				r.push(`rounded`);
			} else {
				r.push(`tight`);
			}
			r.push(`butt. You hug ${him} up and into you, crushing ${his}`);
			if (eventSlave.boobs > 2000) {
				r.push(`titanic`);
			} else if (eventSlave.boobs > 800) {
				r.push(`big`);
			} else {
				r.push(`small`);
			}
			r.push(`breasts against`);
			const bust = V.PC.boobsImplant !== 0 ? "balloons" : "bust";
			if (V.PC.boobs >= 1400) {
				r.push(`your enormous ${bust}.`);
			} else if (V.PC.boobs >= 1200) {
				r.push(`your huge ${bust}.`);
			} else if (V.PC.boobs >= 1000) {
				r.push(`your big ${bust}.`);
			} else if (V.PC.boobs >= 300) {
				r.push(`yours.`);
			} else if (V.PC.title === 0) {
				r.push(`your flat ones.`);
			} else {
				r.push(`your manly chest.`);
			}
			r.push(`Before long being kissed and held by ${his} beloved ${getWrittenTitle(eventSlave)} has ${him} playing the slut in your arms, and ${he} backs against the wall before wrapping ${his} legs around your middle to bring ${his} pussy against your`);
			const body = eventSlave.bellyPreg >= 3000 ? "gravid bulk" : "distended body";
			if (V.PC.dick === 0) {
				r.push(`own.`);
				if (eventSlave.belly >= 5000) {
					r.push(`You move your hands under ${him} to better support ${his} ${body}.`);
				}
				r.push(`${He} moans in pain as you scissor against ${his} sore pussy,`);
			} else {
				r.push(`stiff prick.`);
				if (eventSlave.preg > eventSlave.pregData.normalBirth/2) {
					r.push(`You move your hands under ${him} to better support ${his} ${body}.`);
				}
				r.push(`${He} gasps in pain as you press past ${his} sore pussylips,`);
			}
			r.push(`but before long ${he}'s grinding against you with ${his} back propped against the wall, using the embrace of ${his} strong legs to provide the power for a vigorous fuck. When ${he} finally slides down the wall to stand again, a look of <span class="devotion inc">profound pleasure</span> on ${his} face, ${he} lets you know that ${he} understands your meaning and that ${he}'ll put up with sore petals, since ${his} ${getWrittenTitle(eventSlave)} prefers ${him} that way.`);
			r.push(VCheck.Vaginal(eventSlave, 1));
			eventSlave.devotion += 4;
			return r;
		}
	}
};
