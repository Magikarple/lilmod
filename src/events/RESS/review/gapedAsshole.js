App.Events.RESSGapedAsshole = class RESSGapedAsshole extends App.Events.BaseEvent {
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
				s => s.assignment !== Job.QUARTER,
				s => s.anus > 3,
				s => s.devotion > 50,
				s => s.trust > 50,
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
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(
			`You encounter`,
			contextualIntro(PC, eventSlave, true),
			`at the beginning of ${his} day, as ${he} finishes ${his} morning ablutions and heads off to`,
		);
		if (eventSlave.clothes !== "no clothing") {
			r.push(`get dressed.`);
		} else {
			r.push(`${his} assignment, since ${he}'s not allowed clothes and therefore doesn't need to dress.`);
		}
		r.push(`${He} seems happy today, and ${his} ${eventSlave.skin} body glows with warmth and cleanliness from the hot shower. When ${he}`);
		if (canSee(eventSlave)) {
			r.push(`sees`);
		} else {
			r.push(`notices`);
		}
		r.push(`you, ${he} greets you properly, yet positively, smiling at you and`);
		if (eventSlave.boobs > 3000) {
			r.push(`presenting ${his} enormous breasts`);
		} else if (eventSlave.lips > 70) {
			r.push(`pursing ${his} huge lips`);
		} else if (eventSlave.boobs > 800) {
			r.push(`bouncing ${his} big breasts`);
		} else if (eventSlave.lips > 20) {
			r.push(`pursing ${his} pretty lips`);
		} else {
			r.push(`sticking out ${his} chest`);
		}
		r.push(`in an automatic gesture of easy sexual availability. Suddenly, ${he} remembers something, and looks thoughtful. Since ${he}'s so trusting, ${he} asks you the question that just occurred to ${him}.`);
		r.toParagraph();
		r.push(
			`"${Master}," ${he} ${say}s,`,
			Spoken(eventSlave, `"may I have my asshole tightened?"`)
		);
		r.toParagraph();
		r.push(`There's no trace of awareness on ${his} face of the open lewdness of the question;`);
		if (eventSlave.career === "a bioreactor") {
			r.push(`${he}'s spent time in an industrial Dairy with a phallus the size of a horse's pounding ${his} ass day and night.`);
		} else if (eventSlave.career === "a dairy cow") {
			r.push(`${he} used to be a mindless cow, bred daily by equally mindless bulls. The massively hung beasts would frequently miss their mark and end up roughly fucking ${his} asshole.`);
		} else if (eventSlave.career === "a slave" || V.week-eventSlave.weekAcquired > 50) {
			r.push(`${he}'s been a sex slave so long that ${he}'s completely internalized the idea of ${his} ass being a sex organ.`);
		} else if (eventSlave.counter.anal > 2000) {
			r.push(`${he}'s had ${his} ass fucked so many times that ${he} thinks of it as an inherently sexy thing.`);
		} else {
			r.push(`${he}'s so devoted to you that ${he}'s made a conscious effort to think of ${his} ass as sexy.`);
		}
		r.push(`${He} continues in ${his}`);
		if (eventSlave.voice === 1) {
			r.push(`deep`);
		} else if (eventSlave.voice === 2) {
			r.push(`soft`);
		} else {
			r.push(`bubblegum bimbo's`);
		}
		r.push(
			`voice, ${say}ing,`,
			Spoken(eventSlave, `"It's not <b>bad.</b> It's easy to take anything up it. And when I walk I can feel my anal slit sort of working around back there, which is kind of fun. But I was just thinking, as I was washing my asspussy. It'd be nice`)
		);
		switch (eventSlave.fetish) {
			case "submissive":
				r.push(Spoken(eventSlave, `to feel just a little afraid when I'm on my face and about to get fucked.`));
				break;
			case "cumslut":
				r.push(Spoken(eventSlave, `to be able to keep loads of cum in my ass for later, instead of having them just drip right out.`));
				break;
			case "buttslut":
				r.push(Spoken(eventSlave, `to be able to feel a little more sensation back there again. Buttsex is still fun and absolutely my favorite thing, but I remember it being even better.`));
				break;
			case "masochist":
				r.push(Spoken(eventSlave, `if I could feel anal pain again. That burning feeling used to be one of my favorites.`));
				break;
			default:
				r.push(Spoken(eventSlave, `to be able to be a better anal lover. I do my best, but I can't squeeze very well any more.`));
		}
		r.push(`May I?" ${He} spins,`);
		if (eventSlave.belly >= 5000) {
			r.push(`spreading ${his} legs for ${his} ${belly}`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`pregnant`);
			}
			r.push(`belly while`);
		}
		r.push(`bending at the waist`);
		if (eventSlave.butt > 6) {
			r.push(`and prising ${his} monstrous buttocks apart`);
		} else if (eventSlave.butt > 3) {
			r.push(`spreading ${his} healthy buttocks`);
		}
		r.push(`to reveal ${his} gaping anus. It could indeed benefit from surgical repair.`);

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Give ${him} the surgery`, give),
			new App.Events.Result(`Fill ${his} gape`, fill),
			(V.HeadGirlID !== 0 && eventSlave.assignment !== Job.HEADGIRL)
				? new App.Events.Result(`Double up on ${his} ass with your Head Girl`, double)
				: new App.Events.Result()
		]);

		function give() {
			const frag = document.createDocumentFragment();
			const r = new SpacedTextAccumulator(frag);
			r.push(`You schedule ${him} for the surgery. Like all invasive procedures, it <span class="health dec">affects ${his} health,</span> but <span class="lime">${he}'s effectively an anal virgin again.</span> ${He} <span class="trust inc">trusts you a bit more</span> for granting ${his} request, and is eager for buttsex that's more interesting than having a hotdog thrown down ${his} hallway.`);
			eventSlave.trust += 3;
			eventSlave.anus = 0;
			cashX(forceNeg(V.surgeryCost), "slaveSurgery", eventSlave);
			surgeryDamage(eventSlave, 10);
			if (eventSlave.skill.anal > 10) {
				eventSlave.skill.anal -= 10;
			}

			r.toParagraph();
			App.Events.addResponses(frag, [
				new App.Events.Result(`Break ${him} in again"`, again, `This option will take ${his} anal virginity`)
			]);
			return r.container();

			function again() {
				const r = new SpacedTextAccumulator();
				r.push(`${His} ass is yours all over again. As soon as ${his} newly tight rosebud has recovered enough, you visit ${him} in the surgery, without even waiting for ${him} to leave it. You flip ${him} over on the recovery bed and force`);
				if (V.PC.dick !== 0) {
					r.push(`your cock`);
				} else {
					r.push(`a strap-on`);
				}
				r.push(`up ${his} butt while ${he} wriggles with eager discomfort; squealing in pretended horror. ${His} renewed anal virginity was very brief; ${his} ass is once again <span class="virginity loss">broken in for penetration.</span> For ${his} part, ${he} <span class="devotion inc">thoroughly enjoyed losing ${his} anal cherry,</span> again.`);
				eventSlave.devotion += 5;
				eventSlave.anus = 1;
				seX(eventSlave, "anal", V.PC, "penetrative");
				knockMeUp(eventSlave, 5, 1, -1); // review: add to r.push
				r.toParagraph();
				return r.container();
			}
		}

		function fill() {
			const frag = document.createDocumentFragment();
			const r = new SpacedTextAccumulator(frag);
			r.push(`You announce that you can fill ${him} just fine, and you'll make ${him} feel it just as though ${he} were an anal virgin again. ${He} looks simultaneously intrigued and apprehensive`);
			if (!canDoAnal(eventSlave)) {
				r.push(`as you remove ${his} anal chastity`);
			}
			r.addToLast(`, but starts to get to ${his} knees like a good anal slut. You stop ${him} before ${he} can`);
			if (eventSlave.belly >= 300000) {
				r.push(`lean onto ${his} ${belly} belly`);
			} else {
				r.push(`face the ground`);
			}
			r.push(`and offer you ${his} ass. You're going to need some lubricant for this, but the ${SlaveTitle(eventSlave)}'s saliva should be plenty. As you`);
			if (V.PC.dick !== 0) {
				r.push(`aim your dick`);
			} else {
				r.push(`swiftly pull on a strap-on and aim it`);
			}
			r.push(`at ${his} face, ${he} realizes that ${his} spit is going to be the only relief ${his} fucked-out butt is going to have for whatever you're planning. ${He} blows you with desperate eagerness, doing ${his} absolute best to coat your`);
			if (V.PC.dick === 0) {
				r.push(`weapon's`);
			}
			r.push(`shaft with as much saliva as ${he} can. You pull it free of ${his} mouth with a wet pop, and ${he} immediately faces the floor, cocking ${his} hips and spreading ${his} huge asspussy for you.`);
			r.toParagraph();
			r.push(`After watching the way it contracts slightly as ${he} breathes hard for a while, letting ${him} feel the apprehension, you shove`);
			if (V.PC.dick !== 0) {
				r.push(`yourself`);
			} else {
				r.push(`the phallus`);
			}
			r.push(`inside ${him}. ${He} takes it without any reaction at all, and ${his} gaped hole cups it only loosely. Grabbing ${him} by the shoulders, you haul ${his} torso up so it's against your`);
			if (V.PC.belly >= 5000) {
				r.push(`pregnancy,`);
				if (V.PC.belly >= 10000) {
					r.push(`capped by its popped navel,`);
				}
			} else if (V.PC.boobs >= 300) {
				r.push(`breasts, capped by their rock-hard nipples,`);
			} else if (V.PC.title === 0) {
				r.push(`flat chest, capped by its rock-hard nipples,`);
			} else {
				r.push(`muscular chest,`);
			}
			r.push(`and push three of your fingers into ${his} mouth. ${He} gags, surprised, but you shove them in farther, collecting as much spit as you can reach. Then you let ${him} fall back down again. ${He} knows what you're going to do, and moans as you slide your fingers in alongside your`);
			if (V.PC.dick !== 0) {
				r.push(`cock,`);
			} else {
				r.push(`strap-on,`);
			}
			r.push(`taking huge shuddering gasps as ${he} feels ${his} sphincter accommodate the abuse. Slowly, you slide your thumb in as well, pushing it around`);
			if (V.PC.dick !== 0) {
				r.push(`your stiff prick`);
			} else {
				r.push(`the unyielding phallus`);
			}
			r.push(`until you're holding it as if masturbating. And then you masturbate. Inside ${his} ass. ${He} begins to scream, but manages to prevent ${himself} from resisting. ${He} does ${his} desperate best to take your crushing abuse of ${his} worn-out hole, and collapses when you finally orgasm and let ${him} go. ${He} does ${his} best to offer some sort of <span class="devotion inc">submissive thanks,</span> but is barely coherent, and crawls off to shower again, ${his} lewd sphincter pulsing as ${he} goes.`);
			eventSlave.devotion += 5;
			r.push(VCheck.Anal(eventSlave, 1));
			r.toParagraph();
			frag.append(App.Events.eventFetish(eventSlave, "buttslut"));
			frag.append(App.Events.eventFetish(eventSlave, "masochist"));
			return r.container();
		}

		function double() {
			App.Events.refreshEventArt([eventSlave, S.HeadGirl]);
			const {He2, he2, his2} = getPronouns(S.HeadGirl).appendSuffix('2');
			const frag = document.createDocumentFragment();
			const r = new SpacedTextAccumulator();
			r.push(`You page ${S.HeadGirl.slaveName} for some assistance filling up a loose hole, and ${he2} comes quickly,`);
			if (canPenetrate(S.HeadGirl)) {
				r.push(`precum already visible at the tip of ${his2} erection.`);
			} else {
				r.push(`bringing a strap-on.`);
			}
			r.push(`When ${he2} arrives, it's to the sight of ${eventSlave.slaveName} sitting on your lap,`);
			if (!canDoAnal(eventSlave)) {
				r.push(`anal chastity discarded,`);
			}
			r.push(`with your`);
			if (V.PC.dick !== 0) {
				r.push(`cock`);
			} else {
				r.push(`strap-on`);
			}
			r.push(`up ${his} ridiculous anal gape, waiting for a second phallus while your hands tease ${his} ${eventSlave.nipples} nipples. Seeing that backup has arrived, you lean back and shift your grip to the back of the receptacle's lower thighs, pulling ${him} up and shifting ${his} hips to offer your Head Girl another berth in ${eventSlave.slaveName}'s ass. This pulls ${his} loose sphincter up, producing a little gape above the top of your invading shaft, and ${S.HeadGirl.slaveName} loses no time in fucking it. ${He2} gives ${eventSlave.slaveName} a kiss, but soon breaks the lip lock, since ${he2}'s more interested in making eyes at you over your mutual anal conquest's shuddering shoulder. As`);
			if (V.PC.dick !== 0) {
				if (canPenetrate(S.HeadGirl)) {
					r.push(`your dicks slide against each other,`);
				} else {
					r.push(`your dick slides against ${his2} strap-on,`);
				}
			} else {
				if (canPenetrate(S.HeadGirl)) {
					r.push(`your strap-on slides against ${his2} dick,`);
				} else {
					r.push(`your strap-ons slide against each other,`);
				}
			}
			r.push(`your trusty Head Girl whispers that <span class="devotion inc">${he2} loves you.</span> ${eventSlave.slaveName} makes an inarticulate noise of anal distress that probably means <span class="devotion inc">approximately the same thing.</span>`);
			eventSlave.devotion += 4;
			r.push(VCheck.Anal(eventSlave, 2));
			if (canImpreg(eventSlave, S.HeadGirl)) {
				knockMeUp(eventSlave, 5, 1, V.HeadGirlID);
			}
			S.HeadGirl.devotion += 4;
			r.toParagraph();
			frag.append(App.Events.eventFetish(eventSlave, "buttslut"));
			frag.append(App.Events.eventFetish(eventSlave, "submissive"));
			return r.container();
		}
	}
};
