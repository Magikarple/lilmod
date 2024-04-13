App.Events.RESSNiceGuys = class RESSNiceGuys extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => s.assignment === Job.PUBLIC,
				s => s.devotion >= -20,
				s => canDoAnal(s) || canDoVaginal(s),
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, girl
		} = getPronouns(eventSlave);
		const {HisA, HeA, heA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		const r = new SpacedTextAccumulator(node);
		r.push(`One afternoon, ${V.assistant.name} informs you ${he} that ${he} has a non-urgent matter that you might be interested in overseeing personally.`);
		if (V.assistant.personality > 0) {
			r.push(
				`${HisA} ${V.assistant.appearance} avatar looks unusually curious. "${properTitle()}, " ${heA} says, "a group of tourists have just entered the arcology. They seem strangely enthralled by`,
				contextualIntro(V.PC, eventSlave, true),
			);
			r.addToLast(`." Before you can ask why ${heA} deemed this important enough news to draw your attention to, ${heA} continues, "They're not using ${him} or anything. Just look." ${HeA}`);
		} else {
			r.push(
				`It announces that a group of tourists have just entered the arcology, and seem unusually enthralled by`,
				contextualIntro(V.PC, eventSlave, true),
			);
			r.addToLast(`. Before you can ask why ${heA}'s bothering you with this, ${heA} continues, "A business opportunity may exist," and`);
		}
		r.push(`brings up a video feed.`);
		r.toParagraph();
		r.push(`${eventSlave.slaveName} is doing ${his} job, standing in an area of the arcology that's busy at this time of night,`);
		if (eventSlave.energy > 95) {
			r.push(`eagerly`);
		} else if (eventSlave.devotion > 95) {
			r.push(`diligently`);
		} else if (eventSlave.devotion > 20) {
			r.push(`obediently`);
		} else {
			r.push(`reluctantly`);
		}
		r.push(`showing off ${his}`);
		if (eventSlave.bellyPreg >= 1500) {
			r.push(`pregnant`);
		} else if (eventSlave.bellyImplant >= 1500) {
			r.push(`gravid`);
		} else if (eventSlave.bellyFluid >= 1500) {
			r.push(`bloated`);
		}
		if (App.Data.clothes.get(eventSlave.clothes).exposure >= 4) {
			r.push(`nude body`);
		} else {
			r.push(`body in ${his} ${App.Data.clothes.get(eventSlave.clothes).name.toLowerCase()}`);
		}
		r.push(`and flirting with passersby. Or ${he} would be, if ${he} weren't surrounded by a group of shame-faced college boys. They're very obviously rich, naïve, and inexperienced with both sex and the Free Cities, and their complete lack of confidence in approaching ${eventSlave.slaveName} make that clear.`);
		r.toParagraph();
		r.push(`"Can we just walk up to ${him} and ask ${him} out?" says one.`);
		r.toParagraph();
		r.push(`"Don't be <b>stupid,</b>" says another. "Like, look at ${him}, why would ${he} even touch any of us?`);
		if (V.pedo_mode === 0) {
			if (eventSlave.visualAge < 12) {
				r.push(`${He}'s just a little ${girl} – is that even legal?`);
			} else if (eventSlave.visualAge < 16) {
				r.push(`${He} looks kinda young... is this a setup or something?`);
			}
		}
		r.addToLast(`"`);
		r.toParagraph();
		if (eventSlave.bellyPreg >= 750000) {
			r.push(`"${He} looks like ${he} is going to burst, can't you see them pushing against ${him}? I bet ${he}'d love a soothing belly rub,"`);
		} else if (eventSlave.belly >= 750000) {
			r.push(`"${He} looks like ${he} could be pregnant with one of us,"`);
		} else if (eventSlave.boobs > 25000) {
			r.push(`"Those boobs are almost as big as me,"`);
		} else if (eventSlave.bellyPreg >= 450000) {
			r.push(`"My god, ${his} belly is <i>huge!</i> I can almost see inside,"`);
		} else if (eventSlave.belly >= 450000) {
			r.push(`"My god, ${his} belly is <i>huge!</i> What's in ${him}?"`);
		} else if (eventSlave.weight > 190) {
			r.push(`"I've never seen someone <i>that</i> fat before. I wonder what it feels like to fuck a ${girl} like ${him}?"`);
		} else if (eventSlave.butt > 10) {
			r.push(`"Check out that ass; I bet you could sit on it,"`);
		} else if (eventSlave.bellyFluid >= 5000) {
			r.push(`"Look at the way ${his} belly is wobbling, it's kinda sexy,"`);
		} else if (eventSlave.clit >= 3) {
			r.push(`"I'm kinda embarrassed... ${His} clit is bigger than my dick,"`);
		} else if (eventSlave.boobs > 5000) {
			r.push(`"Those boobs are bigger than my head,"`);
		} else if (eventSlave.belly >= 150000) {
			r.push(`"Oh my god, I didn't know a ${girl} could get <i>that</i> pregnant,"`);
		} else if (eventSlave.dick > 6) {
			r.push(`"I didn't even know ${girl}s could have dicks that big,"`);
		} else if (eventSlave.weight > 130) {
			r.push(`"${He} looks so soft and pillowy,"`);
		} else if (eventSlave.belly >= 1500) {
			r.push(`"Look at that belly, I bet ${he}'s pregnant,"`);
		} else if (eventSlave.dick > 3) {
			r.push(`"I wonder if ${he} could fuck someone with that dick,"`);
		} else if (eventSlave.anus > 2) {
			r.push(`"Holy shit, I can see ${his} asshole from here,"`);
		} else if (eventSlave.dick > 0) {
			r.push(`"Look, ${he}'s got a cute little dick,"`);
		} else if (eventSlave.visualAge > 35) {
			r.push(`"${He} looks like my mom, but hot,"`);
		} else if (eventSlave.lips > 40) {
			r.push(`"I didn't know ${girl}s could have lips like that,"`);
		} else if (eventSlave.face > 60) {
			r.push(`"${He}'s just so gorgeous,"`);
		} else if (eventSlave.intelligence+eventSlave.intelligenceImplant > 50) {
			r.push(`"${He} looks like ${he}'s really clever,"`);
		} else {
			r.push(`"${He} looks like ${he}'s down to fuck,"`);
		}
		r.push(`says a third, obviously smitten. "I'd give anything to have a night with ${him}."`);

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Let the boys be`, leave),
			new App.Events.Result(`Educate them in the role of a public servant`, educate),
			(canDoVaginal(eventSlave) && eventSlave.vagina !== 0) || (canDoAnal(eventSlave) && eventSlave.anus !== 0)
				? new App.Events.Result(`Instruct the slave to offer sex to the highest bidder`, instruct)
				: new App.Events.Result()
		]);

		function leave() {
			eventSlave.trust += 5;
			return `The circumstances are somewhat novel, but are ultimately not worthy of your time and attention. You do, however, direct ${V.assistant.name} to deploy more public servants to the area in a bid to direct the tourists' attention away from ${eventSlave.slaveName}. In time, the boys lose interest and wander off to leer at the other slaves suddenly populating the area. ${eventSlave.slaveName} <span class="trust inc">trusts</span> you more for disentangling ${him} from a potentially awkward situation.`;
		}

		function educate() {
			const r = new SpacedTextAccumulator();
			r.push(`You instruct ${V.assistant.name} to have ${eventSlave.slaveName} give the tourists a real Free Cities welcome, as befitting one of your public servants.`);
			r.toParagraph();
			r.push(`Some time later, you return to the video feed to see ${eventSlave.slaveName} giving each of the boys a hug goodbye. The boys reciprocate ${his} affection warmly, even as they try to ignore the fact that ${his} ${eventSlave.skin} face and chest are spattered with their cum. ${eventSlave.slaveName} has certainly given the tourists a crash course in Free Cities culture and <span class="reputation inc">improved your reputation</span> at the same time.`);
			seX(eventSlave, "oral", V.PC, "penetrative", 6);
			repX(1250, "event", eventSlave);
			r.toParagraph();
			return r.container();
		}

		function instruct() {
			const r = new SpacedTextAccumulator();
			r.push(`You instruct ${V.assistant.name} to have ${eventSlave.slaveName} offer ${his} body to the <span class="cash inc">highest bidder</span> among the eager tourists. Though the boys are initially taken aback by ${his} forwardness, a rapid yet red-faced bidding war takes place. As soon as the winning bid is decided, ${eventSlave.slaveName} sinks to ${his} knees in front of the winner and unbuckles his pants, soon taking his hardening member deep into ${his} mouth.`);
			r.toParagraph();
			r.push(`Some time later, you return to the video feed to see`);
			if (eventSlave.bellyPreg >= 750000) {
				r.push(`the lucky winner carefully taking ${eventSlave.slaveName} from behind as he gingerly caresses ${his} straining, squirming pregnancy.`);
			} else if (eventSlave.belly >= 750000) {
				r.push(`the lucky winner taking ${eventSlave.slaveName} from behind with his arms wrapped as far around ${his} ${belly} middle as possible.`);
			} else if (eventSlave.boobs > 25000) {
				r.push(`the lucky winner's head poking out from beneath pair of humongous breasts as ${eventSlave.slaveName} rides him.`);
			} else if (eventSlave.bellyPreg >= 450000) {
				r.push(`the lucky winner taking ${eventSlave.slaveName} almost tenderly in missionary, his arms wrapped around ${his} ${belly} pregnant belly.`);
			} else if (eventSlave.belly >= 450000) {
				r.push(`the lucky winner taking ${eventSlave.slaveName} roughly in missionary, his arms wrapped around ${his} massively distended belly.`);
			} else if (eventSlave.weight > 190) {
				r.push(`the lucky winner's head poking out from beneath ${eventSlave.slaveName}'s humongous belly as ${he} rides him.`);
			} else if (eventSlave.butt > 10) {
				r.push(`the lucky winner wrapping his arms around ${eventSlave.slaveName}'s massive ass as he struggles to get deep enough into it to penetrate ${him}.`);
			} else if (eventSlave.bellyFluid >= 5000) {
				r.push(`the lucky winner playfully jiggling ${eventSlave.slaveName}'s ${eventSlave.inflationType}-filled belly as ${he} rides him vigorously to give ${his} stomach that extra bounce for him.`);
			} else if (eventSlave.clit >= 3) {
				r.push(`the lucky winner gazing down at the clit rubbing against his stomach as ${eventSlave.slaveName} rides him.`);
			} else if (eventSlave.boobs > 5000) {
				r.push(`the lucky winner's head enveloped by a pair of massive breasts as ${eventSlave.slaveName} rides him.`);
			} else if (eventSlave.belly >= 150000) {
				if (eventSlave.bellyPreg > 0) {
					r.push(`the lucky winner taking ${eventSlave.slaveName} almost tenderly in missionary, his hands gently cradling ${his} ${belly} pregnant belly.`);
				} else {
					r.push(`the lucky winner taking ${eventSlave.slaveName} almost tenderly in missionary, his hands massaging ${his} ${belly} swollen belly.`);
				}
			} else if (eventSlave.dick > 6) {
				r.push(`the lucky winner gazing down at the lengthy cock slapping against his stomach as ${eventSlave.slaveName} rides him.`);
			} else if (eventSlave.weight > 130) {
				r.push(`the lucky winner groping ${eventSlave.slaveName}'s jiggling body as ${he} gently rides him.`);
			} else if (eventSlave.belly >= 1500) {
				if (eventSlave.bellyPreg > 0) {
					r.push(`the lucky winner taking ${eventSlave.slaveName} almost tenderly in missionary, his hands cradling ${his} pregnant belly.`);
				} else {
					r.push(`the lucky winner taking ${eventSlave.slaveName} almost tenderly in missionary, his hands massaging ${his} swollen belly.`);
				}
			} else if (eventSlave.dick > 3) {
				r.push(`the lucky winner gazing down at a cock slapping against his stomach as ${eventSlave.slaveName} rides him.`);
			} else if (eventSlave.anus > 2) {
				r.push(`the lucky winner pounding ass like it's his last day in the Free Cities.`);
			} else if (eventSlave.dick > 0) {
				r.push(`the lucky winner gingerly prodding the tiny cock slapping against his stomach as ${eventSlave.slaveName} rides him.`);
			} else if (eventSlave.visualAge > 35) {
				r.push(`the lucky winner double checking with ${eventSlave.slaveName} that ${he} isn't his mother, even as ${he} rides his cock and gives him pointers on his lack of technique.`);
			} else if (eventSlave.lips > 40) {
				r.push(`the lucky winner with a pair of plush lips wrapped around his cock, his hands gripping onto a ${eventSlave.hColor}-haired head for dear life as ${eventSlave.slaveName} sucks him dry.`);
			} else if (eventSlave.face > 60) {
				r.push(`the lucky winner staring in awe at the beautiful face of ${eventSlave.slaveName}, as ${he} rides him tenderly.`);
			} else if (eventSlave.intelligence+eventSlave.intelligenceImplant > 50) {
				r.push(`the lucky winner engaged in a lively debate with ${eventSlave.slaveName} as he takes ${him} from behind.`);
			} else {
				r.push(`the lucky winner taking ${eventSlave.slaveName} in every position he can think of, which is amusingly not very many at all.`);
			}
			r.toParagraph();
			r.push(`In the end, the boy sates his lust on ${eventSlave.slaveName} till he can't continue. His compatriots, having had their own voyeuristic fill, drag their overstimulated friend off and wander away in search of their accommodation.`);
			if (canDoVaginal(eventSlave)) {
				seX(eventSlave, "vaginal", "public", "penetrative", 5);
				if (canDoAnal(eventSlave)) {
					seX(eventSlave, "anal", "public", "penetrative", 2);
					if (eventSlave.anus === 0) {
						eventSlave.anus++;
					}
				}
				if (eventSlave.vagina === 0) {
					eventSlave.vagina++;
				}
			} else {
				seX(eventSlave, "anal", "public", "penetrative", 5);
				if (eventSlave.anus === 0) {
					eventSlave.anus++;
				}
			}
			if (eventSlave.eggType === "human" && canGetPregnant(eventSlave)) {
				knockMeUp(eventSlave, 15, 2, 0);
			}
			seX(eventSlave, "oral", "public", "penetrative", 2);
			cashX(2000, "event", eventSlave);
			r.toParagraph();
			return r.container();
		}
	}
};
