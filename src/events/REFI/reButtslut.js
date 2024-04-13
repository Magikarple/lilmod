
App.Events.REFIButtslut = class REFIButtslut extends App.Events.BaseEvent {
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
				s => App.Events.qualifiesForREFIsubSlave(s, "buttslut"),
				s => s.anus > 0,
				canDoAnal
			]
		];
	}

	execute(node) {
		const [eventSlave, subSlave] = this.actors.map(a => getSlave(a));
		const {He, he, his, him, himself} = getPronouns(eventSlave);
		const {he2, his2, himself2} = getPronouns(subSlave).appendSuffix("2");
		const {say, title: master} = getEnunciation(eventSlave);

		App.Events.drawEventArt(node, [eventSlave, subSlave], [eventSlave.clothes, "no clothing"]);

		if (canImpreg(subSlave, V.PC)) {
			knockMeUp(subSlave, 5, 1, -1);
		}
		seX(subSlave, "anal", V.PC, "penetrative");

		let t = [];
		t.push(`In the middle of the afternoon, you take a break from work to fuck`);
		t.push(contextualIntro(V.PC, subSlave, true));
		t.push(`in your office. ${subSlave.slaveName} is such a complete buttslut that ${he2}'s enjoying ${himself2} to an almost indecent degree: moaning, begging, or just smiling idiotically with ${his2} mouth open and ${his2} tongue lolling. After you finish and ${he2} leaves, you notice`);
		t.push(contextualIntro(V.PC, eventSlave, true));
		t.push(`at the door to your office. You call ${him} in.`);
		App.Events.addParagraph(node, t);
		t = [];
		t.push(`${eventSlave.slaveName} hesitates before explaining ${himself}, and the ${SlaveTitle(eventSlave)} is obviously aroused:`);
		if (eventSlave.chastityPenis === 1) {
			t.push(`${he}'s got a string of precum leaking out of ${his} chastity cage.`);
		} else if ((eventSlave.dick > 0) && (eventSlave.hormoneBalance >= 100)) {
			t.push(`though ${his} hormone-filled body can't get ${his} dick hard any more, ${he}'s got a string of precum coming off ${his} member.`);
		} else if (eventSlave.dick > 0 && eventSlave.balls > 0 && eventSlave.ballType === "sterile") {
			t.push(`though ${his} useless balls can't muster the effort to get ${his} dick hard any more, ${he}'s got a string of precum coming off ${his} limp member.`);
		} else if ((eventSlave.dick > 0) && (eventSlave.balls === 0)) {
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
		t.push(`It seems ${he} passed by while you were buttfucking`, contextualIntro(eventSlave, subSlave), `and found the`);
		if (canSee(eventSlave)) {
			t.push(`sight`);
		} else {
			t.push(`sounds`);
		}
		t.push(`rather compelling. It should be possible to either encourage this fascination or steer ${him} away from it for now.`);

		App.Events.addParagraph(node, t);
		App.Events.addResponses(node, [
			new App.Events.Result(`Turn ${him} into another anal slut`, turn, virginityWarning()),
			new App.Events.Result(`Steer ${him} away from anal obsession for the moment`, steer),
		]);

		function virginityWarning() {
			if (canDoAnal(eventSlave) && eventSlave.anus === 0) {
				return `This option will take ${his} anal virginity`;
			}
			return null;
		}

		function turn() {
			t = [];
			if (!canTalk(eventSlave)) {
				if (eventSlave.accent >= 3) {
					if (!hasAnyArms(eventSlave)) {
						t.push(`Since ${he} isn't conversant in ${V.language} and lacks the hands to gesture, so it takes a long, frustrating time for ${him} to communicate that ${he} would like you to do to ${him} what you did to ${subSlave.slaveName}.`);
					} else {
						t.push(`Since ${he} isn't conversant in ${V.language}, so ${he} uses gestures to ask you to do to ${him} what you did to ${subSlave.slaveName}.`);
					}
				} else if (eventSlave.voice === 0) {
					if (!hasAnyArms(eventSlave)) {
						t.push(`${He}'s mute and has no hands, so it takes a long, frustrating time for ${him} to communicate that ${he} would like you to do to ${him} what you did to ${subSlave.slaveName}.`);
					} else {
						t.push(`${He}'s mute, so ${he} uses gestures to ask you to do to ${him} what you did to ${subSlave.slaveName}.`);
					}
				} else {
					t.push(`${He} can't form`);
					if (!hasAnyArms(eventSlave)) {
						t.push(`words and has no hands, so it takes a long, frustrating time for ${him} to communicate that ${he} would like you to do to ${him} what you did to ${subSlave.slaveName}.`);
					} else {
						t.push(`words, so ${he} uses gestures to ask you to do to ${him} what you did to ${subSlave.slaveName}.`);
					}
				}
			} else {
				if (eventSlave.lips > 70) {
					t.push(`${He} ${say}s through ${his} massive dick-sucking lips,`);
				} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
					t.push(`${He} ${say}s through ${his} big oral piercings,`);
				} else {
					t.push(`${He} ${say}s,`);
				}
				t.push(Spoken(eventSlave, `"${capFirstChar(master)}, would you please do me like that?"`));
			}
			t.push(`You make ${him} state it more explicitly, so ${he} tries again:`);
			if (!hasAnyArms(eventSlave) && !canTalk(eventSlave)) {
				t.push(`${he} wriggles around until ${his} ass is pointed straight at you,`);
				if (canDoAnal(eventSlave)) {
					t.push(`lets out a deep breath, and relaxes ${his} sphincter visibly.`);
				} else {
					t.push(`and bounces ${his} rear enticingly.`);
				}
			} else if (!canTalk(eventSlave)) {
				t.push(`${he} tries to depict anal sex with hand gestures, then gives up and turns around and points to ${his} ass.`);
			} else {
				t.push(Spoken(eventSlave, `"Please fuck my butt, ${master}!"`));
			}
			if (canDoAnal(eventSlave)) {
				t.push(`${He} squeaks with surprise as you throw ${him} on the couch, but ${his} eagerness is obvious. ${He} does everything right, relaxing as you`);
				if (V.PC.dick === 0) {
					t.push(`push a strap-on into`);
				} else {
					t.push(`enter`);
				}
				t.push(`${his} ass and enjoying ${himself} all the way through. ${He} climaxes hard to`);
				if (V.PC.dick === 0) {
					t.push(`the phallus`);
				} else {
					t.push(`the cock`);
				}
				t.push(`in ${his} asshole. <span class="devotion inc">${He} has become more devoted to you,</span> and <span class="fetish gain">${his} sexuality now focuses on ${his} anus.</span>`);
				t.push(VCheck.Anal(eventSlave, 1));
			} else if (V.PC.dick !== 0) {
				t.push(`${He} squeaks with surprise as you push ${him}`);
				if (eventSlave.belly >= 300000) {
					t.push(`onto ${his} ${bellyAdjective(eventSlave)}`);
					if (eventSlave.bellyPreg >= 1500) {
						t.push(`pregnancy`);
					} else {
						t.push(`belly`);
					}
				} else if (eventSlave.belly >= 5000) {
					t.push(`against the couch`);
				} else {
					t.push(`onto the couch`);
				}
				t.push(`and`);
				if (eventSlave.butt >= 6) {
					t.push(`hug ${his}`);
					if (eventSlave.butt <= 6) {
						t.push(`gigantic`);
					} else if (eventSlave.butt <= 7) {
						t.push(`ridiculous`);
					} else if (eventSlave.butt <= 10) {
						t.push(`immense`);
					} else if (eventSlave.butt <= 14) {
						t.push(`inhuman`);
					} else if (eventSlave.butt <= 20) {
						t.push(`absurdly massive`);
					}
					t.push(`ass around your cock. Deep within its quivering`);
					if (eventSlave.buttImplant / eventSlave.butt > .60) {
						t.push(`firmness,`);
					} else {
						t.push(`softness,`);
					}
					t.push(`you can clearly feel how excited ${he} is over ${his} rear getting the attention it deserves. While ${he} may have expected anal, you've decided otherwise, so you go to work savoring the depths of ${his} butt cheeks. ${He} is`);
					if (!canTalk(eventSlave)) {
						t.push(`practically`);
					}
					t.push(`mewling with lust by the time you cum in ${him}, joining you in orgasm as ${he} feels your seed trickle down ${his} lower back and down to ${his} chastity belt.`);
				} else if (eventSlave.butt >= 2) {
					t.push(`slip your cock between ${his}`);
					if (eventSlave.butt <= 3) {
						t.push(`big`);
					} else if (eventSlave.butt <= 4) {
						t.push(`huge`);
					} else if (eventSlave.butt <= 5) {
						t.push(`enormous`);
					}
					if (eventSlave.buttImplant / eventSlave.butt > .60) {
						t.push(`firm`);
					} else {
						t.push(`soft`);
					}
					t.push(`buttocks, atop ${his} anal chastity. You let ${him} quiver with anticipation for a little before reminding ${him} that the belt's removal is a reward for good slaves, and you might give release ${him} from it one day — but that ${he} doesn't deserve it yet. With that, you begin thrusting against ${his} rear, enjoying the twin pairs off flesh against your palms. ${He} is`);
					if (!canTalk(eventSlave)) {
						t.push(`practically`);
					}
					t.push(`mewling with lust by the time you cum on ${him}, joining you in orgasm as ${he} feels your seed trickle down ${his} lower back and down to ${his} chastity belt.`);
				} else {
					t.push(`rest your cock between ${his}`);
					if (eventSlave.butt <= 0) {
						t.push(`flat`);
					} else {
						t.push(`small`);
					}
					t.push(`buttocks, atop ${his} anal chastity. You let ${him} quiver with anticipation for a little before reminding ${him} that the belt's removal is a reward for good slaves, and you might give release ${him} from it one day — but that ${he} doesn't deserve it yet. With that, you begin thrusting between what can barely be called an ass. ${He} is`);
					if (!canTalk(eventSlave)) {
						t.push(`practically`);
					}
					t.push(`mewling with lust by the time you cum on ${him}, joining you in orgasm as ${he} feels your seed trickle down ${his} lower back and down to ${his} chastity belt.`);
				}
				t.push(`<span class="devotion inc">${He} has become more devoted to you,</span> and <span class="fetish gain">${his} sexuality now focuses on ${his} rear end.</span>`);
				seX(subSlave, "anal", V.PC, "penetrative");
			} else {
				t.push(`You trace a dildo around ${his} anal chastity before reminding ${him} that the belt's removal is a reward for good slaves, and you might give release ${him} from it one day — but that ${he} doesn't deserve it yet. With that, you run your hand across the quivering slave's rump, sending ${him} over the edge.`);
				t.push(`<span class="devotion inc">${He} has become more devoted to you,</span> and <span class="fetish gain">${his} sexuality now focuses on ${his} rear end.</span>`);
			}
			eventSlave.devotion += 4;
			eventSlave.fetish = "buttslut";
			eventSlave.fetishKnown = 1;
			eventSlave.fetishStrength = 65;
			return t;
		}

		function steer() {
			t = [];
			t.push(`Good slaves get aroused according to their masters' whim, not their own silly tendencies. You call ${eventSlave.slaveName} over before ${he} can give voice to ${his} interest in anal sex,`);
			if (canDoVaginal(eventSlave) || (eventSlave.dick > 0 && !(eventSlave.chastityPenis))) {
				t.push(`and let ${him} masturbate while`);
				if (V.PC.dick === 0) {
					t.push(`eating you out,`);
					seX(eventSlave, "oral", V.PC, "vaginal");
				} else {
					t.push(`sucking you off,`);
					seX(eventSlave, "oral", V.PC, "penetrative");
				}
				t.push(`to associate non-anal intercourse with pleasure.`);
			} else {
				t.push(`and play with ${him} until ${he} orgasms while carefully keeping ${his} ass untouched and unstimulated.`);
			}
			t.push(`You'll keep an eye on ${him}, and with this correction <span class="devotion inc">${he}'ll become more submissive to you.</span>`);
			eventSlave.devotion += 4;
			return t;
		}
	}
};
