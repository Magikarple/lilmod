App.Events.RESiblingPlease = class RESiblingPlease extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seePreg !== 0,
			() => V.seeIncest !== 0, // daughter participates in sex scenes
			() => isFullyPotent(V.PC), // natural impregnation of slave's mother by potent PC; other paths are potentially possible but not written
			() => !FutureSocieties.isActive('FSRestart') // in a Eugenics arcology this event would require extra checks and special dialog that hasn't been written
		];
	}

	actorPrerequisites() {
		return [
			[ // requesting slave (daughter) is devoted, trusting, and relatively independent
				canTalk,
				canHear,
				canMove,
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.devotion > 50,
				s => s.trust > 50,
				hasAnyEyes, // for winking
			],
			[ // and her mother, who has only the one child, but is capable of bearing another for the PC
				s => s.ID === getSlave(this.actors[0]).mother,
				s => s.daughters === 1, // note that the requesting slave CAN have half-sisters on her *father's* side, so a male PC's children are eligible to ask for a full sibling
				this.impregCheck,
				s => s.womb.length === 0 // and not already expecting another child...no begging for superfet babies in this event
			]
		];
	}

	/** @param {App.Entity.SlaveState} slave */
	impregCheck(slave) {
		// we can't just ask for canGetPregnant here, because of contraceptives and chastity devices, which the PC can remove
		return isFertile(slave) && ((slave.ovaries === 1 && slave.vagina >= 0) || slave.mpreg === 1) && canBreed(slave, V.PC);
	}

	execute(node) {
		const [dau, mom] = this.actors.map(a => getSlave(a));

		const {He, His, he, him, his, himself, daughter} = getPronouns(dau);
		const {He2, he2, him2, his2, himself2} = getPronouns(mom).appendSuffix('2');
		const {title: Master} = getEnunciation(dau);

		App.Events.drawEventArt(node, [dau, mom]);

		const t = new SpacedTextAccumulator(node);
		t.push(`After you complete your weekly inspection of`);
		t.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, dau, true), `, your instincts tell you that the ${SlaveTitle(dau)} has something more on ${his} mind.`));
		t.push(`You take a moment to look at ${him}, ${canStand(dau) ? "standing" : "sitting"} there in front of your desk. ${He}'s devoted to you, willing to please you for the sake of pleasing you, rather than to avoid punishment or to make ${his} own life easier, and ${he} trusts you implicitly. With that in mind, you ask what's bothering ${him}.`);
		t.toParagraph();

		t.push(Spoken(dau, `"I... I was thinking about family, and mom. Can... can I have a little sister, ${Master}? We could do all sorts of things together!"`));
		t.push(`${He} winks seductively at you, and suddenly you're thinking about all the fun things you could do with them. And with a bit of patience it's definitely workable;`, contextualIntro(dau, mom, true), `could bear ${mom.counter.births > 0 ? `another` : `a`} child for you, without a doubt.`);
		t.toParagraph();

		App.Events.addResponses(node, [
			new App.Events.Result(`Bring ${mom.slaveName} up and impregnate ${him2} now`, impregMom, virginityCheck(mom)),
			this.impregCheck(dau) ? new App.Events.Result(`Give ${him} a daughter, instead of a sister`, impregDau, virginityCheck(dau)) : new App.Events.Result(),
			this.impregCheck(dau) ? new App.Events.Result(`Get them both pregnant, for extra family fun`, impregBoth, virginityCheck(mom, dau)) : new App.Events.Result(),
			new App.Events.Result(`${He}'s fine as an only child`, decline)
		]);

		/** @param {App.Entity.SlaveState[]} slaves */
		function virginityCheck(...slaves) {
			const vir = [];
			for (const slave of slaves) {
				if (canDoVaginal(slave) && slave.vagina === 0) {
					vir.push(`${slave.slaveName}'s virginity`);
				} else if (slave.mpreg === 1 && canDoAnal(slave) && slave.anus === 0) {
					vir.push(`${slave.slaveName}'s anal virginity`);
				}
			}
			if (vir.length > 0) {
				return `This option will take ${toSentence(vir)}.`;
			}
		}

		/** Prepare and actually fuck the mom
		 * @param {SpacedTextAccumulator} t
		 * @param {boolean} disobedient
		 */
		function fuckMom(t, disobedient) {
			const mobile = canMove(mom);
			if (!mobile) {
				t.push(`You have ${mom.slaveName} brought up to your office, stripped, and placed on the couch.`);
			} else {
				t.push(`You order ${mom.slaveName} to come up to your office immediately. ${He2} presents ${himself2} in a suitably short time, and strips when ordered, perhaps expecting a surprise inspection.`);
			}
			t.push(`You explain the situation briefly; upon`);
			if (canHear(mom)) {
				t.push(`hearing`);
			} else {
				t.push(`learning`);
			}
			t.push(`that you intend to impregnate ${him2}, ${he2}`);
			if (disobedient) {
				t.push(`starts to struggle.`);
				if (mobile) {
					t.push(`You throw ${him2} down on the couch, and at`);
				} else {
					 t.push(`At`);
				}
				t.push(`your word, ${dau.slaveName} holds ${him2} down so you can rape ${him2}. ${mom.slaveName}'s face registers shock at ${his2} ${daughter}'s betrayal, and replaces ${his2} struggling with sobbing.`);
			} else if (mom.fetish === "pregnancy") {
				t.push(`smiles broadly and begins to shed tears of joy as ${dau.slaveName} embraces ${him2}`);
				if (mobile) {
					t.push(`before guiding ${him2} to lay down on the couch`);
				}
				t.addToLast('.');
			} else if (mom.devotion > 50) {
				t.push(`seems eager to use ${his2} body to make you another slave, and ${dau.slaveName} a new sibling.`);
				if (mobile) {
					t.push(`${He2} lays on the couch, presenting ${his2} ${mom.mpreg ? 'ass' : 'vagina'} to you.`);
				}
			} else {
				if (mobile) {
					t.push(`compliantly lays on the couch awaiting the inevitable.`);
				} else {
					t.push(`indicates ${his2} compliance.`);
				}
			}

			t.toParagraph();

			if (!mom.mpreg && mom.chastityVagina) {
				mom.chastityVagina = 0;
				t.push(`You remove ${mom.slaveName}'s chastity belt and set it aside; it won't do to have it in the way right now.`);
			} else if (mom.mpreg && mom.chastityAnus) {
				mom.chastityAnus = 0;
				t.push(`You remove ${mom.slaveName}'s anal chastity device and set it aside; it won't do to have it in the way right now.`);
			}

			if (mom.vaginaLube === 2 && !mom.mpreg) {
				t.push(`Even though ${mom.slaveName}'s sopping cunt is already dripping on the couch, you order ${dau.slaveName} to use ${his} mouth to get ${him2} ready for you, and ${he} dives in eagerly.`);
				seX(dau, "oral", mom, "vaginal", 1);
			} else if (mom.mpreg) {
				t.push(`As you had directed, ${dau.slaveName} uses ${his} mouth and tongue to clean and lubricate the entrance to ${his} mother's anal womb as preparation.`);
				seX(dau, "oral", mom, "anal", 1);
			} else {
				t.push(`As you had directed, ${dau.slaveName} eagerly goes down on ${his} mother's cunt, to get ${him2} good and ready for your cock.`);
				seX(dau, "oral", mom, "vaginal", 1);
			}
			if (mom.devotion > 50) {
				t.push(`Knowing just how receptive ${his} mother is, ${dau.slaveName} straddles ${mom.slaveName}'s face and allows ${him2} to return the favor.`);
			}
			t.toParagraph();

			t.push(`You move over to the couch to do your part of the work knocking up ${mom.slaveName}.`);
			if (!mom.mpreg) {
				const vCheckText = VCheck.Vaginal(mom, 7);
				if (vCheckText) {
					t.push(vCheckText);
				} else {
					t.push(`You push yourself into ${his}`);
					if (mom.vagina > 2) {
						t.push("gaping");
					} else if (mom.vagina === 1) {
						t.push("tight");
					}
					t.push(`pussy, working away at ${him} vigorously.`);
				}
				knockMeUp(mom, 100, 0, -1);
			} else { // mpreg
				const vCheckText = VCheck.Anal(mom, 7);
				if (vCheckText) {
					t.push(vCheckText);
				} else {
					t.push(`You push yourself into ${his}`);
					if (mom.anus > 2) {
						t.push("gaping");
					} else if (mom.anus === 1) {
						t.push("tight");
					}
					t.push(`anus, working away at ${him} vigorously.`);
				}
				knockMeUp(mom, 100, 1, -1);
			}
			if (disobedient) {
				t.push(`Meanwhile, ${dau.slaveName} watches transfixed as ${he} holds ${mom.slaveName} in place.`);
			} else {
				const helping = [];
				if (V.PC.scrotum > 1 && V.PC.balls > 1) {
					helping.push("sucking your balls");
				}
				if (V.PC.boobs >= 300) {
					helping.push("massaging your breasts");
				}
				if (mom.dick > 0) {
					helping.push(`sliding ${his} hand up and down ${mom.slaveName}'s dick`);
				} else if (mom.clit > 0) {
					helping.push(`rubbing ${mom.slaveName}'s clit`);
				}
				helping.push("licking your nipples");
				if (helping.length < 2) {
					helping.push("so on");
				}
				t.push(`Meanwhile, ${dau.slaveName} "helps" any way ${he} can... running ${his} hands over both your bodies, ${toSentence(helping)}.`);
			}
			t.push(`Eventually, you come deep inside ${him2}, filling ${his2}${mom.mpreg ? ` anal` : ``} womb with your seed.`);
			t.toParagraph();
		}

		/** Actually fuck the daughter
		 * @param {SpacedTextAccumulator} t
		 */
		function fuckDau(t) {
			t.push(`You move over to a convenient leather chair and sit down, signalling to ${dau.slaveName} that ${he} should climb on top`);
			if (!dau.mpreg && dau.chastityVagina) {
				t.push(`after removing ${his} chastity belt, which you've unlocked`);
				dau.chastityVagina = 0;
			} else if (dau.mpreg && dau.chastityAnus) {
				t.push(`after removing ${his} anal chastity belt, which you've unlocked`);
				dau.chastityAnus = 0;
			}
			t.addToLast(`.`);
			t.push(`${He} rushes to obey, almost jumping on you in ${his} eagerness.`);
			if (!dau.mpreg) {
				const vCheckText = VCheck.Vaginal(dau, 7);
				if (vCheckText) {
					t.push(vCheckText);
				} else {
					t.push(`${He} faces you, sliding ${himself} down over your turgid cock, and gradually building up a rhythm.`);
				}
				knockMeUp(dau, 100, 0, -1);
			} else { // mpreg
				const vCheckText = VCheck.Anal(dau, 7);
				if (vCheckText) {
					t.push(vCheckText);
				} else {
					t.push(`${He} faces away from you,`);
					if (dau.anus > 2) {
						t.push(`sliding ${his} gaping`);
					} else if (dau.anus === 1) {
						t.push(`forcing ${his} tight`);
					} else {
						t.push(`pushing ${his} practiced`);
					}
					t.push(`butt down over your turgid cock, and gradually building up a rhythm.`);
				}
				knockMeUp(dau, 100, 1, -1);
			}
			t.push(`It doesn't take long before you explode within ${him}. ${He} kisses you before climbing off, your seed dripping down ${his} leg.`);
			t.toParagraph();
		}

		function impregMom() {
			const t = new SpacedTextAccumulator();

			t.push(`You explain to ${dau.slaveName} that you'll want ${his} help, and ${he} agrees eagerly.`);
			t.toParagraph();

			const disobedient = (disobedience(mom) > random(0, 100));
			fuckMom(t, disobedient);

			if (mom.preg === -1) {
				t.push(`You know it probably won't take today, but you've already ordered ${V.assistant.name} to discontinue ${his2} contraceptive regimen, and you'll be repeating this ritual all week. ${He2}'s <span class="pregnant">bound to end up pregnant.</span>`);
			} else {
				t.push(`You won't know if it's taken right away, but you'll be repeating this ritual all week, so ${he2}'s <span class="pregnant">going to end up pregnant.</span>`);
			}
			t.toParagraph();

			dau.devotion += 2;
			dau.trust += 5;
			t.push(`${dau.slaveName} is <span class="devotion inc">excited</span> to have a sibling on the way and <span class="trust inc">grateful</span> that you fulfilled ${his} request,`);
			if (disobedient) {
				mom.devotion -= 4;
				mom.trust -= 4;
				t.push(`but ${mom.slaveName} <span class="devotion dec">hates that it's yours</span> and is <span class="trust dec">terrified</span> of your control over ${his2} body.`);
			} else if (mom.devotion > 50 || mom.fetish === "pregnancy") {
				mom.devotion += 4;
				t.push(`and ${mom.slaveName} is <span class="devotion inc">even more excited</span> that ${he2} gets to carry it.`);
			} else {
				mom.devotion += 1;
				mom.trust -= 1;
				t.push(`and while ${mom.slaveName} <span class="trust dec">fears your arbitrary control of ${his2} body,</span> ${he2} feels <span class="devotion inc">closer to you</span> because ${he2}'s carrying the child that ${dau.slaveName} wanted so badly.`);
			}
			t.toParagraph();

			return t.container();
		}

		function impregDau() {
			const t = new SpacedTextAccumulator();

			t.push(`You pause for a moment. You could, of course, grant ${his} request, but you have a better idea. You inform ${him} that ${he}'ll soon have a daughter of ${his} own, so ${he} won't be needing a baby sister.`);
			if (dau.intelligence + dau.intelligenceImplant > 50) {
				t.push(`${He}'s a sharp slave, and immediately grasps your meaning. ${He}`);
			} else {
				t.push(`It takes ${him} a couple of seconds before ${he} grasps your meaning. When ${he} does, ${he}`);
			}
			t.push(`grins and ${hasBothArms(dau) ? `clasps ${his} hands in front of ${himself}, bouncing` : `bounces`} eagerly.`);
			t.push(Spoken(dau, `"Oh, that's even better, ${Master}! Can we do it now?"`));
			t.toParagraph();

			fuckDau(t);

			if (dau.preg === -1) {
				t.push(`You know it probably won't take today, but you've already ordered ${V.assistant.name} to discontinue ${his} contraceptive regimen, and you'll be repeating this ritual all week. ${He}'s <span class="pregnant">bound to end up pregnant.</span>`);
			} else {
				t.push(`You won't know if it's taken right away, but you'll be repeating this ritual all week, so ${he}'s <span class="pregnant">going to end up pregnant.</span>`);
			}
			t.toParagraph();

			dau.devotion += 5;
			dau.trust += 5;
			t.push(`${dau.slaveName} is <span class="devotion inc">overjoyed</span> to be carrying a child, and <span class="trust inc">grateful</span> that you understood the heart of ${his} request, even if you didn't fulfil it exactly the way ${he} was originally hoping.`);
			if (dau.fetish === "pregnancy") {
				if (!dau.fetishKnown) {
					t.push(`In fact, ${he}'s <em>so</em> excited that you've begun to understand ${his} sexuality better; ${he}'s a <span class="fetish gain">pregnancy fetishist!</span>`);
					dau.fetishKnown = 1;
					if (dau.fetishStrength < 90) {
						dau.fetishStrength += 10;
					}
				} else if (dau.fetishStrength < 90) {
					t.push(`${His} pregnancy fetish <span class="fetish inc">has strengthened</span> since you put a new baby in ${him}.`);
					dau.fetishStrength += 10;
				}
			} else if (fetishChangeChance(dau) > jsRandom(0, 100)) {
				t.push(`This week has a lasting impact on ${dau.slaveName}; ${he} starts to develop an ongoing <span class="fetish gain">pregnancy fetish.</span>`);
				dau.fetish = "pregnancy";
				dau.fetishKnown = 1;
				dau.fetishStrength = 20;
			}
			t.toParagraph();

			return t.container();
		}

		function impregBoth() {
			const t = new SpacedTextAccumulator();

			/* Por qué no los dos? */

			t.push(`You explain to ${dau.slaveName} that you're more than willing to get ${mom.slaveName} pregnant, but you want ${him} to carry a child for you as well. ${He} grins and ${hasBothArms(dau) ? `clasps ${his} hands in front of ${himself}, bouncing` : `bounces`} eagerly.`);
			t.push(Spoken(dau, `"When can we start, ${Master}?"`));
			t.push(`You spend a few moments letting ${him} know what you expect from ${him} during the upcoming session; ${he} knows what's coming, but ${his} mother doesn't yet.`);
			t.toParagraph();

			const disobedient = (disobedience(mom) > random(0, 100));
			fuckMom(t, disobedient);

			if (!disobedient) {
				t.push(`You decide to let ${mom.slaveName} watch while you impregnate ${his2} ${daughter}.`);
				if (mom.devotion > 50 || mom.energy > 80) {
					t.push(`${He2} sits up a bit, beginning to lazily masturbate as you get to work.`);
				}
			} else {
				t.push(`You order ${mom.slaveName} to stay and watch while you impregnate ${his2} ${daughter}.`);
			}
			t.toParagraph();

			fuckDau(t);

			if (dau.preg === -1 || mom.preg === -1) {
				t.push(`You've already ordered ${V.assistant.name} to discontinue their contraceptive regimens, and you're`);
			} else {
				t.push(`You won't know if they've taken right away, but you're`);
			}
			t.push(`sure that repeating this ritual all week will result in <span class="pregnant">both of them getting pregnant</span> with your children.`);
			t.toParagraph();

			dau.devotion += 2;
			dau.trust += 5;
			t.push(`${dau.slaveName} is <span class="devotion inc">excited</span> to have both a sibling and a child on the way and <span class="trust inc">grateful</span> that you fulfilled ${his} request,`);
			if (disobedient) {
				mom.devotion -= 5;
				mom.trust -= 8;
				t.push(`but ${mom.slaveName} <span class="devotion dec">hates that you're the father</span> of both children and is <span class="trust dec">terrified</span> of your control over ${his2} and ${his2} ${daughter}'s bodies.`);
			} else if (mom.devotion > 50 || mom.fetish === "pregnancy") {
				mom.devotion += 4;
				mom.trust += 2;
				t.push(`while ${mom.slaveName} is <span class="devotion inc">just as excited</span> about ${his2} upcoming child and grandchild, and <span class="trust inc">hopes and trusts</span> you'll allow ${him2} to provide good advice for ${his2} pregnant ${daughter}.`);
			} else {
				mom.trust -= 4;
				t.push(`but ${mom.slaveName} <span class="trust dec">fears your arbitrary control</span> of ${his2} and ${his2} ${daughter}'s bodies.`);
			}
			t.toParagraph();

			return t.container();
		}

		function decline() {
			dau.trust += 2;
			return [`You tell ${dau.slaveName} that you're satisfied with ${his} service for you as an only child, and you aren't going to knock up ${mom.slaveName}${dau.father === -1 ? " again" : ""} just to make a sibling for ${him}. Like the good slave ${he} is, ${he} accepts your decision and <span class="trust inc">appreciates</span> your attention.`];
		}
	}
};
