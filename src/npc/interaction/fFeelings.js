// cSpell:ignore fat-assed, kissy
// TODO: expand this to have slaves with low devotion / trust speak more
// TODO: give hostage slave her opinions about her desires, state, and your other slaves

/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fFeelings = function(slave) {
	const frag = new DocumentFragment();

	const {
		He,
		he, his, him, wife, woman, girl
	} = getPronouns(slave);

	const {title: Master, say} = getEnunciation(slave);

	const lisps = canTalk(slave) && SlaveStatsChecker.checkForLisp(slave);

	const text = new SpacedTextAccumulator(frag);
	text.push(
		intro(),
		setup(),
	);

	if (slave.devotion > 20) {
		text.push(
			consummation(),
			aftermath(),
		);
	}

	text.toParagraph();

	return frag;

	function intro() {
		return `The next time you see ${him} you ask ${him}, in a voice that brooks no dishonesty, how ${he} really feels about you and life as a slave.`;
	}

	function setup() {
		const text = [];

		if (slave.devotion < -50) {
			text.push(`${He}`);

			if (slave.trust >= -20) {
				if (!canTalk(slave)) {
					text.push(`gestures`);
				} else if (lisps) {
					text.push(`lisps`);
				} else {
					text.push(`declares`);
				}

				text.push(`angrily that it's wrong to keep ${him} a slave, and that you should free ${him}.`);
			} else if (slave.trust >= -50) {
				if (!canTalk(slave)) {
					text.push(`gestures`);
				} else if (lisps) {
					text.push(`lisps`);
				} else {
					text.push(`mutters`);
				}

				text.push(`hesitantly that it's wrong to keep ${him} a slave, and that you should free ${him}.`);
			} else {
				if (!canTalk(slave)) {
					text.push(`gestures a perfunctory plea not to hurt ${him}.`);
				} else {
					text.push(`mutters a perfunctory ${Spoken(slave, `"Please don't hurt me, ${(slave.rudeTitle === 1) ? PoliteRudeTitle(slave) : Master}."`)}`);
				}
			}
		} else if (slave.devotion < -20) {
			text.push(`${He}`);

			if (!canTalk(slave)) {
				text.push(`gestures`);
			} else if (lisps) {
				text.push(`lisps`);
			} else {
				text.push(`mutters`);
			}

			if (slave.trust >= -20) {
				text.push(`hesitantly that ${he} does not like being a slave, and then`);

				if (!canTalk(slave)) {
					text.push(`lets ${his} ${(hasBothArms(slave)) ? `hands` : `hand`} fall to ${his} sides.`);
				} else {
					text.push(`falls silent.`);
				}
			} else if (slave.trust >= -50) {
				text.push(`fearfully that ${he} does not like being a slave, and then`);

				if (!canTalk(slave)) {
					text.push(`lets ${his} ${(hasBothArms(slave)) ? `hands` : `hand`} fall to ${his} sides, shaking a little.`);
				} else {
					text.push(`falls silent, shaking a little.`);
				}
			} else {
				text.push(`a perfunctory`);

				if (!canTalk(slave)) {
					text.push(`plea not to hurt ${him}.`);
				} else {
					text.push(`${Spoken(slave, `"Please don't hurt me, ${Master}."`)}`);
				}
			}
		} else if (slave.devotion <= 20) {
			text.push(`${He}`);

			if (!canTalk(slave)) {
				text.push(`gestures`);
			} else {
				text.push(`${say}s`);
			}

			if (slave.trust >= -20) {
				text.push(`earnestly`);
			} else if (slave.trust >= -50) {
				text.push(`fearfully`);
			} else {
				text.push(`shakily`);
			}

			text.push(`that ${he} will do whatever you order ${him} to, since ${he} does not want to be`);

			switch (slave.rules.punishment) {
				case "confinement":
					text.push(`shut up in the dark, which is of course ${his} standard punishment.`);
					break;
				case "whipping":
					text.push(`whipped, which is of course ${his} standard punishment.`);
					break;
				case "chastity":
					text.push(`put in restrictive chastity, which is of course ${his} standard punishment.`);
					break;
				default:
					text.push(`punished, not knowing what to expect when ${he}'s bad.`);
					break;
			}

			text.push(`Once ${he} learns to accept slavery, ${he} will be better able to open up.`);
		} else {
			if (slave.devotion <= 50) {
				if (!canTalk(slave)) {
					text.push(`${He} gestures that you're ${his} ${getWrittenTitle(slave)}, and ${he} will do ${his} best to obey you. ${He} continues to sign${(slave.accent === 3 && slave.voice !== 0) ? `, using gestures to supplant ${his} poor ${V.language}` : ``}:`);
				} else {
					text.push(`${Spoken(slave, `"You're my ${Master}, and I'll do my best to obey you,"`)} ${he} ${say}s.`);
				}
			} else if (slave.devotion <= 95) {
				if (!canTalk(slave)) {
					text.push(`${He} gestures that you're ${his} beloved ${Master}. ${He} continues to sign${(slave.accent === 3) ? `, using gestures to supplant ${his} poor ${V.language}` : ``}:`);
				} else {
					text.push(`${Spoken(slave, `"${(slave.relationship === -3) ? `I'm content with being your ${wife},` : `You're`} my beloved ${Master}, and you know what's best for me,"`)} ${he} ${say}s.`);
				}
			} else {
				if (!canTalk(slave)) {
					text.push(`${He} makes a simple gesture, meaning "I love you." ${He} continues to sign${(slave.accent === 3) ? `, using gestures to supplant ${his} poor ${V.language}` : ``}:`);
				} else {
					text.push(`${Spoken(slave, `"I love you,"`)} ${he} ${say}s in ${his}`);

					if (slave.voice === 1) {
						if (slave.voiceImplant < 0) {
							text.push(`guttural`);
						} else {
							text.push(`deep`);
						}
					} else if (slave.voice === 2) {
						text.push(`pretty`);
					} else {
						if (slave.voiceImplant > 0) {
							text.push(`high bimbo`);
						} else {
							text.push(`girly`);
						}
					}

					text.push(`voice.`);
				}
			}
		}

		return text.join(' ');
	}

	function consummation() {
		const text = [];

		const spoken = [
			trust(),
			speech(),
			health(),
			pregnancy(),
			fetish(),
			sexuality(),
			favoriteBodyPart(),
			futa(),
			need(),
			favoritePCBodyPart(),
		]
			.filter(t => !!t)
			.map(t => Spoken(slave, t));

		text.push(
			...spoken,
			fantasies(),
			hormones(),
			curatives(),
			inflation(),
			diet(),
			drugs(),
			assignment(),
			skills(),
			relationships(),
			FS(),
			devotion(),
		);

		return text.join(' ');

		function trust() {
			if (slave.trust < -50) {
				return `"I'm terrified of you.`;
			} else if (slave.trust < -20) {
				return `"You frighten me, sometimes.`;
			} else if (slave.trust < 20) {
				return `"I know you have total power over me.`;
			} else if (slave.trust < 50) {
				return `"You know what's best for me.`;
			} else if (slave.trust < 95) {
				return `"I trust you to know what's best for me.`;
			} else {
				return `"I trust you completely.`;
			}
		}

		function speech() {
			if (slave.rules.speech === "restrictive") {
				if (slave.devotion > 20) {
					return `Thank you so much for a chance to talk a little, ${Master}. I understand why I must be silent, but it's nice to get the chance.`;
				} else {
					return `Thank you so much for a chance to talk a little, ${Master}. It's hard, never speaking.`;
				}
			}
		}

		function health() {
			const text = [];

			if (slave.devotion > 50 && slave.health.condition < -20) {
				text.push(`I feel`);

				if (slave.health.condition < -50) {
					text.push(`really`);
				}

				text.push(`sick, ${Master}.`);

				if (slave.trust > 20) {
					text.push(`I wish you could give me something to ease the pain.`);
				}
			}

			return text.join(' ');
		}

		function pregnancy() {
			const text = [];

			if (slave.devotion > 20 && slave.devotion <= 90 && slave.trust >= -20 && slave.fetish !== "pregnancy" && slave.bellyPreg > (slave.pregAdaptation * 2000)) {
				if (slave.belly > (slave.pregAdaptation * 4500)) {
					text.push(`${Master}, my body is full...`);

					if (slave.geneticQuirks.uterineHypersensitivity === 2) {
						text.push(`I can't fit any more... So than why does every near rupture feel so fucking good?`);
					} else if (slave.sexualFlaw === "self hating") {
						text.push(`I surely couldn't even`);

						if (V.PC.dick > 2) {
							text.push(`find room to fit your dick in me right now.`);
						} else if (V.PC.dick === 0) {
							text.push(`find room to stick that hulking strap-on in me right now.`);
						} else {
							text.push(`fit the slightest amount more inside me right now; even you'll feel positively enormous in me.`);
						}

						text.push(`Maybe you should just shove me down and force it in? Send me right over the edge? Please?`);
					} else {
						text.push(`I'm just going to explode at some point, aren't I?`);
					}
				} else if (slave.belly > (slave.pregAdaptation * 3200)) {
					text.push(`My body feels full,`);

					if (slave.geneticQuirks.uterineHypersensitivity === 2) {
						text.push(`like a balloon ready to explode into the biggest orgasm I've ever had. Am I losing my mind?`);
					} else {
						text.push(`almost like I'm going to pop if I get any bigger. ${Master}, am... am I going to be alright?`);
					}
				} else {
					text.push(`My body feels tight, like really tight.`);

					if (slave.geneticQuirks.uterineHypersensitivity === 2) {
						text.push(`And kind of good, like I'm could cum at any moment.`);
					} else {
						text.push(`I get that I'm super pregnant, but should it hurt like this?`);
					}
				}
			}

			return text.join(' ');
		}

		function fetish() {
			const text = [];

			if (slave.fetishKnown === 1) {
				if (slave.energy > 95) {
					return `I love being your nympho slut.`;
				} else if (slave.fetishStrength > 60) {
					switch (slave.fetish) {
						case "submissive":
							return `I love it when you use me.`;
						case "dom":
							return `I love fucking the other slaves.`;
						case "sadist":
							return `I love hurting the other slaves.`;
						case "masochist":
							return `I love it when you hurt me.`;
						case "cumslut":
							text.push(`I love`);
							if (V.PC.dick !== 0) {
								text.push(`sucking on your cock${(V.PC.vagina !== -1) ? ` and eating you out` : ``}.`);
							} else {
								text.push(`eating you out.`);
							}

							return text.join(' ');
						case "humiliation":
							return `I love it when you use me in public.`;
						case "buttslut":
							return `I love it when you use my ass.`;
						case "pregnancy":
							if (slave.counter.births > 0) {
								return `I love being your breeder.`;
							} else if (slave.counter.birthsTotal > 0) {
								return `I love being bred.`;
							} else {
								return `I can't wait to be bred.`;
							}
						case "boobs":
							return `I love it when you pinch my nipples.`;
						default:
							return `It's boring of me, ${Master}, but I really do love normal sex.`;
					}
				}
			}

			return text.join(' ');
		}

		function sexuality() {
			const text = [];

			if (slave.attrKnown === 1) {
				if (slave.attrXX > 80) {
					text.push(`I love fucking the other girls.`);
				} else if (slave.attrXX > 60) {
					text.push(`It's nice, fucking the other girls.`);
				}

				if (slave.attrXY > 80 && V.seeDicks > 0) {
					text.push(`I love spending time with slaves with dicks, ${Master}.`);
				} else if (slave.attrXY > 60 && V.seeDicks > 0) {
					text.push(`It's nice, spending time with slaves with dicks, ${Master}.`);
				}
			} else {
				text.push(`I wish I understood my own sexuality better.`);
			}

			return text.join(' ');
		}

		function favoriteBodyPart() {
			const text = [];

			text.push(`My favorite part of my body`);

			if (slave.fetishKnown === 1) {
				if (slave.sexualFlaw === "neglectful" && slave.fetishStrength > 95) {
					text.push(`is unimportant, ${Master}. What part of me do <span class="note">you</span> like? N-not that I'm telling you that you need to like me! I'm just so happy when you're happy.`);
				} else if (slave.sexualFlaw === "malicious" && slave.fetishStrength > 95 && slave.muscles > 30) {
					text.push(`is my muscles, I like how I can use them to force the slutty bitches around here to do what I want. The way they squeal when I flex what I've got gets me hot every time.`);
				} else if (slave.sexualFlaw === "abusive" && slave.fetishStrength > 95 && slave.muscles > 30) {
					text.push(`is my muscles. I like how I can use them to hurt the other slaves, ${Master}. The way they cry, their tears, their blood. How long has it been since I beat a bitch senseless? I can't wait to work out some stress on my next toy.`);
				} else if (slave.sexualFlaw === "self hating" && slave.fetishStrength > 95) {
					text.push(`is my blood. It's so pretty and red, and there's so much of it when you and the other slaves <span class="note">really</span> lay into me. I'm so fucking hot right now, thinking about the things you can do to my slutty body.`);
				} else if (slave.sexualFlaw === "cum addict" && slave.fetishStrength > 95) {
					if (slave.lips > 40) {
						text.push(`is my`);
						if (slave.lips > 70) {
							text.push(`huge`);
						}
						text.push(`lips, I like how everyone expects to facefuck me, and how my lips wrap around their dicks to keep all that`);
						if (canTaste(slave)) {
							text.push(`yummy`);
						} else {
							text.push(`warm`);
						}
						text.push(`cum in my belly. Oh! I like my belly, too, and that warm, sloshy feeling as it's packed full of baby juice. It's so — I'm sorry, ${Master}. I think my mouth is watering. Please give me a moment to collect myself.`);
					} else if (V.PC.dick !== 0) {
						text.push(`is my tummy${(slave.vagina > -1) ? ` — and my womb` : ``}! The sloshy feeling when I'm all packed full of cum in both ends gets me so incredibly horny. Sometimes I wonder what it would be like if I were just a puffed up cum-balloon of a ${woman}, helpless and filled with cum, over, and over, and — I'm sorry, ${Master}. I'm being weird again, aren't I?`);
					} else {
						text.push(`is my mouth, I love how it feels to — to eat pussy, ${Master}. I love eating out your pussy. Especially when it's been filled up with some`);
						if (canTaste(slave)) {
							text.push(`yummy`);
						} else {
							text.push(`warm`);
						}
						text.push(`cum. Maybe you could let me eat cum out of your pussy soon?`);
					}
				} else if (slave.sexualFlaw === "attention whore" && slave.fetishStrength > 95) {
					text.push(`is my whole ${slave.skin} body, and whatever part of me is best used to make me look like a total slut.`);
				} else if (slave.sexualFlaw === "anal addict" && slave.fetishStrength > 95) {
					if (slave.anus > 3) {
						text.push(`is my gaping butthole. It's <span class="note">so</span> fucked out and beautiful. I can barely remember what anal pain feels like, but thinking about the sorts of things we can put in me, now, gets me so hot.`);
					} else if (slave.anus > 2) {
						text.push(`is my asspussy — I can take anything! It's <span class="note">so</span> much better than my`);
						if (slave.dick > 0) {
							text.push(`cock.`);
						} else {
							text.push(`pussy.`);
						}
						text.push(`It brings me so much pleasure... and pain... and... I'm sorry, ${Master} what were we talking about again? Oh! Right.`);
					} else if (slave.anus > 1) {
						text.push(`is my asshole, I like how I can take anyone's cock. It's <span class="note">so</span> much better than my`);
						if (slave.dick > 0) {
							text.push(`cock.`);
						} else {
							text.push(`pussy.`);
						}
						text.push(`It brings me so much pleasure... and pain... and... I'm sorry, ${Master} what were we talking about again? Oh! Right.`);
					} else if (slave.anus === 1) {
						text.push(`is my tight little anus, I like feeling it stretch to take a fuck. It's <span class="note">so</span> much better than my`);
						if (slave.dick > 0) {
							text.push(`cock.`);
						} else {
							text.push(`pussy.`);
						}
						text.push(`It brings me so much pleasure... and pain... and... I'm sorry, ${Master} what were we talking about again? Oh! Right.`);
					} else if (slave.anus === 0) {
						text.push(`is my little virgin butthole. I can't wait for the first time you fuck me in the ass — I wonder if it'll hurt.`);
					}
				} else if (slave.sexualFlaw === "breeder" && slave.fetishStrength > 95) {
					if (slave.bellyPreg >= 600000) {
						text.push(`is... um... our impossibly pregnant belly, of course. We love being so packed full with life that we're more baby than ${woman}, now. And the way our belly keeps our slutty preggo bodies stuck to the floor! We're so hot just thinking about it.`);
						if (slave.pregSource === -1) {
							text.push(`Thank you for breeding us, ${Master}! Our womb is yours to impregnate.`);
						}
						text.push(`What? Oh, I'm thinking of myself and my`);
						if (slave.pregType >= 2 || slave.broodmother >= 1) {
							text.push(`babies`);
						} else {
							text.push(`baby`);
						}
						text.push(`as one person again, aren't I? I'm sorry, ${Master}. It's just so hard to remember when my womb is so much more than I am in every way.`);
					} else if (slave.bellyPreg >= 300000) {
						text.push(`is... um... our massive pregnant belly, of course. We love feeling our womb swell with life. It's so hard to move now! We're so hot just thinking about it.`);
						if (slave.pregSource === -1) {
							text.push(`Thank you for breeding us, ${Master}! Our womb is yours to impregnate.`);
						}
						text.push(`What? Oh, I'm thinking of myself and my`);
						if (slave.pregType >= 2 || slave.broodmother >= 1) {
							text.push(`babies`);
						} else {
							text.push(`baby`);
						}
						text.push(`as one person again, aren't I? I'm sorry, ${Master}. It's just so hard to remember when my womb is so much more than I am in every way.`);
					} else if (slave.bellyPreg >= 15000) {
						text.push(`is... um... our bulging pregnant belly, of course. We love feeling our womb swell with life.`);
						if (slave.pregSource === -1) {
							text.push(`Thank you for breeding us, ${Master}! Our womb is yours to impregnate.`);
						}
						text.push(`What? Oh, I'm thinking of myself and my`);
						if (slave.pregType >= 2 || slave.broodmother >= 1) {
							text.push(`babies`);
						} else {
							text.push(`baby`);
						}
						text.push(`as one person again, aren't I? I'm sorry, ${Master}. It's just so hard to remember when my womb is so much more than I am in every way.`);
					} else if (slave.bellyPreg >= 100) {
						text.push(`is... um... our pregnant belly, of course.`);
						if (slave.pregSource === -1) {
							text.push(`Thank you for breeding us, ${Master}! Our womb is yours to impregnate.`);
						}
						text.push(`What? Oh, I'm thinking of myself and my`);
						if (slave.pregType >= 2) {
							text.push(`babies`);
						} else {
							text.push(`baby`);
						}
						text.push(`as one person again, aren't I? I'm sorry, ${Master}. It's just so hard to remember when my womb is so much more than I am in every way.`);
					} else if (slave.pregKnown === 1) {
						text.push(`is my belly, now that it has`);
						if (slave.pregType >= 2) {
							text.push(`the babies`);
						} else {
							text.push(`a baby`);
						}
						text.push(`growing in it. Just thinking about swelling up bigger and bigger has me quivering. I wish we could keep filling me with babies forever.`);
						if (slave.pregSource === -1) {
							text.push(`Thank you for impregnating me, ${Master}!`);
						}
					} else if (slave.dick > 0 && slave.balls > 4) {
						text.push(`is my big breeder balls. I just want to fill other slaves with babies forever.`);
					} else if (slave.dick > 0 && slave.balls > 0) {
						text.push(`is my cock. I just want to fill other slaves with babies forever.`);
					} else if (slave.weight > 95) {
						text.push(`is my big tummy. Think of how many babies we could stretch it over! No, really. Please, ${Master}. Think about it.`);
					} else if (slave.weight > 10) {
						text.push(`is my plush tummy. Think of how many babies we could stretch it over! No, really. Please, ${Master}. Think about it.`);
					} else if (slave.counter.birthsTotal > 10 && isFertile(slave)) {
						text.push(`is my womb. It's made so many babies. It feels so sad and empty right now. I really wish we could just keep it stuffed full of babies forever.`);
					} else if (isFertile(slave)) {
						text.push(`is my womb. It's ready, ${Master}. It feels so sad and empty right now. I really wish we could just keep it stuffed full of babies forever.`);
					} else {
						text.push(`is my tight tummy, I like to imagine how it would swell if I got pregnant. I... I really wish we could put a baby in me, ${Master}.`);
					}
					if (slave.geneticQuirks.superfetation === 2 && slave.womb.length > 0 && slave.pregKnown === 1) {
						if (slave.intelligence + slave.intelligenceImplant > 15) {
							if (slave.belly < (slave.pregAdaptation * 1750)) {
								if (V.PC.dick !== 0) {
									text.push(`You know, ${Master}, I think I could fit another baby or two in here if you wanted to take advantage of my condition...`);
								} else {
									text.push(`You know, I think I could fit a few more babies in here if you wanted me to...`);
								}
							} else {
								text.push(`Oh ${Master}, I feel it's that awful time when I have to let an egg go to waste for the sake of the rest of us. I wish it didn't have to be this way and I could just keep swelling larger and larger with children.`);
							}
						} else {
							if (V.PC.dick !== 0) {
								text.push(`You know, ${Master}, I think I can feel that tingle deep inside me... You know, the one that gets me even more pregnant... Don't you think I need another baby inside me?`);
							} else {
								text.push(`I think it's time, actually... Oh yes, it's surely time to use my gift and make even more babies in me.`);
							}
						}
					}
				} else if (slave.sexualFlaw === "breast growth" && slave.fetishStrength > 95) {
					if (slave.boobs > 10000) {
						text.push(`is my colossal boobies, ${Master}. Sometimes, I think I <span class="note">am</span> my boobies. I mean, they're so much more me than the rest of 'me,' right? Literally. They're bigger than the rest of my body and the only thing that would make me happier is if they were even <span class="note">bigger.</span>`);
					} else if (slave.boobs > 2000) {
						text.push(`is my huge boobies, ${Master}. Sometimes, I think I <span class="note">am</span> my boobies. I mean, they're so much more me than the rest of 'me,' right? So big, and so beautiful, and so heavy... I'm sorry, ${Master}, what were we talking about? Oh, yes!`);
					} else if (slave.nipples === "fuckable") {
						text.push(`is my nipple pussies of course. It's so hot when they get abused, and I'm always trying to think of new ways to use them to pleasure you.`);
					} else if (slave.lactation > 0) {
						text.push(`is my milky nipples of course. Especially when you don't touch them for a while and my breasts bloat up nice and big.`);
					} else if (slave.nipples === "huge" || slave.nipples === "puffy") {
						text.push(`is my big nipples, it's like having clits on my chest. My only wish is that they were even bigger.`);
					} else if (slave.boobs > 700) {
						text.push(`is my big boobs. I like how they feel wrapped around a dick, and they are the center of my world. Sometimes, I think I <span class="note">am</span> my boobies. I mean, they're so much more me than the rest of 'me,' right?`);
					} else {
						text.push(`is my boobs, of course. They're so beautiful, and the center of my world.`);
					}
				} else if (slave.energy > 95) {
					text.push(`is — is — I can't decide!`);
					if (slave.vagina > -1) {
						text.push(`I love my pussy of course.`);
						if (slave.clit > 0) {
							text.push(`Having another slave suck my big clit is incredible.`);
						}
						text.push(`But`);
					} else {
						text.push(`Of course`);
					}
					if (slave.anus > 1) {
						text.push(`taking big dicks up my ass is lots of fun.`);
					} else if (slave.anus > 0) {
						text.push(`taking cock in my tight ass is lots of fun.`);
					} else {
						text.push(`I love my little virgin butthole, but I can't wait to get assraped for the first time.`);
					}
					if (slave.dick > 3) {
						text.push(`My big cock swings around when I get sodomized from behind, it's great.`);
					} else if (slave.dick > 1) {
						text.push(`My dick flops around when I get sodomized from behind, it's great.`);
					} else if (slave.dick > 0) {
						text.push(`My tiny little bitch dick is good for encouraging people to molest my butthole.`);
					}
					if (slave.nipples === "fuckable") {
						text.push(`I love my fuckable nipples, it really feels like I've got a pair of pussies on my chest.`);
					} else if (slave.nipples === "huge" || slave.nipples === "puffy") {
						text.push(`I love my big nipples, it's like having clits on my chest.`);
					}
					if (slave.lactation > 0) {
						text.push(`Being able to nurse is really sexy, I always want to fuck right after. Or during.`);
					}
					if (slave.boobs > 2000) {
						text.push(`My huge boobs are great, they're like an advertisement I want to fuck.`);
					} else if (slave.boobs > 700) {
						text.push(`I like showing off my big boobs.`);
					}
					if (slave.lips > 40) {
						text.push(`Can't forget my dick-sucking lips, I don't know what I'd do without them.`);
					} else {
						text.push(`Can't forget my lips and tongue, getting people off with them is fun too.`);
					}
				} else if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishStrength > 60) {
					text.push(`is my bare ${slave.skin} skin, I like how it feels when you look me all over before you take me.`);
				} else if (slave.fetish === "dom" && slave.fetishStrength > 60 && slave.muscles > 30) {
					text.push(`is my muscles, I like how it feels to be strong, forcing another slave.`);
				} else if (slave.fetish === "sadist" && slave.fetishStrength > 60 && slave.muscles > 30) {
					text.push(`is my muscles, I like how it feels to be strong, forcing another slave.`);
				} else if (slave.fetish === "masochist" && slave.fetishStrength > 60) {
					text.push(`is my ${slave.skin} skin, I like how it looks when it bruises.`);
				} else if (slave.fetish === "cumslut" && slave.fetishStrength > 60) {
					if (slave.lips > 40) {
						text.push(`is my`);
						if (slave.lips > 70) {
							text.push(`huge`);
						}
						text.push(`lips, I like how everyone expects to facefuck me.`);
					} else if (V.PC.dick !== 0) {
						text.push(`is my mouth, I love how it feels to suck dicks and drink all the cum.`);
					} else {
						text.push(`is my mouth, I love how it feels to eat pussy.`);
					}
				} else if (slave.fetish === "humiliation" && slave.fetishStrength > 60) {
					text.push(`is my whole ${slave.skin} body, I like how it feels when everyone stares at me getting fucked.`);
				} else if (slave.fetish === "buttslut" && slave.fetishStrength > 60) {
					if (slave.anus > 3) {
						text.push(`is my gaping butthole, though I'm sad it's so fucked out. I can barely remember what anal pain feels like.`);
					} else if (slave.anus > 2) {
						text.push(`is my asspussy — I can take anything! It's basically replaced my`);
						if (slave.dick > 0) {
							text.push(`cock`);
						} else {
							text.push(`pussy`);
						}
						text.push(`as my main sex organ.`);
					} else if (slave.anus > 1) {
						text.push(`is my asshole, I like how I can take anyone's cock. It's basically replaced my`);
						if (slave.dick > 0) {
							text.push(`cock`);
						} else {
							text.push(`pussy`);
						}
						text.push(`as my main sex organ.`);
					} else {
						text.push(`is my tight little anus, I like feeling it stretch to take a fuck. It's basically replaced my`);
						if (slave.dick > 0) {
							text.push(`cock`);
						} else {
							text.push(`pussy`);
						}
						text.push(`as my main sex organ.`);
					}
				} else if (slave.fetish === "pregnancy" && slave.fetishStrength > 60) {
					if (slave.bellyPreg >= 600000) {
						text.push(`is my hypermassive pregnant belly, of course. I love being debilitatingly filled with life.`);
						if (slave.pregSource === -1) {
							text.push(`Thank you for breeding me, ${Master}! My womb is yours to impregnate. I can't think of anything better than getting bred by you forever.`);
						}
					} else if (slave.bellyPreg >= 300000) {
						text.push(`is my massive pregnant belly, of course. I love being so packed full of life.`);
						if (slave.pregSource === -1) {
							text.push(`Thank you for breeding me, ${Master}! My womb is yours to impregnate. I can't think of anything better than getting bred by you forever.`);
						}
					} else if (slave.bellyPreg >= 15000) {
						text.push(`is my bulging pregnant belly, of course. I love feeling my womb swell with life.`);
						if (slave.pregSource === -1) {
							text.push(`Thank you for breeding me, ${Master}! My womb is yours to impregnate. I can't think of anything better than getting bred by you forever.`);
						}
					} else if (slave.bellyPreg >= 100) {
						text.push(`is my pregnant belly, of course.`);
						if (slave.pregSource === -1) {
							text.push(`Thank you for breeding me, ${Master}! Please use me to make babies whenever you want.`);
						}
					} else if (slave.pregKnown === 1) {
						text.push(`is my belly, now that it has ${slave.pregType >= 2 ? `the babies` : `a baby`} growing in it. I can't wait for it to start showing.`);
						if (slave.pregSource === -1) {
							text.push(`Thank you for impregnating me, ${Master}!`);
						}
					} else if (slave.dick > 0 && slave.balls > 4) {
						text.push(`is my big breeder balls, I imagine knocking another slave up all the time.`);
					} else if (slave.dick > 0 && slave.balls > 0) {
						text.push(`is my cock, I imagine knocking another slave up all the time.`);
					} else if (slave.weight > 95) {
						text.push(`is my big tummy, I can imagine myself pregnant.`);
					} else if (slave.weight > 10) {
						text.push(`is my plush tummy, I can imagine myself pregnant.`);
					} else if (slave.counter.birthsTotal > 10 && isFertile(slave)) {
						text.push(`is my womb, it's made so many babies and I can't wait to make more.`);
					} else if (isFertile(slave)) {
						text.push(`is my fertile pussy, I want to get filled with cum so badly.`);
					} else {
						text.push(`is my tight tummy, I like to imagine how it would swell if I got pregnant.`);
					}
				} else if (slave.fetish === "boobs" && slave.fetishStrength > 60) {
					if (slave.boobs > 2000) {
						text.push(`is my huge tits, I like how they're so big they're the center of attention.`);
					} else if (slave.nipples === "fuckable") {
						text.push(`is my nipple pussies of course.`);
					} else if (slave.lactation > 0) {
						text.push(`is my milky nipples of course.`);
					} else if (slave.nipples === "huge" || slave.nipples === "puffy") {
						text.push(`is my big nipples, it's like having clits on my chest.`);
					} else if (slave.boobs > 700) {
						text.push(`is my big boobs, I like how they feel wrapped around a dick.`);
					} else {
						text.push(`is my boobs, of course.`);
					}
				} else if (slave.attrKnown === 1 && slave.attrXX > 80) {
					if (slave.lips > 70) {
						text.push(`is my huge lips, I like how the other girls will do anything for oral from me.`);
					} else if (slave.dick > 1 && slave.balls > 0) {
						text.push(`is my cock; I still do like slaying pussy.`);
					} else if (slave.lips > 40) {
						text.push(`is my kissy lips, I like how it feels to make out with the other girls.`);
					} else {
						text.push(`is my lips, I guess. They're the best way I have of getting girls to like me.`);
					}
				} else if (slave.attrKnown === 1 && slave.attrXY > 80) {
					if (slave.lips > 70) {
						text.push(`is my huge lips, I like how anyone with a dick wants oral from me.`);
					} else if (slave.dick > 1 && slave.balls > 0) {
						text.push(`is my cock. It's fun having sex with two dicks involved!`);
					} else if (slave.lips > 40) {
						text.push(`is my kissy lips, I like how anyone with a dick sees them and wants to fuck them.`);
					} else if (slave.vagina > -1) {
						text.push(`is my pussy, I love getting fucked by strong cocks.`);
					} else {
						text.push(`is my butt, I guess. It's the best way I have of getting boys to like me.`);
					}
				} else {
					text.push(`is my face,`);
					if (slave.face > 10) {
						text.push(`it's nice to be pretty.`);
					} else {
						text.push(`I guess.`);
					}
				}
			} else {
				text.push(`is my face,`);
				if (slave.face > 10) {
					text.push(`it's nice to be pretty.`);
				} else {
					text.push(`I guess.`);
				}
			}

			return text.join(' ');
		}

		function futa() {
			if (slave.pregSource === -9 && slave.bellyPreg >= 5000 && slave.devotion > 0) {
				return `My little sister is getting big; do you think she'll be a good little futa like me someday?`;
			}
		}

		function need() {
			const text = [];

			if (slave.need) {
				const touch = (hasAnyArms(slave)) ? `touch myself,` : `rub myself against stuff,`;

				if (slave.rules.release.masturbation === 1) {
					text.push(`Thank you for letting me`);

					if (slave.fetishKnown === 1) {
						if (slave.energy > 95 && !canSee(slave)) {
							text.push(`${touch} ${Master}. It's a good thing I can't get any more blind from it.`);
						} else if (slave.energy > 95) {
							text.push(`${touch} ${Master}. It's a good thing I can't actually go blind from it.`);
						} else if (slave.fetish === "humiliation" && slave.fetishStrength > 60) {
							text.push(`${touch} ${Master}. I love doing it where people can see me.`);
						} else if (slave.fetish === "sadist" && slave.fetishStrength > 60) {
							text.push(`${touch} ${Master}. I try to be nearby when a bitch gets punished so I can masturbate to it.`);
						} else if (slave.fetish === "buttslut" && slave.fetishStrength > 60) {
							text.push(`fuck my own asshole, ${Master}.`);
						} else if (slave.fetish === "boobs" && slave.fetishStrength > 60) {
							text.push(`pamper my own breasts, ${Master}.`);
						} else if (slave.fetish === "pregnancy" && slave.fetishStrength > 60) {
							text.push(`${touch} ${Master}.`);

							if (slave.bellyPreg >= 5000) {
								text.push(`I love feeling my big pregnant belly as I masturbate to it.`);
							} else if (slave.dick > 1 && slave.balls > 0) {
								text.push(`I love picturing my cock getting all the hot girls pregnant.`);
							} else {
								text.push(`I love imagining how I'd look with a tummy swollen with babies.`);
							}
						} else if (slave.fetish === "cumslut" && slave.fetishStrength > 60) {
							text.push(`${touch} ${Master}.`);

							if (slave.dick > 0 && slave.balls > 0) {
								text.push(`Being able to drink my own cum is really fun too.`);
							} else if (slave.dietCum === 1 || slave.dietCum === 2 ) {
								text.push(`I love having cum in my food, being able to masturbate right after eating cum is so satisfying.`);
							}
						} else if (slave.attrKnown === 1 && slave.attrXX > 80 && !canSee(slave)) {
							text.push(`${touch} ${Master}. With all these hot girls around, it's a good thing I can't get any more blind from it.`);
						} else if (slave.attrKnown === 1 && slave.attrXY > 80 && !canSee(slave)) {
							text.push(`${touch} ${Master}. With all these hot cocks around, it's a good thing I can't get any more blind from it.`);
						} else if (slave.attrKnown === 1 && slave.attrXX > 80) {
							text.push(`${touch} ${Master}. With all these hot girls around, it's a good thing I can't actually go blind from it.`);
						} else if (slave.attrKnown === 1 && slave.attrXY > 80) {
							text.push(`${touch} ${Master}. With all these hot cocks around, it's a good thing I can't actually go blind from it.`);
						} else {
							text.push(`${touch} ${Master}.`);
						}
					} else {
						text.push(`${touch} ${Master}.`);
					}
				} else if (slave.rules.release.slaves === 1) {
					text.push(`Thank you for letting`);

					if (slave.fetishKnown === 1) {
						if (slave.energy > 95) {
							text.push(`me fuck everyone,`);
						} else if (slave.fetish === "humiliation" && slave.fetishStrength > 60) {
							text.push(`the other slaves fuck me, I love doing it in the dormitory where they can all see me.`);
						} else if (slave.fetish === "sadist" && slave.fetishStrength > 60) {
							text.push(`me abuse the other slaves,`);
						} else if (slave.fetish === "buttslut" && slave.fetishStrength > 60) {
							text.push(`the other slaves fuck my butthole,`);
						} else if (slave.fetish === "boobs" && slave.fetishStrength > 60) {
							text.push(`the other slaves play with my boobs,`);
						} else if (slave.fetish === "pregnancy" && slave.fetishStrength > 60) {
							if (slave.bellyPreg >= 5000) {
								text.push(`the other slaves fuck me, being pregnant and getting fucked is amazing,`);
							} else if (slave.dick > 1 && slave.balls > 0) {
								text.push(`me fuck other slaves, I cum so hard whenever I imagine filling them with babies,`);
							} else {
								text.push(`the other slaves fuck me, I love imagining how I'd look with a tummy swollen with babies,`);
							}
						} else if (slave.fetish === "cumslut" && slave.fetishStrength > 60) {
							text.push(`other slaves use my mouth to cum.`);

							if (slave.dick > 0 && slave.balls > 0) {
								text.push(`Being able to drink my own cum is really fun too,`);
							} else if (slave.dietCum === 1 || slave.dietCum === 2 ) {
								text.push(`I love having cum in my food, and sometimes I get an extra load on top from a friend,`);
							}
						} else if (slave.attrKnown === 1 && slave.attrXX > 80) {
							text.push(`me bone the ladies,`);
						} else {
							text.push(`me get off with the other girls,`);
						}
					} else {
						text.push(`me get off with the other girls,`);
					}

					text.push(`${Master}.`);
				} else if (App.Utils.hasFamilySex(slave)) {
					text.push(`Thank you for letting`);

					if (slave.fetishKnown === 1) {
						if (slave.energy > 95) {
							text.push(`me fuck my family,`);
						} else if (slave.fetish === "humiliation" && slave.fetishStrength > 60) {
							text.push(`my family fuck me, I love doing it in the dormitory where everyone can see us.`);
						} else if (slave.fetish === "sadist" && slave.fetishStrength > 60) {
							text.push(`me abuse my family,`);
						} else if (slave.fetish === "buttslut" && slave.fetishStrength > 60) {
							text.push(`my family fuck my butthole,`);
						} else if (slave.fetish === "boobs" && slave.fetishStrength > 60) {
							text.push(`my family play with my boobs,`);
						} else if (slave.fetish === "pregnancy" && slave.fetishStrength > 60) {
							if (slave.bellyPreg >= 5000) {
								text.push(`my family fuck me, being pregnant and getting fucked is amazing,`);
							} else if (slave.dick > 1 && slave.balls > 0) {
								text.push(`me fuck my family, I cum so hard whenever I imagine filling them with babies,`);
							} else {
								text.push(`my family fuck me, I love imagining how I'd look with a tummy swollen with babies,`);
							}
						} else if (slave.fetish === "cumslut" && slave.fetishStrength > 60) {
							text.push(`my family use my mouth to cum.`);

							if (slave.dick > 0 && slave.balls > 0) {
								text.push(`Being able to drink my own cum is really fun too,`);
							} else if (slave.dietCum === 1 || slave.dietCum === 2 ) {
								text.push(`I love having cum in my food, and sometimes I get an extra load on top from a relative,`);
							}
						} else if (slave.attrKnown === 1 && slave.attrXX > 80) {
							text.push(`me bone the ladies in my family,`);
						} else {
							text.push(`me get off with the other girls in my family,`);
						}
					} else {
						text.push(`me get off with the other girls in my family,`);
					}

					text.push(`${Master}.`);
				} else {
					if (slave.fetishKnown === 1) {
						if (slave.energy > 95) {
							text.push(`I feel like I'm going crazy, ${Master}, I'm so horny.`);
						} else if (slave.fetishStrength > 60) {
							switch (slave.fetish) {
								case "submissive":
									text.push(`I'm so horny, ${Master}. I can't stop thinking about you holding me down and fucking me.`);
									break;
								case "masochist":
									text.push(`I'm so horny, ${Master}. I can't stop thinking about you spanking my worthless bottom.`);
									break;
								case "humiliation":
									text.push(`I'm so horny, ${Master}. I can't stop thinking about everyone staring at my lewd body.`);
									break;
								case "dom":
									text.push(`I'm so horny, ${Master}. I can't stop thinking about the other slaves, how it would feel to fuck them.`);
									break;
								case "sadist":
									text.push(`I'm so horny, ${Master}. I can't stop thinking about the other slaves, how it would feel to hurt them.`);
									break;
								case "cumslut":
									text.push(`I'm so horny, ${Master}. I can't stop staring at`);
									if (V.PC.dick !== 0) {
										text.push(`cocks and imagining them down my throat, cumming and cumming.`);
									} else {
										text.push(`pussies and imagining how their juices`);
										if (canTaste(slave)) {
											text.push(`taste.`);
										} else {
											text.push(`feel on my skin.`);
										}
									}
									break;
								case "buttslut":
									text.push(`I'm so horny, ${Master}.`);
									if (plugWidth(slave) === 1 && slave.anus > 2) {
										text.push(`I wear the buttplug you gave me, but it is so small... It reminds me of being fucked in the ass, but I can barely feel it. It drives me crazy.`);
									} else if (
										(plugWidth(slave) === 1 && slave.anus < 3) ||
												(plugWidth(slave) === 2 && slave.anus === 3) ||
												(plugWidth(slave) === 3 && slave.anus >= 4)
									) {
										text.push(`Thank you for the buttplug. It is really fun to have my ass filled all day long.`);
									} else if (
										(plugWidth(slave) === 2 && slave.anus < 3) ||
												(plugWidth(slave) > 2 && slave.anus < 4)
									) {
										text.push(`I like it up the ass, but the plug you make me wear is too big. It really hurts. Not in the good way.`);
									} else {
										text.push(`My anus is killing me, all I want to do is touch it and massage it and fill it.`);
									}
									break;
								case "boobs":
									text.push(`I'm so horny, ${Master}. I want to rub my nipples against everything.`);
									break;
								case "pregnancy":
									text.push(`I wish I could${touch} ${Master}. I can't get these thoughts of`);

									if (slave.preg < 30) {
										text.push(`pregnancy`);
									} else {
										text.push(`birth`);
									}

									text.push(`out of my head.`);
									break;
							}
						} else if (slave.attrKnown === 1 && slave.attrXX > 80) {
							text.push(`I'm so horny, ${Master}. I can't stop thinking about the other slaves' beautiful pussies and boobs and, and I want to fuck them so bad.`);
						} else {
							text.push(`I haven't been touching myself, ${Master}, just like you said, but I'm really horny.`);
						}
					} else {
						text.push(`I haven't been touching myself, ${Master}, just like you said, but I'm really horny.`);
					}
				}
			}

			return text.join(' ');
		}

		function favoritePCBodyPart() {
			const text = [];

			if (slave.fetishKnown === 1) {
				if (slave.energy > 95) {
					text.push(`${Spoken(slave, `I love your`)}`);

					if (V.PC.dick !== 0) {
						if (canDoAnal(slave) && canDoVaginal(slave)) {
							if (slave.vagina === 0) {
								if (V.PC.vagina !== -1) {
									text.push(`${Spoken(slave, `body, ${Master},"`)} ${he} ${say}s eagerly. ${Spoken(slave, `"I can't wait to have you in me, and your pussy is so delicious.`)}`);
								} else {
									text.push(`${Spoken(slave, `cock, ${Master},"`)} ${he} ${say}s eagerly. ${Spoken(slave, `"I can't wait to have you in me.`)}`);
								}
							} else {
								if (V.PC.vagina !== -1) {
									text.push(`${Spoken(slave, `body, ${Master},"`)} ${he} ${say}s eagerly. ${Spoken(slave, `"I love your cock in my holes, and your pussy is so delicious.`)}`);
								} else {
									text.push(`${Spoken(slave, `cock, ${Master},"`)} ${he} ${say}s eagerly. ${Spoken(slave, `"I love it inside my holes.`)}`);
								}
							}
						} else {
							if (V.PC.vagina !== -1) {
								text.push(`${Spoken(slave, `body, ${Master},"`)} ${he} ${say}s eagerly. ${Spoken(slave, `"I just need you inside me, and your pussy is so delicious.`)}`);
							} else {
								text.push(`${Spoken(slave, `cock, ${Master},"`)} ${he} ${say}s eagerly. ${Spoken(slave, `"I just need you inside me.`)}`);
							}
						}
					} else {
						text.push(`${Spoken(slave, `pussy, ${Master},"`)} ${he} ${say}s eagerly. ${Spoken(slave, `"I can just imagine your clit against my tongue.`)}`);
					}
				} else if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishStrength > 60) {
					if (V.PC.boobs < 300) {
						text.push(`Your strong arms feels so good when you hold me down.`);
					} else {
						if (V.PC.boobs >= 1000) {
							text.push(`${Spoken(slave, `The weight of your boobs on my back feels so good when you pin me down.`)}`);
						} else {
							text.push(`${Spoken(slave, `Your tits feel so good on my back when you pin me down.`)}`);
						}
					}
				} else if (slave.fetish === "cumslut" && slave.fetishStrength > 60) {
					if (V.PC.balls !== 0) {
						text.push(`${Spoken(slave, `Your cum is incredible, ${Master}. I would drink every drop of it, if I could.`)}`);
						if (V.PC.scrotum > 0) {
							text.push(`${Spoken(slave, `Your`)}`);

							if (V.PC.balls >= 14) {
								text.push(`${Spoken(slave, `massive`)}`);
							} else if (V.PC.balls >= 9) {
								text.push(`${Spoken(slave, `huge`)}`);
							} else {
								text.push(`${Spoken(slave, `big`)}`);
							}

							text.push(`${Spoken(slave, `balls are amazing; I want to be under your cock kissing and kneading whenever`)}`);

							if (canSee(slave)) {
								text.push(`${Spoken(slave, `I see you.`)}`);
							} else {
								text.push(`${Spoken(slave, `I'm near you.`)}`);
							}
						}

						if (V.PC.vagina === 1) {
							text.push(`${Spoken(slave, `Oh, I love your femcum, too!`)}`);
						}
					}
				} else if (slave.fetish === "humiliation" && slave.fetishStrength > 60) {
					if (V.PC.dick !== 0) {
						text.push(`${Spoken(slave, `I love, uh."`)} ${He} looks down, hesitating. ${Spoken(slave, `"I love your cock, ${Master}.`)}`);

						if (V.PC.vagina !== -1) {
							text.push(`${Spoken(slave, `Um, and your vagina, too.`)}`);
						}
					}
				} else if (slave.fetish === "buttslut" && slave.fetishStrength > 60) {
					if (V.PC.dick !== 0) {
						text.push(`${Spoken(slave, `I love your cock, ${Master},"`)} ${he} ${say}s eagerly. ${Spoken(slave, `"I${(slave.anus === 0 || !canDoAnal(slave)) ? `'d` : ``} love it in my backdoor.`)}`);
					}
				} else if (slave.fetish === "pregnancy" && slave.fetishStrength > 60) {
					if (V.PC.belly >= 10000) {
						text.push(`${Spoken(slave, `You, uh."`)} ${He} looks down, hesitating. ${Spoken(slave, `"Your belly is so big and wonderful, I just want to feel it,`)}`);
					} else if (V.PC.belly >= 5000) {
						text.push(`${Spoken(slave, `You, uh."`)} ${He} looks down, hesitating. ${Spoken(slave, `"You have a really lovely belly,`)}`);
					} else if (V.PC.boobs >= 300) {
						text.push(`${Spoken(slave, `You, uh."`)} ${He} looks down, hesitating. ${Spoken(slave, `"You have really nice breasts,`)}`);
					} else if (V.PC.dick !== 0 && V.PC.scrotum > 0) {
						text.push(`${Spoken(slave, `You, uh."`)} ${He} looks down, hesitating. ${Spoken(slave, `"You have really nice balls,`)}`);
					} else if (V.PC.dick !== 0) {
						text.push(`${Spoken(slave, `You, uh."`)} ${He} looks down, hesitating. ${Spoken(slave, `"You have a lovely cock,`)}`);
					} else {
						text.push(`${Spoken(slave, `You, um."`)} ${He} looks down, hesitating. ${Spoken(slave, `"You would make a lovely mother,`)}`);
					}
					text.push(`${Spoken(slave, `${Master}.`)}`);
				} else if (slave.fetish === "boobs" && slave.fetishStrength > 60) {
					if (V.PC.boobs >= 1400) {
						text.push(`${Spoken(slave, `Your breasts are giant, ${Master},"`)} ${he} ${say}s eagerly. ${Spoken(slave, `"I just want to bury my face in them.`)}`);
					} else if (V.PC.boobs >= 1200) {
						text.push(`${Spoken(slave, `Your breasts are huge, ${Master},"`)} ${he} ${say}s eagerly. ${Spoken(slave, `"I love them.`)}`);
					} else if (V.PC.boobs >= 1000) {
						text.push(`${Spoken(slave, `Your breasts are so big and lovely, ${Master},"`)} ${he} ${say}s eagerly. ${Spoken(slave, `"I love them.`)}`);
					} else if (V.PC.boobs >= 800) {
						text.push(`${Spoken(slave, `Your breasts are incredible, ${Master},"`)} ${he} ${say}s eagerly. ${Spoken(slave, `"I love them.`)}`);
					} else if (V.PC.boobs >= 300) {
						text.push(`${Spoken(slave, `Your breasts are so cute, ${Master},"`)} ${he} ${say}s eagerly. ${Spoken(slave, `"I just want to squeeze them.`)}`);
					}
				} else if (slave.attrKnown === 1 && slave.attrXX > 80) {
					if (V.PC.boobs >= 300) {
						text.push(`${Spoken(slave, `You're, uh."`)} ${He} looks down, hesitating. ${Spoken(slave, `"You're really hot, ${Master}.`)}`);
					}
				} else if (slave.attrKnown === 1 && slave.attrXY > 80) {
					if (V.PC.dick !== 0) {
						text.push(`${Spoken(slave, `Your, uh."`)} ${He} looks down, hesitating. ${Spoken(slave, `"Your cock is really hot, ${Master}.`)}`);
					}
				} else {
					text.push(`${Spoken(slave, `You're, uh."`)} ${He} looks down, hesitating. ${Spoken(slave, `"You're really`)}`);

					if (V.PC.title === 1) {
						text.push(`${Spoken(slave, `handsome,`)}`);
					} else {
						text.push(`${Spoken(slave, `pretty,`)}`);
					}

					text.push(`${Spoken(slave, `${Master}.`)}`);
				}
			}

			return text.join(' ');
		}

		function fantasies() {
			const text = [];

			if (slave.dick > 0) {
				if (slave.balls === 0) {
					if (slave.fetishKnown === 1) {
						if (slave.energy > 95) {
							text.push(`${Spoken(slave, `I like being gelded."`)} ${He} giggles. ${Spoken(slave, `"I don't have to be hard to get fucked!`)}`);
						} else if (slave.fetishStrength > 60) {
							switch (slave.fetish) {
								case "submissive":
									text.push(`${Spoken(slave, `I don't mind being clipped. I like belong on the bottom.`)}`);
									break;
								case "masochist":
									text.push(`${Spoken(slave, `Being gelded," ${he} shivers, "hurts sometimes. Makes people want to hurt you. I like it.`)}`);
									break;
								case "humiliation":
									text.push(`${Spoken(slave, `I don't mind being clipped." ${He} shivers. "Everyone knows! It's so embarrassing.`)}`);
									break;
								case "dom":
									text.push(`${Spoken(slave, `I sometimes miss my balls. It's harder to be dominant without them.`)}`);
									break;
								case "sadist":
									text.push(`${Spoken(slave, `I sometimes miss my balls. I still fantasize about raping the other girls.`)}`);
									break;
								case "pregnancy":
									text.push(`${Spoken(slave, `I sometimes miss my balls. I still fantasize about getting the other girls pregnant.`)}`);
									break;
								case "cumslut":
									text.push(`${Spoken(slave, `I barely cum without my balls. I miss, you know, cleaning up after myself. With my mouth.`)}`);
									break;
								case "buttslut":
									text.push(`${Spoken(slave, `I really like being clipped. I think it's less distracting, you know, from my butthole.`)}`);

									if (slave.prostate > 0) {
										text.push(`${Spoken(slave, `And I still have my prostate which is what matters.`)}`);
									}
									break;
								case "boobs":
									text.push(`${Spoken(slave, `I don't mind being clipped. Between that and my boobs I feel like a nice little slave ${girl}.`)}`);
									break;
							}
						} else if (slave.attrKnown === 1 && slave.attrXX > 80) {
							text.push(`${Spoken(slave, `I sometimes miss my balls. I still fantasize about boning the other girls.`)}`);
						} else {
							if (slave.devotion > 75) {
								text.push(`${Spoken(slave, `I love being your gelded slave ${girl}, ${Master}.`)}`);
							} else {
								text.push(`${Spoken(slave, `To be honest, ${Master}, I do miss having balls, sometimes.`)}`);
							}
						}
					} else {
						if (slave.devotion > 75) {
							text.push(`${Spoken(slave, `I love being your gelded slave ${girl}, ${Master}.`)}`);
						} else {
							text.push(`${Spoken(slave, `To be honest, ${Master}, I do miss having balls, sometimes.`)}`);
						}
					}
				} else if (slave.hormoneBalance >= 200) {
					if (slave.fetishKnown === 1) {
						if (slave.energy > 95) {
							text.push(`${Spoken(slave, `I sometimes wish I could still get hard."`)} ${He} looks pensive. ${Spoken(slave, `"Actually, I don't really care, getting fucked is nice too.`)}`);
						} else if (slave.fetishStrength > 60) {
							switch (slave.fetish) {
								case "submissive":
									text.push(`${Spoken(slave, `I don't mind the hormones keeping me soft. I like getting fucked, anyway.`)}`);
									break;
								case "masochist":
									text.push(`${Spoken(slave, `I don't mind the hormones keeping me soft. I think it encourages people to treat me like I deserve.`)}`);
									break;
								case "humiliation":
									text.push(`${Spoken(slave, `I don't mind being impotent." ${He} shivers. "Everyone knows! It's so embarrassing.`)}`);
									break;
								case "dom":
									text.push(`${Spoken(slave, `I wish the hormones didn't stop me from getting hard. It's tough to be dominant when I'm all soft.`)}`);
									break;
								case "sadist":
									text.push(`${Spoken(slave, `I wish the hormones didn't stop me from getting hard. I still fantasize about raping the other girls.`)}`);
									break;
								case "cumslut":
									text.push(`${Spoken(slave, `I cum a lot less on these hormones. I miss, you know, cleaning up after myself. With my mouth.`)}`);
									break;
								case "buttslut":
									text.push(`${Spoken(slave, `I don't mind the hormones keeping me soft. I prefer taking it, anyway." ${He} turns and sticks ${his} ass out. "Up the butt.`)}`);
									break;
								case "boobs":
									text.push(`${Spoken(slave, `I don't mind the hormones keeping me soft. Between that and my boobs I feel like a cute slave girl.`)}`);
									break;
								case "pregnancy":
									text.push(`${Spoken(slave, `I wish the hormones didn't stop me from getting hard. I still fantasize about getting the other girls pregnant.`)}`);
									break;
							}
						} else if (slave.attrKnown === 1 && slave.attrXX > 80) {
							text.push(`${Spoken(slave, `I wish the hormones didn't stop me from getting hard. I still fantasize about boning the other girls.`)}`);
						} else {
							if (slave.devotion > 75) {
								text.push(`${Spoken(slave, `I love you, ${Master}, so I don't mind how the hormones I'm on keep me soft, if that's how you want me.`)}`);
							} else {
								text.push(`${Spoken(slave, `I sometimes wish the hormones I'm on would let me get hard.`)}`);
							}
						}
					} else {
						if (slave.devotion > 75) {
							text.push(`${Spoken(slave, `I love you, ${Master}, so I don't mind how the hormones I'm on keep me soft, if that's how you want me.`)}`);
						} else {
							text.push(`${Spoken(slave, `I sometimes wish the hormones I'm on would let me get hard.`)}`);
						}
					}
				}
			} else if (slave.pubertyXX === 0 && (slave.ovaries === 1 || slave.mpreg === 1)) {
				if (slave.fetishKnown === 1) {
					if (slave.fetish === "pregnancy" && slave.fetishStrength > 60) {
						text.push(`${Spoken(slave, `I fantasize about my belly getting heavy with pregnancy and my only wish is that you never let one of my eggs go to waste.`)}`);
					}
				}
			} else if (slave.mpreg === 1) {
				if (slave.fetishKnown === 1) {
					if (slave.fetish === "pregnancy" && slave.fetishStrength > 0) {
						text.push(`${Spoken(slave, `I fantasize about my belly getting heavy with pregnancy, and I'm so glad you made me able to get pregnant!`)}`);

						if (slave.preg === -1) {
							text.push(`${Spoken(slave, `Now if only someone were to forget to give me my contraceptives before we got to doing it...`)}`);
						}
					}
				}
			} else if (slave.preg === -1) {
				if (slave.fetishKnown === 1) {
					if (slave.fetish === "pregnancy" && slave.fetishStrength > 60) {
						text.push(`${Spoken(slave, `I fantasize about my belly getting heavy with pregnancy, but I know it won't happen while I'm on contraceptives.`)}`);
					}
				}
			}

			return text.join(' ');
		}

		function hormones() {
			if (Math.abs(slave.hormoneBalance) >= 200) {
				if (slave.physicalAge > 35) {
					if (slave.devotion > 50) {
						if (slave.energy > 40) {
							return `${Spoken(slave, `On all these hormones I'm almost going through puberty all over again. Kind of a surprise at my age." ${He} grins suggestively. "I'll do my best to fuck like a teenager, ${Master}.`)}`;
						}
					}
				}
			}
		}

		function curatives() {
			if (slave.curatives > 1 || slave.inflationType === "curative") {
				if (slave.inflationType === "curative") {
					if (slave.health.condition < 0) {
						return `${Spoken(slave, `I don't feel good, but I can almost feel the curatives fixing me, even if the belly is a little uncomfortable. Thank you, ${Master}.`)}`;
					} else if (slave.physicalAge > 35) {
						return `${Spoken(slave, `I can almost feel the curatives working. They make me feel like a young, pregnant ${girl}! Thank you, ${Master}.`)}`;
					} else {
						return `${Spoken(slave, `I can almost feel the curatives working. They're pretty incredible, even if the belly is a little uncomfortable. Thank you, ${Master}.`)}`;
					}
				} else {
					if (slave.health.condition < 0) {
						return `${Spoken(slave, `I don't feel good, but I can almost feel the curatives fixing me. Thank you, ${Master}.`)}`;
					} else if (slave.physicalAge > 35) {
						return `${Spoken(slave, `I can almost feel the curatives working. They make me feel so young! Thank you, ${Master}.`)}`;
					} else {
						return `${Spoken(slave, `I can almost feel the curatives working. They're pretty incredible. Thank you, ${Master}.`)}`;
					}
				}
			}
		}

		function inflation() {
			const text = [];

			if (slave.inflationType === "aphrodisiac") {
				text.push(`${Spoken(slave, `This belly is so hot! I feel so hot... You just have to fuck me ${Master}! I need a dick in me, please!`)}`);
			}

			if (slave.inflationType === "tightener") {
				text.push(`${Spoken(slave, `I can practically feel my butt getting tighter. This is great, I'll be like new soon. Thank you, ${Master}.`)}`);
			}

			if (slave.inflation > 0) {
				let fluid;

				if (SlaveStatsChecker.checkForLisp(slave)) {
					fluid = lispReplace(slave.inflationType);
				} else {
					fluid = slave.inflationType;
				}

				if (slave.behavioralFlaw === "gluttonous" && ["food", "milk"].includes(fluid) && [1, 3].includes(slave.inflationMethod) && slave.fetish === "humiliation" && slave.fetishStrength > 60) {
					if (slave.bellyFluid >= 10000) {
						text.push(`${Spoken(slave, `My belly hurts a bit, but it's worth it to let everybody know what a disgraceful, gluttonous pig I am.`)}`);
					} else if (slave.bellyFluid >= 5000) {
						text.push(`${Spoken(slave, `I can't believe I get to gorge myself silly on ${fluid} and show it off! Thank you, ${Master}.`)}`);
					} else if (slave.bellyFluid >= 2000) {
						text.push(`${Spoken(slave, `This ${fluid} is delicious, but wouldn't it be hot if your little piggy had an even bigger belly for people to stare at?`)}`);
					}
				} else if (slave.behavioralFlaw === "gluttonous" && ["food", "milk"].includes(fluid) && [1, 3].includes(slave.inflationMethod)) {
					if (slave.bellyFluid >= 10000 && slave.fetish === "masochist" && slave.fetishStrength > 60) {
						text.push(`${Spoken(slave, `This ${fluid} is so tasty, and my belly hurts so good... I wish I really could stuff myself to bursting.`)}`);
					} else if (slave.bellyFluid >= 10000) {
						text.push(`${Spoken(slave, `My belly hurts a little, but it feels so good to gorge myself...`)}`);
					} else if (slave.bellyFluid >= 5000) {
						text.push(`${Spoken(slave, `I can't believe I get to stuff myself like this! Thank you, ${Master}.`)}`);
					} else if (slave.bellyFluid >= 2000) {
						text.push(`${Spoken(slave, `Thank you for letting me have so much delicious ${fluid}, ${Master}.`)}`);
					}
				} else if (slave.sexualFlaw === "cum addict" && fluid === "cum" && [1, 3].includes(slave.inflationMethod)) {
					if (slave.bellyFluid >= 10000 && slave.fetish === "masochist" && slave.fetishStrength > 60) {
						text.push(`${Spoken(slave, `I'm so full of tasty cum it hurts, ${Master}. I think this is what heaven feels like...`)}`);
					} else if (slave.bellyFluid >= 10000) {
						text.push(`${Spoken(slave, `It hurts a little, but I feel so complete being so full of hot, delicious cum.`)}`);
					} else if (slave.bellyFluid >= 5000) {
						text.push(`${Spoken(slave, `Being able to drink all this wonderful hot cum all the time is like a dream come true, ${Master}.`)}`);
					} else if (slave.bellyFluid >= 2000) {
						text.push(`${Spoken(slave, `Thank you for letting me have so much delicious cum, ${Master}.`)}`);
					}
				} else if (slave.sexualFlaw === "cum addict" && fluid === "cum" && slave.inflationMethod === 2) {
					if (slave.bellyFluid >= 10000 && slave.fetish === "masochist" && slave.fetishStrength > 60) {
						text.push(`${Spoken(slave, `It feels like I'm bursting with cum, ${Master}. It's wonderful, even if I can't taste it.`)}`);
					} else if (slave.bellyFluid >= 10000) {
						text.push(`${Spoken(slave, `It hurts a little, but I feel so complete being so full of cum. I just wish I could taste it...`)}`);
					} else if (slave.bellyFluid >= 5000) {
						text.push(`${Spoken(slave, `I love being so full of hot cum, ${Master}. I'd be even happier if I could taste it.`)}`);
					} else if (slave.bellyFluid >= 2000) {
						text.push(`${Spoken(slave, `This cum is nice and warm inside me, ${Master}, I'd love to have some more. Maybe I could drink it next time...`)}`);
					}
				} else if (slave.fetish === "humiliation" && slave.fetishStrength > 60) {
					if (slave.bellyFluid >= 2000) {
						text.push(`${Spoken(slave, `This bloated gut is so disgraceful...`)}`);
						if (slave.bellyFluid >= 10000) {
							text.push(`${Spoken(slave, `It hurts a little, but`)}`);
						}
						text.push(`${Spoken(slave, `I love the way people stare at it.`)}`);
					}
				} else {
					if (slave.bellyFluid >= 10000 && slave.fetish === "masochist" && slave.fetishStrength > 60) {
						text.push(`${Spoken(slave, `My guts are so full, ${Master}, it hurts so good...`)}`);
					} else if (slave.bellyFluid >= 10000) {
						text.push(`${Spoken(slave, `I feel really full, can I let the ${fluid} out now?`)}`);
					} else if (slave.bellyFluid >= 5000) {
						text.push(`${Spoken(slave, `I feel so full, can I let the ${fluid} out now?`)}`);
					} else if (slave.bellyFluid >= 2000) {
						text.push(`${Spoken(slave, `I feel so uncomfortable, can I let the ${fluid} out now?`)}`);
					}
				}
			}

			return text.join(' ');
		}

		function diet() {
			const text = [];

			switch (slave.diet) {
				case "fertility":
					text.push(`${Spoken(slave, `My stomach feels tingly, especially when I think of dicks, but that's normal, right?`)}`);

					if (V.PC.dick > 0) {
						text.push(`${Spoken(slave, `Oh! It's happening now! I bet we both know why...`)}`);
					}
					break;
				case "cum production":
					text.push(`${Spoken(slave, `My loads have been bigger lately. That diet must be having an effect on me.`)}`);
					break;
				case "cleansing":
					text.push(`${Spoken(slave, `I'm feeling really good, ${Master}, the diet must be working.`)}`);

					if (canTaste(slave)) {
						text.push(`${Spoken(slave, `It really tastes horrible, though...`)}`);
					}
					break;
			}
			if (slave.geneMods.livestock === 1) {
				text.push(`Ah! You heard my stomach rumble just now, didn't you? I've been so hungry lately, I'm not sure why.`);
				if (canGetPregnant(slave)) {
					text.push(`Am I pregnant?`);
				}
			}

			return text.join(' ');
		}

		function drugs() {
			const text = [];

			switch (slave.drugs) {
				case "intensive penis enhancement":
					if (slave.dick > 0) {
						if (slave.balls === 0) {
							text.push(`${Spoken(slave, `I can feel my dick growing, ${Master}, but it's still so soft. I guess it'll just flop around more when I get buttfucked.`)}`);
						} else if (slave.fetishKnown === 1) {
							if (slave.fetish === "sadist" && slave.fetishStrength > 60) {
								text.push(`${Spoken(slave, `I can feel my dick growing, ${Master}. I can just imagine pushing it into some poor struggling girl's asshole.`)}`);
							} else if (slave.fetish === "dom" && slave.fetishStrength > 60) {
								text.push(`${Spoken(slave, `I can feel my dick growing, ${Master}. I can just imagine pushing it into some little slut's face.`)}`);
							} else if (slave.attrKnown === 1 && slave.attrXX > 80) {
								text.push(`${Spoken(slave, `I can feel my dick growing, ${Master}. I can just imagine pushing it into a warm, wet pussy.`)}`);
							} else {
								text.push(`${Spoken(slave, `I can almost feel my dick growing, ${Master}. It's kind of uncomfortable.`)}`);
							}
						} else {
							text.push(`${Spoken(slave, `I can almost feel my dick growing, ${Master}. It's kind of uncomfortable.`)}`);
						}
					} else {
						if (slave.fetishKnown === 1) {
							if (slave.fetish === "sadist" && slave.fetishStrength > 60) {
								text.push(`${Spoken(slave, `I can feel my clit growing, ${Master}. I can just imagine pushing it into some poor struggling girl's asshole.`)}`);
							} else if (slave.fetish === "dom" && slave.fetishStrength > 60) {
								text.push(`${Spoken(slave, `I can feel my clit growing, ${Master}. I can just imagine pushing it into some little slut's face.`)}`);
							} else if (slave.attrKnown === 1 && slave.attrXX > 80) {
								text.push(`${Spoken(slave, `I can feel my clit growing, ${Master}. I can just imagine pushing it into a warm, wet pussy.`)}`);
							} else {
								text.push(`${Spoken(slave, `I can almost feel my clit growing, ${Master}. It's kind of uncomfortable.`)}`);
							}
						} else {
							text.push(`${Spoken(slave, `I can almost feel my clit growing, ${Master}. It's kind of uncomfortable.`)}`);
						}
					}
					break;
				case "hyper penis enhancement":
					if (slave.dick > 0) {
						if (slave.balls === 0) {
							text.push(`${Spoken(slave, `I can feel my dick growing, ${Master}, but it's still so soft. I guess it'll just flop around more when you buttfuck me, until it touches the floor, that is.`)}`);
						} else if (slave.fetishKnown === 1) {
							if (slave.fetish === "sadist" && slave.fetishStrength > 60) {
								text.push(`${Spoken(slave, `I can feel my dick growing, ${Master}. I can just imagine pushing it into some poor struggling girl's asshole and having it swell more and more in them.`)}`);
							} else if (slave.fetish === "dom" && slave.fetishStrength > 60) {
								text.push(`${Spoken(slave, `I can feel my dick growing, ${Master}. I can just imagine pinning some poor little slut to the floor with it.`)}`);
							} else if (slave.attrKnown === 1 && slave.attrXX > 80) {
								text.push(`${Spoken(slave, `I can feel my dick growing, ${Master}. I can just imagine shoving it into a warm, wet pussy.`)}`);
							} else {
								text.push(`${Spoken(slave, `I can feel my dick growing, ${Master}. It's kind of painful.`)}`);
							}
						} else {
							text.push(`${Spoken(slave, `I can feel my dick growing, ${Master}. It's kind of painful.`)}`);
						}
					} else {
						if (slave.fetishKnown === 1) {
							if (slave.fetish === "sadist" && slave.fetishStrength > 60) {
								text.push(`${Spoken(slave, `I can feel my clit growing, ${Master}. I can just imagine pushing it into some poor struggling girl's asshole and having it swell more and more in them.`)}`);
							} else if (slave.fetish === "dom" && slave.fetishStrength > 60) {
								text.push(`${Spoken(slave, `I can feel my clit growing, ${Master}. I can just imagine plugging some slut's face with it.`)}`);
							} else if (slave.attrKnown === 1 && slave.attrXX > 80) {
								text.push(`${Spoken(slave, `I can feel my clit growing, ${Master}. I can just imagine shoving it into a warm, wet pussy.`)}`);
							} else {
								text.push(`${Spoken(slave, `I can almost feel my clit growing, ${Master}. It's kind of painful.`)}`);
							}
						} else {
							text.push(`${Spoken(slave, `I can almost feel my clit growing, ${Master}. It's kind of painful.`)}`);
						}
					}
					break;
				case "intensive testicle enhancement":
					text.push(`${Spoken(slave, `My balls feel incredibly full, ${Master}. They're really uncomfortable.`)}`);
					if (
						slave.fetishKnown === 1 &&
							(slave.fetish === "dom" || slave.fetish === "sadist") &&
							slave.fetishStrength > 60
					) {
						text.push(`${Spoken(slave, `But I can't wait to force a bitch to take the whole load.`)}`);
					} else if (slave.fetishKnown === 1 && slave.fetish === "pregnancy" && slave.fetishStrength > 60) {
						text.push(`${Spoken(slave, `I feel like I could fill a girl's womb with cum with one orgasm.`)}`);
					} else {
						text.push(`${Spoken(slave, `I really need to cum. After we finish talking, would you please, please fuck me so I can cum? I can barely stand it.`)}`);
					}
					break;
				case "hyper testicle enhancement":
					text.push(`${Spoken(slave, `My balls feel so incredibly full, ${Master}. They're really painful.`)}`);
					if (
						slave.fetishKnown === 1 &&
							(slave.fetish === "dom" || slave.fetish === "sadist") &&
							slave.fetishStrength > 60
					) {
						text.push(`${Spoken(slave, `But I can't wait to fill a bitch with my load. Bet they'll look pregnant when I'm done.`)}`);
					} else if (slave.fetishKnown === 1 && slave.fetish === "pregnancy" && slave.fetishStrength > 60) {
						text.push(`${Spoken(slave, `I feel like I could fertilize all of a girl's eggs with my cum.`)}`);
					} else {
						text.push(`${Spoken(slave, `I really need to cum. After I finish, would you please, please fuck me? I can barely stand it.`)}`);
					}
					break;
				case "intensive breast injections":
					if (slave.fetishKnown === 1 && (slave.fetish === "boobs" || slave.energy > 95)) {
						text.push(`${Spoken(slave, `I can almost feel my boobs swelling, ${Master}. Thank you for injecting them with hormones, and please, never stop.`)}`);
					} else {
						text.push(`${Spoken(slave, `I can almost feel my boobs swelling, ${Master}. It's kind of uncomfortable.`)}`);
					}
					break;
				case "hyper breast injections":
					if (slave.fetishKnown === 1) {
						if (slave.fetish === "boobs" || slave.energy > 95) {
							text.push(`${Spoken(slave, `I can feel my boobs swelling, ${Master}. Thank you for injecting them with hormones, and please, never stop.`)}`);
						} else {
							text.push(`${Spoken(slave, `I can feel my boobs swelling, ${Master}. It's kind of painful.`)}`);
						}
					} else {
						text.push(`${Spoken(slave, `I can feel my boobs swelling, ${Master}. It's kind of painful.`)}`);
					}
					break;
				case "intensive butt injections":
					if (slave.fetishKnown === 1 && (slave.fetish === "buttslut" || slave.energy > 95)) {
						text.push(`${Spoken(slave, `I can almost feel my butt growing, ${Master}. I can't wait to feel a dick sliding up in between my buttocks.`)}`);
					} else {
						text.push(`${Spoken(slave, `I can almost feel my butt growing, ${Master}. It's kind of uncomfortable.`)}`);
					}
					break;
				case "hyper butt injections":
					if (slave.fetishKnown === 1) {
						if (slave.fetish === "buttslut" || slave.energy > 95) {
							text.push(`${Spoken(slave, `I can feel my butt growing, ${Master}. I can't wait for a dick to get lost in between my buttocks.`)}`);
						} else {
							text.push(`${Spoken(slave, `I can feel my butt growing, ${Master}. It's kind of painful.`)}`);
						}
					} else {
						text.push(`${Spoken(slave, `I can feel my butt growing, ${Master}. It's kind of painful.`)}`);
					}
					break;
				case "lip injections":
					if (slave.fetishKnown === 1 && (slave.fetish === "cumslut" || slave.energy > 95)) {
						text.push(`${Spoken(slave, `I can almost feel my lips swelling, ${Master}. I can't wait to wrap them around a cock.`)}`);
					} else {
						text.push(`${Spoken(slave, `I can almost feel my lips swelling, ${Master}. It's kind of uncomfortable.`)}`);
					}
					break;
				case "fertility drugs":
					if (isFertile(slave)) {
						text.push(`${Spoken(slave, `I feel like I need to have a baby, ${Master}, like right now.`)}`);
						if (slave.fetishKnown === 1 && slave.fetishStrength > 60) {
							switch (slave.fetish) {
								case Fetish.SUBMISSIVE:
									text.push(`${Spoken(slave, `I can't wait for someone to pin me down and fuck me pregnant.`)}`);
									break;
								case Fetish.DOM:
									text.push(`${Spoken(slave, `Makes me want to pin down a cute little`)}`);
									if (V.seeDicks !== 0) {
										text.push(`${Spoken(slave, `dickslave`)}`);
									} else {
										text.push(`${Spoken(slave, `citizen`)}`);
									}
									text.push(`${Spoken(slave, `and claim their sperm.`)}`);
									break;
								case Fetish.BOOBS:
									text.push(`${Spoken(slave, `A big round belly would be the perfect complement to a pair of juicy, leaking mommy milkers, right?`)}`);
									break;
								case Fetish.BUTTSLUT:
									if (slave.mpreg > 0) {
										text.push(`${Spoken(slave, `It's still hard to believe my luck that I can get knocked up back there! How about it, ${Master}?`)}`);
									} else {
										text.push(`${Spoken(slave, `Shame my asshole can't get knocked up, though.`)}`);
									}
									break;
								case Fetish.CUMSLUT:
									text.push(`${Spoken(slave, `I just can't stop thinking about thick, warm, potent jizz — more than usual, I mean.`)}`);
									break;
								case Fetish.HUMILIATION:
									text.push(`${Spoken(slave, `I keep daydreaming about getting knocked up in public.`)}`);
									break;
								case Fetish.MASOCHIST:
									text.push(`${Spoken(slave, `It would be so fucking hot to get raped hard and thrown away with a brat in me.`)}`);
									break;
								case Fetish.SADIST:
									text.push(`${Spoken(slave, `Makes me want to find a tender pair of balls and <span class="note">squeeze</span> all the cum out into me.`)}`);
									break;
								case Fetish.PREGNANCY:
									text.push(`${Spoken(slave, `I can't wait till my belly gets big enough to hold me down.`)}`);
									break;
							}
						} else {
							text.push(`${Spoken(slave, `These will get me pregnant, right?`)}`);
						}
					}
					break;
				case "super fertility drugs":
					if (isFertile(slave)) {
						text.push(`${Spoken(slave, `My womb feels so full, ${Master}, I need to be fertilized!`)}`);
						if (slave.fetishKnown === 1 && slave.fetishStrength > 60) {
							switch (slave.fetish) {
								case Fetish.SUBMISSIVE:
									text.push(`${Spoken(slave, `I can't wait to be pinned to the floor by my life-swollen belly.`)}`);
									break;
								case Fetish.DOM:
									text.push(`${Spoken(slave, `I can't wait till my belly is huge enough to really demand worship.`)}`);
									break;
								case Fetish.BOOBS:
									text.push(`${Spoken(slave, `I can't wait till my tits blow up into two milk fountains on top of my belly.`)}`);
									break;
								case Fetish.BUTTSLUT:
									if (slave.mpreg > 0) {
										text.push(`${Spoken(slave, `I can't wait to feel my ass stretching around all the babies it'll be popping out.`)}`);
									} else {
										text.push(`${Spoken(slave, `I can't believe I'm saying this, but my pussy wants dick right now more than my asshole does.`)}`);
									}
									break;
								case Fetish.CUMSLUT:
									text.push(`${Spoken(slave, `I can't wait to really push my limits and find out how much cum my ${slave.mpreg > 0 ? `ass` : ``}pussy can hold in.`)}`);
									break;
								case Fetish.HUMILIATION:
									text.push(`${Spoken(slave, `I can't wait until everyone instantly knows what a horny slut I am as soon as they see the size of my belly.`)}`);
									break;
								case Fetish.MASOCHIST:
									text.push(`${Spoken(slave, `I can almost feel how my belly would stretch and strain around a whole litter of kids... let me taste that pain, ${Master}, please.`)}`);
									break;
								case Fetish.SADIST:
									text.push(`${Spoken(slave, `I can't wait to try crushing people under the weight of my belly.`)}`);
									break;
								case Fetish.PREGNANCY:
									text.push(`${Spoken(slave, `I can't wait till my belly swells as big as me.`)}`);
									break;
							}
						} else {
							text.push(`${Spoken(slave, `These will get me pregnant, right? Like, so pregnant I won't be able to stand in the end?`)}`);
						}
					}
					break;
				case "psychostimulants":
					text.push(`${Spoken(slave, `My thoughts are so sharp ${Master}, I feel like I'm actually getting smarter.`)}`);
					break;
				case "anti-aging cream":
					if (slave.visualAge+20 < slave.actualAge) {
						text.push(`${Spoken(slave, `I look so young, ${Master}, I can barely recognize myself anymore.`)}`);
					} else {
						text.push(`${Spoken(slave, `I can practically feel the years peeling off me, ${Master}.`)}`);
					}
					break;
				case "sag-B-gone":
					if (slave.fetishKnown === 1) {
						if (slave.fetish === "boobs" || slave.energy > 95) {
							text.push(`${Spoken(slave, `I love all the breast massages, but I don't think the cream is doing anything. They look the same as always, not that that means I want you to stop, ${Master}!`)}`);
						} else {
							text.push(`${Spoken(slave, `I think you might have been ripped off on this sag cream, ${Master}; my breasts don't feel any different.`)}`);
						}
					} else {
						text.push(`${Spoken(slave, `I think you might have been ripped off on this sag cream, ${Master}; my breasts don't feel any different.`)}`);
					}
			}

			return text.join(' ');
		}

		function assignment() {
			const text = [];

			switch (slave.assignment) {
				case Job.WHORE:
				case Job.BROTHEL:
					if (slave.fetishKnown === 1) {
						if (slave.energy > 95) {
							text.push(`${Spoken(slave, `It's great being a whore. I can't imagine being satisfied doing anything else.`)}`);
						} else if (slave.fetishStrength > 60) {
							switch (slave.fetish) {
								case "submissive":
									text.push(`${Spoken(slave, `It's nice being a whore; I get treated like I deserve.`)}`);
									break;
								case "dom":
									text.push(`${Spoken(slave, `Being a whore is okay, sometimes somebody wants to be dommed.`)}`);
									break;
								case "sadist":
									text.push(`${Spoken(slave, `Being a whore is okay, sometimes somebody wants me to hurt one of their slaves for them.`)}`);
									break;
								case "masochist":
									text.push(`${Spoken(slave, `It's nice being a whore; I get hurt like I deserve.`)}`);
									break;
								case "cumslut":
									text.push(`${Spoken(slave, `It's great being a whore. If I was still free, I would fantasize about getting to suck this many dicks.`)}`);
									break;
								case "humiliation":
									text.push(`${Spoken(slave, `It's great being a whore; the shame keeps me really horny.`)}`);
									break;
								case "buttslut":
									text.push(`${Spoken(slave, `It's great being a whore. If I was still free, I would fantasize about taking this much anal.`)}`);
									break;
								case "boobs":
									text.push(`${Spoken(slave, `It's nice being a whore; sometimes customers just play with my boobs for hours.`)}`);
									break;
								case "pregnancy":
									if (slave.belly >= 5000) {
										text.push(`${Spoken(slave, `It's nice being a whore; sometimes customers just play with my belly for hours.`)}`);
									} else if (isFertile(slave)) {
										text.push(`${Spoken(slave, `It's great being a whore; I'm going to get pregnant and there's nothing I can do to stop it.`)}`);
									} else if (slave.preg > slave.pregData.normalBirth/4) {
										text.push(`${Spoken(slave, `It's great being a pregnant whore; I get to watch my belly swell as I get fucked. Every week it gets a little bigger.`)}`);
									} else if (slave.pregKnown === 1) {
										text.push(`${Spoken(slave, `Being a whore is okay, but it will be great once my belly gets bigger.`)}`);
									} else if (slave.preg > 0) {
										text.push(`${Spoken(slave, `Being a whore is okay, I just wish I'd get knocked up already.`)}`);
									} else {
										text.push(`${Spoken(slave, `Being a whore is okay, sometimes I can pretend I can get pregnant.`)}`);
									}
							}
						} else if (slave.attrKnown === 1 && slave.attrXY > 60) {
							text.push(`${Spoken(slave, `It's nice being a whore; I get fucked by a lot of hot guys.`)}`);
						} else if (slave.attrKnown === 1 && slave.attrXX > 60) {
							text.push(`${Spoken(slave, `It's okay being a whore; I get female customers sometimes.`)}`);
						}
					}
					break;
				case Job.PUBLIC:
				case Job.CLUB:
					if (slave.fetishKnown === 1) {
						if (slave.energy > 95) {
							text.push(`${Spoken(slave, `It's great being a public slut. I can't imagine being satisfied doing anything else.`)}`);
						} else if (slave.fetishStrength > 60) {
							switch (slave.fetish) {
								case "submissive":
									text.push(`${Spoken(slave, `It's nice being a public slut, I get treated like I deserve.`)}`);
									break;
								case "dom":
									text.push(`${Spoken(slave, `Being a public slut is okay, sometimes somebody wants to be dommed.`)}`);
									break;
								case "sadist":
									text.push(`${Spoken(slave, `Being a public slut is okay, sometimes somebody wants me to hurt one of their slaves for them.`)}`);
									break;
								case "masochist":
									text.push(`${Spoken(slave, `It's nice being a public slut, I get hurt like I deserve.`)}`);
									break;
								case "cumslut":
									text.push(`${Spoken(slave, `It's great being a public slut. If I was still free, I would fantasize about getting to suck this many dicks.`)}`);
									break;
								case "humiliation":
									text.push(`${Spoken(slave, `It's great being a public slut, the shame keeps me really horny.`)}`);
									break;
								case "buttslut":
									text.push(`${Spoken(slave, `It's great being a public slut. If I was still free, I would fantasize about taking this much anal.`)}`);
									break;
								case "boobs":
									text.push(`${Spoken(slave, `It's nice being a public slut, sometimes citizens just play with my boobs for hours.`)}`);
									break;
								case "pregnancy":
									if (slave.belly >= 5000) {
										text.push(`${Spoken(slave, `It's nice being a public slut, sometimes citizens just play with my belly for hours.`)}`);
									} else if (isFertile(slave)) {
										text.push(`${Spoken(slave, `It's great being a public slut, I'm going to get pregnant and there's nothing I can do to stop it.`)}`);
									} else if (slave.preg > slave.pregData.normalBirth/4) {
										text.push(`${Spoken(slave, `It's great being a pregnant public slut, I get to show off my belly all the time.`)}`);
									} else if (slave.pregKnown === 1) {
										text.push(`${Spoken(slave, `Being a public slut is okay, but it will be great once my belly gets bigger.`)}`);
									} else if (slave.preg > 0) {
										text.push(`${Spoken(slave, `Being a public slut is okay, I just wish I'd get knocked up already.`)}`);
									} else {
										text.push(`${Spoken(slave, `Being a public slut is okay, sometimes I can pretend I can get pregnant.`)}`);
									}
							}
						} else if (slave.attrKnown === 1 && slave.attrXY > 60) {
							text.push(`${Spoken(slave, `It's nice being a public slut, I get fucked by a lot of hot guys.`)}`);
						} else if (slave.attrKnown === 1 && slave.attrXX > 60) {
							text.push(`${Spoken(slave, `It's okay being a public slut; I get female citizens sometimes.`)}`);
						}
					}
					break;
				case Job.MILKED:
				case Job.DAIRY:
					if (slave.balls === 0) {
						if (slave.fetishKnown === 1) {
							if (slave.energy > 95) {
								text.push(`${Spoken(slave, `It's pretty nice, being milked.`)}`);
							} else if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishStrength > 60) {
								text.push(`${Spoken(slave, `It's nice being milked, I get treated like I deserve.`)}`);
							} else if (slave.fetish === "boobs" && slave.fetishStrength > 60) {
								text.push(`${Spoken(slave, `It's so, so wonderful being milked.`)}`);
							} else if (slave.attrKnown === 1 && slave.attrXX > 80) {
								text.push(`${Spoken(slave, `It's okay being milked, with all the girls and boobs around.`)}`);
							} else {
								text.push(`${Spoken(slave, `Being milked is hard work.`)}`);
							}
						}
					} else {
						if (slave.fetishKnown === 1) {
							if (slave.fetish === "buttslut" || slave.energy > 95) {
								text.push(`${Spoken(slave, `Getting buttfucked to orgasm whenever I can get hard is a dream come true. Actually, getting buttfucked until I cum`)}`);
								if (slave.prostate > 0) {
									text.push(`${Spoken(slave, `even when I'm soft`)}`);
								}
								text.push(`${Spoken(slave, `is pretty nice too.`)}`);
							} else if (slave.attrKnown === 1 && slave.attrXY > 80) {
								text.push(`${Spoken(slave, `It's okay getting cockmilked, I like all the dicks around.`)}`);
							} else {
								text.push(`${Spoken(slave, `It's surprisingly hard work, coming all day.`)}`);
							}
						}
					}
					break;
				case Job.FARMYARD:
					// TODO: expand this with devotion, trust, etc
					if (V.farmyardShows === 0) {
						text.push(Spoken(slave, `Working the fields is a hard job, ${Master}, but I know we need the food to survive.`));
					} else if (V.farmyardShows === 1) {
						text.push(Spoken(slave, `Working the fields is a hard job, ${Master}, especially after ${V.seeBestiality ? `fucking animals` : `putting on shows with animals`} for hours on end.`));
					} else if (V.farmyardShows === 2) {
						text.push(Spoken(slave, `I love that ${V.seeBestiality ? `fucking your animals` : `putting on shows with your animals`} is my only job.`));
					}
					break;
				case Job.FUCKTOY:
				case Job.MASTERSUITE:
				case Job.CONCUBINE:
					if (slave.fetishKnown === 1) {
						if (slave.toyHole === "mouth" && (slave.fetish === "cumslut" && slave.fetishStrength > 60 && V.PC.dick !== 0)) {
							text.push(`${Spoken(slave, `I love sucking your cock every`)}`);
							if (V.PC.balls >= 14) {
								text.push(`${Spoken(slave, `day, and I love every opportunity I get to worship your balls; they're so huge and make so much cum and I just want to spend my life kissing your balls and sucking your cock, and live off your cum...`)}`);
							} else if (V.PC.balls >= 9) {
								text.push(`${Spoken(slave, `day, and I love worshipping your massive balls.`)}`);
								if (hasAnyArms(slave)) {
									text.push(`${Spoken(slave, `Your balls are so big that one testicle fills my hand; I even cum without touching myself so I can properly serve you.`)}`);
								} else {
									text.push(`${Spoken(slave, `Feeling you rest your balls on my face in between facefucks is heaven for me.`)}`);
								}
							} else if (V.PC.balls >= 5) {
								text.push(`${Spoken(slave, `day, and I love pleasuring your big balls too. They're the perfect size to fill my mouth as I suck on them, and I love feeling them tense against my chin when you shoot cum down my throat.`)}`);
							} else if (V.PC.scrotum > 0) {
								text.push(`${Spoken(slave, `day, and I love playing with your balls too.`)}`);
							} else {
								text.push(`${Spoken(slave, `day.`)}`);
							}
						} else if (slave.toyHole !== "dick") {
							if (slave.energy > 95 && V.PC.dick !== 0) {
								text.push(`${Spoken(slave, `I love how taking your cock is my only job${fuckSlavesLength() > 0 ? `, and I love having your other toys to have sex with too` : ``}.`)}`);
							} else {
								text.push(`${Spoken(slave, `It's nice being your ${girl}.`)}`);
							}
						} else {
							if (slave.energy > 95 && V.PC.vagina !== -1) {
								text.push(`${Spoken(slave, `I love how fucking your`)}`);
								if (V.PC.vagina !== -1) {
									text.push(`${Spoken(slave, `pussy`)}`);
								} else {
									text.push(`${Spoken(slave, `ass`)}`);
								}
								text.push(`${Spoken(slave, `is my only job, and I'm so happy you trust me enough to cum inside you.`)}`);
							} else {
								text.push(`${Spoken(slave, `I like letting you use my cock as your toy, and I'm happy you trust me enough to cum with you.`)}`);
							}
						}
					}
					break;
				case Job.REST:
				case Job.SPA:
					text.push(`${Spoken(slave, `Thank you for letting me rest.`)}`);
					break;
				case Job.NURSERY:
					text.push(`${Spoken(slave, `I love taking care of the babies. I hope I get to`)}`);
					if (canSee(slave)) {
						text.push(`${Spoken(slave, `see`)}`);
					} else {
						text.push(`${Spoken(slave, `have`)}`);
					}
					text.push(`${Spoken(slave, `them grow up to into good slaves for you.`)}`);
					break;
				default:
					text.push(`${Spoken(slave, `Being a sex slave is hard work.`)}`);
			}

			return text.join(' ');
		}

		function skills() {
			const text = [];

			if ((adjustedPenSkill(slave, true)) >= 100 && canPenetrate(slave)) {
				text.push(`${Spoken(slave, `I'm really proud of how good I am putting my dick to use; it's a little surprising how many people want it.`)}`);
			} else if ((slave.skill.oral + slave.skill.anal) >= 120 && slave.vagina === -1) {
				text.push(`${Spoken(slave, `I'm really proud of my sex skills; it's nice to be good at what you do. Without a cunt my poor`)}`);
				if (slave.anus > 2) {
					text.push(`${Spoken(slave, `asspussy`)}`);
				} else if (slave.anus === 2) {
					text.push(`${Spoken(slave, `butthole`)}`);
				} else {
					text.push(`${Spoken(slave, `little anus`)}`);
				}
				text.push(`${Spoken(slave, `does double duty, but I can take it.`)}`);
			} else if ((slave.skill.oral + slave.skill.vaginal + slave.skill.anal + adjustedPenSkill(slave, true)) >= 180) {
				text.push(`${Spoken(slave, `I'm really proud of my sex skills; it's nice to be good at what you do.`)}`);
			} else if (slave.skill.whoring >= 100) {
				text.push(`${Spoken(slave, `I'm really proud of my whoring skills; prostitution is a job I know I can do well.`)}`);
			} else if (slave.skill.entertainment >= 100) {
				text.push(`${Spoken(slave, `I'm really proud of my skills; I feel like I can make anyone want me.`)}`);
			} else if (slave.skill.anal >= 100) {
				if (slave.vagina === -1) {
					text.push(`${Spoken(slave, `I'm really proud of my anal skills; I can take a dick as well as anyone.`)}`);
				} else {
					text.push(`${Spoken(slave, `I'm really proud of my anal skills; it's fun having three fuckholes.`)}`);
				}
			} else if (slave.skill.anal <= 30 && slave.anus > 0) {
				text.push(`${Spoken(slave, `I wish I were better at anal; if I could learn to relax getting buttfucked wouldn't hurt so much.`)}`);
			} else if (slave.skill.vaginal <= 30 && slave.vagina > 0) {
				text.push(`${Spoken(slave, `I wish I were better at sex; sometimes all I can think to do is just lie there.`)}`);
			} else if (slave.skill.penetrative <= 10 && canPenetrate(slave) && slave.counter.penetrative > 0) {
				text.push(`${Spoken(slave, `I wish I were better at sex; I got made fun of last time over how awkward I was getting it in.`)}`);
			} else if (slave.skill.oral <= 30) {
				if (slave.counter.oral > 0) {
					text.push(`${Spoken(slave, `I wish I were better at blowjobs; it would be nice not to gag so much.`)}`);
				} else {
					text.push(`${Spoken(slave, `I wish I knew more about giving head; I feel like I'll have no idea what I'm doing when I get the chance.`)}`);
				}
			}

			return text.join(' ');
		}

		function relationships() {
			const text = [];

			if (slave.relationship > 0) {
				const partner = getSlave(slave.relationshipTarget);
				const {
					He: He2, His: His2,
					he: he2, his: his2, him: him2, daughter: daughter2, mother: mother2,
				} = getPronouns(partner);
				const milf2 = ((V.diversePronouns === 1) && (partner.pronoun === App.Data.Pronouns.Kind.male)) ? `DILF` : `MILF`;

				let partnerName;

				if (partner) {
					if (lisps) {
						partnerName = lispReplace(partner.slaveName);
					} else {
						partnerName = partner.slaveName;
					}
				} else {
					text.push(`${Spoken(slave, `<span class="red">Error, relationshipTarget not found.</span>`)}`);
				}
				if (slave.relationship <= 2) {
					text.push(`${Spoken(slave, `I really like`)}`);
					if (canSee(slave)) {
						text.push(`${Spoken(slave, `seeing`)}`);
					} else {
						text.push(`${Spoken(slave, `hanging out with`)}`);
					}
					text.push(Spoken(slave, `${partnerName} every day, ${he2}'s a good friend.`));
					if (partner.face > 40) {
						text.push(text.pop() + `"`);
						text.push(`${He} blushes. ${Spoken(slave, `"${He2}'s kind of hot, too.`)}`);
					}
				} else if (slave.relationship <= 3) {
					text.push(`${Spoken(slave, `I really like`)}`);
					if (canSee(slave)) {
						text.push(`${Spoken(slave, `seeing`)}`);
					} else {
						text.push(`${Spoken(slave, `hanging out with`)}`);
					}
					text.push(`${Spoken(slave, `${partnerName} every day, ${he2}'s a good friend —" ${He} blushes. "— even when we're not fucking.`)}`);
				} else if (slave.relationship <= 4) {
					text.push(`${Spoken(slave, `I really love ${partnerName}." ${He} blushes. "Thank you for letting us be together, ${Master}.`)}`);
				} else {
					text.push(`${Spoken(slave, `I'm so happy with ${partnerName}." ${He} blushes. "Thank you for ${him2}, ${Master}.`)}`);
				}
				if (slave.relationship >= 3) {
					if (slave.mother === partner.ID) {
						text.push(`${Spoken(slave, `"I — I'm fucking my mother,"`)} ${he} bursts out, blushing even harder. ${Spoken(slave, `"It's so fucking wrong, but ${he2}'s such a hot MILF, I can't stop.`)}`);
					} else if (slave.father === partner.ID) {
						text.push(`${Spoken(slave, `I — I'm fucking my father,"`)} ${he} bursts out, blushing even harder. ${Spoken(slave, `"It's so fucking wrong, but ${he2} knows so much about penetration, I can't stop.`)}`);
					} else if (partner.mother === slave.ID) {
						text.push(`${Spoken(slave, `I — I'm fucking my ${daughter2},"`)} ${he} bursts out, blushing even harder. ${Spoken(slave, `"It's so fucking wrong, but ${he2} has such a hot little body, I can't stop.`)}`);
					} else if (partner.father === slave.ID) {
						text.push(`${Spoken(slave, `I — I'm fucking my ${daughter2},"`)} ${he} bursts out, blushing even harder. ${Spoken(slave, `"It's so fucking wrong, but ${he2} has such a hot little body. ${He2} looks so much like ${his2} mother, I can't stop.`)}`);
					} else if (areSisters(slave, partner) > 0) {
						const sibling = siblingTerm(slave, partner);
						text.push(`${Spoken(slave, `I — I'm fucking my ${sibling},"`)} ${he} bursts out, blushing even harder. ${Spoken(slave, `"It's so fucking wrong, but ${he2}'s so hot, I can't stop.`)}`);
					} else if (areCousins(slave, partner)) {
						text.push(`${Spoken(slave, `I — I'm fucking my cousin,"`)} ${he} bursts out, blushing even harder. ${Spoken(slave, `"It's so fucking wrong, but ${he2}'s so hot, I can't stop.`)}`);
					} else if (isAunt(slave, partner)) {
						const aunt = relativeTerm(slave, partner);
						text.push(`${Spoken(slave, `I — I'm fucking my ${aunt},"`)} ${he} bursts out, blushing even harder. ${Spoken(slave, `"It's so fucking wrong, but ${he2}'s so hot, I can't stop.`)}`);
					} else if (isAunt(partner, slave)) {
						const niece = relativeTerm(slave, partner);
						text.push(`${Spoken(slave, `I — I'm fucking my ${niece},"`)} ${he} bursts out, blushing even harder. ${Spoken(slave, `"It's so fucking wrong, but ${he2} has such a hot little body, I can't stop.`)}`);
					} else if ((slave.actualAge + 14) < partner.actualAge) {
						text.push(`${Spoken(slave, `${He2}'s old enough to be my ${mother2}."`)} ${He} looks down, blushing a little harder. ${Spoken(slave, `"But I'm lucky, ${he2}'s such a hot ${milf2}.`)}`);
					} else if ((slave.actualAge - 14) > partner.actualAge) {
						text.push(`${Spoken(slave, `${He2}'s young enough to be my ${daughter2}."`)} ${He} looks down, blushing a little harder. ${Spoken(slave, `"But I love ${his2} hot young body.`)}`);
					}
					if ((slave.actualAge - 5) > partner.actualAge && partner.actualAge < 13) {
						text.push(`${Spoken(slave, `${He2}'s very immature at times, of course, but ${he2} has so much energy!`)}`);
					} else if ((slave.actualAge - 5) > partner.actualAge && partner.actualAge < 20) {
						text.push(`${Spoken(slave, `${He2}'s a little immature at times, but having sex with a teenager is so awesome, it's worth it.`)}`);
					}
					if (hasAnyProstheticLimbs(partner)) {
						const sex = getLimbCount(partner, 103);
						const beauty = getLimbCount(partner, 104);
						const combat = getLimbCount(partner, 105);
						if (sex > 0 && beauty > 0 && combat > 0) {
							text.push(`${Spoken(slave, `${His2} P-Limbs do look cool and I like how strong they can make ${him2} but they scare me a little, sometimes. Though of course ${he2} disables the weapons when we're together."`)} ${He} giggles. ${Spoken(slave, `"${He2} has vibe fingers, so that's awesome.`)}`);
						} else if (sex > 0 && beauty > 0) {
							text.push(`${Spoken(slave, `I really like ${his2} P-Limbs. They're very pretty, but kind of cold. That's just how ${he2} is."`)} ${He} giggles. ${Spoken(slave, `" ${He2} has vibe fingers. So that's awesome.`)}`);
						} else if (beauty > 0 && combat > 0) {
							text.push(`${Spoken(slave, `${His2} P-Limbs do look cool and I like how strong they can make ${him2} but they scare me a little, sometimes. Though of course ${he2} disables the weapons when we're together.`)}`);
						} else if (sex > 0 && combat > 0) {
							text.push(`${Spoken(slave, `${His2} P-Limbs do scare me a little, sometimes. Though of course ${he2} disables the weapons when we're together."`)} ${He} giggles. ${Spoken(slave, `"${He2} has vibe fingers. So that's awesome.`)}`);
						} else if (sex > 0) {
							text.push(`${Spoken(slave, `And, um."`)} ${He} giggles. ${Spoken(slave, `"${He2} has vibe fingers. So that's awesome.`)}`);
						} else if (beauty > 0) {
							text.push(`${Spoken(slave, `I really like ${his2} P-Limbs. They're very pretty, but kind of cold. That's just how ${he2} is.`)}`);
						} else if (combat > 0) {
							text.push(`${Spoken(slave, `${His2} P-Limbs do scare me a little, sometimes. Though of course ${he2} disables the weapons when we're together."`)} ${He} giggles. ${Spoken(slave, `"Though I did get ${him2} to extend ${his2} blades once, so I could kiss them for luck.`)}`);
						} else {
							text.push(`${Spoken(slave, `I really do like ${his2} P-Limbs. They're a little awkward, and kind of cold, but that's just how ${he2} is.`)}`);
						}
					} else if (getLimbCount(partner, 0) > 0) {
						text.push(`${Spoken(slave, `${He2}'s an amputee, of course, so that's a little sad.`)}`);
					}
				}
			} else if (slave.relationship === -3) {
				if (slave.devotion+slave.trust >= 175) {
					text.push(`${Spoken(slave, `Of course, I'm your ${wife}, ${Master}."`)} ${He} laughs. ${Spoken(slave, `"Not exactly traditional married life, but I'll do my best to help redefine it.`)}`);
				} else if (slave.devotion < -20 && slave.trust > 20) {
					text.push(`${Spoken(slave, `Of course, I'm your ${wife}, ${Master}." `)} ${He} sighs. ${Spoken(slave, `"Any other questions?`)}`);
				} else if (slave.devotion < -20) {
					text.push(`${Spoken(slave, `I'm your ${wife},`)}`);

					if (slave.rudeTitle === 1) {
						text.push(`${Spoken(slave, `${PoliteRudeTitle(slave)},"`)}`);
					} else {
						text.push(`${Spoken(slave, `${Master},"`)}`);
					}

					text.push(`${he} ${say}s, ${his} voice wavering. ${Spoken(slave, `"Please let me go...`)}`);
				} else {
					text.push(`${Spoken(slave, `Of course, I'm your ${wife}, ${Master},"`)} ${he} ${say}s. ${Spoken(slave, `"It isn't so bad, I'm starting to like it.`)}`);
				}
			} else if (slave.relationship === -2) {
				text.push(`${Spoken(slave, `I'm good friends with some of the other slaves,"`)}`);

				if (!canTalk(slave)) {
					text.push(`${he} gestures`);
				} else {
					text.push(`${he} mutters`);
				}

				text.push(`hesitantly, looking suddenly embarrassed. ${Spoken(slave, `"I really like you, though, ${Master}. Like, <span class="note">like</span> you, like you."`)} ${He} clears ${his} throat`);

				if (!canTalk(slave)) {
					text.push(`silently and pointlessly`);
				} else {
					text.push(`nervously`);
				}

				text.push(`before hurrying on to safer subjects. ${Spoken(slave, `"Yeah.`)}`);
			} else if (slave.relationship === -1) {
				text.push(`${Spoken(slave, `As far as relationships go, ${Master},"`)} ${he} laughs, ${Spoken(slave, `"I'm such a fucking slut. It's so liberating, not having to worry about any of that crap anymore.`)}`);
			}

			return text.join(' ');
		}

		function FS() {
			const text = [];

			if (FutureSocieties.HighestDecoration() >= 60) {
				if (slave.devotion > 75) {
					text.push(`${Spoken(slave, `I'll do everything I can to support your vision for the future.`)}`);
				} else if (slave.devotion > 50) {
					text.push(`${Spoken(slave, `I do my best to support your vision for the future.`)}`);
				} else {
					text.push(`${Spoken(slave, `I try to conform to your vision for the future.`)}`);
				}

				if (V.arcologies[0].FSRomanRevivalist >= 10) {
					if (slave.intelligence+slave.intelligenceImplant > 50) {
						text.push(`${Spoken(slave, `The new Rome is fascinating, ${Master}. I'm glad to be a part of it.`)}`);
					} else if (slave.devotion > 20) {
						text.push(`${Spoken(slave, `I'm proud to be a slave in the new Rome.`)}`);
					} else {
						text.push(`${Spoken(slave, `Being a slave in the new Rome is a little scary, ${Master}. I hear slaves fighting sometimes.`)}`);
					}
				}
				if (V.arcologies[0].FSNeoImperialist >= 10) {
					if (slave.intelligence+slave.intelligenceImplant > 50) {
						text.push(`${Spoken(slave, `This new Empire is strange, but fascinating, ${Master}. It feels like I'm part of history in the making.`)}`);
					} else if (slave.devotion > 20) {
						text.push(`${Spoken(slave, `I am proud to serve your Empire, ${Master}.`)}`);
					} else {
						text.push(`${Spoken(slave, `I don't know about this new Empire, ${Master}... being property is one thing, but being a serf is something else entirely.`)}`);
					}
				}
				if (V.arcologies[0].FSAztecRevivalist >= 10) {
					if (slave.intelligence+slave.intelligenceImplant > 50) {
						text.push(`${Spoken(slave, `The new Aztec Empire is enthralling, ${Master}. I'm amazed at how easily people jump to sacrifice and debauchery when they're offered.`)}`);
					} else if (slave.devotion > 20) {
						text.push(`${Spoken(slave, `I'm proud to serve the will of the gods, and you.`)}`);
					} else {
						text.push(`${Spoken(slave, `Please, don't sacrifice me ${Master}, I'll do anything.`)}`);
					}
				}
				if (V.arcologies[0].FSEgyptianRevivalist >= 10) {
					if (slave.intelligence+slave.intelligenceImplant > 50) {
						text.push(`${Spoken(slave, `This new Egypt is fascinating, ${Master}. I'm glad to be a part of it.`)}`);
					} else if (slave.devotion > 20) {
						text.push(`${Spoken(slave, `I'm proud to be a slave of the new Pharaoh.`)}`);
					} else {
						text.push(`${Spoken(slave, `Being a slave in this new Egypt is a little reassuring. Some of the other slaves say they used to use slaves for great things, anyway.`)}`);
					}
				}
				if (V.arcologies[0].FSAntebellumRevivalist >= 10) {
					if (slave.intelligence+slave.intelligenceImplant > 50) {
						text.push(`${Spoken(slave, `The South was a strange place, but fascinating place, ${Master}. Were slave owners like you really the most important people in society back then?`)}`);
					} else if (slave.devotion > 20) {
						text.push(`${Spoken(slave, `I am proud to serve Dixie, ${Master}.`)}`);
					} else {
						text.push(`${Spoken(slave, `I don't know much about the old South, ${Master}, but didn't they treat ladies with respect?`)}`);
					}
				}
				if (V.arcologies[0].FSChattelReligionist >= 10) {
					if (slave.intelligence+slave.intelligenceImplant > 50) {
						text.push(`${Spoken(slave, `It's interesting, seeing how fast a new faith can take hold.`)}`);
					} else if (slave.fetishKnown === 1 && slave.fetish === "masochist" && slave.fetishStrength > 60) {
						text.push(`${Spoken(slave, `I — I always thought pain was good for me. It's so nice to be told that it's true at last.`)}`);
					} else if (slave.devotion > 20) {
						text.push(`${Spoken(slave, `I'm proud to be a slave, since that's what's right for me.`)}`);
					} else {
						text.push(`${Spoken(slave, `sometimes I have doubts about the new faith, but I do my best to ignore them.`)}`);
					}
				}
				if (V.arcologies[0].FSIntellectualDependency >= 10) {
					if (slave.intelligence+slave.intelligenceImplant > 10) {
						text.push(`${Spoken(slave, `I just wish I could share in simplicity of things.`)}`);
					} else if (slave.intelligence+slave.intelligenceImplant <= -50) {
						text.push(`${Spoken(slave, `It's so nice not having to think for myself anymore.`)}`);
					} else if (slave.energy > 50) {
						text.push(`${Spoken(slave, `I'm so glad that this culture encourages being a horny little slut.`)}`);
					} else {
						text.push(`${Spoken(slave, `I feel out of place here, but I'll try to relax and not overthink things so much.`)}`);
					}
				}
				if (V.arcologies[0].FSDegradationist >= 10) {
					if (slave.fetishKnown === 1 && slave.fetish === Fetish.SUBMISSIVE && slave.fetishStrength > 60) {
						text.push(`${Spoken(slave, `I — I always knew I was a useless bitch, so it's easy to accept being degraded.`)}`);
					} else if (slave.devotion > 20) {
						text.push(`${Spoken(slave, `I'm your worthless little degraded fuckpuppet, ${Master}.`)}`);
					} else {
						text.push(`${Spoken(slave, `I'm trying to accept the degradation, ${Master}.`)}`);
					}
				}
				if (V.arcologies[0].FSSlaveProfessionalism >= 10) {
					if (slave.intelligence+slave.intelligenceImplant > 100) {
						text.push(`${Spoken(slave, `I'm so glad that I can be of such service to you. I never thought slavery could be so intellectually stimulating, I expected so much less.`)}`);
					} else if (slave.intelligence+slave.intelligenceImplant > 10) {
						text.push(`${Spoken(slave, `Sometimes it's tough here, but at least it keeps my wits sharp.`)}`);
					} else {
						text.push(`${Spoken(slave, `I kind of hate it here, ${Master}. Everything's so complicated and people always laugh at me when I need help. You don't think I'm stupid too, do you?`)}`);
					}
				}
				if (V.arcologies[0].FSAssetExpansionist >= 10) {
					if (slave.intelligence+slave.intelligenceImplant > 50) {
						text.push(`${Spoken(slave, `I've been watching all the body dysphoria on display lately; it's certainly novel.`)}`);
					} else if (slave.energy > 95) {
						text.push(`${Spoken(slave, `Thank you so much for supporting this new T&A expansion culture, ${Master}. It's like you made it just for me. So much eye candy!`)}`);
					} else if (slave.boobs > 1000) {
						text.push(`${Spoken(slave, `It's almost strange, being in a place where these tits don't make me stand out.`)}`);
					} else {
						text.push(`${Spoken(slave, `I'm a little worried I don't have the tits for this new expansion culture though.`)}`);
					}
				}
				if (V.arcologies[0].FSTransformationFetishist >= 10) {
					if (slave.intelligence+slave.intelligenceImplant > 50) {
						text.push(`${Spoken(slave, `I'm learning a lot about men, just watching how what's beautiful is changing.`)}`);
					} else if (slave.energy > 95) {
						text.push(`${Spoken(slave, `The arcology is like, a bimbo land now, ${Master}. It's so hot`)}`);
					} else {
						text.push(`${Spoken(slave, `I like getting hotter, ${Master}, but all the surgery is still a little scary.`)}`);
					}
				}
				if (V.arcologies[0].FSGenderRadicalist >= 10) {
					if (slave.intelligence+slave.intelligenceImplant > 50) {
						text.push(`${Spoken(slave, `I suppose it was inevitable that a place where anyone can be a slave would start treating anyone who's a slave as a girl.`)}`);
					} else if (slave.attrKnown === 1 && slave.attrXY > 80) {
						text.push(`${Spoken(slave, `I really like how you're encouraging slavery to focus on cocks."`)} ${He} giggles. ${Spoken(slave, `"I like cocks!`)}`);
					} else if (slave.dick > 0) {
						text.push(`${Spoken(slave, `It isn't always easy being a slave ${girl}, but it's nice being in a place where that's normal.`)}`);
					} else {
						text.push(`${Spoken(slave, `It's kind of nice, being a slave in a place where, you know, anyone can be a slave.`)}`);
					}
				}
				if (V.arcologies[0].FSGenderFundamentalist >= 10) {
					if (slave.intelligence+slave.intelligenceImplant > 50) {
						text.push(`${Spoken(slave, `I shouldn't be surprised at how easy it is to reinforce traditional values in a new, slavery-focused culture.`)}`);
					} else if (slave.attrKnown === 1 && slave.attrXX > 80) {
						text.push(`${Spoken(slave, `I really like how you're encouraging slavery to focus on girls."`)} ${He} giggles. ${Spoken(slave, `"I like girls!`)}`);
					} else if (slave.dick > 0) {
						text.push(`${Spoken(slave, `I know I'm not a perfect fit for your vision of the future, but I'll do my best to be a good girl.`)}`);
					} else {
						text.push(`${Spoken(slave, `I'm relieved I fit into your vision of the future of slavery.`)}`);
					}
				}
				if (V.arcologies[0].FSRepopulationFocus >= 10) {
					if (slave.intelligence+slave.intelligenceImplant > 50) {
						text.push(`${Spoken(slave, `I really hope we can save humanity like this.`)}`);
					} else if (slave.fetishKnown === 1 && slave.fetish === "pregnancy") {
						text.push(`${Spoken(slave, `I really like how you are encouraging girls to get pregnant."`)} ${He} giggles. ${Spoken(slave, `"I really like big, pregnant bellies!`)}`);
					} else if (slave.preg > slave.pregData.normalBirth/4) {
						text.push(`${Spoken(slave, `I'm relieved I fit into your vision of the future. I hope I can give you lots of healthy children.`)}`);
					} else {
						text.push(`${Spoken(slave, `I know I'm not a perfect fit for your vision of the future, but I'll do my best to be a good ${girl}.`)}`);
					}
				}
				if (V.arcologies[0].FSRestart >= 10) {
					if (slave.intelligence+slave.intelligenceImplant > 50) {
						text.push(`${Spoken(slave, `I really hope we can save humanity like this.`)}`);
					} else if (slave.preg < 0 || slave.ovaries === 0) {
						text.push(`${Spoken(slave, `I'm relieved I fit into your vision of the future.`)}`);
					} else {
						text.push(`${Spoken(slave, `I know I'm not a perfect fit for your vision of the future, but I'll do my best to be a good ${girl}.`)}`);
					}
				}
				if (V.arcologies[0].FSPhysicalIdealist >= 10) {
					if (slave.muscles <= 5) {
						text.push(`${Spoken(slave, `I know I'm not a perfect fit for your vision of the future, but I'll do my best to serve everyone who's built.`)}`);
					} else {
						text.push(`${Spoken(slave, `I'm relieved I fit into your vision of the future of the human body.`)}`);
					}
				}
				if (V.arcologies[0].FSHedonisticDecadence >= 10) {
					if (slave.weight < 10 && slave.behavioralFlaw === "anorexic") {
						text.push(`${Spoken(slave, `I want to keep food down for you, but I can't. I'm sorry, I just can't get fat for anyone.`)}`);
					} else if (slave.weight < 10) {
						text.push(`${Spoken(slave, `I know I'm not a perfect fit for your vision of the future, but I'll do my best to eat more and get fatter for you.`)}`);
					} else {
						text.push(`${Spoken(slave, `I'm relieved I fit into your vision of the future of the human body. Can I have some more food now? I'm hungry.`)}`);
					}
				}
				if (V.arcologies[0].FSPetiteAdmiration >= 10) {
					if (!heightPass(slave)) {
						if (V.arcologies[0].FSPetiteAdmirationLaw === 0) {
							text.push(`${Spoken(slave, `I know I stand out in a bad way from all the other slaves thanks to my height, but I'll do my best to put it to good use for my betters.`)}`);
						} else {
							text.push(`${Spoken(slave, `I know I'm too tall to be considered hot here, but I swear I'll try even harder to keep up.`)}`);
						}
					} else {
						text.push(`${Spoken(slave, `I'm glad I fit in with all the other slaves. It's a relief to not be singled out for my height.`)}`);
					}
				}
				if (V.arcologies[0].FSStatuesqueGlorification >= 10) {
					if (!heightPass(slave)) {
						if (V.arcologies[0].FSStatuesqueGlorificationLaw === 0) {
							text.push(`${Spoken(slave, `I know I'm too short to be paid any attention to, but I'll still try my hardest to keep up with my betters.`)}`);
						} else {
							text.push(`${Spoken(slave, `I know I'm too short to be considered attractive here, but I swear I'll do my best to measure up.`)}`);
						}
					} else {
						text.push(`${Spoken(slave, `I'm glad I fit in with everyone. It's a relief to not be mocked for being short.`)}`);
					}
				}
				if (V.arcologies[0].FSSubjugationist >= 10) {
					if (slave.race === V.arcologies[0].FSSubjugationistRace) {
						text.push(`${Spoken(slave, `I know that as ${addA(V.arcologies[0].FSSubjugationistRace)} slave, it's my proper place to serve.`)}`);
					} else {
						text.push(`${Spoken(slave, `since I'm not ${addA(V.arcologies[0].FSSubjugationistRace)} slave, I'm a little afraid I don't fit into your vision of the future.`)}`);
					}
				}
				if (V.arcologies[0].FSSupremacist >= 10) {
					if (slave.race !== V.arcologies[0].FSSupremacistRace) {
						text.push(`${Spoken(slave, `I know that it's my proper place to serve my ${V.arcologies[0].FSSupremacistRace} betters.`)}`);
					} else {
						text.push(`${Spoken(slave, `I know that ${V.arcologies[0].FSSupremacistRace} slaves are rare now, so I'll do my best to bring credit to the ${V.arcologies[0].FSSupremacistRace} race.`)}`);
					}
				}
				if (V.arcologies[0].FSPaternalist >= 10) {
					text.push(`${Spoken(slave, `I'm so lucky to be a slave here. The future looks better all the time.`)}`);
				}
				if (V.arcologies[0].FSBodyPurist >= 10) {
					if (slave.boobsImplant > 0) {
						text.push(`${Spoken(slave, `I know I'm not a perfect fit for your vision of the future, since my tits are ugly and fake.`)}`);
					} else {
						text.push(`${Spoken(slave, `I'm relieved my boobs won't need implants here.`)}`);
					}
				}
				if (V.arcologies[0].FSSlimnessEnthusiast >= 10) {
					if (slave.weight > 30) {
						text.push(`${Spoken(slave, `I know I'm an ugly fat slut. I wish I were slim.`)}`);
					} else if (slave.belly >= 1500 && FutureSocieties.isActive('FSRepopulationFocus') && V.propOutcome === 0 && slave.breedingMark === 0) {
						text.push(`${Spoken(slave, `I know I'm an ugly fat slut. I wish my belly wasn't so big.`)}`);
					} else if (slave.butt > 3) {
						text.push(`${Spoken(slave, `I know I'm an ugly, fat-assed slut. I wish it was smaller.`)}`);
					} else if (slave.boobs > 500) {
						text.push(`${Spoken(slave, `I know I'm an ugly, big-boobed slut. I wish my chest was smaller.`)}`);
					} else {
						text.push(`${Spoken(slave, `It's nice, living in a place where I don't need big boobs to be pretty.`)}`);
					}
				}
				if (V.arcologies[0].FSMaturityPreferentialist >= 10) {
					if (slave.actualAge < 30) {
						text.push(`${Spoken(slave, `I know I'm just a young bitch. I try to be good to my elders.`)}`);
					} else {
						text.push(`${Spoken(slave, `It's nice, living in a place that appreciates an older lady.`)}`);
					}
				}
				if (V.arcologies[0].FSYouthPreferentialist >= 10) {
					if (slave.actualAge < 30) {
						text.push(`${Spoken(slave, `It's nice, being young here.`)}`);
					} else {
						text.push(`${Spoken(slave, `I know I'm just an old bitch. I try to serve younger and better slaves well.`)}`);
					}
				}
				if (V.arcologies[0].FSPastoralist >= 10) {
					if (slave.lactation > 0 && slave.balls > 0) {
						text.push(`${Spoken(slave, `I'll do my best to make as much milk and cum for the arcology as I can.`)}`);
					} else if (slave.lactation > 0) {
						text.push(`${Spoken(slave, `I'll do my best to make as much milk for the arcology as I can.`)}`);
					} else if (slave.dick > 0 && slave.balls > 0) {
						text.push(`${Spoken(slave, `I'll do my best to make as much cum for the arcology as I can.`)}`);
					} else {
						text.push(`${Spoken(slave, `I wish I could make milk for the arcology.`)}`);
					}
				}
			}

			return text.join(' ');
		}

		function devotion() {
			const text = [];

			if (slave.devotion > 75) {
				if (slave.tankBaby > 0 || isParentP(slave, V.PC) || (areSisters(slave, V.PC) && slave.actualAge <= V.PC.actualAge) || slave.weekAcquired + slave.actualAge*52 + slave.birthWeek === 0) {
					text.push(`${Spoken(slave, `I've known you my whole life, ${Master}, I can't really think of any times you weren't there for me.`)}`);
				} else if ((areSisters(slave, V.PC) && slave.actualAge > V.PC.actualAge) || isParentP(V.PC, slave)) {
					text.push(`${Spoken(slave, `You're my dear ${Master}. I've known you since you were born, and I will always be watching out for you, no matter what.`)}`);
				} else if (slave.weekAcquired === 0 && V.week > 104) {
					text.push(`${Spoken(slave, `I feel like I've known you my whole life, ${Master}, and I would follow you to the end of the earth.`)}`);
				} else if ((V.week - slave.weekAcquired) > 104) {
					text.push(`${Spoken(slave, `I feel like I know you pretty well, ${Master}.`)}`);
				}
			}

			return text.join(' ');
		}
	}

	function aftermath() {
		const text = [];

		text.push(`${Spoken(slave, `So, ${Master},"`)} ${he} concludes,`);

		if (slave.fetishKnown === 1) {
			if (slave.fetishStrength > 60) {
				switch (slave.fetish) {
					case "submissive":
						text.push(`${Spoken(slave, `"Can I serve you somehow?"`)}`);
						break;
					case "dom":
						text.push(`${Spoken(slave, `"Can I hold a bitch down for you?"`)}`);
						break;
					case "sadist":
						text.push(`${Spoken(slave, `"Can I spank a bitch for you?"`)}`);
						break;
					case "masochist":
						text.push(`${Spoken(slave, `"Can I be your pain slave now?"`)}`);
						break;
					case "cumslut":
						text.push(`${Spoken(slave, `"Can I blow you now?"`)}`);
						break;
					case "humiliation":
						text.push(`${Spoken(slave, `"Can I be humiliated now?"`)}`);
						break;
					case "boobs":
						text.push(`${Spoken(slave, `"Can I give you a titjob now?"`)}`);
						break;
					case "buttslut":
						text.push(`${Spoken(slave, `"Can I be your anal cocksleeve now?"`)}`);
						break;
					case "pregnancy":
						if (slave.dick > 0 && slave.balls > 0) {
							text.push(`${Spoken(slave, `"Are there any slaves you want knocked up?"`)}`);
						} else if (slave.preg > -2 && slave.ovaries > 0) {
							if (slave.pregKnown === 1) {
								text.push(`${Spoken(slave, `"Can I have some more cum in my pregnant pussy?"`)}`);
							} else {
								if (V.PC.dick) {
									text.push(`${Spoken(slave, `"Can you breed me now?"`)}`);
								} else {
									text.push(`${Spoken(slave, `"Can I be bred?"`)}`);
								}
							}
						} else {
							text.push(`${Spoken(slave, `"Are there any pregnant slaves I could, you know, spend time with?"`)}`);
						}
						break;
					default:
						text.push(`${Spoken(slave, `"Can I serve you somehow?"`)}`);
				}
			} else if (slave.energy > 95) {
				text.push(`${Spoken(slave, `"Please fuck me. Please."`)}`);
			} else if (slave.attrKnown === 1 && slave.attrXX > 80) {
				text.push(`${Spoken(slave, `"Can I hang around and get oral from the next slave in here?"`)}`);
			} else if (slave.attrKnown === 1 && slave.attrXY > 80) {
				text.push(`${Spoken(slave, `"Can I hang around and suck the next dick in here?"`)}`);
			} else {
				text.push(`${Spoken(slave, `"Can I serve you somehow?"`)}`);
			}
		} else {
			text.push(`${Spoken(slave, `"Can I serve you somehow?"`)}`);
		}

		return text.join(' ');
	}
};
