/**
 * @param {App.Entity.SlaveState} slave
 * @returns {Record<string, string>}
 */
App.Medicine.Modification.brandRecord = function(slave) {
	const scars = Object.assign({}, slave.brand);
	Object.assign(scars, slave.leg.left?.brand);
	Object.assign(scars, slave.leg.right?.brand);
	Object.assign(scars, slave.arm.left?.brand);
	Object.assign(scars, slave.arm.right?.brand);
	return scars;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} location
 * @returns {{brand:Record<string, string>, scar: Record<string, Partial<App.Entity.ScarState>>}}
 */
App.Medicine.Modification.modifiableBodyPart = function(slave, location) {
	const bodyPartRoot = App.UI.bodyPartRoot(location);
	const bodyPartData = App.Data.Slave.body.get(bodyPartRoot);

	/** @type {{brand:Record<string, string>, scar: Record<string, Partial<App.Entity.ScarState>>}} */
	let object = slave;

	// if undefined: custom location
	if (bodyPartData !== undefined) {
		// select the correct scar object based on location
		if (bodyPartData.category === "legs") {
			if (location.startsWith("left")) {
				if (getLeftLegID(slave) === 1) {
					object = slave.leg.left;
				} else {
					return undefined;
				}
			} else {
				if (getRightLegID(slave) === 1) {
					object = slave.leg.right;
				} else {
					return undefined;
				}
			}
		} else if (bodyPartData.category === "arms") {
			if (location.startsWith("left")) {
				if (getLeftArmID(slave) === 1) {
					object = slave.arm.left;
				} else {
					return undefined;
				}
			} else {
				if (getRightArmID(slave) === 1) {
					object = slave.arm.right;
				} else {
					return undefined;
				}
			}
		}
	}

	return object;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} location
 * @returns {Record<string, string>} If undefined, the location does not exist or can't be branded.
 */
App.Medicine.Modification.brandObject = function(slave, location) {
	return App.Medicine.Modification.modifiableBodyPart(slave, location)?.brand;
};

/**
 * Creates a new brand on a slaves body at a given location. Does nothing, if the location (for example an arm) does not
 * exist or can't be branded.
 * @param {App.Entity.SlaveState} slave
 * @param {string} location
 * @param {string} design
 */
App.Medicine.Modification.addBrand = function(slave, location, design) {
	const scarObject = App.Medicine.Modification.brandObject(slave, location);
	if (scarObject === undefined) {
		// body part does not exist
		return;
	}
	scarObject[location] = design;
};

/**
 * Basic application of scar
 * @param {App.Entity.SlaveState} slave
 * @param {string} location
 */
App.Medicine.Modification.removeBrand = function(slave, location) {
	const brandObject = App.Medicine.Modification.brandObject(slave, location);
	if (brandObject === undefined) {
		// body part does not exist
		return;
	}

	delete brandObject[location];
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {Record<string, Partial<App.Entity.ScarState>>}
 */
App.Medicine.Modification.scarRecord = function(slave) {
	const scars = Object.assign({}, slave.scar);
	Object.assign(scars, slave.leg.left?.scar);
	Object.assign(scars, slave.leg.right?.scar);
	Object.assign(scars, slave.arm.left?.scar);
	Object.assign(scars, slave.arm.right?.scar);
	return scars;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} location
 * @returns {Record<string, Partial<App.Entity.ScarState>>} If undefined, the location does not exist or can't be scarred.
 */
App.Medicine.Modification.scarObject = function(slave, location) {
	return App.Medicine.Modification.modifiableBodyPart(slave, location)?.scar;
};

/**
 * Creates a new scar on a slaves body at a given location. Does nothing, if the location (for example an arm) does not
 * exist or can't be scarred.
 * @param {App.Entity.SlaveState} slave
 * @param {string} location
 * @param {keyof App.Entity.ScarState|string} design
 * @param {number} [weight=1]
 */
App.Medicine.Modification.addScar = function(slave, location, design, weight = 1) {
	/*
	V.scarApplied = 1;
	surgeryDamage(slave, 10); // dangerous to uncomment this as sometimes many scars are applied at once.
	cashX(forceNeg(surgery.costs), "slaveSurgery", slave);
	surgeryDamage(slave, (V.PC.skill.medicine >= 100) ? Math.round(surgery.healthCosts / 2) : surgery.healthCosts);*/

	const scarObject = App.Medicine.Modification.scarObject(slave, location);
	if (scarObject === undefined) {
		// body part does not exist
		return;
	}

	if (!scarObject.hasOwnProperty(location)) {
		scarObject[location] = new App.Entity.ScarState();
	}
	if (scarObject[location].hasOwnProperty(design)) {
		scarObject[location][design] += weight;
	} else {
		scarObject[location][design] = weight;
	}
};

/**
 * Remove all scars from a given location
 * @param {App.Entity.SlaveState} slave
 * @param {string} location
 */
App.Medicine.Modification.removeAllScars = function(slave, location) {
	const scarObject = App.Medicine.Modification.scarObject(slave, location);
	if (scarObject === undefined) {
		// body part does not exist
		return;
	}

	delete scarObject[location];
};

/**
 * Basic application of scar
 * @param {App.Entity.SlaveState} slave
 * @param {string} location
 * @param {keyof App.Entity.ScarState|string} design
 */
App.Medicine.Modification.removeScar = function(slave, location, design) {
	const scarObject = App.Medicine.Modification.scarObject(slave, location);
	if (scarObject === undefined) {
		// body part does not exist
		return;
	}

	if (scarObject.hasOwnProperty(location)) { // if scar object exists for this body part
		if (scarObject[location].hasOwnProperty(design)) { // if object has this kind of scar (might be custom)
			if (["burn", "c-section", "chain", "cutting", "exotic", "generic", "menacing", "surgical", "whip"].includes(design)) {
				scarObject[location][design] = 0;
			} else {
				delete scarObject[location][design]; // scar was custom
			}
		}
		// remove the scar object entirely if no entry is scarred:
		let weights = Object.values(scarObject[location]);
		let total = 0;
		let i;
		for (i = 0; i < weights.length; i++) {
			total += weights[i];
		}
		if (total === 0) {
			delete scarObject[location];
		}
	}
};

/**
 * Slave is whipped over the entire body, and strains in manacles so much that the wrists and ankles scar if present.
 * @param {App.Entity.SlaveState} slave
 * @param {number} [weight]
 */
App.Medicine.Modification.addScourged = function(slave, weight) {
	let scarArray = ["left breast", "right breast", "back", "lower back", "left buttock", "right buttock"];
	// Whip
	if (getLeftArmID(slave) === 1) {
		scarArray.push("left upper arm");
	}
	if (getRightArmID(slave) === 1) {
		scarArray.push("right upper arm");
	}
	if (getLeftLegID(slave) === 1) {
		scarArray.push("left thigh");
	}
	if (getRightLegID(slave) === 1) {
		scarArray.push("right thigh");
	}

	for (let i = 0; i < scarArray.length; i++) {
		App.Medicine.Modification.addScar(slave, scarArray[i], "whip", weight);
	}
	// Manacles
	scarArray = [];
	if (getLeftArmID(slave) === 1) {
		scarArray.push("left wrist");
	}
	if (getRightArmID(slave) === 1) {
		scarArray.push("right wrist");
	}
	if (getLeftLegID(slave) === 1) {
		scarArray.push("left ankle");
	}
	if (getRightLegID(slave) === 1) {
		scarArray.push("right ankle");
	}
	for (let i = 0; i < scarArray.length; i++) {
		App.Medicine.Modification.addScar(slave, scarArray[i], "chain", weight);
	}
};

/**
 * Scars a slave over a large section of their body.
 * @param {App.Entity.SlaveState} slave
 * @param {string} location full, upper, lower, left or right
 * @param {keyof App.Entity.ScarState} type whip, burn, surgical, generic
 * @param {number} weight
 */
App.Medicine.Modification.addBulkScars = function(slave, location, type, weight) {
	let scarArray = [];

	/* Divide slave into quarters, and add each quarter as needed. */

	/* Top left */
	if (["full", "left", "upper"].includes(location)) {
		scarArray.push("left breast");
		if (getLeftArmID(slave) === 1) {
			scarArray.push("left upper arm", "left lower arm", "left hand");
		}
	}

	/* Top right */
	if (["full", "right", "upper"].includes(location)) {
		scarArray.push("right breast");
		if (getRightArmID(slave) === 1) {
			scarArray.push("right upper arm", "right lower arm", "right hand");
		}
	}

	/* Lower left */
	if (["full", "left", "lower"].includes(location)) {
		scarArray.push("left buttock");
		if (getLeftLegID(slave) === 1) {
			scarArray.push("left thigh", "left calf", "left foot");
		}
	}

	/* Lower Right */
	if (["full", "lower", "right"].includes(location)) {
		scarArray.push("right buttock");
		if (getRightLegID(slave) === 1) {
			scarArray.push("right thigh", "right calf", "right foot");
		}
	}

	/* Extra */
	if (["full", "upper"].includes(location)) {
		scarArray.push("back", "lower back");
	}

	for (let i = 0; i < scarArray.length; i++) {
		App.Medicine.Modification.addScar(slave, scarArray[i], type, weight);
	}
};

/**
 * Adds a piercing to a slave.
 * @param {App.Entity.SlaveState} slave
 * @param {string} location
 * @param {number} weight
 * @returns {string} slave reaction
 */
App.Medicine.Modification.setPiercing = function(slave, location, weight) {
	// reaction
	const {
		He, His,
		he, his, him
	} = getPronouns(slave);
	const delta = weight - slave.piercing[location].weight;
	let r = [];
	if (location === "tongue") {
		if (slave.fetishKnown && slave.fetish === "cumslut" && slave.fetishStrength > 10) {
			r.push(`Since ${he}'s an oral whore, ${he}'s`);
			if (delta > 0) {
				if (weight > 1) {
					r.push(`<span class="devotion inc">very happy</span> you took the time to personally pierce ${his} tongue so heavily.`);
				} else {
					r.push(`<span class="devotion inc">happy</span> to get a tongue piercing from you personally.`);
				}
				r.push(`After all, ${he}'s pretty sure it's a sign there will be plenty of ${V.PC.dick > 0 ? `dick for ${him} to suck` : `pussy for ${him} to eat`} in the future.`);
				slave.devotion += 2 * delta;
			} else if (slave.devotion <= 95) {
				r.push(`<span class="devotion dec">saddened</span> you decided to take out ${his} tongue piercings. ${He}'s afraid this means something about ${his} future as a suck slut.`);
				slave.devotion += 2 * delta;
			} else {
				r.push(`disappointed to lose ${his} tongue piercings, but accepts your will for ${his} body.`);
			}
		}
		if (slave.sexualFlaw === "hates oral" && weight > 0) {
			r.push(`${He} has trouble thinking of ${his} mouth as a warm, wet, playful hole, so ${his} new piercings will be therapeutic. Having something to suck on at all times should force ${him} past ${his} hang-ups.`);
		}
	} else if (location === "nipples" || location === "areolae") {
		if (slave.fetishKnown && slave.fetish === "boobs" && slave.fetishStrength > 10) {
			r.push(`Since ${he}'s fixated on ${his} boobs, ${he}'s`);
			if (delta > 0) {
				if (weight > 1) {
					r.push(`<span class="devotion inc">very happy</span> you took the time to personally pierce them so heavily.`);
				} else {
					r.push(`<span class="devotion inc">happy</span> to get them pierced by you personally.`);
				}
				r.push(`As far as ${he}'s concerned, more attention on ${his} tits is always good.`);
				slave.devotion += 2 * delta;
			} else if (slave.devotion <= 95) {
				r.push(`<span class="devotion dec">saddened</span> you decided to take out ${his} piercings. ${He} doesn't like anything that makes ${his} tits less distinctive.`);
				slave.devotion += 2 * delta;
			} else {
				r.push(`disappointed to lose ${his} the piercings in ${his} ${location}, but accepts your will for ${his} body.`);
			}
		}
	} else if (location === "corset") {
		if (slave.fetishKnown && slave.fetish === "masochist" && slave.fetishStrength > 10) {
			r.push(`Since ${he}'s a pain whore`);
			if (delta > 0) {
				r.push(`${he} <span class="devotion inc">got off</span> on you giving ${him} a corset piercing personally. ${He} loved the feeling of the metal entering ${his} flesh.`);
				slave.devotion += 2 * delta;
			} else if (slave.devotion <= 95) {
				r.push(`<span class="devotion dec">saddened</span> you decided to take out ${his} corset piercings. ${He}'ll miss the constant slight discomfort they gave ${him}.`);
				slave.devotion += 2 * delta;
			} else {
				r.push(`disappointed to lose ${his} corset piercings, but accepts your will for ${his} body.`);
			}
		}
	} else if (location === "vagina") {
		if (slave.fetishKnown && slave.fetish === "pregnancy" && slave.fetishStrength > 10) {
			r.push(`Since ${he}'s a whore for impregnation, ${he}'s`);
			if (delta > 0) {
				if (weight > 1) {
					r.push(`<span class="devotion inc">very happy</span> you took the time to personally pierce ${his} pussylips so heavily.`);
				} else {
					r.push(`<span class="devotion inc">happy</span> to get pussy piercings from you personally.`);
				}
				r.push(`Like most pregnancy fetishists, ${he}'s a little desperate for dick, and anything that points towards more bareback sex is appealing to ${him}.`);
				slave.devotion += 2 * delta;
			} else if (slave.devotion <= 95) {
				r.push(`<span class="devotion dec">saddened</span> you decided to take out ${his} pussy piercings. Like most pregnancy fetishists, ${he}'s a little desperate for dick, and ${he}'s afraid of anything that points towards less attention focused on ${his} cunt.`);
				slave.devotion += 2 * delta;
			} else {
				r.push(`disappointed to lose ${his} pussy piercings, but accepts your will for ${his} body.`);
			}
		}
		if (slave.sexualFlaw === "hates penetration" && weight > 0) {
			r.push(`${He} has trouble thinking of ${his} vagina as a fuckhole rather than something special to protect and cherish, so ${his} new piercings will be therapeutic. The constant, inescapable stimulation of ${his} labia should force ${him} past ${his} hang-ups.`);
		}
	} else if (location === "dick") {
		if (slave.fetishKnown && slave.fetish === "pregnancy" && slave.fetishStrength > 10) {
			r.push(`Since ${he}'s fixated on using ${his} cock to impregnate other slaves, ${he}'s`);
			if (delta > 0) {
				if (weight > 1) {
					r.push(`<span class="devotion inc">very happy</span> you took the time to personally stick so much metal into ${his} dick${(slave.scrotum > 0) ? ` and ballsack` : ``}.`);
				} else {
					r.push(`<span class="devotion inc">happy</span> to get penis piercings from you personally.`);
				}
				r.push(`${He}'s extremely proud of ${his} newly decorated member.`);
				slave.devotion += 2 * delta;
			} else if (slave.devotion <= 95) {
				r.push(`<span class="devotion dec">saddened</span> you decided to take out ${his} dick piercings. ${He} passionately loves using ${his} penis, and ${he}'s concerned you're planning to let ${him} do less of that.`);
				slave.devotion += 2 * delta;
			} else {
				r.push(`disappointed to lose ${his} dick piercings, but accepts your will for ${his} body.`);
			}
		}
	} else if (location === "anus") {
		if (slave.fetishKnown && slave.fetish === "buttslut" && slave.fetishStrength > 10) {
			r.push(`Since ${he}'s an anal slut, ${he}'s`);
			if (delta > 0) {
				if (weight > 1) {
					r.push(`<span class="devotion inc">very happy</span> you took the time to personally pierce the entire area around ${his} whorish asspussy.`);
				} else {
					r.push(`<span class="devotion inc">happy</span> to get a piercing next to ${his} favorite hole from you personally.`);
				}
				r.push(`${He} can't wait to find out how the metal will feel against ${his} butthole when ${he} moves around.`);
				slave.devotion += 2 * delta;
			} else if (slave.devotion <= 95) {
				r.push(`<span class="devotion dec">saddened</span> you decided to take out ${his} backdoor piercings. ${He} will miss the constant anal titillation, and ${he}'s worried this means you're becoming less interested in ${his} butthole.`);
				slave.devotion += 2 * delta;
			} else {
				r.push(`disappointed to lose ${his} backdoor piercings, but accepts your will for ${his} body.`);
			}
		}
		if (slave.sexualFlaw === "hates anal" && weight > 0) {
			r.push(`${He} has trouble thinking of ${his} asshole as a sexy, fuckable hole, so ${his} new piercings will be therapeutic. The constant tickling back there should force ${him} past ${his} hang-ups.`);
		}
	} else if (location === "genitals") {
		if (weight === 0) {
			slave.piercing.genitals.smart = false;
		}
	}

	if (slave.genes === "XY" && slave.attrXY <= 35 && ["ear", "eyebrow", "lips", "navel", "nose"].includes(location)) {
		r.push(`${His} girly new`);
		switch (location) {
			case "ear":
				r.push(`pierced ears should help ${him} a little with ${his} issues about ${his} self-image as a fuckable slave girl.`);
				break;
			case "lips":
				r.push(`facial piercing, just below ${his} pretty mouth, should help ${him} get used to the idea of it being a warm, wet hole for cocks.`);
				break;
			case "nose":
				r.push(`nose piercing should make ${his} reflection in the mirror seem just a bit more fuckably feminine to ${him}.`);
				break;
			case "navel":
				r.push(`navel piercing should help ${him} see ${his} naked body in a submissively sexual way, especially as ${he} turns to hide it and present ${his} asspussy.`);
				break;
			case "eyebrow":
				r.push(`facial piercing should help destroy ${his} vestiges of sexual identity outside of ${his} life as a hole for cocks.`);
				break;
			default:
				r.push(`set of slutty facial piercings should help ${him} get used to the idea of being a girly slave meant to please dicks.`); /* impossible, but I'm leaving the text anyway */
		}
		if (slave.devotion < -20) {
			r.push(`Unfortunately, that positive effect will have to wait until ${he}'s a little less resistant to the idea of being a sex slave.`);
		}
	}

	slave.piercing[location].weight = weight;
	return r.join(" ");
};

/**
 * Adds a tattoo to a slave.
 * @param {App.Entity.SlaveState} slave
 * @param {string} location
 * @param {string|number} design (0 removes)
 * @param {boolean} cheat
 * @returns {string} slave reaction
 */
App.Medicine.Modification.setTattoo = function(slave, location, design, cheat) {
	if (!cheat) {
		cashX(forceNeg(V.modCost), "slaveMod", slave);
	}

	// reaction
	const {He, he, His, his, him} = getPronouns(slave);
	const {say, title: Master} = getEnunciation(slave);
	let r = [];
	if (location === "vagina" && design === "lewd crest") {
		if (canSee(slave)) {
			if (slave.fetish === "pregnancy") {
				r.push(`${He} smiles, pleased at the attention ${his} womb is getting.`);
			} else if (slave.fetish === Fetish.SUBMISSIVE) {
				r.push(`${He} flushes, understanding that ${he} has been marked for debauchery.`);
			} else if (slave.fetish === "humiliation") {
				r.push(`${He} smiles, pleased that ${he}'s been marked erotic.`);
			} else if (slave.devotion > 50) {
				r.push(`${He} smiles, pleased at the mark of your attention to ${his} body.`);
				r.push(Spoken(slave, `"Thank you, ${Master},"`));
				r.push(`${he} ${say}s devotedly.`);
				r.push(Spoken(slave, `"I love you and I'll serve you with my body as best I can."`));
			} else if (slave.devotion > 20) {
				r.push(`${He} stares, torn between admiration at the intricate design and realization that ${his} abdomen has been permanently tattooed.`);
				r.push(Spoken(slave, `"Thank you, ${Master},"`));
				r.push(`${he} ${say}s, taking refuge in propriety.`);
				r.push(Spoken(slave, `"Um, d-does this mean I'm even more of a, um, s-slut now?"`));
				r.push(`${he} asks hesitantly, not sounding very enthusiastic.`);
			} else if (slave.trust < -20) {
				r.push(`${He} stares, looking sad as the meaning of a permanent display of ${his} status as lewd slut sinks in. After a short pause ${he} remembers ${his} duties and stammers,`);
				r.push(Spoken(slave, `"T-thank you, ${Master}."`));
				r.push(`After a while longer ${he} turns ${his} head away, clearly not wanting to dwell on how ${his} body is being branded to attract sexual attention.`);
			} else {
				r.push(`${He} stares, horrified at the lewd crest that now adorns ${his} lower belly.`);
			}
		}
	}
	if (location === "anus" && design !== 0) {
		if (canSee(slave) && canTalk(slave)) {
			const anus = (function(s) {
				if (s.anus > 3) {
					return "anal gape";
				} else if (s.anus === 3) {
					return "relaxed asspussy";
				} else if (s.anus === 2) {
					return "soft butthole";
				} else {
					return "tight butthole";
				}
			})(slave);

			if (design === "bleached") {
				r.push(`${He} knew ${he} was getting ${his} ass bleached, of course. The stinging sensation was hard to miss. Even so, ${he} cranes ${his} neck around as soon as possible to look at ${his} ${anus} in the mirror.`);
			} else {
				r.push(`${He} knew ${he} was getting ${his} asshole tattooed, of course. ${He} cranes ${his} neck around as soon as possible to look at ${his} ${anus} in the mirror.`);
				if (slave.butt > 5) {
					r.push(`${His} huge buttocks are still held apart by the spreaders used to give the tattooing actuators access to ${his} most intimate area, giving ${him} a good view.`);
				}
			}
			if (slave.fetishKnown && slave.fetish === "buttslut") {
				switch (design) {
					case "bleached":
						r.push(`${He} giggles at ${his} crinkled fuckhole's clean, fuckable appearance, and starts squeezing ${his} sphincter muscles experimentally.`);
						r.push(Spoken(slave, `"Thank you, ${Master},"`));
						r.push(`${he} gasps, flushing.`);
						break;
					case "flowers":
					case "tribal patterns":
						r.push(`${He} gasps at the beautiful design and then suddenly bursts into tears.`);
						r.push(Spoken(slave, `"T-thank you, ${Master},"`));
						r.push(`${he} blubbers.`);
						r.push(Spoken(slave, `"I'm s-such an anal whore."`));
						break;
					case "advertisements":
						r.push(`${He} stares, ${his} mouth working as ${he} spells out`);
						if (slave.vagina > -1) {
							r.push(`'Fucktoy's Favorite Fuckhole.' ${He} smiles naughtily.`);
							r.push(Spoken(slave, `"${Master}, it sure is,"`));
						} else {
							r.push(`'Spit First.' ${He} smiles naughtily.`);
							r.push(Spoken(slave, `"${Master}, that works for me. Lube's good too. Or, um, dry's fine too,"`));
						}
						r.push(`${he} giggles.`);
						break;
					case "rude words":
						r.push(`${He} stares, ${his} mouth working as ${he} spells out`);
						if (slave.vagina > -1) {
							r.push(`'Fucktoy's Favorite Fuckhole.' ${He} smiles naughtily.`);
							r.push(Spoken(slave, `"${Master}, it sure is,"`));
						} else {
							r.push(`'Sissy Slut's Sodomy Slit.' ${He} smiles naughtily.`);
							r.push(Spoken(slave, `"${Master}, I love it when you fuck my lewd butt slit,"`));
						}
						r.push(`${he} giggles.`);
						break;
					case "sacrilege":
						r.push(`${He} stares, ${his} mouth working as ${he} reads the ring of Aramaic blasphemy around ${his} hole. Getting it, ${he} smiles naughtily.`);
						r.push(Spoken(slave, `"${Master}, I'm a horrible little butthole succubus. Please, ${Master}, feed me. I need cum in my ass to survive."`));
						break;
					case "sacrament":
						r.push(`${He} stares, ${his} mouth working as ${he} reads the ring of Aramaic around ${his} hole. Getting it, ${he} smiles beatifically.`);
						r.push(Spoken(slave, `"${Master}, I always knew buttsex was a sacrament."`));
						break;
					case "degradation":
						r.push(`${He} stares, ${his} mouth working as ${he} spells out '${getWrittenTitle(slave)} Made Me An Anal Slut.' ${He} smiles naughtily.`);
						r.push(Spoken(slave, `"Oh ${Master}, you did,"`));
						r.push(`${he} ${say}s gratefully.`);
						r.push(Spoken(slave, `"And I love you for it."`));
						break;
					case "counting":
						r.push(`${He} stares, realizing that the markings denote how many times ${he}'s been sodomized.`);
						r.push(Spoken(slave, `"${Master}, thank you, and, and, I hope I'll have to come back in here a lot,"`));
						r.push(`${he} ${say}s.`);
						r.push(Spoken(slave, `"Um, because I have to have that updated. Because I'm being fucked in the butt a lot,"`));
						r.push(`${he} adds, wanting to be completely clear.`);
						break;
					case "bovine patterns":
						r.push(`${He} stares at ${his} new cow's anus. Finally, ${he} focuses on the upsides of being permanently transformed like this.`);
						r.push(Spoken(slave, `"${Master}, I hope this means I'll have to be fed up the butt a lot,"`));
						r.push(`${he} ${say}s, referencing the milking systems' anal feeders.`);
						break;
					case "possessive":
						r.push(`${He} stares, realizing that the ring of numbers around ${his} anus give the date ${he} was enslaved by you.`);
						r.push(Spoken(slave, `"Best place for that date, ${Master},"`));
						r.push(`${he} ${say}s.`);
						r.push(Spoken(slave, `"Being a butt slut is my life now."`));
						break;
					case "paternalist":
						r.push(`${He} stares, ${his} mouth working as ${he} spells out '${getWrittenTitle(slave)} Helped Me Love Anal.'`);
						r.push(Spoken(slave, `"Oh ${Master}, you did,"`));
						r.push(`${he} coos.`);
						r.push(Spoken(slave, `"You did! Thank you so much for helping me become the anal slut I was always meant to be!"`));
						break;
					default:
						r.push(`${He} smiles, pleased at the attention ${his} ${anus} is getting.`);
				}
			} else if (slave.devotion > 50) {
				switch (design) {
					case "bleached":
						r.push(`${He} gasps at how closely the crinkled skin around ${his} anal opening matches the rest of ${his} ${slave.skin} body.`);
						r.push(Spoken(slave, `"Oh, it's so beautiful! Thank you, ${Master}, thank you,"`));
						r.push(`${he} exclaims lovingly.`);
						break;
					case "flowers":
					case "tribal patterns":
						r.push(`${He} gasps at the beautiful design.`);
						r.push(Spoken(slave, `"It's so pretty, ${Master},"`));
						r.push(`${he} ${say}s.`);
						r.push(Spoken(slave, `"Thank you. I love you so much!"`));
						break;
					case "advertisements":
					case "degradation":
					case "paternalist":
					case "possessive":
					case "rude words":
					case "sacrament":
					case "sacrilege":
						r.push(`${He} stares, ${his} mouth working as ${he} spells out the words tattooed in a ring around ${his} asshole.`);
						r.push(Spoken(slave, `"Thank you, ${Master},"`));
						r.push(`${he} ${say}s devotedly.`);
						r.push(Spoken(slave, `"I love you and I'll serve you with my butthole as best I can."`));
						break;
					default:
						r.push(`${He} smiles, pleased at the mark of your attention to ${his} body.`);
						r.push(Spoken(slave, `"Thank you, ${Master},"`));
						r.push(`${he} ${say}s devotedly.`);
						r.push(Spoken(slave, `"I love you and I'll serve you with my butthole as best I can."`));
				}
			} else if (slave.sexualFlaw === "hates anal") {
				r.push(`${He} stares,`);
				switch (design) {
					case "bleached":
						r.push(`horrified, and then shudders convulsively, but can't look away.`);
						break;
					case "flowers":
					case "tribal patterns":
						r.push(`torn between fascination at the intricate design and horror at having ${his} anus permanently tattooed.`);
						break;
					case "advertisements":
					case "degradation":
					case "paternalist":
					case "possessive":
					case "rude words":
					case "sacrament":
					case "sacrilege":
						r.push(`${his} mouth working as ${he} spells out the words tattooed in a ring around ${his} asshole. ${He} starts to cry as their meaning sinks in.`);
						break;
					default:
						r.push(`lower lip quivering.`);
				}
				r.push(`${He} hates being assraped, and knows that this means there's lots of it in store for ${him}.`);
				r.push(Spoken(slave, `"${Master}, p-please,"`));
				r.push(`${he} moans halfheartedly.`);
				r.push(Spoken(slave, `"I d-don't like being b-butt f-fucked."`));
			} else if (slave.devotion > 20) {
				r.push(`${He} stares,`);
				switch (design) {
					case "bleached":
						r.push(`fascinated. ${He} doesn't seem sure what to make of this.`);
						break;
					case "flowers":
					case "tribal patterns":
						r.push(`torn between admiration at the intricate design and realization that ${his} anus has been permanently tattooed.`);
						break;
					case "advertisements":
					case "degradation":
					case "paternalist":
					case "possessive":
					case "rude words":
					case "sacrament":
					case "sacrilege":
						r.push(`${his} mouth working as ${he} spells out the words tattooed in a ring around ${his} asshole. ${He} shudders a little as they sink in and ${he} internalizes what they say about ${him} and ${his} asshole.`);
						break;
					default:
						r.push(`realizing that ${his} anus has been permanently tattooed. It's yet another proof that ${he}'s permanently a sex slave, and ${his} anus is for fucking.`);
				}
				r.push(Spoken(slave, `"Thank you, ${Master},"`));
				r.push(`${he} ${say}s, taking refuge in propriety.`);
				r.push(Spoken(slave, `"Um, d-does this mean I'm going to be more of a, um, b-buttslut?"`));
				r.push(`${he} asks hesitantly, not sounding very enthusiastic.`);
			} else if (slave.trust < -20) {
				r.push(`${He} stares,`);
				switch (design) {
					case "bleached":
						r.push(`trying to process the appearance of what must seem like an unnaturally clean-looking hole.`);
						break;
					case "flowers":
					case "tribal patterns":
						r.push(`struggling to process the fact that one of ${his} most intimate areas has been tattooed. Beautifully tattooed, but still."`);
						break;
					case "advertisements":
					case "degradation":
					case "paternalist":
					case "possessive":
					case "rude words":
					case "sacrament":
					case "sacrilege":
						r.push(`${his} mouth working as ${he} spells out the words tattooed in a ring around ${his} asshole. ${He} shudders as ${he} does ${his} best to conceal ${his} feelings about such a permanent display of ${his} status as an anal slave.`);
						break;
					default:
						r.push(`looking sad as the meaning of a permanent display of ${his} status as an anal slave sinks in.`);
				}
				r.push(`After a short pause ${he} remembers ${his} duties and stammers,`);
				r.push(Spoken(slave, `"T-thank you, ${Master}."`));
				r.push(`After a while longer ${he} turns ${his} head away, clearly not wanting to dwell on how ${his} anus is obviously being beautified to attract sexual attention.`);
			} else {
				switch (design) {
					case "bleached":
						r.push(`${His} face darkens as ${he} sees ${his} crinkled fuckhole's clean, fuckable appearance.`);
						r.push(Spoken(slave, `"Don't you dare fucking assrape me!"`));
						r.push(`${he} bursts out.`);
						break;
					case "flowers":
					case "tribal patterns":
						r.push(`${He}'s momentarily surprised by the pretty design, but then ${his} face darkens.`);
						r.push(Spoken(slave, `"That's permanent!"`));
						r.push(`${he} bursts out.`);
						r.push(Spoken(slave, `"My asshole is going to look like that forever!"`));
						break;
					case "advertisements":
						r.push(`${He} stares, ${his} mouth working as ${he} spells out`);
						if (slave.vagina > -1) {
							r.push(`'Second Pussy.' ${His} face darkens.`);
							r.push(Spoken(slave, `"No it's not,"`));
							r.push(`${he} bursts out.`);
							r.push(Spoken(slave, `"Anal is dirty."`));
						} else {
							r.push(`'Spit First.' ${His} face darkens.`);
							r.push(Spoken(slave, `"Gross,"`));
							r.push(`${he} bursts out.`);
							r.push(Spoken(slave, `"Gross and wrong!"`));
						}
						break;
					case "rude words":
						r.push(`${He} stares, ${his} mouth working as ${he} spells out`);
						if (slave.vagina > -1) {
							r.push(`'Fucktoy's Favorite Fuckhole.' ${His} face darkens.`);
							r.push(Spoken(slave, `"No it's not,"`));
							r.push(`${he} bursts out.`);
							r.push(Spoken(slave, `"It's my ass!"`));
						} else {
							r.push(`'Sissy Slut's Sodomy Slit.' ${His} face darkens.`);
							r.push(Spoken(slave, `"No it's not,"`));
							r.push(`${he} bursts out.`);
							r.push(Spoken(slave, `"I'm not a sissy! Or a slut! And it's not a slit!"`));
							r.push(`Those are debatable, but they can all change, of course.`);
						}
						break;
					case "sacrament":
					case "sacrilege":
						r.push(`${He} stares, ${his} mouth working as ${he} reads the ring of Aramaic around ${his} hole. ${He} doesn't understand it, but ${he}'s not happy about having stuff permanently inscribed around ${his} ass.`);
						break;
					case "degradation":
						r.push(`${He} stares, ${his} mouth working as ${he} spells out '${getWrittenTitle(slave)} Made Me An Anal Slut.' ${His} face darkens.`);
						r.push(Spoken(slave, `"No I'm not,"`));
						r.push(`${he} bursts out. That remains to be seen.`);
						break;
					case "counting":
						r.push(`${He} stares, realizing that the markings denote how many times ${he}'s been sodomized. ${His} face darkens.`);
						r.push(Spoken(slave, `"I see there's room for more,"`));
						r.push(`he bursts out.`);
						r.push(Spoken(slave, `"Fucking gross."`));
						break;
					case "bovine patterns":
						r.push(`${He} stares at ${his} new cow's anus.`);
						r.push(Spoken(slave, `"Fucking gross,"`));
						r.push(`${he} bursts out.`);
						r.push(Spoken(slave, `"I'm not an animal."`));
						r.push(`That remains to be seen.`);
						break;
					case "possessive":
						r.push(`${He} stares, realizing that the ring of numbers around ${his} anus give the date ${he} was enslaved by you. ${His} face darkens.`);
						r.push(Spoken(slave, `"Worst day of my life,"`));
						r.push(`${he} bursts out.`);
						break;
					case "paternalist":
						r.push(`${He} stares, ${his} mouth working as ${he} spells out '${getWrittenTitle(slave)} Helped Me Love Anal.'`);
						r.push(Spoken(slave, `"I don't,"`));
						r.push(`${he} bursts out.`);
						r.push(Spoken(slave, `"It's fucking gross."`));
						break;
					default:
						r.push(`${He} stares, horrified that you have defaced ${his} body in this way.`);
				}
			}
		}
	}
	// TODO: maybe some reactions for other kinds of tattoos would be nice too?

	slave[`${location}Tat`] = design;
	return r.join(" ");
};
