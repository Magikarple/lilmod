
App.Events.REFIBoobslut = class REFIBoobslut extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // event slave /InterestTargetID
				isSlaveAvailable,
				s => (s.fetish === Fetish.NONE || s.fetishStrength <= 60),
				s => (canSee(s) || canHear(s)),
				s => s.rules.speech !== "restrictive",
			],
			[ // and subslave /subID
				s => App.Events.qualifiesForREFIsubSlave(s, "boobs"),
				s => s.lactation > 0
			]
		];
	}

	execute(node) {
		const [eventSlave, subSlave] = this.actors.map(a => getSlave(a));
		const {He, he, his, him, himself} = getPronouns(eventSlave);
		const {he2, his2} = getPronouns(subSlave).appendSuffix("2");
		const {say, title: master} = getEnunciation(eventSlave);

		App.Events.drawEventArt(node, [eventSlave, subSlave], [eventSlave.clothes, "no clothing"]);

		if (subSlave.lactation > 0) {
			subSlave.lactationDuration = 2;
			subSlave.boobs -= subSlave.boobsMilk;
			subSlave.boobsMilk = 0;
		} else {
			induceLactation(subSlave, 4);
		}

		let t = [];

		t.push(`On lunch duty today is`);
		t.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, subSlave, true), "."));
		t.push(`That means that as you eat your working lunch, ${he2} sits on the edge of your desk right next to you, so that`);
		if (subSlave.belly >= 100000) {
			t.push(`a nipple is`);
		} else {
			t.push(`${his2} nipples are`);
		}
		t.push(`conveniently at mouth height. Whenever you feel thirsty, you lean`);
		if (subSlave.nipples === "partially inverted" || subSlave.nipples === "inverted") {
			t.push(`over, pop one out,`);
		} else if (subSlave.nipples === "fuckable") {
			t.push(`over, slip your tongue deep inside,`);
		} else {
			t.push("over,");
		}
		t.push(`take some of ${his2} creamy${subSlave.milkFlavor === "none" ? `` : `, ${subSlave.milkFlavor}-flavored`} milk straight from the source. Every time you do, ${he2} shudders convulsively,`);
		if (canTalk(subSlave)) {
			t.push(`giving little mewling whimpers.`);
		} else {
			if (subSlave.accent >= 3) {
				t.push(`giving little mewling whimpers.`);
			} else if (subSlave.voice === 0) {
				t.push(`making the harsh gasping noises that are all ${he2} can manage, as a mute.`);
			} else {
				t.push(`giving small moans through ${his2} obstructed mouth.`);
			}
		}
		t.push(`Though you never touch anything but ${his2} nipples, ${he2} climaxes twice. After you finish and ${he2} leaves, you notice`);
		t.push(contextualIntro(V.PC, eventSlave, true), `at the door to your office. You call ${him} in.`);
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`${eventSlave.slaveName} hesitates before explaining ${himself}, and the ${SlaveTitle(eventSlave)} is obviously aroused:`);
		if (eventSlave.dick > 0 && eventSlave.chastityPenis === 1) {
			t.push(`${he}'s got a string of precum leaking out of ${his} chastity cage.`);
		} else if (eventSlave.dick > 0 && eventSlave.hormoneBalance >= 100) {
			t.push(`though ${his} hormone-filled body can't get ${his} dick hard any more, ${he}'s got a string of precum coming off ${his} member.`);
		} else if (eventSlave.dick > 0 && eventSlave.balls > 0 && eventSlave.ballType === "sterile") {
			t.push(`though ${his} useless balls can't muster the effort to get ${his} dick hard any more, ${he}'s got a string of precum coming off ${his} limp member.`);
		} else if (eventSlave.dick > 0 && eventSlave.balls === 0) {
			t.push(`though ${his} gelded body can't get ${his} dick hard any more, ${he}'s got a string of precum coming off ${his} limp member.`);
		} else if (canAchieveErection(eventSlave)) {
			if (eventSlave.dick > 4) {
				t.push(`${his} gigantic cock is standing out like a mast.`);
			} else if (eventSlave.dick > 2) {
				t.push(`${he}'s sporting an impressive erection.`);
			} else if (eventSlave.dick > 0) {
				t.push(`${his} little penis is rock hard.`);
			}
		} else if (eventSlave.dick > 7) {
			t.push(`${he}'s got a string of precum coming off ${his} engorged member.`);
		} else if (eventSlave.dick > 0) {
			t.push(`${he}'s got a string of precum coming off ${his} limp member.`);
		} else if (eventSlave.clit > 0) {
			t.push(`${his} large clit is visibly engorged.`);
		} else if (eventSlave.vagina > -1) {
			if (eventSlave.nipples !== "fuckable") {
				t.push(`${his} nipples are hard and`);
			}
			t.push(`there's a sheen on ${his} pussylips.`);
		} else if (eventSlave.balls > 0) {
			if (eventSlave.nipples !== "fuckable") {
				t.push(`${his} nipples are hard and`);
			}
			t.push(`there is a distinct dribble of precum running from ${his} featureless crotch.`);
		} else {
			if (eventSlave.nipples !== "fuckable") {
				t.push(`${his} nipples are hard and`);
			}
			t.push(`there is a clear scent of lust around ${him}.`);
		}
		t.push(`It seems ${he} passed by while you were drinking from`, contextualIntro(eventSlave, subSlave), `and found the`);
		if (canSee(eventSlave)) {
			t.push(`sight`);
		} else {
			t.push(`sounds`);
		}
		t.push(`rather compelling. It should be possible to either encourage this fascination or steer ${him} away from it for now.`);

		App.Events.addParagraph(node, t);
		App.Events.addResponses(node, [
			new App.Events.Result(`Turn ${him} into another breast fetishist`, turn),
			new App.Events.Result(`Steer ${him} away from breast obsession for the moment`, steer),
		]);

		function turn() {
			t = [];

			if (!canTalk(eventSlave)) {
				if (eventSlave.accent >= 3) {
					if (!hasAnyArms(eventSlave)) {
						t.push(`Since ${he} isn't conversant in ${V.language} and lacks the hands to gesture, ${he}'s forced to push out ${his} chest and wiggle to try to communicate that ${he} would like to experience a nipple orgasm, too.`);
					} else {
						t.push(`Since ${he} isn't conversant in ${V.language}, ${he}'s forced to use some delightfully lewd gestures at ${his} own boobs to communicate that ${he} would like to experience a nipple orgasm, too.`);
					}
				} else if (eventSlave.voice === 0) {
					if (!hasAnyArms(eventSlave)) {
						t.push(`${He}'s mute and has no hands, so it takes a long, frustrating time for ${him} to communicate that ${he} would like to experience a nipple orgasm, too.`);
					} else {
						t.push(`${He}'s mute, so ${he} uses gestures to ask you for a nipple orgasm, too.`);
					}
				} else {
					t.push(`${He} can't form`);
					if (!hasAnyArms(eventSlave)) {
						t.push(`words and has no hands, so it takes a long, frustrating time for ${him} to communicate that ${he} would like to experience a nipple orgasm, too.`);
					} else {
						t.push(`words, so ${he} uses gestures to ask you for a nipple orgasm, too.`);
					}
				}
			} else {
				if (eventSlave.lips > 70) {
					t.push(`${He} ${say}s through ${his} massive dick-sucking lips,`);
				} else if (eventSlave.piercing.lips.weight + eventSlave.piercing.tongue.weight > 2) {
					t.push(`${He} ${say}s through ${his} big oral piercings,`);
				} else {
					t.push(`${He} ${say}s,`);
				}
				t.push(Spoken(eventSlave, `"${capFirstChar(master)}, may I have a nipple orgasm, too?"`));
			}
			t.push(`You make ${him} state it more explicitly, so ${he} tries again:`);
			if (!hasAnyArms(eventSlave) && !canTalk(eventSlave)) {
				t.push(`${he} sticks ${his} chest out as far as it will go, and wiggles it back and forth demonstratively.`);
			} else if (!canTalk(eventSlave)) {
				t.push(`${he} tries to depict suckling and orgasm with ${his}`);
				if (hasBothArms(eventSlave)) {
					t.push(`hands,`);
				} else {
					t.push(`hand,`);
				}
				t.push(`but gives up and just sticks ${his} tits out at`);
				if (eventSlave.nipples === "fuckable") {
					t.push(`you while fingering ${his} nipplecunts.`);
				} else {
					t.push(`you, pinching ${his} nipples hard.`);
				}
			} else {
				t.push(Spoken(eventSlave, `"Please use my boobs, ${master}!"`));
			}
			t.push(`${He} gasps as you seize ${him} and carry ${him}`);
			if (V.PC.belly >= 30000) {
				t.push(`to the couch, but ${he}'s clearly pleased. While you would rather sit ${him} on your lap, you are far too pregnant to fit ${him}; instead you settle ${him} beside you and torment`);
			} else {
				t.push(`back to your desk chair, but ${he}'s clearly pleased. You sit in the chair with ${him} in your lap facing away from`);
				if (V.PC.boobs >= 300) {
					t.push(`you, ${his} back against your breasts and torment`);
				} else {
					t.push(`you, and torment`);
				}
			}
			t.push(`${his} nipples until ${he}'s close to climax. Then you get ${him} on`);
			if (hasBothLegs(eventSlave)) {
				t.push(`${his} knees`);
			} else {
				t.push(`the floor`);
			}
			t.push(`and push ${him} over the edge with`);
			if (V.PC.dick !== 0) {
				if (eventSlave.nipples === "fuckable") {
					t.push(`your cock and fingers deep inside ${his}`);
				} else {
					t.push(`your cock between ${his}`);
				}
			} else {
				if (eventSlave.nipples === "fuckable") {
					t.push(`your fingers deep inside ${his}`);
				} else {
					t.push(`your pussy rubbing against the stiff nipples atop ${his}`);
				}
			}
			if (eventSlave.boobs > 40000) {
				t.push(`gargantuan`);
			} else if (eventSlave.boobs > 25000) {
				t.push(`immense`);
			} else if (eventSlave.boobs > 10000) {
				t.push(`ridiculous`);
			} else if (eventSlave.boobs > 5000) {
				t.push(`enormous`);
			} else if (eventSlave.boobs > 3200) {
				t.push(`giant`);
			} else if (eventSlave.boobs > 1600) {
				t.push(`huge`);
			} else if (eventSlave.boobs > 800) {
				t.push(`big`);
			} else if (eventSlave.boobs > 300) {
				t.push(`modest`);
			} else {
				t.push(`flat`);
			}
			if (eventSlave.boobs > 300) {
				t.push(`tits.`);
			} else {
				t.push(`chest.`);
			}
			t.push(`<span class="devotion inc">${He} has become more devoted to you,</span> and <span class="fetish gain">${his} sexuality now focuses on ${his} breasts.</span>`);
			eventSlave.devotion += 4;
			seX(eventSlave, "mammary", V.PC, "penetrative");
			eventSlave.fetish = "boobs";
			eventSlave.fetishKnown = 1;
			eventSlave.fetishStrength = 65;
			if (eventSlave.lactation > 0) {
				eventSlave.lactationDuration = 2;
				eventSlave.boobs -= eventSlave.boobsMilk;
				eventSlave.boobsMilk = 0;
			} else {
				t.push(induceLactation(eventSlave, 5));
			}
			return t;
		}

		function steer() {
			t = [];
			t.push(`Good slaves get aroused according to their masters' whim, not their own silly tendencies. You call ${eventSlave.slaveName} over before ${he} can give voice to ${his} interest in nipple play,`);
			if (canDoVaginal(eventSlave) || (eventSlave.dick > 0 && !(eventSlave.chastityPenis))) {
				t.push(`and let ${him} masturbate while`);
				if (V.PC.dick === 0) {
					t.push(`eating you out,`);
					seX(eventSlave, "oral", V.PC, "vaginal");
				} else {
					t.push(`sucking you off,`);
					seX(eventSlave, "oral", V.PC, "penetrative");
				}
				t.push(`to associate non-mammary intercourse with pleasure.`);
			} else {
				t.push(`and play with ${him} until ${he} orgasms while carefully keeping ${his} boobs and nipples untouched and unstimulated.`);
			}
			t.push(`You'll keep an eye on ${him}, and with this correction <span class="devotion inc">${he}'ll become more submissive to you.</span>`);
			eventSlave.devotion += 4;
			return t;
		}
	}
};
