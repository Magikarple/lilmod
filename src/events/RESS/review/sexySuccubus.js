// cSpell:ignore mmmmh, ssstarving, thtarving

App.Events.RESSSexySuccubus = class RESSSexySuccubus extends App.Events.BaseEvent {
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
				s => s.clothes === "a succubus outfit",
				s => s.devotion > 20,
				s => s.trust > 20,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;
		const {heP, himP, womanP, hisP} = getPronouns(PC).appendSuffix("P");

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(
			`You cross paths with`,
			contextualIntro(PC, eventSlave, true),
			`as ${he} moves from the living area to ${eventSlave.assignment}, just starting ${his} day. ${He}'s full of energy, and ${his} succubus outfit is delightful. ${He}`
		);
		if (canSee(eventSlave)) {
			r.push(`sees your glance`);
		} else {
			r.push(`recognizes your whistle`);
		}
		r.push(`and greets you with a`);
		if (canSee(eventSlave)) {
			r.push(`wicked glint in ${his} eye,`);
		} else {
			r.push(`wicked smirk on ${his} face,`);
		}
		r.push(`bowing a bit to show off ${his}`);
		if (eventSlave.boobs > 6000) {
			r.push(`bare, inhumanly large breasts`);
		} else if (eventSlave.lactation > 0) {
			r.push(`bare udders, heavy with ${milkFlavor(eventSlave)}milk`);
		} else if (eventSlave.boobsImplant > 0) {
			r.push(`naked fake tits`);
		} else if (eventSlave.boobs > 800) {
			r.push(`heavy, naked breasts`);
		} else if (eventSlave.boobs > 300) {
			r.push(`naked little tits`);
		} else {
			r.push(`pretty chest`);
		}
		r.push(`and then continuing towards you with a pirouette. ${His} tail bounces flirtily, holding the back of ${his} skirt up to show off`);
		if (eventSlave.butt > 8) {
			r.push(`${his} absurdly wide bottom.`);
		} else if (eventSlave.analArea > 3) {
			r.push(`the broad area of puckered skin around ${his} slutty asspussy.`);
		} else if (eventSlave.buttImplant > 0) {
			r.push(`${his} butt implants.`);
		} else if (eventSlave.butt > 5) {
			r.push(`${his} big butt.`);
		} else if (eventSlave.anus > 1) {
			r.push(`a hint of ${his} asshole, which ${his} cute buttocks don't quite conceal.`);
		} else {
			r.push(`${his} cute bottom.`);
		}
		App.Events.addParagraph(node, r);

		r = [];
		r.push(`${He} looks like`);
		if (eventSlave.bellyPreg >= 1500 || eventSlave.bellyImplant >= 1500) {
			r.push(`a lusty, pregnant, hungry`);
		} else if (eventSlave.bellyFluid >= 1500) {
			r.push(`a gluttonous, over-fed but still hungry`);
		} else if (eventSlave.height > 180) {
			r.push(`an imposing, hungry`);
		} else if (eventSlave.muscles > 30) {
			r.push(`a muscular, hungry`);
		} else if (eventSlave.weight > 10) {
			r.push(`a well-fed but still hungry`);
		} else if (eventSlave.energy > 95) {
			r.push(`a desperately hungry`);
		} else {
			r.push(`a cute, hungry little`);
		}
		r.push(`sex demon, and you tell ${him} so.`);
		if (eventSlave.intelligence > 50) {
			r.push(`The clever ${girl} knows all about succubi.`);
		} else if (eventSlave.intelligenceImplant >= 15) {
			r.push(`${He}'s been taught the basics about succubi.`);
		} else {
			r.push(`${He} quickly searches ${his} memory for the basic information about succubi that came with ${his} outfit.`);
		}
		if (SlaveStatsChecker.checkForLisp(eventSlave)) {
			r.push(`"Oh ${Master}, I'm thtarving," ${he} lisps,`);
		} else {
			r.push(`"Oh ${Master}, I'm ssstarving," ${he} moans,`);
		}
		r.push(`running ${his} tongue over ${his}`);
		if (eventSlave.lips > 40) {
			r.push(`whorish`);
		} else if (eventSlave.lips > 20) {
			r.push(`plush`);
		}
		r.push(`lips and sticking out ${his} chest to present ${his} boobs even more obviously.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Let ${him} eat`, eat),
			(canDoVaginal(eventSlave) && PC.dick !== 0)
				? new App.Events.Result(`Feed ${him}`, feed, (eventSlave.vagina === 0) ?`This option will take ${his} virginity` : null)
				: new App.Events.Result(),
			(canDoAnal(eventSlave) && eventSlave.anus > 0 && PC.dick !== 0)
				? new App.Events.Result(`Fuck ${him} without feeding ${him}`, fuck, (eventSlave.vagina === 0) ?`This option will take ${his} virginity` : null)
				: new App.Events.Result(),
		]);

		function eat() {
			r = [];
			r.push(`You tell ${him} ${he}'s a good little succubus, and you're going to let ${him} feed. ${He} knows exactly what you mean, and`);
			if (eventSlave.belly >= 300000) {
				r.push(`leans onto ${his} ${belly} stomach`);
			} else {
				if (eventSlave.belly >= 5000) {
					r.push(`gently lowers ${himself}`);
				} else {
					r.push(`gets`);
				}
				r.push(`to ${his} knees`);
			}
			r.push(`quickly, pressing ${him} ${eventSlave.nipples} nipples against your thighs and grasping your hips to give ${himself} leverage for some very aggressive oral. After`);
			if (PC.dick !== 0) {
				r.push(`a couple of lush sucks at each of your balls`);
				if (PC.vagina !== -1) {
					r.push(`and some eager nuzzling of your pussylips`);
				}
				r.push(r.pop() + `, ${he} moves straight to a hard blowjob, deepthroating your cock and almost ramming ${his} head against you.`);
				if (PC.vagina !== -1) {
					r.push(`${He} keeps ${his} tongue stuck out, and whenever ${he} gets you fully hilted, ${he} manages to reach your pussylips with it.`);
				}
				r.push(`${He}`);
				if (eventSlave.fetish === "cumslut") {
					r.push(`doesn't have to pretend to be starving for your cum.`);
				} else {
					r.push(`does a good job of acting like ${he}'s authentically starving for your cum.`);
				}
				r.push(`${He} groans with satisfaction when you blow your load down ${his} gullet,`);
			} else {
				r.push(`nuzzling ${his} nose against your moist cunt, ${he} starts to eat you out like ${he}'s starving, sparing no time for subtlety, lapping up your female juices with evident relish. You run your fingers through ${his} ${eventSlave.slaveName} hair, telling ${him} ${he}'ll have to survive on pussyjuice. ${He} replies, but you hold ${his} head hard against you as ${he} does, turning whatever ${he} says into an unintelligible, delectable mumbling into your womanhood. ${He} groans with satisfaction when you stiffen with orgasm, giving ${him} a final gush of girlcum,`);
			}
			r.push(`and`);
			if (eventSlave.belly >= 5000) {
				r.push(`hefts ${his}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`gravid`);
				} else {
					r.push(`bloated`);
				}
				r.push(`bulk up,`);
			} else {
				r.push(`gets to ${his} feet,`);
			}
			r.push(`licking ${his} lips and patting ${his} ${belly} stomach.`);
			if (eventSlave.belly >= 1500) {
				r.push(
					Spoken(eventSlave, `"That was such a big meal ${Master}, look how full it made me!"`),
					`${He} teases, pretending ${his}`
				);
				if (eventSlave.bellyPreg >= 1500) {
					r.push(`gravid belly is filled with your fluids.`);
				} else if (eventSlave.bellyImplant >= 1500) {
					r.push(`distended belly is filled with your fluids.`);
				} else {
					r.push(`wobbling, ${eventSlave.inflationType}-filled belly is filled with your fluids.`);
				}
				if (PC.balls >= 30) {
					r.push(`Seeing as ${he} took the entirety of your inhuman load, there is some truth to ${his} words.`);
				}
			}
			r.push(`${He}'s obviously <span class="trust inc">becoming more comfortable</span> playing the part of a vampiric sex`);
			if (eventSlave.fetish === "cumslut" && eventSlave.fetishStrength > 95) {
				r.push(`demon, and it's a role the incorrigible cumslut <span class="devotion inc">loves.</span>`);
				eventSlave.devotion += 2;
			} else if (eventSlave.fetish === "cumslut") {
				r.push(`demon, and it's a role that <span class="fetish inc">reinforces ${his} oral fixation.</span>`);
				eventSlave.fetishStrength += 4;
			} else if ((eventSlave.fetishStrength <= 95 || eventSlave.fetishKnown === 0) && random(0, 1) === 0) {
				r.push(`demon, and the role <span class="fetish gain">focuses ${his} attention on ${his} mouth.</span>`);
				eventSlave.fetishStrength = 10;
				eventSlave.fetishKnown = 1;
				eventSlave.fetish = "cumslut";
			} else {
				r.push(`demon.`);
			}
			eventSlave.trust += 4;
			seX(eventSlave, "oral", PC, "penetrative");
			return r;
		}

		function feed() {
			r = [];
			r.push(`You tell ${him} ${he}'s a good little succubus, and you're going to feed ${him}.`);
			if (eventSlave.boobs > 2000) {
				r.push(`Reaching up under ${his} breasts for the top edge of ${his} outfit`);
			} else {
				r.push(`Grabbing ${his} outfit's top edge`);
			}
			r.push(`and seizing ${him} behind a knee with your other hand, you sling ${him} across`);
			if (eventSlave.belly >= 300000 || eventSlave.weight > 190) {
				r.push(`an unfortunate nearby tabletop. Once the table finishes its creaking and promises to hold ${his} weight, ${he}`);
			} else {
				r.push(`a convenient tabletop nearby. ${He}`);
			}
			r.push(`spreads ${his} legs for you, smiling with anticipation, ${his}`);
			if (eventSlave.vaginaLube > 0) {
				r.push(`cunt already soaking wet.`);
			} else if (eventSlave.labia > 0) {
				r.push(`prominent petals swollen with arousal.`);
			} else if (eventSlave.clit > 0) {
				r.push(`big bitch button stiff with arousal.`);
			} else {
				r.push(`cunt flushing with arousal.`);
			}
			r.push(`${He} reaches down around ${his} own ass and spreads ${his} pussy for you, only releasing ${his} fingertip grip on ${his} labia when ${he} feels you hilt yourself inside ${his}`);
			if (eventSlave.vagina > 2) {
				r.push(`cavernous`);
			} else if (eventSlave.vagina > 1) {
				r.push(`comfortable`);
			} else if (eventSlave.vagina > 0) {
				r.push(`caressing`);
			} else {
				r.push(`needy`);
			}
			r.push(`channel.`);
			r.push(VCheck.Vaginal(eventSlave, 1));
			r.push(`You're here to rut, not make love, and you give it to ${him} hard, forcing`);
			if (eventSlave.voice >= 3) {
				r.push(`high squeals`);
			} else {
				r.push(`animal grunts`);
			}
			r.push(`out of ${him}. ${He} climaxes strongly, and the glorious feeling finishes you as well, bringing rope after rope of your cum jetting into ${him}. ${He} groans at the feeling, and as ${he}`);
			if (eventSlave.belly >= 5000 || eventSlave.weight > 190) {
				r.push(`slowly`);
			}
			r.push(`gets to ${his} feet ${he} uses a hand to transfer a`);
			if (canTaste(eventSlave)) {
				r.push(`taste`);
			} else {
				r.push(`bit`);
			}
			r.push(`of the mixture of your seed and`);
			if (PC.vagina !== -1) {
				r.push(`both of your`);
			} else {
				r.push(`${his}`);
			}
			r.push(`pussyjuice to ${his} mouth.`);
			if (eventSlave.belly >= 750000) {
				r.push(
					Spoken(eventSlave, `"Oh ${Master}! I'm swelling so fast with imps for you! There's so many in me... Oh god, it feels like I'm going to burst! So many... ${Master} sure is potent! I hope ${heP} can handle them all!"`),
					`${He} groans, cradling ${his} ${belly} belly and pretending to be forced to the ground by ${his} pregnancy growing ever larger.`,
					Spoken(eventSlave, `"${Master}! They won't stop! Oh... So full... I can't stop conceiving!"`),
					`${He} rolls onto ${his} back and clutches ${his} absurd stomach.`,
					Spoken(eventSlave, `"So tight! So full! So Good! I need more! Oh, ${Master}..."`),
					`${He} may be getting a little too into the fantasy.`
				);
				if (eventSlave.broodmother === 2 && eventSlave.preg >= 36) {
					r.push(
						`A gush of fluid flows from ${his} pussy, snapping ${him} out of ${his} roleplay.`,
						Spoken(eventSlave, `"${Master}! I need... One's coming now!"`),
						`You rub ${his} contracting stomach, enjoying the feeling of the life within shifting to take advantage of the free space. You sigh and lean down, the vessel of your spawn needs help after pinning ${himself} in such a compromising position. Holding ${his} belly clear of ${his} crotch, you watch ${him} steadily push out ${his} child before spasming with orgasm and freeing it effortlessly into the world. After collecting it for a servant to handle, you help the exhausted ${girl} back to ${his} feet. ${He} thanks you sincerely for the assist before going to clean ${himself} up. You barely have time to turn away before another splash catches your attention.`,
						Spoken(eventSlave, `"${Master}... Another's, mmmmh, coming..."`)
					);
				}
			} else if (eventSlave.belly >= 600000) {
				r.push(
					Spoken(eventSlave, `"Oh ${Master}! I'm swelling so fast with imps for you! There's so many in me... Oh god, it feels like I'm going to burst! So many... ${Master} sure is potent! I hope ${heP} can handle them all!"`),
					`${He} teases, cradling ${his} ${belly} belly and pretending to be forced to the ground by ${his} pregnancy growing ever larger.`
				);
			} else if (eventSlave.belly >= 450000) {
				r.push(
					Spoken(eventSlave, `"Oh ${Master}! I'm swelling so fast with imps for you! There's so many in me... Oh god, it feels so good!! So many... ${Master} sure is potent! I hope ${heP} can handle them all!"`),
					`${He} teases, cradling ${his} ${belly} belly and pretending to be forced to the ground by ${his} pregnancy growing ever larger.`
				);
			} else if (eventSlave.belly >= 300000) {
				r.push(
					Spoken(eventSlave, `"Oh ${Master}! I'm swelling so fast with imps for you! There's so many in me... Oh god, it feels so good! I feel them moving! They're ready to come out ${Master}!"`),
					`${He} teases, cradling ${his} ${belly} belly and pretending it just grew that huge.`
				);
			} else if (eventSlave.belly >= 150000) {
				r.push(
					Spoken(eventSlave, `"Oh ${Master}! I'm swelling so fast with imps for you! There's so many in me, look how big I'm getting!"`),
					`${He} teases, cradling ${his} ${belly} belly and pretending it just rapidly became that large.`
				);
			} else if (eventSlave.belly >= 5000) {
				r.push(
					Spoken(eventSlave, `"Oh ${Master}! I'm swelling so fast with imps for you!"`),
					`${He} teases, cradling ${his} ${belly} belly and pretending it just grew that big.`
				);
			} else {
				r.push(
					Spoken(eventSlave, `"Oh ${Master}! I feel it! Your seed is being devoured by my eggs! I can't wait to see how happy they make you!"`),
					`${He} teases, rubbing ${his} belly and pretending to conceive.`
				);
			}
			r.push(`${He}'s obviously <span class="trust inc">becoming more comfortable</span> playing the part of a sex demon whose hunger knows no`);
			eventSlave.trust += 4;
			if (eventSlave.fetish === "pregnancy" && eventSlave.fetishStrength > 95) {
				r.push(`end, and it's a role the pregnancy fetishist <span class="devotion inc">loves.</span>`);
				eventSlave.devotion += 2;
			} else if (eventSlave.fetish === "pregnancy") {
				r.push(`end, and it's a role that <span class="fetish inc">reinforces ${his} love of insemination.</span>`);
				eventSlave.fetishStrength += 4;
			} else if ((eventSlave.fetishStrength <= 95 || eventSlave.fetishKnown === 0) && random(0, 1) === 0) {
				r.push(`end, and the role <span class="fetish gain">focuses ${his} attention on insemination.</span>`);
				eventSlave.fetishStrength = 10;
				eventSlave.fetishKnown = 1;
				eventSlave.fetish = "pregnancy";
			} else {
				r.push(`end.`);
			}
			return r;
		}

		function fuck() {
			const frag = document.createDocumentFragment();
			r = [];
			r.push(`You tell ${him} ${he}'s a good little succubus. Thinking ${he} understands, ${he}`);
			if (eventSlave.vagina > 0 && canDoVaginal(eventSlave)) {
				r.push(`turns and hugs the nearest wall,`);
				if (eventSlave.belly >= 300000) {
					r.push(`sliding ${his} ${belly} belly down it until it parts ${his} legs. ${He} shuffles onto it to offer you ${his} needy cunt.`);
				} else {
					r.push(`going up on tiptoe and cocking ${his} hips to offer you ${his} needy cunt.`);
				}
				r.push(`${He} moans as your dick`);
				if (eventSlave.vagina > 2) {
					r.push(`enters ${his} big cunt.`);
				} else if (eventSlave.vagina > 1) {
					r.push(`fills ${his} wet cunt.`);
				} else {
					r.push(`slides slowly inside ${his} tight cunt.`);
				}
				r.push(`As you fuck ${him}, you ask ${him} how succubi feed. "W-well," ${he} gasps, struggling to gather ${his} wits,`);
			} else {
				if (eventSlave.belly >= 300000) {
					r.push(`leans onto ${his} ${belly} belly`);
				} else {
					r.push(`gets down on ${his} knees`);
				}
				r.push(`and starts to suck you off. ${He} deepthroats you eagerly, stretching to tickle your balls with ${his} tongue as ${he} gets you all the way in, and then shifting a hand to roll them around as ${he} sucks. As ${he} blows you, you ask ${him} how succubi feed. "Well," ${he} gasps, popping your dickhead free of ${his} mouth and replacing the sucking with a stroking hand,`);
			}
			r.push(Spoken(eventSlave, `"${Master}, they can eat a ${womanP}'s essence by swallowing ${hisP} cum or getting ${himP} to ejaculate inside their pussies."`));
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(
				`You ask ${him} whether ${he} would like to feed off you.`,
				Spoken(eventSlave, `"Oh yes ${Master}, please. Please feed me,"`),
				`${he} begs. Too bad, you tell ${him}; ${he} gets to go hungry. After all, succubi can't feed using their butts.`
			);
			if (eventSlave.vagina > 0 && canDoVaginal(eventSlave)) {
				r.push(`You withdraw from ${his} cunt and stuff your cock up ${his} ass without pausing or softening your thrusting at all.`);
			} else {
				r.push(`You pull ${him} to ${his} feet by the hair, spin ${him} around, shove ${him} up against the wall, and stuff your cock up ${his} ass.`);
			}
			if (eventSlave.anus > 2) {
				r.push(`It's not like ${his} experienced butt can't take an assraping, but`);
			} else if (eventSlave.anus > 1) {
				r.push(`${His} practiced ass relaxes and accommodates your dick, but`);
			} else {
				r.push(`${His} tight asshole spasms with pain as it stretches to accommodate you, and`);
			}
			r.push(`${he} whines at your sudden aggression, wiggling within your dominating grip. You fill ${his} ass with cum as ${he} struggles, still playing ${his} part, begging you not to cum in ${his} bottom, since succubi can't live on buttsex.`);
			eventSlave.trust += 4;
			if (eventSlave.fetish === Fetish.SUBMISSIVE && eventSlave.fetishStrength > 95) {
				r.push(`It's a role the submissive slut <span class="devotion inc">loves.</span>`);
				eventSlave.devotion += 2;
			} else if (eventSlave.fetish === Fetish.SUBMISSIVE) {
				r.push(`It's a role that <span class="fetish inc">reinforces ${his} submissive streak.</span>`);
				eventSlave.fetishStrength += 4;
			} else if ((eventSlave.fetishStrength <= 95 || eventSlave.fetishKnown === 0) && random(0, 1) === 0) {
				r.push(`The role <span class="fetish gain">focuses ${his} attention on submission.</span>`);
				eventSlave.fetishStrength = 10;
				eventSlave.fetishKnown = 1;
				eventSlave.fetish = "submissive";
			} else {
				r.push(`${He} <span class="devotion inc">plays the role well.</span>`);
			}
			if (eventSlave.vagina > 0 && canDoVaginal(eventSlave)) {
				seX(eventSlave, "vaginal", PC, "penetrative");
			} else {
				seX(eventSlave, "oral", PC, "penetrative");
			}
			r.push(VCheck.Anal(eventSlave, 1));
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
