App.Events.RESSComfortableSeat = class RESSComfortableSeat extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.PC.belly < 5000,
			() => V.PC.balls < 10
		];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canStand,
				hasAnyArms,
				canSee,
				s => s.trust > 20,
				s => s.devotion > 20,
				s => s.energy > 40,
				s => s.belly < 300000
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {say, title: Master} = getEnunciation(eventSlave);
		const desc = SlaveTitle(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const dickSize = eventSlave.dick > 4 ? "big" : (eventSlave.dick > 2 ? "" : "tiny");
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave);

		let t = [];

		t.push("There are sturdy leather seats placed strategically throughout your penthouse. They offer something convenient to bend your slaves over, wherever you happen to encounter them, and they're comfortable, too. At the moment, you're sitting on one, using a tablet to take care of some business that caught you away from your office, but isn't worth heading back to your desk for. Slaves move by your impromptu throne as you work, mostly");
		if (V.averageTrust > 50) {
			t.push("greeting you cheerfully");
		} else if (V.averageTrust > 20) {
			t.push("greeting you properly");
		} else if (V.averageTrust > -20) {
			t.push("doing their best to greet you properly");
		} else if (V.averageTrust > -50) {
			t.push("greeting you fearfully");
		} else {
			t.push("struggling to greet you through their terror");
		}
		t.push("as they pass. Busy, you spare few of them more than a glance.");
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`One of them slows as ${he} goes by, however. Looking up, you see that it's`);
		t.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), "."));
		if (canTalk(eventSlave)) {
			if (eventSlave.belly >= 1500) {
				t.push(`"Hi ${Master}," ${he} ${say}s flirtatiously rubbing a hand across ${his} ${belly} ${eventSlave.bellyPreg > 0 ? "pregnancy" : "belly"}.`);
			} else {
				t.push(`"Hi ${Master}," ${he} ${say}s flirtatiously.`);
			}
			t.push(Spoken(eventSlave, `"That looks like a really comfortable seat. Can I sit down and rest ${eventSlave.belly >= 10000 ? "my tired legs" : ""} for a little while?"`));
		} else {
			t.push(`${He} greets you properly, but adds a flirtiness to ${his} gestures, and asks if ${he} can sit down and rest`);
			if (eventSlave.belly >= 10000) {
				t.push(`${his} ${eventSlave.bellyPreg > 0 ? "gravid" : belly} bulk`);
			}
			t.push("on the comfortable seat for a little while.");
		}
		t.push(`${He} is not pointing at the soft leather cushion next to you: ${he}'s pointing at your crotch.`);
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`You're nude, a consequence of ${V.ConcubineID !== 0 && V.ConcubineID !== eventSlave.ID ? `recent activities involving ${contextualIntro(V.PC, S.Concubine)}` : "recent unrelated activities"}. ${PC.dick !== 0 ? "Your formidable dick is three quarters hard," : "Nude, that is, all except for the strap-on you were just using and haven't taken off yet,"} and ${eventSlave.slaveName} is pointing right at it. ${He} knows exactly what ${he}'s asking for and gives ${his}`);
		if (eventSlave.hips > 0) {
			t.push("broad");
		} else if (eventSlave.hips > -1) {
			t.push("trim");
		} else {
			t.push("narrow");
		}
		t.push("hips a little wiggle to make it even more abundantly clear.");
		if (eventSlave.chastityPenis === 1) {
			t.push(`${His} poor dick is visibly straining against the restrictive chastity belt ${he}'s wearing.`);
		} else if (canAchieveErection(eventSlave)) {
			t.push(`${His} ${dickSize} dick is jutting out stiffly and there's a bead of precum ${eventSlave.foreskin === 0 ? "forming at its smooth tip" : `escaping from ${his} foreskin`}.`);
		} else if (eventSlave.dick > 0) {
			t.push(`${His} ${dickSize} dick is as soft as ever, but there's a string of precum running between ${eventSlave.foreskin === 0 ? "its smooth tip" : "the soft foreskin that completely covers its tip"} and ${his} inner thigh.`);
		} else if (eventSlave.clit > 0) {
			t.push(`${His} ${eventSlave.clit > 1 ? "formidable" : "big"} clit is visibly erect. ${eventSlave.piercing.genitals.weight > 1 ? `${His} sizable clit piercing never lets its hood completely cover hide ${his} bitch button, but it's completely retracted now,` : `${His} delicate clitoral hood has been pushed back by ${his} female erection,`} leaving ${him} proudly aroused.`);
		} else if (eventSlave.labia > 0) {
			t.push(`${His} ${eventSlave.labia > 1 ? "dangling" : "thick"} labia are visibly swollen, flushing and growing prouder as the blood rushes to ${his} womanhood.`);
		} else if (eventSlave.vagina === -1) {
			t.push(`Since ${he}'s featureless in front, ${he} makes a little half turn to the side, making it very clear that ${his} asspussy needs fucking.`);
		} else {
			t.push(`${He} has a shapely womanhood, with trim labia and a demure clit, but it's a little flushed.`);
		}
		t.push(`${(eventSlave.vaginaLube > 0 && eventSlave.vagina > -1) ? `${His} wet cunt is already lubricating itself generously for you, slicking ${his} labia with female arousal.` : ""} The slutty ${desc} wants it badly.`);

		App.Events.addParagraph(node, t);
		t = [];

		App.Events.addResponses(node, [
			new App.Events.Result(`Let ${him} do what ${he} wants`, permit),
			new App.Events.Result(`Have ${him} service you while you work`, service),
			new App.Events.Result(`Drive ${him} off for breaking in on your work`, spank)
		]);

		function permit() {
			const frag = document.createDocumentFragment();
			t = [];

			t.push(`You tell ${him} to sit down if ${he}'d like to. ${He} looks at you quizzically, ${eventSlave.intelligence + eventSlave.intelligenceImplant < -15 ? `${his} dim mind slowly` : ""} realizing that you're letting ${him} choose what to do. ${canTalk(eventSlave) ? `"Oh, thank you, ${Master}," ${he} ${say}s,` : `${He} gestures ${his} thanks,`} and then makes a show of deciding. ${He} ${eventSlave.intelligence + eventSlave.intelligenceImplant < -15 ? "doesn't have to pretend" : "cheekily pretends"} to be an airheaded bimbo puzzling over how ${he} wants to approach a fuck, bouncing`);
			if ((eventSlave.boobsImplant / eventSlave.boobs) >= 0.60) {
				t.push(`${his} fake tits a little,`);
			} else if (eventSlave.boobs > 4000) {
				t.push(`${his} monstrous udders heavily,`);
			} else if (eventSlave.boobs > 1000) {
				t.push(`${his} heavy breasts a little,`);
			} else if (eventSlave.boobs > 300) {
				t.push(`${his} boobs a little,`);
			} else {
				t.push(`on ${his} heels,`);
			}
			if (eventSlave.belly >= 5000) {
				t.push(`rocking ${his}`);
				if (eventSlave.bellyPreg >= 3000) {
					t.push("baby bump");
				} else if (eventSlave.bellyImplant >= 3000) {
					t.push("implant-filled belly");
				} else {
					t.push(`${eventSlave.inflationType}-filled belly`);
				}
				t.push("side to side seductively");
			} else {
				t.push(`wiggling ${his} rear side to side alluringly`);
			}
			t.push(`and putting a finger to ${his} slightly parted lips as ${he} stares down at your ${PC.dick !== 0 ? "stiff prick" : "strap-on"}.`);
			App.Events.addParagraph(frag, t);
			t = [];

			if (eventSlave.fetishKnown === 1 && eventSlave.fetish !== Fetish.NONE) {
				t.push(`Finally making ${his} decision, ${he}`);
				switch (eventSlave.fetish) {
					case "submissive":
						t.push(`turns around and carefully perches ${himself} on ${PC.dick !== 0 ? "your cock" : "the phallus"},`);
						if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
							t.push(`letting ${his} weight slide it inside ${his} wet pussy.`);
							t.push(VCheck.Vaginal(eventSlave, 1));
						} else if (canDoAnal(eventSlave) && eventSlave.anus > 0) {
							t.push(`letting ${his} weight push it up ${his} asshole.`);
							t.push(VCheck.Anal(eventSlave, 1));
						} else {
							t.push(`putting it between ${his} thighs.`);
						}
						t.push(`${He}'s not used to being on top, but ${he} uses ${himself} to service you as submissively as ${he} can. ${He} pays ${his} own pleasure no attention at all,`);
						break;
					case "cumslut":
						t.push(`squats down, coming face to face with ${PC.dick !== 0 ? "your cock" : "the phallus"}.`);
						if (canTalk(eventSlave)) {
							t.push(
								Spoken(eventSlave, `"${Master}, I changed my mind about sitting,"`),
								`${he} ${say}s,`
							);
						} else {
							t.push(`${He} gestures that ${he} changed ${his} mind about sitting,`);
						}
						t.push(`and licks ${his} lips sluttily. Then ${he} gives ${PC.dick !== 0 ? "you" : "the phallus"} a lusty blowjob, humming and licking happily. ${He} ${PC.dick !== 0 ? "swallows your load hungrily" : "helps you out of the harness with your permission and eats you out too"},`);
						seX(eventSlave, "oral", PC, "penetrative");
						break;
					case "humiliation":
						t.push(`turns around and sits on ${PC.dick !== 0 ? "your cock" : "the phallus"}, leaning back against you and making sure all the other slaves who pass by can see`);
						if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
							t.push(`where it penetrates ${his} cunt.`);
							t.push(VCheck.Vaginal(eventSlave, 1));
						} else if (canDoAnal(eventSlave) && eventSlave.anus > 0) {
							t.push(`where it's lodged up ${his} butt.`);
							t.push(VCheck.Anal(eventSlave, 1));
						} else {
							t.push(`where it's rubbing ${him} intimately between ${his} thighs.`);
						}
						t.push(`${He} gets off on their looks,`);
						break;
					case "buttslut":
						if (canDoAnal(eventSlave) && eventSlave.anus > 0) {
							t.push(`turns around and shivers with pleasure as ${he} hilts ${his} anal sphincter around the base of ${PC.dick !== 0 ? "your cock" : "the phallus"}. ${He} bounces on it happily, reaming ${his} own ass,`);
							t.push(VCheck.Anal(eventSlave, 1));
						} else {
							t.push(`turns around and shivers with pleasure as ${he} feels ${PC.dick !== 0 ? "your cock" : "the phallus"} slip between ${his} buttcheeks. ${He} rubs against it, happy to share ${his} butt with you,`);
						}
						break;
					case "boobs":
						t.push(`squats down, placing ${PC.dick !== 0 ? "your cock" : "the phallus"}`);
						if (eventSlave.boobs > 4000) {
							t.push(`in the virtual hole formed in the place between ${his} breasts, which are so massive they rest together.`);
						} else if (eventSlave.boobs > 1000) {
							t.push(`in the valley between ${his} tits.`);
						} else if (eventSlave.boobs > 300) {
							t.push(`between ${his} breasts.`);
						} else {
							t.push(`against one of ${his} nipples.`);
						}
						if (canTalk(eventSlave)) {
							t.push(
								Spoken(eventSlave, `"${Master}, I changed my mind about sitting,"`),
								`${he} ${say}s,`
							);
						} else {
							t.push(`${He} gestures that ${he} changed ${his} mind about sitting,`);
						}
						t.push(`and starts giving you a boob job. ${He} enjoys the breast play,`);

						seX(eventSlave, "mammary", PC, "penetrative");
						break;
					case "pregnancy":
						if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
							t.push(`turns around and lovingly lowers ${his} pussy onto you.`);
							if (PC.dick !== 0) {
								if (eventSlave.pregKnown === 1) {
									t.push(`${He}'s already pregnant, so this isn't a direct satisfaction of ${his} impregnation fetish, but being fucked while pregnant is almost as good as far as ${he}'s concerned.`);
								} else if (canGetPregnant(eventSlave)) {
									t.push(`This might be the moment ${he} gets pregnant, and ${he}'s quivering with anticipations.`);
								} else {
									t.push(`${He} knows ${he} isn't fertile, but ${he}'s good at fantasizing.`);
								}
							} else {
								t.push(`Your strap-on might not be able to impregnate anyone, but ${he}'s good at fantasizing.`);
							}
							t.push(`${He} rides you hungrily,`);

							t.push(VCheck.Vaginal(eventSlave, 1));
							if (canImpreg(eventSlave, PC)) {
								knockMeUp(eventSlave, 40, 0, -1);
							}
						} else {
							t.push(`turns around and carefully perches ${himself} on ${PC.dick !== 0 ? "your cock" : "the phallus"}, putting it between ${his} thighs. ${He} rides you caringly,`);
						}
						break;
					case "dom":
						t.push(`turns around and sits right down on ${PC.dick !== 0 ? "your cock" : "the phallus"}, eagerly`);
						if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
							t.push(`taking it into ${his} cunt.`);
							t.push(VCheck.Vaginal(eventSlave, 1));
						} else if (canDoAnal(eventSlave) && eventSlave.anus > 0) {
							t.push(`getting it shoved up ${his} butt.`);
							t.push(VCheck.Anal(eventSlave, 1));
						} else {
							t.push(`squeezing it between ${his} thighs.`);
						}
						t.push(`${He} loves being on top, even if ${he}'s the one who's getting fucked. ${He} rides you happily,`);
						break;
					case "sadist":
						t.push(`turns around and hesitantly sits on ${PC.dick !== 0 ? "your cock" : "the phallus"}, letting`);
						if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
							t.push(`it slide into ${his} cunt.`);
							t.push(VCheck.Vaginal(eventSlave, 1));
						} else if (canDoAnal(eventSlave) && eventSlave.anus > 0) {
							t.push(`it slide up ${his} butt.`);
							t.push(VCheck.Anal(eventSlave, 1));
						} else {
							t.push(`it slide between ${his} thighs.`);
						}
						t.push(`${He} prefers to be rough, but settles for just directing how ${he} gets used. ${He} rides you cautiously,`);
						break;
					case "masochist":
						t.push(`turns around and carefully perches ${himself} on ${PC.dick !== 0 ? "your cock" : "the phallus"},`);
						if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
							t.push(`letting ${his} weight slide it inside ${his} wet pussy at an uncomfortable angle.`);
							t.push(VCheck.Vaginal(eventSlave, 1));
						} else if (canDoAnal(eventSlave) && eventSlave.anus > 0) {
							t.push(`letting ${his} weight push it up ${his} asshole at an uncomfortable angle.`);
							t.push(VCheck.Anal(eventSlave, 1));
						} else {
							t.push(`putting it between ${his} thighs at an uncomfortable angle.`);
						}
						t.push(`${He} does ${his} best to please you while making sex as unpleasant as ${he} can for ${himself}. ${He} pays close attention to your comfort versus ${his} own,`);
						break;
				}
				t.push(`and after you've ${PC.dick !== 0 ? "cum" : "climaxed"}, ${he} <span class="mediumaquamarine">thanks you trustingly,</span> happy ${he}'s still allowed a sexy choice with you now and then.`);
			} else {
				t.push(`${eventSlave.fetishKnown === 1 ? `${He} can't really think of how to accommodate the situation to ${his} own preferred approach to sex` : `${He} isn't well versed in how ${his} own sexual needs might fit into the situation`}, so ${he} just services you like a good ${girl}. ${He} turns around and sits on ${PC.dick !== 0 ? "your cock" : "the phallus"},`);
				if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
					t.push(`squatting to bounce ${his} cunt up and down on it.`);
					t.push(VCheck.Vaginal(eventSlave, 1));
				} else if (canDoAnal(eventSlave) && eventSlave.anus > 0) {
					t.push(`squatting to bounce ${his} butthole up and down on it.`);
					t.push(VCheck.Anal(eventSlave, 1));
				} else {
					t.push(`putting it between ${his} thighs for some intercrural sex, since ${his} ${eventSlave.vagina > -1 ? "holes aren't" : "hole isn't"} appropriate.`);
				}
				t.push(`When ${he}'s gotten you off, ${he} <span class="mediumaquamarine">thanks you trustingly.</span> Even though ${he} wasn't able to figure out how to seat ${himself} in a really satisfactorily sexy way, ${he}'s glad you gave ${him} some agency.`);
			}
			App.Events.addParagraph(frag, t);

			eventSlave.trust += 5;

			t = []; /* need to clear the array before returning in this case because otherwise weird things happen */
			return [frag];
		}

		function service() {
			t = [];

			t.push(`You order ${him} to sit on your ${PC.dick !== 0 ? "dick" : "strap-on"} and get you off like a good ${girl}, but not to disturb you while you're working. ${He}`);
			if (canTalk(eventSlave)) {
				t.push(`shuts up immediately,`);
			} else {
				t.push(`obediently drops ${his} ${hasBothArms(eventSlave) ? `hands to ${his} sides and stops communicating with them` : `hand to ${his} side and stops communicating with it`},`);
			}
			t.push(`and approaches you carefully. Meanwhile, you go back to your tablet, ignoring ${him} completely. ${He} gingerly straddles your legs, positioning ${his} intimate areas directly over the pointing head of`);
			if (eventSlave.belly >= 5000) {
				t.push(`${PC.dick !== 0 ? "your erection" : "the phallus"}, all while delicately trying to not bump into you with ${his} ${eventSlave.bellyPreg >= 3000 ? "pregnancy" : "belly"}.`);
			} else {
				t.push(`${PC.dick !== 0 ? "your erection" : "the phallus"}.`);
			}
			t.push(`Deciding that ${he} shouldn't use ${his} ${hasBothArms(eventSlave) ? "hands" : "hand"} to guide it, ${he} lowers ${himself} slowly,`);
			if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
				t.push(`breathing a little harder as ${he} feels its head spread ${his} pussylips and then slide inside ${him}.`);
				t.push(VCheck.Vaginal(eventSlave, 1));
			} else if (canDoAnal(eventSlave) && eventSlave.anus > 0) {
				t.push(`letting out a breath and relaxing as ${he} feels its head press past ${his} sphincter and then all the way up ${his} butt.`);
				t.push(VCheck.Anal(eventSlave, 1));
			} else {
				t.push(`getting it situated between ${his} thighs, since that's the best option ${he} has available.`);
			}
			t.push(`${eventSlave.belly >= 5000 ? `Before starting to pleasure you, ${he} notices there is no way ${he} can move with ${his} rounded middle sticking out as far as it does. ${He} carefully turns around, feeling your glare on ${his} back at ${his} mistake.` : ""} Still crouched over you, ${he} begins to move up and down, milking ${PC.dick !== 0 ? "your penis" : "the strap-on"}. As ${he} works into it, ${he} lets ${his} butt touch you, just once, but you make a nonverbal sound of disapproval, letting ${him} know not to disturb your work like that. Realizing that ${he} needs to play the human sex toy, ${he}`);
			if (eventSlave.butt > 12) {
				t.push(`grabs ${his} massive buttocks and finds that there is no way ${he} can keep the expanses of flesh from enveloping your lap.`);
			} else if (eventSlave.butt > 5) {
				t.push(`grabs ${his} huge buttocks and holds them apart, doing ${his} best to keep them out of the way.`);
			} else if (eventSlave.butt > 2) {
				t.push(`takes hold of ${his} healthy asscheeks and spreads them as far as they'll go, doing ${his} best to keep them out of the way.`);
			} else {
				t.push(`uses ${his} arms for balance, since ${his} cute butt can stay out of the way on its own and doesn't need to be spread by hand.`);
			}
			if (eventSlave.belly >= 10000) {
				t.push(`You spread your legs as you shift into a more comfortable position, stealthily showing mercy since ${he} can't possibly keep ${his} ${eventSlave.bellyPreg >= 3000 ? "full-term" : belly} belly off you otherwise.`);
			}
			t.push(`${He} bobs up and down, getting you off without ever touching you${PC.dick !== 0 ? `, other than the contact between your penis and the inside of ${his} body, of course` : ""}.`);
			if (eventSlave.energy > 80) {
				t.push(`${He} has such a powerful sex drive that even this sterile intercourse brings ${him} to orgasm.`);
			} else if (!App.Utils.hasNonassignmentSex(eventSlave)) {
				t.push(`${He} obeys the rules about orgasm and hasn't gotten off as part of ${his} assignment recently, so ${he} orgasms despite the sterility of the intercourse.`);
			} else {
				t.push(`${He} does not orgasm, serving you properly and showing appropriate disregard for ${his} own pleasure.`);
			}
			t.push(`When ${he}'s done, ${he} makes the perfect exit, <span class="hotpink">silently padding away like the passive sex object ${he} is.</span>`);

			eventSlave.devotion += 5;
			return t;
		}

		function spank() {
			t = [];

			t.push(`You command ${him} to turn around and show you ${his} ass. ${He} obeys eagerly, spinning and bringing you face to face with ${his}`);
			if (eventSlave.butt > 12) {
				t.push("view-filling rear.");
			} else if (eventSlave.butt > 5) {
				t.push("monstrous bottom.");
			} else if (eventSlave.butt > 2) {
				t.push("womanly butt.");
			} else {
				t.push("cute little rear end.");
			}
			t.push(`${He}'s expecting something sexy, and ${he}'s wrong. You give ${his} right asscheek a stinging, open-handed slap. It's so unexpected that ${he} jumps with surprise, takes a step forward, and instantly bursts into tears. Knowing that ${he} has to accept whatever you think ${he} deserves, ${he} takes a step back towards you to come back within range.`);
			if (canTalk(eventSlave)) {
				t.push(
					`${Master}, I'm s-sorry,"`,
					`${he} sobs.`,
					`"I d-don't understand. What did I d-do?"`
				);
			} else {
				t.push(`${He} shakily gestures a question, begging to know what ${he} did.`);
			}
			t.push(`You tell ${him} not to disturb you when you're working, tanning ${his} ass viciously, first one buttock and then the other. ${He} stands there and takes ${his} beating, weeping, more from the <span class="gold">bitter disappointment that ${he}'s not allowed to approach you</span> like that.`);

			eventSlave.trust -= 5;
			return t;
		}
	}
};
