// cSpell:ignore RCGmod

App.EndWeek.Player.mobility = function(PC = V.PC) {
	const r = [];

	const immobilities = [];
	const noWalking = [];

	const {hisP, girlP} = getPronouns(PC).appendSuffix("P");

	mobility();
	muscularAtrophy();
	bodyAccessibility();
	hugeBreasts();
	boobAccessibility();
	hugeBelly();
	bellyAccessibility();
	hugeDick();
	dickAccessibility();
	hugeBalls();
	ballsAccessibility();
	hugeHips();
	hugeButt();
	buttAccessibility();
	hindrance();

	return r.join(" ");

	function mobility() {
		if (PC.weight >= 300) {
			immobilities.push("fat body");
		}
		if (PC.belly >= 1100000) {
			immobilities.push("belly");
		}
		if (PC.boobs >= 1500000) {
			immobilities.push("breasts");
		}
		if (PC.balls >= 160) {
			immobilities.push("balls");
		}
		if (immobilities.length > 0) {
			r.push(`You have been rendered <span class="immobile">completely immobile</span> by the size and weight of your`);
			r.push(toSentence(immobilities));
			r.push(r.pop() + `, leaving you stuck on your bed. Nothing short of industrial equipment is capable of lifting you, and the logistics of getting something like that into the penthouse make it pretty clear that you aren't going to be going anywhere until you deal with all of this.`);
		}
		if (tooFatSlave(PC) && !immobilities.includes("fat body")) {
			noWalking.push("fat body");
		}
		if (tooBigBreasts(PC) && !immobilities.includes("breasts")) {
			noWalking.push("breasts");
		}
		if (tooBigBelly(PC) && !immobilities.includes("belly")) {
			noWalking.push("belly");
		}
		if (tooBigButt(PC) && !immobilities.includes("butt")) {
			noWalking.push("butt");
		}
		if (tooBigDick(PC) && !immobilities.includes("dick")) {
			noWalking.push("dick");
		}
		if (tooBigBalls(PC) && !immobilities.includes("balls")) {
			noWalking.push("balls");
		}
		if (PC.physicalImpairment > 1 || noWalking.length > 0) {
			if (immobilities.length > 0) {
				r.push(`Ignoring the obvious,`);
				if (noWalking.length > 0) {
					r.push(`the weight of your ${toSentence(noWalking)} would prevent you from walking anyway.`);
					if (PC.physicalImpairment > 1) {
						r.push(`Your injuries may also be contributing to that, but it's hard to tell when you can't even try.`);
					}
				} else {
					r.push(`it's not like you could walk anyway, having never regained the ability after being injured.`);
				}
				if (isMovable(PC)) {
					r.push(`You have to use a wheelchair if you want to get anywhere, which is subject to its own host of day-to-day problems.`);
				}
			} else {
				r.push(`You've <span class="hindrance mid">lost the ability to walk</span> due to`);
				if (noWalking.length > 0) {
					r.push(`the size and weight of your ${toSentence(noWalking)}, forcing you to rely on a wheelchair to get around.`);
					if (PC.physicalImpairment > 1) {
						r.push(`Your injuries may also be contributing to that, but it's hard to tell when you can't even try.`);
					}
					if (canMove(PC)) {
						r.push(`At the very least, you can still crawl if needed, so you aren't completely helpless.`);
					}
				} else {
					r.push(`crippling injuries, forcing you to rely on a wheelchair to get around.`);
					if (canMove(PC)) {
						r.push(`At the very least, you can still crawl if needed, so you aren't completely helpless.`);
					}
				}
			}
		}
		if (isTrapped(PC)) {
			if (!isMovable(PC)) {
				r.push(`It's not like you could leave your room anyway; the door is too small.`);
			} else {
				r.push(`To make matters even worse, you can't leave your room; the door is too small to fit through.`);
			}
		}

		if (onBedRest(PC)) {
			// One would assume that the player will realize that being unmovable/trapped also means they are more or less on bed rest.
			if (isInduced(PC)) {
				r.push(`<span class="hindrance high">You are on bed rest,</span> getting ready to give birth, so you are a little too preoccupied to focus on anything else at the moment.`);
			} else if (PC.preg > PC.pregData.normalBirth / 1.05 && PC.pregControl !== GestationDrug.LABOR) {
				r.push(`You're past your due date and having contractions, so until you give birth, you'll be <span class="hindrance high">staying in bed</span> and focusing on that over anything else.`);
			} else if (PC.majorInjury > 0) {
				r.push(`<span class="hindrance high">You are on mandatory bed rest due to serious injury.</span> You won't be able to do much until your body recovers.`);
			} else if (PC.health.condition < -90) {
				r.push(`<span class="hindrance high">You are on mandatory bed rest due to your poor health.</span> You won't be doing much other than sleeping until you recover.`);
			} else if (PC.geneMods.rapidCellGrowth !== 1 && PC.bellyPreg >= 100000 && PC.belly > (PC.pregAdaptation * 3200) && (PC.bellyPreg >= 500000 || PC.wombImplant !== "restraint")) {
				r.push(`<span class="hindrance high">You are on mandatory bed rest</span> in the hope that staying relatively still will keep ${V.seeExtreme === 1 && V.dangerousPregnancy === 1 ? "your strained belly from bursting open" : "the dam holding back the flood waters from breaking."}.`);
			} else if ((PC.womb.find((ft) => ft.genetics.geneticQuirks.polyhydramnios === 2 && ft.age >= 20)) || (PC.bellyPreg >= PC.pregAdaptation * 2200)) {
				r.push(`<span class="hindrance high">You are on bed rest</span> in an attempt to not further complicate your already troublesome pregnancy. While it is not compulsory, it does cut into both your work and play time.`);
			}
		}
	}

	function muscularAtrophy() {
		if (!isMovable(PC)) {
			if (PC.muscles > -80) {
				r.push(`Being bedbound takes its toll on your musculature, as what limited, awkward movements you are capable of can do little to sustain it.`);
				if (PC.muscles > 5) {
					r.push(`You <span class="change negative">lose some muscle definition.</span>`);
					PC.muscles -= 2;
				} else {
					r.push(`What's left of your <span class="change negative">muscles steadily atrophy.</span>`);
					PC.muscles--;
				}
			}
		} else if (onBedRest(PC, true)) {
			if (PC.health.shortDamage >= 50 || PC.health.condition < -90) {
				r.push(`Stuck completely unable to move, your <span class="change negative">muscles rapidly atrophy.</span>`);
				PC.muscles -= 3;
			} else if (PC.muscles > 5) {
				r.push(`Without proper maintenance, your <span class="change negative">muscles slowly soften.</span>`);
				PC.muscles--;
			}
		} else if (!canWalk(PC) && PC.diet !== PCDiet.MUSCLE) {
			if (PC.muscles.isBetween(-80, 6)) {
				r.push(`Without any muscle definition to maintain, and an electric wheelchair alleviating most of the effort of getting around, your unused <span class="change negative">muscles slowly atrophy.</span>`);
				PC.muscles--;
			}
		}
	}

	function bodyAccessibility() {
		if (isMovable(PC) && !(onBedRest(PC, true))) {
			if (PC.physicalImpairment !== 0) {
				r.push(`Due to the lasting effects of your injuries, any exertion you undertake requires plenty of rest afterward. Understandably, <span class="hindrance mid">this limits how much you can get done in a day.</span>`);
			}
			if (PC.weight >= 130 || (PC.weight >= 95 + ((PC.physicalAge - 9) * 5))) {
				r.push(`You're so overweight that any <span class="hindrance low">physical activity needs to be followed by a breather</span> and a little snack to get your energy back.`);
			}
			if (PC.muscles > 95 && PC.height <= (Height.mean(PC) + 10)) {
				r.push(`Your frame is inadequate to properly support your musculature, <span class="hindrance low">limiting your range of motion.</span> Frankly, this hinders you more in the gym than it does your other work.`);
			} else if (PC.muscles < -30) {
				r.push(`You're physically frail and can't do too much without having to stop and get your strength back, <span class="hindrance low">limiting how much you can accomplish in a day.</span>`);
			}
		}
	}

	function hugeBreasts() {
		if (canWalk(PC) && !(onBedRest(PC, true))) {
			if (PC.physicalAge >= 18) {
				if (PC.boobs > 25000) {
					if (PC.muscles <= 30) {
						r.push(`Your giant tits are debilitatingly big and exceedingly heavy. It's difficult to keep yourself from hunching forward while standing and slouching while sitting, so you often find your back <span class="health dec">rather sore</span> by evening.`);
						healthDamage(PC, 2);
					} else {
						r.push(`Your giant tits are debilitatingly big, but you know how to properly manage them. Needless to say, you do a lot of back exercises.`);
					}
				} else if (PC.boobs > 10000) {
					if (PC.muscles <= 5) {
						r.push(`Your huge boobs are troublesome for your slight form; your back is often quite <span class="health dec">sore</span> by evening.`);
						healthDamage(PC, 1);
					} else {
						r.push(`Some people would say boobs as huge as yours would be uncomfortable, but with proper exercise and support, their weight is no trouble at all.`);
					}
				} else if (PC.boobs > 4000) {
					if (PC.muscles <= 5) {
						r.push(`The weight of your big boobs is a little uncomfortable, but nothing you can't handle.`);
					}
				}
			} else if (PC.physicalAge > 12) {
				if (PC.boobs > 15000) {
					if (PC.muscles <= 50) {
						r.push(`Your giant tits are debilitatingly big and exceedingly heavy. Your youthful body can barely keep upright with them, and by day's end, your <span class="health dec">back aches</span> considerably.`);
						healthDamage(PC, 2);
					} else {
						r.push(`Your giant tits are debilitatingly big, but you know how to properly manage them; your back muscles are ripped, to say the least.`);
					}
				} else if (PC.boobs > 7500) {
					if (PC.muscles <= 30) {
						r.push(`Your huge boobs are troublesome for your youthful body; your back is often quite <span class="health dec">sore</span> by evening.`);
						healthDamage(PC, 1);
					} else {
						r.push(`Some people say huge boobs on a young ${girlP} like you must be uncomfortable, but with proper support and plenty of back exercise, their weight doesn't bother you at all.`);
					}
				} else if (PC.boobs > 3000) {
					if (PC.muscles <= 5) {
						r.push(`The weight of your big boobs is a little uncomfortable, but nothing you can't handle.`);
					}
				}
			} else {
				if (PC.boobs > 10000) {
					if (PC.muscles <= 95) {
						r.push(`Your enormous tits are nearly crippling you; your childish body just can't support that much weight hanging from your chest. You savor every moment you get to rest them on something and take the strain off your back, but each morning you still wake up with a <span class="health dec">variety of aches and pains.</span>`);
						healthDamage(PC, 3);
					} else {
						r.push(`As a preteen ${girlP} with a pair of enormous boobs wobbling from ${hisP} chest, you catch a lot of stares and the occasional comment over how much pain your back must be in. A simple flex of your muscles tends to quell those worries quickly enough.`);
					}
				} else if (PC.boobs > 8000) {
					if (PC.muscles <= 50) {
						r.push(`Your giant tits are debilitatingly big and exceedingly heavy for your childish body. You can barely keep upright with them, and by day's end, your <span class="health dec">back aches</span> considerably from carrying them around.`);
						healthDamage(PC, 2);
					} else {
						r.push(`Your giant tits are debilitatingly big for your preteen body, but you know how to properly carry them; your back muscles are ripped, to say the least.`);
					}
				} else if (PC.boobs > 5000) {
					if (PC.muscles <= 30) {
						r.push(`Your huge boobs are troublesome for your childish body; your back is often quite <span class="health dec">sore</span> by evening.`);
						healthDamage(PC, 1);
					} else {
						r.push(`As a preteen ${girlP} with boobs bigger than ${hisP} head, you get a lot of comments about how they'll ruin your back, but with proper support and a muscular back, you're doing just fine.`);
					}
				} else if (PC.boobs > 2000) {
					if (PC.muscles <= 5) {
						r.push(`Your big boobs are uncomfortably heavy for your childish body, but a little back pain is nothing you can't handle.`);
					}
				}
			}
		}
	}

	function boobAccessibility() {
		if (isMovable(PC) && !(onBedRest(PC, true))) {
			if (PC.boobs > 5000) {
				r.push(`Your breasts tend to <span class="hindrance low">get in the way when conducting business;</span> using a tablet is awkward, you smother traditional keyboards, video calls have to be adjusted around your bust, and that's not even to mention the trouble of carrying out your daily affairs throughout the arcology.`);
				if (V.boobAccessibility === 1) {
					r.push(`Luckily, the penthouse has been adapted for life with gigantic boobs, so you feel right at home.`);
				} else if (PC.boobs > 25000) {
					r.push(`Life at home is no better:`);
					if (V.buttAccessibility === 1 || V.pregAccessibility === 1 || V.ballsAccessibility === 1) {
						r.push(`the appliances are always out of reach, the furniture tough to get out of, and things are the perfect height to jab you right in the tits. At least the doors are wide enough for you to get through.`);
					} else {
						r.push(`the appliances are always out of reach, the furniture tough to get out of, things are the perfect height to jab you right in the tits, and you cause traffic just trying to move between rooms.`);
					}
				}
			}
		}
	}

	function hugeBelly() {
		let resting = onBedRest(PC) ? 2 : 1;
		let RCGmod = 1 + PC.geneMods.rapidCellGrowth;
		if (PC.belly > (PC.pregAdaptation * 4500)) {
			r.push(`You may have made a mistake; your bloated`);
			if (PC.mpreg === 0 && PC.ovaries === 0) {
				r.push(`implant-filled middle`);
			} else {
				r.push(`womb`);
			}
			r.push(`is under immense strain and puts <span class="health dec">overwhelming pressure on your skin and organs.</span> It's turned black and blue from the tension and the deep stretch marks are truly worrying.`);
			if (PC.geneticQuirks.uterineHypersensitivity === 2 && PC.preg > 0) {
				r.push(`You're trapped in a constant state of mixed pleasure and pain,`);
				if (V.geneticMappingUpgrade > 0) {
					r.push(`thanks to your uterine hypersensitivity,`);
				}
				r.push(`making it difficult to focus on anything other than orgasming.`);
			} else {
				r.push(`The pain is excruciating, and each`);
				if (PC.bellyPreg > 100) {
					r.push(`movement within you`);
				} else {
					r.push(`breath`);
				}
				r.push(`feels like it could force you to burst.`);
			}
			healthDamage(PC, 30, 2);
			if (PC.geneticQuirks.uterineHypersensitivity === 2) {
				PC.pregAdaptation += 5 * RCGmod;
			} else {
				PC.pregAdaptation += 1 * RCGmod;
			}
		} else if (PC.belly > (PC.pregAdaptation * 3200)) {
			r.push(`You may have overdone it a little; your`);
			if (PC.mpreg === 0 && PC.ovaries === 0) {
				r.push(`implant filled abdominal cavity`);
			} else {
				r.push(`straining womb`);
			}
			r.push(`takes up all the available space in your body, putting <span class="health dec">tremendous pressure on your skin and crushing your organs.</span>`);
			if (PC.geneticQuirks.uterineHypersensitivity === 2 && PC.preg > 0) {
				if (V.geneticMappingUpgrade > 0) {
					r.push(`Your uterine hypersensitivity renders it extremely pleasurable, often forcing you to become lost in playing with your belly.`);
				} else {
					r.push(`The uncanny way you rub, tease and grab at your belly, even in public, is becoming rather disturbing to people.`);
				}
			} else {
				r.push(`You feel a distinct, stabbing pain alongside`);
				if (PC.bellyPreg > 100) {
					r.push(`each movement inside you;`);
				} else {
					r.push(`each breath;`);
				}
				r.push(`your body can't take much more of this.`);
			}
			healthDamage(PC, 20);
			if (PC.geneticQuirks.uterineHypersensitivity === 2) {
				PC.pregAdaptation += 4 * RCGmod;
			} else {
				PC.pregAdaptation += .4 * RCGmod;
			}
		} else if (PC.belly > (PC.pregAdaptation * 2000)) {
			r.push(`Your body cavity is completely filled by your`);
			if (PC.mpreg === 0 && PC.ovaries === 0) {
				r.push(`belly implant,`);
			} else {
				r.push(`womb,`);
			}
			r.push(`<span class="health dec">putting pressure on your skin and organs.</span>`);
			if (PC.geneticQuirks.uterineHypersensitivity === 2 && PC.preg > 0) {
				if (V.geneticMappingUpgrade > 0) {
					r.push(`The pleasure derived from your uterine hypersensitivity completely masks any discomfort.`);
				} else {
					r.push(`The pressure makes you really horny for some reason.`);
				}
			} else {
				r.push(`It's really uncomfortable, but mostly limited to when`);
				if (PC.bellyPreg > 100) {
					r.push(`your babies are active.`);
				} else {
					r.push(`you have to move.`);
				}
			}
			healthDamage(PC, (10 / resting));
			if (PC.geneticQuirks.uterineHypersensitivity === 2) {
				PC.pregAdaptation += 3 * RCGmod;
			} else {
				PC.pregAdaptation += .3 * RCGmod;
			}
		} else if (PC.belly > (PC.pregAdaptation * 1000)) {
			r.push(`Your body is filled by your`);
			if (PC.mpreg === 0 && PC.ovaries === 0) {
				r.push(`belly implant,`);
			} else {
				r.push(`womb,`);
			}
			r.push(`<span class="health dec">compressing your internal organs.</span>`);
			if (PC.geneticQuirks.uterineHypersensitivity === 2 && PC.preg > 0) {
				if (V.geneticMappingUpgrade > 0) {
					r.push(`Your uterine hypersensitivity renders having such a stretched womb rather enjoyable.`);
				} else {
					r.push(`It feels pretty good, in fact.`);
				}
			} else {
				r.push(`There's no way to get comfortable around it, so all you can do is bear it.`);
			}
			healthDamage(PC, (2 / resting));
			if (PC.geneticQuirks.uterineHypersensitivity === 2) {
				PC.pregAdaptation += 2 * RCGmod;
			} else {
				PC.pregAdaptation += .2 * RCGmod;
			}
		} else if (PC.belly > (PC.pregAdaptation * 750)) {
			if (PC.geneticQuirks.uterineHypersensitivity === 2) {
				PC.pregAdaptation += 1 * RCGmod;
			} else {
				PC.pregAdaptation += .1 * RCGmod;
			}
		}
		if (PC.geneMods.progenitor === 1 && PC.belly > (PC.pregAdaptation * 750)) {
			if (PC.belly > (PC.pregAdaptation * 1000)) {
				r.push(`At least your genetically treated body is rapidly adjusting to your gravidity.`);
			}
			PC.pregAdaptation += 1;
		}
		if (PC.wombImplant === "restraint" && PC.belly >= 400000) {
			r.push(`The mesh implanted into the walls of your uterus is nearing its limit and <span class="health dec">beginning to strangle</span> the organ it is meant to support. While it is still structurally sound, it may fail on you if it is forced to stretch much more.`);
			healthDamage(PC, 15, 2);
		}

		/* body inconvenience */
		if (canWalk(PC) && !(onBedRest(PC, true))) {
			const belly = bellyAdjective(PC);
			if (PC.physicalAge >= 18) {
				if (PC.belly >= 300000) {
					r.push(`Your ${belly} belly is debilitatingly large; waddling around is a challenge, and you need to take things extra slow to make sure you don't accidentally bump into anything.`);
				} else if (PC.belly >= 150000) {
					r.push(`Your ${belly} belly is troublesome; each step is slow and ponderous, and you have to be careful not to accidentally drive the bulbous mass into anything.`);
				} else if (PC.belly >= 75000) {
					r.push(`Your ${belly} belly juts out heavily from your frame, messing with your sense of balance and leaving you second guessing what you can fit through.`);
				}
			} else if (PC.physicalAge > 12) {
				if (PC.belly >= 300000) {
					r.push(`Your ${belly} belly constantly threatens to drag you to the floor, which would be nice to take the weight off your teenage body, but would also mean you'd need help getting back to your feet.`);
				} else if (PC.belly >= 200000) {
					r.push(`Your ${belly} belly is debilitatingly large on your teenage body; waddling around is a challenge, and you need to take things extra slow to make sure you don't accidentally bump into anything.`);
				} else if (PC.belly >= 80000) {
					r.push(`Your ${belly} belly is troublesome for your teenage body; each step is slow and ponderous, and you have to be careful not to accidentally drive the bulbous mass into anything.`);
				} else if (PC.belly >= 30000) {
					r.push(`Your ${belly} belly juts out heavily from your teenage frame, messing with your sense of balance and just how big you actually are.`);
				}
			} else {
				if (PC.belly >= 200000) {
					r.push(`Your ${belly} belly is overwhelming on your immature body. You really would like to let it rest on the floor and take its weight off you, but then you'd need help getting back upright.`);
				} else if (PC.belly >= 120000) {
					r.push(`Your ${belly} belly is debilitatingly large on your immature body; you can barely waddle at all, and you need to take things extra slow since it blocks you from seeing the floor ahead of you.`);
				} else if (PC.belly >= 60000) {
					r.push(`Your ${belly} belly is troublesome for your immature body; each step is slow and ponderous, and you have to be careful not to accidentally drive the bulbous mass into anything.`);
				} else if (PC.belly >= 30000) {
					r.push(`Your ${belly} belly juts out heavily from your juvenile frame, messing with your sense of balance and making you feel absolutely enormous.`);
				}
			}
		}
	}

	function bellyAccessibility() {
		if (isMovable(PC) && !(onBedRest(PC, true))) {
			if (PC.belly >= 60000 || PC.belly >= 60000 / (1 + Math.pow(Math.E, -0.4 * (PC.physicalAge - 14))) || PC.belly >= Math.max(10000, ((12500 / 19) * PC.height) - (1172500 / 19))) {
				r.push(`Your middle <span class="hindrance low">gets in the way of your typical routine;</span> it's tough to get comfortable, you have to dress around it if you don't want to look like a harlot, and it takes way more effort than it ever should to sit at any sort of furniture.`);
				if (V.pregAccessibility === 1) {
					r.push(`Good thing the penthouse has been adapted for heavily pregnant life, alleviating most of your concerns, so long as you don't need to leave it.`);
				} else if (PC.belly >= 100000) {
					r.push(`Homelife is full of frustrations too:`);
					if (V.buttAccessibility === 1 || V.boobAccessibility === 1 || V.ballsAccessibility === 1) {
						r.push(`appliances are most easily reached sideways, you've gotten stuck sitting down, and one too many corners have made contact with your sensitive bump. At least there's plenty of room to maneuver in the halls.`);
					} else {
						r.push(`appliances are most easily reached sideways, you've gotten stuck sitting down, one too many corners have made contact with your sensitive bump, and slaves keep getting stuck behind you in the halls.`);
					}
				}
			}
		}
	}

	function hugeDick() {
		if (canWalk(PC) && !(onBedRest(PC, true))) {
			const dickLength = dickToCM(PC.dick);
			if (dickLength >= ((PC.height / 2) + 30)) {
				r.push(`Left unrestrained, your enormous penis rests on the ground, even while standing. It's easy to manage at least, though that probably wouldn't be the case if you became erect.`);
			} else if (dickLength >= (PC.height / 2)) {
				r.push(`When left hanging, your cockhead grazes the ground as you stand. It's easy to manage,`);
				if (canAchieveErection(PC)) {
					r.push(`though erections complicate things a bit; if you get too hard, there's no way you can contain it, and`);
					if (PC.belly >= 100000) {
						r.push(`it ends up painfully trapped under your belly until you deal with it.`);
					} else if (PC.weight > 130) {
						r.push(`it inadvertently presses against your gut. Attending a business meeting is pretty risky when every motion pushes your self-inflicted bellyfuck closer to completion.`);
					} else if (PC.boobs >= 300) {
						r.push(`you end up inadvertently giving yourself a titfuck. Attending a business meeting coated in your own load doesn't make you look good.`);
					} else {
						r.push(`you're stuck with your own dick prodding your face until you deal with it.`);
					}
				} else {
					r.push(`all things considered, though you doubt that would be the case if you could get erect.`);
				}
			} else if (dickLength >= (PC.height / 4)) {
				r.push(`When let loose, your cockhead hangs past your knees. It may get in the way at times, but attention your bulge gets makes it all worthwhile.`);
			}
		}
	}

	function dickAccessibility() {
		if (isMovable(PC) && !(onBedRest(PC, true))) {
			if (PC.dick >= 20) {
				if (V.dickAccessibility === 1) {
					r.push(`It was a good move having your living space redesigned around enormous dicks; taking a piss should never be that complicated.`);
				} else {
					r.push(`The penthouse itself is tolerable to live in with your cock, but the bathrooms are an unspeakable horror, for both yourself and the slaves that have to clean them.`);
				}
			}
		}
	}

	function hugeBalls() {
		if (canWalk(PC) && !(onBedRest(PC, true))) {
			const estimatedSackSag= ballsToCM(PC.balls) * .8 * (1 + ((PC.scrotum - PC.balls) * .5)); // Oval shape + scrotal sag
			if (estimatedSackSag > (PC.height / 2)) {
				r.push(`Your titanic balls never leave the floor, even when standing, unless you make an effort to lift them yourself. Once they're situated, getting around isn't too bad, though they are pretty heavy.`);
			} else if (estimatedSackSag >= (PC.height / 2) - 10) {
				r.push(`Your enormous balls hang down to the floor when you stand, and rest on it when you sit. You can get around with some sturdy supports, but you might need a cart soon.`);
			} else if (estimatedSackSag >= (PC.height / 4)) {
				r.push(`Your huge balls hang past your knees when you stand. Having them bouncing around while walking usually results in you kneeing yourself in the nuts, so supportive underwear is a must when touring your domain.`);
			}
		}
	}

	function ballsAccessibility() {
		if (isMovable(PC) && !(onBedRest(PC, true))) {
			if (PC.balls >= 14) {
				r.push(`It <span class="hindrance low">takes extra time to get anywhere</span> carrying a sack like yours around, limiting the number of potential places you can be in a day, and seating is often an issue with them in the way.`);
				if (V.ballsAccessibility === 1) {
					r.push(`You never have to deal with that in the penthouse after having refitted for the comfort of those with sizable testicles.`);
				} else if (PC.balls >= 50) {
					r.push(`The latter issue follows you back to the penthouse, giving you no real place to relax and unwind; the number of rotations you need to do in the bathroom is irritating.`);
					if (V.buttAccessibility === 1 || V.pregAccessibility === 1 || V.boobAccessibility === 1) {
						r.push(`At least there is plenty of room to maneuver, due to the other structural renovations you've had done.`);
					} else {
						r.push(`You are also starting to become painfully aware of just how wide the doorframes are compared to you.`);
					}
				}
			}
		}
	}

	function hugeHips() {
		if (isMovable(PC) && !(onBedRest(PC, true))) {
			if (PC.hips > 2) {
				r.push(`Your inhumanly wide hips <span class="hindrance low">frequently get in the way</span> as your try to work and conduct business.`);
			}
		}
	}

	function hugeButt() {
		if (canWalk(PC) && !(onBedRest(PC, true))) {
			if (PC.butt > 10) {
				r.push(`Your butt is a wonderful burden; it fills out whatever you wear, but also is a real pain to dress around, and then there is the looming chance of getting chairs stuck around it when you sit down. It also substantially juts out from you, leading to a tendency of accidentally bumping people with it as you walk by; more than one person has taken this as an invitation to give it a good feel.`);
			}
		}
	}

	function buttAccessibility() {
		if (isMovable(PC) && !(onBedRest(PC, true))) {
			if (PC.butt > 6) {
				r.push(`Your rear <span class="hindrance low">slows you down considerably,</span> and you have to plan ahead of time where to meet people to avoid any embarrassing situations involving it.`);
				if (V.buttAccessibility === 1) {
					r.push(`You're free from any of those concerns in the penthouse, so long as your slaves know how to get out of your junk filled trunk's way.`);
				} else if (PC.butt > 15) {
					r.push(`Too bad the same can't be said for the penthouse; chairs constantly follow you when you try to leave them, you're always trying to avoid knocking things over,`);
					if (V.boobAccessibility === 1 || V.pregAccessibility === 1 || V.ballsAccessibility === 1) {
						r.push(`but your ass has the clearance it demands due to the widened doors and halls.`);
					} else {
						r.push(`and you swear it is impossible to get anywhere without bouncing off door frames, walls, and bewildered slaves.`);
					}
				}
			}
		}
	}

	function hindrance() {
		const degree = isHinderedDegree(PC);

		if (degree !== 1 && !onBedRest(PC, true)) {
			r.push(`Overall,`);
			if (onBedRest(PC)) {
				r.push(`<span class="hindrance high">you're pretty limited,</span> but since you're working from bed, that's to be expected.`);
			} else if (degree <= .3) {
				r.push(`your body is <span class="hindrance max">a crippling hindrance to you.</span> It may be better to stop trying to live a normal life and just keep growing until you can no longer leave your bed; this way you'll never be expected to do things outside the penthouse and can work around your body.`);
			} else if (degree <= .5) {
				r.push(`your body is <span class="hindrance high">a major hindrance to you.</span>`);
			} else if (degree <= .7) {
				r.push(`your body is <span class="hindrance mid">a hindrance to you.</span>`);
			} else {
				r.push(`your body is only a <span class="hindrance low">minor hindrance.</span>`);
			}
		}
	}
};
