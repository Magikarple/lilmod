App.Events.RESSIgnorantHorny = class RESSIgnorantHorny extends App.Events.BaseEvent {
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
				s => s.devotion <= 50,
				s => s.devotion >= -20,
				s => s.weekAcquired > 0,
				s => V.week - s.weekAcquired < 10,
				s => s.energy > 20,
				s => s.anus !== 0,
				s => s.vagina !== 0,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let r = [];
		r.push(
			`First on the inspection schedule is`,
			App.UI.DOM.combineNodes(contextualIntro(PC, eventSlave, true), ","),
			`and as you watch ${him} enter your office, you note several good signs about ${his} progress towards becoming a good sex slave. ${He} enters obediently, without pretending to be thrilled to be here, but also without hesitation. Best of all,`
		);
		if (eventSlave.chastityPenis && canAchieveErection(eventSlave)) {
			r.push(`${he}'s squirming with discomfort over the lack of room in ${his} chastity.`);
		} else if (eventSlave.dick > 4 && canAchieveErection(eventSlave)) {
			r.push(`${he}'s sporting a massive half-erection which slaps lewdly against ${his} thighs as ${he} walks.`);
		} else if (eventSlave.dick > 2 && canAchieveErection(eventSlave)) {
			r.push(`${his} dick is half-erect, bobbing lewdly as ${he} walks.`);
		} else if (eventSlave.dick > 0 && canAchieveErection(eventSlave)) {
			r.push(`${his} pathetic little bitch dick is half-erect.`);
		} else if (eventSlave.dick > 6) {
			r.push(`${his} enormous dick is slightly engorged and dripping precum.`);
		} else if (eventSlave.dick > 0) {
			r.push(`${his} soft bitch dick is dripping precum.`);
		} else if (eventSlave.labia > 1) {
			r.push(`${his} lovely pussylips are flushed and wet.`);
		} else if (eventSlave.clit > 1) {
			r.push(`${his} glorious bitch button is stiffly erect.`);
		} else if (eventSlave.vagina === -1) {
			r.push(`${he}'s unconsciously sticking ${his} ass out. Getting fucked there is ${his} main sexual outlet, now that ${he} lacks genitals.`);
		} else {
			r.push(`${his} pussy is flushed and moist.`);
		}
		App.Events.addParagraph(node, r);

		r = [];
		if (eventSlave.aphrodisiacs > 0 || eventSlave.inflationType === "aphrodisiac") {
			r.push(`The aphrodisiacs racing through ${his} system have ${him} desperate to get off, right now.`);
		} else if (eventSlave.piercing.genitals.smart && eventSlave.clitSetting !== "none") {
			r.push(His);
			if (eventSlave.vagina > -1) {
				r.push(`clit`);
			} else {
				r.push(`frenulum`);
			}
			r.push(`piercing is keeping ${his} arousal exquisitely balanced for ${his} inspection.`);
		} else {
			r.push(`The mild aphrodisiacs in the slave food have clearly built up some arousal that ${he} hasn't been able to address recently.`);
		}
		r.push(`${He} hasn't been with you long; it's been a mere ${V.week-eventSlave.weekAcquired > 1 ? `${V.week-eventSlave.weekAcquired} weeks` : `week`} since ${he} became your slave. ${He} may not be fully cognizant of how ${his} libido is being altered. New slaves aren't informed of the true extent of your abilities to force sexual need. It can be useful for a new ${girl} to wonder if some of the horniness ${he} feels is natural, and suspect that ${he}'s nothing but a dirty slut who deserves to be a sex slave.`);

		App.Events.addParagraph(node, r);

		let choices = [new App.Events.Result(`Tell ${him} the truth`, truth)];
		if (eventSlave.fetish !== "cumslut" || eventSlave.fetishKnown !== 1) {
			choices.push(new App.Events.Result(`Trade some oral for release`, trade));
		}
		if (eventSlave.fetish !== "buttslut" || eventSlave.fetishKnown !== 1) {
			if (eventSlave.vagina === -1 && eventSlave.attrXY <= 65) {
				choices.push(new App.Events.Result(`Make ${him} cum like a girl`, cum));
			} else if (eventSlave.vagina > -1) {
				choices.push(new App.Events.Result(`Work on broadening ${his} sexual horizons`, broaden));
			}
		}
		App.Events.addResponses(node, choices);

		function truth() {
			let frag = document.createDocumentFragment();
			r = [];
			r.push(`You explain the effects of the`);
			if (eventSlave.aphrodisiacs > 0 || eventSlave.inflationType === "aphrodisiac") {
				r.push(`sex drugs`);
			} else if (eventSlave.piercing.genitals.smart && eventSlave.clitSetting !== "none") {
				r.push(`advanced`);
				if (eventSlave.vagina > -1) {
					r.push(`clit`);
				} else {
					r.push(`frenulum`);
				}
				r.push(`piercing`);
			} else {
				r.push(`slave food`);
			}
			r.push(`briefly. Comprehension dawns across ${his}`);
			if (eventSlave.faceShape !== "normal") {
				r.push(eventSlave.faceShape);
			}
			r.push(
				`face.`,
				Spoken(eventSlave, `"Yes ${Master},"`),
				`${he} ${say}s quietly, more to buy time to formulate a response than anything else.`,
				Spoken(eventSlave, `"Um. I still really, really want to cum, though. W-would you please fuck me? Please, please, ${Master}, please fuck`)
			);
			if (eventSlave.vagina > 0 && eventSlave.preg > eventSlave.pregData.normalBirth/4 && canDoVaginal(eventSlave)) {
				r.push(Spoken(eventSlave, `my pregnant pussy."`));
			} else if (eventSlave.vagina > 0 && canDoVaginal(eventSlave)) {
				r.push(`me."`);
			} else if (canDoAnal(eventSlave)) {
				r.push(`my butt."`);
			} else {
				if (eventSlave.vagina > 0 && eventSlave.preg > eventSlave.pregData.normalBirth/4) {
					r.push(Spoken(eventSlave, `my pregnant pussy.`));
				} else if (eventSlave.vagina > 0) {
					r.push(`me.`);
				} else {
					r.push(`my butt.`);
				}
				r.push(Spoken(eventSlave, `I need it so bad right now, please rip off my chastity and fuck me senseless."`));
			}
			r.push(`A vague hint of embarrassment at begging for`);
			if (PC.dick !== 0) {
				r.push(`a hard`);
				if (PC.vagina !== -1) {
					r.push(`futa`);
				}
				r.push(`dicking`);
			} else {
				r.push(`your strap-on`);
			}
			r.push(`flickers across ${his} face, but hope for sexual release extinguishes it quickly.`);
			App.Events.addParagraph(frag, r);

			r = [];
			if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
				r.push(`${He} groans with relief as your`);
				if (PC.dick !== 0) {
					r.push(`cock`);
				} else {
					r.push(`phallus`);
				}
				r.push(
					`enters ${him}. ${He} does not orgasm immediately, but ${he} knows sweet release is coming. You have ${him} atop your desk, on ${his} back, and ${he}'s participating in ${his} own sexual degradation by holding ${his} legs spread wide apart for you. "Ohh," ${he} moans as you fuck ${him},`,
					Spoken(eventSlave, `"thank you for telling me why I feel this way, ${Master}. I guess this is how I, oh, am now? Oh, oh, it feels so g-good! Yes! AHH!"`)
				);
				if (PC.dick !== 0) {
					r.push(His);
					if (eventSlave.vagina > 0 && canDoVaginal(eventSlave)) {
						r.push(`cunt`);
					} else {
						r.push(`asshole`);
					}
					r.push(`tightens around your shaft delightfully as ${he} climaxes.`);
				} else {
					r.push(`${He} shudders with climax.`);
				}
				r.push(`${He} smiles <span class="trust inc">trustingly</span> up at you in the afterglow,`);
				if (eventSlave.balls > 0) {
					r.push(`${his} ejaculate`);
					if (eventSlave.chastityPenis === 1) {
						r.push(`seeping from ${his} chastity cage,`);
					} else {
						r.push(`glistening on ${his}`);
						if (eventSlave.belly > 1500) {
							r.push(belly);
							if (eventSlave.bellyPreg >= 1500) {
								r.push(`gravid`);
							}
						}
						r.push(`belly,`);
					}
				}
				r.push(`touched that you would tell ${him} something like that so honestly.`);
				if (eventSlave.vagina > 0 && canDoVaginal(eventSlave)) {
					r.push(VCheck.Both(eventSlave, 1));
				} else {
					r.push(VCheck.Anal(eventSlave, 1));
				}
			} else {
				r.push(`${He} groans with lust as pull ${him} onto your lap to make out. "Ohh," ${he} moans as you run your hands across ${his}`);
				if (eventSlave.boobsImplant >= 1000 && (eventSlave.boobsImplant/eventSlave.boobs) >= .60) {
					r.push(`bimbo`);
				} else if (eventSlave.boobs >= 1000 && eventSlave.butt > 5 && eventSlave.hips > 0) {
					r.push(`fecund`);
				} else if (eventSlave.boobs >= 1000 && eventSlave.butt > 5) {
					r.push(`voluptuous`);
				} else if (eventSlave.weight > 190) {
					r.push(`voluminous`);
				} else if (eventSlave.belly >= 5000) {
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`gravid`);
					} else if (eventSlave.bellyImplant >= 3000) {
						r.push(`rounded`);
					} else {
						r.push(`swollen`);
					}
				} else if (eventSlave.weight > 30) {
					r.push(`soft`);
				} else if (eventSlave.muscles > 30) {
					r.push(`ripped`);
				} else if (eventSlave.muscles > 5) {
					r.push(`toned`);
				} else if (eventSlave.boobs >= 500) {
					r.push(`sultry`);
				} else {
					r.push(`needy`);
				}
				r.push(
					`body,`,
					Spoken(eventSlave, `"thank you for telling me why I feel this way, ${Master}. I guess this is how I, oh, am now?"`),
					`You reward ${him} for the realization by`
				);
				switch (eventSlave.nipples) {
					case "huge":
						r.push(`stroking ${his} lewdly erect nipples.`);
						break;
					case "flat":
						r.push(`tweaking ${his} revealed nipples.`);
						break;
					case "puffy":
						r.push(`cupping and fondling ${his} puffy nipples.`);
						break;
					case "partially inverted":
						r.push(`teasing ${his} fully exposed nipples.`);
						break;
					case "inverted":
						r.push(`squeezing ${his} puffy areolae until ${his} inverted nipples pop out for you to tease.`);
						break;
					case "fuckable":
						r.push(`sticking your fingers deep into ${his} nipples.`);
						break;
					default:
						r.push(`tweaking ${his} ${eventSlave.nipples} nipples.`);
				}
				r.push(`The pent-up ${girl} is so desperate for release, you can feel ${him} trembling with ecstasy from the nipple stimulation alone.`);
				r.push(Spoken(eventSlave, `"Oh, oh, it feels so g-good! Yes! AHH!"`));
				r.push(`${He} shudders with climax, smiling <span class="trust inc">trustingly</span> up at you in the afterglow,`);
				if (eventSlave.balls > 0) {
					r.push(`${his} ejaculate`);
					if (eventSlave.chastityPenis === 1) {
						r.push(`seeping from ${his} chastity cage,`);
					} else {
						r.push(`glistening on ${his}`);
						if (eventSlave.belly > 1500) {
							r.push(belly);
							if (eventSlave.bellyPreg >= 1500) {
								r.push(`gravid`);
							}
						}
						r.push(`belly,`);
					}
				}
				r.push(`touched that you would tell ${him} something like that so honestly.`);
				seX(eventSlave, "mammary", PC, "penetrative");
			}
			eventSlave.trust += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function trade() {
			const hands = (hasBothArms(eventSlave)) ? `hands` : `hand`;
			let frag = document.createDocumentFragment();
			r = [];
			r.push(`You observe, noncommittally, that ${he} seems ready to get off.`);
			r.push(
				Spoken(eventSlave, `"Yes ${Master}!"`),
				`${he} squeals, too`
			);
			if (eventSlave.intelligence+eventSlave.intelligenceImplant >= -50) {
				r.push(`horny`);
			} else {
				r.push(`stupid`);
			}
			r.push(`to notice the sarcasm. Sighing inwardly, you slide yourself back from your desk and glance downward significantly, indicating your`);
			if (PC.dick !== 0) {
				r.push(`dick`);
				if (PC.vagina !== -1) {
					r.push(`and pussy`);
				}
			} else {
				r.push(`girl parts`);
			}
			r.push(r.pop() + `. ${He} hurries over, almost throwing ${himself} at your feet in ${his} eagerness. "Touch yourself", you say, making it an imperious command rather than kind permission. ${He} moans into your`); // TODO: review talking PC
			if (PC.dick !== 0) {
				r.push(`cock`);
			} else {
				r.push(`cunt`);
			}
			r.push(`with gratitude as ${he}`);
			if (canDoVaginal(eventSlave)) {
				if (eventSlave.dick > 0 && !(eventSlave.chastityPenis)) {
					r.push(`wraps one hand around ${his} dick and slips the other into ${his} pussy.`);
				} else {
					r.push(`dives for ${his} pussy with`);
					if (hasBothArms(eventSlave)) {
						r.push(`both hands.`);
					} else {
						r.push(`${his} hand.`);
					}
				}
			} else if (eventSlave.dick > 0 && !(eventSlave.chastityPenis)) {
				if (canAchieveErection(eventSlave)) {
					if (eventSlave.dick > 4) {
						r.push(`wraps ${his} ${hands} around ${his} huge erection.`);
					} else if (canDoAnal(eventSlave) && eventSlave.prostate > 0) {
						r.push(`wraps a hand around ${his} throbbing erection and reaches around to finger ${his} butt and stimulate ${his} prostate.${his}`);
					} else {
						r.push(`wraps a hand around ${his} throbbing erection.`);
					}
				} else {
					if (eventSlave.dick > 4) {
						r.push(`dives for ${his} huge, soft cock with`);
						if (hasBothArms(eventSlave)) {
							r.push(`both hands.`);
						} else {
							r.push(`${his} hand.`);
						}
					} else {
						r.push(`reaches down to fondle ${his} limp dick.`);
					}
				}
			} else if (canDoAnal(eventSlave)) {
				if (eventSlave.dick === 0) {
					r.push(`reaches down and around to rub ${his}`);
					if (canDoAnal(eventSlave)) {
						r.push(`anus and`);
					}
					r.push(`perineum.`);
				} else {
					if (eventSlave.vagina === -1) {
						r.push(`reaches around to finger ${his} butt, since that's ${his} only hole.`);
					} else if (eventSlave.chastityVagina === 1) {
						r.push(`reaches around to finger ${his} butt, since ${his} pussy's in chastity.`);
					} else {
						r.push(`dives for ${his} pussy with`);
						if (hasBothArms(eventSlave)) {
							r.push(`both hands.`);
						} else {
							r.push(`${his} hand.`);
						}
					}
				}
			} else if (eventSlave.vagina === -1 && eventSlave.dick === 0) {
				if (eventSlave.balls > 4) {
					r.push(`cups ${his} desperate balls, massaging them and encouraging them to release their pent-up cum.`);
				} else {
					r.push(`reaches down and around to rub ${his}`);
					if (canDoAnal(eventSlave)) {
						r.push(`anus and`);
					}
					r.push(`perineum.`);
				}
			} else {
				r.push(`brings ${his} ${hands} to ${his} breasts to`);
				if (eventSlave.nipples !== "fuckable") {
					r.push(`tease ${his} erect`);
				} else {
					r.push(`finger ${his} swollen`);
				}
				r.push(`nipples.`);
			}
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`${He}'s extremely pent up, and orgasms twice with`);
			if (PC.dick !== 0) {
				r.push(`your dick in ${his} mouth`);
				if (PC.vagina !== -1) {
					r.push(`first and ${his} tongue quivering along your pussylips second`);
				}
			} else {
				r.push(`${his} mouth on your cunt`);
			}
			r.push(r.pop() + `. The mental effects of this formative little experience are impossible to control with precision. Over the next few days, you notice that whenever`);
			if (canSee(eventSlave)) {
				r.push(`${he} sees you,`);
			} else {
				r.push(`you see ${him},`);
			}
			if (random(0, 1) === 1) {
				r.push(`${he} licks ${his} lips unconsciously. ${He} seems to be developing the beginnings of a lovely <span class="fetish gain">oral fixation.</span>`);
				eventSlave.fetish = "cumslut";
				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 10;
			} else {
				r.push(`${he} betrays mixed feelings. The shocking intimacy of reaching sexual release as ${he} used ${his} mouth to pleasure you seems to be <span class="devotion inc">affecting ${him}.</span>`);
				eventSlave.devotion += 4;
			}
			seX(eventSlave, "oral", PC, "penetrative");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function cum() {
			let frag = document.createDocumentFragment();
			r = [];
			r.push(`You order ${him} to get ${his} ass up on your desk. ${He} obeys, though not without a flicker of trepidation. ${He} points ${his} butt at you like a sex slave should, and doesn't crane around to`);
			if (canSee(eventSlave)) {
				r.push(`see`);
			} else {
				r.push(`feel`);
			}
			r.push(`what you're doing behind ${him}, but ${he}'s stiff with the awareness that`);
			if (PC.dick !== 0) {
				r.push(`there's almost certainly a hard`);
				if (PC.vagina !== -1) {
					r.push(`futa`);
				}
				r.push(`dick about`);
			} else {
				r.push(`you're almost certainly donning a strap-on`);
			}
			r.push(`to slide inside ${his} girly asspussy. ${He}'s not wrong, and ${he} lets out a little moan as`);
			if (PC.dick !== 0) {
				r.push(`your cockhead`);
				if (PC.vagina !== -1) {
					r.push(r.pop() + `, which you kindly lubed with a bit of your pussyjuice,`);
				}
			} else {
				r.push(`its broad tip`);
			}
			if (eventSlave.anus > 2) {
				r.push(`slides easily inside ${his} whorish anus.`);
			} else if (eventSlave.anus === 2) {
				r.push(`slides up ${his} experienced butthole.`);
			} else {
				r.push(`forces its way inside ${his} tight sphincter.`);
			}
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`As you fuck ${him}, you pull ${his} torso up so you can play with ${his}`);
			if (eventSlave.boobs > 2000) {
				r.push(`udders`);
			} else if (eventSlave.boobs > 800) {
				r.push(`tits`);
			} else {
				r.push(`nipples`);
			}
			r.push(`and whisper manipulation into ${his} ear. You tell ${him} ${he}'s about to cum like a girl. ${He} says nothing, but ${his} body language communicates incomprehension. Girls, you tell ${him}, cum when they get fucked. They cum when`);
			if (PC.title === 1) {
				r.push(`guys`);
			} else {
				r.push(`their betters`);
			}
			r.push(`stick their dicks inside them. ${He} bursts into tears, sobbing with shame and degradation even as ${he} shakes and`);
			if (eventSlave.balls > 0) {
				r.push(`squirts cum.`);
			} else {
				r.push(`dribbles ejaculate.`);
			}
			r.push(`The next time ${he} sees you,`);
			if (random(0, 1) === 1) {
				r.push(`${he} visibly gathers ${his} courage, and flirtatiously <span class="fetish gain">offers you ${his} ass.</span>`);
				eventSlave.fetish = "buttslut";
				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 10;
			} else {
				r.push(`${he} manages to stop ${himself} from breaking down, and seems to be <span class="devotion inc">working hard</span> to convince ${himself} that ${he}'s a girl.`);
				eventSlave.devotion += 4;
			}
			r.push(VCheck.Anal(eventSlave, 1));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function broaden() {
			let frag = document.createDocumentFragment();
			r = [];
			r.push(`${He} seems a little too focused on ${his} hot cunt. You order ${him} to get up on your desk, and ${he} obeys eagerly, ${his}`);
			if (canSee(eventSlave)) {
				r.push(`${App.Desc.eyesColor(eventSlave)} shining`);
			} else {
				r.push(`facial expression filled`);
			}
			r.push(`with lust.`);
			if (canSee(eventSlave)) {
				r.push(`They focus`);
			} else {
				r.push(`${He} focuses`);
			}
			r.push(`on`);
			if (PC.dick !== 0) {
				r.push(`your cock as you bring it to bear,`);
				if (PC.vagina !== -1) {
					r.push(`not to mention the pussy at its base,`);
				}
			} else {
				r.push(`your strap-on as you step into it,`);
			}
			r.push(`and ${he}'s about to express ${his} gratitude when you push the slave, who is sitting on the edge of your desk with ${his} legs spread to provide you access to ${his} pussy, over onto ${his} back. ${He} barely has time to reorient ${himself} when ${he} feels`);
			if (eventSlave.anus > 2) {
				r.push(`a sudden fullness in ${his} loose ass.`);
			} else if (eventSlave.anus === 2) {
				r.push(`a presence inside ${his} experienced ass.`);
			} else {
				r.push(`something starting to push its way up ${his} poor little bottom.`);
			}
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`${He} cannot hide ${his} disappointment, but has the presence of mind not to protest as you assfuck ${him} hard enough that ${his}`);
			if (eventSlave.boobs > 2000) {
				r.push(`ridiculous tits almost hit ${him} in the face with each stroke`);
			} else if (eventSlave.boobs > 800) {
				r.push(`big boobs bounce all over the place`);
			} else {
				r.push(`boobs bounce`);
			}
			if (eventSlave.belly >= 10000) {
				r.push(`and taut belly is forced back`);
			}
			r.push(r.pop() + `. ${His} orgasm sneaks up on ${him}, and comes by surprise, forcing a squeal out of ${him} as ${his} sphincter tightens down involuntarily. ${He} gets up gingerly, clearly feeling sore,`);
			if (random(0, 1) === 1) {
				r.push(`and looks preoccupied. ${He} reaches idly around and massages ${his} well-fucked backdoor meditatively, biting ${his} lower lip as ${he} investigates. Maybe, ${he} seems to be thinking, <span class="fetish gain">anal is fun?</span>`);
				eventSlave.fetish = "buttslut";
				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 10;
			} else {
				r.push(`but <span class="devotion inc">does ${his} honest best</span> to look grateful. ${He} knows ${he}'s a sex slave and can't afford to be particular about little things like getting buttfucked.`);
				eventSlave.devotion += 4;
			}
			r.push(VCheck.Anal(eventSlave, 1));
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
