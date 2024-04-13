App.Events.RESSDesperateBreeder = class RESSDesperateBreeder extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => canPenetrate(V.PC),
			() => V.PC.belly < 100000,
		];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.sexualFlaw === SexualFlaw.BREEDER,
				canGetPregnant,
				s => canImpreg(s, V.PC),
				s => ((s.mpreg === 0 && s.vagina > 0) || (s.mpreg === 1 && s.anus > 0)),
				s => s.preg === 0,
				s => s.counter.PCChildrenBeared > 2,
				s => s.belly < 100,
				s => s.trust > 50,
				s => s.devotion > 20,
				s => overpowerCheck(s, V.PC) < 0,
				canSee,
				canHear,
				hasBothArms,
				canWalk
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, himself, women, girl
		} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);
		const {womenPC} = getPronouns(V.PC).appendSuffix("PC");

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let t = [];

		t.push(`It's not particularly unusual to get night visits every now and then from your more amorous slaves, so when you are roused from your sleep by the paraphilic`);
		t.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), ","));
		t.push(`you easily guess what the ${girl} is after.`);
		if (canTalk(eventSlave)) {
			t.push(`"${Master}," ${he} whispers. "${Spoken(eventSlave, `I can't take it any longer, I need a baby in me.`)}"`);
			t.push(`${His} voice begins to rise as the prospect of having ${his} addiction sated comes closer.`);
			t.push(`"${Spoken(eventSlave, `I can feel the egg inside me, ${Master}, and I want, no, NEED you to fertilize it for me. You'll do that, right? You've done it before...`)}"`);
			t.push(`${He} begins grinding ${his} ${eventSlave.mpreg === 1 ? "rear" : "pussy"} against your crotch, hoping to entice you erect. Your body quickly responds and ${he} positions ${himself} to be penetrated.`);
			t.push(`"${Spoken(eventSlave, `See ${Master}? He wants it too!`)}"`);
			t.push(`${He} wiggles against the tip, a hungry glint in ${his} eye${hasBothEyes(eventSlave) ? "s" : ""}.`);
			t.push(`"${Spoken(eventSlave, `He knows I'm ready to be knocked up... So stop trying to deny your feelings and FUCK ME! KNOCK ME UP! NOW!`)}"`);
		} else {
			t.push(`${He} uses gestures that ${he} wants a baby put in ${him} immediately, and since you've done it in the past, you're going to do it again. ${His} motions become increasingly erratic as ${he} begins grinding ${his} ${eventSlave.mpreg === 1 ? "rear" : "pussy"} against your crotch in an effort to bring you to erection. Your body quickly responds and ${he} positions ${himself} to be penetrated. The hunger in ${his} eye${hasBothEyes(eventSlave) ? "s" : ""} is obvious as ${he} struggles to convey how hard it is for ${him} not to be with child and how badly you want to put another bun or two in ${his} oven. ${He} wiggles against the tip of your eager cock, forcing you to support ${his} weight as ${he} desperately signs for you to drop ${him} on your shaft.`);
		}
		App.Events.addParagraph(node, t);
		t = [];
		t.push(`You are aware of ${his} pregnancy obsession, so ${he} is likely to calm down and stop ${canTalk(eventSlave) ? "all the shouting" : `${his} outburst`} once you've blown your load inside ${him}, but you would be giving up control of the situation.`);
		App.Events.addParagraph(node, t);
		t = [];

		App.Events.addResponses(node, [
			new App.Events.Result(`Give ${him} what ${he} wants`, matingPress),
			new App.Events.Result(`Let ${him} have ${his} way`, cowgirl),
			new App.Events.Result(`Push ${him} off`, reverseRape),
		]);

		function matingPress() {
			let frag = document.createDocumentFragment();
			t = [];

			t.push(`Fine then, if ${he} wants a baby that badly, you'll give ${him} one. You guide ${him} onto ${his} back as ${he}`);
			if (canTalk(eventSlave)) {
				t.push(`tries to ${say} a thank you,`);
			} else {
				t.push(`attempts to sign ${his} gratitude,`);
			}
			t.push(`but you don't let ${him} finish. You grab ${him} by the legs, pinning ${him} in a mating press as you hilt yourself in ${his} ${eventSlave.mpreg === 1 ? "asspussy" : "vagina"} and completely derail any train of thought ${he} may have had. You may be giving ${him} what ${he} wants, but you aren't about to let ${him} catch you with a leg lock and milk every last drop of sperm out of you that ${he} can manage. You take it nice and slow, savoring the pleasure as ${he} gasps in anticipation before releasing your seed`);
			if (V.PC.dick > 2) {
				t.push(`deep `);
			} else {
				t.push(`as deep as you can`);
			}
			t.push(`inside ${him}, setting off ${his} orgasm and leaving ${him} squirming as you lazily let the last several globs slip into ${him}. Satisfied, you roll back into bed and go back to sleep as ${he} cuddles up beside you. Other than the heavy breathing, at least ${he}'s quieter now.`);
			App.Events.addParagraph(frag, t);
			t = [];
			t.push(`You awake later that morning to find ${him} cradling ${his} ${eventSlave.bellySagPreg > 0 ? "softly sagging" : "lower"} belly, <span class="devotion inc">savoring the gift</span> you've planted in ${him}.`);
			if (canTalk(eventSlave)) {
				t.push(`"${Spoken(eventSlave, `I'm sorry I got a little out of control last night, ${Master}. Thank you for putting up with me, I'm not sure many ${womenPC} would.`)}"`);
			} else {
				t.push(`When ${he} notices you're up, ${he} quickly apologizes for ${his} actions, and thanks you for being willing to put up with ${his} mental hang-ups.`);
			}
			t.push(`<span class="trust inc">${He}'s lucky to have you and ${he} knows it.</span>`);
			App.Events.addParagraph(frag, t);
			eventSlave.devotion += 3;
			eventSlave.trust += 2;
			tryKnockMeUp(eventSlave, 100, 2, V.PC);
			if (eventSlave.mpreg === 1) {
				seX(eventSlave, "anal", V.PC, "penetrative", 1);
			} else {
				seX(eventSlave, "vaginal", V.PC, "penetrative", 1);
			}

			return frag;
		}

		function cowgirl() {
			let facialDiverted = true;
			let frag = document.createDocumentFragment();
			t = [];

			t.push(`If ${he} wants to do all the work, then you'll just lie back and enjoy the show.`);
			if (canTalk(eventSlave)) {
				t.push(`${He} squeels with glee,`);
				t.push(`"${Spoken(eventSlave, `Sure thing! That first load should be just about ready, so we'll definitely be going again. You don't mind that, right ${Master}?`)}"`);
			} else {
				t.push(`${He} smiles happily as ${he} begins riding your dick.`);
			}
			t.push(`Having been edged this whole time, you don't last long under ${his} vigorous assault on your crotch and quickly fire a load into ${his} depths.`);
			if (canTalk(eventSlave)) {
				t.push(`"${Spoken(eventSlave, `Oh no, ${Master}, that felt small, there's no way I could be pregnant off just that. You need to be worked harder to really fill me with cum, but don't worry, leave it all to me.`)}"`);
			} else {
				t.push(`${He} frowns, clearly dissatisfied with your half-asleep cumshot. ${He} picks up the pace, desperate to milk a real ejaculation out of you.`);
			}
			App.Events.addParagraph(frag, t);
			t = [];
			if (V.PC.belly >= 30000) {
				t.push(`As much as you'd like to watch ${him} bounce around, all you have is a view of your ${V.PC.bellyPreg > 100 ? "pregnant" : "bulging"} belly being pressed forward by ${his} efforts.`);
				if (canTalk(eventSlave)) {
					if (V.PC.bellyPreg > 100) {
						t.push(`"${Spoken(eventSlave, `You're a nasty ${girl}, ${Master},`)}"`);
						t.push(`${he} ${say}s,`);
						t.push(`"${Spoken(eventSlave, `teasing me with that bump. You better make it up to me by filling me with babies.`)}"`);
					} else {
						t.push(`"${Spoken(eventSlave, `You're such a tease, ${Master},`)}"`);
						t.push(`${he} ${say}s,`);
						t.push(`"${Spoken(eventSlave, `you know I can't wait until I have a baby bump that big.`)}"`);
					}
				} else {
					t.push(`You can tell ${he} is envious of your rounded middle, eager to have ${his} own expanding to match.`);
				}
				if (eventSlave.dick > 0 && eventSlave.chastityPenis === 0 && canAchieveErection(eventSlave)) {
					t.push(`As ${he} bobs up and down on your shaft, you notice something hard rubbing against the underside of your stomach; ${his} own erection is grinding uncontrolled against you and ${he} is so caught up in the act that you doubt ${he}'ll have the respect to direct ${his} ejaculation away from you. Before long, ${he} clenches up in orgasm and you feel exactly what you expected splatter across your underbelly.`);
					facialDiverted = false;
				}
			} else {
				t.push(`You enjoy the sight of ${his}`);
				if (eventSlave.boobs >= 300) {
					if (eventSlave.boobs < 400) {
						t.push(`small breasts`);
					} else if ((eventSlave.boobsImplant / eventSlave.boobs) >= .75) {
						t.push(`fake tits`);
					} else if (eventSlave.boobs < 1000) {
						t.push(`large breasts`);
					} else if (eventSlave.boobs < 2500) {
						t.push(`heavy boobs`);
					} else {
						t.push(`enormous udders`);
					}
					t.push(`and`);
				}
				if (eventSlave.bellySagPreg > 0) {
					t.push(`body, still saggy and loose from prior pregnancy,`);
				} else if (eventSlave.weight >= 95) {
					t.push(`wobbly`);
				} else if (eventSlave.weight > 30) {
					t.push(`chubby`);
				} else if (eventSlave.weight > 10) {
					t.push(`soft`);
				} else if (eventSlave.muscles > 50) {
					t.push(`ripped`);
				} else if (eventSlave.muscles > 10) {
					t.push(`toned`);
				} else {
					t.push(`lithe`);
				}
				t.push(`body bouncing`);
				if (V.PC.belly >= 5000) {
					t.push(`up and down over the swell of your ${V.PC.bellyPreg > 100 ? "pregnant" : "bulging"} belly.`);
				} else {
					t.push(`around as ${he} bobs up and down on your shaft.`);
				}
				if (canTalk(eventSlave)) {
					if (V.PC.bellyPreg > 100) {
						t.push(`"${Spoken(eventSlave, `You're such a tease, ${Master},`)}"`);
						t.push(`${he} ${say}s as ${he} leans into your pregnancy,`);
						t.push(`"${Spoken(eventSlave, `you know I can't wait until mine starts growing.`)}"`);
					} else {
						t.push(`"${Spoken(eventSlave, `Do you like what you see, ${Master},`)}"`);
						t.push(`${he} ${say}s teasingly,`);
						t.push(`"${Spoken(eventSlave, `there's no way I'm making it out of here without a baby in my belly, am I?`)}"`);
					}
				}
				if (eventSlave.dick > 0 && eventSlave.chastityPenis === 0) {
					const cumShot = cumLoad(eventSlave);
					if (eventSlave.dick > 10) {
						t.push(`You're very aware of ${his} massive dick slapping against you and the precum from its tip getting dangerously close to dripping on you. You order ${him} to point it somewhere else, and when it falls on deaf ears, you take it upon yourself to shove it to the side so ${he} may ejaculate someplace easier to clean tomorrow.`);
					} else if (canAchieveErection(eventSlave)) {
						t.push(`You can't help but notice ${his} erection and the precum beading at its tip. You order ${him} to point it somewhere else, but ${he} is too lost in ${his} growing pleasure to listen. Worse still, you're pinned under ${his} weight and have no chance of avoiding the coming ejaculation, nor any that follow it.`);
						if (cumShot >= 1) {
							t.push(`The amount of semen that flows from ${him} when ${he} cums is unreal, and there is no blocking it from washing across you.`);
						} else if (cumShot >= .1) {
							t.push(`You manage to block ${him} from giving you a facial with your hand, but you still end up coated in streaks out ${his} cum.`);
						} else {
							t.push(`As if it is any condolence, at least ${his} loads are weak and meekly splatter across your lower belly when ${he} cums.`);
						}
						facialDiverted = false;
					} else {
						t.push(`You can't help but notice ${his} limp dick flopping about and the precum being flung from its tip. You order ${him} to get it under control, but ${he} is too lost in ${his} growing pleasure to listen. Worse still, you're pinned under ${his} weight and have no chance of avoiding the coming ejaculation, nor any that follow it.`);
						if (cumShot >= 1) {
							t.push(`Like a loose firehose, ${he} sprays a jet semen hapazardly across you, ${himself} and ${his} surroundings, thoroughly soaking everything in range.`);
						} else if (cumShot >= .1) {
							t.push(`You block most of ${his} cum from splashing across your face, but it still ends up all over the place.`);
						} else {
							t.push(`As if it is any condolence, at least ${his} loads are small even thouugh ${he} still shakes them everywhere.`);
						}
						facialDiverted = false;
					}
				}
			}
			App.Events.addParagraph(frag, t);
			t = [];
			t.push(`${He} rides you for what feels like hours with little regard for your enjoyment; ${his} only goal being to get as much of your baby batter into ${his} fertile womb as possible. With one last blast of ${eventSlave.balls > 0 ? "your " : ""}cum, ${he} finally finishes and drunkely slides to your side, a hand resting`);
			if (cumLoad(V.PC) >= 1) {
				t.push(`on the swell ${his} semen-filled`);
			} else {
				t.push(`over ${his} lower `);
			}
			t.push(`belly, <span class="trust inc">completely satisfied.</span>`);
			if (!facialDiverted) {
				if (V.PC.balls >= 50) {
					t.push(`You, on the other hand, are left covered in ${his} sperm with a pair of painfully sore balls from where ${he} was bouncing against them.`);
				} else {
					t.push(`You, on the other hand, are left with a sore dick, an aching pelvis, and a layer of ${his} ${eventSlave.geneMods.aggressiveSperm === 1 ? "lively" : "rapidly drying"} sperm.`);
				}
				if (canMove(V.PC)) {
					t.push(`You slide out of bed to go clean yourself up and have a little ${V.PC.refreshment} to calm yourself down.`);
				} else if (haremLength() + servantsLength() > 0) {
					t.push(`You call for ${servantsLength() > 0 ? "one of your servants" : "a member of your harem"} to clean you up and bring you a little ${V.PC.refreshment} to calm your nerves.`);
				} else if (S.Bodyguard) {
					t.push(`With no one else to do it, your poor bodyguard ${S.Bodyguard.slaveName} is left to clean you up.`);
				} else {
					if (eventSlave.geneMods.aggressiveSperm === 1 && isVirile(eventSlave)) {
						t.push(`And since you can't move yourself, you're stuck like this until your morning cleaning, which means you can do nothing but watch as ${his} energetic loads steadily make their way down to your crotch. By the time the sun rises,`);
						if (canImpreg(V.PC, eventSlave)) {
							t.push(`<span class="pregnancy">you've been thoroughly impregnated.</span>`);
							tryKnockMeUp(V.PC, 100, 2, eventSlave);
						} else {
							t.push(`most of ${his} cum has worked its way into your body; it's a good thing ${he} can't get you pregnant.`);
						}
					} else {
						t.push(`And since you can't move yourself, you're stuck with ${his} loads all over you until your morning cleaning. Just great.`);
					}
				}
			} else if (V.PC.balls >= 50) {
				t.push(`You, on the other hand, are left to try and fall back to sleep with a pair of painfully sore balls from where ${he} was bouncing against them.`);
			} else {
				t.push(`You, on the other hand, are left to try and fall back to sleep with a sore dick and an aching pelvis.`);
			}
			App.Events.addParagraph(frag, t);
			eventSlave.trust += 4;
			tryKnockMeUp(eventSlave, 100, 2, V.PC);
			if (eventSlave.mpreg === 1) {
				seX(eventSlave, "anal", V.PC, "penetrative", 4);
			} else {
				seX(eventSlave, "vaginal", V.PC, "penetrative", 4);
			}

			return frag;
		}

		function reverseRape() {
			t = [];

			t.push(`When you try to reach for ${him}, ${he} grabs your ${hasBothArms(V.PC) ? "wrists" : "wrist"} and pins you down; ${he}'s got the advantage over you and intends to use it.`);
			if (canTalk(eventSlave)) {
				t.push(`"${Spoken(eventSlave, `No! I need this! You WILL get me pregnant!`)}"`);
			} else {
				t.push(`${He} glares ferociously at you, obviously intending to take what ${he} came here for by force if necessary.`);
			}
			t.push(`As ${he} slames down on your erect dick, it becomes clear just how far ${he} planned this out; ${he} has been keeping you on edge so that just a few quick bounces are all it takes to bring you to climax.`);
			if (canTalk(eventSlave)) {
				t.push(`${He} leans in close and whispers,`);
				t.push(`"${Spoken(eventSlave, `Thank you, ${Master}, you're the best,`)}"`);
				t.push(`before snapping back to ${his} senses and releasing you.`);
			} else {
				t.push(`As ${he} feels your warm ejaculate fill ${his} depths, ${he} gestures apology after apology in the vain hope that you'll show mercy before clambering off of you.`);
			}
			if (canTalk(eventSlave)) {
				t.push(`"${Spoken(eventSlave, `I'm sorry, I'm so sorry! I didn't mean it to be like this...`)}"`);
			}
			t.push(`${He} quickly flees the scene, <span class="trust dec">terrified of the impending repercussions.</span>`);
			eventSlave.trust -= 10;
			tryKnockMeUp(eventSlave, 100, 2, V.PC);
			if (eventSlave.mpreg === 1) {
				seX(eventSlave, "anal", V.PC, "penetrative", 1);
			} else {
				seX(eventSlave, "vaginal", V.PC, "penetrative", 1);
			}

			return t;
		}
	}
};
