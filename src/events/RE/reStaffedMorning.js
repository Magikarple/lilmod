App.Events.REStaffedMorning = class REStaffedMorning extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => fuckSlavesLength() >= 4,
		];
	}

	actorPrerequisites() {
		const req = [
			s => s.devotion > 50,
			s => s.fuckdoll === 0,
			s => ["please you", "serve in the master suite", "be your Concubine"].includes(s.assignment),
			s => s.rules.release.master === 1,
			canMove,
			hasAllLimbs,
		];

		return [
			req,
			req,
			req,
			req,
		];
	}

	/**
	 * @param {Node} node
	 */
	execute(node) {
		let bedSlaves = this.actors.map(getSlave);

		const {
			He, he, his, him, girl
		} = getPronouns(bedSlaves[0]);

		const {
			He2, his2, him2, girl2
		} = getPronouns(bedSlaves[1]).appendSuffix('2');

		const {
			He3, he3, his3, him3, girl3
		} = getPronouns(bedSlaves[2]).appendSuffix('3');

		const {
			He4, his4, him4, himself4
		} = getPronouns(bedSlaves[3]).appendSuffix('4');
		let playerPronouns = getPronouns(V.PC);

		App.Events.drawEventArt(node, bedSlaves.slice(0, 2), "no clothing");

		let t = new SpacedTextAccumulator();

		t.push(
			`Sleep leaves you quickly one morning to the sensation of two of your fucktoys performing human alarm clock duty.`,
			`You open your eyes and look down: it's`,
			App.UI.DOM.slaveDescriptionDialog(bedSlaves[0]),
			`and`,
			contextualIntro(bedSlaves[0], bedSlaves[1], true),
			`today.`
		);

		if (V.PC.dick !== 0) {
			t.push(`${bedSlaves[0].slaveName} is ${(bedSlaves[0].fetish === "cumslut") ? "rapturously" : "industriously"} sucking your dick as it rapidly hardens in ${his} `);
			if (V.PC.vagina !== -1) {
				t.push(`mouth, occasionally letting it pop free so ${he} can run ${his} tongue up and down your cunt.`);
			} else {
				t.push(`mouth.`);
			}
			t.push(`Meanwhile, ${bedSlaves[1].slaveName} is ${(bedSlaves[1].fetish === "cumslut") ? "hungrily" : "gently"} sucking your nuts.`);
			t.push(`The two slaves have crowded close together, and not just so they can both have access to your cock and balls. They're`);
			if (((canAchieveErection(bedSlaves[0]) && bedSlaves[0].chastityPenis === 0) || bedSlaves[0].clit > 3) && ((canAchieveErection(bedSlaves[1]) && bedSlaves[1].chastityPenis === 0) || bedSlaves[1].clit > 3)) {
				t.push(`jerking each other off`);
			} else {
				t.push(`manually stimulating each other`);
			}
			t.push(`as they work.`);
		} else {
			t.push(`An absolutely wonderful mélange of sensations rises to meet you. Each slave is gently sucking one of your hardening nipples, and one hand from each slave is moving delicately across your womanhood, kindling a fire in your lower `);
			if (V.PC.preg > 0 && V.PC.pregData.normalBirth / 1.75) {
				t.push(`belly and exciting the occupant${V.PC.pregType > 1 ? "s" : ""} in your womb.`);
			} else {
				t.push(`belly.`);
			}
			t.push(`They're cuddled up closely under your arms, with a warm body pressed against each side of you. You can feel`);
			if (bedSlaves[0].belly + bedSlaves[1].belly >= 10000 && bedSlaves[0].belly > 4000) {
				t.push(`their swollen middles`);
				if (bedSlaves[0].belly + bedSlaves[1].belly >= 1000000) {
					t.push(`pushing against each other upon you`);
				} else if (bedSlaves[0].belly + bedSlaves[1].belly >= 100000) {
					t.push(`resting against you`);
				} else {
					t.push(`against your ribcage`);
				}
			} else if (bedSlaves[0].belly >= 10000) {
				t.push(`${bedSlaves[0].slaveName}'s ${bellyAdjective(bedSlaves[0])} belly`);
				if (bedSlaves[0].belly >= 100000) {
					t.push(`resting heavily on you`);
				} else {
					t.push(`against your ribcage`);
				}
			} else if (bedSlaves[1].belly >= 10000) {
				t.push(`${bedSlaves[1].slaveName}'s ${bellyAdjective(bedSlaves[1])} belly`);
				if (bedSlaves[1].belly >= 100000) {
					t.push(`resting heavily on you`);
				} else {
					t.push(`against your ribcage`);
				}
			} else if (bedSlaves[0].boobs > 300 && bedSlaves[1].boobs > 300) {
				t.push(`their`);
				if (bedSlaves[0].boobsImplant / bedSlaves[0].boobs >= .60 && bedSlaves[1].boobsImplant / bedSlaves[1].boobs >= .60) {
					t.push(`firm`);
				} else {
					t.push(`soft`);
				}
				t.push(`breasts`);
			} else {
				t.push(`steady breathing`);
			}
			if (canAchieveErection(bedSlaves[0]) && bedSlaves[0].chastityPenis === 0 && canAchieveErection(bedSlaves[1]) && bedSlaves[1].chastityPenis === 0) {
				t.push(`and the twin erections resting against your thighs.`);
			} else {
				t.push(`and the heat between their legs against your thighs.`);
			}
			t.push(`You feel absolutely buried in attentive slave.`);
		}

		t.push(
			`The bathroom door is open and the shower is running.`,
			`Though the steam is beginning to fill the glass-walled shower, you can see a pair of naked bodies in there; that would be`,
			App.UI.DOM.slaveDescriptionDialog(bedSlaves[2]),
			`and`,
			contextualIntro(bedSlaves[2], bedSlaves[3], true),
			`, ready to attend you as you bathe.`
		);

		t.toParagraph();
		node.appendChild(t.container());

		App.Events.addResponses(node, [
			new App.Events.Result("Leave them satisfied", satisfied),
			new App.Events.Result("Leave them exhausted", exhausted)
		]);

		function satisfied() {
			const frag = document.createDocumentFragment();
			let sexTarget = "";
			t = new SpacedTextAccumulator();

			if (V.PC.dick !== 0) {
				t.push(`You begin to thrust gently into ${bedSlaves[0].slaveName}'s mouth. ${girl === girl2 ? `The ${girl}` : "Your bedmate"}s moan and giggle into you at the signal that you're not going to get up right this instant, and`);
				if (((canAchieveErection(bedSlaves[0]) && bedSlaves[0].chastityPenis === 0) || bedSlaves[0].clit > 3) && ((canAchieveErection(bedSlaves[1]) && bedSlaves[1].chastityPenis === 0) || bedSlaves[1].clit > 3)) {
					t.push(`start jerking each other off harder, making lewd noises and humping each other's hands.`);
				} else {
					t.push(`start really exploring each other's body, jerking around lewdly as their arousal builds.`);
				}
				if (V.PC.vagina !== -1) {
					t.push(`They always spare at least one hand for your cunt, despite your thrusting.`);
				}
				t.push(`When you climax, they do, too, one after the other. They quickly switch mouth positions and suck you back to full mast so you can enjoy your shower.`);
				seX(bedSlaves[0], "oral", V.PC, "penetrative");
				seX(bedSlaves[1], "oral", V.PC, "penetrative");
			} else {
				t.push(`You reach down and run a possessive hand across each slave's scalp, neck, and back, eliciting shivers. Then, you gently hook them under the armpits and pull them up a bit, without breaking their lip locks with your nipples, or forcing them to stop playing with your cunt. Each slave ends curled up, mostly face-down, with their mouths still sucking on your ${V.PC.boobs >= 300 ? "boobs" : "chest"} and their free hands trapped between their legs. They get the message and begin to look after themselves, too; their resultant moaning against your nipples grows when you reach down and start teasing their butts. The three of you climax more or less together, and you bounce up with undiminished arousal to enjoy your shower.`);
				seX(bedSlaves[0], "oral", V.PC, "vaginal");
				seX(bedSlaves[1], "oral", V.PC, "vaginal");
			}

			t.toParagraph();

			App.Events.refreshEventArt(bedSlaves, "no clothing");

			t.push(`By now, the shower is an impenetrable fog of steam. The wet, soapy bodies inside are easy to find, though. ${bedSlaves[2].slaveName} happens to be closest, so you kiss ${his3} laughing mouth`);
			if (V.PC.dick !== 0) {
				if ((canDoVaginal(bedSlaves[2]) && bedSlaves[2].vagina > 0) || (canDoAnal(bedSlaves[2]) && bedSlaves[2].anus > 0)) {
					t.push(`hard and fuck ${him3}`);
					if (bedSlaves[2].belly < 30000) {
						t.push(`with ${his3} back against the shower`);
						if (bedSlaves[2].boobs > 10000) {
							t.push(`wall, ${his3} giant soapy tits wobbling around you deliciously.`);
						} else if (bedSlaves[2].boobs > 2000) {
							t.push(`wall, ${his3} huge soapy tits sliding around deliciously.`);
						} else if (bedSlaves[2].weight > 95) {
							t.push(`wall, ${his3} plush belly sliding around delightfully against you.`);
						} else if (canAchieveErection(bedSlaves[2]) && bedSlaves[2].chastityPenis === 0) {
							t.push(`wall, ${his3} lathered up erection rubbing lasciviously between you.`);
						} else {
							t.push(`wall.`);
						}
					} else {
						t.push(`with ${his3} expansive flank against the shower`);
						if (bedSlaves[2].boobs > 2000) {
							t.push(`wall, ${his3} huge soapy tits flopping around deliciously.`);
						} else if (bedSlaves[2].weight > 95) {
							t.push(`wall, ${his3} plush belly wobbling around delightfully beneath ${him3}.`);
						} else {
							t.push(`wall.`);
						}
					}
					if (canDoVaginal(bedSlaves[2]) && bedSlaves[2].vagina > 0) {
						t.push(VCheck.Vaginal(bedSlaves[2], 1));
					} else {
						t.push(VCheck.Anal(bedSlaves[2], 1));
					}
				} else if (bedSlaves[2].weight > 95 && bedSlaves[2].belly < 1500) {
					t.push(`hard, sandwich your dick with ${his3} soft belly, and fuck ${his3} soapy, jiggly body against the shower wall.`);
					seX(bedSlaves[2], "mammary", V.PC, "penetrative");
				} else {
					t.push(`hard and, not finding anything to stick your erection into, guide ${his3} hand down to your wanting dick.`);
					seX(bedSlaves[2], "oral", V.PC, "penetrative");
				}
				t.push(`${He3} does ${his3} best to soap your front while ${he3}`);
				if ((canDoVaginal(bedSlaves[2]) && bedSlaves[2].vagina > 0) || (canDoAnal(bedSlaves[2]) && bedSlaves[2].anus > 0)) {
					t.push(`takes`);
				} else {
					t.push(`rubs`);
				}
				t.push(`cock, and ${bedSlaves[3].slaveName} washes your back${V.PC.vagina !== -1 ? ", reaching under your butt to tease your pussy" : ""}. After a short while, you let ${him3} down and seize ${bedSlaves[3].slaveName}, sliding your cock`);
				if (bedSlaves[3].vagina > 0 && canDoVaginal(bedSlaves[3])) {
					t.push(`into ${his4} willing pussy,`);
				} else if (bedSlaves[3].anus > 0 && canDoAnal(bedSlaves[3])) {
					t.push(`${bedSlaves[3].butt > 4 ? `between ${his4} huge buttocks and` : ""} up ${his4} willing ass,`);
				} else if (bedSlaves[3].butt > 4) {
					t.push(`between ${his4} huge buttocks,`);
				} else {
					t.push(`between ${his4} thighs,`);
				}
				if (canDoVaginal(bedSlaves[3]) && bedSlaves[3].vagina > 0) {
					t.push(VCheck.Vaginal(bedSlaves[3], 1));
				} else {
					t.push(VCheck.Anal(bedSlaves[3], 1));
				}
				t.push(`taking ${him4} from behind while ${bedSlaves[2].slaveName} does ${his3} best to get ${his3} wits back and take over washing duty. They towel you together, and you head back out of the bathroom.`);
			} else {
				if ((bedSlaves[2].toyHole === "dick" || V.policies.sexualOpenness === 1) && canPenetrate(bedSlaves[2]) && (V.PC.vagina > 0 || V.PC.anus > 0) && bedSlaves[2].belly + V.PC.belly < 30000) {
					sexTarget = "penetrative";
					if (V.PC.vagina > 0) {
						t.push(`hard, slip ${his2} dick into your pussy, and ride ${him3}`);
						seX(bedSlaves[2], "penetrative", V.PC, "vaginal");
						if (canImpreg(V.PC, bedSlaves[2])) {
							knockMeUp(V.PC, 5, 0, 0);
						}
					} else {
						t.push(`hard, slip ${his2} dick up your ass, and ride ${him3}`);
						seX(bedSlaves[2], "penetrative", V.PC, "anal");
						if (canImpreg(V.PC, bedSlaves[2])) {
							knockMeUp(V.PC, 5, 1, 0);
						}
					}
					t.push(`with ${his3} back against the shower`);
					if (bedSlaves[2].boobs > 10000) {
						t.push(`wall, ${his3} giant soapy tits wobbling around you deliciously.`);
					} else if (bedSlaves[2].boobs > 2000) {
						t.push(`wall, ${his3} huge soapy tits sliding around deliciously.`);
					} else if (bedSlaves[2].weight > 95) {
						t.push(`wall, ${his3} plush belly sliding around delightfully against you.`);
					} else {
						t.push(`wall.`);
					}
				} else if (canDoVaginal(bedSlaves[2])) {
					t.push(`hard and trib ${him3}`);
					if (bedSlaves[2].belly < 30000) {
						t.push(`with ${his3} back against the shower`);
						if (bedSlaves[2].boobs > 10000) {
							t.push(`wall, ${his3} giant soapy tits wobbling around you deliciously.`);
						} else if (bedSlaves[2].boobs > 2000) {
							t.push(`wall, ${his3} huge soapy tits sliding around deliciously.`);
						} else if (bedSlaves[2].weight > 95) {
							t.push(`wall, ${his3} plush belly sliding around delightfully against you.`);
						} else if (canAchieveErection(bedSlaves[2]) && bedSlaves[2].chastityPenis === 0) {
							t.push(`wall, ${his3} lathered up erection rubbing lasciviously between you.`);
						} else {
							t.push(`wall.`);
						}
					} else {
						t.push(`with ${his3} expansive flank against the shower`);
						if (bedSlaves[2].boobs > 2000) {
							t.push(`wall, ${his3} huge soapy tits flopping around deliciously.`);
						} else if (bedSlaves[2].weight > 95) {
							t.push(`wall, ${his3} plush belly wobbling around delightfully beneath ${him3}.`);
						} else {
							t.push(`wall.`);
						}
					}
					seX(bedSlaves[2], "vaginal", V.PC, "vaginal");
				} else {
					t.push(`hard and guide ${his3} hand down to your wanting pussy.`);
					seX(bedSlaves[2], "oral", V.PC, "vaginal");
				}
				t.push(`${He3} does ${his3} best to soap your front while`);
				if (sexTarget === "penetrative") {
					t.push(`fucking you`);
				} else if (canDoVaginal(bedSlaves[2])) {
					t.push(`you hump ${his3} thigh${bedSlaves[2].vagina > 0 ? " and pussy" : ""},`);
				} else {
					t.push(`teasing your pussy`);
				}
				t.push(`and ${bedSlaves[3].slaveName} washes your back. After a short while,`);
				if (sexTarget === "penetrative") {
					t.push(`${he3} comes inside you and slides out so you may`);
				} else if (canDoVaginal(bedSlaves[2])) {
					t.push(`you let ${him3} down and`);
				} else {
					t.push(`you let ${him3} stop and`);
				}
				t.push(`seize ${bedSlaves[3].slaveName}, pushing ${his4} face against the wall and`);
				if (canDoVaginal(bedSlaves[3]) || canDoAnal(bedSlaves[3])) {
					t.push(`sliding your fingers inside ${him4} while you`);
				}
				t.push(`straddle one of ${his4} legs. ${bedSlaves[2].slaveName} does ${his3} best to get ${his3} wits back and take over washing duty. They towel you together, and you head back out of the bathroom.`);
			}

			t.toParagraph();

			t.push(`Your clothes have been laid out, ready for ${bedSlaves[0].slaveName} and ${bedSlaves[1].slaveName} to dress you, but`);
			if (V.PC.dick !== 0) {
				t.push(`next to the neat stack of clothes, the two slaves are bent over the bed with their buttocks spread. You select ${bedSlaves[1].slaveName}`);
				if (bedSlaves[1].vagina > 0 && canDoVaginal(bedSlaves[1])) {
					t.push(`and slide your dick into ${his2} ${bedSlaves[1].vagina > 2 ? "loose pussy" : (bedSlaves[1].vagina > 1 ? "inviting pussy" : "tight pussy")}, fucking ${him2}`);
					t.push(VCheck.Vaginal(bedSlaves[1], 1));
				} else if (bedSlaves[1].anus > 0 && canDoAnal(bedSlaves[1])) {
					t.push(`and slide your dick up ${his2} ${bedSlaves[1].anus > 2 ? "welcoming asspussy" : (bedSlaves[1].anus > 1 ? "soft butthole" : "tight anus")}, sodomizing ${him2}`);
					t.push(VCheck.Anal(bedSlaves[1], 1));
				} else {
					t.push(`and turn ${him2} around before sliding your dick into ${his2} welcoming mouth`);
					seX(bedSlaves[1], "oral", V.PC, "penetrative");
				}
				t.push(`while ${bedSlaves[0].slaveName} buttons your shirt. When it's done, you push ${him} down next to ${bedSlaves[1].slaveName} and switch partners, letting ${bedSlaves[1].slaveName} up to do ${his2} best to help you into your trousers in the meantime. ${He2} gets them on and fastens everything, except the fly, of course.`);
				SimpleSexAct.Player(bedSlaves[0]);
			} else {
				t.push(`next to the neat stack of clothes, the two slaves are kneeling on the floor and looking at you with mock innocence. You select ${bedSlaves[1].slaveName} and straddle ${his2} face, letting ${him2}`);
				if (bedSlaves[1].lips > 40) {
					t.push(`use ${his2} big soft lips to`);
				}
				t.push(`eat you out while ${bedSlaves[0].slaveName}`);
				if (V.PC.career === "servant") {
					t.push(`helps you into your dress. Once ${he} straightens out your apron,`);
				} else if (V.PC.career === "escort") {
					if (V.PC.boobs >= 1400) {
						t.push(`gropes your huge breasts in a losing battle to get them to stay in your barely-there top. Once they've stopped popping out,`);
					} else if (V.PC.boobs >= 1200) {
						t.push(`spends an invigoratingly long time wrestling your big tits into your way too small top. Once they're content to stay put,`);
					} else if (V.PC.boobs >= 1000) {
						t.push(`struggles to shove your breasts into your too small top. Once they're content to stay put,`);
					} else if (V.PC.boobs >= 300) {
						t.push(`wrangles your breasts into your revealing top. Once they're situated perfectly,`);
					} else {
						t.push(`ties your skimpy top over your flat chest. Once it's situated perfectly,`);
					}
				} else {
					t.push(`helps you into your top. When you're buttoned,`);
				}
				t.push(`you take ${his} face in your hands and kiss ${him} deeply, favoring ${him} with the sensation of kissing ${his} ${getWrittenTitle(bedSlaves[0])} while ${playerPronouns.he} orgasms. You keep making out with ${him} while ${bedSlaves[1].slaveName}`);
				if (V.PC.career === "servant") {
					t.push(`slips out from beneath your skirt.`);
				} else if (V.PC.career === "escort") {
					t.push(`tries to find the perfect balance between your extra short skirt showing either your pussy or butthole.`);
				} else {
					t.push(`dresses your lower half.`);
				}
				seX(bedSlaves[1], "oral", V.PC, "vaginal");
			}

			t.push(`When you finally leave the suite, ${bedSlaves[0].slaveName} and ${bedSlaves[1].slaveName} head into the shower for their turn, while ${bedSlaves[2].slaveName} and ${bedSlaves[3].slaveName} have finished drying each other off so they can`);
			if (App.Utils.sexAllowed(bedSlaves[2], bedSlaves[3])) {
				t.push(`have sex`);
				SimpleSexAct.Slaves(bedSlaves[2], bedSlaves[3]);
			} else {
				t.push(`nap together in the afterglow`);
			}
			t.push(`on the bed without getting the sheets wet. They pause for a moment to wave at you as you go, though. <span class="trust inc">Your fucktoys are very satisfied with their morning routine.</span>`);
			if (App.Utils.sexAllowed(bedSlaves[0], bedSlaves[1])) {
				SimpleSexAct.Slaves(bedSlaves[0], bedSlaves[1]);
			}

			t.toParagraph();

			frag.appendChild(t.container());

			bedSlaves.forEach(s => (s.trust += 4));

			return frag;
		}

		function exhausted() {
			const frag = document.createDocumentFragment();
			let noShowerSex = 0;
			t = new SpacedTextAccumulator();

			if (V.PC.dick !== 0) {
				t.push(`${bedSlaves[0].slaveName} feels a hand snake behind ${his} head and relaxes ${his} throat, knowing what's coming. You fuck the bitch's mouth hard, and since the pounding pulls your balls out of ${bedSlaves[1].slaveName}'s mouth,`);
				t.push(`you yank ${him2} up towards you so you can`); // strength check
				if (bedSlaves[1].boobs > 300) {
					t.push(`maul ${his2} breasts. The compliant slave thrusts out ${his2} chest, presenting ${his2} tits`);
				} else {
					t.push(`torment ${his2} flat breasts. The compliant slave thrusts out ${his2} chest, presenting ${his2} nipples`);
				}
				t.push(`for use as toys, and then gasps as you pinch, squeeze, and twist. You blow your load down ${bedSlaves[0].slaveName}'s throat`);
				seX(bedSlaves[0], "oral", V.PC, "penetrative");
			} else {
				t.push(`You shove ${bedSlaves[0].slaveName} down towards your pussy and grab`);
				if (bedSlaves[0].hLength > 10) {
					t.push(`${his} hair.`);
				} else if (bedSlaves[0].bald === 1) {
					t.push(`${his} bald head.`);
				} else {
					t.push(`the back of ${his} head.`);
				}
				t.push(`${He} takes a deep breath, knowing what's coming. You grind your cunt against the bitch's mouth hard, and since there's no room for ${bedSlaves[1].slaveName}'s hand there any more,`);
				t.push(`you yank ${him2} up towards you so you can`); // strength check
				if (bedSlaves[1].boobs > 300) {
					t.push(`maul ${his2} breasts. The compliant slave thrusts out ${his2} chest, presenting ${his2} tits`);
				} else {
					t.push(`torment ${his2} flat breasts. The compliant slave thrusts out ${his2} chest, presenting ${his2} nipples`);
				}
				t.push(`for use as toys, and then gasps as you pinch, squeeze, and twist. You climax against ${bedSlaves[0].slaveName}'s face`);
				seX(bedSlaves[0], "oral", V.PC, "vaginal");
			}
			t.push(`and bounce up to fuck bitches in the shower, knocking ${bedSlaves[0].slaveName} aside and sending ${bedSlaves[1].slaveName} sprawling. As you go, you tell them they've got ten minutes to get your clothes laid out and their bodies ready for more. They nod furiously and scramble.`);

			t.toParagraph();

			App.Events.refreshEventArt(bedSlaves, "no clothing");

			t.push(`By now, the shower is an impenetrable fog of steam. The wet, soapy bodies inside are easy to find, though. ${bedSlaves[2].slaveName} happens to be closest, so you`);
			t.push(`grab ${him3} and shove ${him3} into a corner of the`); // strength
			if (bedSlaves[2].belly >= 10000) {
				t.push(`shower, ${his3} ${bellyAdjective(bedSlaves[2])} soapy belly pushing uncomfortably against the glass.`);
			} else if (bedSlaves[2].boobs > 2000) {
				t.push(`shower, ${his3} huge soapy tits slapping painfully against the glass.`);
			} else if (bedSlaves[2].weight > 95) {
				t.push(`${his3} fat soapy gut slapping painfully against the glass.`);
			} else {
				t.push(`shower.`);
			}
			if (V.PC.dick !== 0) {
				t.push(`${He3} does ${his3} best to angle ${his3} hips for you as you push your cock`);
				if (bedSlaves[2].vagina > 0 && canDoVaginal(bedSlaves[2])) {
					t.push(`into ${his3} pussy to give ${him3} a good hard fuck.`);
					t.push(VCheck.Vaginal(bedSlaves[2], 1));
				} else if (bedSlaves[2].anus > 0 && canDoAnal(bedSlaves[2])) {
					t.push(`up ${his3} ass and give ${him3} a good hard reaming.`);
					t.push(VCheck.Anal(bedSlaves[2], 1));
				} else {
					t.push(`between ${his4} thighs and go to town.`);
					seX(bedSlaves[2], "anal", V.PC, "penetrative", );
				}
				t.push(`${bedSlaves[3].slaveName} does ${his4} best to wash your`);
				if (V.PC.vagina > -1) {
					t.push(`back and give your pussy some manual attention,`);
				} else {
					t.push(`back,`);
				}
				t.push(`but finds ${himself4} taking ${bedSlaves[2].slaveName}'s place soon enough, smashed into the corner with your dick pistoning`);
				if (bedSlaves[3].vagina > 0 && canDoVaginal(bedSlaves[3])) {
					t.push(`in and out of ${his4} holes.`);
					t.push(VCheck.Vaginal(bedSlaves[3], 1));
				} else if (bedSlaves[3].anus > 0 && canDoAnal(bedSlaves[3])) {
					t.push(`in and out of ${his4} holes.`);
					t.push(VCheck.Anal(bedSlaves[3], 1));
				} else {
					t.push(`between ${his4} legs.`);
					seX(bedSlaves[3], "anal", V.PC, "penetrative");
				}
			} else {
				t.push(`${He3} does ${his3} best to angle ${his3} hips for you as you`);
				if (canDoVaginal(bedSlaves[2])) {
					t.push(`fingerfuck ${him3},`);
					seX(bedSlaves[2], "vaginal", V.PC, "penetrative");
				} else if (canDoAnal(bedSlaves[2])) {
					t.push(`fingerfuck ${him3},`);
					seX(bedSlaves[2], "anal", V.PC, "penetrative");
				} else {
					t.push(`molest ${him3},`);
					noShowerSex++;
				}
				t.push(`forcing complete submission out of the compliant ${girl3}. ${bedSlaves[3].slaveName} does ${his4} best to wash your back, but finds ${himself4} taking ${bedSlaves[2].slaveName}'s place soon enough, smashed into the corner with your fingers`);
				if (bedSlaves[3].vagina > 0 && canDoVaginal(bedSlaves[3])) {
					t.push(`pistoning in and out of ${his4} holes.`);
					seX(bedSlaves[3], "vaginal", V.PC, "penetrative");
				} else if (bedSlaves[3].anus > 0 && canDoAnal(bedSlaves[3])) {
					t.push(`pistoning in and out of ${his4} holes.`);
					seX(bedSlaves[3], "anal", V.PC, "penetrative");
				} else {
					t.push(`running across every ${V.showInches === 2 ? "inch" : "centimeter"} of ${his4} body.`);
					noShowerSex++;
				}
			}
			t.push(`You're in a hurry, but it'll be a sad day when you aren't able to ${noShowerSex > 1 ? "push" : "fuck"} a slave into total submission in five minutes. You release ${bedSlaves[3].slaveName} to drop to the shower floor and let ${bedSlaves[2].slaveName} towel you off.`);
			if (V.PC.dick === 0 && ((bedSlaves[3].anus > 0 && canDoAnal(bedSlaves[3])) || (bedSlaves[3].vagina > 0 && canDoVaginal(bedSlaves[3])))) {
				t.push(`${bedSlaves[3].slaveName}`);
				if (canStand(bedSlaves[3])) {
					t.push(`gets to ${his4} feet`);
				} else {
					t.push(`hoists ${himself4} upright`);
				}
				t.push(`and helpfully holds up a strap-on questioningly; you shake your head and point to another, larger one. ${He4} helps you into it, and you ram it up ${his4}`);
				if (bedSlaves[3].vagina > 0 && canDoVaginal(bedSlaves[3])) {
					t.push(`loosened pussy`);
					seX(bedSlaves[3], "vaginal", V.PC, "penetrative");
				} else {
					t.push(`loosened ass`);
					seX(bedSlaves[3], "anal", V.PC, "penetrative");
				}
				t.push(`experimentally, nodding in satisfaction when the big phallus forces a pained gasp out of ${him4}.`);
			}

			t.toParagraph();

			t.push(`Back in the bedroom, your clothes have been laid out, ready for ${bedSlaves[0].slaveName} and ${bedSlaves[1].slaveName} to dress you.`);

			let dick = V.PC.dick !== 0 ? "dick" : "strap-on";

			t.push(`Next to the neat stack of clothes, the two slaves are bent over the bed with their buttocks spread. They're perfectly still, awaiting your pleasure. You select ${bedSlaves[1].slaveName} and`);
			if (bedSlaves[1].vagina > 0 && canDoVaginal(bedSlaves[1])) {
				t.push(`push your ${dick} up ${his2} ${bedSlaves[1].vagina > 2 ? "loose pussy" : (bedSlaves[1].vagina > 1 ? "inviting pussy" : "tight pussy")}, raping ${him2} without mercy`);
				t.push(VCheck.Vaginal(bedSlaves[1], 1));
			} else if (bedSlaves[1].anus > 0 && canDoAnal(bedSlaves[1])) {
				t.push(`ram your ${dick} up ${his2} ${bedSlaves[1].anus > 2 ? "welcoming asspussy" : (bedSlaves[1].anus > 1 ? "soft butthole" : "tight anus")}, assraping ${him2} without mercy`);
				t.push(VCheck.Anal(bedSlaves[1], 1));
			} else {
				t.push(`spin ${him2} around, then push your ${dick} down ${his2} throat, facefucking ${him2} without mercy`);
				seX(bedSlaves[1], "oral", V.PC, "penetrative");
			}
			t.push(`while ${bedSlaves[0].slaveName}`);
			if (V.PC.dick !== 0) {
				t.push(`buttons your shirt.`);
			} else if (V.PC.career === "servant") {
				t.push(`helps you into your dress.`);
			} else if (V.PC.career === "escort") {
				if (V.PC.boobs >= 1400) {
					t.push(`faces a losing battle to get your huge breasts to stay in your barely-there top.`);
				} else if (V.PC.boobs >= 1200) {
					t.push(`wrestles your big tits into your way too small top.`);
				} else if (V.PC.boobs >= 1000) {
					t.push(`struggles to shove your breasts into your too small top.`);
				} else if (V.PC.boobs >= 300) {
					t.push(`wrangles your breasts into your revealing top.`);
				} else {
					t.push(`ties your skimpy top over your flat chest.`);
				}
			} else {
				t.push(`helps you into your top.`);
			}
			t.push(`When it's done, you push ${him} down next to ${bedSlaves[1].slaveName} and switch partners, letting ${bedSlaves[1].slaveName} up to do ${his2} best to`);
			if (V.PC.dick !== 0) {
				t.push(`help you into your trousers in the meantime. ${He2} gets them on and fastens everything, except the fly, of course.`);
			} else if (V.PC.career === "servant") {
				t.push(`tie your apron and keep it out of the way.`);
			} else if (V.PC.career === "escort") {
				t.push(`dress your lower half. ${He2} gets your skimpy bottom on, thong not included of course, quickly enough.`);
			} else {
				t.push(`dress your lower half.`);
			}
			t.push(`When ${bedSlaves[0].slaveName} has been fucked into helplessness, you throw ${him} away like the human sex toy ${he} is and pound ${bedSlaves[1].slaveName} and then the dried-off ${bedSlaves[3].slaveName} and ${bedSlaves[2].slaveName} senseless, careful to frequently pull far enough out that the slaves have to take the pain of initial penetration again.`);
			SimpleSexAct.Player(bedSlaves[0]);
			SimpleSexAct.Player(bedSlaves[1]);
			SimpleSexAct.Player(bedSlaves[2]);
			SimpleSexAct.Player(bedSlaves[3]);
			t.push(`When you finally leave the suite, all four slaves are lying like discarded tissues on the bed, face-down and spread-eagled, carefully avoiding resting on any sensitive parts. <span class="devotion inc">Your fucktoys are reminded of who you are.</span>`);

			t.toParagraph();

			frag.appendChild(t.container());

			bedSlaves.forEach(s => (s.devotion += 4));

			return frag;
		}
	}
};
