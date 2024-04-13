// cSpell:ignore janky

App.Events.pRaped = class pRaped extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => App.Events.effectiveWeek() === 12,
			() => V.raped === -1,
			() => V.arcologyUpgrade.drones !== 1,
			() => V.BodyguardID === 0,
			() => V.PC.career !== "arcology owner",
			() => V.PC.visualAge >= 14
		];
	}

	execute(node) {
		V.nextButton = " "; // disable Continue
		let r = [];
		const {
			hisP, womanP, girlP
		} = getPronouns(V.PC).appendSuffix("P");
		V.raped = 1;
		V.rapedThisWeek = (V.rapedThisWeek || 0) + 1;

		const genParam = {minAge: 16, race: "nonslave", disableDisability: 1};
		let rapist;
		const contractCost = 1000;
		if (V.PC.vagina >= 0) {
			rapist = GenerateNewSlave("XY", genParam);
			rapist.dick = 6;
			rapist.balls = 5;
			rapist.boobs = 100;
			rapist.waist = 50;
			rapist.skill.oral = 0;
			rapist.skill.anal = 0;
			rapist.pronoun = 1; // janky workaround - reset later by repeating generatePronouns - reexamine in any diversePronouns rework
		} else {
			rapist = GenerateNewSlave("XX", genParam);
			rapist.vagina = 1;
			rapist.preg = 0;
			rapist.weight = random(-20, 30);
			rapist.waist = -20;
		}
		rapist.muscles = Math.max(rapist.muscles, 10);
		rapist.origin = `You sentenced $him to enslavement for the attempted rape of a free ${womanP} – you, to be exact.`;
		rapist.devotion = -100;
		rapist.trust = -100;
		setHealth(rapist, jsRandom(-40, -20), normalRandInt(15, 3), undefined, 1, jsRandom(30, 80));
		rapist.anus = 0;
		rapist.behavioralFlaw = "arrogant";
		rapist.sexualFlaw = "judgemental";
		const {
			He,
			his, he, him, himself, woman
		} = getPronouns(rapist);
		const {say} = getEnunciation(rapist);
		const hindranceMod = isHinderedDegree(V.PC);

		r.push(`While returning from a meeting with a prospective investor, an unfortunate wrong turn has led you into a rather seedy area of your arcology. You feel distinctly uncomfortable for some reason.`);

		if (!canWalk(V.PC)) {
			r.push(`You stifle a`);
			if (isPCCareerInCategory("mercenary") || isPCCareerInCategory("slaver") || V.PC.title === 1 || V.PC.skill.combat >= 45) {
				r.push(`swear`);
			} else {
				r.push(`scream`);
			}
			r.push(`when you feel your chair lurch as something jams a wheel and a ${woman} circles in to view holding a knife. You have no means of escaping and are entirely at ${his} mercy.`);
			if (isPCCareerInCategory("gang") && hindranceMod > .5) {
				r.push(`But someone of your background isn't going to take that sitting down, so the moment ${he} draws within arms reach, you quickly pull your own shiv and bury it into ${his} chest. The look of disbelief on ${his} face as ${he} staggers back is priceless.`);
			}
		} else if (isPCCareerInCategory("mercenary") || V.PC.skill.warfare >= 85) {
			r.push(`The moment you hear the sound of the knife unsheathe your reflexes take`);
			if (hindranceMod > .5) {
				r.push(`over. With a single strike, the ${woman} tailing you lies in a heap on the ground.`);
				V.raped = 0;
				V.rapedThisWeek--;
			} else {
				r.push(`over, but your body has grown a bit too unwieldy as of late, so you find yourself quickly outmaneuvered and held with a knife to your throat.`);
			}
		} else if (isPCCareerInCategory("slaver") || V.PC.skill.warfare >= 45) {
			r.push(`The moment you notice an arm coming around from behind you, your training kicks in.`);
			if (hindranceMod > .5) {
				r.push(`You quickly disarm the assailant and knock them to the floor before placing them in a choke-hold. Once they are subdued, you stand back to decide what to do next.`);
				V.raped = 0;
				V.rapedThisWeek--;
			} else {
				r.push(`You quickly try to disarm your assailant, but find your body has become a bit too ponderous as of late. After a short struggle, it is you that ends up pinned with a knife to the throat.`);
			}
		} else if (isPCCareerInCategory("gang")) {
			r.push(`The moment you hear the sound of the knife unsheathe your reflexes take over.`);
			if (hindranceMod > .3) {
				r.push(`With a single stab, your own shiv is buried in ${his} chest, incapacitating ${him}.`);
				V.raped = 0;
				V.rapedThisWeek--;
			} else {
				r.push(`You try to draw your shiv and stab ${him}, but your body has grown a bit too unwieldy as of late, so you find yourself quickly outmaneuvered and held with a knife to your throat.`);
			}
		} else if (V.PC.height + V.PC.weight >= 320) {
			r.push(`You`);
			if (V.PC.title === 1 || V.PC.skill.combat >= 45) {
				r.push(`swear`);
			} else {
				r.push(`scream`);
			}
			r.push(`as someone leaps on you from behind, throwing you off balance and forcing you to fall backwards directly on top of them. When you finally manage to get back to your feet, you discover that being crushed under your bulk has completely incapacitated your attacker.`);
			V.raped = 0;
			V.rapedThisWeek--;
		} else if (V.PC.skill.combat >= 45 || V.PC.muscles >= 50) {
			r.push(`The moment you feel a hand brush your arm, you`);
			if (hindranceMod <= .7) {
				r.push(`try to turn around to face your attacker but find yourself too heavy and slow to manage to keep up with them. It quickly ends with a knife held to your throat.`);
			} else if (overpowerCheck(rapist, V.PC) >= 30) {
				r.push(`spin around to confront your attacker. ${He} may have a knife, but you aren't about to go down without a fight. It almost feels one-sided as you catch ${him} by the wrist before ${he} can ready ${his} weapon and slam ${him} hard against the wall, incapacitating ${him}.`);
				V.raped = 0;
				V.rapedThisWeek--;
			} else {
				r.push(`spin around to confront your attacker. ${He} may have a knife, but you aren't about to go down without a fight. Despite your efforts, ${he} manages to overpower you and bring the knife to your exposed throat.`);
			}
		} else {
			r.push(`You stifle a`);
			if (V.PC.title === 1 || V.PC.skill.combat >= 45) {
				r.push(`swear`);
			} else {
				r.push(`scream`);
			}
			r.push(`when you feel your arm grabbed and the knife pressed to your throat, knowing that it will only end badly for you in this place.`);
		}
		App.Events.addParagraph(node, r);
		if (V.raped === 1) {
			V.nextButton = "Continue";
			r = [];
			V.fcnn.push("...plans for increased security measures, but refused to answer questions regarding...");
			if (V.PC.vagina >= 0) {
				r.push(Spoken(rapist, `"Well, well, well, look what`));
				if (!canWalk(V.PC)) {
					r.push(`rolled`);
				} else if (V.PC.belly >= 5000 || V.PC.preg >= 20 || V.PC.weight >= 130) {
					r.push(`waddled`);
				} else {
					r.push(`walked`);
				}
				r.push(Spoken(rapist, `into my territory. If it isn't ${V.PC.slaveName}, come to grace me with ${hisP} presence."`));
			} else {
				r.push(Spoken(rapist, `"I've been watching you ever since you first moved in, ${V.PC.slaveName}, waiting for the perfect moment to make you mine. We are going to have a little fun, you and I."`));
			}
			r.push(`The ${woman} binds your hands behind you, all the while keeping the knife to your throat.`);
			r.push(Spoken(rapist, `"Smart keeping your mouth shut; maybe I won't have to hurt you. Heh, I know what you're thinking, that you'll find out who I am and punish me. Don't worry, I made sure to not to leave you any trails to follow${V.PC.visualAge < V.minimumSlaveAge ? ", especially with you being so sinfully delectable" : ""}. Now let's see what we have here."`));

			if (V.PC.vagina >= 0) {
				if (V.PC.butt > 4) {
					r.push(Spoken(rapist, `"God, the way your fat ass is hugging my dick, you were just made to be bent over, weren't you?"`));
					r.push(`${he} states matter-of-factly as ${he} pulls you closer.`);
				}
				r.push(`With ${his} free hand, ${he} begins to explore your vulnerable body.`);
				if (V.PC.weight > 130) {
					r.push(Spoken(rapist, `"Normally I don't go for fatties, but for you, I think I can make an exception,"`));
					r.push(`${he} chides as ${he} grinds against your soft form.`);
				} else if (V.PC.weight > 95) {
					r.push(Spoken(rapist, `"Bit soon to be letting yourself go, isn't it?"`));
					r.push(`${he} chides as ${he} grinds against your soft form.`);
				} else if (V.PC.weight > 30) {
					r.push(Spoken(rapist, `"Nothing wrong with carrying a little extra weight,"`));
					r.push(`${he} teases as ${he} grinds against your soft form.`);
				}
				if (isPCCareerInCategory("wealth")) {
					if (V.PC.boobs >= 300) {
						r.push(Spoken(rapist, `"Nice and supple. How much did you have to pay for these babies?"`));
						r.push(`${he} smirks as ${he} gropes your breasts.`);
					}
					if (V.PC.preg >= 20 || V.PC.belly >= 5000) {
						r.push(Spoken(rapist, `"Couldn't afford an abortion after you took over? How sad,"`));
						r.push(`${he} chuckles as ${he} rubs your pregnant belly.`);
					}
					if (V.PC.dick > 0) {
						r.push(Spoken(rapist, `"Went with the full package didn't you?"`));
						r.push(`${he} mocks as ${he} flicks the tip of your stiffening cock.`);
					}
				} else if (isPCCareerInCategory("capitalist")) {
					if (V.PC.boobs >= 300) {
						r.push(Spoken(rapist, `"Nice and supple. Bet these got you some great deals with guys, didn't they?"`));
						r.push(`${he} smirks as ${he} gropes your breasts.`);
					}
					if (V.PC.preg >= 20 || V.PC.belly >= 5000) {
						r.push(Spoken(rapist, `"Sleeping with guys to close deals? Such a slut,"`));
						r.push(`${he} chuckles as ${he} rubs your pregnant belly.`);
					}
					if (V.PC.dick > 0) {
						r.push(Spoken(rapist, `"Guess you fuck people over in more ways than one, don't you?"`));
						r.push(`${he} mocks as ${he} flicks the tip of your stiffening cock.`);
					}
				} else if (isPCCareerInCategory("mercenary")) {
					if (V.PC.boobs >= 300) {
						r.push(Spoken(rapist, `"So did you ever actually see combat, or did you just spend all your days in the barracks servicing the real soldiers?"`));
						r.push(`${he} smirks as ${he} gropes your breasts.`);
					}
					if (V.PC.preg >= 20 || V.PC.belly >= 5000) {
						r.push(Spoken(rapist, `"Well now I know why you aren't serving still,"`));
						r.push(`${he} chuckles as ${he} rubs your pregnant belly.`);
					}
					if (V.PC.dick > 0) {
						r.push(Spoken(rapist, `"Got a little surgery between missions, eh?"`));
						r.push(`${he} mocks as ${he} flicks the tip of your stiffening cock.`);
					}
				} else if (isPCCareerInCategory("engineer")) {
					if (V.PC.boobs >= 300) {
						r.push(Spoken(rapist, `"Nice and supple. Did the other engineers care about your designs or just your tits?"`));
						r.push(`${he} smirks as ${he} gropes your breasts.`);
					}
					if (V.PC.preg >= 20 || V.PC.belly >= 5000) {
						r.push(Spoken(rapist, `"I can see why your designs were so popular, you fucked your way into the spotlight!"`));
						r.push(`${he} chuckles as ${he} rubs your pregnant belly.`);
					}
					if (V.PC.dick > 0) {
						r.push(Spoken(rapist, `"Well you do know how to erect things, don't you?"`));
						r.push(`${he} mocks as ${he} flicks the tip of your stiffening cock.`);
					}
				} else if (isPCCareerInCategory("medicine")) {
					if (V.PC.boobs >= 300) {
						r.push(Spoken(rapist, `"Nice and supple. Did you implant them yourself?"`));
						r.push(`${he} smirks as ${he} gropes your breasts.`);
					}
					if (V.PC.preg >= 20 || V.PC.belly >= 5000) {
						if (V.PC.dick > 0) {
							r.push(Spoken(rapist, `"Look at that belly! I bet you inseminated yourself with your own seed,"`));
							r.push(`${he} chuckles as ${he} rubs your pregnant belly.`);
						} else {
							r.push(Spoken(rapist, `"I see how you work. Mess up a surgery and give the guy a pity fuck. Surprised you couldn't get their spawn out of your belly though. Guess you aren't that good of a surgeon,"`));
							r.push(`${he} chuckles as ${he} rubs your pregnant belly.`);
						}
					}
					if (V.PC.dick > 0) {
						r.push(Spoken(rapist, `"I'm impressed. Your woman impression is quite good. Did you do the surgery yourself?"`));
						r.push(`${he} mocks as ${he} flicks the tip of your stiffening cock.`);
						r.push(Spoken(rapist, `"Still going to fuck you though."`));
					}
				} else if (isPCCareerInCategory("slaver")) {
					if (V.PC.boobs >= 300) {
						r.push(Spoken(rapist, `"With tits like these, I bet you were the bait used to lure them in,"`));
						r.push(`${he} smirks as ${he} gropes your breasts.`);
					}
					if (V.PC.preg >= 20 || V.PC.belly >= 5000) {
						r.push(Spoken(rapist, `"Did a slave beat me to you?"`));
						r.push(`${he} chuckles as ${he} rubs your pregnant belly.`);
					}
					if (V.PC.dick > 0) {
						r.push(Spoken(rapist, `"Bet you raped a bunch of girls with this, didn't you? Consider what's coming karma,"`));
						r.push(`${he} mocks as ${he} flicks the tip of your stiffening cock.`);
					}
				} else if (isPCCareerInCategory("celebrity")) {
					if (V.PC.boobs >= 300) {
						r.push(Spoken(rapist, `"Nice and supple. I wonder how many guys jacked off to your pictures?"`));
						r.push(`${he} smirks as ${he} gropes your breasts.`);
					}
					if (V.PC.preg >= 20 || V.PC.belly >= 5000) {
						r.push(Spoken(rapist, `"I can see how you got so popular!"`));
						r.push(`${he} chuckles as ${he} rubs your pregnant belly.`);
					}
					if (V.PC.dick > 0) {
						r.push(Spoken(rapist, `"How much tape did it take to hold this guy down?"`));
						r.push(`${he} mocks as ${he} flicks the tip of your stiffening cock.`);
					}
				} else if (isPCCareerInCategory("escort")) {
					if (V.PC.boobs >= 300) {
						r.push(Spoken(rapist, `"Nice and soft. How many dicks have been between these babies?"`));
						r.push(`${he} smirks as ${he} gropes your breasts.`);
					}
					if (V.PC.preg >= 20 || V.PC.belly >= 5000) {
						r.push(Spoken(rapist, `"What kind of whore doesn't know about protection?"`));
						r.push(`${he} chuckles as ${he} rubs your pregnant belly.`);
					}
					if (V.PC.dick > 0) {
						r.push(Spoken(rapist, `"So, did you ever get to use this when you were a prostitute?"`));
						r.push(`${he} mocks as ${he} flicks the tip of your stiffening cock.`);
					}
				} else if (isPCCareerInCategory("gang")) {
					if (V.PC.boobs >= 300) {
						r.push(Spoken(rapist, `"I bet I'm not the first person to do this to you, am I?"`));
						r.push(`${he} smirks as ${he} gropes your breasts.`);
					}
					if (V.PC.preg >= 20 || V.PC.belly >= 5000) {
						r.push(Spoken(rapist, `"Ah, now I get it. Your role in the gang was to lie on your back and take dick all day, wasn't it?"`));
						r.push(`${he} chuckles as ${he} rubs your pregnant belly.`);
					}
					if (V.PC.dick > 0) {
						r.push(Spoken(rapist, `"Fuck or be fucked world; today, it's gonna be you,"`));
						r.push(`${he} mocks as ${he} flicks the tip of your stiffening cock.`);
					}
				} else if (isPCCareerInCategory("servant")) {
					if (V.PC.boobs >= 300) {
						r.push(Spoken(rapist, `"Nice and supple. Bet your Master spent a fortune making these so nice,"`));
						r.push(`${he} smirks as ${he} gropes your breasts.`);
					}
					if (V.PC.preg >= 20 || V.PC.belly >= 5000) {
						r.push(Spoken(rapist, `"Holding on to your Master's final gift are you?"`));
						r.push(`${he} chuckles as ${he} rubs your pregnant belly.`);
					}
					if (V.PC.dick > 0) {
						r.push(Spoken(rapist, `"When your Master first undressed you, what did he think of his 'girl'?"`));
						r.push(`${he} mocks as ${he} flicks the tip of your stiffening cock.`);
					}
				} else if (isPCCareerInCategory("BlackHat")) {
					if (V.PC.boobs >= 300) {
						r.push(Spoken(rapist, `"Nice and supple. What are the odds that I can find these babies on the internet?"`));
						r.push(`${he} smirks as ${he} gropes your breasts.`);
					}
					if (V.PC.preg >= 20 || V.PC.belly >= 5000) {
						r.push(Spoken(rapist, `"You'd think someone so skilled at breaking security would understand protection themselves. Or did you trade your pussy for information?"`));
						r.push(`${he} chuckles as ${he} rubs your pregnant belly.`);
					}
					if (V.PC.dick > 0) {
						r.push(Spoken(rapist, `"Trying to catch a signal with that?"`));
						r.push(`${he} mocks as ${he} flicks the tip of your stiffening cock.`);
					}
				}
				r.push(`Finally ${he} reaches your moistening pussy.`);
				r.push(Spoken(rapist, `"Already wet are we? Glad you know your place,"`));
				r.push(`${he} states as ${he} pulls your clothes off and bends you over.`);
				if (V.PC.vagina === 0) {
					r.push(Spoken(rapist, `"And you still have your innocence, how delightful!"`));
				}
				App.Events.addParagraph(node, r);
				r = [];
				r.push(`You can feel the head of ${his} cock teasing your`);
				if (V.PC.vagina === 0) {
					r.push(`virgin pussy; you grit your teeth knowing what will come next. Without mercy, ${he} <span class="red">tears through your hymen</span> and forces ${himself} as deep as your tight pussy lets him. You choke back a sob as ${he} struggles to hilt ${himself} in you. ${He} must have undergone surgery or something because there is no way your body can handle such a monster. You're in agony already - you can't fathom what will happen when ${he} loses ${his} patience.`);
				} else {
					r.push(`pussy lips; you hope it feels bigger than it really is. As ${he} struggles to force it into you, you regret thinking about it. ${He} must have undergone surgery or something because ${he} fills you completely. You feel weak just from ${him} sticking it in, you can't fathom what will happen once ${he} starts thrusting.`);
				}
				r.push(`You soon find out as ${he} wastes no time starting slow. ${He} violently rams ${his} oversized cock deep into you, threatening to penetrate your cervix with each thrust. ${He} quickens ${his} pace, fucking you like a beast.`);
				if (V.PC.preg < 1) {
					if (random(1, 100) > 60) {
						r.push(`His hand rises to your lips and forces something into your mouth.`);
						r.push(Spoken(rapist, `"Swallow it."`));
						r.push(`You obey, hoping to just get this over with.`);
						V.PC.forcedFertDrugs += 3;
					}
					r.push(`With one final thrust, ${he} forces through your battered cervix and unloads in the depths of your`);
					if (canGetPregnant(V.PC)) {
						r.push(`fertile`);
					}
					r.push(`womb.`);
				} else {
					r.push(`With one final thrust, ${he} forces it in as deep as ${he} can into you and blows ${his} seed deep in your aching cunt.`);
				}
				if (V.PC.preg >= 20 || V.PC.belly >= 5000) {
					r.push(Spoken(rapist, `"Now your ${(V.PC.pregType > 1) ? `children` : `child`} will know what a real man's sperm is like!"`));
				}
				r.push(`${He} shoves you to the ground, your pussy gaping from the size of ${his} shaft and leaking ${his} huge load all over yourself. By the time you loosen your bindings, ${he} is long gone.`);
				App.Events.addParagraph(node, r);
				r = [];
				r.push(`It would be prudent to up security in your arcology. That or take a guard along when you leave the penthouse. Such a thing, happening to you. You can't allow such an indignity to happen again,`);
				if (V.PC.vagina === 0) {
					r.push(`not that you'll ever get your first time back,`);
				} else {
					r.push(`you think to yourself,`);
				}
				r.push(`as you try to coax ${his} sperm from your abused pussy.`);
				if (canGetPregnant(V.PC)) {
					r.push(`For some reason your body feels really satisfied, despite`);
					if (V.PC.vagina === 0) {
						r.push(`what transpired...`);
					} else {
						r.push(`not climaxing...`);
					}
					r.push(`Is this what it feels like to be bred by someone so dominant? You should take a pregnancy test right away and make sure ${he} didn't knock you up.`);
					knockMeUp(V.PC, 100, 0, -10);
				}
				if (V.PC.vagina === 0) {
					V.PC.vagina++;
				}
				App.Events.addParagraph(node, r);
			} else {
				if (V.PC.weight > 95) {
					r.push(Spoken(rapist, `"I don't mind a little weight, so long as it doesn't get in the way. And even if it did, it won't stop me."`));
					r.push(`${he} chuckles as ${he} embraces your soft form.`);
				}
				r.push(`With ${his} free hand, ${he} begins to explore your bound body.`);
				if (V.PC.preg >= 20 || V.PC.belly >= 5000) {
					r.push(Spoken(rapist, `"Can't say I've ever had sex with a pregnant ${womanP} before... I'll figure it out, don't you worry!"`));
					r.push(`${he} teases as ${he} rubs your pregnant belly.`);
					r.push(Spoken(rapist, `"I won't be far behind you..."`));
					r.push(`${he} thinks out loud, much to your chagrin.`);
				}
				if (isPCCareerInCategory("wealth")) {
					if (V.PC.boobs >= 300) {
						r.push(Spoken(rapist, `"Spared no expenses for these babies, did you?"`));
						r.push(`${he} smirks as ${he} gropes your breasts.`);
					}
					r.push(`${He} slips ${his} hand down your pants.`);
					r.push(Spoken(rapist, `"Now there's the money maker!"`));
					if (V.PC.balls >= 9) {
						r.push(`It's impossible to hide the two firm globes beneath your dick, so you can only wince as ${he} reaches a little lower.`);
						r.push(Spoken(rapist, `"And apparently the bank too!"`));
						r.push(`${He} ${say}s excitedly, rubbing your sizeable balls while licking ${his} lips.`);
					} else if (V.PC.balls >= 5) {
						r.push(`${He} no doubt noticed your bulge as ${he} reaches a little lower.`);
						r.push(Spoken(rapist, `"And loaded in the virility department too!"`));
						r.push(`${He} ${say}s, licking ${his} lips lustfully while cupping your balls.`);
					}
				} else if (isPCCareerInCategory("capitalist")) {
					if (V.PC.boobs >= 300) {
						r.push(Spoken(rapist, `"Ever wonder if they were listening to you or just ogling the man with the breasts?"`));
						r.push(`${he} smirks as ${he} gropes your breasts.`);
					}
					r.push(`${He} slips ${his} hand down your pants.`);
					r.push(Spoken(rapist, `"Now that explains how you were so successful!"`));
					if (V.PC.balls >= 9) {
						r.push(`It's impossible to hide the two firm globes beneath your dick, so you can only wince as ${he} reaches a little lower.`);
						r.push(Spoken(rapist, `"And you're positively loaded!"`));
						r.push(`${He} ${say}s excitedly, rubbing your sizeable balls while licking ${his} lips.`);
					} else if (V.PC.balls >= 5) {
						r.push(`${He} no doubt noticed your bulge as ${he} reaches a little lower.`);
						r.push(Spoken(rapist, `"And you've got a nice investment for me too!"`));
						r.push(`${He} ${say}s, licking ${his} lips lustfully while cupping your balls.`);
					}
				} else if (isPCCareerInCategory("mercenary")) {
					if (V.PC.boobs >= 300) {
						r.push(Spoken(rapist, `"Must have been pretty tight in your body armor, huh?"`));
						r.push(`${he} smirks as ${he} gropes your breasts.`);
					}
					r.push(`${He} slips ${his} hand down your pants.`);
					r.push(Spoken(rapist, `"I guess they do let you keep your rifle!"`));
					if (V.PC.balls >= 9) {
						r.push(`It's impossible to hide the two firm globes beneath your dick, so you can only wince as ${he} reaches a little lower.`);
						r.push(Spoken(rapist, `"I'd have been worried lugging these into combat, but I'm so glad you made it through unscathed!"`));
						r.push(`${He} ${say}s excitedly, rubbing your sizeable balls while licking ${his} lips.`);
					} else if (V.PC.balls >= 5) {
						r.push(`${He} no doubt noticed your bulge as ${he} reaches a little lower.`);
						r.push(Spoken(rapist, `"Glad to see these made it through unharmed!"`));
						r.push(`${He} ${say}s, licking ${his} lips lustfully while cupping your balls.`);
					}
				} else if (isPCCareerInCategory("engineer")) {
					if (V.PC.boobs >= 300) {
						r.push(Spoken(rapist, `"How did you get any work done with these hanging over your designs?"`));
						r.push(`${he} smirks as ${he} gropes your breasts.`);
					}
					r.push(`${He} slips ${his} hand down your pants.`);
					r.push(Spoken(rapist, `"I see what kind of tools you like. Big and strong!"`));
					if (V.PC.balls >= 9) {
						r.push(`It's impossible to hide the two firm globes beneath your dick, so you can only wince as ${he} reaches a little lower.`);
						r.push(Spoken(rapist, `"Oh my! I must have been tight squeezed into your work attire! I hope I can handle such a large-scale construction job!"`));
						r.push(`${He} ${say}s excitedly, rubbing your sizeable balls while licking ${his} lips.`);
					} else if (V.PC.balls >= 5) {
						r.push(`${He} no doubt noticed your bulge as ${he} reaches a little lower.`);
						r.push(Spoken(rapist, `"Ah! It looks like you have a nice construction crew all ready for me!"`));
						r.push(`${He} ${say}s, licking ${his} lips lustfully while cupping your balls.`);
					}
				} else if (isPCCareerInCategory("medicine")) {
					if (V.PC.boobs >= 300) {
						r.push(Spoken(rapist, `"I'm sure you had quite the number of clients after a pair of these,"`));
						r.push(`${he} smirks as ${he} gropes your breasts.`);
					}
					r.push(`${He} slips ${his} hand down your pants.`);
					r.push(Spoken(rapist, `"Huh, I wonder if that's real..."`));
					if (V.PC.balls >= 9) {
						r.push(`It's impossible to hide the two firm globes beneath your dick, so you can only wince as ${he} reaches a little lower.`);
						r.push(Spoken(rapist, `"Hitting the experimental drugs a little, are we? Let me help you with your research!"`));
						r.push(`${He} ${say}s excitedly, rubbing your sizeable balls while licking ${his} lips.`);
					} else if (V.PC.balls >= 5) {
						r.push(`${He} no doubt noticed your bulge as ${he} reaches a little lower.`);
						r.push(Spoken(rapist, `"Heh, access to such lovely virility aids did wonders for you and I."`));
						r.push(`${He} ${say}s, licking ${his} lips lustfully while cupping your balls.`);
					}
				} else if (isPCCareerInCategory("slaver")) {
					if (V.PC.boobs >= 300) {
						r.push(Spoken(rapist, `"A lovely pair of deployable distractions,"`));
						r.push(`${he} smirks as ${he} gropes your breasts.`);
					}
					r.push(`${He} slips ${his} hand down your pants.`);
					r.push(Spoken(rapist, `"Did you have a nickname for him? Like 'the discipliner' or something?"`));
					if (V.PC.balls >= 9) {
						r.push(`It's impossible to hide the two firm globes beneath your dick, so you can only wince as ${he} reaches a little lower.`);
						r.push(Spoken(rapist, `"Pump me full, like all those fresh captures you broke in!"`));
						r.push(`${He} ${say}s excitedly, rubbing your sizeable balls while licking ${his} lips.`);
					} else if (V.PC.balls >= 5) {
						r.push(`${He} no doubt noticed your bulge as ${he} reaches a little lower.`);
						r.push(Spoken(rapist, `"I wonder how many slaves you had to empty these bad boys out into."`));
						r.push(`${He} ${say}s, licking ${his} lips lustfully while cupping your balls.`);
					}
				} else if (isPCCareerInCategory("celebrity")) {
					if (V.PC.boobs >= 300) {
						r.push(Spoken(rapist, `"Nice and supple. Just like I'd expect from a man sporting tits."`));
						r.push(`${he} smirks as ${he} gropes your breasts.`);
					}
					r.push(`${He} slips ${his} hand down your pants;`);
					r.push(Spoken(rapist, `"Oh, now those tabloids make sense."`));
					if (V.PC.balls >= 9) {
						r.push(`It's impossible to hide the two firm globes beneath your dick, so you can only wince as ${he} reaches a little lower.`);
						r.push(Spoken(rapist, `"You certainly stole the show, no matter what you wore!"`));
						r.push(`${He} ${say}s excitedly, rubbing your sizeable balls while licking ${his} lips.`);
					} else if (V.PC.balls >= 5) {
						r.push(`${He} no doubt noticed your bulge as ${he} reaches a little lower.`);
						r.push(Spoken(rapist, `"Heh, I always loved the sight of these in your fine clothes."`));
						r.push(`${He} ${say}s, licking ${his} lips lustfully while cupping your balls.`);
					}
				} else if (isPCCareerInCategory("escort")) {
					if (V.PC.boobs >= 300) {
						r.push(Spoken(rapist, `"With these hanging out, how many men tried to pick you up?"`));
						r.push(`${he} smirks as ${he} gropes your breasts.`);
					}
					r.push(`${He} slips ${his} hand down your pants.`);
					r.push(Spoken(rapist, `"Now there's the money maker!"`));
					if (V.PC.balls >= 9) {
						r.push(`It's impossible to hide the two firm globes beneath your dick, so you can only wince as ${he} reaches a little lower.`);
						r.push(Spoken(rapist, `"I bet these made you quite popular with those little sluts looking to get knocked up! Can't wait to join them!"`));
						r.push(`${He} ${say}s excitedly, rubbing your sizeable balls while licking ${his} lips.`);
					} else if (V.PC.balls >= 5) {
						r.push(`${He} no doubt noticed your bulge as ${he} reaches a little lower.`);
						r.push(Spoken(rapist, `"And his two fine friends as well!"`));
						r.push(`${He} ${say}s, licking ${his} lips lustfully while cupping your balls.`);
					}
				} else if (isPCCareerInCategory("gang")) {
					if (V.PC.boobs >= 300) {
						r.push(Spoken(rapist, `"You're a lot less threatening with these,"`));
						r.push(`${he} smirks as ${he} gropes your breasts.`);
					}
					r.push(`${He} slips ${his} hand down your pants.`);
					r.push(Spoken(rapist, `"I bet he's seen a lot of action, hasn't he?"`));
					if (V.PC.balls >= 9) {
						r.push(`It's impossible to hide the two firm globes beneath your dick, so you can only wince as ${he} reaches a little lower.`);
						r.push(Spoken(rapist, `"I'd have been worried, carrying around jewels like these. Glad they're healthy and soon to be very happy!"`));
						r.push(`${He} ${say}s excitedly, rubbing your sizeable balls while licking ${his} lips.`);
					} else if (V.PC.balls >= 5) {
						r.push(`${He} no doubt noticed your bulge as ${he} reaches a little lower.`);
						r.push(Spoken(rapist, `"Your coin purse is looking a little heavy. How bout I help you empty it?"`));
						r.push(`${He} ${say}s, licking ${his} lips lustfully while cupping your balls.`);
					}
				} else if (isPCCareerInCategory("servant")) {
					if (V.PC.boobs >= 300) {
						r.push(Spoken(rapist, `"Did your Master even ask before he stuck you with these?"`));
						r.push(`${he} smirks as ${he} gropes your breasts.`);
					}
					r.push(`${He} slips ${his} hand down your pants.`);
					if (V.PC.dick >= 3) {
						r.push(Spoken(rapist, `"Now that's surprising. I expected something smaller."`));
					} else {
						r.push(Spoken(rapist, `"Can't say I'm surprised. Wouldn't want another rooster in the henhouse after all."`));
					}
					if (V.PC.balls >= 9) {
						r.push(`It's impossible to hide the two firm globes beneath your dick, so you can only wince as ${he} reaches a little lower.`);
						r.push(Spoken(rapist, `"Did not expect them to be so... profound. Compensating for all the years you weren't allowed to use them?"`));
						r.push(`${He} ${say}s excitedly, rubbing your sizeable balls while licking ${his} lips.`);
					} else if (V.PC.balls >= 5) {
						r.push(`${He} no doubt noticed your bulge as ${he} reaches a little lower.`);
						r.push(Spoken(rapist, `"And then there's these! Such lovely baby makers!"`));
						r.push(`${He} ${say}s, licking ${his} lips lustfully while cupping your balls.`);
					}
				} else if (isPCCareerInCategory("BlackHat")) {
					if (V.PC.boobs >= 300) {
						r.push(Spoken(rapist, `"Nice and supple. What are the odds that I can find these babies on the internet?"`));
						r.push(`${he} smirks as ${he} gropes your breasts.`);
					}
					r.push(`${He} slips ${his} hand down your pants.`);
					r.push(Spoken(rapist, `"You wouldn't mind if I download a few files now would you? Well, not that it matters."`));
					if (V.PC.balls >= 9) {
						r.push(`It's impossible to hide the two firm globes beneath your dick, so you can only wince as ${he} reaches a little lower.`);
						r.push(Spoken(rapist, `"You really should dig a little deeper into the drugs you find online, not that I'm complaining!"`));
						r.push(`${He} ${say}s excitedly, rubbing your sizeable balls while licking ${his} lips.`);
					} else if (V.PC.balls >= 5) {
						r.push(`${He} no doubt noticed your bulge as ${he} reaches a little lower.`);
						r.push(Spoken(rapist, `"I bet you're proud of these, with as many as you've seen out there."`));
						r.push(`${He} ${say}s, licking ${his} lips lustfully while cupping your balls.`);
					}
				}
				r.push(`Satisfied, ${he} pulls your cock out of its increasingly cramped confines.`);
				r.push(Spoken(rapist, `"Look at him grow, he knows what comes next..."`));
				r.push(`${He} teases as ${he} pushes you to the ground and climbs on top of you.`);
				App.Events.addParagraph(node, r);
				r = [];
				r.push(`${He} lines ${himself} up with the tip of your dick before taking its entire length into ${himself}. ${He} lets out a lust-filled moan as ${he} begins to bounce on your traitorous member. You can do nothing to stop ${him} from riding you to climax, so you just enjoy the sight of ${his} breasts bouncing to ${his} pace. As you feel your orgasm approaching, you try to time it so you can slip out of ${him} just before you blow your load, but you have no such luck.`);
				r.push(Spoken(rapist, `"You really think I'd let you spoil my plans?"`));
				r.push(`${he} asks as ${he} grinds against you, making sure you cum deep in ${his} pussy. ${He} leans back and massages ${his}`);
				if (V.PC.balls >= 20) {
					r.push(`taut`);
				}
				r.push(`stomach, savoring the sensation of your seed seeping into ${him}.`);
				r.push(Spoken(rapist, `"That's it, make me a mommy."`));
				r.push(`${He} leans in close and you pop free of ${his} snatch.`);
				r.push(Spoken(rapist, `"Be a good ${girlP} and make this arcology a nice place for your bastard. I want to retire in luxury."`));
				r.push(`${He} blows you a kiss as ${he} stuffs a plug up ${his} vagina, redresses and heads on ${his} way. By the time you loosen your bindings, ${he} is long gone.`);
				App.Events.addParagraph(node, r);
				r = [];
				r.push(`It would be prudent to up security in your arcology, that or take a guard along when you leave the penthouse. You can't allow such an indignity to happen again, nor do you need the stress of a bastard trying to seize control of your estate when you want to retire, but you wouldn't mind having your way with ${him} if you get the chance.`);
				App.Events.addParagraph(node, r);
			}
		} else {
			App.UI.DOM.appendNewElement("div", node, `Now the only question is what to do with the would-be rapist. You could toss them out of the arcology, but it might be more fun to turn the tables on ${him}.`);
			App.UI.DOM.appendNewElement("div", node, `Applying enslavement as punishment will cost ${cashFormat(contractCost)}. Doing so and then selling ${him} immediately will bring in approximately ${cashFormat(slaveCost(rapist) - contractCost)}.`, ["note"]);

			node.append(App.Desc.longSlave(rapist, {market: "generic"}));
			const choices = [];
			if (V.cash >= contractCost) {
				choices.push(new App.Events.Result(`Enslave ${him}`, enslave));
				choices.push(new App.Events.Result(`Sentence ${him} to a day in the stocks, then enslave ${him}`, stocks));
				if (V.arcade > 0) {
					choices.push(new App.Events.Result(`Enslave ${him} and sentence ${him} to a month in the arcade`, arcade));
				}
				if (V.dairy > 0 && V.dairyRestraintsSetting > 1) {
					choices.push(new App.Events.Result(`Enslave ${him} and send ${him} straight to the industrial dairy`, dairy));
				}
				if (V.farmyard > 0) {
					choices.push(new App.Events.Result(`Enslave ${him} and send ${him} straight to the farmyard`, farmyard));
				}
				if (V.seeExtreme > 0) {
					choices.push(new App.Events.Result(`Punitively amputate ${his} limbs, and then enslave ${him}`, amputate));
				}
			} else {
				choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}.`));
			}
			choices.push(new App.Events.Result(`Publicly flog the criminal`, flog));
			App.Events.addResponses(node, choices);
		}

		function enslave() {
			V.nextButton = "Continue";
			const el = new DocumentFragment();
			cashX(forceNeg(contractCost), "slaveTransfer", rapist);
			generatePronouns(rapist);
			el.append(`You complete the legalities and biometric scanning quickly and without fuss. The idiot will regret crossing you when ${he} wakes in the penthouse for basic slave induction.`);
			el.append(App.UI.newSlaveIntro(rapist));
			return el;
		}

		function stocks() {
			V.nextButton = "Continue";
			const el = new DocumentFragment();
			const r = [];
			generatePronouns(rapist);
			healthDamage(rapist, 10);
			rapist.behavioralFlaw = "odd";
			rapist.sexualFlaw = "hates penetration";
			rapist.anus = 2;
			seX(rapist, "oral", "public", "penetrative", 23);
			seX(rapist, "anal", "public", "penetrative", 12);
			if (rapist.vagina > -1) {
				rapist.vagina = 2;
				seX(rapist, "vaginal", "public", "penetrative", 12);
				if (random(1, 100) > 60 && isFertile(rapist)) {
					knockMeUp(rapist, 100, 0, -2);
				}
			} else {
				seX(rapist, "anal", "public", "penetrative", 12);/* even more anal */
			}
			cashX(forceNeg(contractCost), "slaveTransfer", rapist);

			r.push(`You declare ${his} holes fair game for the entire arcology. ${He} spends a torturous day in the stocks before being hauled in for enslavement, somewhat <span class="health dec">the worse for wear</span> and <span class="red">acting oddly</span> due to ${his} ordeal, bruises all over ${his} body, cum leaking from ${his} <span class="lime">loosened</span> anus${(rapist.vagina > -1) ? ` and <span class="lime">fucked-out</span> pussy` : ``}. The public <span class="green">enjoys the fun.</span>`);
			repX(500, "event");
			V.arcologies[0].prosperity += 2;
			r.push(App.UI.newSlaveIntro(rapist));
			App.Events.addParagraph(el, r);
			return el;
		}

		function arcade() {
			V.nextButton = "Continue";
			generatePronouns(rapist);
			assignJob(rapist, "be confined in the arcade");
			rapist.sentence = 4;
			cashX(forceNeg(contractCost), "slaveTransfer", rapist);
			newSlave(rapist);/* skip New Slave Intro */
			return `You complete the legalities and biometric scanning quickly and cautiously. The idiot will be in for a surprise when ${he} awakes to find ${he} can't move and a dick is in ${his} ass.`;
		}

		function dairy() {
			V.nextButton = "Continue";
			const el = new DocumentFragment();
			const r = [];
			generatePronouns(rapist);
			assignJob(rapist, "work in the dairy");
			cashX(forceNeg(contractCost), "slaveTransfer", rapist);
			r.push(`You complete the legalities and biometric scanning quickly and cautiously. The idiot will wake up`);
			if (V.dairyStimulatorsSetting > 1) {
				r.push(`in agony as ${his} anus takes the rectal hydration dildo.`);
			} else {
				r.push(`to find ${his} chest has begun swelling with milk.`);
			}
			rapist.boobs += 300;
			newSlave(rapist); /* skip New Slave Intro */
			App.Events.addNode(el, r);
			return el;
		}

		function farmyard() {
			V.nextButton = "Continue";
			const el = new DocumentFragment();
			const actions = [`${V.seeBestiality ? 'getting fucked by' : 'putting on shows with'} animals`];
			if (V.farmyardShows < 2) {
				actions.push(`working the fields`);
			}
			const r = [];
			generatePronouns(rapist);
			assignJob(rapist, "work as a farmhand");
			cashX(forceNeg(contractCost), "slaveTransfer", rapist);
			r.push(`You complete the legalities and biometric scanning quickly and cautiously. The idiot will wake up in ${V.farmyardName}, where ${he} will spend the rest of ${his} days ${toSentence(actions)}.`);
			newSlave(rapist);/* skip New Slave Intro */
			App.Events.addNode(el, r);
			return el;
		}

		function amputate() {
			V.nextButton = "Continue";
			const el = new DocumentFragment();
			const r = [];
			generatePronouns(rapist);
			healthDamage(rapist, 20);
			removeLimbs(rapist, "all");
			rapist.behavioralFlaw = "odd";
			cashX(forceNeg(contractCost), "slaveTransfer", rapist);
			r.push(`You want ${him} to suffer for what ${he} tried to pull on you. You make sure ${he} is fully awake as ${he} is strapped into the autosurgery. You take great pleasure in watching ${him} struggle as ${his} limbs are taken, one by one. Of course, <span class="health dec">${his} health is affected</span> and the horrible experience has left ${him} <span class="red">acting oddly.</span> After ${he} has stabilized, it's off to the penthouse for basic slave induction. You'd like to see ${him} try and touch you again without arms and legs.`);
			if (rapist.balls > 0) {
				const geld = function() {
					const el = new DocumentFragment();
					const r = [];
					healthDamage(rapist, 20);
					rapist.balls = 0;
					rapist.devotion -= 25;
					rapist.trust -= 25;
					cashX(forceNeg(contractCost), "slaveTransfer", rapist);
					r.push(`You want ${him} to suffer for what ${he} tried to pull on you. You make sure ${he} is fully awake as ${he} is strapped into the autosurgery, taking the time to roughly fondle ${his} balls. You take great pleasure in watching ${him} struggle as ${his} testicles are removed. Once ${he} can stand again, it's off to the penthouse for basic slave induction.`);
					r.push(App.UI.newSlaveIntro(rapist));
					App.Events.addNode(el, r);
					return el;
				};
				App.Events.addResponses(el, [new App.Events.Result(`Enslave the criminal and geld ${him}`, geld)]);
			}
			App.Events.addNode(el, r);
			return el;
		}

		function flog() {
			V.nextButton = "Continue";
			const el = new DocumentFragment();
			const r = [];
			r.push(`Naturally, the wretch will be thrown out of the arcology, but an example must first be made. Free people must understand that criminals who commit outrages against them will be severely punished. The protesting malefactor is stripped and flogged on the promenade before being escorted bleeding from the arcology. The public <span class="green">approves of this harshness.</span>`);
			repX(500, "event");
			App.Events.addNode(el, r);
			return el;
		}
	}
};
