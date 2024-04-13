// cSpell:ignore Mhhf

App.Events.RETSCockmilkInterception = class RETSCockmilkInterception extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // event slave /domslave
				s => s.fetish !== Fetish.MINDBROKEN,
				canMove,
				canTalk,
				s => s.devotion > 20,
				s => s.dietCum > 0 || (s.fetishKnown && s.fetish === "cumslut"),
				s => s.belly < 60000,
			],
			[ // and subslave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => (s.assignment === Job.DAIRY || s.assignment === Job.MILKED),
				isSlaveAvailable,
				canMove,
				s => s.dick !== 0,
				s => s.balls !== 0,
				s => s.vasectomy === 0,
				s => s.ballType === "human",
				s => s.belly < 150000,
				s => ((canDoVaginal(s) && s.vagina > 0) || (canDoAnal(s) && s.anus > 0)),
			]
		];
	}

	execute(node) {
		const [slave, subSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself, His
		} = getPronouns(slave);
		const {say, title: master} = getEnunciation(slave);
		const doVaginal = (canDoVaginal(subSlave) && subSlave.vagina > 0);
		const doAnal = (canDoAnal(subSlave) && subSlave.anus > 0);
		const hands = hasBothArms(slave) ? "hands" : "hand";
		const {He2, he2, His2, his2, him2, girl2} = getPronouns(subSlave).appendSuffix("2");

		App.Events.drawEventArt(node, [slave, subSlave], "no clothing");

		let t = [];
		t.push(`Early in the morning, you run across`, contextualIntro(V.PC, subSlave, true), `using one of the penthouse milking machines. This isn't surprising;`);
		if (subSlave.lactation === 0) {
			t.push(`${he2}'s not lactating, but ${he2}'s a good semen producer and when ${he2} wakes up, ${he2}'s usually very ready to have one of the machines drain ${his2} balls for ${him2}.`);
		} else {
			if (subSlave.preg > subSlave.pregData.normalBirth / 1.33) {
				t.push(`it's late in ${his2} pregnancy and ${he2} wakes up every day with ${his2} ${subSlave.boobShape === "normal" ? `` : `${subSlave.boobShape} `}breasts sore, painfully swollen with rich, nutritious ${subSlave.milkFlavor === "none" ? `` : `${subSlave.milkFlavor}-flavored `}milk.`);
			} else if (subSlave.preg > subSlave.pregData.normalBirth / 2) {
				t.push(`${he2}'s pregnant and ${he2} wakes up every day with ${his2} ${subSlave.boobShape === "normal" ? `` : `${subSlave.boobShape} `}breasts sore and swollen with rich, nutritious ${subSlave.milkFlavor === "none" ? `` : `${subSlave.milkFlavor}-flavored `}milk.`);
			} else if (subSlave.lactation > 1) {
				t.push(`the tiny little slow-release implant in each of ${his2} breasts is merciless. It keeps ${his2} mammary glands in a permanent state of barely-safe hyperproduction, and ${he2} wakes up every day with ${his2} terribly sore breasts spontaneously dribbling ${subSlave.milkFlavor === "none" ? `` : `${subSlave.milkFlavor}-flavored `}milk.`);
			} else {
				t.push(`${his2} lactation is natural, but it's still enough that ${he2} wakes up most days with full, sore breasts.`);
			}
			t.push(`But ${his2} udders aren't the only thing producing creamy liquid.`);
			if ((doAnal || doVaginal) && subSlave.prostate > 0) {
				t.push(`The machine is applying generous prostate stimulation to drain ${his2} balls, too.`);
			}
			subSlave.lactationDuration = 2;
			subSlave.boobs -= subSlave.boobsMilk;
			subSlave.boobsMilk = 0;
		}
		t.push(`But the cum is about to be intercepted. There's another slave lying on the floor under ${subSlave.slaveName}, intertwined with the`);
		if (subSlave.lactation === 0) {
			t.push(`machine; its cum receptacle lying unused.`);
		} else {
			t.push(`machine. The nipple milkers are attached to each of the human cow's nipples, and they're pumping away industriously, keeping the clear lines running away from each udder white with cream. On the other hand, the cum receptacle is lying unused.`);
		}
		App.Events.addParagraph(node, t);
		t = [];
		t.push(`You can't see much of the slave under ${subSlave.slaveName}, since ${he}'s intimately intertwined with the machine and`);
		if (subSlave.weight > 95) {
			t.push(`${subSlave.slaveName} is a hefty ${girl2},`);
		} else if (subSlave.belly > 30000) {
			t.push(`${subSlave.slaveName}'s middle isn't exactly small,`);
		} else {
			t.push(`with ${subSlave.slaveName},`);
		}
		t.push(`but based on ${his}`);
		if (slave.dick > 0) {
			if (canAchieveErection(slave) && !(slave.chastityPenis)) {
				t.push(`stiff prick,`);
			} else if (slave.chastityPenis === 1) {
				t.push(`uncomfortably filled chastity cage,`);
			} else {
				t.push(`pathetically soft but precum-tipped dick,`);
			}
		}
		if (slave.vagina > 0) {
			if (slave.labia > 0) {
				t.push(`generous pussylips,`);
			} else if (slave.clit > 0) {
				t.push(`visibly stiff clit,`);
			} else {
				t.push(`obviously aroused womanhood,`);
			}
		}
		if (slave.dick === 0) {
			if (slave.vagina === -1) {
				if (slave.scrotum > 0) {
					t.push(`lonely ballsack,`);
				} else {
					t.push(`smoothly featureless groin,`);
				}
			}
		}
		if (slave.weight > 100) {
			t.push(`fat`);
		} else if (slave.muscles > 30) {
			t.push(`muscular`);
		} else if (slave.weight > 30) {
			t.push(`chubby`);
		} else if (slave.muscles > 10) {
			t.push(`toned`);
		} else if (slave.weight > 10) {
			t.push(`nice soft`);
		} else if (slave.weight >= -10) {
			t.push(`slender`);
		} else {
			t.push(`skinny`);
		}
		t.push(`legs, and ${slave.skin} skin, it's`, App.UI.DOM.combineNodes(contextualIntro(subSlave, slave, true), "."), `${He}'s allowed access to cockmilk and ${he}'s getting it straight from the source. ${subSlave.slaveName}`);
		if (subSlave.dick < 3) {
			t.push(`has a`);
			if (subSlave.dick < 2) {
				t.push(`pathetically tiny penis,`);
			} else {
				t.push(`rather modest cock,`);
			}
			t.push(`so ${slave.slaveName} has ${his} head buried between ${subSlave.slaveName}'s quivering thighs. ${He} isn't sucking ${subSlave.slaveName}'s dick so much as ${he}'s nursing at it, keeping it entirely within ${his} mouth and applying powerful suction.`);
		} else if (subSlave.dick > 8) {
			if (subSlave.dick > maxErectionSize(slave)) {
				t.push(`has an inhumanly monstrous penis that the poor slave's cardiovascular system couldn't possibly bring`);
				if (slave.drugs === "priapism agents") {
					t.push(`erect without outside aid; aid like the priapism agents ${he2} is currently on. ${slave.slaveName} has forced as much of its head into ${his} mouth as ${he} can, and is sucking lustily while trying not to choke.`);
				} else {
					t.push(`erect. ${slave.slaveName} has gotten its huge soft head into ${his} mouth, and is sucking lustily.`);
				}
			} else {
				t.push(`has an inhumanly monstrous penis and a powerful enough cardiovascular system that manages to bring it erect. ${slave.slaveName} has managed to force its huge blunging head into ${his} mouth, and is sucking lustily.`);
			}
		} else if (!canAchieveErection(subSlave)) {
			t.push(`can't achieve an erection, but ${slave.slaveName} is sucking ${his2} dick anyway. ${He}'s got ${his} mouth full of it, and to go by the flexing of ${his} cheeks, is applying ${his} tongue with gusto.`);
		} else {
			t.push(`is rock hard, of course, and ${slave.slaveName} is giving ${him2} a lusty blowjob, stroking ${his2} head busily back and forth.`);
		}
		t.push(`The milking machine cum receptacle is designed to be warm, wet, and stimulating, but ${subSlave.slaveName} is getting much better attention. ${slave.slaveName} is omitting nothing that could help ${him} extract every last drop of cum.`);
		if (doAnal || doVaginal) {
			t.push(`${He}'s sucking, and the machine is applying direct stimulation to ${subSlave.slaveName}'s`);
			if (subSlave.prostate) {
				t.push(`prostate`);
			} else {
				t.push(`insides`);
			}
			t.push(`with`);
			if (doAnal) {
				actX(subSlave, "anal");
				if (subSlave.anus > 3) {
					t.push(`a big vibrating dildo that comfortably fills ${his2} experienced anus,`);
				} else if (subSlave.anus > 2) {
					t.push(`a vibrating dildo that ${his2} soft asshole can take comfortably,`);
				} else {
					t.push(`a little vibrator that fits comfortably up ${his2} tight ass,`);
				}
			} else {
				actX(subSlave, "vaginal");
				if (subSlave.vagina > 3) {
					t.push(`a big vibrating dildo that comfortably fills ${his2} mature pussy,`);
				} else if (subSlave.vagina > 2) {
					t.push(`a vibrating dildo that ${his2} fits ${his2} pussy perfectly,`);
				} else {
					t.push(`a vibrating dildo that fills ${his2} tight little pussy,`);
				}
			}
			if (hasAnyArms(slave)) {
				if (subSlave.dick < 3) {
					t.push(`giving ${slave.slaveName} limited options to further stimulate the poorly-endowed slave. ${He}'s using one hand to`);
					if (doAnal && doVaginal) {
						seX(subSlave, "vaginal", slave, "penetrative");
						if (subSlave.vagina > 3) {
							t.push(`fist ${his2} mature vagina.`);
						} else if (subSlave.vagina > 2) {
							t.push(`penetrate ${his2} pussy.`);
						} else {
							t.push(`finger ${his2} tight pussy.`);
						}
					} else {
						t.push(`stroke the soft, precum-slick skin below ${subSlave.slaveName}'s anus.`);
					}
				} else if (subSlave.dick > 8) {
					t.push(`so ${slave.slaveName} has one hand wrapped around the gigantic soft python of flesh between ${subSlave.slaveName}'s legs, and is squeezing it rhythmically from its base up to where its head enters ${his} wet lips.`);
				} else if (!canAchieveErection(subSlave)) {
					t.push(`so, since ${slave.slaveName} can't jack off a soft shaft, ${he}'s using one hand to`);
					if (doAnal && doVaginal) {
						seX(subSlave, "vaginal", slave, "penetrative");
						if (subSlave.vagina > 3) {
							t.push(`fist ${his2} mature vagina.`);
						} else if (subSlave.vagina > 2) {
							t.push(`penetrate ${his2} vagina.`);
						} else {
							t.push(`finger ${his2} tight vagina.`);
						}
					} else {
						t.push(`stroke the soft, precum-slick skin below ${subSlave.slaveName}'s anus.`);
					}
				} else {
					t.push(`so ${he} uses one hand to stroke the hard shaft outside ${his} wet lips, using ${his} saliva and ${subSlave.slaveName}'s precum to perform a messy handjob.`);
				}
			}
		} else if (hasAnyArms(slave)) {
			if (subSlave.dick < 3) {
				t.push(`${He}'s giving ${slave.slaveName} limited options to further stimulate the poorly-endowed slave. ${He}'s using one hand to stroke the soft, precum-slick skin below ${subSlave.slaveName}'s anus.`);
			} else if (subSlave.dick > 8) {
				t.push(`${He} has one hand wrapped around the gigantic soft python of flesh between ${subSlave.slaveName}'s legs, and is squeezing it rhythmically from its base up to where its head enters ${his} wet lips.`);
			} else if (!canAchieveErection(subSlave)) {
				t.push(`Since ${slave.slaveName} can't jack off a soft shaft, ${he}'s using one hand to stroke the soft, precum-slick skin below ${subSlave.slaveName}'s anus.`);
			} else {
				t.push(`${He}'s using one hand to stroke the hard shaft outside ${his} wet lips, using ${his} saliva and ${subSlave.slaveName}'s precum to perform a messy handjob.`);
			}
		}
		if (hasBothArms(slave)) {
			t.push(`${His} other hand is`);
			if (subSlave.scrotum === 0) {
				if (subSlave.balls > 0) {
					if (subSlave.belly > 15000) {
						t.push(`pushing against ${his2} belly in an effort to claim a little more room beneath it.`);
					} else if (subSlave.belly > 1500 || subSlave.weight > 95) {
						t.push(`supporting ${his2} belly to keep it out of the way.`);
					} else {
						t.push(`massaging ${subSlave.slaveName}'s lower belly where ${his2} balls now reside.`);
					}
				} else {
					t.push(`massaging the place where ${subSlave.slaveName}'s scrotum used to be.`);
				}
			} else if (subSlave.scrotum < subSlave.balls) {
				t.push(`gently massaging ${subSlave.slaveName}'s overfilled scrotum, which ${his2} balls fill to the point of discomfort.`);
			} else if (subSlave.scrotum > subSlave.balls+1) {
				t.push(`playing with ${subSlave.slaveName}'s loose scrotum.`);
			} else {
				t.push(`massaging ${subSlave.slaveName}'s balls.`);
			}
		}
		App.Events.addParagraph(node, t);
		t = [];
		t.push(`${subSlave.slaveName} is getting`);
		let orgasmic = [];
		orgasmic.push(`${his2} dick sucked`);
		if (doAnal) {
			orgasmic.push(`${his2} ass fucked`);
			if (doVaginal) {
				orgasmic.push(`${his2} pussy teased`);
			}
		} else if (doVaginal) {
			orgasmic.push(`${his2} pussy fucked`);
		}
		if (subSlave.lactation > 0) {
			orgasmic.push(`${his2} boobs milked`);
		}
		t.push(toSentence(orgasmic) + ".");
		t.push(`${He2}'s so overstimulated that ${he2}'s shaking; a tremendous orgasm is building within ${him2}. ${He2}`);
		if (subSlave.voice !== 0) {
			t.push(`groans,`);
		} else {
			t.push(`makes a harsh rasping noise,`);
		}
		t.push(`which ${slave.slaveName}`);
		if (canHear(slave)) {
			t.push(`hears,`);
		} else {
			t.push(`can feel,`);
		}
		t.push(`and ${subSlave.slaveName} tenses, which ${slave.slaveName} feels in ${his} mouth${hasAnyArms(slave) ? ` and ${hands}` : ""}. Smiling around the penis in ${his} mouth, pleased by the approach of a gush of delectable semen, ${slave.slaveName} hums encouragement into ${subSlave.slaveName}'s`);
		if (canAchieveErection(subSlave)) {
			t.push(`rock-hard`);
		} else {
			t.push(`soft`);
		}
		if (subSlave.scrotum && subSlave.balls) {
			t.push(`dickhead and visibly tickles ${subSlave.slaveName}'s balls with ${his} naughty pink tongue.`);
		} else {
			t.push(`dickhead.`);
		}

		seX(slave, "oral", subSlave, "penetrative");

		App.Events.addParagraph(node, t);
		App.Events.addResponses(node, [
			new App.Events.Result("Step in for the stimulator", stimulator),
			subSlave.lactation
				? new App.Events.Result("Make sure the cumslut gets a balanced diet", balanced)
				: new App.Events.Result(),
			(V.PC.dick > 0 && V.PC.balls > 0)
				? new App.Events.Result("Substitute your cum", substitute)
				: new App.Events.Result(),
		]);

		function stimulator() {
			const frag = document.createDocumentFragment();
			t = [];

			t.push(`You command the machine to cease`);
			if (doAnal) {
				if (subSlave.anus < 3 || doVaginal) {
					t.push(`stimulating and leave ${subSlave.slaveName}'s ass alone for now. ${He2}`);
				} else {
					t.push(`stimulating, but leave its dildo where it is, for now. ${subSlave.slaveName}`);
				}
			} else {
				t.push(`stimulating and retract the dildo. ${subSlave.slaveName}`);
			}
			if (subSlave.voice !== 0) {
				t.push(`moans with frustration,`);
			} else {
				t.push(`wriggles uncomfortably,`);
			}
			t.push(`incipient orgasm ruined. Below ${him2}, ${slave.slaveName} makes a whining noise past ${his} mouth full of dick, not understanding what's happened. ${He} makes to start getting out from under ${subSlave.slaveName} and the machine, to investigate, but before ${he} can even put the dick down, ${he}`);
			if (canSee(slave)) {
				t.push(`sees a pair of`);
				if (V.PC.title) {
					t.push(`strong`);
				} else {
					t.push(`feminine`);
				}
				t.push(`hands reach around either side of ${subSlave.slaveName}'s torso and seize hold of ${his2}`);
			} else {
				t.push(`hears a pair of hands slap against the flesh of ${subSlave.slaveName}'s`);
			}
			if (subSlave.lactation === 0) {
				t.push(`milkless breasts.`);
			} else {
				t.push(`milk-filled udders.`);
			}
			t.push(`${slave.slaveName} can't`);
			if (canSee(slave)) {
				t.push(`see who it is,`);
			} else {
				t.push(`see,`);
			}
			t.push(`but ${he} knows it's you.`, Spoken(slave, `"Mhhf, hi, ${master},"`), `${he} manages, letting ${subSlave.slaveName}'s`);
			if (canAchieveErection(subSlave)) {
				t.push(`hard cockhead spring free of ${his} mouth with a pop.`);
			} else {
				t.push(`soft dick fall out of ${his} mouth with a wet noise.`);
			}
			t.push(Spoken(slave, `"Should I, um, get out from under here?"`));
			App.Events.addParagraph(frag, t);
			t = [];

			t.push(`You order ${him} to stay where ${he} is, and go back to sucking dick.`, Spoken(slave, `"Yes, ${master},"`), `${he} giggles, and then shuts up as ${his} mouth is occupied once more. ${subSlave.slaveName}, who's been obediently still under you as ${he2} waits for your pleasure, stiffens as ${he2} feels ${his2} dickhead surrounded by warm wetness once more. ${He2}'s got more coming.`);
			if (doVaginal && doAnal) {
				t.push(`${He2}'s got a cock and two fuckholes, so you instruct the machine to go back to stimulating, and adroitly lift ${his2} hips a little so that when the machine reinserts its stimulator, it penetrates ${his2} vagina and fucks that instead. Then you insert your`);
				if (V.PC.dick) {
					t.push(`cock`);
				} else {
					t.push(`strap-on`);
				}
				t.push(`into ${his2} conveniently pre-fucked ass and start`);
				if (V.PC.dick) {
					t.push(`pounding, feeling the vibration from inside ${his2} pussy on your dick through ${his2} insides`);
				} else {
					t.push("pounding.");
				}
				seX(subSlave, "anal", V.PC, "penetrative");
				actX(subSlave, "vaginal");
				if (canImpreg(slave, V.PC)) {
					knockMeUp(slave, 5, 1, -1);
				}
			} else if (subSlave.anus > 2 && doAnal) {
				t.push(`${His2} ass is so relaxed that your`);
				if (V.PC.dick) {
					t.push(`cock`);
				} else {
					t.push(`strap-on`);
				}
				t.push(`slides in alongside the stimulator without much trouble. Once you're inserted, you instruct the machine to start stimulating again, and mercilessly double penetrate ${his2}`);
				if (V.PC.dick) {
					t.push(`ass, enjoying the vibration against your cock as it slides against the stimulator.`);
				} else {
					t.push(`ass.`);
				}
				seX(subSlave, "anal", V.PC, "penetrative");
				if (canImpreg(slave, V.PC)) {
					knockMeUp(slave, 5, 1, -1);
				}
			} else {
				t.push(`The stimulator is effective enough, but it can't match `);
				if (V.PC.dick) {
					t.push(`a real cock,`);
				} else {
					t.push(`a strap-on wielded by a consummate master of the art,`);
				}
				t.push(`which is of course what ${subSlave.slaveName} has ${doAnal ? `up ${his2} ass` : `hilted in ${him2}`} in short order.`);
				if (doAnal) {
					seX(subSlave, "anal", V.PC, "penetrative");
					if (canImpreg(slave, V.PC)) {
						knockMeUp(slave, 5, 1, -1);
					}
				} else {
					seX(subSlave, "vaginal", V.PC, "penetrative");
					if (canImpreg(slave, V.PC)) {
						knockMeUp(slave, 5, 0, -1);
					}
				}
			}
			t.push(`${He2} was on the edge of orgasm when you stepped in, and this is just too much. ${He2} climaxes with indecent speed, involuntarily humping against the machine, shooting rope after rope of ${his2} cum into ${slave.slaveName}'s`);
			if (V.PC.dick) {
				t.push(`mouth and spasming against your invading penis wonderfully.`);
			} else {
				t.push("mouth.");
			}
			t.push(`You hold the quivering ${subSlave.slaveName} down and keep hammering ${him2} until you're certain ${he2}'s fed ${slave.slaveName} every drop ${he2} has. Then you let ${him2} up.`);
			App.Events.addParagraph(frag, t);
			t = [];

			t.push(`As ${subSlave.slaveName} stumbles off, looking <span class="devotion inc">rather submissive,</span> ${slave.slaveName} scoots out from underneath the machine.`);
			t.push(Spoken(slave, `"${capFirstChar(master)},"`), `${he} ${say}s <span class="devotion inc">devotedly,</span>`, Spoken(slave, `"that ${canTaste(slave) ? `tasted` : "was"} incredible. It ${canTaste(slave) ? `tastes` : "feels"} so much better when you fuck it out of ${him2}!"`));
			t.push(`${He}`);
			if (hasAnyArms(slave)) {
				t.push(`rubs ${his}`);
				if (slave.belly >= 5000) {
					t.push(`rounded`);
				}
			} else {
				t.push(`puffs out ${his}`);
				if (slave.belly >= 5000) {
					t.push(`already rounded`);
				}
			}
			t.push(`tummy with exaggerated satisfaction, and then realizes that you weren't fucking for nearly long enough to have gotten off yourself.`);
			if ((slave.lactation || slave.balls) && ((canDoVaginal(slave) && slave.vagina > 0) || (canDoAnal(slave) && slave.anus > 0))) {
				t.push(`"I need to be milked now, too," ${he} ${say}s flirtily, and turns to mount the machine in turn.`, Spoken(slave, `"Please, please do me too!"`), `The machine hasn't had a turn first, this time, so ${he}'s much`);
				if (V.PC.dick) {
					t.push(`tighter, and when ${he}'s done being milked, ${he}'s got a load of your cum inside ${him}.`);
				} else {
					t.push("tighter.");
				}
				if (slave.lactation > 0) {
					slave.lactationDuration = 2;
					slave.boobs -= slave.boobsMilk;
					slave.boobsMilk = 0;
				}
				if (canDoAnal(slave) && slave.anus > 0) {
					seX(subSlave, "anal", V.PC, "penetrative");
					if (canImpreg(subSlave, V.PC)) {
						knockMeUp(subSlave, 5, 1, -1);
					}
				} else if (canDoVaginal(slave) && slave.vagina > 0) {
					seX(subSlave, "vaginal", V.PC, "penetrative");
					if (canImpreg(subSlave, V.PC)) {
						knockMeUp(subSlave, 5, 0, -1);
					}
				}
			} else {
				t.push(Spoken(slave, `"Please, please let me drink yours, too,"`), `${he} moans, and gets down on ${his} knees, opening ${his} mouth and sticking out ${his} tongue, begging for`);
				if (V.PC.dick) {
					t.push(`your cock. You stick it straight down ${his} throat, and soon add a second load of cum`);
				} else {
					t.push(`you to mount ${his} face. You do, and soon add a generous helping of femcum`);
				}
				t.push(`to ${his} breakfast.`);
				seX(slave, "oral", V.PC, "penetrative");
			}
			slave.devotion += 3;
			subSlave.devotion += 3;

			App.Events.addParagraph(frag, t);

			return frag;
		}

		function balanced() {
			const frag = document.createDocumentFragment();
			t = [];
			t.push(`You stand by and watch the arresting scene until ${subSlave.slaveName} cums. The milking stations are designed to be pleasurable, so they're calibrated to drain ${girl2}s' balls about as fast as they drain their udders, allowing them to enjoy both kinds of relief for the whole session. But ${slave.slaveName} has falsified that for once;`);
			if (slave.skill.oral > 95) {
				t.push(`the inside of ${his} wet, hot mouth is really a delightful place for a penis, and ${he} puts the machine's dick receptacle to shame. ${subSlave.slaveName}`);
			} else if (slave.skill.oral > 60) {
				t.push(`${he}'s a skilled cocksucker, and ${his} wet, hot mouth is a much more stimulating place for a penis than the machine's dick receptacle. ${subSlave.slaveName}`);
			} else {
				t.push(`${he}'s no oral master, but ${his} mouth is wet and hot, and ${subSlave.slaveName} clearly likes it more than machine's dick receptacle. ${He2}`);
			}
			t.push(`can feel that ${his2} breasts aren't nearly empty of ${subSlave.milkFlavor === "none" ? `` : `${subSlave.milkFlavor}-flavored `}milk yet, and of course the milkers are tugging at ${his2} teats as industriously as ever, so ${he2} relaxes luxuriantly as ${slave.slaveName} starts to climb out from under ${him2}.`);
			App.Events.addParagraph(frag, t);
			t = [];

			t.push(`You announce your presence by ordering ${slave.slaveName} to stay where ${he} is. Startled, ${he} sticks ${his} head out from under ${subSlave.slaveName} and chirps`, Spoken(slave, `"Yes, ${master}!"`), `and scoots back under, waiting to see what you're planning. You straddle ${subSlave.slaveName}'s face; as`);
			if (canSee(subSlave)) {
				t.push(`${his2} vision is filled by your`);
				if (V.PC.dick) {
					t.push(`erect dick`);
				} else {
					t.push(`wet pussy`);
				}
			} else if (canSmell(subSlave)) {
				t.push(`${his2} nose samples the scent of`);
				if (V.PC.dick) {
					t.push(`the precum budding at the tip of your erect dick`);
				} else {
					t.push(`your wet pussy`);
				}
			} else {
				t.push(`${his2} face is warmed by the heat from your`);
				if (V.PC.dick) {
					t.push(`hard cock,`);
				} else {
					t.push(`wet cunt,`);
				}
			}
			t.push(`${he2} opens ${his2} mouth compliantly and`);
			if (V.PC.dick) {
				t.push(`receives ${his2} owner's hot cock, pressed past ${his2} lips and down ${his2} throat. ${He2} starts sucking`);
			} else {
				t.push(`is rewarded with ${his2} owner's hot womanhood, pressed against ${his2} lips. ${He2} starts eating you out`);
			}
			t.push(`obediently, until you reach down to ${his2} still-jiggling udders and tug one of the milkers loose. ${subSlave.slaveName} starts with discomfort, moaning uncomfortably into your`);
			if (V.PC.dick) {
				t.push(`member`);
			} else {
				t.push(`cunt`);
			}
			t.push(`before getting back to work. ${His2}`);
			if (subSlave.lactation > 1) {
				t.push(`lactation is unnaturally copious,`);
			} else {
				t.push(`${subSlave.milkFlavor === "none" ? `` : `${subSlave.milkFlavor}-flavored `}milk is really flowing now,`);
			}
			t.push(`and a thin stream of cream squirts out of ${him2}. It lands on ${slave.slaveName}'s face below, surprising ${him}. ${He} splutters comically, but obeys eagerly when you squeeze ${subSlave.slaveName}'s freed boob and order ${slave.slaveName} to start drinking. After all, you point out, a balanced diet is important. ${slave.slaveName} <span class="trust inc">giggles complaisantly</span> and reaches for the proffered tit. ${subSlave.slaveName} is still basking in the afterglow of ${his2} orgasm and shudders silently with overstimulation as ${he2} feels ${slave.slaveName}'s lips`);
			if (subSlave.nipples !== "fuckable") {
				t.push(`latch around`);
			} else {
				t.push(`encircle`);
			}
			t.push(`${his2} ${subSlave.nipples} nipple.`);
			if (V.PC.dick) {
				seX(subSlave, "oral", V.PC, "penetrative");
			} else {
				seX(subSlave, "oral", V.PC, "vaginal");
			}
			slave.trust += 5;

			App.Events.addParagraph(frag, t);
			return frag;
		}

		function substitute() {
			const frag = document.createDocumentFragment();
			t = [];

			t.push(`You order ${slave.slaveName} to put the dick back where it belongs and come out from under there. There's a lewd noise as ${he} spits out ${subSlave.slaveName}'s penis.`, Spoken(slave, `"Yes, ${master}!"`), `${he} ${say}s automatically, knowing your voice, and ${he} scrabbles to obey, stuffing poor moaning ${subSlave.slaveName}'s member back in its proper cum receptacle before hurriedly scooting out from under,`);
			if (slave.clitSetting === "oral") {
				t.push(`gasping with the stimulation applied by ${his} smart piercing, which is encouraging ${him} to suck dick.`);
			} else if (slave.belly >= 10000) {
				t.push(`a struggle considering just how big ${his}`);
				if (slave.bellyPreg >= 8000) {
					t.push(`pregnancy`);
				} else {
					t.push(`belly`);
				}
				t.push(`is.`);
			} else if (slave.weight > 95) {
				t.push(`a process made much more comical as ${his} plush body wobbles and flops against everything in its way.`);
			} else if (slave.dick > 4) {
				t.push(`${his} own`);
				if (canAchieveErection(slave)) {
					t.push(`monster erection waving`);
				} else {
					t.push(`monstrously limp dick flopping`);
				}
				t.push(`around comedically as ${he} does.`);
			} else if (slave.boobs > 4000) {
				t.push(`a process made much more involved and a little funny by ${slave.slaveName}'s own gargantuan tits.`);
			} else {
				t.push(`${his} bare buttocks smacking painfully against the floor in ${his} haste.`);
			}
			if (canStand(slave)) {
				t.push(`${He} starts to scramble up to a standing position, but ${he} only gets halfway before ${he} notices that there's`);
			} else {
				t.push(`${He} starts push ${himself} upright, but quickly finds that there's`);
			}
			if (canAchieveErection(subSlave)) {
				t.push(`another`);
			} else {
				t.push("a");
			}
			t.push(`massively erect dick`);
			if (canSee(slave)) {
				t.push(`pointed`);
			} else {
				t.push(`poking`);
			}
			t.push(`at ${his} face. Yours.`);
			App.Events.addParagraph(frag, t);

			t = [];
			t.push(`${slave.slaveName}`);
			if (slave.trust > 20) {
				t.push(`wasn't really worried that ${he} was in trouble; ${canHear(slave) ? "your tone was not" : "you don't seem"} angry and ${he} wasn't breaking the rules. Even so, ${he} giggles`);
			} else {
				t.push(`was worried that ${he} was in trouble; even through ${canHear(slave) ? "your tone wasn't not" : "you don't seem"} angry, and even though ${he} wasn't breaking the rules, ${he}'s afraid of you. So ${he} giggles with relief`);
			}
			t.push(`when ${he}`);
			if (canSee(slave)) {
				t.push(`sees`);
			} else {
				t.push(`realizes`);
			}
			t.push(`that ${he}'s going to get ${his} drink of cum, just from a different source.`);
			if (slave.trust > 20) {
				t.push(`${He} runs ${his}`);
				if (slave.piercing.tongue.weight) {
					t.push(`pierced`);
				} else {
					t.push(`pink`);
				}
				t.push(`tongue over ${his} lips hungrily, staring meaningfully at the cockhead`);
				if (V.showInches === 2) {
					t.push(`inches`);
				} else {
					t.push(`centimeters`);
				}
				t.push(`in front of ${his} face.`, Spoken(slave, `"I'm so happy, ${master},"`), `${he} purrs.`, Spoken(slave, `"You have the best cum. ${V.PC.balls >= 10 ? "I'll never go hungry with you either." : "."}"`), `${He}'s still right up against ${subSlave.slaveName},`);
				if (hasAnyArms(slave)) {
					t.push(`and ${he} reaches back to pat ${subSlave.slaveName}'s butt reassuringly.`);
				} else {
					t.push(`so ${he} leans back and nuzzles ${subSlave.slaveName}'s butt reassuringly.`);
				}
				t.push(Spoken(slave, `"Yours is nice, but there's only one ${getWrittenTitle(slave)}."`), `Then ${he} starts sucking your dick.`);
			} else {
				t.push(Spoken(slave, `"Thank you, ${master},"`), `${he} ${say}s dutifully.`, Spoken(slave, `"Your, um, your cum is the best.${V.PC.balls >= 10 ? " I'll never go hungry with you either." : ""}"`));
				t.push(`Momentarily unsure of ${himself}, ${he} blushes, and decides to take refuge in dicksucking.`);
			}
			if (slave.skill.oral > 60) {
				t.push(`${He}'s a well-trained cocksucker, and as the suction and ${his} active tongue go to work,`);
				if (hasAnyArms(slave)) {
					t.push(`${he} reaches up and`);
					if (V.PC.vagina !== -1) {
						t.push(`begins to lavish attention on your pussy with both hands. ${He} fingers your labia lovingly before starting to dip ${his} fingers inside you in time with ${his} oral strokes at your shaft.`);
					} else {
						t.push(`cups your`);
						if (V.PC.balls >= 30) {
							t.push(`monstrous`);
						} else if (V.PC.balls >= 14) {
							t.push(`hand-filling`);
						} else if (V.PC.balls >= 9) {
							t.push(`huge`);
						} else if (V.PC.balls >= 5) {
							t.push(`big`);
						}
						t.push(`balls lovingly. A testicular massage during a blowjob might not actually increase ejaculation volume, but the care ${he} shows suggests that the hungry slut might believe it does.`);
					}
				} else {
					t.push(`${he} lavishes attention as best ${he} can to your`);
					if (V.PC.vagina !== -1) {
						t.push(`your pussy without any hands.`);
					} else {
						if (V.PC.balls >= 30) {
							t.push(`monstrous`);
						} else if (V.PC.balls >= 14) {
							t.push(`hand-filling`);
						} else if (V.PC.balls >= 9) {
							t.push(`huge`);
						} else if (V.PC.balls >= 5) {
							t.push(`big`);
						}
						t.push(`balls without any hands. Lovingly teasing your testicles during a blowjob might not actually increase ejaculation volume, but the care ${he} shows suggests that the hungry slut might believe it does.`);
					}
				}
			} else {
				t.push(`${He}'s not an outstanding oral slave, so after ${he}'s working away reasonably well, you take ${his} head in both hands and fuck ${his} face. Not cruelly, but with comprehensive dominance. ${He} can breathe, but ${he} has to concentrate to do so, letting you rape ${his} throat like a good little bitch.`);
			}
			t.push(`When you cum, you thrust as far inside as you can manage and`);
			if (V.PC.balls >= 30) {
				t.push(`pump oversized load after oversized load down ${his} throat, steadily swelling ${his} stomach with your jizz.`);
			} else if (V.PC.balls >= 14) {
				t.push(`pump your massive load into ${him} until ${he} gags.`);
			} else if (V.PC.balls >= 9) {
				t.push(`unload your massive cumshot deep into ${him}.`);
			} else {
				t.push(`shoot your load deep into ${him}.`);
			}
			t.push(`Denied the`);
			if (canTaste(slave)) {
				t.push(`taste`);
			} else {
				t.push(`feeling`);
			}
			t.push(`of most of your semen, deposited far back and beyond ${his}`);
			if (canTaste(slave)) {
				t.push(`taste buds,`);
			} else {
				t.push(`tongue,`);
			}
			t.push(`${he} forms a tight seal around your shaft as ${he} pulls ${his} head back and off your cock, sucking the residual drops out of you and onto ${his} tongue. ${He} swallows, gives a`);
			if (slave.trust > 20) {
				t.push(`contented`);
			} else {
				t.push(`relieved`);
			}
			t.push(`sigh, and looks up at you <span class="hotpink">devotedly.</span>`);
			seX(slave, "oral", V.PC, "penetrative");
			slave.devotion += 5;
			App.Events.addParagraph(frag, t);
			return frag;
		}
	}
};
