/**
 *
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fFeet = function(slave) {
	const node = new DocumentFragment();
	let r = [];

	const {
		He, His,
		he, his, him, himself, wife
	} = getPronouns(slave);
	const {title: Master} = getEnunciation(slave);

	const footSeed = random(1, 100);
	let thighsAdj;
	let belly;
	let legsAdj;
	let boobsDesc;
	let boobs;
	let ballsDesc;
	let dickAdj;
	let buttAdj;
	let hipAdj;
	let skin;

	if (slave.weight > 190) {
		thighsAdj = "massive flabby";
	} else if (slave.weight > 160) {
		thighsAdj = "thick flabby";
	} else if (slave.weight > 130) {
		thighsAdj = "flabby";
	} else if (slave.weight > 95) {
		thighsAdj = "fat";
	} else if (slave.weight > 30) {
		if (slave.muscles > 75) {
			thighsAdj = "toned fat";
		} else if (slave.muscles < 15) {
			thighsAdj = "fat";
		} else {
			thighsAdj = "plush";
		}
	} else if (slave.weight > 10) {
		if (slave.muscles > 70) {
			thighsAdj = "thick muscular";
		} else if (slave.muscles > 20) {
			thighsAdj = "soft toned";
		} else {
			thighsAdj = "soft";
		}
	} else if (slave.weight >= -10) {
		if (slave.muscles > 70) {
			thighsAdj = "muscular";
		} else if (slave.muscles > 20) {
			thighsAdj = "toned";
		} else {
			thighsAdj = "average";
		}
	} else if (slave.weight >= -30) {
		if (slave.muscles > 40) {
			thighsAdj = "thin muscular";
		} else if (slave.muscles > 20) {
			thighsAdj = "toned model's";
		} else {
			thighsAdj = "model's";
		}
	} else {
		if (slave.muscles > 5) {
			thighsAdj = "emaciated toned";
		} else {
			thighsAdj = "emaciated";
		}
	}

	if (slave.belly < 1500) {
		belly = thighsAdj;
	} else {
		belly = bellyAdjective(slave);
	}

	if (slave.height >= 185) {
		legsAdj = "wonderfully long";
	} else if (slave.height >= 170) {
		legsAdj = "long";
	} else if (slave.height >= 160) {
		legsAdj = "nice";
	} else if (slave.height >= 150) {
		legsAdj = "short";
	} else {
		legsAdj = "short little";
	}

	if (slave.boobs >= 30000) {
		boobsDesc = "skip";
		boobs = "room-filling";
	} else if (slave.boobs >= 20000) {
		boobsDesc = "beanbag-sized";
	} else if (slave.boobs >= 8500) {
		boobsDesc = "obscenely massive";
	} else if (slave.boobs >= 8000) {
		boobsDesc = "Z-cup";
	} else if (slave.boobs >= 7500) {
		boobsDesc = "Y-cup";
	} else if (slave.boobs >= 7000) {
		boobsDesc = "X-cup";
	} else if (slave.boobs >= 6500) {
		boobsDesc = "V-cup";
	} else if (slave.boobs >= 5500) {
		boobsDesc = "U-cup";
	} else if (slave.boobs >= 5100) {
		boobsDesc = "T-cup";
	} else if (slave.boobs >= 4700) {
		boobsDesc = "S-cup";
	} else if (slave.boobs >= 4300) {
		boobsDesc = "R-cup";
	} else if (slave.boobs >= 3950) {
		boobsDesc = "Q-cup";
	} else if (slave.boobs >= 3600) {
		boobsDesc = "P-cup";
	} else if (slave.boobs >= 3250) {
		boobsDesc = "O-cup";
	} else if (slave.boobs >= 2900) {
		boobsDesc = "N-cup";
	} else if (slave.boobs >= 2600) {
		boobsDesc = "M-cup";
	} else if (slave.boobs >= 2300) {
		boobsDesc = "L-cup";
	} else if (slave.boobs >= 2050) {
		boobsDesc = "K-cup";
	} else if (slave.boobs >= 1800) {
		boobsDesc = "J-cup";
	} else if (slave.boobs >= 1600) {
		boobsDesc = "I-cup";
	} else if (slave.boobs >= 1400) {
		boobsDesc = "H-cup";
	} else if (slave.boobs >= 1200) {
		boobsDesc = "G-cup";
	} else if (slave.boobs >= 1000) {
		boobsDesc = "F-cup";
	} else if (slave.boobs >= 800) {
		boobsDesc = "DD-cup";
	} else if (slave.boobs >= 650) {
		boobsDesc = "D-cup";
	} else if (slave.boobs >= 400) {
		boobsDesc = "C-cup";
	} else if (slave.boobs >= 300) {
		boobsDesc = "B-cup";
	} else {
		boobsDesc = "skip";
		boobs = "flat";
	}
	if (boobsDesc !== "skip") {
		boobs = boobsDesc + " " + slave.boobShape;
	}

	if (slave.balls === 1) {
		ballsDesc = "vestigial";
	} else if (slave.balls === 2) {
		ballsDesc = "small";
	} else if (slave.balls === 3) {
		ballsDesc = "average";
	} else if (slave.balls === 4) {
		ballsDesc = "large";
	} else if (slave.balls === 5) {
		ballsDesc = "massive";
	} else if (slave.balls === 6) {
		ballsDesc = "huge";
	} else if (slave.balls === 7) {
		ballsDesc = "giant";
	} else if (slave.balls === 8) {
		ballsDesc = "enormous";
	} else if (slave.balls === 9) {
		ballsDesc = "monstrous";
	} else {
		ballsDesc = "overly massive";
	}

	if (slave.dick === 1) {
		dickAdj = "tiny";
	} else if (slave.dick === 2) {
		dickAdj = "little";
	} else if (slave.dick === 3) {
		dickAdj = "average";
	} else if (slave.dick === 4) {
		dickAdj = "big";
	} else if (slave.dick === 5) {
		dickAdj = "huge";
	} else if (slave.dick === 6) {
		dickAdj = "gigantic";
	} else if (slave.dick === 7) {
		dickAdj = "massive";
	} else if (slave.dick === 8) {
		dickAdj = "horse-sized";
	} else if (slave.dick === 9) {
		dickAdj = "monstrous";
	} else if (slave.dick === 10) {
		dickAdj = "inhuman";
	} else {
		dickAdj = "hypertrophied";
	}

	if (slave.butt < 1) {
		buttAdj = "flat";
	} else if (slave.butt < 2) {
		buttAdj = "small";
	} else if (slave.butt < 3) {
		buttAdj = "plump";
	} else if (slave.butt < 4) {
		buttAdj = "big bubble";
	} else if (slave.butt < 5) {
		buttAdj = "huge";
	} else if (slave.butt < 6) {
		buttAdj = "enormous";
	} else if (slave.butt < 7) {
		buttAdj = "gigantic";
	} else if (slave.butt < 8) {
		buttAdj = "ridiculous";
	} else if (slave.butt < 10) {
		buttAdj = "immense";
	} else {
		buttAdj = "inhuman";
	}

	if (slave.hips > 2) {
		hipAdj = "inhumanly wide";
	} else if (slave.hips > 1) {
		hipAdj = "very wide";
	} else if (slave.hips > 0) {
		hipAdj = "wide";
	} else if (slave.hips > -1) {
		hipAdj = "ample";
	} else if (slave.hips > -2) {
		hipAdj = "narrow";
	} else {
		hipAdj = "very narrow";
	}

	if (slave.skin === slave.race || slave.race === "white" || slave.race === "black" || V.seeRace === 0) {
		skin = slave.skin;
	} else {
		skin = `${slave.skin} ${slave.race}`;
	}

	const legs = hasBothLegs(slave) ? "legs" : "leg";
	const feet = hasBothLegs(slave) ? "feet" : "foot";
	const hands = hasBothArms(slave) ? "hands" : "hand";

	// Part 1: Order and reaction

	r.push(`You call ${slave.slaveName} to your office, telling ${him} to use ${his} ${feet} to please you.`);
	if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`${He} is brought to you and stands blankly by your desk.`);
	} else if (slave.relationship === -3 && slave.devotion >= 60 ) {
		r.push(`Your devoted slave ${wife} is delighted to get another chance to pleasure you.`);
	} else if (slave.relationship === -2 && slave.devotion >= 60 ) {
		r.push(`${He} considers ${himself} your lover, and is delighted to spend time with you.`);
	} else if (slave.devotion < -50) {
		r.push(`${He} strongly refuses, and you have to restrain ${him} to get ${him} to obey.`);
	} else if (slave.devotion < -20) {
		r.push(`${He} tries to refuse, but decides it will just be easier to comply than risk punishment.`);
	} else if (slave.devotion <= 20) {
		r.push(`${He} doesn't seem eager to comply, but fears being punished enough to obey.`);
	} else if (slave.devotion < 60) {
		r.push(`${He} complies quietly.`);
	} else {
		if (slave.trust < -50) {
			r.push(`Although ${he} just barely trusts that you will not harm ${him}, ${he} is still unsure about what you are going to do which makes ${him} pause.`);
		} else {
			r.push(`${He} rushes to comply.`);
		}
	}

	// Extra 1 if tease/perverted and not mindbroken
	if ((slave.sexualQuirk === "tease" || slave.sexualQuirk === "perverted") && slave.devotion > 60 && slave.fetish !== Fetish.MINDBROKEN) {
		r.push(`Before you can begin, ${he} arches`);
		if (hasBothLegs(slave)) {
			r.push(`a`);
		} else {
			r.push(`${his}`);
		}
		r.push(`leg in a seductive tease.`);
	}
	// Part 2: lube and reaction
	if (!canWalk(slave)) {
		if (tooBigBreasts(slave)) {
			r.push(`Since ${he} is immobilized by ${his} ${boobs} boobs, you have ${him} lay on ${his} side on the floor,`);
		} else if (tooBigBelly(slave)) {
			r.push(`Since ${he} is immobilized by ${his}`);
			if (slave.bellyPreg >= 3000) {
				r.push(`hugely gravid`);
			} else if (slave.bellyImplant >= 3000) {
				r.push(`${belly} protruding`);
			} else {
				r.push(`heavy ${slave.inflationType}-filled`);
			}
			r.push(`belly, you have ${he} lay on ${his} side on the floor,`);
		} else if (tooBigDick(slave)) {
			r.push(`Since ${he} is immobilized by ${his} ${dickAdj} dick, you have ${him} lay on ${his} side on the floor,`);
		} else if (tooBigButt(slave)) {
			r.push(`Since ${he} is immobilized by ${his} ${dickAdj} dick, you have ${him} sit on your desk to present ${his} ${legsAdj} ${legs} and ${feet},`);
		} else if (tooBigBalls(slave)) {
			r.push(`Since ${he} is immobilized by ${his} ${ballsDesc} balls, you have ${him} lay on ${his} back on the floor with ${his} ${legs} over ${his} nuts,`);
		} else {
			r.push(`You have ${him} sit on the edge of your desk to present ${his} ${legsAdj} ${legs} and ${feet},`);
		}
	} else {
		r.push(`You have ${him} sit on the edge of your desk to present ${his} ${legsAdj} ${legs} and ${feet},`);
	}
	if (getLegCount(slave, 4) + getLegCount(slave, 6) === 2) {
		r.push(`then pour lubricant onto your hands, applying it to ${his} elegant artificial ${feet}.`);
	} else if (getLegCount(slave, 5) === 2) {
		r.push(`then pour lubricant onto your hands, applying it to ${his} deadly artificial ${feet}.`);
	} else if (hasBothLegs(slave) && !hasAnyNaturalLegs(slave)) {
		r.push(`then pour lubricant onto your hands, applying it to ${his} artificial ${feet}.`);
	} else {
		r.push(`then pour lubricant onto your hands, massaging it into ${his} ${slave.skin} ${feet}: rubbing ${his} ${hasBothLegs(slave) ? `arches` : `arch`}, ${hasBothLegs(slave) ? `soles` : `sole`}, and toes.`);
	}
	if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`${He} shows little reaction to your efforts.`);
	} else { // not mindbroken
		if (slave.devotion < -50) {
			r.push(`${He} tries to stay hateful despite the pleasurable stimulation.`);
		} else if (slave.devotion < -20) {
			r.push(`${He} is mostly quiet, but occasionally stifles a moan.`);
		} else if (slave.devotion > 20 && slave.sexualFlaw === "shamefast") {
			r.push(`${He}`);
			if (hasAnyArms(slave)) {
				r.push(`hides ${his} face in ${his} ${hands}`);
			} else {
				r.push(`attempts to hide ${his} face`);
			}
			r.push(`in shame at ${his} nudity, but occasionally a moan breaks out.`);
		} else if (slave.devotion <= 20) {
			r.push(`${He} seems a bit surprised by the attention, occasionally letting out a moan.`);
		} else {
			if (slave.trust < -50) {
				r.push(`${He} seems uncomfortable at your touch and frequently jerks away, spoiling the moment.`);
			} else {
				r.push(`${He} enjoys the massage, moaning in pleasure at your touch.`);
			}
		}
	}

	// Part 3: Actions, attraction/devotion and fetishes
	if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`You hold ${his} ${feet} and thrust between them as ${he}`);
		if (canSee(slave)) {
			r.push(`watches you blankly.`);
		} else {
			r.push(`points ${his} blind gaze at you.`);
		}
	} else if (!(canWalk(slave))) {
		if (slave.devotion < -50) {
			r.push(`When ${he} refuses to serve, you take`);
			if (hasBothLegs(slave)) {
				r.push(`both of`);
			}
			r.push(`${his} ${feet} and start thrusting between them.`);
		} else if (slave.devotion < -20) {
			r.push(`${He} seems a bit reluctant when massaging you with ${his} ${feet} so you have to do most of the work.`);
		} else if (slave.devotion <= 20) {
			r.push(`${He} tries to make it pleasurable for you, but the combination of the awkward angle and ${his} nervousness makes ${him} lose ${his} pacing often.`);
		} else if (slave.devotion < 60 || (slave.sexualQuirk === "unflinching" && slave.devotion <= 20)) {
			r.push(`${He} does ${his} best to please you from ${his} position on ${his} side, massaging your cock nicely.`);
		} else {
			if (slave.trust < -50) {
				r.push(`${His} lack of trust causes ${him} to ask "${Master}, is this pleasurable for you?", spoiling the moment.`);
			} else {
				r.push(`${He} moves ${his} ${feet} hypnotically, trying ${his} hardest to make you cum. Being on ${his} side doesn't affect ${his} footjob, and you get a nice view of ${his} ${legsAdj} ${legs} as ${he} runs ${his} ${feet} across your cock.`);
			}
		}
		if (!canWalk(slave)) {
			if (slave.boobs > slave.belly ) {
				r.push(`${His} ${boobs} breasts wobble as ${his} ${feet} service you.`);
			} else {
				r.push(`${His} ${belly} belly wobbles as ${his} ${feet} service you.`);
			}
		}
	} else if (slave.devotion < -50) {
		r.push(`When ${he} refuses to comply, you take both ${his} ${feet} and start thrusting between them.`);
	} else if (slave.devotion < -20) {
		r.push(`${He} seems a bit reluctant when massaging you with ${his} ${feet} so you have to do most of the work.`);
	} else if (slave.devotion <= 20) {
		r.push(`${He} tries to make it pleasurable for you, trying to find the right angle and speed, but ${he} seems a bit tense and ruins ${his} pacing.`);
	} else if (slave.devotion < 60 || (slave.sexualQuirk === "unflinching" && slave.devotion <= 20)) {
		r.push(`${He} does ${his} best to please you, massaging you nicely with ${his} ${feet}.`);
	} else if (slave.attrXY < 16) {
		r.push(`${He} tries to make it pleasurable for you, but ${his} great distaste for men is obvious on ${his} expression.`);
	} else {
		if (slave.sexualQuirk === "perverted") {
			r.push(`As a devoted pervert, ${slave.slaveName} gives an enthusiastic footjob, with ${his}`);
			if (slave.dick > 0) {
				if (canAchieveErection(slave)) {
					if (slave.chastityPenis === 1) {
						r.push(`erect caged ${dickAdj} cock,`);
					} else {
						r.push(`erect ${dickAdj} cock,`);
					}
				} else {
					r.push(`soft and dripping ${dickAdj}`);
					if (slave.chastityPenis === 1) {
						r.push(`caged`);
					}
					r.push(`dick,`);
				}
				if (slave.balls > 0 && slave.scrotum > 0) {
					if (slave.vagina >= 0) {
						r.push(`and pulsing ${ballsDesc} balls`);
						if (slave.vaginaLube > 0 && slave.vagina >= 0) {
							r.push(`that are wet from ${his} feminine arousal`);
						}
					}
				} else if (slave.vagina >= 0) {
					r.push(`and`);
					if (slave.vaginaLube === 1) {
						r.push(`wet`);
					} else if (slave.vaginaLube === 2) {
						r.push(`dripping wet`);
					}
					r.push(`aroused vagina`);
				}
			} else if (slave.vagina >= 0) {
				if (slave.vaginaLube === 1) {
					r.push(`wet`);
				} else if (slave.vaginaLube === 2) {
					r.push(`dripping wet`);
				}
				r.push(`aroused vagina`);
			} else {
				r.push(`perverted smile`);
			}
			r.push(`showing ${his} sexual excitement to service your cock with ${his} ${feet}.`);
		} else if (slave.fetish === "cumslut" && slave.fetishKnown === 1 && slave.fetishStrength >= 60) {
			r.push(`As a devoted cumslut, ${slave.slaveName} eagerly strokes your cock with ${his} ${feet}, delightedly smearing your precum on ${his} ${hasBothLegs(slave) ? `soles` : `sole`}. ${He}`);
			if (canSee(slave)) {
				if (V.PC.balls >= 10) {
					r.push(`stares at your massive balls with a ravenous gaze,`);
				} else if (V.PC.balls >= 5) {
					r.push(`stares at your large balls with a hungry gaze,`);
				} else if (V.PC.scrotum > 0) {
					r.push(`stares at your balls with a steady gaze,`);
				} else {
					r.push(`practically stares through you to your internal balls,`);
				}
			} else {
				r.push(`gingerly feels the`);
				if (V.PC.balls >= 10) {
					r.push(`weight of your massive balls`);
				} else if (V.PC.balls >= 5) {
					r.push(`weight of your large balls`);
				} else if (V.PC.scrotum > 0) {
					r.push(`weight of your balls`);
				} else {
					r.push(`tender skin at your base`);
				}
				r.push(`with ${his} ${feet},`);
			}
			r.push(`shivering in anticipation.`);
		} else if (slave.fetish === "humiliation" && slave.fetishKnown === 1 && slave.fetishStrength >= 60) {
			r.push(`${slave.slaveName}`);
			r.push(`slowly strokes your cock with ${his} ${feet}, getting off on the degrading use of ${his} ${feet} and avoiding your gaze. ${He} is showing an embarrassed smile${skinToneLevel(slave.skin) > 22 ? `, and if ${his} skin was any lighter you would see ${his}` : `and`} bright blushing cheeks.`);
		} else if (slave.fetish === "boobs" && slave.fetishKnown === 1 && slave.fetishStrength >= 60 && hasAnyArms(slave)) {
			r.push(`As ${slave.slaveName} deftly strokes your cock with ${his} ${feet}, ${his} ${hasBothArms(slave) ? `hands play` : `hand plays`} with ${his}`);
			if (slave.boobs < 300) {
				r.push(`erect nipples.`);
			} else if (slave.boobs < 500) {
				r.push(`small chest.`);
			} else if (slave.boobs >= 18000) {
				r.push(`${boobs} breasts, though ${he} can't reach ${his} nipples.`);
			} else {
				r.push(`${boobs} breasts and erect nipples.`);
			}
			r.push(`${He} is certainly giving you plenty of sexy options for you to watch.`);
		} else if (slave.fetish === "sadist" && slave.fetishKnown === 1 && slave.fetishStrength >= 60) {
			r.push(`${slave.slaveName} is a sadist, and ${his} deft footjob toys with the boundaries of pain and pleasure. ${His} devoted yet belittling`);
			if (canSee(slave)) {
				r.push(`gaze carefully watches your face`);
			} else {
				r.push(`expressions are clear as ${he} feels`);
			}
			r.push(`for every reaction.`);
		} else if (slave.fetish === "dom" && slave.fetishKnown === 1 && slave.fetishStrength >= 60) {
			r.push(`${slave.slaveName} is a dominant and ${his} skilled ${feet} roughly stroke your erect cock, but ${he} pauses often to rub ${his} ${hasBothLegs(slave) ? `soles` : `sole`}`);
			if (V.PC.balls >= 10) {
				r.push(`on your massive balls`);
			} else if (V.PC.balls >= 5) {
				r.push(`on your large balls`);
			} else if (V.PC.scrotum > 0) {
				r.push(`on your balls`);
			} else {
				r.push(`around your hidden balls`);
			}
			r.push(`so ${he} doesn't get too aggressive with ${his} ${getWrittenTitle(slave)}.`);
		} else if (slave.fetish === "pregnancy" && slave.fetishKnown === 1 && slave.fetishStrength >= 60) {
			r.push(`${slave.slaveName} skillfully strokes your cock with ${his}`);
			if (hasAnyArms(slave)) {
				r.push(`${feet},`);
				if (hasBothArms(slave)) {
					r.push(`one of`);
				}
				r.push(`${his} ${hands} roaming across ${his} ${belly} belly as ${he} happily services you.`);
			} else {
				r.push(`${feet}.`);
			}
			r.push(`${He} occasionally pauses to`);
			if (canSee(slave)) {
				r.push(`watch`);
			} else {
				r.push(`feel`);
			}
			r.push(`your`);
			if (V.PC.balls >= 10) {
				r.push(`massive balls`);
			} else if (V.PC.balls >= 5) {
				r.push(`large balls`);
			} else if (V.PC.scrotum > 0) {
				r.push(`balls`);
			} else {
				r.push(`pubic mound`);
			}
			r.push(`churn with sperm, clearly lost in a pregnancy fantasy.`);
		} else {
			r.push(`${slave.slaveName} skillfully strokes your cock with ${his} ${feet}, trying ${his} best to bring you pleasure.`);
		}
	}
	if (getLegCount(slave, 3) + getLegCount(slave, 6) > 0) {
		r.push(`As you enjoy your footjob ${his} capable prosthetics begin to vibrate on your cock.`);
	} else if (getLegCount(slave, 4)) {
		r.push(`The hard angles of ${his} metal ${feet} provide extra stimulation.`);
	}

	// Extra 2: if not mindbroken/immobile, tease with a flash.
	if (slave.fetish !== Fetish.MINDBROKEN && canWalk(slave) && slave.sexualQuirk === "tease" && slave.devotion >= 60) {
		if (canSee(slave)) {
			r.push(`Seeing`);
		} else {
			r.push(`Feeling`);
		}
		r.push(`you near your orgasm, ${he}`);
		if (footSeed < 40 && hasAnyArms(slave)) {
			if (slave.boobs < 300) {
				r.push(`presses ${his} ${hands} on ${his} flat chest,`);
			} else if (slave.boobs < 500) {
				r.push(`puts ${his} ${hands} under ${his} small chest,`);
			} else {
				r.push(`cups ${his} ${boobs} breasts with ${his} ${hands},`);
			}
			r.push(`then sticks out ${his} tongue, posing like a Free Cities whore who wants a cumshot.`);
		} else if (footSeed < 70 && !(slave.chastityPenis) && !(slave.chastityVagina) && (slave.dick > 0 || slave.vagina >= 0 )) {
			r.push(`spreads ${his} ${legsAdj} ${legs}`);
			if (slave.dick > 0) {
				if (slave.vagina >= 0) {
					r.push(`and raises ${his} ${dickAdj}`);
					if (canAchieveErection(slave)) {
						r.push(`erect`);
					} else {
						r.push(`soft`);
					}
					r.push(`cock`);
					if (slave.balls > 0 && slave.scrotum > 0) {
						r.push(`and ${ballsDesc} balls`);
					}
					r.push(`to reveal ${his}`);
					if (slave.vaginaLube === 1) {
						r.push(`wet`);
					} else if (slave.vaginaLube === 2) {
						r.push(`dripping wet`);
					}
					r.push(`aroused vagina`);
				} else {
					r.push(`and teases the tip of ${his} ${dickAdj}`);
					if (canAchieveErection(slave)) {
						r.push(`throbbing`);
					} else {
						r.push(`soft`);
					}
					r.push(`dick`);
				}
			} else {
				r.push(`to reveal ${his}`);
				if (slave.vaginaLube === 1) {
					r.push(`wet`);
				} else if (slave.vaginaLube === 2) {
					r.push(`dripping wet`);
				}
				r.push(`aroused vagina, then ${he} spreads ${his}`);
				if (slave.labia === 3) {
					r.push(`extremely large`);
				} else if (slave.labia === 2) {
					r.push(`large`);
				} else if (slave.labia === 1) {
					r.push(`pretty`);
				} else {
					r.push(`minimal`);
				}
				r.push(`pussylips`);
			}
			r.push(`with a sultry smile.`);
		} else {
			r.push(`rolls onto ${his} side while still stroking your dick, revealing ${his} ${buttAdj} ass, ${hipAdj} hips and ${thighsAdj} thighs with a sultry smile.`);
		}
	}

	// PC orgasms
	if (slave.fetish === Fetish.MINDBROKEN) {
		r.push(`You eventually cum all over ${his} ${skin}`);
		if (V.PC.balls >= 9) {
			r.push(`${feet} ${legsAdj} ${legs}, and even ${belly} belly with your massive load.`);
		} else if (V.PC.balls >= 5) {
			r.push(`${feet} and ${legsAdj} ${legs} with your large load.`);
		} else {
			r.push(`${feet}.`);
		}
	} else if (!canWalk(slave)) {
		if (slave.devotion < -50) {
			r.push(`You eventually cum all over ${his} ${skin} ${feet}`);
			if (V.PC.balls >= 9) {
				r.push(`${legsAdj} ${legs}, and even ${his} side with your massive load`);
			} else if (V.PC.balls >= 5) {
				r.push(`and ${legsAdj} ${legs} with your large load`);
			}
			r.push(`as ${he} struggles in your grasp. ${He} is furious that ${he} is now covered in cum ${he} can't easily reach to clean.`);
		} else if (slave.devotion < -20) {
			r.push(`You eventually cum all over ${his} ${skin}`);
			if (V.PC.balls >= 9) {
				r.push(`${feet} ${legsAdj} ${legs}, and even ${his} side with your massive load.`);
			} else if (V.PC.balls >= 5) {
				r.push(`${feet} and ${legsAdj} ${legs} with your large load.`);
			} else {
				r.push(`${feet}.`);
			}
			r.push(`${He} was startled by your orgasm and now wears a conflicted expression, but you are done using ${him} for now. ${He} is left covered in cum ${he} can't easily reach to clean.`);
		} else if (slave.devotion <= 20) {
			r.push(`You eventually cum all over ${his} ${skin} ${feet}`);
			if (V.PC.balls >= 9) {
				r.push(`${legsAdj} ${legs}, and even ${his} side with your massive load`);
			} else if (V.PC.balls >= 5) {
				r.push(`and ${legsAdj} ${legs} with your large load`);
			}
			r.push(`as ${he} sighs in nervous relief.`);
		} else if (slave.devotion < 60 || (slave.sexualQuirk === "unflinching" && slave.devotion <= 20)) {
			r.push(`You eventually cum all over ${his} ${skin} ${feet}`);
			if (V.PC.balls >= 9) {
				r.push(`${legsAdj} ${legs}, and even ${his} side with your massive load`);
			} else if (V.PC.balls >= 5) {
				r.push(`and ${legsAdj} ${legs} with your large load`);
			}
			r.push(`as ${he} rises to an elbow to smile at you.`);
		} else {
			if (slave.trust < -50) {
				r.push(`${His} lack of trust causes ${his} eyes to glaze over in fear.`);
			} else {
				r.push(`You eventually cum all over ${his} ${skin} ${feet}`);
				if (V.PC.balls >= 9) {
					r.push(`${legsAdj} ${legs}, and even ${his} side with your massive load`);
				} else if (V.PC.balls >= 5) {
					r.push(`and ${legsAdj} ${legs} with your large load`);
				}
				r.push(`as ${he} moans in pleasure.`);
			}
		}
	} else if (slave.devotion < -50) {
		r.push(`You eventually cum all over ${his} ${skin} ${feet}`);
		if (V.PC.balls >= 9) {
			r.push(`${legsAdj} ${legs}, and even ${his} ${belly} belly with your massive load`);
		} else if (V.PC.balls >= 5) {
			r.push(`and ${legsAdj} ${legs} with your large load`);
		}
		r.push(`as ${he} struggles in your grasp with a look of disgust.`);
	} else if (slave.devotion < -20) {
		r.push(`You eventually cum all over ${his} ${skin}`);
		if (V.PC.balls >= 9) {
			r.push(`${feet} ${legsAdj} ${legs}, and even ${his} ${belly} belly with your massive load,`);
		} else if (V.PC.balls >= 5) {
			r.push(`${feet} and ${legsAdj} ${legs} with your large load,`);
		} else {
			r.push(`${feet},`);
		}
		r.push(`${He} was startled by your orgasm and now wears a conflicted expression, as well as your cum, but you are done using ${him} for now.`);
	} else if (slave.devotion <= 20) {
		r.push(`You eventually cum all over ${his} ${skin} ${feet}`);
		if (V.PC.balls >= 9) {
			r.push(`${legsAdj} ${legs}, and even ${his} ${belly} belly with your massive load`);
		} else if (V.PC.balls >= 5) {
			r.push(`and ${legsAdj} ${legs} with your large load`);
		}
		r.push(`as ${he} sighs in nervous relief.`);
	} else if (slave.devotion < 60 || slave.attrXY < 16 || (slave.sexualQuirk === "unflinching" && slave.devotion <= 20)) {
		r.push(`You eventually cum all over ${his} ${skin}`);
		if (V.PC.balls >= 9) {
			r.push(`${feet} ${legsAdj} ${legs}, and even ${his} ${belly} belly with your massive load,`);
		} else if (V.PC.balls >= 5) {
			r.push(`${feet} and ${legsAdj} ${legs} with your large load,`);
		} else {
			r.push(`${feet},`);
		}
		r.push(`and ${he} does ${his} best to catch your semen on ${his} ${legs}.`);
	} else {
		if (slave.fetish === "cumslut" && slave.fetishKnown === 1 && slave.fetishStrength >= 60) {
			r.push(`When you eventually cum, ${slave.slaveName} giggles in lustful joy as your hot cum coats ${his} ${skin}`);
			if (V.PC.balls >= 5) {
				r.push(`${feet} and quickly slides from your desk to kneel in front of your pulsating cock.`);
				if (V.PC.balls >= 9) {
					r.push(`Your massive load quickly covers ${his} face as ${he} moans and twitches in pleasure, semen dripping down ${his}`);
					if (slave.boobs < 300) {
						r.push(`flat chest`);
					} else if (slave.boobs < 500) {
						r.push(`small chest`);
					} else {
						r.push(`${boobs} breasts`);
					}
					r.push(`and ${belly} belly onto ${his} thighs.`);
				} else {
					r.push(`Your large load coats ${his} face in sticky semen, some dripping onto ${his}`);
					if (slave.boobs < 300) {
						r.push(`flat chest.`);
					} else if (slave.boobs < 500) {
						r.push(`small chest.`);
					} else {
						r.push(`${boobs} breasts.`);
					}
				}
			} else {
				r.push(`${feet}.`);
			}
		} else if (slave.fetish === "humiliation" && slave.fetishKnown === 1 && slave.fetishStrength >= 60) {
			r.push(`You eventually cum all over ${his} ${skin}`);
			if (V.PC.balls >= 9) {
				r.push(`${feet} ${legsAdj} ${legs}, and even ${his} ${belly} belly with your massive load`);
			} else if (V.PC.balls >= 5) {
				r.push(`${feet} and ${legsAdj} ${legs} with your large load`);
			} else {
				r.push(`${feet},`);
			}
			r.push(`and ${he} whimpers as even ${his} ${feet} used as a sex object.`);
		} else if (slave.fetish === Fetish.SUBMISSIVE && slave.fetishKnown === 1 && slave.fetishStrength >= 60) {
			r.push(`You eventually cum all over ${his} ${skin}`);
			if (V.PC.balls >= 9) {
				r.push(`${feet} ${legsAdj} ${legs}, and even ${his} ${belly} belly with your massive load`);
			} else if (V.PC.balls >= 5) {
				r.push(`${feet} and ${legsAdj} ${legs} with your large load`);
			} else {
				r.push(`${feet},`);
			}
			r.push(`and ${he} gasps as ${he} submissively accepts your semen on ${his} skin.`);
		} else if (slave.fetish === "buttslut" && slave.fetishKnown === 1 && slave.fetishStrength >= 60) {
			r.push(`When you eventually cum, ${slave.slaveName} moans as your semen lands on ${his} ${skin} ${feet},`);
			if (V.PC.balls >= 5) {
				r.push(`but quickly turns to present ${his} ${buttAdj} ass and ${hipAdj} hips as a new target.`);
				if (V.PC.balls >= 9) {
					r.push(`Your massive load quickly covers ${his} ${thighsAdj} ass and thighs, sticky cum dripping all the way to ${his} calves.`);
				} else {
					r.push(`Your large load soaks ${his} ${thighsAdj} ass and thighs in sticky semen, which drips down ${his} ${legsAdj} ${legs}.`);
				}
			} else {
				r.push(`but you know ${he} wanted to involve ${his} ${buttAdj} butt and your cum, if your orgasm had more volume.`);
			}
		} else if (slave.fetish === "boobs" && slave.fetishKnown === 1 && slave.fetishStrength >= 60) {
			r.push(`You eventually cum all over ${his} ${skin} ${feet}`);
			if (V.PC.balls >= 9) {
				r.push(r.pop() + `, ${legsAdj} ${legs}, and even ${his} ${belly} belly with your massive load`);
			} else if (V.PC.balls >= 5) {
				r.push(`and ${legsAdj} ${legs} with your large load`);
			}
			r.push(r.pop() + `, and ${he}`);
			if (slave.boobs < 300) {
				r.push(`pinches both ${his} erect nipples`);
			} else if (slave.boobs < 500) {
				r.push(`rubs ${his} ${hands} across ${his} small chest`);
			} else {
				r.push(`squeezes ${his} ${boobs} breasts tightly`);
			}
			r.push(`while moaning in pleasure.`);
		} else if (slave.fetish === "sadist" && slave.fetishKnown === 1 && slave.fetishStrength >= 60) {
			r.push(`You eventually cum all over ${his} ${skin} ${feet}`);
			if (V.PC.balls >= 9) {
				r.push(r.pop() + `, ${legsAdj} ${legs}, and even ${his} ${belly} belly with your massive load`);
			} else if (V.PC.balls >= 5) {
				r.push(`and ${legsAdj} ${legs} with your large load`);
			}
			r.push(r.pop() + `, and ${he} gasps slightly and condescendingly smiles as you soil ${his} ${feet} with semen.`);
		} else if (slave.fetish === "dom" && slave.fetishKnown === 1 && slave.fetishStrength >= 60) {
			r.push(`You eventually cum all over ${his} ${skin} ${feet}`);
			if (V.PC.balls >= 9) {
				r.push(r.pop() + `, ${legsAdj} ${legs}, and even ${his} ${belly} belly with your massive load`);
			} else if (V.PC.balls >= 5) {
				r.push(`and ${legsAdj} ${legs} with your large load`);
			}
			r.push(r.pop() + `, and ${he} gasps slightly and holds your cock between ${his} ${feet} tightly as you soil ${him} with semen.`);
		} else if (slave.fetish === "pregnancy" && slave.fetishKnown === 1 && slave.fetishStrength >= 60) {
			r.push(`When you start to cum, ${slave.slaveName} moves ${his} hand from ${his} belly to`);
			if (slave.vagina >= 0) {
				r.push(`expose ${his} vagina and spreads ${his}`);
				if (slave.labia === 3) {
					r.push(`extremely large`);
				} else if (slave.labia === 2) {
					r.push(`large`);
				} else if (slave.labia === 1) {
					r.push(`pretty`);
				} else {
					r.push(`minimal`);
				}
				r.push(`pussylips to show where ${he} wants cum.`);
			} else if (slave.mpreg === 1) {
				r.push(`expose ${his}`);
				if (slave.anus > 3 ) {
					r.push(`gaping`);
				} else if (slave.anus > 2 ) {
					r.push(`very loose`);
				} else if (slave.anus > 1 ) {
					r.push(`loose`);
				} else if (slave.anus > 0 ) {
					r.push(`tight`);
				} else {
					r.push(`virgin`);
				}
				r.push(`asshole to show where ${he} wants cum.`);
			} else {
				r.push(`hug ${his} stomach.`);
			}
			r.push(`Your orgasm shoots across ${his} ${skin}`);
			if (V.PC.balls >= 9) {
				r.push(`${feet}, ${legsAdj} ${legs}, and even ${his} ${belly} belly is marked with your massive load. ${He} runs ${his} ${hands} through the cum on ${his} belly, massaging the semen into ${his} skin.`);
			} else if (V.PC.balls >= 5) {
				r.push(`${feet} and ${legsAdj} ${legs}.`);
			} else {
				r.push(`${feet}.`);
			}
		} else {
			r.push(`You eventually cum all over ${his} ${skin} ${feet}`);
			if (V.PC.balls >= 9) {
				r.push(r.pop() + `, ${legsAdj} ${legs}, and even ${his} ${belly} belly with your massive load`);
			} else if (V.PC.balls >= 5) {
				r.push(`and ${legsAdj} ${legs} with your large load`);
			}
			r.push(r.pop() + `, and ${he} moans softly in pleasure as ${he} feels your hot semen run down ${his} ${hasBothLegs(slave) ? `soles` : `sole`}.`);
		}
	}

	// Extra 3: devoted perverted slave giggles and orgasms
	if (slave.fetish !== Fetish.MINDBROKEN && canWalk(slave) && slave.sexualQuirk === "perverted" && slave.devotion >= 60 && !(slave.fetish === "cumslut" && slave.fetishKnown === 1 && slave.fetishStrength >= 60)) {
		r.push(`${He} was getting off on the footjob, but the feeling of your cum on`);
		if (slave.fetish === "buttslut" && slave.fetishKnown === 1 && slave.fetishStrength >= 60 && V.PC.balls >= 5) {
			r.push(`${his} ass and thighs sets off a strong orgasm of ${his} own, ${his} ${thighsAdj} ${legs} quivering as`);
			if (slave.dick > 0) {
				if (slave.vagina >= 0) {
					if (cumAmount(slave) > 20) {
						r.push(`${his} ${dickAdj} dick unloads a massive amount of cum, swollen ${ballsDesc} testicles bulging between ${his} thighs,`);
						if (slave.vaginaLube === 1) {
							r.push(`wet`);
						} else if (slave.vaginaLube === 2) {
							r.push(`dripping wet`);
						}
						r.push(`pussy and asshole clenching as ${he} makes a cum puddle on the floor which splashes with every spasm.`);
					} else {
						r.push(`${his} ${dickAdj} dick spurts ${his} load, ${his}`);
						if (slave.vaginaLube === 1) {
							r.push(`wet`);
						} else if (slave.vaginaLube === 2) {
							r.push(`dripping wet`);
						}
						r.push(`pussy and asshole clenching.`);
					}
				} else {
					if (cumAmount(slave) > 20) {
						r.push(`${he} strokes ${his} ${dickAdj} penis, swollen ${ballsDesc} testicles bulging between ${his} thighs, asshole clenching as ${his} massive cumshot splashes noisily onto the floor.`);
					} else {
						r.push(`${he} strokes ${his} ${dickAdj} penis, asshole clenching as ${his} cum spurts onto the floor.`);
					}
				}
			} else if (slave.vagina >= 0) {
				r.push(`${he} moans in pleasure, ${his}`);
				if (slave.vaginaLube === 1) {
					r.push(`wet`);
				} else if (slave.vaginaLube === 2) {
					r.push(`dripping wet`);
				}
				r.push(`pussy and asshole clenching as ${he} tries to remain standing.`);
			} else {
				r.push(`${he} moans in pleasure, asshole pulsating as ${he} tries to remain standing.`);
			}
		} else {
			r.push(`${his} ${legs}`);
			if (V.PC.balls >= 2) {
				r.push(`and belly`);
			}
			r.push(`sets off a strong orgasm of ${his} own, even without masturbating.`);
			if (slave.dick > 0) { // dick shoots
				if (cumAmount(slave) > 20) { // huge load
					r.push(`${His} ${dickAdj} dick unloads a massive amount of cum, adding ${his} own semen to ${his} body, resulting in a slave covered nearly head to toe in spunk.`);
				} else {
					r.push(`${His} ${dickAdj} dick unloads onto ${his} belly and ${boobs} chest, and ${he} giggles and gasps as it rains down.`);
				}
			} else if (slave.vagina >= 0) {
				r.push(`${He} leans back and moans in pleasure, showing ${his}`);
				if (slave.vaginaLube === 1) {
					r.push(`wet`);
				} else if (slave.vaginaLube === 2) {
					r.push(`dripping wet`);
				}
				r.push(`pussy and asshole clenching.`);
			} else {
				r.push(`${He} leans back and moans in pleasure, showing ${his} asshole pulsating.`);
			}
		}
		if (slave.vaginaLube >= 1) {
			r.push(`After ${he} leaves, you find a`);
			if (slave.vaginaLube >= 2) {
				r.push(`large`);
			}
			r.push(`puddle of pussyjuice on your desk where ${he} was sitting.`);
		}
	}

	if (slave.fetish === "cumslut" && slave.fetishKnown === 1 && slave.fetishStrength >= 60) {
		if (V.PC.balls > 5) {
			if (slave.dick > 0) {
				if (cumAmount(slave) > 20) {
					r.push(`${His} ${ballsDesc} balls visibly throb as ${dickAdj} dick unloads a massive amount of cum, adding ${his} own semen to ${his} body, resulting in a slave utterly plastered in spunk. ${His} eyes are held shut with a thick layer of cum, and judging by how`);
					if (slave.chastityPenis === 1) {
						r.push(`${his} dick is still shooting cum even in a cage with no stimulation,`);
					} else {
						r.push(`furiously ${he} is masturbating,`);
					}
					r.push(`${he} couldn't be happier.`);
				} else {
					r.push(`${His} ${dickAdj} dick unloads onto ${his} belly and ${boobs} chest, and ${he} giggles and gasps as it rains down with audible splats. ${He} is splattered in semen, face coated in your cum, and judging by`);
					if (canSmell(slave)) {
						r.push(`${his} nostrils desperately taking in the heady smell and`);
					}
					r.push(`how`);
					if (slave.chastityPenis === 1) {
						r.push(`${his} dick is still throbbing in orgasm even in a cage with no stimulation,`);
					} else {
						r.push(`${he} can't stop masturbating,`);
					}
					r.push(`${he} couldn't be happier.`);
				}
			} else if (slave.vagina >= 0) {
				r.push(`${He} leans back and moans in pleasure, ${his}`);
				if (slave.vaginaLube === 1) {
					r.push(`wet`);
				} else if (slave.vaginaLube === 2) {
					r.push(`dripping wet`);
				}
				r.push(`pussy and asshole clenching. ${He} is splattered in semen, face coated in your cum, and judging by`);
				if (canSmell(slave)) {
					r.push(`${his} nostrils desperately taking in your scent and`);
				}
				r.push(`how ${he} can't stop masturbating, ${he} couldn't be happier.`);
			} else {
				r.push(`${He} leans back and moans in pleasure, asshole pulsating. ${He} is splattered in semen, face coated in your cum, and judging by`);
				if (canSmell(slave)) {
					r.push(`${his} nostrils desperately taking in your scent and`);
				}
				r.push(`how ${he} can't stop masturbating, ${he} couldn't be happier.`);
			}
		} else {
			r.push(`${slave.slaveName}`);
			r.push(`leans down to wipe semen off ${his} ${feet}, quickly bringing it into ${his} mouth with a blissful look as ${he}`);
			if (canTaste(slave)) {
				r.push(`tastes`);
			} else {
				r.push(`feels`);
			}
			r.push(`your cum and sighs in pleasure.`);
		}
	}
	App.Events.addParagraph(node, r);
	return node;
};
