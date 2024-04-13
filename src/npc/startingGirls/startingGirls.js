// cSpell:ignore coarsify

/** Generate a new slave for the starting girls passage
 * @returns {App.Entity.SlaveState}
 */
App.StartingGirls.generate = function(params) {
	let slave = GenerateNewSlave(null, params);
	setHealth(slave, 0, 0, 0, 0, 0);
	slave.devotion = 0;
	slave.trust = 0;
	slave.sexualQuirk = "none";
	slave.behavioralQuirk = "none";
	slave.fetishKnown = 1;
	slave.canRecruit = 0;
	slave.weekAcquired = 0;
	slave.origin = "$auto";

	// We do not really need to call coarsifySlaveValues() here since it will be called by cleanup(),
	// but leaving this here allows generate() to be used elsewhere if we want.
	return App.StartingGirls.coarsifySlaveValues(slave);
};

/** Fit slave's numerical values to the checkpoints defined in App.Data.StartingGirls.
 * @returns {App.Entity.SlaveState}
 */
App.StartingGirls.coarsifySlaveValues = function(slave) {
	// map wide range attributes to presets
	/**
	 * Maps a numerical value to the corresponding preset
	 *
	 * @param {number} value
	 * @param {Array<startingGirlsOptionsPreset>} presets
	 * @returns {number}
	 * @throws RangeError
	 */
	function mapValue(value, presets) {
		for (const entry of presets) {
			if ((entry.extreme === undefined || entry.extreme === V.seeExtreme) &&
				value < entry.max) {
				return entry.value;
			}
		}
		throw new RangeError(`${typeof value} ${value} not contained in given set.`);
	}

	slave.weight = mapValue(slave.weight, App.Data.StartingGirls.weight);
	slave.muscles = mapValue(slave.muscles, App.Data.StartingGirls.muscles);
	slave.waist = mapValue(slave.waist, App.Data.StartingGirls.waist);
	slave.face = mapValue(slave.face, App.Data.StartingGirls.face);
	slave.lips = mapValue(slave.lips, App.Data.StartingGirls.lips);
	slave.intelligence = mapValue(slave.intelligence, App.Data.StartingGirls.intelligence);
	slave.fetishStrength = mapValue(slave.fetishStrength, App.Data.StartingGirls.fetishStrength);
	slave.attrXY = mapValue(slave.attrXY, App.Data.StartingGirls.attr);
	slave.attrXX = mapValue(slave.attrXX, App.Data.StartingGirls.attr);
	slave.energy = mapValue(slave.energy, App.Data.StartingGirls.energy);
	slave.skill.oral = mapValue(slave.skill.oral, App.Data.StartingGirls.skill);
	slave.skill.anal = mapValue(slave.skill.anal, App.Data.StartingGirls.skill);
	slave.skill.vaginal = mapValue(slave.skill.vaginal, App.Data.StartingGirls.skill);
	slave.skill.penetrative = mapValue(slave.skill.penetrative, App.Data.StartingGirls.skill);
	slave.skill.whoring = mapValue(slave.skill.whoring, App.Data.StartingGirls.skill);
	slave.skill.entertainment = mapValue(slave.skill.entertainment, App.Data.StartingGirls.skill);
	slave.skill.combat = mapValue(slave.skill.combat, App.Data.StartingGirls.skill);

	slave.prestige = mapValue(slave.prestige, App.Data.StartingGirls.prestige);

	return slave;
};

/** Make sure user-entered values aren't crazy for starting girls
 * @param {App.Entity.SlaveState} slave
 */
App.StartingGirls.cleanup = function(slave) {
	slave.actualAge = Math.clamp(slave.actualAge, V.minimumSlaveAge, V.retirementAge - 1) || 18;
	slave.physicalAge = slave.actualAge;
	slave.visualAge = slave.actualAge;
	slave.ovaryAge = slave.actualAge;
	// weekAcquired is allowed to be any week up to their birth, not their minimumSlaveAge birthday.
	// This follows the practice with infants in the Nursery, where weekAcquired is the week they entered your de facto control,
	// regardless of whether they could be legally enslaved at that time.
	slave.weekAcquired = Math.clamp(slave.weekAcquired, -Math.min(V.PC.actualAge*52 + V.PC.birthWeek, slave.actualAge*52 + slave.birthWeek), 0);

	// What determines genetic male-versus-female is the presence or absence of a Y chromosome.
	// XXY and XYY result in a male, while X or XXX result in a female.
	// For the moment, this logic does not actually use the fact that the presets are enumerated
	// in App.Data.StartingGirlsNonNumericPresets.genes.
	// This hardcoded conditional allows us to collapse all the more exotic genes into the best match.
	// But if, later, genes other than XX and XY are permitted, then we'll want something cruder that
	// actually references App.Data.StartingGirlsNonNumericPresets.genes to stay in sync,
	// as in coarsifySlaveValues().
	if (slave.genes.includes("Y")) {
		slave.genes = App.Data.StartingGirlsNonNumericPresets.genes[1].value;
	} else {
		slave.genes = App.Data.StartingGirlsNonNumericPresets.genes[0].value;
	}

	slave.oldDevotion = slave.devotion;
	slave.oldTrust = slave.trust;
	if (slave.indenture >= 0) {
		slave.indenture = Math.clamp(slave.indenture, 26, 208) || 26;
	}

	slave.natural.height = Math.clamp(slave.natural.height, 85, 274) || 140;
	slave.height = Math.clamp(slave.height, 85, 274) || 140;
	slave.boobs = Math.clamp(Math.trunc(slave.boobs / 50) * 50, 0, 50000) || 200;
	slave.natural.boobs = Math.clamp(Math.trunc(slave.natural.boobs / 10) * 10, 100, 10000) || 200;
	slave.hLength = Math.clamp(slave.hLength, 0, 500) || 40;

	slave = App.StartingGirls.coarsifySlaveValues(slave);

	if (slave.balls === 0) {
		slave.scrotum = 0;
	}
	if (slave.vagina === -1) {
		slave.vaginaLube = 0;
	}
	if (slave.preg > 0) {
		WombForceFatherID(slave, slave.pregSource);
	}
	if (slave.ovaries === 0) {
		slave.preg = 0;
		slave.pregType = 0;
		slave.pregSource = 0;
		slave.pregWeek = 0;
		slave.pregKnown = 0;
		slave.belly = 0;
		slave.bellyPreg = 0;
	}
	if (slave.analArea < slave.anus) {
		slave.analArea = slave.anus;
	}

	// automatically activate puberty-activated quirks for postpubescent slaves
	if (slave.pubertyXX === 1) {
		for (const [key, data] of App.Data.geneticQuirks) {
			if (data.pubertyActivated && slave.geneticQuirks[key] === 3) {
				slave.geneticQuirks[key] = 2;
			}
		}
	}

	if (slave.counter.birthsTotal > 0) {
		if (slave.pubertyXX < 1) {
			slave.counter.birthsTotal = 0;
		}
		slave.counter.birthsTotal = Math.clamp(slave.counter.birthsTotal, 0, ((slave.physicalAge - slave.pubertyAgeXX) * 50));
	}

	if ((slave.anus > 2 && slave.skill.anal <= 10) || (slave.anus === 0 && slave.skill.anal > 30)) {
		slave.skill.anal = 15;
	}
	if (slave.vagina < 0) {
		slave.skill.vaginal = 0;
	} else if ((slave.vagina > 2 && slave.skill.vaginal <= 10) || (slave.vagina === 0 && slave.skill.vaginal > 30)) {
		slave.skill.vaginal = 15;
	}
	if (slave.pubertyXY && slave.physicalAge >= slave.pubertyAgeXY + 2 && slave.skill.penetrative <= 10) {
		slave.skill.penetrative = 15;
	}
};

/** Apply starting girl PC career bonus
 * @param {App.Entity.SlaveState} slave
 */
App.StartingGirls.applyCareerBonus = function(slave) {
	function applySexSkillBonus() {
		let seed = 2;
		if (slave.skill.oral < 60) {
			slave.skill.oral += 20;
			seed--;
		}
		if ((slave.skill.anal < 60) && ((slave.anus > 0) || (slave.skill.anal <= 10))) {
			slave.skill.anal += 20;
			seed--;
		}
		if ((seed > 0) && (slave.skill.vaginal < 60) && (slave.vagina > -1) && ((slave.vagina > 0) || (slave.skill.vaginal <= 10))) {
			slave.skill.vaginal += 20;
			seed--;
		}
		if ((seed > 0) && (slave.skill.penetrative < 60) && ((canPenetrate(slave) || slave.skill.penetrative <= 10))) {
			slave.skill.penetrative +=20;
		}
	}

	switch (V.PC.career) {
		case "capitalist":
		case "entrepreneur":
		case "business kid":
			if (slave.skill.whoring < 60) {
				slave.skill.whoring += 20;
			}
			break;
		case "mercenary":
		case "recruit":
		case "child soldier":
			if (slave.devotion > 20) {
				slave.trust += 10;
			} else {
				slave.trust -= 10;
			}
			break;
		case "slaver":
		case "slave overseer":
		case "slave tender":
			slave.devotion += 10;
			break;
		case "medicine":
		case "medical assistant":
		case "nurse":
			slave.boobs += 600;
			slave.boobsImplant += 600;
			slave.boobsImplantType = "normal";
			slave.butt += 2;
			slave.buttImplant += 2;
			slave.buttImplantType = "normal";
			slave.lips += 10;
			slave.lipsImplant += 10;
			slave.waist = -55;
			break;
		case "celebrity":
		case "rising star":
		case "child star":
			if (slave.skill.entertainment < 60) {
				slave.skill.entertainment += 20;
			}
			break;
		case "servant":
		case "handmaiden":
		case "child servant":
			slave.trust += 10;
			slave.devotion += 10;
			break;
		case "gang":
		case "hoodlum":
		case "street urchin":
			improveCondition(slave, 5);
			if (slave.skill.combat < 60) {
				slave.skill.combat += 20;
			}
			break;
		case "BlackHat":
		case "hacker":
		case "script kiddy":
			slave.intelligence += 40;
			if (slave.intelligence > 100) {
				slave.intelligence = 100;
			}
			break;
		case "escort":
		case "prostitute":
		case "child prostitute":
			if (slave.skill.entertainment < 60) {
				slave.skill.entertainment += 20;
			}
			if (slave.skill.whoring < 60) {
				slave.skill.whoring += 20;
			}
			applySexSkillBonus();
			break;
		case "wealth":
		case "trust fund":
		case "rich kid":
			applySexSkillBonus();
			break;
		case "engineer":
		case "construction":
		case "worksite helper":
			// slave bonus disabled for these careers
			break;
		default:
			slave.devotion += 10;
			if (slave.skill.whoring < 60) {
				slave.skill.whoring += 20;
			}
			if (slave.skill.entertainment < 60) {
				slave.skill.entertainment += 20;
			}
			applySexSkillBonus();
	}
};

/** Randomize things the player doesn't know about the slave
 * @param {App.Entity.SlaveState} slave
 */
App.StartingGirls.randomizeUnknowns = function(slave) {
	if (slave.attrKnown === 0) {
		slave.attrXX = random(0, 100);
		slave.attrXY = random(0, 100);
		slave.energy = random(1, 90);
	}
	if (slave.fetish !== Fetish.MINDBROKEN && slave.fetishKnown === 0) {
		slave.fetishStrength = random(0, 90);
		slave.fetish = either("boobs", "buttslut", "cumslut", "dom", "humiliation", "masochist", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "pregnancy", "sadist", "submissive");
	}
};

/** Generate a pipe-separated list of slaves with a given mother or father
 * @param {string} parent - "mother" or "father"
 * @param {number} id - parent's slave ID
 * @returns {string}
 */
App.StartingGirls.listOfSlavesWithParent = function(parent, id) {
	if (id === 0) {
		return "";
	}
	let slaveNames = [];
	if (V.PC[parent] === id) {
		slaveNames.push("You");
	}
	const slavesWithParent = V.slaves.filter((s) => s[parent] === id);
	slaveNames = slaveNames.concat(slavesWithParent.map((s) => s.slaveName));
	return slaveNames.join(" | ");
};

/** Render the family tree with an uncommitted slave
 * @param {FC.HumanState} slave
 * @returns {Element}
 */
App.StartingGirls.uncommittedFamilyTree = function(slave) {
	/** @type {FC.HumanState[]} */
	let tSlaves = V.slaves.filter(s => s.ID !== slave.ID); // exclude the unedited copy of this slave, if it exists
	return renderFamilyTree(tSlaves.concat([slave]), slave.ID);
};

/**
 * @param {App.Entity.SlaveState} slave
 */
App.StartingGirls.playerOrigin = function(slave) {
	/** @type {{origin: string, weekAcquired?: number, tattoo?: string, nonPCpregSource?: number}} */
	const data = {origin: "", weekAcquired: undefined};
	if (slave.mother === -1 || slave.father === -1) {
		// Not *all* of the autogenerated origins for your own child have you keeping them from birth, but most do.
		data.weekAcquired = -slave.actualAge*52 - slave.birthWeek;
	}
	switch (V.PC.career) {
		case "wealth":
		case "trust fund":
		case "rich kid":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "You bet your body on a sure hand, only to lose. It turns out you could fuck yourself, and not only that, get yourself pregnant.";
				data.tattoo = "$He has a small tattoo of a losing hand of cards on the nape of $his neck.";
			} else if (slave.mother === -1) {
				data.origin = "You bet your body on a sure hand, only to lose. Nine months later, your $daughter was born.";
				data.tattoo = "$He has a small tattoo of a losing hand of cards on the nape of $his neck.";
			} else if (slave.father === -1) {
				data.origin = "You won a sexual fling with $his mother after winning at cards, a gamble that ultimately burdened you.";
				data.tattoo = "$He has a small tattoo of a poor hand of cards on the nape of $his neck.";
			} else {
				data.origin = "You won $him at cards, a memento from your life as one of the idle rich before you became an arcology owner.";
				data.tattoo = "$He has a small tattoo of a winning hand of cards on the nape of $his neck.";
				data.weekAcquired = random(-104, -1);
			}
			break;
		case "capitalist":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "To solidify an investment in hermaphrodite self-fertility, you took part in a successful test trial. Nine months later your $daughter was born.";
			} else if (slave.mother === -1) {
				data.origin = "Sometimes it pays off to use your body in business deals, and other times you end up burdened with child. $He is the result of the latter.";
			} else if (slave.father === -1) {
				data.origin = "To seal a business deal, a client asked you to knock her up. $He is the end result of that fling.";
			} else {
				data.origin = "You acquired $him in the last stages of your career as a successful venture capitalist.";
				data.weekAcquired = random(-26, -1);
			}
			data.tattoo = "$He has a famous corporate logo tattooed on the nape of $his neck.";
			break;
		case "entrepreneur":
		case "business kid":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "To stand a chance in snagging an investment in hermaphrodite self-fertility, you took part in a successful test trial. Nine months later your $daughter was born.";
			} else if (slave.mother === -1) {
				data.origin = "Sometimes it pays off to use your body in business deals, and other times you end up burdened with child. $He is the result of the latter.";
			} else if (slave.father === -1) {
				data.origin = "To seal a business deal, a client asked you to knock her up. $He is the end result of that fling.";
			} else {
				data.origin = "You acquired $him in the last stages of your career as a budding entrepreneur.";
				data.weekAcquired = random(-26, -1);
			}
			data.tattoo = "$He has your business logo tattooed on the nape of $his neck.";
			break;
		case "mercenary":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "Drugs and alcohol can be a potent mix; the night that followed it can sometimes be hard to remember. Needless to say, once your belly began swelling with $him, you had to temporarily switch to a desk job for your mercenary group.";
			} else if (slave.mother === -1) {
				data.origin = "Drugs and alcohol can be a potent mix; the night that followed it can sometimes be hard to remember. Needless to say, once your belly began swelling with $him, you had to temporarily switch to a desk job for your mercenary group.";
			} else if (slave.father === -1) {
				data.origin = "A trip to a brothel after a mission resulted in an unexpected surprise years later.";
				data.weekAcquired = -slave.actualAge*52 - slave.birthWeek + random(92, 196);
			} else {
				data.origin = "You acquired $him in the last stages of your career as a noted private military contractor.";
				data.weekAcquired = random(-26, -1);
			}
			data.tattoo = "$He has a small tattoo of a private military company's coat of arms on the nape of $his neck.";
			break;
		case "recruit":
		case "child soldier":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "Drugs and alcohol can be a potent mix; the night that followed it can sometimes be hard to remember. Needless to say, once your belly began swelling with $him, your chances at further promotion become rather slim.";
			} else if (slave.mother === -1) {
				data.origin = "Drugs and alcohol can be a potent mix; the night that followed it can sometimes be hard to remember. Needless to say, once your belly began swelling with $him, your chances at further promotion become rather slim.";
			} else if (slave.father === -1) {
				data.origin = "A trip to a brothel after a mission resulted in an unexpected surprise years later.";
				data.weekAcquired = -slave.actualAge*52 - slave.birthWeek + random(92, 196);
			} else {
				data.origin = "You acquired $him in the last stages of your career as a soldier for hire.";
				data.weekAcquired = random(-26, -1);
			}
			data.tattoo = "$He has a small tattoo of a private military company's coat of arms on the nape of $his neck.";
			break;
		case "slaver":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "You never thought you would be capable of impregnating yourself, but years of pleasuring yourself with yourself after missions managed to create $him.";
			} else if (slave.mother === -1) {
				data.origin = "A fresh capture once overpowered you and had his way with you. You kept $him as a painful reminder to never lower your guard again.";
			} else if (slave.father === -1) {
				data.origin = "Your slaving troop kept several girls as fucktoys; you sired $him in your favorite.";
			} else {
				data.origin = "You enslaved $him personally during the last stages of your slaving career.";
				data.weekAcquired = random(-26, -1);
			}
			data.tattoo = "$He has your tiny slaving emblem tattooed behind $his left ear.";
			break;
		case "slave overseer":
		case "slave tender":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "You never thought you would be capable of impregnating yourself, but years of pleasuring yourself with yourself to slaves being broken in proved otherwise.";
			} else if (slave.mother === -1) {
				data.origin = "A fresh capture once overpowered you and had his way with you. You kept $him as a painful reminder to always watch your back.";
			} else if (slave.father === -1) {
				data.origin = "Members of your slaving group were expected to take part in slave breaking. Sometimes accidents like $him happened. This time it was on you.";
			} else {
				data.origin = "You got to keep $him as a going away present when you left the slaving group.";
				data.weekAcquired = 0;
			}
			data.tattoo = "$He has the tiny slaving emblem of the group you worked for tattooed behind $his left ear.";
			break;
		case "engineer":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "You sired $him in yourself after an arcology owner, impressed by your work, rewarded you with a night you'll never forget.";
			} else if (slave.mother === -1) {
				data.origin = "You conceived $him after a male arcology owner, impressed by your work, rewarded you with a night you'll never forget.";
			} else if (slave.father === -1) {
				data.origin = "You sired $him after a female arcology owner, impressed by your work, rewarded you with a night you'll never forget.";
			} else {
				data.origin = "You received $him as a gift from an arcology owner impressed by your work.";
				data.weekAcquired = random(-104, -1);
			}
			data.tattoo = "$He has the geometric symbol of your old arcology engineering firm laser tattooed into the nape of $his neck.";
			break;
		case "construction":
		case "worksite helper":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "You sired $him in yourself after a string of women rejected your catcalls.";
			} else if (slave.mother === -1) {
				data.origin = "You conceived $him during a job well done celebration with your coworkers.";
			} else if (slave.father === -1) {
				data.origin = "A catcall turned sexual romp lead to an unexpected surprise nine months later.";
			} else {
				data.origin = "You received $him as a gift for all the work you gave the construction firm.";
				data.weekAcquired = random(-26, -1);
			}
			data.tattoo = "$He has the logo of the construction firm you worked with laser tattooed into the nape of $his neck.";
			break;
		case "medicine":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "$He was conceived after a successful experiment in hermaphrodite self-reproduction.";
			} else if (slave.mother === -1) {
				data.origin = "$He was conceived after a botched birth control experiment early in your career.";
			} else if (slave.father === -1) {
				data.origin = "$He is the product of an affair with a cute nurse who assisted you in more ways than one.";
			} else {
				data.origin = "You kept $him after $his owner failed to pay your bill for performing surgery on $him.";
				data.weekAcquired = random(-104, -1);
			}
			data.tattoo = "$He has your personal symbol tattooed on the back of $his neck: it's invisible to the naked eye, but shows up starkly on medical imaging.";
			break;
		case "medical assistant":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "$He was conceived after a successful experiment in hermaphrodite self-reproduction.";
			} else if (slave.mother === -1) {
				data.origin = "$He was the result of a backfired surrogacy program.";
			} else if (slave.father === -1) {
				data.origin = "$He is the product of an affair with a cute nurse you worked with.";
			} else {
				data.origin = "You got to keep $him when $he was given as unwanted payment to the practice.";
				data.weekAcquired = random(-52, -1);
			}
			data.tattoo = "$He has the symbol of the practice you worked at tattooed on the back of $his neck: it's invisible to the naked eye, but shows up starkly on medical imaging.";
			break;
		case "nurse":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "$He was conceived after some self-experimentation in hermaphrodite self-reproduction.";
			} else if (slave.mother === -1) {
				data.origin = "$He took root in your womb when you decided to play with the IFV tools.";
			} else if (slave.father === -1) {
				data.origin = "You provided the sperm for $his conception, but the client backed out post-birth so you offered to look after $him.";
			} else {
				data.origin = "You got to keep $him when $he was given as unwanted payment to the practice.";
				data.weekAcquired = random(-26, -1);
			}
			data.tattoo = "$He has the symbol of the practice you worked at tattooed on the back of $his neck: it's invisible to the naked eye, but shows up starkly on medical imaging.";
			break;
		case "celebrity":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "$He was conceived after a night of partying and a drunken bet. $He nearly killed your career.";
				data.tattoo = "$He has your signature, surrounded by hearts, tattooed on the back of $his neck.";
			} else if (slave.mother === -1) {
				data.origin = "$He was conceived after a night of partying and a torn condom. $He nearly killed your career.";
				data.tattoo = "$He has your signature, surrounded by hearts, tattooed on the back of $his neck.";
			} else if (slave.father === -1) {
				data.origin = "$He was conceived after a night of partying and a torn condom.";
				data.tattoo = "$He has your signature, surrounded by hearts, tattooed on the back of $his neck.";
			} else {
				data.origin = "$He was one of your groupies during your celebrity career.";
				data.weekAcquired = random(-208, -1);
				data.tattoo = "$He has your signature, surrounded by hearts, tattooed on the back of $his neck. $He got the tattoo when $he was still free.";
			}
			break;
		case "rising star":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "A casting agent told you to go fuck yourself if you wanted the lead role. You complied, but your resulting pregnancy forced you to be an extra.";
				data.tattoo = "$He has your signature, surrounded by hearts, tattooed on the back of $his neck.";
			} else if (slave.mother === -1) {
				data.origin = "A director offered you a lead role in exchange for your body. You complied, but your resulting pregnancy forced you to be an extra.";
				data.tattoo = "$He has your signature, surrounded by hearts, tattooed on the back of $his neck.";
			} else if (slave.father === -1) {
				data.origin = "$He was conceived after a night of partying and a torn condom. As a bonus, the girl you knocked up was no longer in competition with you for roles.";
				data.tattoo = "$He has your signature, surrounded by hearts, tattooed on the back of $his neck.";
			} else {
				data.origin = "$He was one of your groupies during your celebrity career.";
				data.weekAcquired = random(-104, -1);
				data.tattoo = "$He has your signature, surrounded by hearts, tattooed on the back of $his neck. $He got the tattoo when $he was still free.";
			}
			break;
		case "child star":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "A sleazy casting agent had you fuck yourself to get a major role. You complied, but your resulting pregnancy ruined your chances.";
				data.tattoo = "$He has your signature, surrounded by hearts, tattooed on the back of $his neck.";
			} else if (slave.mother === -1) {
				data.origin = "A sleazy director offered you an important role if you had sex with him. Needless to say, a knocked up young girl doesn't get many roles.";
				data.tattoo = "$He has your signature, surrounded by hearts, tattooed on the back of $his neck.";
			} else if (slave.father === -1) {
				data.origin = "One of your older fans got the chance to meet you. You left her more than she bargained for.";
				data.tattoo = "$He has your signature, surrounded by hearts, tattooed on the back of $his neck.";
			} else {
				data.origin = "$He was a huge fan of yours during your celebrity career.";
				data.weekAcquired = random(-52, -1);
				data.tattoo = "$He has your signature, surrounded by hearts, tattooed on the back of $his neck. $He got the tattoo when $he was still free.";
			}
			break;
		case "escort":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "A client paid you a large sum of credits to prove you could literally fuck yourself. $He is the result of that lucrative night.";
				data.tattoo = "$He has your custom emblem tattooed on $his left breast.";
			} else if (slave.mother === -1) {
				data.origin = "$He was the result of unprotected sex with a client. He paid you quite well to enjoy your body as you grew heavy with his child.";
				data.tattoo = "$He has the number of times $his father came in you while you were pregnant with $him tattooed down $his back.";
			} else if (slave.father === -1) {
				data.origin = "$He was the result of unprotected sex with a client. $His mother tracked you down years after $his birth to force $him upon you.";
				data.weekAcquired = -slave.actualAge*52 - slave.birthWeek + random(92, 196);
				data.tattoo = "$He has your name angrily tattooed on $his right shoulder.";
			} else {
				data.origin = "$He was a fellow escort you were popular with.";
				data.weekAcquired = random(-104, -1);
				data.tattoo = "$He has your custom emblem tattooed on $his left breast. $He got the tattoo after starring in a porno with you.";
			}
			data.nonPCpregSource = -5;
			break;
		case "prostitute":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "A customer paid you a large sum of credits to prove you could literally fuck yourself. $He is the result of that night.";
				data.tattoo = "$He has your ID number tattooed on $his right breast.";
			} else if (slave.mother === -1) {
				data.origin = "$He was the result of unprotected sex with a customer. Birth control was completely optional at the brothel.";
				data.tattoo = "$He has your ID number tattooed on $his right breast.";
			} else if (slave.father === -1) {
				data.origin = "$He was the result of unprotected sex with a customer. $His mother tracked you down years after $his birth to force $him upon you.";
				data.weekAcquired = -slave.actualAge*52 - slave.birthWeek + random(92, 196);
				data.tattoo = "$He has your name angrily tattooed on $his right shoulder.";
			} else {
				data.origin = "$He was a fellow prostitute you often bunked with.";
				data.weekAcquired = random(-52, -1);
				data.tattoo = "$He has $his ID number tattooed on $his left breast.";
			}
			data.nonPCpregSource = -5;
			break;
		case "child prostitute":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "A customer paid you a large sum of credits to prove you could literally fuck yourself. $He is the result of that night much to everybody's surprise.";
				data.tattoo = "$He has your ID number tattooed on $his right breast.";
			} else if (slave.mother === -1) {
				data.origin = "$He was the result of unprotected sex with a customer. Turns out you weren't too young to get pregnant.";
				data.tattoo = "$He has your ID number tattooed on $his right breast.";
			} else if (slave.father === -1) {
				data.origin = "$He was the result of unprotected sex with a customer. $His mother abandoned your child on the brothel's doorstep.";
				data.tattoo = "$He has your ID number tattooed on $his right breast.";
			} else {
				if (slave.actualAge >= V.PC.actualAge + 10) {
					data.origin = "$He was a fellow prostitute who was like a parent to you.";
				} else {
					data.origin = "$He was a fellow underage prostitute you often played with.";
				}
				data.weekAcquired = random(-26, -1);
				data.tattoo = "$He has $his ID number tattooed on $his left breast.";
			}
			data.nonPCpregSource = -5;
			break;
		case "gang":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "$He was the result of a night of hard drugs and unprotected sex after a big score. It took quite a bit of alcohol to come to terms with drunkenly knocking yourself up.";
			} else if (slave.mother === -1) {
				data.origin = "$He was the result of a night of hard drugs and unprotected sex after a big score.";
			} else if (slave.father === -1) {
				data.origin = "$He was born from one of your sex toys you knocked up.";
			} else {
				data.origin = "You captured $him during your transition to the arcology";
				data.weekAcquired = 0;
			}
			data.tattoo = "$He has your former gang's sign tattooed on $his neck.";
			break;
		case "hoodlum":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "Getting drunk and taking bets on what you can or cannot stick in your holes is not something you what to explain to a resulting child.";
			} else if (slave.mother === -1) {
				data.origin = "It wasn't uncommon to have to trade sex for favors, and in $his case, you ended up with more than you bargained for.";
			} else if (slave.father === -1) {
				data.origin = "Given all the casual unprotected sex, it's not really a surprise you're a daddy.";
			} else {
				data.origin = "You took $him from the gang during your transition to the arcology";
				data.weekAcquired = 0;
			}
			data.tattoo = "$He has the gang's sign that you rolled with tattooed on $his neck.";
			break;
		case "street urchin":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "In order to gain any favors from the gang, you often had to appease their demands. They had quite the laugh when they managed to get you to knock yourself up for them.";
			} else if (slave.mother === -1) {
				data.origin = "It wasn't uncommon to pass time fucking in back alleys, and without any access to protection, you eventually found yourself with child.";
			} else if (slave.father === -1) {
				data.origin = "It wasn't uncommon to pass time fucking in back alleys, but without any access to protection, pregnancies happened.";
			} else {
				data.origin = "You took $him with you instead of leaving $him on the streets.";
				data.weekAcquired = 0;
			}
			data.tattoo = "$He has the gang's sign that you associated with tattooed on $his neck.";
			break;
		case "servant":
		case "handmaiden":
		case "child servant":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "Your late Master took pleasure in using his servants in creative ways. He inseminated you with your own sperm, and nine months later, your $daughter was born.";
			} else if (slave.mother === -1) {
				data.origin = "$He was another of your late Master's servants. $He spent nine months in your womb, courtesy of your Master.";
			} else if (slave.father === -1) {
				data.origin = "$He was another of your late Master's servants. Your Master permitted you to knock up $his mother.";
			} else if (V.PC.vagina !== -1) {
				data.origin = "$He was another of your late Master's servants. $He helped you give birth to his child.";
			} else {
				data.origin = "$He was another of your late Master's servants.";
			}
			// If the late Master's death date is recorded anywhere, this should match to that.
			data.weekAcquired = random(-26, -1);
			data.tattoo = "$He has your Master's brand on $his left breast.";
			data.nonPCpregSource = -3;
			break;
		case "BlackHat":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "$He was the result of a night of hard celebration after a big score under the glow of monitors and the calming hum of 750 RPM fans. It took quite a bit of alcohol to come to terms with drunkenly knocking yourself up.";
			} else if (slave.mother === -1) {
				data.origin = "$He was the result of an intruder brute forcing your firewall, overloading your pleasure sensors, and allowing a corrupted packet to slip by. With a quick wipe of your RAM and cache with some powerful liquor, you have no idea who planted $him in your womb.";
			} else if (slave.father === -1) {
				data.origin = "$He was born out of a trade for secure data access. Nine months later, your $daughter was born.";
			} else {
				data.origin = "$He was a case officer you captured after going dark.";
				data.weekAcquired = random(-26, -1);
			}
			data.tattoo = "$He has your former digital calling card tattooed on $his neck.";
			break;
		case "hacker":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "You got the idea of fucking yourself after watching some private videos you acquired. It took quite a bit of alcohol to come to terms with drunkenly knocking yourself up.";
			} else if (slave.mother === -1) {
				data.origin = "What was intended to be a lucrative scam resulted in you bumping uglies with the bigger fish in the pond. $He is the result of that tryst.";
			} else if (slave.father === -1) {
				data.origin = "A little data manipulation and suddenly you were the sperm donor in place of $his intended father. Years later $he managed to find $his way to you.";
				data.weekAcquired = random(-208, -1);
			} else {
				data.origin = "$He was someone you wanted to keep quiet after going dark.";
				data.weekAcquired = random(-52, -1);
			}
			data.tattoo = "$He has your encoded online handle tattooed on $his neck.";
			break;
		case "script kiddy":
			if (slave.mother === -1 && slave.father === -1) {
				data.origin = "Just because you saw it on the internet doesn't mean you should try it. You did and now you are both a proud mother and father.";
			} else if (slave.mother === -1) {
				data.origin = "You got a little sloppy with covering your tracks allowing a slighted rival to track you down. The resulting confrontation wasn't all that unpleasant, but the following couple years were hell.";
			} else if (slave.father === -1) {
				data.origin = "You wanted to see how easily you could trick some girl into thinking you were famous. You ended up with a $daughter from the resulting sex.";
			} else {
				data.origin = "$He was an unfortunate sap you tricked into enslaving themselves.";
				data.weekAcquired = random(-52, -1);
			}
			data.tattoo = "$He has your online handle tattooed on $his neck.";
			break;
		default:
			data.origin = "You won $him at cards, a memento from your life as one of the idle rich before you became an arcology owner.";
			data.weekAcquired = random(-104, -1);
			data.tattoo = "$He has the silhouette of an arcology tattooed on the nape of $his neck.";
	}
	if (slave.fetish === Fetish.MINDBROKEN) {
		if (!isAmputee(slave)) {
			data.origin = "You brought $him into the arcology mindbroken, little more than a walking collection of fuckable holes.";
		} else {
			data.origin = "You brought $him into the arcology mindbroken, little more than a human onahole.";
		}
	}

	return {
		preview: data.origin,
		apply: updateSlave,
	};

	function updateSlave() {
		slave.origin = data.origin;
		if (data.weekAcquired !== undefined) {
			slave.weekAcquired = data.weekAcquired;
		}
		slave.custom.tattoo = data.tattoo;
		if (data.nonPCpregSource && slave.preg > 0 && slave.pregSource !== -1) {
			slave.pregSource = data.nonPCpregSource;
		}
	}
};

/**
 * @param {object} option
 * @param {Array<startingGirlsOptionsPreset>} set
 * @param {boolean} showTextbox
 */
App.StartingGirls.addSet = function(option, set, showTextbox) {
	set.forEach((preset) => {
		if (preset.extreme === undefined || preset.extreme === V.seeExtreme) {
			option.addValue(preset.name, preset.value);
			if (preset.style) {
				option[preset.style]();
			}
		}
	});
	if (showTextbox) {
		option.showTextBox();
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {boolean} cheat
 * @returns {DocumentFragment}
 */
App.StartingGirls.physical = function(slave, cheat = false) {
	const el = new DocumentFragment();
	const options = new App.UI.OptionsGroup();
	let option;

	option = options.addOption("Condition", "condition", slave.health)
		.addValueList([["Unhealthy", -40], ["Healthy", 0], ["Very healthy", 40], ["Extremely healthy", 80]]);
	if (cheat) {
		option.showTextBox();
		options.addOption("Short term damage", "shortDamage", slave.health).showTextBox();
		options.addOption("Long term damage", "longDamage", slave.health).showTextBox();
		options.addOption("Illness", "illness", slave.health)
			.addValueList([
				["Not ill", 0],
				["A little under the weather", 1],
				["Minor illness", 2],
				["Ill", 3],
				["Serious illness", 4],
				["Dangerous illness", 5],
			]);
		options.addOption("Tiredness", "tired", slave.health).showTextBox();

		options.addOption("Aphrodisiac addiction", "addict", slave).showTextBox();
		options.addOption("Chemical buildup", "chem", slave).showTextBox();
		options.addOption("Hormone balance", "hormoneBalance", slave)
			.addValueList([
				["Overwhelmingly masculine", -400],
				["Extremely masculine", -300],
				["Heavily masculine", -200],
				["Very masculine", -100],
				["Masculine", -20],
				["Neutral", 0],
				["Feminine", 20],
				["Very feminine", 100],
				["Heavily feminine", 200],
				["Extremely feminine", 300],
				["Overwhelmingly feminine", 400],
			])
			.showTextBox().pulldown();
	}

	options.addOption(`Natural Adult Height: ${heightToEitherUnit(slave.natural.height)}`, "height", slave.natural).showTextBox({unit: "cm"})
		.addRange(145, 150, "<", "Petite")
		.addRange(155, 160, "<", "Short")
		.addRange(165, 170, "<", "Average")
		.addRange(180, 185, "<", "Tall")
		.addRange(190, 185, ">=", "Very tall");
	option = options.addCustomOption(`Average natural adult height is ${heightToEitherUnit(Height.mean(slave.nationality, slave.race, slave.genes, 20))}`)
		.addButton(
			"Make average",
			() => resyncSlaveHeight(slave),
			""
		);
	if (cheat || slave.geneticQuirks.dwarfism === 2) {
		option.addButton(
			"Make dwarf",
			() => slave.natural.height = Height.random(slave, {limitMult: [-4, -1], spread: 0.15}),
			""
		);
	}
	if (cheat || slave.geneticQuirks.gigantism === 2) {
		option.addButton(
			"Make giant",
			() => slave.natural.height = Height.random(slave, {limitMult: [3, 10], spread: 0.15}),
			""
		);
	}
	options.addOption(`Current Height: ${heightToEitherUnit(slave.height)}`, "height", slave).showTextBox({unit: "cm"})
		.addRange(Height.forAge(145, slave), Height.forAge(150, slave), "<", `Petite for age`)
		.addRange(Height.forAge(155, slave), Height.forAge(160, slave), "<", "Short for age")
		.addRange(Height.forAge(165, slave), Height.forAge(170, slave), "<", "Average for age")
		.addRange(Height.forAge(180, slave), Height.forAge(185, slave), "<", "Tall for age")
		.addRange(Height.forAge(190, slave), Height.forAge(185, slave), ">=", "Very tall for age");
	options.addCustomOption(`Average height for a ${slave.physicalAge} year old is ${heightToEitherUnit(Height.mean(slave))}`)
		.addButton(
			"Scale for age from adult height",
			() => slave.height = Height.forAge(slave.natural.height, slave),
			""
		);

	if (cheat) {
		options.addOption("Height implant", "heightImplant", slave)
			.addValueList([
				["-10 cm", -1],
				["None", 0],
				["+10 cm", 1],
			]);
	}

	option = options.addOption("Weight", "weight", slave);
	App.StartingGirls.addSet(option, App.Data.StartingGirls.weight, cheat);

	option = options.addOption("Muscles", "muscles", slave);
	App.StartingGirls.addSet(option, App.Data.StartingGirls.muscles, cheat);

	option = options.addOption("Waist", "waist", slave);
	App.StartingGirls.addSet(option, App.Data.StartingGirls.waist, cheat);

	if (V.seeExtreme === 1) {
		if (cheat) {
			options.addOption("Prosthetic limb interface", "PLimb", slave)
				.addValueList([
					["None", 0],
					["Basic", 1],
					["Advanced", 2],
					["Quadruped", 3],
				]);
		}

		for (const limb of ["arm", "leg"]) {
			for (const side of ["left", "right"]) {
				if (slave[limb][side]) {
					option = options.addOption(`${capFirstChar(side)} ${limb}: present`, "type", slave[limb][side]);
					option.addValue("Natural", 1);
					option.customButton("Amputate",
						() => {
							slave[limb][side] = null;
						},
						""
					);
					if (cheat ) {
						if (slave.PLimb.isBetween(0, 3)) {
							option.addValueList([
								["Simple prosthetic", 2],
								["Advanced: Sex", 3],
								["Advanced: Beauty", 4],
								["Advanced: Combat", 5],
							]);
						}
						if (slave.PLimb.isBetween(1, 3)) {
							option.addValue("Cybernetic", 6);
						}
						if (slave.PLimb === 3) {
							option.addValueList([
								["Feline: Structural", 7],
								["Canine: Structural", 8],
								["Feline: Combat", 9],
								["Canine: Combat", 10],
							]);
						}
					}
				} else {
					options.addCustomOption(`${capFirstChar(side)} ${limb}: amputated`)
						.addButton("Restore",
							() => {
								if (limb === "arm") {
									slave[limb][side] = new App.Entity.ArmState();
								} else {
									slave[limb][side] = new App.Entity.LegState();
								}
							},
							""
						);
				}
			}
		}
	}

	if (cheat) {
		options.addOption("Prosthetic tail interface", "PTail", slave)
			.addValue("None", 0).off().addCallback(()=>{
				slave.tail = "none";
				slave.tailShape = "none";
			})
			.addValue("Installed", 1).on();
		if (slave.PTail) {
			options.addOption("Tail role", "tail", slave)
				.addValueList([
					["None", "none"],
					["Modular", "mod"],
					["Sex", "sex"],
					["Combat", "combat"],
					["Stinger", "stinger"],
				]);

			options.addOption("Tail shape", "tailShape", slave)
				.addValueList([
					["None", "none"],
					["Cat", "cat"],
					["Leopard", "leopard"],
					["Tiger", "tiger"],
					["Jaguar", "jaguar"],
					["Lion", "lion"],
					["Dog", "dog"],
					["Wolf", "wolf"],
					["Jackal", "jackal"],
					["Fox", "fox"],
					["9 Tailed fox", "kitsune"],
					["Tanuki", "tanuki"],
					["Raccoon", "raccoon"],
					["Rabbit", "rabbit"],
					["Squirrel", "squirrel"],
					["Horse", "horse"],
					["Bird", "bird"],
					["Phoenix", "phoenix"],
					["Peacock", "peacock"],
					["Raven", "raven"],
					["Swan", "swan"],
					["Sheep", "sheep"],
					["Cow", "cow"],
					["Gazelle", "gazelle"],
					["Deer", "deer"],
					["Succubus", "succubus"],
					["Dragon", "dragon"],
				]);
			options.addOption("Tail color", "tailColor", slave)
				.addValue (`Matches main hair color (${slave.hColor})`, slave.hColor)
				.addValue("White", "white").off()
				.addComment(`More extensive coloring options are available in the Salon tab`);
		}
	}

	if (cheat) {
		options.addOption("Prosthetic back interface", "PBack", slave)
			.addValue("None", 0).off().addCallback(()=>{
				slave.appendages = "none";
				slave.wingsShape = "none";
			})
			.addValue("Installed", 1).on();
		if (slave.PBack) {
			options.addOption("Appendages Type", "appendages", slave)
				.addValueList([
					["None", "none"],
					["Modular", "mod"],
					["Flight", "flight"],
					["Sex", "sex"],
					["Combat: Falcon", "falcon"],
					["Combat: Arachnid", "arachnid"],
					["Combat: Kraken", "kraken"],
				]);

			options.addOption("Wings shape", "wingsShape", slave)
				.addValueList([
					["None", "none"],
					["Angel", "angel"],
					["Seraph", "seraph"],
					["Demon", "demon"],
					["Dragon", "dragon"],
					["Phoenix", "phoenix"],
					["Bird", "bird"],
					["Fairy", "fairy"],
					["Butterfly", "butterfly"],
					["Moth", "moth"],
					["Insect", "insect"],
					["Evil", "evil"],
				]);
			options.addOption("Appendages Color", "appendagesColor", slave)
				.addValue (`Matches main hair color (${slave.hColor})`, slave.hColor)
				.addValue("White", "white").off()
				.addComment(`More extensive coloring options are available in the Salon tab`);
		}
	}

	el.append(options.render());
	return el;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {boolean} cheat
 * @returns {DocumentFragment}
 */
App.StartingGirls.upper = function(slave, cheat = false) {
	const el = new DocumentFragment();
	const options = new App.UI.OptionsGroup();
	let option;

	option = options.addOption("Facial appearance", "faceShape", slave);
	for (const [key, shape] of App.Medicine.Modification.faceShape) {
		if (shape.hasOwnProperty("requirements") && !shape.requirements) {
			continue;
		}
		option.addValue(capFirstChar(key), key);
	}
	option = options.addOption("Facial attractiveness", "face", slave);
	App.StartingGirls.addSet(option, App.Data.StartingGirls.face, cheat);

	if (cheat) {
		options.addOption("Facial implant", "faceImplant", slave)
			.addValueList([
				["None", 0],
				["Subtle Improvements", 15],
				["Noticeable Work", 35],
				["Heavily Reworked", 65],
				["Uncanny Valley", 100],
			])
			.showTextBox();
	}
	option = options.addOption("Natural eye color", "origColor", slave.eye)
		.showTextBox();
	for (const color of App.Medicine.Modification.eyeColor.map(color => color.value)) {
		option.addValue(capFirstChar(color), color);
	}
	option.addGlobalCallback(() => resetEyeColor(slave))
		.pulldown();

	/** @type {("left"|"right")[]} */
	const sides = ["left", "right"];
	for (const side of sides) {
		if (slave.eye[side]) { // has eye
			let option = options.addOption(`${capFirstChar(side)} eye vision`, "vision", slave.eye[side]);
			option.addValueList([["Normal", 2], ["Nearsighted", 1]]);
			if (V.seeExtreme === 1) {
				option.addValue("Blind", 0);
			} else {
				if (slave.eye[side].vision === 0) {
					slave.eye[side].vision = 2;
				}
			}
			if (cheat) {
				option = options.addOption(`${capFirstChar(side)} eye type`, "type", slave.eye[side])
					.addValueList([
						["Normal", 1, () => eyeSurgery(slave, side, "normal")],
						["Glass", 2, () => eyeSurgery(slave, side, "glass")],
					]);
				option.addValue("Cybernetic", 3, () => eyeSurgery(slave, side, "cybernetic"));
				if (V.seeExtreme === 1) {
					option.customButton("Remove eye", () => eyeSurgery(slave, side, "remove"), "");
				}
			}
			option = options.addOption(`${capFirstChar(side)} pupil shape`, "pupil", slave.eye[side])
				.showTextBox();
			for (const color of App.Medicine.Modification.eyeShape.map(shape => shape.value)) {
				option.addValue(capFirstChar(color), color);
			}
			option.pulldown();

			option = options.addOption(`${capFirstChar(side)} sclera color`, "sclera", slave.eye[side])
				.showTextBox();
			for (const color of App.Medicine.Modification.eyeColor.map(color => color.value)) {
				option.addValue(capFirstChar(color), color);
			}
			option.pulldown();
		} else {
			option = options.addCustomOption(`Missing ${side} eye`)
				.addButton("Restore natural", () => eyeSurgery(slave, side, "normal"));
			if (cheat) {
				option.addButton("Cybernetic", () => eyeSurgery(slave, side, "cybernetic"));
			}
		}
	}
	if (cheat) {
		options.addOption("Ear shape", "earShape", slave)
			.addValueList([
				["Normal", "normal"],
				["None", "none"],
				["Damaged", "damaged"],
				["Pointy", "pointy"],
				["Elven", "elven"],
				["Orcish", "orcish"],
				["Cow", "cow"],
				["Sheep", "sheep"],
				["Gazelle", "gazelle"],
				["Deer", "deer"],
				["Bird", "bird"],
				["Dragon", "dragon"],
			]);

		options.addOption("Top ears", "earT", slave)
			.addValueList([
				["None", "none"],
				["Cat", "cat"],
				["Leopard", "leopard"],
				["Tiger", "tiger"],
				["Jaguar", "jaguar"],
				["Lion", "lion"],
				["Dog", "dog"],
				["Wolf", "wolf"],
				["Jackal", "jackal"],
				["Fox", "fox"],
				["Raccoon", "raccoon"],
				["Rabbit", "rabbit"],
				["Squirrel", "squirrel"],
				["Horse", "horse"],
			]);
		options.addOption("Top ear color", "earTColor", slave)
			.addValue (`Matches main hair color (${slave.hColor})`, slave.hColor)
			.addValue("Hairless", "hairless").off()
			.addComment(`More extensive coloring options are available in the Salon tab, as long as hairless is not selected here`);
	}

	option = options.addOption("Hearing", "hears", slave);
	option.addValueList([["Normal", 0], ["Hard of hearing", -1]]);
	if (V.seeExtreme === 1) {
		option.addValue("Deaf", -2);
	} else if (slave.hears === -2) {
		slave.hears = -1;
	}
	if (cheat) {
		options.addOption("Ear implant", "earImplant", slave)
			.addValue("Implanted", 1).on()
			.addValue("None", 0).off();
	}

	option = options.addOption("Lips", "lips", slave);
	App.StartingGirls.addSet(option, App.Data.StartingGirls.lips, cheat);

	if (cheat) {
		options.addOption("Lips implant", "lipsImplant", slave)
			.addValueList([
				["None", 0],
				["Normal", 10],
				["Large", 20],
				["Enormous", 30],
			]).showTextBox();
	}

	options.addOption("Voice", "voice", slave)
		.addValueList([["Mute", 0], ["Deep", 1], ["Normal", 2], ["High", 3]]);

	if (V.seeExtreme === 1) {
		options.addOption("Smell ability", "smells", slave)
			.addValueList([["Normal", 0], ["None", -1]]);

		options.addOption("Taste ability", "tastes", slave)
			.addValueList([["Normal", 0], ["None", -1]]);
	}

	if (slave.voice !== 0) {
		options.addOption(V.language, "accent", slave)
			.addValueList([
				["Unaccented", 0],
				[`Pretty ${aNational(slave.nationality)} accent`, 1],
				[`Thick ${aNational(slave.nationality)} accent`, 2],
				["Not fluent", 3]
			]);
	}

	option = options.addOption("Teeth", "teeth", slave)
		.addValueList([
			["Crooked", "crooked"],
			["Gapped", "gapped"],
			["Braces", "straightening braces"]
		]);

	if (slave.physicalAge >= 12) {
		option.addValue("Straight", "normal");
	} else if (slave.physicalAge >= 6) {
		option.addValue("Mixed adult & child", "mixed");
	} else {
		option.addValue("Baby", "baby");
	}
	if (cheat) {
		option.addValueList([
			["Pointy", "pointy"],
			["Fangs", "fangs"],
			["Fang", "fang"],
			["Fangs", "fangs"],
			["Cosmetic Braces", "cosmetic braces"],
			["Removable", "removable"]
		]);
	}

	options.addOption("Breasts", "boobs", slave).showTextBox({unit: "CCs"})
		.addRange(200, 200, "<=", "Flat (AA-cup)")
		.addRange(300, 300, "<=", "Small (A-cup)")
		.addRange(400, 400, "<=", "Medium (B-cup)")
		.addRange(500, 500, "<=", "Healthy (C-cup)")
		.addRange(800, 800, "<=", "Large (DD-cup)")
		.addRange(1200, 1200, "<=", "Very Large (G-cup)")
		.addRange(2050, 2050, "<=", "Huge (K-cup)")
		.addRange(3950, 3950, "<=", "Massive (Q-cup)")
		.addRange(6000, 6000, "<=", "Monstrous")
		.addRange(8000, 6000, ">", "Science Experiment");

	options.addOption("Genetic breast size", "boobs", slave.natural).showTextBox({unit: "CCs"})
		.addRange(200, 200, "<=", "Flat (AA-cup)")
		.addRange(300, 300, "<=", "Small (A-cup)")
		.addRange(400, 400, "<=", "Medium (B-cup)")
		.addRange(500, 500, "<=", "Healthy (C-cup)")
		.addRange(800, 800, "<=", "Large (DD-cup)")
		.addRange(1200, 1200, "<=", "Very Large (G-cup)")
		.addRange(2050, 2050, "<=", "Huge (K-cup)")
		.addRange(3950, 3950, "<=", "Massive (Q-cup)")
		.addRange(6000, 6000, "<=", "Monstrous")
		.addRange(8000, 6000, ">", "Science Experiment");

	options.addOption("Breast implant type", "boobsImplantType", slave)
		.addValueList([
			["None", "none", () => slave.boobsImplant = 0],
			["Normal", "normal", () => slave.boobsImplant = slave.boobsImplant || 200],
			["String", "string", () => slave.boobsImplant = slave.boobsImplant || 200],
			["Fillable", "fillable", () => slave.boobsImplant = slave.boobsImplant || 200],
			["Advanced Fillable", "advanced fillable", () => slave.boobsImplant = slave.boobsImplant || 200],
			["Hyper Fillable", "hyper fillable", () => slave.boobsImplant = slave.boobsImplant || 200],
		]);

	if (slave.boobsImplantType !== "none") {
		options.addOption("Breast implant volume", "boobsImplant", slave).showTextBox({unit: "CCs"})
			.addValue("None", 0)
			.addRange(200, 200, "<=", "Flat (AA-cup)")
			.addRange(300, 300, "<=", "Small (A-cup)")
			.addRange(400, 400, "<=", "Medium (B-cup)")
			.addRange(500, 500, "<=", "Healthy (C-cup)")
			.addRange(800, 800, "<=", "Large (DD-cup)")
			.addRange(1200, 1200, "<=", "Very Large (G-cup)")
			.addRange(2050, 2050, "<=", "Huge (K-cup)")
			.addRange(3950, 3950, "<=", "Massive (Q-cup)")
			.addRange(6000, 6000, "<=", "Monstrous")
			.addRange(8000, 6000, ">", "Science Experiment")
			.addGlobalCallback(() => slave.boobs = Math.max(slave.boobs, slave.boobsImplant))
			.addComment(`Value is added to breast volume to produce final breast size.`);
	}

	option = options.addOption("Natural shape", "boobShape", slave)
		.addValueList([
			["Normal", "normal"],
			["Perky", "perky"],
			["Saggy", "saggy"],
			["Torpedo-shaped", "torpedo-shaped"],
			["Downward-facing", "downward-facing"],
			["Wide-set", "wide-set"],
		]);
	if (slave.boobsImplant / slave.boobs >= 0.90) {
		option.addValue("Spherical", "spherical");
	}

	options.addOption("Lactation", "lactation", slave)
		.addValue("Artificial", 2, () => slave.lactationDuration = 2)
		.addValue("Natural", 1, () => slave.lactationDuration = 2)
		.addValue("None", 0);

	options.addOption("Lactation adaptation", "lactationAdaptation", slave).showTextBox();

	option = options.addOption("Nipples", "nipples", slave)
		.addValueList([
			["Huge", "huge"],
			["Puffy", "puffy"],
			["Inverted", "inverted"],
			["Partially Inverted", "partially inverted"],
			["Tiny", "tiny"],
			["Cute", "cute"],
			["Fuckable", "fuckable"],
		]);
	if (slave.boobsImplant / slave.boobs >= 0.90) {
		option.addValue("Flat", "Cute");
	}
	if (cheat) {
		option.addValue("Penetrable", "fuckable");
	}

	options.addOption("Areolae", "areolae", slave)
		.addValueList([["Normal", 0], ["Large", 1], ["Wide", 2], ["Huge", 3], ["Massive", 4]]);

	options.addOption("Shoulders", "shoulders", slave)
		.addValueList([["Very narrow", -2], ["Narrow", -1], ["Feminine", 0], ["Broad", 1], ["Very broad", 2]]);
	options.addOption("Shoulders implant", "shouldersImplant", slave)
		.addValueList([["Heavily narrowed", -2], ["Narrowed", -1], ["Unmodified", 0], ["Broadened", 1], ["Heavily broadened", 2]]);


	el.append(options.render());
	return el;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {boolean} cheat
 * @returns {DocumentFragment}
 */
App.StartingGirls.lower = function(slave, cheat = false) {
	const el = new DocumentFragment();
	const {he} = getPronouns(slave);
	const options = new App.UI.OptionsGroup();
	let option;

	if (cheat) {
		options.addOption("Belly implant", "bellyImplant", slave)
			.addValueList([
				["No Implant", -1],
				["Implanted but unfilled", 0],
				["Looks like early pregnancy", 1500],
				["Looks pregnant", 5000],
				["Looks hugely pregnant", 10000],
				["Looks full term", 15000],
				["Inhumanly pregnant", 150000],
				["Hyperpregnant", 300000],
			]).showTextBox();

		options.addOption("Belly fluid", "bellyFluid", slave).showTextBox({unit: "MLs"})
			.addValue("Empty", 0)
			.addRange(100, 100, "<=", "Bloated")
			.addRange(2000, 2000, "<=", "Clearly bloated")
			.addRange(5000, 5000, "<=", "Very full")
			.addRange(10000, 10000, "<=", "Full to bursting");

		options.addOption("Belly sag", "bellySag", slave).showTextBox();

		options.addOption("Ruptured Internals", "burst", slave)
			.addValue("Normal", 0).off()
			.addValue("Burst", 1).on();
	}

	option = options.addOption("Hips", "hips", slave)
		.addValueList([["Very narrow", -2], ["Narrow", -1], ["Normal", 0], ["Wide", 1], ["Very wide", 2]]);
	if (cheat) {
		option.addValue("Unnaturally broad", 3);
	}
	options.addOption("Hips implant", "hipsImplant", slave)
		.addValueList([["Heavily narrowed", -2], ["Narrowed", -1], ["Unmodified", 0], ["Widened", 1], ["Heavily widened", 2]]);

	option = options.addOption("Butt", "butt", slave)
		.addValueList([["Flat", 0], ["Small", 1], ["Plump", 2], ["Big", 3], ["Huge", 4], ["Enormous", 5], ["Gigantic", 6], ["Massive", 7]]);
	if (cheat) {
		option.showTextBox();
	}

	if (cheat) {
		options.addOption("Butt implant type", "buttImplantType", slave)
			.addValueList([
				["None", "none"],
				["Normal", "normal"],
				["String", "string"],
				["Fillable", "fillable"],
				["Advanced Fillable", "advanced fillable"],
				["Hyper Fillable", "hyper fillable"],
			]);

		options.addOption("Butt implant size", "buttImplant", slave).showTextBox()
			.addValue("None", 0)
			.addValue("Implant", 1)
			.addValue("Big implant", 2)
			.addValue("Fillable implant", 3)
			.addRange(8, 8, "<=", "Advanced fillable implants")
			.addRange(9, 9, ">=", "Hyper fillable implants");
	}

	const oldAnus = slave.anus;
	options.addOption("Anus", "anus", slave)
		.addValue("Virgin", 0, () => {
			slave.analArea = 1;
		})
		.addValue("Normal", 1, () => {
			slave.analArea = Math.clamp(slave.analArea + (1 - oldAnus), 1, 3);
		})
		.addValue("Veteran", 2, () => {
			slave.analArea = Math.clamp(slave.analArea + (2 - oldAnus), 2, 4);
		})
		.addValue("Gaping", 3, () => {
			slave.analArea = Math.clamp(slave.analArea + (3 - oldAnus), 3, 5);
		});

	if (slave.anus > 0) {
		let comment;
		if (slave.analArea <= slave.anus) {
			comment = "Recently stretched to current size.";
		} else if (slave.analArea - slave.anus === 1) {
			comment = "Used to current size.";
		} else {
			comment = "Very broad.";
		}
		options.addOption("External anus appearance", "analArea", slave)
			.addValueList([
				["Recently stretched", slave.anus],
				["Used to current size", slave.anus + 1],
				["Very broad", slave.anus + 2],
			]).addComment(comment);
	}

	options.addOption("Vagina", "vagina", slave)
		.addValue("No vagina", -1, () => {
			slave.preg = 0;
			WombFlush(slave);
			slave.belly = 0;
			slave.bellyPreg = 0;
			slave.pubertyXX = 0;
			slave.pubertyAgeXX = V.fertilityAge;
			slave.ovaries = 0;
		})
		.addValue("Virgin", 0, () => {
			slave.preg = -1;
			slave.belly = 0;
			slave.bellyPreg = 0;
			slave.ovaries = 1;
			slave.mpreg = 0;
		})
		.addValue("Normal", 1, () => {
			slave.preg = -1;
			slave.belly = 0;
			slave.bellyPreg = 0;
			slave.ovaries = 1;
			slave.mpreg = 0;
		})
		.addValue("Veteran", 2, () => {
			slave.preg = -1;
			slave.belly = 0;
			slave.bellyPreg = 0;
			slave.ovaries = 1;
			slave.mpreg = 0;
		})
		.addValue("Gaping", 3, () => {
			slave.preg = -1;
			slave.belly = 0;
			slave.bellyPreg = 0;
			slave.ovaries = 1;
			slave.mpreg = 0;
		});

	if (slave.vagina > -1) {
		if (slave.dick === 0) {
			option = options.addOption("Clit", "clit", slave)
				.addValueList([["Normal", 0], ["Large", 1], ["Huge", 2]]);
			if (cheat) {
				option.addValueList([["Enormous", 3], ["Gigantic", 4], ["That's no dick!", 5]]).showTextBox();
			}
		}

		options.addOption("Labia", "labia", slave)
			.addValueList([["Normal", 0], ["Large", 1], ["Huge", 2], ["Huge Dangling", 3]]);

		options.addOption("Vaginal wetness", "vaginaLube", slave)
			.addValueList([["Dry", 0], ["Normal", 1], ["Excessive", 2]]);

		if (cheat) {
			options.addOption("Ovaries", "ovaries", slave)
				.addValue("Yes", 1).on()
				.addValue("No", 0).off();
		}
	}

	if (cheat && slave.vagina < 0) {
		options.addOption("Anal pregnancy", "mpreg", slave)
			.addValue("Installed", 1).on()
			.addValue("No", 0).off();
	}

	if (V.seePreg !== 0 && (slave.mpreg !== 0 || slave.vagina > -1)) {
		/* This is only shown if slave has vagina */
		options.addOption("Puberty", "pubertyXX", slave)
			.addValue("Prepubescent", 0, () => {
				slave.pubertyAgeXX = V.fertilityAge;
				slave.belly = 0;
				slave.bellyPreg = 0;
				WombFlush(slave);
			}).addValue("Postpubescent", 1);

		options.addOption("Age of Female puberty", "pubertyAgeXX", slave).showTextBox();

		if (slave.pubertyXX === 1) {
			option = options.addOption("Pregnancy", "preg", slave);
			if (V.seeHyperPreg === 1 && cheat) {
				option.addValue("Bursting at the seams", 43, () => {
					slave.pregType = 150;
					slave.pregWeek = 43;
					slave.pregKnown = 1;
					slave.belly = 2700000;
					slave.bellyPreg = 2700000;
					slave.pubertyXX = 1;
				});
				if (slave.preg === 43) {
					option.addComment("Extreme hyper pregnancy!");
				}
			}
			option.addValue("Completely Filled", 42, () => {
				slave.pregType = 8;
				slave.pregWeek = 42;
				slave.pregKnown = 1;
				slave.belly = 120000;
				slave.bellyPreg = 120000;
				slave.pubertyXX = 1;
			}).addValue("Ready to drop", 40, () => {
				slave.pregType = 1;
				slave.pregWeek = 40;
				slave.pregKnown = 1;
				slave.belly = 15000;
				slave.bellyPreg = 15000;
				slave.pubertyXX = 1;
			}).addValue("Advanced", 34, () => {
				slave.pregType = 1;
				slave.pregWeek = 34;
				slave.pregKnown = 1;
				slave.belly = 10000;
				slave.bellyPreg = 10000;
				slave.pubertyXX = 1;
			}).addValue("Showing", 27, () => {
				slave.pregType = 1;
				slave.pregWeek = 27;
				slave.pregKnown = 1;
				slave.belly = 5000;
				slave.bellyPreg = 5000;
				slave.pubertyXX = 1;
			}).addValue("Early", 12, () => {
				slave.pregType = 1;
				slave.pregWeek = 12;
				slave.pregKnown = 1;
				slave.belly = 100;
				slave.bellyPreg = 100;
				slave.pubertyXX = 1;
			}).addValue("None", 0, () => {
				slave.pregType = 0;
				slave.belly = 0;
				slave.bellyPreg = 0;
				slave.pregSource = 0;
				slave.pregWeek = 0;
				slave.pregKnown = 0;
				WombFlush(slave);
			}).addValue("Contraceptives", -1, () => {
				slave.pregType = 0;
				slave.belly = 0;
				slave.bellyPreg = 0;
				slave.pregSource = 0;
				slave.pregWeek = 0;
				slave.pregKnown = 0;
				WombFlush(slave);
			}).addValue("Barren", -2, () => {
				slave.pregType = 0;
				slave.belly = 0;
				slave.bellyPreg = 0;
				slave.pregSource = 0;
				slave.pregWeek = 0;
				slave.pregKnown = 0;
				WombFlush(slave);
			});
			if (cheat) {
				option.addValue("Sterilized", -3, () => {
					slave.pregType = 0;
					slave.belly = 0;
					slave.bellyPreg = 0;
					slave.pregSource = 0;
					slave.pregWeek = 0;
					slave.pregKnown = 0;
					WombFlush(slave);
				});
			}

			options.addOption("Births", "birthsTotal", slave.counter).showTextBox().addComment(`How many times ${he} has already given birth, not necessarily while owned by you.`);
			if (cheat) {
				options.addOption("Number of babies", "pregType", slave).showTextBox();
				options.addOption("Pregnancy adaptation", "pregAdaptation", slave).showTextBox();
			}
		}

		if (cheat && slave.ovaries) {
			options.addOption("Ova implant", "ovaImplant", slave)
				.addValueList([
					["None", 0],
					["Fertility", "fertility"],
					["Sympathy", "sympathy"],
					["Asexual", "asexual"],
				]);
		}

		option = options.addOption("Father of child", "pregSource", slave);
		if (V.PC.dick > 0 && slave.preg > 0) {
			option.addValueList([["Your child", -1], ["Not yours", 0]]);
		}
		if (cheat) {
			option.showTextBox().addComment("Use slave's ID");
		}
	}

	if (V.seeDicks !== 0 || V.makeDicks === 1) {
		option = options.addOption("Penis", "dick", slave)
			.addValue("None", 0, () => {
				slave.balls = 0;
				slave.pubertyXY = 0;
				slave.pubertyAgeXY = V.potencyAge;
				slave.skill.penetrative = 0;
			})
			.addValue("Tiny", 1, () => slave.clit = 0)
			.addValue("Small", 2, () => slave.clit = 0)
			.addValue("Normal", 3, () => slave.clit = 0)
			.addValue("Large", 4, () => slave.clit = 0)
			.addValue("Massive", 5, () => slave.clit = 0);
		if (cheat) {
			option
				.addValue("Huge", 6, () => slave.clit = 0)
				.addValue("More Huge", 7, () => slave.clit = 0)
				.addValue("Enormous", 8, () => slave.clit = 0)
				.addValue("Monstrous", 9, () => slave.clit = 0)
				.addValue("Big McLargeHuge", 10, () => slave.clit = 0)
				.pulldown().showTextBox();
		}

		if (slave.dick > 0) {
			option = options.addOption("Foreskin", "foreskin", slave);
			if (V.seeCircumcision === 1) {
				option.addValue("Circumcised", 0);
			} else if (slave.foreskin === 0) {
				slave.foreskin = 3;
			}
			option.addValueList([["Tiny", 1], ["Small", 2], ["Normal", 3], ["Large", 4], ["Massive", 5]]);
			if (cheat) {
				option.showTextBox();
			}
		}

		option = options.addOption("Testicles", "balls", slave)
			.addValue("None", 0, () => {
				slave.pubertyXY = 0;
				slave.pubertyAgeXY = V.potencyAge;
				slave.scrotum = 0;
			}).addValueList([["Vestigial", 1], ["Small", 2], ["Normal", 3], ["Large", 4], ["Massive", 5]]);
		if (cheat) {
			option.addValueList([
				["Huge", 6],
				["More Huge", 7],
				["Enormous", 8],
				["Monstrous", 9],
				["Big McLargeHuge", 10],
			]).pulldown().showTextBox();
		}

		options.addOption("Age of Male Puberty", "pubertyAgeXY", slave).showTextBox();

		if (slave.balls > 0) {
			option = options.addOption("Ballsack", "scrotum", slave)
				.addValueList([["None", 0], ["Tiny", 1], ["Small", 2], ["Normal", 3], ["Large", 4], ["Massive", 5]]);
			if (cheat) {
				option.addValueList([
					["Huge", 6],
					["More Huge", 7],
					["Enormous", 8],
					["Monstrous", 9],
					["Big McLargeHuge", 10],
				]).pulldown().showTextBox();
			}

			options.addOption("Male Puberty", "pubertyXY", slave)
				.addValue("Prepubescent", 0, () => slave.pubertyAgeXY = V.potencyAge)
				.addValue("Postpubescent", 1);
			options.addOption("Chemical castration", "ballType", slave)
				.addValue("Yes", "sterile").on()
				.addValue("No", "human").off();
			options.addOption("Vasectomy", "vasectomy", slave)
				.addValue("Yes", 1).on()
				.addValue("No", 0).off();
		}
	}

	option = options.addOption("Prostate", "prostate", slave)
		.addValueList([
			["No prostate", 0],
			["Has a prostate", 1]
		]);
	if (cheat) {
		option.addValueList([
			["Hyperactive prostate", 2],
			["Hyperactive modified prostate", 3],
		]).pulldown();
	}

	el.append(options.render());
	return el;
};

/* non-persistent global data */
App.StartingGirls.careerFilter = "Any";

/** @type {Map<string, function(string): boolean>} */
App.StartingGirls.careerBonusFilters = (function() {
	/**
	 * @param {object} obj
	 * @param {string} key
	 * @returns {[string, function(string): boolean]}
	 */
	const categoryToFilterElement = (obj, key) => {
		return [capFirstChar(key), c => obj[key].includes(c)];
	};

	const nonBonusCategories = ["veryYoung", "young", "educated", "uneducated"];
	const generalBonusCats = Object.keys(App.Data.Careers.General).filter(c => !nonBonusCategories.includes(c));
	const leadershipBonusCats = Object.keys(App.Data.Careers.Leader);
	const bonusCategories = new Map([
		["Any", () => true],
		...generalBonusCats.map(key => categoryToFilterElement(App.Data.Careers.General, key)),
		...leadershipBonusCats.map(key => categoryToFilterElement(App.Data.Careers.Leader, key)),
	]);

	return bonusCategories;
})();

App.StartingGirls.makeCareerFilterPulldown = function() {
	const frag = new DocumentFragment();
	frag.append(`Filter by desired bonus: `);

	const options = [];
	for (const cat of App.StartingGirls.careerBonusFilters.keys()) {
		options.push({key: cat, name: cat});
	}
	frag.append(App.UI.DOM.makeSelect(options, App.StartingGirls.careerFilter, cat => {
		App.StartingGirls.careerFilter = cat;
		App.UI.reload();
	}));

	return frag;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {boolean} cheat
 * @returns {DocumentFragment}
 */
App.StartingGirls.profile = function(slave, cheat = false) {
	const el = new DocumentFragment();
	let options = new App.UI.OptionsGroup();
	let option;
	const {His, him} = getPronouns(slave);

	options.addOption("Birth name", "birthName", slave).showTextBox();
	options.addOption("Slave name", "slaveName", slave).showTextBox();
	options.addOption("Birth surname", "birthSurname", slave).showTextBox();
	options.addOption("Slave surname", "slaveSurname", slave).showTextBox();

	option = options.addOption("Career", "career", slave).showTextBox();
	/** @type {Array<string>} */
	let careers;
	let text;
	if (slave.actualAge < 16) {
		text = "very young";
		careers = App.Data.Careers.General.veryYoung;
	} else {
		if (V.AgePenalty === 1) {
			if (slave.actualAge <= 24) {
				text = "young";
				careers = App.Data.Careers.General.young;
			} else if (slave.intelligenceImplant >= 15) {
				text = "educated";
				careers = App.Data.Careers.General.educated;
			} else {
				text = "uneducated";
				careers = App.Data.Careers.General.uneducated;
			}
		} else {
			if (slave.intelligenceImplant >= 15) {
				text = "educated";
				careers = App.Data.Careers.General.educated;
			} else if (slave.actualAge <= 24) {
				text = "young";
				careers = App.Data.Careers.General.young;
			} else {
				text = "uneducated";
				careers = App.Data.Careers.General.uneducated;
			}
		}
	}

	careers = careers.filter(App.StartingGirls.careerBonusFilters.get(App.StartingGirls.careerFilter));

	const niceCareers = new Map();
	for (const career of careers) {
		const nice = capFirstChar(App.Utils.removeArticles(career));
		niceCareers.set(nice, career);
	}
	for (const career of [...niceCareers.keys()].sort()) {
		option.addValue(career, niceCareers.get(career));
	}

	const optionComment = ` Available careers are based on age and education. Currently most influential is ${him} being ${text}.`;
	option.addComment(App.UI.DOM.combineNodes(App.StartingGirls.makeCareerFilterPulldown(), optionComment)).pulldown();

	const indenture = {active: slave.indenture > -1};

	options.addOption("Legal status", "active", indenture)
		.addValue("Slave", false, () => {
			slave.indenture = -1;
			slave.indentureRestrictions = 0;
		})
		.addValue("Indentured Servant", true, () => {
			slave.indenture = 52;
		});

	if (slave.indenture > -1) {
		options.addOption("Remaining weeks", "indenture", slave).showTextBox();

		options.addOption("Indenture restrictions", "indentureRestrictions", slave)
			.addValueList([["None", 0], ["Protective", 1], ["Restrictive", 2]]);
	}

	options.addOption("Age", "actualAge", slave).showTextBox()
		.customButton("Resync characteristics to age", () => resyncSlaveToAge(slave), "")
		.customButton("Resync only height to age", () => resyncSlaveHeight(slave), "")
		.addComment("It is recommended to resync if you change age significantly");
	if (cheat) {
		options.addOption("Physical age", "physicalAge", slave).showTextBox();
		options.addOption("Visual age", "visualAge", slave).showTextBox();
		options.addOption("Ovary age", "ovaryAge", slave).showTextBox();
		options.addOption("Age implant", "ageImplant", slave)
			.addValue("Installed", 1).on()
			.addValue("Not installed", 0).off();
	}

	options.addOption("Weeks since birthday", "birthWeek", slave).showTextBox();

	options.addOption("Genes", "genes", slave)
		// App.Data.StartingGirlsNonNumericPresets is not actually serving a function here per se.
		// It's only used here so that App.Data.StartingGirlsNonNumericPresets.genes doesn't later
		// accidentally get out of sync with the options enumerated here.
		.addValue(App.Data.StartingGirlsNonNumericPresets.genes[0].name, App.Data.StartingGirlsNonNumericPresets.genes[0].value, () => {
			// These are not part of cleanup() because these *can* be manually changed under the Lower tab.
			slave.dick = 0;
			slave.balls = 0;
			slave.scrotum = 0;
			slave.prostate = 0;
			slave.clit = 0;
			slave.pubertyXY = 0;
			slave.pubertyAgeXY = V.potencyAge;
			slave.pubertyXX = (slave.pubertyAgeXX < slave.physicalAge ? 1 : 0);
			slave.vagina = Math.max(0, slave.vagina);
			slave.boobs = Math.max(500, slave.boobs);
			slave.shoulders = either(-2, -1, 0);
			slave.hips = either(-2, -1, 0);
		}).addValue(App.Data.StartingGirlsNonNumericPresets.genes[1].name, App.Data.StartingGirlsNonNumericPresets.genes[1].value, () => {
			slave.dick = 3;
			slave.vagina = -1;
			WombFlush(slave);
			slave.belly = 0;
			slave.bellyPreg = 0;
			slave.pubertyXY = (slave.pubertyAgeXY < slave.physicalAge ? 1 : 0);
			slave.pubertyXX = 0;
			slave.pubertyAgeXX = V.fertilityAge;
			slave.ovaries = 0;
			slave.boobs = 100;
			slave.balls = 3;
			slave.scrotum = 3;
			slave.prostate = 1;
			slave.shoulders = either(0, 1, 2);
			slave.hips = either(0, 1, 2);
		});

	option = options.addOption("Prestige", "prestige", slave);
	App.StartingGirls.addSet(option, App.Data.StartingGirls.prestige, false);
	if (slave.prestige > 0 && !cheat) {
		const r = [];
		r.push("Starting slaves incur an extreme cost penalty for prestige. This slave's");
		if (slave.actualAge >= 25) {
			if (slave.actualAge > 35) {
				r.push("advanced");
			}
			r.push("age decreases the penalty.");
		} else {
			r.push("young age requires paying the full penalty.");
		}
		option.addComment(`<span class="warning">${r.join(" ")}</span>`);
	}

	options.addOption(`${His} nationality is`, "nationality", slave).showTextBox()
		.addValueList(App.Data.misc.baseNationalities)
		.pulldown();

	if (V.seeRace === 1) {
		if (cheat) {
			options.addOption(`${His} original ethnicity was`, "origRace", slave)
				.showTextBox().pulldown()
				.addValueList(Array.from(App.Data.misc.filterRaces, (k => [k[1], k[0]])));
			options.addOption(`${His} current ethnicity is`, "race", slave)
				.showTextBox().pulldown()
				.addComment("If different from original ethnicity, slave will be described as surgically altered.")
				.addValueList(Array.from(App.Data.misc.filterRaces, (k => [k[1], k[0]])));
		} else {
			options.addOption(`${His} ethnicity is`, "origRace", slave)
				.showTextBox().pulldown()
				.addValueList(Array.from(App.Data.misc.filterRaces, (k => [k[1], k[0]])))
				.addGlobalCallback(() => slave.race = slave.origRace);
		}
	}

	el.append(options.render());
	App.UI.DOM.appendNewElement("h3", el, "Optional customizations");
	options = new App.UI.OptionsGroup();

	if (slave.origin !== "$auto") {
		option = options.addOption("Origin story", "origin", slave);
		if (!cheat) {
			option.customButton("Use automatic origin story", () => slave.origin = "$auto", "");
		}
		option.showTextBox({large: true, forceString: true})
			.addComment("Use complete, capitalized and punctuated sentences.");
		// Technically, slave.weekAcquired can have gameplay effects in some cases,
		// but technically, slave.origin can also have gameplay effects in some cases.
		// Both of them *usually* won't.
		options.addOption("Owned since week", "weekAcquired", slave).showTextBox();
	} else {
		const origin = this.playerOrigin(slave).preview;
		options.addOption("Origin story", "origin", slave)
			.customButton("Customize", () => this.playerOrigin(slave).apply(), "")
			.addComment(origin === "" ? "No origin available" : pronounsForSlaveProp(slave, origin));
	}

	if (slave.prestige) {
		options.addOption("Prestige description", "prestigeDesc", slave)
			.showTextBox({large: true, forceString: true})
			.addComment("Use complete, capitalized and punctuated sentences.");
	}
	options.addOption("Description", "desc", slave.custom).showTextBox({large: true})
		.addComment("Use complete, capitalized and punctuated sentences.");
	options.addOption("Label", "label", slave.custom).showTextBox().addComment("Use a short phrase");
	if (V.imageChoice === 4 || V.imageChoice === 6) {
		options.addOption("Art Seed", "artSeed", slave.natural).showTextBox({large: true})
			.customButton("Randomize", () => slave.natural.artSeed = random(0, 10 ** 14), "")
			.addComment(`The WebGL and AI Art renderers use the art seed to set minor face and body parameters. You can change it if you don't like this slave's appearance.`);
	}

	el.append(options.render());
	return el;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {boolean} cheat
 * @returns {DocumentFragment}
 */
App.StartingGirls.mental = function(slave, cheat = false) {
	const el = new DocumentFragment();
	const options = new App.UI.OptionsGroup();
	let option;
	let r;

	option = options.addOption("Intelligence", "intelligence", slave);
	App.StartingGirls.addSet(option, App.Data.StartingGirls.intelligence, cheat);

	options.addOption("Education", "intelligenceImplant", slave)
		.addValueList([["Uneducated", 0], ["Educated", 15], ["Well educated", 30]]);

	option = options.addOption("Devotion", "devotion", slave);
	App.StartingGirls.addSet(option, App.Data.StartingGirls.devotion, true);
	if (slave.devotion > 20 && !cheat) {
		r = [];
		r.push("Starting slaves incur");
		if (slave.devotion > 50) {
			r.push("severe cost penalty at very high");
		} else {
			r.push("an additional cost penalty at high");
		}
		r.push("levels of devotion. This slave's");
		if (slave.actualAge >= 25) {
			if (slave.actualAge > 35) {
				r.push("advanced");
			}
			r.push("age decreases the penalty.");
		} else {
			r.push("young age requires paying the full penalty.");
		}
		option.addComment(`<span class="warning">${r.join(" ")}</span>`);
	}

	option = options.addOption("Trust", "trust", slave);
	App.StartingGirls.addSet(option, App.Data.StartingGirls.trust, true);

	const rollRandomFetish = () => either("boobs", "buttslut", "cumslut", "dom", "humiliation", "masochist", "pregnancy", "sadist", "submissive", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none");

	options.addOption("Fetish", "fetishKnown", slave)
		.addValue("Unknown", 0, () => {
			if (!cheat) {
				slave.fetish = rollRandomFetish();
			}
		})
		.addValue("Known", 1);
	if (slave.fetishKnown === 1 || cheat) {
		option = options.addOption("Fetish", "fetish", slave)
			.addValueList([["None", "none"], ["Sub", "submissive"], ["Dom", "dom"], ["Cumslut", "cumslut"], ["Humiliation", "humiliation"],
				["Buttslut", "buttslut"], ["Breasts", "boobs"], ["Pregnancy", "pregnancy"], ["Sadism", "sadist"], ["Masochism", "masochist"]]);
		if (V.seeExtreme === 1) {
			option.addValue("Mindbroken", "mindbroken", () => {
				slave.fetishStrength = 10;
				slave.sexualFlaw = "none";
				slave.sexualQuirk = "none";
				slave.behavioralFlaw = "none";
				slave.behavioralQuirk = "none";
			});
		}
		if (slave.fetish !== Fetish.NONE && slave.fetish !== Fetish.MINDBROKEN) {
			option = options.addOption("Fetish strength", "fetishStrength", slave);
			App.StartingGirls.addSet(option, App.Data.StartingGirls.fetishStrength, cheat);
		}
	}

	options.addOption("Sexuality", "attrKnown", slave)
		.addValue("Unknown", 0).off()
		.addValue("Known", 1, () => {
			if (!cheat) {
				slave.attrXX = App.Data.StartingGirls.attr.random().value;
				slave.attrXY = App.Data.StartingGirls.attr.random().value;
				slave.energy = App.Data.StartingGirls.energy.random().value;
			}
		}).on();
	if (slave.attrKnown === 1 || cheat) {
		option = options.addOption("Attraction to men", "attrXY", slave);
		App.StartingGirls.addSet(option, App.Data.StartingGirls.attr, cheat);
		option = options.addOption("Attraction to women", "attrXX", slave);
		App.StartingGirls.addSet(option, App.Data.StartingGirls.attr, cheat);
		option = options.addOption("Sex drive", "energy", slave);
		App.StartingGirls.addSet(option, App.Data.StartingGirls.energy, cheat);
	}

	if (slave.fetish !== Fetish.MINDBROKEN) {
		options.addOption("Behavioral Flaw", "behavioralFlaw", slave)
			.addValueList([["None", "none"], ["Arrogant", "arrogant"], ["Bitchy", "bitchy"], ["Odd", "odd"], ["Hates Men", "hates men"],
				["Hates Women", "hates women"], ["Anorexic", "anorexic"], ["Gluttonous", "gluttonous"], ["Devout", "devout"],
				["Liberated", "liberated"]]);

		options.addOption("Behavioral Quirk", "behavioralQuirk", slave)
			.addValueList([["None", "none"], ["Confident", "confident"], ["Cutting", "cutting"], ["Funny", "funny"],
				["Adores Men", "adores men"], ["Adores Women", "adores women"], ["Insecure", "insecure"], ["Fitness", "fitness"],
				["Sinful", "sinful"], ["Advocate", "advocate"]]);

		options.addOption("Sexual Flaw", "sexualFlaw", slave)
			.addValueList([["None", "none"], ["Hates Oral", "hates oral"], ["Hates Anal", "hates anal"],
				["Hates Penetration", "hates penetration"], ["Repressed", "repressed"], ["Shamefast", "shamefast"], ["Apathetic", "apathetic"],
				["Crude", "crude"], ["Judgemental", "judgemental"], ["Sexually idealistic", "idealistic"]]);

		options.addOption("Sexual Quirk", "sexualQuirk", slave)
			.addValueList([["None", "none"], ["Oral", "gagfuck queen"], ["Anal", "painal queen"], ["Penetration", "strugglefuck queen"],
				["Perverted", "perverted"], ["Tease", "tease"], ["Caring", "caring"], ["Unflinching", "unflinching"], ["Size queen", "size queen"],
				["Romantic", "romantic"]]);
	}

	el.append(options.render());

	return el;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {boolean} cheat
 * @returns {HTMLDivElement}
 */
App.StartingGirls.skills = function(slave, cheat = false) {
	const options = new App.UI.OptionsGroup();

	let option = options.addOption("Oral sex", "oral", slave.skill);
	App.StartingGirls.addSet(option, App.Data.StartingGirls.skill, cheat);

	option = options.addOption("Anal sex", "anal", slave.skill);
	if (slave.anus === 0 && !cheat) {
		option.addComment("Anal virgins cannot be given anal skills.");
	} else {
		App.StartingGirls.addSet(option, App.Data.StartingGirls.skill, cheat);
	}

	option = options.addOption("Vaginal sex", "vaginal", slave.skill);
	if (slave.vagina === 0 && !cheat) {
		option.addComment("Virgins cannot be given vaginal skills.");
	} else if (slave.vagina === -1) {
		option.addComment("Must have a vagina to have vaginal skills.");
	} else {
		App.StartingGirls.addSet(option, App.Data.StartingGirls.skill, cheat);
	}

	option = options.addOption("Penetrative sex", "penetrative", slave.skill);
	App.StartingGirls.addSet(option, App.Data.StartingGirls.skill, cheat);
	if (penetrativeSocialUse() < 20) {
		options.addComment("Penetrative skills are usually not considered valuable.");
	}

	option = options.addOption("Prostitution", "whoring", slave.skill);
	App.StartingGirls.addSet(option, App.Data.StartingGirls.skill, cheat);

	option = options.addOption("Entertainment", "entertainment", slave.skill);
	App.StartingGirls.addSet(option, App.Data.StartingGirls.skill, cheat);

	option = options.addOption("Combat", "combat", slave.skill);
	App.StartingGirls.addSet(option, App.Data.StartingGirls.skill, cheat);

	// skill warning
	const totalSkill = slave.skill.whoring + slave.skill.entertainment + slave.skill.vaginal +
		slave.skill.penetrative + slave.skill.anal + slave.skill.oral + slave.skill.combat;

	if (totalSkill > 200 && !cheat) {
		let comment = ["Starting slaves incur"];
		if (totalSkill > 400) {
			comment.push("a severe cost penalty for being highly");
		} else {
			comment.push("an additional cost penalty for being");
		}
		comment.push("skilled. This slave's");
		if (slave.actualAge >= 25) {
			if (slave.actualAge > 35) {
				comment.push("advanced");
			}
			comment.push("age decreases the penalty.");
		} else {
			comment.push("young age requires paying the full penalty.");
		}
		options.addComment(`<span class="warning">${comment.join(" ")}</span>`);
	}

	return options.render();
};

/**
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.StartingGirls.finalize = function(slave) {
	const el = new DocumentFragment();
	const cost = startingSlaveCost(slave);

	let r = [];
	r.push(`If applied, your <span class="skill player">career bonus</span> will give this slave`);
	if (isPCCareerInCategory("capitalist")) {
		r.push(`one free level of <span class="cyan">prostitution skill.</span>`);
	} else if (V.PC.career === "mercenary" || V.PC.career === "recruit" || V.PC.career === "child soldier") {
		if (slave.devotion > 20) {
			r.push(`<span class="mediumaquamarine">+10 trust.</span>`);
		} else {
			r.push(`<span class="gold">+10 fear.</span>`);
		}
	} else if (isPCCareerInCategory("slaver")) {
		r.push(`<span class="hotpink">+10 devotion.</span>`);
	} else if (isPCCareerInCategory("medicine")) {
		r.push(`free <span class="lime">basic implants.</span>`);
	} else if (isPCCareerInCategory("celebrity")) {
		r.push(`one free level of <span class="cyan">entertainment skill.</span>`);
	} else if (isPCCareerInCategory("escort")) {
		r.push(`two free levels of <span class="cyan">sex skills,</span> one free level of <span class="cyan">prostitution skill,</span> and one free level of <span class="cyan">entertainment skill.</span>`);
	} else if (isPCCareerInCategory("servant")) {
		r.push(`<span class="mediumaquamarine">+10 trust</span> and <span class="hotpink">+10 devotion.</span>`);
	} else if (isPCCareerInCategory("gang")) {
		r.push(`<span class="green">+5 health</span> and one free level of <span class="cyan">combat skill.</span>`);
	} else if (isPCCareerInCategory("wealth")) {
		r.push(`two free levels of <span class="cyan">sex skills.</span>`);
	} else if (isPCCareerInCategory("BlackHat")) {
		r.push(`one free level of <span class="cyan">intelligence.</span>`);
	} else if (isPCCareerInCategory("engineer")) {
		r.push(`<span class="hotpink">+10 devotion,</span> one free level of <span class="cyan">prostitution skill</span> and <span class="cyan">entertainment skill,</span> and two free levels of <span class="cyan">sex skills.</span>`);
	}
	App.Events.addNode(el, r, "div");

	const options = new App.UI.OptionsGroup();
	options.addOption("Apply Career bonus:", "applyCareerBonus", V)
		.addValue("Enable", 1).on()
		.addValue("Disable", 0).off();
	el.appendChild(options.render());

	if (V.cash >= cost) {
		const addGirl = () => {
			cashX(forceNeg(cost), "slaveTransfer", slave);
			if (V.applyCareerBonus) {
				if (_.isArray(V.careerBonusNeeded)) {
					V.careerBonusNeeded.push(slave.ID);
				} else {
					V.careerBonusNeeded = [slave.ID];
				}
			}
			App.StartingGirls.cleanup(slave);
			SlaveDatatypeCleanup(slave);
			if (slave.pregSource === -1) {
				V.PC.counter.slavesKnockedUp++;
			}
			// Make newSlave keep certain changes
			slave.override_H_Color = 1;
			slave.override_Arm_H_Color = 1;
			slave.override_Brow_H_Color = 1;
			slave.override_Skin = 1;

			newSlave(clone(slave));
		};

		if (V.cash - cost >= minimumSlaveCost() / (isPCCareerInCategory("slaver") ? 2 : 1)) {
			// Starting slaves cost half if isPCCareerInCategory("slaver") as detailed in startingGirlsPassage.js.
			// The special division in this if-check can be removed if a later reorg of slaveCostJS.js causes the slaver career bonus
			// to be reflected in minimumSlaveCost() as the gang career bonus is, but that would likely be annoying to
			// do, and wouldn't affect anything except this.
			// (Of course, the player can always click "Take control of your arcology" if they cannot afford V.activeSlave,
			// so it's not super-important to keep this conditional updated to prevent the link appearing if the player
			// cannot actually afford another slave.)
			const {him} = getPronouns(slave);
			App.UI.DOM.appendNewElement("div", el,
				App.UI.DOM.link(
					`Add this slave, and use ${him} as a template for the next slave`,
					() => {
						addGirl();
						slave.ID = generateSlaveID();
						nationalityToName(slave);
						App.StartingGirls.randomizeUnknowns(slave);
						slave.mother = 0;
						slave.father = 0;
						WombFlush(slave);
					},
					[],
					"Starting Girls"
				)
			);
			App.UI.DOM.appendNewElement("div", el,
				App.UI.DOM.link(
					`Add this slave, and randomize the next slave`,
					() => {
						addGirl();
						V.activeSlave = this.generate();
					},
					[],
					"Starting Girls"
				)
			);
		}
		App.UI.DOM.appendNewElement("div", el,
			App.UI.DOM.link(
				`Add this slave, and take control of the arcology`,
				() => {
					addGirl();
				},
				[],
				"Acquisition"
			)
		);
	} else {
		App.UI.DOM.appendNewElement("p", el, `Cannot afford the cost of ${cashFormat(cost)}`, "red");
	}
	return el;
};

App.StartingGirls.stats = function(slave) {
	const el = new DocumentFragment();
	const options = new App.UI.OptionsGroup();
	const counters = Object.keys(new App.Entity.SlaveActionsCountersState()).sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}));
	const titles = new Map([
		["birthsTotal", "Total births"],
		["laborCount", "Labor count"],
		["publicUse", "Public use"],
		["pitKills", "Pit kills"],
		["pitWins", "Pit wins"],
		["pitLosses", "Pit losses"],
		["slavesFathered", "Slaves fathered"],
		["PCChildrenFathered", "PC's children fathered"],
		["slavesKnockedUp", "Slaves knocked up"],
		["PCKnockedUp", "Times knocked up PC"],
		["bestiality", "Bestiality"],
		["timesBred", "Times Bred"],
		["PCChildrenBeared", "PC's children carried"]
	]);
	options.addOption("Set all counters to 0", "counter", slave).customButton("Reset", () => slave.counter = new App.Entity.SlaveActionsCountersState(), "");
	for (const key of counters) {
		const title = titles.get(key) || capFirstChar(key);
		options.addOption(title, key, slave.counter)
			.addValue("None", 0).off().showTextBox();
	}
	el.append(options.render());
	return el;
};

/** @param {App.Entity.SlaveState} slave */
App.StartingGirls.genes = function(slave) {
	/** @param {keyof FC.GeneticQuirks} quirk */
	function permitQuirk(quirk) {
		const whitelist = ["heterochromia"];  // normally restricted, but allowed for starting girls
		const blacklist = ["hyperFertility", "superfetation", "gigantomastia", "progeria", "neoteny"]; // normally permitted, but not for starting girls
		const quirkObj = App.Data.geneticQuirks.get(quirk);
		return whitelist.includes(quirk) || (!quirkObj.restricted && !blacklist.includes(quirk));
	}

	const el = new DocumentFragment();
	el.append(App.UI.SlaveInteract.geneticQuirks(slave, true, permitQuirk));
	return el;
};
