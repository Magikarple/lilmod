// cSpell:ignore Relocking

App.Events.SEBirth = class SEBirth extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	/** Custom casting: all slaves in labor are cast automatically. If no slaves are cast, casting fails and the event does not run. */
	castActors() {
		this.actors = V.slaves.filter(s => isInLabor(s)).map(s => s.ID);
		return this.actors.length > 0;
	}

	execute(node) {
		const artRenderer = V.seeImages && V.seeReportImages ? new App.Art.SlaveArtBatch(this.actors, 2, 0) : null;
		if (artRenderer) {
			node.append(artRenderer.writePreamble());
		}

		for (const slave of this.actors.map(id => getSlave(id))) {
			node.append(birth(slave, {artRenderer}));
			node.append(sectionBreak());
		}
		V.birthIDs = [];

		return node;

		function sectionBreak() {
			const hr = document.createElement("hr");
			hr.style.margin = "0";
			return hr;
		}
	}
};

/**
 * Describes birth for a single slave, and can present options for the player to send the babies to a particular place
 * @param {App.Entity.SlaveState} slave
 * @param {object} [obj]
 * @param {boolean} [obj.birthStorm]
 * @param {boolean} [obj.cSection]
 * @param {App.Art.SlaveArtBatch} [obj.artRenderer]
 */
globalThis.birth = function(slave, {birthStorm = false, cSection = false, artRenderer = null} = {}) {
	const el = document.createElement("p");
	el.style.overflow = "hidden"; // Keep image from floating into the next slave.
	let p;
	let humiliation = 0;
	let suddenBirth = 1;
	let slaveDead = 0;
	let birthDamage = 0;
	const newMother = (slave.counter.laborCount === 0 && slave.counter.birthsTotal === 0);
	const beforeSize = WombGetVolume(slave);
	let diffSize;
	let numStillborn = 0;
	let babiesBeingBorn;
	let numBeingBorn;
	let compoundCondition;
	const oldDevotion = slave.devotion;
	const babies = (slave.pregType > 1) ? `babies` : `baby`;
	const children = (slave.pregType > 1) ? `children` : `child`;
	const childrenAre = (slave.pregType > 1) ? `children are` : `child is`;
	const childrenWere = (slave.pregType > 1) ? `children were` : `child was`;
	const societalElite = V.arcologies[0].FSNeoImperialistLaw2 === 1 ? "Barons" : "Societal Elite";
	const dispositionId = _.uniqueId('babyDisposition-');
	const {
		He, His,
		he, his, him, himself, wife, girl
	} = getPronouns(slave);
	const hands = (hasBothArms(slave)) ? "hands" : "hand";
	if (artRenderer) {
		App.UI.DOM.drawOneSlaveRight(el, slave, artRenderer);
	}
	el.append(titleText());
	suddenBirthCheck();
	el.append(preBirthScene());
	el.append(calcBirthDamage());
	if (!slaveDead) {
		birthCalc();
		el.append(postBirthScene());
		el.append(birthMainScene());
		if (!slaveDead) {
			el.append(postBirthReaction());
		}
		if (!(slave.assignment === Job.DAIRY && V.dairyPregSetting > 0)) { // Contract pregnancies have already been spoken for.
			el.append(destinationForBabies());
		}
		if (numStillborn) {
			el.append(deadBabiesResponse(numStillborn));
		}
		if (!slaveDead) {
			el.append(birthPostpartum());
			slave.counter.laborCount++;
		}
		el.append(birthCritical());
		if (!slaveDead && cSection && slave.broodmother === 0 && V.bellyImplants === 1) {
			el.append(implantImplant());
		}
	}

	if (slaveDead) {
		removeSlave(slave);
		if (V.nextLink === "Slave Interact") {
			V.nextButton = "Back to Main";
			V.nextLink = "Main";
			App.Utils.updateUserButton();
		}
	} else {
		if (cSection) {
			App.Medicine.Modification.addScar(slave, "belly", "c-section");
		}
		if (cSection || slave.scar.hasOwnProperty("belly") && slave.scar.belly["c-section"] > 0) {
			App.Events.addResponses(el, [
				new App.Events.Result("Remove c-section scar(s).", scarring)
			]);
		}
		slave.labor = 0;
	}

	return el;

	function titleText() {
		const title = document.createElement("div");
		if (burstCheck(slave)) {
			App.UI.DOM.appendNewElement("span", title, `Alert! `, ["red", "bold"]);
			title.append(`Burst report: `);
		} else {
			title.append(`Birth report: `);
		}

		App.UI.DOM.appendNewElement("span", title, SlaveFullName(slave), "coral");
		return title;
	}

	/**
	 * early birth calcs
	 */
	function suddenBirthCheck() {
		if (isInduced(slave)) {
			suddenBirth += 20;
		}
		if (!canMove(slave)) {
			suddenBirth += 10;
		} else if (!canWalk(slave)) {
			if (slave.rules.mobility === "permissive") {
				suddenBirth += 3;
			} else {
				suddenBirth += 5;
			}
		}
		if (slave.fetish === Fetish.MINDBROKEN) {
			suddenBirth += 18;
		}
		if (slave.fetish === "humiliation") {
			suddenBirth += 1 + slave.fetishStrength / 25;
		}
		if (slave.weight > 190) {
			suddenBirth += 10;
		} else if (slave.weight > 160) {
			suddenBirth += 4;
		} else if (slave.weight > 130) {
			suddenBirth += 2;
		} else if (slave.weight > 95) {
			suddenBirth += 1;
		}
		if (slave.muscles < -95) {
			suddenBirth += 20;
		} else if (slave.muscles < -30) {
			suddenBirth += 4;
		} else if (slave.muscles < -5) {
			suddenBirth += 1;
		}
		if (slave.pregAdaptation >= 1000) {
			suddenBirth += 20; // baby's ready, giving birth right now
		} else if (slave.pregAdaptation >= 500) {
			suddenBirth += 3;
		} else if (slave.pregAdaptation >= 100) {
			suddenBirth += 1;
		}
		if (slave.geneMods.progenitor === 1) {
			suddenBirth += 20; // optimized, baby birthing machine
		}
		if (slave.health.condition < 0) {
			suddenBirth += 2;
		}
		if (slave.heels === 1) {
			suddenBirth += 3;
		}
		if (slave.boobs > 40000) {
			suddenBirth += 3;
		} else if (slave.boobs > 20000) {
			suddenBirth += 1;
		}
		if (slave.butt > 6) {
			suddenBirth += 1;
		}
		if (slave.dick >= 6) {
			suddenBirth += 1;
		}
		if (slave.balls >= 6) {
			suddenBirth += 1;
		}
		if (shoeHeelCategory(slave) > 2) {
			suddenBirth += 2;
		}
		if (slave.geneticQuirks.uterineHypersensitivity === 2) {
			suddenBirth += slave.counter.birthsTotal;
		}
		if (slave.mpreg !== 1) {
			if (slave.vagina > 2) {
				suddenBirth += 2;
			}
			if (slave.vaginalAccessory !== "none" || slave.chastityVagina === 1) {
				suddenBirth -= 20;
			}
		}
		suddenBirth -= Math.trunc((slave.intelligence + slave.intelligenceImplant) / 10);
	}

	function preBirthScene() {
		const el = new DocumentFragment();
		const r = [];
		if (birthStorm) {
			r.push(`The remote surgery allows the removal of the pregnancy generator through conventional means, an injection to induce labor and the resulting birthing of the womb's contents.`);
		} else if (cSection) {
			r.push(`${slave.slaveName} is sedated so ${his} ${children} can be extracted.`);
		} else if (burstCheck(slave)) {
			r.push(`${slave.slaveName}'s straining womb gave out and burst, taking ${his} life.`);
		} else if (slave.fuckdoll === 0) {
			if (slave.broodmother === 0 || slave.broodmotherCountDown === 1) {
				if (slave.assignment !== Job.DAIRY) {
					if (V.universalRulesCSec !== 1 && (slave.mpreg !== 0 || slave.vagina >= 0)) {
						if (hasAnyLegs(slave)) { // legless slaves are always carried in time
							if ((random(1, 20) > suddenBirth) || (V.universalRulesBirthing === 1)) {
								// did she make it to her birthing area?
								r.push(`Feeling childbirth approaching,`);
								if (!canWalk(slave)) {
									r.push(`${slave.slaveName} is helped`);
								} else {
									r.push(`${slave.slaveName} makes ${his} way`);
								}
								r.push(`to ${his} prepared birthing area.`);
							}
						} else { // made it to birthing area
							r.push(`With childbirth approaching, ${slave.slaveName} is carried to ${his} prepared birthing area.`);
						}
					}
				} else {
					if (V.dairyRestraintsSetting > 1 && slave.career === "a bioreactor") {
						r.push(`As ${slave.slaveName}'s water breaks, a mechanical basket is extended under ${his} laboring`);
						if (slave.mpreg === 1) {
							r.push(`ass.`);
						} else {
							r.push(`cunt.`);
						}
					} else if (V.dairyRestraintsSetting > 1) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`As ${slave.slaveName}'s water breaks, a mechanical basket is extended under ${his} laboring`);
							if (slave.mpreg === 1) {
								r.push(`ass.`);
							} else {
								r.push(`cunt.`);
							}
						} else {
							r.push(`As ${slave.slaveName}'s water breaks, a mechanical basket is extended under ${his} laboring`);
							if (slave.mpreg === 1) {
								r.push(`ass.`);
							} else {
								r.push(`cunt.`);
							}
							r.push(`${He} struggles in ${his} bindings, attempting to break free in order to birth ${his} coming child, but ${his} efforts are pointless.`);
							if (slave.geneticQuirks.uterineHypersensitivity === 2) {
								r.push(`Soon ${he} is convulsing with powerful orgasms while giving birth, restrained, into the waiting holder.`);
							} else {
								r.push(`${He} is forced to give birth, restrained, into the waiting holder.`);
							}
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`While getting milked, ${slave.slaveName}'s water breaks.`);
						} else if (slave.geneticQuirks.uterineHypersensitivity === 2) {
							r.push(`While getting milked, ${slave.slaveName}'s water breaks, a moment she anxiously awaited${(slave.counter.birthsTotal > 0) ? `, no matter how many times it's happened before` : ``}.`);
						} else {
							r.push(`While getting milked, ${slave.slaveName}'s water breaks,`);
							if (V.dairyPregSetting > 0) {
								r.push(`this is a regular occurrence to ${him} now so`);
							} else {
								r.push(`but`);
							}
							r.push(`${he} continues enjoying ${his} milking.`);
						}
					}
				}
			} else {
				if (!hasAnyLegs(slave)) {
					r.push(`With childbirth approaching, ${slave.slaveName} is carried to ${his} prepared birthing area.`);
				}
			}
		} else if (slave.fuckdoll !== 0) {
			if (V.universalRulesCSec === 1 || (slave.mpreg === 0 && slave.vagina < 0)) {
				cSection = true;
				r.push(`${slave.slaveName}'s suit's systems alert that it is ready to give birth; it is taken to the remote surgery to have its ${children} extracted and for it to be cleaned up.`);
			} else if (V.universalRulesBirthing === 1) {
				r.push(`${slave.slaveName}'s suit's systems alert that it is ready to give birth. It is taken to the remote surgery to have its ${children} extracted and for it to be cleaned up.`);
			} else if (birthDamage > 10) {
				cSection = true;
				r.push(`${slave.slaveName}'s suit's systems alert that it is ready to give birth. Since it fails to qualify as a birthing model, it is quickly taken to the remote surgery to have its ${children} extracted and to be cleaned up.`);
			} else {
				r.push(`${slave.slaveName}'s suit's systems alert you that it is ready to give birth. You carefully pose it as it labors on bringing its ${children} into the world and sit back to enjoy yourself as its`);
				if (slave.pregType > 1) {
					r.push(`first`);
				}
				r.push(`baby starts to crown. Once both it and yourself are finished, you send its offspring off and it to the autosurgery for cleaning.`);
			}
			r.push(`It barely comprehends what has happened, nor will it realize when another child is conceived in it.`);
		}

		App.Events.addNode(el, r);
		return el;
	}

	function birthCalc() {
		slave.pregControl = "none";

		if (slave.broodmother > 0) {
			babiesBeingBorn = WombBirth(slave, 37); // broodmothers - give birth for all 37+ week fetuses.
		} else if (slave.prematureBirth === 1) {
			babiesBeingBorn = WombBirth(slave, slave.pregData.minLiveBirth / 1.5); // around 22 weeks for human
		} else {
			babiesBeingBorn = WombBirth(slave, slave.pregData.minLiveBirth); // Normal human pregnancy - 34 week is minimal gestation time for live birth.
		}
		numBeingBorn = babiesBeingBorn.length; // just to improve speed and usability here.
		slave.counter.births += numBeingBorn;
		slave.counter.birthsTotal += numBeingBorn;
		V.birthsTotal += numBeingBorn;
		for (const baby of babiesBeingBorn) {
			if (baby.fatherID === -1) {
				V.PC.counter.slavesFathered++;
				slave.counter.PCChildrenBeared++;
			} else if (baby.fatherID > 0) {
				const babyDaddy = findFather(baby.fatherID);
				if (babyDaddy) {
					babyDaddy.counter.slavesFathered++;
				}
			}
		}
		// Here support for partial birth cases but if slaves still NOT have broodmother implant. Right now remaining babies will be lost, need to add research option for selective births. It should control labor and stop it after ready to birth babies out. Should be Repopulation FS research before broodmothers (their implant obviously have it as a part of functional). */
		if (slave.broodmother === 0 && slave.prematureBirth === 1 && V.surgeryUpgrade !== 1) {
			numStillborn = slave.womb.length;
			WombFlush(slave);
		}
		diffSize = beforeSize / (1 + WombGetVolume(slave)); // 1 used to avoid divide by zero error.
	}

	function birthMainScene() {
		const el = new DocumentFragment();
		let r = [];
		/* -------- cow birth variant ---------------------------------------------------------------------*/
		/*
		diffSize used for check result of partial birth size changes - if it = 2 then womb lost half of it's original size after partial birth, if it = 1 - no size lost. (We get this value as result of dividing of original womb size by after birth size)
		This descriptions can be expanded with more outcomes later. But it's not practical to check values above 5-10 - it become too affected by actual value of womb size.
		*/
		if (slave.assignment === Job.DAIRY && V.dairyPregSetting > 0) {
			r.push(`As a human cow, ${he}`);

			if (burstCheck(slave)) {
				r.push(App.UI.DOM.makeElement("span", `gave birth`, "orange"));
				r.push(App.UI.DOM.makeElement("span", `in the worst possible way`, ["health", "dec"]));
				slaveDead = 1;
			} else {
				r.push(App.UI.DOM.makeElement("span", `gave birth`, "orange"));
				if (slave.prematureBirth === 1) {
					r.push(App.UI.DOM.makeElement("span", `prematurely`, ["health", "dec"]));
				}
				if (diffSize < 1.15) {
					r.push(`but ${his} overfilled womb barely lost any size. ${His} body gave life`);
				} else if (diffSize < 1.3) {
					r.push(`but ${his} stomach barely shrank at all. ${His} body gave life`);
				}
			}

			if (numBeingBorn < 1) {
				r.push(`to nothing, as it was a stillbirth.`); // TODO: syntax wise this has problems. Will likely need to be reworked.
			} else if (numBeingBorn === 1) {
				r.push(`to a single calf.`);
			} else if (numBeingBorn >= 40) {
				r.push(`to a massive brood of ${numBeingBorn} calves.`);
			} else if (numBeingBorn >= 20) {
				r.push(`to a brood of ${numBeingBorn} calves.`);
			} else if (numBeingBorn >= 10) {
				r.push(`to a squirming pile of ${numBeingBorn} calves.`);
			} else {
				r.push(`to calf ${pregNumberName(numBeingBorn, 2)}.`);
			}
			if (numStillborn > 0 && numBeingBorn > 0) {
				r.push(`An additional ${numStillborn}`);
				if (numStillborn === 1) {
					r.push(`was`);
				} else {
					r.push(`were`);
				}
				r.push(`unfortunately stillborn.`);
			}
		} else {
			/* ---------- normal birth variant. -------------------------------------------------------------*/
			const fathers = [];
			for (const baby of babiesBeingBorn) {
				if (baby.fatherID === 0) {
					fathers.push("an unknown father");
				} else if (baby.fatherID === -1) {
					if (V.PC.dick !== 0) {
						fathers.push("your magnificent dick");
					} else {
						fathers.push("your powerful sperm");
					}
				} else if (baby.fatherID === -2) {
					fathers.push("your arcology's eager citizens");
				} else if (baby.fatherID === -3) {
					fathers.push("your former Master's potent seed");
				} else if (baby.fatherID === -4) {
					fathers.push("another arcology owner");
				} else if (baby.fatherID === -5) {
					fathers.push("one of your clientele");
				} else if (baby.fatherID === -6) {
					fathers.push(`the ${societalElite}`);
				} else if (baby.fatherID === -7) {
					fathers.push("your own design");
				} else if (baby.fatherID === -8) {
					fathers.push("one of your animals");
				} else if (baby.fatherID === -9) {
					fathers.push("a Futanari Sister");
				} else if (baby.fatherID === -10) {
					fathers.push("a rapist");
				} else {
					const babyDaddy = findFather(baby.fatherID);
					if (babyDaddy) {
						if (babyDaddy.ID === slave.ID) {
							fathers.push(`${his} own sperm`);
						} else if (babyDaddy.dick === 0) {
							fathers.push(`${babyDaddy.slaveName}'s potent seed`);
						} else {
							fathers.push(`${babyDaddy.slaveName}'s virile cock and balls`);
						}
					} else {
						fathers.push("an unknown father");
					}
				}
			}
			const fathersReduced = removeDuplicates(fathers);

			if (burstCheck(slave)) {
				r.push(`${He}`);
				r.push(App.UI.DOM.makeElement("span", `gave birth`, "orange"));
				r.push(App.UI.DOM.makeElement("span", `in the worst possible way`, ["health", "dec"]));
				r.push(`to`);
				slaveDead = 1;
			} else if (cSection) {
				r.push(`${He} was given`);
				if (birthDamage > 5) {
					r.push(App.UI.DOM.makeElement("span", `a cesarean section`, "orange"));
					r.push(`due to health concerns.`);
				} else {
					r.push(App.UI.DOM.makeElement("span", `a cesarean section.`, "orange"));
				}
				App.Events.addNode(el, r, "p"); // New paragraph
				r = [];
				r.push(`From ${his} womb,`);
			} else {
				r.push(`${He}`);
				r.push(App.UI.DOM.makeElement("span", `gave birth`, "orange"));
				if (slave.prematureBirth === 1) {
					r.push(App.UI.DOM.makeElement("span", `prematurely`, ["health", "dec"]));
				}

				if (diffSize < 1.15) {
					r.push(`but ${his} stomach barely shrank at all. ${His} body gave life to`);
				} else if (diffSize < 1.3) {
					r.push(`but ${his} overfilled womb barely lost any size. ${His} body gave life to`);
				} else {
					r.push(`to`);
				}
			}
			if (numBeingBorn < 1) {
				r.push(`nothing, as it was a stillbirth.`);
			} else if (numBeingBorn === 1) {
				r.push(`a single baby,`);
			} else if (numBeingBorn >= 40) {
				r.push(`a massive brood of ${numBeingBorn} babies,`);
			} else if (numBeingBorn >= 20) {
				r.push(`a brood of ${numBeingBorn} babies,`);
			} else if (numBeingBorn >= 10) {
				r.push(`a squirming pile of ${numBeingBorn} babies,`);
			} else {
				r.push(`${pregNumberName(numBeingBorn, 2)},`);
			}
			if (numBeingBorn > 0) {
				r.push(`created by ${toSentence(fathersReduced)}${(cSection) ? ', entered the world' : ''}.`);
			}
			if (numStillborn > 0 && numBeingBorn > 0) {
				r.push(`An additional ${numStillborn}`);
				if (numStillborn === 1) {
					r.push(`was`);
				} else {
					r.push(`were`);
				}
				r.push(`unfortunately stillborn.`);
			}
			if (cSection && slave.wombImplant === "restraint") {
				r.push(`The uterine support mesh built into ${his} womb was irreversibly damaged and had to be carefully extracted. Such an invasive surgery carried`);
				r.push(App.UI.DOM.makeElement("span", `major health complications.`, ["health", "dec"]));
				slave.wombImplant = "none";
				healthDamage(slave, 30);
			}
		}
		App.Events.addNode(el, r, "p");
		return el;
	}

	function calcBirthDamage() {
		/* I think all this reactions should be showed only if no c'section used too. Setting it up for just in case: */
		p = document.createElement("p");
		if (!cSection && slave.assignment !== Job.DAIRY) { // if not desired, this check can be easily removed or deactivated with condition set to true.
			let hasDamage;
			let r = [];
			if (newMother) {
				r.push([
					`${His} inexperience`,
					App.UI.DOM.makeElement("span", `complicated ${his} first birth.`, ["health", "dec"])
				]);
				compoundCondition = 1;
				birthDamage += 2;
			}
			if (slave.mpreg === 1) {
				if (slave.anus < 2) {
					r.push([
						`${His} tight ass`,
						App.UI.DOM.makeElement("span", `hindered ${his} ${(numBeingBorn > 1) ? `babies` : `baby's`} birth.`, ["health", "dec"])
					]);
					birthDamage += 3;
				}
			} else {
				if (slave.vagina < 2) {
					r.push([
						`${His} tight vagina`,
						App.UI.DOM.makeElement("span", `hindered ${his} ${(numBeingBorn > 1) ? `babies` : `baby's`} birth.`, ["health", "dec"])
					]);
					birthDamage += 3;
				}
				if (slave.vaginaLube === 0) {
					r.push([
						`${His} dry vagina made pushing ${his} ${children} out`,
						App.UI.DOM.makeElement("span", `painful.`, ["health", "dec"])
					]);
					birthDamage += 1;
				}
			}
			if (slave.hips < 0 && slave.geneMods.progenitor !== 1) {
				r.push([
					`${His} narrow hips made birth`,
					App.UI.DOM.makeElement("span", `troublesome.`, ["health", "dec"])
				]);
				birthDamage += (2 - slave.hips);
			}
			if (slave.weight < -95) {
				r.push([
					`${His} very thin body`,
					App.UI.DOM.makeElement("span", `was nearly incapable of birthing ${his} ${children}.`, ["health", "dec"])
				]);
				birthDamage += 7;
				compoundCondition = 1;
			} else if (slave.weight <= -30) {
				r.push([
					`${His} thin body was`,
					App.UI.DOM.makeElement("span", `ill-suited to ${his} childbirth.`, ["health", "dec"])
				]);
				birthDamage += 5;
			}
			if (slave.health.condition < -20) {
				r.push([
					`${His} poor health made laboring`,
					App.UI.DOM.makeElement("span", `exhausting.`, ["health", "dec"])
				]);
				compoundCondition = 1;
				birthDamage += (4 - (slave.health.condition / 10));
			}
			if (slave.health.illness >= 3) {
				r.push([
					`${His} ongoing illness`,
					App.UI.DOM.makeElement("span", `already sapped most of ${his} strength.`, ["health", "dec"])
				]);
				birthDamage += slave.health.illness;
				compoundCondition = 1;
			}
			if (slave.physicalAge < 6) {
				r.push([
					`${His} very young body was`,
					App.UI.DOM.makeElement("span", `not designed to be able pass a baby.`, ["health", "dec"])
				]);
				birthDamage += 5;
				compoundCondition = 1;
			} else if (slave.physicalAge < 9) {
				r.push([
					`${His} young body had`,
					App.UI.DOM.makeElement("span", `a lot of trouble`, ["health", "dec"]),
					`birthing ${his} ${babies}.`
				]);
				birthDamage += 3;
				compoundCondition = 1;
			} else if (slave.physicalAge < 13) {
				r.push([
					`${His} young body had`,
					App.UI.DOM.makeElement("span", `trouble birthing`, ["health", "dec"]),
					`${his} ${babies}.`
				]);
				birthDamage += 1;
				compoundCondition = 1;
			} else if (slave.physicalAge >= 100) {
				r.push([
					`${His} very old body was`,
					App.UI.DOM.makeElement("span", `not capable of passing a baby anymore.`, ["health", "dec"])
				]);
				birthDamage += 5;
				compoundCondition = 1;
			} else if (slave.physicalAge >= 85) {
				r.push([
					`${His} old body had`,
					App.UI.DOM.makeElement("span", `a lot of trouble`, ["health", "dec"]),
					`birthing ${his} ${babies}.`
				]);
				birthDamage += 3;
				compoundCondition = 1;
			} else if (slave.physicalAge >= 70) {
				r.push([
					`${His} old body had`,
					App.UI.DOM.makeElement("span", `trouble birthing`, ["health", "dec"]),
					`${his} ${babies}.`
				]);
				birthDamage += 1;
				compoundCondition = 1;
			}
			if (slave.health.tired > 80) {
				r.push([
					`${He} was thoroughly exhausted to begin with; ${he}`,
					App.UI.DOM.makeElement("span", `lacked the energy to push at all.`, ["health", "dec"])
				]);
				birthDamage += 20;
				compoundCondition = 1;
			} else if (slave.health.tired > 50) {
				r.push([
					`${He} was so tired, ${he}`,
					App.UI.DOM.makeElement("span", `lacked the energy to effectively push.`, ["health", "dec"])
				]);
				birthDamage += 2;
				compoundCondition = 1;
			}
			if (slave.muscles < -95) {
				r.push([
					`${He} tried and tried but ${his} frail body`,
					App.UI.DOM.makeElement("span", `could not push ${his} ${children} out.`, ["health", "dec"])
				]);
				birthDamage += 30;
				compoundCondition = 1;
			} else if (slave.muscles < -30) {
				r.push([
					`${His} very weak body`,
					App.UI.DOM.makeElement("span", `barely managed to push`, ["health", "dec"]),
					`out ${his} ${children}.`
				]);
				birthDamage += 4;
				compoundCondition = 1;
			} else if (slave.muscles < -5) {
				r.push([
					`${His} weak body`,
					App.UI.DOM.makeElement("span", `struggled to push`, ["health", "dec"]),
					`out ${his} ${children}.`
				]);
				birthDamage += 2;
			}

			if (slave.preg > slave.pregData.normalBirth * 1.25) { // better get her a c-sec
				r.push([
					`${His} ${children} had extra time to grow`,
					App.UI.DOM.makeElement("span", `greatly complicating childbirth.`, ["health", "dec"])
				]);
				if (slave.preg >= slave.pregData.normalBirth * 1.5) {
					if (slave.physicalAge < 6) {
						birthDamage += 50;
					} else if (slave.physicalAge < 9) {
						birthDamage += 30;
					} else if (slave.physicalAge < 13) {
						birthDamage += 20;
					}
					if (slave.hips < 0) {
						birthDamage += (20 - slave.hips);
					}
				} else if (slave.preg > slave.pregData.normalBirth * 1.25) {
					if (slave.physicalAge < 6) {
						birthDamage += 10;
					} else if (slave.physicalAge < 9) {
						birthDamage += 6;
					} else {
						birthDamage += 2;
					}
					if (slave.hips < 0) {
						birthDamage += (2 - slave.hips);
					}
				}
				compoundCondition = 1;
			}
			if (slave.wombImplant === "restraint") {
				r.push([
					`${His} support implant`,
					App.UI.DOM.makeElement("span", `weakens ${his} contractions`, ["health", "dec"]),
					`and inhibits ${his} womb's ability to give birth.`
				]);
				birthDamage += 2;
			}
			if (r.length > 0) {
				hasDamage = true;
			}

			for (const malus of r) {
				App.Events.addNode(p, malus, "div");
			}

			// Bonuses
			r = [];
			if (slave.mpreg === 1) {
				if (slave.anus >= 2) {
					r.push([
						`${His}`,
						App.UI.DOM.makeElement("span", `loose ass`, ["health", "inc"]),
						`made birthing ${his} ${children} easier.`
					]);
				}
				birthDamage -= slave.anus;
			} else {
				if (slave.vagina >= 2) {
					r.push([
						`${His}`,
						App.UI.DOM.makeElement("span", `loose vagina`, ["health", "inc"]),
						`made birthing ${his} ${children} easier.`
					]);
					birthDamage -= slave.vagina;
				}
				if (slave.vaginaLube > 0) {
					r.push([
						`${His}`,
						App.UI.DOM.makeElement("span", `moist vagina`, ["health", "inc"]),
						`hastened ${his} ${children}'s birth.`
					]);
					birthDamage -= slave.vaginaLube;
				}
			}

			if (!newMother) {
				r.push([
					`${He} has`,
					App.UI.DOM.makeElement("span", `given birth before,`, ["health", "inc"]),
					`so ${he} knows just what to do.`
				]);
				birthDamage -= 3;
			}

			if (slave.hips > 0) {
				r.push([
					`${His} `,
					App.UI.DOM.makeElement("span", `wide hips`, ["health", "inc"]),
					`greatly aided childbirth.`
				]);
				birthDamage -= slave.hips;
			}

			if (slave.pregAdaptation >= 1000) {
				r.push([
					`${His} body has`,
					App.UI.DOM.makeElement("span", `completely adapted to pregnancy;`, ["health", "inc"]),
					`when it is time to give birth, that baby is coming out fast.`
				]);
				birthDamage -= 10;
			} else if (slave.pregAdaptation >= 500) {
				r.push([
					`${His} body is`,
					App.UI.DOM.makeElement("span", `highly adapted to bearing life`, ["health", "inc"]),
					`and birth is no small part of that.`
				]);
				birthDamage -= 3;
			} else if (slave.pregAdaptation >= 100) {
				r.push([
					`${His} body has`,
					App.UI.DOM.makeElement("span", `become quite adept at bearing children,`, ["health", "inc"]),
					`birth included.`
				]);
				birthDamage -= 1;
			}

			if (slave.geneMods.progenitor === 1) {
				r.push([
					`${He} was`,
					App.UI.DOM.makeElement("span", `genetically modified to be superior in child bearing;`, ["health", "inc"]),
					`${his} body popped ${his} ${children} out like it was nothing.`
				]);
				birthDamage -= 200;
			}

			if (slave.curatives > 0) {
				r.push([
					`${His} `,
					App.UI.DOM.makeElement("span", `curatives`, ["health", "inc"]),
					`helped protect ${him}.`
				]);
				birthDamage -= 3;
			}

			if (App.Data.Careers.Leader.nurse.includes(slave.career) && slave.fetish !== Fetish.MINDBROKEN && slave.muscles >= -95) {
				r.push([
					`Thanks to ${his}`,
					App.UI.DOM.makeElement("span", `previous career,`, ["health", "inc"]),
					`childbirth went smoothly.`
				]);
				birthDamage = 0;
			} else if (slave.intelligenceImplant >= 15) {
				r.push([
					`${He} was`,
					App.UI.DOM.makeElement("span", `taught how to handle birth`, ["health", "inc"]),
					`in class.`
				]);
				birthDamage -= 2;
			}

			if (slave.geneticQuirks.uterineHypersensitivity === 2) {
				if (V.geneticMappingUpgrade > 0) {
					r.push([
						`${His} hypersensitive uterus made birth`,
						App.UI.DOM.makeElement("span", `a very pleasant experience,`, ["health", "inc"]),
						`distracting from the pain.`
					]);
				} else {
					r.push([
						`${He} oddly climaxed multiple times during birth,`,
						App.UI.DOM.makeElement("span", `keeping ${his} mind off the pain.`, ["health", "inc"])
					]);
				}
				birthDamage -= 5;
			}

			if (hasDamage && r.length > 0) {
				App.UI.DOM.appendNewElement("div", p, `However:`);
			}

			for (const boost of r) {
				App.Events.addNode(p, boost, "div");
			}
		}
		return p;
	}

	function postBirthScene() {
		const el = new DocumentFragment();
		const r = [];
		if (birthStorm) {
			if (slave.broodmother === 2) {
				r.push(`${slave.slaveName}'s obscenely swollen belly begins to shudder and writhe moments after being injected with the drug as all ${his} waters break. ${He} spreads ${his}`);
				if (hasBothLegs(slave)) {
					r.push(`legs to either side of ${his} spasming bulk`);
				} else if (!hasAnyLegs(slave)) {
					r.push(`stumps`);
				} else {
					r.push(`leg and ${his} stump`);
				}
				r.push(`as wide as ${he} can with a loud moan. ${His} vaginal lips part as the first of ${his} brood is born, followed by another, and another. After hours of constant`);
			} else if (slave.broodmother === 1) {
				r.push(`${slave.slaveName}'s massive belly shudders and shrinks as all ${his} waters simultaneously break. ${He} spreads ${his}`);
				if (hasBothLegs(slave)) {
					r.push(`legs`);
				} else if (!hasAnyLegs(slave)) {
					r.push(`stumps`);
				} else {
					r.push(`leg and stump`);
				}
				r.push(`wide with a loud moan. ${His} vaginal lips part as the first of ${his} brood is born, followed not long after by another. After an hour of constant`);
			} else {
				r.push(`${slave.slaveName}'s massive belly shudders and shrinks as all ${his} waters simultaneously break. ${He} spreads ${his}`);
				if (hasBothLegs(slave)) {
					r.push(`legs`);
				} else if (!hasAnyLegs(slave)) {
					r.push(`stumps`);
				} else {
					r.push(`leg and stump`);
				}
				r.push(`wide with a loud moan. ${His} vaginal lips part as ${his} birthing begins. After an hour of intensive`);
			}

			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`birthing, ${he} shows little interest in the changes to ${his} body.`);
			} else if (slave.sexualFlaw === "breeder") {
				r.push(`birthing and the realization that you are taking away ${his} ideal body, ${his} perfect existence, ${his} mind`);
				r.push(
					App.UI.DOM.makeElement("span", `fundamentally breaks.`)
				);
				applyMindbroken(slave);
			} else if (slave.fetish === "pregnancy" && S.Nurse) {
				r.push(`birthing and orgasming all the time, ${slave.slaveName}'s mind would have broken. However, ${S.Nurse.slaveName} had the foresight to sedate ${him} after witnessing ${his} constant orgasming. ${He} awakes to find ${his} belly deflated, no longer crammed full of life. ${He} is`);
				r.push(
					App.UI.DOM.makeElement("span", `disappointed`, "mediumorchid")
				);
				r.push(`that you would forbid ${him} from such a pleasure, but`);
				r.push(
					App.UI.DOM.makeElement("span", `understands`, "mediumaquamarine")
				);
				r.push(`why it was done.`);
				slave.trust += 5;
				slave.devotion -= 5;
			} else if (slave.fetish === "pregnancy") {
				if (slave.broodmother === 2) {
					r.push(`birthing and orgasming each time, ${slave.slaveName}'s mind is`);
					r.push(App.UI.DOM.makeElement("span", `fundamentally broken.`, "red"));
					r.push(`Being under constant pleasure for so long has destroyed all but the part of ${him} that feels pleasure. With one final push the breeding device is expelled from ${his} womb as the last spark of what was ${his} mind is extinguished.`);
					applyMindbroken(slave);
				} else if (slave.broodmother === 1) {
					r.push(`birthing and orgasming each time, ${slave.slaveName} is reduced to a quivering, overstimulated pile. When ${he} returns to ${his} senses,`);
					r.push(App.UI.DOM.makeElement("span", `${he} can only express how much ${he} wants to go again.`, "hotpink"));
					slave.devotion += 4;
				} else {
					r.push(`birthing and orgasming all the time, ${slave.slaveName} is reduced to a quivering, overstimulated pile. When ${he} returns to ${his} senses,`);
					r.push(App.UI.DOM.makeElement("span", `${he} can only express how much ${he} wants to go again.`, "hotpink"));
					slave.devotion += 3;
				}
			} else if (slave.devotion <= 20) {
				r.push(`birthing,`);
				r.push(App.UI.DOM.makeElement("span", `${he} hates you for destroying ${his} body like this.`, "mediumorchid"));
				r.push(`${He} is`);
				r.push(App.UI.DOM.makeElement("span", `terrified of your power`, "gold"));
				r.push(`over ${his} body.`);
				slave.trust -= 40;
				slave.devotion -= 50;
			} else if (slave.devotion <= 50) {
				r.push(`birthing, ${he} is dully obedient. ${He} has been broken to slave life so thoroughly that even this is neither surprising nor affecting. ${He} is`);
				r.push(App.UI.DOM.makeElement("span", `terrified of your power`, "gold"));
				r.push(`over ${his} body.`);
				slave.trust -= 40;
			} else {
				r.push(`birthing, ${he} is`);
				r.push(App.UI.DOM.makeElement("span", `pleased by this stark development`, "hotpink"));
				r.push(`since ${he} is so attentive to your will. ${He} also expects ${he}'ll be able to fuck better now without a massive belly getting in the way.`);
				slave.devotion += 4;
			}

			if (slave.birthsTat > -1) {
				slave.birthsTat++;
				r.push(`The temporary tattoo of a child has been replaced with ${his} ${ordinalSuffix(slave.birthsTat)} permanent infant.`);
				cashX(forceNeg(V.modCost), "slaveMod", slave);
			}

			if (slave.broodmother === 2) {
				slave.preg = -3;
				if (slave.vagina < 6) {
					slave.vagina = 10;
				}
				healthDamage(slave, 80);
			} else {
				if (rulesDemandContraceptives(slave, V.defaultRules)) {
					slave.preg = -1;
				} else {
					slave.preg = 0;
				}
				// I think, it's not logical to break her reproductive system out of repair, if she is only type 1 broodmother. In this case she have to birth only like 5-10 fully grown babies, others get progressively smaller. It's should be even smaller stress to body then for "normal" hyperpregnant with 15-20+ children - they have to birth them all at full size.
				if (V.seeStretching === 1 && slave.vagina < 6) {
					slave.vagina = 6;
				}
				healthDamage(slave, 30);
			}
		} else if (cSection) {
			if (slave.pregSource === -1) {
				if (slave.devotion <= 20 && slave.weekAcquired > 0) {
					r.push(`${He}`);
					r.push(App.UI.DOM.makeElement("span", `despises`, "mediumorchid"));
					r.push(`you for using ${his} body to bear your children.`);
					slave.devotion -= 10;
				} else if (slave.devotion > 50) {
					r.push(`${He}'s`);
					r.push(App.UI.DOM.makeElement("span", `so proud`, "hotpink"));
					r.push(`to have successfully carried children for you.`);
					slave.devotion += 3;
				}
			}
			if (slave.fetish === "pregnancy") {
				r.push(`${He}'s a little disappointed ${he} didn't get to give birth, but can't wait to get pregnant again.`);
			} else if (slave.devotion > 50) {
				r.push(`${He} is`);
				r.push(App.UI.DOM.makeElement("span", `pleased by this stark development,`, "hotpink"));
				r.push(`since ${he} is so attentive to your will. ${He} also expects ${he}'ll be able to fuck better now.`);
				slave.devotion += 4;
			} else if (slave.devotion > 20) {
				r.push(`${He} is broken enough to accept your control of ${his} pregnancies.`);
			} else if (slave.devotion >= -20) {
				r.push(`${He} would have preferred to give birth when ${he} was ready and is`);
				r.push(App.UI.DOM.makeElement("span", `sensibly fearful`, "gold"));
				r.push(`of your total power over ${his} body.`);
				slave.trust -= 5;
			} else {
				r.push(`${He} does not understand the realities of ${his} life as a slave at a core level, so ${he}'s`);
				r.push(App.UI.DOM.makeElement("span", `terrified and angry`, "mediumorchid"));
				r.push(`that you decided to cut short ${his} pregnancy. ${He} is`);
				r.push(App.UI.DOM.makeElement("span", `sensibly fearful`, "gold"));
				r.push(`of your total power over ${his} body.`);
				slave.trust -= 5;
				slave.devotion -= 5;
			}
		} else if (slave.fuckdoll === 0) {
			if (slave.broodmother === 0 || slave.broodmotherCountDown === 1) {
				if (slave.assignment !== Job.DAIRY) {
					if (V.universalRulesCSec === 1 || (slave.mpreg === 0 && slave.vagina < 0)) {
						r.push(birthDescription());
					} else {
						if (hasAnyLegs(slave)) { // legless slaves are always carried in time
							if ((random(1, 20) > suddenBirth) || (V.universalRulesBirthing === 1)) {
								// did she make it to her birthing area?
								r.push(birthDescription());
							} else { // did not make it to birthing area
								if (((birthDamage > 15 && random(1, 100) > 50) || (birthDamage > 20)) && (slave.assignment !== Job.NURSE && slave.assignment !== Job.CLINIC && (!getPersonalAttention(slave.ID, "torture") || onBedRest(V.PC, true)))) {
									r.push(deadlyBirthScene());
								} else {
									r.push(suddenBirthScene());
								}
							}
						} else { // made it to birthing area
							r.push(ampBirth());
						}
					}
				} else {
					if (V.dairyRestraintsSetting > 1 && slave.career === "a bioreactor") {
						r.push(`Once the ${childrenAre} secure, the basket retracts allowing access to ${his}`);
						if (slave.mpreg === 1) {
							r.push(`rear.`);
						} else {
							r.push(`vagina.`);
						}
						if (V.dairyPregSetting > 0) {
							r.push(`The impregnation tube is promptly reinserted, bloating ${his} empty womb with fresh cum, where it will remain until ${he} is pregnant once more.`);
						}
						r.push(`All these events are meaningless to ${him}, as ${his} consciousness has long since been snuffed out.`);
					} else if (V.dairyRestraintsSetting > 1) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`Once the ${childrenAre} secure, the basket retracts allowing access to ${his}`);
							if (slave.mpreg === 1) {
								r.push(`rear.`);
							} else {
								r.push(`vagina.`);
							}
							if (V.dairyPregSetting > 0) {
								r.push(`The impregnation tube is promptly reinserted, bloating ${his} empty womb with fresh cum, where it will remain until ${he} is pregnant once more.`);
							}
							r.push(`${He} doesn't care about any of this, as the only thoughts left in ${his} empty mind revolve around the sensations in ${his} crotch and breasts.`);
						} else {
							r.push(`Once the ${childrenAre} secure, the basket retracts allowing access to ${his} vagina.`);
							if (V.dairyPregSetting > 0) {
								r.push(`The impregnation tube is promptly reinserted, bloating ${his} empty womb with fresh cum, where it will remain until ${he} is pregnant once more. ${slave.slaveName} moans, partially with pleasure and partially with defeat, under the growing pressure within ${his} body. Tears stream down ${his} face as`);
								if (slave.counter.births > 0) {
									r.push(`${he} is forcibly impregnated once more.`);
								} else {
									r.push(`${he} attempts to shift in ${his} restraints to peek around ${his} swollen breasts, but ${he} is too well secured. ${He}'ll realize what is happening when ${his} belly grows large enough to brush against ${his} udders as the milker sucks from them${(slave.dick > 0) ? ` or ${his} dick begins rubbing its underside` : ``}.`);
								}
							}
							r.push(`${His} mind slips slightly more as ${he} focuses on ${his} fate as nothing more than an animal destined to be milked and bear offspring until ${his} body gives out.`);
							slave.trust -= 10;
							slave.devotion -= 10;
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${He} shows little interest and continues kneading ${his} breasts. Instinctively ${he} begins to push out ${his} ${babies}. ${He} pays no heed to ${his} ${children} being removed from the milking stall, instead focusing entirely on draining ${his} breasts.`);
						} else if (slave.geneticQuirks.uterineHypersensitivity === 2) {
							r.push(`${He} begins to push out ${his} ${babies}, orgasming throughout the whole process. By the time ${he} regains ${his} senses ${his} ${children} have already been removed from the milking stall.`);
						} else {
							r.push(`${He} begins to push out ${his} ${babies}. ${He} catches`);
							if (canSee(slave)) {
								r.push(`a glimpse`);
							} else if (canHear(slave)) {
								r.push(`the sound`);
							} else {
								r.push(`the feeling`);
							}
							r.push(`of ${his} ${children} being removed from the milking stall before returning ${his} focus to draining ${his} breasts.`);
						}
					}
				}
			} else {
				if (!hasAnyLegs(slave)) {
					r.push(ampBirth());
				} else if (slave.broodmother === 1) {
					r.push(broodmotherBirth());
				} else {
					r.push(hyperBroodmotherBirth());
				}
			}
		}
		App.Events.addNode(el, r);
		return el;
	}

	function postBirthReaction() {
		const el = new DocumentFragment();
		/** @type {Array<string|HTMLElement>} */
		let r;
		/* ---- Postbirth reactions, body -------------------------------------------------------------------------------------------*/
		if (!cSection) { // all this block only if no c'section used.
			r = [];
			if (slave.broodmother > 0 || slave.womb.length > 0) { /* Now this block shown only for broodmothers or partial birth. They birth only ready children, so numBeingBorn is effective to see how many birthed this time.*/
				if (diffSize > 1.5 && numBeingBorn >= 80) { // only show if belly lost at least 1/4 of original size.
					r.push(`After an entire day of labor and birth, ${his} belly sags heavily.`);
				} else if (diffSize > 1.5 && numBeingBorn >= 40) {
					r.push(`After half a day of labor and birth, ${his} belly sags softly.`);
				} else if (diffSize > 1.5 && numBeingBorn >= 20) {
					r.push(`After several hours of labor and birth, ${his} belly sags softly.`);
				} else if (diffSize > 1.5 && numBeingBorn >= 10) {
					r.push(`After few hours of labor and birth, ${his} belly sags softly.`);
				} else if (diffSize > 1.5) {
					r.push(`After labor and birth, ${his} belly sags softly.`);
				}
			} else { // this was intended for normal birth to draw attention to how long it takes to pass that many children as well as how deflated she'll be after the fact.
				if (slave.pregType >= 80) {
					r.push(`After an entire day of labor and birth, ${his} belly sags heavily.`);
				} else if (slave.pregType >= 40) {
					r.push(`After half a day of labor and birth, ${his} belly sags emptily.`);
				} else if (slave.pregType >= 20) {
					r.push(`After several hours of labor and birth, ${his} belly sags softly.`);
				}
			}
			App.Events.addNode(el, r, "div");
			if (
				(slave.mpreg === 0 && slave.vagina === 0) ||
				(slave.mpreg === 1 && slave.anus === 0)
			) {
				r = [];
				r.push(`Since ${he} was a virgin, giving birth was a`);
				r.push(App.UI.DOM.makeElement("span", `terribly painful`, ["health", "dec"]));
				r.push(`experience.`);
				if (slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.fetish === "masochist") {
						if (slave.fetishKnown === 0) {
							r.push(`${He} seems to have orgasmed several times during the experience and appears to`);
							r.push(App.UI.DOM.makeElement("span", `really like pain.`, "lightcoral"));
							slave.fetishKnown = 1;
						} else {
							r.push(`However, due to ${his} masochistic streak, ${he}`);
							r.push(App.UI.DOM.makeElement("span", `greatly enjoyed`, "hotpink"));
							r.push(`said experience.`);
						}
						slave.devotion += 2;
					} else if (slave.devotion > 70) {
						r.push(`Being allowed to give birth in such a state`);
						r.push(App.UI.DOM.makeElement("span", `tests ${his} devotion`, "mediumorchid"));
						r.push(`and`);
						r.push(App.UI.DOM.makeElement("span", `devastates ${his} trust`, "gold"));
						r.push(`in you.`);
						slave.devotion -= 10;
						slave.trust -= 25;
					} else {
						r.push(`${He}`);
						r.push(App.UI.DOM.makeElement("span", `despises`, "mediumorchid"));
						r.push(`you for taking ${his} virginity in such a`);
						r.push(App.UI.DOM.makeElement("span", `horrifying`, "gold"));
						r.push(`way.`);
						slave.devotion -= 25;
						slave.trust -= 25;
					}
				}
				healthDamage(slave, 10);
				App.Events.addNode(el, r, "div");
			}
			if (slave.hips < -1 && slave.geneMods.progenitor !== 1) {
				r = [];
				r.push(`${He} had exceedingly narrow hips, completely unsuitable for childbirth. As ${he} struggled on ${his}`);
				if (numBeingBorn > 1) {
					r.push(`first`);
				}
				r.push(`child, ${his} pelvic bone strained under the pressure until it could no longer hold together and`);
				r.push(App.UI.DOM.makeElement("span", `agonizingly snapped.`, ["health", "dec"]));
				if (slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.fetish === "masochist") {
						if (slave.fetishKnown === 0) {
							r.push(`What would have made most girls blackout from pain sent ${him} into the lewdest orgasm you've seen today. ${He}`);
							r.push(App.UI.DOM.makeElement("span", `must get off to pain.`, "lightcoral"));
							slave.fetishKnown = 1;
						} else {
							r.push(`${He} claims to have never climaxed so hard and`);
							r.push(App.UI.DOM.makeElement("span", `wishes ${his} hips could have stayed that narrow for next time.`, "hotpink"));
						}
						slave.devotion += 5;
					} else if (slave.devotion > 70) {
						r.push(`When ${he} finally comes to after blacking out, ${his} pelvis has already been patched up. ${He} is just glad that ${he} managed to finish giving birth despite the hindrance.`);
					} else {
						r.push(`When ${he} finally comes to after blacking out, ${his} pelvis has already been patched up. ${He}`);
						r.push(App.UI.DOM.makeElement("span", `loathes you`, "mediumorchid"));
						r.push(`for forcing ${his} body to undergo such a painful experience and`);
						r.push(App.UI.DOM.makeElement("span", `fears`, "gold"));
						r.push(`what horror you have planned next.`);
						slave.devotion -= 25;
						slave.trust -= 25;
					}
				} else {
					r.push(`It only hurt for an instant and a second later was promptly forgotten. To ${him}, ${his} hips were always this wide.`);
				}
				r.push(`${His} pelvis has been forced into a`);
				r.push(App.UI.DOM.makeElement("span", `more feminine`, "lime"));
				r.push(`shape.`);
				if (slave.hipsImplant > 0) {
					r.push(`This has also undone any surgical narrowing ${he} has undergone.`);
				}
				healthDamage(slave, 20);
				slave.hips = 0;
				slave.hipsImplant = 0;
				App.Events.addNode(el, r, "div");
			}
			r = [];
			if (birthStorm) {
				r.push(
					App.UI.DOM.makeElement("span", `The ordeal of constant birthing has had a massive effect on ${his} health as well as completely destroying ${his} vagina.`, ["health", "dec"])
				);
			} else if (slave.mpreg === 1) {
				if (slave.anus < 0) { // you somehow got a pregnant slave with no vagina catch
					r.push(`Childbirth has`);
					r.push(App.UI.DOM.makeElement("span", `has torn ${him} a gaping anus.`, "lime"));
				} else if (slave.anus === 0) { // please stop selling me pregnant virgins, neighbor gender fundamentalist arcology
					r.push(`Childbirth has`);
					r.push(App.UI.DOM.makeElement("span", `ruined ${his} virgin ass.`, "lime"));
				} else if (slave.anus === 1) {
					r.push(`Childbirth has`);
					r.push(App.UI.DOM.makeElement("span", `greatly stretched out ${his} ass.`, "lime"));
				} else if (slave.anus === 2) {
					r.push(`Childbirth has`);
					r.push(App.UI.DOM.makeElement("span", `stretched out ${his} ass.`, "lime"));
				} else if (slave.anus === 3) {
					r.push(`${His} ass was loose enough to not be stretched by childbirth.`);
				} else if (slave.anus < 6) {
					r.push(`Childbirth stood no chance of stretching ${his} gaping ass.`);
				} else {
					r.push(`${His} ${children} could barely stretch ${his} cavernous ass.`);
				}
			} else {
				if (slave.vagina < 0) { // you somehow got a pregnant slave with no vagina catch
					r.push(`Childbirth has`);
					r.push(App.UI.DOM.makeElement("span", `has torn ${him} a gaping vagina.`, "lime"));
				} else if (slave.vagina === 0) { // please stop selling me pregnant virgins, neighbor gender fundamentalist arcology (or maybe it's just surgery?)
					r.push(`Childbirth has`);
					r.push(App.UI.DOM.makeElement("span", `ruined ${his} virgin vagina.`, "lime"));
				} else if (slave.vagina === 1) {
					r.push(`Childbirth has`);
					r.push(App.UI.DOM.makeElement("span", `greatly stretched out ${his} vagina.`, "lime"));
				} else if (slave.vagina === 2) {
					r.push(`Childbirth has`);
					r.push(App.UI.DOM.makeElement("span", `stretched out ${his} vagina.`, "lime"));
				} else if (slave.vagina === 3) {
					r.push(`${His} vagina was loose enough to not be stretched by childbirth.`);
				} else if (slave.vagina < 6) {
					r.push(`Childbirth stood no chance of stretching ${his} gaping vagina.`);
				} else {
					r.push(`${His} ${children} could barely stretch ${his} cavernous vagina.`);
				}
			}
			App.Events.addNode(el, r, "div");
			if (slave.mpreg === 1) {
				/*
				r.push(`Childbirth has`)
				r.push(App.UI.DOM.makeElement("span", `stretched out ${his} anus.`, "lime"));
				//no need for description now
				*/
				if (V.seeStretching === 1 && (slave.anus < 3 || (V.dairyPregSetting > 1 && slave.anus < 4))) {
					slave.anus += 1;
				}
			} else {
				/*
				r.push(`Childbirth has`)
				r.push(App.UI.DOM.makeElement("span", `stretched out ${his} vagina.`, "lime"));
				//no need for description now
				*/
				if (V.seeStretching === 1 && (slave.vagina < 3 || (V.dairyPregSetting > 1 && slave.vagina < 4))) {
					slave.vagina += 1;
				}
			}
		} else {
			r = [];
			r.push(`Since ${his}`);
			if (slave.mpreg === 1) {
				r.push(`ass`);
			} else {
				r.push(`vagina`);
			}
			r.push(`was spared from childbirth,`);
			r.push(App.UI.DOM.makeElement("span", `it retained its tightness.`, "lime"));
			if (V.PC.skill.medicine >= 100) {
				r.push(`Since you`);
				r.push(App.UI.DOM.makeElement("span", `performed the surgery yourself,`, ["skill", "player"]));
				r.push(`and you do an artist's work, ${his} health is`);
				r.push(App.UI.DOM.makeElement("span", `less affected`, ["health", "inc"]));
				r.push(`by the surgery than it would have been if you'd paid some hack to do it remotely.`);
				if (slave.fetish !== Fetish.MINDBROKEN && slave.fuckdoll === 0) {
					r.push(`${He} went into the surgery very aware that you were performing it manually.`);
					if (slave.devotion < oldDevotion) {
						if (slave.devotion > 50) {
							r.push(`Though ${he} is unhappy with the results, ${he} consoles ${himself} with the knowledge that you cared enough to do it personally.`);
						} else if (slave.devotion >= -20) {
							r.push(`${He} is`);
							r.push(App.UI.DOM.makeElement("span", `even more afraid`, "gold"));
							r.push(`of you afterward than ${he} would otherwise be. You must seem a cruel and near-omnipotent power to ${him}.`);
							slave.trust -= 5;
						} else {
							r.push(`${He} is`);
							r.push(App.UI.DOM.makeElement("span", `even more hateful`, "mediumorchid"));
							r.push(`of you afterward than ${he} would otherwise be. It must seem to ${him} that ${he}'s nothing more than a test subject to you.`);
							slave.devotion -= 5;
						}
					} else {
						if (slave.devotion > 50) {
							r.push(`Since ${he}'s happy with the results, ${he}'s almost beside ${himself} with`);
							r.push(App.UI.DOM.makeElement("span", `gratitude,`, "hotpink"));
							r.push(`and filled with`);
							r.push(App.UI.DOM.makeElement("span", `admiration`, "mediumaquamarine"));
							r.push(`of your skill.`);
							slave.devotion += 4;
							slave.trust += 4;
						} else if (slave.devotion >= -20) {
							r.push(`${He} is quite struck by how you performed the surgery personally. ${He} admires your refusal to be one of the idle rich, and`);
							r.push(App.UI.DOM.makeElement("span", `likes you more.`, "hotpink"));
							slave.devotion += 5;
						} else {
							r.push(`${He} knows that ${he} should be grateful to you for performing the surgery personally, but the emotional turmoil of the occasion is too much for ${him}, and the realization makes little lasting impact.`);
						}
					}
				}
			} else {
				r.push(`As with all surgery`);
				r.push(App.UI.DOM.makeElement("span", `${his} health has been slightly affected.`, ["health", "dec"]));
				surgeryDamage(slave, 5);
			}
			App.Events.addNode(el, r, "div");
		}

		p = document.createElement("p");
		if (slave.assignment !== Job.DAIRY && !cSection) {
			/* && ${slave.broodmother} === 0 // removed - broodmother have sensations too */
			r = [];
			r.push(`All in all,`);
			if (birthDamage > 15) {
				r.push(`childbirth was`);
				r.push(App.UI.DOM.makeElement("span", `horrifically difficult for ${him} and nearly claimed ${his} life.`, ["health", "dec"]));
			} else if (birthDamage > 10) {
				r.push(`childbirth was extremely difficult for ${him} and`);
				r.push(App.UI.DOM.makeElement("span", `greatly damaged ${his} health.`, ["health", "dec"]));
			} else if (birthDamage > 5) {
				r.push(`childbirth was difficult for ${him} and`);
				r.push(App.UI.DOM.makeElement("span", `damaged ${his} health.`, ["health", "dec"]));
			} else if (birthDamage > 0) {
				r.push(`childbirth was painful for ${him}, though not abnormally so, and`);
				r.push(App.UI.DOM.makeElement("span", `damaged ${his} health.`, ["health", "dec"]));
			} else {
				r.push(`childbirth was`);
				r.push(App.UI.DOM.makeElement("span", `no problem`, ["health", "inc"]));
				r.push(`for ${him}.`);
			}
			if (birthDamage > 0) {
				healthDamage(slave, Math.round(birthDamage / 2) * 10);
				slave.health.tired += Math.round((birthDamage / 2) * 10);
				if (birthDamage > 5 && compoundCondition === 1 && numBeingBorn > 1) {
					r.push(`Or it would have been, were ${he} only having one. With each additional child that needed to be birthed,`);
					r.push(App.UI.DOM.makeElement("span", `the damage to ${his} health was compounded.`, ["health", "dec"]));
					healthDamage(slave, numBeingBorn);
					slave.health.tired += numBeingBorn * 5;
				}
				slave.health.tired = Math.clamp(slave.health.tired, 0, 100);
			} else {
				slave.health.tired = Math.clamp(slave.health.tired + 10, 0, 100);
			}
			if (slave.geneticQuirks.uterineHypersensitivity === 2 && slave.fetish !== Fetish.MINDBROKEN && slave.fuckdoll === 0) {
				r.push(`Not only that, but`);
				r.push(App.UI.DOM.makeElement("span", `the entire process was extremely pleasurable for ${him}${(numBeingBorn > 1) ? ',' : '.'}`, ["health", "inc"]));
				if (numBeingBorn > 1) {
					r.push(`with orgasms growing more powerful with each baby ${he} brought to the world.`);
				}
				r.push(`${He} can't wait to be impregnated and give birth again,`);
				if (birthDamage > 10) {
					r.push(`despite the complications,`);
				}
				slave.energy += numBeingBorn;
				slave.need -= numBeingBorn;
				if (slave.sexualFlaw === "breeder") {
					r.push(`since for ${him} it is the pinnacle of ${his} existence.`);
				} else {
					if (slave.fetish === "pregnancy") {
						r.push(`having had ${his}`);
						if (slave.fetishStrength <= 60) {
							r.push(App.UI.DOM.makeElement("span", `pregnancy fetish deepen from the experience.`, "lightcoral"));
							slave.fetishStrength += numBeingBorn;
						} else {
							r.push(App.UI.DOM.makeElement("span", `pregnancy fetish deepen into obsession.`, "lightcoral"));
							slave.sexualFlaw = "breeder";
							slave.fetishStrength = 100;
						}
					} else if (slave.fetish === Fetish.NONE || slave.fetishStrength <= 60) {
						r.push(App.UI.DOM.makeElement("span", `having found true pleasure in reproduction.`, "lightcoral"));
						slave.fetish = "pregnancy";
					}
				}
			}
			App.Events.addNode(p, r, "div");
		}
		/* this needs a tally of how many babies were lost due to underdevelopment instead of relying off a check */
		if (V.surgeryUpgrade !== 1 && numStillborn > 0) {
			App.UI.DOM.appendNewElement("div", p, `It's possible that`);
			r.push(App.UI.DOM.makeElement("span", `having advanced equipment`, "red"));
			r.push(`in the remote surgery could have prevented the loss of ${his} ${numStillborn} unborn ${(numStillborn > 1) ? `children` : `child`}.`);
		}
		el.append(p);
		/* ----- Postbirth reactions, mind ------------------------------- */
		if (slave.fetish !== Fetish.MINDBROKEN && slave.fuckdoll === 0) {
			r = [];
			if (numStillborn > 0) { // TODO: Here should be descriptions of reactions from losing some of babies, need tweak, only draft for now
				if (slave.sexualFlaw === "breeder") {
					r.push(`${He} is`);
					r.push(App.UI.DOM.makeElement("span", `filled with violent, all-consuming hatred`, "mediumorchid"));
					r.push(`at ${himself} for failing ${his} unborn and you for allowing this to happen.`);
					if (numStillborn > 4) {
						r.push(`The loss of so many children at once`);
						r.push(App.UI.DOM.makeElement("span", `shatters the distraught breeder's mind.`, "red"));
						applyMindbroken(slave);
					} else {
						r.push(`${He} cares little for what punishment awaits ${his} actions.`);
						slave.devotion -= 25 * numStillborn;
					}
				} else if (slave.devotion > 80) {
					r.push(`${He}`);
					r.push(App.UI.DOM.makeElement("span", `accepts with grief`, "mediumorchid"));
					r.push(`your right to use ${his} body as you see fit, even if it allow ${his} unborn to die in the process.`);
					slave.devotion -= 10;
				} else if (slave.devotion > 20) {
					r.push(`${He}`);
					r.push(App.UI.DOM.makeElement("span", `hates`, "mediumorchid"));
					r.push(`you for using ${his} body to bear children to the extent that it cost some their lives.`);
					slave.devotion -= 20;
				} else {
					r.push(`${He}`);
					r.push(App.UI.DOM.makeElement("span", `curses`, "mediumorchid"));
					r.push(`you for using ${him} as a breeder toy and forcing ${him} to go through such a doomed pregnancy.`);
					slave.devotion -= 30;
				}
			} else {
				if ((slave.devotion < 20) && (V.week - slave.weekAcquired - slave.pregWeek > 0)) {
					App.Events.addParagraph(el, r);
					r = [];
					r.push(`${He}`);
					r.push(App.UI.DOM.makeElement("span", `despises`, "mediumorchid"));
					r.push(`you for using ${him} as a breeder.`);
					slave.devotion -= 10;
				}
				if (slave.pregSource === -1) {
					if (slave.devotion <= 20 && slave.weekAcquired > 0) {
						r.push(`${He}`);
						r.push(App.UI.DOM.makeElement("span", `hates`, "mediumorchid"));
						r.push(`you for using ${his} body to bear your children.`);
						slave.devotion -= 10;
					} else if (slave.devotion > 50) {
						r.push(`${He}'s`);
						r.push(App.UI.DOM.makeElement("span", `so proud`, "hotpink"));
						r.push(`to have successfully carried children for you.`);
						slave.devotion += 3;
					}
				}
				if (humiliation === 1) {
					App.Events.addParagraph(el, r);
					r = [];
					r.push(`Giving birth in such a manner was completely humiliating,`);
					if (slave.fetish === "humiliation") {
						r.push(`and a complete turn on to ${him}. ${His} humiliation fetish`);
						r.push(App.UI.DOM.makeElement("span", `strengthens`, "lightcoral"));
						r.push(`as ${he} eagerly fantasizes about giving birth in public again.`);
						slave.fetishStrength += 4;
					} else if (slave.fetish === Fetish.NONE || slave.fetishStrength <= 60) {
						r.push(`and a curious experience to ${him}.`);
						if (random(1, 5) === 1) {
							r.push(App.UI.DOM.makeElement("span", `${He} has developed a humiliation fetish.`, "lightcoral"));
							slave.fetish = "humiliation";
						} else {
							r.push(`${He} hopes to never repeat it.`);
						}
					} else if (slave.devotion <= 20) {
						r.push(`and completely devastating to ${his} image of ${himself}. The experience`);
						r.push(App.UI.DOM.makeElement("span", `habituates ${him}`, "hotpink"));
						r.push(`to cruelties of slavery.`);
						slave.devotion += 5;
					} else {
						r.push(`and ${he} hopes to never undergo it again.`);
					}
				}
			}
			App.Events.addParagraph(el, r);
			/* ------ Social reactions--------------- */
			if (FutureSocieties.isActive('FSRestart')) {
				r = [];
				if (slave.breedingMark === 1 && V.propOutcome === 1 && (slave.pregSource === -1 || slave.pregSource === -6)) {
					r.push(`The ${societalElite}`);
					r.push(App.UI.DOM.makeElement("span", `are pleased`, "green"));
					r.push(`at the new additions to their class.`);
					V.failedElite -= (2 * numBeingBorn);
				} else if (V.eugenicsFullControl !== 1) {
					r.push(`The ${societalElite}`);
					r.push(App.UI.DOM.makeElement("span", `are disappointed`, "red"));
					r.push(`that you would allow subhuman filth to dirty the arcology under your watch. Society`);
					r.push(App.UI.DOM.makeElement("span", `frowns`, "red"));
					r.push(`on the unwelcome addition of more subhumans into the world.`);
					V.failedElite += (5 * numBeingBorn);
					repX(forceNeg(10 * numBeingBorn), "birth", slave);
				}
				App.Events.addParagraph(el, r);
			}
		}
		return el;
	}

	function destinationForBabies() {
		const el = document.createElement("p");
		let r;
		let cToIncubator = 0;
		let cToNursery = 0;
		let babyCost;
		let choices;
		let choice;
		let sendAll = false;
		for (const baby of babiesBeingBorn) {
			if (baby.reserve === "incubator" || V.DefaultBirthDestination === "the incubator") {
				cToIncubator++;
			} else if (baby.reserve === "nursery" || V.DefaultBirthDestination === "the nursery") {
				cToNursery++;
			}
		}
		if (["the incubator", "the nursery"].includes(V.DefaultBirthDestination)) {
			sendAll = true;
		}
		/* ----------------------- incubator/nursery adding subsection. There is support for broodmothers too. */
		if ((cToIncubator + cToNursery > 0) && numBeingBorn > 0) {
			// TODO: Do we need keep child checks?
			r = [];
			if (numBeingBorn > 1) {
				r.push(`Of ${his} ${numBeingBorn} ${children},`);
			} else {
				r.push(`${His} child`);
			}

			if (cToIncubator > 0) {
				if (numBeingBorn > 1) {
					if (numBeingBorn !== cToIncubator) {
						r.push(`${cToIncubator}`);
					} else {
						r.push(`all`);
					}
				}
				if (cToIncubator === 1) {
					r.push(`was`);
				} else {
					r.push(`were`);
				}
				r.push(`taken to ${V.incubator.name}`);
				if (cToNursery > 0) {
					r.push(`and`);
				}
			}
			if (cToNursery > 0) {
				if (numBeingBorn > 1) {
					if (numBeingBorn !== cToNursery) {
						r.push(`${cToNursery}`);
					} else {
						r.push(`all`);
					}
				}
				if (cToNursery === 1) {
					r.push(`was`);
				} else {
					r.push(`were`);
				}
				r.push(`taken to ${V.nurseryName}`);
			}
			r.push(r.pop() + `.`);
			if (cToIncubator + cToNursery > 0) {
				babiesBeingBorn = sendNewbornsToFacility(slave, babiesBeingBorn, sendAll);
			}
			numBeingBorn = babiesBeingBorn.length;

			if (numBeingBorn > 0 && !sendAll) {
				r.push(`After sending ${his} reserved ${children} to`);
				if (cToIncubator > 0 && cToNursery > 0) {
					r.push(`${V.incubator.name} and ${V.nurseryName},`);
				} else if (cToIncubator > 0) {
					r.push(`${V.incubator.name},`);
				} else {
					r.push(`${V.nurseryName},`);
				}
				r.push(`it's time to decide the fate of the ${(numBeingBorn > 0) ? `others` : `other`}.`);
			}

			App.Events.addParagraph(el, r);
		}
		/* ------------------------ Fate of other babies ---------------------------------------*/
		if (numBeingBorn > 0) {
			r = [];
			choices = document.createElement("p");
			choices.id = dispositionId;
			if (FutureSocieties.isActive('FSRestart') && slave.breedingMark === 1 && V.propOutcome === 1 && (slave.pregSource === -1 || slave.pregSource === -6)) {
				r.push(`${His} ${childrenAre} collected by the ${societalElite} to be raised into upstanding members of the new society.`);
			} else if (slave.breedingMark === 1 && V.propOutcome === 1 && (slave.pregSource === -1 || slave.pregSource === -6) && V.DefaultBirthDestination === "the market") {
				babyCost = random(2000, 4500);
				r.push(`${His} ${(numBeingBorn > 1) ? `babies were` : `baby was`} purchased by the ${societalElite} for`);
				r.push(
					App.UI.DOM.makeElement("span", `${cashFormat(numBeingBorn * (babyCost))}.`, "yellowgreen")
				);
				cashX(numBeingBorn * (babyCost), "babyTransfer");
			} else if (slave.pregSource === -9 && V.DefaultBirthDestination === "the market") {
				babyCost = random(1000, 2500);
				r.push(`${His} ${(numBeingBorn > 1) ? `babies were` : `baby was`} purchased by the Futanari Sisters for`);
				r.push(
					App.UI.DOM.makeElement("span", `${cashFormat(numBeingBorn * (babyCost))}.`, "yellowgreen")
				);
				cashX(numBeingBorn * (babyCost), "babyTransfer");
			} else if (V.DefaultBirthDestination === "individually decided fates") {
				r.push(`Unless you provide otherwise, the ${children} will be remanded to one of ${V.arcologies[0].name}'s slave orphanages.`);
				V.slaveOrphanageTotal += numBeingBorn; // Player may choose nothing. Assume that now, and reverse it later if needed.
				if (!slaveDead) {
					if (slave.fetish === Fetish.MINDBROKEN || slave.fuckdoll > 0) {
						r.push(`${slave.slaveName} shows no indication of an opinion on the matter.`);
					} else if (slave.devotion > 95) {
						r.push(`${slave.slaveName} worships you so completely that ${he} will not resent this.`);
					} else if (slave.devotion > 50) {
						r.push(`${slave.slaveName} is devoted to you, but ${he} will`);
						r.push(App.UI.DOM.makeElement("span", `struggle to accept this.`, "mediumorchid"));
						slave.devotion -= 2;
					} else if (slave.devotion > 20) {
						r.push(`${slave.slaveName} has accepted being a sex slave, but ${he} will`);
						r.push(App.UI.DOM.makeElement("span", `resent this intensely.`, "mediumorchid"));
						slave.devotion -= 3;
					} else {
						r.push(`${slave.slaveName} will of course`);
						r.push(App.UI.DOM.makeElement("span", `hate you for this.`, "mediumorchid"));
						slave.devotion -= 4;
					}
				}
				App.Events.addParagraph(choices, r);
				if (V.arcologies[0].FSRepopulationFocus > 40) {
					choice = document.createElement("div");
					choice.append(
						App.UI.DOM.link(
							"Send them to a breeder school",
							() => {
								V.slaveOrphanageTotal -= numBeingBorn;
								jQuery(`#${dispositionId}`).empty().append(breederResponse());
							}
						)
					);
					App.UI.DOM.appendNewElement("span", choice, ` Will cost a one-time ${cashFormat(50)}`, "note");
					choices.append(choice);
				}
				choice = document.createElement("div");
				choice.append(
					App.UI.DOM.link(
						"Send them to a citizen school",
						() => {
							V.slaveOrphanageTotal -= numBeingBorn;
							jQuery(`#${dispositionId}`).empty().append(citizenSchoolResponse());
						}
					)
				);
				App.UI.DOM.appendNewElement("span", choice, ` Will cost ${cashFormat(100)} weekly`, "note");
				choices.append(choice);
				if (slave.breedingMark === 1 && (slave.pregSource === -1 || slave.pregSource === -6) && V.propOutcome === 1) {
					choice = document.createElement("div");
					choice.append(
						App.UI.DOM.link(
							`Give them to the ${societalElite}`,
							() => {
								V.slaveOrphanageTotal -= numBeingBorn;
								jQuery(`#${dispositionId}`).empty().append(eliteResponse());
							}
						)
					);
					choices.append(choice);
				}
				if (slave.pregSource === -9) {
					choice = document.createElement("div");
					choice.append(
						App.UI.DOM.link(
							"Give them to the Futanari Sisters",
							() => {
								V.slaveOrphanageTotal -= numBeingBorn;
								jQuery(`#${dispositionId}`).empty().append(futaResponse());
							}
						)
					);
					choices.append(choice);
				}
				choice = document.createElement("div");
				choice.append(
					App.UI.DOM.link(
						"Have them raised privately",
						() => {
							V.slaveOrphanageTotal -= numBeingBorn;
							jQuery(`#${dispositionId}`).empty().append(privatelyResponse());
						}
					)
				);
				App.UI.DOM.appendNewElement("span", choice, ` Will cost ${cashFormat(500)} weekly`, "note");
				choices.append(choice);
				if (V.policies.cash4Babies === 1) {
					if (slave.prestige > 1 || slave.porn.prestige > 2) {
						choice = document.createElement("div");
						choice.append(
							App.UI.DOM.link(
								"Send them to auction",
								() => {
									V.slaveOrphanageTotal -= numBeingBorn;
									jQuery(`#${dispositionId}`).empty().append(auctionResponse());
								}
							)
						);
						choices.append(choice);
					} else {
						choice = document.createElement("div");
						choice.append(
							App.UI.DOM.link(
								"Sell them anyway",
								() => {
									V.slaveOrphanageTotal -= numBeingBorn;
									jQuery(`#${dispositionId}`).empty().append(auctionResponse());
								}
							)
						);
						choices.append(choice);
					}
				}
			} else {
				switch (V.DefaultBirthDestination) {
					case "an orphanage":
						r.push(`${slave.slaveName}'s ${childrenWere} sent to one of ${V.arcologies[0].name}'s slave orphanages.`);
						r.push(`${slave.slaveName}`);
						if (!slaveDead) {
							if (slave.fetish === Fetish.MINDBROKEN || slave.fuckdoll > 0) {
								r.push(`shows no indication of an opinion on the matter.`);
							} else if (slave.devotion > 95) {
								r.push(`worships you so completely that ${he} will not resent this.`);
							} else if (slave.devotion > 50) {
								r.push(`is devoted to you, but ${he} will`);
								r.push(App.UI.DOM.makeElement("span", `struggle to accept this.`, "mediumorchid"));
								slave.devotion -= 2;
							} else if (slave.devotion > 20) {
								r.push(`has accepted being a sex slave, but ${he} will`);
								r.push(App.UI.DOM.makeElement("span", `resent this intensely.`, "mediumorchid"));
								slave.devotion -= 3;
							} else {
								r.push(`will of course`);
								r.push(App.UI.DOM.makeElement("span", `hate you for this.`, "mediumorchid"));
								slave.devotion -= 4;
							}
						}
						V.slaveOrphanageTotal += numBeingBorn;
						break;
					case "a citizen school":
						r.push(`${slave.slaveName}'s ${childrenWere} sent to a citizen school.`);
						r.push(`${slave.slaveName}`);
						if (!slaveDead) {
							if (slave.fetish === Fetish.MINDBROKEN || slave.fuckdoll > 0) {
								r.push(`fails to acknowledge this.`);
							} else if (slave.devotion > 95) {
								r.push(`loves you already, but ${he}'ll`);
								r.push(App.UI.DOM.makeElement("span", `love you even more`, "hotpink"));
								r.push(`for this.`);
								slave.devotion += 4;
							} else if (slave.devotion > 50) {
								r.push(`knows about these and will be`);
								r.push(App.UI.DOM.makeElement("span", `overjoyed.`, "hotpink"));
								r.push(`${He} will miss ${his} ${children}, but ${he} expected that.`);
								slave.devotion += 4;
							} else if (slave.devotion > 20) {
								r.push(`will naturally miss ${his} ${children}, but will`);
								r.push(App.UI.DOM.makeElement("span", `take comfort`, "hotpink"));
								r.push(`in the hope that ${his} offspring will have a better life.`);
								slave.devotion += 4;
							} else {
								r.push(`will naturally retain some resentment over being separated from ${his} ${children}, but this should be balanced by hope that ${his} offspring will have a better life.`);
								slave.devotion += 4;
							}
						}
						V.citizenOrphanageTotal += numBeingBorn;
						break;
					case "a private school":
						r.push(privatelyResponse());
						break;
					case "breeder schools":
						r.push(breederResponse());
						break;
					case "the market":
						r.push(auctionResponse());
						break;
					default:
						r.push(`${His} ${(numBeingBorn > 1) ? `babies were` : `baby was`} sent to ${V.DefaultBirthDestination}.`);
				}

				App.Events.addNode(choices, r);
			}
			el.append(choices);
		}

		function breederResponse() {
			const el = new DocumentFragment();
			const r = [];
			r.push(`The ${childrenAre} sent to one of ${V.arcologies[0].name}'s future minded schools, to be administered fertility and virility treatments as well as be brought up to take pride in reproduction.`);
			if (burstCheck(slave)) {
				r.push(`Hopefully they will be trained there to not suffer the same fate.`);
			} else if (slave.fetish === Fetish.MINDBROKEN || slave.fuckdoll > 0) {
				r.push(`${slave.slaveName} has few thoughts about the matter.`);
			} else if (slave.sexualFlaw === "breeder") {
				r.push(slave.slaveName);
				r.push(App.UI.DOM.makeElement("span", ` almost orgasms`, "hotpink"));
				if (slave.geneticQuirks.uterineHypersensitivity === 2) {
					r.push(`again`);
				}
				r.push(`when ${he} imagines ${his} ${children} being raised into`);
				if (numBeingBorn === 1) {
					r.push(`a breeding-obsessed baby-factory,`);
				} else {
					r.push(`breeding-obsessed baby-factories,`);
				}
				r.push(`just like ${himself}.`);
				slave.devotion += 5;
			} else if (slave.devotion > 95) {
				r.push(`${slave.slaveName} loves you already, but ${he}'ll`);
				r.push(App.UI.DOM.makeElement("span", `love you even more`, "hotpink"));
				r.push(`for this. ${He} can't wait to see ${his} ${children} proudly furthering your cause.`);
				slave.devotion += 4;
			} else if (slave.devotion > 50) {
				r.push(`${slave.slaveName} heard about these and will be`);
				r.push(App.UI.DOM.makeElement("span", `happy that ${his} ${children} will have a purpose in your society other than slavery.`, "hotpink"));
				r.push(`${He} will miss ${his} ${children}, but ${he} expected that.`);
				slave.devotion += 4;
			} else if (slave.devotion > 20) {
				r.push(`${slave.slaveName} will naturally miss ${his} ${children}, but ${his} will is broken enough to hope that ${his} offspring will have a better life, or at least an enjoyable one.`);
			} else {
				r.push(`${slave.slaveName} will of course`);
				r.push(App.UI.DOM.makeElement("span", `hate you for this.`, "mediumorchid"));
				r.push(`The mere thought of ${his}`);
				if (V.minimumSlaveAge > V.fertilityAge) {
					r.push(`${V.minimumSlaveAge}`);
				} else {
					r.push(`${V.fertilityAge}`);
				}
				r.push(`year old ${(numBeingBorn > 1) ? `daughters` : `daughter`} swollen with life, and proud of it, fills ${him} with`);
				r.push(App.UI.DOM.makeElement("span", `disdain.`, "gold"));
				slave.devotion -= 4;
				slave.trust -= 4;
			}
			V.breederOrphanageTotal += numBeingBorn;
			App.Events.addNode(el, r);
			return el;
		}

		function citizenSchoolResponse() {
			const r = [];
			const el = new DocumentFragment();
			r.push(`The ${childrenAre} sent to one of ${V.arcologies[0].name}'s citizen schools, to be brought up coequal with the arcology's other young people.`);
			if (!slaveDead) {
				if (slave.fetish === Fetish.MINDBROKEN || slave.fuckdoll > 0) {
					r.push(`${slave.slaveName} fails to acknowledge this.`);
				} else if (slave.devotion > 95) {
					r.push(`${slave.slaveName} loves you already, but ${he}'ll`);
					r.push(App.UI.DOM.makeElement("span", `love you even more`, "hotpink"));
					r.push(`for this.`);
					slave.devotion += 4;
				} else if (slave.devotion > 50) {
					r.push(`${slave.slaveName} knows about these and will be`);
					r.push(App.UI.DOM.makeElement("span", `overjoyed.`, "hotpink"));
					r.push(`${He} will miss ${his} ${children}, but ${he} expected that.`);
					slave.devotion += 4;
				} else if (slave.devotion > 20) {
					r.push(`${slave.slaveName} will naturally miss ${his} ${children}, but will`);
					r.push(App.UI.DOM.makeElement("span", `take comfort`, "hotpink"));
					r.push(`in the hope that ${his} offspring will have a better life.`);
					slave.devotion += 4;
				} else {
					r.push(`${slave.slaveName} will naturally retain some resentment over being separated from ${his} ${children}, but this should be balanced by hope that ${his} offspring will have a better life.`);
					slave.devotion += 4;
				}
			}
			V.citizenOrphanageTotal += numBeingBorn;
			App.Events.addNode(el, r);

			return el;
		}

		function eliteResponse() {
			const r = [];
			const el = new DocumentFragment();
			r.push(`The ${childrenAre} sent to be raised by the ${societalElite}, to be brought up as`);
			if (numBeingBorn > 1) {
				r.push(`future members`);
			} else {
				r.push(`a future member`);
			}
			r.push(`of their vision of the world.`);
			if (!slaveDead) {
				if (slave.fetish === Fetish.MINDBROKEN || slave.fuckdoll > 0) {
					r.push(`${slave.slaveName} does not give any hint of a response.`);
				} else if (slave.devotion > 95) {
					r.push(`${slave.slaveName} will`);
					r.push(App.UI.DOM.makeElement("span", `worship you utterly`, "hotpink"));
					r.push(`for this.`);
					slave.devotion += 6;
				} else if (slave.devotion > 50) {
					r.push(`${slave.slaveName} understands that this is the best possible outcome for the offspring of a slave, and will be`);
					r.push(App.UI.DOM.makeElement("span", `overjoyed.`, "hotpink"));
					slave.devotion += 6;
				} else if (slave.devotion > 20) {
					r.push(`${slave.slaveName} will miss ${his} ${children}, but will be`);
					r.push(App.UI.DOM.makeElement("span", `very grateful,`, "hotpink"));
					r.push(`since ${he}'ll understand this is the best possible outcome for a slave mother.`);
					slave.devotion += 6;
				} else {
					r.push(`${slave.slaveName} will resent being separated from ${his} ${children}, but`);
					r.push(App.UI.DOM.makeElement("span", `should understand and be grateful`, "hotpink"));
					r.push(`that this is the best possible outcome here.`);
					slave.devotion += 6;
				}
			}
			V.nextButton = "Back";
			App.Utils.updateUserButton();
			App.Events.addNode(el, r);
			return el;
		}

		function futaResponse() {
			const r = [];
			const el = new DocumentFragment();
			r.push(`The ${childrenAre} handed off to be raised by their father, the Futanari Sisters.`);
			if (burstCheck(slave)) {
				r.push(`You recommend they take it easy for a while before any more burst into kids.`);
			} else if (slave.fetish === Fetish.MINDBROKEN || slave.fuckdoll > 0) {
				r.push(`${slave.slaveName} has few thoughts about the matter.`);
			} else {
				r.push(`${slave.slaveName} is overjoyed that ${his} ${children} will follow in`);
				if (numBeingBorn > 1) {
					r.push(`their`);
				} else {
					r.push(`its`);
				}
				r.push(`parent's footsteps.`);
				slave.devotion += 4;
			}

			App.Events.addNode(el, r);
			return el;
		}

		function privatelyResponse() {
			const r = [];
			const el = new DocumentFragment();
			r.push(`The ${childrenAre} sent to be privately raised, to be brought up as`);
			if (numBeingBorn > 1) {
				r.push(`future high class citizens.`);
			} else {
				r.push(`a future high class citizen.`);
			}
			if (!slaveDead) {
				if (slave.fetish === Fetish.MINDBROKEN || slave.fuckdoll > 0) {
					r.push(`${slave.slaveName} does not give any hint of a response.`);
				} else if (slave.devotion > 95) {
					r.push(`${slave.slaveName} will`);
					r.push(App.UI.DOM.makeElement("span", `worship you utterly`, "hotpink"));
					r.push(`for this.`);
					slave.devotion += 6;
				} else if (slave.devotion > 50) {
					r.push(`${slave.slaveName} understands that this is the best possible outcome for the offspring of slave, and will be`);
					r.push(App.UI.DOM.makeElement("span", `overjoyed.`, "hotpink"));
					slave.devotion += 6;
				} else if (slave.devotion > 20) {
					r.push(`${slave.slaveName} will miss ${his} ${children}, but will be`);
					r.push(App.UI.DOM.makeElement("span", `very grateful,`, "hotpink"));
					r.push(`since ${he}'ll understand this is the best possible outcome for a slave mother.`);
					slave.devotion += 6;
				} else {
					r.push(`${slave.slaveName} will resent being separated from ${his} ${children}, but`);
					r.push(App.UI.DOM.makeElement("span", `should understand and be grateful`, "hotpink"));
					r.push(`that this is the best possible outcome here.`);
					slave.devotion += 6;
				}
			}
			r.push(`The ${children} will be raised privately, with expert care and tutoring, an expensive proposition.`);
			V.privateOrphanageTotal += numBeingBorn;
			App.Events.addNode(el, r);
			return el;
		}

		function auctionResponse() {
			const r = [];
			const el = new DocumentFragment();
			babyCost = random(-12, 100);
			if (slave.prematureBirth === 1) {
				babyCost = random(-32, 40);
			}
			r.push(`${His} ${(numBeingBorn > 1) ? `babies were` : `baby was`} sold for`);
			if (numBeingBorn > 1) {
				r.push(`a total of`);
			}
			if (slave.prematureBirth === 1) {
				r.push(App.UI.DOM.makeElement("span", `${cashFormat(numBeingBorn * (50 + babyCost))},`, "yellowgreen"));
				r.push(`a low price, due to the added costs of caring for them.`);
			} else {
				r.push(App.UI.DOM.makeElement("span", `${cashFormat(numBeingBorn * (50 + babyCost))}.`, "yellowgreen"));
			}
			if (!slaveDead) {
				if (slave.fetish === Fetish.MINDBROKEN || slave.fuckdoll > 0) {
					r.push(`${slave.slaveName} lacks the capacity to understand what you've done.`);
				} else if (slave.devotion > 95) {
					r.push(`${slave.slaveName} adheres to your thoughts so strongly that even though you backed out of caring for ${his} ${children}, ${he} still truly believes you are doing ${him} an honor.`);
				} else if (slave.devotion > 50) {
					r.push(`${slave.slaveName} is`);
					r.push(App.UI.DOM.makeElement("span", `deeply hurt`, "mediumorchid"));
					r.push(`by your sudden decision to sell ${his} ${children} instead of having`);
					if (numBeingBorn > 1) {
						r.push(`them`);
					} else {
						r.push(`it`);
					}
					r.push(`cared for. ${His} trust in your words`);
					r.push(App.UI.DOM.makeElement("span", `wavers`, "gold"));
					r.push(`as ${he} thinks of ${his} ${children}'s future.`);
					slave.trust -= 5;
					slave.devotion -= 5;
				} else if (slave.devotion > 20) {
					r.push(`${slave.slaveName} is`);
					r.push(App.UI.DOM.makeElement("span", `devastated`, "mediumorchid"));
					r.push(`by your sudden decision to sell ${his} ${children} instead of having`);
					if (numBeingBorn > 1) {
						r.push(`them`);
					} else {
						r.push(`it`);
					}
					r.push(`cared for. ${His} mind struggles to comprehend`);
					r.push(App.UI.DOM.makeElement("span", `such betrayal.`, "gold"));
					slave.trust -= 10;
					slave.devotion -= 10;
				} else {
					r.push(`For a moment, ${slave.slaveName} thought ${he} saw a glimmer of good in you;`);
					r.push(App.UI.DOM.makeElement("span", `${he} was clearly wrong.`, "mediumorchid"));
					r.push(`${His} mind struggles to comprehend`);
					r.push(App.UI.DOM.makeElement("span", `why ${he} could ever even think of trusting such a person.`, "gold"));
					slave.trust -= 30;
					slave.devotion -= 30;
				}
			}
			cashX(numBeingBorn * (50 + babyCost), "babyTransfer");
			App.Events.addNode(el, r);
			return el;
		}

		return el;
	}

	function birthPostpartum() {
		const el = document.createElement("p");
		numBeingBorn = babiesBeingBorn.length;
		if (birthStorm) {
			WombFlush(slave);
			slave.broodmother = 0;
		} else if (slave.broodmother > 0) {
			slave.preg = WombMaxPreg(slave);
			if (slave.broodmotherCountDown > 0 && slave.womb.length > 0) { // TODO: do we really finished?
				slave.broodmotherCountDown = 38 - WombMinPreg(slave); // age of most new (small) fetus used to correct guessing of remained time.
				slave.preg = 0.1;
				slave.pregType = 0;
			}
		} else if (slave.womb.length > 0) { // Not broodmother, but still has babies, partial birth case.
			slave.preg = WombMaxPreg(slave); // now we use most advanced remained fetus as base.
			slave.pregSource = slave.womb[0].fatherID; // in such case it's good chance that there is different father also.
		} else {
			if (!assignmentVisible(slave) && rulesDemandContraceptives(slave, V.defaultRules)) {
				slave.preg = -1;
			} else {
				slave.preg = 0;
			}
			slave.pregType = 0;
			slave.pregSource = 0;
			slave.pregKnown = 0;
			if (slave.geneticQuirks.fertility + slave.geneticQuirks.hyperFertility >= 4) {
				slave.pregWeek = -2;
			} else if (slave.geneticQuirks.hyperFertility > 1) {
				slave.pregWeek = -3;
			} else {
				slave.pregWeek = -4;
			}
		}
		SetBellySize(slave);
		if (slave.birthsTat > -1) {
			slave.birthsTat++;
			el.append(`The temporary tattoo of a child has been replaced with ${his} ${ordinalSuffix(slave.birthsTat)} permanent infant.`);
			cashX(forceNeg(V.modCost), "slaveMod", slave);
		}
		return el;
	}

	function birthCritical() {
		const el = document.createElement("p");
		const r = [];
		const wl = slave.womb.length;
		numBeingBorn = babiesBeingBorn.length;
		if (slave.health.health <= -100 || slaveDead) {
			if (!slaveDead) {
				r.push(`While attempting to recover, ${slave.slaveName}`);
				r.push(App.UI.DOM.makeElement("span", `passes away`, "red"));
				r.push(`from complications.`);
			}

			r.push(`${His} body was fatally damaged during childbirth.`);

			const fathers = [];
			for (const baby of slave.womb) {
				if (baby.fatherID === 0) {
					fathers.push("an unknown father");
				} else if (baby.fatherID === -1) {
					if (V.PC.dick !== 0) {
						fathers.push("your magnificent dick");
					} else {
						fathers.push("your powerful sperm");
					}
				} else if (baby.fatherID === -2) {
					fathers.push("your arcology's eager citizens");
				} else if (baby.fatherID === -3) {
					fathers.push("your former Master's potent seed");
				} else if (baby.fatherID === -4) {
					fathers.push("another arcology owner");
				} else if (baby.fatherID === -5) {
					fathers.push("one of your clientele");
				} else if (baby.fatherID === -6) {
					fathers.push(`the ${societalElite}`);
				} else if (baby.fatherID === -7) {
					fathers.push("your own design");
				} else if (baby.fatherID === -8) {
					fathers.push("one of your animals");
				} else if (baby.fatherID === -9) {
					fathers.push("a Futanari Sister");
				} else if (baby.fatherID === -10) {
					fathers.push("a rapist");
				} else {
					const babyDaddy = findFather(baby.fatherID);
					if (babyDaddy) {
						if (babyDaddy.ID === slave.ID) {
							fathers.push(`${his} own sperm`);
						} else if (babyDaddy.dick === 0) {
							fathers.push(`${babyDaddy.slaveName}'s potent seed`);
						} else {
							fathers.push(`${babyDaddy.slaveName}'s virile cock and balls`);
						}
					} else {
						fathers.push("an unknown father");
					}
				}
			}
			const fathersReduced = removeDuplicates(fathers);
			if (wl > 0) {
				if (wl === 1) {
					r.push(`One baby`);
				} else {
					r.push(`${wl} babies`);
				}
				r.push(`created by ${toSentence(fathersReduced)} died with ${him}, too young to survive.`);
				r.push(deadBabiesResponse(wl));
			}

			if (numBeingBorn > 0) { // this needs to include ALL children born from this batch, incubated ones included.
				r.push(`But ${his}`);
				if (wl > 0) {
					r.push(`other`);
				}
				r.push(`offspring`);
				if (numBeingBorn > 1) {
					r.push(`are`);
				} else {
					r.push(`is`);
				}
				r.push(`healthy, so ${his} legacy will carry on.`);
			}

			App.Events.addNode(el, r);
			el.append(horrifiedSlaves(slave));
			slaveDead = 1;
		} else {
			slave.induce = 0;
		}
		return el;
	}

	function implantImplant() {
		const el = document.createElement("div");
		el.id = "bir";
		App.UI.DOM.appendNewElement("div", el, `Since ${he} is already in surgery and ${his} body already stretched, it would be possible to preserve ${his} pregnant appearance via fillable implant.`, "note");

		el.append(
			App.UI.DOM.link(
				"Do it.",
				() => {
					const result = document.createElement("div");
					const r = [];
					surgeryDamage(slave, 10);
					result.append(`Installation of a belly implant is relatively simple. Using the fact that ${his} body and internal organs have already adapted to pregnancy, it's possible to greatly expand the initial size of the implant. ${He} will still look pregnant post surgery and recovery.`);
					if (slave.devotion > 50) {
						r.push(`${He} leaves the surgery with ${his} belly still very gravid, and as such, knows you put something into ${his} womb replacing ${his} prior natural pregnancy. ${He} is`);
						r.push(App.UI.DOM.makeElement("span", `curious`, "hotpink"));
						r.push(`about the details of the implant, and eagerly awaits to see the end result.`);
						slave.devotion += 4;
					} else if (slave.devotion >= -20) {
						r.push(`${He} leaves the surgery with ${his} belly still very gravid, and as such, knows you put something into ${his} womb replacing ${his} prior natural pregnancy. ${He} understands the realities of ${his} life as a slave, but ${he} is still surprised at what now resides in ${his} womb. ${He} is`);
						r.push(App.UI.DOM.makeElement("span", `sensibly fearful`, "gold"));
						r.push(`of your total power over ${his} body.`);
						slave.trust -= 5;
					} else {
						r.push(`${He} leaves the surgery with ${his} belly still very gravid, and as such, knows you put something into ${his} womb replacing ${his} prior natural pregnancy. ${He} does not understand the realities of ${his} life as a slave at a core level, so ${he}'s`);
						r.push(App.UI.DOM.makeElement("span", `terrified and angry`, "mediumorchid"));
						r.push(`at the potential that ${he}'s been turned in some sort of freak. Even after what has been implanted into ${his} womb is explained to ${him}, ${he} is no less defiant; though ${he} is relieved that procedure is reversible and there is no truly permanent damage. ${He} is`);
						r.push(App.UI.DOM.makeElement("span", `sensibly fearful`, "gold"));
						r.push(`of your total power over ${his} body.`);
						slave.trust -= 5;
						slave.devotion -= 5;
					}
					slave.bellyImplant = Math.floor(beforeSize);
					if (slave.bellyImplant > 800000 && V.arcologies[0].FSTransformationFetishistResearch > 0) {
						slave.bellyImplant = 800000;
					} else if (slave.bellyImplant > 130000 && V.arcologies[0].FSTransformationFetishistResearch < 1) {
						slave.bellyImplant = 130000;
					}
					slave.preg = -2;
					SetBellySize(slave);
					App.Events.addNode(result, r);
					jQuery(`#${dispositionId}`).empty().append(result);
				}
			)
		);

		return el;
	}

	function scarring() {
		cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
		surgeryDamage(slave, 10);
		App.Medicine.Modification.removeScar(slave, "belly", "c-section");
		return ``;
	}

	function broodmotherBirth() {
		const el = document.createElement("p");
		const birthScene = random(1, 100);
		let r = [];
		const tempSub = getSlave(slave.subTarget);
		const HGL = App.Entity.facilities.headGirlSuite.employeesIDs().size;
		let his2;
		let He2;
		let he2;
		let him2;
		const {HeU, hisU, heU, himU, himselfU, girlU} = getNonlocalPronouns(V.seeDicks).appendSuffix('U');
		const children = slave.pregType > 1 ? `children` : `child`;
		const childrenAre = slave.pregType > 1 ? `children are` : `child is`;
		const UH = (slave.geneticQuirks.uterineHypersensitivity === 2) ? `, convulsing with orgasms in the process` : ``;
		const firstText = (slave.counter.birthsTotal === 0) ? `${his} first` : `this week's`;

		if (random(1, 2) === 1) {
			// at assignment else in halls/etc

			switch (slave.assignment) {
				case Job.REST:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} is helped back to ${his} bed and stripped before slipping into it. Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and ${he} is encouraged to keep resting.`);
								if (hasAnyArms(slave)) {
									r.push(`${He} runs ${his} ${hands} across the still huge dome of ${his} middle; to`);
								} else {
									r.push(`To`);
								}
								r.push(`${him}, gravidity and birth is nothing out of the ordinary.`);
							} else {
								r.push(`${slave.slaveName} is awoken from ${his} rest by a strong contraction. ${He} rolls over and begins to fall back to sleep as another contraction wracks ${his} body.`);
								r.push(clothingBirth());
								r.push(`${He} fishes around under ${his} still huge dome of a stomach searching for ${his} newborn. Once ${he} finds it, ${he} draws ${firstText} baby to ${his} breast and resumes resting.`);
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} is helped back to ${his} bed and stripped before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${firstText} baby${UH}. ${His} child is promptly taken and ${he} is encouraged to keep resting. ${He} rolls over${(hasAnyArms(slave)) ? `, cradling ${his} heavily rounded middle,` : ``} and dozes off.`);
							} else {
								r.push(`${slave.slaveName} is awoken from ${his} rest by a moist sensation followed by a contraction. ${He} rolls over and clutches ${his} gravid belly as another contraction wracks ${his} body.`);
								r.push(clothingBirth());
								r.push(`${He} struggles to collect ${firstText} child and places them in the cradle readied for ${him}. ${He} is helped to the shower as your servants clean up and remove ${his} child.`);
							}
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} returns to ${his} bed and strips before slipping into it. Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and ${he} is encouraged to keep resting.`);
								if (hasAnyArms(slave)) {
									r.push(`${He} runs ${his} ${hands} across the still huge dome of ${his} middle; to`);
								} else {
									r.push(`To`);
								}
								r.push(`${him}, gravidity and birth is nothing out of the ordinary.`);
							} else {
								r.push(`${slave.slaveName} is awoken from ${his} rest by a strong contraction. ${He} rolls over and begins to fall back to sleep as another contraction wracks ${his} body.`);
								r.push(clothingBirth());
								r.push(`${He} fishes around under ${his} still huge dome of a stomach searching for ${his} newborn. Once ${he} finds it, ${he} draws ${firstText} baby to ${his} breast and resumes resting.`);
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} returns to ${his} bed and strips before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${firstText} baby${UH}. ${His} child is promptly taken and ${he} is encouraged to keep resting. ${He} rolls over${(hasAnyArms(slave)) ? `, cradling ${his} heavily rounded middle,` : ``} and dozes off.`);
							} else {
								r.push(`${slave.slaveName} is awoken from ${his} rest by a moist sensation followed by a contraction. ${He} rolls over and clutches ${his} gravid belly as another contraction wracks ${his} body.`);
								r.push(clothingBirth());
								r.push(`${He} struggles to collect ${firstText} child and places them in the cradle readied for ${him}. ${He} hefts ${his} still very gravid body out of bed to take a shower as your servants clean up and remove ${his} child.`);
							}
						}
					}
					break;
				case Job.SUBORDINATE:
					if (tempSub) {
						({his2, he2} = getPronouns(tempSub).appendSuffix("2"));
					}
					if (slave.fetish === Fetish.MINDBROKEN) {
						if (slave.subTarget === 0) {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} returns to ${his} bed and strips before slipping into it. Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and ${he} rests for a short while before returning to your waiting slaves.`);
							} else {
								r.push(`While servicing your other slaves, ${slave.slaveName}'s water breaks, though it does nothing to deter ${him} from ${his} task.`);
								r.push(clothingBirth());
								r.push(`No sooner than ${firstText} baby is born, a cock is shoved into ${his} gaping, still very gravid`);
								if (slave.mpreg === 1) {
									r.push(`asshole`);
								} else {
									r.push(`pussy`);
								}
								r.push(`as ${he} draws ${his} child to ${his} breast.`);
							}
						} else if (slave.subTarget === -1) {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} returns to ${his} bed and strips before slipping into it. Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and ${he} rests for a short while before returning to your waiting slaves.`);
							} else if (slave.career === "a breeding bull") {
								r.push(`While fucking another slave pregnant, ${slave.slaveName}'s water breaks, though it does nothing to deter ${him} from ${his} task. Even as the slave struggles to escape from beneath ${his} laboring body and ${firstText} baby stretches ${him} painfully wide, ${he} keeps on fucking. ${He} plants ${his} seed with the birth of ${his} child.`);
							} else {
								r.push(`While impregnating a mother-to-be, ${slave.slaveName}'s water breaks, though it does nothing to deter the slave from taking ${his} seed. Only after ${he} cums is ${he} allowed to draw ${firstText} child to ${his} breast.`);
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} is lead by ${tempSub.slaveName} to a private room so that ${he2} may`);
								if (canSee(tempSub)) {
									r.push(`watch.`);
								} else {
									r.push(`be present.`);
								}
								r.push(`Instinctively ${he} begins to push out ${firstText} baby, indifferent to ${his} watching audience. ${His} child is promptly taken and ${tempSub.slaveName} eagerly descends upon ${his} defenseless and still very gravid body.`);
							} else {
								r.push(`While servicing ${tempSub.slaveName}, ${slave.slaveName}'s water breaks, though it does nothing to deter ${him} from ${his} task.`);
								r.push(clothingBirth());
								r.push(`No sooner than ${firstText} baby is born does ${he} go back to pleasuring ${his} dom.`);
							}
						}
					} else {
						if (slave.subTarget === 0) {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} returns to ${his} bed and strips before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${firstText} baby${UH}. ${His} child is promptly taken and ${he} rests for a short while before returning to your waiting slaves.`);
							} else {
								r.push(`While servicing your other slaves, ${slave.slaveName}'s water breaks, causing ${him} to immediately try to break off. However, a hand quickly hooks ${his} gravid bulk and ${he} is pulled back into another slave's crotch.`);
								humiliation = 1;
								r.push(clothingBirth());
								r.push(`${He} is allowed a moment to prepare ${firstText} child to be sent off before returning to pleasuring your other slaves.`);
							}
						} else if (slave.subTarget === -1) {
							if (slave.career === "a breeding bull") {
								r.push(`While fucking another slave pregnant, ${slave.slaveName}'s water breaks, though it does not deter ${him} from ${his} task. It's a little difficult to fuck while in the throes of birth, but ${he} carries out ${his} job admirably, planting ${his} seed with the birth of ${firstText} child.`);
							} else {
								r.push(`While impregnating a mother-to-be, ${slave.slaveName}'s water breaks, forcing ${him} to decouple with the slave.`);
								if (canAchieveErection(slave)) {
									r.push(`They get quite the show as they watch ${his} rock-hard dick repeatedly jet cum from the stimulation of pushing out ${his} baby.`);
								} else {
									r.push(`They get quite the show as they watch ${him} spurt cum while pushing out ${his} baby.`);
								}
								humiliation = 1;
								r.push(`${He} is allowed a moment to prepare ${firstText} child to be sent off before returning to properly inseminate the waiting slave.`);
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} is taken by ${tempSub.slaveName} to a private room so that ${he2} may`);
								if (canSee(tempSub)) {
									r.push(`watch.`);
								} else {
									r.push(`be present.`);
								}
								r.push(`Reluctantly, ${he} begins to push out ${firstText} baby, fully aware of ${tempSub.slaveName}'s ${(tempSub.fetish === "pregnancy") ? `hungry gaze` : `amused gaze`}${(slave.geneticQuirks.uterineHypersensitivity === 2) ? `, but is quickly overwhelmed by the pleasure from ${his} orgasmic birth` : ``}. ${His} child is promptly taken and ${tempSub.slaveName} eagerly descends upon ${his} exhausted and still very gravid body.`);
								humiliation = 1;
							} else {
								r.push(`While servicing ${tempSub.slaveName}, ${slave.slaveName}'s water breaks, causing ${him} to immediately try to break off. ${His} dom eagerly watches ${his2} gravid sub's ordeal.`);
								humiliation = 1;
								r.push(clothingBirth());
								r.push(`${tempSub.slaveName} collects the newborn child to be sent off before returning, caressing the swell of ${his} still huge belly and planting ${his2} crotch directly onto ${his2} exhausted sub's face.`);
							}
						}
					}

					break;
				case Job.WHORE:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} is helped back to ${his} bed and stripped before slipping into it. Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and ${he} rests awhile before returning to ${his} work as a pregnant whore.`);
							} else {
								r.push(`While attempting to attract customers with ${his} gravid body, ${slave.slaveName}'s water breaks.`);
								r.push(clothingBirth());
								r.push(`${He} struggles to bring ${firstText} child to ${his} breast as ${he} resumes whoring, oblivious to the free show ${he} just gave ${his} customers.`);
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} is helped back to ${his} bed and stripped before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${firstText} baby${UH}. ${His} child is promptly taken and ${he} rests awhile before returning to ${his} work as a pregnant whore.`);
							} else {
								r.push(`While attempting to attract customers with ${his} gravid body, ${slave.slaveName}'s water breaks, soaking ${him}. ${He} attempts to get someplace safe to give birth but finds it impossible.`);
								humiliation = 1;
								r.push(clothingBirth());
								r.push(`${He} lies on the ground, exhausted and covered in sperm from the circle of men watching ${him}, until ${he} recovers enough to heft ${his} still very gravid body to its feet and collect ${firstText} child to be sent off.`);
							}
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} returns to ${his} bed and strips before slipping into it. Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and ${he} rests awhile before returning to ${his} work as a pregnant whore.`);
							} else {
								r.push(`While attempting to attract customers with ${his} gravid body, ${slave.slaveName}'s water breaks.`);
								r.push(clothingBirth());
								r.push(`${He} struggles to bring ${firstText} child to ${his} breast as ${he} resumes whoring, oblivious to the free show ${he} just gave ${his} customers.`);
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} returns to ${his} bed and strips before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${firstText} baby${UH}. ${His} child is promptly taken and ${he} rests awhile before returning to ${his} work as a pregnant whore.`);
							} else {
								r.push(`While attempting to attract customers with ${his} gravid body, ${slave.slaveName}'s water breaks, soaking ${him}. ${He} attempts to get someplace safe to give birth but finds ${his} path blocked by rowdy johns.`);
								humiliation = 1;
								r.push(clothingBirth());
								r.push(`${He} lies on the ground, exhausted and covered in sperm from the circle of men watching ${him}, until ${he} recovers enough to push ${his} still very gravid body to its feet and collect ${firstText} child to be sent off.`);
							}
						}
					}
					break;

				case Job.PUBLIC:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} is helped back to ${his} bed and stripped before slipping into it. Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and ${he} rests awhile before returning to sharing ${his} gravid body with the public.`);
							} else {
								if (birthScene > 80 && canDoVaginal(slave)) {
									r.push(`While riding a citizen's dick, ${slave.slaveName}'s water breaks on him. Showing no signs of stopping, he shoves ${his} bulk off of him. Instinctively, ${he} begins to push out ${firstText} baby, indifferent to who may be watching ${his} naked crotch. ${He} draws ${his} child to ${his} breast before seeking out the next citizen's cock.`);
								} else if (birthScene > 60 && canDoAnal(slave)) {
									r.push(`While taking a citizen's dick in ${his} ass, ${slave.slaveName}'s water breaks. ${He} shows no signs of slowing down, so he allows ${him} to reposition and continue. Instinctively, ${he} begins to push out ${firstText} baby, indifferent to who may be watching ${his} naked crotch. He came strongly thanks to ${him} and gives ${him} a slap on the ass as ${he} struggles to reach ${his} child around ${his} still very gravid middle. Once ${he} has brought ${his} child to ${his} breast, ${he} seeks out the next citizen's cock.`);
								} else if (birthScene > 40) {
									r.push(`While licking a citizen's cunt, ${slave.slaveName}'s water breaks. ${He} shows no signs of slowing down, so she allows ${him} to reposition and continue.`);
									r.push(clothingBirth());
									r.push(`The citizen splashes across ${his} face as ${he} struggles to reach ${firstText} baby around ${his} still very gravid middle. Once ${he} has brought ${his} child to ${his} breast, ${he} seeks out the next citizen's cunt.`);
								} else {
									r.push(`While sucking a citizen's dick, ${slave.slaveName}'s water breaks. ${He} shows no signs of slowing down, so he allows ${him} to reposition and continue.`);
									r.push(clothingBirth());
									r.push(`He cums down ${his} throat as ${he} struggles to reach ${firstText} baby around ${his} still very gravid middle. Once ${he} has brought ${his} child to ${his} breast, ${he} seeks out the next citizen's cock.`);
								}
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} is helped back to ${his} bed and stripped before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${firstText} baby${UH}. ${His} child is promptly taken and ${he} rests awhile before returning to sharing ${his} gravid body with the public.`);
							} else {
								if (birthScene > 80 && canDoVaginal(slave)) {
									r.push(`While riding a citizen's dick, ${slave.slaveName}'s water breaks on him. ${He} desperately tries to disengage but he grabs ${his} hips and slams ${him} back down. He thoroughly enjoys ${his} contracting cunt before pushing ${him} off and standing over ${him}, jacking off. Quickly ${he} spreads ${his} legs apart and begins pushing out ${firstText} baby${UH}. ${He} can't hide what's happening between ${his} legs,`);
									if (slave.fetish === "humiliation") {
										r.push(`but that only makes it more exciting.`);
									} else {
										r.push(`so ${he} bears with it.`);
									}
									r.push(`He cums over ${his} heaving, still very gravid body and moves on leaving ${him} to recover and collect ${his} child to be sent off.`);
									humiliation = 1;
								} else if (birthScene > 60 && canDoAnal(slave)) {
									r.push(`While taking a citizen's dick in ${his} ass, ${slave.slaveName}'s water breaks. ${He} desperately tries to disengage but he grabs ${his} hips and slams into ${him} hard. Quickly ${he} spreads ${his} legs apart and begins pushing out ${firstText} baby${UH}. ${He} can't hide what's happening between ${his} legs,`);
									if (slave.fetish === "humiliation") {
										r.push(`but that only makes it more exciting.`);
									} else {
										r.push(`so ${he} bears with it.`);
									}
									r.push(`He came strongly thanks to ${him} and gives ${him} a slap on the ass as ${he} collapses onto ${his} still very gravid belly and slips to ${his} side. ${He} quickly gathers ${his} child to be sent off.`);
									humiliation = 1;
								} else if (birthScene > 40) {
									r.push(`While licking a citizen's cunt, ${slave.slaveName}'s water breaks. ${He} desperately tries to disengage but she grabs ${his} head and slams ${him} back into her crotch.`);
									humiliation = 1;
									r.push(clothingBirth());
									r.push(`She cums across ${his} face before helping ${his} still very gravid body to the ground and leaving. When ${he} recovers, ${he} quickly gathers ${firstText} child to be sent off.`);
								} else {
									r.push(`While sucking a citizen's dick, ${slave.slaveName}'s water breaks. ${He} desperately tries to disengage but he grabs ${his} head and slams ${him} back into his crotch.`);
									humiliation = 1;
									r.push(clothingBirth());
									r.push(`He cums down ${his} throat before letting ${him} collapse to the ground and leaving. When ${he} recovers and pushes ${his} still very gravid body upright, ${he} quickly gathers ${firstText} child to be sent off.`);
								}
							}
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} returns to ${his} bed and strips before slipping into it. Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and ${he} rests awhile before returning to sharing ${his} gravid body with the public.`);
							} else {
								if (birthScene > 80 && canDoVaginal(slave)) {
									r.push(`While riding a citizen's dick, ${slave.slaveName}'s water breaks on him. Showing no signs of stopping, he shoves ${his} bulk off of him. Instinctively, ${he} begins to push out ${firstText} baby, indifferent to who may be watching ${his} naked crotch. ${He} draws ${his} child to ${his} breast before seeking out the next citizen's cock.`);
								} else if (birthScene > 60 && canDoAnal(slave)) {
									r.push(`While taking a citizen's dick in ${his} ass, ${slave.slaveName}'s water breaks. ${He} shows no signs of slowing down, so he allows ${him} to reposition and continue. Instinctively, ${he} begins to push out ${firstText} baby, indifferent to who may be watching ${his} naked crotch. He came strongly thanks to ${him} and gives ${him} a slap on the ass as ${he} struggles to reach ${his} child around ${his} still very gravid middle. Once ${he} has brought ${his} child to ${his} breast, ${he} seeks out the next citizen's cock.`);
								} else if (birthScene > 40) {
									r.push(`While licking a citizen's cunt, ${slave.slaveName}'s water breaks. ${He} shows no signs of slowing down, so she allows ${him} to reposition and continue.`);
									r.push(clothingBirth());
									r.push(`The citizen splashes across ${his} face as ${he} struggles to reach ${firstText} baby around ${his} still very gravid middle. Once ${he} has brought ${his} child to ${his} breast, ${he} seeks out the next citizen's cunt.`);
								} else {
									r.push(`While sucking a citizen's dick, ${slave.slaveName}'s water breaks. ${He} shows no signs of slowing down, so he allows ${him} to reposition and continue.`);
									r.push(clothingBirth());
									r.push(`He cums down ${his} throat as ${he} struggles to reach ${firstText} baby around ${his} still very gravid middle. Once ${he} has brought ${his} child to ${his} breast, ${he} seeks out the next citizen's cock.`);
								}
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} returns to ${his} bed and strips before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${firstText} baby${UH}. ${His} child is promptly taken and ${he} rests awhile before returning to sharing ${his} gravid body with the public.`);
							} else {
								if (birthScene > 80 && canDoVaginal(slave)) {
									r.push(`While riding a citizen's dick, ${slave.slaveName}'s water breaks on him. ${He} desperately tries to disengage but he grabs ${his} hips and slams ${him} back down. He thoroughly enjoys ${his} contracting cunt before pushing ${him} off and standing over ${him}, jacking off. Quickly ${he} spreads ${his} legs apart and begins pushing out ${firstText} baby${UH}. ${He} can't hide what's happening between ${his} legs,`);
									if (slave.fetish === "humiliation") {
										r.push(`but that only makes it more exciting.`);
									} else {
										r.push(`so ${he} bears with it.`);
									}
									r.push(`He cums over ${his} heaving, still very gravid body and moves on, leaving ${him} to recover and collect ${his} child to be sent off.`);
									humiliation = 1;
								} else if (birthScene > 60 && canDoAnal(slave)) {
									r.push(`While taking a citizen's dick in ${his} ass, ${slave.slaveName}'s water breaks. ${He} desperately tries to disengage but he grabs ${his} hips and slams into ${him} hard. Quickly ${he} spreads ${his} legs apart and begins pushing out ${firstText} baby${UH}. ${He} can't hide what's happening between ${his} legs,`);
									if (slave.fetish === "humiliation") {
										r.push(`but that only makes it more exciting.`);
									} else {
										r.push(`so ${he} bears with it.`);
									}
									r.push(`He came strongly thanks to ${him} and gives ${him} a slap on the ass as ${he} collapses onto ${his} still very gravid belly and slips to ${his} side. ${He} quickly gathers ${his} child to be sent off.`);
									humiliation = 1;
								} else if (birthScene > 40) {
									r.push(`While licking a citizen's cunt, ${slave.slaveName}'s water breaks. ${He} desperately tries to disengage but ${he} grabs ${his} head and slams ${him} back into her crotch.`);
									humiliation = 1;
									r.push(clothingBirth());
									r.push(`She cums across ${his} face before helping ${his} still very gravid body to the ground and leaving. When ${he} recovers, ${he} quickly gathers ${firstText} child to be sent off.`);
								} else {
									r.push(`While sucking a citizen's dick, ${slave.slaveName}'s water breaks. ${He} desperately tries to disengage but he grabs ${his} head and slams ${him} back into his crotch.`);
									humiliation = 1;
									r.push(clothingBirth());
									r.push(`He cums down ${his} throat before letting ${him} collapse to the ground and leaving. When ${he} recovers and pushes ${his} still very gravid body`);
									if (hasBothLegs(slave)) {
										r.push(`to its feet,`);
									} else {
										r.push(`into a standing position,`);
									}
									r.push(`${he} quickly gathers ${firstText} child to be sent off.`);
								}
							}
						}
					}
					break;

				case Job.GLORYHOLE:
					if (slave.fetish === Fetish.MINDBROKEN) {
						if (random(1, 20) > suddenBirth) {
							r.push(`Since ${he} is unable to leave ${his} box, ${he} doesn't have far to go. Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is quickly extracted from the box. ${He} never notices, focused entirely on the fresh cock poking through the glory hole and the sensation of ${his} still very gravid middle rubbing the wall.`);
						} else {
							r.push(`While sucking a dick through the hole of ${his} confining box, ${slave.slaveName}'s water breaks. ${He} makes no effort to stop sucking the dicks presented to ${him}.`);
							r.push(clothingBirth());
							if (slave.counter.birthsTotal === 0) {
								r.push(`${His} first`);
							} else {
								r.push(`This week's`);
							}
							r.push(`child is quickly extracted from the box. ${He} never notices, focused entirely on the fresh cock poking through the glory hole and the sensation of ${his} still very gravid middle rubbing the wall.`);
						}
					} else {
						if (random(1, 20) > suddenBirth) {
							r.push(`Since ${he} is unable to leave ${his} box, ${he} doesn't have far to go. ${He} quickly finishes the waiting dick before shifting ${himself} into a slightly, though not by much, more comfortable position. ${He} begins laboring on ${firstText} child${UH}. As ${he} finishes, the box is opened and ${his} child is gathered and taken away before ${he} is ordered back to sucking.`);
						} else {
							r.push(`While sucking a dick through the hole of ${his} confining box, ${slave.slaveName}'s water breaks. ${He} quickly finishes the dick off before seating ${himself} in the back of the box.`);
							r.push(clothingBirth());
							r.push(`As ${he} finishes, ${he}`);
							if (canSee(slave)) {
								r.push(`could have sworn ${he} saw an eye`);
							} else {
								r.push(`swears ${he} can feel somebody`);
							}
							r.push(`peeping through the glory hole, watching the show. The box is opened and ${firstText} child is gathered and taken away as ${he} struggles to reach the fresh cock poking through the hole.`);
						}
					}
					break;

				case Job.MILKED:
					if (slave.fetish === Fetish.MINDBROKEN) {
						if (V.dairyPregSetting > 0) {
							r.push(`Since the dairy is designed for pregnant cows, ${he} stays hooked up to the milkers. ${He} shows little interest in ${his} coming birth, instead focusing on ${his} milky breasts. Instinctively, ${he} begins to push out ${firstText} baby. ${He} shows no interest in ${his} child being removed from the milking stall, nor when ${his} still very gravid body is hosed off.`);
						} else {
							if (random(1, 20) > suddenBirth) {
								if (!canWalk(slave)) {
									r.push(`${He} is helped back to ${his} bed and stripped before slipping into it.`);
								} else {
									r.push(`${He} returns to ${his} bed and strips before slipping into it.`);
								}
								r.push(`Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and ${he} rests awhile before returning to the milkers to lighten ${his} swelling breasts.`);
							} else {
								r.push(`While getting milked, ${slave.slaveName}'s water breaks. ${He} show little interest and continues kneading ${his} breasts.`);
								r.push(clothingBirth());
								r.push(`${He} shows no interest in ${firstText} child being removed from the milking stall, nor ${his} still very gravid middle, instead focusing entirely on draining ${his} breasts.`);
							}
						}
					} else {
						if (V.dairyPregSetting > 0) {
							r.push(`Since the dairy is designed for pregnant cows, ${he} stays hooked up to the milkers. ${He} meekly protests ${his} situation, but ultimately accepts it. ${He} begins working on birthing ${his} ${firstText} baby${UH}, and catches a glimpse of ${his} child being removed from the milking stall, but quickly forgets when ${he} is hosed off.`);
							humiliation = 1;
						} else {
							if (random(1, 20) > suddenBirth) {
								if (!canWalk(slave)) {
									r.push(`${He} is helped back to ${his} bed and stripped before slipping into it.`);
								} else {
									r.push(`${He} returns to ${his} bed and strips before slipping into it.`);
								}
								r.push(`${He} makes ${himself} comfortable and begins working on birthing ${firstText} baby${UH}. ${His} child is promptly taken and ${he} rests awhile before returning to the milkers to lighten ${his} swelling breasts.`);
							} else {
								r.push(`While getting milked, ${slave.slaveName}'s water breaks. ${He} shifts into a comfortable position to give birth while the milker works ${his} breasts.`);
								r.push(clothingBirth());
								r.push(`${He} takes a break from milking to collect ${firstText} child for removal and to catch ${his} breath before reattaching the milkers and coaxing ${his} milk to begin flowing anew.`);
							}
						}
					}
					break;

				case Job.FARMYARD:	// TODO: this needs a rewrite
					if (slave.fetish === Fetish.MINDBROKEN) {
						if (V.farmyardPregSetting > 0) {
							r.push(`Since the farmyard is designed for pregnant cows, ${he} stays hooked up to the milkers. ${He} shows little interest in ${his} coming birth, instead focusing on ${his} milky breasts. Instinctively, ${he} begins to push out ${firstText} baby. ${He} shows no interest in ${his} child being removed from the milking stall, nor when ${his} still very gravid body is hosed off.`);
						} else {
							if (random(1, 20) > suddenBirth) {
								if (!canWalk(slave)) {
									r.push(`${He} is helped back to ${his} bed and stripped before slipping into it.`);
								} else {
									r.push(`${He} returns to ${his} bed and strips before slipping into it.`);
								}
								r.push(`Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and ${he} rests awhile before returning to the milkers to lighten ${his} swelling breasts.`);
							} else {
								r.push(`While getting milked, ${slave.slaveName}'s water breaks. ${He} show little interest and continues kneading ${his} breasts.`);
								r.push(clothingBirth());
								r.push(`${He} shows no interest in ${firstText} child being removed from the milking stall, nor ${his} still very gravid middle, instead focusing entirely on draining ${his} breasts.`);
							}
						}
					} else {
						if (V.farmyardPregSetting > 0) {
							r.push(`Since the farmyard is designed for pregnant cows, ${he} stays hooked up to the milkers. ${He} meekly protests ${his} situation, but ultimately accepts it. ${He} begins working on birthing ${his} ${firstText} baby${UH}, and catches a glimpse of ${his} child being removed from the milking stall, but quickly forgets when ${he} is hosed off.`);
							humiliation = 1;
						} else {
							if (random(1, 20) > suddenBirth) {
								if (!canWalk(slave)) {
									r.push(`${He} is helped back to ${his} bed and stripped before slipping into it.`);
								} else {
									r.push(`${He} returns to ${his} bed and strips before slipping into it.`);
								}
								r.push(`${He} makes ${himself} comfortable and begins working on birthing ${firstText} baby${UH}. ${His} child is promptly taken and ${he} rests awhile before returning to the milkers to lighten ${his} swelling breasts.`);
							} else {
								r.push(`While getting milked, ${slave.slaveName}'s water breaks. ${He} shifts into a comfortable position to give birth while the milker works ${his} breasts.`);
								r.push(clothingBirth());
								r.push(`${He} takes a break from milking to collect ${firstText} child for removal and to catch ${his} breath before reattaching the milkers and coaxing ${his} milk to begin flowing anew.`);
							}
						}
					}
					break;

				case Job.FUCKTOY:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (random(1, 20) > suddenBirth) {
								r.push(`You strip ${him} and help ${him} onto your couch. Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and ${he} falls into a contented nap. You fondle ${his} still very gravid body until a servant comes to help clean ${him} up.`);
							} else {
								r.push(`While sitting absentmindedly nearby, ${slave.slaveName}'s water breaks, soaking the floor under ${him}. ${He} pays no heed to it and continues waiting for you to use ${him}.`);
								r.push(clothingBirth());
								r.push(`You certainly enjoyed the show as you call for a servant to take away ${firstText} child and to clean up the spill.`);
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								if (slave.devotion > 20) {
									r.push(`${He} moans lewdly at you and wiggles ${his} hips. As ${he} teases, ${he} begins pushing ${firstText} baby out${UH}. As ${he} crowns, you pull ${him} into your arms and hold ${him} close. You hold ${him} in a comforting embrace until ${he} finishes.`);
								} else if (slave.devotion >= -20) {
									r.push(`${He} releases a lewd moan and begins attempting to remove ${his} clothes. You approach ${him}, clearing ${his}`);
									if (slave.mpreg === 1) {
										r.push(`asshole`);
									} else {
										r.push(`vagina`);
									}
									r.push(`and helping ${him} onto the couch, where you take a seat next to ${him} to fondle ${his} vulnerable body. ${He} begins to push out ${firstText} baby${UH}. Once ${he} finishes, you give ${him} some time to catch ${his} breath.`);
								} else {
									r.push(`${He} begins desperately begging to be taken back to ${his} bed; instead you pull ${him} towards the couch and take a seat with ${him} in your lap, back against your front. Blushing thoroughly, ${he} gives a meek protest before focusing on the coming birth, rather than your wandering hands. ${He} begins to push out ${firstText} baby${UH}.`);
									humiliation = 1;
								}
								r.push(`${His} child is promptly taken and, following a shower and a fresh change of clothes, ${he} is helped back to your office${(slave.devotion < -20) ? ` where you are waiting to enjoy ${his} still very gravid body` : ``}.`);
							} else {
								r.push(`While sitting nearby, ${slave.slaveName}'s water breaks, startling ${him}. ${He} looks to you for guidance and you shake your head "no". Without permission to leave ${he}`);
								if (slave.devotion > 50) {
									r.push(`decides to give you a show.`);
								} else if (slave.devotion > 20) {
									r.push(`reluctantly decides giving birth in front of you isn't so bad.`);
								} else {
									r.push(`begins to panic as ${his} contractions come sooner and sooner.`);
									humiliation = 1;
								}
								r.push(clothingBirth());
								r.push(`As thanks for the show, you help ${his} still very gravid body to the couch so ${he} can recover before returning to ${his} duties. You call for a servant to take away ${firstText} child and to clean up your floor and your toy.`);
							}
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} returns to ${his} bed and strips before slipping into it. Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and ${he} falls into a contented nap. That is until you drag ${his} still very gravid ass out of bed, inquiring where ${he} waddled off to without your permission.`);
							} else {
								r.push(`While standing absentmindedly nearby, ${slave.slaveName}'s water breaks, soaking the floor under ${him}. ${He} pays no heed to it and continues waiting for you to use ${him}.`);
								r.push(clothingBirth());
								r.push(`You certainly enjoyed the show as you call for a servant to take away ${firstText} child and to clean up the spill.`);
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								if (slave.devotion > 20) {
									r.push(`${He} seeks you out and begins slowly stripping. As ${he} teases, ${he} begins pushing ${firstText} baby out${UH}. As ${he} crowns, ${he} throws ${himself} into your waiting arms and holds ${himself} to you. You hold ${him} in a comforting embrace until ${he} finishes.`);
								} else if (slave.devotion >= -20) {
									r.push(`${He} approaches you and begins a very uncertain striptease. As ${he} lowers ${himself} to the floor to begin pushing, you overtake ${him} and fondle ${his} vulnerable body. ${He} begins to push out ${firstText} baby${UH}. Once ${he} finishes, you help ${him} to the couch to catch ${his} breath.`);
								} else {
									r.push(`${He} attempts to leave your office and return to ${his} bed, but you catch ${his} arm before ${he} slips out of reach. You order ${him} to strip and give you a show. Blushing thoroughly, ${he} gives a meek performance before falling to the floor. ${He} begins to push out ${firstText} baby${UH}.`);
									humiliation = 1;
								}
								r.push(`${His} child is promptly taken and, following a shower and a fresh change of clothes, ${he} waddles back into your office${(slave.devotion < -20) ? ` where you are waiting to enjoy ${his} still very gravid body` : ``}.`);
							} else {
								r.push(`While standing nearby, ${slave.slaveName}'s water breaks, startling ${him}. ${He} looks to you for guidance and you shake your head "no". Without permission to leave ${he}`);
								if (slave.devotion > 50) {
									r.push(`decides to give you a show.`);
								} else if (slave.devotion > 20) {
									r.push(`reluctantly decides giving birth in front of you isn't so bad.`);
								} else {
									r.push(`begins to panic as ${his} contractions come sooner and sooner.`);
									humiliation = 1;
								}
								r.push(clothingBirth());
								r.push(`As thanks for the show, you help ${his} still very gravid body onto the couch so ${he} can recover before returning to ${his} duties. You call for a servant to take away ${firstText} child and to clean up your floor and your toy.`);
							}
						}
					}
					break;

				case Job.CONFINEMENT:
					if (slave.fetish === Fetish.MINDBROKEN) {
						if (random(1, 20) > suddenBirth) {
							r.push(`Since ${he} is locked in a cell, ${he} doesn't have far to go. Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and, after ${his} still very gravid body and the cell are hosed down, ${he} is returned to isolation.`);
						} else {
							r.push(`While waiting in confinement, ${slave.slaveName}'s water breaks. ${He} assumes a birthing position.`);
							r.push(clothingBirth());
							r.push(`${He} struggles to reach ${firstText} child around ${his} still very gravid middle and resumes waiting with it latched to ${his} breast.`);
						}
					} else {
						if (random(1, 20) > suddenBirth) {
							r.push(`Since ${he} is locked in a cell, ${he} doesn't have far to go. Reluctantly, ${he} begins to push out ${firstText} baby${UH}. ${His} child is promptly taken and, after ${his} still very gravid body and the cell are hosed down, ${he} is returned to isolation.`);
							humiliation = 1;
						} else {
							r.push(`${slave.slaveName} is awoken from ${his} stupor by moist sensation followed by a contraction. ${He} rolls over and clutches ${his} gravid belly as another contraction wracks ${his} body.`);
							r.push(clothingBirth());
							r.push(`${He} collects ${firstText} child and holds it close knowing someone will soon come to take it away from ${him}.`);
						}
					}
					break;

				case Job.QUARTER:
				case Job.HOUSE:
					if (slave.fetish === Fetish.MINDBROKEN) {
						if (random(1, 20) > suddenBirth) {
							r.push(`${He} returns to ${his} bed and strips before slipping into it. Instinctively ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and ${he} rests awhile before returning to ${his} role as your ever-pregnant maid.`);
						} else {
							if (birthScene > 50) {
								r.push(`While giving a slave oral service, ${slave.slaveName}'s water breaks. ${He} disregards this development and continues working.`);
								r.push(clothingBirth());
								r.push(`The slave gets off quite strongly to the show and shoves ${him} out of the way, leaving ${him} to clean up ${his} mess. Instead, ${he} draws ${firstText} child to ${his} breast until`);
								if (S.Stewardess) {
									r.push(S.Stewardess.slaveName);
								} else if (V.HeadGirlID !== 0) {
									r.push(S.HeadGirl.slaveName);
								} else {
									r.push(V.assistant.name);
								}
								r.push(`shouts at ${him} to move ${his} useless pregnant ass.`);
							} else {
								r.push(`While scrubbing the penthouse floor, ${slave.slaveName}'s water breaks. ${He} turns to clean this new spill, disregarding what it means.`);
								r.push(clothingBirth());
								r.push(`Instead of cleaning the fresh mess ${he} made, ${he} draws ${firstText} child to ${his} breast until`);
								if (S.Stewardess) {
									r.push(S.Stewardess.slaveName);
								} else if (V.HeadGirlID !== 0) {
									r.push(S.HeadGirl.slaveName);
								} else {
									r.push(V.assistant.name);
								}
								r.push(`shouts at ${him} to move ${his} useless pregnant ass.`);
							}
						}
					} else {
						if (random(1, 20) > suddenBirth) {
							r.push(`${He} returns to ${his} bed and strips before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${firstText} baby${UH}. ${His} child is promptly taken and ${he} rests awhile before returning to ${his} role as your ever-pregnant maid.`);
						} else {
							if (birthScene > 50) {
								r.push(`While giving a slave oral service, ${slave.slaveName}'s water breaks. ${He} desperately tries to pull away but they grab ${his} head and force ${him} back to their crotch.`);
								humiliation = 1;
								r.push(clothingBirth());
								r.push(`The slave gets off quite strongly to the show and shoves ${him} out of the way, leaving ${him} to clean up ${his} mess. ${He} hurriedly tries to mop up the mess and collect ${firstText} child before`);
								if (S.Stewardess) {
									r.push(S.Stewardess.slaveName);
								} else if (V.HeadGirlID !== 0) {
									r.push(S.HeadGirl.slaveName);
								} else {
									r.push(`anyone`);
								}
								r.push(`shouts at ${him} for dragging ${his} pregnant ass.`);
							} else {
								r.push(`While scrubbing the penthouse floor, ${slave.slaveName}'s water breaks. ${He} panics at the thought of not cleaning up ${his} spill but ${his} worsening contractions force ${him} to find a secluded place to give birth.`);
								r.push(clothingBirth());
								r.push(`Collecting ${firstText} child, ${he} carefully exits ${his} hiding place before coming under the eye of`);
								if (S.Stewardess) {
									r.push(`the glaring ${S.Stewardess.slaveName}. ${His} child is promptly taken`);
								} else if (V.HeadGirlID !== 0) {
									r.push(`the glaring ${S.HeadGirl.slaveName}. ${His} child is promptly taken`);
								} else {
									r.push(`a glaring slave. ${His} child is promptly taken by other servants`);
								}
								r.push(`following a lecture about priorities and time management given ${his} constant pregnancy and predictable birth cycle.`);
							}
						}
					}
					break;

				case Job.MASTERSUITE:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (random(1, 20) > suddenBirth) {
								if (V.masterSuiteUpgradePregnancy === 1) {
									r.push(`${He} is helping into the birthing chamber, stripped, and aided into the specialized chair. Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and, following a shower and fresh change of clothes, ${he} is returned to`);
									if (V.masterSuiteUpgradeLuxury === 1) {
										r.push(`your big bed.`);
									} else if (V.masterSuiteUpgradeLuxury === 2) {
										r.push(`the fuckpit.`);
									} else {
										r.push(`the main room of the master suite.`);
									}
								} else {
									r.push(`After struggling to strip and tipping into one of the various seats around the room, ${he} prepares to give birth. Instinctively, ${he} begins to push out ${firstText} baby, indifferent to who may be watching ${him}. ${His} child is promptly taken and, following a shower and fresh change of clothes, ${he} is helped back to`);
									if (V.masterSuiteUpgradeLuxury === 1) {
										r.push(`your big bed.`);
									} else if (V.masterSuiteUpgradeLuxury === 2) {
										r.push(`the fuckpit.`);
									} else {
										r.push(`${his} usual spot.`);
									}
								}
							} else {
								if (V.masterSuiteUpgradeLuxury === 1) {
									r.push(`While awaiting your return on the big bed in the master suite, ${slave.slaveName}'s water breaks, thoroughly soaking the sheets. Ignoring the mess, ${he} shifts into a more comfortable position.`);
									r.push(clothingBirth());
									r.push(`${He} struggles to reach ${firstText} child around ${his} still gravid figure before bringing it to ${his} breast and resuming ${his} wait.`);
									if (S.Concubine) {
										r.push(`${S.Concubine.slaveName} furiously orders ${his} child removed and ${his} still very pregnant ass forcefully ejected from the bed so it can be cleaned before your return.`);
									}
								} else if (V.masterSuiteUpgradeLuxury === 2) {
									r.push(`While being the bottom of the master suite's fuckpit, ${slave.slaveName}'s water breaks. While ${he} doesn't stop having sex, the fucktoys using ${him} do and drag ${him} from the pit to give birth. Instinctively, ${he} begins to push out ${firstText} baby, indifferent to who may be watching ${his} naked crotch. Without a second thought about ${his} child, ${he} slips back into the fuckpit.`);
								} else {
									r.push(`While awaiting your return in the master suite, ${slave.slaveName}'s water breaks. ${He} pays it no heed and continues blankly waiting.`);
									r.push(clothingBirth());
									r.push(`${He} struggles to reach ${firstText} child around ${his} still gravid figure before bringing it to ${his} breast and resuming ${his} wait`);
									if (S.Concubine) {
										r.push(`${S.Concubine.slaveName} furiously orders ${his} child removed and ${his} still very pregnant ass thoroughly cleaned before your return.`);
									}
								}
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								if (V.masterSuiteUpgradePregnancy === 1) {
									r.push(`${He} is helping into the birthing chamber, stripped, and aided into the specialized chair. Finding it quite comfortable, ${he} begins to push out ${firstText} baby${UH}. ${His} child is promptly taken and, following a shower and fresh change of clothes, ${he} is returned to`);
									if (V.masterSuiteUpgradeLuxury === 1) {
										r.push(`your big bed.`);
									} else if (V.masterSuiteUpgradeLuxury === 2) {
										r.push(`the fuckpit.`);
									} else {
										r.push(`the main room of the master suite.`);
									}
								} else {
									r.push(`After struggling to strip and tipping into one of the various seats around the room, ${he} prepares to give birth. ${He} gets comfortable and begins to push out ${firstText} baby${UH}. ${His} child is promptly taken and, following a shower and fresh change of clothes, ${he} is returned to`);
									if (V.masterSuiteUpgradeLuxury === 1) {
										r.push(`your big bed.`);
									} else if (V.masterSuiteUpgradeLuxury === 2) {
										r.push(`the fuckpit.`);
									} else {
										r.push(`${his} preferred spot.`);
									}
								}
							} else {
								if (V.masterSuiteUpgradeLuxury === 1) {
									r.push(`While awaiting your return on the big bed in the master suite, ${slave.slaveName}'s water breaks, thoroughly soaking the sheets. ${He} quickly shifts ${himself} off the bed and calls for a servant before dropping to the floor.`);
									r.push(clothingBirth());
									r.push(`Once ${firstText} child is removed, ${his} still very gravid body cleaned up, and the sheets are changed, ${he} is helped back into bed to recover for your return.`);
								} else if (V.masterSuiteUpgradeLuxury === 2) {
									r.push(`While participating in the fuckpit orgy, ${slave.slaveName}'s water breaks. ${He} begs to be let out of the pit but the other fucktoys pull ${him} in and position themselves for ${him} to pleasure them while giving birth.`);
									humiliation = 1;
									r.push(clothingBirth());
									r.push(`Once the fucktoys are done tormenting the still very gravid new mother, they hand ${firstText} child off to the help and pull ${him} into an embrace to allow ${him} to regain ${his} strength.`);
								} else {
									r.push(`While awaiting your return in the master suite, ${slave.slaveName}'s water breaks. ${He} tries to get to the prepared area but fails to untangle ${himself} from the toys ${he} was playing with. ${He} calls for a servant to hurry as ${he} begins laboring.`);
									r.push(clothingBirth());
									r.push(`The servant collects ${firstText} child and helps ${his} still very gravid body onto a cushion to recover for your return.`);
									if (canDoAnal(slave) && slave.anus > 0) {
										r.push(`With a little effort, ${he} pushes the vibrating dildo out of ${his} ass`);
									} else {
										r.push(`With things settling down, ${he} finally manages to switch off the bullet vibrators stuck to ${his} crotch`);
									}
									r.push(`before settling down for a nap.`);
								}
							}
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (random(1, 20) > suddenBirth) {
								if (V.masterSuiteUpgradePregnancy === 1) {
									r.push(`${He} enters the birthing chamber, strips, and seats ${himself} in the specialized chair. Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and, following a shower and fresh change of clothes, ${he} returns to`);
									if (V.masterSuiteUpgradeLuxury === 1) {
										r.push(`your big bed.`);
									} else if (V.masterSuiteUpgradeLuxury === 2) {
										r.push(`the fuckpit.`);
									} else {
										r.push(`the main room of the master suite.`);
									}
								} else {
									r.push(`${He} strips and settles into one of the various seats around the room. Instinctively, ${he} begins to push out ${firstText} baby, indifferent to who may be watching ${him}. ${His} child is promptly taken and, following a shower and fresh change of clothes, ${he} returns to`);
									if (V.masterSuiteUpgradeLuxury === 1) {
										r.push(`your big bed.`);
									} else if (V.masterSuiteUpgradeLuxury === 2) {
										r.push(`the fuckpit.`);
									} else {
										r.push(`${his} usual spot.`);
									}
								}
							} else {
								if (V.masterSuiteUpgradeLuxury === 1) {
									r.push(`While awaiting your return on the big bed in the master suite, ${slave.slaveName}'s water breaks, thoroughly soaking the sheets. Ignoring the mess, ${he} shifts into a more comfortable position.`);
									r.push(clothingBirth());
									r.push(`${He} struggles to reach ${firstText} child around ${his} still gravid figure before bringing it to ${his} breast and resuming ${his} wait.`);
									if (S.Concubine) {
										r.push(`${S.Concubine.slaveName} furiously orders ${his} child removed and ${his} still very pregnant ass forcefully ejected from the bed so it can be cleaned before your return.`);
									}
								} else if (V.masterSuiteUpgradeLuxury === 2) {
									r.push(`While being the bottom of the master suite's fuckpit, ${slave.slaveName}'s water breaks. While ${he} doesn't stop having sex, the fucktoys using ${him} do and drag ${him} from the pit to give birth. Instinctively, ${he} begins to push out ${firstText} baby, indifferent to who may be watching ${his} naked crotch. Without a second thought about ${his} child, ${he} slips back into the fuckpit.`);
								} else {
									r.push(`While awaiting your return in the master suite, ${slave.slaveName}'s water breaks. ${He} pays it no heed and continues blankly waiting.`);
									r.push(clothingBirth());
									r.push(`${He} struggles to reach ${firstText} child around ${his} still gravid figure before bringing it to ${his} breast and resuming ${his} wait`);
									if (S.Concubine) {
										r.push(`${S.Concubine.slaveName} furiously orders ${his} child removed and ${his} still very pregnant ass thoroughly cleaned before your return.`);
									}
								}
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								if (V.masterSuiteUpgradePregnancy === 1) {
									r.push(`${He} enters the birthing chamber, strips, and seats ${himself} in the specialized chair. Finding it quite comfortable, ${he} begins to push out ${firstText} baby${UH}. ${His} child is promptly taken and, following a shower and fresh change of clothes, ${he} returns to`);
									if (V.masterSuiteUpgradeLuxury === 1) {
										r.push(`your big bed.`);
									} else if (V.masterSuiteUpgradeLuxury === 2) {
										r.push(`the fuckpit.`);
									} else {
										r.push(`the main room of the master suite.`);
									}
								} else {
									r.push(`${He} strips and settles into one of the various seats around the room. ${He} gets comfortable and begins to push out ${firstText} baby${UH}. ${His} child is promptly taken and, following a shower and fresh change of clothes, ${he} returns to`);
									if (V.masterSuiteUpgradeLuxury === 1) {
										r.push(`your big bed.`);
									} else if (V.masterSuiteUpgradeLuxury === 2) {
										r.push(`the fuckpit.`);
									} else {
										r.push(`${his} preferred spot.`);
									}
								}
							} else {
								if (V.masterSuiteUpgradeLuxury === 1) {
									r.push(`While awaiting your return on the big bed in the master suite, ${slave.slaveName}'s water breaks, thoroughly soaking the sheets. ${He} quickly moves ${himself} off the bed and calls for a servant before dropping to the floor.`);
									r.push(clothingBirth());
									r.push(`Once ${firstText} child is removed, ${his} still very gravid body cleaned up, and the sheets are changed, ${he} crawls back into bed to recover for your return.`);
								} else if (V.masterSuiteUpgradeLuxury === 2) {
									r.push(`While participating in the fuckpit orgy, ${slave.slaveName}'s water breaks. ${He} tries to crawl out of the pit but the other fucktoys pull ${him} back in and position themselves for ${him} to pleasure them while giving birth.`);
									humiliation = 1;
									r.push(clothingBirth());
									r.push(`Once the fucktoys are done tormenting the exhausted`);
									if (slave.counter.birthsTotal === 0) {
										r.push(`new`);
									} else {
										r.push(`brood`);
									}
									r.push(`mother, they hand ${his} child off to the help and pull ${him} into an embrace to allow ${him} to regain ${his} strength.`);
								} else {
									r.push(`While awaiting your return in the master suite, ${slave.slaveName}'s water breaks. ${He} tries to get to the prepared area but fails to untangle ${himself} from the toys ${he} was playing with. ${He} calls for a servant to hurry as ${he} begins laboring.`);
									r.push(clothingBirth());
									r.push(`The servant collects ${firstText} child and helps ${his} still very gravid body onto a cushion to recover for your return.`);
									if (canDoAnal(slave) && slave.anus > 0) {
										r.push(`With a little effort, ${he} pushes the vibrating dildo out of ${his} ass`);
									} else {
										r.push(`With things settling down, ${he} finally manages to switch off the bullet vibrators stuck to ${his} crotch`);
									}
									r.push(`before settling down for a nap.`);
								}
							}
						}
					}
					break;

				case Job.CLUB:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} is helped into a private room in the back of the club by a group of eager patrons. Instinctively, ${he} begins to push out ${firstText} baby, indifferent to ${his} audience. ${His} child is promptly taken and, following a cleaning and fresh change of clothes, the audience is allowed to have their way with ${his} still very gravid body.`);
							} else {
								r.push(`${slave.slaveName} is showing off ${his} gravid body and trying to attract citizens as well as ${he} can. During one of ${his} teases, ${his} water breaks, soaking the floor. ${He} keeps on teasing, despite ${his} condition, until ${his} contractions drag ${him} to the floor.`);
								r.push(clothingBirth());
								r.push(`Multiple citizens pull ${his} still very pregnant form into a booth so that they may tease ${his} exhausted body while the floor is dried and ${firstText} child carried off.`);
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} is helped to a private room in the back of the club by several patrons who just can't keep their hands off ${him}. ${He} settles ${himself} onto a patron's lap and begins working on birthing ${firstText} baby, basking in the attention of ${his} audience${UH}. ${His} child is promptly taken and ${he} beckons the audience to enjoy ${his} still very gravid body.`);
							} else {
								if (slave.fetish === "humiliation") {
									r.push(`${slave.slaveName} is showing off ${his} gravid body and trying to attract citizens by "dancing" as well as ${he} can, all the while being a huge tease. During one of ${his} "dances", ${his} water breaks, soaking the floor. ${He} calls out to the crowd, hyping them up for ${his} new show.`);
									humiliation = 1;
									r.push(clothingBirth());
									r.push(`As ${firstText} child are removed, ${he} is helped into one of the back rooms by several of ${his} aroused onlookers.`);
								} else {
									r.push(`${slave.slaveName} is showing off ${his} gravid body and trying to attract citizens by "dancing" as well as ${his} figure will let ${him}. During one of ${his} dances, ${his} water breaks, soaking the floor. ${He} hastily tries to find help to leave, but only finds hands groping ${his} body. ${He} is quickly pulled into one of the side rooms by a group of men looking forward to the show ${he}'s about to perform for them.`);
									humiliation = 1;
									r.push(clothingBirth());
									r.push(`Only once the last of ${his} clients cums over ${his} still very pregnant body is ${he} allowed to gather ${firstText} child and take a seat. ${He} enjoys a moment with ${his} newborn before the servant comes to collect it.`);
								}
							}
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} heads to a private room in the back of the club filled with eager patrons. Instinctively, ${he} begins to push out ${firstText} baby, indifferent to ${his} audience. ${His} child is promptly taken and, following a cleaning and fresh change of clothes, the audience is allowed to have their way with ${his} still very gravid body.`);
							} else {
								r.push(`${slave.slaveName} is showing off ${his} gravid body and trying to attract citizens by dancing as well as ${he} can. During one of ${his} dances, ${his} water breaks, soaking the dance floor. ${He} keeps on dancing, despite ${his} condition, until ${his} contractions drag ${him} to the floor.`);
								r.push(clothingBirth());
								r.push(`Multiple citizens pull ${his} still very pregnant form into a booth so that they may tease ${his} exhausted body while the dance floor is dried and ${firstText} child carried off.`);
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} heads to a private room in the back of the club accompanied by several patrons who just can't keep their hands off ${him}. ${He} settles ${himself} onto a patron's lap and begins working on birthing ${firstText} baby, basking in the attention of ${his} audience${UH}. ${His} child is promptly taken and ${he} beckons the audience to enjoy ${his} still very gravid body.`);
							} else {
								if (slave.fetish === "humiliation") {
									r.push(`${slave.slaveName} is showing off ${his} gravid body and trying to attract citizens by dancing as well as ${he} can, all the while flashing glimpses of ${his} crotch and nipples. During one of ${his} dances, ${his} water breaks, soaking the dance floor. ${He} calls out to the crowd, hyping them up for ${his} new show.`);
									humiliation = 1;
									r.push(clothingBirth());
									r.push(`As ${firstText} child is removed from the dance floor, ${his} still very pregnant form is helped into one of the back rooms by several of ${his} aroused onlookers.`);
								} else {
									r.push(`${slave.slaveName} is showing off ${his} gravid body and trying to attract citizens by dancing as well as ${he} can. During one of ${his} dances, ${his} water breaks, soaking the dance floor. ${He} hastily tries to escape the public's gaze only to find hands groping ${his} body. ${He} is quickly pulled into one of the side rooms by a group of men looking forward to the show ${he}'s about to perform for them.`);
									humiliation = 1;
									r.push(clothingBirth());
									r.push(`Only once the last of ${his} clients cums over ${his} still very pregnant figure is ${he} allowed to gather ${firstText} child and take a seat. ${He} enjoys a moment with ${his} newborn before the servant comes to collect it.`);
								}
							}
						}
					}

					break;
				case Job.CHOICE:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} is helped back to ${his} bed and stripped before slipping into it. Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and, after a short rest, ${he} waits for someone to help ${his} still very gravid form to ${his} next job, having forgotten ${he} was choosing it.`);
							} else {
								r.push(`${slave.slaveName} is awoken from ${his} stupor by a strong contraction. ${He} runs a hand across ${his} middle as another contraction runs through it.`);
								r.push(clothingBirth());
								r.push(`${He} fishes around under ${his} still huge dome of a stomach searching for ${firstText} newborn. Once ${he} finds it, ${he} draws it to ${his} breast and resumes waiting for someone to tell ${him} what to do.`);
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} is helped back to ${his} bed and stripped before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${firstText} baby${UH}. ${His} child is promptly taken and, after a short rest, ${he} returns to pondering what assignment would be best for a still very gravid girl.`);
							} else {
								r.push(`While deciding on ${his} post, ${slave.slaveName}'s water breaks. Unable to reach the prepared birthing room in time, ${he} pulls ${himself} into a secluded nook to give birth in.`);
								r.push(clothingBirth());
								r.push(`${He} gathers ${firstText} child and recovers ${his} strength before a servant finds ${him} and collects ${his} baby. ${He} decides to rest for the rest of the day before returning to pondering what assignment would be best for a still very gravid girl.`);
							}
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} returns to ${his} bed and strips before slipping into it. Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and, after a short rest, ${he} returns to waddling around the penthouse.`);
							} else {
								r.push(`${slave.slaveName} is awoken from ${his} stupor by a strong contraction. ${He} runs a hand across ${his} middle as another contraction runs through it.`);
								r.push(clothingBirth());
								r.push(`${He} fishes around under ${his} still huge dome of a stomach searching for ${his} newborn. Once ${he} finds it, ${he} draws it to ${his} breast and resumes waiting for someone to tell ${him} what to do.`);
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} returns to ${his} bed and strips before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${firstText} baby${UH}. ${His} child is promptly taken and, after a short rest, ${he} returns to pondering what assignment would be best for a still very gravid girl.`);
							} else {
								if (slave.fetish === "humiliation") {
									r.push(`While wandering the penthouse deciding on ${his} post, ${slave.slaveName}'s water breaks. Sensing an opportunity, ${he} waddles to the nearest balcony overlooking the city. ${He} calls out, making sure all eyes are on ${him} for what happens next.`);
									humiliation = 1;
									r.push(clothingBirth());
									r.push(`${He} gathers ${firstText} child and recovers ${his} strength before finding a servant to give it to. ${He} decides to rest for the rest of the day before returning to figuring out what assignment would be most humiliating for a still very gravid girl.`);
								} else {
									r.push(`While wandering the penthouse deciding on ${his} post, ${slave.slaveName}'s water breaks. Unable to reach the prepared birthing room in time, ${he} finds a secluded nook to give birth in.`);
									r.push(clothingBirth());
									r.push(`${He} gathers ${firstText} child and recovers ${his} strength before finding a servant to give it to. ${He} decides to rest for the rest of the day before returning to deciding what assignment would be best for a still very gravid girl.`);
								}
							}
						}
					}

					break;
				case Job.SPA:
					if (S.Attendant) {
						({he2, him2} = getPronouns(S.Attendant).appendSuffix("2"));
					}
					if (slave.fetish === Fetish.MINDBROKEN) {
						if (random(1, 20) > suddenBirth) {
							if (S.Attendant) {
								r.push(`${S.Attendant.slaveName} leads ${him} to a special pool designed to give birth in. Once ${he} is safely in the water alongside ${him2},`);
							} else {
								r.push(`${He} is lead to a special pool designed to give birth in. Once ${he} is safely in the water alongside ${his} assistant,`);
							}
							r.push(`${he} begins to push out ${firstText} baby, indifferent to ${his} watching caretaker. ${His} child is promptly taken and, following a cleaning of ${his} still very gravid body, ${he} is taken back to the spa.`);
						} else {
							r.push(`While soaking in the spa's pool, ${slave.slaveName}'s water breaks. As ${he} begins to ready ${himself} for birth,`);
							if (S.Attendant) {
								r.push(`${S.Attendant.slaveName} pulls ${him} out of the pool and glares at ${him}.`);
							} else {
								r.push(`the other bathers watch curiously.`);
							}
							r.push(clothingBirth());
							r.push(`${He} and ${firstText} child are quickly dried off as ${he} begins nursing it. A servant soon arrives to take ${his} child away.`);
						}
					} else {
						if (random(1, 20) > suddenBirth) {
							if (S.Attendant) {
								r.push(`${S.Attendant.slaveName} escorts ${him} to a special pool designed to give birth in. Once ${he} is safely in the water alongside ${him2},`);
							} else {
								r.push(`${He} is escorted to a special pool designed to give birth in. Once ${he} is safely in the water alongside ${his} assistant,`);
							}
							r.push(`${he} begins to push out ${firstText} baby,`);
							if (slave.geneticQuirks.uterineHypersensitivity === 2) {
								r.push(`convulsing with orgasms in the process and being`);
							}
							r.push(`aided by ${his} caretaker. ${His} child is promptly taken and, following a cleaning of ${his} still very gravid body, ${he} is taken back to the spa.`);
						} else {
							if (!canWalk(slave)) {
								r.push(`While changing in the changing room before a nice soak, ${slave.slaveName}'s water breaks. ${He} hurries to find someone to help ${him} but only finds curious onlookers.`);
							} else {
								r.push(`While heading for the changing room before a nice soak, ${slave.slaveName}'s water breaks. ${He} hurries into the changing room only to find it unusually crowded.`);
							}
							r.push(`Without any choice left, ${he} assumes a birthing position.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`Several of other slaves present help ${him} with ${firstText} child while the rest finish pleasuring themselves over the show.`);
							if (S.Attendant) {
								r.push(`${S.Attendant.slaveName}, lured in by the commotion, shoos the other slaves out and helps the new mother to a private relaxation room to unwind.`);
							} else {
								r.push(`Soon a servant arrives to take ${his} child away and ${he} is ushered into the bath to clean up and relax.`);
							}
						}
					}
					break;

				case Job.NURSERY:		// TODO: this needs a rewrite
					if (V.MatronID !== 0) {
						({he2, him2} = getPronouns(S.Matron).appendSuffix("2"));
					}
					if (slave.fetish === Fetish.MINDBROKEN) {
						if (random(1, 20) > suddenBirth) {
							if (V.MatronID !== 0) {
								r.push(`${S.Matron.slaveName} leads ${him} to a special pool designed to give birth in. Once ${he} is safely in the water alongside ${him2},`);
							} else {
								r.push(`${He} is lead to a special pool designed to give birth in. Once ${he} is safely in the water alongside ${his} assistant,`);
							}
							r.push(`${he} begins to push out ${firstText} baby, indifferent to ${his} watching caretaker. ${His} child is promptly taken and, following a cleaning of ${his} still very gravid body, ${he} is taken back to the nursery.`);
						} else {
							r.push(`While soaking in the nursery's pool, ${slave.slaveName}'s water breaks. As ${he} begins to ready ${himself} for birth,`);
							if (V.MatronID !== 0) {
								r.push(`${S.Matron.slaveName} pulls ${him} out of the pool and glares at ${him}.`);
							} else {
								r.push(`the other bathers watch curiously.`);
							}
							r.push(clothingBirth());
							r.push(`${He} and ${firstText} child are quickly dried off as ${he} begins nursing it. A servant soon arrives to take ${his} child away.`);
						}
					} else {
						if (random(1, 20) > suddenBirth) {
							if (V.MatronID !== 0) {
								r.push(`${S.Matron.slaveName} escorts ${him} to a special pool designed to give birth in. Once ${he} is safely in the water alongside ${him2},`);
							} else {
								r.push(`${He} is escorted to a special pool designed to give birth in. Once ${he} is safely in the water alongside ${his} assistant,`);
							}
							r.push(`${he} begins to push out ${firstText} baby,`);
							if (slave.geneticQuirks.uterineHypersensitivity === 2) {
								r.push(`convulsing with orgasms in the process and being`);
							}
							r.push(`aided by ${his} caretaker. ${His} child is promptly taken and, following a cleaning of ${his} still very gravid body, ${he} is taken back to the nursery.`);
						} else {
							if (!canWalk(slave)) {
								r.push(`While changing in the changing room before a nice soak, ${slave.slaveName}'s water breaks. ${He} hurries to find someone to help ${him} but only finds curious onlookers.`);
							} else {
								r.push(`While heading for the changing room before a nice soak, ${slave.slaveName}'s water breaks. ${He} hurries into the changing room only to find it unusually crowded.`);
							}
							r.push(`Without any choice left, ${he} assumes a birthing position.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`Several of other slaves present help ${him} with ${firstText} child while the rest finish pleasuring themselves over the show.`);
							if (V.MatronID !== 0) {
								r.push(`${S.Matron.slaveName}, lured in by the commotion, shoos the other slaves out and helps the new mother to a private relaxation room to unwind.`);
							} else {
								r.push(`Soon a servant arrives to take ${his} child away and ${he} is ushered into the bath to clean up and relax.`);
							}
						}
					}
					break;

				case Job.SCHOOL:
					if (S.Schoolteacher) {
						({he2, his2} = getPronouns(S.Schoolteacher).appendSuffix("2"));
					}
					if (!canWalk(slave)) {
						if (random(1, 20) > suddenBirth) {
							r.push(`Having been notified in the weeks leading up to ${his}`);
							if (slave.counter.birthsTotal === 0) {
								r.push(`first`);
							} else {
								r.push(`regular`);
							}
							r.push(`birth, ${he} is helped to the front of the class and stripped; ${he} is being used as a learning aid in this lesson. Blushing strongly, ${he} begins working on birthing ${firstText} baby, fully aware of the rapt attention of the other students.`);
							if (slave.geneticQuirks.uterineHypersensitivity === 2) {
								r.push(`However ${he} quickly forgets about the audience as orgasms, one after another, hit ${him}.`);
							}
							r.push(`${His} child is promptly taken and, following a cleaning and fresh change of clothes, ${he} is helped back to ${his} seat. ${He} can't help but`);
							if (canSee(slave)) {
								r.push(`notice some of the detailed notes the class took on ${his} genitals.`);
							} else {
								r.push(`overhear some of the lewd comments about ${his} still very gravid figure.`);
							}
							humiliation = 1;
						} else {
							r.push(`During a lesson in ${V.schoolroomName}, ${slave.slaveName}'s water breaks. Since ${he} can't leave the lesson, ${he} tries ${his} best to hold back the upcoming birth of ${firstText} baby. ${He} fails to manage and a particularly strong contraction elicits a moan noticeable enough to draw all the students' attention.`);
							humiliation = 1;
							r.push(clothingBirth());
							if (S.Schoolteacher) {
								r.push(`${S.Schoolteacher.slaveName}, furious that ${his2} lesson was interrupted, drags ${his} still very pregnant ass from the class along with ${his} newborn child.`);
							} else {
								r.push(`${He} gathers ${his} newborn child up and is quickly helped from the class.`);
							}
							r.push(`${He} can feel all the eyes watching ${him} leave.`);
						}
					} else {
						if (random(1, 20) > suddenBirth) {
							r.push(`Having been notified in the weeks leading up to ${his}`);
							if (slave.counter.birthsTotal === 0) {
								r.push(`first`);
							} else {
								r.push(`regular`);
							}
							r.push(`birth, ${he} heads to the front of the class and strips; ${he} is being used as a learning aid in this lesson. Blushing strongly, ${he} begins working on birthing ${firstText} baby, fully aware of the rapt attention of the other students.`);
							if (slave.geneticQuirks.uterineHypersensitivity === 2) {
								r.push(`However ${he} quickly forgets about the audience as orgasms, one after another, hit ${him}.`);
							}
							r.push(`${His} child is promptly taken and, following a cleaning and fresh change of clothes, ${he} returns to ${his} seat. ${He} can't help but`);
							if (canSee(slave)) {
								r.push(`notice some of the detailed notes the class took on ${his} genitals.`);
							} else {
								r.push(`overhear some of the lewd comments about ${his} still very gravid figure.`);
							}
							humiliation = 1;
						} else {
							r.push(`During a lesson in ${V.schoolroomName}, ${slave.slaveName}'s water breaks. Since ${he} can't leave the lesson, ${he} tries ${his} best to hold back the upcoming birth of ${firstText} baby. ${He} fails to manage and a particularly strong contraction elicits a moan noticeable enough to draw all the students' attention.`);
							humiliation = 1;
							r.push(clothingBirth());
							if (S.Schoolteacher) {
								r.push(`${S.Schoolteacher.slaveName}, furious that ${his2} lesson was interrupted, dismisses ${him} from the class along with ${his} newborn child.`);
							} else {
								r.push(`${He} gathers ${his} newborn child up and quickly excuses ${himself} from the class.`);
							}
							r.push(`${He} can feel all the eyes staring at ${his} still very gravid middle.`);
						}
					}
					break;

				case Job.CLASSES:
					if (random(1, 20) > suddenBirth) {
						r.push(`Or ${he} would have, had ${V.assistant.name} allowed it. Since ${he} can't leave the lesson, ${he} tries ${his} best to hold back the upcoming birth, not without your assistant noticing. As punishment for poor planning, especially since this will be a weekly occurrence in ${his} life, ${his} birth will be turned into a live broadcast. Blushing strongly, ${he} begins working on birthing ${firstText} baby, trying ${his} best to hide ${his} shame.`);
						if (slave.geneticQuirks.uterineHypersensitivity === 2) {
							r.push(`However ${he} quickly forgets about the audience as orgasms, one after another, hit ${him}.`);
						}
						r.push(`Exhausted from the birth, ${he} is permitted a short break as ${his} child is collected to clean ${himself} up before the lesson is continued.`);
						humiliation = 1;
					} else {
						r.push(`During a lesson under ${V.assistant.name}, ${slave.slaveName}'s water breaks. Since ${he} can't leave the lesson, ${he} tries ${his} best to hold back the upcoming birth, not without your assistant noticing. As punishment for poor planning, especially since this will be a weekly occurrence in ${his} life, ${he} is forbidden from leaving. Additionally, ${his} birth will be turned into a live broadcast.`);
						humiliation = 1;
						r.push(clothingBirth());
						r.push(`Exhausted from the birth, ${he} is permitted a short break as ${firstText} child is gathered to`);
						if (!canWalk(slave)) {
							r.push(`be cleaned`);
						} else {
							r.push(`clean ${himself}`);
						}
						r.push(`up before the lesson is continued.`);
					}
					break;

				case Job.BROTHEL:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} is helped to a private room in the back of the brothel by a group of eager patrons. Instinctively, ${he} begins to push out ${firstText} baby, indifferent to ${his} audience. ${His} child is promptly taken and, following a cleaning and fresh change of clothes, the audience is allowed to have their way with ${his} still very gravid body.`);
							} else {
								if (birthScene > 80 && canDoVaginal(slave)) {
									r.push(`While riding a customer's dick, ${slave.slaveName}'s water breaks on him. Showing no signs of stopping, he shoves ${his} bulk off of him. Instinctively, ${he} begins to push out ${firstText} baby, indifferent to who may be watching ${his} naked crotch. ${He} draws ${his} child to ${his} breast before seeking out the next customer's cock.`);
								} else if (birthScene > 60 && canDoAnal(slave)) {
									r.push(`While taking a customer's dick in ${his} ass, ${slave.slaveName}'s water breaks. ${He} shows no signs of slowing down, so he allows ${him} to reposition and continue. Instinctively, ${he} begins to push out ${firstText} baby, indifferent to who may be watching ${his} naked crotch. He came strongly thanks to ${him} and gives ${him} a slap on the ass as ${he} struggles to reach ${his} child around ${his} still very gravid middle. Once ${he} has brought ${his} child to ${his} breast, ${he} seeks out the next customer's cock.`);
								} else if (birthScene > 40) {
									r.push(`While licking a customer's cunt, ${slave.slaveName}'s water breaks. ${He} shows no signs of slowing down, so she allows ${him} to reposition and continue.`);
									r.push(clothingBirth());
									r.push(`The customer splashes across ${his} face as ${he} struggles to reach ${firstText} child around ${his} still very gravid middle. Once ${he} has brought ${his} child to ${his} breast, ${he} seeks out the next customer's cunt.`);
								} else {
									r.push(`While sucking a customer's dick, ${slave.slaveName}'s water breaks. ${He} shows no signs of slowing down, so he allows ${him} to reposition and continue.`);
									r.push(clothingBirth());
									r.push(`He cums down ${his} throat as ${he} struggles to reach ${firstText} child around ${his} still very gravid middle. Once ${he} has brought ${his} child to ${his} breast, ${he} seeks out the next customer's cock.`);
								}
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} is helped to a private room in the back of the brothel by several patrons who paid quite a handsome price to enjoy this moment.`);
								if (slave.devotion > 20) {
									r.push(`${He} settles ${himself} onto a patron's lap and begins working on birthing ${firstText} baby, basking in the attention of ${his} audience${UH}. ${His} ${childrenAre} promptly taken and ${he} beckons the audience to enjoy ${his} still very gravid body.`);
								} else if (slave.devotion >= -20) {
									r.push(`${He} hesitantly begins to pose, but one of the patrons grabs ${him} by the swollen waist and pulls ${him} onto his lap. ${He} winces as his dick slips over ${his} exposed crotch, but can do nothing to stop ${firstText} baby from being born. ${He} hates that the first thing ${his} child will touch is an erect cock; a bitter reminder${(slave.geneticQuirks.uterineHypersensitivity === 2) ? `, which even ${his} powerful orgasm can't erase,` : ``} of what its future will likely hold. ${His} fully born child is promptly taken and ${his} clients descend upon ${his} vulnerable, still very gravid, body.`);
								} else {
									r.push(`${He} stands shaking, ${his} waters flowing down ${his}`);
									if (hasAnyLegs(slave)) {
										r.push(`${hasBothLegs(slave) ? `legs` : `leg`},`);
									} else {
										r.push(`body,`);
									}
									r.push(`until one of the patrons grabs ${him} by the swollen waist and pulls ${him} onto his lap. ${He} cries out as his dick slips over ${his} exposed crotch, but can do nothing to stop ${firstText} baby from being born. ${He} hates that the first thing ${his} child will touch is an erect cock; a bitter reminder${(slave.geneticQuirks.uterineHypersensitivity === 2) ? `, which even powerful orgasm can't erase,` : ``} of what its future will likely hold. ${His} fully born child is promptly taken and ${his} clients descend upon ${his} vulnerable, still very gravid, body.`);
								}
							} else {
								if (birthScene > 80 && canDoVaginal(slave)) {
									r.push(`While riding a customer's dick, ${slave.slaveName}'s water breaks on him. ${He} desperately tries to disengage but he grabs ${his} hips and slams ${him} back down. He thoroughly enjoys ${his} contracting cunt before pushing ${him} off and standing over ${him}, jacking off. Quickly ${he} spreads ${his} legs apart and begins pushing out ${firstText} baby${UH}. ${He} can't hide what's happening between ${his} legs,`);
									if (slave.fetish === "humiliation") {
										r.push(`but that only makes it more exciting.`);
									} else {
										r.push(`so ${he} bears with it.`);
									}
									r.push(`He cums over ${his} heaving, still very gravid body and moves on leaving ${him} to recover and collect ${his} child to be sent off.`);
									humiliation = 1;
								} else if (birthScene > 60 && canDoAnal(slave)) {
									r.push(`While taking a customer's dick in ${his} ass, ${slave.slaveName}'s water breaks. ${He} desperately tries to disengage but he grabs ${his} hips and slams into ${him} hard. Quickly ${he} spreads ${his} legs apart and begins pushing out ${firstText} baby${UH}. ${He} can't hide what's happening between ${his} legs,`);
									if (slave.fetish === "humiliation") {
										r.push(`but that only makes it more exciting.`);
									} else {
										r.push(`so ${he} bears with it.`);
									}
									r.push(`He came strongly thanks to ${him} and gives ${him} a slap on the ass as ${he} collapses onto ${his} still very gravid belly and slips to ${his} side. ${He} quickly gathers ${his} child to be sent off.`);
									humiliation = 1;
								} else if (birthScene > 40) {
									r.push(`While licking a customer's cunt, ${slave.slaveName}'s water breaks. ${He} desperately tries to disengage but she grabs ${his} head and slams ${him} back into ${his} crotch.`);
									humiliation = 1;
									r.push(clothingBirth());
									r.push(`She cums across ${his} face before helping ${his} still very gravid body to the ground and leaving. When ${he} recovers, ${he} quickly gathers ${firstText} child to be sent off.`);
								} else {
									r.push(`While sucking a customer's dick, ${slave.slaveName}'s water breaks. ${He} desperately tries to disengage but he grabs ${his} head and slams ${him} back into his crotch.`);
									humiliation = 1;
									r.push(clothingBirth());
									r.push(`He cums down ${his} throat before letting ${him} collapse to the ground and leaving. When ${he} recovers and pushes ${his} still very gravid body upright, ${he} quickly gathers ${firstText} child to be sent off.`);
								}
							}
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} heads to a private room in the back of the brothel filled with eager patrons. Instinctively, ${he} begins to push out ${firstText} baby, indifferent to ${his} audience. ${His} child is promptly taken and, following a cleaning and fresh change of clothes, the audience is allowed to have their way with ${his} still very gravid body.`);
							} else {
								if (birthScene > 80 && canDoVaginal(slave)) {
									r.push(`While riding a customer's dick, ${slave.slaveName}'s water breaks on him. Showing no signs of stopping, he shoves ${his} bulk off of him. Instinctively, ${he} begins to push out ${firstText} baby, indifferent to who may be watching ${his} naked crotch. ${He} draws ${his} child to ${his} breast before seeking out the next customer's cock.`);
								} else if (birthScene > 60 && canDoAnal(slave)) {
									r.push(`While taking a customer's dick in ${his} ass, ${slave.slaveName}'s water breaks. ${He} shows no signs of slowing down, so he allows ${him} to reposition and continue. Instinctively, ${he} begins to push out ${firstText} baby, indifferent to who may be watching ${his} naked crotch. He came strongly thanks to ${him} and gives ${him} a slap on the ass as ${he} struggles to reach ${his} child around ${his} still very gravid middle. Once ${he} has brought ${his} child to ${his} breast, ${he} seeks out the next customer's cock.`);
								} else if (birthScene > 40) {
									r.push(`While licking a customer's cunt, ${slave.slaveName}'s water breaks. ${He} shows no signs of slowing down, so she allows ${him} to reposition and continue.`);
									r.push(clothingBirth());
									r.push(`The customer splashes across ${his} face as ${he} struggles to reach ${his} child around ${his} still very gravid middle. Once ${he} has brought ${his} child to ${his} breast, ${he} seeks out the next customer's cunt.`);
								} else {
									r.push(`While sucking a customer's dick, ${slave.slaveName}'s water breaks. ${He} shows no signs of slowing down, so he allows ${him} to reposition and continue.`);
									r.push(clothingBirth());
									r.push(`He cums down ${his} throat as ${he} struggles to reach ${his} child around ${his} still very gravid middle. Once ${he} has brought ${his} child to ${his} breast, ${he} seeks out the next customer's cock.`);
								}
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} heads to a private room in the back of the brothel accompanied by several patrons who paid quite a handsome price to enjoy this moment.`);
								if (slave.devotion > 20) {
									r.push(`${He} settles ${himself} onto a patron's lap and begins working on birthing ${firstText} baby, basking in the attention of ${his} audience${UH}. ${His} ${childrenAre} promptly taken and ${he} beckons the audience to enjoy ${his} still very gravid body.`);
								} else if (slave.devotion >= -20) {
									r.push(`${He} hesitantly begins to pose, but one of the patrons grabs ${him} by the swollen waist and pulls ${him} onto his lap. ${He} winces as his dick slips over ${his} exposed crotch, but can do nothing to stop ${firstText} baby from being born. ${He} hates that the first thing ${his} child will touch is an erect cock; a bitter reminder${(slave.geneticQuirks.uterineHypersensitivity === 2) ? `, which even ${his} powerful orgasm can't erase,` : ``} of what its future will likely hold. ${His} fully born child is promptly taken and ${his} clients descend upon ${his} vulnerable, still very gravid, body.`);
								} else {
									r.push(`${He} stands shaking, ${his} waters flowing down ${his}`);
									if (hasAnyLegs(slave)) {
										r.push(hasBothLegs(slave) ? `legs` : `leg`);
									} else {
										r.push(`body,`);
									}
									r.push(`until one of the patrons grabs ${him} by the swollen waist and pulls ${him} onto his lap. ${He} cries out as his dick slips over ${his} exposed crotch, but can do nothing to stop ${firstText} baby from being born. ${He} hates that the first thing ${his} child will touch is an erect cock; a bitter reminder${(slave.geneticQuirks.uterineHypersensitivity === 2) ? `, which even ${his} powerful orgasm can't erase,` : ``} of what its future will likely hold. ${His} fully born child is promptly taken and ${his} clients descend upon ${his} vulnerable, still very gravid, body.`);
								}
							} else {
								if (birthScene > 80 && canDoVaginal(slave)) {
									r.push(`While riding a customer's dick, ${slave.slaveName}'s water breaks on him. ${He} desperately tries to disengage but he grabs ${his} hips and slams ${him} back down. He thoroughly enjoys ${his} contracting cunt before pushing ${him} off and standing over ${him}, jacking off. Quickly ${he} spreads ${his} legs apart and begins pushing out ${firstText} baby${UH}. ${He} can't hide what's happening between ${his} legs,`);
									if (slave.fetish === "humiliation") {
										r.push(`but that only makes it more exciting.`);
									} else {
										r.push(`so ${he} bears with it.`);
									}
									r.push(`He cums over ${his} heaving, still very gravid body and moves on leaving ${him} to recover and collect ${his} child to be sent off.`);
									humiliation = 1;
								} else if (birthScene > 60 && canDoAnal(slave)) {
									r.push(`While taking a customer's dick in ${his} ass, ${slave.slaveName}'s water breaks. ${He} desperately tries to disengage but he grabs ${his} hips and slams into ${him} hard. Quickly ${he} spreads ${his} legs apart and begins pushing out ${firstText} baby${UH}. ${He} can't hide what's happening between ${his} legs,`);
									if (slave.fetish === "humiliation") {
										r.push(`but that only makes it more exciting.`);
									} else {
										r.push(`so ${he} bears with it.`);
									}
									r.push(`He came strongly thanks to ${him} and gives ${him} a slap on the ass as ${he} collapses onto ${his} still very gravid belly and slips to ${his} side. ${He} quickly gathers ${his} child to be sent off.`);
									humiliation = 1;
								} else if (birthScene > 40) {
									r.push(`While licking a customer's cunt, ${slave.slaveName}'s water breaks. ${He} desperately tries to disengage but she grabs ${his} head and slams ${him} back into her crotch.`);
									humiliation = 1;
									r.push(clothingBirth());
									r.push(`She cums across ${his} face before helping ${his} still very gravid body to the ground and leaving. When ${he} recovers, ${he} quickly gathers ${firstText} child to be sent off.`);
								} else {
									r.push(`While sucking a customer's dick, ${slave.slaveName}'s water breaks. ${He} desperately tries to disengage but he grabs ${his} head and slams ${him} back into his crotch.`);
									humiliation = 1;
									r.push(clothingBirth());
									r.push(`He cums down ${his} throat before letting ${him} collapse to the ground and leaving. When ${he} recovers and pushes ${his} still very gravid body`);
									if (hasBothLegs(slave)) {
										r.push(`to its feet,`);
									} else {
										r.push(`into a standing position,`);
									}
									r.push(`${he} quickly gathers ${firstText} child to be sent off.`);
								}
							}
						}
					}

					break;
				case Job.TEACHER:
					if (!canWalk(slave)) {
						if (random(1, 20) > suddenBirth) {
							r.push(`${He} calls for ${his} teaching aid to help position ${him} so the class may receive a lesson on childbirth. ${He} begins working on birthing ${firstText} baby, fully aware of ${his} watching students. ${He} demonstrates the proper ways to labor and how to deliver a baby${(slave.geneticQuirks.uterineHypersensitivity === 2) ? ` even if your body is wracked by nonstop orgasm` : ``}. ${He} explains the infant's future as ${his} child taken and excuses the class for a short break in order to freshen up. Upon their return, ${he} begins a lesson on being a broodmother, as there is always a curious face locked onto ${his} still very gravid middle.`);
							humiliation = 1;
						} else {
							r.push(`While teaching a lesson, ${slave.slaveName}'s water breaks. Sensing ${he} wouldn't be able to make it to the birthing area, ${he} instead chooses to act on the opportunity. Today's lesson will be on childbirth.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`Once ${he} recovers enough, ${he} gathers ${firstText} newborn child and instructs the class to take notes on the lesson ${he} just demonstrated before being escorted out of the classroom. All eyes are locked onto ${his} still very gravid middle; it's clear the class will need a lecture on broodmothers and their weekly routine.`);
						}
					} else {
						if (random(1, 20) > suddenBirth) {
							r.push(`While stripping, ${he} makes ${his} way to the front of the classroom and settles ${himself} in a way ${his} entire class can see. Birth`);
							if (slave.counter.birthsTotal === 0) {
								r.push(`will be`);
							} else {
								r.push(`is`);
							}
							r.push(`a regular occurrence in ${his} life and it would be a waste to not work it into ${his} lesson plan. ${He} wiggles ${himself} into a comfortable spot and begins working on birthing ${firstText} baby, fully aware of ${his} watching students. ${He} demonstrates the proper ways to labor and how to deliver a baby${(slave.geneticQuirks.uterineHypersensitivity === 2) ? ` even if your body is wracked by nonstop orgasm` : ``}. ${He} explains the infant's future as ${his} child is taken and excuses the class for a short break in order to freshen up. Upon their return, ${he} begins a lesson on being a broodmother, as there is always a curious face locked onto ${his} still very gravid middle.`);
							humiliation = 1;
						} else {
							r.push(`While teaching a lesson, ${slave.slaveName}'s water breaks. Sensing ${he} wouldn't be able to make it to the birthing area, ${he} instead chooses to act on the opportunity. Today's lesson will be on childbirth.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`Once ${he} recovers enough, ${he} gathers ${firstText} newborn child and instructs the class to take notes on the lesson ${he} just demonstrated before leaving to drop off ${his} child for removal. ${He} feels all the eyes on ${his} still very pregnant body as ${he} waddles past. It's clear the class will need a review on broodmothers when ${he} returns.`);
						}
					}
					break;

				case Job.CONCUBINE:
					if (slave.pregSource === -1 && slave.relationship === -3) {
						if (random(1, 20) > suddenBirth) {
							r.push(`You make sure to find time in your busy schedule to be at your concubine ${wife}'s side as ${he} gives birth to your children, even if it's`);
							if (slave.counter.birthsTotal === 0) {
								r.push(`to be`);
							}
							r.push(`a weekly occurrence. You gently caress ${slave.slaveName}'s body as ${he} begins to push out ${firstText} baby${UH}. You help ${him} upright and hold your child to ${his} breasts. The two of you cuddle as you watch your newborn suckle from its mother. Since ${he} is quite special to you, you allow ${him} the time to pick out names before ${his} child has to be taken away. When the time comes to pick up the newborn, the slave servant is surprised to find a name-card affixed to its blanket.`);
							if (slave.fetish !== Fetish.MINDBROKEN) {
								r.push(`${He} can't help but feel more devoted to ${his} master after seeing such a touching act. Before you leave, ${slave.slaveName} expresses how cute ${he} found your child and that ${he} can't wait to see the next one.`);
							}
						} else {
							r.push(`Your sleep is awoken by a moist sensation and a loud moan beside you. As you help your concubine ${wife} up, ${he} can't hold back the coming birth.`);
							r.push(clothingBirth());
							r.push(`As you swaddle ${firstText} baby, you cuddle up to the still very gravid ${girl}. Bringing your child to ${his} breast, you enjoy each other's comfort until a servant comes to clean up. Since ${he} is quite special to you, you allow ${him} the time to pick out names before ${his} child has to be taken away. The slave servant is somewhat surprised by your actions, but understands those closest to you are afforded luxuries far beyond ${hisU} peers.`);
						}
					} else if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} is assisted in reaching your side. You call ${him} over and strip ${him} as ${he} instinctively begins to push out ${firstText} baby, indifferent to your wandering hands. ${His} child is promptly taken and, following a cleaning, a fresh change of clothes, and some private time with you, ${he} is helped back to your master suite.`);
							} else {
								r.push(`${slave.slaveName} cradles ${his} gravid belly, waiting for your return, when ${his} water breaks. This disturbance of ${his} usual routine spurs ${him} to look for you and ${he} begins struggling to find you. You find ${him} in the halls, halfway to your office, just barely holding back ${firstText} child. You help ${him} the rest of the way, just before it's too late.`);
								r.push(clothingBirth());
								r.push(`Cradling your child, the two of you rest for a spell before sending it off and spending some more intimate time together.`);
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} is assisted in reaching your side. You beckon ${him} over and strip ${him} as ${he} dutifully begins to push out ${firstText} baby, enjoying your wandering hands and attention${UH}. ${His} child is promptly taken and, following a cleaning, a fresh change of clothes, and some private time with you, ${he} is helped back to your master suite. As ${he} leaves your office, ${he} throws you a wink, hoping to see you again soon.`);
							} else {
								r.push(`${slave.slaveName} cradles ${his} gravid belly, waiting for your return, when ${his} water breaks. Saddened that you aren't there for the show, ${he} begins struggling to crawl to you. By the time ${he} reaches your office, ${he} is barely holding back ${his} child. You rise to meet ${him} and help ${him} onto the couch, just before it's too late.`);
								r.push(clothingBirth());
								r.push(`Cradling your child, the two of you rest for a spell before sending it off and spending some more intimate time together.`);
							}
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} wanders the penthouse until ${he} finds you. You call ${him} over and strip ${him} as ${he} instinctively begins to push out ${firstText} baby, indifferent to your wandering hands. ${His} child is promptly taken and, following a cleaning, a fresh change of clothes, and some private time with you, ${he} returns to your master suite.`);
							} else {
								r.push(`${slave.slaveName} cradles ${his} gravid belly, waiting for your return, when ${his} water breaks. This disturbance of ${his} usual routine spurs ${him} to look for you and ${he} begins waddling off to find you. As ${he} inches into your office, it's abundantly clear ${firstText} child is just beginning to crown. You help ${him} to the couch, just as the show begins.`);
								r.push(clothingBirth());
								r.push(`Cradling your child, the two of you rest for a spell before sending it off and spending some more intimate time together.`);
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} wanders the penthouse until ${he} finds you. You beckon ${him} over and strip ${him} as ${he} dutifully begins to push out ${firstText} baby, enjoying your wandering hands and attention${(slave.geneticQuirks.uterineHypersensitivity === 2) ? `, while convulsing with orgasms in the process` : ``}. ${His} child is promptly taken and, following a cleaning, a fresh change of clothes, and some private time with you, ${he} returns to your master suite. As ${he} waddles from your office, ${he} throws you a wink, hoping to see you again soon.`);
							} else {
								r.push(`${slave.slaveName} cradles ${his} gravid belly, waiting for your return, when ${his} water breaks. Saddened that you aren't there for the show, ${he} begins waddling off to find you. By the time ${he} reaches your office, ${he} is barely holding back ${his} ${children}. You rise to meet ${him} and help ${him} onto the couch, just before it's too late.`);
								r.push(clothingBirth());
								r.push(`Cradling your child, the two of you rest for a spell before sending them off and spending some more intimate time together.`);
							}
						}
					}
					break;

				case Job.HEADGIRLSUITE:
					({He2, he2, his2} = getPronouns(S.HeadGirl).appendSuffix("2"));
					if (slave.pregSource === V.HeadGirlID) {
						if (random(1, 20) > suddenBirth) {
							r.push(`${S.HeadGirl.slaveName} makes sure that the mother of ${his2} child is happy and comfortable for the upcoming birth, even if they won't be spending much time with their offspring. ${He2} carefully undresses ${slave.slaveName}, all the while whispering sweet nothings in ${his} ear. ${He} begins to push out ${firstText} baby${UH}, and ${his} child is carefully collected by their father. Once they are out of the way, ${S.HeadGirl.slaveName} moves in to fondle ${slave.slaveName}'s tired, still very gravid body.`);
						}
					} else {
						if (!canWalk(slave)) {
							if (slave.fetish === Fetish.MINDBROKEN) {
								if (random(1, 20) > suddenBirth) {
									r.push(`${He} is aided in finding ${S.HeadGirl.slaveName}, who undresses ${him} as ${he} instinctively begins to push out ${firstText} baby, indifferent to ${his2} wandering hands. ${His} child is promptly taken and, following a cleaning, a fresh change of clothes, and some private time with your Head Girl, ${he} is taken back to ${S.HeadGirl.slaveName}' room.`);
								} else {
									r.push(`${slave.slaveName} is awoken from ${his} rest by a strong contraction. ${He} rolls over and begins to fall back to sleep as another contraction wracks ${his} body.`);
									r.push(clothingBirth());
									r.push(`${He} fishes around under ${his} still huge dome of a stomach searching for ${his} newborn. Once ${he} finds it, ${he} draws it to ${his} breast and resumes resting before ${S.HeadGirl.slaveName} returns from ${his2} duties.`);
								}
							} else {
								if (random(1, 20) > suddenBirth) {
									r.push(`${He} is aided in seeking out ${S.HeadGirl.slaveName}, who undresses ${him} as ${he} dutifully begins to push out, enjoying ${his2} wandering hands and attention${(slave.geneticQuirks.uterineHypersensitivity === 2) ? `, while convulsing with orgasms in the process` : ``}. ${His} child is promptly taken and, following a cleaning, a fresh change of clothes, and some private time with your Head Girl, ${he} is helped back to ${S.HeadGirl.slaveName}'s room.`);
								} else {
									r.push(`${slave.slaveName} is awoken from ${his} rest by a moist sensation followed by a contraction. ${He} rolls over and clutches ${his} gravid belly as another contraction wracks ${his} body.`);
									r.push(clothingBirth());
									r.push(`${He} collects ${firstText} child and places it in the cradle readied for ${him}. ${He} is helped to the shower as your servants clean up and remove ${his} newborn. Freshened up, ${he} returns to resting knowing full well that ${S.HeadGirl.slaveName} will be eager to play with ${his} still very pregnant body when ${he2} finishes ${his2} rounds.`);
								}
							}
						} else {
							if (slave.fetish === Fetish.MINDBROKEN) {
								if (random(1, 20) > suddenBirth) {
									r.push(`${He} wanders until ${he} finds ${S.HeadGirl.slaveName}, who undresses ${him} as ${he} instinctively begins to push out ${firstText} baby, indifferent to ${his2} wandering hands. ${His} child is promptly taken and, following a cleaning, a fresh change of clothes, and some private time with your Head Girl, ${he} is lead back to ${S.HeadGirl.slaveName}' room.`);
								} else {
									r.push(`${slave.slaveName} is awoken from ${his} rest by a strong contraction. ${He} rolls over and begins to fall back to sleep as another contraction wracks ${his} body.`);
									r.push(clothingBirth());
									r.push(`${He} fishes around under ${his} still huge dome of a stomach searching for ${his} newborn. Once ${he} finds it, ${he} draws it to ${his} breast and resumes resting before ${S.HeadGirl.slaveName} returns from ${his2} duties.`);
								}
							} else {
								if (random(1, 20) > suddenBirth) {
									r.push(`${He} seeks out ${S.HeadGirl.slaveName}, who undresses ${him} as ${he} dutifully begins to push out ${firstText} baby, enjoying ${his2} wandering hands and attention${(slave.geneticQuirks.uterineHypersensitivity === 2) ? `, while convulsing with orgasms in the process` : ``}. ${His} child is promptly taken and, following a cleaning, a fresh change of clothes, and some private time with your Head Girl, ${he} returns to ${S.HeadGirl.slaveName}'s room.`);
								} else {
									r.push(`${slave.slaveName} is awoken from ${his} rest by a moist sensation followed by a contraction. ${He} rolls over and clutches ${his} gravid belly as another contraction wracks ${his} body.`);
									r.push(clothingBirth());
									r.push(`${He} collects ${firstText} child and places it in the cradle readied for ${him}. ${He} waddles off to shower as your servants clean up and remove ${his} newborn. Freshened up, ${he} returns to resting knowing full well that ${S.HeadGirl.slaveName} will be eager to play with ${his} still very pregnant body when ${he2} finishes ${his2} rounds.`);
								}
							}
						}
					}
					break;

				case Job.ARCADE:
					r.push(`Or ${he} would have been, if ${he} weren't locked in an arcade cabinet. A gush of liquid pours from ${slave.slaveName}'s cunt, followed by the attendant in charge of the arcade hanging an "out of order" sign on ${his} exposed rear. While ${his} mouth is filled with a customer's dick, ${his}`);
					if (slave.geneticQuirks.uterineHypersensitivity === 2) {
						r.push(`orgasming`);
					}
					r.push(`body instinctively births ${firstText} baby into a waiting basket. As it is carried away, ${his} rear is cleaned up and the sign removed.`);
					break;

				case Job.CLINIC:
					if (S.Nurse) {
						({he2, his2} = getPronouns(S.Nurse).appendSuffix("2"));
					} else {
						({he2, his2} = getNonlocalPronouns(V.seeDicks).appendSuffix('2'));
					}
					if (!canWalk(slave)) {
						if (random(1, 20) > suddenBirth) {
							r.push(`${He} is helped to the clinic's maternity ward.`);
							if (S.Nurse) {
								r.push(S.Nurse.slaveName);
							} else {
								r.push(`A freelance nurse`);
							}
							r.push(`delivers ${firstText} child before taking it away. Before long ${he} is returned to ${his} recovery room to rest.`);
						} else {
							r.push(`${slave.slaveName} is in the perfect place to give birth when ${his} water breaks.`);
							if (S.Nurse) {
								r.push(S.Nurse.slaveName);
							} else {
								r.push(`A freelance nurse`);
							}
							r.push(`delivers ${firstText} child before taking it away. Before long ${he2} returns to attend to ${his2} patient's post-birth health.`);
						}
					} else {
						if (random(1, 20) > suddenBirth) {
							r.push(`${He} is guided to the clinic's maternity ward.`);
							if (S.Nurse) {
								r.push(S.Nurse.slaveName);
							} else {
								r.push(`A freelance nurse`);
							}
							r.push(`delivers ${firstText} child before taking it away. Before long ${he} is returned to ${his} recovery room to rest.`);
						} else {
							r.push(`${slave.slaveName} is in the perfect place to give birth when ${his} water breaks.`);
							if (S.Nurse) {
								r.push(S.Nurse.slaveName);
							} else {
								r.push(`A freelance nurse`);
							}
							r.push(`delivers ${firstText} child before taking it away. Before long ${he2} returns to attend to ${his2} patient's post-birth health.`);
						}
					}
					break;

				case Job.CELLBLOCK:
					if (slave.fetish === Fetish.MINDBROKEN) {
						if (random(1, 20) > suddenBirth) {
							r.push(`${He} is forced into a specially designed cell to give birth in. Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and, after ${his} still very gravid body and the cell are hosed down, ${he} is moved back into a standard cell.`);
						} else {
							r.push(`While waiting in a cell in ${V.cellblockName}, ${slave.slaveName}'s water breaks. ${He} assumes a birthing position,`);
							r.push(clothingBirth());
							r.push(`${He} struggles to reach ${firstText} child around ${his} still very gravid middle and resumes waiting with it latched to ${his} breast.`);
						}
					} else {
						if (random(1, 20) > suddenBirth) {
							r.push(`${He} is forced into a specially designed cell to give birth in. Reluctantly, ${he} begins to push out ${firstText} baby${UH}. ${His} child is promptly taken and, after ${his} still very gravid body and the cell are hosed down, ${he} is moved back into a standard cell.`);
						} else {
							r.push(`${slave.slaveName} is awoken from ${his} stupor by moist sensation followed by a contraction. ${He} rolls over and clutches ${his} gravid belly as another contraction wracks ${his} body.`);
							r.push(clothingBirth());
							r.push(`${He} collects ${his} ${firstText} child and holds it close knowing someone will soon come to take it away from ${him}.`);
						}
					}
					break;

				case Job.DJ:
					if (random(1, 20) > suddenBirth) {
						r.push(`${He} heads to a private room in the back of the club accompanied by an influential patron. ${He} settles ${himself} onto his lap and begins working on ${firstText} baby, basking in his attention${UH}. Placing ${his} child outside the room, ${he} returns to pleasure ${his} tease.`);
					} else {
						r.push(`While DJing ${V.clubName}, ${slave.slaveName}'s water breaks. ${He} can't stop ${his} setlist without drawing attention, so ${he} tries ${his} best to ride out the contractions. As soon as the opportunity arises, ${he} attempts to sneak off stage. However, a number of fans block ${his} progress keeping ${him} on stage. Before long the contractions are too much to bear and ${he} drops to the ground.`);
						humiliation = 1;
						r.push(clothingBirth());
						r.push(`Exhausted, ${he} sits up and smiles to the crowd. ${His} show definitely drew attention to ${his} club. With a burst of energy ${he} hefts ${his} still very gravid body to its feet, bows to the crowd, and gathers ${firstText} child before making ${his} way off stage. As ${he} leaves the public's gaze, ${he} shouts out with a wink "Same time next week!"`);
					}
					break;

				case Job.ATTENDANT:
					if (random(1, 20) > suddenBirth) {
						r.push(`${S.Attendant.slaveName} waddles to a special pool designed to give birth in. Once ${he} is safely in the water, ${he} begins to push out ${firstText} baby,`);
						if (slave.geneticQuirks.uterineHypersensitivity === 2) {
							r.push(`convulsing with orgasms in the process, which is`);
						}
						r.push(`something ${he} has been trained for. ${His} child is promptly taken and, following a cleaning, ${he} heads back to the main pool.`);
					} else {
						r.push(`While tending to the guests in the spa, ${slave.slaveName}'s water breaks. The slaves quickly come to ${his} aid as the contractions get closer and closer together. Their hands are all over ${his} laboring body, unsure of what they should be doing.`);
						humiliation = 1;
						r.push(clothingBirth());
						r.push(`${He} thanks ${his} charges for their, less than helpful, efforts and collects ${firstText} child for removal. Upon returning, ${he} strips down and enters the pool, desperate for a break and eager to take the weight off ${his} still very gravid body.`);
					}
					break;

				case Job.MADAM:
					if (random(1, 20) > suddenBirth) {
						r.push(`${He} heads to a private room in the back of the brothel accompanied by an influential patron. ${He} settles ${himself} onto his lap and begins working on birthing ${firstText} baby,`);
						if (slave.geneticQuirks.uterineHypersensitivity === 2) {
							r.push(`convulsing with orgasms in the process and`);
						}
						r.push(`basking in his attention as he strips ${him}. Placing ${his} child outside the room, ${he} returns to get more intimate with ${his} catch.`);
					} else {
						r.push(`While managing ${V.brothelName}, ${slave.slaveName}'s water breaks. Knowing ${he} lacks the time to leave, ${he} sets up a sign reading "Birthshow: ${cashFormat(100)} a viewer" and takes a seat.`);
						humiliation = 1;
						r.push(clothingBirth());
						r.push(`Upon completing ${his} show, ${he} reclines with ${firstText} child and begins counting the credits ${he} bought in. In total ${he} made ${cashFormat(100 * birthScene)} and feels that business will be up in the brothel as patrons line up hoping another showing.`);
						cashX((100 * birthScene), "birth", slave);
					}
					break;

				case Job.STEWARD:
					if (random(1, 20) > suddenBirth) {
						r.push(`${He} strips and settles ${himself} into ${his} favorite chair while calling several servants to ${his} aid. ${He} begins to push out ${firstText} baby into the arms of ${his} waiting charges${UH}. ${His} child is promptly taken and ${he} reclines while ${his} servants clean and dress ${his} still very gravid body. Once ${he} has had enough, ${he} orders them to help ${him} up and get back to work on the penthouse.`);
					} else {
						r.push(`While overseeing the house servants, ${slave.slaveName}'s water breaks. ${He} has no time to strip down so ${he} takes a seat and readies ${himself}. Commandingly, ${he} snaps ${his} fingers and orders ${his} charges to clean up the floor, assist ${him} with ${his} clothes, and be ready to take ${firstText} child away.`);
						humiliation = 1;
						r.push(clothingBirth());
						r.push(`Once ${he} catches ${his} breath, ${he} struggles to`);
						if (hasBothLegs(slave)) {
							r.push(`${his} feet`);
						} else {
							r.push(`get upright`);
						}
						r.push(`and takes the fresh change of clothing provided by ${his} servants before ordering them back to work.`);
					}
					break;

				case Job.MILKMAID:
					if (random(1, 20) > suddenBirth) {
						r.push(`${He} returns to ${his} bed and strips before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${firstText} baby${UH}. ${He} is quite experienced in delivering ${his} cows' children, but ${he} finds it much more difficult to apply ${his} knowledge to ${himself}. ${His} child is promptly taken and, after a short rest, ${he} returns to caring for your cows, as gravid as ever.`);
					} else {
						r.push(`While tending to ${his} stock, ${slave.slaveName}'s water breaks. ${He} hastily pulls ${himself} into a vacant stall and seats ${himself} in its corner.`);
						r.push(clothingBirth());
						r.push(`Quickly, ${he} collects ${firstText} child for removal before returning to ${V.dairyName}. The cows around ${his} stall all have a knowing look on their`);
						if (V.dairyPregSetting > 0) {
							r.push(`faces, but with their own swollen bellies hanging heavily from them, they know that they soon will follow ${his} lead.`);
						} else {
							r.push(`faces.`);
						}
					}
					break;

				case Job.FARMER:	// TODO: this needs a rewrite
					if (random(1, 20) > suddenBirth) {
						r.push(`${He} returns to ${his} bed and strips before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${firstText} baby${UH}. ${He} is quite experienced in delivering ${his} cows' children, but ${he} finds it much more difficult to apply ${his} knowledge to ${himself}. ${His} child is promptly taken and, after a short rest, ${he} returns to caring for your cows, as gravid as ever.`);
					} else {
						r.push(`While tending to ${his} stock, ${slave.slaveName}'s water breaks. ${He} hastily pulls ${himself} into a vacant stall and seats ${himself} in its corner.`);
						r.push(clothingBirth());
						r.push(`Quickly, ${he} collects ${firstText} child for removal before returning to ${V.farmyardName}. The cows around ${his} stall all have a knowing look on their`);
						if (V.farmyardPregSetting > 0) {
							r.push(`faces but with their own swollen bellies hanging heavily from them, they know that they soon will follow ${his} lead.`);
						} else {
							r.push(`faces.`);
						}
					}
					break;

				case Job.WARDEN:
					if (slave.fetish === Fetish.MINDBROKEN) {
						if (random(1, 20) > suddenBirth) {
							r.push(`${He} enters an empty cell, strips, and seats ${himself} on the cot. ${He} instinctively begins birthing ${firstText} baby. ${His} child is promptly taken and ${he} returns to mindlessly breaking the confined slaves.`);
						} else {
							r.push(`While punishing a slave, ${slave.slaveName}'s water breaks, soaking ${himU}. Indifferent, ${he} resumes beating ${himU} until the contractions are too much to bear. Settling to the floor, ${he} begins giving birth.`);
							r.push(clothingBirth());
							r.push(`As soon as ${he} regains ${his} strength, ${he} resumes beating the confused slave.`);
							if (slave.counter.birthsTotal === 0) {
								r.push(`${His} first`);
							} else {
								r.push(`This week's`);
							}
							r.push(`is collected by a servant, who carefully hints that ${slave.slaveName} should take a break before returning to ${his} task.`);
						}
					} else {
						if (random(1, 20) > suddenBirth) {
							r.push(`${He} returns to ${his} bed and strips before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${firstText} baby${UH}. ${His} child is promptly taken and ${he} rests awhile before returning to the cellblock.`);
						} else {
							r.push(`While punishing a rebellious slave, ${slave.slaveName}'s water breaks, soaking ${himU}. Noticing the slave's smirk, ${he} resumes beating ${himU} until the contractions are too much to bear. Relocking the cell, ${he} waddles into the nearest empty cell and drops ${his} weight onto the cot.`);
							r.push(clothingBirth());
							r.push(`Quickly, ${he} collects ${firstText} child for removal before returning to ${V.cellblockName}. On ${his} way past the cells, ${he} takes note of any slaves whispering or gesturing about what transpired for future punishment.`);
						}
					}
					break;

				case Job.NURSE:
					if (random(1, 20) > suddenBirth) {
						r.push(`${He} waddles to ${his} maternity ward and strips before settling into an open bed. ${He} makes ${himself} comfortable and begins working on birthing ${firstText} baby${UH} as ${his} assistants watch. ${His} child is promptly taken and ${he} is helped to the recovery ward until ${he} recovers enough to take over ${V.clinicName} again.`);
					} else {
						r.push(`While tending to your unwell slaves, ${slave.slaveName}'s water breaks. Counting the time between contractions, ${he} knows ${he} has no time to get to ${his} prepared birthing chamber. ${He} waddles into the nearest empty room and hoists ${his} gravid body into the examination chair, placing ${his} feet in the stirrups.`);
						r.push(clothingBirth());
						r.push(`Quickly, ${he} collects ${firstText} child for removal before retiring to the recovery ward. Within an hour of rest, ${he} is back on ${his} feet tending to ${his} charges.`);
					}
					break;

				case Job.HEADGIRL:
					if (random(1, 20) > suddenBirth) {
						r.push(`${He} returns to`);
						if (V.HGSuite === 1) {
							r.push(`${his} room's bed`);
						} else {
							r.push(`${his} bed`);
						}
						r.push(`and strips before slipping into it. ${He} makes ${himself} comfortable${(HGL !== 0) ? `, as ${his} slave rushes to ${his} side,` : ``} and begins working on birthing ${firstText} baby${UH}. ${His} child is promptly taken`);
						if (HGL !== 0) {
							r.push(`by ${his} roommate`);
						}
						r.push(`and ${he} rests awhile before returning to managing your slaves.`);
					} else {
						r.push(`While overseeing your other slaves, ${slave.slaveName}'s water breaks. ${He} attempts to hold back the coming birth until ${he} can catch a break in ${his} duties but ultimately fails.`);
						humiliation = 1;
						r.push(clothingBirth());
						r.push(`Upon finishing, ${he} quickly collects ${firstText} child and orders the mess to be cleaned promptly without breaking ${his} dominant appearance.`);
					}
					break;

				case Job.BODYGUARD:
					if (random(1, 20) > suddenBirth) {
						r.push(`Or ${he} would have, if ${he}'d stop refusing to leave your side. You lead ${him} someplace private and help ${him} undress. ${He} makes ${himself} comfortable and begins working on birthing ${firstText} baby${UH}. You call for a servant to quickly gather ${his} child as you help ${him} into the shower, making sure to wait outside for your loyal guardian to finish.`);
					} else {
						r.push(`Refusing to leave your side even when on the verge of giving birth, ${slave.slaveName} continues to serve as your bodyguard despite ${his} condition. A splashing sound and a loud groan emit from behind you; your bodyguard has gone into labor. You quickly help ${him} to the ground and prepare for the coming birth.`);
						r.push(clothingBirth());
						r.push(`You sit by your loyal guard holding ${firstText} child until a servant comes by to take them away. Once ${he} is thoroughly rested, you help ${him} up and lead ${him} back to the penthouse to shower and change.`);
					}
					break;

				case Job.RECRUITER:
					if (random(1, 20) > suddenBirth) {
						r.push(`${He} returns to ${his} bed and strips before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${firstText} baby${UH}. ${His} child is promptly taken and ${he} rests awhile before returning to finding new slaves for you.`);
					} else {
						r.push(`While on a video call with a potential recruit, ${slave.slaveName}'s water breaks. ${He} attempts to play it cool and act like nothing is happening but the worsening contractions finally get to ${him}.`);
						humiliation = 1;
						r.push(clothingBirth());
						if (birthScene > 50) {
							r.push(`Exhausted from the birth and clutching ${firstText} baby, ${he} returns to find that ${he} never ended the call. The prospective slave is blushing furiously and seems to have begun touching ${himselfU} to the show. Apologizing for the interruption, while red with embarrassment, ${slave.slaveName} resumes chatting with the somewhat more pliant ${girlU}.`);
						} else {
							r.push(`Exhausted from the birth and clutching ${firstText} baby, ${he} returns to find that ${he} never ended the call. The prospective slave is grinning widely and states ${heU} has been recording the show. ${HeU} signs off, but not before saying ${heU}'ll be seeing more of ${slave.slaveName} around the internet.`);
							if (slave.fetish === "humiliation") {
								r.push(`Your recruiter can't help but become aroused at the prospect.`);
							} else {
								r.push(`Your recruiter is terrified that ${his} birth video is out there for everyone to see, partly due to ${his} own shame and to the potential damage it will do to ${his} reputation.`);
							}
						}
					}
					break;

				case Job.DAIRY:
					if (V.dairyRestraintsSetting > 1 && slave.career === "a bioreactor") {
						if (random(1, 20) > suddenBirth) {
							r.push(`As ${slave.slaveName}'s water breaks, a mechanical basket is extended under ${his} laboring`);
							if (slave.mpreg === 1) {
								r.push(`ass.`);
							} else {
								r.push(`cunt.`);
							}
							r.push(`Once ${firstText} baby is secure, the basket retracts to allow ${his}`);
							if (slave.mpreg === 1) {
								r.push(`rear`);
							} else {
								r.push(`vagina`);
							}
							r.push(`to be cleaned.`);
						} else {
							r.push(`Without warning, ${slave.slaveName}'s water breaks and ${his} body begins to rapidly push out ${firstText} baby. ${He} manages to force out the squirming child before the basket could extend, flagging ${his} unit for maintenance.`);
						}
						r.push(`All these events are meaningless to ${him}, as ${his} consciousness has long since been snuffed out.`);
					} else if (V.dairyRestraintsSetting > 1) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (random(1, 20) > suddenBirth) {
								r.push(`As ${slave.slaveName}'s water breaks, a mechanical basket is extended under ${his} laboring`);
								if (slave.mpreg === 1) {
									r.push(`ass.`);
								} else {
									r.push(`cunt.`);
								}
								r.push(`Once ${firstText} baby is secure, the basket retracts to allow ${his}`);
								if (slave.mpreg === 1) {
									r.push(`rear`);
								} else {
									r.push(`vagina`);
								}
								r.push(`to be cleaned.`);
							} else {
								r.push(`Without warning, ${slave.slaveName}'s water breaks and ${his} body begins to rapidly push out ${firstText} baby. ${He} manages to force out the squirming child before the basket could extend, flagging ${his} unit for maintenance.`);
							}
							r.push(`${He} doesn't care about any of this, as the only thoughts left in ${his} empty mind revolve around the sensations in ${his} crotch and breasts.`);
						} else {
							if (random(1, 20) > suddenBirth) {
								r.push(`As ${slave.slaveName}'s water breaks, a mechanical basket is extended under ${his} laboring`);
								if (slave.mpreg === 1) {
									r.push(`ass.`);
								} else {
									r.push(`cunt.`);
								}
								r.push(`${He} struggles in ${his} bindings, attempting to break free in order to birth ${firstText} baby, but ${his} efforts are pointless.`);
								if (slave.geneticQuirks.uterineHypersensitivity === 2) {
									r.push(`Soon ${he} is convulsing with powerful orgasms while giving birth,`);
								} else {
									r.push(`${He} is forced to give birth,`);
								}
								r.push(`restrained, into the waiting holder. Once the ${childrenAre} secure, the basket retracts, allowing access to ${his}`);
								if (slave.mpreg === 1) {
									r.push(`asshole.`);
								} else {
									r.push(`vagina.`);
								}
							} else {
								r.push(`Without warning, ${slave.slaveName}'s water breaks and ${he} uncontrollably births ${firstText} baby${UH}. ${He} manages to force out the screaming child before the basket could fully extend, flagging ${his} unit for maintenance and causing quite the scene. ${He} knows full well there is nothing ${he} can do to hide ${his} shame.`);
							}
							r.push(`${His} mind slips slightly more as ${he} focuses on ${his} fate as nothing more than an animal destined to be milked and bear offspring until ${his} body gives out.`);
							humiliation = 1;
							slave.trust -= 10;
							slave.devotion -= 10;
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (random(1, 20) > suddenBirth) {
								r.push(`While getting milked, ${slave.slaveName}'s water breaks. ${He} shows little interest and continues kneading ${his} breasts. Instinctively, ${he} begins to push out ${firstText} ${He} pays no heed to ${his} child being removed from the milking stall, instead focusing entirely on draining ${his} breasts and getting comfortable with ${his} still very gravid middle.`);
							} else {
								r.push(`While getting milked, ${slave.slaveName}'s water breaks. ${He} show little interest and continues kneading ${his} breasts.`);
								r.push(clothingBirth());
								r.push(`${He} shows no interest in ${firstText} child being removed from the milking stall, nor ${his} still very gravid middle, instead focusing entirely on draining ${his} breasts.`);
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								r.push(`While getting milked, ${slave.slaveName}'s water breaks,`);
								if (V.dairyPregSetting > 0) {
									r.push(`this is a regular occurrence to ${him} now so`);
								} else {
									r.push(`but`);
								}
								r.push(`${he} continues enjoying ${his} milking while ${he} works to push out ${firstText} baby${UH}. ${He} catches`);
								if (canSee(slave)) {
									r.push(`a glimpse`);
								} else if (canHear(slave)) {
									r.push(`the sound`);
								} else {
									r.push(`the feeling`);
								}
								r.push(`of ${his} child being removed from the milking stall before returning ${his} focus to draining ${his} breasts.`);
							} else {
								r.push(`While getting milked, ${slave.slaveName}'s water breaks. Knowing ${he} can't leave yet, ${he} shifts into a more comfortable position for the impending birth.`);
								r.push(clothingBirth());
								r.push(`${He} takes a break from milking to collect ${firstText} child for removal and to catch ${his} breath before reattaching the milkers and coaxing ${his} milk to begin flowing anew.`);
							}
						}
					}
					break;

				default:
					App.Events.addParagraph(el, r);
					App.UI.DOM.appendNewElement("div", el, `Assignment was "${slave.assignment}" so why did we default? Report this!`, "note");
					r = [];
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} is helped back to ${his} bed and stripped before slipping into it. Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and ${he} is encouraged to keep resting.`);
								if (hasAnyArms(slave)) {
									r.push(`${He} runs ${his} ${hands} across the still huge dome of ${his} middle; to`);
								} else {
									r.push(`To`);
								}
								r.push(`${him}, gravidity and birth is nothing out of the ordinary.`);
							} else {
								r.push(`${slave.slaveName} is awoken from ${his} rest by a strong contraction. ${He} rolls over and begins to fall back to sleep as another contraction wracks ${his} body.`);
								r.push(clothingBirth());
								r.push(`${He} fishes around under ${his} still huge dome of a stomach searching for ${his} newborn. Once ${he} finds it, ${he} draws it to ${his} breast and resumes resting.`);
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} is helped back to ${his} bed and stripped before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${firstText} baby${UH}. ${His} child is promptly taken and ${he} is encouraged to keep resting. ${He} rolls over${(hasAnyArms(slave)) ? `, cradling ${his} heavily rounded middle,` : ``} and dozes off.`);
							} else {
								r.push(`${slave.slaveName} is awoken from ${his} rest by a moist sensation followed by a contraction. ${He} rolls over and clutches ${his} gravid belly as another contraction wracks ${his} body.`);
								r.push(clothingBirth());
								r.push(`${He} struggles to collect ${his} child and places them in the cradle readied for ${him}. ${He} is helped to the shower as your servants clean up and remove ${his} child.`);
							}
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} returns to ${his} bed and strips before slipping into it. Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and ${he} is encouraged to keep resting.`);
								if (hasAnyArms(slave)) {
									r.push(`${He} runs ${his} ${hands} across the still huge dome of ${his} middle; to`);
								} else {
									r.push(`To`);
								}
								r.push(`${him}, gravidity and birth is nothing out of the ordinary.`);
							} else {
								r.push(`${slave.slaveName} is awoken from ${his} rest by a strong contraction. ${He} rolls over and begins to fall back to sleep as another contraction wracks ${his} body.`);
								r.push(clothingBirth());
								r.push(`${He} fishes around under ${his} still huge dome of a stomach searching for ${his} newborn. Once ${he} finds it, ${he} draws it to ${his} breast and resumes resting.`);
							}
						} else {
							if (random(1, 20) > suddenBirth) {
								r.push(`${He} returns to ${his} bed and strips before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${firstText} baby${UH}. ${His} ${childrenAre} promptly taken and ${he} is encouraged to keep resting. ${He} rolls over${(hasAnyArms(slave)) ? `, cradling ${his} heavily rounded middle,` : ``} and dozes off.`);
							} else {
								r.push(`${slave.slaveName} is awoken from ${his} rest by a moist sensation followed by a contraction. ${He} rolls over and clutches ${his} gravid belly as another contraction wracks ${his} body.`);
								r.push(clothingBirth());
								r.push(`${He} struggles to collect ${his} child and places them in the cradle readied for ${him}. ${He} hefts ${his} still very gravid body out of bed to take a shower as your servants clean up and remove ${his} child.`);
							}
						}
					}
			}
		} else {
			// add extra events here (moving between jobs | after work)
			if (getPersonalAttention(slave.ID, "torture") && !onBedRest(V.PC, true)) {
				r.push(`${He}'s given birth during your torture sessions enough times for you to start making games of it; perhaps you see how hard you can hit ${him} before you cause ${his} water to break, or maybe you try to break it yourself. The best part is, no matter how many come out of ${him}, ${he} never loses that exploitable baby bump.`);
			} else if (getPersonalAttention(slave.ID, "ravish") && !onBedRest(V.PC, true)) {
				if (random(1, 20) > suddenBirth) {
					r.push(`You take a break from fucking ${him} to allow ${him} time to birth ${his} ${firstText} baby. Once the child is sent off, you conclude your break and go back to fucking ${his}`);
					if (canDoVaginal(slave)) {
						if (slave.mpreg === 0) {
							r.push(`sore, gaping`);
						}
						r.push(`pussy`);
					} else {
						if (slave.mpreg === 1) {
							r.push(`sore, gaping buttpussy`);
						} else {
							r.push(`anus`);
						}
					}
					r.push(`while caressing the turgid swell of ${his}, still very baby-filled, middle.`);
				} else {
					if (canDoVaginal(slave) && slave.mpreg === 0) {
						r.push(`You groan in displeasure as you feel the head of ${firstText} baby begins to steadily edge you out of ${his} pussy. You sigh and resort to masturbating until the brat is fully born and sent away so you can get back to fucking ${his} turgid body until you inevitably send ${him} back into labor and this all repeats again.`);
					} else if (canDoVaginal(slave)) {
						if (canPenetrate(V.PC) || V.PC.clit >= 3) {
							r.push(`You moan with pleasure as the pressure of ${firstText} baby moving through ${his} rectum pushes down against your ${V.PC.clit >= 3 ? "clit" : "dick"} making everything feel so wonderfully tight. In fact, maybe too tight; you struggle to extract yourself from the clenching orifice before you find your tool painfully crushed. With a stimulating pop, you pull out just as ${his} baby slips from ${his} rectum, climaxing in the`);
							if (isVirile(V.PC)) {
								r.push(`process and christening it in a shower of cum.`);
							} else {
								r.push(`process.`);
							}
							r.push(`Once ${he}'s cleaned up and the baby is taken care of, you bend ${him} back over, caressing the turgid swell of ${his} still baby-filled middle in the process, and carry on fucking ${him}.`);
						} else {
							r.push(`You grunt in displeasure as the pressure of ${firstText} baby moving through ${his} rectum pushes down on your strap-on and traps it in place. You try to wiggle it loose, but it just won't budge. You sigh and catch ${his} baby as it pops out of ${his} butthole before handing it off and evaluating just how crushed your favorite toy is.`);
						}
					} else if (canDoAnal(slave) && slave.mpreg === 1) {
						r.push(`You groan in displeasure as you feel the head of ${firstText} baby begins to steadily blockade ${his} anus from your penetration. You sigh and resort to masturbating until the brat is fully born and sent away so you can get back to fucking ${his} turgid body until you inevitably send ${him} back into labor and this all repeats again.`);
					} else {
						if (canPenetrate(V.PC) || V.PC.clit >= 3) {
							r.push(`You moan with pleasure as the pressure of ${firstText} baby being born forces ${his} rectum to tighten around your ${V.PC.clit >= 3 ? "clit" : "dick"}. It quickly becomes way too tight; you struggle to dislodge yourself from the clenching orifice before you get completely crushed. With a stimulating pop, you pull out just as ${his} baby slips from ${his} pussy, climaxing in the`);
							if (isVirile(V.PC)) {
								r.push(`process and christening it in a shower of cum.`);
							} else {
								r.push(`process.`);
							}
							r.push(`Once ${he}'s cleaned up and the baby is taken care of, you bend ${him} back over, caressing the turgid swell of ${his} still baby-filled middle in the process, and carry on fucking ${him}.`);
						} else {
							r.push(`You grunt in displeasure as the pressure of ${firstText} baby moving through ${his} birth canal pushes down on your strap-on and traps it in place. You try to wiggle it loose, but it just won't budge. You sigh and catch ${his} baby as it pops out of ${his} vagina before handing it off and evaluating just how crushed your favorite toy is.`);
						}
					}
				}
			} else if (!canWalk(slave)) {
				if (slave.fetish === Fetish.MINDBROKEN) {
					if (random(1, 20) > suddenBirth) {
						r.push(`${He} is helped back to ${his} bed and stripped before slipping into it. Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and ${he} is encouraged to keep resting.`);
						if (hasAnyArms(slave)) {
							r.push(`${He} runs ${his} ${hands} across the still huge dome of ${his} middle; to`);
						} else {
							r.push(`To`);
						}
						r.push(`${him}, gravidity and birth is nothing out of the ordinary.`);
					} else {
						if (birthScene >= 50) {
							r.push(`${slave.slaveName} is awoken from ${his} rest by a strong contraction. ${He} rolls over and begins to fall back to sleep as another contraction wracks ${his} body.`);
							r.push(clothingBirth());
							r.push(`${He} fishes around under ${his} still huge dome of a stomach searching for ${his} newborn. Once ${he} finds it, ${he} draws it to ${his} breast and resumes resting.`);
						} else {
							r.push(`While stroking ${his} pregnancy absentmindedly, ${slave.slaveName}'s body begins to birth ${firstText} baby. ${He} carries on until the contractions drag ${him} to`);
							if (hasBothLegs(slave)) {
								r.push(`${his} knees.`);
							} else {
								r.push(`the floor.`);
							}
							r.push(clothingBirth());
							r.push(`${He} rolls onto ${his} side and rests with ${his} child to ${his} breast until a servant collects ${his} child and helps ${him} to ${his} bed.`);
						}
					}
				} else {
					if (random(1, 20) > suddenBirth) {
						r.push(`${He} is helped back to ${his} bed and stripped before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${firstText} baby${UH}. ${His} child is promptly taken and ${he} is encouraged to keep resting. ${He} rolls over${(hasAnyArms(slave)) ? `, cradling ${his} heavily rounded middle,` : ``} and dozes off.`);
					} else {
						if (birthScene >= 70) {
							r.push(`While waiting to be helped to ${his} next assignment, ${slave.slaveName}'s body begins to birth ${firstText} baby. Unable to do anything, ${he} is forced to give birth where ${he} is.`);
							r.push(clothingBirth());
							r.push(`${He} gathers ${his} child and recovers ${his} strength while resuming ${his} wait a servant to help ${him} to ${his} assignment.`);
						} else if (birthScene >= 30) {
							r.push(`While eating in the cafeteria, ${slave.slaveName}'s body begins to birth ${firstText} baby. Unable to walk without assistance, ${he} finds ${himself} stranded in the middle of all the dining slaves.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`${He} gathers ${his} child and waits to be rescued from the vicious mockery, fully aware of all the jeering and laughter.`);
						} else {
							r.push(`${slave.slaveName} is awoken from ${his} rest by a moist sensation followed by a contraction. ${He} rolls over and clutches ${his} gravid belly as another contraction wracks ${his} body.`);
							r.push(clothingBirth());
							r.push(`${He} struggles to collect ${his} child and places them in the cradle readied for ${him}. ${He} is helped to the shower as your servants clean up and remove ${his} child.`);
						}
					}
				}
			} else {
				if (slave.fetish === Fetish.MINDBROKEN) {
					if (random(1, 20) > suddenBirth) {
						r.push(`${He} returns to ${his} bed and strips before slipping into it. Instinctively, ${he} begins to push out ${firstText} baby. ${His} child is promptly taken and ${he} is encouraged to keep resting.`);
						if (hasAnyArms(slave)) {
							r.push(`${He} runs ${his} ${hands} across the still huge dome of ${his} middle; to`);
						} else {
							r.push(`To`);
						}
						r.push(`${him}, gravidity and birth is nothing out of the ordinary.`);
					} else {
						if (birthScene >= 50) {
							r.push(`While wandering the penthouse absentmindedly, ${slave.slaveName}'s body begins to birth ${firstText} baby. ${He} carries on until the contractions drag ${him} to`);
							if (hasBothLegs(slave)) {
								r.push(`${his} knees.`);
							} else {
								r.push(`the floor.`);
							}
							r.push(clothingBirth());
							r.push(`${He} rolls onto ${his} side and rests with ${his} child to ${his} breast until a servant collects ${his} child and helps ${him} to ${his} bed.`);
						} else {
							r.push(`${slave.slaveName} is awoken from ${his} rest by a strong contraction. ${He} rolls over and begins to fall back to sleep as another contraction wracks ${his} body.`);
							r.push(clothingBirth());
							r.push(`${He} fishes around under ${his} still huge dome of a stomach searching for ${his} newborn. Once ${he} finds it, ${he} draws it to ${his} breast and resumes resting.`);
						}
					}
				} else if (slave.fetish === "humiliation" && birthScene >= 50) {
					r.push(`While waddling through the penthouse between assignments, ${slave.slaveName}'s body begins to birth ${firstText} baby. Sensing an opportunity, ${he} waddles to the nearest balcony overlooking the city. ${He} calls out, making sure all eyes are on ${him} for what happens next.`);
					humiliation = 1;
					r.push(clothingBirth());
					r.push(`${He} gathers ${his} child and recovers ${his} strength before finding a servant to give ${his} child to. ${He} resumes ${his} previous task, eager for the next child to move into position.`);
				} else {
					if (random(1, 20) > suddenBirth) {
						r.push(`${He} returns to ${his} bed and strips before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${firstText} baby${UH}. ${His} child is promptly taken and ${he} is encouraged to keep resting. ${He} rolls over${(hasAnyArms(slave)) ? `, cradling ${his} heavily rounded middle,` : ``} and dozes off.`);
					} else {
						if (birthScene >= 70) {
							r.push(`While waddling through the penthouse on the way to ${his} next assignment, ${slave.slaveName}'s body begins to birth ${firstText} baby. Unable to reach the prepared birthing room in time, ${he} finds a secluded room to give birth in.`);
							r.push(clothingBirth());
							r.push(`${He} gathers ${his} child and recovers ${his} strength before finding a servant to give ${his} child to before shuffling to ${his} assignment, a hand on ${his} still very gravid middle.`);
						} else if (birthScene >= 30) {
							r.push(`While waddling through the penthouse on ${his} way to the cafeteria, ${slave.slaveName}'s body begins to birth ${firstText} baby. Unable to reach the prepared birthing room in time, ${he} finds ${himself} stranded in the middle of all the dining slaves.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`${He} gathers ${his} child and recovers ${his} strength before trying to escape out of sight of the jeering crowd. Finding a servant to give ${his} child to, ${he} hastily heads back to ${his} bed to hide ${himself} from the mockery. ${He} runs a hand across ${his} still very gravid middle; ${he}'ll have to be more careful in the future as there are plenty more children growing within ${him}.`);
						} else {
							r.push(`${slave.slaveName} is awoken from ${his} rest by a moist sensation followed by a contraction. ${He} rolls over and clutches ${his} gravid belly as another contraction wracks ${his} body.`);
							r.push(clothingBirth());
							r.push(`${He} struggles to collect ${his} child and places them in the cradle readied for ${him}. ${He} hefts ${his} still very gravid body out of bed to take a shower as your servants clean up and remove ${his} child.`);
						}
					}
				}
			}
		}
		App.Events.addParagraph(el, r);
		return el;
	}

	function hyperBroodmotherBirth() {
		const el = document.createElement("p");
		let he2;
		let his2;
		const r = [];
		const tempSub = getSlave(slave.subTarget);
		const pbw = random(1, 100);
		const babies = slave.pregType > 1 ? `babies` : `baby`;
		const children = slave.pregType > 1 ? `children` : `child`;
		const UH = (slave.geneticQuirks.uterineHypersensitivity === 2) ? `, convulsing with orgasms in the process` : ``;

		if (random(1, 2) === 1) {
			// at assignment else in halls/etc

			switch (slave.assignment) {
				case Job.REST:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${slave.slaveName} is awoken from ${his} rest by a strong contraction. ${He} attempts to roll over, and failing that, begins to fall back to sleep as another contraction wracks ${his} body.`);
							r.push(clothingBirth());
							r.push(`${He} struggles to draw ${his} child to ${his} breast and resumes resting.`);
						} else {
							r.push(`${slave.slaveName} is awoken from ${his} rest by a contraction. ${He} struggles to roll over, and failing that, clutches ${his} gravid belly as another contraction wracks ${his} body. Since this has already happened several times this week, ${he} knows what to expect.`);
							r.push(clothingBirth());
							r.push(`${His} child is collected and ${his} body cleaned before ${he} is allowed to resume ${his} rest.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${slave.slaveName} is awoken from ${his} rest by a strong contraction. ${He} rolls over and begins to fall back to sleep as another contraction wracks ${his} body.`);
							r.push(clothingBirth());
							r.push(`${He} struggles to draw ${his} child to ${his} breast and resumes resting.`);
						} else {
							r.push(`${slave.slaveName} is awoken from ${his} rest by a contraction. ${He} rolls over and clutches ${his} gravid belly as another contraction wracks ${his} body. Since this has already happened several times this week, ${he} knows what to expect.`);
							r.push(clothingBirth());
							r.push(`${His} child is collected and ${his} body cleaned before ${he} is allowed to resume ${his} rest.`);
						}
					}
					break;

				case Job.SUBORDINATE:
					if (tempSub) {
						({he2, his2} = getPronouns(tempSub).appendSuffix("2"));
					}
					if (slave.fetish === Fetish.MINDBROKEN) {
						if (slave.subTarget === 0) {
							r.push(`While servicing your other slaves, ${slave.slaveName}'s body begins to birth another of ${his} brood, though it does nothing to deter ${him} from ${his} task.`);
							r.push(clothingBirth());
							r.push(`No sooner than ${his} baby is born, a cock is shoved into ${his} gaping pussy as ${he} draws ${his} child to ${his} breast.`);
						} else if (slave.subTarget === -1) {
							if (slave.career === "a breeding bull") {
								r.push(`While fucking another slave pregnant, ${slave.slaveName}'s body begins to birth another of ${his} brood, though it does nothing to deter ${him} from ${his} task. Between the stimulation of the slave struggling to escape from beneath ${his} crushing bulk and ${his} child's head stretching ${him} painfully wide, ${he} lets loose a powerful load into the depths of the mother-to-be.`);
							} else {
								r.push(`While impregnating a mother-to-be, ${slave.slaveName}'s body begins to birth another of ${his} brood, though it does nothing to deter the slave from taking ${his} seed. Coupling with such an enormously pregnant ${girl} is difficult enough as is, let alone when ${he} is in the throes of labor, so the horny breeder is forced to let ${him} have a minute to finish up before getting situated again.`);
							}
						} else {
							r.push(`While servicing ${tempSub.slaveName}, ${slave.slaveName}'s body begins to birth another of ${his} brood, though it does nothing to deter ${him} from ${his} task.`);
							r.push(clothingBirth());
							r.push(`No sooner than ${his} baby is born does ${he} go back to pleasuring ${his} dom.`);
						}
					} else {
						if (slave.subTarget === 0) {
							r.push(`While servicing your other slaves, ${slave.slaveName}'s body begins to birth another of ${his} brood, causing ${him} to immediately try to break off. However, several hands quickly hook ${his} enormous bulk and ${he} is pulled back into another slave's crotch.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`Since ${he} is too pregnant to collect ${his} child, it is done for ${him}. ${His} exhausted form is slumped onto ${his} huge belly as another slave helps themselves to ${his} vulnerable body.`);
						} else if (slave.subTarget === -1) {
							if (slave.career === "a breeding bull") {
								r.push(`While fucking another slave pregnant, ${slave.slaveName}'s body begins to birth another of ${his} brood, though it does nothing to deter ${him} from ${his} task. Between the stimulation of the slave struggling to escape from beneath ${his} crushing bulk and ${his} child's head stretching ${him} painfully wide, ${he} lets loose a powerful load into the depths of the mother-to-be. Exhausted and stuck on ${his} bloated side, the inseminated slave is forced to lend a hand and collect the newborn baby to be sent off.`);
							} else {
								r.push(`While impregnating a mother-to-be, ${slave.slaveName}'s body begins to birth another of ${his} brood, forcing ${him} to decouple with the slave and roll onto ${his} back.`);
								if (canAchieveErection(slave)) {
									r.push(`They get quite the show as they watch ${his} rock-hard dick repeatedly jet cum across the underside of ${his} still very gravid belly from the stimulation of pushing out ${his} baby.`);
								} else {
									r.push(`They get quite the show as they watch ${him} spurt cum while pushing out ${his} baby.`);
								}
								humiliation = 1;
								r.push(`Exhausted and unable to get out from under ${his} own bulk, the giggling slave is forced to lend a hand and collect the newborn baby to be sent off before returning to get properly bred.`);
							}
						} else {
							r.push(`While servicing ${tempSub.slaveName}, ${slave.slaveName}'s body begins to birth another of ${his} brood, causing ${him} to immediately try to break off. ${His} dom eagerly watches ${his2} pregnant sub's ordeal.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`${tempSub.slaveName} collects the newborn child to be sent off before returning and planting ${his2} crotch directly over ${his2} exhausted sub's face.`);
						}
					}
					break;

				case Job.WHORE:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`While attempting to attract customers to fuck ${his} grotesquely distended body, ${slave.slaveName}'s body begins to birth another of ${his} brood.`);
							r.push(clothingBirth());
							r.push(`${He} struggles to bring ${his} child to ${his} breast as ${he} resumes whoring, oblivious to the free show ${he} just gave ${his} customers.`);
						} else {
							r.push(`While attempting to attract customers to fuck ${his} grotesquely distended body, ${slave.slaveName}'s body begins to birth another of ${his} brood. Unable to move and rapidly crowning, ${he} manages to get several men to help ${him} out.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`${He} lies stranded on the ground, exhausted and covered in sperm from the circle of men watching ${him}, until ${he} is helped into a sitting position and handed ${his} child.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`While attempting to attract customers with ${his} grotesquely distended body, ${slave.slaveName}'s body begins to birth another of ${his} brood.`);
							r.push(clothingBirth());
							r.push(`${He} draws ${his} child to ${his} breast as ${he} resumes whoring, oblivious to the free show ${he} just gave ${his} customers.`);
						} else {
							r.push(`While attempting to attract customers with ${his} grotesquely distended body, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} knows it is pointless to try to waddle away, as large as ${he} is, so ${he} convinces several men to help ${him} out.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`${He} lies on the ground, exhausted and covered in sperm from the circle of men watching ${him}, until ${he} is helped`);
							if (hasBothLegs(slave)) {
								r.push(`to ${his} feet`);
							} else {
								r.push(`upright`);
							}
							r.push(`and handed ${his} child.`);
						}
					}
					break;

				case Job.PUBLIC:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (pbw > 80) {
								r.push(`While taking a citizen's dick, ${slave.slaveName}'s body begins to birth another of ${his} brood out on him. Showing no signs of stopping, he struggles to shoves ${his} bulk off of him. Instinctively ${he} begins to push out ${his} baby, indifferent to who may be watching ${his} naked crotch. ${He} is handed ${his} child, which ${he} clutches to ${his} breast before beckoning for the next citizen's cock.`);
							} else if (pbw > 60) {
								r.push(`While sucking a citizen's dick, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} shows no signs of slowing down, so he allows ${him} to continue.`);
								r.push(clothingBirth());
								r.push(`He cums down ${his} throat before placing ${his} child on ${his} breast, as ${he} starts beckoning for the next citizen's cock.`);
							} else if (pbw > 40) {
								r.push(`While licking a citizen's cunt, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} shows no signs of slowing down, so ${he} allows ${him} to continue.`);
								r.push(clothingBirth());
								r.push(`The citizen splashes across ${his} face before placing ${his} child on ${his} breast, as ${he} begins beckoning for the next citizen's cunt.`);
							} else {
								r.push(`While taking a citizen's dick in ${his} ass, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} shows no signs of slowing down, so he allows ${him} to continue. Instinctively ${he} begins to push out ${his} baby, indifferent to who may be watching ${his} naked crotch. He came strongly thanks to ${him} and gives ${him} a slap on the ass before handing ${him} ${his} child. ${He} brings it to ${his} breast before beckoning for the next citizen's cock.`);
							}
						} else {
							if (pbw > 80) {
								r.push(`While riding a citizen's dick, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} desperately struggles to disengage encouraging him to shove ${him} onto ${his} bloated womb and mount ${him}. He thoroughly enjoys ${his} contracting cunt before pulling out and standing over ${him}, jacking off. Quickly ${he} spreads ${his} legs apart and begins pushing out ${his} baby${UH}. ${He} can't hide what's happening between ${his} legs,`);
								if (slave.fetish === "humiliation") {
									r.push(`but that only makes it more exciting.`);
								} else {
									r.push(`so ${he} bears with it.`);
								}
								r.push(`He comes over ${his} exhausted body and moves on leaving ${him} to recover and await ${his} child to be sent off.`);
								humiliation = 1;
							} else if (pbw > 60) {
								r.push(`While sucking a citizen's dick, ${slave.slaveName}'s body begins to birth another of ${his} brood. Since ${he} is incapable of moving ${himself}, ${he} carries on sucking.`);
								humiliation = 1;
								r.push(clothingBirth());
								r.push(`He cums down ${his} throat before letting ${him} collapse onto ${his} bloated form. When ${he} recovers, ${he} gathers ${his} child to be sent off.`);
							} else if (pbw > 40) {
								r.push(`While licking a citizen's cunt, ${slave.slaveName}'s body begins to birth another of ${his} brood. Since ${he} is incapable of moving ${himself}, ${he} carries on licking.`);
								humiliation = 1;
								r.push(clothingBirth());
								r.push(`She cums across ${his} face before helping ${him} to ${his} rear and handing ${him} the newborn child.`);
							} else {
								r.push(`While taking a citizen's dick in ${his} ass, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} desperately struggles to disengage but he shoves ${him} onto ${his} bloated womb and mounts ${him}. Quickly ${he} spreads ${his} legs apart and begins pushing out ${his} baby${UH}. ${He} can't hide what's happening between ${his} legs,`);
								if (slave.fetish === "humiliation") {
									r.push(`but that only makes it more exciting.`);
								} else {
									r.push(`so ${he} bears with it.`);
								}
								r.push(`He came strongly thanks to ${him} and gives ${him} a slap on the ass as ${he} collapses onto ${his} bloated womb. Once ${he} recovers enough to collect ${his} child, ${he} awaits for it to be sent off.`);
								humiliation = 1;
							}
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (pbw > 80) {
								r.push(`While taking a citizen's dick, ${slave.slaveName}'s body begins to birth another of ${his} brood out on him. Showing no signs of stopping, he struggles to shoves ${his} bulk off of him. Instinctively ${he} begins to push out ${his} baby, indifferent to who may be watching ${his} naked crotch. ${He} is handed ${his} child, which ${he} clutches to ${his} breast before seeking out the next citizen's cock.`);
							} else if (pbw > 60) {
								r.push(`While sucking a citizen's dick, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} shows no signs of slowing down, so he allows ${him} to reposition and continue.`);
								r.push(clothingBirth());
								r.push(`He cums down ${his} throat before placing ${his} child on ${his} breast, as ${he} begins seeking out the next citizen's cock.`);
							} else if (pbw > 40) {
								r.push(`While licking a citizen's cunt, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} shows no signs of slowing down, so ${he} allows ${him} to reposition and continue.`);
								r.push(clothingBirth());
								r.push(`The citizen splashes across ${his} face before placing ${his} child on ${his} breast, as ${he} begins seeking out the next citizen's cunt.`);
							} else {
								r.push(`While taking a citizen's dick in ${his} ass, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} shows no signs of slowing down, so he allows ${him} to reposition and continue. Instinctively ${he} begins to push out ${his} baby, indifferent to who may be watching ${his} naked crotch. He came strongly thanks to ${him} and gives ${him} a slap on the ass before handing ${him} ${his} child. ${He} brings it to ${his} breast before seeking out the next citizen's cock.`);
							}
						} else {
							if (pbw > 80) {
								r.push(`While riding a citizen's dick, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} desperately tries to disengage but he shoves ${him} onto ${his} bloated womb and mounts ${him}. He thoroughly enjoys ${his} contracting cunt before pulling out and standing over ${him}, jacking off. Quickly ${he} spreads ${his} legs apart and begins pushing out ${his} baby${UH}. ${He} can't hide what's happening between ${his} legs,`);
								if (slave.fetish === "humiliation") {
									r.push(`but that only makes it more exciting.`);
								} else {
									r.push(`so ${he} bears with it.`);
								}
								r.push(`He comes over ${his} exhausted body and moves on leaving ${him} to recover and collect ${his} child to be sent off.`);
								humiliation = 1;
							} else if (pbw > 60) {
								r.push(`While sucking a citizen's dick, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} desperately tries to disengage but he grabs ${his} head and slams ${him} back into his crotch.`);
								humiliation = 1;
								r.push(clothingBirth());
								r.push(`He cums down ${his} throat before letting ${him} collapse onto ${his} bloated form. When ${he} recovers, ${he} gathers ${his} child to be sent off.`);
							} else if (pbw > 40) {
								r.push(`While licking a citizen's cunt, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} desperately tries to disengage but she grabs ${his} head and slams ${him} back into her crotch.`);
								humiliation = 1;
								r.push(clothingBirth());
								r.push(`She cums across ${his} face before helping ${him}`);
								if (hasBothLegs(slave)) {
									r.push(`to ${his} feet`);
								} else {
									r.push(`upright`);
								}
								r.push(`and handing ${him} the newborn child.`);
							} else {
								r.push(`While taking a citizen's dick in ${his} ass, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} desperately tries to disengage but he shoves ${him} onto ${his} bloated womb and mounts ${him}. Quickly ${he} spreads ${his} legs apart and begins pushing out ${his} ${babies}${UH}. ${He} can't hide what's happening between ${his} legs,`);
								if (slave.fetish === "humiliation") {
									r.push(`but that only makes it more exciting.`);
								} else {
									r.push(`so ${he} bears with it.`);
								}
								r.push(`He came strongly thanks to ${him} and gives ${him} a slap on the ass as ${he} collapses onto ${his} bloated womb. Once ${he} recovers enough to get`);
								if (hasBothLegs(slave)) {
									r.push(`to ${his} feet,`);
								} else {
									r.push(`upright,`);
								}
								r.push(`${he} gathers ${his} child to be sent off.`);
								humiliation = 1;
							}
						}
					}
					break;

				case Job.GLORYHOLE:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`While sucking a dick through the hole of ${his} confining box, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} makes no effort to stop sucking the dicks presented to ${him}.`);
							r.push(clothingBirth());
							r.push(`${His} child is taken as it is born from ${his} rear hanging out of the box. ${He} never notices, focused entirely on the fresh cock poking through the glory hole.`);
						} else {
							r.push(`While sucking a dick through the hole of ${his} confining box, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} quickly finishes the dick off and sighs, knowing full well ${he} couldn't move even if ${he} weren't confined. Another dick is shoved into ${his} trapped face and ${he} is forced to keep sucking.`);
							r.push(clothingBirth());
							r.push(`${His} child is taken as it is born from ${his} rear hanging out of the box. ${He} never got a look at it, being unable to turn even slightly.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`While sucking a dick through the hole of ${his} confining box, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} makes no effort to stop sucking the dicks presented to ${him}.`);
							r.push(clothingBirth());
							r.push(`${His} child is taken as it is born from ${his} rear hanging out of the box. ${He} never notices, focused entirely on the fresh cock poking through the glory hole.`);
						} else {
							r.push(`While sucking a dick through the hole of ${his} confining box, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} quickly finishes the dick off before realizing there is no way ${he} can move ${his} bloated form in the box. Another dick is shoved into ${his} trapped face and ${he} is forced to keep sucking.`);
							r.push(clothingBirth());
							r.push(`${His} child is taken as it is born from ${his} rear hanging out of the box. ${He} never got a look at it, being unable to turn even slightly.`);
						}
					}
					break;

				case Job.MILKED:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`While getting milked, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} show little interest and continues kneading ${his} breasts.`);
							r.push(clothingBirth());
							r.push(`${He} shows no interest in ${his} ${children}`);
							r.push(`being removed from the milking stall, instead focusing entirely on draining breasts.`);
						} else {
							r.push(`While getting milked, ${slave.slaveName}'s body begins to birth another of ${his} brood. Between the milkers and ${his} immobilizing belly, ${he} ends up stranded atop ${his} immense pregnancy.`);
							r.push(clothingBirth());
							r.push(`${His} child is carried away and ${he} struggles to get off of ${himself}. ${He} groans as ${he} realizes the milk tank is nearly full, having been filled with the copious amounts of milk ${his} body is producing for ${his} brood.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`While getting milked, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} show little interest and continues kneading ${his} breasts.`);
							r.push(clothingBirth());
							r.push(`${He} shows no interest in ${his} ${children}`);
							r.push(`being removed from the milking stall, instead focusing entirely on draining breasts.`);
						} else {
							r.push(`While getting milked, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} shifts into a comfortable position to give birth while the milker works ${his} breasts.`);
							r.push(clothingBirth());
							r.push(`${His} child is carried away and ${he} rests with ${his} back against the wall. ${He} groans as ${he} realizes the milk tank is nearly full, having been filled with the copious amounts of milk ${his} body is producing for ${his} brood.`);
						}
					}
					break;

				case Job.FUCKTOY:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`While sitting absentmindedly nearby, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} pays no heed to it and continues waiting for you to use ${him}.`);
							r.push(clothingBirth());
							r.push(`You certainly enjoyed the show as you call for a servant to take away ${his} child and to clean up the still oblivious broodmother.`);
						} else {
							r.push(`While resting against ${his} belly nearby, ${slave.slaveName}'s body begins to birth another of ${his} brood, startling ${him}. ${He} looks to you for guidance and you shake your head "no". Without permission to move ${he}`);
							if (slave.devotion > 50) {
								r.push(`decides to give you a show.`);
							} else if (slave.devotion > 20) {
								r.push(`reluctantly decides giving birth in front of you isn't so bad.`);
							} else {
								r.push(`begins to panic as ${his} contractions come sooner and sooner.`);
								humiliation = 1;
							}
							r.push(clothingBirth());
							r.push(`As thanks for the show, you help ${his} exhausted body onto the couch so ${he} can recover before returning to ${his} duties. You call for a servant to take away ${his} child and clean up your toy.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`While sitting absentmindedly nearby, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} pays no heed to it and continues waiting for you to use ${him}.`);
							r.push(clothingBirth());
							r.push(`You certainly enjoyed the show as you call for a servant to take away ${his} child and to clean up the still oblivious broodmother.`);
						} else {
							r.push(`While standing nearby, ${slave.slaveName}'s body begins to birth another of ${his} brood, startling ${him}. ${He} looks to you for guidance and you shake your head "no". Without permission to leave ${he}`);
							if (slave.devotion > 50) {
								r.push(`decides to give you a show.`);
							} else if (slave.devotion > 20) {
								r.push(`reluctantly decides giving birth in front of you isn't so bad.`);
							} else {
								r.push(`begins to panic as ${his} contractions come sooner and sooner.`);
								humiliation = 1;
							}
							r.push(clothingBirth());
							r.push(`As thanks for the show, you help ${his} exhausted body onto the couch so ${he} can recover before returning to ${his} duties. You call for a servant to take away ${his} child and clean up your toy.`);
						}
					}
					break;

				case Job.CONFINEMENT:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`While waiting in confinement, ${slave.slaveName}'s body begins to birth another of ${his} brood. Since ${he} can't move, ${he} just lets things happen.`);
							r.push(clothingBirth());
							r.push(`${He} struggles for a minute before realizing ${he} is incapable of reaching ${his} child. The servant that has to crawl under ${his} bloated body to get ${his} child is less than pleased, especially since this is the third time this week ${he} has had to do it.`);
						} else {
							r.push(`${slave.slaveName} is awoken from ${his} stupor by ${his} body beginning to birth another of ${his} brood. ${He} struggles to get into position but ends up getting stuck atop ${his} massive belly.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`${He} spills out of the cell when the servant comes once more to collect ${his} child. ${He} hastily tries to cram ${his} bulk back into ${his} cell before ${he} gets chastised.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`While waiting in confinement, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} assumes a birthing position.`);
							r.push(clothingBirth());
							r.push(`${He} struggles for a minute before realizing ${his} pregnancy takes up most of the cell and that ${he} can't reach ${his} child. The servant that has to crawl under ${his} bloated body to get ${his} child is less than pleased, especially since this is the third time this week ${he} has had to do it.`);
						} else {
							r.push(`${slave.slaveName} is awoken from ${his} stupor by ${his} body beginning to birth another of ${his} brood. ${He} struggles to get into position but ends up getting stuck standing thanks to ${his} massive belly.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`${He} spills out of the cell when the servant comes once more to collect ${his} child. ${He} hastily tries to cram ${his} bulk back into ${his} cell before ${he} gets chastised.`);
						}
					}
					break;

				case Job.QUARTER:
				case Job.HOUSE:
					if (slave.fetish === Fetish.MINDBROKEN) {
						if (random(0, 1) === 1) {
							r.push(`While giving a slave oral service, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} disregards this development and continues working.`);
							r.push(clothingBirth());
							r.push(`The slave gets off quite strongly to the show and shoves ${him} out of the way, leaving ${him} to clean up ${his} mess. Instead, ${he} struggles to bring ${his} child to ${his} breast until`);
							if (S.Stewardess) {
								r.push(`${S.Stewardess.slaveName} shouts at ${him} to move ${his} useless ass.`);
							} else if (V.HeadGirlID !== 0) {
								r.push(`${S.HeadGirl.slaveName} shouts at ${him} to move ${his} useless ass.`);
							} else {
								r.push(`shouts at ${him} to move ${his} useless ass.`);
							}
						} else {
							r.push(`While struggling to scrub the penthouse floor, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} carries on trying to clean as ${he} drags ${his} belly along the floor.`);
							r.push(clothingBirth());
							r.push(`Instead of carrying on ${his} task, ${he} draws ${his} child to ${his} breast until`);
							if (S.Stewardess) {
								r.push(`${S.Stewardess.slaveName} shouts at ${him} to move ${his} useless ass.`);
							} else if (V.HeadGirlID !== 0) {
								r.push(`${S.HeadGirl.slaveName} shouts at ${him} to move ${his} useless ass.`);
							} else {
								r.push(`shouts at ${him} to move ${his} useless ass.`);
							}
						}
					} else {
						if (random(0, 1) === 1) {
							r.push(`While giving a slave oral service, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} desperately tries to pull away but they grab ${his} head and force ${him} back to their crotch.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`The slave gets off quite strongly to the show and shoves ${him} to the ground, leaving ${him} struggling to get up before`);
							if (S.Stewardess) {
								r.push(`${S.Stewardess.slaveName} shouts at ${him}.`);
							} else if (V.HeadGirlID !== 0) {
								r.push(`${S.HeadGirl.slaveName} shouts at ${him}.`);
							} else {
								r.push(`shouts at ${him}.`);
							}
						} else {
							r.push(`While using ${his} bloated belly to scrub the penthouse floor, ${slave.slaveName}'s body begins to birth another of ${his} brood. Since this isn't the first time this week this happened, ${he} readies ${himself} for the coming birth.`);
							r.push(clothingBirth());
							r.push(`${He} makes a pass around the room before scooping up ${his} child and struggling to ${his} feet. ${He} slowly waddles to drop off ${his} child.`);
						}
					}
					break;

				case Job.MASTERSUITE:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (V.masterSuiteUpgradeLuxury === 1) {
								r.push(`While awaiting your return on the big bed in the master suite, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} struggles to shift into a more comfortable position before giving up.`);
								r.push(clothingBirth());
								r.push(`Resting in your bed, ${he} draws ${his} child to ${his} breast and resumes waiting for you.`);
								if (S.Concubine) {
									r.push(`${S.Concubine.slaveName} furiously orders ${his} ${children} removed, and ${him} forcefully ejected from the bed so it can be cleaned before your return.`);
								}
							} else if (V.masterSuiteUpgradeLuxury === 2) {
								r.push(`While being the bottom of the master suite's fuckpit, ${slave.slaveName}'s body begins to birth another of ${his} brood. While ${he} doesn't stop having sex, the fucktoys using ${him} do and attempt to drag ${him} from the pit to give birth. Instinctively ${he} begins to push out ${his} baby, indifferent to who may be watching ${his} naked crotch. The fucktoys give up their efforts to haul ${his} bloated form out of the pit and allow ${him} to settle at the bottom. Without a second thought about ${his} child, ${he} attempts to coax the other slaves back into an orgy.`);
							} else {
								r.push(`While awaiting your return in the master suite, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} pays it no heed and continues blankly waiting.`);
								r.push(clothingBirth());
								r.push(`Resting on ${his} belly, ${he} draws ${his} child to ${his} breast and resumes waiting for you.`);
								if (S.Concubine) {
									r.push(`${S.Concubine.slaveName} furiously orders ${his} ${children} removed, and ${him} thoroughly cleaned before your return.`);
								}
							}
						} else {
							if (V.masterSuiteUpgradeLuxury === 1) {
								r.push(`While awaiting your return on the big bed in the master suite, ${slave.slaveName}'s body begins to birth another of ${his} brood. Knowing there is nothing ${he} can do, ${he} accepts that ${he} is going to give birth in your bed.`);
								r.push(clothingBirth());
								r.push(`Once ${his} child is removed, ${he}'s cleaned up, and the sheets changed, ${he} struggles back into bed to recover for your return.`);
							} else if (V.masterSuiteUpgradeLuxury === 2) {
								r.push(`While participating in the fuckpit orgy, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} knows ${he} stands no chance of escaping the fuckpit, so ${he} leaves ${himself} at the mercy of the other fucktoys. They happily position themselves for ${him} to pleasure them while giving birth.`);
								humiliation = 1;
								r.push(clothingBirth());
								r.push(`Once the fucktoys are done tormenting the exhausted broodmother, they hand ${his} child off to the help and snuggle up to ${his} enormous pregnancy as ${he} recovers ${his} strength.`);
							} else {
								r.push(`While awaiting your return in the master suite, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} knows ${he} stands no chance of reaching ${his} sex toys, so ${he} does ${his} best to conceal them. ${He} calls for a servant to hurry as ${he} begins laboring.`);
								r.push(clothingBirth());
								r.push(`The servant collects ${his} child and helps ${him} onto the largest cushion in the room to recover for your return. With a little effort ${he} pushes the vibrating dildo out of ${his} ass before settling down for a nap.`);
							}
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (V.masterSuiteUpgradeLuxury === 1) {
								r.push(`While awaiting your return on the big bed in the master suite, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} shifts into a more comfortable position.`);
								r.push(clothingBirth());
								r.push(`Resting in your bed, ${he} draws ${his} child to ${his} breast and resumes waiting for you.`);
								if (S.Concubine) {
									r.push(`${S.Concubine.slaveName} furiously orders ${his} ${children} removed, and ${him} forcefully ejected from the bed so it can be cleaned before your return.`);
								}
							} else if (V.masterSuiteUpgradeLuxury === 2) {
								r.push(`While being the bottom of the master suite's fuckpit, ${slave.slaveName}'s body begins to birth another of ${his} brood. While ${he} doesn't stop having sex, the fucktoys using ${him} do and attempt to drag ${him} from the pit to give birth. Instinctively ${he} begins to push out ${his} baby, indifferent to who may be watching ${his} naked crotch. The fucktoys give up their efforts to haul ${his} bloated form out of the pit and allow ${him} to settle a the bottom. Without a second thought about ${his} child, ${he} attempts to coax the other slaves back into an orgy.`);
							} else {
								r.push(`While awaiting your return in the master suite, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} pays it no heed and continues blankly waiting.`);
								r.push(clothingBirth());
								r.push(`Resting on ${his} belly, ${he} draws ${his} child to ${his} breast and resumes waiting for you.`);
								if (S.Concubine) {
									r.push(`${S.Concubine.slaveName} furiously orders ${his} ${children} removed, and ${him} thoroughly cleaned before your return.`);
								}
							}
						} else {
							if (V.masterSuiteUpgradeLuxury === 1) {
								r.push(`While awaiting your return on the big bed in the master suite, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} quickly moves ${himself} off the bed and calls for a servant before dropping onto ${his} bloated stomach.`);
								r.push(clothingBirth());
								r.push(`Once ${his} child is removed, ${he}'s cleaned up, and the sheets changed, ${he} struggles back into bed to recover for your return.`);
							} else if (V.masterSuiteUpgradeLuxury === 2) {
								r.push(`While participating in the fuckpit orgy, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} tries to crawl out of the pit but the other fucktoys easily pull ${him} back in and position themselves for ${him} to pleasure them while giving birth.`);
								humiliation = 1;
								r.push(clothingBirth());
								r.push(`Once the fucktoys are done tormenting the exhausted broodmother, they hand ${his} child off to the help and snuggle up to ${his} enormous pregnancy as ${he} recovers ${his} strength.`);
							} else {
								r.push(`While awaiting your return in the master suite, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} tries to get to the prepared area but fails to untangle ${himself} from the toys ${he} was playing with. ${He} calls for a servant to hurry as ${he} begins laboring.`);
								r.push(clothingBirth());
								r.push(`The servant collects ${his} child and helps ${him} onto the largest cushion in the room to recover for your return. With a little effort ${he} pushes the vibrating dildo out of ${his} ass before settling down for a nap.`);
							}
						}
					}
					break;

				case Job.CLUB:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${slave.slaveName} is showing off ${his} grotesque body and trying to attract citizens by dancing as well as ${he} can. During one of ${his} dances, ${his} body begins to birth another of ${his} brood. ${He} keeps on dancing, despite ${his} condition, until ${his} contractions drag ${him} onto ${his} bloated stomach.`);
							r.push(clothingBirth());
							r.push(`Multiple citizens drag ${him} into a booth so that they may tease ${his} enormous exhausted body while the dance floor is dried and ${his} child is carried off.`);
						} else if (slave.fetish === "humiliation") {
							r.push(`${slave.slaveName} is showing off ${his} grotesque body and trying to attract citizens by dancing as well as ${he} can, all the while flashing glimpses of ${his} crotch and nipples. During one of ${his} dances, ${his} body begins to birth another of ${his} brood. ${He} calls out to the crowd, hyping them up for ${his} new show.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`As ${his} child is removed from the dance floor, ${he} is helped into one of the back rooms by several of ${his} aroused onlookers.`);
						} else {
							r.push(`${slave.slaveName} is showing off ${his} grotesque body and trying to attract citizens by dancing as well as ${he} can. During one of ${his} dances, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} frantically struggles to move drawing even more attention to ${his} helpless state. ${He} is roughly pulled into one of the side rooms by a group of men looking forward to the show ${he}'s about to perform for them.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`Only once the last of ${his} clients cums over ${his} bloated body is ${he} handed ${his} child and allowed to rest. ${He} enjoys a moment with ${his} newborn before the servant comes to collect them.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${slave.slaveName} is showing off ${his} grotesque body and trying to attract citizens by dancing as well as ${he} can. During one of ${his} dances, ${his} body begins to birth another of ${his} brood. ${He} keeps on dancing, despite ${his} condition, until ${his} contractions drag ${him} onto ${his} bloated stomach.`);
							r.push(clothingBirth());
							r.push(`Multiple citizens drag ${him} into a booth so that they may tease ${his} enormous exhausted body while the dance floor is dried and ${his} child is carried off.`);
						} else if (slave.fetish === "humiliation") {
							r.push(`${slave.slaveName} is showing off ${his} grotesque body and trying to attract citizens by dancing as well as ${he} can, all the while flashing glimpses of ${his} crotch and nipples. During one of ${his} dances, ${his} body begins to birth another of ${his} brood. ${He} calls out to the crowd, hyping them up for ${his} new show.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`As ${his} child is removed from the dance floor, ${he} is helped into one of the back rooms by several of ${his} aroused onlookers.`);
						} else {
							r.push(`${slave.slaveName} is showing off ${his} grotesque body and trying to attract citizens by dancing as well as ${he} can. During one of ${his} dances, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} clumsily tries to leave the dance floor only to find hands groping ${his} titanic belly. ${He} is roughly pulled into one of the side rooms by a group of men looking forward to the show ${he}'s about to perform for them.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`Only once the last of ${his} clients cums over ${his} bloated body is ${he} handed ${his} child and allowed to rest. ${He} enjoys a moment with ${his} newborn before the servant comes to collect them.`);
						}
					}
					break;

				case Job.CHOICE:
					if (!canWalk(slave)) {
						r.push(`While thinking about what job to take as an immobile womb, ${slave.slaveName}'s body begins to birth another of ${his} brood. Unable to do anything but labor, ${he} gives in to what's coming.`);
						r.push(clothingBirth());
						r.push(`${He} gathers ${his} child and recovers ${his} strength before finding a servant to give ${his} child to. ${He} decides to rest for the rest of the day before returning to choosing ${his} next task.`);
					} else {
						if (slave.fetish === "humiliation") {
							r.push(`While slowly wandering the penthouse deciding on ${his} post, ${slave.slaveName}'s body begins to birth another of ${his} brood. Sensing an opportunity, ${he} waddles to the nearest balcony overlooking the city. ${He} calls out, making sure all eyes are on ${him} for what happens next.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`${He} gathers ${his} child and recovers ${his} strength before finding a servant to give ${his} child to. ${He} decides to rest for the rest of the day before returning to choosing ${his} next task.`);
						} else {
							r.push(`While slowly wandering the penthouse deciding on ${his} post, ${slave.slaveName}'s body begins to birth another of ${his} brood. Unable to reach the prepared birthing room in time, ${he} finds a secluded room to give birth in.`);
							r.push(clothingBirth());
							r.push(`${He} gathers ${his} child and recovers ${his} strength before finding a servant to give ${his} child to. ${He} decides to rest for the rest of the day before returning to choosing ${his} next task.`);
						}
					}
					break;

				case Job.SPA:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`While soaking in the spa's pool, ${slave.slaveName}'s body begins to birth another of ${his} brood. As ${he} begins to ready ${himself} for birth,`);
							if (S.Attendant) {
								r.push(`${S.Attendant.slaveName} struggles to pull ${him} out of the pool and glares at ${him}.`);
							} else {
								r.push(`the other bathers watch curiously.`);
							}
							r.push(clothingBirth());
							r.push(`${He} and ${his} child are quickly dried off as ${he} begins nursing them. A servant soon arrives to take ${his} children away.`);
						} else {
							r.push(`While soaking in the spa's pool, ${slave.slaveName}'s body begins to birth another of ${his} brood. As ${he} begins to ready ${himself} for a water birth,`);
							if (S.Attendant) {
								r.push(`${S.Attendant.slaveName} shifts into position to aid ${him}.`);
							} else {
								r.push(`the other bathers watch curiously.`);
							}
							r.push(clothingBirth());
							r.push(`${He} and ${his} child are quickly dried off as ${he} begins nursing them. A servant soon arrives to take ${his} children away.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`While soaking in the spa's pool, ${slave.slaveName}'s body begins to birth another of ${his} brood. As ${he} begins to ready ${himself} for birth,`);
							if (S.Attendant) {
								r.push(`${S.Attendant.slaveName} struggles to pull ${him} out of the pool and glares at ${him}.`);
							} else {
								r.push(`the other bathers watch curiously.`);
							}
							r.push(clothingBirth());
							r.push(`${He} and ${his} child are quickly dried off as ${he} begins nursing them. A servant soon arrives to take ${his} children away.`);
						} else {
							r.push(`While heading for the changing room before a nice soak, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} hurries into the changing room only to find it unusually crowded. Without any choice left, ${he} assumes a birthing position.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`The several of other slaves present, that aren't pinned by ${his} sudden intrusion, help ${him} with ${his} child while the rest enjoy the show.`);
							if (S.Attendant) {
								r.push(`${S.Attendant.slaveName}, lured in by the commotion, shoos the other slaves out and helps the new mother to a private relaxation room to unwind.`);
							} else {
								r.push(`Soon a servant arrives to take ${his} child away, and ${he} is ushered into the bath to clean up and relax.`);
							}
						}
					}
					break;

				case Job.SCHOOL:
					if (!canWalk(slave)) {
						r.push(`During a lesson in ${V.schoolroomName}, ${slave.slaveName}'s body begins to birth another of ${his} brood. Since this isn't the first time ${he} interrupted the lesson this week, and ${he} is too heavy to move, ${he} is allowed to give birth right where ${he} is.`);
						humiliation = 1;
						r.push(clothingBirth());
						r.push(`${He} struggles to gather ${his} newborn child as class slowly resume. Looking around, ${he} can't help but notice all the other students giggling and gesturing at ${him}.`);
					} else {
						r.push(`During a lesson in ${V.schoolroomName}, ${slave.slaveName}'s body begins to birth another of ${his} brood. Since this isn't the first time ${he} interrupted the lesson this week, ${he} is helped into an adjacent storage room.`);
						humiliation = 1;
						r.push(clothingBirth());
						r.push(`${He} struggles to gather ${his} newborn child and slowly excuses ${himself} from the class. ${He} can't help but notice all the other students giggling and gesturing as ${he} waddles out.`);
					}
					break;

				case Job.CLASSES:
					if (!canWalk(slave)) {
						r.push(`During a lesson under ${V.assistant.name}, ${slave.slaveName}'s body begins to birth another of ${his} brood. Your assistant pauses and waits for ${him} to finish, having given up after the last several times`);
						r.push(clothingBirth());
						r.push(`Exhausted from the birth, ${he} is permitted a short break as ${his} child is collected to be cleaned up before the lesson is continued.`);
					} else {
						r.push(`During a lesson under ${V.assistant.name}, ${slave.slaveName}'s body begins to birth another of ${his} brood. Your assistant pauses and waits for ${him} to finish, having given up after the last several times`);
						r.push(clothingBirth());
						r.push(`Exhausted from the birth, ${he} is permitted a short break as ${his} child is collected to clean ${himself} up before the lesson is continued.`);
					}
					break;

				case Job.BROTHEL:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (pbw > 80) {
								r.push(`While taking a customer's dick, ${slave.slaveName}'s body begins to birth another of ${his} brood out on him. Showing no signs of stopping, he struggles to shoves ${his} bulk off of him. Instinctively ${he} begins to push out ${his} baby, indifferent to who may be watching ${his} naked crotch. ${He} is handed ${his} child, which ${he} clutches to ${his} breast before beckoning for the next customer's cock.`);
							} else if (pbw > 60) {
								r.push(`While sucking a customer's dick, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} shows no signs of slowing down, so he allows ${him} to continue.`);
								r.push(clothingBirth());
								r.push(`He cums down ${his} throat before placing ${his} child on ${his} breast, as ${he} beckoning for the next customer's cock.`);
							} else if (pbw > 40) {
								r.push(`While licking a customer's cunt, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} shows no signs of slowing down, so she allows ${him} to continue.`);
								r.push(clothingBirth());
								r.push(`The customer splashes across ${his} face before placing ${his} child on ${his} breast, as ${he} begins beckoning for the next customer's cunt.`);
							} else {
								r.push(`While taking a customer's dick in ${his} ass, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} shows no signs of slowing down, so he allows ${him} to continue. Instinctively ${he} begins to push out ${his} baby, indifferent to who may be watching ${his} naked crotch. He came strongly thanks to ${him} and gives ${him} a slap on the ass before handing ${him} ${his} child. ${He} brings it to ${his} breast before beckoning for the next customer's cock.`);
							}
						} else {
							if (pbw > 80) {
								r.push(`While riding a customer's dick, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} desperately struggles to disengage encouraging him to shove ${him} onto ${his} bloated womb and mount ${him}. He thoroughly enjoys ${his} contracting cunt before pulling out and standing over ${him}, jacking off. Quickly ${he} spreads ${his} legs apart and begins pushing out ${his} baby${UH}. ${He} can't hide what's happening between ${his} legs,`);
								if (slave.fetish === "humiliation") {
									r.push(`but that only makes it more exciting.`);
								} else {
									r.push(`so ${he} bears with it.`);
								}
								r.push(`He comes over ${his} exhausted body and moves on leaving ${him} to recover and await ${his} child to be sent off.`);
								humiliation = 1;
							} else if (pbw > 60) {
								r.push(`While sucking a customer's dick, ${slave.slaveName}'s body begins to birth another of ${his} brood. Since ${he} is incapable of moving ${himself}, ${he} carries on sucking.`);
								humiliation = 1;
								r.push(clothingBirth());
								r.push(`He cums down ${his} throat before letting ${him} collapse onto ${his} bloated form. When ${he} recovers, ${he} gathers ${his} child to be sent off.`);
							} else if (pbw > 40) {
								r.push(`While licking a customer's cunt, ${slave.slaveName}'s body begins to birth another of ${his} brood. Since ${he} is incapable of moving ${himself}, ${he} carries on licking.`);
								humiliation = 1;
								r.push(clothingBirth());
								r.push(`She cums across ${his} face before helping ${him} to ${his} rear and handing ${him} the newborn child.`);
							} else {
								r.push(`While taking a customer's dick in ${his} ass, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} desperately struggles to disengage but he shoves ${him} onto ${his} bloated womb and mounts ${him}. Quickly ${he} spreads ${his} legs apart and begins pushing out ${his} ${babies}${UH}. ${He} can't hide what's happening between ${his} legs,`);
								if (slave.fetish === "humiliation") {
									r.push(`but that only makes it more exciting.`);
								} else {
									r.push(`so ${he} bears with it.`);
								}
								r.push(`He came strongly thanks to ${him} and gives ${him} a slap on the ass as ${he} collapses onto ${his} bloated womb. Once ${he} recovers enough to collect ${his} child, ${he} awaits for it to be sent off.`);
								humiliation = 1;
							}
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (pbw > 80) {
								r.push(`While taking a customer's dick, ${slave.slaveName}'s body begins to birth another of ${his} brood out on him. Showing no signs of stopping, he struggles to shoves ${his} bulk off of him. Instinctively ${he} begins to push out ${his} baby, indifferent to who may be watching ${his} naked crotch. ${He} is handed ${his} child, which ${he} clutches to ${his} breast before seeking out the next citizen's cock.`);
							} else if (pbw > 60) {
								r.push(`While sucking a customer's dick, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} shows no signs of slowing down, so he allows ${him} to reposition and continue.`);
								r.push(clothingBirth());
								r.push(`He cums down ${his} throat before placing ${his} child on ${his} breast, as ${he} begins seeking out the next citizen's cock.`);
							} else if (pbw > 40) {
								r.push(`While licking a customer's cunt, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} shows no signs of slowing down, so she allows ${him} to reposition and continue.`);
								r.push(clothingBirth());
								r.push(`The customer splashes across ${his} face before placing ${his} child on ${his} breast, as ${he} begins seeking out the next customer's cunt.`);
							} else {
								r.push(`While taking a customer's dick in ${his} ass, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} shows no signs of slowing down, so he allows ${him} to reposition and continue. Instinctively ${he} begins to push out ${his} baby, indifferent to who may be watching ${his} naked crotch. He came strongly thanks to ${him} and gives ${him} a slap on the ass before handing ${him} ${his} child. ${He} brings it to ${his} breast before seeking out the next customer's cock.`);
							}
						} else {
							if (pbw > 80) {
								r.push(`While riding a customer's dick, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} desperately tries to disengage but he shoves ${him} onto ${his} bloated womb and mounts ${him}. He thoroughly enjoys ${his} contracting cunt before pulling out and standing over ${him}, jacking off. Quickly ${he} spreads ${his} legs apart and begins pushing out ${his} ${babies}${UH}. ${He} can't hide what's happening between ${his} legs,`);
								if (slave.fetish === "humiliation") {
									r.push(`but that only makes it more exciting.`);
								} else {
									r.push(`so ${he} bears with it.`);
								}
								r.push(`He comes over ${his} exhausted body and moves on leaving ${him} to recover and collect ${his} child to be sent off.`);
								humiliation = 1;
							} else if (pbw > 60) {
								r.push(`While sucking a customer's dick, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} desperately tries to disengage but he grabs ${his} head and slams ${him} back into his crotch.`);
								humiliation = 1;
								r.push(clothingBirth());
								r.push(`He cums down ${his} throat before letting ${him} collapse onto ${his} bloated form. When ${he} recovers, ${he} gathers ${his} child to be sent off.`);
							} else if (pbw > 40) {
								r.push(`While licking a customer's cunt, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} desperately tries to disengage but she grabs ${his} head and slams ${him} back into ${his} crotch.`);
								humiliation = 1;
								r.push(clothingBirth());
								r.push(`She cums across ${his} face before helping ${him}`);
								if (hasBothLegs(slave)) {
									r.push(`to ${his} feet`);
								} else {
									r.push(`upright`);
								}
								r.push(`and handing ${him} the newborn child.`);
							} else {
								r.push(`While taking a customer's dick in ${his} ass, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} desperately tries to disengage but he shoves ${him} onto ${his} bloated womb and mounts ${him}. Quickly ${he} spreads ${his} legs apart and begins pushing out ${his} ${babies}${UH}. ${He} can't hide what's happening between ${his} legs,`);
								if (slave.fetish === "humiliation") {
									r.push(`but that only makes it more exciting.`);
								} else {
									r.push(`so ${he} bears with it.`);
								}
								r.push(`He came strongly thanks to ${him} and gives ${him} a slap on the ass as ${he} collapses onto ${his} bloated womb. Once ${he} recovers enough to get`);
								if (hasBothLegs(slave)) {
									r.push(`to ${his} feet,`);
								} else {
									r.push(`upright,`);
								}
								r.push(`${he} gathers ${his} child to be sent off.`);
								humiliation = 1;
							}
						}
					}
					break;

				case Job.CONCUBINE:
					if (slave.fetish === Fetish.MINDBROKEN) {
						// TODO: fill out
					} else {
						r.push(`${slave.slaveName} cradles ${his} swollen belly, waiting for your return, when ${his} body begins to birth another of ${his} brood. Saddened that you aren't there for the show, ${he} begins waddling off to find you. By the time ${he} reaches your office, ${he} is barely holding back ${his} child. You rise to meet ${him} and struggle to help ${him} onto the couch, just before it's too late.`);
						r.push(clothingBirth());
						r.push(`Cradling your child, the two of you rest for a spell before sending them off and spending some more intimate time together. You make sure to pay special attention to ${his} overstimulated belly before you help ${him} back to your suite.`);
					}
					break;

				case Job.HEADGIRLSUITE:
					({he2, his2} = getPronouns(S.HeadGirl).appendSuffix("2"));
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${slave.slaveName} is awoken from ${his} rest by a strong contraction. ${He} attempts to roll over, and failing that, begins to fall back to sleep as another contraction wracks ${his} body. ${His} body begins to birth another of ${his} brood.`);
							r.push(clothingBirth());
							r.push(`${He} draws ${his} child to ${his} breast and resumes resting before ${S.HeadGirl.slaveName} returns from ${his2} duties.`);
						} else {
							r.push(`${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} attempts to roll over, and failing that, claws at ${his} massive belly as another contraction wracks ${his} body.`);
							r.push(clothingBirth());
							r.push(`${He} struggles to collect ${his} child and brings them to ${his} breast. ${He} waits for ${S.HeadGirl.slaveName} to return, hoping ${he2} will arrive before another baby makes its way out of ${him}.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${slave.slaveName} is awoken from ${his} rest by a strong contraction. ${He} rolls over and begins to fall back to sleep as another contraction wracks ${his} body. ${His} body begins to birth another of ${his} brood.`);
							r.push(clothingBirth());
							r.push(`${He} draws ${his} child to ${his} breast and resumes resting before ${S.HeadGirl.slaveName} returns from ${his2} duties.`);
						} else {
							r.push(`${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} rolls over and claws at ${his} massive belly as another contraction wracks ${his} body.`);
							r.push(clothingBirth());
							r.push(`${He} struggles to collect ${his} child and places them in the cradle readied for ${him}. ${He} waddles off to take a bath as your servants clean up and remove ${his} child. Cleaned up, ${he} returns to resting knowing full well that ${S.HeadGirl.slaveName} will be eager to play with ${his} body upon returning.`);
						}
					}
					break;

				case Job.ARCADE:
					r.push(`A gush of liquid pours from the ${slave.slaveName}'s cunt, followed by the attendant in charge of the arcade hanging an "out of order" sign on ${his} exposed rear. While ${his} mouth is filled with a customer's dick, ${his} body instinctively births ${his} child into the waiting basket. As they are carried away, ${his} rear is cleaned up and the sign removed.`);
					break;

				case Job.CLINIC:
					if (S.Nurse) {
						({he2, his2} = getPronouns(S.Nurse).appendSuffix("2"));
					}
					r.push(`${slave.slaveName} is in the perfect place to give birth when ${his} body begins to push out another of ${his} brood.`);
					if (S.Nurse) {
						r.push(S.Nurse.slaveName);
					} else {
						r.push(`A freelance nurse`);
					}
					r.push(`delivers ${his} child before taking them away. Before long ${he2} returns to attend to ${his2} patient's perpetual pregnancy.`);
					break;

				case Job.CELLBLOCK:
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`While waiting in confinement, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} assumes a birthing position.`);
						r.push(clothingBirth());
						r.push(`${He} struggles for a minute before realizing ${his} pregnancy takes up most of the cell and that ${he} can't reach ${his} child. The servant that has to crawl under ${his} bloated body to get ${his} child is less than pleased, especially since this is the third time this week ${he} has had to do it.`);
					} else {
						r.push(`${slave.slaveName} is awoken from ${his} stupor by ${his} body beginning to birth another of ${his} brood. ${He} struggles to get into position but ends up getting stuck thanks to ${his} massive belly and inability to properly move ${himself}.`);
						humiliation = 1;
						r.push(clothingBirth());
						r.push(`${He} spills out of the cell when the servant comes once more to collect ${his} child. ${He} hastily tries to cram ${his} bulk back into ${his} cell before ${he} gets chastised.`);
					}
					break;

				default:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`While stroking ${his} pregnancy absentmindedly, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} carries on until the contractions drag ${him} onto ${his} swollen belly.`);
							r.push(clothingBirth());
							r.push(`${He} draws ${his} child to ${his} breast and rests upon ${his} mass until a servant collects ${his} child and helps ${him} back to ${his} bed.`);
						} else {
							if (random(0, 1) === 1) {
								r.push(`While waiting to be helped to ${his} next assignment, ${slave.slaveName}'s body begins to birth another of ${his} brood. Unable to do anything, ${he} is forced to give birth where ${he} is.`);
								r.push(clothingBirth());
								r.push(`${He} gathers ${his} child and recovers ${his} strength while resuming ${his} wait for a servant to help ${him} to ${his} assignment.`);
							} else {
								r.push(`While eating in the cafeteria, ${slave.slaveName}'s body begins to birth another of ${his} brood. Unable to move, ${he} finds ${himself} stranded in the middle of all the dining slaves.`);
								humiliation = 1;
								r.push(clothingBirth());
								r.push(`${He} gathers ${his} child and waits to be rescued from the vicious mockery, fully aware of all the jeering and laughter.`);
							}
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`While stroking ${his} pregnancy absentmindedly, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} carries on until the contractions drag ${him} onto ${his} swollen belly.`);
							r.push(clothingBirth());
							r.push(`${He} draws ${his} child to ${his} breast and rests upon ${his} mass until a servant collects ${his} child and helps ${him} back to ${his} bed.`);
						} else if (slave.fetish === "humiliation") {
							r.push(`While waddling through the penthouse between assignments, ${slave.slaveName}'s body begins to birth another of ${his} brood. Sensing an opportunity, ${he} waddles to the nearest balcony overlooking the city. ${He} calls out, making sure all eyes are on ${him} for what happens next.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`${He} gathers ${his} child and recovers ${his} strength before finding a servant to give ${his} child to. ${He} resumes ${his} previous task, eager for the next child to move into position.`);
						} else {
							if (random(0, 1) === 1) {
								r.push(`While waddling through the penthouse on ${his} way to ${his} next assignment, ${slave.slaveName}'s body begins to birth another of ${his} brood. Unable to reach the prepared birthing room in time, ${he} finds a secluded room to give birth in.`);
								r.push(clothingBirth());
								r.push(`${He} gathers ${his} child and recovers ${his} strength before finding a servant to give ${his} child to before shuffling to ${his} assignment.`);
							} else {
								r.push(`While waddling through the penthouse on ${his} way to the cafeteria, ${slave.slaveName}'s body begins to birth another of ${his} brood. Unable to reach the prepared birthing room in time, ${he} finds ${himself} stranded in the middle of all the dining slaves.`);
								humiliation = 1;
								r.push(clothingBirth());
								r.push(`${He} gathers ${his} child and recovers ${his} strength before trying to escape out of sight of the jeering crowd. Finding a servant to give ${his} child to, ${he} hastily heads back to ${his} bed to hide ${himself} from the mockery, though ${his} enormous belly keeps ${his} blanket from covering ${him}.`);
							}
						}
					}
			}
		} else {
			// add extra events here (moving between jobs | after work)
			if (getPersonalAttention(slave.ID, "torture") && !onBedRest(V.PC, true)) {
				r.push(`${He}'s given birth during your torture sessions enough times for you to start making games of it; perhaps you see how hard you can hit ${him} before you cause ${his} water to break, or maybe you try to break it yourself. If you time it right, it's even possible to force ${him} to pop out two babies at once! The best part is, no matter how many come out of ${him}, ${he} never loses the huge target that is ${his} gravid middle.`);
			} else if (getPersonalAttention(slave.ID, "ravish") && !onBedRest(V.PC, true)) {
				if (random(1, 20) > suddenBirth) {
					r.push(`The constant fucking has a bad habit of sending ${him} into labor, forcing you to stop and allow ${him} a moment to pop out the child. Once it is sent off, you conclude your break and go back to fucking ${his}`);
					if (canDoVaginal(slave)) {
						if (slave.mpreg === 0) {
							r.push(`sore, gaping`);
						}
						r.push(`pussy`);
					} else {
						if (slave.mpreg === 1) {
							r.push(`sore, gaping buttpussy`);
						} else {
							r.push(`anus`);
						}
					}
					r.push(`while enjoying the agitated movements emanating from ${his} brood trapped beneath you.`);
				} else {
					if (canDoVaginal(slave) && slave.mpreg === 0) {
						r.push(`You groan in displeasure as you feel yourself starting to be edged out of ${his} pussy by another of ${his} brood being born. You sigh and resort to masturbating until the brat is fully born and sent away so you can get back to fucking ${his} baby-stuffed body until you inevitably send ${him} back into labor and this all repeats again.`);
					} else if (canDoVaginal(slave)) {
						if (canPenetrate(V.PC) || V.PC.clit >= 3) {
							r.push(`You moan with pleasure at the pressure of another of ${his} brood beginning to move through ${his} rectum. The feeling of it pushing down against your ${V.PC.clit >= 3 ? "clit" : "dick"} makes everything feel so wonderfully tight. In fact, maybe too tight; you struggle to extract yourself from the clenching orifice before you find your tool painfully crushed. With a stimulating pop, you pull out just as ${his} baby slips from ${his} rectum, climaxing in the`);
							if (isVirile(V.PC)) {
								r.push(`process and christening it in a shower of cum.`);
							} else {
								r.push(`process.`);
							}
							r.push(`Once the baby is taken care of, you bend ${him} back over ${his} massive belly and carry on fucking ${him} in the hopes of triggering another baby to be born.`);
						} else {
							r.push(`You grunt in displeasure as the pressure of another of ${his} brood slipping into ${his} rectum traps your strap-on in place. You try to wiggle it loose, but it just won't budge. You sigh and catch the baby as it pops out of ${his} butthole before handing it off and evaluating just how crushed your favorite toy is.`);
						}
					} else if (canDoAnal(slave) && slave.mpreg === 1) {
						r.push(`You groan in displeasure as you feel yourself blocked out of ${his} anus by the crowning head of another of ${his} brood. You sigh and resort to masturbating until the brat is fully born and sent away so you can get back to fucking ${his} baby-stuffed body until you inevitably send ${him} back into labor and this all repeats again.`);
					} else {
						if (canPenetrate(V.PC) || V.PC.clit >= 3) {
							r.push(`You moan with pleasure as the pressure of another of ${his} brood slipping into ${his} birth canal forces ${his} rectum to tighten around your ${V.PC.clit >= 3 ? "clit" : "dick"}. It quickly becomes way too tight; you struggle to dislodge yourself from the clenching orifice before you get completely crushed. With a stimulating pop, you pull out just as ${his} baby slips from ${his} pussy, climaxing in the`);
							if (isVirile(V.PC)) {
								r.push(`process and christening it in a shower of cum.`);
							} else {
								r.push(`process.`);
							}
							r.push(`Once the baby is taken care of, you bend ${him} back over ${his} massive belly and carry on fucking ${him} in the hopes of triggering another baby to be born.`);
						} else {
							r.push(`You grunt in displeasure as the pressure of another of ${his} brood slipping into ${his} birth canal pushes down on your strap-on and traps it in place. You try to wiggle it loose, but it just won't budge. You sigh and catch ${his} baby as it pops out of ${his} pussy before handing it off and evaluating just how crushed your favorite toy is.`);
						}
					}
				}
			} else if (!canWalk(slave)) {
				if (slave.fetish === Fetish.MINDBROKEN) {
					r.push(`While stroking ${his} pregnancy absentmindedly, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} carries on until the contractions drag ${him} onto ${his} swollen belly.`);
					r.push(clothingBirth());
					r.push(`${He} draws ${his} child to ${his} breast and rests upon ${his} mass until a servant collects ${his} child and helps ${him} back to ${his} bed.`);
				} else {
					if (random(0, 1) === 1) {
						r.push(`While waiting to be helped to ${his} next assignment, ${slave.slaveName}'s body begins to birth another of ${his} brood. Unable to do anything, ${he} is forced to give birth where ${he} is.`);
						r.push(clothingBirth());
						r.push(`${He} gathers ${his} child and recovers ${his} strength while resuming ${his} wait for a servant to help ${him} to ${his} assignment.`);
					} else {
						r.push(`While eating in the cafeteria, ${slave.slaveName}'s body begins to birth another of ${his} brood. Unable to move, ${he} finds ${himself} stranded in the middle of all the dining slaves.`);
						humiliation = 1;
						r.push(clothingBirth());
						r.push(`${He} gathers ${his} child and waits to be rescued from the vicious mockery, fully aware of all the jeering and laughter.`);
					}
				}
			} else {
				if (slave.fetish === Fetish.MINDBROKEN) {
					r.push(`While wandering the penthouse absentmindedly, ${slave.slaveName}'s body begins to birth another of ${his} brood. ${He} carries on until the contractions drag ${him} onto ${his} swollen belly.`);
					r.push(clothingBirth());
					r.push(`${He} draws ${his} child to ${his} breast and rests upon ${his} mass until a servant collects ${his} child and helps ${him} back`);
					if (hasBothLegs(slave)) {
						r.push(`to ${his} feet.`);
					} else {
						r.push(`upright.`);
					}
				} else if (slave.fetish === "humiliation") {
					r.push(`While waddling through the penthouse between assignments, ${slave.slaveName}'s body begins to birth another of ${his} brood. Sensing an opportunity, ${he} waddles to the nearest balcony overlooking the city. ${He} calls out, making sure all eyes are on ${him} for what happens next.`);
					humiliation = 1;
					r.push(clothingBirth());
					r.push(`${He} gathers ${his} child and recovers ${his} strength before finding a servant to give ${his} child to. ${He} resumes ${his} previous task, eager for the next child to move into position.`);
				} else {
					if (random(0, 1) === 1) {
						r.push(`While waddling through the penthouse on the way to ${his} next assignment, ${slave.slaveName}'s body begins to birth another of ${his} brood. Unable to reach the prepared birthing room in time, ${he} finds a secluded room to give birth in.`);
						r.push(clothingBirth());
						r.push(`${He} gathers ${his} child and recovers ${his} strength before finding a servant to give ${his} child to before shuffling to ${his} assignment.`);
					} else {
						r.push(`While waddling through the penthouse on ${his} way to the cafeteria, ${slave.slaveName}'s body begins to birth another of ${his} brood. Unable to reach the prepared birthing room in time, ${he} finds ${himself} stranded in the middle of all the dining slaves.`);
						humiliation = 1;
						r.push(clothingBirth());
						r.push(`${He} gathers ${his} child and recovers ${his} strength before trying to escape out of sight of the jeering crowd. Finding a servant to give ${his} child to, ${he} hastily heads back to ${his} bed to hide ${himself} from the mockery, though ${his} enormous belly keeps ${his} blanket from covering ${him}.`);
					}
				}
			}
		}
		App.Events.addParagraph(el, r);
		return el;
	}

	function birthDescription() {
		const el = document.createElement("p");
		let He2;
		let he2;
		let his2;
		const r = [];
		const HGL = App.Entity.facilities.headGirlSuite.hostedSlaves();
		const babies = slave.pregType > 1 ? `babies` : `baby`;
		const children = slave.pregType > 1 ? `children` : `child`;
		const childrenAre = slave.pregType > 1 ? `children are` : `child is`;
		const newborns = slave.pregType > 1 ? `newborns` : `newborn`;
		const UH = (slave.geneticQuirks.uterineHypersensitivity === 2) ? `, convulsing with orgasms in the process` : ``;

		if (birthDamage > 5 || V.universalRulesCSec === 1) {
			if (V.universalRulesCSec === 1 || (slave.mpreg === 0 && slave.vagina < 0)) {
				cSection = true;
				if (V.clinic !== 0) {
					r.push(`${slave.slaveName} is taken to ${V.clinicName} since ${he}`);
					if (slave.mpreg === 0 && slave.vagina < 0) {
						r.push(`will require a cesarean section to give birth.`);
					} else {
						r.push(`is scheduled for a cesarean section.`);
					}
					r.push(`${He} is helped from ${his} clothes and into a comfortable hospital bed to relax until the surgery suite is prepped. After several minutes, ${he} is transferred to the surgery wing. Following ${his} c-section, ${he} is returned to the recovery wing to rest. ${His} ${childrenAre} promptly taken and ${he} is left under observation to make sure ${he} recovers.`);
				} else {
					r.push(`${slave.slaveName} is taken to the autosurgery, since ${he}`);
					if (slave.mpreg === 0 && slave.vagina < 0) {
						r.push(`will require a cesarean section to give birth. ${He} is stripped from ${his} clothes and set up on the operating table. ${He} is quickly sedated, and subjected to a c-section as ${he} has no hole to give birth through.`);
					} else {
						r.push(`is scheduled for a cesarean section. ${He} is stripped from ${his} clothes and set up on the operating table. ${He} is quickly sedated, and subjected to a c-section in order to avoid potential problems and preserve ${his}`);
						if (slave.mpreg === 1) {
							r.push(`asshole.`);
						} else {
							r.push(`vagina.`);
						}
					}
					r.push(`The surgery is quick, and ${he} is moved to a bed to recover. When ${he} awakes, ${his} ${children}`);
					if (slave.pregType > 1) {
						r.push(`have`);
					} else {
						r.push(`has`);
					}
					r.push(`already been taken away.`);
				}
			} else {
				if (V.clinic !== 0) {
					if (getPersonalAttention(slave.ID, "torture") && !onBedRest(V.PC, true)) {
						r.push(`You know ${he} is going to struggle with childbirth, so you see no reason to interrupt your torture session just yet. You enjoy the sight of ${his} futile attempts to become a mother until the pooling blood reminds you that letting ${him} die so soon would cut short your fun. You send ${him} off to ${V.clinicName}, where ${he} is helped`);
					} else {
						r.push(`${He} is lead to ${V.clinicName} since ${he} is likely to face complications with childbirth. ${He} is helped from ${his} clothes and`);
					}
					r.push(`into a comfortable hospital bed to relax until ${he} is ready. ${He} makes ${himself} comfortable and begins working on birthing ${his} ${babies}, fully aware of ${his} watching helpers.`);
					if (slave.geneticQuirks.uterineHypersensitivity === 2) {
						r.push(`${His} body is so sensitive that even difficult birth is an intensely pleasurable experience for ${him}.`);
					}
					if (birthDamage > 10) {
						cSection = true;
						r.push(`After several hours of intense labor, ${he} is transferred to the surgery wing. Following an emergency c-section, ${he} is returned to the recovery wing to rest.`);
					} else {
						r.push(`After several hours,`);
						if (slave.geneticQuirks.uterineHypersensitivity !== 1) {
							r.push(`and a touch of morphine,`);
						}
						r.push(`${he} has successfully given birth.`);
					}
					r.push(`${His} ${childrenAre} promptly taken and ${he} is left under observation to make sure ${he} recovers.`);
				} else {
					cSection = true;
					if (getPersonalAttention(slave.ID, "torture") && !onBedRest(V.PC, true)) {
						r.push(`You know ${he} is going to struggle with childbirth, so you see no reason to interrupt your torture session just yet. You enjoy the sight of ${his} futile attempts to become a mother until the pooling blood reminds you that letting ${him} die so soon would cut short your fun. You send ${him} off to the autosurgery, to be`);
					} else {
						r.push(`${He} is lead to the autosurgery, since ${he} is likely to face complications with childbirth. ${He} is stripped from ${his} clothes and`);
					}
					r.push(`set up on the operating table. ${He} is quickly sedated and subjected to a c-section in order to avoid potential problems. The surgery is quick, and ${he} is moved to a bed to recover. When ${he} awakes, ${his} ${children}`);
					if (slave.pregType > 1) {
						r.push(`have`);
					} else {
						r.push(`has`);
					}
					r.push(`already been taken away.`);
				}
			}
		} else if (getPersonalAttention(slave.ID, "torture") && !onBedRest(V.PC, true) && random(1, 100) > 50) {
			r.push(`A little thing like childbirth isn't going to stop you from beating ${him}, however, so you focus your efforts on timing your strikes in-between ${his} contractions, never truly giving ${his} body a chance to rest. You keep at it until ${his} belly is fully deflated and ${his} ${newborns} collected, and once they are, try to find just how much of a gut-punch it takes to dislodge a placenta.`);
		} else if (getPersonalAttention(slave.ID, "ravish") && !onBedRest(V.PC, true) && random(1, 100) > 50) {
			r.push(`With contractions underway, you take a break from fucking ${him} to allow ${him} the time ${he} needs to birth ${his} ${children}. Once they are sent off and ${he} is cleaned up, you get right back to fucking ${his}`);
			if (canDoVaginal(slave)) {
				if (slave.mpreg === 0) {
					r.push(`sore`);
				}
				r.push(`pussy`);
			} else {
				if (slave.mpreg === 1) {
					r.push(`sore`);
				} else {
					r.push(`anus`);
				}
			}
			r.push(`despite ${his} need for rest.`);
		} else {
			const animals = [];

			if (V.animals.canine.length > 0) {
				animals.push(V.animals.canine.random());
			}
			if (V.animals.hooved.length > 0) {
				animals.push(V.animals.hooved.random());
			}
			if (V.animals.feline.length > 0) {
				animals.push(V.animals.feline.random());
			}

			const animal = getAnimal(animals.random());

			switch (slave.assignment) {
				case Job.REST:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${He} is helped back to ${his} bed and stripped before slipping into it. Instinctively, ${he} begins to push out ${his} ${babies}. ${His} ${childrenAre} promptly taken and ${he} is encouraged to keep resting.`);
						} else {
							r.push(`${He} is helped back to ${his} bed and stripped before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${his} ${(slave.pregType > 1) ? `babies` : `baby`} ${(slave.geneticQuirks.uterineHypersensitivity === 2) ? `, convulsing with orgasms in the process` : ``}. ${His} ${(slave.pregType > 1) ? `children are` : `child is`} promptly taken and ${he} is encouraged to keep resting.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${He} returns to ${his} bed and strips before slipping into it. Instinctively, ${he} begins to push out ${his} ${(slave.pregType > 1) ? `babies` : `baby`}. ${His} ${children} promptly taken and ${he} is encouraged to keep resting.`);
						} else {
							r.push(`${He} returns to ${his} bed and strips before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and ${he} is encouraged to keep resting.`);
						}
					}
					break;

				case Job.SUBORDINATE: {
					const domSlave = getSlave(slave.subTarget);
					if (domSlave) {
						({he2} = getPronouns(domSlave).appendSuffix("2"));
					}
					if (slave.fetish === Fetish.MINDBROKEN) {
						if (slave.subTarget <= 0) {
							r.push(`${He} returns to ${his} bed and strips before slipping into it. Instinctively, ${he} begins to push out ${his} ${babies}. ${His} ${childrenAre} promptly taken and ${he} rests for a short while before returning to your waiting slaves.`);
						} else {
							r.push(`${He} is lead by ${domSlave.slaveName} to a private room so that ${he2} may`);
							if (canSee(domSlave)) {
								r.push(`watch.`);
							} else {
								r.push(`be present.`);
							}
							r.push(`Instinctively ${he} begins to push out ${his} ${babies}, indifferent to ${his} watching audience. ${His} ${childrenAre} promptly taken and ${domSlave.slaveName} eagerly descends upon ${his} defenseless body.`);
						}
					} else {
						if (slave.subTarget <= 0) {
							r.push(`${He} returns to ${his} bed and strips before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and ${he} rests for a short while before returning to your waiting slaves.`);
						} else {
							r.push(`${He} is taken by ${domSlave.slaveName} to a private room so that ${he2} may`);
							if (canSee(domSlave)) {
								r.push(`watch.`);
							} else {
								r.push(`be present.`);
							}
							r.push(`Reluctantly, ${he} begins to push out ${his} ${babies}${UH}, fully aware of ${domSlave.slaveName}'s`);
							if (domSlave.fetish === "pregnancy") {
								r.push(`hungry gaze.`);
							} else {
								r.push(`amused gaze.`);
							}
							r.push(`${His} ${childrenAre} promptly taken and ${domSlave.slaveName} eagerly descends upon ${his} exhausted body.`);
							humiliation = 1;
						}
					}
					break;
				}

				case Job.WHORE:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${He} is helped back to ${his} bed and stripped before slipping into it. Instinctively, ${he} begins to push out ${his} ${babies}. ${His} ${childrenAre} promptly taken and ${he} rests awhile before returning to whoring.`);
						} else {
							r.push(`${He} is helped back to ${his} bed and stripped before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and ${he} rests awhile before returning to whoring.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${He} returns to ${his} bed and strips before slipping into it. Instinctively, ${he} begins to push out ${his} ${babies}. ${His} ${childrenAre} promptly taken and ${he} rests awhile before returning to whoring.`);
						} else {
							r.push(`${He} returns to ${his} bed and strips before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and ${he} rests awhile before returning to whoring.`);
						}
					}
					break;

				case Job.PUBLIC:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${He} is helped back to ${his} bed and stripped before slipping into it. Instinctively, ${he} begins to push out ${his} ${babies}. ${His} ${childrenAre} promptly taken and ${he} rests awhile before returning to slutting.`);
						} else {
							r.push(`${He} is helped back to ${his} bed and stripped before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and ${he} rests awhile before returning to slutting.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${He} returns to ${his} bed and strips before slipping into it. Instinctively, ${he} begins to push out ${his} ${babies}. ${His} ${childrenAre} promptly taken and ${he} rests awhile before returning to slutting.`);
						} else {
							r.push(`${He} returns to ${his} bed and strips before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and ${he} rests awhile before returning to slutting.`);
						}
					}
					break;

				case Job.GLORYHOLE:
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`Since ${he} is unable to leave ${his} box, ${he} doesn't have far to go. Instinctively, ${he} begins to push out ${his} ${babies}. ${His} ${childrenAre} quickly extracted from the box. ${He} never notices, focused entirely on the fresh cock poking through the glory hole.`);
					} else {
						r.push(`Since ${he} is unable to leave ${his} box, ${he} doesn't have far to go. ${He} quickly finishes the waiting dick before shifting ${himself} into a slightly, though not by much, more comfortable position. ${He} begins laboring on ${his} ${children}${UH}. As ${he} finishes, the box is opened and ${his} ${childrenAre} gathered and taken away before ${he} is ordered back to sucking.`);
					}
					break;

				case Job.MILKED:
					if (slave.fetish === Fetish.MINDBROKEN) {
						if (V.dairyPregSetting > 0) {
							r.push(`Since the dairy is designed for pregnant cows, ${he} stays hooked up to the milkers. ${He} shows little interest in ${his} coming birth, instead focusing on ${his} milky breasts. Instinctively, ${he} begins to push out ${his} ${babies}. ${He} pays no heed to ${his} ${children} being removed from the milking stall, nor when ${he} is hosed off.`);
						} else {
							if (!canWalk(slave)) {
								r.push(`${He} is helped back to ${his} bed and stripped before slipping into it.`);
							} else {
								r.push(`${He} returns to ${his} bed and strips before slipping into it.`);
							}
							r.push(`Instinctively, ${he} begins to push out ${his} ${babies}. ${His} ${childrenAre} promptly taken and ${he} rests awhile before returning to the milkers to lighten ${his} swelling breasts.`);
						}
					} else {
						if (V.dairyPregSetting > 0) {
							r.push(`Since the dairy is designed for pregnant cows, ${he} stays hooked up to the milkers. ${He} meekly protests ${his} situation, but ultimately accepts it. ${He} begins working on birthing ${his} ${babies}${UH}, and catches a glimpse of ${his} ${children} being removed from the milking stall, but quickly forgets when ${he} is hosed off.`);
							humiliation = 1;
						} else {
							if (!canWalk(slave)) {
								r.push(`${He} is helped back to ${his} bed and stripped before slipping into it.`);
							} else {
								r.push(`${He} returns to ${his} bed and strips before slipping into it.`);
							}
							r.push(`${He} makes ${himself} comfortable and begins working on birthing ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and ${he} rests awhile before returning to the milkers to lighten ${his} swelling breasts.`);
						}
					}
					break;

				case Job.FARMYARD:
					if (slave.fetish === Fetish.MINDBROKEN) {
						if (V.farmyardShows && V.seeBestiality && animals.length > 0) {
							r.push(`${He} shows no interest in ${his} coming birth as ${he} continues being rutted by ${`${animal.articleAn} ${animal.name}` || `an animal`}, so`);
							if (S.Farmer) {
								r.push(S.Farmer.slaveName);
							} else {
								r.push(`another slave`);
							}
							r.push(`has to pull the animal off of ${him} and drag ${him} into the nearest birthing stall. ${He} also shows almost no reaction when ${his} ${children}`);
							if (slave.pregType <= 1) {
								r.push(`begins`);
							} else {
								r.push(`begin`);
							}
							r.push(`to come out, or when ${he} is subsequently hosed off before being led back to ${V.farmyardName}.`);
						} else {
							r.push(`${He} shows no interest in ${his} coming birth as ${he} continues ${either("loading hay bales", "milking a cow", "pulling weeds")}, until ${his} contractions become so strong that ${he} collapses to ${his} knees.`);
							if (S.Farmer) {
								r.push(S.Farmer.slaveName);
							} else {
								r.push(`Another slave`);
							}
							r.push(`is at ${his} side in an instant, pulling ${him} to ${his} feet and into a birthing stall. ${He} also shows almost no reaction when ${his} ${children} ${(slave.pregType <= 1) ? `begin` : `begins`} to come out, or when ${he} is subsequently hosed off before being led back to ${V.farmyardName}.`);
						}
					} else {
						if (V.farmyardShows && V.seeBestiality && animals.length > 0) {
							if (S.Farmer) {
								r.push(S.Farmer.slaveName);
							} else {
								r.push(`Another slave`);
							}
							r.push(`pulls the ${animal.species || `animal`} off of ${him} after ${he} begins to feel contractions coming. ${He} begins to give birth where ${he} is${(V.farmyardRestraints) ? `, still in ${his} restraints,` : ``} and gives ${his} viewers a different kind of show than the kind they were expecting. The crowd is appreciative, and after ${he} has finished, a slave takes ${his} ${children} from ${him} and leads ${him} back to ${his} room to shower and rest before ${he} is expected to return to ${his} shows.`);
							humiliation = 1;
						} else {
							if (!canWalk(slave)) {
								r.push(`${He} is helped back to ${his} bed and stripped before slipping into it.`);
							} else {
								r.push(`${He} returns to ${his} bed and strips before slipping into it.`);
							}
							r.push(`${He} makes ${himself} comfortable and begins working on birthing ${his} ${babies}. ${His} ${childrenAre} promptly taken and ${he} rests awhile before returning to ${V.farmyardName} to continue ${either(["loading hay bales", "milking cows", "pulling weeds"])}.`);
						}
					}
					break;

				case Job.FUCKTOY:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`You strip ${him} and help ${him} onto your couch. Instinctively, ${he} begins to push out ${his} ${babies}. ${His} ${childrenAre} promptly taken and ${he} falls into a contented nap. You enjoy ${his} exhausted body until a servant comes to help clean ${him} up.`);
						} else {
							if (slave.devotion > 20) {
								r.push(`${He} moans lewdly at you and wiggles ${his} hips. As ${he} teases, ${he} begins pushing ${his} ${babies} out. As ${he} crowns, you pull ${him} into your arms and hold ${him} close. You hold ${him} in a comforting embrace until ${he} finishes`);
							} else if (slave.devotion >= -20) {
								r.push(`${He} releases a lewd moan and begins attempting to remove ${his} clothes. You approach ${him}, clearing ${his}`);
								if (slave.mpreg === 1) {
									r.push(`asshole`);
								} else {
									r.push(`vagina`);
								}
								r.push(`and helping ${him} onto the couch, where you take a seat next to ${him} to fondle ${his} vulnerable body. Once ${he} finishes, you give ${him} some time to catch ${his} breath.`);
							} else {
								r.push(`${He} begins desperately begging to be taken back to ${his} bed; instead you pull ${him} towards the couch and take a seat with ${him} in your lap, back against your front. Blushing thoroughly, ${he} gives a meek protest before focusing on the coming birth, rather than your wandering hands.`);
								humiliation = 1;
							}
							r.push(`${He} begins to push out ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and, following a shower and a fresh change of clothes, ${he} is helped back to your office${(slave.devotion < -20) ? ` where you are waiting to enjoy ${his} exhausted body` : ``}.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${He} returns to ${his} bed and strips before slipping into it. Instinctively, ${he} begins to push out ${his} ${babies}. ${His} ${childrenAre} promptly taken and ${he} falls into a contented nap. That is until you wake ${him} up, inquiring where ${he} waddled off to without your permission.`);
						} else {
							if (slave.devotion > 20) {
								r.push(`${He} seeks you out and begins slowly stripping. As ${he} teases, ${he} begins pushing ${his} ${babies} out. As ${he} crowns, ${he} throws ${himself} into your waiting arms and holds ${himself} to you. You hold ${him} in a comforting embrace until ${he} finishes.`);
							} else if (slave.devotion >= -20) {
								r.push(`${He} approaches you and begins a very uncertain striptease. As ${he} lowers ${himself} to the floor to begin pushing, you overtake ${him} and fondle ${his} vulnerable body. Once ${he} finishes, you help ${him} to the couch to catch ${his} breath.`);
							} else {
								r.push(`${He} attempts to leave your office and return to ${his} bed, but you catch ${his} arm before ${he} slips out of reach. You order ${him} to strip and give you a show. Blushing thoroughly, ${he} gives a meek performance before falling to the floor.`);
								humiliation = 1;
							}
							r.push(`${He} begins to push out ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and, following a shower and a fresh change of clothes, ${he} returns to your office${(slave.devotion < -20) ? ` where you are waiting to enjoy ${his} exhausted body` : ``}.`);
						}
					}
					break;

				case Job.CONFINEMENT:
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`Since ${he} is locked in a cell, ${he} doesn't have far to go. Instinctively, ${he} begins to push out ${his} ${babies}. ${His} ${childrenAre} promptly taken and, after ${he} and the cell are hosed down, ${he} is returned to isolation.`);
					} else {
						r.push(`Since ${he} is locked in a cell, ${he} doesn't have far to go. Reluctantly, ${he} begins to push out ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and, after ${he} and the cell are hosed down, ${he} is returned to isolation.`);
						humiliation = 1;
					}
					break;

				case Job.QUARTER:
				case Job.HOUSE:
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${He} returns to ${his} bed and strips before slipping into it. Instinctively ${he} begins to push out ${his} ${babies}. ${His} ${childrenAre} promptly taken and ${he} rests awhile before returning to service your penthouse.`);
					} else {
						r.push(`${He} returns to ${his} bed and strips before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and ${he} rests awhile before returning to service your penthouse.`);
					}
					break;

				case Job.MASTERSUITE:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (V.masterSuiteUpgradePregnancy === 1) {
								r.push(`${He} is helping into the birthing chamber, stripped, and aided into the specialized chair. Instinctively, ${he} begins to push out ${his} ${babies}. ${His} ${childrenAre} promptly taken and, following a shower and fresh change of clothes, ${he} is returned to`);
								if (V.masterSuiteUpgradeLuxury === 1) {
									r.push(`your big bed.`);
								} else if (V.masterSuiteUpgradeLuxury === 2) {
									r.push(`the fuckpit.`);
								} else {
									r.push(`the main room of the master suite.`);
								}
							} else {
								r.push(`After struggling to strip and tipping into one of the various seats around the room, ${he} prepares to give birth. Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to whoever may be watching ${him}. ${His} ${childrenAre} promptly taken and, following a shower and fresh change of clothes, ${he} is helped back to`);
								if (V.masterSuiteUpgradeLuxury === 1) {
									r.push(`your big bed.`);
								} else if (V.masterSuiteUpgradeLuxury === 2) {
									r.push(`the fuckpit.`);
								} else {
									r.push(`${his} usual spot.`);
								}
							}
						} else {
							if (V.masterSuiteUpgradePregnancy === 1) {
								r.push(`${He} is helping into the birthing chamber, stripped, and aided into the specialized chair. Finding it quite comfortable, ${he} begins to push out ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and, following a shower and fresh change of clothes, ${he} is returned to`);
								if (V.masterSuiteUpgradeLuxury === 1) {
									r.push(`your big bed.`);
								} else if (V.masterSuiteUpgradeLuxury === 2) {
									r.push(`the fuckpit.`);
								} else {
									r.push(`the main room of the master suite.`);
								}
							} else {
								r.push(`After struggling to strip and tipping into one of the various seats around the room, ${he} prepares to give birth. ${He} gets comfortable and begins to push out ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and, following a shower and fresh change of clothes, ${he} is returned to`);
								if (V.masterSuiteUpgradeLuxury === 1) {
									r.push(`your big bed.`);
								} else if (V.masterSuiteUpgradeLuxury === 2) {
									r.push(`the fuckpit.`);
								} else {
									r.push(`${his} preferred spot.`);
								}
							}
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (V.masterSuiteUpgradePregnancy === 1) {
								r.push(`${He} enters the birthing chamber, strips, and seats ${himself} in the specialized chair. Instinctively, ${he} begins to push out ${his} ${babies}. ${His} ${childrenAre} promptly taken and, following a shower and fresh change of clothes, ${he} returns to`);
								if (V.masterSuiteUpgradeLuxury === 1) {
									r.push(`your big bed.`);
								} else if (V.masterSuiteUpgradeLuxury === 2) {
									r.push(`the fuckpit.`);
								} else {
									r.push(`the main room of the master suite.`);
								}
							} else {
								r.push(`${He} strips and settles into one of the various seats around the room. Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to whoever may be watching ${him}. ${His} ${childrenAre} promptly taken and, following a shower and fresh change of clothes, ${he} returns to`);
								if (V.masterSuiteUpgradeLuxury === 1) {
									r.push(`your big bed.`);
								} else if (V.masterSuiteUpgradeLuxury === 2) {
									r.push(`the fuckpit.`);
								} else {
									r.push(`${his} usual spot.`);
								}
							}
						} else {
							if (V.masterSuiteUpgradePregnancy === 1) {
								r.push(`${He} enters the birthing chamber, strips, and seats ${himself} in the specialized chair. Finding it quite comfortable, ${he} begins to push out ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and, following a shower and fresh change of clothes, ${he} returns to`);
								if (V.masterSuiteUpgradeLuxury === 1) {
									r.push(`your big bed.`);
								} else if (V.masterSuiteUpgradeLuxury === 2) {
									r.push(`the fuckpit.`);
								} else {
									r.push(`the main room of the master suite.`);
								}
							} else {
								r.push(`${He} strips and settles into one of the various seats around the room. ${He} gets comfortable and begins to push out ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and, following a shower and fresh change of clothes, ${he} returns to`);
								if (V.masterSuiteUpgradeLuxury === 1) {
									r.push(`your big bed.`);
								} else if (V.masterSuiteUpgradeLuxury === 2) {
									r.push(`the fuckpit.`);
								} else {
									r.push(`${his} preferred spot.`);
								}
							}
						}
					}
					break;

				case Job.CLUB:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${He} is helped into a private room in the back of the club by a group of eager patrons. Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to ${his} audience. ${His} ${childrenAre} promptly taken and, following a cleaning and fresh change of clothes, the audience has their way with ${him}.`);
						} else {
							r.push(`${He} is helped to a private room in the back of the club by several patrons who just can't keep their hands off ${him}. ${He} settles ${himself} onto a patron's lap and begins working on birthing ${his} ${babies},`);
							if (slave.geneticQuirks.uterineHypersensitivity === 2) {
								r.push(`convulsing with orgasms in the process and`);
							}
							r.push(`basking in the attention of ${his} audience. ${His} ${childrenAre} promptly taken and ${he} beckons the audience to enjoy ${him}.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${He} heads to a private room in the back of the club filled with eager patrons. Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to ${his} audience. ${His} ${childrenAre} promptly taken and, following a cleaning and fresh change of clothes, the audience is allowed to have their way with ${him}.`);
						} else {
							r.push(`${He} heads to a private room in the back of the club accompanied by several patrons who just can't keep their hands off ${him}. ${He} settles ${himself} onto a patron's lap and begins working on birthing ${his} ${babies},`);
							if (slave.geneticQuirks.uterineHypersensitivity === 2) {
								r.push(`convulsing with orgasms in the process and`);
							}
							r.push(`basking in the attention of ${his} audience. ${His} ${childrenAre} promptly taken and ${he} beckons the audience to enjoy ${him}.`);
						}
					}
					break;

				case Job.CHOICE:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${He} is helped back to ${his} bed and stripped before slipping into it. Instinctively, ${he} begins to push out ${his} ${babies}. ${His} ${childrenAre} promptly taken and, after a short rest, ${he} waits for someone to help ${him} to ${his} next job having forgotten ${he} was choosing it.`);
						} else {
							r.push(`${He} is helped back to ${his} bed and stripped before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and, after a short rest, ${he} returns to pondering ${his} preferred assignment.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${He} is lead back to ${his} bed and strips before slipping into it. Instinctively, ${he} begins to push out ${his} ${babies}. ${His} ${childrenAre} promptly taken and, after a short rest, ${he} returns to wandering the penthouse.`);
						} else {
							r.push(`${He} returns to ${his} bed and strips before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and, after a short rest, ${he} returns to pondering ${his} preferred assignment.`);
						}
					}
					break;

				case Job.SPA:
					if (S.Attendant) {
						r.push(S.Attendant.slaveName);
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`leads`);
						} else {
							r.push(`escorts`);
						}
						r.push(`${him} to a special pool designed to give birth in. Once ${he} is safely in the water alongside ${S.Attendant.slaveName},`);
					} else {
						r.push(`${He} is escorted to a special pool designed to give birth in. Once ${he} is safely in the water alongside ${his} assistant,`);
					}
					r.push(`${he} begins to push out ${his} ${babies},`);
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`indifferent to`);
					} else {
						r.push(`aided by`);
					}
					r.push(`${his} helper. ${His} ${childrenAre} promptly taken and, following a cleaning, ${he} is taken back to the spa.`);
					break;

				case Job.NURSERY:
					r.push(`${He} finishes`);
					if (V.nurseryChildren) {
						r.push(`changing the child's diaper`);
					} else {
						r.push(`cleaning the area of ${V.nurseryName} that ${he}'s been working on`);
					}
					r.push(`and heads back to ${his} little room before stripping and getting into bed. ${He} begins the ordeal of childbirth, and after ${he} is finished, rests for a bit while ${his} ${childrenAre} collected. After a short shower, ${he} returns to ${his} duties in ${V.nurseryName}.`);
					break;

				case Job.SCHOOL:
					r.push(`Having been notified in the weeks leading up to ${his} birth, ${he}`);
					if (canWalk(slave)) {
						r.push(`heads`);
					} else {
						r.push(`is helped`);
					}
					r.push(`to the front of the class and strips. ${He} is being used as a learning aid in this lesson. Blushing strongly, ${he} begins working on birthing ${his} ${babies}, fully aware of the rapt attention of the other students. ${His} ${childrenAre} promptly taken and, following a cleaning and fresh change of clothes, ${he} returns to ${his} seat. ${He} can't help but`);
					if (canSee(slave)) {
						r.push(`notice some of the detailed notes the class took on ${his} genitals.`);
					} else {
						r.push(`overhear the descriptions of ${his}`);
						if (slave.mpreg === 1) {
							r.push(`asshole`);
						} else {
							r.push(`vagina`);
						}
						r.push(`being passed between ${his} peers.`);
					}
					humiliation = 1;
					break;

				case Job.CLASSES:
					r.push(`Or ${he} would have, had ${V.assistant.name} allowed it. Since ${he} can't leave the lesson, ${he} tries ${his} best to hold back the upcoming birth, not without your assistant noticing. As punishment for poor planning, ${his} birth will be turned into a live broadcast. Blushing strongly, ${he} begins working on birthing ${his} ${babies}, trying ${his} best to hide ${his} shame${(slave.geneticQuirks.uterineHypersensitivity === 2) ? `, which isn't helped by the fact that ${he} is convulsing with orgasms in the process` : ``}. Exhausted from the birth, ${he} is permitted a short break as ${his} ${childrenAre} collected to clean ${himself} up before the lesson is continued.`);
					humiliation = 1;
					break;

				case Job.BROTHEL:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${He} is helped to a private room in the back of the brothel by a group of eager patrons. Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to ${his} audience. ${His} ${childrenAre} promptly taken and, following a cleaning and fresh change of clothes, the audience is allowed to have their way with ${him}.`);
						} else {
							r.push(`${He} is helped to a private room in the back of the brothel by several patrons who paid quite a handsome price to enjoy this moment. ${He} settles ${himself} onto a patron's lap and begins working on birthing ${his} ${babies}, ${(slave.geneticQuirks.uterineHypersensitivity === 2) ? `convulsing with orgasms in the process and` : ``} basking in the attention of ${his} audience. ${His} ${childrenAre} promptly taken and ${he} beckons the audience to enjoy ${him}.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${He} heads to a private room in the back of the brothel filled with eager patrons. Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to ${his} audience. ${His} ${childrenAre} promptly taken and, following a cleaning and fresh change of clothes, the audience is allowed to have their way with ${him}.`);
						} else {
							r.push(`${He} heads to a private room in the back of the brothel accompanied by several patrons who paid quite a handsome price to enjoy this moment. ${He} settles ${himself} onto a patron's lap and begins working on birthing ${his} ${babies}, ${(slave.geneticQuirks.uterineHypersensitivity === 2) ? `convulsing with orgasms in the process and` : ``} basking in the attention of ${his} audience. ${His} ${childrenAre} promptly taken and ${he} beckons the audience to enjoy ${him}.`);
						}
					}
					break;

				case Job.TEACHER:
					if (!canWalk(slave)) {
						r.push(`The class has been wondering why ${he} was sitting strangely, nude at the front of the class the last several weeks, today they learn why. ${He} has been planning this lesson for several months now. ${He} wiggles ${himself} into a comfortable spot and begins working on birthing ${his} ${babies}, ${(slave.geneticQuirks.uterineHypersensitivity === 2) ? `convulsing with orgasms in the process, while being` : ``} fully aware of ${his} watching students. ${He} demonstrates the proper ways to labor and how to deliver a baby. ${He} explains the infant's future as ${his} ${childrenAre} taken and excuses the class for a short break in order to freshen up.`);
						humiliation = 1;
					} else {
						r.push(`While stripping, ${he} makes ${his} way to the front of the classroom and settles ${himself} in a way ${his} entire class can see. ${He} has been planning this lesson for several months now. ${He} wiggles ${himself} into a comfortable spot and begins working on birthing ${his} ${babies}, ${(slave.geneticQuirks.uterineHypersensitivity === 2) ? `convulsing with orgasms in the process, while being` : ``} fully aware of ${his} watching students. ${He} demonstrates the proper ways to labor and how to deliver a baby. ${He} explains the infant's future as ${his} ${childrenAre} taken and excuses the class for a short break in order to freshen up.`);
						humiliation = 1;
					}
					break;

				case Job.CONCUBINE:
					if (slave.pregSource === -1 && slave.relationship === -3) {
						r.push(`You make sure to find time in your busy schedule to be at your concubine ${wife}'s side as ${he} gives birth to your ${children}. You gently caress ${slave.slaveName}'s body as ${he} begins to push out ${his} ${babies}${UH}. You help ${him} upright and hold your ${children} to ${his} breasts. The two of you cuddle as you watch your ${newborns} suckle from their mother. Since ${he} is quite special to you, you allow ${him} the time to pick out names before ${his} ${children} must be taken away. When the time comes to pick up the ${newborns}, the slave servant is surprised to find ${(slave.pregType === 1) ? `a name-card` : `name-cards`} affixed to their ${(slave.pregType > 1) ? `blankets` : `blanket`}.`);
						if (slave.fetish !== Fetish.MINDBROKEN) {
							r.push(`${He} can't help but feel more devoted to ${his} master after seeing such a touching act. Before you leave, ${slave.slaveName} expresses how cute ${he} found your ${children} and that ${he}'d love to bear more for you.`);
						}
					} else if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${He} is assisted in reaching your side. You call ${him} over and strip ${him} as ${he} instinctively begins to push out ${his} ${babies}, indifferent to your wandering hands. ${His} ${childrenAre} promptly taken and, following a cleaning, a fresh change of clothes, and some private time with you, ${he} is helped back to your master suite.`);
						} else {
							r.push(`${He} is assisted in reaching your side. You beckon ${him} over and strip ${him} as ${he} dutifully begins to push out ${his} ${babies}, enjoying your wandering hands and attention${UH}. ${His} ${childrenAre} promptly taken and, following a cleaning, a fresh change of clothes, and some private time with you, ${he} is helped back to your master suite. As ${he} leaves your office, ${he} throws you a wink, hoping to see you again soon.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${He} wanders the penthouse until ${he} finds you. You call ${him} over and strip ${him} as ${he} instinctively begins to push out ${his} ${babies}, indifferent to your wandering hands. ${His} ${childrenAre} promptly taken and, following a cleaning, a fresh change of clothes, and some private time with you, ${he} returns to your master suite.`);
						} else {
							r.push(`${He} wanders the penthouse until ${he} finds you. You beckon ${him} over and strip ${him} as ${he} dutifully begins to push out ${his} ${babies}, enjoying your wandering hands and attention${UH}. ${His} ${childrenAre} promptly taken and, following a cleaning, a fresh change of clothes, and some private time with you, ${he} returns to your master suite. As ${he} leaves your office, ${he} throws you a wink, hoping to see you again soon.`);
						}
					}
					break;

				case Job.HEADGIRLSUITE:
					({He2, he2, his2} = getPronouns(S.HeadGirl).appendSuffix("2"));
					if (slave.pregSource === V.HeadGirlID) {
						r.push(`${S.HeadGirl.slaveName} makes sure that the mother of ${his2} ${children} is happy and comfortable for the upcoming birth, even if they won't be spending much time with their offspring. ${He2} carefully undresses ${slave.slaveName}, all the while whispering sweet nothings in ${his} ear. ${He} begins to push out ${his} ${babies},`);
						if (slave.geneticQuirks.uterineHypersensitivity === 2) {
							r.push(`convulsing with orgasms in the process,`);
						}
						r.push(`and ${his} ${childrenAre} carefully collected by their father. Once they are out of the way, ${S.HeadGirl.slaveName} moves in to fondle ${slave.slaveName}'s tired body.`);
					} else if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${He} is aided in finding ${S.HeadGirl.slaveName}, who undresses ${him} as ${he} instinctively begins to push out ${his} ${babies}, indifferent to ${his2} wandering hands. ${His} ${childrenAre} promptly taken and, following a cleaning, a fresh change of clothes, and some private time with your Head Girl, ${he} is taken back to ${S.HeadGirl.slaveName}'s room.`);
						} else {
							r.push(`${He} is aided in seeking out ${S.HeadGirl.slaveName}, who undresses ${him} as ${he} dutifully begins to push out ${his} ${babies}, enjoying ${his2} wandering hands and attention${UH}. ${His} ${childrenAre} promptly taken and, following a cleaning, a fresh change of clothes, and some private time with your Head Girl, ${he} is helped back to ${S.HeadGirl.slaveName}'s room.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${He} wanders until ${he} finds ${S.HeadGirl.slaveName}, who undresses ${him} as ${he} instinctively begins to push out ${his} ${babies}, indifferent to ${his2} wandering hands. ${His} ${childrenAre} promptly taken and, following a cleaning, a fresh change of clothes, and some private time with your Head Girl, ${he} is lead back to ${S.HeadGirl.slaveName}'s room.`);
						} else {
							r.push(`${He} seeks out ${S.HeadGirl.slaveName}, who undresses ${him} as ${he} dutifully begins to push out ${his} ${babies}, enjoying ${his2} wandering hands and attention${UH}. ${His} ${childrenAre} promptly taken and, following a cleaning, a fresh change of clothes, and some private time with your Head Girl, ${he} returns to ${S.HeadGirl.slaveName}'s room.`);
						}
					}
					break;

				case Job.ARCADE:
					r.push(`Or ${he} would have been, if ${he} weren't locked in an arcade cabinet. A gush of liquid pours from the ${slave.slaveName}'s cunt, followed by the attendant in charge of the arcade hanging an "out of order" sign on ${his} exposed rear. While ${his} mouth is filled with a customer's dick, ${his} body instinctively births ${his} ${children} into the waiting basket${UH}. As they are carried away, ${his} rear is cleaned up and the sign removed.`);
					break;

				case Job.CLINIC:
					if (!canWalk(slave)) {
						r.push(`${He} is helped to the clinic's maternity ward.`);
						if (S.Nurse) {
							r.push(S.Nurse.slaveName);
						} else {
							r.push(`A freelance nurse`);
						}
						r.push(`delivers ${his} ${children} before taking`);
						if (slave.pregType > 1) {
							r.push(`them`);
						} else {
							r.push(`it`);
						}
						r.push(`away. Before long ${he} is returned to ${his} recovery room to rest.`);
					} else {
						r.push(`${He} is guided to the clinic's maternity ward.`);
						if (S.Nurse) {
							r.push(S.Nurse.slaveName);
						} else {
							r.push(`A freelance nurse`);
						}
						r.push(`delivers ${his} ${children} before taking`);
						if (slave.pregType > 1) {
							r.push(`them`);
						} else {
							r.push(`it`);
						}
						r.push(`away. Before long ${he} is returned to ${his} recovery room to rest.`);
					}
					break;

				case Job.CELLBLOCK:
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${He} is forced into a specially designed cell to give birth in. Instinctively, ${he} begins to push out ${his} ${babies}. ${His} ${childrenAre} promptly taken and, after ${he} and the cell are hosed down, ${he} is moved back into a standard cell.`);
					} else {
						r.push(`${He} is forced into a specially designed cell to give birth in. Reluctantly, ${he} begins to push out ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and, after ${he} and the cell are hosed down, ${he} is moved back into a standard cell.`);
					}
					break;

				case Job.DJ:
					r.push(`${He} heads to a private room in the back of the club accompanied by an influential patron. ${He} settles ${himself} onto his lap and begins working on birthing ${his} ${babies}, basking in his attention${UH}. Placing ${his} ${children} outside the room, ${he} returns to pleasure ${his} tease.`);
					break;

				case Job.ATTENDANT:
					r.push(`${S.Attendant.slaveName} waddles to a special pool designed to give birth in. Once ${he} is safely in the water, ${he} begins to push out ${his} ${babies}, something ${he} has been trained for${(slave.geneticQuirks.uterineHypersensitivity === 2) ? `, even if ${he} was convulsing with orgasms in the process` : ``}. ${His} ${childrenAre} promptly taken and, following a cleaning, ${he} heads back to the main pool.`);
					break;

				case Job.MATRON:
					r.push(`${He} quickly waddles back to ${his} private room before stripping and calling in several slaves to assist ${him} in childbirth. ${He} has quite a bit of experience in taking care of children, but not as much in delivering them, and less so in delivering ${his} own. ${He} soon figures it out, though, and after an exhausting birthing ordeal, ${his} ${childrenAre} taken from ${him}, and ${he} is allowed a shower and a rest before returning to work.`);
					break;

				case Job.MADAM:
					r.push(`${He} heads to a private room in the back of the brothel accompanied by an influential patron. ${He} settles ${himself} onto his lap and begins working on birthing ${his} ${babies},`);
					if (slave.geneticQuirks.uterineHypersensitivity === 2) {
						r.push(`convulsing with orgasms in the process and`);
					}
					r.push(`basking in his attention as he strips ${him}. Placing ${his} ${children} outside the room, ${he} returns to get more intimate with ${his} catch.`);
					break;

				case Job.STEWARD:
					r.push(`${He} strips and settles ${himself} into ${his} favorite chair, while calling several servants to ${his} aid. ${He} begins to push out ${his} ${babies} into the arms of ${his} waiting charges${UH}. ${His} ${childrenAre} promptly taken and ${he} reclines while ${his} servants clean and dress ${him}. Once ${he} has had enough, ${he} orders them back to work on the penthouse.`);
					break;

				case Job.MILKMAID:
					r.push(`${He} returns to ${his} bed and strips before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${his} ${babies}${UH}. ${He} is quite experienced in delivering ${his} cows' children, but ${he} finds it much more difficult to apply ${his} knowledge to ${himself}. ${His} ${childrenAre} promptly taken and, after a short rest, ${he} returns to caring for your cows.`);
					break;

				case Job.FARMER:
					r.push(`${He} heads to ${his} private room before stripping and calling in a couple of nearby slaves to aid ${him}. Though ${he} has delivered more than a few of ${his} livestocks' offspring, delivering ${his} own proves to be a slightly more difficult ordeal. ${He} manages, though, and after ${his} ${childrenAre} taken from ${him} and ${he}'s had a shower and a short rest, ${he} returns to looking after ${V.farmyardName}.`);
					break;

				case Job.WARDEN:
					if (slave.fetish === Fetish.MINDBROKEN) {	// FIXME: can Wardens be mindbroken?
						r.push(`${He} enters an empty cell, strips, and seats ${himself} on the cot. ${He} instinctively begins birthing ${his} ${babies}. ${His} ${childrenAre} promptly taken and ${he} returns to mindlessly breaking the confined slaves.`);
					} else {
						r.push(`${He} returns to ${his} bed and strips before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and ${he} rests awhile before returning to the cellblock.`);
					}
					break;

				case Job.NURSE:
					r.push(`${He} waddles to ${his} maternity ward and strips before laying on an open bed. ${He} makes ${himself} comfortable and begins working on birthing ${his} ${babies}${UH} as ${his} assistants watch. ${His} ${childrenAre} promptly taken and ${he} is helped to the recovery ward until ${he} recovers enough to take over ${V.clinicName} again.`);
					break;

				case Job.HEADGIRL:
					r.push(`${He} returns to`);
					if (V.HGSuite === 1) {
						r.push(`${his} room's bed`);
					} else {
						r.push(`${his} bed`);
					}
					r.push(`and strips before slipping into it. ${He} makes ${himself} comfortable`);
					if (HGL !== 0) {
						r.push(`as ${his} slave rushes to ${his} side,`);
					}
					r.push(`and begins working on birthing ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken`);
					if (HGL !== 0) {
						r.push(`by ${his} roommate`);
					}
					r.push(`and ${he} rests awhile before returning to managing your slaves.`);
					break;

				case Job.BODYGUARD:
					r.push(`Or ${he} would have, if ${he}'d stop refusing to leave your side. You lead ${him} someplace private and help ${him} undress. ${He} makes ${himself} comfortable and begins working on birthing ${his} ${babies}${UH}. You call for a servant to quickly gather ${his} ${children} as you help ${him} into the shower, making sure to wait outside for your loyal guardian to finish.`);
					break;

				case Job.RECRUITER:
					r.push(`${He} returns to ${his} bed and strips before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and ${he} rests awhile before returning to finding new slaves for you.`);
					break;

				default:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${He} is helped back to ${his} bed and stripped before slipping into it. Instinctively, ${he} begins to push out ${his} ${babies}. ${His} ${childrenAre} promptly taken and ${he} rests awhile before returning to ${his} task.`);
						} else {
							r.push(`${He} is helped back to ${his} bed and stripped before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and ${he} rests awhile before returning to ${his} task.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${He} returns to ${his} bed and strips before slipping into it. Instinctively, ${he} begins to push out ${his} ${babies}. ${His} ${childrenAre} promptly taken and ${he} rests awhile before returning to ${his} task.`);
						} else {
							r.push(`${He} returns to ${his} bed and strips before slipping into it. ${He} makes ${himself} comfortable and begins working on birthing ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and ${he} rests awhile before returning to ${his} task.`);
						}
					}
			}
		}
		App.Events.addParagraph(el, r);
		return el;
	}

	function ampBirth() {
		const el = document.createElement("p");
		let He2;
		let he2;
		let his2;
		const r = [];
		const babies = slave.pregType > 1 ? `babies` : `baby`;
		const children = slave.pregType > 1 ? `children` : `child`;
		const childrenAre = slave.pregType > 1 ? `children are` : `child is`;
		const breasts = slave.pregType > 1 ? `breasts` : `breast`;
		const newborns = slave.pregType > 1 ? `newborns` : `newborn`;
		const UH = (slave.geneticQuirks.uterineHypersensitivity === 2) ? `, convulsing with orgasms in the process` : ``;

		if (birthDamage > 5) {
			cSection = true;
			if (V.clinic !== 0) {
				if (getPersonalAttention(slave.ID, "torture") && !onBedRest(V.PC, true)) {
					r.push(`You know ${he} is going to struggle with childbirth, so you see no reason to interrupt your torture session just yet. You enjoy the sight of ${his} futile attempts to become a mother until the pooling blood reminds you that letting ${him} die so soon would cut short your fun. You send ${him} off to ${V.clinicName}, where ${he} is`);
				} else {
					r.push(`${He} is carried to ${V.clinicName}, since ${he} is likely to face complications with childbirth. ${He} is stripped from ${his} clothes and`);
				}
				r.push(`set up in a comfortable hospital bed to relax until ${he} is ready. ${He} wiggles ${himself} into a comfortable spot and begins working on birthing ${his} ${babies}, fully aware of ${his} watching helpers.`);
				if (slave.geneticQuirks.uterineHypersensitivity === 2) {
					r.push(`${His} body is so sensitive that even difficult birth is an intensely pleasurable experience for ${him}.`);
				}
				if (birthDamage > 10) {
					cSection = true;
					r.push(`After several hours of intense labor, ${he} is transferred to the surgery wing. Following an emergency c-section, ${he} is returned to the recovery wing to rest.`);
				} else {
					r.push(`After several hours,`);
					if (slave.geneticQuirks.uterineHypersensitivity !== 1) {
						r.push(`and a touch of morphine,`);
					}
					r.push(`${he} has successfully given birth.`);
				}
				r.push(`${His} ${childrenAre} promptly taken and ${he} is left under observation to make sure ${he} recovers.`);
			} else {
				cSection = true;
				if (getPersonalAttention(slave.ID, "torture") && !onBedRest(V.PC, true)) {
					r.push(`You know ${he} is going to struggle with childbirth, so you see no reason to interrupt your torture session just yet. You enjoy the sight of ${his} futile attempts to become a mother until the pooling blood reminds you that letting ${him} die so soon would cut short your fun. You send ${him} off to the autosurgery, to be`);
				} else {
					r.push(`${He} is carried to the autosurgery, since ${he} is likely to face complications with childbirth. ${He} is stripped from ${his} clothes and`);
				}
				r.push(`set up on the operating table. ${He} is quickly sedated and subjected to a c-section in order to avoid potential problems. The surgery is quick and ${he} is moved to a bed to recover. When ${he} awakes, ${his} ${slave.pregType > 1 ? `children have` : `child has`} already been taking away.`);
			}
		} else if (getPersonalAttention(slave.ID, "ravish") && !onBedRest(V.PC, true) && random(1, 100) > 50) {
			r.push(`With contractions underway, you take a break from fucking ${him} to help ${him} into a position more suitable to birth ${his} ${children}. Once they are sent off and ${he} is cleaned up, you flip ${him} back over and resume fucking ${his}`);
			if (canDoVaginal(slave)) {
				if (slave.mpreg === 0) {
					r.push(`sore`);
				}
				r.push(`pussy`);
			} else {
				if (slave.mpreg === 1) {
					r.push(`sore`);
				} else {
					r.push(`anus`);
				}
			}
			r.push(`despite ${his} need for some rest.`);
		} else {
			switch (slave.assignment) {
				case Job.REST:
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${He} is placed on ${his} bed and stripped. Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to ${his} watching helper. ${His} ${childrenAre} promptly taken and ${he} is encouraged to keep resting.`);
					} else {
						r.push(`${He} is placed on ${his} bed and stripped. ${He} wiggles ${himself} into a comfortable spot and begins working on birthing ${his} ${babies},`);
						if (slave.geneticQuirks.uterineHypersensitivity === 2) {
							r.push(`convulsing with orgasms in the process and`);
						}
						r.push(`fully aware of ${his} watching helper. ${His} ${childrenAre} promptly taken and ${he} is encouraged to keep resting.`);
						humiliation = 1;
					}
					break;

				case Job.SUBORDINATE: {
					const domSlave = getSlave(slave.subTarget);
					if (domSlave) {
						({he2} = getPronouns(domSlave).appendSuffix("2"));
					}
					if (slave.fetish === Fetish.MINDBROKEN) {
						if (slave.subTarget <= 0) {
							r.push(`${He} is placed on ${his} bed and stripped. Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to ${his} watching helper. ${His} ${childrenAre} promptly taken and ${he} is returned to your waiting slaves.`);
						} else {
							r.push(`${He} is placed with ${domSlave.slaveName} so that ${he2} may`);
							if (canSee(domSlave)) {
								r.push(`enjoy the show.`);
							} else {
								r.push(`be present.`);
							}
							r.push(`Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to ${his} watching audience. ${His} ${childrenAre} promptly taken and ${he} is tipped into ${domSlave.slaveName}'s eager lap.`);
						}
					} else {
						if (slave.subTarget <= 0) {
							r.push(`${He} is placed on ${his} bed and stripped. ${He} wiggles ${himself} into a comfortable spot and begins working on birthing ${his} ${babies},`);
							if (slave.geneticQuirks.uterineHypersensitivity === 2) {
								r.push(`convulsing with orgasms in the process and`);
							}
							r.push(`fully aware of ${his} watching helper. ${His} ${childrenAre} promptly taken and ${he} is returned to your waiting slaves.`);
							humiliation = 1;
						} else {
							r.push(`${He} is placed with ${domSlave.slaveName} so that ${he2} may`);
							if (canSee(domSlave)) {
								r.push(`watch.`);
							} else {
								r.push(`be present.`);
							}
							r.push(`With an intense blush, ${he} begins to push out ${his} ${babies},`);
							if (slave.geneticQuirks.uterineHypersensitivity === 2) {
								r.push(`convulsing with orgasms in the process and`);
							}
							r.push(`fully aware of ${domSlave.slaveName}'s`);
							if (domSlave.fetish === "pregnancy") {
								r.push(`hungry gaze.`);
							} else {
								r.push(`amused gaze.`);
							}
							r.push(`${His} ${childrenAre} promptly taken and ${he} is tipped into ${domSlave.slaveName}'s eager lap.`);
							humiliation = 1;
						}
					}
					break;
				}
				/*
				case Job.WHORE:
				case Job.PUBLIC:
				case Job.CHOICE:
				*/

				case Job.GLORYHOLE:
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${He} is locked, nude, in a glory hole box and ordered to suck. Instinctively, ${he} begins to push out ${his} ${babies}. ${His} ${childrenAre} quickly extracted from the box. ${He} never notices, focused entirely on the fresh cock poking through the glory hole.`);
					} else {
						r.push(`${He} is locked, nude, in a glory hole box and ordered to suck. ${He} quickly finishes the dick off before wiggling ${himself} into a slightly, though not by much, more comfortable position. ${He} begins laboring on ${his} ${children}${UH}. As ${he} finishes, the box is opened and ${his} ${childrenAre} gathered and taken away before ${he} is forcefully repositioned with ${his} mouth over the glory hole.`);
					}
					break;

				case Job.MILKED:
					if (slave.fetish === Fetish.MINDBROKEN) {
						if (V.dairyPregSetting > 0) {
							r.push(`${He} is hooked up to a milking machine and allowed to continue ${his} assignment. ${He} shows little interest in ${his} coming birth, instead focusing on ${his} milky breasts. Instinctively, ${he} begins to push out ${his} ${babies}. ${He} shows no interest in ${his} ${children} being removed from the milking stall, nor when ${he} is hosed off.`);
						} else {
							r.push(`${He} is placed on ${his} bed and stripped. Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to ${his} watching helper. ${His} ${childrenAre} promptly taken and, following a cleaning, ${he} is carried back to the milkers.`);
						}
					} else {
						if (V.dairyPregSetting > 0) {
							r.push(`${He} is hooked up to a milking machine and allowed to continue ${his} assignment. ${He} meekly protests ${his} situation, but ultimately excepts it. ${He} begins working on birthing ${his} ${babies},`);
							if (slave.geneticQuirks.uterineHypersensitivity === 2) {
								r.push(`convulsing with orgasms in the process,`);
							}
							r.push(`and catches a glimpse of ${his} ${children} being removed from the milking stall, but quickly forgets when ${he} is hosed off.`);
							humiliation = 1;
						} else {
							r.push(`${He} is placed on ${his} bed and stripped. ${He} wiggles ${himself} into a comfortable spot and begins working on birthing ${his} ${babies},`);
							if (slave.geneticQuirks.uterineHypersensitivity === 2) {
								r.push(`convulsing with orgasms in the process and`);
							}
							r.push(`fully aware of ${his} watching helper. ${His} ${childrenAre} promptly taken and, following a cleaning, ${he} is carried back to the milkers.`);
							humiliation = 1;
						}
					}
					break;

				case Job.FUCKTOY:
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${He} is stripped and placed into your waiting arms upon your couch. Instinctively, ${he} begins to push out ${his} ${babies} as you tease ${his} breasts and belly, indifferent to you and ${his} watching helper. ${His} ${childrenAre} promptly taken and, following a cleaning and a fresh change of clothes, ${he} is returned to your office.`);
					} else {
						r.push(`${He} is stripped and placed into your waiting arms upon your couch.`);
						if (slave.devotion > 50) {
							r.push(`Feeling safe and secure, ${he}`);
						} else if (slave.devotion > 20) {
							r.push(`${He} squirms uncomfortably as ${he}`);
						} else {
							r.push(`${He} starts to panic as ${he}`);
							humiliation = 1;
						}
						r.push(`begins to push out ${his} ${babies}`);
						if (slave.geneticQuirks.uterineHypersensitivity === 2) {
							r.push(`convulsing with orgasms in the process,`);
						}
						r.push(`as you tease ${his} breasts and belly. ${His} ${childrenAre} promptly taken and, following a cleaning and a fresh change of clothes, ${he} is returned to your office.`);
					}
					break;

				case Job.CONFINEMENT:
				case Job.CELLBLOCK:
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${He} is placed in a specially designed cell to give birth in. Instinctively, ${he} begins to push out ${his} ${babies}. ${His} ${childrenAre} promptly taken and, after ${he} and the cell are hosed down, ${he} is moved back into a standard cell.`);
					} else {
						r.push(`${He} is placed in a specially designed cell to give birth in. Reluctantly, ${he} begins to push out ${his} ${babies}${UH}. ${His} ${childrenAre} promptly taken and, after ${he} and the cell are hosed down, ${he} is moved back into a standard cell.`);
					}
					break;

				case Job.QUARTER:
				case Job.HOUSE:
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${He} is placed on ${his} cot and stripped. Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to ${his} watching helper. ${His} ${childrenAre} promptly taken and, following a cleaning and fresh change of clothes, ${he} is carried back to ${his} station.`);
					} else {
						r.push(`${He} is placed on ${his} cot and stripped. ${He} wiggles ${himself} into a comfortable spot and begins working on birthing ${his} ${babies},`);
						if (slave.geneticQuirks.uterineHypersensitivity === 2) {
							r.push(`convulsing with orgasms in the process and`);
						}
						r.push(`fully aware of ${his} watching helper. ${His} ${childrenAre} promptly taken and, following a cleaning and fresh change of clothes, ${he} is carried back to ${his} station.`);
						humiliation = 1;
					}
					break;

				case Job.MASTERSUITE:
					if (slave.fetish === Fetish.MINDBROKEN) {
						if (V.masterSuiteUpgradePregnancy === 1) {
							r.push(`${He} is carried to the birthing chamber and comfortably positioned. Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to ${his} watching helper. ${His} ${childrenAre} promptly taken and, following a cleaning and fresh change of clothes, ${he} is carried back to`);
							if (V.masterSuiteUpgradeLuxury === 1) {
								r.push(`your big bed.`);
							} else if (V.masterSuiteUpgradeLuxury === 2) {
								r.push(`the fuckpit.`);
							} else {
								r.push(`the main room of the master suite.`);
							}
						} else {
							r.push(`${He} is placed on a soft cushion and stripped. Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to ${his} watching helper. ${His} ${childrenAre} promptly taken and, following a cleaning and fresh change of clothes, ${he} is carried back to`);
							if (V.masterSuiteUpgradeLuxury === 1) {
								r.push(`your big bed.`);
							} else if (V.masterSuiteUpgradeLuxury === 2) {
								r.push(`the fuckpit.`);
							} else {
								r.push(`the main room of the master suite.`);
							}
						}
					} else {
						if (V.masterSuiteUpgradePregnancy === 1) {
							r.push(`${He} is carried to the birthing chamber and comfortably positioned. Sinking into the luxury, ${he} begins working on birthing ${his} ${babies},`);
							if (slave.geneticQuirks.uterineHypersensitivity === 2) {
								r.push(`convulsing with orgasms in the process and`);
							}
							r.push(`fully aware of ${his} watching helper. ${His} ${childrenAre} promptly taken and, following a cleaning and fresh change of clothes, ${he} is carried back to`);
							if (V.masterSuiteUpgradeLuxury === 1) {
								r.push(`your big bed.`);
							} else if (V.masterSuiteUpgradeLuxury === 2) {
								r.push(`the fuckpit.`);
							} else {
								r.push(`the main room of the master suite.`);
							}
							humiliation = 1;
						} else {
							r.push(`${He} is placed on a soft cushion and stripped. ${He} wiggles ${himself} into a comfortable spot and begins working on birthing ${his} ${babies},`);
							if (slave.geneticQuirks.uterineHypersensitivity === 2) {
								r.push(`convulsing with orgasms in the process and`);
							}
							r.push(`fully aware of ${his} watching helper. ${His} ${childrenAre} promptly taken and, following a cleaning and fresh change of clothes, ${he} is carried back to`);
							if (V.masterSuiteUpgradeLuxury === 1) {
								r.push(`your big bed.`);
							} else if (V.masterSuiteUpgradeLuxury === 2) {
								r.push(`the fuckpit.`);
							} else {
								r.push(`the main room of the master suite.`);
							}
							humiliation = 1;
						}
					}
					break;

				case Job.CLUB:
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${He} is placed in a private room in the back of the club before an audience of eager patrons. Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to ${his} audience. ${His} ${childrenAre} promptly taken and, following a cleaning and fresh change of clothes, the audience is allowed to have their way with ${him}.`);
					} else {
						r.push(`${He} is placed in a private room in the back of the club before an audience of eager patrons. ${He} wiggles ${himself} into a comfortable spot and begins working on birthing ${his} ${babies},`);
						if (slave.geneticQuirks.uterineHypersensitivity === 2) {
							r.push(`convulsing with orgasms in the process, while`);
						}
						r.push(`fully aware of ${his} captive audience and blushing strongly. ${His} ${childrenAre} promptly taken and, following a cleaning and fresh change of clothes, the audience is allowed to have their way with ${him}.`);
						humiliation = 1;
					}
					break;

				case Job.SPA:
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${He} is placed in a special flotation device and placed in a birthing pool. Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to ${his} watching helper. ${His} ${childrenAre} promptly taken and, following a cleaning, ${he} is taken back to the spa.`);
					} else {
						r.push(`${He} is placed in a special flotation device and placed in a birthing pool. Giving birth to ${his} ${babies}`);
						if (slave.geneticQuirks.uterineHypersensitivity === 2) {
							r.push(`convulsing with orgasms in the process despite`);
						} else {
							r.push(`is easy under`);
						}
						r.push(`such relaxing circumstances. ${His} ${childrenAre} promptly taken and, following a cleaning, ${he} is carried back to the spa.`);
					}
					break;

				case Job.SCHOOL:
					r.push(`${He} is placed on special seat at the front of the class and stripped. ${He} is being used as a learning aid in this lesson. Blushing strongly, ${he} begins working on birthing ${his} ${babies},`);
					if (slave.geneticQuirks.uterineHypersensitivity === 2) {
						r.push(`convulsing with orgasms in the process and`);
					}
					r.push(`fully aware of the rapt attention of the other students. ${His} ${childrenAre} promptly taken and, following a cleaning and fresh change of clothes, ${he} is carried back to ${his} seat. ${He} can't help but`);
					if (canSee(slave)) {
						r.push(`notice some of the detailed notes the class took on ${his} genitals.`);
					} else {
						r.push(`overhear the descriptions of ${his}`);
						if (slave.mpreg === 1) {
							r.push(`asshole`);
						} else {
							r.push(`vagina`);
						}
						r.push(`being passed between ${his} peers.`);
					}
					humiliation = 1;
					break;

				case Job.CLASSES:
					r.push(`Or ${he} would have been, had ${V.assistant.name} allowed it. Since ${he} can't leave the lesson, ${he} tries ${his} best to hold back the upcoming birth, not without your assistant noticing. As punishment for poor planning, ${he} is forbidden from leaving. Additionally, ${his} birth will be turned into a live broadcast.`);
					humiliation = 1;
					r.push(clothingBirth());
					r.push(`Exhausted from the birth, ${he} is permitted a short break as ${his} ${childrenAre} removed to be cleaned up before the lesson is continued.`);
					break;

				case Job.BROTHEL:
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${He} is placed in a private room in the back of the brothel before an audience of eager patrons. Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to ${his} audience. ${His} ${childrenAre} promptly taken and, following a cleaning and fresh change of clothes, the audience is allowed to have their way with ${him}.`);
					} else {
						r.push(`${He} is placed in a private room in the back of the brothel before an audience of eager patrons. ${He} wiggles ${himself} into a comfortable spot and begins working on birthing ${his} ${babies},`);
						if (slave.geneticQuirks.uterineHypersensitivity === 2) {
							r.push(`convulsing with orgasms in the process, while`);
						}
						r.push(`fully aware of ${his} captive audience and blushing strongly. ${His} ${childrenAre} promptly taken and, following a cleaning and fresh change of clothes, the audience is allowed to have their way with ${him}.`);
						humiliation = 1;
					}
					break;

				case Job.TEACHER:
					r.push(`${He} is stripped and placed on a specially designed seat before ${his} class. ${He} has been planning this lesson for several months now. ${He} wiggles ${himself} into a comfortable spot and begins working on birthing ${his} ${babies},`);
					if (slave.geneticQuirks.uterineHypersensitivity === 2) {
						r.push(`convulsing with orgasms in the process and`);
					}
					r.push(`fully aware of ${his} watching students. ${He} demonstrates the proper ways to labor and, with the assistance of a helper, how to deliver a baby. ${His} ${childrenAre} promptly taken and, following a cleaning and fresh change of clothes, ${he} resumes ${his} previous lesson.`);
					humiliation = 1;
					break;

				case Job.CONCUBINE:
					if (slave.pregSource === -1 && slave.relationship === -3) {
						r.push(`You make sure to find time in your busy schedule to be at your concubine ${wife}'s side as ${he} gives birth to your ${children}. You gently caress ${slave.slaveName}'s body as ${he} begins to push out your ${babies}${UH}. You help ${him} upright and hold your ${children} to ${his} ${breasts}. The two of you cuddle as you watch your ${newborns} suckle from their mother. Since ${he} is quite special to you, you allow ${him} the time to pick out names before ${his} ${children} must be taken away. When the time comes to pick up the ${newborns}, the slave servant is surprised to find`);
						if (slave.pregType === 1) {
							r.push(`a`);
						}
						r.push(`${(slave.pregType > 1) ? `name-cards` : `name-card`} affixed to their ${(slave.pregType > 1) ? `blankets` : `blanket`}.`);
						if (slave.fetish !== Fetish.MINDBROKEN) {
							r.push(`${He} can't help but feel more devoted to ${his} master after seeing such a touching act. Before you leave, ${slave.slaveName} expresses how cute ${he} found your ${children} and that ${he}'d love to bear more for you.`);
						}
					} else if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${He} is placed by your side. You strip ${him} as ${he} instinctively begins to push out ${his} ${babies}, indifferent to your wandering hands. ${His} ${childrenAre} promptly taken and, following a cleaning, a fresh change of clothes, and some private time with you, ${he} is carried back to your master suite.`);
					} else {
						r.push(`${He} is placed by your side. You strip ${him} as ${he} dutifully begins to push out ${his} ${babies},`);
						if (slave.geneticQuirks.uterineHypersensitivity === 2) {
							r.push(`convulsing with orgasms in the process, while`);
						}
						r.push(`enjoying your wandering hands and attention. ${His} ${childrenAre} promptly taken and, following a cleaning, a fresh change of clothes, and some private time with you, ${he} is carried back to your master suite. As ${he} leaves your office, ${he} throws you a wink, hoping to see you again soon.`);
					}
					break;

				case Job.HEADGIRLSUITE:
					({he2, his2, He2} = getPronouns(S.HeadGirl).appendSuffix("2"));
					if (slave.pregSource === V.HeadGirlID) {
						r.push(`${S.HeadGirl.slaveName} makes sure that the mother of ${his2} ${children} is happy and comfortable for the upcoming birth, even if they won't be spending much time with their offspring. ${He2} carefully undresses ${slave.slaveName}, all the while whispering sweet nothings in ${his} ear. ${He} begins to push out ${his} ${babies},`);
						if (slave.geneticQuirks.uterineHypersensitivity === 2) {
							r.push(`convulsing with orgasms in the process,`);
						}
						r.push(`and ${his} ${childrenAre} carefully collected by their father. Once they are out of the way, ${S.HeadGirl.slaveName} moves in to fondle ${slave.slaveName}'s tired body.`);
					} else if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${He} is placed with ${S.HeadGirl.slaveName}. ${He2} unwraps ${him} as ${he} instinctively begins to push out ${his} ${babies}, indifferent to ${his2} wandering hands. ${His} ${childrenAre} promptly taken and, following a cleaning, a fresh change of clothes, and some private time with your Head Girl, ${he} is carried back to ${S.HeadGirl.slaveName}'s room.`);
					} else {
						r.push(`${He} is placed with ${S.HeadGirl.slaveName}. ${He2} unwraps ${him} as ${he} dutifully begins to push out ${his} ${babies},`);
						if (slave.geneticQuirks.uterineHypersensitivity === 2) {
							r.push(`convulsing with orgasms in the process and`);
						}
						r.push(`enjoying ${his2} wandering hands and attention. ${His} ${childrenAre} promptly taken and, following a cleaning, a fresh change of clothes, and some private time with your Head Girl, ${he} is carried back to ${S.HeadGirl.slaveName}'s room.`);
					}
					break;

				case Job.ARCADE:
					r.push(`Or ${he} would have been, if ${he} weren't locked in an arcade cabinet. A gush of liquid pours from the ${slave.slaveName}'s cunt, followed by the attendant in charge of the arcade hanging an "out of order" sign on ${his} exposed rear. While ${his} mouth is filled with a customer's dick, ${his} body instinctively births ${his} ${children} into the waiting basket. As they are carried away, ${his} rear is cleaned up and the sign removed.`);
					break;

				case Job.CLINIC:
					r.push(`${He} is taken to the clinic's maternity ward.`);
					if (S.Nurse) {
						r.push(S.Nurse.slaveName);
					} else {
						r.push(`A freelance nurse`);
					}
					r.push(`delivers ${his} ${children} before taking them away. Before long ${he} is returned to ${his} recovery room to rest.`);
					break;

				default:
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${He} is placed on ${his} bed and stripped. Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to ${his} watching helper. ${His} ${childrenAre} promptly taken and, following a cleaning and fresh change of clothes, ${he} is carried back to ${his} station.`);
					} else {
						r.push(`${He} is placed on ${his} bed and stripped. ${He} wiggles ${himself} into a comfortable spot and begins working on birthing ${his} ${babies},`);
						if (slave.geneticQuirks.uterineHypersensitivity === 2) {
							r.push(`convulsing with orgasms in the process and`);
						}
						r.push(`fully aware of ${his} watching helper. ${His} ${childrenAre} promptly taken and, following a cleaning and fresh change of clothes, ${he} is carried back to ${his} station.`);
						humiliation = 1;
					}
			}
		}
		App.Events.addParagraph(el, r);
		return el;
	}

	function suddenBirthScene() {
		const el = document.createElement("p");
		let He2;
		let he2;
		let his2;
		let him2;
		const {
			HeU,
			heU, himU, himselfU, girlU
		} = getNonlocalPronouns(V.seeDicks).appendSuffix('U');
		let r = [];
		const birthScene = random(1, 100);
		const babies = slave.pregType > 1 ? `babies` : `baby`;
		const children = slave.pregType > 1 ? `children` : `child`;
		const childrenAre = slave.pregType > 1 ? `children are` : `child is`;
		const breasts = slave.pregType > 1 ? `breasts` : `breast`;
		const newborns = slave.pregType > 1 ? `newborns` : `newborn`;
		const UH = (slave.geneticQuirks.uterineHypersensitivity === 2) ? `, convulsing with orgasms in the process` : ``;

		if (getPersonalAttention(slave.ID, "torture") && !onBedRest(V.PC, true) && random(1, 2) === 2) {
			r.push(`${slave.slaveName} rudely interrupts your torture session by releasing ${his} water all over your office floor. A little thing like childbirth isn't going to stop you from beating ${him}, however, so you focus your efforts on timing your strikes in-between ${his} contractions, never truly giving ${his} body a chance to rest. You keep at it until ${his} belly is fully deflated and ${his} ${newborns} collected, and once they are, try to find just how much of a gut-punch it takes to dislodge a placenta.`);
		} else if (getPersonalAttention(slave.ID, "ravish") && !onBedRest(V.PC, true) && random(1, 2) === 2) {
			if (canDoVaginal(slave) && slave.mpreg === 0) {
				r.push(`You groan in displeasure as you feel a head begin to steadily edge you out of ${his} pussy. You sigh and resort to masturbating over ${his} laboring body until ${he} is emptied of ${children} and you can go back to fucking the still gaping hole.`);
			} else if (canDoVaginal(slave)) {
				if (canPenetrate(V.PC) || V.PC.clit >= 3) {
					r.push(`You moan with pleasure as the pressure of a baby moving through ${his} rectum pushes down against your ${V.PC.clit >= 3 ? "clit" : "dick"} making everything feel so wonderfully tight. In fact, maybe too tight; you struggle to extract yourself from the clenching orifice before you find your tool painfully crushed. With a stimulating pop, you pull out just as the baby begins to crown from ${his} butthole, climaxing in the`);
					if (isVirile(V.PC)) {
						r.push(`process and christening it in a shower of cum.`);
					} else {
						r.push(`process.`);
					}
					r.push(`Once ${he}'s cleaned up and ${his} ${childrenAre} taken care of, you get right back to fucking ${him}.`);
				} else {
					r.push(`You grunt in displeasure as the pressure of a baby moving through ${his} rectum pushes down on your strap-on and traps it in place. You try to wiggle it loose, but it just won't budge. You sigh and let ${him} finish giving birth from ${his} butthole before handing the ${children} off and evaluating just how badly ${he} managed to crush your toy.`);
				}
			} else if (canDoAnal(slave) && slave.mpreg === 1) {
				r.push(`You groan in displeasure as you feel a head begin to steadily block passage into ${his} anus. You sigh and resort to masturbating over ${his} laboring body until ${he} is emptied of ${children} and you can go back to fucking the still gaping hole.`);
			} else {
				if (canPenetrate(V.PC) || V.PC.clit >= 3) {
					r.push(`You moan with pleasure as the pressure of a baby being born forces ${his} rectum to tighten around your ${V.PC.clit >= 3 ? "clit" : "dick"}. It quickly becomes way too tight; you struggle to dislodge yourself from the clenching orifice before you get completely crushed. With a stimulating pop, you pull out just as the baby crowns from ${his} pussy, climaxing in the`);
					if (isVirile(V.PC)) {
						r.push(`process and christening it in a shower of cum.`);
					} else {
						r.push(`process.`);
					}
					r.push(`Once ${he}'s cleaned up and ${his} ${childrenAre} taken care of, you get right back to fucking ${him}.`);
				} else {
					r.push(`You grunt in displeasure as the pressure of a baby moving through ${his} birth canal pushes down on your strap-on and traps it in place. You try to wiggle it loose, but it just won't budge. You sigh and let ${him} finish giving birth before handing the ${children} off and evaluating just how badly ${he} managed to crush your toy.`);
				}
			}
		} else if (random(1, 2) === 1 && canWalk(slave)) {
			// at assignment else in halls/etc, only if able to move

			const rival = slave.rivalry > 0 ? getSlave(slave.rivalryTarget) : null;

			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`While wandering the penthouse absentmindedly, ${slave.slaveName}'s water breaks. ${He} carries on until the contractions drag ${him} to the floor.`);
				r.push(clothingBirth());
				r.push(`${He} draws ${his} ${children} to ${his} ${breasts} and resumes wandering aimlessly until a servant collects ${his} ${children} and sends ${him} someplace useful.`);
			} else if (slave.fetish === "humiliation") {
				r.push(`While waddling through the penthouse between assignments, ${slave.slaveName}'s water breaks. Sensing an opportunity, ${he} waddles to the nearest balcony overlooking the city. ${He} calls out, making sure all eyes are on ${him} for what happens next.`);
				humiliation = 1;
				r.push(clothingBirth());
				r.push(`${He} gathers ${his} ${newborns} and recovers ${his} strength before finding a servant to give ${his} ${children} to. ${He} resumes ${his} previous task, feeling much lighter.`);
			} else {
				if (birthScene < 40) {
					r.push(`While`);
					if (canWalk(slave)) {
						r.push(`walking`);
					} else {
						r.push(`traveling`);
					}
					r.push(`through the penthouse on the way to ${his} next assignment, ${slave.slaveName}'s water breaks. Unable to reach the prepared birthing room in time, ${he} finds a secluded nook to give birth in.`);
					r.push(clothingBirth());
					r.push(`${He} gathers ${his} ${newborns} and recovers ${his} strength before finding a servant to give ${his} ${children} to before hurrying to ${his} assignment.`);
				} else if (birthScene > 66 && slave.rivalry === 3 && isSlaveAvailable(rival) && canWalk(rival)) {
					({he2, his2, him2, He2} = getPronouns(rival).appendSuffix("2"));

					if (slave.pregSource === rival.ID) {
						r.push(`While hustling through the penthouse on ${his} way to give birth, ${slave.slaveName} finds ${his} path blocked by ${rival.slaveName} — and a hospital gurney, of all things. ${He2} appears genuinely concerned for the (soon-to-be) mother of ${his2} ${children}, and helps ${him} onto the bed, then pushes the surprised ${girl} onwards. ${slave.slaveName}, focusing on ${his} labor, begins to rethink the animosity ${he} feels for ${him2} — until ${he} realizes ${rival.slaveName} has brought them to the cafeteria. With a smug pride in ${his2} potency, ${he2} introduces the shocked pregnant ${girl} to ${his} new audience. ${His} contractions becoming too frequent to move, ${he} begins giving birth in front of ${his} audience.`);
						humiliation = 1;
						r.push(clothingBirth());
						r.push(`${rival.slaveName} gathers ${his2} ${babies} from ${his2} exhausted rival, roughly pushes ${him} off the gurney, then hands the ${children} to a servant that had been called in by the commotion. ${slave.slaveName}, humiliated by the spectacle and ${his} own naïveté, pushes through the jeering crowd and hastily heads back to ${his} bed to hide ${himself} from the mockery.`);
					} else {
						r.push(`While hustling through the penthouse on ${his} way to give birth, ${slave.slaveName} finds ${his} path blocked by ${rival.slaveName}. Seeing ${his} distress brings a grin to ${his2} face. ${He2} quickly rushes the laboring ${slave.slaveName}, circling around behind ${him} and hooking ${him} under the arms. ${He2} forces the poor ${girl} into the cafeteria and holds ${him} in place, leaving ${him} with no other option than to begin giving birth in front of ${his} audience.`);
						humiliation = 1;
						r.push(clothingBirth());
						r.push(`${rival.slaveName} releases ${him} and ${he} moves to gather ${his} ${newborns}. With a shove from ${his} rival, ${he} rushes out of the jeering crowd's sight. Finding a servant to give ${his} ${children} to, ${he} hastily heads back to ${his} bed to hide ${himself} from the mockery.`);
					}
				} else {
					r.push(`While waddling through the penthouse on ${his} way to the cafeteria, ${slave.slaveName}'s water breaks. Unable to reach the prepared birthing room in time, ${he} finds ${himself} stranded in the middle of all the dining slaves.`);
					humiliation = 1;
					r.push(clothingBirth());
					r.push(`${He} gathers ${his} ${newborns} and recovers ${his} strength before rushing out of sight of the jeering crowd. Finding a servant to give ${his} ${children} to, ${he} hastily heads back to ${his} bed to hide ${himself} from the mockery.`);
				}
			}
		} else {
			switch (slave.assignment) {
				case Job.REST:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${slave.slaveName} is awoken from ${his} rest by a strong contraction. ${He} rolls over and begins to fall back to sleep as another wracks ${his} body.`);
							r.push(clothingBirth());
							r.push(`${He} draws ${his} ${children} to ${his} ${breasts} and resumes resting.`);
						} else {
							r.push(`${slave.slaveName} is awoken from ${his} rest by a moist sensation followed by a contraction. ${He} rolls over and clutches ${his} gravid belly as another wracks ${his} body.`);
							r.push(clothingBirth());
							r.push(`${He} collects ${his} ${newborns} and places them in the cradle readied for ${him}. ${He} is helped to the shower as your servants clean up and remove ${his} ${children}.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${slave.slaveName} is awoken from ${his} rest by a strong contraction. ${He} rolls over and begins to fall back to sleep as another wracks ${his} body.`);
							r.push(clothingBirth());
							r.push(`${He} draws ${his} ${children} to ${his} ${breasts} and resumes resting.`);
						} else {
							r.push(`${slave.slaveName} is awoken from ${his} rest by a moist sensation followed by a contraction. ${He} rolls over and clutches ${his} gravid belly as another wracks ${his} body.`);
							r.push(clothingBirth());
							r.push(`${He} collects ${his} ${newborns} and places them in the cradle readied for ${him}. ${He} leaves to take a shower as your servants clean up and remove ${his} ${children}.`);
						}
					}
					break;

				case Job.SUBORDINATE: {
					const domSlave = getSlave(slave.subTarget);
					if (domSlave) {
						({he2, his2} = getPronouns(domSlave).appendSuffix("2"));
					}
					if (slave.fetish === Fetish.MINDBROKEN) {
						if (slave.subTarget === 0) {
							r.push(`While servicing your other slaves, ${slave.slaveName}'s water breaks, though it does nothing to deter ${him} from ${his} task.`);
							r.push(clothingBirth());
							r.push(`No sooner than ${his} ${babies}`);
							if (slave.pregType > 1) {
								r.push(`are`);
							} else {
								r.push(`is`);
							}
							r.push(`born, a cock is shoved into ${his} gaping`);
							if (slave.mpreg === 1) {
								r.push(`asshole`);
							} else {
								r.push(`pussy`);
							}
							r.push(`as ${he} draws ${his} ${children} to ${his} ${breasts}.`);
						} else if (slave.subTarget === -1) {
							if (slave.career === "a breeding bull") {
								r.push(`While fucking another slave pregnant, ${slave.slaveName}'s water breaks, though it does nothing to deter ${him} from ${his} task. Even as the slave struggles to escape from beneath ${his} laboring body and a baby stretches ${his} nether lips painfully wide, ${he} keeps on fucking. ${He} plants ${his} seed with the birth of ${his}`);
								if (slave.pregType > 1) {
									r.push(`last`);
								}
								r.push(`child.`);
							} else {
								r.push(`While impregnating a mother-to-be, ${slave.slaveName}'s water breaks, though it does nothing to deter the slave from taking ${his} seed. Only after ${he} cums is ${he} allowed to draw ${his} ${children} to ${his} ${breasts}.`);
							}
						} else {
							r.push(`While servicing ${domSlave.slaveName}, ${slave.slaveName}'s water breaks, though it does nothing to deter ${him} from ${his} task.`);
							r.push(clothingBirth());
							r.push(`No sooner than ${his} ${babies}`);
							if (slave.pregType > 1) {
								r.push(`are`);
							} else {
								r.push(`is`);
							}
							r.push(`born does ${he} go back to pleasuring ${his} dom.`);
						}
					} else {
						if (slave.subTarget === 0) {
							r.push(`While servicing your other slaves, ${slave.slaveName}'s water breaks, causing ${him} to immediately try to break off. However, a hand quickly hooks ${his} gravid bulk and ${he} is pulled back into another slave's crotch.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`${He} is allowed a moment to prepare ${his} ${children}`);
							r.push(`to be sent off before returning to pleasuring your other slaves.`);
						} else if (slave.subTarget === -1) {
							if (slave.career === "a breeding bull") {
								r.push(`While fucking another slave pregnant, ${slave.slaveName}'s water breaks, though it does not deter ${him} from ${his} task. It's a little difficult to fuck while in the throes of birth, but ${he} carries out ${his} job admirably, planting ${his} seed with the birth of ${his}`);
								if (slave.pregType > 1) {
									r.push(`last`);
								}
								r.push(`child.`);
							} else {
								r.push(`While impregnating a mother-to-be, ${slave.slaveName}'s water breaks, forcing ${him} to decouple with the slave.`);
								if (canAchieveErection(slave)) {
									r.push(`They get quite the show as they watch ${his} rock-hard dick repeatedly jet cum from the stimulation of pushing out ${his} ${babies}.`);
								} else {
									r.push(`They get quite the show as they watch ${him} spurt cum while pushing out ${his} ${babies}.`);
								}
								humiliation = 1;
								r.push(`${He} is allowed a moment to prepare ${his} ${children}`);
								r.push(`to be sent off before returning to properly inseminate the waiting slave.`);
							}
						} else {
							r.push(`While servicing ${domSlave.slaveName}, ${slave.slaveName}'s water breaks, causing ${him} to immediately try to break off. ${His} dom eagerly watches ${his2} pregnant sub's ordeal.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`${domSlave.slaveName} collects the newborn ${childrenAre} to be sent off before returning and planting ${his2} crotch directly onto ${his2} exhausted sub's face.`);
						}
					}
					break;
				}

				case Job.WHORE:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`While attempting to attract customers with ${his} gravid body, ${slave.slaveName}'s water breaks.`);
							r.push(clothingBirth());
							r.push(`${He} draws ${his} ${children} to ${his} ${breasts} as ${he} resumes whoring, oblivious to the free show ${he} just gave ${his} customers.`);
						} else {
							r.push(`While attempting to attract customers with ${his} gravid body, ${slave.slaveName}'s water breaks, soaking ${him}. ${He} attempts to get someplace safe to give birth but finds it impossible.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`${He} lies on the ground, exhausted and covered in sperm from the circle of men watching ${him}, until ${he} recovers enough to collect ${his} ${children} to be sent off.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`While attempting to attract customers with ${his} gravid body, ${slave.slaveName}'s water breaks.`);
							r.push(clothingBirth());
							r.push(`${He} draws ${his} ${children} to ${his} ${breasts} as ${he} resumes whoring, oblivious to the free show ${he} just gave ${his} customers.`);
						} else {
							r.push(`While attempting to attract customers with ${his} gravid body, ${slave.slaveName}'s water breaks, soaking ${him}. ${He} attempts to get someplace safe to give birth but finds ${his} path blocked by rowdy johns.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`${He} lies on the ground, exhausted and covered in sperm from the circle of men watching ${him}, until ${he} recovers enough to collect ${his} ${children} to be sent off.`);
						}
					}
					break;

				case Job.PUBLIC:
					if (slave.fetish === Fetish.MINDBROKEN) {
						if (birthScene > 80 && canDoVaginal(slave)) {
							r.push(`While riding a citizen's dick, ${slave.slaveName}'s water breaks on him. Showing no signs of stopping, he shoves ${his} bulk off of him. Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to who may be watching ${his} naked crotch. ${He} draws ${his} ${children} to ${his} ${breasts} before seeking out the next citizen's cock.`);
						} else if (birthScene > 60 && canDoAnal(slave)) {
							r.push(`While taking a citizen's dick in ${his} ass, ${slave.slaveName}'s water breaks. ${He} shows no signs of slowing down, so he allows ${him} to reposition and continue. Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to who may be watching ${his} naked crotch. He came strongly thanks to ${him} and gives ${him} a slap on the ass as ${he} begins drawing ${his} ${children} to ${his} ${breasts} and seeking out the next citizen's cock.`);
						} else if (birthScene > 40) {
							r.push(`While sucking a citizen's dick, ${slave.slaveName}'s water breaks. ${He} shows no signs of slowing down, so he allows ${him} to reposition and continue.`);
							r.push(clothingBirth());
							r.push(`He cums down ${his} throat before ${he} begins drawing ${his} ${children} to ${his} ${breasts} and seeking out the next citizen's cock.`);
						} else {
							r.push(`While licking a citizen's cunt, ${slave.slaveName}'s water breaks. ${He} shows no signs of slowing down, so she allows ${him} to reposition and continue.`);
							r.push(clothingBirth());
							r.push(`The citizen splashes across ${his} face before ${he} begins drawing ${his} ${children} to ${his} ${breasts} and seeking out the next citizen's cunt.`);
						}
					} else {
						if (birthScene > 80 && canDoVaginal(slave)) {
							r.push(`While riding a citizen's dick, ${slave.slaveName}'s water breaks on him. ${He} desperately tries to disengage but he grabs ${his} hips and slams ${him} back down. He thoroughly enjoys ${his} contracting cunt before pushing ${him} off and standing over ${him}, jacking off. Quickly ${he} spreads ${his} legs apart and begins pushing out ${his} ${babies}${UH}. ${He} can't hide what's happening between ${his} legs,`);
							if (slave.fetish === "humiliation") {
								r.push(`but that only makes it more exciting.`);
							} else {
								r.push(`so ${he} bears with it.`);
							}
							r.push(`He cums over ${his} exhausted body and moves on leaving ${him} to recover and collect ${his} ${children} to be sent off.`);
							humiliation = 1;
						} else if (birthScene > 60 && canDoAnal(slave)) {
							r.push(`While taking a citizen's dick in ${his} ass, ${slave.slaveName}'s water breaks. ${He} desperately tries to disengage but he grabs ${his} hips and slams into ${him} hard. Quickly ${he} spreads ${his} legs apart and begins pushing out ${his} ${babies}${UH}. ${He} can't hide what's happening between ${his} legs,`);
							if (slave.fetish === "humiliation") {
								r.push(`but that only makes it more exciting.`);
							} else {
								r.push(`so ${he} bears with it.`);
							}
							r.push(`He came strongly thanks to ${him} and gives ${him} a slap on the ass as ${he} collapses to the ground. ${He} quickly gathers ${his} ${children} to be sent off.`);
							humiliation = 1;
						} else if (birthScene > 40) {
							r.push(`While sucking a citizen's dick, ${slave.slaveName}'s water breaks. ${He} desperately tries to disengage but he grabs ${his} head and slams ${him} back into his crotch.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`He cums down ${his} throat before letting ${him} collapse to the ground and leaving. When ${he} recovers, ${he} quickly gathers ${his} ${children} to be sent off.`);
						} else {
							r.push(`While licking a citizen's cunt, ${slave.slaveName}'s water breaks. ${He} desperately tries to disengage but she grabs ${his} head and slams ${him} back into her crotch.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`She cums across ${his} face before helping ${him} to the ground and leaving. When ${he} recovers, ${he} quickly gathers ${his} ${children} to be sent off.`);
						}
					}
					break;

				case Job.GLORYHOLE:
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`While sucking a dick through the hole of ${his} confining box, ${slave.slaveName}'s water breaks. ${He} makes no effort to stop sucking the dicks presented to ${him}.`);
						r.push(clothingBirth());
						r.push(`${His} ${childrenAre} quickly extracted from the box. ${He} never notices, having focused entirely on the fresh cock poking through the glory hole.`);
					} else {
						r.push(`While sucking a dick through the hole of ${his} confining box, ${slave.slaveName}'s water breaks. ${He} quickly finishes the dick off before seating ${himself} in the back of the box.`);
						r.push(clothingBirth());
						r.push(`As ${he} finishes, ${he}`);
						if (canSee(slave)) {
							r.push(`could have sworn ${he} saw an eye`);
						} else {
							r.push(`swears ${he} can feel somebody`);
						}
						r.push(`peeping through the glory hole, watching the show. The box is opened and ${his} ${childrenAre} gathered and taken away as ${he} turns to suck the fresh cock poking through the hole.`);
					}
					break;

				case Job.MILKED:
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`While getting milked, ${slave.slaveName}'s water breaks. ${He} show little regard and continues kneading ${his} breasts.`);
						r.push(clothingBirth());
						r.push(`${He} shows no interest in ${his} ${children} being removed from the milking stall, instead focusing entirely on draining ${his} breasts.`);
					} else {
						r.push(`While getting milked, ${slave.slaveName}'s water breaks. ${He} shifts into a comfortable position to give birth while the milker works ${his} breasts.`);
						r.push(clothingBirth());
						r.push(`${He} takes a break from milking to collect ${his} ${children} for removal and to catch ${his} breath before reattaching the milkers and coaxing ${his} milk to begin flowing anew.`);
					}
					break;

				case Job.FUCKTOY:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`While sitting absentmindedly nearby, ${slave.slaveName}'s water breaks, soaking the floor under ${him}. ${He} pays no heed to it and continues waiting for you to use ${him}.`);
							r.push(clothingBirth());
							r.push(`You certainly enjoyed the show as you call for a servant to take away ${his} ${children} and to clean up the spill.`);
						} else {
							r.push(`While sitting nearby, ${slave.slaveName}'s water breaks, startling ${him}. ${He} looks to you for guidance and you shake your head "no". Without permission to leave ${he}`);
							if (slave.devotion > 50) {
								r.push(`decides to give you a show`);
							} else if (slave.devotion > 20) {
								r.push(`reluctantly decides giving birth in front of you isn't so bad.`);
							} else {
								r.push(`begins to panic as ${his} contractions come sooner and sooner.`);
								humiliation = 1;
							}
							r.push(clothingBirth());
							r.push(`As thanks for the show, you help ${his} exhausted body onto the couch so ${he} can recover before returning to ${his} duties. You call for a servant to take away ${his} ${children} and to clean up your floor and your toy.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`While standing absentmindedly nearby, ${slave.slaveName}'s water breaks, soaking the floor under ${him}. ${He} pays no heed to it and continues waiting for you to use ${him}.`);
							r.push(clothingBirth());
							r.push(`You certainly enjoyed the show as you call for a servant to take away ${his} ${children} and to clean up the spill.`);
						} else {
							r.push(`While standing nearby, ${slave.slaveName}'s water breaks, startling ${him}. ${He} looks to you for guidance and you shake your head "no". Without permission to leave ${he}`);
							if (slave.devotion > 50) {
								r.push(`decides to give you a show.`);
							} else if (slave.devotion > 20) {
								r.push(`reluctantly decides giving birth in front of you isn't so bad.`);
							} else {
								r.push(`begins to panic as ${his} contractions come sooner and sooner.`);
								humiliation = 1;
							}
							r.push(clothingBirth());
							r.push(`As thanks for the show, you help ${his} exhausted body onto the couch so ${he} can recover before returning to ${his} duties. You call for a servant to take away ${his} ${children} and to clean up your floor and your toy.`);
						}
					}
					break;

				case Job.BODYGUARD:
					r.push(`Refusing to leave your side even when on the verge of giving birth, ${slave.slaveName} continues to serve as your bodyguard despite ${his} condition. A splashing sound and a loud groan emit from behind you. Your bodyguard has gone into labor. You quickly help ${him} to the ground and prepare for the coming birth.`);
					r.push(clothingBirth());
					r.push(`You sit by your loyal guard holding ${his} ${children} until a servant comes by to take them away. Once ${he} is thoroughly rested, you help ${him} up and lead ${him} back to the penthouse to shower and change.`);
					break;

				case Job.CONFINEMENT:
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`While waiting in confinement, ${slave.slaveName}'s water breaks. ${He} assumes a birthing position.`);
						r.push(clothingBirth());
						r.push(`${He} draws ${his} ${children} to ${his} ${breasts} and resumes waiting.`);
					} else {
						r.push(`${slave.slaveName} is awoken from ${his} stupor by moist sensation followed by a contraction. ${He} rolls over and clutches ${his} gravid belly as another wracks ${his} body.`);
						r.push(clothingBirth());
						r.push(`${He} collects ${his} ${children} and holds them close knowing someone will soon come to take them away from ${him}.`);
					}
					break;

				case Job.RECRUITER:
					r.push(`While on a video call with a potential recruit, ${slave.slaveName}'s water breaks. ${He} attempts to play it cool and act like nothing is happening but the worsening contractions finally get to ${him}.`);
					humiliation = 1;
					r.push(clothingBirth());
					if (birthScene > 50) {
						r.push(`Exhausted from the birth and clutching ${his} newborn ${children}, ${he} returns to find that ${he} never ended the call. The prospective slave is blushing furiously and seems to have begun touching ${himselfU} to the show. Apologizing for the interruption, while red with embarrassment, ${slave.slaveName} resumes chatting with the somewhat more pliant ${girlU}.`);
					} else {
						r.push(`Exhausted from the birth and clutching ${his} newborn ${children}, ${he} returns to find that ${he} never ended the call. The prospective slave is grinning widely and states ${heU} has been recording the show. ${HeU} signs off, but not before saying ${heU}'ll be seeing more of ${slave.slaveName} around the internet.`);
						if (slave.fetish === "humiliation") {
							r.push(`Your recruiter can't help but become aroused at the prospect.`);
						} else {
							r.push(`Your recruiter is terrified that ${his} birth video is out there for everyone to see, partly due to ${his} own shame and to the potential damage it will do to ${his} reputation.`);
						}
					}
					break;

				case Job.HEADGIRL:
					r.push(`While overseeing your other slaves, ${slave.slaveName}'s water breaks. ${He} attempts to hold back the coming birth until ${he} can catch a break in ${his} duties but ultimately fails.`);
					humiliation = 1;
					r.push(clothingBirth());
					r.push(`Upon finishing, ${he} quickly collects ${his} ${children} and orders the mess to be cleaned promptly without breaking ${his} dominant appearance.`);
					break;

				case Job.QUARTER:
				case Job.HOUSE:
					if (slave.fetish === Fetish.MINDBROKEN) {
						if (birthScene > 50) {
							r.push(`While giving a slave oral service, ${slave.slaveName}'s water breaks. ${He} disregards this development and continues working.`);
							r.push(clothingBirth());
							r.push(`The slave gets off quite strongly to the show and shoves ${him} out of the way, leaving ${him} to clean up ${his} mess. Instead, ${he} draws ${his} ${children} to ${his} ${breasts} until`);
							if (S.Stewardess) {
								r.push(S.Stewardess.slaveName);
							} else if (S.HeadGirl) {
								r.push(S.HeadGirl.slaveName);
							} else {
								r.push(`${V.assistant.name}`);
							}
							r.push(`shouts at ${him} to move ${his} useless ass.`);
						} else {
							r.push(`While scrubbing the penthouse floor, ${slave.slaveName}'s water breaks. ${He} turns to clean this new spill, disregarding what it means.`);
							r.push(clothingBirth());
							r.push(`Instead of cleaning the fresh mess ${he} made, ${he} draws ${his} ${children} to ${his} ${breasts} until`);
							if (S.Stewardess) {
								r.push(S.Stewardess.slaveName);
							} else if (S.HeadGirl) {
								r.push(S.HeadGirl.slaveName);
							} else {
								r.push(`${V.assistant.name}`);
							}
							r.push(`shouts at ${him} to move ${his} useless ass.`);
						}
					} else {
						if (birthScene > 50) {
							r.push(`While giving a slave oral service, ${slave.slaveName}'s water breaks. ${He} desperately tries to pull away but they grab ${his} head and force ${him} back to their crotch.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`The slave gets off quite strongly to the show and shoves ${him} out of the way, leaving ${him} to clean up ${his} mess. ${He} hurriedly tries to mop up the mess and collect ${his} ${children} before`);
							if (S.Stewardess) {
								r.push(S.Stewardess.slaveName);
							} else if (S.HeadGirl) {
								r.push(S.HeadGirl.slaveName);
							} else {
								r.push(`${V.assistant.name}`);
							}
							r.push(`shouts at ${him}.`);
						} else {
							r.push(`While scrubbing the penthouse floor, ${slave.slaveName}'s water breaks. ${He} panics at the thought of not cleaning up ${his} spill but ${his} worsening contractions force ${him} to find a secluded place to give birth.`);
							r.push(clothingBirth());
							r.push(`Collecting ${his} ${children}, ${he} exits ${his} hiding place before coming under the eye of`);
							if (S.Stewardess) {
								r.push(`the glaring ${S.Stewardess.slaveName}.`);
							} else if (V.HeadGirlID !== 0) {
								r.push(`the glaring ${S.HeadGirl.slaveName}.`);
							} else {
								r.push(`${V.assistant.name}.`);
							}
							r.push(`${His} ${children} are promptly taken by other servants following a lecture about priorities and time management.`);
						}
					}
					break;

				case Job.MASTERSUITE:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (V.masterSuiteUpgradeLuxury === 1) {
								r.push(`While awaiting your return on the big bed in the master suite, ${slave.slaveName}'s water breaks, thoroughly soaking the sheets. Ignoring the mess, ${he} shifts into a more comfortable position.`);
								r.push(clothingBirth());
								r.push(`Resting in your bed, ${he} draws ${his} ${children} to ${his} ${breasts} and resumes waiting for you.`);
								if (S.Concubine) {
									r.push(`${S.Concubine.slaveName} furiously orders ${his} ${children} removed, and ${him} forcefully ejected from the bed so it can be cleaned before your return.`);
								}
							} else if (V.masterSuiteUpgradeLuxury === 2) {
								r.push(`While at the bottom of the master suite's fuckpit, ${slave.slaveName}'s water breaks. While ${he} doesn't stop having sex, the fucktoys using ${him} do and drag ${him} from the pit to give birth. Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to who may be watching ${his} naked crotch. Without a second thought about ${his} ${children}, ${he} slips back into the fuckpit.`);
							} else {
								r.push(`While awaiting your return in the master suite, ${slave.slaveName}'s water breaks. ${He} pays it no heed and continues blankly waiting.`);
								r.push(clothingBirth());
								r.push(`Resting on the floor, ${he} draws ${his} ${children} to ${his} ${breasts} and resumes waiting for you.`);
								if (S.Concubine) {
									r.push(`${S.Concubine.slaveName} furiously orders ${his} ${children} removed and ${him} thoroughly cleaned before your return.`);
								}
							}
						} else {
							if (V.masterSuiteUpgradeLuxury === 1) {
								r.push(`While awaiting your return on the big bed in the master suite, ${slave.slaveName}'s water breaks, thoroughly soaking the sheets. ${He} quickly shifts ${himself} off the bed and calls for a servant before dropping to the floor.`);
								r.push(clothingBirth());
								r.push(`Once ${his} ${childrenAre} removed, ${his} body cleaned, and the sheets changed, ${he} is helped back into bed to recover for your return.`);
							} else if (V.masterSuiteUpgradeLuxury === 2) {
								r.push(`While participating in the fuckpit orgy, ${slave.slaveName}'s water breaks. ${He} begs to be let out of the pit but the other fucktoys pull ${him} in and position themselves for ${him} to pleasure them while giving birth.`);
								humiliation = 1;
								r.push(clothingBirth());
								r.push(`Once the fucktoys are done tormenting the exhausted new mother, they hand ${his} ${children} off to a servant and pull ${him} into an embrace to allow ${him} to regain ${his} strength.`);
							} else {
								r.push(`While awaiting your return in the master suite, ${slave.slaveName}'s water breaks. ${He} tries to get to the prepared area but fails to untangle ${himself} from the toys ${he} was playing with. ${He} calls for a servant to hurry as ${he} begins laboring.`);
								r.push(clothingBirth());
								r.push(`The servant collects ${his} ${children} and helps ${him} onto a cushion to recover for your return.`);
								if (canDoAnal(slave) && slave.anus > 0) {
									r.push(`With a little effort, ${he} pushes the vibrating dildo out of ${his} ass`);
								} else {
									r.push(`With things settling down, ${he} finally manages to switch off the bullet vibrators stuck to ${his} crotch`);
								}
								r.push(`before settling down for a nap.`);
							}
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							if (V.masterSuiteUpgradeLuxury === 1) {
								r.push(`While awaiting your return on the big bed in the master suite, ${slave.slaveName}'s water breaks, thoroughly soaking the sheets. Ignoring the mess, ${he} shifts into a more comfortable position.`);
								r.push(clothingBirth());
								r.push(`Resting in your bed, ${he} draws ${his} ${children} to ${his} ${breasts} and resumes waiting for you.`);
								if (S.Concubine) {
									r.push(`${S.Concubine.slaveName} furiously orders ${his} ${children} removed, and ${him} forcefully ejected from the bed so it can be cleaned before your return.`);
								}
							} else if (V.masterSuiteUpgradeLuxury === 2) {
								r.push(`While being the bottom of the master suite's fuckpit, ${slave.slaveName}'s water breaks. While ${he} doesn't stop having sex, the fucktoys using ${him} do and drag ${him} from the pit to give birth. Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to who may be watching ${his} naked crotch. Without a second thought about ${his} ${children}, ${he} slips back into the fuckpit.`);
							} else {
								r.push(`While awaiting your return in the master suite, ${slave.slaveName}'s water breaks. ${He} pays it no heed and continues blankly waiting.`);
								r.push(clothingBirth());
								r.push(`Resting on the floor, ${he} draws ${his} ${children} to ${his} ${breasts} and resumes waiting for you.`);
								if (S.Concubine) {
									r.push(`${S.Concubine.slaveName} furiously orders ${his} ${children} removed, and ${him} thoroughly cleaned before your return.`);
								}
							}
						} else {
							if (V.masterSuiteUpgradeLuxury === 1) {
								r.push(`While awaiting your return on the big bed in the master suite, ${slave.slaveName}'s water breaks, thoroughly soaking the sheets. ${He} quickly moves ${himself} off the bed and calls for a servant before dropping to the floor.`);
								r.push(clothingBirth());
								r.push(`Once ${his} ${childrenAre} removed, ${his} body cleaned, and the sheets are changed, ${he} crawls back into bed to recover for your return.`);
							} else if (V.masterSuiteUpgradeLuxury === 2) {
								r.push(`While participating in the fuckpit orgy, ${slave.slaveName}'s water breaks. ${He} tries to crawl out of the pit but the other fucktoys pull ${him} back in and position themselves for ${him} to pleasure them while giving birth.`);
								humiliation = 1;
								r.push(clothingBirth());
								r.push(`Once the fucktoys are done tormenting the exhausted new mother, they hand ${his} ${children} off to a servant and pull ${him} into an embrace to allow ${him} to regain ${his} strength.`);
							} else {
								r.push(`While awaiting your return in the master suite, ${slave.slaveName}'s water breaks. ${He} tries to get to the prepared area but fails to untangle ${himself} from the toys ${he} was playing with. ${He} calls for a servant to hurry as ${he} begins laboring.`);
								r.push(clothingBirth());
								r.push(`The servant collects ${his} ${children} and helps ${him} onto a cushion to recover for your return.`);
								if (canDoAnal(slave) && slave.anus > 0) {
									r.push(`With a little effort, ${he} pushes the vibrating dildo out of ${his} ass`);
								} else {
									r.push(`With things settling down, ${he} finally manages to switch off the bullet vibrators stuck to ${his} crotch`);
								}
								r.push(`before settling down for a nap.`);
							}
						}
					}
					break;

				case Job.CLUB:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${slave.slaveName} is showing off ${his} gravid body and trying to attract citizens as well as ${he} can. During one of ${his} teases, ${his} water breaks, soaking the floor. ${He} keeps on teasing, despite ${his} condition, until ${his} contractions drag ${him} to the floor.`);
							r.push(clothingBirth());
							r.push(`Multiple citizens drag ${him} into a booth so that they may tease ${his} exhausted body while the floor is dried and ${his} ${childrenAre} carried off.`);
						} else if (slave.fetish === "humiliation") {
							r.push(`${slave.slaveName} is showing off ${his} gravid body and trying to attract citizens by "dancing" as well as ${he} can, all the while being a huge tease. During one of ${his} "dances", ${his} water breaks, soaking the floor. ${He} calls out to the crowd, hyping them up for ${his} new show.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`As ${his} ${children}`);
							r.push(`are removed, ${he} is helped into one of the back rooms by several of ${his} aroused onlookers.`);
						} else {
							r.push(`${slave.slaveName} is showing off ${his} gravid body and trying to attract citizens by "dancing" as well as ${his} body will let ${him}. During one of ${his} dances, ${his} water breaks, soaking the floor. ${He} hastily tries to find help to leave, but only finds hands groping ${his} body. ${He} is quickly pulled into one of the side rooms by a group of men looking forward to the show ${he}'s about to perform for them.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`Only once the last of ${his} clients cums over ${his} body is ${he} allowed to gather ${his} ${children} and take a seat. ${He} enjoys a moment with ${his} ${newborns} before a servant comes to collect them.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${slave.slaveName} is showing off ${his} gravid body and trying to attract citizens by dancing as well as ${he} can. During one of ${his} dances, ${his} water breaks, soaking the dance floor. ${He} keeps on dancing, despite ${his} condition, until ${his} contractions drag ${him} to the floor.`);
							r.push(clothingBirth());
							r.push(`Multiple citizens drag ${him} into a booth so that they may tease ${his} exhausted body while the dance floor is dried and ${his} ${childrenAre} carried off.`);
						} else if (slave.fetish === "humiliation") {
							r.push(`${slave.slaveName} is showing off ${his} gravid body and trying to attract citizens by dancing as well as ${he} can, all the while flashing glimpses of ${his} crotch and nipples. During one of ${his} dances, ${his} water breaks, soaking the dance floor. ${He} calls out to the crowd, hyping them up for ${his} new show.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`As ${his} ${childrenAre} are removed from the dance floor, ${he} is helped into one of the back rooms by several of ${his} aroused onlookers.`);
						} else {
							r.push(`${slave.slaveName} is showing off ${his} gravid body and trying to attract citizens by dancing as well as ${he} can. During one of ${his} dances, ${his} water breaks, soaking the dance floor. ${He} hastily tries to leave the dance floor only to find hands groping ${his} body. ${He} is quickly pulled into one of the side rooms by a group of men looking forward to the show ${he}'s about to perform for them.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`Only once the last of ${his} clients cums over ${his} body is ${he} allowed to gather ${his} ${children} and take a seat. ${He} enjoys a moment with ${his} ${newborns} before a servant comes to collect them.`);
						}
					}
					break;

				case Job.CHOICE:
					if (!canWalk(slave)) {
						r.push(`While deciding on ${his} post, ${slave.slaveName}'s water breaks. Unable to reach the prepared birthing room in time, ${he} pulls ${himself} into a secluded nook to give birth in.`);
						r.push(clothingBirth());
						r.push(`${He} gathers ${his} ${children} and recovers ${his} strength before a servant finds ${him} and collects ${his} ${children}. ${He} decides to rest for the rest of the day before returning to choosing ${his} next task.`);
					} else if (slave.fetish === "humiliation") {
						r.push(`While wandering the penthouse deciding on ${his} post, ${slave.slaveName}'s water breaks. Sensing an opportunity, ${he} waddles to the nearest balcony overlooking the city. ${He} calls out, making sure all eyes are on ${him} for what happens next.`);
						humiliation = 1;
						r.push(clothingBirth());
						r.push(`${He} gathers ${his} ${newborns} and recovers ${his} strength before finding a servant to give ${his} ${children} to. ${He} decides to rest for the rest of the day before returning to choosing ${his} next task.`);
					} else {
						r.push(`While wandering the penthouse deciding on ${his} post, ${slave.slaveName}'s water breaks. Unable to reach the prepared birthing room in time, ${he} finds a secluded nook to give birth in.`);
						r.push(clothingBirth());
						r.push(`${He} gathers ${his} ${newborns} and recovers ${his} strength before finding a servant to give ${his} ${children} to. ${He} decides to rest for the rest of the day before returning to choosing ${his} next task.`);
					}
					break;

				case Job.SPA:
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`While soaking in the spa's pool, ${slave.slaveName}'s water breaks. As ${he} begins to ready ${himself} for birth,`);
							if (S.Attendant) {
								r.push(`${S.Attendant.slaveName} pulls ${him} out of the pool and glares at ${him}.`);
							} else {
								r.push(`the other bathers watch curiously.`);
							}
							r.push(clothingBirth());
							r.push(`${He} and ${his} ${children} are quickly dried off as ${he} begins nursing them. A servant soon arrives to take ${his} ${children} away.`);
						} else {
							r.push(`While changing in the changing room before a nice soak,${slave.slaveName}'s water breaks. ${He} hurries to find someone to help ${him} but only finds curious onlookers. Without any choice left, ${he} assumes a birthing position.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`Several of the other slaves present help ${him} with ${his} ${newborns} while the rest finish pleasuring themselves from the show.`);
							if (S.Attendant) {
								r.push(`${S.Attendant.slaveName}, lured in by the commotion, shoos the other slaves out and helps the new mother to a private relaxation room to unwind.`);
							} else {
								r.push(`Soon a servant arrives to take ${his} ${children} away, and ${he} is helped into the bath to clean up and relax.`);
							}
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`While soaking in the spa's pool, ${slave.slaveName}'s water breaks. As ${he} begins to ready ${himself} for birth,`);
							if (S.Attendant) {
								r.push(`${S.Attendant.slaveName} pulls ${him} out of the pool and glares at ${him}.`);
							} else {
								r.push(`the other bathers watch curiously.`);
							}
							r.push(clothingBirth());
							r.push(`${He} and ${his} ${children} are quickly dried off as ${he} begins nursing them. A servant soon arrives to take ${his} ${children} away.`);
						} else {
							r.push(`While heading for the changing room before a nice soak,${slave.slaveName}'s water breaks. ${He} hurries into the changing room only to find it unusually crowded. Without any choice left, ${he} assumes a birthing position.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`Several of the other slaves present help ${him} with ${his} ${newborns} while the rest finish pleasuring themselves from the show.`);
							if (S.Attendant) {
								r.push(`${S.Attendant.slaveName}, lured in by the commotion, shoos the other slaves out and helps the new mother to a private relaxation room to unwind.`);
							} else {
								r.push(`Soon a servant arrives to take ${his} ${children} away, and ${he} is ushered into the bath to clean up and relax.`);
							}
						}
					}
					break;

				case Job.NURSERY:
					r.push(`In the middle of`);
					if (V.nurseryChildren) {
						r.push(`changing a baby's diaper,`);
					} else {
						r.push(`cleaning ${V.nurseryName},`);
					}
					r.push(`${slave.slaveName}'s water breaks. ${He} hurries into a changing room and assumes a birthing position.`);
					r.push(clothingBirth());
					r.push(`Several of the other slaves present help ${him} with ${his} ${newborns}.`);
					if (S.Matron) {
						r.push(`${S.Matron.slaveName}, lured in by the commotion, shoos the other slaves out and helps the new mother to a private room to unwind.`);
					} else {
						r.push(`Soon a servant arrives to take ${his} ${children} away, and ${he} is ushered into a shower to clean up and relax.`);
					}
					break;

				case Job.SCHOOL:
					if (S.Schoolteacher) {
						({he2, his2} = getPronouns(S.Schoolteacher).appendSuffix("2"));
					}
					if (!canWalk(slave)) {
						r.push(`During a lesson in ${V.schoolroomName}, ${slave.slaveName}'s water breaks. Since ${he} can't leave the lesson, ${he} tries ${his} best to hold back the upcoming birth. ${He} fails to do so and a particularly strong contraction elicits a moan noticeable enough to draw all the students' attention.`);
						humiliation = 1;
						r.push(clothingBirth());
						if (S.Schoolteacher) {
							r.push(`${S.Schoolteacher.slaveName}, furious that ${his2} lesson was interrupted, drags ${him} from the class along with ${his} newborn ${children}.`);
						} else {
							r.push(`${He} gathers ${his} newborn ${children} up and is quickly helped from the class.`);
						}
						r.push(`${He} can feel all eyes watching ${him} leave.`);
					} else {
						r.push(`During a lesson in ${V.schoolroomName}, ${slave.slaveName}'s water breaks. Since ${he} can't leave the lesson, ${he} tries ${his} best to hold back the upcoming birth. ${He} fails to do so and a particularly strong contraction elicits a moan noticeable enough to draw all the students' attention.`);
						humiliation = 1;
						r.push(clothingBirth());
						if (S.Schoolteacher) {
							r.push(`${S.Schoolteacher.slaveName}, furious that ${his2} lesson was interrupted, dismisses ${him} from the class along with ${his} newborn ${children}.`);
						} else {
							r.push(`${He} gathers ${his} newborn ${children} up and quickly excuses ${himself} from the class.`);
						}
						r.push(`${He} can feel all eyes watching ${him} leave.`);
					}
					break;

				case Job.CLASSES:
					if (!canWalk(slave)) {
						r.push(`During a lesson under ${V.assistant.name}, ${slave.slaveName}'s water breaks. Since ${he} can't leave the lesson, ${he} tries ${his} best to hold back the upcoming birth, not without your assistant noticing. As punishment for poor planning, ${he} is forbidden from leaving. Additionally, ${his} birth will be turned into a live broadcast.`);
						humiliation = 1;
						r.push(clothingBirth());
						r.push(`Exhausted from the birth, ${he} is permitted a short break as ${his} ${childrenAre} gathered to be cleaned up before the lesson is continued.`);
					} else {
						r.push(`During a lesson under ${V.assistant.name}, ${slave.slaveName}'s water breaks. Since ${he} can't leave the lesson, ${he} tries ${his} best to hold back the upcoming birth, not without your assistant noticing. As punishment for poor planning, ${he} is forbidden from leaving. Additionally, ${his} birth will be turned into a live broadcast.`);
						humiliation = 1;
						r.push(clothingBirth());
						r.push(`Exhausted from the birth, ${he} is permitted a short break as ${his} ${childrenAre} gathered to clean ${himself} up before the lesson is continued.`);
					}
					break;

				case Job.BROTHEL:
					if (slave.fetish === Fetish.MINDBROKEN) {
						if (birthScene > 80 && canDoVaginal(slave)) {
							r.push(`While riding a customer's dick, ${slave.slaveName}'s water breaks on him. Showing no signs of stopping, he shoves ${his} gravid bulk off of him. Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to who may be watching ${his} naked crotch. ${He} draws ${his} ${children} to ${his} ${breasts} before seeking out the next customer's cock.`);
						} else if (birthScene > 60 && canDoAnal(slave)) {
							r.push(`While taking a customer's dick in ${his} ass, ${slave.slaveName}'s water breaks. ${He} shows no signs of slowing down, so he allows ${him} to reposition and continue. Instinctively, ${he} begins to push out ${his} ${babies}, indifferent to who may be watching ${his} naked crotch. He came strongly thanks to ${him} and gives ${him} a slap on the ass as ${he} begins drawing ${his} ${children} to ${his} ${breasts} and seeking out the next customer's cock.`);
						} else if (birthScene > 40) {
							r.push(`While sucking a customer's dick, ${slave.slaveName}'s water breaks. ${He} shows no signs of slowing down, so he allows ${him} to reposition and continue.`);
							r.push(clothingBirth());
							r.push(`He cums down ${his} throat before ${he} begins drawing ${his} ${children} to ${his} ${breasts} and seeking out the next customer's cock.`);
						} else {
							r.push(`While licking a customer's cunt, ${slave.slaveName}'s water breaks. ${He} shows no signs of slowing down, so she allows ${him} to reposition and continue.`);
							r.push(clothingBirth());
							r.push(`The customer splashes across ${his} face before ${he} begins drawing ${his} ${children} to ${his} ${breasts} and seeking out the next customer's cunt.`);
						}
					} else {
						if (birthScene > 80 && canDoVaginal(slave)) {
							r.push(`While riding a customer's dick, ${slave.slaveName}'s water breaks on him. ${He} desperately tries to disengage but he grabs ${his} hips and slams ${him} back down. He thoroughly enjoys ${his} contracting cunt before pushing ${him} off and standing over ${him}, jacking off. Quickly ${he} spreads ${his} legs apart and begins pushing out ${his} ${babies}${UH}. ${He} can't hide what's happening between ${his} legs,`);
							if (slave.fetish === "humiliation") {
								r.push(`but that only makes it more exciting.`);
							} else {
								r.push(`so ${he} bears with it.`);
							}
							r.push(`He cums over ${his} exhausted body and moves on leaving ${him} to recover and collect ${his} ${children} to be sent off.`);
							humiliation = 1;
						} else if (birthScene > 60 && canDoAnal(slave)) {
							r.push(`While taking a customer's dick in ${his} ass, ${slave.slaveName}'s water breaks. ${He} desperately tries to disengage but he grabs ${his} hips and slams into ${him} hard. Quickly, ${he} spreads ${his} legs apart and begins pushing out ${his} ${babies}${UH}. ${He} can't hide what's happening between ${his} legs,`);
							if (slave.fetish === "humiliation") {
								r.push(`but that only makes it more exciting.`);
							} else {
								r.push(`so ${he} bears with it.`);
							}
							r.push(`He came strongly thanks to ${him} and gives ${him} a slap on the ass as ${he} collapses to the ground. ${He} quickly gathers ${his} ${children} to be sent off.`);
							humiliation = 1;
						} else if (birthScene > 40) {
							r.push(`While sucking a customer's dick, ${slave.slaveName}'s water breaks. ${He} desperately tries to disengage but he grabs ${his} head and slams ${him} back into his crotch.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`He cums down ${his} throat before letting ${him} collapse to the ground and leaving. When ${he} recovers, ${he} quickly gathers ${his} ${children} to be sent off.`);
						} else {
							r.push(`While licking a customer's cunt, ${slave.slaveName}'s water breaks. ${He} desperately tries to disengage but she grabs ${his} head and slams ${him} back into her crotch.`);
							humiliation = 1;
							r.push(clothingBirth());
							r.push(`She cums across ${his} face before helping ${him} to the ground and leaving. When ${he} recovers, ${he} quickly gathers ${his} ${children} to be sent off.`);
						}
					}
					break;

				case Job.DJ:
					r.push(`While DJing ${V.clubName}, ${slave.slaveName}'s water breaks. ${He} can't stop ${his} setlist without drawing attention so ${he} tries ${his} best to ride out the contractions. As soon as the opportunity arises, ${he} attempts to sneak off stage. However, a number of fans block ${his} progress keeping ${him} on stage. Before long the contractions are too much to bear and ${he} drops to the ground.`);
					humiliation = 1;
					r.push(clothingBirth());
					r.push(`Exhausted, ${he} sits up and smiles to the crowd. ${His} show definitely drew attention to ${his} club. With a burst of energy ${he} leaps to ${his} feet, bows to the crowd, and gathers ${his} ${children}, before making ${his} way off stage. As ${he} leaves the public's gaze, ${he} shouts out with a wink "the next showing ought to be in about nine months".`);
					break;

				case Job.ATTENDANT:
					r.push(`While tending to the guests in the spa, ${slave.slaveName}'s water breaks. The slaves quickly come to ${his} aid as the contractions get closer and closer together. Their hands are all over ${his} laboring body, unsure of what they should be doing.`);
					humiliation = 1;
					r.push(clothingBirth());
					r.push(`${He} thanks ${his} charges for their less than helpful efforts and collects ${his} ${children} for removal. Upon returning, ${he} strips down and enters the pool, desperate for a break.`);
					break;

				case Job.MATRON:
					r.push(`While tending to the infants in ${V.nurseryName}, ${slave.slaveName}'s water breaks. The nannies quickly come to ${his} aid as the contractions get closer and closer together. They crowd around and watch, their curiosity getting the better of them.`);
					humiliation = 1;
					r.push(clothingBirth());
					r.push(`${He} thanks ${his} assistants for their less than helpful efforts and collects ${his} ${children} for removal.`);
					break;

				case Job.MADAM:
					r.push(`While managing ${V.brothelName}, ${slave.slaveName}'s water breaks. Knowing ${he} lacks the time to leave, ${he} sets up a sign reading "Birthshow: ${cashFormat(100)} a viewer" and takes a seat.`);
					humiliation = 1;
					r.push(clothingBirth());
					r.push(`Upon completing ${his} show, ${he} reclines with ${his} ${slave.pregType} ${children} and begins counting the credits ${he} bought in. In total ${he} made ${cashFormat(100 * birthScene)} and feels that business will be up in the brothel as patrons line up hoping another showing.`);
					cashX((100 * birthScene), "birth", slave);
					break;

				case Job.TEACHER:
					if (!canWalk(slave)) {
						r.push(`While teaching a lesson, ${slave.slaveName}'s water breaks. Sensing ${he} wouldn't be able to make it to the birthing area, ${he} instead chooses to act on the opportunity. Today's lesson will be on childbirth.`);
						humiliation = 1;
						r.push(clothingBirth());
						r.push(`Once ${he} recovers enough, ${he} gathers ${his} newborn ${children} and instructs the class to take notes on the lesson ${he} just demonstrated before being escorted out of the classroom.`);
					} else {
						r.push(`While teaching a lesson, ${slave.slaveName}'s water breaks. Sensing ${he} wouldn't be able to make it to the birthing area, ${he} instead chooses to act on the opportunity. Today's lesson will be on childbirth.`);
						humiliation = 1;
						r.push(clothingBirth());
						r.push(`Once ${he} recovers enough, ${he} gathers ${his} ${newborns} and instructs the class to take notes on the lesson ${he} just demonstrated before leaving to drop off ${his} ${children} for removal.`);
					}
					break;

				case Job.STEWARD:
					r.push(`While overseeing the house servants, ${slave.slaveName}'s water breaks. ${He} has no time to strip down so ${he} takes a seat and readies ${himself}. Commandingly, ${he} snaps ${his} fingers and orders ${his} charges to clean up the floor, assist ${him} with ${his} clothes, and be ready to take ${his} ${children} away.`);
					humiliation = 1;
					r.push(clothingBirth());
					r.push(`Once ${he} catches ${his} breath, ${he} rises and takes the fresh change of clothing provided by ${his} servants before ordering them back to work.`);
					break;

				case Job.MILKMAID:
					r.push(`While tending to ${his} stock, ${slave.slaveName}'s water breaks. ${He} hastily pulls ${himself} into a vacant stall and seats ${himself} in its corner.`);
					r.push(clothingBirth());
					r.push(`Quickly, ${he} collects ${his} ${children} for removal before returning to ${V.dairyName}. The cows around ${his} stall all have a knowing look on their ${(V.dairyPregSetting > 0) ? `faces but with their own swollen bellies hanging heavily from them, they know that they soon will follow ${his} lead` : `faces`}.`);
					break;

				case Job.FARMER:
					r.push(`While tending to some of ${his} livestock, ${slave.slaveName}'s water breaks. ${He} hastily finds a secluded corner and takes a seat on the (luckily fresh) hay.`);
					r.push(clothingBirth());
					r.push(`Once ${he}'s finished, ${he} hands off ${his} ${children} to a nearby slave to look after for the time being before returning to what ${he} was previously doing.`);
					break;

				case Job.WARDEN:
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`While punishing a slave, ${slave.slaveName}'s water breaks, soaking ${himU}. Indifferent, ${he} resumes beating ${himU} until the contractions are to much to bear. Settling to the floor, ${he} begins giving birth.`);
						r.push(clothingBirth());
						r.push(`As soon as ${he} regains ${his} strength, ${he} resumes beating the confused slave. ${His} ${childrenAre} collected by a servant, who carefully hints that ${slave.slaveName} should take a break before returning to ${his} task.`);
					} else {
						r.push(`While punishing a rebellious slave, ${slave.slaveName}'s water breaks, soaking ${himU}. Noticing the slave's smirk, ${he} resumes beating ${himU} until the contractions are too much to bear. Relocking the cell, ${he} waddles into the nearest empty cell and drops ${his} weight onto the cot.`);
						r.push(clothingBirth());
						r.push(`Quickly, ${he} collects ${his} ${children} for removal before returning to ${V.cellblockName}. On ${his} way past the cells, ${he} takes note of any slaves whispering or gesturing about what transpired for future punishment.`);
					}
					break;

				case Job.NURSE:
					r.push(`While tending to your unwell slaves, ${slave.slaveName}'s water breaks. Counting the time between contractions, ${he} knows ${he} has no time to get to ${his} prepared birthing chamber. ${He} waddles into the nearest empty room and hoists ${his} gravid body into the examination chair, placing ${his} feet in the stirrups.`);
					r.push(clothingBirth());
					r.push(`Quickly, ${he} collects ${his} ${children} for removal before retiring to the recovery ward. Within an hour of rest, ${he} is back on ${his} feet tending to ${his} charges.`);
					break;

				case Job.CONCUBINE:
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${He} is placed by your side. You strip ${him} as ${he} instinctively begins to push out ${his} ${babies}, indifferent to your wandering hands. ${His} ${childrenAre} promptly taken and, following a cleaning, a fresh change of clothes, and some private time with you, ${he} is carried back to your master suite.`);
					} else {
						r.push(`${slave.slaveName} cradles ${his} swollen belly, waiting for your return, when ${his} water breaks. Saddened that you aren't there for the show, ${he} begins waddling off to find you. By the time ${he} reaches your office, ${he} is barely holding back ${his} ${children}. You rise to meet ${him} and help ${him} onto the couch, just before it's too late.`);
						r.push(clothingBirth());
						r.push(`Cradling your ${newborns}, the two of you rest for a spell before sending them off and spending some more intimate time together.`);
					}
					break;

				case Job.HEADGIRLSUITE:
					({he2, his2} = getPronouns(S.HeadGirl).appendSuffix("2"));
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${slave.slaveName} is awoken from ${his} rest by a strong contraction. ${He} rolls over and begins to fall back to sleep as another wracks ${his} body.`);
							r.push(clothingBirth());
							r.push(`${He} draws ${his} ${children} to ${his} ${breasts} and resumes resting before ${S.HeadGirl.slaveName} returns from ${his2} duties.`);
						} else {
							r.push(`${slave.slaveName} is awoken from ${his} rest by a moist sensation followed by a contraction. ${He} rolls over and clutches ${his} gravid belly as another wracks ${his} body.`);
							r.push(clothingBirth());
							r.push(`${He} collects ${his} ${newborns} and places them in the cradle readied for ${him}. ${He} is helped to the shower as your servants clean up and remove ${his} ${children}. Freshened up, ${he} returns to resting knowing full well that ${S.HeadGirl.slaveName} will be eager to play with ${his} body upon returning.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${slave.slaveName} is awoken from ${his} rest by a strong contraction. ${He} rolls over and begins to fall back to sleep as another wracks ${his} body.`);
							r.push(clothingBirth());
							r.push(`${He} draws ${his} ${children} to ${his} ${breasts} and resumes resting before ${S.HeadGirl.slaveName} returns from ${his2} duties.`);
						} else {
							r.push(`${slave.slaveName} is awoken from ${his} rest by a moist sensation followed by a contraction. ${He} rolls over and clutches ${his} gravid belly as another wracks ${his} body.`);
							r.push(clothingBirth());
							r.push(`${He} collects ${his} ${newborns} and places them in the cradle readied for ${him}. ${He} leaves to take a shower as your servants clean up and remove ${his} ${children}. Freshened up, ${he} returns to resting knowing full well that ${S.HeadGirl.slaveName} will be eager to play with ${his} body upon returning.`);
						}
					}
					break;

				case Job.ARCADE:
					r.push(`A gush of liquid pours from the ${slave.slaveName}'s cunt, followed by the attendant in charge of the arcade hanging an "out of order" sign on ${his} exposed rear. While ${his} mouth is filled with a customer's dick, ${his} body instinctively births ${his} ${children} into the waiting basket. As they are carried away, ${his} rear is cleaned up and the sign removed.`);
					break;

				case Job.CLINIC:
					if (S.Nurse) {
						({he2, his2} = getPronouns(S.Nurse).appendSuffix("2"));
					}
					r.push(`${slave.slaveName} is in the perfect place to give birth when ${his} water breaks.`);
					if (S.Nurse) {
						r.push(S.Nurse.slaveName);
					} else {
						r.push(`A freelance nurse`);
					}
					r.push(`delivers ${his} ${children} before taking them away.`);
					if (S.Nurse) {
						r.push(`Before long ${he2} returns to attend to ${his2} patient's post-birth health.`);
					} else {
						r.push(`Another nurse takes over to attend to ${his} post-birth health.`);
					}
					break;

				case Job.CELLBLOCK:
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`While waiting in a cell in ${V.cellblockName}, ${slave.slaveName}'s water breaks. ${He} assumes a birthing position,`);
						r.push(clothingBirth());
						r.push(`${He} draws ${his} ${children} to ${his} ${breasts} and resumes waiting.`);
					} else {
						r.push(`${slave.slaveName} is awoken from ${his} stupor by moist sensation followed by a contraction. ${He} rolls over and clutches ${his} gravid belly as another wracks ${his} body.`);
						r.push(clothingBirth());
						r.push(`${He} collects ${his} ${children} and holds them close knowing someone will soon come to take them away from ${him}.`);
					}
					break;

				default:
					App.Events.addParagraph(el, r);
					App.UI.DOM.appendNewElement("div", el, `Assignment was "${slave.assignment}" and defaulted. Report this!`, "note");
					r = [];
					if (!canWalk(slave)) {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${slave.slaveName} is awoken from ${his} rest by a strong contraction. ${He} rolls over and begins to fall back to sleep as another wracks ${his} body.`);
							r.push(clothingBirth());
							r.push(`${He} draws ${his} ${children} to ${his} ${breasts} and resumes resting.`);
						} else {
							r.push(`${slave.slaveName} is awoken from ${his} rest by a moist sensation followed by a contraction. ${He} rolls over and clutches ${his} gravid belly as another wracks ${his} body.`);
							r.push(clothingBirth());
							r.push(`${He} collects ${his} ${newborns} and places them in the cradle readied for ${him}. ${He} is helped to the shower as your servants clean up and remove ${his} ${children}.`);
						}
					} else {
						if (slave.fetish === Fetish.MINDBROKEN) {
							r.push(`${slave.slaveName} is awoken from ${his} rest by a strong contraction. ${He} rolls over and begins to fall back to sleep as another wracks ${his} body.`);
							r.push(clothingBirth());
							r.push(`${He} draws ${his} ${children} to ${his} ${breasts} and resumes resting.`);
						} else {
							r.push(`${slave.slaveName} is awoken from ${his} rest by a moist sensation followed by a contraction. ${He} rolls over and clutches ${his} gravid belly as another wracks ${his} body.`);
							r.push(clothingBirth());
							r.push(`${He} collects ${his} ${newborns} and places them in the cradle readied for ${him}. ${He} heads to the shower as your servants clean up and remove ${his} ${children}.`);
						}
					}
			}
		}
		App.Events.addParagraph(el, r);
		return el;
	}

	function deadlyBirthScene() {
		const el = document.createElement("p");
		const {HeU, heU} = getNonlocalPronouns(V.seeDicks).appendSuffix('U');
		let r = [];
		slaveDead = 1;
		const babies = slave.pregType > 1 ? `babies` : `baby`;
		const children = slave.pregType > 1 ? `children` : `child`;

		r.push(`Feeling childbirth approaching, ${slave.slaveName} is helped to ${his} prepared birthing area.`);

		switch (slave.assignment) {
			case Job.GLORYHOLE:
				r.push(`Since ${he} is unable to leave ${his} box, ${he} doesn't have far to go. ${He} quickly finishes the waiting dick before shifting ${himself} into a slightly, though not by much, more comfortable position. ${He} begins laboring on ${his} ${babies}. However, ${he} soon finds that ${he} is incapable of actually giving birth to ${his} ${children}. As blood begins to seep from ${his} nethers, ${he} desperately tries to get anyone's attention.`);
				App.Events.addParagraph(el, r);
				r = [];
				r.push(`Only after several complaints of a non-functional glory hole is ${he} checked up on. ${His} gravid corpse,`);
				if (slave.mpreg === 1) {
					r.push(`asshole`);
				} else {
					r.push(`vagina`);
				}
				r.push(`agape, is all that remains of the unfortunate ${slave.slaveName}.`);
				break;

			case Job.CONFINEMENT:
			case Job.CELLBLOCK:
				r.push(`Since ${he} is locked in a cell, ${he} doesn't have far to go. Reluctantly, ${he} begins laboring on ${his} ${babies}. However, ${he} soon finds that ${he} is incapable of actually giving birth to ${his} ${children}. As blood begins to seep from ${his} nethers, ${he} desperately tries to get anyone's attention.`);
				App.Events.addParagraph(el, r);
				r = [];
				r.push(`Only once meal time comes around and food shoved into ${his} cell does anyone think something is amiss. When the food isn't desperately snatched away, ${his} cell is opened and ${he} checked up on. ${His} gravid corpse, propped up in the corner,`);
				if (slave.mpreg === 1) {
					r.push(`asshole`);
				} else {
					r.push(`vagina`);
				}
				r.push(`agape, is all that remains of the unfortunate ${slave.slaveName}.`);
				break;

			case Job.ARCADE:
				r.push(`Or ${he} would have been, if ${he} weren't locked in an arcade cabinet. A gush of liquid pours from the ${slave.slaveName}'s cunt, followed by the attendant in charge of the arcade hanging an "out of order" sign on ${his} exposed rear. While ${his} mouth is filled with a customer's dick, ${his} body instinctively attempts laboring on ${his} ${babies}. However, ${he} soon finds that ${he} is incapable of actually giving birth to ${his} ${children}. As blood begins to seep from ${his} nethers, ${he} desperately tries to get anyone's attention. The attendant rushes to ${his} aid, but fails to get the cabinet open in time to save ${slave.slaveName}. ${He} and ${his} ${children} were an unfortunate loss.`);
				break;

			default:
				r.push(`As ${he} is helped back to ${his} bed and to give birth, ${his} water breaks and ${he} slumps to the ground. As ${his} helper rushes off to find aid, ${he} begins laboring on ${his} ${babies}. However, ${he} soon finds that ${he} is incapable of actually giving birth to ${his} ${children}. As blood begins to seep from ${his} nethers, ${he} desperately tries to get anyone's attention.`);
				App.Events.addParagraph(el, r);
				r = [];
				r.push(`${His} helper arrives with aid far too late. ${HeU} screams when ${heU} sees ${slave.slaveName}'s gravid corpse,`);
				if (slave.mpreg === 1) {
					r.push(`asshole`);
				} else {
					r.push(`vagina`);
				}
				r.push(`agape. An unfortunate loss.`);
		}
		App.Events.addParagraph(el, r);

		r.push(deadBabiesResponse(slave.pregType));
		return el;
	}

	/**
	 *
	 * @param {number} babies the number of babies that just died.
	 */
	function deadBabiesResponse(babies) {
		const el = new DocumentFragment();
		if (
			babies &&
			FutureSocieties.isActive('FSRestart') &&
			slave.breedingMark === 1 &&
			V.propOutcome === 1 &&
			V.eugenicsFullControl !== 1 &&
			(slave.pregSource === -1 || slave.pregSource === -6)
		) {
			const div = document.createElement("div");
			div.append(`The ${V.arcologies[0].FSNeoImperialistLaw2 === 1 ? "Barons" : "Societal Elite"} `);
			App.UI.DOM.appendNewElement("span", div, `are furious `, "red");
			div.append(`you would allow an Elite child to perish under your watch`);
			if (babies > 1) {
				div.append(`, let alone multiple`);
			}
			div.append(`.`);
			el.append(div);
			V.failedElite += 100;
		}
		return el;
	}

	function clothingBirth() {
		const el = document.createElement("p");
		const r = [];
		let clothesSeed = random(1, 100);
		let undressed = 0;
		const babies = slave.pregType > 1 ? `babies` : `baby`;
		const children = slave.pregType > 1 ? `children` : `child`;
		const newborns = slave.pregType > 1 ? `newborns` : `newborn`;
		const UH = (slave.geneticQuirks.uterineHypersensitivity === 2) ? `, convulsing with orgasms in the process` : ``;
		let babyIntro;

		if (slave.fetish === Fetish.MINDBROKEN) {
			clothesSeed += 20;
		}
		if (isInduced(slave)) {
			clothesSeed += 90;
		}

		switch (slave.bellyAccessory) {
			case "a corset":
				clothesSeed += 15;
				break;
			case "an extreme corset":
				clothesSeed += 30;
				break;
			case "a support band":
				clothesSeed += 5;
				break;
		}

		switch (slave.clothes) {
			case "a sports bra":
			case "striped panties":
			case "a scalemail bikini":
			case "a string bikini":
			case "a tube top and thong":
			case "a bra":
			case "a button-up shirt":
			case "a sweater":
			case "a tank-top":
			case "a thong":
			case "a tube top":
			case "a one-piece swimsuit":
			case "a striped bra":
			case "a skimpy loincloth":
			case "a t-shirt":
			case "a tank-top and panties":
			case "a t-shirt and thong":
			case "an oversized t-shirt and boyshorts":
			case "an oversized t-shirt":
			case "boyshorts":
			case "panties":
			case "sport shorts and a t-shirt":
			case "a t-shirt and panties":
			case "panties and pasties":
			case "pasties":
			case "striped underwear":
			case "sport shorts and a sports bra":
			case "sport shorts":
			case "a slutty outfit":
			case "a bimbo outfit":
			case "a courtesan dress":
				// easy or pointless to remove
				if (clothesSeed < 90) {
					undressed = 1;
				}
				break;

			case "attractive lingerie":
			case "attractive lingerie for a pregnant woman":
			case "kitty lingerie":
			case "spats and a tank top":
			case "stretch pants and a crop-top":
			case "a button-up shirt and panties":
			case "a slutty klan robe":
			case "a sweater and panties":
			case "a t-shirt and jeans":
			case "cutoffs":
			case "leather pants and pasties":
			case "leather pants":
			case "jeans":
			case "a sweater and cutoffs":
			case "leather pants and a tube top":
			case "a chattel habit":
			case "a fallen nuns habit":
			case "a huipil":
			case "a mini dress":
			case "a toga":
			case "an apron":
			case "clubslut netting":
			case "a leotard":
			case "a monokini":
			case "cutoffs and a t-shirt":
				// easy to remove
				if (clothesSeed < 80) {
					undressed = 1;
				}
				break;

			case "a ball gown":
			case "a burqa":
			case "a halter top dress":
			case "a hijab and abaya":
			case "a maternity dress":
			case "a niqab and abaya":
			case "a slave gown":
			case "a klan robe":
			case "a gothic lolita dress":
			case "a hanbok":
			case "a kimono":
			case "a biyelgee costume":
			case "a cheerleader outfit":
			case "a dirndl":
			case "a long qipao":
			case "a schoolgirl outfit":
			case "a slutty maid outfit":
			case "a slutty nurse outfit":
			case "a slutty qipao":
			case "a succubus outfit":
			case "harem gauze":
			case "lederhosen":
			case "a hijab and blouse":
			case "an evening dress":
				// dresses and etc
				if (clothesSeed < 60) {
					undressed = 1;
				}
				break;

			case "a bunny outfit":
			case "a burkini":
			case "a comfortable bodysuit":
			case "a cybersuit":
			case "a tight Imperial bodysuit":
			case "a latex catsuit":
			case "a nice maid outfit":
			case "a nice nurse outfit":
			case "battlearmor":
			case "Imperial Plate":
			case "battledress":
			case "conservative clothing":
			case "nice business attire":
			case "a nice pony outfit":
			case "a slutty pony outfit":
			case "a police uniform":
			case "a military uniform":
			case "a mounty outfit":
			case "a red army uniform":
			case "a schutzstaffel uniform":
			case "a slutty schutzstaffel uniform":
			case "a confederate army uniform":
			case "overalls":
			case "slutty business attire":
			case "slutty jewelry":
			case "Western clothing":
				// getting hard to get out of quickly
				if (clothesSeed < 40) {
					undressed = 1;
				}
				break;
			case "chains":
			case "restrictive latex":
			case "shibari ropes":
			case "uncomfortable straps":
				// very hard to get out of quickly
				if (clothesSeed < 20) {
					undressed = 1;
				}
				break;
		}

		if (slave.broodmother > 0) {
			if (slave.counter.birthsTotal === 0) {
				babyIntro = `${his} first baby${UH}`;
			} else {
				babyIntro = `this week's baby${UH}`;
			}
		} else {
			babyIntro = `${his} ${babies}${UH}`;
		}

		if (undressed === 0 && App.Data.clothes.get(slave.clothes).exposure <= 3) {
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`Instinctively, ${he} begins to push out`);
				if (slave.broodmother > 0) {
					if (slave.counter.birthsTotal === 0) {
						r.push(`${his} first`);
					} else {
						r.push(`this week's`);
					}
				} else {
					r.push(his);
				}
			}
			switch (slave.clothes) {
				case "attractive lingerie":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching. ${His} g-string stretches as ${his} newborn crowns into it before finally snapping and clearing the way for childbirth.`);
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and shifts ${his} g-string aside before beginning to push out ${babyIntro}. ${He} can't hide what's happening between ${his} legs,`);
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
					}
					break;

				case "a succubus outfit":
				case "slutty jewelry":
				case "a fallen nuns habit":
				case "harem gauze":
				case "slutty business attire":
				case "a slutty maid outfit":
				case "a slutty nurse outfit":
				case "a schoolgirl outfit":
				case "restrictive latex":
				case "a cheerleader outfit":
				case "clubslut netting":
				case "Western clothing":
				case "a slutty qipao":
				case "a chattel habit":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching ${his} naked`);
						if (slave.mpreg === 1) {
							r.push(`asshole.`);
						} else {
							r.push(`crotch.`);
						}
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and begins pushing out ${babyIntro}. ${He} can't hide what's happening between ${his} legs,`);
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
					}
					break;

				case "attractive lingerie for a pregnant woman":
				case "kitty lingerie":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching. ${His} panties stretch as ${his} baby crowns into them before finally snapping and clearing the way for childbirth.`);
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and shifts ${his} panties aside before beginning to push out ${babyIntro}. ${He} can't hide what's happening between ${his} legs,`);
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
					}
					break;

				case "a maternity dress":
				case "a slave gown":
				case "a halter top dress":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and begins pushing out ${babyIntro}.`);
						if (slave.fetish === "humiliation") {
							r.push(`${He} is disappointed that ${his} dress hides what's happening between ${his} legs.`);
						} else {
							r.push(`${He} does ${his} best to hide what's happening between ${his} legs.`);
						}
					}
					break;

				case "a string bikini":
				case "a scalemail bikini":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching. ${His} bikini bottom stretches as ${his} baby crowns into it before finally snapping and clearing the way for childbirth.`);
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and shifts ${his} bikini bottom aside before beginning to push out ${babyIntro}. ${He} can't hide what's happening between ${his} legs,`);
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
					}
					break;

				case "striped panties":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching. ${His} panties stretch as ${his} baby crowns into it before finally snapping and clearing the way for childbirth.`);
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and shifts ${his} panties aside before beginning to push out ${babyIntro}. ${He} can't hide what's happening between ${his} legs,`);
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
					}
					break;

				case "cutoffs and a t-shirt":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching.`);
						if (slave.mpreg === 1) {
							r.push(`The seat of ${his}`);
						} else {
							r.push(his);
						}
						r.push(`jean cutoffs bulge as ${his} baby crowns into them as ${he} continues ${his} tasks, oblivious to the wetness and ${his} child's dilemma. Seeing ${him} in this state, someone manages to remove ${his} pants to allow ${his} body to finish giving birth.`);
					} else {
						r.push(`Quickly ${he} attempts to unfasten ${his} jean cutoffs but fails to do so before having to push out ${babyIntro}. As ${he} crowns into ${his} jeans, ${he} can't hide the wetness and bulge between ${his}`);
						if (slave.mpreg === 1) {
							r.push(`buttocks,`);
						} else {
							r.push(`legs,`);
						}
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
						r.push(`With a little help, ${he} manages to escape ${his} clothes and finish giving birth.`);
					}
					break;

				case "a slutty outfit":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching. ${His} pasties come off as ${his} baby crowns into it, clearing the way for childbirth.`);
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and pulls ${his} pasties off before beginning to push out ${babyIntro}. ${He} can't hide what's happening between ${his} legs,`);
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
					}
					break;

				case "uncomfortable straps":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching. ${His} straps are pushed taut as ${his} baby crowns into the steel ring covering ${his}`);
						if (slave.mpreg === 1) {
							r.push(`asshole.`);
						} else {
							r.push(`vagina.`);
						}
						r.push(`${He} continues ${his} tasks, oblivious to ${his} child's dilemma, until someone manages to cut ${his} straps and allow ${his} body to finish giving birth.`);
					} else {
						r.push(`Quickly ${he} attempts to undo ${his} straps but fails to do so before having to push out ${babyIntro}. As ${he} crowns into the steel ring covering ${his}`);
						if (slave.mpreg === 1) {
							r.push(`asshole,`);
						} else {
							r.push(`vagina,`);
						}
						r.push(`${he} can't hide what's happening between ${his} legs,`);
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
						r.push(`With a little help, ${he} manages to escape ${his} bindings and finish giving birth.`);
					}
					break;

				case "a penitent nuns habit":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies} into ${his} habit, indifferent to their discomfort.`);
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and begins pushing out ${babyIntro}.`);
						if (slave.fetish === "humiliation") {
							r.push(`${He} is disappointed that ${his} habit hides what's happening between ${his} legs.`);
						} else {
							r.push(`${He} does ${his} best to hide what's happening between ${his} legs.`);
						}
						r.push(`${He} tries to keep ${his} ${newborns} from being chafed by ${his} habit.`);
					}
					break;

				case "nice business attire":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and begins pushing out ${babyIntro}.`);
						if (slave.fetish === "humiliation") {
							r.push(`${He} is disappointed that ${his} business suit hides what's happening between ${his} legs.`);
						} else {
							r.push(`${He} does ${his} best to hide what's happening between ${his} legs.`);
						}
					}
					break;

				case "stretch pants and a crop-top":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
						if (slave.pregType > 10 && slave.broodmother === 0) {
							r.push(`Child after child is born into ${his} stretch pants as the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`front`);
							}
							r.push(`distends more and more. With nowhere left to go, ${his} newborns begin to slip down ${his} pantlegs, but that isn't enough to relieve the straining material. With a loud rip, the overburdened garment splits and frees ${his} brood into the world.`);
						} else if (slave.pregType > 4 && slave.broodmother === 0) {
							r.push(`Child after child is born into ${his} stretch pants as the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`front`);
							}
							r.push(`distends more and more. With nowhere left to go, ${his} newborns begin to slip down ${his} pantlegs. ${He} struggles to carry on with ${his} task until someone helps free them from their cloth prison.`);
						} else {
							r.push(`${He} finishes giving birth and begins anew on ${his} assigned task, ignoring the squirming ${babies} distending the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`front`);
							}
							r.push(`of ${his} stretch pants until someone helps them from their cloth prison.`);
						}
					} else {
						r.push(`Quickly ${he} attempts to pull down ${his} stretch pants but fails to do so before having to push out ${babyIntro}. ${He} can't hide what's happening between ${his} legs as the`);
						if (slave.mpreg === 1) {
							r.push(`seat`);
						} else {
							r.push(`front`);
						}
						r.push(`of ${his} pants bulges as ${his} child crowns,`);
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
						r.push(`The tight material stretches as ${his} child is born into it and with a little help they are removed so that ${he} may finish giving birth.`);
					}
					break;

				case "spats and a tank top":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
						r.push(`The material of ${his} spats is too tight to allow ${his} child to fully be born, trapping it in ${his} straining`);
						if (slave.mpreg === 1) {
							r.push(`anus.`);
						} else {
							r.push(`pussy.`);
						}
						r.push(`Ignoring the pain, ${he} begins anew on ${his} assigned task, ${his}`);
						if (slave.mpreg === 1) {
							r.push(`pants`);
						} else {
							r.push(`crotch`);
						}
						r.push(`bulging lewdly, until someone manages to pants ${him}. With the way clear, ${his} ${children}`);
						if (slave.pregType > 1) {
							r.push(`promptly slip from ${his} stretched`);
						} else {
							r.push(`quickly slips out of ${his} loosened`);
						}
						if (slave.mpreg === 1) {
							r.push(`ass`);
						} else {
							r.push(`cunt`);
						}
						r.push(`and into the world.`);
					} else {
						r.push(`Quickly ${he} attempts to pull down ${his} spats but fails to do so before having to push out ${babyIntro}. ${He} can't hide what's happening between ${his} legs as the bulge in the`);
						if (slave.mpreg === 1) {
							r.push(`seat`);
						} else {
							r.push(`front`);
						}
						r.push(`of ${his} shorts steadily grows as ${his} child crowns,`);
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
						r.push(`The material is too tight to allow ${his} child to fully be born, trapping it in ${his} straining`);
						if (slave.mpreg === 1) {
							r.push(`anus.`);
						} else {
							r.push(`pussy.`);
						}
						r.push(`The sensation is far too powerful to allow ${him} to slip ${his} spats down, instead forcing ${him} to the ground where ${he} stays, ass up,`);
						if (slave.geneticQuirks.uterineHypersensitivity === 2) {
							r.push(`moaning`);
						} else {
							r.push(`sobbing`);
						}
						r.push(`into the floor.`);
						if (slave.pregType > 1 && slave.broodmother !== 1) {
							r.push(`${His} other ${children}`);
							if (slave.pregType > 2) {
								r.push(`refuse`);
							} else {
								r.push(`refuses`);
							}
							r.push(`to wait and quickly join their sister in birth. ${He} wails in anguish at the ever-mounting pressure in ${his}`);
							if (slave.mpreg === 1) {
								r.push(`rear,`);
							} else {
								r.push(`birth canal,`);
							}
							r.push(`until a ripping sound brings ${him} back to ${his} senses. The`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`crotch`);
							}
							r.push(`of ${his} pants has begun splitting! ${He} has no time to get to ${his} knees as the combined force of ${his} eager children blow out both ${his}`);
							if (slave.mpreg === 1) {
								r.push(`anus`);
							} else {
								r.push(`vagina`);
							}
							r.push(`and spats on their way into the world.`);
						} else {
							r.push(`${He} struggles to push it out, beginning to lose hope, until a ripping sound brings ${him} back to ${his} senses. The`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`crotch`);
							}
							r.push(`of ${his} pants has begun splitting! ${He} gets to ${his} knees and pushes with all ${his} might, ${his} child moving little by little as the tear grows larger and larger. Finally ${his} child pops out the hole and the ordeal is over${(slave.broodmother > 0) ? `, for now at least` : ``}.`);
						}
					}
					break;

				case "a comfortable bodysuit":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching ${his}`);
						if (slave.mpreg === 1) {
							r.push(`ass.`);
						} else {
							r.push(`crotch.`);
						}
						if (slave.pregType > 20 && slave.broodmother === 0) {
							r.push(`Child after child is born into ${his} bodysuit as the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`front`);
							}
							r.push(`distends more and more. Eventually the squirming mass pulls ${him} to the floor, where ${he} lies, still very much in labor. As the load of newborns reaches the bodysuit's limit, a loud rip sounds out as the overburdened garment splits and frees ${his} brood into the world.`);
						} else if (slave.pregType > 10 && slave.broodmother === 0) {
							r.push(`Child after child is born into ${his} bodysuit as the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`front`);
							}
							r.push(`distends more and more. Eventually the squirming mass pulls ${him} to the floor, where ${he} lays until ${he} finishes giving birth. ${He} struggles to get to ${his} feet and carry on with ${his} task until someone helps free them from their nylon prison.`);
						} else if (slave.pregType > 4 && slave.broodmother === 0) {
							r.push(`Child after child is born into ${his} bodysuit as the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`front`);
							}
							r.push(`distends more and more. ${He} struggles to carry on with ${his} task with the squirming mass between ${his} legs until someone helps free them from their nylon prison.`);
						} else {
							r.push(`${He} finishes giving birth and begins anew on ${his} assigned task, ignoring the squirming ${babies} distending the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`crotch`);
							}
							r.push(`of ${his} bodysuit until someone helps them from their nylon prison.`);
						}
					} else {
						r.push(`Quickly ${he} attempts to remove ${his} bodysuit but fails to do so before having to push out ${babyIntro}. ${He} can't hide what's happening between ${his} legs,`);
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
						r.push(`The tight material stretches as ${his} child is born into it and with a little help ${his} child`);
						if (slave.pregType > 1) {
							r.push(`is freed from the taut nylon so that ${he} may continue giving birth.`);
						} else {
							r.push(`is freed from the taut nylon.`);
						}
					}
					break;

				case "overalls":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching ${his}`);
						if (slave.mpreg === 1) {
							r.push(`ass.`);
						} else {
							r.push(`crotch.`);
						}
						if (slave.pregType > 30 && slave.broodmother === 0) {
							r.push(`Child after child is born into ${his} overalls as the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`front`);
							}
							r.push(`distends more and more. Eventually the thick shoulder straps tear apart, and the squirming mass pulls ${him} to the floor, where ${he} lies, still very much in labor. As the load of newborns reaches the garment's limit, a loud rip sounds out as the overstretched fabric splits and frees ${his} brood into the world.`);
						} else if (slave.pregType > 15 && slave.broodmother === 0) {
							r.push(`Child after child is born into ${his} overalls as the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`front`);
							}
							r.push(`distends more and more. Eventually the thick shoulder straps tear apart, and the squirming mass pulls ${him} to the floor, where ${he} lays until ${he} finishes giving birth. ${He} struggles to get to ${his} feet and carry on with ${his} task until someone helps free them from their denim prison.`);
						} else if (slave.pregType > 4 && slave.broodmother === 0) {
							r.push(`Child after child is born into ${his} overalls as the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`front`);
							}
							r.push(`distends more and more. ${He} struggles to carry on with ${his} task with the squirming mass between ${his} legs until someone helps free them from their denim prison.`);
						} else {
							r.push(`${He} finishes giving birth and begins anew on ${his} assigned task, ignoring the squirming ${babies} distending the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`crotch`);
							}
							r.push(`of ${his} overalls until someone helps them from their denim prison.`);
						}
					} else {
						r.push(`Quickly ${he} attempts to remove ${his} overalls but fails to do so before having to push out ${babyIntro}. ${He} can't hide what's happening between ${his} legs,`);
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
						r.push(`The tight material stretches as ${his} child is born into it and with a little help ${his} child`);
						if (slave.pregType > 1) {
							r.push(`is freed from the tight denim so that ${he} may continue giving birth.`);
						} else {
							r.push(`is freed from the tight denim.`);
						}
					}
					break;

				case "a kimono":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and begins pushing out ${babyIntro}.`);
						if (slave.fetish === "humiliation") {
							r.push(`${He} is disappointed that ${his} kimono hides what's happening between ${his} legs.`);
						} else {
							r.push(`${He} does ${his} best to hide what's happening between ${his} legs.`);
						}
					}
					break;

				case "a burqa":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and begins pushing out ${babyIntro}.`);
						if (slave.fetish === "humiliation") {
							r.push(`${He} is disappointed that ${his} burqa hides what's happening between ${his} legs.`);
						} else {
							r.push(`${He} does ${his} best to hide what's happening between ${his} legs.`);
						}
					}
					break;

				case "a hijab and abaya":
				case "a niqab and abaya":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and begins pushing out ${babyIntro}.`);
						if (slave.fetish === "humiliation") {
							r.push(`${He} is disappointed that ${his} abaya hides what's happening between ${his} legs.`);
						} else {
							r.push(`${He} does ${his} best to hide what's happening between ${his} legs.`);
						}
					}
					break;

				case "a klan robe":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and begins pushing out ${babyIntro}.`);
						if (slave.fetish === "humiliation") {
							r.push(`${He} is disappointed that ${his} robe hides what's happening between ${his} legs.`);
						} else {
							r.push(`${He} does ${his} best to hide what's happening between ${his} legs.`);
						}
					}
					break;

				case "a military uniform":
				case "a red army uniform":
				case "a confederate army uniform":
				case "a hijab and blouse":
				case "a slutty schutzstaffel uniform":
				case "a dirndl":
				case "a biyelgee costume":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and begins pushing out ${babyIntro}.`);
						if (slave.fetish === "humiliation") {
							r.push(`${He} is disappointed that ${his} skirt hides what's happening between ${his} legs.`);
						} else {
							r.push(`${He} does ${his} best to hide what's happening between ${his} legs.`);
						}
					}
					break;

				case "battledress":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching.`);
						if (slave.mpreg === 1) {
							r.push(`The seat of ${his} fatigues`);
						} else {
							r.push(`${His} fatigues`);
						}
						r.push(`bulge as ${his} baby crowns into them as ${he} continues ${his} tasks oblivious to the wetness and ${his} child's dilemma. Seeing ${him} in this state, someone manages to remove ${his} pants to allow ${his} body to finish giving birth.`);
					} else {
						r.push(`Quickly ${he} attempts to unfasten ${his} fatigues but fails to do so before having to push out ${babyIntro}. As ${he} crowns into ${his} pants, ${he} can't hide the wetness and bulge`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear,`);
						} else {
							r.push(`between ${his} legs,`);
						}
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
						r.push(`With a little help, ${he} manages to escape ${his} clothes and finish giving birth.`);
					}
					break;

				case "a nice maid outfit":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and begins pushing out ${babyIntro}.`);
						if (slave.fetish === "humiliation") {
							r.push(`${He} is disappointed that ${his} maid outfit hides what's happening between ${his} legs.`);
						} else {
							r.push(`${He} does ${his} best to hide what's happening between ${his} legs.`);
						}
					}
					break;

				case "conservative clothing":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching.`);
						if (slave.mpreg === 1) {
							r.push(`The seat of ${his} pants`);
						} else {
							r.push(`${His} pants`);
						}
						r.push(`bulge as ${his} baby crowns into them as ${he} continues ${his} tasks oblivious to the wetness and ${his} child's dilemma. Seeing ${him} in this state, someone manages to remove ${his} pants to allow ${his} body to finish giving birth.`);
					} else {
						r.push(`Quickly ${he} attempts to unfasten ${his} pants but fails to do so before having to push out ${babyIntro}. As ${he} crowns into ${his} pants, ${he} can't hide the wetness and bulge between ${his}`);
						if (slave.mpreg === 1) {
							r.push(`buttocks,`);
						} else {
							r.push(`legs,`);
						}
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
						r.push(`With a little help, ${he} manages to escape ${his} clothes and finish giving birth.`);
					}
					break;

				case "chains":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching. ${His} chains stretch as ${his} baby crowns into them before finally slipping to the side clearing the way for ${his} body to finish giving birth.`);
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and shifts ${his} chains aside before beginning to push out ${babyIntro}. ${He} can't hide what's happening between ${his} legs,`);
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
					}
					break;

				case "shibari ropes":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching. ${His} ropes are pulled taut as ${his} baby crowns into the rope covering ${his}`);
						if (slave.mpreg === 1) {
							r.push(`asshole.`);
						} else {
							r.push(`vagina.`);
						}
						r.push(`${He} continues ${his} tasks, oblivious to ${his} child's dilemma, until someone manages to cut ${his} ropes and allow ${his} body to finish giving birth.`);
					} else {
						r.push(`Quickly ${he} attempts to undo ${his} ropes but fails to do so before having to push out ${babyIntro}. As ${he} crowns into the rope covering ${his}`);
						if (slave.mpreg === 1) {
							r.push(`asshole,`);
						} else {
							r.push(`vagina,`);
						}
						r.push(`${he} can't hide what's happening between ${his} legs,`);
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
						r.push(`With a little help, ${he} manages to escape ${his} bindings and finish giving birth.`);
					}
					break;

				case "a toga":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and begins pushing out ${babyIntro}.`);
						if (slave.fetish === "humiliation") {
							r.push(`${He} is disappointed that ${his} toga hides what's happening between ${his} legs.`);
						} else {
							r.push(`${He} does ${his} best to hide what's happening between ${his} legs.`);
						}
					}
					break;

				case "a huipil":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and begins pushing out ${babyIntro}. ${He} can't hide what's going on with how skimpy the huipil is`);
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
					}
					break;

				case "a bunny outfit":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching. ${His} teddy bulges as ${his} baby crowns into it as ${he} continues ${his} tasks, oblivious to the wetness and ${his} child's dilemma. Seeing ${him} in this state, someone manages to tear ${his} outfit open to allow ${his} body to finish giving birth.`);
					} else {
						r.push(`Quickly ${he} attempts to remove ${his} teddy but fails to do so before having to push out ${babyIntro}. As ${he} crowns into ${his} outfit, ${he} can't hide the wetness and bulge between ${his}`);
						if (slave.mpreg === 1) {
							r.push(`buttocks,`);
						} else {
							r.push(`legs,`);
						}
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
						r.push(`With a little help, ${he} manages to escape ${his} bunny suit and finish giving birth.`);
					}
					break;

				case "a leotard":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching ${his}`);
						if (slave.mpreg === 1) {
							r.push(`crotch.`);
						} else {
							r.push(`ass.`);
						}
						if (slave.pregType > 30 && slave.broodmother === 0) {
							r.push(`Child after child is born into ${his} leotard as the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`front`);
							}
							r.push(`distends more and more. Eventually the squirming mass pulls ${him} to the floor, where ${he} lies, still very much in labor. As the load of newborns reaches the leotard's limit, a loud rip sounds out as the overburdened garment splits and frees ${his} brood into the world.`);
						} else if (slave.pregType > 10 && slave.broodmother === 0) {
							r.push(`Child after child is born into ${his} leotard as the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`front`);
							}
							r.push(`distends more and more. Eventually the squirming mass pulls ${him} to the floor, where ${he} lays until ${he} finishes giving birth. ${He} struggles to get to ${his} feet and carry on with ${his} task until someone helps free them from their nylon prison.`);
						} else if (slave.pregType > 4 && slave.broodmother === 0) {
							r.push(`Child after child is born into ${his} leotard as the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`front`);
							}
							r.push(`distends more and more. ${He} struggles to carry on with ${his} task with the squirming mass between ${his} legs until someone helps free them from their nylon prison.`);
						} else {
							r.push(`${He} finishes giving birth and begins anew on ${his} assigned task, ignoring the squirming ${babies} distending the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`crotch`);
							}
							r.push(`of ${his} leotard until someone helps them from their nylon prison.`);
						}
					} else {
						r.push(`Quickly ${he} attempts to remove ${his} leotard but fails to do so before having to push out ${babyIntro}. ${He} can't hide what's happening between ${his} legs,`);
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
						r.push(`The tight material stretches as ${his} child is born into it and with a little help ${he}'s freed to finish giving birth.`);
					}
					break;

				case "a burkini":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching ${his}`);
						if (slave.mpreg === 1) {
							r.push(`crotch.`);
						} else {
							r.push(`ass.`);
						}
						if (slave.pregType > 30 && slave.broodmother === 0) {
							r.push(`Child after child is born into ${his} burkini as the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`front`);
							}
							r.push(`distends more and more. Eventually the squirming mass pulls ${him} to the floor, where ${he} lies, still very much in labor. As the load of newborns reaches the swimsuit's limit, a loud rip sounds out as the overburdened garment splits and frees ${his} brood into the world.`);
						} else if (slave.pregType > 10 && slave.broodmother === 0) {
							r.push(`Child after child is born into ${his} burkini as the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`front`);
							}
							r.push(`distends more and more. Eventually the squirming mass pulls ${him} to the floor, where ${he} lays until ${he} finishes giving birth. ${He} struggles to get to ${his} feet and carry on with ${his} task until someone helps free them from their polyester prison.`);
						} else if (slave.pregType > 4 && slave.broodmother === 0) {
							r.push(`Child after child is born into ${his} burkini as the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`front`);
							}
							r.push(`distends more and more. ${He} struggles to carry on with ${his} task with the squirming mass between ${his} legs until someone helps free them from their polyester prison.`);
						} else {
							r.push(`${He} finishes giving birth and begins anew on ${his} assigned task, ignoring the squirming ${babies} distending the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`crotch`);
							}
							r.push(`of ${his} swimsuit until someone helps them from their polyester prison.`);
						}
					} else {
						r.push(`Quickly ${he} attempts to remove ${his} burkini but fails to do so before having to push out ${babyIntro}. ${He} can't hide what's happening between ${his} legs,`);
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
						r.push(`The tight material stretches as ${his} child is born into it and with a little help ${he}'s freed to finish giving birth.`);
					}
					break;

				case "a monokini":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching ${his}`);
						if (slave.mpreg === 1) {
							r.push(`crotch.`);
						} else {
							r.push(`ass.`);
						}
						if (slave.pregType > 30 && slave.broodmother === 0) {
							r.push(`Child after child is born into ${his} monokini as the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`front`);
							}
							r.push(`distends more and more. Eventually the squirming mass pulls ${him} to the floor, where ${he} lies, still very much in labor. As the load of newborns reaches the swimsuit's limit, a loud rip sounds out as the overburdened garment splits and frees ${his} brood into the world.`);
						} else if (slave.pregType > 10 && slave.broodmother === 0) {
							r.push(`Child after child is born into ${his} monokini as the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`front`);
							}
							r.push(`distends more and more. Eventually the squirming mass pulls ${him} to the floor, where ${he} lays until ${he} finishes giving birth. ${He} struggles to get to ${his} feet and carry on with ${his} task until someone helps free them from their nylon prison.`);
						} else if (slave.pregType > 4 && slave.broodmother === 0) {
							r.push(`Child after child is born into ${his} monokini as the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`front`);
							}
							r.push(`distends more and more. ${He} struggles to carry on with ${his} task with the squirming mass between ${his} legs until someone helps free them from their nylon prison.`);
						} else {
							r.push(`${He} finishes giving birth and begins anew on ${his} assigned task, ignoring the squirming ${babies} distending the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`crotch`);
							}
							r.push(`of ${his} swimsuit until someone helps them from their nylon prison.`);
						}
					} else {
						r.push(`Quickly ${he} attempts to remove ${his} monokini but fails to do so before having to push out ${babyIntro}. ${He} can't hide what's happening between ${his} legs,`);
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
						r.push(`The tight material stretches as ${his} child is born into it and with a little help ${he}'s freed to finish giving birth.`);
					}
					break;

				case "a cybersuit":
				case "a tight Imperial bodysuit":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching ${his}`);
						if (slave.mpreg === 1) {
							r.push(`crotch.`);
						} else {
							r.push(`ass.`);
						}
						if (slave.pregType > 30 && slave.broodmother === 0) {
							r.push(`Child after child is born into ${his} bodysuit as the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`front`);
							}
							r.push(`distends more and more. Eventually the squirming mass pulls ${him} to the floor, where ${he} lies, still very much in labor. As the load of newborns reaches the bodysuit's limit, a loud rip sounds out as the overburdened garment splits and frees ${his} brood into the world.`);
						} else if (slave.pregType > 10 && slave.broodmother === 0) {
							r.push(`Child after child is born into ${his} bodysuit as the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`front`);
							}
							r.push(`distends more and more. Eventually the squirming mass pulls ${him} to the floor, where ${he} lays until ${he} finishes giving birth. ${He} struggles to get to ${his} feet and carry on with ${his} task until someone helps free them from their rubber prison.`);
						} else if (slave.pregType > 4 && slave.broodmother === 0) {
							r.push(`Child after child is born into ${his} bodysuit as the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`front`);
							}
							r.push(`distends more and more. ${He} struggles to carry on with ${his} task with the squirming mass between ${his} legs until someone helps free them from their rubber prison.`);
						} else {
							r.push(`${He} finishes giving birth and begins anew on ${his} assigned task, ignoring the squirming ${babies} distending the`);
							if (slave.mpreg === 1) {
								r.push(`seat`);
							} else {
								r.push(`crotch`);
							}
							r.push(`of ${his} bodysuit until someone helps them from their rubber prison.`);
						}
					} else {
						r.push(`Quickly ${he} attempts to remove ${his} bodysuit but fails to do so before having to push out ${babyIntro}. ${He} can't hide what's happening between ${his} legs,`);
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
						r.push(`The tight material stretches as ${his} child is born into it and with a little help ${he}'s freed to finish giving birth.`);
					}
					break;

				case "an evening dress":
				case "a ball gown":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and begins pushing out ${babyIntro}.`);
						if (slave.fetish === "humiliation") {
							r.push(`${He} is disappointed that ${his} gown hides what's happening between ${his} legs.`);
						} else {
							r.push(`${He} does ${his} best to hide what's happening between ${his} legs.`);
						}
					}
					break;

				case "a latex catsuit":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the closed zipper covering ${his}`);
						if (slave.mpreg === 1) {
							r.push(`asshole.`);
						} else {
							r.push(`vagina.`);
						}
						r.push(`As ${his} child bulges the latex around ${his}`);
						if (slave.mpreg === 1) {
							r.push(`ass,`);
						} else {
							r.push(`pussy,`);
						}
						r.push(`someone rushes to try and undo the zipper. They succeed in clearing ${his}`);
						if (slave.mpreg === 1) {
							r.push(`anus,`);
						} else {
							r.push(`birth canal,`);
						}
						r.push(`allowing ${him} to carry on with childbirth.`);
					} else {
						r.push(`Quickly ${he} attempts to undo ${his} zipper but fails to do so before having to push out ${babyIntro}. ${He} can't hide what's happening between ${his} legs,`);
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
						r.push(`The latex covering ${his}`);
						if (slave.mpreg === 1) {
							r.push(`ass`);
						} else {
							r.push(`crotch`);
						}
						r.push(`bulges as ${his} child is born into it, making it even harder to unzip. As ${he} struggles between the newborn stuck in ${his}`);
						if (slave.mpreg === 1) {
							r.push(`asshole`);
						} else {
							r.push(`vagina`);
						}
						r.push(`and the equally stuck zipper, someone comes to ${his} aid allowing ${him} to finish giving birth.`);
					}
					break;

				case "a schutzstaffel uniform":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
					} else {
						r.push(`Quickly ${he} attempts to unfasten ${his} trousers but fails to do so before having to push out ${babyIntro}. As ${he} crowns into ${his} pants, ${he} can't hide the wetness and bulge between ${his}`);
						if (slave.mpreg === 1) {
							r.push(`buttocks,`);
						} else {
							r.push(`legs,`);
						}
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
						r.push(`With a little help, ${he} manages to escape ${his} clothes and finish giving birth.`);
					}
					break;

				case "a long qipao":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and begins pushing out ${babyIntro}.`);
						if (slave.fetish === "humiliation") {
							r.push(`${He} is disappointed that ${his} dress hides what's happening between ${his} legs.`);
						} else {
							r.push(`${He} does ${his} best to hide what's happening between ${his} legs.`);
						}
					}
					break;

				case "battlearmor":
				case "Imperial Plate":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
					} else {
						r.push(`Quickly ${he} attempts to unfasten ${his} armor but fails to do so before having to push out ${babyIntro}. As ${he} crowns into ${his} armor, ${he} can't hide the wetness and bulge between ${his}`);
						if (slave.mpreg === 1) {
							r.push(`buttocks,`);
						} else {
							r.push(`legs,`);
						}
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
						r.push(`With a little help, ${he} manages to escape ${his} armor and finish giving birth.`);
					}
					break;

				case "a mounty outfit":
				case "a police uniform":
				case "leather pants and pasties":
				case "leather pants":
				case "jeans":
				case "leather pants and a tube top":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
					} else {
						r.push(`Quickly ${he} attempts to unfasten ${his} slacks but fails to do so before having to push out ${babyIntro}. As ${he} crowns into ${his} pants, ${he} can't hide the wetness and bulge between ${his}`);
						if (slave.mpreg === 1) {
							r.push(`buttocks,`);
						} else {
							r.push(`legs,`);
						}
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
						r.push(`With a little help, ${he} manages to escape ${his} clothes and finish giving birth.`);
					}
					break;

				case "lederhosen":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
					} else {
						r.push(`Quickly ${he} attempts to unfasten ${his} shorts but fails to do so before having to push out ${babyIntro}. As ${he} crowns into ${his} shorts, ${he} can't hide the wetness and bulge between ${his}`);
						if (slave.mpreg === 1) {
							r.push(`buttocks,`);
						} else {
							r.push(`legs,`);
						}
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
						r.push(`With a little help, ${he} manages to escape ${his} clothes and finish giving birth.`);
					}
					break;

				case "a nice nurse outfit":
				case "a t-shirt and jeans":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching.`);
						if (slave.mpreg === 1) {
							r.push(`The seat of ${his} trousers`);
						} else {
							r.push(`${His} trousers`);
						}
						r.push(`bulge as ${his} baby crowns into them as ${he} continues ${his} tasks oblivious to the wetness and ${his} child's dilemma. Seeing ${him} in this state, someone manages to remove ${his} pants to allow ${his} body to finish giving birth.`);
					} else {
						r.push(`Quickly ${he} attempts to unfasten ${his} trousers but fails to do so before having to push out ${babyIntro}. As ${he} crowns into ${his} pants, ${he} can't hide the wetness and bulge between ${his}`);
						if (slave.mpreg === 1) {
							r.push(`buttocks,`);
						} else {
							r.push(`legs,`);
						}
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
						r.push(`With a little help, ${he} manages to escape ${his} clothes and finish giving birth.`);
					}
					break;

				case "a nice pony outfit":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching.`);
						if (slave.mpreg === 1) {
							r.push(`The seat of ${his} trousers`);
						} else {
							r.push(`${His} trousers`);
						}
						r.push(`bulge as ${his} baby crowns into them as ${he} continues ${his} tasks oblivious to the wetness and ${his} child's dilemma. Seeing ${him} in this state, someone manages to remove ${his} pants to allow ${his} body to finish giving birth.`);
					} else {
						r.push(`Quickly ${he} attempts to unfasten ${his} leather bodysuit but fails to do so before having to push out ${babyIntro}. As ${he} crowns into ${his} pants, ${he} can't hide the wetness and bulge between ${his}`);
						if (slave.mpreg === 1) {
							r.push(`buttocks,`);
						} else {
							r.push(`legs,`);
						}
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
						r.push(`With a little help, ${he} manages to escape ${his} clothes and finish giving birth.`);
					}
					break;

				case "a mini dress":
				case "a Santa dress":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and begins pushing out ${babyIntro}.`);
						if (slave.fetish === "humiliation") {
							r.push(`${He} is thrilled that ${his} short dress reveals what's happening between ${his} legs.`);
						} else {
							r.push(`${He} does ${his} best to hide what's happening between ${his} legs.`);
						}
					}
					break;

				case "a gothic lolita dress":
				case "a hanbok":
				case "a bra":
				case "a button-up shirt":
				case "a sweater":
				case "a tank-top":
				case "a tube top":
				case "a striped bra":
				case "a skimpy loincloth":
				case "a sports bra":
				case "a t-shirt":
				case "an oversized t-shirt":
				case "pasties":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and begins pushing out ${babyIntro}.`);
						if (slave.fetish === "humiliation") {
							r.push(`${He} is thrilled that ${his} dress reveals what's happening between ${his} legs.`);
						} else {
							r.push(`${He} does ${his} best to hide what's happening between ${his} legs.`);
						}
					}
					break;

				case "an apron":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and begins pushing out ${babyIntro}.`);
						if (slave.fetish === "humiliation") {
							r.push(`${He} is thrilled that ${his} frilly apron reveals what's happening between ${his} legs.`);
						} else {
							r.push(`${He} does ${his} best to hide what's happening between ${his} legs.`);
						}
					}
					break;

				case "a button-up shirt and panties":
				case "a slutty klan robe":
				case "a slutty pony outfit":
				case "a sweater and panties":
				case "a t-shirt and panties":
				case "a tank-top and panties":
				case "an oversized t-shirt and boyshorts":
				case "boyshorts":
				case "panties":
				case "panties and pasties":
				case "striped underwear":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and begins pushing out ${babyIntro}.`);
						if (slave.fetish === "humiliation") {
							r.push(`${He} is thrilled that ${his} underwear reveals what's happening between ${his} legs.`);
						} else {
							r.push(`${He} does ${his} best to hide what's happening between ${his} legs.`);
						}
					}
					break;

				case "a t-shirt and thong":
				case "a thong":
				case "a tube top and thong":
				case "a bimbo outfit":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the thong covering ${his}`);
						if (slave.mpreg === 1) {
							r.push(`anus.`);
						} else {
							r.push(`vagina.`);
						}
						r.push(`${He} crowns into the straining undergarment until the straps give out and clear ${his}`);
						if (slave.mpreg === 1) {
							r.push(`anus,`);
						} else {
							r.push(`birth canal,`);
						}
						r.push(`allowing ${him} to carry on with childbirth.`);
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart, pulls ${his} thong aside, and begins pushing out ${babyIntro}.`);
						if (slave.fetish === "humiliation") {
							r.push(`${He} is thrilled that what's happening between ${his} legs is visible for all to see.`);
						} else {
							r.push(`${He} does ${his} best to hide what's happening between ${his} legs.`);
						}
					}
					break;

				case "cutoffs":
				case "sport shorts and a t-shirt":
				case "sport shorts and a sports bra":
				case "a sweater and cutoffs":
				case "sport shorts":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and begins pushing out ${babyIntro}.`);
						if (slave.fetish === "humiliation") {
							r.push(`${He} is thrilled that ${his} shorts reveal what's happening between ${his} legs.`);
						} else {
							r.push(`${He} does ${his} best to hide what's happening between ${his} legs.`);
						}
					}
					break;

				case "a one-piece swimsuit":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to the obvious wetness forming`);
						if (slave.mpreg === 1) {
							r.push(`under ${his} rear.`);
						} else {
							r.push(`over ${his} crotch.`);
						}
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and begins pushing out ${babyIntro}.`);
						if (slave.fetish === "humiliation") {
							r.push(`${He} is thrilled that ${his} swimsuit fully reveals what's happening between ${his} legs.`);
						} else {
							r.push(`${He} does ${his} best to hide what's happening between ${his} legs.`);
						}
					}
					break;

				case "a courtesan dress":
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching the show under ${his} parted dress.`);
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart, parting ${his} skirt, and begins pushing out ${babyIntro}. ${He} can't hide what's happening between ${his} legs since ${his} dress makes it clear something is going on down there,`);
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
					}
					break;

				default:
					if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`${babies}, indifferent to who may be watching ${his} naked`);
						if (slave.mpreg === 1) {
							r.push(`ass.`);
						} else {
							r.push(`pussy.`);
						}
					} else {
						r.push(`Quickly ${he} spreads ${his} legs apart and begins pushing out ${babyIntro}. ${He} can't hide what's happening between ${his} legs,`);
						if (slave.fetish === "humiliation") {
							r.push(`but that only makes it more exciting.`);
						} else {
							r.push(`so ${he} bears with it.`);
						}
					}
			}
		} else if (App.Data.clothes.get(slave.clothes).exposure > 3) {
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`Instinctively, ${he} begins to push out`);
				if (slave.broodmother > 0) {
					if (slave.counter.birthsTotal === 0) {
						r.push(`${his} first`);
					} else {
						r.push(`this week's`);
					}
				} else {
					r.push(his);
				}
				r.push(`${babies}, indifferent to who may be watching ${his} naked`);
				if (slave.mpreg === 1) {
					r.push(`ass.`);
				} else {
					r.push(`pussy.`);
				}
			} else {
				r.push(`Quickly ${he} spreads ${his} legs apart and begins pushing out ${babyIntro}. ${He} can't hide what's happening between ${his} legs,`);
				if (slave.fetish === "humiliation") {
					r.push(`but that only makes it more exciting.`);
				} else {
					r.push(`so ${he} bears with it.`);
				}
			}
		} else {
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`${He} removes ${his}`);
				switch (slave.clothes) {
					case "a slutty pony outfit":
						r.push(`slutty pony outfit`);
						break;
					case "a slutty klan robe":
						r.push(`slutty klan robe`);
						break;
					case "a police uniform":
						r.push(`police uniform`);
						break;
					case "a nice pony outfit":
						r.push(`nice pony outfit`);
						break;
					case "a hanbok":
						r.push(`hanbok`);
						break;
					case "a gothic lolita dress":
						r.push(`gothic lolita dress`);
						break;
					case "a slutty maid outfit":
						r.push(`slutty maid outfit`);
						break;
					case "a slutty nurse outfit":
						r.push(`slutty nurse outfit`);
						break;
					case "a schoolgirl outfit":
						r.push(`schoolgirl outfit`);
						break;
					case "a cheerleader outfit":
						r.push(`cheerleader outfit`);
						break;
					case "a slutty qipao":
						r.push(`slutty qipao`);
						break;
					case "a chattel habit":
						r.push(`chattel habit`);
						break;
					case "a toga":
						r.push(`toga`);
						break;
					case "a huipil":
						r.push(`huipil`);
						break;
					case "a fallen nuns habit":
						r.push(`fallen nun's habit`);
						break;
					case "a succubus outfit":
						r.push(`succubus outfit`);
						break;
					case "a klan robe":
						r.push(`klan robe`);
						break;
					case "cutoffs and a t-shirt":
						r.push(`cutoffs and t-shirt`);
						break;
					case "a mini dress":
						r.push(`mini dress`);
						break;
					case "a military uniform":
						r.push(`military uniform`);
						break;
					case "a schutzstaffel uniform":
						r.push(`schutzstaffel uniform`);
						break;
					case "a slutty schutzstaffel uniform":
						r.push(`slutty schutzstaffel uniform`);
						break;
					case "a red army uniform":
						r.push(`red army uniform`);
						break;
					case "a confederate army uniform":
						r.push(`confederate army uniform`);
						break;
					case "a long qipao":
						r.push(`long qipao`);
						break;
					case "battlearmor":
						r.push(`battlearmor`);
						break;
					case "Imperial Plate":
						r.push(`imperial armor`);
						break;
					case "a mounty outfit":
						r.push(`mounty uniform`);
						break;
					case "a dirndl":
						r.push(`dirndl`);
						break;
					case "lederhosen":
						r.push(`lederhosen`);
						break;
					case "a biyelgee costume":
						r.push(`biyelgee costume`);
						break;
					case "an apron":
						r.push(`apron`);
						break;
					case "a string bikini":
						r.push(`string bikini`);
						break;
					case "a scalemail bikini":
						r.push(`scalemail bikini`);
						break;
					case "a kimono":
						r.push(`kimono`);
						break;
					case "a slave gown":
						r.push(`slave gown`);
						break;
					case "a hijab and abaya":
					case "a niqab and abaya":
						r.push(`abaya`);
						break;
					case "a halter top dress":
						r.push(`halter top dress`);
						break;
					case "a ball gown":
						r.push(`ball gown`);
						break;
					case "an evening dress":
						r.push(`evening dress`);
						break;
					case "a maternity dress":
						r.push(`maternity dress`);
						break;
					case "a slutty outfit":
						r.push(`slutty outfit`);
						break;
					case "a nice maid outfit":
						r.push(`nice maid outfit`);
						break;
					case "a leotard":
						r.push(`leotard`);
						break;
					case "a hijab and blouse":
						r.push(`skirt`);
						break;
					case "a burqa":
						r.push(`burqa`);
						break;
					case "a burkini":
						r.push(`burkini`);
						break;
					case "a monokini":
						r.push(`monokini`);
						break;
					case "a cybersuit":
						r.push(`cybersuit`);
						break;
					case "a tight Imperial bodysuit":
						r.push(`bodysuit`);
						break;
					case "a comfortable bodysuit":
						r.push(`comfortable bodysuit`);
						break;
					case "a bunny outfit":
						r.push(`bunny outfit`);
						break;
					case "a nice nurse outfit":
						r.push(`nice nurse outfit`);
						break;
					case "a latex catsuit":
						r.push(`latex catsuit`);
						break;
					case "stretch pants and a crop-top":
						r.push(`stretch pants`);
						break;
					case "spats and a tank top":
						r.push(`spats`);
						break;
					case "a tube top and thong":
					case "a thong":
					case "a t-shirt and thong":
					case "a bimbo outfit":
						r.push(`thong`);
						break;
					case "a button-up shirt and panties":
						r.push(`panties`);
						break;
					case "a bra":
						r.push(`bra`);
						break;
					case "a button-up shirt":
						r.push(`button-up shirt`);
						break;
					case "a sweater":
						r.push(`sweater`);
						break;
					case "a tank-top":
						r.push(`tank-top`);
						break;
					case "a tube top":
						r.push(`tube top`);
						break;
					case "a one-piece swimsuit":
						r.push(`swimsuit`);
						break;
					case "a striped bra":
						r.push(`bra`);
						break;
					case "a skimpy loincloth":
						r.push(`loincloth`);
						break;
					case "a sports bra":
						r.push(`sports bra`);
						break;
					case "a t-shirt":
						r.push(`t-shirt`);
						break;
					case "an oversized t-shirt and boyshorts":
						r.push(`boy shorts`);
						break;
					case "an oversized t-shirt":
						r.push(`t-shirt`);
						break;
					case "a t-shirt and jeans":
						r.push(`blue jeans`);
						break;
					case "boyshorts":
						r.push(`boy shorts`);
						break;
					case "cutoffs":
						r.push(`jean shorts`);
						break;
					case "leather pants and pasties":
						r.push(`leather pants`);
						break;
					case "leather pants":
						r.push(`leather pants`);
						break;
					case "panties":
					case "a t-shirt and panties":
					case "panties and pasties":
					case "striped underwear":
					case "a tank-top and panties":
					case "a sweater and panties":
						r.push(`panties`);
						break;
					case "sport shorts and a t-shirt":
						r.push(`shorts`);
						break;
					case "sport shorts and a sports bra":
						r.push(`shorts`);
						break;
					case "jeans":
						r.push(`blue jeans`);
						break;
					case "a sweater and cutoffs":
						r.push(`jean shorts`);
						break;
					case "leather pants and a tube top":
						r.push(`leather pants`);
						break;
					case "sport shorts":
						r.push(`shorts`);
						break;
					case "a Santa dress":
						r.push(`Santa dress`);
						break;
					case "a courtesan dress":
						r.push(`courtesan dress`);
						break;
					default:
						r.push(slave.clothes);
				}
				r.push(`as instinct takes hold compelling ${him} to begin pushing. ${He} pays no mind to who may be watching ${his} naked`);
				if (slave.mpreg === 1) {
					r.push(`rear`);
				} else {
					r.push(`crotch`);
				}
				r.push(`as`);
				if (slave.broodmother > 0) {
					if (slave.counter.birthsTotal === 0) {
						r.push(`${his} first`);
					} else {
						r.push(`this week's`);
					}
					r.push(`baby`);
				} else {
					r.push(his);
					if (slave.pregType > 1) {
						r.push(`first`);
					}
					r.push(`baby`);
				}
				r.push(`begins to crown.`);
			} else {
				r.push(`${He} hastily removes ${his}`);
				switch (slave.clothes) {
					case "a slutty pony outfit":
						r.push(`slutty pony outfit`);
						break;
					case "a slutty klan robe":
						r.push(`slutty klan robe`);
						break;
					case "a police uniform":
						r.push(`police uniform`);
						break;
					case "a nice pony outfit":
						r.push(`nice pony outfit`);
						break;
					case "a hanbok":
						r.push(`hanbok`);
						break;
					case "a gothic lolita dress":
						r.push(`gothic lolita dress`);
						break;
					case "a slutty maid outfit":
						r.push(`slutty maid outfit`);
						break;
					case "a slutty nurse outfit":
						r.push(`slutty nurse outfit`);
						break;
					case "a schoolgirl outfit":
						r.push(`schoolgirl outfit`);
						break;
					case "a cheerleader outfit":
						r.push(`cheerleader outfit`);
						break;
					case "a slutty qipao":
						r.push(`slutty qipao`);
						break;
					case "a chattel habit":
						r.push(`chattel habit`);
						break;
					case "a toga":
						r.push(`toga`);
						break;
					case "a huipil":
						r.push(`huipil`);
						break;
					case "a fallen nuns habit":
						r.push(`fallen nun's habit`);
						break;
					case "a succubus outfit":
						r.push(`succubus outfit`);
						break;
					case "a klan robe":
						r.push(`klan robe`);
						break;
					case "cutoffs and a t-shirt":
						r.push(`cutoffs and t-shirt`);
						break;
					case "a mini dress":
						r.push(`mini dress`);
						break;
					case "a military uniform":
						r.push(`military uniform`);
						break;
					case "a schutzstaffel uniform":
						r.push(`schutzstaffel uniform`);
						break;
					case "a slutty schutzstaffel uniform":
						r.push(`slutty schutzstaffel uniform`);
						break;
					case "a red army uniform":
						r.push(`red army uniform`);
						break;
					case "a confederate army uniform":
						r.push(`confederate army uniform`);
						break;
					case "a long qipao":
						r.push(`long qipao`);
						break;
					case "battlearmor":
						r.push(`battlearmor`);
						break;
					case "Imperial Plate":
						r.push(`imperial armor	`);
						break;
					case "a mounty outfit":
						r.push(`mounty uniform`);
						break;
					case "a dirndl":
						r.push(`dirndl`);
						break;
					case "lederhosen":
						r.push(`lederhosen`);
						break;
					case "a biyelgee costume":
						r.push(`biyelgee costume`);
						break;
					case "an apron":
						r.push(`apron`);
						break;
					case "a string bikini":
						r.push(`string bikini`);
						break;
					case "a scalemail bikini":
						r.push(`scalemail bikini`);
						break;
					case "a kimono":
						r.push(`kimono`);
						break;
					case "a slave gown":
						r.push(`slave gown`);
						break;
					case "a hijab and abaya":
					case "a niqab and abaya":
						r.push(`abaya`);
						break;
					case "a halter top dress":
						r.push(`halter top dress`);
						break;
					case "a ball gown":
						r.push(`ball gown`);
						break;
					case "an evening dress":
						r.push(`evening dress`);
						break;
					case "a maternity dress":
						r.push(`maternity dress`);
						break;
					case "a slutty outfit":
						r.push(`slutty outfit`);
						break;
					case "a nice maid outfit":
						r.push(`nice maid outfit`);
						break;
					case "a leotard":
						r.push(`leotard`);
						break;
					case "a hijab and blouse":
						r.push(`skirt`);
						break;
					case "a burqa":
						r.push(`burqa`);
						break;
					case "a burkini":
						r.push(`burkini`);
						break;
					case "a monokini":
						r.push(`monokini`);
						break;
					case "a cybersuit":
						r.push(`cybersuit`);
						break;
					case "a tight Imperial bodysuit":
						r.push(`bodysuit`);
						break;
					case "a comfortable bodysuit":
						r.push(`comfortable bodysuit`);
						break;
					case "a bunny outfit":
						r.push(`bunny outfit`);
						break;
					case "a nice nurse outfit":
						r.push(`nice nurse outfit`);
						break;
					case "a latex catsuit":
						r.push(`latex catsuit`);
						break;
					case "stretch pants and a crop-top":
						r.push(`stretch pants`);
						break;
					case "spats and a tank top":
						r.push(`spats`);
						break;
					case "a tube top and thong":
						r.push(`thong`);
						break;
					case "a button-up shirt and panties":
						r.push(`panties`);
						break;
					case "a bra":
						r.push(`bra`);
						break;
					case "a button-up shirt":
						r.push(`button-up shirt`);
						break;
					case "a sweater":
						r.push(`sweater`);
						break;
					case "a tank-top":
						r.push(`tank-top`);
						break;
					case "a thong":
						r.push(`thong`);
						break;
					case "a tube top":
						r.push(`tube top`);
						break;
					case "a one-piece swimsuit":
						r.push(`swimsuit`);
						break;
					case "a striped bra":
						r.push(`bra`);
						break;
					case "a skimpy loincloth":
						r.push(`loincloth`);
						break;
					case "a sports bra":
						r.push(`sports bra`);
						break;
					case "a sweater and panties":
						r.push(`panties`);
						break;
					case "a t-shirt":
						r.push(`t-shirt`);
						break;
					case "a tank-top and panties":
						r.push(`panties`);
						break;
					case "a t-shirt and thong":
						r.push(`thong`);
						break;
					case "an oversized t-shirt and boyshorts":
						r.push(`boy shorts`);
						break;
					case "an oversized t-shirt":
						r.push(`t-shirt`);
						break;
					case "a t-shirt and jeans":
						r.push(`blue jeans`);
						break;
					case "boyshorts":
						r.push(`boy shorts`);
						break;
					case "cutoffs":
						r.push(`jean shorts`);
						break;
					case "leather pants and pasties":
						r.push(`leather pants`);
						break;
					case "leather pants":
						r.push(`leather pants`);
						break;
					case "panties":
						r.push(`panties`);
						break;
					case "sport shorts and a t-shirt":
						r.push(`shorts`);
						break;
					case "a t-shirt and panties":
						r.push(`panties`);
						break;
					case "panties and pasties":
						r.push(`panties`);
						break;
					case "striped underwear":
						r.push(`panties`);
						break;
					case "sport shorts and a sports bra":
						r.push(`shorts`);
						break;
					case "jeans":
						r.push(`blue jeans`);
						break;
					case "a sweater and cutoffs":
						r.push(`jean shorts`);
						break;
					case "leather pants and a tube top":
						r.push(`leather pants`);
						break;
					case "sport shorts":
						r.push(`shorts`);
						break;
					case "a Santa dress":
						r.push(`Santa dress`);
						break;
					case "a courtesan dress":
						r.push(`courtesan dress`);
						break;
					case "a bimbo outfit":
						r.push(`thong`);
						break;
					default:
						r.push(slave.clothes);
				}
				r.push(`and tosses it aside. Quickly ${he} spreads ${his} legs and begins pushing out`);
				if (slave.broodmother > 0) {
					if (slave.counter.birthsTotal === 0) {
						r.push(`${his} first`);
					} else {
						r.push(`this week's`);
					}
					r.push(`baby${UH}.`);
				} else {
					r.push(`${his} ${babies}${UH}.`);
				}
				r.push(`${He} can't hide what's happening between ${his} legs,`);
				if (slave.fetish === "humiliation") {
					r.push(`but that only makes it more exciting.`);
				} else {
					r.push(`so ${he} bears with it.`);
				}
			}
		}
		App.Events.addParagraph(el, r);
		return el;
	}
};

/**
 * Sends newborns to incubator or nursery
 * @param {App.Entity.SlaveState} mom
 * @param {App.Entity.Fetus[]} babiesBeingBorn ovum objects
 * @returns {App.Entity.Fetus[]} remaining ova
 */
globalThis.sendNewbornsToFacility = function(mom, babiesBeingBorn, sendAll) {
	const remainingBabies = [];
	for (const ovum of babiesBeingBorn) {
		if ((ovum.reserve === "incubator" || sendAll) && V.incubator.tanks.length < V.incubator.capacity) {
			if (ovum.noticeData.child !== undefined) {
				App.Facilities.Incubator.newChild(ovum.noticeData.child, "tankSetting" in ovum ? ovum.tankSetting : null);
			} else {
				App.Facilities.Incubator.newChild(generateChild(mom, ovum, true), "tankSetting" in ovum ? ovum.tankSetting : null);
			}
		} else if ((ovum.reserve === "nursery" || sendAll) && V.cribs.length < V.nurseryCribs) {
			// TODO:@franklygeorge handling for ovum.noticeData.child. Long term we probably just want to convert InfantState into an extension of SlaveState, or maybe just convert it to SlaveState
			App.Facilities.Nursery.newChild(generateChild(mom, ovum));
		} else {
			remainingBabies.push(ovum);
		}
	}
	return remainingBabies;
};
