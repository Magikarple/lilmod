App.Events.RESSDesperatelyHorny = class RESSDesperatelyHorny extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => s.rules.release.masturbation === 0,
				s => !App.Utils.hasNonassignmentSex(s),
				s => s.need,
				s => s.devotion >= -20,
				s => s.trust >= -50,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl, hers
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(
			`Looking deeply unhappy and shivering occasionally,`,
			contextualIntro(PC, eventSlave, true),
			`comes to see you.`
		);
		if (eventSlave.rules.speech === "restrictive") {
			r.push(`Since ${he} is not allowed to speak, ${he} just enters your office and stands there, unsure what to do.`);
		} else {
			if (!canTalk(eventSlave)) {
				r.push(`${He} tries to communicate something with ${his}`);
				if (hasBothArms(eventSlave)) {
					r.push(`hands,`);
				} else {
					r.push(`hand,`);
				}
				r.push(`but ${he}'s so distracted ${he} can't manage it. ${He} starts to shake a little and gives up.`);
			} else {
				r.push(
					Spoken(eventSlave, `"${Master}, please! Please — I — please, I need to — oh, ${Master}—"`),
					he
				);
				if (SlaveStatsChecker.checkForLisp(eventSlave)) {
					r.push(`lisps frantically.`);
				} else {
					r.push(`babbles.`);
				}
				r.push(`${He} starts to shake a little and lapses into silence.`);
			}
		}
		r.push(`The reason for ${his} distress is obvious:`);
		if (eventSlave.chastityPenis === 1) {
			r.push(`${his} chastity cage is mostly solid, but it has a small hole below where the tip of ${his} dick is held, and this is dripping precum. ${He}'s sexually helpless, and sexually overcharged to the point where ${he}'s dripping more precum than a usual dickgirl might ejaculate normally.`);
		} else if (eventSlave.dick > 0 && eventSlave.hormoneBalance >= 100 && !canAchieveErection(eventSlave)) {
			r.push(`though the hormones are keeping it soft, ${his} member is dripping a stream of precum; droplets of the stuff spatter ${his} legs. One of ${his} spasms brings ${his} dickhead brushing against ${his} thigh, and the stimulation almost brings ${him} to orgasm.`);
		} else if (eventSlave.dick > 0 && eventSlave.balls > 0 && eventSlave.ballType === "sterile" && !canAchieveErection(eventSlave)) {
			r.push(`though ${he}'s chemically castrated, ${his} soft member is dripping a stream of watery precum; droplets of the stuff spatter ${his} legs. One of ${his} spasms brings ${his} dickhead brushing against ${his} thigh, and the stimulation almost brings ${him} to orgasm.`);
		} else if (eventSlave.dick > 0 && eventSlave.balls === 0 && !canAchieveErection(eventSlave)) {
			r.push(`though ${he}'s gelded, ${his} soft member is dripping a stream of watery precum; droplets of the stuff spatter ${his} legs. One of ${his} spasms brings ${his} dickhead brushing against ${his} thigh, and the stimulation almost brings ${him} to orgasm.`);
		} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
			r.push(`though ${he}'s far too large to get hard, ${his} engorged member is dripping a stream of watery precum; droplets of the stuff spatter the floor. One of ${his} spasms brushes the length of ${his} cock against ${his} thigh, and the stimulation almost brings ${him} to orgasm.`);
		} else if (eventSlave.dick > 0) {
			if (eventSlave.dick > 4) {
				r.push(`${his} gigantic member juts out painfully, scattering droplets of precum whenever ${he} moves. One of ${his} spasms brings ${his} dickhead brushing up against ${his}`);
			} else if (eventSlave.dick > 2) {
				r.push(`${his} impressive member juts out painfully, scattering droplets of precum whenever ${he} moves. One of ${his} spasms brings ${his} dickhead brushing up against ${his}`);
			} else {
				r.push(`${his} little member juts out painfully, scattering droplets of precum whenever ${he} moves. One of ${his} spasms brings ${his} dickhead brushing up against ${his}`);
			}
			if (eventSlave.belly >= 10000 || eventSlave.weight > 95) {
				r.push(belly);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnancy,`);
				} else {
					r.push(`belly,`);
				}
			} else {
				r.push(`abdomen,`);
			}
			r.push(`and the stimulation almost brings ${him} to orgasm.`);
		} else if (eventSlave.chastityVagina) {
			r.push(`female juices are leaking out from behind ${his} chastity belt. ${His} cunt desperately wants to be fucked, and is dripping natural lubricant to ease penetration by cocks that cannot reach it through its protective shield.`);
		} else if (eventSlave.clit > 3) {
			r.push(`${his} dick-like clit is painfully engorged and juts out massively. The stimulation of the air on ${his} clit keeps ${him} on the brink of orgasm.`);
		} else if (eventSlave.clit > 0) {
			r.push(`${his} lovely clit is painfully engorged, and ${his} pussy is so wet there are little rivulets of moisture running down ${his} inner thighs. One of ${his} spasms brings ${his} clit brushing accidentally against ${his} hand, and the stimulation almost brings ${him} to orgasm.`);
		} else if (eventSlave.labia > 0) {
			r.push(`${his} lovely pussylips are painfully engorged, and ${his} pussy is so wet there are little rivulets of moisture running down ${his} inner thighs. One of ${his} spasms brings ${his} generous labia brushing against ${his} thighs, and the stimulation almost brings ${him} to orgasm.`);
		} else if (eventSlave.vagina === -1) {
			r.push(`though ${he} has no external genitalia to display it, ${he}'s flushed and uncomfortable, and is unconsciously presenting ${his} ass, since that's ${his} only real avenue to climax.`);
		} else {
			r.push(`${his} pussy is so wet there are little rivulets of moisture running down ${his} inner thighs. One of ${his} spasms brings ${him} enough stimulation that it almost brings ${him} to orgasm.`);
		}
		App.Events.addParagraph(node, r);
		App.Events.addParagraph(node, [`This is the result of not getting off for several days while on the slave diet provided by the nutritional systems. The mild aphrodisiacs included in ${his} food increase ${his} sex drive, and the increased libido can become cumulative if it's not regularly addressed. It looks like ${he} hasn't really gotten ${hers} in a couple of days, and the poor ${girl} can likely think of nothing but that. ${He}'s so horny ${he}'ll do anything for release. However, ${he} did come to you with ${his} trouble rather than masturbating illicitly.`]);

		let choices = [new App.Events.Result(`Touch ${him} enough to get ${him} off`, touch)];
		if (eventSlave.fetishKnown === 1 && eventSlave.fetish !== Fetish.NONE) {
			choices.push(new App.Events.Result(`Reward ${him} for coming to you`, reward, virginityWarning()));
		}
		choices.push(new App.Events.Result(null, null, `Let ${him} get off:`));
		const unknownWeakFetish = (eventSlave.fetishKnown !== 1 || eventSlave.fetishStrength <= 95);
		if (eventSlave.fetish !== "cumslut" || unknownWeakFetish) {
			choices.push(new App.Events.Result(`while ${he} sucks`, sucks));
		}
		if (eventSlave.fetish !== "boobs" || unknownWeakFetish) {
			choices.push(new App.Events.Result(`during nipple play`, nipple));
		}
		if ((eventSlave.fetish !== "pregnancy" || unknownWeakFetish) && canDoVaginal(eventSlave)) {
			choices.push(new App.Events.Result(`during insemination play`, insemination, eventSlave.vagina === 0 ? `This option will take ${his} virginity` : null));
		}
		if ((eventSlave.fetish !== "buttslut" || unknownWeakFetish) && canDoAnal(eventSlave)) {
			choices.push(new App.Events.Result(`while ${he} takes it up the ass`, ass, eventSlave.anus === 0 ? `This option will take ${his} anal virginity` : null));
		}
		if (eventSlave.fetish !== "humiliation" || unknownWeakFetish) {
			choices.push(new App.Events.Result(`in public`, inPublic));
		}
		if (eventSlave.fetish !== "submissive" || unknownWeakFetish) {
			choices.push(new App.Events.Result(`after submitting to you`, submitting, virginityWarning()));
		}
		if (eventSlave.fetish !== "masochist" || unknownWeakFetish) {
			choices.push(new App.Events.Result(`while in pain`, pain, virginityWarning()));
		}
		App.Events.addResponses(node, choices);

		function touch() {
			r = [];
			r.push(`You tell ${him} that ${he} deserves a reward for coming to you. ${He} almost bursts into tears and nods jerkily, unable to do anything else. You brush a finger across ${his} cheek, ${his} ear, ${his} lips; at each touch ${he}`);
			if (!canTalk(eventSlave)) {
				r.push(`breathes in sharply.`);
			} else {
				r.push(`gasps.`);
			}
			r.push(`Moving around behind ${him}, you run a hand down ${his} flank to ${his} hip, and then around to ${his}`);
			if (eventSlave.belly >= 10000 || eventSlave.bellyPreg >= 5000) {
				r.push(`popped`);
			}
			r.push(`navel, and up to cup ${his} breasts. Your run a thumb`);
			if (eventSlave.nipples !== "fuckable") {
				r.push(`over`);
			} else {
				r.push(`into`);
			}
			r.push(`each nipple, almost tipping ${him} over the edge. Your hands move down again,`);
			if (canDoAnal(eventSlave) && canDoVaginal(eventSlave)) {
				r.push(`spreading ${his} buttocks to tease ${his} clenched anus, and then forward across ${his} perineum. From there, you trace ${his} labia and end with a pinch of ${his} ${eventSlave.dick > 0 ? "cockhead" : "clit"} — and this is enough.`);
			} else if (canDoAnal(eventSlave)) {
				r.push(`spreading ${his} buttocks to tease ${his} clenched anus, and then forward across ${his} perineum — and this is enough.`);
			} else if (canDoVaginal(eventSlave)) {
				r.push(`tracing ${his} labia, and then forward to ${his} ${eventSlave.dick > 0 ? "cockhead" : "clit"} — and this is enough.`);
			} else {
				r.push(`to give ${his} buttcheeks a rub down before teasing at ${his} chastity — and this is enough.`);
			}
			r.push(`${He} spasms, pitching forward`);
			if (eventSlave.belly >= 300000) {
				r.push(`onto ${his} obscene belly.`);
			} else {
				r.push(`and almost falling.`);
			}
			r.push(`${He} hurries to clean up after ${himself}, sobbing with relief and thanking you; ${his} submissiveness to you <span class="devotion inc">has increased.</span>`);
			eventSlave.devotion += 4;
			return r;
		}

		function reward() {
			const {heU, hisU, himU, girlU} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
			const child = eventSlave.pregType > 1 ? "children" : "child";
			r = [];
			r.push(`${He} almost cries with relief when you tell ${him} to`);
			switch (eventSlave.fetish) {
				case "submissive":
					r.push(`lie down on your desk on ${his} side in the fetal position. ${He} clambers up hurriedly and hugs ${his} knees`);
					if (eventSlave.belly >= 10000) {
						r.push(`as best ${he} can with ${his} ${belly}`);
						if (eventSlave.bellyPreg >= 3000) {
							r.push(`pregnancy`);
						}
						r.push(`in the way`);
					}
					r.push(r.pop() + `, spinning ${himself} around on the smooth surface so ${his} rear is pointing right at you. You stand up and pull ${him} over, ${his} ${eventSlave.skin} skin sliding across the cool glass desktop, until ${his}`);
					if (canDoAnal(eventSlave) && canDoVaginal(eventSlave)) {
						r.push(`butt is right at the edge of the desk. You warm yourself up with a pussy fuck before shifting your attention to ${his} neglected asshole.`);
						r.push(VCheck.Both(eventSlave, 3));
						r.push(`When you finish, you`);
					} else if (canDoAnal(eventSlave)) {
						r.push(`butt is right at the edge of the desk.`);
						r.push(VCheck.Anal(eventSlave, 3));
						r.push(`You give it a good fuck and then`);
					} else if (canDoVaginal(eventSlave)) {
						r.push(`pussy is right at the edge of the desk.`);
						r.push(VCheck.Vaginal(eventSlave, 3));
						r.push(`You give it a good fuck and then`);
					} else {
						r.push(`mouth is right at the edge of the desk. You give it a good fuck and then`);
						seX(eventSlave, "oral", PC, "penetrative", 3);
					}
					r.push(`order ${him} brusquely to clean up and come right back. You use ${him} as a nice little desktop`);
					if (PC.dick !== 0) {
						r.push(`cockholster`);
					} else {
						r.push(`sex toy`);
					}
					r.push(`for the rest of the day.`);
					break;
				case "cumslut":
					r.push(`get under your desk and`);
					if (PC.dick !== 0) {
						r.push(`suck a dick`);
						if (PC.vagina !== -1) {
							r.push(`and eat a pussy`);
						}
					} else {
						r.push(`eat pussy`);
					}
					r.push(`while you work.`);
					if (eventSlave.belly >= 120000) {
						r.push(`As ${his} ${belly} belly bumps into you, you sigh and swivel your chair to the side; there is no way ${he}'ll fit under there in ${his} bloated state.`);
					}
					r.push(`${He}'s so horny that ${he}'s barely got`);
					if (PC.dick !== 0) {
						r.push(`your cock into ${his} mouth`);
					} else {
						r.push(`${his} lips and tongue on your cunt`);
					}
					r.push(`before ${he} climaxes spontaneously, shivering and moaning nicely. You keep ${him} down there for a while, doing light work and orgasming occasionally as ${he} gently`);
					if (PC.dick !== 0) {
						r.push(`blows you`);
						if (PC.vagina !== -1) {
							r.push(`and eats you out`);
						}
					} else {
						r.push(`lavishes attention on your wet vagina`);
					}
					r.push(r.pop() + `.`);
					seX(eventSlave, "oral", PC, "penetrative", 3);
					break;
				case "humiliation":
					r.push(`run an unimportant message to a citizen across ${V.arcologies[0].name}. Naked. ${He} blushes with mixed embarrassment and anticipation. ${He}'s so pent up that before taking ten steps out of your penthouse entryway and towards ${his} objective, the open stares ${his} naked, horny body is getting push ${him} over the edge.`);
					if (eventSlave.chastityPenis === 1) {
						r.push(`As ${he}`);
						if (eventSlave.belly >= 10000) {
							r.push(`waddles`);
						} else {
							r.push(`walks`);
						}
						r.push(`along, ${his} chastity cage continues to stream precum. It spatters ${his} legs, making ${his} desperation completely obvious to anyone who looks at ${him}`);
						if (eventSlave.belly >= 150000) {
							r.push(`from behind`);
						}
						r.push(r.pop() + `.`);
					} else if (canAchieveErection(eventSlave)) {
						r.push(`${His} rock hard cock,`);
						if (eventSlave.belly >= 150000) {
							r.push(`forced down by the size of ${his} ${belly}`);
							if (eventSlave.bellyPreg >= 3000) {
								r.push(`pregnancy`);
							} else {
								r.push(`stomach`);
							}
							r.push(`as ${he}`);
							if (eventSlave.belly >= 10000) {
								r.push(`waddles`);
							} else {
								r.push(`walks`);
							}
							r.push(`hurriedly along, jerks suddenly and shoots out a little squirt of cum down the underside of ${his} belly.`);
						} else {
							r.push(`sticking straight forward as ${he}`);
							if (eventSlave.belly >= 10000) {
								r.push(`waddles`);
							} else {
								r.push(`walks`);
							}
							r.push(`hurriedly along, jerks suddenly upward and shoots out a little squirt of cum`);
							if (eventSlave.belly >= 10000) {
								r.push(`across the underside of ${his}`);
								if (eventSlave.bellyPreg >= 3000) {
									r.push(`pregnant`);
								}
								r.push(`belly`);
							}
							r.push(r.pop() + `.`);
						}
						r.push(`As ${he} stumbles forward, each step releases another squirt.`);
					} else if (eventSlave.dick > 0) {
						r.push(His);
						if (eventSlave.dick > 6) {
							r.push(`enormous`);
						}
						r.push(`soft cock, flopping around as ${he}`);
						if (eventSlave.belly >= 10000) {
							r.push(`waddles`);
						} else {
							r.push(`walks`);
						}
						r.push(`hurriedly along, starts to twitch weakly and release little dribbles of cum. As ${he} stumbles forward, each step releases another squirt.`);
					} else if (eventSlave.anus > 2) {
						r.push(`As ${he} stumbles a little with the orgasm, ${his}`);
						if (canDoAnal(eventSlave)) {
							r.push(`naked anus is easily visible from behind ${him}, and its lewd spasms attract attention.`);
						} else {
							r.push(`anus lewdly spasms under ${his} chastity, and ${his} odd motions attract attention.`);
						}
					} else if (canDoVaginal(eventSlave)) {
						r.push(`${He} focuses ${his} attention on ${his} pussy, awkwardly stumbling along as ${he} tries to walk and finger ${himself} at the same time.`);
					} else if (canDoAnal(eventSlave)) {
						r.push(`${He} focuses ${his} attention on ${his} asspussy, awkwardly stumbling along as ${he} tries to walk and play with ${his} own butt at the same time.`);
					} else if (eventSlave.vagina > 0) {
						r.push(`${He} squirts a little femcum down ${his} inner thighs as ${he} stumbles along, trailing the odor of a woman's pleasure behind ${him}.`);
					} else {
						r.push(`${He} focuses ${his} attention on ${his} breasts, awkwardly stumbling along as ${he} tries to walk and`);
						if (eventSlave.nipples !== "fuckable") {
							r.push(`tweak`);
						} else {
							r.push(`finger`);
						}
						r.push(`${his} own nipples at the same time.`);
					}
					r.push(`Passersby point and laugh, thrilling ${him}.`);
					break;
				case "buttslut":
					r.push(`sit on your lap.`);
					if (canDoAnal(eventSlave)) {
						r.push(`${He} climaxes the instant your`);
						if (PC.dick !== 0) {
							r.push(`dickhead`);
						} else {
							r.push(`strap-on`);
						}
						r.push(`touches ${his}`);
						if (eventSlave.anus > 2) {
							r.push(`anal gape,`);
						} else {
							r.push(`pucker,`);
						}
						r.push(`but ${he} knows this is just the start, and ${he} laughs with pleasure as ${his}`);
						if (eventSlave.anus > 2) {
							r.push(`lewd sphincter loosely squeezes`);
						} else {
							r.push(`sphincter tightens against`);
						}
						r.push(`the base of`);
						if (PC.dick !== 0) {
							r.push(`your cock.`);
						} else {
							r.push(`the strap-on.`);
						}
						r.push(`You`);
						if (eventSlave.belly >= 5000) {
							r.push(`spread your legs more and shove the`);
							if (eventSlave.bellyPreg >= 3000) {
								r.push(`pregnant,`);
							}
							r.push(`giggling buttslut down so ${his} ${belly} belly and chest are between your legs, lower your chair a little, and slide yourself back towards your desk to work.`);
						} else {
							r.push(`shove the giggling buttslut down so ${his} chest is resting against the tops of your legs, lower your chair a little, and slide yourself back towards your desk to work.`);
						}
						r.push(`${He} wraps ${his} legs around the back of the chair and hugs your knees with ${his} arms, securing ${himself}`);
						if (eventSlave.belly >= 100000) {
							r.push(`to you as an anal cocksleeve for as long as you feel like keeping`);
							if (PC.dick !== 0) {
								r.push(`your penis lodged up a compliant butthole.`);
							} else {
								r.push(`the happy buttslut nice and full.`);
							}
						} else {
							r.push(`under the desk as an anal cocksleeve for as long as you feel like keeping`);
							if (PC.dick !== 0) {
								r.push(`your penis lodged up a compliant butthole.`);
							} else {
								r.push(`the happy buttslut trapped under there.`);
							}
						}
						r.push(VCheck.Anal(eventSlave, 1));
					} else {
						r.push(`${He} climaxes the instant your`);
						if (PC.dick !== 0) {
							r.push(`dickhead`);
						} else {
							r.push(`strap-on`);
						}
						r.push(`squeezes between ${his}`);
						if (eventSlave.butt < 2) {
							r.push(`flat, tight cheeks,`);
						} else if (eventSlave.butt <= 2) {
							r.push(`cute cheeks,`);
						} else if (eventSlave.butt <= 3) {
							r.push(`round, firm cheeks,`);
						} else if (eventSlave.butt <= 4) {
							r.push(`curvy, enticing buttcheeks,`);
						} else if (eventSlave.butt <= 5) {
							r.push(`huge cheeks,`);
						} else if (eventSlave.butt <= 6) {
							r.push(`massive, alluring cheeks,`);
						} else if (eventSlave.butt <= 7) {
							r.push(`enormous cheeks,`);
						} else if (eventSlave.butt <= 10) {
							r.push(`gigantic, jiggly cheeks,`);
						} else if (eventSlave.butt <= 14) {
							r.push(`inhuman, cushiony butt cheeks,`);
						} else if (eventSlave.butt <= 20) {
							r.push(`couch-like, super jiggly ass cheeks,`);
						}
						r.push(`but ${he} knows this is just the start, and ${he} laughs with pleasure as hug ${his} rear around`);
						if (PC.dick !== 0) {
							r.push(`your cock.`);
						} else {
							r.push(`the strap-on.`);
						}
						r.push(`You`);
						if (eventSlave.belly >= 5000) {
							r.push(`spread your legs more and shove the`);
							if (eventSlave.bellyPreg >= 3000) {
								r.push(`pregnant,`);
							}
							r.push(`giggling buttslut down so ${his} ${belly} belly and chest are between your legs, lower your chair a little, and slide yourself back towards your desk to work.`);
						} else {
							r.push(`shove the giggling buttslut down so ${his} chest is resting against the tops of your legs, lower your chair a little, and slide yourself back towards your desk to work.`);
						}
						r.push(`${He} wraps ${his} legs around the back of the chair and hugs your knees with ${his} arms, securing ${himself}`);
						if (eventSlave.belly >= 100000) {
							r.push(`to you as a cockbun for as long as you feel like keeping`);
							if (PC.dick !== 0) {
								r.push(`your penis wrapped in a happy buttslut.`);
							} else {
								r.push(`the happy buttslut entertained.`);
							}
						} else {
							r.push(`under the desk as a cockbun for as long as you feel like keeping the happy buttslut trapped under there.`);
						}
						r.push(`under the desk as cockbun for as long as you feel like keeping the happy buttslut trapped under there.`);
					}
					break;
				case "boobs":
					r.push(`lie atop your desk. You don't bother specifying that ${he}'s to lie on ${his} back, since the boob slut jumps up and presents ${his} tits without instructions. You keep working with one hand while you idly tease and`);
					if (eventSlave.nipples !== "fuckable") {
						r.push(`flick`);
					} else {
						r.push(`finger`);
					}
					r.push(`the nearest`);
					if (eventSlave.lactation > 0) {
						r.push(`milky`);
					}
					r.push(`nipple with the other. ${He}'s so horny that ${he} immediately experiences an immodest orgasm, ${his} back arching away from the cool glass desktop as ${he} rides its waves. ${He} giggles a little, and then gasps as you resume playing with ${him}.`);
					seX(eventSlave, "mammary", PC, "penetrative");
					if (eventSlave.lactation > 0) {
						eventSlave.lactationDuration = 2;
						eventSlave.boobs -= eventSlave.boobsMilk;
						eventSlave.boobsMilk = 0;
					} else {
						r.push(induceLactation(eventSlave, 4));
					}
					break;
				case "pregnancy":
					if (!canDoAnal(eventSlave) && !canDoVaginal(eventSlave)) {
						r.push(`join you on the couch. Since`);
						if (eventSlave.vagina >= 0) {
							r.push(`you're saving ${his} pussy,`);
						} else {
							r.push(`this slave ${girl} doesn't have a pussy,`);
						}
						r.push(`and ${his} tight little rosebud is off limits, your options are a bit limited. But you work with what you have, playing with ${his}`);
						if (isFertile(eventSlave)) {
							if (eventSlave.lactation === 0) {
								r.push(`nipples and describing in whispers how pregnancy would make them drip with cream.`);
							} else {
								r.push(`breasts and describing in whispers how big they'll swell if ${he} got pregnant.`);
							}
						} else if (eventSlave.preg > eventSlave.pregData.normalBirth/2) {
							if (eventSlave.lactation === 1) {
								r.push(`nipples and describing in whispers how nice and swollen ${he} is with ${milkFlavor(eventSlave)}milk.`);
							} else {
								r.push(`breasts and describing in whispers how big ${he}'s gotten since ${he} got pregnant.`);
							}
						} else if (eventSlave.preg > 0) {
							if (eventSlave.lactation === 0) {
								r.push(`nipples and describing in whispers how ${his} pregnancy will soon have them drip with cream.`);
							} else {
								r.push(`breasts and describing in whispers how ${his} pregnancy will soon swell them to feed ${his} ${child}.`);
							}
						} else {
							if (eventSlave.lactation === 0) {
								r.push(`nipples and describing in whispers how they'd drip with cream if only ${he} could get pregnant.`);
							} else {
								r.push(`breasts and describing in whispers how big they'd swell if only ${he} could get pregnant.`);
							}
						}
						r.push(`${He} gasps and shudders against you.`);
						seX(eventSlave, "mammary", PC, "penetrative");
					} else if (eventSlave.anus === 0 && eventSlave.vagina <= 0) {
						r.push(`join you on the couch. Since`);
						if (eventSlave.vagina === 0) {
							r.push(`${he}'s a virgin and you haven't elected to introduce ${him} to pussyfucking just yet,`);
						} else {
							r.push(`this slave ${girl} doesn't have a pussy,`);
						}
						r.push(`and ${his} tight little rosebud is fresh and unspoiled, your options are a bit limited. But you work with what you have, playing with ${his}`);
						if (isFertile(eventSlave)) {
							if (eventSlave.lactation === 0) {
								r.push(`nipples and describing in whispers how pregnancy would make them drip with cream.`);
							} else {
								r.push(`breasts and describing in whispers how big they'll swell if ${he} got pregnant.`);
							}
						} else if (eventSlave.preg > eventSlave.pregData.normalBirth/2) {
							if (eventSlave.lactation === 1) {
								r.push(`nipples and describing in whispers how nice and swollen ${he} is with ${milkFlavor(eventSlave)}milk.`);
							} else {
								r.push(`breasts and describing in whispers how big ${he}'s gotten since ${he} got pregnant.`);
							}
						} else if (eventSlave.preg > 0) {
							if (eventSlave.lactation === 0) {
								r.push(`nipples and describing in whispers how ${his} pregnancy will soon have them drip with cream.`);
							} else {
								r.push(`breasts and describing in whispers how ${his} pregnancy will soon swell them to feed ${his} ${child}.`);
							}
						} else {
							if (eventSlave.lactation === 0) {
								r.push(`nipples and describing in whispers how they'd drip with cream if only ${he} could get pregnant.`);
							} else {
								r.push(`breasts and describing in whispers how big they'd swell if only ${he} could get pregnant.`);
							}
						}
						r.push(`${He} gasps and shudders against you.`);
						seX(eventSlave, "mammary", PC, "penetrative");
					} else if (eventSlave.pregKnown === 1) {
						r.push(`join you on the couch.`);
						if (PC.dick !== 0) {
							r.push(`You orgasm inside ${him} promptly, and then tell ${him} you'll be leaving your seed inside ${him} to do its work while you have ${him} again.`);
						} else {
							r.push(`You use a strap-on with a fluid reservoir, and you trigger it promptly, releasing a gush of warm fluid into ${him}. You tell ${him} you'll be leaving it inside ${him} to do its work while you have ${him} again.`);
						}
						r.push(`${He} gasps at the appeal of the idea and grinds ${himself} against you hungrily.`);
						if (!canDoVaginal(eventSlave)) {
							if (eventSlave.mpreg === 1) {
								r.push(`${He}'s already pregnant, but that doesn't disrupt ${his} fantasy of being even more pregnant.`);
							} else {
								r.push(`It's ${his} butt you're fucking, but that doesn't disrupt ${his} fantasy.`);
							}
							r.push(VCheck.Anal(eventSlave, 1));
						} else {
							r.push(`${He}'s already pregnant, but that doesn't disrupt ${his} fantasy of being even more pregnant.`);
							r.push(VCheck.Vaginal(eventSlave, 1));
						}
					} else {
						r.push(`join you on the couch.`);
						if (PC.dick !== 0) {
							r.push(`You orgasm inside ${him} promptly, and then tell ${him} you'll be leaving your seed inside ${him} to do its work while you have ${him} again.`);
						} else {
							r.push(`You use a strap-on with a fluid reservoir, and you trigger it promptly, releasing a gush of warm fluid into ${him}. You tell ${him} you'll be leaving it inside ${him} to do its work while you have ${him} again.`);
						}
						r.push(`${He} gasps at the appeal of the idea and grinds ${himself} against you hungrily.`);
						if (!canDoVaginal(eventSlave)) {
							if (eventSlave.mpreg === 1) {
								r.push(`${He}'s eager to get pregnant and intends to put ${his} asspussy to use.`);
							} else {
								r.push(`It's ${his} butt you're fucking, but that doesn't disrupt ${his} fantasy.`);
							}
							r.push(VCheck.Anal(eventSlave, 1));
						} else {
							r.push(`${He}'s eager to get pregnant and intends to put ${his} pussy to use.`);
							r.push(VCheck.Vaginal(eventSlave, 1));
						}
					}
					break;
				case "dom":
					r.push(`wait a moment, because you know what ${he} needs. ${He}'s mystified, but steels ${himself} and waits. Another slave appears for an inspection, and ${heU} discovers that ${heU}'s to be inspected with ${eventSlave.slaveName}'s`);
					if (canPenetrate(eventSlave)) {
						r.push(`cock up ${hisU} asshole.`);
					} else {
						r.push(`fingers assfucking ${himU}.`);
					}
					r.push(`The dominant ${eventSlave.slaveName} climaxes immediately to ${his} use of the poor slave, rubbing`);
					if (eventSlave.belly >= 5000) {
						r.push(`${his} ${belly}`);
						if (eventSlave.bellyPreg >= 3000) {
							r.push(`pregnant`);
						}
						r.push(`belly`);
					} else {
						r.push(`${himself}`);
					}
					r.push(`all over the other slave's buttocks while ${he} continues banging ${hisU} backdoor.`);
					seX(eventSlave, "penetrative", "slaves", "anal");
					break;
				case "sadist":
					r.push(`wait a moment, because you know what ${he} needs. ${He}'s mystified, but steels ${himself} and waits. Another slave appears for a trivial punishment, and ${heU} discovers that ${heU}'s to be punished by ${eventSlave.slaveName}'s`);
					if (canPenetrate(eventSlave)) {
						r.push(`dick,`);
					} else {
						r.push(`fingers,`);
					}
					r.push(`forced up ${hisU} anus. The dominant ${eventSlave.slaveName} climaxes quickly, but quickly recovers and keeps assraping the poor ${girlU}.`);
					seX(eventSlave, "penetrative", "slaves", "anal");
					break;
				case "masochist":
					r.push(`get ${his} ass up on your desk and`);
					if (eventSlave.belly >= 300000) {
						r.push(`lie off the side atop ${his} ${belly} stomach.`);
					} else if (eventSlave.belly < 1500) {
						r.push(`lie on ${his} side.`);
					} else {
						r.push(`lie face-down.`);
					}
					r.push(`${He}`);
					if (eventSlave.belly >= 10000) {
						r.push(`struggles to heft ${his}`);
						if (eventSlave.bellyPreg >= 3000) {
							r.push(`gravid`);
						}
						r.push(`body`);
					} else {
						r.push(`clambers`);
					}
					r.push(`up, and you let ${his} lie there for a while, tortured by anticipation and arousal, before giving ${his} nearest buttock a harsh open-handed slap. The shock and pain send ${him} over the edge immediately, and ${he} grinds forward into the desk involuntarily; the feeling of the cool desk against ${his}`);
					if (eventSlave.dick > 0) {
						r.push(`dickhead`);
					} else if (eventSlave.vagina === -1) {
						r.push(`crotch`);
					} else {
						r.push(`mons`);
					}
					r.push(`slams ${him} into a second climax, and ${he} sobs with overstimulation. You keep ${him} there for a good long while, using ${him} as a desktop toy that makes interesting noises when you hit it.`);
					break;
			}
			if (eventSlave.fetishStrength > 95) {
				r.push(`Since ${he}'s totally sure of what gets ${him} off, this proof you know it too makes ${him} <span class="trust inc">trust you.</span>`);
				eventSlave.trust += 5;
			} else {
				r.push(`Since ${he}'s developing ${his} kinks, this reinforcement of ${his} sexual identity <span class="fetish inc">advances ${his} fetish.</span>`);
				eventSlave.fetishStrength += 4;
			}
			return r;
		}

		function sucks() {
			r = [];
			r.push(`You tell ${him} that ${he} deserves a way to get off for coming to tell you rather than breaking the rules. From now on, ${he} can come to you and ask to`);
			if (PC.dick === 0) {
				r.push(`perform cunnilingus on you`);
			} else {
				r.push(`blow you`);
				if (PC.vagina !== -1) {
					r.push(`and eat you out`);
				}
			}
			r.push(r.pop() + `, and masturbate while ${he} does. ${He} nods through ${his} tears and hurriedly gets to ${his} knees, gagging in ${his} clumsy eagerness, crying a little with relief as ${he} masturbates furiously`);
			if (PC.vagina !== -1 && PC.dick !== 0) {
				r.push(`and does ${his} best to simultaneously please both a cock and a cunt with only one mouth`);
			}
			r.push(r.pop() + `. ${He} doesn't even pause after ${his} first orgasm; ${his} acceptance of sexual slavery <span class="devotion inc">has increased.</span>`);
			eventSlave.devotion += 4;
			seX(eventSlave, "oral", PC, "penetrative", 5);
			const givingHead = PC.dick === 0 ? `giving head` : `sucking cock`;
			if (eventSlave.fetish === "cumslut" && eventSlave.fetishKnown === 1) {
				eventSlave.fetishStrength += 4;
				r.push(`<span class="fetish inc">${His} enjoyment of ${givingHead} has increased.</span>`);
			} else if (random(1, 100) > 50) {
				eventSlave.fetishStrength = 65;
				eventSlave.fetish = "cumslut";
				eventSlave.fetishKnown = 1;
				r.push(`Before ${he} realizes what's happening, <span class="fetish gain">${he}'s getting aroused at the thought of ${givingHead}.</span>`);
			}
			return r;
		}

		function nipple() {
			r = [];
			r.push(`You tell ${him} that ${he} deserves a way to get off for coming to tell you rather than breaking the rules. From now on, ${he} can come to you and offer you ${his} breasts; ${he} will be allowed to masturbate while you do. ${He} nods through ${his} tears and hurriedly presents ${his} chest, crying a little with relief as ${he} feels`);
			if (eventSlave.nipples !== "fuckable") {
				r.push(`you nip a nipple with your teeth.`);
			} else if (PC.dick !== 0) {
				r.push(`your dick slip into a nipple.`);
			} else {
				r.push(`your tongue penetrate into ${his} nipple.`);
			}
			r.push(`${He} masturbates furiously, not even pausing after ${his} first orgasm; ${his} acceptance of sexual slavery <span class="devotion inc">has increased.</span>`);
			eventSlave.devotion += 4;
			seX(eventSlave, "mammary", PC, "penetrative", 5);
			if (eventSlave.fetish === "boobs" && eventSlave.fetishKnown === 1) {
				eventSlave.fetishStrength += 4;
				r.push(`<span class="fetish inc">${His} enjoyment of breast play has increased.</span>`);
			} else if (random(1, 100) > 50) {
				eventSlave.fetishStrength = 65;
				eventSlave.fetish = "boobs";
				eventSlave.fetishKnown = 1;
				r.push(`Before ${he} realizes what's happening, <span class="fetish gain">${he}'s getting aroused at every brush against ${his} breasts.</span>`);
			}
			return r;
		}

		function insemination() {
			r = [];
			r.push(`You tell ${him} that ${he} deserves a way to get off for coming to tell you rather than breaking the rules. For the rest of the week, ${he} can come to you and offer you ${his}`);
			if (eventSlave.vagina > 3) {
				r.push(`hopelessly gaped pussy;`);
			} else if (eventSlave.vagina > 2) {
				r.push(`loose pussy;`);
			} else if (eventSlave.vagina > 1) {
				r.push(`nice pussy;`);
			} else {
				r.push(`tight pussy;`);
			}
			r.push(`${he} will be allowed to masturbate while you fill ${him} with cum. ${He} nods through ${his} tears and`);
			if (eventSlave.belly >= 10000) {
				r.push(`struggles to get`);
			} else {
				r.push(`hurriedly gets`);
			}
			r.push(`up on your desk, lying on ${his} side and using one hand to spread ${his} buttocks apart while the other is poised to touch ${himself}. ${He} starts crying a little with relief as ${he} feels you slowly insert`);
			if (PC.dick === 0) {
				r.push(`a spurting strap-on`);
			} else {
				r.push(`your cock`);
			}
			r.push(`into ${his} spasming cunt. ${He} masturbates furiously, not even pausing after ${his} first orgasm; ${his} acceptance of sexual slavery <span class="devotion inc">has increased.</span>`);
			r.push(VCheck.Vaginal(eventSlave, 5));
			eventSlave.devotion += 4;
			if (eventSlave.fetish === "pregnancy" && eventSlave.fetishKnown === 1) {
				eventSlave.fetishStrength += 4;
				r.push(`<span class="fetish inc">${His} enjoyment of pregnancy play has increased.</span>`);
			} else if (random(1, 100) > 50) {
				eventSlave.fetishStrength = 65;
				eventSlave.fetish = "pregnancy";
				eventSlave.fetishKnown = 1;
				r.push(`Before ${he} realizes what's happening, <span class="fetish gain">${he}'s getting aroused at the thought of getting pregnant.</span>`);
			}
			return r;
		}

		function ass() {
			r = [];
			r.push(`You tell ${him} that ${he} deserves a way to get off for coming to tell you rather than breaking the rules. For the rest of the week, ${he} can come to you and offer you ${his}`);
			if (eventSlave.anus > 3) {
				r.push(`hopelessly gaped rectum;`);
			} else if (eventSlave.anus > 2) {
				r.push(`big slit of an asspussy;`);
			} else if (eventSlave.anus > 1) {
				r.push(`nice asspussy;`);
			} else {
				r.push(`tight asshole;`);
			}
			r.push(`${he} will be allowed to masturbate while you buttfuck ${him}. ${He} nods through ${his} tears and`);
			if (eventSlave.belly >= 10000) {
				r.push(`struggles to get`);
			} else {
				r.push(`hurriedly gets`);
			}
			r.push(`up on your desk, lying on ${his} side and using one hand to spread ${his} buttocks apart while the other is poised to touch ${himself}. ${He} starts crying a little with relief as ${he} feels you slowly insert`);
			if (PC.dick === 0) {
				r.push(`a strap-on`);
			} else {
				r.push(`your cock`);
			}
			r.push(`into ${his} spasming rectum. ${He} masturbates furiously, not even pausing after ${his} first orgasm; ${his} acceptance of sexual slavery <span class="devotion inc">has increased.</span>`);
			r.push(VCheck.Anal(eventSlave, 5));
			eventSlave.devotion += 4;
			if (eventSlave.fetish === "buttslut" && eventSlave.fetishKnown === 1) {
				eventSlave.fetishStrength += 4;
				r.push(`<span class="fetish inc">${His} enjoyment of anal has increased.</span>`);
			} else if (random(1, 100) > 50) {
				eventSlave.fetishStrength = 65;
				eventSlave.fetish = "buttslut";
				eventSlave.fetishKnown = 1;
				r.push(`Before ${he} realizes what's happening, <span class="fetish gain">${he}'s getting aroused at the thought of anal sex.</span>`);
			}
			return r;
		}

		function inPublic() {
			r = [];
			r.push(`You tell ${him} that ${he} deserves a way to get off for coming to tell you rather than breaking the rules. For the rest of the week, ${he} can masturbate in public, sitting with ${his} legs spread for as much exposure as possible. ${He} nods through ${his} tears and sprints out of your office, dripping as ${he} goes. ${He} throws ${himself} to the ground outside, to the considerable amusement of passersby, spreading ${his} legs painfully wide. ${He} masturbates furiously, not even pausing after ${his} first orgasm; ${his} acceptance of sexual slavery <span class="devotion inc">has increased.</span>`);
			eventSlave.devotion += 4;
			if (eventSlave.fetish === "humiliation" && eventSlave.fetishKnown === 1) {
				eventSlave.fetishStrength += 4;
				r.push(`<span class="fetish inc">${His} enjoyment of humiliation has increased.</span>`);
			} else if (random(1, 100) > 50) {
				eventSlave.fetishStrength = 65;
				eventSlave.fetish = "humiliation";
				eventSlave.fetishKnown = 1;
				r.push(`Before ${he} realizes what's happening, <span class="fetish gain">${he}'s starting to long for humiliation.</span>`);
			}
			return r;
		}

		function submitting() {
			r = [];
			r.push(`You tell ${him} that ${he} deserves a way to get off for coming to tell you rather than breaking the rules.`);
			if (canDoVaginal(eventSlave)) {
				r.push(`For the rest of the week, ${he} can come to you and offer you ${his}`);
				if (eventSlave.vagina > 3) {
					r.push(`hopelessly loose pussy;`);
				} else if (eventSlave.vagina > 2) {
					r.push(`big slit of a pussy;`);
				} else if (eventSlave.vagina > 1) {
					r.push(`nice pussy;`);
				} else {
					r.push(`tight pussy;`);
				}
				r.push(`${he} will be allowed to masturbate after, but only after, you are finished with ${him}. ${He} nods through ${his} tears and`);
				if (eventSlave.belly >= 10000) {
					r.push(`struggles to get`);
				} else {
					r.push(`hurriedly gets`);
				}
				r.push(`up on your desk, lying on ${his} side and using one hand to spread ${his} nether lips apart while the other is poised to touch ${himself}. ${He} starts crying a little with relief as ${he} feels you slowly insert`);
				if (PC.dick === 0) {
					r.push(`a strap-on`);
				} else {
					r.push(`your cock`);
				}
				r.push(`into ${his} spasming vagina. You are not gentle, and despite the stimulation ${he} does not orgasm by the time you`);
				if (PC.dick === 0) {
					r.push(`climax to the vibrations of the strap-on, and the pleasure of fucking a bitch.`);
				} else {
					r.push(`blow your load in ${his} cunt.`);
				}
				r.push(`${He}'s so eager to get off ${he} doesn't bother to move, and just`);
				if (eventSlave.belly >= 1500) {
					r.push(`snakes a hand down to fondle ${himself}.`);
				} else {
					r.push(`rolls onto ${his} face to hump ${himself} against ${his} hand, against the desk.`);
				}
				if (PC.dick === 0) {
					r.push(`After the momentary pause of your climax, you`);
					if (PC.vagina !== -1) {
						r.push(`use a little manual stimulation of your pussy to force yourself to total hardness again and`);
					}
					r.push(`resume thrusting;`);
				} else {
					r.push(`Your cum leaks out of ${his} used cunt and onto ${his} working hand;`);
				}
				r.push(`${his} acceptance of sexual slavery <span class="devotion inc">has increased.</span>`);
				r.push(VCheck.Vaginal(eventSlave, 5));
			} else if (canDoAnal(eventSlave)) {
				r.push(`For the rest of the week, ${he} can come to you and offer you ${his}`);
				if (eventSlave.anus > 3) {
					r.push(`hopelessly gaped rectum;`);
				} else if (eventSlave.anus > 2) {
					r.push(`big slit of an asspussy;`);
				} else if (eventSlave.anus > 1) {
					r.push(`nice asspussy;`);
				} else {
					r.push(`tight asshole;`);
				}
				r.push(`${he} will be allowed to masturbate after, but only after, you are finished with ${him}. ${He} nods through ${his} tears and`);
				if (eventSlave.belly >= 10000) {
					r.push(`struggles to get`);
				} else {
					r.push(`hurriedly gets`);
				}
				r.push(`up on your desk, lying on ${his} side and using one hand to spread ${his} buttocks apart while the other is poised to touch ${himself}. ${He} starts crying a little with relief as ${he} feels you slowly insert`);
				if (PC.dick === 0) {
					r.push(`a strap-on`);
				} else {
					r.push(`your cock`);
				}
				r.push(`into ${his} spasming rectum. You are not gentle, and despite the anal stimulation ${he} does not orgasm by the time you`);
				if (PC.dick === 0) {
					r.push(`climax to the vibrations of the strap-on, and the pleasure of buttfucking a bitch.`);
				} else {
					r.push(`blow your load in ${his} ass.`);
				}
				r.push(`${He}'s so eager to get off ${he} doesn't bother to move, and just`);
				if (eventSlave.belly >= 1500) {
					r.push(`snakes a hand down to fondle ${himself}.`);
				} else {
					r.push(`rolls onto ${his} face to hump ${himself} against ${his} hand, against the desk.`);
				}
				if (PC.dick === 0) {
					r.push(`After the momentary pause of your climax, you`);
					if (PC.vagina !== -1) {
						r.push(`use a little manual stimulation of your pussy to force yourself to total hardness again and`);
					}
					r.push(`resume thrusting;`);
				} else {
					r.push(`Your cum leaks out of ${his} used backdoor and onto ${his} working hand;`);
				}
				r.push(`${his} acceptance of sexual slavery <span class="devotion inc">has increased.</span>`);
				r.push(VCheck.Anal(eventSlave, 5));
			} else {
				r.push(`For the rest of the week, ${he} can come to you and politely ask to`);
				if (PC.dick !== 0) {
					r.push(`suck you off;`);
				} else {
					r.push(`eat you out;`);
				}
				r.push(`${he} will be allowed to masturbate after, but only after, you are satisfied. ${He} nods through ${his} tears and`);
				if (eventSlave.belly >= 300000) {
					r.push(`leans over ${his} ${belly} stomach,`);
				} else {
					if (eventSlave.belly >= 10000) {
						r.push(`struggles`);
					} else {
						r.push(`hurriedly gets`);
					}
					r.push(`to ${his} knees,`);
				}
				r.push(`where ${he} brings ${his} face to your`);
				if (PC.dick !== 0) {
					r.push(`erect cock`);
				} else {
					r.push(`moist pussy`);
				}
				r.push(`and ${his} hand to ${his} crotch. ${He} starts crying a little with relief as ${he} feels you slowly`);
				if (PC.dick === 0) {
					r.push(`push your slit against`);
				} else {
					r.push(`insert your cock into`);
				}
				r.push(`${his} mouth. You are not gentle, and by the time you`);
				if (PC.dick !== 0) {
					r.push(`blow your load down ${his} throat,`);
				} else {
					r.push(`splash ${his} face with your girlcum,`);
				}
				r.push(`${he} still hasn't reached ${his} climax. ${He}'s so eager to get off ${he} doesn't bother to move, and just humps ${himself} against ${his} hand, against`);
				if (eventSlave.belly >= 300000) {
					r.push(`${his} belly.`);
				} else {
					r.push(`your leg.`);
				}
				if (PC.dick === 0) {
					r.push(`After the momentary pause of your climax, you`);
					if (PC.vagina !== -1) {
						r.push(`use a little manual stimulation of your pussy to force yourself to total hardness again and`);
					}
					r.push(`resume thrusting;`);
				} else {
					r.push(`After the momentary pause of your climax, you pull ${his} face back to your crotch for a second round;`);
				}
				r.push(`${his} acceptance of sexual slavery <span class="devotion inc">has increased.</span>`);
				seX(eventSlave, "oral", PC, "penetrative", 5);
			}
			eventSlave.devotion += 4;
			if (eventSlave.fetish === Fetish.SUBMISSIVE && eventSlave.fetishKnown === 1) {
				eventSlave.fetishStrength += 4;
				r.push(`<span class="fetish inc">${His} enjoyment of submission has increased.</span>`);
			} else if (random(1, 100) > 50) {
				eventSlave.fetishStrength = 65;
				eventSlave.fetish = "submissive";
				eventSlave.fetishKnown = 1;
				r.push(`Before ${he} realizes what's happening, <span class="fetish gain">${he}'s getting aroused at the thought of submission.</span>`);
			}
			return r;
		}

		function pain() {
			r = [];
			r.push(`You tell ${him} that ${he} deserves a way to get off for coming to tell you rather than breaking the rules. For the rest of the week, ${he} can come to you and masturbate: but you will abuse ${him} while ${he} does. ${He} starts to cry in fear, but`);
			if (eventSlave.belly >= 10000) {
				r.push(`struggles to get`);
			} else {
				r.push(`hurriedly gets`);
			}
			r.push(`up on your desk anyway. You swat ${his} thighs apart so ${he} can get a hand down there. ${He} hesitates desperately before touching ${himself}, knowing that as soon as ${he} does the pain will start, but ${his} horniness wins out. You aim a vicious flick at ${his}`);
			if (eventSlave.nipples === "huge") {
				r.push(`absurd nipples`);
			} else if (eventSlave.nipples !== "tiny") {
				r.push(`big nipples`);
			} else {
				r.push(`nipples`);
			}
			r.push(`and then take a crop out of your desk, flogging ${his}`);
			if ((eventSlave.boobsImplant/eventSlave.boobs) >= 0.60) {
				r.push(`fake`);
			} else if (eventSlave.boobs > 1000) {
				r.push(`jiggling`);
			} else {
				r.push(`firm`);
			}
			r.push(`breasts without mercy. ${He} finally orgasms and flees, falling over ${his} own feet in ${his} desperation; ${his} acceptance of sexual slavery <span class="devotion inc">has increased.</span>`);
			eventSlave.devotion += 4;
			if (eventSlave.fetish === "masochist" && eventSlave.fetishKnown === 1) {
				eventSlave.fetishStrength += 4;
				r.push(`<span class="fetish inc">${His} enjoyment of pain has increased.</span>`);
			} else if (random(1, 100) > 50) {
				eventSlave.fetishStrength = 65;
				eventSlave.fetish = "masochist";
				eventSlave.fetishKnown = 1;
				r.push(`Before ${he} realizes what's happening, <span class="fetish gain">${he}'s getting aroused at the thought of ${his} ${getWrittenTitle(eventSlave)} beating ${him}.</span>`);
			}
			return r;
		}

		function virginityWarning() {
			if ((canDoVaginal(eventSlave) && eventSlave.vagina === 0) || (canDoAnal(eventSlave) && eventSlave.anus === 0)) {
				return `This option may take ${his} virginity`;
			}
		}
	}
};
