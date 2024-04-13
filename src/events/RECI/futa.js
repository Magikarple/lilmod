App.Events.RECIFuta = class RECIFuta extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => this.validSlave(s),
				s => s.assignment !== Job.QUARTER,
				s => s.trust >= 10,
				s => s.dick > 0,
				s => s.balls > 0,
				s => s.vagina >= 0,
				canStand,
				canAchieveErection,
				canTalk,
				canHear,
				hasAllNaturalLimbs,
			]
		];
	}

	validSlave(slave) {
		return V.RECheckInIDs.some((a) => (a.ID === slave.ID && a.type === "futa"));
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, hers, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: Master, say: say} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);

		V.RECheckInIDs.deleteWith((s) => s.ID === eventSlave.ID && s.type === "futa");

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let t = [];
		t.push(`You're just finishing up`);
		t.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), "'s"));
		t.push(`weekly inspection. The`);
		if (eventSlave.face >= -10) {
			t.push(`pretty`);
		} else {
			t.push(`perky`);
		}
		t.push(`futa is standing obediently before you, answering the usual questions with enthusiasm. ${He} gestures animatedly as ${he} talks, making ${his}`);
		if (eventSlave.boobs > 8000) {
			t.push(`mind-blowing`);
		} else if (eventSlave.boobs > 4000) {
			t.push(`monstrous`);
		} else if (eventSlave.boobs > 2000) {
			t.push(`enormous`);
		} else if (eventSlave.boobs > 800) {
			t.push(`big`);
		}
		if (eventSlave.boobs >= 300) {
			t.push(`boobs jiggle slightly, and ${his}`);
		}
		if (eventSlave.dick > 5) {
			t.push(`incredible, erect penis wave from side to side.`);
		} else if (eventSlave.dick > 3) {
			t.push(`big cock wave from side to side.`);
		} else if (eventSlave.dick > 1) {
			t.push(`dick stick out stiffly.`);
		} else {
			t.push(`tiny hard-on wiggle lewdly.`);
		}
		t.push(`${He} doesn't seem to notice, probably because this state of obvious arousal is more or less permanent for ${him}. After all, this is what the ex-Futanari Sister wanted.`);
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`Apparently, ${he} has something to say. When you've asked ${him} your last question and are considering whether to dismiss ${him} or fuck ${him} and then dismiss ${him}, ${he} speaks up confidently.`);
		t.push(Spoken(eventSlave, `"${Master},"`));
		t.push(`${he} ${say}s.`);
		t.push(Spoken(eventSlave, `"I want to thank you. When our group of Futa Sisters here failed, I was so scared. We all were! We didn't know what was going to happen, whether we were going to be raped or cut up or worse. But you saved us ${Master}, and you saved me. I'm just as happy with you as I was with the Sisters. I thought I'd have to wake up from the dream I was in, but I'm still dreaming. Thank you."`));
		t.push(`${He} gives you a pretty half-curtsy, half-bow that manages to be both graceful and appealingly sexual.`);
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`${His} ${eventSlave.skin} face displays nothing but honest gratitude and devotion. ${He} does not know that the reason ${his} community of Futanari Sisters failed is that you cleverly undermined its finances, forcing it into ruin and its members into slavery. ${He} does not know that the reason ${he} lost years of idyllic transformation and sexual freedom within a group of like-minded women is that you stole them from ${him}. And ${he} does not know that the person ${he} just thanked for saving ${him} from the consequences of the worst thing that ever happened to ${him} was its author.`);
		t.push(Spoken(eventSlave, `"I love you, ${Master},"`));
		t.push(`${he} concludes, smiling expectantly at you.`);
		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			new App.Events.Result(`Love ${him} back`, love, virginityWarningSingle()),
			new App.Events.Result(`Break ${him} with the truth`, hate, virginityWarningDouble()),
		]);

		function love() {
			t = [];
			t.push(`You swing your legs up onto your desk and`);
			if (V.PC.belly < 5000) {
				t.push(`jump`);
			} else {
				t.push(`heft yourself`);
			}
			t.push(`up onto its smooth surface, ${his} eyes tracking the`);
			if (V.PC.belly >= 5000) {
				t.push(`delicate, yet determined, motions you take to accommodate your pregnancy.`);
			} else if (V.PC.boobs >= 300) {
				t.push(`way it makes your breasts move.`);
			} else {
				t.push(`powerful way your muscles move your body.`);
			}
			t.push(`When you pat the tops of your`);
			if (V.PC.title === 1) {
				t.push(`hard`);
			} else {
				t.push(`soft`);
			}
			t.push(`thighs meaningfully, ${he} giggles happily and skips forward to clamber up and sit on your lap. The bouncing and climbing creates quite a nice spectacle of`);
			if (eventSlave.boobs >= 300) {
				t.push(`jiggling tits and`);
			}
			t.push(`waving cock, and ${he} manages to get up on the desk in such a way that you get a solid eyeful of first ${his} wet pussy and then ${his} ready anus.`);
			if (V.PC.belly + eventSlave.belly >= 10000) {
				t.push(`${He} positions ${himself} so that`);
				if (eventSlave.belly >= 8000) {
					t.push(`${his}`);
					if (eventSlave.bellyPreg >= 3000) {
						t.push(`pregnancy`);
					} else {
						t.push(`swollen middle`);
					}
					t.push(`will allow ${his} hermaphroditic genitalia to meet the`);
					if (V.PC.dick !== 0) {
						t.push(`hardness of your`);
						if (V.PC.vagina !== -1) {
							t.push(`erection and the warmth further down.`);
						} else {
							t.push(`erection.`);
						}
					} else {
						t.push(`warmth of your arousal.`);
					}
				} else if (V.PC.belly >= 8000) {
					t.push(`${He} slides ${himself} beneath your bump with a coo, feeling the`);
					if (V.PC.dick !== 0) {
						t.push(`hardness of your erection`);
						if (V.PC.vagina !== -1) {
							t.push(`and the warmth further down`);
						}
					} else {
						t.push(`warmth of your arousal`);
					}
					t.push(`against ${his} hermaphroditic genitalia.`);
				} else {
					t.push(`It takes a moment for both of you to find a position where ${his} hermaphroditic genitalia are able to cross paths with the`);
					if (V.PC.dick !== 0) {
						t.push(`hardness of your`);
						if (V.PC.vagina !== -1) {
							t.push(`erection and the warmth further down`);
						} else {
							t.push(`erection`);
						}
					} else {
						t.push(`warmth of your arousal`);
					}
					t.push(`without both of your bellies getting in the way.`);
				}
			} else {
				t.push(`${He} settles ${himself} onto your lap with a coo, feeling the`);
				if (V.PC.dick !== 0) {
					t.push(`hardness of your erection`);
					if (V.PC.vagina !== -1) {
						t.push(`and the warmth further down`);
					}
				} else {
					t.push(`warmth of your arousal`);
				}
				t.push(`against ${his} hermaphroditic genitalia.`);
			}
			t.push(`${He} starts to grind ${himself} lasciviously against you, but stops when you seize ${his} face and kiss ${him} deeply. ${He} moans back into you, returning the kiss with intensity.`);
			if (eventSlave.boobs > 25000) {
				t.push(`${His} udders are so huge the two of you have to press your torsos hard together to make out, a delightful struggle that stimulates ${his} nipples quite a lot, to go by the way ${he} squeaks and giggles into your mouth.`);
			} else if (eventSlave.boobs > 4000) {
				t.push(`${His} bosom is so big that making out face to face presses it quite hard between your torsos, which stimulates ${his} nipples quite a lot, to go by the way ${he} squeaks and giggles into your mouth.`);
			} else if (eventSlave.boobs + V.PC.boobs > 4000 && V.PC.boobs >= 1000) {
				t.push(`The amount of breast flesh between you forces you and ${him} to press your torsos hard together to make out, a delightful struggle that stimulates both party's nipples quite a lot, to go by the way ${he} squeaks and giggles into your mouth, and you into ${hers}.`);
			} else if (V.PC.boobs >= 300 || V.PC.title === 0) {
				t.push(`You undress without breaking your lip lock, bringing your bare breasts against ${hers} in a warm, loving embrace.`);
			} else {
				t.push(`You strip without breaking your lip lock, bringing your heavily muscled chest against ${his} soft breasts in a tender, loving embrace.`);
			}
			t.push(`${His} arousal builds rapidly and ${he} goes back to grinding,`);
			if (V.PC.dick !== 0) {
				t.push(`eventually getting ${himself} so hot that your dick slides into ${him} almost without either of you meaning to make it happen. ${He} climaxes with you shortly, cumming all over ${his} own breasts.`);
			} else {
				t.push(`bringing you both to a shaking climax. ${He} cums all over ${his} own breasts, coating them in glistening ejaculate.`);
			}
			t.push(`As ${he} relaxes back against the desk, ${his} panting making ${his} cum-glazed tits rise and fall, you reflect that you just lied by omission, letting`);
			if (eventSlave.face >= -10) {
				t.push(`a pretty`);
			} else {
				t.push(`a trusting`);
			}
			t.push(`${girl} maintain ${his} delusions and <span class="devotion inc">${his} love for you.</span> Of all your sins, this is perhaps the smallest.`);
			eventSlave.devotion += 4;
			t.push(VCheck.Vaginal(eventSlave, 1));

			return t;
		}

		function hate() {
			t = [];
			t.push(`You point at`);
			if (eventSlave.belly >= 300000) {
				t.push(`${his} stomach, and ${he} leans forward onto ${his} ${belly} belly, giggling with ${his} butt stuck out invitingly.`);
			} else {
				t.push(`the couch, and ${he}`);
				if (canWalk(eventSlave)) {
					t.push(`skips over to it with a giggle,`);
					if (eventSlave.boobs >= 300) {
						t.push(`boobs bouncing.`);
					} else if (eventSlave.weight > 95) {
						t.push(`belly bouncing.`);
					}
				} else {
					t.push(`crawls over to it with a giggle.`);
				}
				t.push(`${He} hops up onto the cushions, kneeling with ${his} butt stuck out invitingly and ${his} torso bent over its back.`);
			}
			t.push(`${He} reaches around to pull one`);
			if (eventSlave.butt > 12) {
				t.push(`massive`);
			} else if (eventSlave.butt > 8) {
				t.push(`giant`);
			} else if (eventSlave.butt > 5) {
				t.push(`huge`);
			} else if (eventSlave.butt > 2) {
				t.push(`heavy`);
			} else {
				t.push(`cute`);
			}
			t.push(`buttock to one side,`);
			if (eventSlave.anus > 2) {
				t.push(`stretching ${his} lewd backdoor into a gape`);
			} else if (eventSlave.anus > 1) {
				t.push(`stretching ${his} backdoor lewdly`);
			} else {
				t.push(`highlighting ${his} tight anus`);
			}
			t.push(`and showing off ${his}`);
			if (eventSlave.labia > 1) {
				t.push(`dangling`);
			} else if (eventSlave.labia > 0) {
				t.push(`generous`);
			} else if (eventSlave.vaginaLube > 0) {
				t.push(`wet`);
			}
			t.push(`pussylips. You enter ${him} from behind, your`);
			if (V.PC.dick !== 0) {
				t.push(`turgid dick`);
			} else {
				t.push(`strap-on`);
			}
			t.push(`sliding easily into ${his} cunt. Your hands slide around ${him} to hold ${his} shoulders in a gentle lock, and you whisper secrets into ${his} ear. You tell ${him} that the Futanari Sisters here failed because you undermined them. You tell ${him} that ${he} is a slave because you planned and executed ${his} enslavement. And you tell ${him} that no slave will `);
			if (V.enduringDevotion > 20) {
				t.push(`believe ${him} if ${he} tells them the truth, since they love you just like ${he} did.`);
			} else {
				t.push(`listen to ${him} if ${he} tells them the truth, since they aren't as naive as ${he} was.`);
			}
			t.push(`As you pour this poison into ${him}, ${he} remains perfectly still, processing the revelation; the only clue to ${his} feelings is ${his} rapidly softening cock. When it has become completely, pathetically limp, a huge sob tears its way out of ${him}. You switch to ${his} anus and assrape ${him} without mercy, forcing ${his} limp torso halfway around so you can press a kiss on ${his} bawling mouth. ${He} does not resist, even when you begin to taste the salty tears that stream down ${his}`);
			if (eventSlave.face >= -10) {
				t.push(`pretty`);
			} else {
				t.push(`broken`);
			}
			t.push(`face. ${He} will remain devoted to you, mostly from a lack of alternatives, but ${his} trust in you has <span class="trust dec">suffered immensely.</span>`);
			eventSlave.trust = jsRandom(-90, -75);
			t.push(VCheck.Both(eventSlave, 1, 1));

			return t;
		}

		function virginityWarningSingle() {
			if (V.PC.dick >= 0 && eventSlave.vagina === 0) {
				return `This option will take ${his} virginity`;
			}
			return null;
		}

		function virginityWarningDouble() {
			if (eventSlave.vagina === 0 && eventSlave.anus === 0) {
				return `This option will take both ${his} virginities`;
			} else if (eventSlave.vagina === 0) {
				return `This option will take ${his} virginity`;
			} else if (eventSlave.anus === 0) {
				return `This option will take ${his} anal virginity`;
			}
			return null;
		}
	}
};
