App.Events.RESSLikeMe = class RESSLikeMe extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => s.trust <= 20,
				s => s.trust >= -75,
				s => s.devotion <= 30,
				s => s.devotion >= -20,
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

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(
			App.UI.DOM.slaveDescriptionDialog(eventSlave),
			`appears at the door of your office, looking frightened. ${He} takes one hesitant step in and stops, wavering, ${his} hand balled into fists and ${his} lower lip caught behind ${his} teeth. The ${SlaveTitle(eventSlave)} is getting used to ${his} place as chattel, but ${he} isn't sure of ${himself} yet. After a few moments, it becomes obvious that ${he}'s lost whatever mental momentum propelled ${him} to come in here, and can't muster the courage to back out, either. You rescue ${him} by politely but firmly ordering ${him} to tell you why ${he}'s here. After two false starts, ${he}`
		);
		if (!canTalk(eventSlave)) {
			r.push(`uses shaky hands to ask you to fuck ${him}.`);
		} else {
			r.push(
				Spoken(eventSlave, `"P-please fuck me, ${Master},"`),
				`${he} chokes out.`
			);
		}
		r.push(`To go by ${his} behavior, the likelihood that ${he}'s actually eager to`);
		if (PC.dick === 0) {
			r.push(`eat pussy,`);
		} else {
			r.push(`take a dick,`);
		}
		r.push(`never mind yours, is vanishingly small.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Fuck ${him}`, fuck, virginityWarning()),
			new App.Events.Result(`Rape ${him}`, rape, virginityWarning()),
			new App.Events.Result(`Get the truth out of ${him}`, truth),
		]);

		function virginityWarning(){
			if ((eventSlave.anus === 0 || eventSlave.vagina === 0) && PC.dick !== 0) {
				return `This option will take ${his} virginity`;
			}
		}

		function fuck() {
			r = [];
			r.push(`${He} asked for it, and ${he}'ll get it. You get to your`);
			if (eventSlave.chastityVagina || !canDoAnal(eventSlave)) {
				r.push(`feet, unhook ${his} chastity,`);
			} else {
				r.push(`feet`);
			}
			r.push(`and snap your fingers, pointing`);
			if (PC.dick === 0) {
				r.push(`at the floor in front of you`);
				if (!canSee(eventSlave)) {
					r.push(`along with a commanding "floor"`);
				}
				r.push(r.pop() + `. ${He} hurries over, but hesitates for an instant, unsure of what to do next. You help ${him} understand by grabbing ${him} on either side of ${his} neck and`);
				if (eventSlave.belly >= 300000) {
					r.push(`pulling onto ${his} ${belly} stomach`);
				} else {
					r.push(`shoving ${him} down to kneel at your feet`);
				}
				r.push(`with ${his} face`);
				if (PC.belly >= 5000) {
					r.push(`crammed under your pregnant belly, level with your cunt.`);
				} else {
					r.push(`level with your cunt.`);
				}
				r.push(`One of your hands shifts behind ${his} head and tilts it back as you step forward, grinding against ${his} mouth. ${He} struggles involuntarily, but then perceptibly recollects ${himself}, relaxes, and starts to eat you out. Whatever internal turmoil ${he}'s working through, you don't care, and neither does your pussy. When you climax and release ${him}, ${he} stumbles off, looking oddly proud of ${himself}. It seems ${he} got something out of that: <span class="trust inc">a confidence boost,</span> at least.`);
			} else {
				r.push(`at the couch next to the desk`);
				if (!canSee(eventSlave)) {
					r.push(`along with a commanding "couch"`);
				}
				r.push(r.pop() + `. ${He} hurries over and`);
				if (eventSlave.belly >= 5000) {
					r.push(`gently eases ${his}`);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnant`);
					} else {
						r.push(`swollen`);
					}
					r.push(`body to the ground,`);
				} else {
					r.push(`kneels,`);
				}
				r.push(`${his} rear pointing at you, but hesitates for an instant, unsure of what to do next. You help ${him} understand by shoving ${him} down so ${his} collarbone is resting on the back of the couch and ${his} ass is at just the right height.`);
				if (PC.vagina !== -1) {
					r.push(`You ensure that you're fully hard and get ${him} in the right frame of mind by grinding the pussy beneath your dick against ${him}.`);
				}
				r.push(`You fuck`);
				if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
					r.push(`${his} pussy and then ${his} ass in quick succession, plundering ${his} holes without much regard for ${his} pleasure.`);
					r.push(VCheck.Both(eventSlave, 1));
					r.push(`${He} gasps and bucks at all the right parts, and even manages to moan almost authentically when you blow your load up ${his} butt.`);
				} else if (canDoVaginal(eventSlave)) {
					r.push(`${his} pussy hard, without much regard for ${his} pleasure.`);
					r.push(VCheck.Vaginal(eventSlave, 1));
					r.push(`${He} gasps and bucks at all the right parts, and even manages to moan almost authentically when you blow your load up deep inside ${him}.`);
				} else { // FIXME: invalid for when wearing combined chastity belt. Chastity is mentioned to be removed further up.
					r.push(`${his} ass hard, without cruelty but without much concern for ${his} pleasure, either.`);
					r.push(VCheck.Anal(eventSlave, 1));
					r.push(`${He} takes it obediently, and does ${his} best to act like ${he}'s enjoying being sodomized.`);
				}
				r.push(`${He} stumbles off to wash, looking oddly proud of ${himself}. It seems ${he} got something out of that: <span class="trust inc">a confidence boost,</span> at least.`);
			}
			eventSlave.trust += 4;
			return r;
		}

		function rape() {
			r = [];
			r.push(`${He}'ll get more than ${he} asked for. You get to your`);
			if (eventSlave.chastityVagina || !canDoAnal(eventSlave)) {
				r.push(`feet, unhook ${his} chastity,`);
			} else {
				r.push(`feet`);
			}
			r.push(`and snap your fingers, pointing`);
			if (PC.dick === 0) {
				r.push(`at the floor in front of you`);
				if (!canSee(eventSlave)) {
					r.push(`along with a commanding "floor"`);
				}
				r.push(r.pop() + `. ${He} hurries over, but hesitates for an instant, unsure of what to do next. You help ${him} understand by slapping ${him}, and when ${he} instinctively cringes away from the blow, poking the back of one of ${his} knees with your foot.`);
				if (eventSlave.belly >= 5000) {
					r.push(`${His}`);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`gravid`);
					} else {
						r.push(`bloated`);
					}
					r.push(`form`);
				} else {
					r.push(`${He}`);
				}
				r.push(`collapses like a doll with its strings cut, already crying. You seize ${his} head in both hands and ride ${his} sobbing mouth. If ${he} thought that rape required a dick, ${he} was wrong. If ${he} thought that you needed a strap-on to rape ${him}, ${he} was wrong. Your fingers form claws, holding ${his} head in a terrifying grip as you enjoy the not unfamiliar sensation of a slave weeping into your cunt as you grind it against ${his} crying face.`);
			} else {
				r.push(`at the couch next to the desk`);
				if (!canSee(eventSlave)) {
					r.push(`along with a commanding "couch"`);
				}
				r.push(r.pop() + `. ${He} hurries over and`);
				if (eventSlave.belly >= 5000) {
					r.push(`gently eases ${his}`);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnant`);
					} else {
						r.push(`swollen`);
					}
					r.push(`body to the ground,`);
				} else {
					r.push(`kneels,`);
				}
				r.push(`${his} rear pointing at you, but hesitates for an instant, unsure of what to do next. You help ${him} understand by`);
				if (eventSlave.belly >= 600000) {
					r.push(`slamming your hands against the bloated mass grossly distending ${his} sides,`);
				} else {
					r.push(`jabbing a thumb into one of ${his} kidneys,`);
				}
				r.push(`forcing ${his} back to arch in involuntary response, and then grinding ${his} face into the couch cushions.`);
				if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
					r.push(`${His} cunt isn't all that wet, and ${he} has cause to regret this, first when you fuck it without mercy, and then when you switch your barely-lubricated dick to ${his} anus.`);
					r.push(VCheck.Both(eventSlave, 1));
					r.push(`${He} tries to be brave and relax, but those are contradictory goals and ${he} manages neither as you assrape ${him} into inelegant, tearful begging for you to take your dick out of ${his} butt, because it hurts.`);
				} else if (canDoVaginal(eventSlave)) {
					r.push(`${His} cunt isn't all that wet, and ${he} has cause to regret this as you waste no time with foreplay.`);
					r.push(VCheck.Vaginal(eventSlave, 1));
					r.push(`${He} tries to be brave and relax, but those are contradictory goals and ${he} manages neither as you rape ${him} into inelegant, tearful begging for you to take your dick out of ${his} cunt because it hurts`);
					if (canGetPregnant(eventSlave)) {
						r.push(r.pop() + `, followed by desperate pleas to not cum inside ${him} since it's a danger day`);
					}
					r.push(r.pop() + `.`);
				} else { // FIXME: invalid for when wearing combined chastity belt. Chastity is mentioned to be removed further up.
					r.push(`You spit on ${his} asshole and then give ${him} some anal foreplay, if slapping your dick against ${his} anus twice before shoving it inside ${him} counts as anal foreplay.`);
					r.push(VCheck.Anal(eventSlave, 1));
					r.push(`${He} tries to be brave and relax, but those are contradictory goals and ${he} manages neither as you assrape ${him} into inelegant, tearful begging for you to take your dick out of ${his} butt, because it hurts.`);
				}
				r.push(`It isn't the first time you've heard that, or the hundredth.`);
			}
			r.push(`When you're done, you discard ${him} like the human sex toy ${he} is, and go back to your work. ${He} stumbles off, looking <span class="trust dec">fearful</span> but strangely <span class="devotion inc">complacent,</span> as though ${he}'s accepted this to an extent.`);
			eventSlave.trust -= 4;
			eventSlave.devotion += 4;
			return r;
		}

		function truth() {
			const frag = document.createDocumentFragment();
			r = [];
			r.push(`You ask ${him} why ${he}'s really here, with devastating directness and in a tone that will brook no disobedience. ${He} quails, ${his} shoulders slumping as ${he}`);
			if (eventSlave.belly >= 1500) {
				if (eventSlave.pregKnown === 1) {
					r.push(`hugs ${his} pregnancy`);
				} else {
					r.push(`attempts to hug ${himself} with ${his} ${belly} belly in the way`);
				}
			} else {
				r.push(`hugs ${himself}`);
			}
			r.push(`and ${his} knees turning inward as ${he} cringes, the perfect picture of the standard human fear response. It seems ${he} thought you wouldn't notice ${his} insincerity. ${He} swallows nervously and makes no response, but then you`);
			if (canSee(eventSlave)) {
				r.push(`allow impatience to cloud your brow`);
			} else {
				r.push(`cough with impatience`);
			}
			r.push(`and ${he} hurriedly explains ${himself}.`);
			if (!canTalk(eventSlave)) {
				r.push(`${He} uses sign language to communicate that ${he} asked the other slaves what ${he} could do to improve ${his} life, and that they told ${him} to do ${his} best to win your favor. ${He} asked them how to do that, and they told ${him} to ask you to fuck ${him}.`);
			} else {
				r.push(
					Spoken(eventSlave, `"${Master}, I, um, asked the other girls what I could do to, you know, do better here,"`),
					`${he} ${say}s.`,
					Spoken(eventSlave, `"They said to g-get you to like me. A-and when I asked them how to do that, th-they said t-to ask you to fuck me."`)
				);
			}
			r.push(`Then ${he} bites ${his} lip and`);
			if (canSee(eventSlave)) {
				r.push(`watches you`);
			} else if (canHear(eventSlave)) {
				r.push(`listens`);
			} else {
				r.push(`waits`);
			}
			r.push(`anxiously.`);

			App.Events.addParagraph(frag, r);
			App.Events.addResponses(frag, [
				new App.Events.Result(`They're not wrong`, wrong, virginityWarning()),
				new App.Events.Result(`Now rape ${him}`, rape2, virginityWarning()),
				new App.Events.Result(`It's not that simple`, simple)
			]);
			return frag;

			function wrong() {
				r = [];

				r.push(`You get to your feet, letting ${him} know that the other slaves weren't wrong. ${His} relief is`);
				if (eventSlave.chastityVagina || !canDoAnal(eventSlave)) {
					r.push(`palpable as you undo ${his} chastity.`);
				} else {
					r.push(`palpable.`);
				}
				r.push(`You snap your fingers, pointing`);
				if (PC.dick === 0) {
					r.push(`at the floor in front of you`);
					if (!canSee(eventSlave)) {
						r.push(`along with a commanding "floor"`);
					}
					r.push(r.pop() + `. ${He} hurries over, but hesitates for an instant, unsure of what to do next. You help ${him} understand by grabbing ${him} on either side of ${his} neck and`);
					if (eventSlave.belly >= 300000) {
						r.push(`pulling onto ${his} ${belly} stomach`);
					} else {
						r.push(`shoving ${him} down to kneel at your feet`);
					}
					r.push(`with ${his} face`);
					if (PC.belly >= 5000) {
						r.push(`crammed under your pregnant belly, level with your cunt.`);
					} else {
						r.push(`level with your cunt.`);
					}
					r.push(`One of your hands shifts behind ${his} head and tilts it back as you step forward, grinding against ${his} mouth. ${He} struggles involuntarily, but then perceptibly recollects ${himself}, relaxes, and starts to eat you out. Whatever internal turmoil ${he}'s working through, you don't care, and neither does your pussy. When you climax and release ${him}, ${he} stumbles off,`);
				} else {
					r.push(`at the couch next to the desk`);
					if (!canSee(eventSlave)) {
						r.push(`along with a commanding "couch"`);
					}
					r.push(r.pop() + `. ${He} hurries over and`);
					if (eventSlave.belly >= 5000) {
						r.push(`gently eases ${his}`);
						if (eventSlave.bellyPreg >= 3000) {
							r.push(`pregnant`);
						} else {
							r.push(`swollen`);
						}
						r.push(`body to the ground,`);
					} else {
						r.push(`kneels,`);
					}
					r.push(`${his} rear pointing at you, but hesitates for an instant, unsure of what to do next. You help ${him} understand by shoving ${him} down so ${his} collarbone is resting on the back of the couch and ${his} ass is at just the right height. You fuck`);
					if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
						r.push(`${his} pussy and then ${his} ass in quick succession, plundering ${his} holes without much regard for ${his} pleasure.`);
						r.push(VCheck.Both(eventSlave, 1));
						r.push(`${He} gasps and bucks at all the right parts, and even manages to moan almost authentically when you blow your load up ${his} butt.`);
					} else if (canDoVaginal(eventSlave)) {
						r.push(`${his} pussy hard, without much regard for ${his} pleasure.`);
						r.push(VCheck.Vaginal(eventSlave, 1));
						r.push(`${He} gasps and bucks at all the right parts, and even manages to moan almost authentically when you blow your load up deep inside ${him}.`);
					} else { // FIXME: invalid for when wearing combined chastity belt. Chastity is mentioned to be removed further up.
						r.push(`${his} ass hard, without cruelty but without much concern for ${his} pleasure, either.`);
						r.push(VCheck.Anal(eventSlave, 1));
						r.push(`${He} takes it obediently, and does ${his} best to act like ${he}'s enjoying being sodomized.`);
					}
					r.push(`${He} stumbles off to wash,`);
				}
				r.push(`looking <span class="trust inc">much more confident.</span>`);
				eventSlave.trust += 4;
				return r;
			}

			function rape2() {
				r = [];
				r.push(`You get to your feet, letting ${him} know that the other slaves weren't wrong. ${His} relief is palpable, but ${he}'s getting ahead of`);
				if (eventSlave.chastityVagina || !canDoAnal(eventSlave)) {
					r.push(`${himself} as you undo ${his} chastity.`);
				} else {
					r.push(`${himself}.`);
				}
				r.push(`You snap your fingers, pointing`);
				if (PC.dick === 0) {
					r.push(`at the floor in front of you`);
					if (!canSee(eventSlave)) {
						r.push(`along with a commanding "floor"`);
					}
					r.push(r.pop() + `. ${He} hurries over, but hesitates for an instant, unsure of what to do next. You help ${him} understand by slapping ${him}, and when ${he} instinctively cringes away from the blow, poking the back of one of ${his} knees with your foot.`);
					if (eventSlave.belly >= 5000) {
						r.push(`${His}`);
						if (eventSlave.bellyPreg >= 3000) {
							r.push(`gravid`);
						} else {
							r.push(`bloated`);
						}
						r.push(`form`);
					} else {
						r.push(`${He}`);
					}
					r.push(`collapses like a doll with its strings cut, already crying. You seize ${his} head in both hands and ride ${his} sobbing mouth. If ${he} thought that rape required a dick, ${he} was wrong. If ${he} thought that you needed a strap-on to rape ${him}, ${he} was wrong. Your fingers form claws, holding ${his} head in a terrifying grip as you enjoy the not unfamiliar sensation of a slave weeping into your cunt as you grind it against ${his} crying face.`);
				} else {
					r.push(`at the couch next to the desk`);
					if (!canSee(eventSlave)) {
						r.push(`along with a commanding "couch"`);
					}
					r.push(r.pop() + `. ${He} hurries over and`);
					if (eventSlave.belly >= 5000) {
						r.push(`gently eases ${his}`);
						if (eventSlave.bellyPreg >= 3000) {
							r.push(`pregnant`);
						} else {
							r.push(`swollen`);
						}
						r.push(`body to the ground,`);
					} else {
						r.push(`kneels,`);
					}
					r.push(`${his} rear pointing at you, but hesitates for an instant, unsure of what to do next. You help ${him} understand by`);
					if (eventSlave.belly >= 600000) {
						r.push(`slamming your hands against the bloated mass grossly distending ${his} sides,`);
					} else {
						r.push(`jabbing a thumb into one of ${his} kidneys,`);
					}
					r.push(`forcing ${his} back to arch in involuntary response, and then grinding ${his} face into the couch cushions.`);
					if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
						r.push(`${His} cunt isn't all that wet, and ${he} has cause to regret this, first when you fuck it without mercy, and then when you switch your barely-lubricated dick to ${his} anus.`);
						r.push(VCheck.Both(eventSlave, 1));
						r.push(`${He} tries to be brave and relax, but those are contradictory goals and ${he} manages neither as you assrape ${him} into inelegant, tearful begging for you to take your dick out of ${his} butt, because it hurts.`);
					} else if (canDoVaginal(eventSlave)) {
						r.push(`${His} cunt isn't all that wet, and ${he} has cause to regret this as you waste no time with foreplay.`);
						r.push(VCheck.Vaginal(eventSlave, 1));
						r.push(`${He} tries to be brave and relax, but those are contradictory goals and ${he} manages neither as you rape ${him} into inelegant, tearful begging for you to take your dick out of ${his} cunt because it hurts`);
						if (canGetPregnant(eventSlave)) {
							r.push(r.pop() + `, followed by desperate pleas to not cum inside ${him} since it's a danger day`);
						}
						r.push(r.pop() + `.`);
					} else { // FIXME: invalid for when wearing combined chastity belt. Chastity is mentioned to be removed further up.
						r.push(`You spit on ${his} asshole and then give ${him} some anal foreplay, if slapping your dick against ${his} anus twice before shoving it inside ${him} counts as anal foreplay.`);
						r.push(VCheck.Anal(eventSlave, 1));
						r.push(`${He} tries to be brave and relax, but those are contradictory goals and ${he} manages neither as you assrape ${him} into inelegant, tearful begging for you to take your dick out of ${his} butt, because it hurts.`);
					}
					r.push(`It isn't the first time you've heard that, or the hundredth.`);
				}
				r.push(`When you're done, you discard ${him} like the human sex toy ${he} is, and go back to your work. ${He} stumbles off, looking <span class="trust dec">fearful</span> but <span class="devotion inc">submissive,</span> knowing that ${he} now has a better idea of what you want, even if what you want isn't very nice.`);
				eventSlave.trust -= 4;
				eventSlave.devotion += 4;
				return r;
			}
			function simple() {
				r = [];
				r.push(`You tell ${him} kindly that it isn't that simple, but that if ${he} obeys orders and does ${his} best, you will like ${him} just fine, and ${he} will do well as your slave. Relief floods through ${him}.`);
				if (!canTalk(eventSlave)) {
					r.push(`${He} gestures ${his} thanks, and an apology for being silly.`);
				} else {
					r.push(
						Spoken(eventSlave, `"Thank you, ${Master} and I'm sorry for being silly,"`),
						`${he} apologizes.`
					);
				}
				r.push(`You dismiss ${him}, and ${he} goes, a strangely <span class="devotion inc">respectful</span> look on ${his} face. ${He}'s no more confident of ${his} ability to find safety and stability here with you than ${he} was before, but ${he} seems to like that it apparently isn't as simple as`);
				if (PC.dick !== 0) {
					r.push(`taking your cock up ${his} butt`);
					if (PC.vagina !== -1) {
						r.push(`or`);
					}
				}
				if (PC.vagina !== -1) {
					r.push(`eating you out`);
				}
				r.push(r.pop() + `.`);
				eventSlave.devotion += 4;
				return r;
			}
		}
	}
};
