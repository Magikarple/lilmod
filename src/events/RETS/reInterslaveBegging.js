// cSpell:ignore pregsluts, Pleeease

App.Events.RETSInterslaveBegging = class RETSInterslaveBegging extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.universalRulesConsent === 1,
		];
	}

	actorPrerequisites() {
		return [
			[ // event slave /domslave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canStand,
				canTalk,
				canHear,
				canSee,
				s => s.devotion > 20,
				s => s.energy > 40,
				s => ((canDoVaginal(s) && s.vagina !== 0) || (canDoAnal(s) && s.anus !== 0)),
				canPenetrate,
				canSee,
				s => s.rules.release.slaves === 1,
			],
			[ // and subslave
				s => s.fetish !== Fetish.MINDBROKEN,
				canWalk,
				canTalk,
				canHear,
				isSlaveAvailable,
				s => s.devotion > 20,
				s => s.energy > 40,
				s => ((canDoVaginal(s) && s.vagina !== 0) || (canDoAnal(s) && s.anus !== 0)),
				s => s.rules.release.slaves === 1,
				s => s.assignment !== Job.CONCUBINE,
			]
		];
	}

	execute(node) {
		const [eventSlave, subSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {say, title: master} = getEnunciation(eventSlave);
		const {
			He2, he2, His2, his2, him2, girl2, himself2
		} = getPronouns(subSlave).appendSuffix("2");
		const {say: say2, title: master2} = getEnunciation(subSlave);
		const {
			girlP
		} = getPronouns(V.PC).appendSuffix("P");

		App.Events.drawEventArt(node, [eventSlave, subSlave], "no clothing");
		const vaginal = canDoVaginal(subSlave) && subSlave.vagina > 0;

		let t = [];

		t.push(`Passing the slave quarters late at night, you hear`);
		t.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), "'s"));
		if (eventSlave.voice > 2) {
			t.push(`girly voice raised in`);
		} else if (eventSlave.voice > 1) {
			t.push(`feminine voice raised in`);
		} else {
			t.push(`deep voice raised in`);
		}
		if (eventSlave.trust <= 20 || (eventSlave.fetish === Fetish.SUBMISSIVE && eventSlave.fetishKnown)) {
			t.push(`${his} usual begging tones. ${He}'s`);
			if (eventSlave.fetish === Fetish.SUBMISSIVE && eventSlave.fetishKnown) {
				t.push(`a shameless little slut of a sub, and`);
			} else {
				t.push(`got a lot to be afraid of, as a sex slave, so`);
			}
			t.push(`getting down on ${his} metaphorical knees is an hourly occurrence for ${him}.`);
			if (hasAnyLegs(eventSlave)) {
				t.push(`(Not that ${he} doesn't get down on ${his} actual`);
				if (hasBothLegs(eventSlave)) {
					t.push(`knees, too.)`);
				} else {
					t.push("knee, too.)");
				}
			}
		} else {
			t.push(`begging tones that are unusual for ${him}.`);
		}
		t.push(Spoken(eventSlave, `"Pleeease let me fuck ${vaginal ? "you," : "your butt,"}"`));
		t.push(`${he} whines.`);

		App.Events.addParagraph(node, t);
		t = [];

		t.push(Spoken(subSlave, `"I'm tired,"`));
		t.push(`says`);
		if (eventSlave.voice > subSlave.voice) {
			t.push(`another, lower,`);
		} else if (eventSlave.voice < subSlave.voice) {
			t.push(`another, higher,`);
		} else {
			if (subSlave.voice > 2) {
				t.push(`a high-pitched`);
			} else if (subSlave.voice > 1) {
				t.push(`a soft`);
			} else {
				t.push(`a harsh`);
			}
		}
		t.push(`voice. It's`);
		t.push(App.UI.DOM.combineNodes(contextualIntro(eventSlave, subSlave, true), `.`));
		if (subSlave.belly >= 120000 && eventSlave.dick > 3) {
			if (subSlave.bellyPreg >= 2000) {
				t.push(Spoken(subSlave, `"I'm way too pregnant; there's just no room for a big cock like yours inside me anymore. Plus you'll wake them up and they'll be kicking all night again."`));
			} else if (subSlave.bellyImplant >= 2000) {
				t.push(Spoken(subSlave, `"My belly's so filled by my implant that there's just no room for a big cock like yours inside me anymore."`));
			}
		} else if (subSlave.bellyFluid >= 10000 && eventSlave.dick > 3) {
			t.push(Spoken(subSlave, `"I'm really full of ${subSlave.inflationType}. I don't know what will happen if you fuck me."`));
		} else if (subSlave.preg > subSlave.pregData.normalBirth/1.33 && eventSlave.dick > 3) {
			t.push(Spoken(subSlave, `"I'm really pregnant, and it's getting uncomfortable to take a big cock like yours."`));
		} else if (subSlave.assignment === Job.BROTHEL || subSlave.assignment === Job.WHORE) {
			t.push(Spoken(subSlave, `"And my ${vaginal ? "pussy" : "ass"} is sore. Customers ${vaginal ? "fucked me" : "pounded it"} all day."`));
		} else if (subSlave.assignment === Job.CLUB || subSlave.assignment === Job.PUBLIC) {
			t.push(Spoken(subSlave, `"And my ${vaginal ? "pussy" : "ass"} is sore. Citizens ${vaginal ? "fucked me" : "pounded it"} all day."`));
		} else {
			t.push(Spoken(subSlave, `"I'm tired, and I have to ${subSlave.assignment !== Job.CHOICE ? subSlave.assignment : "work"} tomorrow. I just want to go to sleep."`));
		}
		t.push(`${His2} objections sound a bit feigned, and ${he2}'s obviously in no hurry to put an end to`);
		if (areRelated(eventSlave, subSlave)) {
			t.push(`the unmatched perversion of having ${his2} own ${relativeTerm(subSlave, eventSlave)} beg ${him2} for sex.`);
		} else if (eventSlave.assignment === Job.HEADGIRL) {
			t.push(`listening to the Head Girl beg to be allowed to put ${his} cock inside ${him2}. Usually, it's ${eventSlave.slaveName} giving the orders.`);
		} else if (eventSlave.fetishKnown && (eventSlave.fetish === "dom" || eventSlave.fetish === "sadist")) {
			t.push(`having a dominant ${SlaveTitle(eventSlave)} like ${eventSlave.slaveName} beg ${him2} for sex.`);
		} else if (eventSlave.face > 40) {
			t.push(`having a`);
			if (eventSlave.face > 95) {
				t.push(`perfect`);
			} else {
				t.push(`really very pretty`);
			}
			t.push(`${SlaveTitle(eventSlave)} beg ${him2} for sex.`);
		} else {
			t.push(`having somebody beg ${him2} for sex. ${He2}'s a sex slave, and ${he2} doesn't always have the luxury of feeling so wanted.`);
		}
		App.Events.addParagraph(node, t);
		t = [];

		const subBelly = bellyAdjective(subSlave);
		t.push(`The slaves are about to go to bed; they're naked, and the horny ${eventSlave.slaveName}'s`);
		if (eventSlave.dick > 5) {
			t.push(`enormous erection is pointed threateningly`);
		} else if (eventSlave.dick > 2) {
			t.push(`stiff dick is pointed straight`);
		} else {
			t.push(`pathetic dick is pointed right`);
		}
		t.push(`at ${subSlave.slaveName}'s ${subBelly} midsection. Desperate, ${eventSlave.slaveName} decides to try praise instead.`);
		let lewd = false;
		if (vaginal && subSlave.labia > 0) {
			t.push(Spoken(eventSlave, `"You've got such a beautiful pussy though,"`));
			t.push(`${he} wheedles.`);
			t.push(Spoken(eventSlave, `"It's gorgeous. Those lips look so soft and inviting!"`));
			t.push(`It's true; ${subSlave.slaveName}'s generous petals are a bit engorged.`);
			lewd = true;
		} else if (vaginal && subSlave.vaginaLube > 0) {
			t.push(Spoken(eventSlave, `"You've got such a naughty pussy though,"`));
			t.push(`${he} wheedles.`);
			t.push(Spoken(eventSlave, `"It's so hot. Look, it's all wet and ready!"`));
			t.push(`It's true; ${subSlave.slaveName}'s invariably moist pussy is visibly glistening.`);
			lewd = true;
		} else if (!vaginal && subSlave.analArea > 2) {
			t.push(Spoken(eventSlave, `"You've got such an asspussy though,"`));
			t.push(`${he} wheedles.`);
			t.push(Spoken(eventSlave, `"That naughty hole is calling to me!"`));
			t.push(`It's true; ${subSlave.slaveName}'s asshole is surrounded by a nice wide area of crinkled skin. ${He2} obviously takes it up the butt.`);
			lewd = true;
		} else if (eventSlave.fetishKnown && eventSlave.fetish === "pregnancy" && subSlave.bellyPreg >= 5000) {
			t.push(Spoken(eventSlave, `"You're so hot with that belly,"`));
			t.push(`${he} wheedles.`);
			t.push(Spoken(eventSlave, `"It's just so big, and round, and, um, out there."`));
			t.push(`${He} swallows, getting distracted.`);
		} else if (subSlave.face > 95) {
			t.push(Spoken(eventSlave, `"You're the prettiest ${SlaveTitle(subSlave)} in the whole arcology,"`));
			t.push(`${he} wheedles.`);
			t.push(Spoken(eventSlave, `"I can't look at your perfect ${subSlave.faceShape} face and not want to make love to ${!vaginal ? "your butt": "you"}!"`));
		} else if (!vaginal && subSlave.butt > 3) {
			t.push(Spoken(eventSlave, `"You've got such a nice ass,"`));
			t.push(`${he} wheedles.`);
			t.push(Spoken(eventSlave, `It's just so big, and round, and, um, out there."`));
			t.push(`${He} swallows, getting distracted.`);
		} else if (subSlave.boobShape === "perky") {
			t.push(Spoken(eventSlave, `"Your tits are incredible,"`));
			t.push(`${he} wheedles.`);
			if (subSlave.boobs > 800) {
				t.push(Spoken(eventSlave, `"They're magical. There's no other explanation for them being so huge and still perky."`));
			} else if (subSlave.boobs > 400) {
				t.push(Spoken(eventSlave, `"They're so perky and perfect."`));
			} else {
				t.push(Spoken(eventSlave, `"They're so tiny and cute!"`));
			}
			t.push(Spoken(eventSlave, `"I want ${!vaginal ? "your ass" : "you"} so much!"`));
		} else if (subSlave.boobShape === "torpedo-shaped") {
			t.push(Spoken(eventSlave, `"Your torpedoes are incredible,"`));
			t.push(`${he} wheedles.`);
			if (subSlave.boobs > 400) {
				t.push(Spoken(eventSlave, `"The way they sway when you move should be against the rules."`));
			} else {
				t.push(Spoken(eventSlave, `"They're so tiny and cute!"`));
			}
			t.push(Spoken(eventSlave, `"I want ${!vaginal ? "your ass" : "you"} so much!"`));
		} else if (subSlave.muscles > 30) {
			t.push(Spoken(eventSlave, `"You're so jacked,"`));
			t.push(`${he} wheedles.`);
			t.push(Spoken(eventSlave, `"I just want to`));
			if (vaginal) {
				t.push(Spoken(eventSlave, `feel those huge thighs wrap around me as I fuck you!"`));
			} else {
				t.push(Spoken(eventSlave, `feel that muscular booty flex under me as I fuck your butt!"`));
			}
		} else if (subSlave.skill.entertainment > 95) {
			t.push(Spoken(eventSlave, `You're so beautiful and graceful,"`));
			t.push(`${he} wheedles.`);
			t.push(Spoken(eventSlave, `"I love watching you walk. Look at you, just standing there you're so perfectly feminine. I want to make love to ${!vaginal ? "your ass" : "you"}!"`));
		} else {
			t.push(Spoken(eventSlave, `"You're so, um, cute,"`));
			t.push(`${he} wheedles, trying to come up with something to say.`);
			t.push(Spoken(eventSlave, `"And you have a, very, er, pretty ${vaginal ? "vagina" : "anus"}?"`));
			lewd = true;
		}
		App.Events.addParagraph(node, t);
		t = [];

		t.push(subSlave.slaveName);
		if (lewd) {
			t.push(`blushes at the lewd`);
		} else {
			t.push(`smiles at the`);
		}
		t.push(`flattery, but after a moment's hesitation ${he2} maintains ${his2} reluctance.`);
		if (eventSlave.rules.release.masturbation === 1) {
			t.push(Spoken(subSlave, `"Why don't you just jerk off,"`));
			t.push(`${he2} asks dismissively.`);
			t.push(Spoken(subSlave, `"Seriously, you're allowed to."`));
		} else {
			t.push(Spoken(subSlave, `"Go find someone else,"`));
			t.push(`${he2} asks dismissively.`);
			if (vaginal) {
				t.push(Spoken(subSlave, `"There are plenty of other pussies around for you to play with."`));
			} else {
				t.push(Spoken(subSlave, `"I'm sure you can find some other ${girl2} who wouldn't mind late night anal."`));
			}
		}
		t.push(`${He2} turns away.`);
		App.Events.addParagraph(node, t);
		t = [];
		const holeSize = vaginal ? subSlave.vagina : subSlave.anus;

		t.push(`${eventSlave.slaveName} is almost in tears.`);
		if (eventSlave.rules.release.masturbation === 1) {
			t.push(Spoken(eventSlave, `"I have,"`));
			t.push(`${he} moans, blue balled.`);
			if (eventSlave.aphrodisiacs > 0 || eventSlave.inflationType === "aphrodisiac") {
				t.push(Spoken(eventSlave, `"It's these fucking aphrodisiacs. I can't help it. Please, please let me try cumming inside you. I won't be able to sleep."`));
			} else {
				t.push(Spoken(eventSlave, `"It's not the same. I need to stick my dick in something so bad. Please."`));
			}
		} else {
			t.push(Spoken(eventSlave, `"But I want you,"`));
			t.push(`${he} moans, blue balled.`);
			if (eventSlave.dick > 4) {
				if (holeSize > 2) {
					t.push(Spoken(eventSlave, `"I'm t-too big,"`));
					t.push(`${he} adds sadly, gesturing to ${his} massive erection.`);
					t.push(Spoken(eventSlave, `"Some of the other girls can't take me, and I have to be gentle. Please, let me use you. I need to fuck so bad."`));
				} else {
					t.push(Spoken(eventSlave, `"Your ${vaginal ? "beautiful cunt" : "sphincter"} will make me explode. I haven't gotten to fuck anything today and I need it so bad. Please."`));
				}
			} else if (eventSlave.dick > holeSize+1) {
				t.push(Spoken(eventSlave, `"I've been dreaming about your tight ${vaginal ? "cunt" : "ass"} all day. My dick is a perfect fit for it, it'll make me feel so good. I want to fuck it so bad. Please."`));
			} else {
				t.push(Spoken(eventSlave, `"I don't see what the problem is. I'm really horny. I want to f-fuck so bad. Please, just let me use you to get off. I need your hole."`));
			}
		}


		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			new App.Events.Result(`Give the poor slave what ${he}'s asking for`, giveAsked),
			new App.Events.Result("Effect a trade", effectTrade),
			new App.Events.Result("Assert your dominance", assertDominance),
			new App.Events.Result("Rescind the rule against rape", rescindRapeRule, "This option WILL rescind the universal rule against interslave rape."),
		]);


		function giveAsked() {
			const frag = document.createDocumentFragment();
			t = [];

			t.push(`You resolve to give the poor slave what ${he}'s asking for: ${subSlave.slaveName}${!vaginal ? "'s ass." : "."}`);
			t.push(`Your slaves might have the right to refuse each other, but they have to obey you. You clear your throat, getting both slaves' attention, and then fix your gaze on ${subSlave.slaveName}.`);
			if (canSee(subSlave)) {
				t.push(`You tilt your head ever so slightly`);
			} else {
				t.push(`You make a subtle, yet clearly sexual sound`);
			}
			t.push(`in ${eventSlave.slaveName}'s direction. That's all that's necessary.`);
			t.push(Spoken(subSlave, `"Yes, ${master2}!"`));
			t.push(`${say2}s ${subSlave.slaveName} obediently, and`);
			if (vaginal) {
				t.push(`gets right down at ${eventSlave.slaveName}'s feet, lying on ${his2} back, legs`);
				if (subSlave.belly >= 5000) {
					t.push(`spread to either side of ${his2}`);
					if (subSlave.bellyPreg >= 3000) {
						t.push(`${subBelly} pregnancy,`);
					} else {
						t.push(`${subBelly} rounded belly,`);
					}
				} else {
					t.push(`spread,`);
				}
				t.push(`compliantly offering up ${his2} pussy.`);
			} else {
				t.push(`turns ${his2} back to ${eventSlave.slaveName}, bends a little, cocks ${his2} hips, and spreads ${his2} buttocks, compliantly offering ${his2} asspussy.`);
			}
			t.push(`${He2}'s yours to do with as you please, and you've decided to give ${him2} to ${eventSlave.slaveName}, at least for right now.`);
			App.Events.addParagraph(frag, t);
			t = [];

			t.push(Spoken(eventSlave, `"Thank you, ${master},"`));
			t.push(`${say}s ${eventSlave.slaveName} <span class="hotpink">devotedly.</span>`);
			if (!vaginal || subSlave.vaginaLube > 1) {
				t.push(`${He} lets a gob of ${his} saliva fall onto ${his} cockhead,`);
				if (!vaginal) {
					t.push(`out of politeness to ${subSlave.slaveName}'s asshole.`);
				} else if (subSlave.vaginaLube > 0) {
					t.push(`out of politeness, since ${he} knows ${subSlave.slaveName} might not be really wet for ${him}.`);
				} else {
					t.push(`since ${he} knows that ${subSlave.slaveName} has a chronically dry cunt.`);
				}
			}
			t.push(`Then ${he}`);
			if (vaginal) {
				t.push(`gets down between ${subSlave.slaveName}'s legs, guiding ${himself} inside the ${SlaveTitle(subSlave)}'s womanhood. ${subSlave.slaveName} kisses ${eventSlave.slaveName} on the lips,`);
				t.push(`wordlessly encouraging ${him}, and the randy ${SlaveTitle(eventSlave)} starts fucking ${him2} harder, moaning with satisfaction.`);
			} else {
				t.push(`turns to ${subSlave.slaveName}, shoving ${his} dick up the ${SlaveTitle(subSlave)}'s butt. ${subSlave.slaveName} gasps, wriggles ${himself2} into a more comfortable position, and then flexes ${his2} ass a little, letting the`);
				t.push(`${SlaveTitle(subSlave)} whose cock is inside ${his2} anus know that ${he} can go for it. ${eventSlave.slaveName} does, thrusting happily.`);
			}
			eventSlave.devotion += 5;
			if (vaginal) {
				seX(subSlave, "vaginal", eventSlave, "penetrative");
				if (canPenetrate(eventSlave) && canImpreg(subSlave, eventSlave)) {
					knockMeUp(subSlave, 5, 0, eventSlave.ID);
				}
			} else {
				seX(subSlave, "anal", eventSlave, "penetrative");
				if (canPenetrate(eventSlave) && canImpreg(subSlave, eventSlave)) {
					knockMeUp(subSlave, 5, 1, eventSlave.ID);
				}
			}
			App.Events.addParagraph(frag, t);
			return frag;
		}

		function effectTrade() {
			const frag = document.createDocumentFragment();
			t = [];

			t.push(`${subSlave.slaveName} has a perfectly healthy libido; there has to be something ${he2}'d like getting from ${eventSlave.slaveName} in turn. You clear your throat, getting the slaves' attention, and ask ${subSlave.slaveName} if there's anything ${he2}'d like ${eventSlave.slaveName} to do for ${him2} in return for sex. ${eventSlave.slaveName} is so desperate that ${he} makes a suggestion before ${subSlave.slaveName} can open ${his2} mouth. Everyone knows ${subSlave.slaveName}`);
			switch (subSlave.fetish) {
				case "submissive":
					t.push(`is a shameless submissive and loves to be fucked. ${eventSlave.slaveName} must know ${he}'s being had, at least a little. "${subSlave.slaveName}," ${he} purrs,`);
					t.push(Spoken(subSlave, `"I'll fuck you ${hasAnyLegs(subSlave) ? "until your toes curl" : "senseless"}."`));
					break;
				case "cumslut":
					t.push(`loves ${canTaste(subSlave) ? "the taste of" : "swallowing"} cum.`);
					t.push(Spoken(eventSlave, `"I promise to pull out and let you drink my cum, straight from my cock,"`));
					t.push(`${he} purrs.`);
					seX(subSlave, "oral", eventSlave, "penetrative");
					break;
				case "humiliation":
					t.push(`loves to be humiliated.`);
					t.push(Spoken(eventSlave, `"Let's go down to the dormitory, and I'll slide your ${vaginal ? "pussy" : "butthole"} down on top of my cock right there, in the middle of the doorway, so everyone has to step over you as you ride my dick."`));
					break;
				case "buttslut":
					t.push(`loves anal.`);
					if (canDoAnal(subSlave)) {
						t.push(`${eventSlave.slaveName}`);
						if (eventSlave.dick > 3) {
							t.push(`strokes ${himself} a couple of times, showing off ${his}`);
							if (eventSlave.dick > 5) {
								t.push(`monstrous penis.`);
							} else {
								t.push(`big dick.`);
							}
							t.push(Spoken(eventSlave, `"Come on, don't you want this thing up your ass?"`));
							t.push(`${he} asks.`);
						} else {
							t.push(`gestures to ${his} `);
							if (eventSlave.dick > 1) {
								t.push(`modest penis.`);
							} else {
								t.push(`pathetic penis.`);
							}
							t.push(Spoken(eventSlave, `"I know it's really small,"`));
							t.push(`${he} ${say}s.`);
							t.push(Spoken(eventSlave, `"But I'll use fingers, too. I'll make sure you get off."`));
						}
					} else {
						t.push(Spoken(eventSlave, `"I know you can't take it up your ass right now,"`));
						t.push(`${say}s ${eventSlave.slaveName},`);
						t.push(Spoken(eventSlave, `"but can't I rim you for a while first?"`));
						seX(subSlave, "oral", eventSlave, "penetrative");
					}
					break;
				case "boobs":
					if (subSlave.lactation) {
						t.push(`loves nothing more than to have ${his2} udders lovingly sucked dry. "I'll drain you," says ${eventSlave.slaveName}, sticking ${his} tongue out to make ${his} meaning lewdly clear. ${Spoken(eventSlave, `"I'll nurse from you until you come."`)}`);
					} else {
						t.push(`can't resist having ${his2} breasts pampered. ${Spoken(eventSlave, `"I'll give you a boob massage,"`)} ${say}s ${eventSlave.slaveName}, and puts up ${his} ${hasBothArms(eventSlave) ? "arms" : "arm"}, flexing ${his} fingers lewdly. "A really good one. I'll be thorough!"`);
					}
					break;
				case "pregnancy":
					t.push(`loves to be inseminated,`);
					if (subSlave.pregKnown === 1) {
						t.push(`even though ${he2}'s already pregnant. ${Spoken(eventSlave, `"Come on, you know you want my semen,"`)} ${say}s ${eventSlave.slaveName}, idly toying with the precum gathering at ${his} tip.`);
						if (vaginal) {
							t.push(Spoken(eventSlave, `"I'll do my best to shoot it all the way up into your womb. I might even make you pregnant twice, I'll cum in you so hard."`));
						} else {
							t.push(Spoken(eventSlave, `"I'll fill your ass up."`));
						}
						subSlave.lactationDuration = 2;
						subSlave.boobs -= subSlave.boobsMilk;
						subSlave.boobsMilk = 0;
					} else {
						t.push(`regardless of whether ${he2} can actually get pregnant`);
						if (vaginal) {
							t.push(`right this second.`);
						} else {
							t.push(`in ${his2} anus.`);
						}
						t.push(`${Spoken(eventSlave, `"Come on, you know you want my semen,"`)} ${say}s ${eventSlave.slaveName}, idly toying with the precum gathering at ${his} tip. "I'll fill you up."`);
					}
					break;
				case "dom":
					t.push(`prefers to be on top. ${Spoken(eventSlave, `"Of course you can fuck me too,"`)} ${eventSlave.slaveName} hurries to add.`);
					if (canDoVaginal(eventSlave)) {
						t.push(`${He} reaches down and spreads ${his}`);
						if (subSlave.labia > 0) {
							t.push(`ample`);
						}
						t.push(`labia, showing off ${his} pink channel.`);
					} else if (canDoAnal(eventSlave)) {
						t.push(`${He} spins, cocks ${his} hips, spreads ${his} asscheeks, and winks ${his} anus invitingly.`);
					} else {
						t.push(`${He} gets right down on ${his} knees and uses ${his} hands to spread ${his} lips as wide as they'll go. "'ou can 'ace 'uck me," ${he} intones with difficulty.`);
					}
					t.push(Spoken(eventSlave, `"You can go first! ${canAchieveErection(subSlave) ? "Get your cock out" : "Grab a strap-on"}, let's trade holes!"`));
					break;
				case "sadist":
					t.push(`is a sexual sadist. ${eventSlave.slaveName} swallows nervously, visibly weighing whether ${he} wants to offer what ${he}'ll need to offer, and then takes the plunge. ${Spoken(eventSlave, `"You can hurt me,"`)} ${he} says in a small voice.`);
					break;
				case "masochist":
					t.push(`is a slut for pain. "I'll hurt you," says ${eventSlave.slaveName} hesitantly. Seeing that this is well received, ${he} plunges on. ${Spoken(eventSlave, `"I'll rape you. Come on, I'm going to pound you so hard and twist your nipples until you don't know what hurts worst, your tits or your ${vaginal ? "cunt" : "butthole"}."`)}`);
					break;
				default:
					t.push(`is pretty vanilla in bed. "Come on," says ${eventSlave.slaveName} reassuringly. ${Spoken(eventSlave, `"You'll come more than I do, I promise. First I'll ${subSlave.dick > 0 ? "blow you" : "eat you out"}. Then we'll make love.`)}`);
					if (eventSlave.dick > 2) {
						t.push(Spoken(eventSlave, `This dick will make you shudder."`));
					} else {
						t.push(Spoken(eventSlave, `I'm kind of small down there, but I'll use my hands too."`));
					}
					seX(subSlave, "oral", eventSlave, "oral");
			}
			App.Events.addParagraph(frag, t);
			t = [];

			t.push(`${subSlave.slaveName} is a seasoned sex slave but that doesn't stop ${him2} from blushing a little at such a blunt suggestion. "Okay," ${he2} says, biting ${his2}`);
			if (eventSlave.lips > 40) {
				t.push(`absurdly generous`);
			} else if (eventSlave.lips > 10) {
				t.push(`full`);
			} else {
				t.push(`thin`);
			}
			t.push(`lower lip cutely.`);
			t.push(Spoken(subSlave, `"I was actually going to say yes anyway, but it's really nice to have someone like you ask me for it like that. I'm sorry I made you beg."`));
			t.push(Spoken(eventSlave, `"Don't care!"`));
			t.push(`says ${eventSlave.slaveName} exultantly, and grabs ${his} conquest, planting a lusty kiss on ${subSlave.slaveName}'s giggling mouth and`);
			if (vaginal) {
				t.push(`rubbing ${his} erection against ${subSlave.slaveName}'s`);
				if (subSlave.labia > 0) {
					t.push(`puffy`);
				}
				t.push(`pussylips.`);
			} else {
				t.push(`reaching around ${subSlave.slaveName} to start teasing ${his2} asshole.`);
			}
			t.push(Spoken(eventSlave, `"Don't care, as long as I get to fuck your ${vaginal ? "hot cunt" : "beautiful ass"}!"`));
			t.push(`Your work here is done, and once ${he}'s done blowing ${his} load inside ${subSlave.slaveName}${!vaginal ? "'s anus" : ""},`);
			t.push(`${eventSlave.slaveName} should remember to be <span class="mediumaquamarine">grateful</span> to you for the reminder on how to seduce`);
			switch (subSlave.fetish) {
				case "submissive":
					t.push(`coquettish subs.`);
					break;
				case "cumslut":
					t.push(`tired cumsluts.`);
					break;
				case "humiliation":
					t.push(`reluctant exhibitionists.`);
					break;
				case "buttslut":
					t.push(`tired anal whores.`);
					break;
				case "boobs":
					t.push(`coquettish mammary sluts.`);
					break;
				case "pregnancy":
					t.push(`reluctant pregsluts.`);
					break;
				case "dom":
					t.push(`tired doms.`);
					break;
				case "sadist":
					t.push(`tired sadists.`);
					break;
				case "masochist":
					t.push(`silly masochists.`);
					break;
				default:
					t.push(`vanilla`);
					t.push(`${girl2}s.`);
			}
			eventSlave.trust += 5;
			if (vaginal) {
				seX(subSlave, "vaginal", eventSlave, "penetrative");
				if (canPenetrate(eventSlave) && canImpreg(subSlave, eventSlave)) {
					knockMeUp(subSlave, 5, 0, eventSlave.ID);
				}
			} else {
				seX(subSlave, "anal", eventSlave, "penetrative");
				if (canPenetrate(eventSlave) && canImpreg(subSlave, eventSlave)) {
					knockMeUp(subSlave, 5, 1, eventSlave.ID);
				}
			}
			App.Events.addParagraph(frag, t);
			return frag;
		}

		function assertDominance() {
			const frag = document.createDocumentFragment();
			t = [];

			const domBelly = bellyAdjective(eventSlave);
			t.push(`You brush past ${eventSlave.slaveName} without a word. ${Spoken(eventSlave, `"Um, ${master},"`)} ${he} starts to greet you, and then loses track of the greeting as ${he} sees what you're doing. You stride forward, grab ${subSlave.slaveName} by ${his2}`);
			if (subSlave.hips > 2) {
				t.push(`door-jamming hips`);
			} else if (subSlave.belly >= 100000) {
				t.push(`expansive middle`);
			} else if (subSlave.butt > 12) {
				t.push(`gloriously immense ass`);
			} else if (subSlave.hips > 1) {
				t.push(`gloriously broad hips`);
			} else if (subSlave.butt > 8) {
				t.push(`monstrous ass`);
			} else if (subSlave.hips > 0) {
				t.push(`womanly hips`);
			} else if (subSlave.bellyPreg >= 5000) {
				t.push(`gravid middle`);
			} else if (subSlave.belly >= 5000) {
				t.push(`rounded middle`);
			} else if (subSlave.weight > 95) {
				t.push(`fat middle`);
			} else if (subSlave.butt > 5) {
				t.push(`huge ass`);
			} else if (subSlave.weight > 30) {
				t.push(`chubby middle`);
			} else if (subSlave.weight > 10) {
				t.push(`plush middle`);
			} else {
				t.push(`hips`);
			}
			t.push(`and set ${him2} on the nearest convenient waist-high object. Then you`);
			if (vaginal) {
				t.push(`pound ${his2} pussy.`);
			} else {
				t.push(`fuck ${his2} butt.`);
			}
			App.Events.addParagraph(frag, t);
			t = [];

			t.push(`Poor ${eventSlave.slaveName} can do nothing but stand there and watch. You haven't dismissed ${him}, so ${he}'s forced to helplessly spectate as you do exactly what ${he} so desperately wants to do. You can't see ${his} face, but you don't have to. ${subSlave.slaveName}`);
			if (vaginal) {
				if (subSlave.vagina === 1) {
					t.push(`has a tight pussy, and`);
				} else if (subSlave.vagina === 2) {
					t.push(`isn't tight, but`);
				} else {
					t.push(`has a loose pussy, but`);
				}
			} else {
				if (subSlave.anus === 1) {
					t.push(`has a tight little ass, and`);
				} else if (subSlave.anus === 2) {
					t.push(`is no anal virgin, but`);
				} else {
					t.push(`has a very experienced asshole, but`);
				}
			}
			if (V.PC.dick) {
				t.push(`you have a big dick`);
			} else {
				t.push(`you use a formidable strap-on`);
			}
			t.push(`and are ramming it into ${subSlave.slaveName}'s fuckhole industriously. ${He2} moans and writhes, being a good sex slave with your`);
			if (V.PC.dick) {
				t.push(`hard shaft`);
			} else {
				t.push(`instrument`);
			}
			t.push(`sliding in and out of ${him2}, in and out of ${him2}. You plunder ${him2} without restraint, bending to plant dominant kisses on ${him2} panting mouth while you fuck ${him2}, and then straightening up again to grab and maul ${his2}`);
			if (subSlave.boobsImplant / subSlave.boobs >= 0.60) {
				t.push(`fake tits`);
			} else {
				if (subSlave.boobShape !== "normal") {
					t.push(`${subSlave.boobShape}`);
				}
				t.push(`boobs`);
			}
			t.push(`with both hands.`);
			if (V.PC.dick) {
				t.push(`When you're through, you thrust deep inside, blasting ${his2}`);
				if (vaginal) {
					t.push(`cervix`);
				} else {
					t.push(`bowels`);
				}
				t.push(`with a hot torrent of your`);
				if (V.PC.balls >= 30) {
					t.push(`semen until ${his2} belly begins to visibly swell from your load.`);
				} else if (V.PC.balls >= 14) {
					t.push(`semen, thoroughly filling ${him2} with your massive load.`);
				} else {
					t.push(`semen.`);
				}
			} else {
				t.push(`Finally you orgasm, thrusting yourself hard against your strap-on harness, driving it as far inside your fucktoy as it'll go and holding it there as you shudder with climax.`);
			}
			t.push(`Then you pull out and shove the <span class="hotpink">dominated,</span> sweaty, fucked-out${V.PC.dick ? ", cum-dripping" : ""} ${subSlave.slaveName} towards the showers, giving ${him2} a swat on the butt when ${he2}'s slow to get moving. Then you turn to ${eventSlave.slaveName}.`);
			App.Events.addParagraph(frag, t);
			t = [];

			t.push(`${He}'s painfully aroused, of course. ${He} just got to watch a`);
			if (V.PC.title) {
				t.push(`handsome guy fuck a`);
			} else {
				t.push(`hot ${girlP} fuck another`);
			}
			if (!vaginal) {
				t.push(`hot ${girl2}'s ass,`);
			} else {
				t.push(`hot ${girl2},`);
			}
			t.push(`right in front of ${him}. And this while already laboring under a severe case of blue balls. ${Spoken(eventSlave, `"${capFirstChar(master)},"`)} ${he} ${say}s unspecifically. ${He} knows you did that in front of ${him} for ${his} benefit, at least partly, and ${he} wouldn't know what to make of it or how to respond, even if ${he} were in possession of ${his} faculties. Which ${he} isn't. All ${his} blood is very obviously located in`);
			if (eventSlave.vagina > -1) {
				t.push(`${his} lovely futanari hard-on.`);
			} else {
				t.push(`${his} desperately erect penis.`);
			}
			t.push(`You point to where ${subSlave.slaveName} just got fucked, and announce that ${eventSlave.slaveName} can get off if ${he} wants, but not by fucking ${subSlave.slaveName}. ${He} gets to come with`);
			if (V.PC.dick) {
				t.push(`your cock`);
			} else {
				t.push(`a strap-on`);
			}
			if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
				t.push(`fucking ${him}.`);
			} else {
				t.push(`up ${his} ass.`);
			}
			App.Events.addParagraph(frag, t);
			t = [];

			t.push(`${eventSlave.slaveName} is familiar with your libido, but even so, ${he}'s impressed. ${He}'s also in dire need of relief, and at this point, ${he}'s so horny that the prospect of any sex is attractive, even if it isn't the kind of sex ${he} was originally planning. So ${he} hops up eagerly enough and opens ${hasBothLegs(eventSlave) ? `${his} legs` : `${himself}`} for you, ${his} erect member`);
			if (eventSlave.belly >= 10000) {
				t.push(`uncomfortably trapped by ${his}`);
				if (eventSlave.bellyPreg >= 8000) {
					t.push(`${domBelly} pregnancy`);
				} else {
					t.push(`${domBelly} belly`);
				}
			} else {
				t.push(`sticking out forgotten`);
			}
			t.push(`as ${he}`);
			if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
				t.push(`spreads ${his} pussy.`);
			} else {
				t.push(`offers you ${his} asshole.`);
			}
			t.push(`You fuck it, even more roughly than you fucked ${subSlave.slaveName}'s`);
			if (vaginal) {
				t.push(`cunt,`);
			} else {
				t.push(`anus,`);
			}
			t.push(`and since you've just climaxed recently, it's a while before you orgasm again. ${eventSlave.slaveName} cums long before you, spattering ${himself} messily, moaning ${Spoken(eventSlave, `"Oh, ${master}, yes, oh fuck yes, my ${canDoVaginal(eventSlave) ? "pussy, my fucking pussy" : "ass, my fucking asshole"}"`)}`);
			t.push(`so <span class="hotpink">whorishly</span> that there's no indication ${he} was ever even considering fucking anyone.`);
			eventSlave.devotion += 3;
			if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
				seX(eventSlave, "vaginal", V.PC, "penetrative");
				if (canImpreg(eventSlave, V.PC)) {
					knockMeUp(eventSlave, 5, 0, -1);
				}
			} else {
				seX(eventSlave, "anal", V.PC, "penetrative");
				if (canImpreg(eventSlave, V.PC)) {
					knockMeUp(eventSlave, 5, 1, -1);
				}
			}
			if (vaginal) {
				subSlave.devotion += 3;
				seX(subSlave, "vaginal", V.PC, "penetrative");
				if (canImpreg(subSlave, V.PC)) {
					knockMeUp(subSlave, 15, 0, -1);
				}
			} else {
				subSlave.devotion += 3;
				seX(subSlave, "vaginal", V.PC, "penetrative");
				if (canImpreg(subSlave, V.PC)) {
					knockMeUp(subSlave, 15, 1, -1);
				}
			}

			App.Events.addParagraph(frag, t);
			return frag;
		}

		function rescindRapeRule() {
			const frag = document.createDocumentFragment();
			t = [];

			V.universalRulesConsent = 0;
			const {HisA, heA} = getPronouns(assistant.pronouns().main).appendSuffix("A");

			t.push(`You clear your throat for the slaves' attention and verbally order ${V.assistant.name} to rescind the penthouse rule against interslave rape. ${HisA} avatar pops up nearby and confirms the rules change.`);
			if (V.assistant.personality > 0) {
				t.push(`"Done," ${heA} says. "And I approve. Poor ${girl}s like ${eventSlave.slaveName} should be able to take what they need."`);
			} else {
				t.push(`"Done," ${heA} says.`);
			}
			App.Events.addParagraph(frag, t);
			t = [];

			t.push(`You give no explicit command to the pair of slaves in front of you, but they understand you perfectly. ${subSlave.slaveName} pales;`);
			if (subSlave.fetishKnown && subSlave.fetish === Fetish.SUBMISSIVE) {
				t.push(`${he2} likes getting fucked, but having someone ordered to rape ${him2} is a bit much.`);
			} else if (subSlave.fetishKnown && subSlave.fetish === "masochist") {
				t.push(`${he2} likes being hurt, but having the flirty interchange converted instantly into a situation in which ${he2} has no control at all kills ${his2} mood.`);
			} else {
				t.push(`${he2} wasn't seriously adverse to having sex, but being laid open to rape isn't ${his2} idea of a good time.`);
			}
			t.push(`${eventSlave.slaveName}, meanwhile, looks`);
			if (subSlave.fetishKnown && subSlave.fetish === "dom") {
				t.push(`rather pleased. ${He} likes being on top enough that ${he}'s willing to use force if necessary.`);
			} else if (subSlave.fetishKnown && subSlave.fetish === "sadist") {
				t.push(`positively predatory. The sadistic bitch actually prefers it this way.`);
			} else {
				t.push(`rather conflicted. ${He}'s obviously relieved ${he}'ll be getting relief, but obviously has some mixed feelings about using force to get what ${he} wants.`);
			}
			App.Events.addParagraph(frag, t);
			t = [];

			if (eventSlave.fetishKnown && (eventSlave.fetish === "dom" || eventSlave.fetish === "sadist")) {
				t.push(`${subSlave.slaveName} tries to get down on`);
				if (vaginal) {
					t.push(`the floor and offer ${his2} pussy`);
				} else {
					t.push(`${his2} knees and offer ${his2} asspussy`);
				}
				t.push(`without resistance, but ${eventSlave.slaveName} has other ideas, and shoves the poor slave down hard. ${subSlave.slaveName}'s`);
				if (vaginal) {
					t.push(`butt hits the floor with a smack`);
				} else {
					t.push(`knees hit the floor painfully`);
				}
				t.push(`and ${he2} moans unhappily as ${eventSlave.slaveName} penetrates ${him2}.`);
			} else {
				t.push(`${eventSlave.slaveName} clears ${his} throat uncomfortably, not really sure what to do, and obviously reluctant to grab ${subSlave.slaveName} and rape ${him}. ${subSlave.slaveName} resolves ${his} dilemma for ${him}, and`);
				if (vaginal) {
					t.push(`gets down on the ground, spreading ${his2} legs`);
					if (subSlave.belly >= 5000) {
						t.push(`to either side of ${his2} ${subBelly}`);
						if (subSlave.bellyPreg >= 3000) {
							t.push("pregnancy");
						} else {
							t.push("rounded belly");
						}
					}
					t.push(`and offering ${his2} pussy`);
				} else {
					t.push(`gets down on ${his2} knees, arching ${his2} back and presenting ${his2} asspussy`);
				}
				t.push(`without resistance. Relieved, ${eventSlave.slaveName} gets`);
				if (vaginal) {
					t.push(`on top of ${him2}`);
				} else {
					t.push(`behind ${him2}`);
				}
				t.push(`and starts to fuck.`);
			}
			t.push(Spoken(eventSlave, `"Thanks, ${master},"`));
			t.push(`pants ${eventSlave.slaveName} as ${he} humps away.`);
			t.push(Spoken(eventSlave, `"I'm <span class="mediumaquamarine">looking forward</span> to being able to do this whenever I want."`));
			t.push(`${subSlave.slaveName} gasps, from`);
			if (vaginal) {
				t.push(`down under ${eventSlave.slaveName}.`);
			} else {
				t.push(`where ${eventSlave.slaveName} has ${his2} face ground against the floor.`);
			}
			t.push(`Apparently, ${he2} hadn't realized that this wasn't a one-time thing, and is <span class="gold">none too pleased</span> by having to give ${eventSlave.slaveName} ${his2}`);
			if (vaginal) {
				t.push(`pussy`);
			} else {
				t.push(`ass`);
			}
			t.push(`whenever ${he} wants it.`);
			eventSlave.trust += 3;
			if (vaginal) {
				subSlave.trust -= 3;
				seX(subSlave, "vaginal", eventSlave, "penetrative");
				if (canPenetrate(eventSlave) && canImpreg(subSlave, eventSlave)) {
					knockMeUp(subSlave, 5, 0, eventSlave.ID);
				}
			} else {
				subSlave.trust -= 3;
				seX(subSlave, "vaginal", eventSlave, "penetrative");
				if (canPenetrate(eventSlave) && canImpreg(subSlave, eventSlave)) {
					knockMeUp(subSlave, 5, 1, eventSlave.ID);
				}
			}

			App.Events.addParagraph(frag, t);


			return frag;
		}
	}
};
