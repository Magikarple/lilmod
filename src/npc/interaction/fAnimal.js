/**
 * @param {App.Entity.SlaveState} slave
 * @param {"canine"|"hooved"|"feline"} type
 * @param {FC.SlaveActs} act
 * @returns {DocumentFragment}
 */
App.Interact.fAnimal = function(slave, type, act) {
	const frag = new DocumentFragment();

	const {
		He, His,
		he, him, his, girl
	} = getPronouns(slave);

	/** @enum {string} */
	const Acts = {
		VAGINAL: "vaginal",
		ANAL: "anal",
		ORAL: "oral",
	};

	const approvingFetishes = [Fetish.MASOCHIST, Fetish.HUMILIATION, Fetish.BESTIALITY, "perverted", "sinful"];	// not strictly fetishes, but approvingFetishesAndBehavioralQuirksAndSexualQuirks doesn't have the same ring to it

	/** @type {App.Entity.Animal} */
	const animal = getAnimal(V.active[type]);

	/** @type {0|1|2} */
	let hole;
	/** @type {string} */
	let fetishDesc;
	/** @type {() => string} */
	let orifice;

	const anAnimal = `${animal.articleAn} ${animal.name}`;
	const hasFuckedAnimals = slave.partners.has(-8);

	seX(slave, act, "animal");

	const slaveApproves =
		approvingFetishes.includes(slave.fetish) ||
		approvingFetishes.includes(slave.sexualQuirk) ||
		approvingFetishes.includes(slave.behavioralQuirk) ||
		slave.fetish === Fetish.BUTTSLUT && act === Acts.ANAL ||
		slave.fetish === Fetish.CUMSLUT && act === Acts.ORAL ||
		slave.sexualQuirk === "gagfuck queen" && act === Acts.ORAL;

	switch (act) {
		case Acts.ORAL:
			orifice = () => either("mouth", "throat");
			break;
		case Acts.VAGINAL:
			orifice = () => either("pussy", "cunt", "slit");
			hole = 0;
			break;
		case Acts.ANAL:
			orifice = () => either("asshole", "rectum");
			hole = 1;
			break;
		default:
			throw new Error(`Unexpected act type '${act}' in fAnimal()`);
	}

	if (slave.fetish === Fetish.CUMSLUT && act === Acts.ORAL) {
		fetishDesc = `getting to drink more cum`;
	} else if (slave.fetish === Fetish.HUMILIATION) {
		fetishDesc = `committing such a humiliating act`;
	} else if (slave.fetish === Fetish.BUTTSLUT && act === Acts.ANAL) {
		fetishDesc = `getting to take a cock up ${his} ass`;
	} else if (slave.fetish === Fetish.MASOCHIST) {
		fetishDesc = `committing such a painful act`;
	} else if (slave.fetish === Fetish.BESTIALITY) {
		fetishDesc = `fucking an animal`;
	} else if (slave.sexualQuirk === "perverted") {
		fetishDesc = `committing such a perverted act`;
	} else if (slave.sexualQuirk === "gagfuck queen" && act === Acts.ORAL) {
		fetishDesc = `getting to suck more dick`;
	} else if (slave.behavioralQuirk === "sinful") {
		fetishDesc = `committing such a sinful act`;
	}

	const text = new SpacedTextAccumulator(frag);

	text.push(
		intro(),
		setup(),
		consummation(),
	);

	if (act === Acts.VAGINAL) {
		slave.vagina = Math.max(slave.vagina, animal.dick.size);
	} else if (act === Acts.ANAL) {
		// @ts-ignore
		slave.anus = Math.max(slave.anus, stretchedAnusSize(animal.dick.size));
	}

	if (act !== Acts.ORAL && canGetPregnant(slave) && canBreed(slave, animal)) {
		knockMeUp(slave, 5, hole, -8);
	}

	if (random(1, 100) > 100 + slave.devotion && slave.energy < 95) {
		text.push(slaveGainsFlaw());
	} else if (slave.devotion > 20) {
		text.push(slaveGainsQuirk());
	}
	if (random(100) > 10 &&
		slave.fetish === Fetish.NONE ||
		(!approvingFetishes.includes(slave.fetish) && slave.fetishStrength < 60)) {
		text.push(slaveGainsFetish());
	}

	if (V.postSexCleanUp) {
		text.push(cleanup());
	}

	text.toParagraph();

	return frag;

	// Text Functions

	function intro() {
		const text = [];

		if (canWalk(slave)) {
			text.push(`You call ${him} over and`);
		} else {
			text.push(`You order another slave to bring ${slave.slaveName} over. Once ${he} is situated, you`);
		}

		text.push(`tell ${him} you want to watch ${him} ${act === Acts.ORAL
			? `suck off`
			: act === Acts.VAGINAL
				? `get fucked by`
				: `get fucked in the ass by`} ${anAnimal}.`);

		if (slave.fetish === Fetish.MINDBROKEN) {
			text.push(`${slave.slaveName} nods ${his} head dumbly, ${his} eyes vacant${!canSee(slave) ? ` as always` : ``}.`);
		} else {
			if (slave.devotion > 50) {
				if (act === Acts.ORAL) {
					if (slaveApproves) {
						text.push(`${slave.slaveName}'s face visibly brightens at the prospect of ${fetishDesc}`);
						if (slave.fetish !== Fetish.BESTIALITY) {
							text.push(text.pop() + `, even if it's ${anAnimal}${slave.fetish === Fetish.CUMSLUT ? `'s cum` : ` that ${he} has to suck off`}`);
						}
						text.push(text.pop() + `.`);
					} else {
						text.push(`${slave.slaveName} visibly blanches at the thought of having to suck down ${anAnimal}'s cum,`);
						if (!hasFuckedAnimals) {
							text.push(`especially because ${he}'s never fucked an animal before,`);
						}
						text.push(`but ${he} is so devoted to you that ${he} reluctantly agrees.`);
					}
				} else {
					if ((act === Acts.VAGINAL && slave.vagina > 0) ||
						(act === Acts.ANAL && slave.anus > 0)) {
						if (slaveApproves) {
							text.push(`${slave.slaveName}'s face visibly brightens at the thought of ${fetishDesc}, even if the dick is ${anAnimal}'s.`);
						} else {
							if (hasFuckedAnimals) {
								text.push(`This wouldn't be the first time ${he}'s had to fuck an animal, and ${he} so is willing to do absolutely anything for you that ${he} nonchalantly agrees.`);
							} else {
								text.push(`${slave.slaveName} looks visibly disturbed – understandable, as ${he}'s never fucked an animal before – but is so attentive to your will that ${he} reluctantly agrees.`);
							}
						}
					} else {
						if (slaveApproves) {
							text.push(`${slave.slaveName}'s face visibly brightens at the thought of ${fetishDesc}, although ${he} seems a bit hesitant at the thought of giving ${his} virginity to an animal.`);
						} else {
							text.push(`${slave.slaveName} looks visibly shaken at the thought of having ${his} precious ${!canDoVaginal(slave) ? `anal ` : ``}virginity taken by an animal, but is so attentive to your will that ${he} ultimately agrees.`);
						}
					}
				}
			} else if (slave.devotion > 20) {
				if (act === Acts.ORAL) {
					if (slaveApproves) {
						if (slave.fetish === Fetish.CUMSLUT) {
							if (slave.fetishStrength > 60) {
								text.push(`${slave.slaveName} is such a slut for cum that even using an animal as the source isn't enough to dissuade ${him}, and ${he} happily agrees.`);
							} else {
								text.push(`${slave.slaveName} likes cum, and you can see the battle taking place in ${his} mind as ${he} attempts to reconcile ${his} fetish with the idea of sucking off ${anAnimal} ${animal.name}.`);
							}
						} else {
							text.push(`${slave.slaveName} isn't too keen on the idea of sucking off an animal, but the idea of ${fetishDesc} is enough to get ${him} to comply.`);
						}
					} else {
						text.push(`${slave.slaveName} tries in vain to conceal ${his} horror at the thought of blowing an animal,`);
						if (!hasFuckedAnimals) {
							text.push(`especially because ${he}'s never fucked an animal before,`);
						}
						text.push(`but quickly regains ${his} composure.`);
					}
				} else {
					if (
						(act === Acts.VAGINAL && slave.vagina > 0) ||
							(act === Acts.ANAL && slave.anus > 0)
					) {
						if (slaveApproves) {
							text.push(`${slave.slaveName} doesn't seem terribly keen on the idea of fucking an animal ${hasFuckedAnimals ? `again` : ``}, but the thought of ${fetishDesc} seems to be enough to win ${him} over.`);
						} else {
							if (hasFuckedAnimals) {
								text.push(`This wouldn't be the first time ${he}'s had to fuck an animal, but you can tell ${he} still isn't exactly thrilled about the idea.`);
							} else {
								text.push(`${slave.slaveName} tries in vain to conceal ${his} horror at the thought of fucking an animal, but quickly regains ${his} composure.`);
							}
						}
					} else {
						if (slaveApproves) {
							text.push(`${slave.slaveName} clearly has some reservations about having ${his} ${act === Acts.ANAL ? `anal ` : ``}virginity taken by ${anAnimal}, but the thought of ${fetishDesc} is enough to make agree to comply.`);
						} else {
							text.push(`${slave.slaveName} tries in vain to conceal ${his} horror at the thought of having ${his} precious ${act === Acts.ANAL ? `rosebud` : `pearl`} taken by a beast, but quickly regains ${his} composure.`);
						}
					}
				}
			} else if (slave.devotion >= -20) {
				if (act === Acts.ORAL) {
					if (slaveApproves) {
						text.push(`${slave.slaveName} looks disgusted at the thought of sucking off an animal at first, but the thought of the ${fetishDesc} that comes with it seems to spark a small flame of lust in ${him}.`);
					} else {
						if (hasFuckedAnimals) {
							text.push(`This wouldn't be the first time ${he}'s had to fuck an animal, and you can tell the memories of ${his} previous encounters are flooding back as ${he} pales.`);
						} else {
							text.push(`${slave.slaveName} tries in vain to conceal ${his} horror at the thought of blowing an animal${canWalk(slave) ? `, and only the threat of worse punishment keeps ${him} from running away as fast as ${he} can` : ``}.`);
						}
					}
				} else {
					if ((act === Acts.VAGINAL && slave.vagina > 0) || (act === Acts.ANAL && slave.anus > 0)) {
						if (slaveApproves) {
							text.push(`${slave.slaveName} looks disgusted at the thought of fucking an animal at first, but the thought of the ${fetishDesc} that comes with it seems to spark a small flame of lust in ${him}.`);
						} else {
							if (hasFuckedAnimals) {
								text.push(`This wouldn't be the first time ${he}'s had to fuck an animal, and you can tell the memories of ${his} previous encounters are flooding back as ${he} pales.`);
							} else {
								text.push(`${slave.slaveName} tries in vain to conceal ${his} horror at the thought of fucking an animal${canWalk(slave) ? `, and only the threat of worse punishment keeps ${him} from running away as fast as ${he} can` : ``}.`);
							}
						}
					} else {
						if (slaveApproves) {
							text.push(`${slave.slaveName} clearly has some reservations about having ${his} ${act === Acts.ANAL ? `anal ` : ``}virginity taken by ${anAnimal}, but the thought of ${fetishDesc} is enough to make agree to comply.`);
						} else {
							text.push(`${slave.slaveName} tries in vain to conceal ${his} horror at the thought of having ${his} precious ${act === Acts.ANAL ? `rosebud` : `pearl`} taken by a beast${canWalk(slave) ? `, and only the threat of worse punishment keeps ${him} from running away as fast as ${he} can` : ``}.`);
						}
					}
				}
			} else {
				text.push(`${slave.slaveName}'s face contorts into a mixture of ${slave.devotion < -50 ? `hatred, anger, and disgust` : `anger and disgust`}, ${canWalk(slave)
					? `and only the threat of far worse punishment is enough to prevent ${him} from running out of the room`
					: `but ${he} knows ${he} is powerless to stop you`}.`);
			}
		}

		return text.join(' ');
	}

	function setup() {
		const text = [];

		if (slave.devotion > 50) {
			if (act === Acts.ORAL) {
				text.push(`You have ${him} kneel on the floor before calling in the ${animal.name}. The beast slowly saunters up to the slave where ${he} waits, showing little concern when the slave reaches out and begins masturbating it to begin the process of getting the animal hard. Once the ${animal.name} is hard enough, ${slave.slaveName} takes its cock and begins to give it a few tentative licks before finally putting it in ${his} mouth.`);
			} else {
				text.push(`You have ${him} ${App.Data.clothes.get(slave.clothes).exposure <= 3 ? `take off ${his} clothes and ` : ``}get on the floor, ass in the air, before calling in the ${animal.name}. The beast slowly saunters up to the slave, where it takes only a few short moments for its animal brain to realize that what it is standing behind is a warm hole that needs to be filled with seed.`);
			}

			switch (animal.name) {
				case V.active.canine:
					if (act === Acts.ORAL) {
						if (slaveApproves) {
							text.push(`The slave seems to quickly get over the fact that the dick currently in ${his} mouth belongs to a canine as ${his} more carnal desires kick in.`);
						} else {
							text.push(`The slave visibly gags as the ${hasFuckedAnimals ? `strange` : `unfamiliar`} texture of ${anAnimal}'s cock fills it, then gives a groan as the beast thrusts, filling ${his} throat.`);
						}
					} else {
						if (canWalk(slave)) {
							text.push(`The canine clambers up to mount ${slave.slaveName}, eliciting a squeal from the ${girl} as its claws dig into ${his} flesh.`);
						} else {
							text.push(`The canine takes a few curious sniffs, then lines up its large cock with ${slave.slaveName}'s ${orifice()}.`);
						}

						text.push(`It takes a few tries, but the ${animal.name} finally manages to sink its cock into ${his} ${slaveApproves && act === Acts.VAGINAL ? `wet ` : ``}${orifice()}.`);
					}
					break;
				case V.active.hooved:
					if (act === Acts.ORAL) {
						if (slaveApproves) {
							text.push(`The slave seems to quickly get over the fact that dick currently in ${his} mouth is not a human one as ${his} more carnal desires kick in.`);
						} else {
							text.push(`The slave visibly gags as the ${hasFuckedAnimals ? `strange` : `unfamiliar`} texture of ${anAnimal}'s cock fills it, then gives a groan as the beast thrusts, stretching ${his} poor throat to the limit.`);
						}
					} else {
						text.push(`${slave.slaveName} gives a long, drawn-out moan as the huge phallus `, slave.vagina < 4 ? `<span class="change positive">stretches</span>` : `fills`, ` ${his} ${orifice()} nearly to its breaking point.`);
					}
					break;
				case V.active.feline:
					if (act === Acts.ORAL) {
						if (slaveApproves) {
							text.push(`The slave seems to quickly get over the fact that dick currently in ${his} mouth belongs to ${anAnimal} as ${his} more carnal desires kick in.`);
						} else {
							text.push(`The slave visibly gags as the ${hasFuckedAnimals ? `strange` : `unfamiliar`} texture of ${anAnimal}'s cock fills it, then gives a groan as the beast thrusts, the barbs on its cock rubbing the inside of ${his} mouth raw.`);
						}
					} else {
						text.push(`${slave.slaveName} gives a squeal of pain as the barbed cock makes its way into ${his} ${orifice()}.`);
					}
					break;
				default:
					throw new Error(`Unexpected animal type '${animal}' in fAnimal()`);
			}

			if (act !== Acts.ORAL) {
				text.push(virginityCheck(act));
			}
		} else if (slave.devotion > 20) {
			if (act === Acts.ORAL) {
				text.push(`You tell ${him} to kneel on the floor before calling in the ${animal.name}. The beast slowly saunters up to the slave where ${he} waits, showing little concern when the slave hesitantly reaches out and begins masturbating it to begin the process of getting the animal hard. Once the ${animal.name} is hard enough, ${slave.slaveName} takes its cock, and, after taking a moment to steel ${his} resolve, begins to give it a few reluctant licks before putting it in ${his} mouth.`);
			} else {
				text.push(`You tell ${him} to ${App.Data.clothes.get(slave.clothes).exposure <= 3 ? `take off ${his} clothes and ` : ``}get on the floor, ass in the air, before calling in the ${animal.name}. The beast slowly saunters up to the slave, where it takes only a few seconds for its animal brain to realize that what it is standing behind is a warm hole that needs to be filled with seed.`);
			}

			switch (animal.name) {
				case V.active.canine:
					if (type === Acts.ORAL) {
						if (slaveApproves) {
							text.push(`Though the slave still seems to have some reservations about sucking off an animal, ${he} seems to forget that the cock in ${his} mouth belongs to ${anAnimal} soon enough, once ${his} carnal desires kick in.`);
						} else {
							text.push(`The slave visibly gags as the ${hasFuckedAnimals ? `strange` : `unfamiliar`} texture of ${anAnimal}'s cock fills it, and you get the feeling ${he} is beginning to reevaluate just how much ${he} wants to avoid punishment.`);
						}
					} else {
						if (canWalk(slave)) {
							text.push(`The canine clambers up to mount ${slave.slaveName}, eliciting a squeal from the ${girl} as its claws dig into ${his} flesh.`);
						} else {
							text.push(`The canine takes a few curious sniffs, then lines up its large cock with ${slave.slaveName}'s ${orifice()}.`);
						}

						text.push(`It takes a few tries, but the ${animal.name} finally manages to sink its cock into ${his} ${slaveApproves && act === Acts.VAGINAL ? `wet ` : ``}${orifice()}.`);
					}
					break;
				case V.active.hooved:
					if (type === Acts.ORAL) {
						if (slaveApproves) {
							text.push(`Though the slave still seems to have some reservations about sucking off ${anAnimal}, ${he} seems to forget that the cock in ${his} mouth isn't human soon enough, once ${his} carnal desires kick in.`);
						} else {
							text.push(`The slave visibly gags as the ${hasFuckedAnimals ? `strange` : `unfamiliar`} texture of ${anAnimal}'s cock fills it, and you get the feeling ${he} is beginning to reevaluate just how much ${he} wants to avoid punishment.`);
						}
					} else {
						text.push(`${slave.slaveName} gives a long, drawn-out groan as the huge phallus `, slave.vagina < 4 ? `<span class="change positive">stretches</span>` : `fills`, ` ${his} ${orifice()} nearly to its breaking point.`);
					}
					break;
				case V.active.feline:
					if (type === Acts.ORAL) {
						if (slaveApproves) {
							text.push(`Though the slave still seems to have some reservations about sucking off an animal, ${he} seems to forget that the cock in ${his} mouth belongs to a feline soon enough, once ${his} carnal desires kick in.`);
						} else {
							text.push(`The slave visibly gags as the ${hasFuckedAnimals ? `strange` : `unfamiliar`} texture of ${anAnimal}'s barbed dick fills it, and you get the feeling ${he} is beginning to reevaluate just how much ${he} wants to avoid punishment.`);
						}
					} else {
						text.push(`${slave.slaveName} gives a squeal of pain as the barbed cock makes its way into ${his} ${orifice()}.`);
					}
					break;
				default:
					throw new Error(`Unexpected animal type '${animal}' in fAnimal()`);
			}

			if (act !== Acts.ORAL) {
				text.push(virginityCheck(act));
			}
		} else if (slave.devotion > -20) {
			if (act === Acts.ORAL) {
				text.push(`You force ${him} to kneel on the floor before calling in the ${animal.name}. The beast slowly saunters up to the slave where ${he} waits, showing little concern when the slave reluctantly reaches out and begins masturbating it to begin the process of getting the animal hard. Once the ${animal.name} is hard enough, ${slave.slaveName} takes its cock and begins to give it a few tentative licks before finally putting it in ${his} mouth.`);
			} else {
				text.push(`You force ${him} to ${App.Data.clothes.get(slave.clothes).exposure <= 3 ? `take off ${his} clothes and ` : ``}get on the floor, ass in the air, before calling in the ${animal.name}. The beast slowly saunters up to the slave, where it takes only a few short moments for its animal brain to realize that what it is standing behind is a warm hole that needs to be filled with seed.`);
			}

			switch (animal.name) {
				case V.active.canine:
					if (type === Acts.ORAL) {
						if (slaveApproves) {
							text.push(`Though the slave still seems to have some reservations about sucking off an animal, ${he} seems to forget that the cock in ${his} mouth belongs to ${anAnimal} soon enough, once ${his} carnal desires kick in.`);
						} else {
							text.push(`The slave visibly gags as the ${hasFuckedAnimals ? `strange` : `unfamiliar`} texture of ${anAnimal}'s cock fills it, and you get the feeling ${he} is beginning to reevaluate just how much ${he} wants to avoid punishment.`);
						}
					} else {
						if (canWalk(slave)) {
							text.push(`The canine clambers up to mount ${slave.slaveName}, eliciting a squeal from the ${girl} as its claws dig into ${his} flesh.`);
						} else {
							text.push(`The canine takes a few curious sniffs, then lines up its large cock with ${slave.slaveName}'s ${orifice()}.`);
						}

						text.push(`It takes a few tries, but the ${animal.name} finally manages to sink its cock into ${his} ${slaveApproves && act === Acts.VAGINAL ? `wet ` : ``}${orifice()}.`);
					}
					break;
				case V.active.hooved:
					if (type === Acts.ORAL) {
						if (slaveApproves) {
							text.push(`Though the slave still seems to have some reservations about sucking off ${anAnimal}, ${he} seems to forget that the cock in ${his} mouth isn't human soon enough, once ${his} carnal desires kick in.`);
						} else {
							text.push(`The slave visibly gags as the ${hasFuckedAnimals ? `strange` : `unfamiliar`} texture of ${anAnimal}'s cock fills it, and you get the feeling ${he} is beginning to reevaluate just how much ${he} wants to avoid punishment.`);
						}
					} else {
						text.push(`${slave.slaveName} gives a long, drawn-out groan as the huge phallus `, slave.vagina < 4 ? `<span class="change positive">stretches</span>` : `fills`, ` ${his} ${orifice()} nearly to its breaking point.`);
					}
					break;
				case V.active.feline:
					if (type === Acts.ORAL) {
						if (slaveApproves) {
							text.push(`Though the slave still seems to have some reservations about sucking off an animal, ${he} seems to forget that the cock in ${his} mouth belongs to a feline soon enough, once ${his} carnal desires kick in.`);
						} else {
							text.push(`The slave visibly gags as the ${hasFuckedAnimals ? `strange` : `unfamiliar`} texture of ${anAnimal}'s barbed dick fills it, and you get the feeling ${he} is beginning to reevaluate just how much ${he} wants to avoid punishment.`);
						}
					} else {
						text.push(`${slave.slaveName} gives a squeal of pain as the barbed cock makes its way into ${his} ${orifice()}.`);
					}
					break;
				default:
					throw new Error(`Unexpected animal type '${animal}' in fAnimal()`);
			}

			if (act !== Acts.ORAL) {
				text.push(virginityCheck(act));
			}
		} else {
			if (act === Acts.ORAL) {
				text.push(`You have to physically force ${him} to kneel on the floor before calling in the ${animal.name}. The beast slowly saunters up to the slave where ${he} is restrained, showing little concern when another slave reaches out and begins masturbating it to begin the process of getting the animal hard. Once the ${animal.name} is hard enough, the slave takes its cock and lines it up with ${slave.slaveName}'s mouth. The animal needs no prompting, and thrusts itself into ${his} ring-gagged mouth.`);
			} else {
				text.push(`You have to physically force ${him} to ${App.Data.clothes.get(slave.clothes).exposure <= 3 ? `take off ${his} clothes and ` : ``} get on the floor, ass in the air and restraints around ${his} wrists and ankles, before calling in the ${animal.name}. The beast slowly saunters up to the slave, where it takes only a few short moments for its animal brain to realize that what it is standing behind is a warm hole that needs to be filled with seed.`);
			}

			switch (animal.name) {
				case V.active.canine:
					if (type === Acts.ORAL) {
						if (slaveApproves) {
							text.push(`The slave glares daggers at you as ${he} takes the full length of the canine's cock in ${his} mouth, but ${slave.dick
								? canAchieveErection(slave)
									? `${his} fully-erect dick`
									: `the precum leaking from ${his} dick`
								: slave.vagina > -1
									? `a slight sheen on ${his} pussylips`
									: `a slight blush to ${his} cheeks`}
									tells you that ${he}'s enjoying this, at least a little.`);
						} else {
							text.push(`The slave visibly gags as the ${hasFuckedAnimals ? `strange` : `unfamiliar`} texture of ${anAnimal}'s cock fills it, and you get the feeling ${he} would have run away a long time ago if ${he} wasn't more than a little tied up at the moment.`);
						}
					} else {
						if (canWalk(slave)) {
							text.push(`The canine clambers up to mount ${slave.slaveName}, eliciting a squeal from the ${girl} as its claws dig into ${his} flesh.`);
						} else {
							text.push(`The canine takes a few curious sniffs, then lines up its large cock with ${slave.slaveName}'s ${orifice()}.`);
						}

						text.push(`It takes a few tries, but the ${animal.name} finally manages to sink its cock into ${his} ${slaveApproves && act === Acts.VAGINAL ? `wet ` : ``}${orifice()}.`);
					}
					break;
				case V.active.hooved:
					if (type === Acts.ORAL) {
						if (slaveApproves) {
							text.push(`The slave glares daggers at you as ${he} takes the full length of the ${animal.name}'s cock in ${his} mouth, but ${slave.dick
								? canAchieveErection(slave)
									? `${his} fully-erect dick`
									: `the precum leaking from ${his} dick`
								: slave.vagina > -1
									? `a slight sheen on ${his} pussylips`
									: `a slight blush to ${his} cheeks`}
									tells you that ${he}'s enjoying this, at least a little.`);
						} else {
							text.push(`The slave visibly gags as the ${hasFuckedAnimals ? `strange` : `unfamiliar`} texture of ${anAnimal}'s cock fills it, and you get the feeling ${he} would have run away a long time ago if ${he} wasn't a little tied up at the moment.`);
						}
					} else {
						text.push(`${slave.slaveName} lets out a blood-curdling scream as the huge phallus `, slave.vagina < 4 ? `<span class="change positive">stretches</span>` : `fills`, ` ${his} ${orifice()} nearly to its breaking point.`);
					}
					break;
				case V.active.feline:
					if (type === Acts.ORAL) {
						if (slaveApproves) {
							text.push(`The slave glares daggers at you as ${he} takes the full length of the feline's cock in ${his} mouth, but ${slave.dick
								? canAchieveErection(slave)
									? `${his} fully-erect dick`
									: `the precum leaking from ${his} dick`
								: slave.vagina > -1
									? `a slight sheen on ${his} pussylips`
									: `a slight blush to ${his} cheeks`}
									tells you that ${he}'s enjoying this, at least a little.`);
						} else {
							text.push(`The slave visibly gags as the ${hasFuckedAnimals ? `strange` : `unfamiliar`} texture of ${anAnimal}'s barbed dick fills it, and you get the feeling ${he} would have run away a long time ago if ${he} wasn't a little tied up at the moment .`);
						}
					} else {
						text.push(`${slave.slaveName} lets out a blood-curdling scream as the barbed cock makes its way into ${his} ${orifice()}.`);
					}
					break;
				default:
					throw new Error(`Unexpected animal type '${animal}' in fAnimal()`);
			}

			if (act !== Acts.ORAL) {
				text.push(virginityCheck(act));
			}
		}

		return text.join(' ');
	}

	function consummation() {
		const text = [];

		switch (animal.name) {
			case V.active.canine:
				if (act === Acts.ORAL) {
					text.push(`${slave.slaveName} gets to work, ${his} head bobbing back and forth rhythmically as ${he} works on bringing the ${animal.name} to orgasm. ${His} efforts pay off after a few minutes when the ${animal.species === "dog" ? `hound` : animal.name}'s knot begins to swell. Eyes wide and brimming with tears from the sudden lack of oxygen, ${he} realizes has no choice but to finish what ${he} started and swallow all of the semen pouring down ${his} abused throat. Soon enough, the ${animal.name} finally finishes cumming and its knot is sufficiently small enough to slip out of ${slave.slaveName}'s mouth, causing ${him} to immediately begin coughing and retching uncontrollably. Having finished its business, the ${animal.name} runs off, presumably in search of food.`);
				} else {
					text.push(`The ${animal.species === "dog" ? `hound` : animal.name} wastes no time in beginning to hammer away at ${his} ${orifice()} in the way only canines can, causing ${slave.slaveName} to moan uncontrollably as its thick, veiny member probes the depths of ${his} ${orifice()}. A few short minutes later, ${he} gives a loud groan ${slaveApproves ? `and shakes in orgasm ` : ``}as the ${animal.name}'s knot begins to swell and its dick begins to erupt a thick stream of jizz into ${his} ${orifice()}. Soon enough, the ${animal.name} finally finishes cumming and its knot is sufficiently small enough to slip out of ${slave.slaveName}'s ${act === Acts.VAGINAL && slave.vagina < 3 || act === Acts.ANAL && slave.anus < 2
						? `now-gaping ${orifice()}`
						: orifice()}, causing a thick stream of cum to slide out of it. Having finished its business, the ${animal.name} runs off, presumably in search of food.`);
				}
				break;
			case V.active.hooved:
				if (act === Acts.ORAL) {
					text.push(`${slave.slaveName} gets to work, ${his} head bobbing back and forth rhythmically as ${he} works on bringing the ${animal.name} to orgasm. ${His} efforts pay off after a few minutes when the ${animal.species === "horse" ? `stallion` : animal.name} begins to pant as its orgasm approaches. Before too long, the ${animal.name}'s movements begin to slow, and you can see its large testicles contract as its begins to erupt and pour its thick semen down ${his} throat and into ${his} stomach, filling it to the brim. After what seems like an impossibly long time, the ${animal.name}'s dick finally begins to soften and pull out, causing ${slave.slaveName} to begin coughing and retching uncontrollably. You have another slave lead the ${animal.name} away, with a fresh apple as a treat for its good performance.`);
				} else {
					text.push(`The ${animal.species === "horse" ? `stallion` : animal.name} begins to thrust faster and faster, causing ${him} to moan and groan as the huge ${animal.species} cock ${act === Acts.VAGINAL ? `batters ${his} cervix` : `fills ${him} completely`}. Before too long, the ${animal.name}'s movements begin to slow, and you can see its large testicles contract as its begins to erupt and fill ${his} ${orifice()} with its thick baby batter. After what seems like an impossibly long time, the ${animal.name}'s dick finally begins to soften and pull out, leaving ${slave.slaveName} panting and covered in sweat. You have another slave lead the ${animal.name} away, with a fresh apple as a treat for its good performance.`);
				}
				break;
			case V.active.feline:
				if (act === Acts.ORAL) {
					text.push(`${slave.slaveName} gets to work, ${his} head bobbing back and forth rhythmically as ${he} works on bringing the ${animal.name} to orgasm. ${His} efforts pay off after a few minutes when the ${animal.name} begins to pant as its orgasm approaches. After a few minutes of painful coupling, the ${animal.species}'s thrusts finally slow, then stop completely as its ${animal.species !== "cat" ? `large` : ``} cock erupts down ${slave.slaveName}'s throat. With a ${animal.species !== "cat" ? `deep bellow` : `loud meow`}, he finally dismounts, gives you a long look, then stalks off.`);
				} else {
					text.push(`The ${animal.name} begins to move, thrusting faster and faster. The ${girl} underneath it can't stop a groan of pain from escaping ${his} lips as the ${animal.species}'s barbed dick rubs the inside of ${his} ${orifice()} raw. After a few minutes of painful coupling, the ${animal.species}'s thrusts finally slow, then stop completely as its ${animal.species !== "cat" ? `large` : ``} cock erupts, filling ${slave.slaveName} with its sperm. With a ${animal.species !== "cat" ? `deep bellow` : `loud meow`}, he finally dismounts, gives you a long look, then stalks off.`);
				}

				healthDamage(slave, 1);
				break;
			default:
				throw new Error(`Unexpected animal type '${animal}' in fAnimal()`);
		}

		return text.join(' ');
	}

	function cleanup() {
		const text = [];

		if (act !== Acts.ORAL) {
			if (act === Acts.VAGINAL) {
				if (slave.vagina === 3) {
					text.push(`${capFirstChar(animal.name)} cum drips out of ${his} fucked-out hole.`);
				} else if (slave.vagina === 2) {
					text.push(`${capFirstChar(animal.name)} cum drips out of ${his} stretched vagina.`);
				} else if (slave.vagina === 1) {
					text.push(`${His} still-tight pussy keeps the ${animal.name}'s cum inside ${him}.`);
				} else {
					text.push(`${capFirstChar(animal.name)} cum slides right out of ${his} gaping hole.`);
				}
			} else {
				if (slave.anus === 1) {
					text.push(`${His} still-tight asshole keeps the ${animal.name}'s cum inside ${him}.`);
				} else if (slave.anus === 2) {
					text.push(`${capFirstChar(animal.name)} cum drips out of ${his} loosened anus.`);
				} else {
					text.push(`${capFirstChar(animal.name)} cum slides right out of ${his} fucked-out asshole.`);
				}
			}

			if (canWalk(slave)) {
				if (act === "vaginal") {
					text.push(`${He} uses a quick douche to clean ${his} ${slave.vagina < 2 ? `tight` : slave.vagina > 3 ? `loose` : ``} pussy,`);
				} else {
					text.push(`${He} uses an enema to clean ${his} ${slave.anus < 2 ? `tight` : slave.anus < 3 ? `used` : `gaping`} butthole,`);
				}

				switch (slave.assignment) {
					case Job.BROTHEL:
						text.push(`just like ${he} does between each customer.`);
						break;
					case Job.CLUB:
						text.push(`just like ${he} does in the club.`);
						break;
					case Job.DAIRY:
						text.push(`to avoid besmirching the nice clean dairy.`);
						break;
					case Job.FARMYARD:
						text.push(`to avoid tainting the food in ${V.farmyardName}.`);
						break;
					case Job.QUARTER:
						text.push(`mostly to keep everything ${he} has to clean from getting any dirtier.`);
						break;
					case Job.WHORE:
						text.push(`before returning to offering it for sale.`);
						break;
					case Job.PUBLIC:
						text.push(`before returning to offering it for free.`);
						break;
					case Job.REST:
						text.push(`before crawling back into bed.`);
						break;
					case Job.MILKED:
						text.push(`${slave.lactation > 0 ? `before going to get ${his} uncomfortably milk-filled tits drained` : `and then rests until ${his} balls are ready to be drained again`}.`);
						break;
					case Job.HOUSE:
						text.push(`since ${his} chores didn't perform themselves while you used ${his} fuckhole.`);
						break;
					case Job.FUCKTOY:
						text.push(`before returning to await your next use of ${his} fuckhole, as though nothing had happened.`);
						break;
					case Job.SUBORDINATE:
						text.push(`though it's only a matter of time before another slave decides to play with ${his} fuckhole.`);
						break;
					case Job.HEADGIRL:
						text.push(`worried that ${his} charges got up to trouble while ${he} enjoyed ${his} ${properMaster()}'s use.`);
						break;
					case Job.BODYGUARD:
						text.push(`so ${he} can be fresh and ready for more sexual use even as ${he} guards your person.`);
						break;
					case Job.TEACHER:
						text.push(`before ${he} returns to teaching ${his} classes.`);
						break;
					default:
						text.push(`before ${he} returns to ${slave.assignment}.`);
						break;
				}
			}
		}

		return text.join(' ');
	}

	function slaveGainsFlaw() {
		switch (act) {
			case Acts.ORAL:
				if (slave.sexualFlaw !== "hates oral") {
					slave.sexualFlaw = "hates oral";

					return `<span class="flaw gain">Having ${anAnimal} fuck ${his} throat by force has given ${him} a hatred of oral sex.</span>`;
				}

				break;
			case Acts.VAGINAL:
				if (slave.sexualFlaw !== "hates penetration") {
					slave.sexualFlaw = "hates penetration";

					return `<span class="flaw gain">Having ${anAnimal} fuck ${him} by force has given ${him} a hatred of penetration.</span>`;
				}

				break;
			case Acts.ANAL:
				if (slave.sexualFlaw !== "hates anal") {
					slave.sexualFlaw = "hates anal";

					return `<span class="flaw gain">Having ${anAnimal} fuck ${his} asshole by force has given ${him} a hatred of anal penetration.</span>`;
				}

				break;
			default:
				throw new Error(`Unexpected act type '${act}' in fAnimal().`);
		}
	}

	function slaveGainsQuirk() {
		if (slave.behavioralQuirk === "none") {
			if (random(1, 100) > 90) {	// 10% chance of gaining quirk
				/** @type {FC.BehavioralQuirk[]} */
				const quirks = [];

				if (V.policies.bestialityOpenness === 0) {
					quirks.push("sinful");
				}

				const quirk = quirks.random() ?? "none";

				slave.behavioralQuirk = quirk;

				if (quirk === "sinful") {
					return `The ${girl} seemed to take great pleasure in doing something as taboo as fucking an animal. You might notice ${him} begin to try to break more and more cultural norms in the days to come <span class="fetish gain">as ${his} sinful side begins to come out.</span>`;
				}
			}
		}
		if (slave.sexualQuirk === "none") {
			if (random(1, 100) > 90) {	// 10% chance of gaining quirk
				/** @type {FC.SexualQuirk[]} */
				const quirks = [
					"perverted",
					"unflinching",
				];

				if (act === Acts.ANAL) {
					quirks.push("painal queen");
				}
				if (animal.dick.size > 4) {
					quirks.push("size queen");
				}

				const quirk = quirks.random() ?? "none";

				slave.sexualQuirk = quirk;

				if (quirk === "painal queen") {
					return `${slave.slaveName}'s asshole took quite the pounding during the rutting, and ${he}${slave.dick > 0 ? `'s sporting an erection` : ``}${slave.vagina > -1 ? slave.dick > 0 ? ` and ` : ` has a distinct sheen on ${his} pussylips` : ` seems distinctly uncomfortable`} after the fact. <span class="fetish gain">It seems ${he} got off on the painal.</span`;
				}
				if (quirk === "perverted") {
					return `${He} seems distinctly uncomfortable after the rutting has finished, as though <span class="fetish gain">doing something so perverted had turned ${him} on.</span>`;
				}
				if (quirk === "size queen") {
					return `The ${animal.name} had a dick large enough to put even well-endowed men to shame, and the orgasm it had given ${him} left ${him} wondering aloud if <span class="fetish gain">normal-sized cocks would ever satisfy ${him} again.</span>`;
				}
				if (quirk === "unflinching") {
					return `Being bred like an animal by an <i>actual</i> animal isn't an easy task, but you can tell it's one ${he} enjoyed. <span class="fetish gain">It seems ${he} is now more receptive to doing more taboo and even downright disturbing acts.</span>`;
				}
			}
		}
	}

	function slaveGainsFetish() {
		if (random(1, 100) > 90) {	// 10% chance of gaining fetish
			/** @type {FC.Fetish[]} */
			const fetishes = [
				Fetish.HUMILIATION,
				Fetish.MASOCHIST,
				Fetish.BESTIALITY,
			];

			if (act === Acts.ANAL) {
				fetishes.push(Fetish.BUTTSLUT);
			}

			const fetish = fetishes.random();

			fetishChange(slave, fetish);

			if (fetish === Fetish.BUTTSLUT) {
				return `${He} couldn't help but orgasm when the ${animal.name} filled ${him} with its seed, and now the thought of another member in ${his} bottom <span class="fetish gain>turns ${him} on.</span>`;
			}
			if (fetish === Fetish.HUMILIATION) {
				return `You can't help but notice that ${he} ${slave.dick > 0 ? `is sporting an erection` : ``}${slave.vagina > -1 ? slave.dick > 0 ? ` and ` : `has a distinct sheen on ${his} pussylips` : `seems distinctly uncomfortable`} after the beast has finished. <span class="fetish gain">It seems ${he} is a bit of a humiliation slut!</span>`;
			}
			if (fetish === Fetish.MASOCHIST) {
				return `${He} didn't seem to mind the pain – in fact, it seems ${he} got off on it. <span class="fetish gain">${He}'s a masochist!</span>`;
			}
			if (fetish === Fetish.BESTIALITY) {
				return `${He} seems to have <span class="devotion inc">really taken to</span> getting fucked by animals – <span class="fetish gain">${he} has a bestiality fetish!</span>`;
			}
		}
	}

	// Virginity Check Functions

	function virginityCheck(type) {
		const text = [];

		switch (type) {
			case Acts.VAGINAL:
				if (act === Acts.VAGINAL && slave.vagina === 0) {
					text.push(`The slave gives a loud ${slave.devotion > 20 ? `moan` : `groan`} as <span class="virginity loss">${his} virginity is taken from ${him}${slave.devotion < -20 ? ` by force` : ``}.</span>`);

					if (slave.devotion >= -20) {
						if (slaveApproves) {
							text.push(`Losing ${his} virginity in such a painful manner has <span class="devotion inc">increased ${his} devotion to you.</span>`);

							slave.devotion += 10;
						} else {
							if (slave.devotion > 50) {
								text.push(`Since ${he} is well broken, losing ${his} virginity in such a manner has <span class="devotion inc">increased ${his} submission to you.</span>`);

								slave.devotion += 5;
							} else if (slave.devotion >= -20) {
								text.push(`Losing ${his} virginity in such a manner has <span class="devotion inc">increased ${his} submission to you,</span> though ${he} is <span class="trust dec">fearful</span> that you'll decide to only use ${him} to sate your animals' lust.`);

								slave.devotion += 5;
								slave.trust -= 5;
							} else {
								text.push(`${He} is clearly <span class="devotion dec">unhappy</span> in the manner in which ${his} virginity has been taken, and ${he} <span class="trust dec">fears</span> you'll decide to only use ${him} to sate your animals' lust.`);

								slave.devotion -= 10;
								slave.trust -= 10;
							}
						}
					} else {
						text.push(`Having ${his} pearl of great price taken by a mere beast has <span class="devotion dec">reinforced the hatred ${he} holds towards you,</span> and ${he} is <span class="trust dec">terrified</span> you'll only use ${him} as a plaything for your animals.`);

						slave.devotion -= 10;
						slave.trust -= 10;
					}

					text.push(`Having ${his} cherry popped in such a manner was extremely painful and <span class="health dec">slightly damaged ${his} health.</span>`);

					healthDamage(slave, 5);
				}

				break;
			case Acts.ANAL:
				if (act === Acts.ANAL && slave.anus === 0) {
					text.push(`The slave gives a loud ${slave.devotion > 20 ? `moan` : `groan`} as <span class="virginity loss">${his} anal virginity is taken from ${him}${slave.devotion < -20 ? ` by force` : ``}.</span>`);

					if (slave.devotion >= -20) {
						if (slaveApproves) {
							text.push(`Losing ${his} anal virginity in such a painful manner has <span class="devotion inc">increased ${his} devotion to you.</span>`);

							slave.devotion += 10;
						} else {
							if (slave.devotion > 50) {
								text.push(`Since ${he} is well broken, losing ${his} anal virginity in such a manner has <span class="devotion inc">increased ${his} submission to you.</span>`);

								slave.devotion += 5;
							} else if (slave.devotion >= -20) {
								text.push(`Losing ${his} anal virginity in such a manner has <span class="devotion inc">increased ${his} submission to you,</span> though ${he} is <span class="trust dec">fearful</span> that you'll decide to only use ${him} to sate your animals' lust.`);

								slave.devotion += 5;
								slave.trust -= 5;
							} else {
								text.push(`${He} is clearly <span class="devotion dec">unhappy</span> in the manner in which ${his} anal virginity has been taken, and ${he} <span class="trust dec">fears</span> you'll decide to only use ${him} to sate your animals' lust.`);

								slave.devotion -= 10;
								slave.trust -= 10;
							}
						}
					} else {
						text.push(`Having ${his} pearl of great price taken by a mere beast has <span class="devotion dec">reinforced the hatred ${he} holds towards you,</span> and ${he} is <span class="trust dec">terrified</span> you'll only use ${him} as a plaything for your animals.`);

						slave.devotion -= 10;
						slave.trust -= 10;
					}

					text.push(`Having ${his} rosebud broken in in such a manner was extremely painful and <span class="health dec">slightly damaged ${his} health.</span>`);

					healthDamage(slave, 5);
				}

				break;
		}

		return text.join(' ');
	}
};
