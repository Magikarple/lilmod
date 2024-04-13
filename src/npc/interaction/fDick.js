/**
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.Interact.fDick = function(slave) {
	const frag = new DocumentFragment();

	const {
		He, His,
		he, his, him, himself
	} = getPronouns(slave);

	// TODO: .pregMood and more amp variants

	seX(slave, "penetrative", V.PC, V.PC.vagina !== -1 ? "vaginal" : "anal");

	const cunt = V.PC.vagina !== -1 ? "cunt" : "rectal"; // TODO: probably ought to be able to *choose* vaginal or anal sex if they're both valid
	const belly = bellyAdjective(slave);
	const amount = cumAmount(slave);

	let load;
	if (amount <= 30) {
		load = "a few timid spurts";
	} else if (amount <= 60) {
		load = "an average load";
	} else if (amount <= 80) {
		load = "a large load";
	} else if (amount <= 100) {
		load = "a massive spurt of seed";
	} else if (amount <= 140) {
		load = "a huge spurt of seed";
	} else if (amount <= 160) {
		load = "a giant and drawn out gush";
	} else if (amount <= 180) {
		load = "an enormous and belly swelling load";
	} else if (amount <= 200) {
		load = "a monstrous, drawn out and belly swelling load";
	} else {
		load = "an overly massive and unending gush of seed";
	}

	let ballSize;
	if (slave.balls === 1) {
		ballSize = "vestigial";
	} else if (slave.balls === 2) {
		ballSize = "small";
	} else if (slave.balls === 3) {
		ballSize = "average";
	} else if (slave.balls === 4) {
		ballSize = "large";
	} else if (slave.balls === 5) {
		ballSize = "massive";
	} else if (slave.balls === 6) {
		ballSize = "huge";
	} else if (slave.balls === 7) {
		ballSize = "giant";
	} else if (slave.balls === 8) {
		ballSize = "enormous";
	} else if (slave.balls === 9) {
		ballSize = "monstrous";
	} else {
		ballSize = "overly massive";
	}

	let dickAdj;
	if (slave.dick === 1) {
		dickAdj = "tiny";
	} else if (slave.dick === 2) {
		dickAdj = "cute";
	} else if (slave.dick === 3) {
		dickAdj = "average";
	} else if (slave.dick === 4) {
		dickAdj = "big";
	} else if (slave.dick === 5) {
		dickAdj = "impressive";
	} else if (slave.dick === 6) {
		dickAdj = "huge";
	} else if (slave.dick === 7) {
		dickAdj = "gigantic";
	} else if (slave.dick === 8) {
		dickAdj = "titanic";
	} else if (slave.dick === 9) {
		dickAdj = "absurd";
	} else if (slave.dick === 10) {
		dickAdj = "inhuman";
	} else {
		dickAdj = "hypertrophied";
	}

	const text = new SpacedTextAccumulator(frag);

	text.push(
		consummation(),
		cleanup(),
	);

	if (canImpreg(V.PC, slave)) {
		if (slave.diet === "cum production") {
			const pregChance = (slave.balls * 5 * 1.2);
			text.push(knockMeUp(V.PC, pregChance, 0, slave.ID));
		} else {
			const pregChance = (slave.balls * 5);
			text.push(knockMeUp(V.PC, pregChance, 0, slave.ID));
		}
	}

	if (V.policies.sexualOpenness === 0) {
		text.push(rumors());

		V.PC.degeneracy += 2;
	}

	text.toParagraph();

	return frag;

	function consummation() {
		const text = [];

		if (V.PC.vagina === 0) {
			text.push(`You've decided that this is the day to finally <span class="virginity loss">lose your virginity,</span> and ${slave.slaveName} is going to help you do it.`);
		} else if (V.PC.vagina === -1 && V.PC.anus === 0) {
			text.push(`You've decided that this is the day to finally <span class="virginity loss">lose your anal virginity,</span> and ${slave.slaveName} is going to help you do it.`);
		}

		if (!isAmputee(slave)) {
			text.push(`You direct ${slave.slaveName} to lie down and ready ${himself} as you step over to ${him} and align your`);

			if (V.PC.vagina !== -1) {
				if (V.PC.vagina === 0) {
					text.push(`untouched`);
					V.PC.vagina = 1;
				}
				text.push(`vagina`);
			} else {
				if (V.PC.anus === 0) {
					text.push(`untouched`);
					V.PC.anus = 1;
				}
				text.push(`ass`);
			}

			text.push(`with ${his}`);

			if (slave.piercing.vagina.weight > 1 && slave.dick !== 0) {
				text.push(`pierced cock-head.`);
			} else if (slave.piercing.vagina.weight === 1 && slave.dick !== 0) {
				text.push(`pierced cock.`);
			} else {
				text.push(`cock.`);
			}

			if (slave.fetish !== Fetish.MINDBROKEN && slave.fuckdoll === 0) {
				if (slave.devotion > 20) {
					text.push(`${He} thought ${he} would be fucking another slave, not ${his} ${getWrittenTitle(slave)}, so to say ${he}'s pleasantly surprised would be an understatement.`);
				} else if (slave.devotion >= -20) {
					text.push(`${He} thought ${he} would be fucking another slave, not ${his} ${getWrittenTitle(slave)} ${he} has mixed feelings about this, but ${his} body can't wait to plunge your depths.`);
				} else {
					if (slave.trust < -20) {
						text.push(`${He} was already horrified at the thought of being ordered to lie down and let another slave rape ${his} dick, but when ${he} realized it would be you instead, that horror turned to a mix of confusion and sheer terror.`);
					} else {
						text.push(`${His} dick springs to life at the prospect of plunging into your depths; this may be ${his} chance to one up you for a change.`);
					}
				}
			}

			text.push(`You slowly lower yourself onto ${his} ${dickAdj} dick, savoring every`);

			if (V.showInches === 2) {
				text.push(`inch,`);
			} else {
				text.push(`centimeter,`);
			}

			if (slave.dick <= 6) {
				text.push(`until you find yourself hilted and sitting on ${his} pelvis.`);
			} else {
				text.push(`until you feel that you can't take any more of ${him} inside you.`);
			}

			text.push(`Making eye contact${!canSee(slave) ? `(inasmuch as you can)` : ``}, you reach`);

			if (V.PC.belly < 5000 && slave.belly < 5000) {
				text.push(`back`);
			} else {
				text.push(`down`);
			}

			if (slave.scrotum > 0) {
				text.push(`and stroke ${his} ${ballSize} balls,`);
			} else if (slave.vagina > -1) {
				text.push(`and tease ${his} neglected pussy,`);
			} else {
				text.push(`and stroke ${his} soft perineum,`);
			}

			text.push(`making it abundantly clear that you want ${his} cum.`);

			if (slave.fetish === Fetish.MINDBROKEN) {
				text.push(`Like a doll, ${he} dumbly remains still, completely indifferent that ${he}'s deep in ${his} ${getWrittenTitle(slave)}'s`);

				if (V.PC.vagina !== -1) {
					text.push(`pussy.`);
				} else {
					text.push(`butt.`);
				}

				text.push(`You start moving up and on ${his} shaft, continuing until you climax and lift yourself off of ${him}. A strand of cum slips from your`);

				if (V.PC.vagina !== -1) {
					text.push(`slit;`);
				} else {
					text.push(`anus;`);
				}

				text.push(`it seems ${slave.slaveName} came too. Since ${he} is mindbroken, ${his} responses to you are purely physiological and your actions have no affect on ${him} mentally. You leave your toy for one of your other slaves to clean and maintain.`);
			} else if (slave.devotion > 50) {
				if (slave.trust < -20) {
					text.push(`Having followed your instructions as quickly as ${he} could in fear of your wrath, ${he} tries ${his} best to please you while you bounce`);

					if (V.PC.belly >= 5000) {
						text.push(`your gravid bulk`);
					}

					text.push(`on ${his} obedient cock. ${He} timidly warns you that ${he} is about to cum; in response you speed up your pace and clamp down hard on ${his} throbbing shaft. ${He} squeaks lewdly, overwhelmed by your orgasmic ${cunt} spasms, and unloads ${load} inside of you before apologizing submissively.`);
				} else if (slave.trust <= 20) {
					text.push(`Having followed your instructions quickly and obediently, ${he} tries ${his} best to please you while you bounce`);

					if (V.PC.belly >= 5000) {
						text.push(`your gravid bulk`);
					}

					text.push(`on ${his} eager cock. ${He} grabs your hips and warns you ${he} is about to cum; in response you speed up your pace, encouraging ${him} to impale you on ${his} throbbing shaft. ${He} squeals lewdly, overwhelmed by your orgasmic ${cunt} spasms, and unloads ${load} into you before helping you up.`);
				} else {
					text.push(`Having followed your instructions with gusto, ${he} energetically pounds you while you bounce`);

					if (V.PC.belly >= 5000) {
						text.push(`your gravid bulk`);
					}

					text.push(`on ${his} eager cock. ${He} grabs your hips and desperately warns you ${he} can't hold out any longer; in response you speed up your pace, tipping ${him} over the edge and forcing ${him} to impale you on ${his} twitching shaft. ${He} moans loudly, overwhelmed by your orgasmic ${cunt} spasms, and unloads ${load} into you before pulling you into a post coitus embrace.`);
				}
			} else if (slave.devotion >= -20) {
				if (slave.trust < -20) {
					text.push(`Having hesitatingly followed your instructions, ${he} lies as still as ${he} can beneath you while you bounce`);

					if (V.PC.belly >= 5000) {
						text.push(`your gravid bulk`);
					}

					text.push(`on ${his} terrified cock. While ${he} is too afraid to enjoy pleasuring you, ${he} obediently thrusts into you. ${He} timidly warns you that ${he} is about to cum; in response you speed up your pace and clamp down hard on ${his} throbbing shaft. ${He} cries out in surprise, overwhelmed by your orgasmic ${cunt} spasms, and blows ${load} in you like a good little slave.`);
				} else if (slave.trust <= 20) {
					text.push(`Having obediently followed your instructions, ${he} lies as still as ${he} can beneath you while you bounce`);

					if (V.PC.belly >= 5000) {
						text.push(`your gravid bulk`);
					}

					text.push(`on ${his} willing cock. While ${he} is too uncertain of ${his} position in the hierarchy to really enjoy ${himself}, ${he} hesitatingly thrusts into you. When ${he} feels ${he} is nearing ${his} limit, ${he} gives you proper warning that ${he} is about to cum; in response you speed up your pace and clamp down hard on ${his} throbbing shaft. ${He} cries out in surprise, overwhelmed by your orgasmic ${cunt} spasms and boldness, and blows ${load} in you during the confusion.`);
				} else {
					text.push(`Having obediently followed your instructions, ${he} energetically pounds you while you bounce`);

					if (V.PC.belly >= 5000) {
						text.push(`your gravid bulk`);
					}

					text.push(`on ${his} eager cock. ${He} grabs your hips and pounds you a little too eagerly, not even slowing down as you begin to feel ${him} tense with orgasm. Without so much as a warning to you, ${he} trembles with orgasm, pumping ${his} load deep into your ${cunt} and setting off your own. You glare daggers at ${him} as ${he} profusely apologizes for ${his} lack of restraint.`);
				}
			} else {
				if (slave.trust < -20) {
					text.push(`Having followed your instructions as quickly as ${he} could, ${he} lies as still as ${he} can beneath you while you bounce`);

					if (V.PC.belly >= 5000) {
						text.push(`your gravid bulk`);
					}

					text.push(`on ${his} reluctant cock. While ${he} is too afraid to be an active participant in pleasuring you, you make do with what ${he}'s giving. ${He} timidly warns you that ${he} is about to cum; in response you speed up your pace and clamp down hard on ${his} throbbing shaft. ${He} cries out lewdly, overwhelmed by your orgasmic ${cunt} spasms, and unloads ${load} inside of you despite ${his} fear.`);
				} else if (slave.trust <= 20) {
					text.push(`Having followed your instructions as quickly as ${he} could, ${he} lies as still as ${he} can beneath you while you bounce`);

					if (V.PC.belly >= 5000) {
						text.push(`your gravid bulk`);
					}

					text.push(`on ${his} reluctant cock. While ${he} is too hateful to be an active participant in pleasuring you, you make do with what ${he}'s got. ${He} cries out lewdly, overwhelmed by your orgasmic ${cunt} spasms, and unloads ${load} deep inside you without warning. ${He} <span class="orangered">smirks a little</span> as you glare daggers at ${him}.`);

					slave.trust++;
				} else if (overpowerCheck(slave, V.PC) < random(1, 100)) {
					text.push(`Without warning, ${he} flips you onto your side and, still hilted,`);

					if (slave.belly >= 300000) {
						text.push(`repositions you onto your hands and knees while using ${his} ${belly} belly to pin you under ${him}.`);
					} else if (V.PC.belly >= 5000) {
						text.push(`rolls you into missionary while pinning your arms and legs.`);
					} else if (V.PC.boobs >= 1000) {
						text.push(`pushes your face down into your`);
						if (V.PC.boobsImplant > 0) {
							text.push(`fake`);
						}
						text.push(`cleavage while pinning your arms and legs.`);
					} else {
						text.push(`rolls you into missionary while pinning your arms and forcing you into a mating press.`);
					}

					text.push(`Such audacity takes you entirely by surprise and gives ${him} the edge ${he} needs to pull it off. ${He} vigorously pistons in and out of you with little regard for you${(V.PC.pregKnown === 1) ? ` or your pregnancy` : ``}, fucking you senseless until ${he} has had enough and cums deep inside your`);
					if (V.PC.vagina !== -1) {
						text.push(`pussy.`);
					} else {
						text.push(`ass.`);
					}

					if (canImpreg(V.PC, slave) && slave.fetish === "pregnancy") {
						if (hasAnyArms(slave)) {
							text.push(`Running a hand across`);
						} else {
							text.push(`Grinding against`);
						}

						text.push(`your firm belly, ${he} decides ${his} job is not yet done and begins reaming you once more, dead set on taking this opportunity to <span class="orangered">show you your place by knocking you up with ${his} child.</span> ${He} manages to empty ${his} balls in your ${V.PC.mpreg ? "anal " : ""}womb several more times before exhaustion kicks in, forcing ${him} to leave you twitching and drooling cum.`);
						text.push(knockMeUp(V.PC, 100, 2, slave.ID));
						if (V.PC.mpreg) {
							seX(V.PC, "anal", slave, "penetrative", 5);
						} else {
							seX(V.PC, "vaginal", slave, "penetrative", 5);
						}
					} else {
						text.push(`Contently sighing, ${he} pulls ${his} still very hard cock from your overwhelmed body and forces it into your mouth, ready to blow a second load and give you a <span class="orangered">taste of your place,</span> before leaving you twitching and drooling cum.`);
						seX(V.PC, "oral", slave, "penetrative");
					}
					slave.trust += 5;
					V.rapedThisWeek = (V.rapedThisWeek || 0) + 1;
				} else {
					text.push(`You feel ${him} shift dominantly beneath you and in response`);

					if (slave.scrotum > 0) {
						text.push(`clamp down on ${his} balls`);
					} else {
						text.push(`twist ${his} dick at an odd angle`);
					}

					text.push(`until ${he} behaves. ${He} groans with a mix of disgust and pleasure while you bounce`);

					if (V.PC.belly >= 5000) {
						text.push(`your gravid bulk`);
					}

					text.push(`on ${his} traitorous cock. ${He} might not want to bend to your will, but you have ${his} body wrapped around your little finger, even though it still leaves you doing all the work. ${He} cries out lewdly, overwhelmed by your orgasmic ${cunt} spasms, and unloads deep inside you without warning. ${He} <span class="orangered">smirks a little</span> as you glare daggers at ${him}.`);

					slave.trust++;
				}
			}
		} else {
			text.push(`You step over to pick up ${slave.slaveName}, lie ${him} down and get ${him} ready. Then you align your`);

			if (V.PC.vagina !== -1) {
				if (V.PC.vagina === 0) {
					text.push(`untouched`);
				}
				text.push(`vagina`);
			} else {
				if (V.PC.anus === 0) {
					text.push(`untouched`);
				}
				text.push(`ass`);
			}

			text.push(`with`);

			if (slave.piercing.vagina.weight > 1 && slave.dick !== 0) {
				text.push(`${his} pierced cock-head.`);
			} else if (slave.piercing.vagina.weight === 1 && slave.dick !== 0) {
				text.push(`${his} pierced cock`);
			} else {
				text.push(`${his} cock`);
			}

			text.push(`and lower yourself onto ${his} ${dickAdj} dick`);

			if (slave.dick <= 6) {
				text.push(`until you are sitting on ${his} loins.`);
			} else {
				text.push(`until you feel that you can't take any more of ${him} inside you.`);
			}

			text.push(`You reach back`);

			if (slave.scrotum > 0) {
				text.push(`and stroke ${his} ${ballSize} balls.`);
			} else if (slave.vagina > -1) {
				text.push(`and tease ${his} neglected pussy.`);
			} else {
				text.push(`and stroke ${his} soft perineum.`);
			}

			if (slave.fetish === Fetish.MINDBROKEN) {
				text.push(`Like a broken doll, ${he} dumbly remains still, watching you without interest. You start moving up and on ${his} shaft, until you climax and notice that so did ${slave.slaveName}. Since ${he} is mindbroken, ${his} responses to you are purely physiological and your actions have no affect on ${him} mentally. You leave your toy for one of your other slaves to clean and maintain.`);
			} else {
				text.push(`You ride your helpless slave until you both climax.`);
			}
		}

		return text.join(' ');
	}

	function cleanup() {
		const text = [];


		if (canMove(slave) && slave.fetish !== Fetish.MINDBROKEN && V.postSexCleanUp > 0) {
			switch (slave.assignment) {
				case "whore":
					text.push(`${He} heads to the bathroom to clean ${his} dick before returning to selling ${his} body publicly.`);
					break;
				case "serve the public":
					text.push(`${He} heads to the bathroom to clean ${his} dick before returning to allowing the public to use ${his} body.`);
					break;
				case "rest":
					text.push(`${He} heads to the bathroom to clean ${his} dick before crawling back into bed.`);
					break;
				case "get milked":
					text.push(`${He} hurries to the bathroom to clean ${his} dick`);
					if (slave.lactation > 0) {
						text.push(`before going to get ${his} uncomfortably milk-filled tits drained.`);
					} else {
						text.push(`and then rests until ${his} balls are ready to be drained again.`);
					}
					break;
				case "please you":
					text.push(`${He} hurries to the bathroom to clean ${his} dick before returning to await your next use of ${his} body, as though nothing had happened.`);
					break;
				case "be a subordinate slave":
					text.push(`${He} moves to the bathroom to clean ${his} dick, though it's only a matter of time before another slave decides to take their turn with ${his} cock.`);
					break;
				case "be a servant":
					text.push(`${He} hurries to the bathroom to clean ${his} dick, since ${his} chores didn't perform themselves while you used ${him}.`);
					break;
				case "be your Head Girl":
					text.push(`${He} hurries to the bathroom to clean ${his} dick, worried that ${his} charges got up to trouble while you were using ${him}.`);
					break;
				case "guard you":
					text.push(`${He} hurries off to wash ${his} dick so you'll be unguarded for as little time as possible.`);
					break;
				case "work in the brothel":
					text.push(`${He} goes to wash ${his} dick so ${his} next customer has no idea what ${he}'s been up to.`);
					break;
				case "serve in the club":
					text.push(`${He} goes to wash ${his} dick to make it appear unused.`);
					break;
				case "work in the dairy":
					text.push(`${He} goes off to carefully wash ${his} dick to avoid besmirching the nice clean dairy.`);
					break;
				case "work as a farmhand":
					text.push(`${He} goes off to wash ${his} dick to avoid tainting the food in ${V.farmyardName}.`);
					break;
				case "work as a servant":
					text.push(`${He} rushes to wash ${his} dick, impatient to get back to ${his} undiminished chores.`);
					break;
				case "work as a nanny":
					text.push(`${He} hurries off to wash off ${his} dick before heading back to the ${V.nurseryName}.`);
			}
		}

		return text.join(' ');
	}

	function rumors() {
		return `Rumors spread that you <span class="red">enjoy taking it from slaves.</span>`;
	}
};
