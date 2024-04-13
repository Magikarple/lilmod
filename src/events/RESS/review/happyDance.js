App.Events.RESSHappyDance = class RESSHappyDance extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => canTalk(s, false),
				canHear,
				s => s.assignment !== Job.QUARTER,
				s => s.skill.entertainment >= 60 || ["a ballerina", "a camgirl", "a camwhore", "a cheerleader", "a classical dancer", "a dancer", "a house DJ", "a party girl", "an aspiring pop star", "an exotic dancer", "an idol"].includes(s.career),

				s => s.health.condition > 40,
				s => s.devotion > 50,
				s => s.trust > 50,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, hers
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(`As you pass by the area of the penthouse where slaves sleep one morning, you're struck by a`);
		if (eventSlave.voice > 2) {
			r.push(`high, bubbly`);
		} else if (eventSlave.voice > 1) {
			r.push(`feminine`);
		} else {
			r.push(`deep`);
		}
		r.push(
			`humming. It's`,
			contextualIntro(V.PC, eventSlave, true)
		);
		r.addToLast(`, dancing`);
		if (eventSlave.rules.living === "luxurious") {
			r.push(`in the doorway of ${his} room,`);
		} else {
			r.push(`at the foot of ${his} bedroll,`);
		}
		r.push(`dancing like no one's watching. ${He}'s just woken up, and`);
		if (eventSlave.physicalAge > 35) {
			r.push(`is full of energy and vigor in open defiance of ${his} age`);
		} else if (eventSlave.physicalAge < 25) {
			r.push(`is full of youthful energy and vigor`);
		} else {
			r.push(`is full of health and energy`);
		}
		if (eventSlave.belly >= 10000) {
			r.addToLast(`, despite being`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`heavily pregnant`);
			} else if (eventSlave.bellyImplant >= 3000) {
				r.push(`heavily gravid`);
			} else {
				r.push(`greatly bloated`);
			}
		}
		r.addToLast(`. ${He}'s letting it out by humming a beat and dancing seductively, all by ${himself}.`);

		r.toParagraph();

		r.push(`You recognize the tune: it's one of`);
		if (S.DJ) {
			r.push(`${S.DJ.slaveName}'s most popular tracks,`);
		} else if (V.club !== 0) {
			r.push(`the most popular tracks in ${V.clubName},`);
		} else {
			r.push(`the most popular house tracks in the Free City,`);
		}
		r.push(`and it's made for sexy dancing. Shaking ${his}`);
		if (eventSlave.hips > 2) {
			if (eventSlave.weight > 30) {
				r.push(`awe inspiring, soft`);
			} else if (eventSlave.weight >= -10) {
				r.push(`awe inspiring`);
			} else {
				r.push(`awe inspiring yet skinny`);
			}
		} else if (eventSlave.hips > 0) {
			if (eventSlave.weight > 30) {
				r.push(`broad, chubby`);
			} else if (eventSlave.weight >= -10) {
				r.push(`broad`);
			} else {
				r.push(`broad yet skinny`);
			}
		} else if (eventSlave.hips === 0) {
			if (eventSlave.weight > 30) {
				r.push(`chubby`);
			} else if (eventSlave.weight >= -10) {
				r.push(`feminine`);
			} else {
				r.push(`skinny`);
			}
		} else {
			if (eventSlave.weight > 30) {
				r.push(`narrow, chubby`);
			} else if (eventSlave.weight >= -10) {
				r.push(`narrow`);
			} else {
				r.push(`narrow and skinny`);
			}
		}
		r.push(`hips`);
		if (eventSlave.belly >= 5000) {
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`and ${belly} baby bump`);
			} else if (eventSlave.bellyImplant >= 3000) {
				r.push(`and ${belly} round belly`);
			} else {
				r.push(`and ${eventSlave.inflationType}-filled belly`);
			}
		}
		r.push(`in time with ${his} humming, ${he} runs ${his}`);
		if (hasBothArms(eventSlave)) {
			r.push(`hands`);
		} else {
			r.push(`hand`);
		}
		r.push(`sensually over them, along ${his} flanks, and over ${his} chest,`);
		if (eventSlave.boobs > 3000) {
			r.push(`letting the vast mass of ${his} tits rest atop them`);
		} else if (eventSlave.boobs > 1000) {
			r.push(`groping ${his} own heavy breasts`);
		} else {
			r.push(`${his} fingertips circling ${his} nipples`);
		}
		r.push(`for an alluring moment. As ${his} hips maintain their sexual rhythm, ${his} hands continue, tracing up ${his} throat, over ${his} moist lips, and over ${his} head. As ${he} stretches up, ${his} torso begins to sway with the barely perceptible beat, ${his}`);
		if (eventSlave.boobsImplant/eventSlave.boobs >= .75) {
			r.push(`fake tits staying perfectly in place.`);
		} else if (eventSlave.boobs > 2000) {
			r.push(`${eventSlave.boobShape === "normal" ? `` : `${eventSlave.boobShape} `}boobs swaying along.`);
		} else if (eventSlave.boobs > 400) {
			r.push(`${eventSlave.boobShape === "normal" ? `` : `${eventSlave.boobShape} `}tits bouncing along.`);
		} else {
			r.push(`petite chest accentuating ${his} gamine charm.`);
		}

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Enjoy the show`, enjoy),
			new App.Events.Result(`Dance along with ${him}`, dance)
		]);

		function enjoy() {
			const r = new SpacedTextAccumulator();
			r.push(`There are low leather ottomans scattered all over the penthouse, for rest, relaxation, and sex. You seat yourself on the nearest one, enjoying the spectacle. ${He} feels your eyes on ${him}, a sensation ${he} knows well, and turns with a little smile on ${his} ${eventSlave.faceShape} face, putting an extra swing in ${his} hips`);
			if (eventSlave.belly >= 5000) {
				r.addToLast(`, causing ${his} weighty middle to swing wide`);
			}
			r.addToLast(`. ${He}'s still dancing alone, but now ${he}'s giving you a private show. You give ${him} the proper music, instructing ${V.assistant.name} to play the track ${he} was humming.`);
			r.toParagraph();
			r.push(`${He} advances on you slowly, sensually, relishing the beat and doing ${his} best to show off ${his} body.`);
			if (eventSlave.dick > 0) {
				r.push(`${His}`);
				if (eventSlave.chastityPenis === 1) {
					r.push(`chastity cage sways`);
				} else if (canAchieveErection(eventSlave)) {
					r.push(`erection waves back and forth`);
				} else if (eventSlave.dick > maxErectionSize(eventSlave)) {
					if (V.maxErectionSizeOption === 0) {
						r.push(`${his} soft python of a cock`);
					} else {
						r.push(`${his} soft, oversized cock`);
					}
					r.push(`swings lewdly`);
				} else {
					r.push(`bitchclit bounces`);
				}
				r.push(`with ${his} rhythm.`);
			}
			if (eventSlave.vagina > -1) {
				r.push(`${His}`);
				if (eventSlave.chastityVagina) {
					r.push(`chastity catches your eye`);
				} else if (eventSlave.clit > 1) {
					r.push(`big clit catches your eye`);
				} else if (eventSlave.labia > 0) {
					r.push(`generous petals catch your eye`);
				} else if (eventSlave.vaginaLube > 1) {
					r.push(`wet cunt glistens`);
				} else {
					r.push(`womanhood is ${his} center`);
				}
				r.push(`as ${he} moves.`);
			}
			r.push(`${He} gives you an excellent nude lap dance, expressing the art at the level only the finest old world strippers can manage. The interaction is all about you, your eyes on ${his} body, your desire for ${his} touch, and finally your`);
			if (V.PC.dick !== 0) {
				r.push(`cum flowing into ${his} mouth as ${he} sucks your dick`);
				if (V.PC.vagina !== -1) {
					r.push(`and the wetness against ${his} fingers as they tease your pussy`);
				}
			} else {
				r.push(`pussyjuice coating ${his} lips as ${he} eats you out`);
			}
			r.addToLast(`. ${He} <span class="trust inc">knows ${his} place</span> very well.`);
			eventSlave.trust += 4;
			seX(eventSlave, "oral", V.PC, "penetrative");
			r.toParagraph();
			return r.container();
		}

		function dance() {
			const r = new SpacedTextAccumulator();
			r.push(`${He} doesn't`);
			if (canSee(eventSlave)) {
				r.push(`see`);
			} else {
				r.push(`notice`);
			}
			r.push(`you advance on ${him}; ${he}'s facing away from you, and in any case, ${he}'s lost in ${his} own little world. At the same moment, however, ${he} begins to hear the track you're humming, in perfect synchrony with the way ${he}'s humming it, and senses a presence at ${his} side. You timed it perfectly, directing the sound system here to play the right track, match it to ${him}, and fade it in as you approached and began to dance beside ${him}.`);
			if (V.PC.title === 0) {
				r.push(`You've got a woman's body, and you match ${his} moves, though an observer might see greater power and dominance in the way you dance.`);
			} else {
				r.push(`You make your moves the masculine companion to ${hers}, moving like a paragon of frank male`);
				if (V.PC.belly >= 1500) {
					r.push(`sexuality, despite the fecund curve to your stomach.`);
				} else if (V.PC.boobs >= 300) {
					r.push(`sexuality, despite the pair of breasts bouncing on your chest.`);
				} else {
					r.push(`sexuality.`);
				}
			}
			r.toParagraph();
			r.push(`There's a momentary flaw in ${his} rhythm, a catch in ${his} breath as ${he} realizes what you're doing, but ${he} gets right back into it, displaying ${his} pleasure with nothing more than a ghost of a smile`);
			if (canSee(eventSlave) || canHear(eventSlave)) {
				r.push(`and a`);
				if (canSee(eventSlave)) {
					r.push(`widening of ${his}`);
					if (hasBothEyes(eventSlave)) {
						r.push(`eyes`);
					} else {
						r.push(`eye`);
					}
					r.push(`as ${he} looks you up and down`);
				} else {
					r.push(`slight perk of ${his} ears as ${he} tracks your motion`);
				}
			}
			r.addToLast(`. ${He} doesn't shove ${himself} against you; that would be coarse. Instead ${he} dances alluringly, just out of your grasp. Taking the dominant role, you encircle ${him} in your arms and draw ${him} in close, ${his} heat perceptible against your skin before the very first graze of ${his} ${eventSlave.skin} body against yours. ${He} continues to dance gorgeously as ${he} helps you out of your clothes.`);
			r.toParagraph();
			r.push(`When you're nude, ${he} turns ${his} back to you and starts to grind, letting you feel ${his}`);
			if (eventSlave.weight > 160) {
				r.push(`rippling`);
			} else if (eventSlave.weight > 95) {
				r.push(`thick`);
			} else if (eventSlave.weight > 30) {
				r.push(`chubby`);
			} else if (eventSlave.muscles > 95) {
				r.push(`ripped`);
			} else if (eventSlave.muscles > 30) {
				r.push(`muscled`);
			} else if (eventSlave.weight > 10) {
				r.push(`plush`);
			} else if (eventSlave.muscles > 5) {
				r.push(`toned`);
			} else if (eventSlave.weight < -10) {
				r.push(`thin`);
			} else {
				r.push(`soft`);
			}
			r.push(`body all up and down your front. Feeling your`);
			if (V.PC.dick === 0) {
				r.push(`building heat, ${he} begins to incorporate gentle caresses of your womanhood,`);
			} else {
				r.push(`erection brushing against ${him}, ${he} begins to corral it between ${his} buttocks and thighs,`);
			}
			r.push(`and you return the favor by teasing ${his} nipples`);
			if (canDoVaginal(eventSlave)) {
				r.addToLast(`, pussylips, clit,`);
			}
			r.push(`and even ${his} ass. You orgasm one after the other, and as the music fades, ${he} <span class="devotion inc">throws ${his} arms around you.</span>`);
			eventSlave.devotion += 4;
			seX(eventSlave, "oral", V.PC, "penetrative");
			r.toParagraph();
			return r.container();
		}
	}
};
