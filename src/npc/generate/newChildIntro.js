/**
 * @param {App.Entity.SlaveState} slave
 */
App.UI.newChildIntro = function(slave) {
	const {
		His, He, his, him, he, girl, hers, himself, daughter
	} = getPronouns(slave);

	const el = new DocumentFragment();
	let r;
	let momInterest;
	let dadInterest;

	const tempMom = getSlave(slave.mother);
	const tempDad = getSlave(slave.father);

	r = [];

	let tempParents = "";

	r.push(`You completed the legalities before heading to ${V.incubator.name}, knowing the tank will release ${him} on your`);

	if (tempDad) {
		if (tempDad.ID !== V.PC.ID) {
			tempParents = "father";
		}
	}
	if (tempMom) {
		if (tempMom.ID !== V.PC.ID) {
			tempParents = "mother";
		}
		if (tempDad) {
			if (tempMom.ID !== V.PC.ID && tempDad.ID !== V.PC.ID && tempMom.ID !== tempDad.ID) {
				tempParents = "parents";
			} else if (tempMom.ID === tempDad.ID && tempMom.ID !== V.PC.ID) {
				tempParents = "sole parent";
			}
		}
	}

	if (tempParents !== "") {
		r.push(`approach, and instruct ${V.assistant.name} to notify the new ${girl}'s ${tempParents} to meet you in your office.`);
	} else {
		r.push(`approach.`);
	}

	r.push(`As the tank exhumes the disoriented ${girl},`);

	if (slave.preg > 0) {
		/* Unused for now. Fetal development would be accelerated as well. As a result, the released slave would be shocking to see in such a state. */
		if (slave.geneticQuirks.progeria) {
			// unused for now
		} else if (slave.geneticQuirks.neoteny && slave.actualAge > 12 && V.geneticMappingUpgrade < 2) {
			// unused for now
		}
	} else if (slave.geneticQuirks.progeria && V.geneticMappingUpgrade < 2) {
		r.push(`you barely manage to pull yourself together to catch ${him} in time. There must have been some mistake with the settings; ${he} should not be <i>this</i> old. You help ${him} to ${his} unstable feet and slowly walk ${him} to your penthouse.`);
	} else if (slave.geneticQuirks.neoteny && slave.actualAge > 12 && V.geneticMappingUpgrade === 0) {
		r.push(`you have to make sure the right ${girl} was released. ${He} was supposed to be ${slave.actualAge}, not this child sitting before you. You double check the machine's logs to be certain and it turns out ${he} really is ${slave.actualAge}, just abnormally young looking for ${his} age.`);
	} else {
		r.push(`you help ${him} to ${his} feet${slave.incubatorSettings.reproduction > 1 ? `, making sure to feel up ${his} overdeveloped body,` : ``} and walk ${him} to your penthouse.`);
	}
	r.push(`Though first you must decide upon a name for the new ${girl}; it won't take long to reach your office, so you have only <span class="orange">one chance to name ${him}</span> before you arrive.`);
	App.Events.addParagraph(el, r);

	const naming = document.createElement("div");
	App.UI.DOM.appendNewElement("div", naming, `Choose a given name for ${him}.`);
	App.UI.DOM.appendNewElement(
		"div",
		naming,
		App.UI.DOM.makeTextBox(
			slave.slaveName,
			(v) => {
				slave.birthName = v;
				slave.slaveName = v;
				jQuery(naming).empty().append(`You instruct ${V.assistant.name} to register the new ${girl} as "${slave.slaveName}" in the slave registry.`);
				jQuery(newName).empty().append(SlaveFullName(slave));
			}
		)
	);

	App.UI.DOM.appendNewElement(
		"div",
		naming,
		App.UI.DOM.link(
			`Have your PA assign ${him} a random name`,
			() => {
				slave.birthName = generateName(slave.nationality, slave.race, slave.genes === "XY");
				if (slave.genes === "XY" && !V.allowMaleSlaveNames && isMaleName(slave.birthName, slave.nationality, slave.race)) {
					/* grab a female name for the slave name instead */
					slave.slaveName = generateName(slave.nationality, slave.race, false);
				} else {
					slave.slaveName = slave.birthName;
				}
				jQuery(naming).empty().append(`${V.assistant.name} registers the new ${girl} as "${slave.slaveName}" in your registry.`);
				jQuery(newName).empty().append(SlaveFullName(slave));
			}
		)
	);

	if (FutureSocieties.isActive('FSPastoralist')) {
		App.UI.DOM.appendNewElement(
			"div",
			naming,
			App.UI.DOM.link(
				`Have your PA assign ${him} a random cow name`,
				() => {
					slave.slaveName = App.Data.misc.cowSlaveNames.random();
					slave.birthName = slave.slaveName;
					jQuery(naming).empty().append(`${V.assistant.name} registers the new ${girl} as "${slave.slaveName}" in your registry.`);
					jQuery(newName).empty().append(SlaveFullName(slave));
				}
			)
		);
	}
	if (FutureSocieties.isActive('FSIntellectualDependency')) {
		App.UI.DOM.appendNewElement(
			"div",
			naming,
			App.UI.DOM.link(
				`Have your PA assign ${him} a random stripper name`,
				() => {
					slave.slaveName = App.Data.misc.bimboSlaveNames.random();
					slave.birthName = slave.slaveName;
					jQuery(naming).empty().append(`${V.assistant.name} registers the new ${girl} as "${slave.slaveName}" in your registry.`);
					jQuery(newName).empty().append(SlaveFullName(slave));
				}
			)
		);
	}
	if (slave.race === "catgirl") {
		App.UI.DOM.appendNewElement(
			"div",
			naming,
			App.UI.DOM.link(
				`Have your PA assign ${him} a random cat name`,
				() => {
					slave.slaveName = App.Data.misc.catSlaveNames.random();
					slave.birthName = slave.slaveName;
					jQuery(naming).empty().append(`${V.assistant.name} registers the new ${girl} as "${slave.slaveName}" in your registry.`);
					jQuery(newName).empty().append(SlaveFullName(slave));
				}
			)
		);
	}
	if (FutureSocieties.isActive('FSChattelReligionist')) {
		App.UI.DOM.appendNewElement(
			"div",
			naming,
			App.UI.DOM.link(
				`Have your PA assign ${him} a random devotional name`,
				() => {
					slave.slaveName = App.Data.misc.chattelReligionistSlaveNames.random();
					slave.birthName = slave.slaveName;
					jQuery(naming).empty().append(`${V.assistant.name} registers the new ${girl} as "${slave.slaveName}" in your registry.`);
					jQuery(newName).empty().append(SlaveFullName(slave));
				}
			)
		);
	}
	if (FutureSocieties.isActive('FSRomanRevivalist')) {
		App.UI.DOM.appendNewElement(
			"div",
			naming,
			App.UI.DOM.link(
				`Have your PA assign ${him} a random Roman name`,
				() => {
					slave.slaveName = App.Data.misc.romanSlaveNames.random();
					slave.birthName = slave.slaveName;
					jQuery(naming).empty().append(`${V.assistant.name} registers the new ${girl} as "${slave.slaveName}" in your registry.`);
					jQuery(newName).empty().append(SlaveFullName(slave));
				}
			)
		);
	} else if (FutureSocieties.isActive('FSAztecRevivalist')) {
		App.UI.DOM.appendNewElement(
			"div",
			naming,
			App.UI.DOM.link(
				`Have your PA assign ${him} a random Aztec name`,
				() => {
					slave.slaveName = App.Data.misc.aztecSlaveNames.random();
					slave.birthName = slave.slaveName;
					jQuery(naming).empty().append(`${V.assistant.name} registers the new ${girl} as "${slave.slaveName}" in your registry.`);
					jQuery(newName).empty().append(SlaveFullName(slave));
				}
			)
		);
	} else if (FutureSocieties.isActive('FSEgyptianRevivalist')) {
		App.UI.DOM.appendNewElement(
			"div",
			naming,
			App.UI.DOM.link(
				`Have your PA assign ${him} a random Egyptian name`,
				() => {
					slave.slaveName = App.Data.misc.ancientEgyptianSlaveNames.random();
					slave.birthName = slave.slaveName;
					jQuery(naming).empty().append(`${V.assistant.name} registers the new ${girl} as "${slave.slaveName}" in your registry.`);
					jQuery(newName).empty().append(SlaveFullName(slave));
				}
			)
		);
	} else if (FutureSocieties.isActive('FSEdoRevivalist')) {
		App.UI.DOM.appendNewElement(
			"div",
			naming,
			App.UI.DOM.link(
				`Have your PA assign ${him} a random feudal Japanese name`,
				() => {
					slave.slaveName = App.Data.misc.edoSlaveNames.random();
					slave.birthName = slave.slaveName;
					jQuery(naming).empty().append(`${V.assistant.name} registers the new ${girl} as "${slave.slaveName}" in your registry.`);
					jQuery(newName).empty().append(SlaveFullName(slave));
				}
			)
		);
	} else if (FutureSocieties.isActive('FSChineseRevivalist')) {
		App.UI.DOM.appendNewElement(
			"div",
			naming,
			App.UI.DOM.link(
				`Have your PA assign ${him} a random Chinese name`,
				() => {
					slave.slaveName = App.Data.misc.chineseSlaveNames.random();
					slave.birthName = slave.slaveName;
					jQuery(naming).empty().append(`${V.assistant.name} registers the new ${girl} as "${slave.slaveName}" in your registry.`);
					jQuery(newName).empty().append(SlaveFullName(slave));
				}
			)
		);
	}

	if (FutureSocieties.isActive('FSDegradationist')) {
		App.UI.DOM.appendNewElement(
			"div",
			naming,
			App.UI.DOM.link(
				`Have your PA assign ${him} a degrading name`,
				() => {
					DegradingName(slave);
					slave.birthName = slave.slaveName;
					jQuery(naming).empty().append(`${V.assistant.name} registers the new ${girl} as "${slave.slaveName}" in your registry.`);
					jQuery(newName).empty().append(SlaveFullName(slave));
				}
			)
		);
	}

	// Parent naming
	if (tempMom) {
		naming.append(parentNaming(tempMom));
	}
	if (tempDad && slave.father !== slave.mother) {
		naming.append(parentNaming(tempDad));
	}
	el.append(naming);

	const surnaming = document.createElement("div");
	App.UI.DOM.appendNewElement("div", surnaming, `Change ${his} surname, if desired.`);
	App.UI.DOM.appendNewElement(
		"div",
		surnaming,
		App.UI.DOM.makeTextBox(
			slave.slaveSurname,
			(v) => {
				slave.birthSurname = v;
				slave.slaveSurname = v;
				jQuery(surnaming).empty().append(`You instruct ${V.assistant.name} to register the new ${girl}'s surname as "${slave.slaveSurname}" in the slave registry.`);
				jQuery(newName).empty().append(SlaveFullName(slave));
			}
		)
	);

	App.UI.DOM.appendNewElement(
		"div",
		surnaming,
		App.UI.DOM.link(
			`Remove ${his} surname`,
			() => {
				slave.birthSurname = 0;
				slave.slaveSurname = 0;
				jQuery(surnaming).empty().append(`You instruct ${V.assistant.name} to remove the new ${girl}'s surname from your registry.`);
				jQuery(newName).empty().append(SlaveFullName(slave));
			}
		)
	);
	if (getRelative(slave.mother) || getRelative(slave.father)) {
		App.UI.DOM.appendNewElement(
			"div",
			surnaming,
			App.UI.DOM.link(
				`Generate a standard surname based on your current Universal Rules`,
				() => {
					regenerateSurname(slave);
					slave.birthSurname = slave.slaveSurname;
					jQuery(surnaming).empty().append(`${V.assistant.name} registers the new ${girl}'s surname as "${slave.slaveSurname}" in your registry according to the Universal Rules.`);
					jQuery(newName).empty().append(SlaveFullName(slave));
				}
			)
		);
	}
	if (V.surnameArcology) {
		App.UI.DOM.appendNewElement(
			"div",
			surnaming,
			App.UI.DOM.link(
				`Give ${him} the arcology surname, "${V.surnameArcology}"`,
				() => {
					slave.slaveSurname = V.surnameArcology;
					slave.birthSurname = V.surnameArcology;
					jQuery(surnaming).empty().append(`You instruct ${V.assistant.name} to assign ${him} the arcology surname, ${V.surnameArcology}, as if ${he} were an orphan.`);
					jQuery(newName).empty().append(SlaveFullName(slave));
				}
			)
		);
	}
	if (V.PC.slaveSurname && (slave.mother === -1 || slave.father === -1)) {
		App.UI.DOM.appendNewElement(
			"div",
			surnaming,
			App.UI.DOM.link(
				`Give ${him} your surname, "${V.PC.slaveSurname}"`,
				() => {
					slave.slaveSurname = V.PC.slaveSurname;
					slave.birthSurname = V.PC.slaveSurname;
					jQuery(surnaming).empty().append(`You instruct ${V.assistant.name} to assign your child your own surname, ${V.PC.slaveSurname}.`);
					jQuery(newName).empty().append(SlaveFullName(slave));
				}
			)
		);
	}
	if (tempMom && tempMom.slaveSurname) {
		App.UI.DOM.appendNewElement(
			"div",
			surnaming,
			App.UI.DOM.link(
				`Give ${him} ${his} mother's surname, "${tempMom.slaveSurname}"`,
				() => {
					slave.slaveSurname = tempMom.slaveSurname;
					slave.birthSurname = tempMom.slaveSurname;
					jQuery(surnaming).empty().append(`You instruct ${V.assistant.name} to assign the child ${his} mother's surname, ${tempMom.slaveSurname}.`);
					jQuery(newName).empty().append(SlaveFullName(slave));
				}
			)
		);
	}
	if (tempDad && tempDad.slaveSurname) {
		App.UI.DOM.appendNewElement(
			"div",
			surnaming,
			App.UI.DOM.link(
				`Give ${him} ${his} father's surname, "${tempDad.slaveSurname}"`,
				() => {
					slave.slaveSurname = tempDad.slaveSurname;
					slave.birthSurname = tempDad.slaveSurname;
					jQuery(surnaming).empty().append(`You instruct ${V.assistant.name} to assign the child ${his} father's surname, ${tempDad.slaveSurname}.`);
					jQuery(newName).empty().append(SlaveFullName(slave));
				}
			)
		);
	}
	if (FutureSocieties.isActive('FSRomanRevivalist')) {
		App.UI.DOM.appendNewElement(
			"div",
			surnaming,
			App.UI.DOM.link(
				`Give ${him} a random Roman slave surname`,
				() => {
					slave.slaveSurname = App.Data.misc.romanSlaveSurnames.random();
					slave.birthSurname = slave.slaveSurname;
					jQuery(surnaming).empty().append(`${V.assistant.name} registers the new ${girl}'s surname as "${slave.slaveSurname}" in your registry.`);
					jQuery(newName).empty().append(SlaveFullName(slave));
				}
			)
		);
	} else if (FutureSocieties.isActive('FSEdoRevivalist')) {
		App.UI.DOM.appendNewElement(
			"div",
			surnaming,
			App.UI.DOM.link(
				`Give ${him} a random feudal Japanese surname`,
				() => {
					slave.slaveSurname = App.Data.misc.edoSlaveSurnames.random();
					slave.birthSurname = slave.slaveSurname;
					jQuery(surnaming).empty().append(`${V.assistant.name} registers the new ${girl}'s surname as "${slave.slaveSurname}" in your registry.`);
					jQuery(newName).empty().append(SlaveFullName(slave));
				}
			)
		);
	} else if (FutureSocieties.isActive('FSChineseRevivalist')) {
		App.UI.DOM.appendNewElement(
			"div",
			surnaming,
			App.UI.DOM.link(
				`Give ${him} a random Ancient Chinese surname`,
				() => {
					slave.slaveSurname = App.Data.misc.chineseRevivalistSlaveSurnames.random();
					slave.birthSurname = slave.slaveSurname;
					jQuery(surnaming).empty().append(`${V.assistant.name} registers the new ${girl}'s surname as "${slave.slaveSurname}" in your registry.`);
					jQuery(newName).empty().append(SlaveFullName(slave));
				}
			)
		);
	} else if (FutureSocieties.isActive('FSAntebellumRevivalist')) {
		App.UI.DOM.appendNewElement(
			"div",
			surnaming,
			App.UI.DOM.link(
				`Give ${him} a random old Southern-style surname`,
				() => {
					slave.slaveSurname = App.Data.misc.antebellumSlaveSurnames.random();
					slave.birthSurname = slave.slaveSurname;
					jQuery(surnaming).empty().append(`${V.assistant.name} registers the new ${girl}'s surname as "${slave.slaveSurname}" in your registry.`);
					jQuery(newName).empty().append(SlaveFullName(slave));
				}
			)
		);
	}
	el.append(surnaming);

	const newName = App.UI.DOM.makeElement("span", SlaveFullName(slave), 'slave-name');
	newName.id = "newName";

	r = [];
	r.push(newName);
	r.push(`now stands before your desk`);
	if (tempMom && tempDad && slave.father !== slave.mother) {
		r.push(`alongside ${his} mother ${tempMom.slaveName} and father ${tempDad.slaveName}.`);
	} else if (tempMom) {
		r.push(`alongside ${his} mother ${tempMom.slaveName}.`);
	} else if (tempDad) {
		r.push(`alongside ${his} father ${tempDad.slaveName}.`);
	} else {
		r.push(`alone, having no family${(slave.mother === -1 || slave.father === -1) ? `, other than you,` : ``} in your stock.`);
	}
	if (V.arcologies[0].FSRestartDecoration === 100 && tempMom) {
		if (tempMom.breedingMark === 1 && V.propOutcome === 1) {
			r.push(`The Societal Elite are waiting to inspect the child of their eugenics programs.`);
			if (V.arcologies[0].FSSupremacist > 20 && slave.race !== V.arcologies[0].FSSupremacistRace) {
				if (V.eugenicsFullControl !== 1) {
					r.push(`They take one look at the ${slave.race}`);
					if (slave.race === "mixed race") {
						r.push(`mutt`);
					} else {
						r.push(`dog`);
					}
					r.push(`you've sired for them and <span class="red">leave in a huff.</span>`);
					V.failedElite += 5;
				} else {
					r.push(`They quickly realize how unsuitable ${he} is for breeding and leave, apologizing sycophantically for wasting your time.`);
				}
			} else if (V.arcologies[0].FSSubjugationist > 20 && slave.race === V.arcologies[0].FSSubjugationistRace) {
				if (V.eugenicsFullControl !== 1) {
					r.push(`They take one look at the disgusting ${slave.race} bitch you've fathered and <span class="red">leave furious.</span>`);
					V.failedElite += 50;
				} else {
					r.push(`They quickly realize how unsuitable ${he} is for breeding and leave, apologizing sycophantically for wasting your time.`);
				}
			} else {
				r.push(`Approving of your attractive offspring, they take this opportunity to <span class="lime">brand the protesting ${girl} with the breeding mark</span> signifying ${him} as worthy of reproducing, before taking their leave.`);
				slave.breedingMark = 1;
			}
		}
	}

	if (tempMom) {
		const {
			he2, his2, He2, himself2
		} = getPronouns(tempMom).appendSuffix("2");
		r.push(`${He} glances at ${his} mother`);
		if (tempMom.relationship === -3) {
			if (tempMom.fetish === Fetish.MINDBROKEN) {
				r.push(`and <span class="devotion dec">notices how dull</span> the look on ${his2} face is. ${tempMom.slaveName} is standing there blankly. ${He2} doesn't even recognize ${his2} ${daughter}, <span class="trust dec">frightening</span> the poor ${girl}.`);
				slave.trust -= 25;
				slave.devotion -= 10;
			} else if (tempMom.devotion + tempMom.trust >= 175) {
				r.push(`and <span class="devotion inc">notices how happy</span> the look on ${his2} face is. ${tempMom.slaveName} is positively beaming with pride at`);
				if (slave.father === -1) {
					r.push(`the result of your union.`);
				} else {
					r.push(`${his2} addition to your harem.`);
				}
				slave.trust += 35;
				slave.devotion += 35;
			} else if (tempMom.devotion < -20 && tempMom.trust > 20) {
				r.push(`and <span class="trust dec">notices the look of hatred</span> on ${his2} face. ${tempMom.slaveName} scowls at ${his2} unwelcome spawn, <span class="devotion inc">frightening the poor ${girl} into your arms.</span>`);
				slave.trust -= 50;
				slave.devotion += 50;
			} else if (tempMom.devotion < -20) {
				r.push(`and notices the <span class="devotion dec">look of defeat</span> on ${his2} face. ${tempMom.slaveName} immediately tears up when ${he2}`);
				if (canSee(tempMom)) {
					r.push(`sees`);
				} else {
					r.push(`faces`);
				}
				if (slave.father === -1) {
					r.push(`the result of your union.`);
				} else {
					r.push(`${his2} addition to your harem.`);
				}
				slave.trust -= 30;
				slave.devotion -= 30;
			} else {
				r.push(`and <span class="devotion inc">notices how obedient</span> the look on ${his2} face is. ${tempMom.slaveName} is eagerly awaiting your reaction to`);
				if (slave.father === -1) {
					r.push(`the result of your union.`);
				} else {
					r.push(`${his2} addition to your harem.`);
				}
				slave.trust += 25;
				slave.devotion += 25;
			}
		} else if (tempMom.ID === V.ConcubineID) {
			r.push(`and notices <span class="devotion inc">how happy</span> the look on ${his2} face is. ${S.Concubine.slaveName} is positively beaming with pride at ${his2} addition to your harem.`);
			slave.trust += 30;
			slave.devotion += 30;
		} else if (tempMom.ID === V.BodyguardID) {
			r.push(`and <span class="trust inc">notices how ${he2} focuses more on you than ${himself2}.</span> ${S.Bodyguard.slaveName}'s dedication to your life has <span class="devotion inc">certainly influenced ${him}.</span>`);
			slave.trust += 40;
			slave.devotion += 20;
		} else if (tempMom.ID === V.HeadGirlID) {
			r.push(`and notices how much ${his2} look takes after your own. ${S.HeadGirl.slaveName}'s dedication to you has <span class="devotion inc">certainly influenced ${him}.</span>`);
			slave.trust += 20;
			slave.devotion += 20;
		} else if (tempMom.devotion < -50) {
			r.push(`and <span class="devotion dec">notices the look of hatred</span> on ${his2} face; a <span class="trust dec">look of terror</span> across ${his} own when ${his} eyes return to you.`);
			slave.trust -= 50;
			slave.devotion -= 50;
		} else if (tempMom.devotion < -20) {
			r.push(`and notices the <span class="devotion dec">look of defeat</span> on ${his2} face; ${he} starts to <span class="trust dec">feel uncertain</span> about ${his} future.`);
			slave.trust -= 20;
			slave.devotion -= 20;
		} else if (tempMom.trust <= 50) {
			r.push(`and notices the <span class="trust dec">look of fear</span> on ${his2} face; when ${he} next glances at you, it is also <span class="trust dec">filled with fear.</span>`);
			slave.trust -= 40;
			slave.devotion -= 30;
		} else if (tempMom.devotion <= 50) {
			r.push(`and <span class="devotion inc">notices the look of indifference</span> on ${his2} face; ${his} detached mother pushes ${him} to <span class="trust inc">trust you more.</span>`);
			slave.trust += 10;
			slave.devotion += 10;
		} else {
			r.push(`and <span class="devotion inc">notices the look of dedication</span> on ${his2} face; ${his} devoted mother pushes ${him} to <span class="trust inc">trust you more.</span>`);
			slave.trust += 20;
			slave.devotion += 20;
		}
		if (tempMom.boobs > 10000) {
			r.push(`${His} eyes focus on ${tempMom.slaveName}'s ${tempMom.boobs}cc tits, taking in every`);
			if (V.showInches === 2) {
				r.push(`inch`);
			} else {
				r.push(`centimeter`);
			}
			r.push(`of their enormity, but lingering on ${his2} ${tempMom.nipples},`);
			if (tempMom.lactation === 2) {
				r.push(`milk-gushing`);
			} else if (tempMom.lactation === 1) {
				r.push(`milk-leaking`);
			}
			r.push(`nipples.`);
			momInterest = "boobs";
		} else if (tempMom.bellyPreg >= 450000) {
			r.push(`${His} eyes focus on ${tempMom.slaveName}'s massively distended, child-filled belly, taking in every obvious motion beneath ${his2} taut skin.`);
			if (slave.readyOva >= 20) {
				r.push(`A hand runs across ${his} own bloated middle and another down to ${his} moist pussy.`);
			}
			momInterest = "belly";
		} else if (tempMom.belly >= 5000) {
			r.push(`${His} eyes focus on ${tempMom.slaveName}'s rounded middle, staring in fascination at the unfamiliar bulge.`);
			if (slave.readyOva >= 20) {
				r.push(`A hand runs across ${his} own middle and another down to ${his} moist pussy.`);
			}
			momInterest = "belly";
		} else if (tempMom.dick > 15) {
			r.push(`${His} eyes focus on ${tempMom.slaveName}'s ${dickToEitherUnit(tempMom.dick).replace("es", "")} long dick, trying to understand how it can fit in a girl.`);
			momInterest = "dick";
		} else if (tempMom.balls > 60) {
			r.push(`${His} eyes focus on ${tempMom.slaveName}'s ${ballsToEitherUnit(tempMom.balls).replace("es", "")} long testicles, taking in every`);
			if (V.showInches === 2) {
				r.push(`inch`);
			} else {
				r.push(`centimeter`);
			}
			r.push(`of their enormity, before shifting to the cum steadily drooling from`);
			if (tempMom.dick > 0) {
				r.push(`the tip of ${his2} dick.`);
			} else {
				r.push(`the hole in ${his2} crotch.`);
			}
			momInterest = "balls";
		} else if (tempMom.hips > 2) {
			r.push(`${His} eyes focus on ${tempMom.slaveName}'s abnormally wide hips. ${He} runs ${his} hands down ${his} own sides, pondering how such a wonder occurs.`);
			momInterest = "hips";
		} else if (tempMom.butt > 12) {
			r.push(`${His} eyes focus on ${tempMom.slaveName}'s massive ass, staring in fascination at every jiggle that runs through it.`);
			momInterest = "butt";
		} else if (tempMom.dick > 0 && tempMom.vagina > -1) {
			r.push(`${His} eyes focus on ${tempMom.slaveName}'s crotch, staring in wonder and confusion at the presence of both a penis and a vagina.`);
		} else if (tempMom.dick === 0 && tempMom.vagina === -1 && tempMom.scrotum === 0) {
			r.push(`${His} eyes focus on ${tempMom.slaveName}'s crotch, staring in wonder and confusion at the lack of any sexual organs.`);
		} else if (isAmputee(tempMom)) {
			r.push(`${His} eyes dart from limb to missing limb on ${tempMom.slaveName}'s body, trying desperately to understand what happened to them.`);
		} else if (hasAnyProstheticLimbs(tempMom)) {
			r.push(`${His} eyes dart from limb to prosthetic limb on ${tempMom.slaveName}'s body, trying desperately to understand what these wonderful things are and how ${he} could get ${his} own.`);
		}
	}

	if (tempDad && slave.father !== slave.mother) {
		const {
			he2, his2, He2, himself2
		} = getPronouns(tempDad).appendSuffix("2");
		r.push(`${He} glances at ${his} father`);
		if (tempDad.relationship === -3) {
			if (tempDad.fetish === Fetish.MINDBROKEN) {
				r.push(`and <span class="devotion dec">notices how dull</span> the look on ${his2} face is. ${tempDad.slaveName} is standing there blankly. ${He2} doesn't even recognize ${his2} ${daughter}, <span class="trust dec">frightening</span> the poor ${girl}.`);
				slave.trust -= 25;
				slave.devotion -= 10;
			} else if (tempDad.devotion + tempDad.trust >= 175) {
				r.push(`and <span class="devotion inc">notices how happy</span> the look on ${his2} face is. ${tempDad.slaveName} is positively beaming with pride at`);
				if (slave.mother === -1) {
					r.push(`the result of your union.`);
				} else {
					r.push(`${his2} addition to your harem.`);
				}
				slave.trust += 35;
				slave.devotion += 35;
			} else if (tempDad.devotion < -20 && tempDad.trust > 20) {
				r.push(`and <span class="trust dec">notices the look of hatred</span> on ${his2} face. ${tempDad.slaveName} scowls at ${his2} unwelcome spawn, <span class="devotion inc">frightening the poor ${girl} into your arms.</span>`);
				slave.trust -= 50;
				slave.devotion += 50;
			} else if (tempDad.devotion < -20) {
				r.push(`and notices the <span class="devotion dec">look of defeat</span> on ${his2} face. ${tempDad.slaveName} immediately tears up when ${he2}`);
				if (canSee(tempDad)) {
					r.push(`sees`);
				} else {
					r.push(`faces`);
				}
				if (slave.mother === -1) {
					r.push(`the result of your union.`);
				} else {
					r.push(`${his2} addition to your harem.`);
				}
				slave.trust -= 30;
				slave.devotion -= 30;
			} else {
				r.push(`and <span class="devotion inc">notices how obedient</span> the look on ${his2} face is. ${tempDad.slaveName} is eagerly awaiting your reaction to`);
				if (slave.mother === -1) {
					r.push(`the result of your union.`);
				} else {
					r.push(`${his2} addition to your harem.`);
				}
				slave.trust += 25;
				slave.devotion += 25;
			}
		} else if (tempDad.ID === V.ConcubineID) {
			r.push(`and notices <span class="devotion inc">how happy</span> the look on ${his2} face is. ${S.Concubine.slaveName} is positively beaming with pride at ${his2} addition to your harem.`);
			slave.trust += 30;
			slave.devotion += 30;
		} else if (tempDad.ID === V.BodyguardID) {
			r.push(`and <span class="trust inc">notices how ${he2} focuses more on you than ${himself2}.</span> ${S.Bodyguard.slaveName}'s dedication to your life has <span class="devotion inc">certainly influenced ${him}.</span>`);
			slave.trust += 40;
			slave.devotion += 20;
		} else if (tempDad.ID === V.HeadGirlID) {
			r.push(`and notices how much ${his2} look takes after your own. ${S.HeadGirl.slaveName}'s dedication to you has <span class="devotion inc">certainly influenced ${him}.</span>`);
			slave.trust += 20;
			slave.devotion += 20;
		} else if (tempDad.devotion < -50) {
			r.push(`and <span class="devotion dec">notices the look of hatred</span> on ${his2} face; a <span class="trust dec">look of terror</span> across ${his} own when ${his} eyes return to you.`);
			slave.trust -= 50;
			slave.devotion -= 50;
		} else if (tempDad.devotion < -20) {
			r.push(`and notices the <span class="devotion dec">look of defeat</span> on ${his2} face; ${he} starts to <span class="trust dec">feel uncertain</span> about ${his} future.`);
			slave.trust -= 20;
			slave.devotion -= 20;
		} else if (tempDad.trust <= 50) {
			r.push(`and notices the <span class="trust dec">look of fear</span> on ${his2} face; when ${he} next glances at you, it is also <span class="trust dec">filled with fear.</span>`);
			slave.trust -= 40;
			slave.devotion -= 30;
		} else if (tempDad.devotion <= 50) {
			r.push(`and <span class="devotion inc">notices the look of indifference</span> on ${his2} face; ${his} detached father pushes ${him} to <span class="trust inc">trust you more.</span>`);
			slave.trust += 10;
			slave.devotion += 10;
		} else {
			r.push(`and <span class="devotion inc">notices the look of dedication</span> on ${his2} face; ${his} devoted father pushes ${him} to <span class="trust inc">trust you more.</span>`);
			slave.trust += 20;
			slave.devotion += 20;
		}
		if (tempDad.boobs > 10000) {
			r.push(`${His} eyes focus on ${tempDad.slaveName}'s ${tempDad.boobs} cc tits, taking in every`);
			if (V.showInches === 2) {
				r.push(`inch`);
			} else {
				r.push(`centimeter`);
			}
			r.push(`of their enormity, but lingering on ${his2} ${tempDad.nipples},`);
			if (tempDad.lactation === 2) {
				r.push(`milk-gushing`);
			} else if (tempDad.lactation === 1) {
				r.push(`milk-leaking`);
			}
			r.push(`nipples.`);
			dadInterest = "boobs";
		} else if (tempDad.bellyPreg >= 450000) {
			r.push(`${His} eyes focus on ${tempDad.slaveName}'s massively distended, child-filled belly, taking in every obvious motion beneath ${his2} taut skin.`);
			if (slave.readyOva >= 20) {
				r.push(`A hand runs across ${his} own bloated middle and another down to ${his} moist pussy.`);
			}
			dadInterest = "belly";
		} else if (tempDad.belly >= 5000) {
			r.push(`${His} eyes focus on ${tempDad.slaveName}'s rounded middle, staring in fascination at the unfamiliar bulge.`);
			if (slave.readyOva >= 20) {
				r.push(`A hand runs across ${his} own middle and another down to ${his} moist pussy.`);
			}
			dadInterest = "belly";
		} else if (tempDad.dick > 15) {
			r.push(`${His} eyes focus on ${tempDad.slaveName}'s ${dickToEitherUnit(tempDad.dick).replace("es", "")} long dick, trying to understand how it can fit in anybody.`);
			dadInterest = "dick";
		} else if (tempDad.balls > 60) {
			r.push(`${His} eyes focus on ${tempDad.slaveName}'s ${ballsToEitherUnit(tempDad.balls).replace("es", "")} long testicles, taking in every`);
			if (V.showInches === 2) {
				r.push(`inch`);
			} else {
				r.push(`centimeter`);
			}
			r.push(`of their enormity, before shifting to the cum steadily drooling from`);
			if (tempDad.dick > 0) {
				r.push(`the tip of ${his2} dick.`);
			} else {
				r.push(`the hole in ${his2} crotch.`);
			}
			dadInterest = "balls";
		} else if (tempDad.hips > 2) {
			r.push(`${His} eyes focus on ${tempDad.slaveName}'s abnormally wide hips. ${He} runs ${his} hands down ${his} own sides, pondering how such a wonder occurs.`);
			dadInterest = "hips";
		} else if (tempDad.butt > 12) {
			r.push(`${His} eyes focus on ${tempDad.slaveName}'s massive ass, staring in fascination at every jiggle that runs through it.`);
			dadInterest = "butt";
		} else if (tempDad.dick > 0 && tempDad.vagina > -1) {
			r.push(`${His} eyes focus on ${tempDad.slaveName}'s crotch, staring in wonder and confusion at the presence of both a penis and a vagina.`);
		} else if (tempDad.dick === 0 && tempDad.vagina === -1 && tempDad.scrotum === 0) {
			r.push(`${His} eyes focus on ${tempDad.slaveName}'s crotch, staring in wonder and confusion at the lack of any sexual organs.`);
		} else if (isAmputee(tempDad)) {
			r.push(`${His} eyes dart from limb to missing limb on ${tempDad.slaveName}'s body, trying desperately to understand what happened to them.`);
		} else if (hasAnyProstheticLimbs(tempDad)) {
			r.push(`${His} eyes dart from limb to prosthetic limb on ${tempDad.slaveName}'s body, trying desperately to understand what these wonderful things are and how ${he} could get ${his} own.`);
		}
	}

	App.Events.addParagraph(el, r);

	r = [];

	if (tempMom && tempDad && slave.father !== slave.mother) {
		r.push(`You dismiss ${tempMom.slaveName} and ${tempDad.slaveName} so that you may conduct a more intimate inspection of their ${daughter}.`);
	} else if (tempMom) {
		const {his2} = getPronouns(tempMom).appendSuffix("2");
		r.push(`You dismiss ${tempMom.slaveName} so that you may conduct a more intimate inspection of ${his2} ${daughter}.`);
	} else if (tempDad) {
		const {his2} = getPronouns(tempDad).appendSuffix("2");
		r.push(`You dismiss ${tempDad.slaveName} so that you may conduct a more intimate inspection of ${his2} ${daughter}.`);
	}
	r.push(`You slowly strip down, gauging ${his} reactions to your show, until you are fully nude before ${him}.`);

	if (slave.vagina > -1) {
		if ((V.PC.dick !== 0) && (V.PC.boobs >= 300)) {
			r.push(`${He} notices ${he} has the same parts as you, and <span class="trust inc">connects a little more</span> with a fellow girl.`);
			slave.trust += 4;
		} else if (V.PC.dick !== 0) {
			r.push(`${He} notices your privates differ from ${hers}, and thanks to the tank's teachings, <span class="devotion inc">can't look away.</span>`);
			slave.devotion += 4;
			if (slave.incubatorSettings.reproduction > 0) {
				r.push(`${He} seems a little alarmed at ${his} nipples and clit stiffening to the`);
				if (canSee(slave)) {
					r.push(`sight`);
				} else {
					r.push(`presence`);
				}
				r.push(`of your dick.`);
			}
		}
	} else if (slave.dick > 0) {
		if ((V.PC.dick !== 0) && (V.PC.boobs < 300)) {
			r.push(`${He} notices ${he} has the same parts as you, and <span class="trust inc">connects a little more</span> with a fellow boy.`);
			slave.trust += 4;
		} else if (V.PC.vagina !== -1) {
			r.push(`${He} notices your privates differ from ${hers}, and thanks to the tank's teachings, <span class="devotion inc">can't look away.</span>`);
			slave.devotion += 4;
			if (slave.incubatorSettings.reproduction > 0) {
				r.push(`${He} seems a little alarmed at ${his} dick`);
				if (canAchieveErection(slave)) {
					r.push(`rapidly stiffening`);
				} else {
					r.push(`engorging`);
				}
				r.push(`to the`);
				if (canSee(slave)) {
					r.push(`sight`);
				} else {
					r.push(`presence`);
				}
				r.push(`of your pussy.`);
			}
		}
	}

	if (slave.incubatorSettings.reproduction > 0) {
		if (((slave.attrXX > 50) || (slave.behavioralQuirk === "adores women")) && (slave.behavioralFlaw !== "hates women") && (slave.trust >= -20)) {
			if (V.PC.boobs >= 900) {
				r.push(`${He} seems to think you're pretty, and is more willing to <span class="devotion inc">try for your approval</span> than ${he} would otherwise be. ${He} openly ogles your rack at every opportunity.`);
				slave.devotion += 4;
			}
		}
		if ((slave.behavioralFlaw === "hates women") && (slave.devotion <= 50)) {
			if ((V.PC.dick === 0) && (V.PC.boobs >= 500)) {
				r.push(`${He} obviously does not find you immediately attractive, and is <span class="devotion dec">less eager to conciliate you</span> than ${he} would otherwise be.`);
				slave.devotion -= 5;
			}
		}
		if (((slave.attrXY > 50) || (slave.behavioralQuirk === "adores men")) && (slave.behavioralFlaw !== "hates men") && (slave.trust >= -20)) {
			if ((V.PC.dick !== 0) && (V.PC.boobs < 300)) {
				r.push(`${He} seems to think you're handsome, and is more willing to <span class="devotion inc">try for your approval</span> than ${he} would otherwise be. ${He} ogles your crotch at every opportunity.`);
				slave.devotion += 4;
			}
		}
	}

	if (V.PC.pregKnown === 1) {
		if (V.PC.career === "escort") {
			if (V.PC.preg >= 16) {
				r.push(`${He} is fascinated by your pregnancy, to the point that ${he} attempts a gesture to let you know ${he} wants to feel it. Just this once, you permit ${him} to touch your belly${(slave.pubertyXX === 1) ? `, since it is likely ${he} ${himself} will be swollen with child before long` : ``}. ${He} eagerly rubs it all over before pushing ${his} ear to it, provoking a kick and a gasp in response. ${He} instinctively <span class="devotion inc">connects to you</span> and <span class="trust inc">trusts you</span> like a mother.`);
				slave.trust += 2;
				slave.devotion += 2;
			}
		} else {
			if (V.PC.preg >= 16 && V.PC.belly >= 1500) {
				r.push(`${He} is fascinated by your pregnancy, to the point that ${he} attempts a gesture to let you know ${he} wants to feel it. Just this once, you permit ${him} to touch your belly${(slave.pubertyXX === 1) ? `, since it is likely ${he} ${himself} will be swollen with child before long` : ``}. ${He} eagerly rubs it all over before pushing ${his} ear to it, provoking a kick and a gasp in response. ${He} instinctively <span class="devotion inc">connects to you</span> and <span class="trust inc">trusts you</span> like a mother.`);
				slave.trust += 2;
				slave.devotion += 2;
			}
		}
	}

	if (V.PC.boobs >= 1000) {
		r.push(`Now that you are alone with ${him}, ${he} seems incapable of pulling ${his} eyes off your huge tits. Every motion and jiggle in them is reflected in ${his} expression. ${He} licks ${his} lips as ${he} gazes at your erect nipples, but it will be you who decides who may suck on them. Though it doesn't stop ${him} from <span class="devotion inc">longing</span> to nurse from you.`);
		slave.devotion += 5;
	}

	if (V.enduringTrust > 20) {
		if (slave.trust >= -20) {
			r.push(`${He} notices that most of the slaves ${he} sees around your penthouse seem to trust you; in turn <span class="trust inc">${he} trusts you more too.</span>`);
			slave.trust += 2;
		}
	} else {
		if (slave.trust < 50) {
			r.push(`${He} notices that most of the slaves ${he} sees around your penthouse seem to fear you; in turn <span class="trust dec">${he} fears you more too.</span>`);
			slave.trust -= 2;
		}
	}
	if (V.enduringDevotion > 20) {
		if (slave.devotion >= -20) {
			r.push(`${He} sees that most of the slaves ${he} sees around your penthouse like you; in turn <span class="devotion inc">${he} likes you more too.</span>`);
			slave.devotion += 1;
		}
	} else {
		if (slave.devotion <= 50) {
			r.push(`${He} sees that most of the slaves ${he} sees around your penthouse dislike you; in turn <span class="devotion dec">${he} dislikes you more too.</span>`);
			slave.devotion -= 2;
		}
	}

	if (V.PC.career === "escort") {
		r.push(`${He} seems to <span class="trust inc">like your clothes</span> and <span class="devotion inc">wants a set of ${his} own.</span>`);
		slave.devotion += 1;
		slave.trust += 1;
	} else if (V.PC.career === "servant") {
		r.push(`${He} seems to <span class="trust inc">think your clothes are cute</span> and <span class="devotion inc">wants a set of ${his} own.</span>`);
		slave.devotion += 1;
		slave.trust += 1;
	} else if (V.PC.career === "gang") { // or gang tats
		r.push(`${He} seems to <span class="trust dec">find your appearance frightening.</span>`);
		slave.trust -= 5;
	}
	if (V.PC.rumor === "force") {
		r.push(`${He} seems to <span class="trust dec">be terrified of your forceful stance.</span>`);
		slave.trust -= 10;
	} else if (V.PC.rumor === "diligence") {
		r.push(`${He} seems to <span class="trust inc">find your diligence enjoyable.</span>`);
		slave.trust += 5;
	}

	if (slave.accent >= 3) {
		r.push(`${He} barely understands ${V.language} at all, and scarcely understands what's happening to ${him}. This leaves ${him} <span class="trust inc">blissfully unaware of what awaits ${him},</span> since ${he}'s too naïve to know better.`);
		slave.trust += 25;
	}

	if (V.arcologies[0].FSSupremacist >= 50) {
		if (slave.race === V.arcologies[0].FSSupremacistRace) {
			r.push(`${He} noticed everybody else is the same race as ${him}, and <span class="trust inc">feels right at home among them.</span>`);
			slave.trust += 2;
		}
	}
	if (V.arcologies[0].FSSubjugationist >= 50) {
		if (slave.race === V.arcologies[0].FSSubjugationistRace) {
			r.push(`${He} noticed a lot of your other slaves are the same race as ${him}, and <span class="trust inc">feels right at home among them,</span> despite what it means.`);
			slave.trust += 2;
		}
	}
	if (V.arcologies[0].FSRepopulationFocus >= 50) {
		if (slave.readyOva > 0) {
			r.push(`${He} notices all the rounded bellies in your arcology and <span class="trust inc">instinctively feels at home with ${his} egg-filled womb.</span>`);
			slave.trust += 2;
		}
	}
	if (V.arcologies[0].FSGenderFundamentalist >= 50) {
		r.push(`${He} notices there are lots of girls in your penthouse, making ${him} <span class="trust inc">more comfortable.</span>`);
		slave.trust += 2;
	}
	if (V.arcologies[0].FSGenderRadicalist >= 50) {
		r.push(`${He} notices there are lots of girly boys in your penthouse, making ${him} <span class="trust inc">more comfortable.</span>`);
		slave.trust += 2;
	}
	if (V.arcologies[0].FSHedonisticDecadence >= 50) {
		if (slave.weight > 50) {
			r.push(`${He} noticed all the fat slaves lazing about your penthouse; ${he} pats ${his} own soft belly, <span class="trust inc">feeling right at home.</span>`);
			slave.trust += 2;
		}
	}
	if (V.arcologies[0].FSPaternalist >= 50) {
		r.push(`${He} sees how happy your other slaves are, and can't help but <span class="trust inc">feel happy</span> ${himself}.`);
		slave.trust += 2;
	}
	if (V.arcologies[0].FSDegradationist >= 50) {
		r.push(`${He} sees how your other slaves cower as you pass, and can't help but <span class="trust inc">feel uneasy around you.</span>`);
		slave.trust -= 5;
	}

	if (V.arcologies[0].FSPaternalistLaw === 1) {
		r.push(`${He}`);
		if (canSee(slave)) {
			r.push(`saw`);
		} else if (canHear(slave)) {
			r.push(`overheard`);
		} else {
			r.push(`passed through`);
		}
		r.push(`a good deal of your arcology and its society on ${his} way to your penthouse, and was amazed by all the happy, healthy slaves. ${He} <span class="trust inc">begins to trust</span> that ${he}'ll be one of them, and <span class="devotion inc">anticipates playing</span> with all ${his} happy friends.`);
		slave.trust += 4;
		slave.devotion += 4;
	}

	App.Events.addParagraph(el, r);

	// Normal intro stuff
	el.append(
		App.UI.newSlaveIntro(
			slave,
			null,
			{
				tankBorn: true,
				momInterest: momInterest,
				dadInterest: dadInterest
			}
		)
	);

	return el;

	function parentNaming(parent) {
		const el = new DocumentFragment();
		const {
			he2, his2, He2, wife2
		} = getPronouns(parent).appendSuffix("2");
		if (parent.ID === V.ConcubineID) {
			App.UI.DOM.appendNewElement(
				"div",
				el,
				App.UI.DOM.link(
					`Permit your Concubine to name ${his2} ${daughter}`,
					() => {
						parentNames(parent, slave);
						slave.birthName = slave.slaveName;
						jQuery(naming).empty().append(`After some careful consideration, ${parent.slaveName} picks a name ${he2} thinks you might find attractive; from now on ${his2} ${daughter} will be known as "${slave.slaveName}".`);
						jQuery(newName).empty().append(SlaveFullName(slave));
					}
				)
			);
		} else if (parent.relationship === -3 && (parent.devotion >= -20)) {
			App.UI.DOM.appendNewElement(
				"div",
				el,
				App.UI.DOM.link(
					`Permit your ${wife2} to name ${his2} ${daughter}`,
					() => {
						parentNames(parent, slave);
						slave.birthName = slave.slaveName;
						jQuery(naming).empty().append(`After some careful consideration, ${parent.slaveName} picks a name suitable for your ${daughter}; from now on ${he2} will be known as "${slave.slaveName}".`);
						jQuery(newName).empty().append(SlaveFullName(slave));
					}
				)
			);
		} else if (parent.ID === V.BodyguardID) {
			App.UI.DOM.appendNewElement(
				"div",
				el,
				App.UI.DOM.link(
					`Permit your bodyguard to name ${his2} ${daughter}`,
					() => {
						parentNames(parent, slave);
						slave.birthName = slave.slaveName;
						jQuery(naming).empty().append(`After some careful consideration, ${parent.slaveName} decides on "${slave.slaveName}" for ${his2} daughter. ${He2} hopes you'll find it fitting ${his} station.`);
						jQuery(newName).empty().append(SlaveFullName(slave));
					}
				)
			);
		} else if (parent.ID === V.HeadGirlID) {
			App.UI.DOM.appendNewElement(
				"div",
				el,
				App.UI.DOM.link(
					`Permit your Head Girl to name ${his2} ${daughter}`,
					() => {
						parentNames(parent, slave);
						slave.birthName = slave.slaveName;
						jQuery(naming).empty().append(`After some careful consideration, ${parent.slaveName} decides on "${slave.slaveName}" for ${his2} daughter, and hopes it will be a name your other slaves will learn to respect.`);
						jQuery(newName).empty().append(SlaveFullName(slave));
					}
				)
			);
		} else if (parent.devotion > 50 && parent.trust > 50) {
			App.UI.DOM.appendNewElement(
				"div",
				el,
				App.UI.DOM.link(
					`Permit ${his} devoted ${parentTerm(slave, parent)}, ${parent.slaveName}, to name ${his2} ${daughter}`,
					() => {
						parentNames(parent, slave);
						slave.birthName = slave.slaveName;
						jQuery(naming).empty().append(`After some careful consideration, ${parent.slaveName} picks a name ${he2} hopes you'll like; from now on ${his2} ${daughter} will be known as "${slave.slaveName}".`);
						jQuery(newName).empty().append(SlaveFullName(slave));
					}
				)
			);
		}
		return el;
	}
};
