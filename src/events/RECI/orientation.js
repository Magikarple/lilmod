App.Events.RECIOrientation = class RECIOrientation extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => this.validSlave(s),
				s => s.assignment !== Job.QUARTER,
				s => s.attrXY > 50,
				s => s.anus !== 0,
				s => s.vagina !== 0,
				s => (canDoAnal(s) || canDoVaginal(s)),
				s => s.devotion >= 10,
				canStand,
				canTalk,
				canHear,
				hasBothLegs,
			]
		];
	}

	validSlave(slave) {
		return V.RECheckInIDs.some((a) => (a.ID === slave.ID && a.type === "orientation"));
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {He, he, his, him, himself, girl} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const desc = SlaveTitle(eventSlave);

		V.RECheckInIDs.deleteWith((s) => s.ID === eventSlave.ID && s.type === "orientation");

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let t = [];
		t.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		t.push(`is the second slave on the inspection schedule for today. ${He} comes into your office naked, to find that the first inspection is going a little long. The slave before ${him} is obediently riding`);
		if (V.PC.dick === 0) {
			t.push(`one of your larger strap-ons.`);
		} else {
			t.push(`your cock.`);
		}
		t.push(`${He} waits patiently, but does not bother to hide ${his} arousal at the`);
		if (canSee(eventSlave)) {
			t.push(`lewd sight.`);
		} else {
			t.push(`sound of flesh slapping flesh.`);
		}
		t.push(`${He} obviously wants to be next;`);
		if (eventSlave.chastityPenis === 1) {
			t.push(`${his} chastity cage is dribbling precum, and ${he}'s clearly uncomfortable with simultaneous arousal and unwillingness to suffer a hard-on inside it,`);
		} else if (canAchieveErection(eventSlave)) {
			t.push(`${his} cock is painfully erect,`);
		} else if (eventSlave.dick > 6) {
			t.push(`precum is starting to bead at the tip of ${his} inhuman cock,`);
		} else if (eventSlave.dick > 0) {
			t.push(`${his} pathetically limp dick is practically dripping precum,`);
		} else if (eventSlave.clit > 0) {
			t.push(`${his} big clit is visibly erect,`);
		} else {
			t.push(`a sheen is visible on ${his} pussylips,`);
		}
		t.push(`${his} nipples are`);
		if (eventSlave.nipples !== "fuckable") {
			t.push(`stiff,`);
		} else {
			t.push(`swollen tight,`);
		}
		t.push(`and ${he}'s starting to breathe a little hard.`);
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`When you finish and send the slave you were boning on their way with a light slap on the rump, you seat yourself to inspect ${eventSlave.slaveName}. As you do,`);
		if (V.PC.dick === 0) {
			t.push(`your rather realistically modeled phallus dangles`);
		} else {
			t.push(`your half-hard but still quite imposing cock hangs`);
		}
		t.push(`between your legs, still slick from fucking the previous inspectee.`);
		if (canSee(eventSlave)) {
			t.push(`${eventSlave.slaveName}'s`);
			t.push(App.Desc.eyesColor(eventSlave));
			t.push(`focus`);
		} else {
			t.push(`${eventSlave.slaveName} focuses`);
		}
		t.push(`on it with painful intensity,`);
		if (eventSlave.chastityPenis === 1) {
			t.push(`and the ${desc}'s chastity cage begins to bother ${him} even more.`);
		} else if (canAchieveErection(eventSlave)) {
			t.push(`and the ${desc}'s hard dick releases a string of precum.`);
		} else if (eventSlave.dick > 6) {
			t.push(`and the ${desc}'s oversized dick engorges as much as it possibly can.`);
		} else if (eventSlave.dick > 0) {
			t.push(`and the ${desc}'s soft dick twitches weakly.`);
		} else if (eventSlave.clit > 0) {
			t.push(`and the ${desc}'s clit gets, if possible, even more flushed and erect.`);
		} else {
			t.push(`the distinct smell of female arousal in the office intensifying.`);
		}
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`You remember the way ${he} was when ${he} became your slave with sudden clarity. ${He} was not a fan of the dick then, but ${he}'s certainly come around.`);
		if (V.PC.dick === 0) {
			t.push(`Even a realistic strap-on is enough to get ${him} all hot and bothered.`);
		}
		t.push(`On impulse, you ask ${him} if ${he} remembers how ${he} used to feel about cock. ${He} hesitates, wondering how to answer, but decides that honesty is the best policy and giggles,`);
		t.push(Spoken(eventSlave, `"Yes, ${Master}. I do. I mean, not all the time. It's easy to forget that I wasn't always such a cock-hungry slut."`));
		t.push(`${He} laughs, a rueful sound.`);
		if (eventSlave.energy > 95) {
			t.push(Spoken(eventSlave, `"I need it so bad now, I'll let anybody fuck me. I mean, I'd let anybody fuck me, if it wasn't already my job as a slave.`));
		} else if (eventSlave.fetish === "cumslut" && eventSlave.fetishStrength > 60) {
			t.push(Spoken(eventSlave, `"Cocks are so hot. Just thinking about them gets me all horny. How they're all throbbing and warm and then they cum..."`));
			t.push(`${He} trails off.`);
			t.push(Spoken(eventSlave, `"Sorry, got distracted.`));
		} else if (eventSlave.fetish === "buttslut" && eventSlave.fetishStrength > 60) {
			t.push(Spoken(eventSlave, `"I didn't know how much fun getting fucked in the butt was back then.`));
		} else if (eventSlave.fetish === "pregnancy" && eventSlave.fetishStrength > 60) {
			t.push(Spoken(eventSlave, `"I didn't know how good it felt to receive a load of fresh cum back then.`));
		} else {
			t.push(Spoken(eventSlave, `"Guys are just so hot — all big and strong and muscly.`));
		}
		if (V.PC.title === 1) {
			t.push(Spoken(eventSlave, `And being owned by such a handsome man has helped."`));
		} else {
			t.push(Spoken(eventSlave, `Not that I don't love ladies too."`));
		}
		t.push(`${He} arches ${his} back and bats ${his} eyes at you.`);
		t.push(Spoken(eventSlave, `"A lot."`));
		App.Events.addParagraph(node, t);


		App.Events.addResponses(node, [
			new App.Events.Result(`${He} wants dick. Give ${him} the dick`, dicking),
			new App.Events.Result(`Send ${him} down to a gym to share that attraction around`, gymService),
		]);

		function dicking() {
			const arms = hasBothArms(eventSlave) ? "arms" : "arm";

			t = [];
			t.push(`You`);
			if (V.PC.belly >= 10000) {
				t.push(`push yourself`);
			} else {
				t.push(`rise fluidly`);
			}
			t.push(`out of your chair,`);
			if (canSee(eventSlave)) {
				t.push(`pointing at the floor`);
				if (eventSlave.belly >= 100000 || eventSlave.boobs > 50000) {
					t.push(`at ${his} feet.`);
				} else {
					t.push(`in front of ${him}.`);
				}
			} else {
				t.push(`ordering ${him} to prepare ${himself}.`);
			}
			t.push(`${He} needs no further direction, and hurriedly gets down to place ${his} mouth at dick height. ${He}`);
			if (V.PC.dick === 0) {
				t.push(`gives your strap-on a blowjob`);
			} else {
				t.push(`sucks you off`);
				if (V.PC.vagina !== -1) {
					t.push(`and eats you out`);
				}
			}
			t.push(`with relish,`);
			if (V.PC.belly >= 10000) {
				t.push(`hair tickling the underside of your belly,`);
			} else {
				t.push(`looking adoringly up at you`);
			}
			t.push(`as ${he} rhythmically works ${his} lips up and down`);
			if (V.PC.dick === 0) {
				t.push(`the`);
			} else {
				t.push(`your`);
			}
			t.push(`thick shaft. After a bit of this, you pull`);
			if (V.PC.dick === 0) {
				t.push(`the phallus`);
			} else {
				t.push(`yourself`);
			}
			t.push(`free with a delicious popping noise, and haul the slave`);
			if (canWalk(eventSlave)) {
				t.push(`to ${his} feet`);
			} else {
				t.push(`upright`);
			}
			t.push(`with ${his} back to you. You grab ${his}`);
			if (hasAnyArms(eventSlave)) {
				t.push(`${arms}`);
			} else {
				t.push(`shoulders`);
			}
			t.push(`in a firm hold and`);
			// TODO: fucking height
			if (V.PC.belly >= 1000) {
				t.push(`guide ${him} forward`);
				if (eventSlave.belly >= 300000) {
					t.push(`onto ${his} ${belly} belly`);
				}
			} else {
				t.push(`pull ${him} up on tiptoe`);
			}
			t.push(`(at which the horny ${girl} giggles with anticipation), and then thrust into the`);
			if (eventSlave.weight > 10) {
				t.push(`soft crevice between ${his} plush thighs.`);
			} else {
				t.push(`gap between ${his} thighs.`);
			}
			t.push(`This motion slides`);
			if (V.PC.dick === 0) {
				t.push(`the strap-on`);
			} else {
				t.push(`your hard dick`);
			}
			if (eventSlave.vagina > -1) {
				t.push(`against ${his} moist pussylips,`);
			} else if (eventSlave.scrotum > 0) {
				t.push(`against ${his} anus and then past ${his} ballsack,`);
			} else {
				t.push(`along ${his} sensitive perineum,`);
			}
			t.push(`eliciting a shocked gasp and then a prolonged whine of pleasure. ${He} humps ${himself} along`);
			if (V.PC.dick === 0) {
				t.push(`the phallus`);
			} else {
				t.push(`your shaft`);
				if (V.PC.vagina !== -1) {
					t.push(`and mons`);
				}
			}
			t.push(`shamelessly, craning around to rain kisses on your`);
			if (V.PC.belly >= 10000) {
				t.push(`baby bump.`);
			} else {
				t.push(`jawline and neck.`);
			}
			t.push(`When you gently push ${his} face away from you by`);
			if (V.PC.belly >= 10000) {
				t.push(`leaning into ${him},`);
			} else {
				t.push(`tipping ${his} torso forward,`);
			}
			t.push(`${he} moans a little from the loss of closeness, but soon forgets it when you press your`);
			if (V.PC.dick === 0) {
				t.push(`strap-on`);
			} else {
				t.push(`dick`);
			}
			if (canDoVaginal(eventSlave)) {
				t.push(`inside ${him}. ${He} begins to gasp your name, moan adoration, and beg nonsensically, and ${he} orgasms promptly. ${He} groans with`);
				if (canDoAnal(eventSlave)) {
					t.push(`overstimulation as you pull out, and then whines when you redouble it by immediately switching to ${his}`);
					if (eventSlave.anus > 2) {
						t.push(`loose`);
					} else if (eventSlave.anus > 1) {
						t.push(`practiced`);
					} else {
						t.push(`tight`);
					}
					t.push(`ass.`);
				} else {
					t.push(`overstimulation, but you're just getting started; you grab ${his} hips and hoist ${him} up to fuck ${his}`);
					if (eventSlave.vagina > 9) {
						t.push(`abyssal`);
					} else if (eventSlave.vagina > 3) {
						t.push(`gaping`);
					} else if (eventSlave.vagina > 2) {
						t.push(`loose`);
					} else if (eventSlave.vagina > 1) {
						t.push(`practiced`);
					} else {
						t.push(`tight`);
					}
					t.push(`pussy some more.`);
				}
			} else {
				t.push(`against ${his}`);
				if (eventSlave.anus > 2) {
					t.push(`loose`);
				} else if (eventSlave.anus > 1) {
					t.push(`practiced`);
				} else {
					t.push(`tight`);
				}
				t.push(`anus. As you push inside ${him}, ${he} begins to gasp your name, moan adoration, and beg nonsensically, and ${he} orgasms promptly. ${He} groans with overstimulation, but you're just getting started; you grab ${his} hips and hoist ${him} up to fuck ${his} ass some more.`);
			}
			t.push(`You climax there, your tour of ${his} holes completed; ${he} drops down to clean you off again before <span class="trust inc">thanking you earnestly</span> and taking ${his} leave, though not without a final turn in the doorway to`);
			if (canSee(eventSlave)) {
				t.push(`steal a final loving glance at`);
				if (V.PC.dick === 0) {
					t.push(`your strap-on.`);
				} else {
					t.push(`your junk.`);
				}
			} else {
				t.push(`fantasize a little about the next time ${he}'ll be intimate with`);
				if (V.PC.dick === 0) {
					t.push(`your strap-on.`);
				} else {
					t.push(`your junk.`);
				}
			}
			eventSlave.trust += 4;
			seX(eventSlave, "oral", V.PC, "penetrative");
			if (canDoVaginal(eventSlave)) {
				seX(eventSlave, "vaginal", V.PC, "penetrative");
				if (canDoAnal(eventSlave)) {
					seX(eventSlave, "anal", V.PC, "penetrative");
					if (canImpreg(eventSlave, V.PC)) {
						knockMeUp(eventSlave, 10, 2, -1);
					}
				} else {
					seX(eventSlave, "vaginal", V.PC, "penetrative");
					if (canImpreg(eventSlave, V.PC)) {
						knockMeUp(eventSlave, 10, 0, -1);
					}
				}
			} else if (canDoAnal(eventSlave)) {
				seX(eventSlave, "anal", V.PC, "penetrative", 2);
				if (canImpreg(eventSlave, V.PC)) {
					knockMeUp(eventSlave, 10, 1, -1);
				}
			}
			return t;
		}

		function gymService() {
			t = [];
			t.push(`You bring up a schematic of the arcology and`);
			if (canSee(eventSlave)) {
				t.push(`point out a`);
			} else {
				t.push(`detail the path to a nearby`);
			}
			t.push(`public gym to ${him}; you`);
			if (canHold(eventSlave)) {
				t.push(`hand ${him} a day pass,`);
			} else {
				t.push(`fasten a day pass around ${his} neck,`);
			}
			t.push(`tell ${him} to go down there, and let ${him} know ${he}'ll spend the rest of the day there. ${He} looks mystified, and when you do not elaborate further, ${he} asks,`);
			t.push(Spoken(eventSlave, `"What should I do there, ${Master}?"`));
			t.push(`Anything ${he} wants, you tell ${him}. ${He} still looks somewhat puzzled, but ${he}`);
			if (canWalk(eventSlave)) {
				t.push(`heads down`);
			} else {
				t.push(`accepts help down`);
			}
			t.push(`to the gym anyway. When ${he} gets there, ${he}`);
			if (canSee(eventSlave)) {
				t.push(`sees a steady stream of well-muscled male citizens entering the showers,`);
			} else {
				t.push(`hears the well-muscled male citizens working up a sweat before heading to the showers,`);
			}
			t.push(`and gets it. ${He} waves cheerfully to the nearest camera, and blows you a kiss before heading into the locker room. This is the Free Cities, and there isn't much reaction to a naked ${girl} entering a male-dominated gym. That is, until ${he} selects from among the sweaty gentlemen coming in from the weight room, sidles up to one, and says cheerfully,`);
			t.push(Spoken(eventSlave, `"Hi! Do you wanna fuck me?"`));
			t.push(`He does, and <span class="reputation inc">so do many of his friends.</span> So many, in fact, that having the showers right there becomes convenient for ${him} as the day goes on.`);
			repX(1250, "event", eventSlave);
			seX(eventSlave, "oral", "public", "penetrative", 5);
			if (canDoVaginal(eventSlave)) {
				seX(eventSlave, "vaginal", "public", "penetrative", 5);
				if (canDoAnal(eventSlave)) {
					seX(eventSlave, "anal", "public", "penetrative", 5);
					if (canGetPregnant(eventSlave) && eventSlave.eggType === "human") {
						knockMeUp(eventSlave, 10, 2, -2);
					}
				} else {
					seX(eventSlave, "vaginal", "public", "penetrative", 5);
					if (canGetPregnant(eventSlave) && eventSlave.eggType === "human") {
						knockMeUp(eventSlave, 10, 0, -2);
					}
				}
			} else {
				seX(eventSlave, "anal", "public", "penetrative", 10);
				if (canGetPregnant(eventSlave) && eventSlave.eggType === "human") {
					knockMeUp(eventSlave, 10, 1, -2);
				}
			}
			return t;
		}
	}
};
