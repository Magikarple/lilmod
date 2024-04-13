App.Facilities.Dairy.industrialAssignmentScene = function(slave) {
	const node = new DocumentFragment();

	V.nextButton = "Continue";
	V.nextLink = V.returnTo;
	let r = [];
	const {
		He, His,
		he, him, his, himself
	} = getPronouns(slave);
	const {
		say:say, title: Master
	} = getEnunciation(slave);

	App.Events.drawEventArt(node, slave);


	r.push(`When ${slave.slaveName} reports to the dairy, it's to the`);
	if (canSee(slave)) {
		r.push(`sight of an unoccupied milking machine waiting for ${him},`);
	} else {
		r.push(`cold embrace of an unoccupied milking machine,`);
	}
	r.push(`its straps ready to immure ${him} in what is to be ${his} new home.`);

	if (slave.sexualFlaw === "self hating") { /* GETTING IN */
		r.push(`As ${he} realizes ${his} fate, a kind of peace comes over the self hating slut.`);
		if (!canTalk(slave)) {
			r.push(`${He}`);
			if (!hasAnyArms(slave)) {
				r.push(`mouths`);
			} else {
				r.push(`gestures`);
			}
			r.push(`${his} thanks dreamily.`);
		} else {
			r.push(
				Spoken(slave, `"Thank you, ${Master},"`),
				`${he} ${say}s simply.`,
				Spoken(slave, `"I deserve this,"`),
				`${he} adds quietly, half to ${himself}.`
			);
		}
		r.push(`Then ${he} falls silent and`);
		if (canSee(slave)) {
			r.push(`stares at`);
		} else {
			r.push(`faces`);
		}
		r.push(`the machine. Though ${he} hates ${himself} and looks forward to the release of being unable to do anything but get fucked, that doesn't mean ${he} isn't afraid.`);
		if (hasAnyArms(slave)) {
			if (V.dairyStimulatorsSetting > 1) {
				r.push(`${He} gauges the size of the sodomizer with ${his} hand, finding that it's wider than ${his} fist, and then presses the fist against ${his} own anus. Realizing what's about to happen, ${he} gives a little shudder.`);
				if (V.dairyPregSetting > 1 && isFertile(slave) && slave.mpreg !== 1) {
					r.push(`${He} does the same with the dildo that will keep ${him} pregnant and ${his} pussy, and ${his} lower lip starts to quiver.`);
				}
			} else {
				if (V.dairyPregSetting > 1 && isFertile(slave) && slave.mpreg !== 1) {
					r.push(`${He} gauges the size of the dildo that will keep ${him} pregnant with ${his} hand, finding that it's wider than ${his} fist, and then presses the fist against ${his} pussy. Realizing what's about to happen, ${he} gives a little shudder.`);
				}
			}
			if (V.dairyFeedersSetting > 1) {
				if (canSee(slave)) {
					r.push(`Looking at`);
				} else {
					r.push(`As ${he} wraps ${his} lips around`);
				}
				r.push(`the phallus that will feed ${him}, ${he} begins to cry softly.`);
			}
		}
		App.Events.addParagraph(node, r);
		r = [];
		if (hasAnyArms(slave)) {
			r.push(`${He} strips and climbs into the machine's embrace,`);
		} else {
			r.push(`Another slave helps ${him} strip and lays ${him} in the machine,`);
		}
		r.push(`${his} tears pattering onto the uncaring metal. When ${he}'s in place, ${his} shoulders slump as ${he} gives up completely.`);
		if (!canTalk(slave)) {
			r.push(`${He} mouths 'Goodbye.'`);
		} else if (SlaveStatsChecker.checkForLisp(slave)) {
			r.push(
				Spoken(slave, `"'Bye,"`),
				`${he} lisps.`
			);
		} else {
			r.push(
				Spoken(slave, `"'Bye,"`),
				`${he} whispers.`
			);
		}
	} else if ((slave.sexualFlaw === "breeder") && isFertile(slave) && slave.mpreg !== 1) {
		r.push(`As ${he} realizes what's about to happen, ${he} begins to cry openly. A curious mix of arousal, joy, and abject horror is obvious on ${his} face, and ${he} deals with the conflicting feelings by sobbing.`);
		if (!canTalk(slave)) {
			r.push(`${He}`);
			if (!hasAnyArms(slave)) {
				r.push(`mouths`);
			} else {
				r.push(`gestures`);
			}
			r.push(`${his} thanks shakily.`);
		} else {
			r.push(
				Spoken(slave, `"Th-thank you, ${Master},"`),
				`${he} ${say}s through ${his} tears.`,
				Spoken(slave, `"I love you."`)
			);
		}
		r.push(`Then ${he} falls silent and`);
		if (canSee(slave)) {
			r.push(`stares at`);
		} else if (hasAnyArms(slave)) {
			r.push(`reaches out to touch`);
		} else {
			r.push(`faces`);
		}
		r.push(`the machine. ${He}'s probably imagined this a thousand times, but the prospect is still frightening.`);
		if (hasAnyArms(slave)) {
			if (V.dairyStimulatorsSetting > 1) {
				r.push(`${He} gauges the size of the sodomizer with ${his} hand, finding that it's wider than ${his} fist, and then presses the fist against ${his} own anus. Realizing that ${his} anus is about to be permanently gaped, ${he} looks doubtful, but then visibly reassures ${himself}. ${He}'ll need both ${his} mouth and ${his} ass to eat enough.`);
			}
			if (V.dairyFeedersSetting > 1) {
				if (canSee(slave)) {
					r.push(`Looking at`);
				} else {
					r.push(`Turning to`);
				}
				r.push(`the phallus that will feed ${him}, ${he} inserts a finger into its faux urethra, measuring how fast it can pour nutrition in ${him}.`);
			}
			r.push(`${He} strokes the dildo that will keep ${him} pregnant like a lover, which, of course, it's about to be.`);
		}
		App.Events.addParagraph(node, r);
		r = [];
		if (hasAnyArms(slave)) {
			r.push(`${He} strips and climbs into the machine's embrace, shaking with nerves.`);
		} else {
			r.push(`Another slave helps ${him} strip and lays ${him} in the machine. ${He} shakes with nerves.`);
		}
		if (slave.pregKnown === 1) {
			r.push(`${He}`);
			if (canSee(slave)) {
				r.push(`cranes around to look at`);
			} else {
				r.push(`runs a hand down`);
			}
			r.push(`${his} already-pregnant belly, and looks impatient.`);
			if (canTalk(slave)) {
				r.push(
					Spoken(slave, `"Hurry up, I need the room,"`),
					`${he} whispers.`
				);
			} else {
				r.push(`${He} mouths 'hurry up, I need room.'`);
			}
		} else {
			r.push(`${He}`);
			if (canSee(slave)) {
				r.push(`cranes around to look at`);
			} else {
				r.push(`runs a hand down`);
			}
			r.push(`${his} belly, and looks impatient.`);
			if (!canTalk(slave)) {
				r.push(`${He} mouths 'come on, I'm ready.'`);
			} else {
				r.push(
					Spoken(slave, `"Come on, I'm ready,"`),
					`${he} whispers.`
				);
			}
		}
	} else if (slave.devotion > 95) { /* GETTING IN */
		r.push(`As ${he} realizes ${his} fate, the worshipful slave squares ${his} shoulders, steeling ${himself}.`);
		if (canTalk(slave)) {
			r.push(
				Spoken(slave, `"${Master},"`),
				`${he} ${say}s,`,
				Spoken(slave, `"I will do my best to serve you."`)
			);
		} else {
			r.push(`${He} gestures that ${he}'ll do ${his} best for you.`);
		}
		if (canWalk(slave)) {
			r.push(`${He} steps over to the machine.`);
		}
		if (canSee(slave)) {
			r.push(`${He} looks it over clinically,`);
		} else if (hasAnyArms(slave)) {
			r.push(`${He} runs a hand over it exploratively,`);
		} else {
			r.push(`${He} takes a deep breath,`);
		}
		r.push(`getting ${himself} into the right mindset.`);
		if (hasAnyArms(slave)) {
			if (V.dairyStimulatorsSetting > 1) {
				r.push(`${He} gauges the size of the massive phallus that will soon penetrate ${his} anus. It's broader than ${his} fist.`);
				if (canTalk(slave)) {
					r.push(Spoken(slave, `"I think I can take this. It'll be tough, but I'll need all the hydration I can get."`));
				} else {
					r.push(`${He} nods ${his} head, understanding that it will need to fit to keep ${him} hydrated.`);
				}
			}
			if (V.dairyPregSetting > 1 && isFertile(slave) && slave.mpreg !== 1) {
				r.push(`${He} considers the enormous dildo that will fill ${him} with cum when ${he}'s fertile, and switch to ejaculating drugs when ${he} conceives.`);
				if (canTalk(slave)) {
					r.push(
						Spoken(slave, `"I'll be a mother to a whole generation of slaves,"`),
						`${he} ${say}s proudly, taking strength from it.`
					);
				} else {
					r.push(`${He} takes strength in knowing that ${he}'ll birth a whole generation of new slaves.`);
				}
			}
			if (V.dairyFeedersSetting > 1) {
				r.push(`${He} moves ${his} hand to the dildo that will occupy ${his} throat, feeding ${him}.`);
				if (canTalk(slave)) {
					r.push(
						Spoken(slave, `"I will need my mouth to take in as much food as I can,"`),
						`${he} ${say}s.`,
						Spoken(slave, `"I won't be able to talk. So, I'll say it one last time, ${Master}: I love you."`)
					);
				} else {
					r.push(`${He} focuses on just how much time ${he}'ll need to spend with ${his} mouth full, so ${he} blows you one final kiss to show ${his} love.`);
				}
			}
		}
		App.Events.addParagraph(node, r);
		r = [];
		if (hasAnyArms(slave)) {
			r.push(`${He} strips and climbs into the machine's embrace.`);
		} else {
			r.push(`Another slave helps ${him} strip and lays ${him} in the machine.`);
		}
		r.push(`${He} does not hesitate or`);
		if (canSee(slave)) {
			r.push(`glance back at`);
		} else {
			r.push(`show any resistance to`);
		}
		r.push(`you. You stand by as the straps automatically tighten, robbing ${him} of the ability to move.`);
		if (canTalk(slave)) {
			r.push(
				Spoken(slave, `"${Master},"`),
				`${he} ${say}s quietly,`,
				Spoken(slave, `"I will try to be strong enough to stand up to this. But if I'm not, and I forget too much, please leave me in here so I can be useful."`)
			);
		} else {
			r.push(`${He} swears to you that ${he} will try ${his} best, but implores you to leave ${him} to the machine should ${his} mind fade.`);
		}
	} else if (slave.devotion > 60) {
		r.push(`As ${he} realizes ${his} fate, the tears come quickly.`);
		if (canTalk(slave)) {
			r.push(
				Spoken(slave, `"${Master},"`),
				`${he} ${say}s quietly, "is this for me?"`
			);
		} else {
			r.push(`${He} shakily gestures if this is where ${he} will be staying.`);
		}
		if (canSee(slave)) {
			r.push(`You nod, and ${he}`);
			if (canWalk(slave)) {
				r.push(`steps over to the machine.`);
			} else {
				r.push(`accepts ${his} fate.`);
			}
		} else if (canHear(slave)) {
			r.push(`You tell ${him} it is as ${he}`);
			if (canWalk(slave)) {
				r.push(`steps over to the machine.`);
			} else {
				r.push(`accepts ${his} fate.`);
			}
		} else {
			r.push(`place a hand on ${his} shoulder in confirmation and guide ${him} to the machine.`);
		}
		if (hasAnyArms(slave)) {
			r.push(`${He} lightly traces its gleaming metal, looking wistful.`);
			if (V.dairyStimulatorsSetting > 1) {
				r.push(`${He} gently touches the head of the massive phallus that will soon penetrate ${his} anus. It's broader than ${his} fist.`);
				if (canTalk(slave)) {
					r.push(Spoken(slave, `"M-my butthole isn't going to be any good for anal after this."`));
				} else {
					r.push(`${He} gestures jokingly that nothing will fit ${his} rear hole after this.`);
				}
			}
			if (V.dairyPregSetting > 1 && isFertile(slave) && slave.mpreg !== 1) {
				r.push(`${He} considers the enormous dildo that will fill ${him} with cum when ${he}'s fertile, and switch to ejaculating drugs when ${he} conceives.`);
				if (canTalk(slave)) {
					r.push(Spoken(slave, `"I guess that thing won't have any trouble reaching my cervix."`));
				} else {
					r.push(`${He} knows it won't have any trouble getting ${him} pregnant.`);
				}
			}
			if (V.dairyFeedersSetting > 1) {
				r.push(`${He} moves ${his} hand to the dildo that will occupy ${his} throat, feeding ${him}.`);
				if (canTalk(slave)) {
					r.push(
						Spoken(slave, `"I-I won't be able to t-talk m-much,"`),
						`${he} ${say}s sadly.`,
						Spoken(slave, `"S-so, I'll say it one last time, ${Master}: I love you."`)
					);
				} else {
					r.push(`${He} knows ${he} won't have another chance at this, so ${he} gives you one last tearful 'I love you'.`);
				}
			}
		}
		App.Events.addParagraph(node, r);
		r = [];
		if (hasAnyArms(slave)) {
			r.push(`${He}`);
			if (slave.clothes !== "no clothing") {
				r.push(`strips and`);
			}
			r.push(`climbs into the machine's embrace.`);
		} else {
			r.push(`Another slave helps ${him}`);
			if (slave.clothes !== "no clothing") {
				r.push(`strip and lays ${him} in`);
			} else {
				r.push(`into`);
			}
			r.push(`the machine.`);
		}
		if (canTalk(slave)) {
			r.push(
				Spoken(slave, `"${Master},"`),
				`${he} gasps out, the tears coming fast now.`,
				Spoken(slave, `"C-can you`)
			);
			if (hasAnyArms(slave)) {
				r.push(
					Spoken(slave, `h-hold my h-hand while it a-activates? Please?"`),
					`You take ${his} hand as the straps automatically tighten, robbing ${him} of the ability to move. ${He} grips your hand tightly.`
				);
			} else {
				r.push(
					Spoken(slave, `S-stay with me while it activates? Please?"`),
					`You stand by as the straps automatically tighten, robbing ${him} of the ability to move.`
				);
			}
		} else {
			r.push(`You can tell by the tears streaming down ${his} face that ${he} doesn't want to leave you so soon.`);
			if (hasAnyArms(slave)) {
				r.push(`You take ${his} hand as the straps automatically tighten, robbing ${him} of the ability to move. ${He} grips your hand tightly.`);
			} else {
				r.push(`You stand by as the straps automatically tighten, robbing ${him} of the ability to move.`);
			}
		}
	} else if (slave.devotion > 20) {
		r.push(`${He} desperately tries to be brave and obey, but as ${his} fate dawns on ${him}, ${his} courage and conditioning fail ${him}.`);
		if (!hasAnyLegs(slave)) {
			r.push(`${He} tries to wriggle away from the machine, so`);
		} else {
			r.push(`${He} turns and tries to run, so`);
		}
		if (V.MilkmaidID !== 0) {
			r.push(`${S.Milkmaid.slaveName} is`);
		} else {
			r.push(`you are`);
		}
		r.push(`obliged to`);
		if (!isAmputee(slave)) {
			r.push(`subdue ${him} and strap ${him},`);
		} else {
			r.push(`place ${him},`);
		}
		r.push(`begging and sobbing, into the machine's embrace.`);
		if (canTalk(slave)) {
			r.push(
				Spoken(slave, `"Please, ${Master}!"`),
				`${he} begs.`,
				Spoken(slave, `"Please no!`)
			);
			if (V.dairyStimulatorsSetting > 1) {
				r.push(Spoken(slave, `I-it'll fuck my b-butthole so wide I'll be useless for anal!`));
			}
			if (V.dairyPregSetting > 2 && isFertile(slave) && slave.mpreg !== 1) {
				r.push(Spoken(slave, `My w-womb c-c-can't take it! I'll b-burst! And m-my c-c-cunt will be ruined from the dildo and birthing!`));
			} else if ((V.dairyPregSetting > 1) && isFertile(slave) && slave.mpreg !== 1) {
				r.push(Spoken(slave, `M-my c-c-cunt will be s-so stretched from the dildo and birthing!`));
			}
			r.push(Spoken(slave, `I'll d-do anything!"`));
		} else {
			r.push(`${He} pitifully begs for anything but this, even going as far as trying to convey what the machine will do to ${him}, but it will do ${him} no good.`);
		}
	} else {
		r.push(`${He} starts to weep as soon as ${he} realizes ${his} fate.`);
		if (slave.trust >= -20) {
			r.push(`${He} is afraid of you, but not afraid enough that ${he} will not resist this.`);
		}
		if (hasAnyLegs(slave)) {
			r.push(`${He} tries to wriggle away from the machine, so`);
		} else {
			r.push(`${He} turns and tries to run, so`);
		}
		if (V.MilkmaidID !== 0) {
			r.push(`${S.Milkmaid.slaveName} is`);
		} else {
			r.push(`you are`);
		}
		r.push(`obliged to`);
		if (!isAmputee(slave)) {
			r.push(`subdue ${him} and strap ${him},`);
		} else {
			r.push(`place ${him},`);
		}
		r.push(`begging and sobbing, into the machine's embrace.`);

		if (canTalk(slave)) {
			r.push(
				Spoken(slave, `"Please, ${Master}!"`),
				`${he} begs.`,
				Spoken(slave, `"Please no!`)
			);
			if (V.dairyStimulatorsSetting > 1) {
				r.push(Spoken(slave, `I-it'll fuck my b-butthole so loose I'll be useless for anal! I p-promise I'll be a good little bitch from now on!`));
			}
			if (V.dairyPregSetting > 2 && isFertile(slave) && slave.mpreg !== 1) {
				r.push(Spoken(slave, `My w-womb c-c-can't take that many babies>>! I'll b-burst! M-my c-c-cunt can't t-take that dildo either! I d-don't want to g-get p-pregnant over and over...`));
			} else if ((V.dairyPregSetting > 1) && isFertile(slave) && slave.mpreg !== 1) {
				r.push(Spoken(slave, `M-my c-c-cunt can't t-take that dildo! I d-don't want to g-get p-pregnant over and over...`));
			}
			r.push(Spoken(slave, `I'll d-do anything!"`));
		} else {
			r.push(`${He} pitifully begs for to have mercy on ${him} and not subject ${him} to the machines 'features', but it will do ${him} no good.`);
		}
	}

	if (slave.lactation > 0) {
		r.push(`A big soft cup attaches itself`);
		if (slave.nipples === "fuckable" || slave.nipples === "flat") {
			r.push(`over`);
		} else {
			r.push(`to`);
		}
		r.push(`each of ${his} nipples.`);
		if (slave.nipples === "inverted") {
			r.push(`${He} gasps with pain as suction unceremoniously hauls ${his} inverted nipples down into the cups.`);
		} else if (slave.nipples === "fuckable") {
			r.push(`${He} gasps with surprise as a phallic rods unceremoniously slip into ${his} nipples to better harvest ${his} milk.`);
		}
	}
	if (slave.balls > 0) {
		if (slave.dick > 0) {
			r.push(`The first drugs hiss into ${him},`);
			if (slave.dick > maxErectionSize(slave) + 2) {
				r.push(`and ${his} eyes roll back as much of ${his} blood volume rushes into ${his} dick, though it remains soft.`);
			} else if (slave.dick > maxErectionSize(slave)) {
				r.push(`and ${he} goes limp as much of ${his} blood volume rushes to bring ${him} to half mast.`);
			} else {
				r.push(`bringing ${him} to a full erection.`);
			}
			r.push(`${He} gasps as the warm, wet receptacle surrounds ${his} cock.`);
		} else {
			if (slave.lactation > 0) {
				r.push(`Another`);
			} else {
				r.push(`A big soft`);
			}
			r.push(`cup is placed against ${his} little front cumhole.`);
		}
	}
	r.push(`A visor lowers onto ${his} face to keep ${his} mind at least minimally stimulated.`);
	if (canHear(slave) && !canSee(slave)) {
		r.push(`It will play audio from`);
	} else {
		r.push(`It will display garish`);
	}
	r.push(`hardcore pornography featuring`);
	if (V.dairyFeedersSetting > 1) {
		r.push(`throatfucking, cum swallowing,`);
	}
	if (V.dairyPregSetting > 1 && isFertile(slave) && slave.mpreg !== 1) {
		r.push(`bareback vaginal sex, pregnancy, childbirth,`);
	}
	if (slave.balls > 0) {
		r.push(`cumming cocks, anal stimulation,`);
	}
	if (slave.lactation > 0) {
		r.push(`breast expansion, women being milked,`);
	}
	r.push(`and brutal sodomy.`);
	if (!canHear(slave) && !canSee(slave)) {
		r.push(`Of course, ${he} won't enjoy any of that and will be left entirely at the mercy of the sensations running through ${his} flesh.`);
	}
	App.Events.addParagraph(node, r);
	r = [];

	if (slave.anus < 3 || (slave.vagina < 3 && slave.vagina > -1)) {
		slave.anus = 3;
		if (slave.vagina > -1) {
			slave.vagina = 3;
		}
		r.push(`The machine detects that ${he} requires the attention of the preparatory raper before it can penetrate ${him} successfully, and holds ${him} in place while the raper slides along its track in the ceiling. It comes to rest above the slave's defenseless body and extends its implements towards ${him}. ${He} can't see or hear it, but ${he} senses that something's happening and shivers.`);
		if (V.dairyPregSetting > 1 && isFertile(slave) && slave.vagina < 3 && slave.mpreg !== 1) {
			r.push(`${His} pussy is nowhere near ready to accept the passage of drugs and cum in and new slaves out. The new machine lubes ${him} thoroughly and then`);
			if (slave.vagina === 0) {
				r.push(`takes ${his} virginity`);
			} else {
				r.push(`starts to fuck ${him}`);
			}
			r.push(`with a reasonably sized dildo.`);
		}
		if (V.dairyStimulatorsSetting > 1 && slave.anus < 3) {
			r.push(`${He}'ll be drinking through ${his} mouth almost constantly, but that won't be enough. ${He}'ll have to absorb hydration and nutrition from both ends to keep up with the outflow ${he}'ll produce.`);
			if (V.dairyPregSetting > 1 && isFertile(slave) && slave.vagina < 3 && slave.mpreg !== 1) {
				r.push(`It`);
			} else {
				r.push(`The new machine`);
			}
			r.push(`fills ${his} ass with lube and then penetrates ${his}`);
			if (slave.anus === 0) {
				r.push(`virgin anus`);
			} else {
				r.push(`rectum`);
			}
			r.push(`gently.`);
		}
		r.push(`${He}'s worked in gradually, but every time ${he}'s loosened just slightly, the now-inadequate dildo is replaced by a larger one, and eventually more than one.`);
		if (V.dairyPregSetting > 1 && isFertile(slave) && slave.vagina < 3 && slave.mpreg !== 1) {
			if (V.dairyStimulatorsSetting > 1 && slave.anus < 3) {
				r.push(`${He} goes from a dildo in the pussy and a dildo in the ass, through numerous interesting combinations of double penetration, until ${he}'s got two porn star sized dildos sliding in and out of ${his} pussy and two more fucking ${his} ass.`);
			} else {
				r.push(`${His} womanhood goes from a normal dildo to a big dildo to two dildos, and so on, until ${he}'s taking the equivalent of two porn star cocks.`);
			}
		} else {
			r.push(`${His} asshole goes from a normal dildo to a big dildo to two dildos, and so on, until ${he}'s taking the equivalent of two porn star cocks up the butt.`);
		}
		r.push(`This is a long process, and though`);
		if (slave.devotion > 95) {
			r.push(`${he} started out getting off on it,`);
		} else if (slave.devotion > 60) {
			r.push(`${he} did ${his} best to enjoy ${himself} for a while,`);
		} else if (slave.devotion > 20) {
			r.push(`${he} tried to relax and make it easier on ${himself} at the start,`);
		} else {
			r.push(`${he} cried and tried to break loose for a while,`);
		}
		r.push(`${he}'s slumped against the machine from sheer exhaustion by the end. Its work completed, the preparatory raper withdraws and lets the milking machine begin its work. It's only been a few hours since ${slave.slaveName}'s ordeal began, but now ${he}'s ready to begin giving back. The machine revives ${him} with a hit of pharmaceuticals.`);

		App.Events.addParagraph(node, r);
		r = [];
	}

	if (V.dairyPregSetting > 1 && isFertile(slave) && slave.mpreg !== 1) {
		r.push(`${His} vagina goes first. ${He} relaxes ${his} loose cunt for the elephantine dildo, but despite ${his} best efforts, it forces a gasp out of ${him} as it slides in. It remains stationary for now, but ${slave.slaveName} know it's just the beginning, and ${he} already feels full to bursting.`);
		if (slave.devotion > 95) {
			r.push(`${He} takes more deep breaths, doing ${his} best to remain calm.`);
		} else if (slave.devotion > 60) {
			r.push(`Terrified, ${he} cries harder.`);
		} else if (slave.devotion > 20) {
			r.push(`Terrified, ${he} cries harder.`);
		} else {
			r.push(`Terrified, ${he} starts to`);
			if (!canTalk(slave)) {
				r.push(`soundlessly`);
			}
			r.push(`scream and cry.`);
		}
	} else if (V.dairyPregSetting > 0 && isFertile(slave) && slave.mpreg !== 1) {
		if (slave.devotion > 95) {
			r.push(`${He} moans with pleasure`);
		} else if (slave.devotion > 60) {
			r.push(`${He} gasps`);
		} else if (slave.devotion > 20) {
			r.push(`${He} moans with fear`);
		} else {
			r.push(`${He} moans with anguish`);
		}
		r.push(`as the machine inserts a warm, lubricated dildo into ${his} vagina.`);
	}
	if (V.dairyStimulatorsSetting > 1) {
		r.push(`${His} anus is next. An auxiliary dildo the size of the largest human cocks goes first, assraping ${him} so hard ${he}'d probably be injured if ${he} wasn't already very loose.`);
		if (slave.devotion > 95) {
			r.push(`${He} relaxes and does ${his} best to enjoy ${himself}, ${his} cheeks flushing with arousal. Once ${his} sphincter is well stretched, the machine withdraws the dildo, and before ${his} anus can begin to close, the machine replaces it with the main instrument. Despite the preparation, it's so huge that ${he} moans with fear ${he} feels the head touch ${his} buttocks. The moan becomes a long low groan as ${his} butthole accommodates the enormous thing. When it's all the way in, the dildo begins to withdraw for its first stroke, and ${he}`);
			if (canTalk(slave)) {
				r.push(`whispers, "${Master}, it's s-so b-big." ${He} relaxes and recollects ${himself}, and then adds, "I can do this."`);
			} else {
				r.push(`begins distressing over its size before relaxing and recollecting ${himself}. ${He} smiles to show you ${he} can do this.`);
			}
		} else if (slave.devotion > 60) {
			r.push(`${He} tries to`);
			if (slave.skill.anal > 10) {
				r.push(`apply ${his} anal training,`);
			} else {
				r.push(`relax,`);
			}
			r.push(`but it fucks ${his} butt so mercilessly that ${he} eventually gives up and relaxes completely. This is what the machine was aiming for; it withdraws the dildo, and before ${his} sphincter can close, it replaces it with the main instrument. Despite the preparation, it's so huge that ${he} begins to`);
			if (!canTalk(slave)) {
				r.push(`silently`);
			}
			r.push(`scream in terror as ${he} feels the head touch ${his} buttocks. ${His}`);
			if (canTalk(slave)) {
				r.push(`yelling becomes a drawn-out shriek`);
			} else {
				r.push(`pointless yelling turns to struggling`);
			}
			r.push(`as ${his} butthole accommodates the enormous thing. When ${he} finally runs out of breath and slumps within ${his} restraints, the dildo begins to withdraw for its first stroke, and ${he}`);
			if (canTalk(slave)) {
				r.push(`whispers, "${Master}, it's too b-big. It hu-hurts."`);
			} else {
				r.push(`attempts to tell you that it is too big for ${his} hole.`);
			}
		} else if (slave.devotion > 20) {
			r.push(`Crying, ${he} tries to`);
			if (slave.skill.anal > 10) {
				r.push(`apply ${his} anal training,`);
			} else {
				r.push(`relax,`);
			}
			r.push(`but it fucks ${his} butt so mercilessly that ${he} eventually gives up and relaxes completely. This is what the machine was aiming for; it withdraws the dildo, and before ${his} sphincter can close, it replaces it with the main instrument. Despite the preparation, it's so huge that ${he} begins to beg desperately as ${he} feels the head touch ${his} buttocks. ${His}`);
			if (canTalk(slave)) {
				r.push(`whining becomes a drawn-out shriek`);
			} else {
				r.push(`soundless whining turns to struggling`);
			}
			r.push(`as ${his} butthole accommodates the enormous thing. When ${he} finally runs out of breath and slumps within ${his} restraints, the dildo begins to withdraw for its first stroke, and ${he} is racked with sobs.`);
		} else {
			r.push(`${He} obviously thinks this is what ${his} butt will suffer, and doesn't like it. ${He}'s tragically wrong. When ${he} finally relaxes, the machine withdraws the dildo, and before ${his} sphincter can close, it replaces it with the main instrument.`);
			if (canTalk(slave)) {
				r.push(`${He} screams with the horror of realization and begins to beg desperately as ${he} feels its head touch ${his} buttocks. ${His} cries become a drawn-out shriek as ${his} butthole accommodates the enormous thing.`);
			} else {
				r.push(`${He} attempts to fling ${himself} from the machine with the horror of realization begins to flail desperately as ${he} feels its head touch ${his} buttocks. ${His} efforts double as ${his} butthole accommodates the enormous thing.`);
			}
			r.push(`When ${he} finally runs out of breath and slumps within ${his} restraints, the dildo begins to withdraw for its first stroke, and ${he} is racked with weeping.`);
		}
		if (V.dairyPregSetting > 1 && isFertile(slave) && slave.mpreg !== 1) {
			r.push(`The dildo in ${his} vagina begins to fuck ${him} as well. Between ${his} terribly broadened holes, ${his} stretched perineum is barely visible at all.`);
		}
	} else if (V.dairyStimulatorsSetting > 0) {
		if (slave.devotion > 95) {
			r.push(`${He} groans as the machine pushes a big dildo up ${his} butt and begins to sodomize ${him} powerfully.`);
		} else if (slave.devotion > 60) {
			r.push(`${He} sobs as the machine pushes a big dildo up ${his} butt and begins to sodomize ${him} powerfully.`);
		} else if (slave.devotion > 20) {
			r.push(`${He} sobs as the machine pushes a big dildo up ${his} butt and begins to sodomize ${him} powerfully.`);
		} else {
			r.push(`${He} cries as the machine pushes a big dildo up ${his} butt and begins to sodomize ${him} powerfully.`);
		}
	}
	if (V.dairyFeedersSetting > 1) {
		if (slave.devotion > 95) {
			r.push(`A manipulator prods ${his} jaw open and a phallus slides into ${his} throat, working around for a while to find the optimal position for maximum penetration where ${he} can still breathe through ${his} nose. There is a hiss as the food begins rushing through the phallus and down ${his} throat.`);
		} else if (slave.devotion > 60) {
			if (canTalk(slave)) {
				r.push(`${He} tries to say something, but ${he} left it too late.`);
			}
			r.push(`A manipulator forces ${his} jaw open and a phallus slides into ${his} throat, working around for a while to find the optimal position for maximum penetration where ${he} can still breathe through ${his} nose. There is a hiss as the food begins rushing through the phallus and down ${his} throat.`);
		} else if (slave.devotion > 20) {
			r.push(`${His} crying is abruptly cut off as a manipulator forces ${his} jaw open and a phallus slides into ${his} throat, working around for a while to find the optimal position for maximum penetration where ${he} can still breathe through ${his} nose.`);
		} else {
			r.push(`${He} cries hopelessly,`);
			if (canTalk(slave)) {
				r.push(
					Spoken(slave, `"I'm n-never going t-to leave h-here, am I, —"`),
					`${His} noise`
				);
			} else {
				r.push(`until ${his} sobbing`);
			}
			r.push(`is abruptly cut off as a manipulator forces ${his} jaw open and a phallus slides into ${his} throat, working around for a while to find the optimal position for maximum penetration where ${he} can still breathe through ${his} nose.`);
		}
	} else if (V.dairyFeedersSetting > 0) {
		if (slave.devotion > 95) {
			r.push(`The machine gives ${him} a phallus to suck on.`);
		} else if (slave.devotion > 60) {
			if (canTalk(slave)) {
				r.push(`${He} tries to say something, but ${he} left it too late.`);
			}
			r.push(`The machine gives ${him} a phallus to suck on.`);
		} else if (slave.devotion > 20) {
			r.push(`${His} crying is abruptly cut off as the machine gives ${him} a phallus to suck on.`);
		} else {
			r.push(`${He} cries hopelessly,`);
			if (canTalk(slave)) {
				r.push(
					Spoken(slave, `"I'm n-never going t-to leave h-here, am I, —"`),
					`${His} noise`
				);
			} else {
				r.push(`until ${his} sobbing`);
			}
			r.push(`is abruptly cut off as the machine forces a phallus into ${his} mouth.`);
		}
	}

	App.Events.addParagraph(node, r);
	r = [];
	r.push(`With its various applicators inserted and working, the machine begins to ejaculate necessary fluids into ${his} body. You cannot see much direct evidence, but the inrush of fluids is clear from the draining reservoirs scattered around the machine.`);
	if (V.dairyStimulatorsSetting > 1) {
		r.push(`The gargantuan phallus fucking ${his} butthole ejaculates industrial lubricant, hydration, nutrition, and medication, to be absorbed by ${his} lower intestines.`);
	} else if (V.dairyStimulatorsSetting > 0) {
		r.push(`The phallus fucking ${his} ass ejaculates hydration, nutrition, and medication, to be absorbed by ${his} colon.`);
	}
	if (V.dairyPregSetting > 1 && isFertile(slave) && slave.mpreg !== 1) {
		r.push(`The dildo in ${his} vagina ejaculates cum, fertility drugs, and medication designed to cause uncontrollable natural lubrication, so it will not damage ${him} too severely.`);
	} else if (V.dairyPregSetting > 0 && isFertile(slave) && slave.mpreg !== 1) {
		r.push(`The dildo in ${his} vagina ejaculates cum and fertility drugs.`);
	}
	if (V.dairyFeedersSetting > 0) {
		r.push(`There is a hiss as still more fluid containing hydration, nutrition, and medication begins rushing through the phallus in ${his} mouth and down ${his} throat.`);
	}
	r.push(`Finally, multiple drug injectors attach themselves to ${him} and begin to use hypersonic jets to drive pharmaceuticals into ${him} without needles.`);
	if (slave.devotion > 95) {
		r.push(`${His} eyes fly wide as ${he}`);
		if (canHear(slave)) {
			r.push(`hears and`);
		}
		r.push(`feels the number of injections. ${He} knows these drugs are not without side effects, and ${he}'s being injected with a normal day's dose every minute. ${He} musters ${his} resolve and relaxes again, relying on ${his} knowledge that you want ${him} to accept this fate.`);
	} else if (slave.devotion > 60) {
		r.push(`${His} eyes fly wide and ${he} stiffens with fear as ${he}`);
		if (canHear(slave)) {
			r.push(`hears and`);
		}
		r.push(`feels the number of injections. ${He} knows these drugs are not without side effects, and ${he}'s being injected with a normal day's dose every minute. ${He} visibly tries to accept it, knowing that you want ${him} to submit to this fate.`);
	} else if (slave.devotion > 20) {
		r.push(`The tears streaming out of ${his} eyes come faster as ${he}`);
		if (canHear(slave)) {
			r.push(`hears and`);
		}
		r.push(`feels the number of injections. ${He} knows these drugs are not without side effects, and ${he}'s being injected with a normal day's dose every minute.`);
	} else {
		r.push(`${He} begins to struggle desperately as ${he}`);
		if (canHear(slave)) {
			r.push(`hears and`);
		}
		r.push(`feels the number of injections. ${He} knows these drugs are not without side effects, and ${he}'s being injected with a normal day's dose every minute.`);
	}
	App.Events.addParagraph(node, r);
	r = [];
	r.push(`Fluids begin to come out of ${him}. The drugs are strong, and despite everything ${he} experiences an orgasm so powerful that it's clear why the straps that bind ${him} are reinforced.`);
	if (slave.balls > 0) {
		if (slave.dick > 0) {
			r.push(`The anal dildo fucks ${him} even harder,`);
		} else {
			r.push(`If ${he} had a dick, it would be caressed by a nice warm receptacle, but ${he} doesn't. The milker is forced to rape ${his} ass without mercy to force ${him} to cum,`);
		}
		r.push(`and ${he} tries to scream around the dildo in ${his} mouth.`);
		if (slave.scrotum > 0) {
			r.push(`${His} balls tighten as ${he}`);
		} else {
			r.push(`${He}`);
		}
		r.push(`shoots rope after rope of semen into the machine.`);
	}
	if (slave.vagina > -1) {
		r.push(`${He} gives the machine a nice gush of femcum.`);
	}
	if (slave.lactation > 0) {
		r.push(`The cups sucking ${his} nipples work away ceaselessly, ${his} milk whitening the clear piping running into the machine.`);
		slave.lactationDuration = 2;
		slave.boobs -= slave.boobsMilk;
		slave.boobsMilk = 0;
	}
	r.push(`The machine continues fucking ${him} despite ${his} climax.`);
	if (slave.devotion > 95) {
		r.push(`Though it's difficult to tell, it's possible ${he}'s smiling around the dildo in ${his} mouth. ${He} may be such a well-broken sex slave that ${he} can stand up to a life of nothing but drugs, milking, and an endless string of orgasms. To ease ${his} acclimation to ${his} new life, the drug cocktail is adjusted as ${his} orgasm fades,`);
	} else if (slave.devotion > 60) {
		r.push(`Despite ${his} attempt to be brave, tears begin to leak out from behind ${his} visor as ${he} realizes that there will be no respite from the penetration. The drug cocktail is adjusted as ${his} orgasm fades,`);
	} else if (slave.devotion > 20) {
		r.push(`To ease ${his} acclimation to ${his} new life, the drug cocktail is adjusted as ${his} orgasm fades,`);
	} else {
		r.push(`To allow ${him} some rest despite ${his} terror, the drug cocktail is adjusted as ${his} orgasm fades,`);
	}
	r.push(`to put ${him} to sleep. ${He} slumps against the machine as ${he} drops off.`);
	if (hasAnyArms(slave)) {
		r.push(`${His} painfully tight grip on your hand finally loosens.`);
	}
	if (V.dairyStimulatorsSetting > 1) {
		r.push(`${His} anus has not yet stretched to take the necessary full power setting, so ${he} is gently sodomized as ${he} sleeps to get ${his} sphincter used to its permanent occupier.`);
	}
	if (slave.belly < 1500) {
		r.push(`${His} belly has already begun to distend from the mass of fluid ejaculated down ${his} throat and into ${his} stomach,`);
		if (slave.ovaries === 1) {
			r.push(`inside ${his} womanhood and into ${his} womb, and`);
		}
		r.push(`up ${his} butt and into ${his} lower intestine.`);
	}

	r.push(`Silence returns to the dairy.`);
	App.Events.addParagraph(node, r);
	return node;
};
