App.Events.RESSPermittedMasturbation = class RESSPermittedMasturbation extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasBothArms,
				canMove,
				canHear,
				s => s.devotion > 50,
				s => (canDoAnal(s) || canDoVaginal(s)),
				s => s.assignment !== Job.QUARTER,
				s => s.assignment !== Job.CONCUBINE,
				s => s.assignment !== Job.MASTERSUITE,
				s => s.rules.release.masturbation === 1,
				s => s.energy > 80,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, hers
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		let didAnal = false;
		let didVaginal = false;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let r = [];
		r.push(`Strolling through the penthouse late at night, thinking over a business problem, you pass`);
		if (eventSlave.ID === V.HeadGirlID && V.HGSuite > 0) {
			r.push(`the door of your Head Girl's suite`);
		} else if (eventSlave.rules.living === "luxurious") {
			r.push(`the door to one of the cozy little slave bedrooms`);
		} else {
			r.push(`through the cavernous slave dormitory`);
		}
		r.push(`and see`);
		r.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), ","));
		r.push(`alone in bed tonight. ${He}'s nude, of course, and has not pulled the sheets up over ${himself}. ${He}'s lying face-down,`);
		if (eventSlave.belly >= 10000) {
			r.push(`though ${his} bulbous middle forces ${him} to twist awkwardly,`);
		} else if (eventSlave.boobs > 10000) {
			r.push(`though ${his} titanic tits prop ${his} torso up awkwardly,`);
		} else if (eventSlave.boobs > 1600) {
			r.push(`with ${his} huge boobs squashed out to either side of ${his} ${eventSlave.skin} torso,`);
		}
		r.push(`humping the sheets`);
		if (eventSlave.vagina === -1 && eventSlave.dick === 0) {
			r.push(`and using a hand to rub ${his} perineum and asspussy.`);
		} else if (eventSlave.belly >= 10000) {
			r.push(`as best ${he} can with ${his} ${belly} belly in the way.`);
		} else if (eventSlave.chastityVagina) {
			r.push(`uselessly through ${his} chastity belt.`);
		} else if (eventSlave.chastityPenis === 1) {
			r.push(`uselessly with ${his} caged dick.`);
		} else if (eventSlave.dick > 15 && !canAchieveErection(eventSlave)) {
			r.push(`with ${his} soft python of a cock.`);
		} else if (eventSlave.dick > 6 && !canAchieveErection(eventSlave)) {
			r.push(`with ${his} giant dick as engorged as ${he} can manage.`);
		} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
			r.push(`with ${his} sad, soft cock.`);
		} else if (eventSlave.dick > 3) {
			r.push(`with the huge up and down pumps ${his} impressive cock requires.`);
		} else if (eventSlave.dick > 0) {
			r.push(`with ${his} stiff dick.`);
		} else {
			r.push(`with ${his} needy pussy.`);
		}
		r.push(`${He}'s using ${his} right arm to`);
		if (canDoVaginal) {
			if (eventSlave.vagina > 2) {
				r.push(`pound ${himself} with a big dildo, and`);
			} else if (eventSlave.vagina > 0) {
				r.push(`fuck ${himself} with a dildo, and`);
			} else {
				r.push(`finger ${himself}, and`);
			}
		} else {
			if (eventSlave.anus > 2) {
				r.push(`pound ${himself} in the ass with a big dildo, and`);
			} else if (eventSlave.anus > 1) {
				r.push(`fuck ${his} own ass with a dildo, and`);
			} else if (eventSlave.anus > 0) {
				r.push(`fuck ${his} own anus with two fingers, and`);
			} else {
				r.push(`tease ${his} virgin anus, and`);
			}
		}
		if (eventSlave.fetish === "cumslut" && eventSlave.fetishKnown) {
			r.push(`is giving two fingers of ${his} left hand a blowjob.`);
		} else if (eventSlave.fetish === "masochist" && eventSlave.fetishKnown) {
			r.push(`has ${his} left hand trapped under ${his} chest to cruelly`);
			if (eventSlave.nipples !== "fuckable") {
				r.push(`twist`);
			} else {
				r.push(`finger`);
			}
			r.push(`${his} own nipples.`);
		} else if (eventSlave.fetish === "pregnancy" && eventSlave.fetishKnown && eventSlave.bellyPreg >= 1500) {
			r.push(`is using ${his} left hand to massage ${his} ${belly} gravid belly.`);
		} else if (eventSlave.fetish === "buttslut" && eventSlave.fetishKnown) {
			r.push(`is using ${his} left hand to massage that buttock sensually, pulling it to the side to stimulate ${his} anus even more.`);
		} else if (eventSlave.fetish === "boobs" && eventSlave.fetishKnown) {
			r.push(`is using ${his} left hand to grope ${his} own breasts.`);
		} else {
			r.push(`is using ${his} left hand to`);
			if (eventSlave.nipples !== "fuckable") {
				r.push(`stimulate`);
			} else {
				r.push(`finger`);
			}
			r.push(`a nipple.`);
		}
		r.push(`Slaves with powerful sex drives like ${hers} often find it necessary to masturbate in order to sleep. ${He}'s fully preoccupied, and has not noticed you.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Sleep with ${him}`, sleep),
			new App.Events.Result(`Exhaust ${him}`, exhaust, virginityWarning()),
			(eventSlave.fetishKnown === 1 && eventSlave.fetish !== Fetish.NONE)
				? new App.Events.Result(`Play into ${his} fetish at bedtime`, bedtime, virginityWarning())
				: new App.Events.Result(),
		]);

		function sleep(){
			r = [];
			r.push(`${He} starts with surprise when ${he} feels your hand on ${his}`);
			if (eventSlave.weight > 160) {
				r.push(`rippling`);
			} else if (eventSlave.weight > 95) {
				r.push(`soft`);
			} else if (eventSlave.muscles > 95) {
				r.push(`ripped`);
			} else if (eventSlave.muscles > 30) {
				r.push(`muscular`);
			} else if (eventSlave.muscles > 5) {
				r.push(`toned`);
			} else {
				r.push(`soft`);
			}
			r.push(`back, but is accustomed to your touch and knows who you are. ${He} does not pause ${his} masturbation, knowing that if you want ${him} to, you'll tell ${him}. You massage ${his} warm skin, enjoying the animal energy of the onanistic spectacle laid out before you. ${He} builds toward climax, turning ${his} head`);
			if (canSee(eventSlave)) {
				r.push(`to glance at`);
			} else {
				r.push(`to listen to`);
			}
			r.push(`you once or twice, but eventually realizing that you're just here to watch. ${He} turns over hurriedly for ${his} climax, efficiently`);
			if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
				r.push(`dribbling ${his} weak orgasm out onto ${his}`);
				if (eventSlave.belly >= 1500) {
					r.push(`${belly}`);
					if (eventSlave.bellyPreg >= 1500) {
						r.push(`pregnant`);
					}
				}
				r.push(`belly`);
			} else if (eventSlave.balls > 3) {
				r.push(`blowing ${his} massive load all over ${his}`);
				if (eventSlave.belly >= 1500) {
					r.push(`${belly}`);
					if (eventSlave.bellyPreg >= 1500) {
						r.push(`pregnant`);
					}
				}
				r.push(`belly`);
				if (eventSlave.belly < 10000) {
					r.push(`and chest`);
				}
			} else if (eventSlave.balls > 0) {
				r.push(`blowing cum up onto ${his} own`);
				if (eventSlave.belly >= 1500) {
					r.push(`${belly}`);
					if (eventSlave.bellyPreg >= 1500) {
						r.push(`pregnant`);
					}
				}
				r.push(`belly`);
			} else if (eventSlave.vagina === -1) {
				r.push(`jerking ${his} tiny little front hole sideways`);
			} else {
				r.push(`jerking ${his} wet pussy upward`);
			}
			r.push(`to avoid having to change the sheets. ${He} gets up carefully and heads off for a quick shower. When ${he} returns, it's to`);
			if (canSee(eventSlave)) {
				r.push(`a sight`);
			} else {
				r.push(`a sound`);
			}
			r.push(`that brings ${him} to a shocked standstill: you're in ${his} bed, sound asleep. You had a long day, and the soft bed, warmed by ${his} pretty body, felt very nice. After some deliberation, ${he} crawls in beside you, snuggling up to offer you more of ${his} body heat, direct from the source. ${He} is impressed almost to tears at the <span class="trust inc">trust</span> you display in ${him}, and relaxes completely as you, dominant even when unconscious, encircle ${his}`);
			if (eventSlave.preg > 20) {
				r.push(`pregnant belly`);
			} else if (eventSlave.belly >= 100000) {
				r.push(`${belly} middle`);
			} else if (eventSlave.boobs > 2000) {
				r.push(`massive mammaries`);
			} else {
				r.push(`shoulders`);
			}
			r.push(`with your arms and pull ${him} in close.`);
			eventSlave.trust += 5;
			return r;
		}

		function exhaust() {
			const prick = V.PC.dick !== 0 ? "prick" : "strap-on";
			r = [];
			r.push(`${He} starts with surprise when ${he} feels your hand on ${his}`);
			if (eventSlave.weight > 160) {
				r.push(`rippling`);
			} else if (eventSlave.weight > 95) {
				r.push(`soft`);
			} else if (eventSlave.muscles > 95) {
				r.push(`ripped`);
			} else if (eventSlave.muscles > 30) {
				r.push(`muscular`);
			} else if (eventSlave.muscles > 5) {
				r.push(`toned`);
			} else {
				r.push(`soft`);
			}
			r.push(`back, but is accustomed to your touch and knows who you are. ${He} does not pause ${his} masturbation, knowing that if you want ${him} to, you'll tell ${him}. You take a moment to enjoy the warmth of the working slave's body before gently taking the hand ${he}'s using to`);
			if (canDoVaginal(eventSlave) || eventSlave.anus === 0) {
				r.push(`pleasure ${himself},`);
				if (eventSlave.vagina > 0 || !canDoAnal(eventSlave) || eventSlave.anus === 0) {
					didVaginal = true;
				} else {
					didAnal = true;
				}
			} else {
				r.push(`buttfuck ${himself},`);
				didAnal = true;
			}
			if (didAnal) {
				if (eventSlave.anus > 2) {
					r.push(`pulling the dildo free of ${his} relaxed asshole, and replacing it with your ${prick} before its gape can close.`);
				} else if (eventSlave.anus > 1) {
					r.push(`pulling the dildo free of ${his} loose anus, and replacing it with your ${prick} before its gape can close.`);
				} else if (eventSlave.anus > 0) {
					r.push(`pulling ${his} fingers free of ${his} tight little ass, and replacing them with your ${prick} while it's still relaxed.`);
				} else {
					r.push(`removing it from ${his} untouched rear, and replacing it with your ${prick} while it's still receptive.`);
				}
				r.push(VCheck.Anal(eventSlave, 5));
			} else {
				if (eventSlave.vagina > 2) {
					r.push(`pulling the dildo free of ${his} mature pussy, and replacing it with your ${prick} before its gape can close.`);
				} else if (eventSlave.vagina > 0) {
					r.push(`pulling the dildo free of ${his} tight pussy, and replacing them with your ${prick} while it's still receptive.`);
				} else {
					r.push(`pulling ${his} fingers free of ${his} pure vagina, and replacing them with your ${prick} while ${he}'s still warmed up.`);
				}
				r.push(VCheck.Vaginal(eventSlave, 5));
			}
			r.push(`${He} moans into the pillow and pats around blindly with ${his} freed hand before finding your thigh and rubbing it affectionately. ${He} steps up ${his} humping and soon shudders,`);
			if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
				r.push(`releasing a pathetic spurt onto`);
			} else if (eventSlave.balls > 3) {
				r.push(`shooting a big jet of cum all over ${his} own`);
				if (eventSlave.belly >= 1500) {
					r.push(`${belly}`);
					if (eventSlave.bellyPreg >= 1500) {
						r.push(`pregnant`);
					}
					r.push(`stomach`);
				} else {
					r.push(`chest`);
				}
				r.push(`and`);
			} else if (eventSlave.balls !== 0) {
				r.push(`orgasming messily onto`);
			} else {
				r.push(`going limp and slumping down onto`);
			}
			r.push(`the sheets beneath ${him}. When you climax soon after, ${he} expects you to get off ${him} so ${he} can clean up, but instead, the`);
			if (didAnal) {
				if (V.PC.dick !== 0) {
					r.push(`cock up ${his} butt returns to rock hardness`);
					if (V.PC.vagina !== -1) {
						r.push(`as you use a little manual stimulation of your own cunt to get yourself stiff again`);
					}
					r.push(`and`);
				} else {
					r.push(`strap-on up ${his} butt`);
				}
			} else {
				if (V.PC.dick !== 0) {
					r.push(`cock hilted in ${him} returns to rock hardness`);
					if (V.PC.vagina !== -1) {
						r.push(`as you use a little manual stimulation of your own cunt to get yourself stiff again`);
					}
					r.push(`and`);
				} else {
					r.push(`strap-on buried in ${him}`);
				}
			}
			r.push(`goes back to pumping in and out of ${him}. ${He} slides a hand under ${himself} to`);
			if (eventSlave.vagina === -1) {
				r.push(`jerk off`);
			} else {
				r.push(`rub ${himself}`);
			}
			r.push(`this time. When you finally finish, a long time later, the exhausted slave is lying on a bed wet with lube,`);
			if (V.PC.dick !== 0 || eventSlave.dick > 0) {
				r.push(`ejaculate,`);
			}
			if (V.PC.dick === 0 || eventSlave.vagina > -1) {
				r.push(`girlcum,`);
			}
			r.push(`drool, and sweat. ${He} doesn't care, and you let ${him} curl up in ${his} sex-soaked nest. As you leave, you think ${he}'s asleep already, but`);
			if (!canSee(eventSlave)) {
				r.push(`as you go`);
			} else {
				r.push(`${his} ${App.Desc.eyesColor(eventSlave)} open a slit as you go and`);
			}
			if (canTalk(eventSlave)) {
				const Thanks = Spoken(eventSlave, "Thanks");
				r.push(`${he} murmurs, <span class="devotion inc">"${Thanks},</span> ${Master}."`);
			} else {
				r.push(`${he} struggles to sign <span class="devotion inc">"thank you"</span> before passing out.`);
			}
			eventSlave.devotion += 5;
			return r;
		}

		function bedtime() {
			const {himU, hisU, girlU} = getNonlocalPronouns(0).appendSuffix('U');
			r = [];
			r.push(`${He} starts with surprise when ${he} feels your hands seize ${him} by ${his}`);
			if (eventSlave.weight > 160) {
				r.push(`fat`);
			} else if (eventSlave.weight > 130) {
				r.push(`chubby`);
			} else if (eventSlave.weight > 95) {
				r.push(`soft`);
			} else if (eventSlave.muscles > 95) {
				r.push(`ripped`);
			} else if (eventSlave.muscles > 30) {
				r.push(`muscular`);
			} else if (eventSlave.muscles > 5) {
				r.push(`toned`);
			} else {
				r.push(`soft`);
			}
			r.push(`shoulders,`);
			if (eventSlave.fetish === Fetish.SUBMISSIVE) {
				r.push(`but ${he} relaxes into submissive compliance as you slide them up to the nape of ${his} neck, grinding ${his} face deeper into the pillow. ${He} gives muffled whines of happiness as you give ${him} some light spanks before`);
				if (canDoVaginal(eventSlave) && (eventSlave.vagina > 0 || !canDoAnal(eventSlave) || eventSlave.anus === 0)) {
					r.push(`hilting yourself in ${him}`);
					didVaginal = true;
				} else {
					r.push(`using ${his} butt`);
					didAnal = true;
				}
				r.push(`without regard for ${his} pleasure. ${He} does not climax, but when you roll ${his} unresisting body over to give ${his}`);
				if (eventSlave.belly >= 1500) {
					r.push(`mouth, swollen belly and breasts`);
				} else {
					r.push(`mouth and breasts`);
				}
				r.push(`some attention, ${he}'s clearly enjoying ${himself}.`);

				seX(eventSlave, "oral", V.PC, "penetrative");
				seX(eventSlave, "mammary", V.PC, "penetrative");
			} else if (eventSlave.fetish === "cumslut") {
				r.push(`but ${he} is already licking ${his} lips with anticipation as you roll ${him} over and straddle ${his} chest so ${he} can`);
				if (V.PC.dick !== 0) {
					r.push(`suck you off`);
					if (V.PC.vagina !== -1) {
						r.push(`and`);
					}
				}
				if (V.PC.vagina !== -1) {
					r.push(`eat you out`);
				}
				r.push(r.pop() + ".");
				r.push(`The orally fixated slut concentrates on the oral to a fault, so you take ${his} arms and straddle them too so ${he} can reach ${himself} and get back to masturbating. ${He} hums happily, a very fine sensation on`);
				if (V.PC.dick !== 0) {
					r.push(`shaft`);
					if (V.PC.vagina !== -1) {
						r.push(`and`);
					}
				}
				if (V.PC.vagina !== -1) {
					r.push(`pussylips`);
				}
				r.push(r.pop() + ".");
				seX(eventSlave, "oral", V.PC, "penetrative");
			} else if (eventSlave.fetish === "humiliation") {
				r.push(`but ${he} complies as you pull ${him} up to kneel and`);
				if (canDoVaginal(eventSlave) && (eventSlave.vagina > 0 || !canDoAnal(eventSlave) || eventSlave.anus === 0)) {
					r.push(`slip yourself inside ${him}.`);
					didVaginal = true;
				} else {
					r.push(`take an assfuck.`);
					didAnal = true;
				}
				r.push(`You let ${him} get used to it and then wordlessly turn ${his} head so ${he} can`);
				if (canSee(eventSlave)) {
					r.push(`see the screen in the room: it's now on, and it's showing a public live feed of your`);
					if (V.PC.dick !== 0) {
						r.push(`cock`);
					} else {
						r.push(`strap-on`);
					}
					r.push(`penetrating ${didVaginal ? `${him}` : `${his} anus`}. ${He} recognizes ${himself} immediately,`);
				} else {
					r.push(`listen to the screen in the room: it's now on, and it's showing a public live feed of your`);
					if (V.PC.dick !== 0) {
						r.push(`cock`);
					} else {
						r.push(`strap-on`);
					}
					r.push(`penetrating ${didVaginal ? `${him}` : `${his} anus`}. ${He} realizes the sounds of you fucking ${his} sync up with it,`);
				}
				r.push(`the sheer humiliation of having ${didVaginal ? `${himself}` : `${his} rectum`} penetrated on camera brings ${him} to an indecently quick climax.`);
			} else if (eventSlave.fetish === "buttslut") {
				r.push(`but ${he} eagerly complies as you pull ${him} up to kneel and take an assfuck. You shove ${his} arms up over ${his} head to stop ${his} masturbation, confident that the anal whore can climax from nothing but your`);
				if (V.PC.dick !== 0) {
					r.push(`cock`);
				} else {
					r.push(`strap-on`);
				}
				r.push(`pumping in and out of ${his} butt. You're right, and ${his} ${canDoAnal(eventSlave) ? "sphincter tightens" : "buttocks clench"} with orgasm even sooner than you expected it to. You roll ${him} over and go again,`);
				if (eventSlave.chastityVagina || eventSlave.chastityPenis === 1) {
					r.push(`the evidence of ${his} first orgasm leaking out from behind ${his} chastity belt.`);
				} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
					r.push(`${his} soft cock still releasing little spurts of ejaculate onto ${his}`);
					if (eventSlave.belly >= 1500) {
						r.push(`${belly}`);
						if (eventSlave.bellyPreg >= 1500) {
							r.push(`pregnant`);
						}
					}
					r.push(`belly.`);
				} else if (eventSlave.dick > 0) {
					r.push(`${his} hard dick scattering the evidence of ${his} orgasm around as it flops around with the buttsex.`);
				} else if (eventSlave.vagina === -1) {
					r.push(`${his} tiny front hole dribbling a little fluid down ${his} legs.`);
				} else {
					r.push(`${his} pussy soaking wet with arousal.`);
				}
				if (canDoAnal) {
					didAnal = true;
				}
				seX(eventSlave, "anal", V.PC, "penetrative");
			} else if (eventSlave.fetish === "boobs") {
				r.push(`but ${he} giggles with anticipation as you flip ${him} over. ${His} cute giggling turns into a gasp of arousal when you`);
				if (eventSlave.nipples !== "fuckable") {
					r.push(`seize both of ${his} hard`);
				} else {
					r.push(`sink your fingers into ${his}`);
				}
				r.push(`nipples and tug them upward to pull ${him} into a half-sitting position. You hold ${his} boobs for ${him} to accomplish a messy titfuck and let ${him} masturbate at the same time. With ${his} nipples providing second and third loci of pleasure, ${he} climaxes quickly; you flip ${him} over and do ${him} doggy style, holding ${his} shoulders down so the rough fuck drags ${his} sensitive nipples`);
				if (eventSlave.belly >= 100000) {
					r.push(`and ${belly} belly`);
				}
				r.push(`across the sheets with every stroke.`);
				if (canDoVaginal(eventSlave) && (eventSlave.vagina > 0 || !canDoAnal(eventSlave) || eventSlave.anus === 0)) {
					didVaginal = true;
				} else {
					didAnal = true;
				}
				seX(eventSlave, "mammary", V.PC, "penetrative");
			} else if (eventSlave.fetish === "pregnancy") {
				r.push(`but ${he} complies as you pull ${him} up`);
				if (eventSlave.belly >= 300000) {
					r.push(`onto ${his} ${belly} dome of a middle and take ${him} over it.`);
				} else {
					r.push(`to kneel and take it doggy style.`);
				}
				r.push(`After getting things going, you use one hand to begin groping ${his}`);
				if (eventSlave.bellyPreg >= 1500) {
					r.push(`pregnant`);
				} else if (eventSlave.belly >= 1500) {
					r.push(`${belly}`);
				}
				r.push(`belly. Bending forward to whisper into ${his} ear, you begin to describe how`);
				if (eventSlave.belly >= 750000) {
					r.push(`${he}'s nothing more than a giant egg just waiting for ${his} children to hatch, how ${he}'s so close to bursting with life that just a few more babies should do it.`);
				} else if (eventSlave.belly >= 600000) {
					r.push(`if ${he} grows any larger with child, ${he}'ll practically be nothing more than an overswollen womb.`);
				} else if (eventSlave.belly >= 450000) {
					r.push(`it must feel to be so obscenely pregnant that anyone and everyone can see the life distending ${his} struggling body.`);
				} else if (eventSlave.belly >= 300000) {
					r.push(`full ${he} would feel if ${he} got any more pregnant and how hard it would be to do even the most simple of tasks.`);
				} else if (eventSlave.belly >= 150000) {
					r.push(`with a few more babies in ${him}, ${his} obscene womb would reach the floor.`);
				} else if (eventSlave.belly >= 100000) {
					r.push(`obscene it would be if ${he} were swollen with more than a dozen children.`);
				} else if (eventSlave.belly >= 15000) {
					r.push(`full and heavy ${he}'d be with octuplets crowding ${his} womb.`);
				} else if (eventSlave.pregKnown === 1) {
					r.push(`${he}'d look and feel swollen with multiple children.`);
				} else {
					r.push(`it might feel if ${his} belly were to grow heavy with pregnancy.`);
				}
				r.push(`${He} gasps with sudden shocked arousal at the idea, moaning with desire as you describe your hot seed jetting into ${him}, racing towards ${his} core, turning ${his} body into nothing more than a breeding machine.`);
				if (canDoVaginal(eventSlave) && (eventSlave.vagina > 0 || !canDoAnal(eventSlave) || eventSlave.anus === 0)) {
					didVaginal = true;
				} else {
					r.push(`It's ${his} butt you're fucking, but ${he} doesn't care.`);
					didAnal = true;
				}
			} else if (eventSlave.fetish === "dom") {
				r.push(`but ${he} keeps masturbating even as you flip ${him} over. You tell ${him} to keep going, and leave ${him} there for a moment. ${He} obeys, looking mystified, but is pleased to`);
				if (canSee(eventSlave)) {
					r.push(`see you return with another slave.`);
				} else {
					r.push(`hear your footsteps return accompanied by a second set.`);
				}
				r.push(`You push the other ${girlU} unceremoniously down onto ${eventSlave.slaveName}, making ${himU} give ${eventSlave.slaveName} some oral while you roughly fuck ${hisU} ass. ${eventSlave.slaveName} enjoys ${himself} immensely, jerking with pleasure every time you pound the poor ${girlU} hard enough to make ${himU} moan into ${eventSlave.slaveName}.`);
				seX(eventSlave, "oral", V.PC, "penetrative");
			} else if (eventSlave.fetish === "sadist") {
				r.push(`but ${he} keeps masturbating even as you flip ${him} over. You tell ${him} to keep going, and leave ${him} there for a moment. ${He} obeys, looking mystified, but is pleased to`);
				if (canSee(eventSlave)) {
					r.push(`see you return with another slave.`);
				} else {
					r.push(`hear your footsteps return accompanied by a second set.`);
				}
				r.push(`You push the other ${girlU} unceremoniously down onto ${eventSlave.slaveName}, making ${himU} give ${eventSlave.slaveName} some oral while you spank ${himU} and then roughly fuck ${hisU} ass. ${eventSlave.slaveName} enjoys ${himself} immensely, jerking with pleasure every time you strike or sodomize the poor ${girlU} hard enough to make ${himU} scream into ${eventSlave.slaveName}.`);
				seX(eventSlave, "oral", V.PC, "penetrative");
			} else if (eventSlave.fetish === "masochist") {
				r.push(`but ${he} relaxes into submissive compliance as you slide them up to the nape of ${his} neck, grinding ${his} face deeper into the pillow. ${He} gives muffled whines of mixed pain and pleasure as you give ${him} some hard spanks before`);
				if (canDoVaginal(eventSlave) && (eventSlave.vagina > 0 || !canDoAnal(eventSlave) || eventSlave.anus === 0)) {
					r.push(`ramming it in so hard you nearly pierce through ${his} cervix and start relentlessly pounding. ${He} climaxes repeatedly to the pain, screaming helplessly as ${his} orgasms force ${him} to unwillingly buck against the invading phallus.`);
					didVaginal = true;
				} else {
					r.push(`sodomizing ${him} right up to the edge of what ${his} poor anus can take without damage. ${He} climaxes repeatedly to the pain, screaming helplessly as ${his} orgasms force ${his} abused sphincter to tighten spastically against the phallus invading it.`);
					didAnal = true;
				}
			}
			if (didAnal) {
				if (eventSlave.anus === 0) {
					eventSlave.anus++;
				}
				r.push(VCheck.Anal(eventSlave, 1));
			} else if (didVaginal) {
				if (eventSlave.vagina === 0) {
					eventSlave.vagina++;
				}
				r.push(VCheck.Vaginal(eventSlave, 1));
			}
			r.push(`${He}'s surprised but not displeased to find you standing over ${him} the next night at exactly the same time. By the third night, ${he}'s masturbating in anticipation of your visit to ${his} bed.`);
			if (eventSlave.fetishStrength > 95) {
				r.push(`Since ${he}'s totally sure of what gets ${him} off, this consistent proof that you know it too makes ${him} <span class="trust inc">trust you.</span>`);
				eventSlave.trust += 5;
			} else {
				r.push(`Since ${he}'s developing ${his} kinks, this consistent reinforcement <span class="fetish inc">advances ${his} fetish.</span>`);
				eventSlave.fetishStrength += 4;
			}
			return r;
		}

		function virginityWarning() {
			if (eventSlave.vagina === 0 && canDoVaginal(eventSlave) && (!canDoAnal(eventSlave) || eventSlave.anus === 0)) {
				return `This option will take ${his} virginity`;
			} else if (!canDoVaginal(eventSlave) && eventSlave.anus === 0) {
				return `This option will take ${his} anal virginity`;
			}
		}
	}
};

