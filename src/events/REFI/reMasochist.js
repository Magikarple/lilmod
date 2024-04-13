App.Events.REFIMasochist = class REFIMasochist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // event slave
				s => App.Events.qualifiesForREFIeventSlave(s)
			],
			[ // and subslave /subID
				s => App.Events.qualifiesForREFIsubSlave(s, "masochist"),
				s => (s.anus > 0 && canDoAnal(s)) || (s.vagina > 0 && canDoVaginal(s))
			]
		];
	}

	execute(node) {
		const [eventSlave, subSlave] = this.actors.map(a => getSlave(a));
		const {He, he, his, him, himself} = getPronouns(eventSlave);
		const {He2, he2, his2, him2} = getPronouns(subSlave).appendSuffix("2");
		const {title: master} = getEnunciation(eventSlave);

		App.Events.drawEventArt(node, [eventSlave, subSlave], "no clothing");
		const subBelly = bellyAdjective(subSlave);
		const domBelly = bellyAdjective(eventSlave);


		if (canDoAnal(subSlave) && subSlave.anus > 0) {
			seX(subSlave, "anal", V.PC, "penetrative");
			if (canImpreg(subSlave, V.PC)){
				knockMeUp(subSlave, 5, 1, -1);
			}
		} else {
			seX(subSlave, "vaginal", V.PC, "penetrative");
			if (canImpreg(subSlave, V.PC)) {
				knockMeUp(subSlave, 5, 0, -1);
			}
		}

		let t = [];
		if (subSlave.belly >= 1500) {
			t.push(`You have`);
			t.push(contextualIntro(V.PC, subSlave, true));
			t.push(`lying down on your desk, and are seeing to your own amusement and ${his2} masochistic streak at once. ${He2} has ${his2} body flat on the surface, but is unrestrained, and has been told that ${he2} must not rise off it at all, nor tilt ${his2} bulk to either side. You then tell ${his2} to count strokes and begin to flog ${his2} ${subBelly} belly with a leathern`);
			if (subSlave.pregKnown === 1) {
				t.push(`instrument, taking care not to cause ${his2} pregnancy any lasting harm.`);
			} else {
				t.push("instrument.");
			}
			t.push(`Before long ${he2} is experiencing more pain than the human body can support without involuntary movement, and you tell ${him2} to go back one count whenever ${he2} does. At long last ${he2} completes the required number of blows, and lies quivering and sobbing, thanking you over and over, until ${he2} stiffens again at the`);
			if (canDoAnal(subSlave) && subSlave.anus > 0) {
				t.push(`burning sensation of a`);
				if (V.PC.dick) {
					t.push(`cock`);
				} else {
					t.push(`dildo`);
				}
				t.push(`stretching ${his2} anal sphincter. You are not gentle, and the rough sodomy combined with the burning of ${his2} outraged skin as you slap yourself against it maintains ${his2} pain high.`);
			} else {
				t.push(`sudden sensation of a`);
				if (V.PC.dick) {
					t.push(`cock`);
				} else {
					t.push(`dildo`);
				}
				t.push(`slamming deep into ${his2} pussy. You are not gentle, and the rough fucking combined with the burning of ${his2} outraged skin as you slap yourself against it maintains ${his2} pain high.`);
			}
			t.push(`Your grip around ${his2} neck only adds to ${his2} thrill.`);
		} else {
			t.push(`You have`);
			t.push(contextualIntro(V.PC, subSlave, true));
			t.push(`bent over your desk, and are seeing to your own amusement and ${his2} masochistic streak at once. ${He2} has ${his2} body flat on the surface, but is unrestrained, and has been told that ${he2} must not rise off it at all. You then tell ${him2} to count strokes and begin to flog ${his2}`);
			if (subSlave.butt <= 0) {
				t.push(`flat`);
			} else if (subSlave.butt <= 1) {
				t.push(`small`);
			} else if (subSlave.butt <= 2) {
				t.push(`round`);
			} else if (subSlave.butt <= 3) {
				t.push(`curvy`);
			} else if (subSlave.butt <= 4) {
				t.push(`huge`);
			} else if (subSlave.butt <= 5) {
				t.push(`enormous`);
			} else if (subSlave.butt <= 6) {
				t.push(`gigantic`);
			} else if (subSlave.butt <= 7) {
				t.push(`ridiculous`);
			} else if (subSlave.butt <= 10) {
				t.push(`immense`);
			} else if (subSlave.butt <= 14) {
				t.push(`inhuman`);
			} else if (subSlave.butt <= 20) {
				t.push(`absurdly massive`);
			}
			t.push(`ass with a leathern instrument. Before long ${he2} is experiencing more pain than the human body can support without involuntary movement, and you tell ${him2} to go back one count whenever ${he2} does. At long last ${he2} completes the required number of blows, and lies quivering and sobbing, thanking you over and over, until ${he2} stiffens again at the`);
			if (canDoAnal(subSlave) && subSlave.anus > 0) {
				t.push(`burning sensation of a`);
				if (V.PC.dick) {
					t.push(`cock`);
				} else {
					t.push(`dildo`);
				}
				t.push(`stretching ${his2} anal sphincter. You are not gentle, and the rough sodomy combined with the burning of ${his2} outraged buttocks as you slap yourself against`);
				if (subSlave.butt < 2) {
					t.push(`it`);
				} else {
					t.push(`them`);
				}
				t.push(`maintains ${his2} pain high.`);
			} else {
				t.push(`sudden sensation of a`);
				if (V.PC.dick) {
					t.push(`cock`);
				} else {
					t.push(`dildo`);
				}
				t.push(`slamming deep into ${his2} pussy. You are not gentle, and the rough fucking combined with the burning of ${his2} outraged buttocks as you slap yourself against`);
				if (subSlave.butt < 2) {
					t.push(`it`);
				} else {
					t.push(`them`);
				}
				t.push(`maintains ${his2} pain high.`);
			}
		}
		t.push(`After you finish and ${he2}`);
		if (canMove(subSlave)) {
			t.push(`leaves`,);
		} else {
			t.push(`is taken away,`);
		}
		t.push(`wincing in agony`);
		if (subSlave.belly >= 1500) {
			t.push(`and short of breath`);
		}
		t.push(`but with a faraway look of release, you notice`);
		t.push(contextualIntro(V.PC, eventSlave, true));
		t.push(`at the door to your office. You call ${him} in.`);

		App.Events.addParagraph(node, t);
		t = [];
		t.push(`${eventSlave.slaveName} hesitates before explaining ${himself}, and the ${SlaveTitle(eventSlave)} is obviously aroused:`);
		if ((eventSlave.dick > 0) && (eventSlave.chastityPenis === 1)) {
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
		t.push(`It seems ${he} passed by while you were beating`);
		t.push(contextualIntro(eventSlave, subSlave));
		t.push(`and found the`);
		if (canSee(eventSlave)) {
			t.push(`sight`);
		} else {
			t.push(`sounds`);
		}
		t.push(`rather compelling. It should be possible to either encourage this fascination or steer ${him} away from it for now.`);

		App.Events.addParagraph(node, t);
		App.Events.addResponses(node, [
			new App.Events.Result(`Turn ${him} into another pain slut`, turn, virginityWarning()),
			new App.Events.Result(`Steer ${him} away from pain obsession for the moment`, steer),
		]);

		function virginityWarning() {
			if (canDoAnal(eventSlave) && (eventSlave.anus === 0)) {
				return `This option will take ${his} anal virginity`;
			} else if (!canDoAnal(eventSlave) && canDoVaginal(eventSlave) && (eventSlave.vagina === 0)) {
				return `This option will take ${his} virginity`;
			}
			return null;
		}

		function turn() {
			t = [];
			if (!canTalk(eventSlave)) {
				if (eventSlave.accent >= 3) {
					t.push(`Since ${he} doesn't speak ${V.language} well enough to handle the`);
					if (!hasAnyArms(eventSlave)) {
						t.push(`subject and has no hands, it takes a long, frustrating time`);
					} else {
						t.push(`subject, ${he}'s forced to use delightfully humiliating gestures`);
					}
					t.push(`to communicate ${his} desire to be abused.`);
				} else if (eventSlave.voice === 0) {
					t.push(`${He}'s`);
					if (!hasAnyArms(eventSlave)) {
						t.push(`mute and has no hands, so it takes a long, frustrating time for ${him} to communicate that ${he} would like`);
					} else {
						t.push(`mute, so ${he} uses gestures to ask`);
					}
					t.push(`you to hurt ${him}, too.`);
				} else {
					t.push(`${He}'s incapable of forming`);
					if (!hasAnyArms(eventSlave)) {
						t.push(`words and has no hands, so it takes a long, frustrating time for ${him} to communicate that ${he} would like`);
					} else {
						t.push(`words, so ${he} uses gestures to ask`);
					}
					t.push(`you to hurt ${him}, too.`);
				}
			} else {
				if (eventSlave.lips > 70) {
					t.push(`${He} asks through ${his} massive dick-sucking lips,`);
				} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
					t.push(`${He} asks through ${his} big oral piercings,`);
				} else {
					t.push(`${He} asks,`);
				}
				t.push(Spoken(eventSlave, `"${capFirstChar(master)}, can — can you hurt me? Like that?"`));
			}
			t.push(`You make ${him} state it more explicitly, so ${he} tries again:`);
			if (!hasAnyArms(eventSlave) && !canTalk(eventSlave)) {
				t.push(`${he} wriggles ${himself} into a position where ${he} can lightly slap ${his} amputee ass against a chair leg.`);
			} else if (!canTalk(eventSlave)) {
				t.push(`${he} turns around and starts to spank ${himself} roughly.`);
			} else {
				t.push(Spoken(eventSlave, `"Please beat me, ${master}!"`));
			}
			t.push(`You shove ${him}`);
			if (eventSlave.belly >= 300000) {
				t.push(`over ${his} ${domBelly}`);
				if (eventSlave.bellyPreg >= 2000) {
					t.push(`pregnant`);
				}
				t.push(`belly,`);
			} else if (eventSlave.belly >= 1500) {
				t.push(`onto ${his} ${hasBothLegs(eventSlave) ? "knees" : "knee"},`);
			} else {
				t.push(`over the desk,`);
			}
			t.push(`rub your hand over ${his} ass, which is quivering with anticipation and fear, and ask if ${he} wants you to hit ${him}. ${He}'s almost beside ${himself}, shuddering at the titillation, but before ${he} can answer, you use your other hand to strike ${his}`);
			if (eventSlave.chastityPenis === 1) {
				t.push(`caged dick.`);
			} else if (eventSlave.dick > 0) {
				t.push(`cockhead.`);
			} else if (eventSlave.vagina > -1 && canDoVaginal(eventSlave)) {
				t.push(`pussylips.`);
			} else if (eventSlave.belly >= 1500) {
				t.push(`distended middle.`);
			} else if (eventSlave.vagina > -1) {
				t.push(`chastity belt into ${his} pussylips.`);
			} else if (eventSlave.scrotum > 1) {
				t.push(`testicles.`);
			} else {
				t.push(`smooth crotch.`);
			}
			t.push(`As ${he} writhes in agony, you tell ${him} to get used to it. ${He}'s a pain slut now, second thoughts or not.`);
			if (canDoAnal(eventSlave)) {
				if (eventSlave.anus === 0) {
					t.push(`${He} hasn't recovered before ${he} feels the still more urgent pain of`);
					if (V.PC.dick !== 0) {
						t.push(`your dick brutally <span class="lime">taking ${his} anal virginity,</span>`);
					} else {
						t.push(`an enormous dildo <span class="lime">stealing ${his} anal virginity,</span>`);
					}
					t.push(`followed by rough anal,`);
					eventSlave.anus = 1;
				} else {
					t.push(`${He} hasn't recovered before ${he} feels the still more urgent pain of rough anal,`);
				}
				t.push(VCheck.Anal(eventSlave, 1));
			} else if (canDoVaginal(eventSlave)) {
				if (eventSlave.vagina === 0) {
					t.push(`${He} hasn't recovered before ${he} feels the still more urgent pain of`);
					if (V.PC.dick !== 0) {
						t.push(`your dick brutally <span class="lime">stripping ${him} of ${his} virginity,</span>`);
					} else {
						t.push(`an enormous dildo <span class="lime">stealing ${his} virginity,</span>`);
					}
					t.push(`followed by rough sex,`);
					eventSlave.vagina = 1;
				} else {
					t.push(`${He} hasn't recovered before ${he} feels the still more urgent pain of`);
					if (V.PC.dick !== 0) {
						t.push(`your dick`);
					} else {
						t.push(`an enormous dildo`);
					}
					t.push(`slamming against ${his} cervix,`);
				}
				t.push(VCheck.Vaginal(eventSlave, 1));
			} else {
				t.push(`${He} hasn't recovered before ${he} feels`);
				switch (eventSlave.mouthAccessory) {
					case "dildo gag":
					case "massive dildo gag":
						t.push(`the relief of the dildo gag being drawn from ${his} throat before`);
						break;
					case "ball gag":
					case "bit gag":
					case "ring gag":
						t.push(`you unhook ${his} gag before`);
						break;
				}
				t.push(`the still more urgent pain of`);
				if (V.PC.dick !== 0) {
					t.push(`your dick getting shoved as deep down ${his} throat as you can,`);
				} else {
					t.push(`an enormous dildo forcing ${his} jaw wide and working its way down ${his} throat,`);
				}
				seX(eventSlave, "oral", V.PC, "penetrative");
			}
			t.push(`which is then overlaid by rough spanking, nipple pinching, and`);
			if (eventSlave.chastityPenis === 1) {
				t.push(`cock torment.`);
			} else if (eventSlave.dick > 0) {
				t.push(`dick abuse.`);
			} else if (eventSlave.vagina > -1 && canDoVaginal(eventSlave)) {
				t.push(`clit torture.`);
			} else if (eventSlave.belly >= 1500) {
				t.push(`stomach abuse.`);
			} else if (eventSlave.vagina > -1) {
				t.push(`chastity assault.`);
			} else if (eventSlave.scrotum > 1) {
				t.push(`ball crushing.`);
			} else {
				t.push(`urethral torment.`);
			}
			t.push(`<span class="devotion inc">${He} has become more devoted to you,</span> and <span class="fetish gain">${he} has started to get off on pain.</span>`);
			eventSlave.devotion += 4;
			eventSlave.fetish = "masochist";
			eventSlave.fetishKnown = 1;
			eventSlave.fetishStrength = 65;
			return t;
		}

		function steer() {
			t = [];
			t.push(`Good slaves get aroused according to their masters' whim, not their own silly tendencies. You call ${eventSlave.slaveName} over before ${he} can give voice to ${his} interest in pain play,`);
			if (canDoVaginal(eventSlave) || (eventSlave.dick > 0 && !(eventSlave.chastityPenis))) {
				t.push(`and let ${him} masturbate while`);
				if (V.PC.dick === 0) {
					t.push(`eating you out,`);
					seX(eventSlave, "oral", V.PC, "vaginal");
				} else {
					t.push(`sucking you off,`);
					seX(eventSlave, "oral", V.PC, "penetrative");
				}
			} else {
				t.push(`and play with ${him} until ${he} orgasms while`);
				if (V.PC.dick === 0) {
					t.push(`eating you out, all while`);
					seX(eventSlave, "oral", V.PC, "vaginal");
				} else {
					t.push(`sucking you off, all while`);
					seX(eventSlave, "oral", V.PC, "penetrative");
				}
			}
			t.push(`carefully keeping ${his} experience purely pleasurable. You'll keep an eye on ${him}, and with this correction <span class="devotion inc">${he}'ll become more submissive to you.</span>`);
			eventSlave.devotion += 4;

			return t;
		}
	}
};
