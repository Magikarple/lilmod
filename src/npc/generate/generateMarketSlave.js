/* eslint-disable camelcase */
// cSpell:ignore WCPU

/**
 * @param {FC.SlaveMarketName} [market="kidnappers"]
 * @param {number} [numArcology=1] Defaults to 1 (V.arcologies[1]) since it refers to neighboring arcology, and V.arcologies[0] is the player's arcology.
 * @returns {{text: string, slave: FC.GingeredSlave}}
 */
globalThis.generateMarketSlave = function(market = "kidnappers", numArcology = 1) {
	let r = ``;
	let slave;
	let SGProp = new GenerateNewSlavePram();

	switch (market) {
		case "corporate": {
			if (V.corp.SpecAge === 1) {
				r += `Teenage slaves are strongly favored for training. `;
				SGProp.minAge = V.minimumSlaveAge;
				SGProp.maxAge = 19;
			} else if (V.corp.SpecAge === 3) {
				r += `Newly enslaved MILFs are strongly favored for training. `;
				if (V.pedo_mode === 1) {
					SGProp.minAge = 24;
					SGProp.maxAge = V.retirementAge - 1;
				} else {
					SGProp.minAge = 36;
					SGProp.maxAge = V.retirementAge - 1;
				}
			} else {
				r += `Promising slaves are trained without special sorting based on age. `;
			}
			SGProp.ageOverridesPedoMode = 1;
			if (V.corp.SpecRaces.length > 0) {
				SGProp.race = jsEither(V.corp.SpecRaces);
			}
			if (V.corp.SpecNationality) {
				SGProp.nationality = V.corp.SpecNationality;
				r += `The corporation only takes slaves that are ${V.corp.SpecNationality}. `;
			}

			// Generate slaves. Modify fixed before this. Do not modify slave before this.
			if (V.corp.SpecGender === 1) {
				r += `Slaves without pussies are not trained. `;
				slave = GenerateNewSlave("XX", SGProp);
			} else if (V.corp.SpecGender === 2) {
				r += `Slaves without dicks are not trained. `;
				slave = GenerateNewSlave("XY", SGProp);
			} else {
				r += `Slaves are passed to training regardless of whether they have dicks or pussies. `;
				slave = GenerateNewSlave(null, SGProp);
			}

			slave.origin = "$He was enslaved and trained by your corporation.";
			slave.devotion = jsRandom(-30, 0);
			slave.trust = jsRandom(-45, -25);
			setHealth(slave, jsRandom(25, 50), Math.max(normalRandInt(0, 4), 0), Math.max(normalRandInt(0, 4), 0), Math.max(normalRandInt(0, 0.5), 0), jsRandom(10, 40));
			generateSalonModifications(slave);
			if (V.corp.SpecDevotion > 0) {
				slave.devotion = jsRandom(-120, -90) + V.corp.SpecDevotion * 30;
				if (V.corp.SpecDevotion === 1) {
					r += `It does everything it can to make trainees furious. `;
				} else if (V.corp.SpecDevotion === 2) {
					r += `It makes no effort to tame trainees. `;
				} else if (V.corp.SpecDevotion === 4) {
					r += `It focuses on selecting trainees predisposed towards obedience. `;
				} else if (V.corp.SpecDevotion === 5) {
					r += `It focuses on selecting trainees predisposed towards devotion to their owner. `;
				}
			} else {
				r += `It does not select trainees based on their initial feelings about slavery. `;
			}
			if (V.corp.SpecIntelligence === 3) {
				r += `Intelligent slaves have a high priority for training. `;
				slave.intelligence = Intelligence.random({limitIntelligence: [30, 100]});
			} else if (V.corp.SpecIntelligence === 1) {
				r += `Stupid slaves have a high priority for training. `;
				slave.intelligence = Intelligence.random({limitIntelligence: [-100, -30]});
			} else {
				r += `Slaves' intelligence is not given special consideration. `;
			}
			if (V.corp.SpecRaces.length === 0 || V.corp.SpecRaces.length === 12) {
				r += `There is no racial element to trainee selection. `;
			} else if (V.corp.SpecRaces.length === 1) {
				r += `The corporation specializes in ${V.corp.SpecRaces[0]} slaves. `;
			} else {
				r += `The corporation selects slaves based on race. `; /* getting into the specifics of which races exactly is a hellhole I'd rather not jump into*/
			}
			if (V.corp.SpecTrust > 0) {
				slave.trust = jsRandom(-105, -85) + V.corp.SpecTrust * 20;
				if (V.corp.SpecTrust === 1) {
					r += `The corporation applies extremely brutal slave breaking techniques, uncontrollable sobbing and bloodcurdling screams are heard around the clock. `;
				} else if (V.corp.SpecTrust === 2) {
					r += `The corporation applies brutal slave breaking techniques. `;
				} else if (V.corp.SpecTrust === 4) {
					r += `The corporation applies caring slave breaking techniques. `;
				} else {
					r += `The corporation applies surprisingly caring slave breaking techniques that sometimes convince refugees and similar downtrodden people that slavery is a step up for them. `;
				}
			} else {
				r += `The corporation applies standard slave breaking techniques. `;
			}
			if (V.corp.SpecHeight > 0) {
				// target a narrow range of slave heights
				let minMult = V.corp.SpecHeight - 4;
				let maxMult = V.corp.SpecHeight - 2;
				if (V.corp.SpecHeight === 1) {
					r += `The corporation specifically targets very short slaves. `;
					minMult = -5; // do not limit shortness
				} else if (V.corp.SpecHeight === 2) {
					r += `The corporation targets short slaves. `;
				} else if (V.corp.SpecHeight === 4) {
					r += `The corporation targets tall slaves. `;
				} else if (V.corp.SpecHeight === 5) {
					r += `The corporation specifically targets incredibly tall slaves. `;
					maxMult = 5; // do not limit tallness
				}
				slave.natural.height = Height.randomAdult(slave, {skew: V.corp.SpecHeight - 3, limitMult: [minMult, maxMult]});
				slave.height = Height.forAge(slave.natural.height, slave);
			}
			if (V.corp.SpecVirgin === 1) {
				r += `The corporation ensures its slaves are virgins. `;
				slave.anus = 0;
				if (slave.vagina > 0) {
					slave.vagina = 0;
				}
			}
			if (V.corp.SpecWeight > 0) {
				slave.weight = jsRandom(-85 + V.corp.SpecWeight * 20, -65 + V.corp.SpecWeight * 30);
				if (V.corp.SpecWeight === 1) { // weight -65 to -35
					r += `Trainees are practically starved through a rigorous diet. `;
				} else if (V.corp.SpecWeight === 2) { // -45 to -5
					r += `Trainees are put on a diet to get them nice and thin. `;
				} else if (V.corp.SpecWeight === 3) { // -25 to 25
					r += `Thin trainees are fattened up; fat trainees are slimmed down. `;
				} else if (V.corp.SpecWeight === 5) { // 15 to 85
					r += `Trainees are fattened until they're nice and curvy. `;
				} else { // V.corp.SpecWeight === 6; weight 35 to 115
					r += `Trainees are fed as much as they can stomach. `;
				}
			} else {
				r += `Only the unhealthiest trainees are fed special diets. `;
			}
			if (V.corp.SpecMuscle > 0) {
				slave.muscles = jsRandom(-85, -65) + V.corp.SpecMuscle * 25;
				if (V.corp.SpecMuscle === 1) { // muscles -60 to -40
					r += `Trainees are kept physically inactive and frail. `;
				} else if (V.corp.SpecMuscle === 2) { // -35 to -15
					r += `Trainees are kept physically weak. `;
				} else if (V.corp.SpecMuscle === 3) { // -10 to 10
					r += `Trainees' muscles are kept soft. `;
				} else if (V.corp.SpecMuscle === 4) { // 15 to 35
					r += `Trainees are brought up to a good state of physical fitness. `;
				} else if (V.corp.SpecMuscle === 5) { // 40 to 60
					r += `Trainees are subjected to punishing workout routines and only sold when ripped. `;
				}
			} else {
				r += `Trainees are not subjected to any special workout routine. `;
			}
			if (V.corp.SpecAccent === 1) {
				r += `The corporation teaches its trainees the lingua franca but allows them to retain distinctive accents. `;
				slave.accent = Math.clamp(slave.accent, 0, 1);
			} else if (V.corp.SpecAccent === 2) {
				r += `The corporation teaches its trainees to speak the lingua franca without accent. `;
				slave.accent = 0;
			} else {
				r += `The corporation does not expend any special effort teaching language. `;
			}
			if (V.corp.SpecEducation > 0) {
				slave.intelligenceImplant = 15 * V.corp.SpecEducation;
				slave.skill.whoring = Math.clamp(slave.skill.whoring, 15 * V.corp.SpecEducation, 100);
				slave.skill.entertainment = Math.clamp(slave.skill.entertainment, 15 * V.corp.SpecEducation, 100);
				if (V.corp.SpecEducation === 1) {
					r += `Its slave students receive basic slave educations. `;
				} else if (V.corp.SpecEducation === 2) {
					r += `Its slave students receive advanced slave educations. `;
				}
			} else {
				r += `Its slaves are not given special educational attention. `;
			}
			if (V.corp.SpecSexEd > 0) {
				slave.skill.oral = Math.clamp(slave.skill.oral, 15 * V.corp.SpecSexEd, 100);
				if (slave.anus > 0) {
					slave.skill.anal = Math.clamp(slave.skill.anal, 15 * V.corp.SpecSexEd, 100);
				} else if (slave.anus === 0) {
					slave.skill.anal = Math.clamp(slave.skill.anal, 15, 100);
				}
				if (slave.vagina > 0) {
					slave.skill.vaginal = Math.clamp(slave.skill.vaginal, 15 * V.corp.SpecSexEd, 100);
				} else if (slave.vagina === 0) {
					slave.skill.vaginal = Math.clamp(slave.skill.vaginal, 15, 100);
				}
				if (canAchieveErection(slave)) {
					slave.skill.penetrative = Math.clamp(slave.skill.penetrative, 15 * V.corp.SpecSexEd, 100);
				}
				if (V.corp.SpecSexEd === 1) {
					r += `Trainees spend many hours learning sexual competence. `;
				} else if (V.corp.SpecSexEd === 2) {
					r += `Trainees spend days learning sexual skills. `;
				}
			} else {
				r += `No special sexual training is applied. `;
			}
			if (V.corp.SpecCosmetics === 1) {
				r += `The corporation uses subtle cosmetic surgery to improve its slaves for sale. `;
				if (slave.anus > 3) {
					slave.anus = 3;
					if (slave.skill.anal > 10) {
						slave.skill.anal -= 10;
					}
				}
				if (slave.vagina > 3) {
					slave.vagina = 3;
					if (slave.skill.vaginal > 10) {
						slave.skill.vaginal -= 10;
					}
				}
				if (slave.faceImplant <= 30 && slave.face <= 95) {
					if (slave.faceShape === "masculine") {
						slave.faceShape = "androgynous";
					}
					slave.faceImplant = 20;
					slave.face = Math.clamp(slave.face + 20, -100, 100);
				}
				if ((slave.ageImplant !== 1) && (slave.visualAge >= 25)) {
					applyAgeImplant(slave);
				}
				if ((slave.voice === 1) && (slave.voiceImplant === 0)) {
					slave.voice += 1;
					slave.voiceImplant += 1;
				}
				slave.waist = Math.clamp(slave.waist, -100, -15);
				if (((slave.boobShape === "saggy") || (slave.boobShape === "downward-facing") || (slave.boobShape === "spherical"))) {
					slave.boobShape = "normal";
				}
				if (((slave.boobShape === "normal") || (slave.boobShape === "wide-set"))) {
					if (slave.boobs > 800) {
						slave.boobShape = "torpedo-shaped";
					} else {
						slave.boobShape = "perky";
					}
				}
			} else {
				r += `The corporation does not use cosmetic surgery to improve its slaves for sale. `;
			}
			if (V.corp.SpecPussy === 1) {
				r += `The corporation adds pussies where needed. `;
				slave.vagina = 0;
				slave.ovaries = 1;
			} else if (V.corp.SpecPussy === -1) {
				r += `The corporation removes pussies where possible. `;
				slave.vagina = -1;
				slave.ovaries = 0;
			}
			if (V.corp.SpecDick === 1) {
				r += `The corporation adds dicks where needed. `;
				slave.dick = 2;
				slave.prostate = 1;
			} else if (V.corp.SpecDick === -1) {
				r += `The corporation removes dicks where possible. `;
				slave.dick = 0;
				slave.prostate = 0;
				slave.skill.penetrative = Math.clamp(slave.skill.penetrative - 15, 0, 100);
			}
			if (V.corp.SpecBalls === 1 && slave.dick > 0) {
				r += `The corporation adds balls where needed. `;
				slave.balls = 2;
				slave.scrotum = 2;
			} else if (V.corp.SpecBalls === -1) {
				r += `The corporation removes balls where possible. `;
				slave.balls = 0;
				slave.scrotum = 0;
			}
			if (typeof V.corp.SpecPussy === "undefined" && typeof V.corp.SpecDick === "undefined" && typeof V.corp.SpecBalls === "undefined") {
				r += `The corporation does not reconfigure slave genitalia. `;
			} else {
				slave.canRecruit = 0; // reconfiguring genitals before creating genepool records means we can't reliably create relatives
			}
			if (V.corp.SpecHormones === 1) {
				r += `It applies almost universal female hormone therapy. `;
				if (slave.dick > 0) {
					slave.dick = Math.clamp(slave.dick - 1, 1, 6);
				}
				if (slave.balls > 0) {
					slave.balls = Math.clamp(slave.balls - 1, 1, 6);
				}
				if (slave.clit > 0) {
					slave.clit = Math.clamp(slave.clit - 1, 0, 3);
				}
				if ((slave.voice < 3) && (slave.voice > 0)) {
					slave.voice = Math.clamp(slave.voice + 1, 1, 3);
				}
				if ((slave.vagina > -1) && (slave.ovaries !== 0) && (slave.vaginaLube < 2)) {
					slave.vaginaLube = Math.clamp(slave.vaginaLube + 1, 0, 2);
				}
				if ((slave.butt - slave.buttImplant) < 2) {
					slave.butt = Math.clamp(slave.butt + 1, 0, 20);
				}
				if (((slave.boobs - slave.boobsImplant) < 500)) {
					slave.boobs = Math.clamp(slave.boobs + 400, 0, 50000);
				}
				if (slave.face <= 95) {
					slave.face = Math.clamp(slave.face + 20, -100, 100);
				}
				if (slave.faceShape === "masculine") {
					slave.faceShape = "androgynous";
				} else if (slave.faceShape === "androgynous") {
					slave.faceShape = "normal";
				}
				if (slave.physicalAge < 25) {
					slave.shoulders = Math.clamp(slave.shoulders - 1, -2, 2);
					slave.hips = Math.clamp(slave.hips + 1, -2, 2);
				}
				if ((slave.muscles > 30) && (slave.diet !== "muscle building") && !(V.corp.SpecMuscle > 3)) {
					slave.muscles = Math.clamp(slave.muscles - 10, 0, 30);
				}
				if (slave.nipples === "tiny") {
					slave.nipples = "cute";
				}
				if (slave.height > 180) {
					slave.height -= jsRandom(3, 6);
				}
				slave.devotion += jsRandom(5, 10);
				slave.trust += jsRandom(5, 10);
				slave.attrXY = Math.clamp(slave.attrXY + jsRandom(5, 10), 0, 100);
			} else if (V.corp.SpecHormones === 2) {
				r += `It applies almost universal male hormone therapy. `;
				if (slave.dick > 0) {
					slave.dick = Math.clamp(slave.dick + 1, 1, 6);
				}
				if (slave.balls > 0) {
					slave.balls = Math.clamp(slave.balls + 1, 1, 6);
				}
				if ((slave.clit > 0) && (slave.dick === 0)) {
					slave.clit = Math.clamp(slave.clit + 1, 0, 3);
				}
				if (slave.voice > 1) {
					slave.voice = Math.clamp(slave.voice - 1, 1, 3);
				}
				if ((slave.vagina > -1) && (slave.vaginaLube > 0)) {
					slave.vaginaLube = Math.clamp(slave.vaginaLube - 1, 0, 2);
				}
				slave.butt = Math.clamp(slave.butt - 1, 0, 20);
				slave.boobs = Math.clamp(slave.boobs - 400, 0, 50000);
				if (slave.face > 10) {
					slave.face = Math.clamp(slave.face - 20, -100, 100);
				}
				if (slave.faceShape === "androgynous" || slave.faceShape === "masculine" || slave.faceShape === "normal") {
					slave.faceShape = "masculine";
				} else {
					slave.faceShape = "androgynous";
				}
				if (slave.physicalAge < 25) {
					slave.shoulders = Math.clamp(slave.shoulders + 1, -2, 2);
					slave.hips = Math.clamp(slave.hips - 1, -2, 2);
				}
				if ((slave.muscles <= 95) && (slave.diet !== "slimming")) {
					slave.muscles = Math.clamp(slave.muscles + 20, 0, 3);
				}
				if (slave.nipples === "huge") {
					slave.nipples = "cute";
				}
				if (slave.height < 155) {
					slave.height += jsRandom(3, 6);
				}
				slave.devotion -= jsRandom(5, 10);
				slave.trust -= jsRandom(5, 10);
				slave.attrXX = Math.clamp(slave.attrXX + jsRandom(5, 10), 0, 100);
			} else {
				r += `It does not use hormones on a systematic level. `;
			}
			if (V.corp.SpecInjection > 0) {
				if (V.corp.SpecInjection === 1) {
					r += `If anything, hormones are used to reduce asset sizes. `;
					slave.lips = jsRandom(0, 20);
					slave.butt = jsRandom(1, 2);
					slave.boobs = 10 * jsRandom(30, 60);
					slave.nipples = jsEither(["cute", "tiny"]);
					if (slave.dick > 0) {
						slave.dick = jsRandom(1, 2);
					}
					if (slave.balls > 0) {
						slave.balls = jsRandom(1, 2);
					}
				} else if (V.corp.SpecInjection === 2) {
					r += `Growth hormones are used to correct flat chests and butts. `;
					slave.lips = jsRandom(25, 45);
					slave.butt = jsRandom(3, 4);
					slave.boobs = 10 * jsRandom(70, 100);
					slave.nipples = jsEither(["cute", "partially inverted"]);
					if (slave.dick > 0) {
						slave.dick = jsRandom(3, 4);
					}
					if (slave.balls > 0) {
						slave.balls = jsRandom(3, 4);
					}
				} else if (V.corp.SpecInjection === 3) {
					r += `Growth hormones are used throughout slave training to ensure expansion. `;
					slave.lips = jsRandom(35, 55);
					slave.butt = jsRandom(4, 5);
					slave.boobs = 10 * jsRandom(120, 180);
					slave.nipples = jsEither(["cute", "partially inverted"]);
					if (slave.dick > 0) {
						slave.dick = jsRandom(4, 5);
					}
					if (slave.balls > 0) {
						slave.balls = jsRandom(4, 5);
					}
				} else if (V.corp.SpecInjection === 4) {
					r += `Advanced growth hormones are applied on a grand scale. `;
					slave.lips = jsRandom(55, 85);
					slave.butt = jsRandom(6, 8);
					slave.boobs = 100 * jsRandom(40, 60);
					slave.nipples = jsEither(["huge", "inverted"]);
					if (slave.dick > 0) {
						slave.dick = jsRandom(5, 6);
					}
					if (slave.balls > 0) {
						slave.balls = jsRandom(5, 6);
					}
				} else if (V.corp.SpecInjection === 5) {
					r += `Advanced growth hormones are applied with total focus on increasing slaves' productiveness. `;
					slave.lips = jsRandom(35, 65);
					slave.butt = jsRandom(4, 6);
					slave.boobs = 100 * jsRandom(60, 80);
					slave.nipples = jsEither(["huge", "inverted"]);
					if (slave.dick > 0) {
						slave.dick = jsRandom(6, 8);
					}
					if (slave.balls > 0) {
						slave.balls = jsRandom(5, 7);
					}
				}
			} else {
				r += `Growth hormones are not applied. `;
			}
			if (V.corp.SpecImplants === 1) {
				r += `Slaves are given tasteful breast, butt, and lip implants. `;
				slave.buttImplant = 1;
				slave.butt = Math.clamp(slave.butt + slave.buttImplant, 0, 20);
				slave.buttImplantType = "normal";
				slave.boobsImplant = 600;
				slave.boobs = Math.clamp(slave.boobs + slave.boobsImplant, 0, 50000);
				slave.boobsImplantType = "normal";
				slave.lipsImplant = 20;
				slave.lips = Math.clamp(slave.lips + slave.lipsImplant, 0, 55);
			} else if (V.corp.SpecImplants === 2) {
				r += `Slaves are given absurd breast, butt, and lip implants. `;
				slave.buttImplant = 4;
				slave.buttImplantType = "fillable";
				slave.butt = Math.clamp(slave.butt + slave.buttImplant, 0, 20);
				slave.boobsImplant = 2400;
				slave.boobsImplantType = "advanced fillable";
				slave.boobs = Math.clamp(slave.boobs + slave.boobsImplant, 0, 50000);
				slave.lipsImplant = 60;
				slave.lips = Math.clamp(slave.lips + slave.lipsImplant, 0, 100);
			} else {
				r += `Slaves are not given breast, butt, or lip implants. `;
			}
			if (V.corp.SpecAmputee === 1) {
				r += `The corporation removes all limbs from its slaves. `;
				removeLimbs(slave, "all");
			}
			if (V.corp.SpecMilk === 1) {
				r += `The corporation provides naturally lactating slaves. `;
				slave.lactation = 1;
				slave.lactationDuration = 2;
				slave.lactationAdaptation = 15;
			} else if (V.corp.SpecMilk === 2) {
				r += `The corporation provides slaves with chemically induced lactation. `;
				slave.lactation = 2;
				slave.lactationDuration = 2;
			}
			break;
		}
		case "neighbor": {
			const neighborID = (typeof V.arcologies[numArcology] === 'object') ? numArcology : 1;
			const neighbor = /** @type {FC.ArcologyState} */V.arcologies[neighborID];
			const opinion = Math.clamp(Math.trunc(App.Neighbor.opinion(V.arcologies[0], neighbor) / 20), -10, 10);

			/**
			 * @type {""|"XX"}
			 */
			let genes = "";
			if (neighbor.FSSubjugationist > 20) {
				SGProp.race = neighbor.FSSubjugationistRace;
			}
			if (neighbor.FSRepopulationFocus > 50) {
				genes = "XX"; // "exclusively female" - does not respect V.seeDicks
				SGProp.minAge = V.fertilityAge;
			}
			if (neighbor.FSYouthPreferentialist > 20) {
				if (jsRandom(0, 100) > 50) { // usually on the younger side
					SGProp.maxAge = 30;
				}
			} else if (neighbor.FSMaturityPreferentialist > 20) {
				if (jsRandom(0, 100) > 50) { // usually on the more mature side
					SGProp.minAge = 36;
				}
			}
			slave = GenerateNewSlave(genes, SGProp);
			const {his} = getPronouns(slave);
			slave.origin = "You bought $him from ";
			slave.origin += neighbor.name;
			slave.origin += ".";
			slave.devotion = -20 + Math.trunc(neighbor.prosperity / 10) + jsRandom(0, 10);
			slave.trust = -20 + Math.trunc(neighbor.prosperity / 10) + jsRandom(0, 10);
			let healthTarget = 0;
			if (FutureSocieties.isActive('FSPaternalist', neighbor)) {
				healthTarget = 20;
			} else if (FutureSocieties.isActive('FSDegradationist', neighbor)) {
				healthTarget = -20;
			}
			healthTarget += Math.trunc((neighbor.prosperity - 100) / 10) + jsRandom(0, 10);
			setHealth(slave, healthTarget, // min: -50, max: -33
				Math.max(15 - neighbor.prosperity / 20 + normalRandInt(0, 2), 0), // min: 0, max: 21
				Math.max(15 - neighbor.prosperity / 20 + normalRandInt(0, 2), 0), // min: 0, max: 21
				undefined,
				Math.max(jsRandom(10, 40) - neighbor.prosperity / 15, 10)); // min: 10, max: 40
			if (jsRandom(1, 100) < neighbor.prosperity / 10 + 50) {
				slave.health.illness = 0;
			}
			if (slave.vagina > 0) {
				slave.skill.vaginal += Math.clamp(neighbor.prosperity / 2, 15, 100);
			}
			if (slave.anus > 0) {
				slave.skill.anal += Math.clamp(neighbor.prosperity / 2, 15, 100);
			}
			slave.skill.oral += Math.clamp(neighbor.prosperity / 2, 15, 100);
			slave.attrKnown = 1;
			slave.fetishKnown = 1;
			if (slave.accent >= 3) {
				if (neighbor.prosperity > jsRandom(0, 200)) {
					slave.accent -= 1;
				}
			}
			if (neighbor.prosperity > jsRandom(0, 200)) {
				slave.sexualFlaw = "none";
			}
			if (neighbor.prosperity > jsRandom(0, 200)) {
				slave.behavioralFlaw = "none";
			}
			if (neighbor.FSSubjugationist > 20) {
				r += `They're universally ${neighbor.FSSubjugationistRace}. `;
			}
			if (neighbor.FSYouthPreferentialist > 20) {
				r += `They're usually on the younger side. `;
				if (slave.actualAge > 30) {
					if (neighbor.FSYouthPreferentialistResearch === 1) {
						r += `Well, all of them certainly look it. Always best to check their ages before buying. `;
						slave.visualAge = jsRandom(18, 25);
						slave.chem += jsRandom(10, 40);
					} else {
						r += `And if they aren't, they sure don't look their age. `;
						slave.faceImplant += jsRandom(10, 30);
						applyAgeImplant(slave);
					}
				}
			} else if (neighbor.FSMaturityPreferentialist > 20) {
				r += `They're usually on the more mature side. `;
			}
			if (neighbor.FSRepopulationFocus > 50) {
				r += `They are exclusively female and all extremely pregnant. `;
				if (slave.ovaryAge >= 42) {
					/* corrects menopausal mothers */
					slave.ovaryAge = 40;
				}
				if (slave.preg < 0) {
					slave.preg = 0; /* removing contraception of default slave generation so isFertile can work right*/
					if (isFertile(slave)) {
						slave.vagina = jsRandom(1, 4);
						slave.preg = jsRandom(21, 39);
						if (jsRandom(1, 2) === 1 && V.seeHyperPreg === 1) {
							slave.pregType = jsRandom(3, 29);
							slave.pregAdaptation = 250;
						} else {
							slave.pregType = jsRandom(3, 8);
							slave.pregAdaptation = 100;
						}
						SetBellySize(slave);
					}
				}
				slave.lactation = jsEither([0, 1]);
				if (slave.lactation > 0) {
					slave.lactationDuration = 2;
				}
			} else if (neighbor.FSRestart > 50) {
				r += `They have all been rendered unable to reproduce. `;
				if (slave.ovaries === 1) {
					slave.preg = -2;
					slave.belly = 0;
					slave.bellyPreg = 0;
				}
				if (slave.balls > 0) {
					slave.balls = 0;
				}
				if (neighbor.FSRestartResearch === 1) {
					r += `Smart and attractive slaves are beginning to be a rarity lately. `;
					if (slave.face >= 0) {
						slave.face -= 100;
					}
					if (slave.intelligence >= 0) {
						slave.intelligence -= 100;
					}
					slave.chem = jsRandom(40, 100);
					slave.addict = jsEither([0, 0, 0, 0, 0, 0, 0, 0, 5, 20, 20, 50, 100]);
				}
			}
			if (neighbor.FSGenderRadicalist > 50) {
				r += `They all show signs of intensive hormone therapy. `;
				slave.chem += jsRandom(10, 100);
				if (slave.dick > 0) {
					slave.boobs += 100 * jsRandom(0, 4);
					slave.butt += jsRandom(0, 2);
					if (slave.hips < 2) {
						slave.hips += jsRandom(0, 1);
					}
					if (slave.shoulders > -2) {
						slave.shoulders -= jsRandom(0, 1);
					}
					if (slave.face < 80) {
						slave.face += jsRandom(0, 20);
					}
					if (slave.faceShape === "masculine") {
						if (jsRandom(0, 1) === 0) {
							slave.faceShape = "androgynous";
						}
					}
					if (slave.dick > 2) {
						slave.dick -= jsRandom(0, 2);
					}
					if (slave.balls > 2) {
						slave.balls -= jsRandom(0, 2);
					}
					if (neighbor.FSGenderRadicalistResearch === 1 && jsRandom(1, 100) <= 20) {
						r += `This one has a notably rounded belly for a slave with no vagina. `;
						slave.ovaries = 0;
						slave.vagina = -1;
						slave.mpreg = 1;
						if (isFertile(slave)) {
							slave.preg = jsRandom(1, 39);
							slave.pregType = setPregType(slave);
							SetBellySize(slave);
						}
					}
				} else {
					slave.boobs -= 100 * jsRandom(0, 2);
					slave.butt -= jsRandom(0, 1);
					if (slave.hips > -2) {
						slave.hips -= jsRandom(0, 1);
					}
					if (slave.shoulders < 2) {
						slave.shoulders += jsRandom(0, 1);
					}
					if (slave.face >= -80) {
						slave.face -= jsRandom(0, 20);
					}
					if (slave.faceShape !== "androgynous") {
						if (jsRandom(0, 1) === 0) {
							slave.faceShape = "androgynous";
						}
					}
					slave.clit += jsRandom(0, 2);
					slave.labia += jsRandom(0, 1);
					if (slave.muscles <= 95) {
						slave.muscles += jsRandom(0, 20);
					}
				}
				slave.skill.penetrative += Math.clamp(neighbor.prosperity / 2, 15, 100);
			} else if (neighbor.FSGenderFundamentalist > 50) {
				r += `Fertile slaves from there almost never appear without swollen bellies and sensitive nipples. `;
				if (slave.preg < 0) {
					slave.preg = 0; /* removing contraception of default slave generation so isFertile can work right*/
					if (isFertile(slave)) {
						slave.preg = jsRandom(1, 40);
						slave.pregType = setPregType(slave);
						SetBellySize(slave);
						slave.lactation = jsRandom(0, 1);
						if (slave.lactation > 0) {
							slave.lactationDuration = 2;
						}
					}
				}
			}
			if (neighbor.FSPaternalist > 20) {
				r += `They're often gratifyingly devoted and trusting. `;
				if (slave.devotion < 10) {
					slave.devotion += jsRandom(0, 8);
				}
				if (slave.trust < 50) {
					slave.trust += jsRandom(0, 8);
				}
			} else if (neighbor.FSDegradationist > 20) {
				r += `They can be depended upon to be terrified into abject submission. `;
				DegradingName(slave);
				if (slave.trust > -10) {
					slave.trust -= jsRandom(0, 10);
				}
				if (jsRandom(1, 100) > 90) {
					if (jsRandom(1, 20) > 1) {
						if (jsRandom(1, 2) === 1) {
							eyeSurgery(slave, "left", "blind");
						} else {
							eyeSurgery(slave, "right", "blind");
						}
					} else {
						eyeSurgery(slave, "both", "blind");
					}
				}
				if (jsRandom(1, 100) > 90) {
					slave.hears = -2;
				}
				if (!FutureSocieties.isActive('FSRepopulationFocus', neighbor) && !FutureSocieties.isActive('FSBodyPurist', neighbor)) {
					if (isFertile(slave) && slave.vagina > 0 && jsRandom(1, 10) === 9) {
						slave.abortionTat = jsRandom(1, (Math.min(slave.physicalAge - V.fertilityAge, slave.physicalAge - V.minimumSlaveAge)) * 2);
					}
				}
				let i = 0;
				if (jsRandom(1, 100) > 10) {
					// tat em up
					let tattoos = ["boobsTat", "buttTat", "lipsTat", "vaginaTat", "dickTat", "anusTat", "shouldersTat", "armsTat", "legsTat", "backTat", "stampTat", "bellyTat"];
					const modPool = jsRandom(1, 10);
					for (i = 0; i < modPool; i++) {
						slave[tattoos.random()] = "degradation";
					}
				}
				if (jsRandom(1, 100) > 10) {
					// pierce em up
					let piercings = ["corset", "nipple", "areola", "lips", "tongue", "anus"];
					if (slave.dick > 0) {
						piercings.push("dick");
					}
					if (slave.vagina !== -1) {
						piercings.push("vagina");
					}
					if (slave.dick > 0 || slave.vagina !== -1) {
						piercings.push("genitals");
					}
					const modPool = jsRandom(5, 15);
					for (i = 0; i < modPool; i++) {
						const pierce = piercings.random();
						if (slave.piercing[pierce].weight < 2) {
							slave.piercing[pierce].weight++;
						}
					}
				}
				if (jsRandom(1, 100) > 20) {
					// scar em up
					if (jsRandom(1, 100) > 70) {
						// They got whipped too
						App.Medicine.Modification.addScourged(slave);
					}
					let scars = ["back", "lower back", "left thigh", "right thigh"];
					const modPool = jsRandom(1, 10);
					for (i = 0; i < modPool; i++) {
						const scar = scars.random();
						App.Medicine.Modification.addScar(slave, scar, "generic");
					}
				}
				if (jsRandom(1, 100) > 80) {
					// brand em up
					if (jsRandom(1, 100) > 50) {
						App.Medicine.Modification.addBrand(slave, "left buttock", "SLUT");
					} else {
						App.Medicine.Modification.addBrand(slave, "left buttock", "Slave");
					}
				}
			}
			if (neighbor.FSIntellectualDependency > 20) {
				r += `The only thing that rivals their idiocy is their uncontrollable libido. `;
				slave.slaveName = App.Data.misc.bimboSlaveNames.random();
				if (slave.intelligence > -50) {
					slave.intelligence = Intelligence.random({limitIntelligence: [-100, -50]});
				}
				slave.intelligenceImplant = 0;
				if (slave.energy < 80) {
					slave.energy = jsRandom(80, 100);
				}
			} else if (neighbor.FSSlaveProfessionalism > 20) {
				r += `They possess brilliant minds and expert training; a slave that truly knows their role in life. `;
				if (slave.intelligence <= 50) {
					slave.intelligence = Intelligence.random({limitIntelligence: [51, 100]});
				}
				slave.intelligenceImplant = 30;
				if (slave.energy > 40) {
					slave.energy -= 30;
				}
				if (slave.vagina > 0) {
					slave.skill.vaginal += Math.clamp(neighbor.prosperity / 2, 20, 100);
					slave.skill.vaginal = Math.clamp(slave.skill.vaginal, 50, 100);
				}
				slave.skill.penetrative += Math.clamp(neighbor.prosperity / 2, 20, 100);
				slave.skill.penetrative = Math.clamp(slave.skill.penetrative, 25, 100);
				if (slave.anus > 0) {
					slave.skill.anal += Math.clamp(neighbor.prosperity / 2, 20, 100);
					slave.skill.anal = Math.clamp(slave.skill.anal, 50, 100);
				}
				slave.skill.oral += Math.clamp(neighbor.prosperity / 2, 20, 100);
				slave.skill.oral = Math.clamp(slave.skill.oral, 50, 100);
				slave.skill.entertainment += Math.clamp(neighbor.prosperity / 2, 20, 100);
				slave.skill.entertainment = Math.clamp(slave.skill.entertainment, 50, 100);
				slave.skill.whoring += Math.clamp(neighbor.prosperity / 2, 20, 100);
				slave.skill.whoring = Math.clamp(slave.skill.whoring, 50, 100);
				slave.sexualFlaw = "none";
				slave.behavioralFlaw = "none";
				slave.fetishKnown = 1;
				slave.attrKnown = 1;
			}
			if (neighbor.FSBodyPurist > 80) {
				r += `They're quite pristine, free of any genomic damage or addictions regardless of any transformations they've had. `;
				// clean out any changes those filthy impure degradationists may have made
				slave.brand = {};
				slave.scar = {};
				slave.chem = 0;
				slave.addict = 0;
				slave.boobsTat = 0;
				slave.buttTat = 0;
				slave.lipsTat = 0;
				slave.vaginaTat = 0;
				slave.dickTat = 0;
				slave.anusTat = 0;
				slave.shouldersTat = 0;
				slave.armsTat = 0;
				slave.legsTat = 0;
				slave.backTat = 0;
				slave.stampTat = 0;
				slave.bellyTat = 0;
				slave.abortionTat = 0;
				slave.birthsTat = 0;
				slave.piercing.corset.weight = 0;
				slave.piercing.nipple.weight = 0;
				slave.piercing.areola.weight = 0;
				slave.piercing.lips.weight = 0;
				slave.piercing.tongue.weight = 0;
				slave.piercing.vagina.weight = 0;
				slave.piercing.genitals.weight = 0;
				slave.piercing.genitals.smart = false;
				slave.piercing.dick.weight = 0;
				slave.piercing.anus.weight = 0;
				slave.piercing.eyebrow.weight = 0;
				slave.piercing.nose.weight = 0;
			} else if (neighbor.FSTransformationFetishist > 80) {
				r += `They vary in terms of what size their implants are, not whether they have them. `;
				slave.chem += jsRandom(10, 100);
				slave.boobsImplant = 200 * jsRandom(2, 20);
				if (slave.boobsImplant > 10000) {
					slave.boobsImplantType = "hyper fillable";
				} else if (slave.boobsImplant > 2200) {
					slave.boobsImplantType = jsEither(["advanced fillable", "advanced fillable", "advanced fillable", "string"]);
				} else if (slave.boobsImplant > 1000) {
					slave.boobsImplantType = jsEither(["fillable", "fillable", "normal", "string"]);
				} else {
					slave.boobsImplantType = jsEither(["normal", "normal", "normal", "string"]);
				}
				slave.boobs += slave.boobsImplant;
				if (slave.boobsImplant / slave.boobs >= 0.90) {
					slave.boobShape = "spherical";
					slave.nipples = "flat";
				} else {
					slave.boobShape = "normal";
				}
				slave.buttImplant = jsRandom(2, 5);
				if (slave.buttImplant > 4) {
					slave.buttImplantType = jsEither(["fillable", "fillable", "normal", "string"]);
				} else {
					slave.buttImplantType = jsEither(["normal", "normal", "normal", "string"]);
				}
				slave.butt += slave.buttImplant;
				slave.lipsImplant = jsEither([10, 20]);
				slave.lips += slave.lipsImplant;
				if (neighbor.FSTransformationFetishistResearch === 1 && jsRandom(1, 100) <= 20) {
					r += `This one's implants are unusually large; a showcase of what ${his} home arcology is capable of. `;
					slave.boobsImplant += 200 * jsRandom(100, 200);
					slave.boobs += slave.boobsImplant;
					slave.boobsImplantType = "hyper fillable";
					slave.buttImplant += jsRandom(7, 12);
					slave.butt += slave.buttImplant;
					slave.buttImplantType = "hyper fillable";
				}
			}
			if (neighbor.FSPetiteAdmiration > 20) {
				r += `They tend to be short, some far more than others. `;
				if (slave.natural.height >= 160) {
					slave.natural.height = Height.random(slave, {limitMult: [-2, 0]});
					if (slave.natural.height >= 160) {
						slave.natural.height = Height.random(slave, {limitMult: [-3, -1]});
						if (slave.natural.height >= 160) {
							slave.natural.height = jsRandom(90, 130);
							slave.geneticQuirks.dwarfism = 2;
						}
					}
					slave.height = Height.forAge(slave.natural.height, slave);
				}
			} else if (neighbor.FSStatuesqueGlorification > 20) {
				r += `They tend to be tall, if not unbelievably so. `;
				if (slave.natural.height < 170) {
					slave.natural.height = Height.random(slave, {limitMult: [0, 2]});
					if (slave.natural.height < 170) {
						slave.natural.height = Height.random(slave, {limitMult: [1, 3]});
						if (slave.natural.height < 170) {
							slave.natural.height = jsRandom(200, 264);
							slave.geneticQuirks.gigantism = 2;
						}
					}
					slave.height = Height.forAge(slave.natural.height, slave);
				}
			}
			if (neighbor.FSSlimnessEnthusiast > 20) {
				r += `They're never overweight, and are often quite lithe. `;
				if (slave.boobs > 400) {
					slave.boobs -= 100 * jsRandom(0, 2);
				}
				if (slave.butt > 3) {
					slave.butt -= jsRandom(0, 2);
				}
				if (slave.weight > 10) {
					slave.weight = jsRandom(-30, 0);
				}
				if (neighbor.FSSlimnessEnthusiastResearch === 1 && jsRandom(1, 100) <= 50) {
					r += `This one is perfectly flat; an ideal showcase of ${his} home arcology's tastes. `;
					slave.boobs = 100;
					slave.butt = 0;
					slave.weight = jsRandom(-30, 0);
				}
			} else if (neighbor.FSAssetExpansionist > 20) {
				r += `Their butts are usually imposing, but their tits are what's often most impressive. `;
				slave.chem += jsRandom(10, 100);
				if (slave.boobs < 5000) {
					slave.boobs += 100 * jsRandom(5, 50);
				}
				if (slave.butt < 6) {
					slave.butt += jsRandom(2, 4);
				}
				if (slave.weight < -10) {
					slave.weight += jsRandom(0, 20);
				}
				if (neighbor.FSAssetExpansionistResearch === 1 && jsRandom(1, 100) <= 20) {
					r += `This one is unusually large; a showcase of what ${his} home arcology is capable of. `;
					slave.boobs = 200 * jsRandom(100, 200);
					slave.butt = jsRandom(10, 20);
					if (slave.dick > 0 && V.seeDicks !== 0) {
						slave.dick = jsRandom(20, 30);
						slave.balls = jsRandom(20, 125);
					}
				}
			}
			if (neighbor.FSPhysicalIdealist > 20) {
				r += `They're usually quite muscular, some to a truly imposing degree, and they're almost never unhealthy. `;
				slave.muscles = jsRandom(10, 100);
				if (slave.health.condition < 20) {
					improveCondition(slave, jsRandom(0, 8));
				}
			} else if (neighbor.FSHedonisticDecadence > 20) {
				if (neighbor.FSSlimnessEnthusiast > 20) {
					r += `They're quite soft, usually sporting a cute muffin top, and rather laid back. `;
					slave.weight = jsRandom(10, 25);
				} else {
					r += `They're usually very soft and rather laid back. `;
					slave.weight = jsRandom(30, 180);
				}
				r += `Though they often come with intense fetishes. `;
				slave.muscles = jsRandom(-50, 0);
				slave.trust += jsRandom(5, 15);
				slave.energy += jsRandom(0, 10);
				if (neighbor.FSHedonisticDecadenceResearch === 1) {
					r += `They appear to have greatly enjoyed their stay at ${neighbor.name}. `;
					slave.energy += jsRandom(0, 10);
					slave.trust += jsRandom(10, 20);
					slave.devotion += jsRandom(10, 20);
				}
				if (jsRandom(0, 3) === 0) {
					slave.behavioralFlaw = "gluttonous";
				}
				if (slave.fetish === Fetish.NONE) {
					slave.fetish = jsEither(["boobs", "buttslut", "cumslut", "dom", "humiliation", "masochist", "pregnancy", "sadist", "submissive"]);
				}
				slave.fetishStrength = jsRandom(60, 90);
				if (jsRandom(1, 100) <= 5 && slave.fetish !== Fetish.MINDBROKEN) {
					switch (slave.fetish) {
						case "submissive":
							slave.sexualFlaw = "neglectful";
							break;
						case "cumslut":
							slave.sexualFlaw = "cum addict";
							break;
						case "humiliation":
							slave.sexualFlaw = "attention whore";
							break;
						case "buttslut":
							slave.sexualFlaw = "anal addict";
							break;
						case "boobs":
							slave.sexualFlaw = "breast growth";
							break;
						case "pregnancy":
							slave.sexualFlaw = "breeder";
							break;
						case "dom":
							slave.sexualFlaw = "abusive";
							break;
						case "sadist":
							slave.sexualFlaw = "malicious";
							break;
						case "masochist":
							slave.sexualFlaw = "self hating";
					}
					slave.fetishStrength = 100;
				}
			}
			if (neighbor.FSPastoralist > 20) {
				r += `Lactation is nearly universal among them, sometimes in ludicrous quantities. They tend to have huge udders, as well. `;
				slave.chem += jsRandom(10, 100);
				if (slave.boobs < 5000) {
					slave.boobs += 100 * jsRandom(5, 50);
				}
				if (slave.lactation === 0) {
					slave.lactation = jsEither([0, 1, 1, 1, 1, 2]);
				}
				if (slave.lactation > 0) {
					slave.lactationDuration = 2;
				}
				if (slave.weight < -10) {
					slave.weight += jsRandom(0, 20);
				}
			} else if (neighbor.FSCummunism > 20) {
				r += `Big balls and huge loads are commonplace among them, even if they sometimes lack dicks. They tend to be hard workers, as well. `;
				slave.chem += jsRandom(10, 100);
				if (neighbor.FSRestart > 50) {
					slave.dick = 0;
					slave.vagina = -1;
				}
				if (slave.balls < 20) {
					slave.balls += jsRandom(5, 20);
				}
				slave.scrotum = slave.balls - 5;
				slave.prostate = jsEither([1, 1, 1, 2, 2, 3]);
				if (slave.muscles < 30) {
					slave.muscles += jsRandom(0, 20);
				}
			}
			if (neighbor.FSChattelReligionist > 20) {
				r += `They're rarely anything but devoted, and sometimes present interesting peccadilloes. `;
				slave.slaveName = App.Data.misc.chattelReligionistSlaveNames.random();
				if (slave.devotion < 10) {
					slave.devotion += jsRandom(0, 10);
				}
				if (slave.devotion < 10) {
					slave.devotion += jsRandom(0, 10);
				}
				if (jsRandom(0, 1) === 0) {
					slave.behavioralQuirk = "sinful";
				}
			}
			if (neighbor.FSRomanRevivalist > 20) {
				r += `They've often `;
				if (!canSee(slave)) {
					r += `been party to`;
				} else {
					r += `seen`;
				}
				r += ` things that drive any squeamishness out of them. `;
				slave.slaveName = App.Data.misc.romanSlaveNames.random();
				if (jsRandom(0, 1) === 0) {
					slave.sexualQuirk = "unflinching";
				}
			} else if (neighbor.FSAztecRevivalist > 20) {
				r += `They've seen sights that will traumatize almost anyone`;
				if (!canSee(slave)) {
					r += ", so to speak. ";
				} else {
					r += ". ";
				}
				slave.slaveName = App.Data.misc.aztecSlaveNames.random();
				if (jsRandom(0, 1) === 0) {
					slave.trust = -30;
				}
			} else if (neighbor.FSNeoImperialist > 20) {
				r += `They've been through a strict Imperial education that has helpfully taught them the necessity of absolute, unquestioning obedience to one's social and physical superiors - meaning you.`;
				if (jsRandom(0, 1) === 0) {
					slave.trust = +20;
				}
			} else if (neighbor.FSEgyptianRevivalist > 20) {
				r += `They've often done things that give them a distinct appetite for perversion. `;
				slave.slaveName = App.Data.misc.ancientEgyptianSlaveNames.random();
				if (jsRandom(0, 1) === 0) {
					slave.sexualQuirk = "perverted";
				}
			} else if (neighbor.FSEdoRevivalist > 20) {
				r += `They have frequently absorbed much culture there. `;
				slave.slaveName = App.Data.misc.edoSlaveNames.random();
				slave.skill.entertainment = Math.clamp(slave.skill.entertainment, 35, 100);
			} else if (neighbor.FSArabianRevivalist > 20) {
				r += `They've often been part of large harems in which selflessness is prized. `;
				if (jsRandom(0, 1) === 0) {
					slave.sexualQuirk = "caring";
				}
			} else if (neighbor.FSChineseRevivalist > 20) {
				r += `They've all passed through a thorough and uncompromising educational system for slaves. `;
				slave.intelligenceImplant = 30;
				if (!FutureSocieties.isActive('FSIntellectualDependency', neighbor)) {
					if (slave.intelligence < 60) {
						slave.intelligence += jsRandom(0, 20);
					}
				}
			} else if (neighbor.FSAntebellumRevivalist > 20) {
				r += `They've been immersed in a romantic culture of aristocratic gentlemen and chivalrous, Southron knights, and it may have rubbed off on them.`;
				if (jsRandom(0, 1) === 0) {
					slave.sexualQuirk = "romantic";
				}
			}
			if (neighbor.FSIncestFetishist > 20) {
				r += `Incest is acceptable, if not preferable to them. Some of the younger slaves seem to be a bit inbred. `;
				if (slave.sexualQuirk === "none" && slave.behavioralQuirk === "none") {
					if (jsRandom(0, 1) === 0) {
						slave.sexualQuirk = "perverted";
					} else {
						slave.behavioralQuirk = "sinful";
					}
				} else if (slave.sexualQuirk === "none" || slave.sexualQuirk === "perverted") {
					slave.sexualQuirk = "perverted";
				} else {
					slave.behavioralQuirk = "sinful";
				}
				if (slave.actualAge <= 15 + (Math.ceil(V.week / 52))) { // younger slaves might be locally bred
					slave.inbreedingCoeff = either(0, 0, 0, 0, 0.0625, 0.125, 0.125, 0.25, 0.25);
					if (V.inbreeding === 1) {
						if (jsRandom(1, 100) < slave.inbreedingCoeff * 200) {
							slave.intelligence -= Math.abs(normalRandInt(5 * slave.inbreedingCoeff, 30 * slave.inbreedingCoeff, -100 * slave.inbreedingCoeff, 100 * slave.inbreedingCoeff));
						}
						if (slave.geneticQuirks.pFace === 0 && slave.geneticQuirks.uFace === 0) {
							if (jsRandom(1, 100) < slave.inbreedingCoeff * 200) {
								slave.face -= Math.abs(normalRandInt(5 * slave.inbreedingCoeff, 35 * slave.inbreedingCoeff, -100 * slave.inbreedingCoeff, 100 * slave.inbreedingCoeff));
							}
						}
					}
				}
			}
			if (FutureSocieties.isActive('FSDegradationist') && FutureSocieties.isActive('FSPaternalist', neighbor)) {
				slave.devotion = jsRandom(-90, -60);
				slave.trust = -20;
				r += `<b>${neighbor.name}</b> is Paternalist, and your arcology is Degradationist. To its slaves, other niceties of social alignment are trivial. They view your arcology as a literal Hell on Earth. `;
			} else if (FutureSocieties.isActive('FSPaternalist') && FutureSocieties.isActive('FSDegradationist', neighbor)) {
				slave.devotion = jsRandom(60, 90);
				slave.trust = 20;
				r += `<b>${neighbor.name}</b> is Degradationist, and your arcology is Paternalist. To its slaves, other niceties of social alignment are trivial. They view your arcology as a promised land. `;
			} else if (opinion !== 0) {
				slave.devotion += opinion;
				slave.trust += opinion;
				slave.devotion = Math.clamp(slave.devotion, -100, 75);
				slave.trust = Math.clamp(slave.trust, -100, 75);
				if (opinion > 2) {
					r += `Your arcology's close social alignment with <b>${neighbor.name}</b> makes its slaves more accepting of the prospect of life in your arcology, and willing to trust that they'll know how to survive there. `;
				} else if (opinion < -2) {
					r += `Your arcology's very different culture from <b>${neighbor.name}</b>'s makes its slaves unhappy with the prospect of life in your arcology, and afraid of what will happen to them there. `;
				}
			}
			break;
		}
		case "heap": {
			slave = GenerateNewSlave(null, SGProp);
			slave.origin = "You bought $him from a body dump, completely broken.";
			slave.career = "a slave";
			setHealth(slave, jsRandom(-50, 0), Math.max(normalRandInt(10, 4), 0), Math.max(normalRandInt(10, 4), 0), Math.max(normalRandInt(0), 0), 0);
			slave.weight = jsRandom(-100, 0);
			if (jsRandom(1, 8) === 1) {
				eyeSurgery(slave, "both", "blind");
			} else if (jsRandom(1, 7) <= 4) {
				eyeSurgery(slave, "both", "blur");
			}
			slave.hears = jsEither([-2, -1, -1, -1, -1, 0, 0, 0]);
			if (V.seeExtreme === 1) {
				/** @type {FC.LimbArgument[]} */
				const limbs = ["left arm", "left leg", "right arm", "right leg"];
				switch (jsRandom(0, 16)) {
					case 1:
					case 2:
						// 1/8 chance quad amputee
						removeLimbs(slave, "all");
						break;
					case 3:
						// 1/16 chance no arms
						removeLimbs(slave, "left arm");
						removeLimbs(slave, "right arm");
						break;
					case 4:
						// 1/16 chance no legs
						removeLimbs(slave, "left leg");
						removeLimbs(slave, "right leg");
						break;
					case 5:
					case 6:
						// 1/8 chance missing one random limb
						removeLimbs(slave, limbs.random());
						break;
					default:
						// 5/8 chance all limbs intact
				}
			}
			if (hasAnyLegs(slave)) {
				slave.heels = jsEither([0, 0, 0, 0, 0, 1, 1]);
			}
			slave.voice = jsRandom(0, 2);
			slave.face = jsRandom(-100, 20);
			if (slave.vagina > -1) {
				slave.vagina = jsEither([1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 10]);
				slave.preg = jsRandom(-3, -1);
				slave.belly = 0;
				slave.bellyPreg = 0;
				slave.counter.vaginal += jsRandom(0, 300);
			}
			slave.anus = jsEither([1, 2, 2, 3, 3, 3, 3, 4, 4, 4]);
			if (slave.balls > 1) {
				if (jsRandom(1, 100) > 50) {
					slave.balls = 0;
				}
			}
			slave.counter.oral += jsRandom(0, 300);
			slave.counter.anal += jsRandom(0, 300);
			if (slave.boobs > 500) {
				slave.counter.mammary += jsRandom(0, 300);
			}
			slave.addict = jsEither([0, 0, 0, 10, 10, 20, 30]);
			slave.chem = jsRandom(0, 1000);
			applyMindbroken(slave, Intelligence.random({limitIntelligence: [-100, 0]}));
			break;
		}
		case "wetware": {
			SGProp.nationality = "Stateless";
			slave = GenerateNewSlave(null, SGProp);
			// each Wetware CPU model has experienced a simulated career making her suitable for a specific leadership role
			const wetwareModelCareers = {
				AT: "a counselor",		// Attendant
				BG: "a soldier",		// Bodyguard
				DJ: "a house DJ",		// DJ
				FA: "a farmer",			// Farmer
				HG: "a lawyer",			// HG
				MD: "a business owner",	// Madam
				MK: "a dairy worker",	// Milkmaid
				MT: "a nanny",			// Matron
				NS: "a doctor",			// Nurse
				RC: "a college scout",	// Recruiter
				ST: "a secretary",		// Stewardess
				TE: "a teacher",		// Teacher
				WD: "a prison guard"	// Warden
			};
			const model = jsEither(Object.keys(wetwareModelCareers));
			slave.origin = "You bought $him from a wetware CPU farm, $his body ruined but $his mind subjected to a simulated career.";
			slave.devotion = 40;
			slave.trust = -100;
			slave.career = wetwareModelCareers[model];
			slave.intelligence = Intelligence.random({limitIntelligence: [50, 100]});
			slave.intelligenceImplant = 30;
			setHealth(slave, jsRandom(-50, -10), Math.max(normalRandInt(10, 4), 0), Math.max(normalRandInt(10, 4), 0), Math.max(normalRandInt(0), 0), 0);
			slave.weight = jsRandom(-100, -50);
			slave.muscles = jsRandom(-100, -50);
			eyeSurgery(slave, "both", "blind");
			slave.hears = -2;
			slave.smells = -1;
			slave.tastes = -1;
			if (V.seeExtreme === 1) {
				removeLimbs(slave, "all");
				slave.earShape = "none";
			}
			if (hasAnyLegs(slave)) {
				slave.heels = 1;
			}
			slave.voice = 0;
			slave.face = jsRandom(-50, 75);
			slave.butt = 0;
			if (slave.vagina > -1) {
				slave.vagina = jsEither([1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 10]);
				slave.preg = jsRandom(-3, -1);
				slave.counter.vaginal += jsRandom(0, 300);
			}
			slave.anus = jsEither([1, 2, 2, 3, 3, 3, 3, 4, 4, 4]);
			if (slave.balls > 1 && jsRandom(1, 100) > 50) {
				slave.balls = 0;
			}
			slave.counter.oral += jsRandom(0, 300);
			slave.counter.anal += jsRandom(0, 300);
			if (slave.boobs > 500) {
				slave.counter.mammary += jsRandom(0, 300);
			}
			slave.skill.vaginal = jsRandom(80, 100);
			slave.skill.penetrative = jsRandom(80, 100);
			slave.skill.oral = jsRandom(80, 100);
			slave.skill.anal = jsRandom(80, 100);
			slave.skill.whoring = jsRandom(80, 100);
			slave.skill.entertainment = jsRandom(80, 100);
			slave.slaveName = `WCPU-${model}`;
			slave.slaveSurname = `#${slave.skill.vaginal}${slave.skill.penetrative}${slave.skill.oral}${slave.skill.anal}${slave.skill.whoring}${slave.skill.entertainment}-${slave.intelligence} `;
			slave.birthName = "";
			slave.birthSurname = "";
			if (model === "BG") {
				slave.skill.combat = 70;
			} else {
				slave.skill.combat = 0;
			}
			slave.addict = jsEither([0, 0, 0, 10, 10, 20, 30]);
			slave.chem = jsRandom(500, 1000);
			slave.behavioralFlaw = "none";
			slave.behavioralQuirk = "none";
			slave.sexualFlaw = "none";
			slave.sexualQuirk = "none";
			slave.fetish = "none";
			slave.fetishStrength = 0;
			slave.canRecruit = 0;
			break;
		}
		case "kidnappers": {
			slave = GenerateNewSlave(null, SGProp);
			slave.origin = "You bought $him from the kidnappers' slave market, so $he was probably forced into slavery.";
			slave.devotion -= 5;
			slave.trust = jsRandom(-45, -25);
			generateSalonModifications(slave);
			slave.intelligence = Intelligence.random({limitIntelligence: [-90, 45]});
			setHealth(slave, jsRandom(-80, 20), Math.max(normalRandInt(5, 4), 0), Math.max(normalRandInt(5, 4), 0), Math.max(normalRandInt(0, 0.7), 0), jsRandom(50, 100));
			if (slave.vagina > 1 && isFertile(slave)) {
				slave.preg = jsEither([-2, -1, -1, -1, -1, -1, -1, -1, 1, 20, 40]);
				if (slave.preg > 0) {
					slave.pregType = setPregType(slave);
				}
				SetBellySize(slave);
			}
			break;
		}
		case "indentures": {
			SGProp.disableDisability = 1;
			SGProp.race = "nonslave";
			slave = GenerateNewSlave(null, SGProp);
			slave.health.tired = jsRandom(0, 30);
			slave.origin = "You purchased $his indenture contract, making $him yours for as long as it lasts.";
			slave.indentureRestrictions = jsEither([0, 1, 1, 2, 2, 2, 2]);
			if (slave.indentureRestrictions >= 2) {
				slave.devotion = jsRandom(25, 45);
				slave.trust = jsRandom(-20, 20);
			} else if (slave.indentureRestrictions === 1) {
				slave.devotion = jsRandom(-20, 20);
				slave.trust = jsRandom(-45, -25);
			} else {
				slave.devotion = jsRandom(-45, -25);
				slave.trust = jsRandom(-75, -60);
			}
			slave.indenture = jsEither([26, 52, 104, 156, 208]);

			break;
		}
		case "hunters": {
			slave = GenerateNewSlave(null, SGProp);
			slave.origin = "You bought $him from the runaway hunters' slave market after they recaptured $him and $his original owner did not pay their fee.";
			slave.devotion = jsRandom(-60, -30);
			slave.trust = jsRandom(-15, 15);
			slave.intelligence = Intelligence.random({limitIntelligence: [0, 100]});
			slave.intelligenceImplant = 15;
			if (slave.physicalAge >= 12) {
				slave.teeth = "normal";
			}
			setHealth(slave, jsRandom(-10, 70), Math.max(normalRandInt(0, 4), 0), Math.max(normalRandInt(0, 4), 0), undefined, jsRandom(50, 100));
			if (slave.vagina > -1) {
				slave.preg = jsEither([-2, -1, -1, -1, -1, -1, -1, -1, 1, 1]);
				if (slave.physicalAge < slave.pubertyAgeXX) {
					slave.preg = 0;
				}
				if (slave.preg > 0) {
					slave.pregType = setPregType(slave);
				}
				SetBellySize(slave);
				slave.skill.vaginal = jsRandom(15, 100);
				slave.vagina = jsRandom(1, 3);
			}
			if (slave.balls > 0) {
				if (jsRandom(1, 3) === 1) {
					slave.balls = 0;
				}
			}
			slave.skill.combat = jsEither([0, 0, 0, 0, 30, 70]);
			slave.skill.entertainment = jsRandom(15, 100);
			slave.skill.whoring = jsRandom(15, 100);
			slave.skill.oral = jsRandom(15, 100);
			slave.skill.anal = jsRandom(15, 100);
			slave.anus = jsRandom(1, 3);
			slave.weight = Math.clamp(slave.weight, -25, 25);
			slave.behavioralFlaw = jsEither(["anorexic", "arrogant", "bitchy", "devout", "gluttonous", "hates men", "hates women", "hates women", "liberated", "odd"]);
			slave.sexualFlaw = jsEither(["apathetic", "crude", "hates anal", "hates oral", "hates penetration", "idealistic", "judgemental", "repressed", "shamefast"]);
			if (jsRandom(1, 2) === 1) {
				let slaveGen = jsRandom(2, 8) * 200;
				slave.boobs += slaveGen;
				slave.boobsImplant += slaveGen;
				if (slave.boobsImplant > 1000) {
					slave.boobsImplantType = jsEither(["fillable", "fillable", "normal", "string"]);
				} else {
					slave.boobsImplantType = jsEither(["normal", "normal", "normal", "string"]);
				}
				slaveGen = jsRandom(1, 3);
				slave.butt += slaveGen;
				slave.buttImplant += slaveGen;
				slave.buttImplantType = "normal";
				slaveGen = jsEither([10, 20]);
				slave.lips += slaveGen;
				slave.lipsImplant += slaveGen;
				slave.waist = Math.clamp(slave.waist, -100, 15);
				if (slave.face < 40) {
					slave.faceImplant = 20 * jsRandom(0, 1);
					slave.face = Math.clamp(slave.face + slave.faceImplant, -100, 100);
				}
				if (slave.physicalAge >= 30) {
					if (jsRandom(0, 1) > 0) {
						applyAgeImplant(slave);
					}
				}
			}
			if (V.arcologies[0].FSPaternalistSMR === 0) {
				slave.heels = 1;
			}
			break;
		}
		case "underage raiders": {
			SGProp.minAge = V.minimumSlaveAge;
			if (V.fertilityAge < V.minimumSlaveAge) { // allow access to market if fertilityAge is really low, and grant some age variation
				SGProp.maxAge = V.minimumSlaveAge + 2;
			} else { // otherwise, always grab prepubescents
				SGProp.maxAge = V.fertilityAge;
			}
			SGProp.ageOverridesPedoMode = 1;
			slave = GenerateNewSlave(null, SGProp);
			slave.origin = "You bought $him from the underage raiders' slave market.";
			slave.trust -= 25;
			setHealth(slave, jsRandom(-30, 70), Math.max(normalRandInt(10, 4), 0), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 0.7), 0), jsRandom(30, 100));
			slave.career = App.Data.Careers.General.veryYoung.random();
			generateSalonModifications(slave);
			slave.birthWeek = 0;
			if (slave.vagina !== -1) {
				slave.skill.vaginal = 0;
				slave.vagina = 0;
				slave.trueVirgin = 1;
				slave.preg = 0;
				SetBellySize(slave);
			}
			slave.skill.penetrative = 0;
			slave.skill.anal = 0;
			slave.anus = 0;
			slave.skill.oral = 0;
			slave.skill.whoring = 0;
			break;
		}
		case "raiders": {
			SGProp.minAge = 18;
			SGProp.maxAge = 18;
			SGProp.ageOverridesPedoMode = 1; // Supposed to have just reached the age of majority.
			slave = GenerateNewSlave(null, SGProp);
			slave.origin = "You bought $him from the $girl raiders' slave market the week $he reached $his majority.";
			slave.trust -= 25;
			setHealth(slave, jsRandom(-30, 70), Math.max(normalRandInt(10, 4), 0), Math.max(normalRandInt(0, 3), 0), Math.max(normalRandInt(0, 0.7), 0), jsRandom(30, 100));
			slave.career = jsEither(["a cheerleader", "a farm laborer", "a party girl", "a student", "a student", "a student", "a student", "a student"]);
			generateSalonModifications(slave);
			slave.birthWeek = 0;
			if (slave.vagina !== -1) {
				if (jsRandom(1, 2) === 1) {
					slave.skill.vaginal = 0;
					slave.vagina = 0;
					slave.trueVirgin = 1;
					slave.preg = 0;
					SetBellySize(slave);
				}
			}
			slave.skill.penetrative = 0;
			if (jsRandom(1, 2) === 1) {
				slave.skill.anal = 0;
				slave.anus = 0;
			}
			if (jsRandom(1, 2) === 1) {
				slave.skill.oral = 0;
			}
			slave.skill.whoring = 0;

			break;
		}
		case "trainers": {
			SGProp.maxAge = 42;
			slave = GenerateNewSlave(null, SGProp);
			slave.origin = "You bought $him from the trainers' slave market after they put $him through basic training.";
			slave.devotion = jsRandom(-45, 15);
			slave.trust = jsRandom(-35, 15);
			setHealth(slave, jsRandom(-20, 80), Math.max(normalRandInt(0, 2), 0), undefined, Math.max(normalRandInt(0, 0.4), jsRandom(10, 40)));
			if (slave.vagina !== -1) {
				slave.skill.vaginal += 15;
			} else {
				slave.skill.vaginal = 0;
				slave.clit = 0;
			}
			if (slave.vagina === 0) {
				slave.vagina += 1;
			}
			if (slave.anus === 0) {
				slave.anus += 1;
			}
			slave.skill.oral += 15;
			slave.skill.anal += 15;
			slave.fetishKnown = 1;
			if (slave.accent >= 3) {
				slave.accent -= 1;
			}
			if (jsRandom(1, 100) > 50) {
				slave.sexualFlaw = "none";
			}
			if (jsRandom(1, 100) > 50) {
				slave.behavioralFlaw = "none";
			}
			break;
		}
		case "TSS": {
			if (V.TSS.schoolUpgrade === 1) {
				SGProp.minAge = 36;
			} else {
				SGProp.maxAge = 18;
			}
			SGProp.disableDisability = 1;
			slave = GenerateNewSlave("XX", SGProp);
			slave.career = "a slave";
			slave.butt = jsEither([1, 2, 2, 3]);
			slave.boobs = jsEither([200, 300, 300, 400]);
			if (V.TSS.schoolUpgrade === 1) {
				slave.origin = "You bought $him fresh from the new Slavegirl School after $he was retrained as a slave $girl.";
				slave.butt += 1;
				slave.boobs += 200;
				slave.anus = 1;
				slave.vagina = 1;
			} else {
				slave.origin = "You bought $him fresh from the Slavegirl School right after $his majority.";
				slave.anus = 0;
				slave.vagina = 0;
				slave.trueVirgin = 1;
				slave.birthWeek = 0;
			}
			slave.intelligenceImplant = 30;
			if (slave.physicalAge >= 12) {
				slave.teeth = "normal";
			}
			slave.intelligence = Intelligence.random({limitIntelligence: [-20, 70]});
			slave.devotion = jsRandom(25, 45);
			slave.trust = jsRandom(25, 45);
			setHealth(slave, jsRandom(50, 60), 0, Math.max(normalRandInt(0), 0), 0, jsRandom(10, 20));
			slave.preg = 0;
			SetBellySize(slave);
			slave.weight = 0;
			slave.waist = jsRandom(-30, 10);
			slave.chem = 20;
			if (V.TSS.schoolUpgrade === 0) {
				slave.skill.vaginal = 0;
				slave.skill.oral = 0;
				slave.skill.anal = 0;
				slave.skill.whoring = 0;
				slave.skill.entertainment = 15;
			} else {
				slave.skill.vaginal = 15;
				slave.skill.oral = 15;
				slave.skill.anal = 15;
				slave.skill.whoring = 15;
				slave.skill.entertainment = 15;
			}
			slave.skill.combat = 0;
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.sexualFlaw = "none";
			slave.behavioralFlaw = "none";
			slave.hStyle = "tails";
			slave.custom.tattoo = "$He has the simple logo of the corporation that operates The Slavegirl School tattooed on $his left cheek.";

			break;
		}
		case "TUO": {
			SGProp.minAge = V.minimumSlaveAge;
			SGProp.maxAge = Math.max(V.fertilityAge + jsRandom(0, 1), V.minimumSlaveAge + jsRandom(0, 3));
			SGProp.disableDisability = 1;
			slave = GenerateNewSlave("XX", SGProp);
			slave.origin = "You bought $him from The Utopian Orphanage right after $his graduation.";
			slave.career = "a slave";
			setHealth(slave, jsRandom(60, 80), 0, Math.max(normalRandInt(0, 4), 0), 0, jsRandom(5, 20));
			slave.devotion = jsRandom(50, 75);
			slave.trust = jsRandom(50, 75);
			if (V.TUO.schoolUpgrade === 1) {
				slave.face = random(30, 100);
				slave.intelligence = Intelligence.random({limitIntelligence: [55, 100]});
				slave.intelligenceImplant = 30;
				slave.accent = Math.min(slave.accent, 1);
				slave.skill.entertainment = 75;
				slave.skill.combat = jsEither([0, 30, 70]);
			} else {
				slave.face = random(10, 65);
				slave.intelligence = Intelligence.random({limitIntelligence: [35, 75]});
				slave.intelligenceImplant = 15;
				slave.accent = Math.min(slave.accent, 2);
				slave.skill.entertainment = 45;
				slave.skill.combat = 0;
			}
			if (V.TUO.schoolUpgrade === 2) {
				slave.skill.vaginal = 15;
				slave.skill.oral = 15;
				slave.skill.anal = 15;
				slave.skill.whoring = 15;
				slave.energy = jsRandom(40, 95);
			} else {
				slave.skill.vaginal = 0;
				slave.skill.oral = 0;
				slave.skill.anal = 0;
				slave.skill.whoring = 0;
				slave.energy = jsRandom(15, 65);
			}
			slave.faceImplant = 0;
			slave.weight = jsRandom(-17, 17);
			slave.muscles = jsRandom(0, 20);
			slave.lips = jsRandom(10, 40);
			slave.lipsImplant = 0;
			if (slave.physicalAge > 16) {
				slave.boobs = jsEither([200, jsRandom(200, 400), jsRandom(200, 950)]);
			} else if (slave.physicalAge <= 16 && slave.physicalAge > 13) {
				slave.boobs = jsEither([200, jsRandom(200, 400)]);
			} else {
				slave.boobs = 200;
			}
			slave.boobsImplant = 0;
			slave.butt = jsRandom(0, 2);
			slave.buttImplant = 0;
			slave.vagina = 0;
			slave.anus = 0;
			break;
		}
		case "GRI": {
			SGProp.minAge = 16;
			SGProp.maxAge = 19;
			SGProp.disableDisability = 1;
			slave = GenerateNewSlave("XX", SGProp);
			slave.origin = "You bought $him from the Growth Research Institute right after $his use as a test subject ended.";
			slave.career = "a slave";
			slave.intelligenceImplant = 0;
			slave.devotion = jsRandom(-15, -5);
			slave.trust = jsRandom(-25, -45);
			slave.chem = 100;
			if (V.GRI.schoolUpgrade === 1) {
				setHealth(slave, 200, 0, Math.max(normalRandInt(0), 0), 0, 5);
			} else {
				setHealth(slave, jsRandom(-50, 100), Math.max(normalRandInt(0, 4), 0), Math.max(normalRandInt(10, 4), 0), Math.max(normalRandInt(0, 0.5), 0), jsRandom(10, 20));
			}
			slave.height = Math.max(jsRandom(160, 210), slave.natural.height);
			slave.butt = jsRandom(4, 10);
			if (V.GRI.schoolUpgrade === 2) {
				slave.boobs = 200 * jsRandom(15, 30);
				slave.lactation = 2;
				slave.lactationDuration = 2;
			} else {
				slave.boobs = 200 * jsRandom(4, 20);
			}
			slave.nipples = jsEither(["huge", "inverted"]);
			slave.areolae = jsEither([0, 1, 2, 3, 4]);
			slave.clit = jsEither([0, 1, 2, 3]);
			slave.lips = jsRandom(5, 85);
			slave.anus = 0;
			slave.vagina = 0;
			slave.preg = 0;
			SetBellySize(slave);
			slave.weight = 0;
			slave.waist = jsRandom(-20, 30);
			slave.skill.vaginal = 0;
			slave.skill.oral = 0;
			slave.skill.anal = 0;
			slave.skill.whoring = 0;
			slave.skill.entertainment = 0;
			slave.skill.combat = 0;
			slave.pubicHStyle = "waxed";
			slave.birthWeek = 0;
			slave.behavioralFlaw = "odd";
			slave.hStyle = "shaved";
			slave.hLength = 0;
			slave.custom.tattoo = "$He has a barcode that identified $him when $he was a test subject at the Growth Research Institute tattooed on $his left cheek.";
			break;
		}
		case "SCP": {
			SGProp.minAge = 16;
			SGProp.maxAge = 19;
			SGProp.disableDisability = 1;
			slave = GenerateNewSlave("XX", SGProp);
			slave.origin = "You bought $him from St. Claver Preparatory after $he served as a plastic surgeon's passing final exam.";
			slave.chem = 20;
			slave.career = "a slave";
			if (V.SCP.schoolUpgrade === 1) {
				slave.intelligenceImplant = 0;
				slave.intelligence = -60;
				slave.devotion = 100;
				slave.trust = 100;
			} else {
				slave.intelligenceImplant = 15;
				slave.teeth = "normal";
				slave.intelligence = Intelligence.random({limitIntelligence: [-30, 60]});
				slave.devotion = jsRandom(25, 45);
				slave.trust = jsRandom(25, 45);
			}
			setHealth(slave, 100, Math.max(normalRandInt(10, 4), 0), Math.max(normalRandInt(5, 4), 0), 0, jsRandom(5, 20));
			slave.heightImplant = 1;
			slave.height += 10;
			slave.buttImplant = (4 - slave.butt);
			slave.buttImplantType = "normal";
			slave.butt += slave.buttImplant;
			slave.boobsImplant = (2000 - slave.boobs);
			slave.boobs += slave.boobsImplant;
			slave.boobsImplantType = "fillable";
			slave.nipples = "tiny";
			slave.areolae = 0;
			slave.clit = 0;
			slave.lipsImplant = (20 - slave.lips);
			slave.lips += slave.lipsImplant;
			slave.faceImplant = 40;
			slave.face = Math.clamp(slave.face + slave.faceImplant, -100, 100);
			slave.faceShape = "normal";
			slave.anus = 0;
			slave.vagina = 0;
			slave.preg = 0;
			SetBellySize(slave);
			slave.weight = -20;
			slave.waist = -50;
			if (V.SCP.schoolUpgrade === 2) {
				slave.skill.vaginal = 15;
				slave.skill.oral = 15;
				slave.skill.anal = 15;
				slave.skill.whoring = 15;
				slave.skill.entertainment = 15;
			} else {
				slave.skill.vaginal = 0;
				slave.skill.oral = 0;
				slave.skill.anal = 0;
				slave.skill.whoring = 0;
				slave.skill.entertainment = 0;
			}
			slave.skill.combat = 0;
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.birthWeek = 0;
			slave.sexualFlaw = "none";
			slave.behavioralFlaw = "none";
			slave.hStyle = "tails";
			slave.pubicHColor = "blonde";
			slave.underArmHColor = "blonde";
			slave.eyebrowHColor = "blonde";
			slave.race = "white";
			slave.skin = "sun tanned";
			slave.override_H_Color = 1;
			slave.override_Race = 1;
			slave.override_Skin = 1;
			slave.custom.tattoo = "$He has the coat of arms of St. Claver Preparatory tattooed on $his left cheek.";
			break;
		}
		case "LDE": {
			SGProp.minAge = 16;
			SGProp.maxAge = 19;
			SGProp.disableDisability = 1;
			slave = GenerateNewSlave("XY", SGProp);
			slave.origin = "You bought $him from the innovative École des Enculées right after $his graduation.";
			slave.career = "a slave";
			slave.intelligenceImplant = 0;
			slave.chem = 100;
			if (V.LDE.schoolUpgrade === 1) {
				slave.devotion = 100;
				slave.trust = 100;
			} else {
				slave.devotion = jsRandom(60, 75);
				slave.trust = jsRandom(55, 60);
			}
			setHealth(slave, jsRandom(60, 80), 0, Math.max(normalRandInt(0, 2), 0), 0, jsRandom(5, 20));
			slave.muscles = 0;
			slave.butt = jsEither([4, 5]);
			slave.face = jsRandom(15, 55);
			slave.faceShape = "androgynous";
			slave.boobs = jsEither([500, 650, 800]);
			slave.waist = -15;
			slave.lips = 35;
			if (V.LDE.schoolUpgrade === 2) {
				slave.dick = jsEither([3, 4]);
				slave.balls = jsEither([3, 4]);
				if (slave.foreskin > 0) {
					slave.foreskin = slave.dick;
				}
				if (slave.balls > 0) {
					slave.scrotum = slave.balls;
				}
			} else {
				slave.dick = jsEither([1, 1, 1, 2]);
				slave.balls = jsEither([1, 1, 1, 2]);
				if (slave.foreskin > 0) {
					slave.foreskin = slave.dick;
				}
				if (slave.balls > 0) {
					slave.scrotum = slave.balls;
				}
				slave.pubertyXY = 0;
				slave.pubertyAgeXY = jsRandom(24, 50);
			}
			slave.anus = 2;
			slave.vagina = -1;
			slave.preg = 0;
			SetBellySize(slave);
			slave.weight = jsRandom(0, 20);
			slave.skill.vaginal = 0;
			slave.skill.oral = 15;
			slave.skill.anal = 100;
			slave.skill.whoring = 15;
			slave.skill.entertainment = 15;
			slave.skill.combat = 0;
			slave.pubicHStyle = "waxed";
			slave.birthWeek = 0;
			slave.sexualFlaw = "none";
			slave.behavioralFlaw = jsEither(["none", "odd"]);
			slave.fetishStrength = jsRandom(60, 90);
			slave.fetish = "buttslut";
			slave.fetishKnown = 1;
			slave.attrKnown = 1;
			slave.hStyle = "tails";
			slave.hLength = 100;
			slave.custom.tattoo = "$He has the buttock-shaped symbol of the École des Enculées that created $him tattooed on $his left cheek.";
			break;
		}
		case "TGA": {
			SGProp.minAge = 16;
			SGProp.maxAge = 19;
			SGProp.disableDisability = 1;
			slave = GenerateNewSlave("XY", SGProp);
			slave.origin = "You bought $him fresh from the intense Gymnasium-Academy right after $his majority.";
			slave.career = "a slave";
			slave.intelligenceImplant = 30;
			slave.teeth = "normal";
			slave.intelligence = Intelligence.random({limitIntelligence: [-20, 60]});
			slave.chem = 20;
			if (V.TGA.schoolUpgrade === 1) {
				slave.devotion = 100;
				slave.trust = 100;
			} else {
				slave.devotion = jsRandom(25, 45);
				slave.trust = jsRandom(25, 45);
			}
			setHealth(slave, 100, 0, undefined, Math.max(normalRandInt(0, 0.4), 0), jsRandom(5, 30));
			slave.muscles = jsEither([20, 50, 50]);
			slave.butt = jsEither([2, 2, 3]);
			slave.boobs = jsEither([100, 200]);
			slave.dick = jsRandom(3, 5);
			if (slave.foreskin > 0) {
				slave.foreskin = slave.dick;
			}
			slave.balls = jsRandom(3, 5);
			slave.scrotum = slave.balls;
			slave.anus = 0;
			slave.weight = 0;
			slave.waist = jsRandom(-10, 30);
			slave.skill.vaginal = 0;
			slave.skill.penetrative = 0;
			slave.skill.oral = 0;
			slave.skill.anal = 0;
			slave.skill.whoring = 0;
			slave.skill.entertainment = 0;
			if (V.TGA.schoolUpgrade === 2) {
				slave.skill.combat = 70;
			} else {
				slave.skill.combat = 0;
			}
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.birthWeek = 0;
			slave.sexualFlaw = jsEither(["apathetic", "none"]);
			slave.behavioralFlaw = jsEither(["arrogant", "none", "odd"]);
			slave.hStyle = "neat";
			slave.hLength = 2;
			App.Medicine.Modification.addBrand(slave, "left cheek", "the baroque crest of the Gymnasium-Academy that trained $him");
			break;
		}
		case "TCR": {
			if (V.TCR.schoolUpgrade === 2 && jsRandom(1, 100) <= 20) {
				SGProp.minAge = V.fertilityAge;
				SGProp.maxAge = 18;
				SGProp.ageOverridesPedoMode = 1;
				SGProp.disableDisability = 1;
				slave = GenerateNewSlave("XX", SGProp);
				slave.origin = "You bought $him from The Cattle Ranch.";
				slave.career = "a dairy slave";
				slave.slaveName = App.Data.misc.cowSlaveNames.random();
				slave.slaveSurname = 0;
				slave.butt = jsEither([2, 2, 3, 3, 3, 4, 4]);
				slave.boobs = ((slave.physicalAge * 100) * 2) + jsEither([-100, -100, 0, 0, 100, 100, 200, 200, 300, 500]);
				slave.natural.boobs += random(4, 20) * 50; // Slaves are being bred for breast size.
				slave.lactation = 0;
				slave.lactationAdaptation = 0;
				slave.lactationDuration = 0;
				slave.anus = 0;
				slave.vagina = 0;
				slave.trueVirgin = 1;
				slave.vaginaLube = jsEither([1, 1, 2]);
				slave.intelligenceImplant = 0;
				slave.devotion = -20;
				slave.trust = -20;
				setHealth(slave, jsRandom(20, 30), 0, Math.max(normalRandInt(0, 4), 0), 0);
				slave.preg = 0;
				SetBellySize(slave);
				slave.hips = jsEither([0, 0, 1, 1, 1, 2]);
				slave.weight = jsRandom(-20, 10);
				slave.waist = jsRandom(-30, 10);
				slave.muscles = 0;
				slave.skill.vaginal = 0;
				slave.skill.oral = 0;
				slave.skill.anal = 0;
				slave.skill.whoring = 0;
				slave.skill.entertainment = 0;
				slave.skill.combat = 0;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.heels = 1;
				slave.hStyle = "neat";
				slave.collar = "leather with cowbell";
				slave.brand["right thigh"] = "the logo of the Cattle Ranch";
			} else if (V.TCR.schoolUpgrade === 1 && jsRandom(1, 100) <= 20) {
				SGProp.minAge = V.potencyAge + 1;
				SGProp.maxAge = 24;
				SGProp.ageOverridesPedoMode = 1;
				SGProp.disableDisability = 1;
				slave = GenerateNewSlave("XY", SGProp);
				slave.slaveName = App.Data.misc.cowSlaveNames.random();
				slave.slaveSurname = 0;
				slave.origin = "You bought $him from The Cattle Ranch.";
				slave.career = "a breeding bull";
				slave.butt = jsEither([3, 3, 4, 4, 4, 5, 6]);
				slave.boobs = 100;
				slave.natural.boobs += random(4, 20) * 50; // Slaves are being bred for breast size.
				slave.anus = 0;
				setHealth(slave, jsRandom(20, 30), 0, Math.max(normalRandInt(0, 4), 0), 0);
				slave.hips = jsEither([1, 1, 1, 2, 2]);
				slave.dick = 6;
				slave.foreskin = 0;
				slave.balls = jsRandom(19, 30);
				slave.scrotum = 10;
				slave.prostate = 2;
				slave.skill.penetrative = 15;
				slave.weight = jsRandom(10, 30);
				slave.waist = jsRandom(0, 100);
				slave.muscles = jsRandom(80, 100);
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.heels = 1;
				slave.energy = 100;
				applyMindbroken(slave, -100);
				slave.hStyle = "neat";
				App.Medicine.Modification.addBrand(slave, "right thigh", "the logo of the Cattle Ranch");
			} else {
				SGProp.minAge = 19;
				SGProp.maxAge = 24;
				SGProp.ageOverridesPedoMode = 1;
				SGProp.disableDisability = 1;
				slave = GenerateNewSlave("XX", SGProp);
				slave.slaveName = App.Data.misc.cowSlaveNames.random();
				slave.slaveSurname = 0;
				slave.origin = "You bought $him from The Cattle Ranch.";
				slave.career = "a dairy cow";
				slave.butt = jsEither([3, 3, 4, 4, 4, 5, 6]);
				slave.boobs = ((slave.physicalAge * 100) * 2) + jsEither([-100, -100, 0, 0, 100, 100, 200, 200, 300, 500]);
				slave.natural.boobs += random(4, 20) * 50; // Slaves are being bred for breast size.
				slave.lactation = 1;
				slave.lactationDuration = 2;
				slave.lactationAdaptation = 100;
				slave.anus = 1;
				slave.vagina = 3;
				slave.vaginaLube = 2;
				setHealth(slave, jsRandom(20, 30), 0, Math.max(normalRandInt(0, 4), 0), 0);
				slave.preg = jsRandom(10, 40);
				slave.pregType = jsRandom(1, 5);
				slave.pregKnown = 1;
				SetBellySize(slave);
				slave.bellySag = 2;
				slave.bellySagPreg = 2;
				slave.hips = jsEither([1, 1, 1, 2, 2]);
				slave.counter.birthsTotal = jsRandom(1, 7);
				slave.pregAdaptation = 120;
				slave.weight = jsRandom(20, 90);
				slave.waist = jsRandom(-10, 50);
				slave.muscles = jsRandom(60, 80);
				slave.chem = 0;
				slave.pubicHStyle = "waxed";
				slave.underArmHStyle = "waxed";
				slave.heels = 1;
				applyMindbroken(slave, jsEither([-100, -100, -100, -100, -60, -60, -30]));
				slave.hStyle = "neat";
				slave.collar = "leather with cowbell";
				slave.brand["right thigh"] = "the logo of the Cattle Ranch";
			}
			break;
		}
		case "TFS": {
			let sisterAge = jsRandom(1, 5);
			if (sisterAge === 5) {
				if (V.retirementAge <= 40) {
					sisterAge = jsRandom(1, 4);
				} else {
					SGProp.minAge = 40;
					SGProp.maxAge = 42;
				}
			}
			if (sisterAge === 4) {
				if (V.retirementAge <= 35) {
					sisterAge = jsRandom(1, 3);
				} else {
					SGProp.minAge = 35;
					SGProp.maxAge = 39;
				}
			}
			if (sisterAge === 3) {
				if (V.retirementAge <= 30) {
					sisterAge = jsRandom(1, 2);
				} else {
					SGProp.minAge = 30;
					SGProp.maxAge = 34;
				}
			}
			if (sisterAge === 2) {
				if (V.retirementAge <= 25) {
					sisterAge = 1;
				} else {
					SGProp.minAge = 25;
					SGProp.maxAge = 29;
				}
			}
			if (sisterAge === 1) {
				SGProp.minAge = 19;
				SGProp.maxAge = 24;
			}
			SGProp.ageOverridesPedoMode = 1;
			SGProp.disableDisability = 1;
			if (V.TFS.schoolUpgrade === 3 && V.TFS.compromiseWeek + 15 <= V.week) {
				slave = GenerateNewSlave(null, SGProp);
			} else {
				slave = GenerateNewSlave("XY", SGProp);
			}
			if (slave.genes === "XY") {
				slave.pronoun = App.Data.Pronouns.Kind.female;
				slave.slaveName = generateName(slave.nationality, slave.race, false);
				slave.birthName = "";
			}
			slave.origin = "You bought $him from the enigmatic Futanari Sisters after they sold $him into slavery.";
			slave.career = "a Futanari Sister";
			slave.faceShape = jsEither(["exotic", "sensual"]);
			slave.pubertyXY = 1;
			if (sisterAge === 1) {
				slave.intelligence = random(-60, -30);
				slave.hips = 0;
				slave.face = jsEither([35, 35, 35, 75, 100]);
				if (V.TFS.schoolUpgrade === 3 && V.TFS.compromiseWeek + 15 <= V.week) {
					if (slave.genes === "XY") {
						slave.balls = 6;
						slave.scrotum = slave.balls;
					} else {
						slave.balls = 1;
						slave.scrotum = 0;
					}
				} else if (V.TFS.schoolUpgrade === 1) {
					slave.balls = 1;
					slave.scrotum = 0;
				} else if (V.TFS.schoolUpgrade === 2) {
					slave.balls = 6;
					slave.scrotum = slave.balls;
				} else {
					slave.balls = jsRandom(2, 3);
					slave.scrotum = slave.balls;
				}
				slave.lips = 10;
				slave.weight = 0;
				slave.waist = jsRandom(-30, 10);
				slave.vagina = 2;
				slave.anus = 2;
				slave.fetish = "submissive";
			} else if (sisterAge === 2) {
				slave.intelligence = random(-50, -20);
				slave.hips = 1;
				slave.face = jsEither([35, 35, 35, 75, 100]);
				if (V.TFS.schoolUpgrade === 3 && V.TFS.compromiseWeek + 15 <= V.week) {
					if (slave.genes === "XY") {
						slave.balls = 7;
						slave.scrotum = slave.balls;
					} else {
						slave.balls = 1;
						slave.scrotum = 0;
					}
				} else if (V.TFS.schoolUpgrade === 1) {
					slave.balls = 1;
					slave.scrotum = 0;
				} else if (V.TFS.schoolUpgrade === 2) {
					slave.balls = 6;
					slave.scrotum = slave.balls;
				} else {
					slave.balls = jsRandom(2, 3);
					slave.scrotum = slave.balls;
				}
				slave.lips = 0;
				slave.weight = 0;
				slave.waist = jsRandom(-30, 10);
				slave.vagina = 2;
				slave.anus = 2;
				slave.fetish = jsEither(["buttslut", "cumslut", "submissive"]);
			} else if (sisterAge === 3) {
				slave.intelligence = random(-15, 15);
				slave.hips = 2;
				slave.face = jsEither([35, 35, 75, 75, 100]);
				if (V.TFS.schoolUpgrade === 3 && V.TFS.compromiseWeek + 15 <= V.week) {
					if (slave.genes === "XY") {
						slave.balls = 8;
						slave.scrotum = slave.balls;
					} else {
						slave.balls = 1;
						slave.scrotum = 0;
					}
				} else if (V.TFS.schoolUpgrade === 1) {
					slave.balls = 1;
					slave.scrotum = 0;
				} else if (V.TFS.schoolUpgrade === 2) {
					slave.balls = 6;
					slave.scrotum = slave.balls;
				} else {
					slave.balls = jsRandom(3, 4);
					slave.scrotum = slave.balls;
				}
				slave.lips = jsRandom(15, 25);
				slave.weight = 20;
				slave.waist = jsRandom(-30, 20);
				slave.vagina = 2;
				slave.anus = 2;
				slave.fetish = jsEither(["buttslut", "cumslut"]);
			} else if (sisterAge === 4) {
				slave.intelligence = random(16, 50);
				slave.hips = 2;
				slave.face = jsEither([35, 75, 75, 100, 100]);
				if (V.TFS.schoolUpgrade === 3 && V.TFS.compromiseWeek + 15 <= V.week) {
					if (slave.genes === "XY") {
						slave.balls = 9;
						slave.scrotum = slave.balls;
					} else {
						slave.balls = 1;
						slave.scrotum = 0;
					}
				} else if (V.TFS.schoolUpgrade === 1) {
					slave.balls = 1;
					slave.scrotum = 0;
				} else if (V.TFS.schoolUpgrade === 2) {
					slave.balls = 6;
					slave.scrotum = slave.balls;
				} else {
					slave.balls = jsRandom(4, 5);
					slave.scrotum = slave.balls;
				}
				slave.lips = jsRandom(25, 55);
				slave.weight = 20;
				slave.waist = jsRandom(-30, 20);
				slave.vagina = 3;
				slave.anus = 3;
				slave.fetish = jsEither(["buttslut", "cumslut", "dom"]);
			} else {
				slave.intelligence = random(51, 95);
				slave.hips = 2;
				slave.face = jsEither([35, 75, 100, 100, 100]);
				if (V.TFS.schoolUpgrade === 3 && V.TFS.compromiseWeek + 15 <= V.week) {
					if (slave.genes === "XY") {
						slave.balls = 10;
						slave.scrotum = slave.balls;
					} else {
						slave.balls = 1;
						slave.scrotum = 0;
					}
				} else if (V.TFS.schoolUpgrade === 1) {
					slave.balls = 1;
					slave.scrotum = 0;
				} else if (V.TFS.schoolUpgrade === 2) {
					slave.balls = 6;
					slave.scrotum = slave.balls;
				} else {
					slave.balls = jsRandom(5, 6);
					slave.scrotum = slave.balls;
				}
				slave.lips = jsRandom(25, 55);
				slave.weight = 50;
				slave.waist = jsRandom(-50, 20);
				slave.vagina = 3;
				slave.anus = 3;
				slave.fetish = "dom";
			}
			slave.chem = 100 + (sisterAge * 50);
			slave.butt = sisterAge + jsRandom(2, 4);
			slave.boobs = 50 * ((10 * sisterAge) + jsRandom(10, 20));
			slave.dick = sisterAge + jsRandom(1, 2);
			if (slave.foreskin > 0) {
				slave.foreskin = slave.dick;
			}
			slave.preg = -3;
			if (V.TFS.farmUpgrade > 0) {
				slave.ovaries = 1;
				slave.preg = -1;
				slave.pubertyXX = 1;
				if (V.TFS.farmUpgrade >= 2) {
					if (V.week - V.TFS.farmUpgradeAsked < 35) {
						slave.preg = jsRandom(1, (V.week - V.TFS.farmUpgradeAsked));
					} else {
						slave.preg = jsRandom(1, 40);
					}
					if (V.TFS.farmUpgrade === 3) {
						slave.pregType = jsRandom(20, 40);
						slave.pregAdaptation = 500;
					} else {
						slave.pregType = 1;
					}
					slave.pregWeek = slave.preg;
					slave.pregSource = -9;
				}
			}
			SetBellySize(slave);
			slave.intelligenceImplant = 30;
			slave.teeth = "normal";
			if (V.TFS.schoolUpgrade === 2) {
				slave.energy = 100;
			} else {
				slave.energy = slave.physicalAge + jsRandom(20, 30);
			}
			slave.devotion = jsRandom(30, 40);
			slave.trust = jsRandom(60, 75);
			setHealth(slave, jsRandom(60, 80), 0, Math.max(normalRandInt(0, 4), 0), 0, jsRandom(0, 10));
			slave.muscles = 20;
			if (slave.genes === "XY") {
				slave.shoulders = 1;
			}
			slave.skill.vaginal = 100;
			slave.skill.penetrative = 100;
			slave.skill.oral = 100;
			slave.skill.anal = 100;
			slave.skill.whoring = 15;
			slave.skill.entertainment = 100;
			slave.skill.combat = 0;
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			if (V.TFS.schoolUpgrade === 1) {
				slave.sexualQuirk = "caring";
			}
			slave.sexualFlaw = "none";
			slave.behavioralFlaw = jsEither(["hates women", "arrogant", "none"]);
			slave.fetishStrength = 100;
			slave.fetishKnown = 0;
			slave.attrKnown = 0;
			slave.hStyle = "neat";
			slave.hLength = 150;
			slave.custom.tattoo = "$He has a simple pink heart tattooed on $his right temple.";
			slave.trueVirgin = 1;
			slave.canRecruit = 0;
			break;
		}
		case "HA": {
			SGProp.minAge = 20;
			SGProp.maxAge = 25;
			SGProp.ageOverridesPedoMode = 1;
			SGProp.disableDisability = 1;
			slave = GenerateNewSlave("XX", SGProp);
			slave.origin = "You bought $him from the prestigious Hippolyta Academy.";
			slave.career = "a bodyguard";
			slave.intelligenceImplant = 30;
			slave.faceShape = jsEither(["cute", "normal"]);
			slave.face = jsEither([35, 35, 35, 50, 75, 100]);
			slave.lips = jsRandom(0, 25);
			slave.hips = 0;
			slave.vagina = jsRandom(0, 1);
			slave.anus = jsRandom(0, 1);
			slave.fetish = "none";
			slave.chem = 10 * jsRandom(1, 3);
			slave.butt = jsRandom(2, 4);
			slave.boobs = jsRandom(3, 6) * 100;
			slave.preg = 0;
			SetBellySize(slave);
			slave.teeth = "normal";
			slave.devotion = jsRandom(60, 75);
			slave.trust = jsRandom(60, 75);
			setHealth(slave, jsRandom(60, 80), 0, Math.max(normalRandInt(0, 2), 0), 0, jsRandom(5, 20));
			const minHeight = jsRandom(170, 180);
			if (V.HA.schoolUpgrade === 2) {
				slave.natural.height = Math.clamp(Height.random(slave, {
					limitMult: [2, 15],
					spread: 0.1
				}), minHeight, 274);
				slave.muscles = jsRandom(40, 80);
			} else {
				slave.natural.height = Math.clamp(Height.random(slave, {limitMult: [1, 4]}), minHeight, 274);
				slave.muscles = jsRandom(20, 40);
			}
			slave.height = slave.natural.height;
			if (V.HA.schoolUpgrade === 3) {
				slave.weight = jsEither([10, 20, 20, 30, 30, 40, 40, 50]);
				slave.waist = jsRandom(-10, 40);
			} else {
				slave.weight = -10;
				slave.waist = jsRandom(-20, 10);
			}
			slave.shoulders = 0;
			if (V.HA.schoolUpgrade === 1) {
				slave.intelligence = Intelligence.random({limitIntelligence: [20, 70]});
				slave.skill.vaginal = jsEither([20, 20, 40]);
				slave.skill.oral = jsEither([20, 20, 40]);
				slave.skill.anal = jsEither([20, 20, 40]);
				slave.skill.whoring = jsEither([20, 20, 40]);
				slave.skill.entertainment = jsEither([60, 80, 80, 100]);
			} else {
				slave.intelligence = jsRandom(0, 20);
				slave.skill.vaginal = 10;
				slave.skill.oral = 10;
				slave.skill.anal = 10;
				slave.skill.whoring = 10;
				slave.skill.entertainment = jsEither([20, 40, 40, 60]);
			}
			slave.skill.combat = 70;
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.sexualQuirk = jsEither(["caring", "none", "none", "unflinching"]);
			slave.sexualFlaw = jsEither(["apathetic", "judgemental", "none", "none"]);
			slave.behavioralFlaw = jsEither(["arrogant", "none"]);
			slave.behavioralQuirk = jsEither(["confident", "fitness", "none", "none"]);
			slave.fetishStrength = 0;
			slave.fetishKnown = 0;
			slave.attrKnown = 0;
			slave.hStyle = jsEither(["braided", "bun", "neat", "ponytail", "tails"]);
			slave.hLength = jsRandom(5, 50);
			slave.clothes = "a nice maid outfit";
			slave.custom.tattoo = "$He has the sword and eagle symbol of the Hippolyta Academy tattooed on $his left shoulder.";
			break;
		}
		case "NUL": {
			SGProp.minAge = 16;
			SGProp.maxAge = 24;
			SGProp.disableDisability = 1;
			slave = GenerateNewSlave(null, SGProp);
			slave.origin = "You bought $him from Nueva Universidad de Libertad right after $his graduation.";
			slave.career = "a slave";
			setHealth(slave, jsRandom(60, 80), 0, Math.max(normalRandInt(0, 4), 0), 0, jsRandom(5, 20));
			slave.devotion = jsRandom(60, 75);
			slave.trust = jsRandom(60, 75);
			slave.intelligenceImplant = 30;
			if (V.NUL.schoolUpgrade === 1) {
				slave.intelligence = Intelligence.random({limitIntelligence: [50, 70]});
				slave.skill.whoring = jsRandom(70, 80);
				slave.skill.entertainment = jsRandom(70, 80);
			} else {
				slave.intelligence = Intelligence.random({limitIntelligence: [20, 50]});
				slave.skill.whoring = jsRandom(40, 50);
				slave.skill.entertainment = jsRandom(40, 50);
			}
			if (V.NUL.schoolUpgrade === 2) {
				slave.skill.anal = jsRandom(60, 80);
				slave.skill.oral = jsRandom(70, 90);
				slave.anus = jsRandom(1, 3);
			} else {
				slave.skill.anal = jsRandom(10, 30);
				slave.skill.oral = jsRandom(20, 40);
				slave.anus = jsEither([0, 0, 0, 0, 1, 1, 1]);
			}
			slave.muscles = 0;
			slave.face = jsRandom(15, 55);
			slave.faceShape = "androgynous";
			slave.hips = 0;
			slave.shoulders = 0;
			slave.boobs = jsRandom(1, 7) * 50;
			slave.butt = jsRandom(0, 3);
			slave.vagina = -1;
			slave.clit = 0;
			slave.dick = 0;
			slave.balls = 0;
			slave.preg = 0;
			slave.piercing.genitals.weight = 0;
			slave.piercing.genitals.smart = false;
			slave.eyebrowHStyle = "bald";
			slave.underArmHStyle = "bald";
			slave.pubicHStyle = "bald";
			slave.hStyle = "bald";
			slave.behavioralFlaw = jsEither(["none", "odd"]);
			slave.custom.tattoo = "$He has the abstract symbol of Nueva Universidad de Libertad tattooed on $his left shoulder.";
			break;
		}
		case "gangs and smugglers": {
			if (V.pedo_mode === 1) {
				SGProp.minAge = 6;
				SGProp.maxAge = 18;
				SGProp.ageOverridesPedoMode = 1;
			} else {
				SGProp.minAge = 16;
				if (V.retirementAge > 56) {
					SGProp.maxAge = 55;
				} else {
					SGProp.maxAge = V.retirementAge - 2;
				}
			}
			SGProp.disableDisability = 1;
			if (V.seeDicks === 0) {
				slave = GenerateNewSlave("XX", SGProp);
			} else {
				slave = GenerateNewSlave("XY", SGProp);
			}

			const criminal = App.Data.misc.gangCriminalPool.random();

			switch (criminal) {
				case "mule": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for smuggling illegal contraband inside $his body.";
					r += "is incarcerated for being a willing drug mule.";
					slave.career = "a drug mule";
					slave.devotion = jsRandom(-20, 20);
					slave.trust = jsRandom(-100, -25);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsEither([-100, -100, -60, -60, -60, -30, -30]);
					setHealth(slave, jsRandom(-50, 20), undefined, undefined, undefined, jsRandom(30, 80));
					slave.anus = 4;
					slave.chem = 10 * jsRandom(1, 3);
					slave.addict = 100;
					break;
				}
				case "arms smuggler": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for smuggling arms to forces antagonistic to the Free Cities.";
					r += "is incarcerated for being an arms dealer.";
					slave.career = "an arms dealer";
					slave.devotion = jsRandom(-100, -50);
					slave.trust = jsRandom(-60, 25);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(0, 60);
					setHealth(slave, jsRandom(-20, 20), undefined, undefined, undefined, jsRandom(20, 65));
					slave.weight = jsRandom(-30, 10);
					slave.waist = jsRandom(-10, 50);
					slave.muscles = jsRandom(10, 40);
					break;
				}
				case "drug smuggler": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for smuggling drugs into the Free City.";
					r += "is incarcerated for smuggling drugs.";
					slave.career = "a drug smuggler";
					slave.devotion = jsRandom(-60, -20);
					slave.trust = jsRandom(-60, 40);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(-60, 60);
					setHealth(slave, jsRandom(-20, 20), undefined, undefined, undefined, jsRandom(30, 80));
					break;
				}
				case "smuggler": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for smuggling goods into the Free City.";
					r += "is incarcerated for smuggling goods.";
					slave.career = "a smuggler";
					slave.devotion = jsRandom(-80, -20);
					slave.trust = jsRandom(-100, 40);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(0, 60);
					setHealth(slave, jsRandom(-20, 40), undefined, undefined, undefined, jsRandom(30, 80));
					break;
				}
				case "fence": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for dealing in stolen goods.";
					r += "is incarcerated for buying and selling stolen goods.";
					slave.career = "a fence";
					slave.devotion = jsRandom(-100, -20);
					slave.trust = jsRandom(-20, 40);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(-60, 30);
					setHealth(slave, jsRandom(-20, 60), undefined, undefined, undefined, jsRandom(30, 80));
					break;
				}
				case "gang murderer": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for gang related murder.";
					r += "is incarcerated for gang related murders.";
					slave.career = "a gang member";
					slave.devotion = jsRandom(-100, -50);
					slave.trust = jsRandom(0, 100);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsEither([-30, -20, 0, 0, 20, 40, 60]);
					slave.behavioralFlaw = "arrogant";
					setHealth(slave, jsRandom(-20, 20), Math.max(normalRandInt(5, 3), 0), Math.max(normalRandInt(5, 3), 0), undefined, jsRandom(20, 70));
					slave.muscles = jsRandom(20, 80);
					slave.chem = 10 * jsRandom(1, 3);
					slave.custom.tattoo = "The prominent emblem of a local gang spans the length of his shoulders.";
					slave.skill.combat = 40;
					break;
				}
				case "gang assaulter": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for gang related extortion of local businesses.";
					r += "is incarcerated for gang related activities.";
					slave.career = "a gang member";
					slave.devotion = jsRandom(-100, -50);
					slave.trust = jsRandom(0, 100);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(-100, 0);
					slave.behavioralFlaw = "arrogant";
					setHealth(slave, jsRandom(-20, 20), Math.max(normalRandInt(5, 3), 0), Math.max(normalRandInt(5, 3), 0), undefined, jsRandom(20, 70));
					slave.muscles = jsRandom(40, 80);
					slave.weight = jsRandom(-30, 10);
					slave.waist = jsRandom(10, 50);
					slave.chem = 10 * jsRandom(1, 3);
					slave.custom.tattoo = "The prominent emblem of a local gang spans the length of $his shoulders.";
					slave.skill.combat = 40;
					break;
				}
				case "gang bruiser": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for a gang related beating of a local businessman.";
					r += "is incarcerated for gang related activities.";
					slave.career = "a gang member";
					slave.devotion = jsRandom(-100, -50);
					slave.trust = jsRandom(0, 100);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(-100, 0);
					slave.behavioralFlaw = "arrogant";
					setHealth(slave, jsRandom(-20, 20), Math.max(normalRandInt(8, 3), 0), Math.max(normalRandInt(8, 3), 0), undefined, jsRandom(20, 60));
					slave.muscles = jsRandom(60, 80);
					slave.weight = jsRandom(-30, 10);
					slave.waist = jsRandom(10, 70);
					slave.chem = 10 * jsRandom(1, 3);
					slave.custom.tattoo = "The prominent emblem of a local gang spans the length of $his shoulders.";
					slave.skill.combat = 40;
					break;
				}
				case "gang thief": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for gang related raiding of several local warehouses.";
					r += "is incarcerated for gang related activities.";
					slave.career = "a gang member";
					slave.devotion = jsRandom(-100, -50);
					slave.trust = jsRandom(0, 100);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(-40, 60);
					slave.behavioralFlaw = "arrogant";
					setHealth(slave, jsRandom(-20, 20), Math.max(normalRandInt(3, 3), 0), Math.max(normalRandInt(3, 3), 0), undefined, jsRandom(20, 70));
					slave.muscles = jsRandom(20, 80);
					slave.weight = jsRandom(-30, 30);
					slave.waist = jsRandom(10, 70);
					slave.chem = 10 * jsRandom(1, 3);
					slave.custom.tattoo = "The prominent emblem of a local gang spans the length of $his shoulders.";
					slave.skill.combat = 40;
					break;
				}
				case "drug peddler": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for gang related drug distribution.";
					r += "is incarcerated for gang related activities.";
					slave.career = "a drug pusher";
					slave.devotion = jsRandom(-100, -50);
					slave.trust = jsRandom(0, 100);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(-40, 60);
					setHealth(slave, jsRandom(-20, 20), Math.max(normalRandInt(3, 3), 0), Math.max(normalRandInt(3, 3), 0), undefined, jsRandom(30, 70));
					slave.muscles = jsRandom(20, 40);
					slave.chem = 10 * jsRandom(3, 5);
					slave.custom.tattoo = "The prominent emblem of a local gang spans the length of $his shoulders.";
					slave.skill.combat = 40;
					break;
				}
				case "hitman": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for a series of high profile murders.";
					r += "is incarcerated for a series of murders-for-hire.";
					slave.career = "a hitman";
					slave.devotion = jsRandom(-75, -50);
					slave.trust = jsRandom(-60, 25);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(0, 100);
					setHealth(slave, jsRandom(-20, 60), undefined, undefined, undefined, jsRandom(20, 70));
					slave.weight = jsRandom(-30, 10);
					slave.waist = jsRandom(-10, 50);
					slave.muscles = jsRandom(20, 40);
					slave.skill.combat = 70;
					break;
				}
				case "assassin": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for a high profile assassination.";
					r += "is incarcerated for an assassination.";
					slave.career = "an assassin";
					slave.devotion = -100;
					slave.trust = 100;
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = 100;
					setHealth(slave, jsRandom(-20, 60), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(10, 50));
					slave.weight = jsRandom(-30, 10);
					slave.waist = jsRandom(-10, 10);
					slave.muscles = jsRandom(20, 40);
					slave.skill.combat = 70;
					break;
				}
				case "murder": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for repeat murder.";
					r += "is incarcerated for murder.";
					slave.career = "a murderer";
					slave.devotion = jsRandom(-100, -50);
					slave.trust = jsRandom(0, 100);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(-40, 60);
					setHealth(slave, jsRandom(-20, 20), undefined, undefined, undefined, jsRandom(30, 80));
					slave.muscles = jsRandom(20, 80);
					slave.skill.combat = 40;
					break;
				}
				case "manslaughter": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for manslaughter.";
					r += "is incarcerated for manslaughter.";
					slave.career = "a criminal";
					slave.devotion = jsRandom(-20, 50);
					slave.trust = jsRandom(0, 20);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(-40, 60);
					setHealth(slave, jsRandom(-40, 0), undefined, undefined, undefined, jsRandom(30, 80));
					break;
				}
				case "attempted murder": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for attempted murder of a prominent individual.";
					r += "is incarcerated for an attempted murder.";
					slave.career = "a criminal";
					slave.devotion = jsRandom(-20, 50);
					slave.trust = jsRandom(0, 20);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(-100, 0);
					setHealth(slave, jsRandom(-40, 0), undefined, undefined, undefined, jsRandom(30, 80));
					break;
				}
			}
			break;
		}
		case "military prison": {
			if (V.pedo_mode === 1) {
				SGProp.minAge = 12;
				SGProp.maxAge = 18;
				SGProp.ageOverridesPedoMode = 1;
			} else {
				SGProp.minAge = 18;
				if (V.retirementAge > 56) {
					SGProp.maxAge = 55;
				} else {
					SGProp.maxAge = V.retirementAge - 2;
				}
			}
			SGProp.disableDisability = 1;
			slave = GenerateNewSlave(null, SGProp);

			const criminal = App.Data.misc.militaryCriminalPool.random();

			switch (criminal) {
				case "spy": {
					slave.origin = "You purchased $his life at a prison sale. $He was a spy captured while infiltrating the Free City.";
					r += "is incarcerated for spying.";
					slave.career = "a spy";
					slave.devotion = jsRandom(-20, 20);
					slave.trust = -100;
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(20, 100);
					slave.intelligenceImplant = 30;
					setHealth(slave, jsRandom(-40, 20), Math.max(normalRandInt(5, 4), 0), Math.max(normalRandInt(5, 4), 0), undefined, jsRandom(10, 40));
					slave.weight = jsRandom(-30, 10);
					slave.waist = jsRandom(-10, 10);
					slave.muscles = jsRandom(20, 40);
					slave.skill.combat = 70;
					break;
				}
				case "terrorist": {
					slave.origin = "You purchased $his life at a prison sale. $He was a terrorist captured when $his attempt to destroy a public building and the people within was foiled.";
					r += "is incarcerated for terrorism.";
					slave.career = "a terrorist";
					slave.devotion = jsRandom(-80, -20);
					slave.trust = -100;
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(-100, 0);
					setHealth(slave, jsRandom(-50, 20), Math.max(normalRandInt(10, 4), 0), Math.max(normalRandInt(10, 4), 0), undefined, jsRandom(40, 100));
					slave.weight = jsRandom(-100, 10);
					slave.waist = jsRandom(-10, 10);
					break;
				}
				case "war criminal": {
					slave.origin = "You purchased $his life at a prison sale. $He was a soldier imprisoned for committing unspeakable atrocities, even by the standards of an apocalyptic slave trading society.";
					r += "is incarcerated for a series of war crimes.";
					slave.career = "a soldier";
					slave.devotion = jsRandom(-100, -80);
					slave.trust = jsRandom(20, 100);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(-20, 100);
					slave.intelligenceImplant = 30;
					setHealth(slave, jsRandom(-40, 60), Math.max(normalRandInt(5, 4), 0), Math.max(normalRandInt(5, 4), 0), undefined, jsRandom(30, 80));
					slave.weight = jsRandom(-10, 10);
					slave.waist = jsRandom(-10, 10);
					slave.muscles = jsRandom(20, 60);
					slave.skill.combat = 70;
					slave.behavioralFlaw = "arrogant";
					break;
				}
				case "deserter": {
					slave.origin = "You purchased $his life at a prison sale. $He was a soldier that abandoned $his post.";
					r += "is incarcerated for going A.W.O.L.";
					slave.career = "a soldier";
					slave.devotion = jsRandom(-100, -80);
					slave.trust = jsRandom(-100, -80);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(-60, 40);
					setHealth(slave, jsRandom(-40, 60), Math.max(normalRandInt(5, 4), 0), Math.max(normalRandInt(5, 4), 0), undefined, jsRandom(30, 80));
					slave.weight = jsRandom(-50, 10);
					slave.waist = jsRandom(-10, 10);
					slave.skill.combat = 70;
					break;
				}
				case "officer": {
					slave.origin = "You purchased $his life at a prison sale. $He was an officer that over-extended $his forces and was overwhelmed.";
					r += "is a captured enemy officer.";
					slave.career = "a military officer";
					slave.devotion = jsRandom(-40, 20);
					slave.trust = jsRandom(-50, 0);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(0, 100);
					slave.intelligenceImplant = 15;
					setHealth(slave, jsRandom(0, 60), undefined, Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(20, 70));
					slave.weight = jsRandom(-10, 10);
					slave.waist = jsRandom(-10, 10);
					slave.muscles = jsRandom(20, 40);
					slave.skill.combat = 70;
					break;
				}
				case "specOps": {
					slave.origin = "You purchased $his life at a prison sale. $He was a special operations officer that acted on bad intel and ended up captured.";
					r += "is a captured enemy special operations officer.";
					slave.career = "spec ops";
					slave.devotion = jsRandom(-80, -50);
					slave.trust = jsRandom(-100, 100);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsEither([60, 80, 100]);
					slave.intelligenceImplant = 30;
					setHealth(slave, jsRandom(0, 60), undefined, Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(20, 70));
					slave.weight = jsRandom(-10, 10);
					slave.waist = jsRandom(-10, 10);
					slave.muscles = jsRandom(30, 60);
					slave.skill.combat = 100;
					break;
				}
				case "sniper": {
					slave.origin = "You purchased $his life at a prison sale. $He was an enemy sniper that was captured after $his company lost to your military might.";
					r += "is a captured enemy sniper.";
					slave.career = "a sniper";
					slave.devotion = jsRandom(-50, -20);
					slave.trust = jsRandom(-100, -80);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsEither([60, 80, 100]);
					slave.intelligenceImplant = 20;
					setHealth(slave, jsRandom(0, 20), Math.max(normalRandInt(5, 4), 0), Math.max(normalRandInt(0, 4), 0), undefined, jsRandom(20, 70));
					slave.weight = jsRandom(-10, 10);
					slave.waist = jsRandom(-10, 10);
					slave.muscles = jsRandom(30, 60);
					slave.skill.combat = 70;
					if (slave.boobs > 400) {
						slave.boobs = 400;
						slave.natural.boobs = 400;
					}
					break;
				}
				case "gunner": {
					slave.origin = "You purchased $his life at a prison sale. $He was an enemy machine gunner that was captured after $his company lost to your military might.";
					r += "is a captured enemy gunner.";
					slave.career = "a soldier";
					slave.devotion = jsRandom(-50, -20);
					slave.trust = jsRandom(-50, -20);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(0, 90);
					slave.intelligenceImplant = 15;
					setHealth(slave, jsRandom(0, 20), Math.max(normalRandInt(5, 4), 0), Math.max(normalRandInt(5, 4), 0), undefined, jsRandom(20, 70));
					slave.weight = jsRandom(-10, 10);
					slave.waist = jsRandom(-10, 10);
					slave.muscles = jsRandom(50, 60);
					slave.skill.combat = 70;
					break;
				}
				case "soldier": {
					slave.origin = "You purchased $his life at a prison sale. $He was an enemy soldier that was captured after $his company lost to your military might.";
					r += "is a captured enemy soldier.";
					slave.career = "a soldier";
					slave.devotion = jsRandom(-100, -20);
					slave.trust = jsRandom(-50, 20);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(0, 60);
					slave.intelligenceImplant = 15;
					setHealth(slave, jsRandom(0, 40), Math.max(normalRandInt(5, 4), 0), Math.max(normalRandInt(5, 4), 0), undefined, jsRandom(20, 70));
					slave.weight = jsRandom(-10, 10);
					slave.waist = jsRandom(-10, 10);
					slave.muscles = jsRandom(30, 60);
					slave.skill.combat = 70;
					break;
				}
				case "private": {
					slave.origin = "You purchased $his life at a prison sale. $He was an enemy grunt that was captured after $his company lost to your military might.";
					r += "is a captured enemy private.";
					slave.career = "a private";
					slave.devotion = jsRandom(-40, -20);
					slave.trust = jsRandom(-100, -80);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(-90, 70);
					slave.intelligenceImplant = 15;
					setHealth(slave, jsRandom(0, 20), Math.max(normalRandInt(5, 4), 0), Math.max(normalRandInt(0, 4), 0), undefined, jsRandom(30, 80));
					slave.weight = jsRandom(-10, 10);
					slave.waist = jsRandom(-10, 10);
					slave.muscles = jsRandom(10, 40);
					slave.skill.combat = 40;
					break;
				}
			}
			break;
		}
		case "white collar": {
			if (V.pedo_mode === 1) {
				SGProp.minAge = 16;
				SGProp.maxAge = 45;
				SGProp.ageOverridesPedoMode = 1;
			} else {
				SGProp.minAge = 25;
				if (V.retirementAge > 66) {
					SGProp.maxAge = 65;
				} else {
					SGProp.maxAge = V.retirementAge - 2;
				}
			}
			SGProp.disableDisability = 1;
			slave = GenerateNewSlave(null, SGProp);

			const criminal = App.Data.misc.whiteCollarCriminalPool.random();

			switch (criminal) {
				case "racketeering": {
					slave.career = jsEither(["a businessman", "a lawyer", "a stockbroker"]);
					slave.origin = `You purchased $his life at a prison sale. $He was convicted of racketeering.`;
					r += "is incarcerated for racketeering.";
					slave.devotion = jsRandom(-20, 20);
					slave.trust = jsRandom(-20, 20);
					slave.intelligence = jsRandom(0, 99);
					slave.intelligenceImplant = 15;
					setHealth(slave, jsRandom(20, 60), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(10, 50));
					break;
				}
				case "bribery": {
					slave.career = jsEither(["a businessman", "a lawyer", "a stockbroker"]);
					slave.origin = `You purchased $his life at a prison sale. $He was arrested and sentenced for bribing government officials.`;
					r += "is incarcerated for bribery.";
					slave.devotion = jsRandom(-50, -20);
					slave.trust = jsRandom(20, 50);
					slave.intelligence = jsRandom(0, 99);
					slave.intelligenceImplant = 15;
					setHealth(slave, jsRandom(20, 60), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(10, 50));
					slave.behavioralFlaw = "arrogant";
					break;
				}
				case "blackmail": {
					slave.career = jsEither(["a businessman", "a lawyer", "a stockbroker"]);
					slave.origin = `You purchased $his life at a prison sale. $He was convicted of blackmail against a sorority of university students, forcing them to do sexual favors.`;
					r += "is incarcerated for blackmail.";
					slave.devotion = jsRandom(-20, 20);
					slave.trust = jsRandom(20, 50);
					slave.intelligence = jsRandom(0, 99);
					slave.intelligenceImplant = 15;
					setHealth(slave, jsRandom(20, 60), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(10, 50));
					slave.behavioralFlaw = "arrogant";
					slave.fetish = "sadist";
					slave.fetishStrength = 100;
					break;
				}
				case "embezzlement": {
					slave.career = jsEither(["a businessman", "a lawyer", "a stockbroker"]);
					slave.origin = `You purchased $his life at a prison sale. $He was involved in a scandal and convicted of embezzlement.`;
					r += "is incarcerated for embezzlement.";
					slave.devotion = jsRandom(0, 20);
					slave.trust = jsRandom(-10, 10);
					slave.intelligence = jsRandom(0, 99);
					slave.intelligenceImplant = 15;
					setHealth(slave, jsRandom(20, 60), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(10, 50));
					break;
				}
				case "fraud": {
					slave.career = jsEither(["a businessman", "a lawyer", "a stockbroker"]);
					slave.origin = `You purchased $his life at a prison sale. $He was convicted of fraud.`;
					r += "is incarcerated for securities fraud.";
					slave.devotion = jsRandom(20, 40);
					slave.trust = jsRandom(20, 50);
					slave.intelligence = jsRandom(0, 99);
					slave.intelligenceImplant = 15;
					setHealth(slave, jsRandom(20, 60), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(10, 50));
					break;
				}
				case "tax evasion": {
					slave.career = jsEither(["a businessman", "a lawyer", "a stockbroker"]);
					slave.origin = `You purchased $his life at a prison sale. $He was convicted of tax evasion.`;
					r += "is incarcerated for tax evasion.";
					slave.devotion = jsRandom(-20, 0);
					slave.trust = jsRandom(20, 50);
					slave.intelligence = jsRandom(0, 99);
					slave.intelligenceImplant = 15;
					setHealth(slave, jsRandom(20, 60), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(10, 50));
					break;
				}
				case "confidence": {
					slave.career = jsEither(["a psychologist", "a mediator", "a therapist"]);
					slave.origin = `You purchased $his life at a prison sale. $He was ${slave.career} that ran a confidence scheme on $his clients.`;
					r += "is incarcerated for fraud related to a confidence scheme.";
					slave.devotion = jsRandom(-20, 20);
					slave.trust = jsRandom(20, 50);
					slave.intelligence = jsRandom(40, 99);
					slave.intelligenceImplant = 30;
					setHealth(slave, jsRandom(20, 60), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(10, 50));
					break;
				}
				case "malpractice": {
					slave.career = jsEither(["a doctor", "a nurse", "a physician"]);
					slave.origin = `You purchased $his life at a prison sale. $He was ${slave.career} that took advantage of $his position to molest and modify $his patients.`;
					r += "is incarcerated for malpractice.";
					slave.devotion = jsRandom(-50, 0);
					slave.trust = jsRandom(-100, -50);
					slave.intelligence = jsRandom(55, 99);
					slave.intelligenceImplant = 30;
					setHealth(slave, jsRandom(-40, 20), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(40, 70));
					break;
				}
				case "abuse of power": {
					slave.career = jsEither(["a judge", "a lawyer", "a police officer"]);
					slave.origin = `You purchased $his life at a prison sale. $He was ${slave.career} that took advantage of $his position for $his own benefit.`;
					r += "is incarcerated for abuse of power.";
					slave.devotion = jsRandom(-100, 0);
					slave.trust = jsRandom(-50, 50);
					slave.intelligence = jsRandom(60, 99);
					slave.intelligenceImplant = 30;
					setHealth(slave, jsRandom(20, 60), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(10, 40));
					slave.behavioralFlaw = "arrogant";
					break;
				}
				case "records tampering": {
					slave.career = jsEither(["a dean", "a principal", "a professor"]);
					slave.origin = `You purchased $his life at a prison sale. $He was convicted of accepting bribes to tamper with student records.`;
					r += "is incarcerated for tampering with student records.";
					slave.devotion = jsRandom(-50, 0);
					slave.trust = jsRandom(50, 50);
					slave.intelligence = jsRandom(40, 99);
					slave.intelligenceImplant = 30;
					setHealth(slave, jsRandom(20, 60), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(10, 50));
					break;
				}
			}
			break;
		}
		case "low tier criminals": {
			if (V.pedo_mode === 1) {
				SGProp.minAge = 6;
				SGProp.maxAge = 18;
				SGProp.ageOverridesPedoMode = 1;
			} else {
				SGProp.minAge = 16;
				if (V.retirementAge > 56) {
					SGProp.maxAge = 55;
				} else {
					SGProp.maxAge = V.retirementAge - 2;
				}
			}
			SGProp.disableDisability = 1;
			slave = GenerateNewSlave(null, SGProp);

			const criminal = App.Data.misc.pettyCriminalPool.random();

			switch (criminal) {
				case "robbery": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for robbery.";
					r += "is incarcerated for robbery.";
					slave.devotion = jsRandom(-20, 20);
					slave.trust = jsRandom(-60, 60);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsEither([-100, -100, -80, -60, -40, -30, -20, -5, 0, 5, 20]);
					setHealth(slave, jsRandom(-20, 20), undefined, undefined, undefined, jsRandom(20, 70));
					break;
				}
				case "armed robbery": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for armed robbery.";
					r += "is incarcerated for armed robbery.";
					slave.devotion = jsRandom(-50, -20);
					slave.trust = jsRandom(-20, 60);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(-80, 60);
					setHealth(slave, jsRandom(-10, 20), undefined, Math.max(normalRandInt(0, 4), 0), undefined, jsRandom(20, 70));
					slave.weight = jsRandom(-10, 10);
					slave.waist = jsRandom(-10, 10);
					slave.muscles = jsRandom(10, 40);
					slave.skill.combat = 40;
					break;
				}
				case "murder": {
					if (jsRandom(1, 100) > 70) {
						slave.origin = "You purchased $his life at a prison sale. $He was locked away for murder. $His actions weigh heavily on $his conscience.";
						setHealth(slave, jsRandom(-50, 20), Math.max(normalRandInt(0, 4), 0), Math.max(normalRandInt(0, 4), 0), undefined, jsRandom(40, 100));
						applyMindbroken(slave, jsRandom(-80, 70));
					} else {
						slave.origin = "You purchased $his life at a prison sale. $He was locked away for murder.";
						slave.devotion = jsRandom(-50, -20);
						slave.trust = jsRandom(-20, 60);
						setHealth(slave, jsRandom(-10, 20), undefined, undefined, undefined, jsRandom(20, 70));
						slave.intelligence = jsRandom(-80, 70);
					}
					r += "is incarcerated for murder.";
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					break;
				}
				case "arson": {
					if (jsRandom(1, 100) > 50) {
						slave.origin = "You purchased $his life at a prison sale. $He was locked away for arson. $His actions, and those $he inadvertently killed, weigh heavily on $his conscience.";
						setHealth(slave, jsRandom(-50, 20), Math.max(normalRandInt(0, 4), 0), Math.max(normalRandInt(0, 4), 0), undefined, jsRandom(40, 100));
						applyMindbroken(slave, jsRandom(-80, 70));
					} else {
						slave.origin = "You purchased $his life at a prison sale. $He was locked away for arson.";
						slave.devotion = jsRandom(-70, -50);
						slave.trust = jsRandom(0, 60);
						setHealth(slave, jsRandom(-10, 20), undefined, undefined, undefined, jsRandom(20, 70));
						slave.intelligence = jsRandom(-80, 70);
					}
					r += "is incarcerated for arson.";
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					break;
				}
				case "burglary": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for burglary.";
					r += "is incarcerated for burglary.";
					slave.devotion = jsRandom(-20, 20);
					slave.trust = jsRandom(-60, 60);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(-100, 20);
					setHealth(slave, jsRandom(-20, 20), undefined, undefined, undefined, jsRandom(20, 70));
					break;
				}
				case "cat burglar": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for repeat burglary.";
					r += "is incarcerated for career burglary.";
					slave.career = "a cat burglar";
					slave.devotion = jsRandom(-20, 20);
					slave.trust = jsRandom(-60, 60);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsEither([60, 80, 100]);
					setHealth(slave, jsRandom(0, 60), undefined, undefined, undefined, jsRandom(10, 50));
					slave.weight = jsRandom(-10, 10);
					slave.waist = jsRandom(-10, 10);
					slave.muscles = jsRandom(10, 40);
					break;
				}
				case "petty theft": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for petty theft.";
					r += "is incarcerated for petty theft.";
					slave.career = "a thief";
					slave.devotion = jsRandom(-20, 20);
					slave.trust = jsRandom(-100, -60);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsEither([-100, -100, -80, -60, -40, -30, -20, -5, 0, 5, 20]);
					setHealth(slave, jsRandom(-20, 20), undefined, undefined, undefined, jsRandom(20, 70));
					break;
				}
				case "theft": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for theft.";
					r += "is incarcerated for theft.";
					slave.career = "a thief";
					slave.devotion = jsRandom(-50, 0);
					slave.trust = jsRandom(-100, -60);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(-80, 70);
					setHealth(slave, jsRandom(-20, 20), undefined, undefined, undefined, jsRandom(20, 70));
					break;
				}
				case "pickpocketing": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for repeat pick-pocketing.";
					r += "is incarcerated for pick-pocketing.";
					slave.career = "a pick-pocket";
					slave.devotion = jsRandom(-20, 0);
					slave.trust = jsRandom(-100, -60);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsRandom(-80, 70);
					setHealth(slave, jsRandom(-60, 0), undefined, Math.max(normalRandInt(5, 4), 0), undefined, jsRandom(20, 70));
					break;
				}
				case "manslaughter": {
					if (jsRandom(1, 100) > 60) {
						slave.origin = "You purchased $his life at a prison sale. $He was locked away for manslaughter. $His actions weigh heavily on $his conscience.";
						setHealth(slave, jsRandom(-50, -20), Math.max(normalRandInt(0, 4), 0), Math.max(normalRandInt(0, 4), 0), undefined, jsRandom(40, 100));
						applyMindbroken(slave, jsRandom(-80, 70));
					} else {
						slave.origin = "You purchased $his life at a prison sale. $He was locked away for manslaughter.";
						slave.devotion = jsRandom(-70, -50);
						slave.trust = jsRandom(0, 60);
						setHealth(slave, jsRandom(-10, 20), undefined, undefined, undefined, jsRandom(20, 70));
						slave.intelligence = jsRandom(-80, 70);
					}
					r += "is incarcerated for manslaughter.";
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					break;
				}
				case "blackmail": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for blackmail.";
					r += "is incarcerated for blackmail.";
					slave.devotion = jsRandom(-100, -50);
					slave.trust = jsRandom(-100, -60);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = jsEither([60, 80, 100]);
					setHealth(slave, jsRandom(0, 60), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(20, 50));
					break;
				}
				case "assault": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for assault.";
					r += "is incarcerated for assault.";
					slave.devotion = jsRandom(-70, -50);
					slave.trust = jsRandom(-20, 60);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					setHealth(slave, jsRandom(-10, 40), undefined, undefined, undefined, jsRandom(20, 70));
					slave.weight = jsRandom(-10, 10);
					slave.waist = jsRandom(-10, 10);
					slave.muscles = jsRandom(30, 60);
					slave.skill.combat = 20;
					break;
				}
				case "battery": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for battery.";
					r += "is incarcerated for battery.";
					slave.devotion = jsRandom(-100, -70);
					slave.trust = jsRandom(20, 60);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					setHealth(slave, jsRandom(-10, 40), undefined, undefined, undefined, jsRandom(20, 70));
					slave.weight = jsRandom(-10, 10);
					slave.waist = jsRandom(-10, 10);
					slave.muscles = jsRandom(40, 60);
					slave.skill.combat = 40;
					break;
				}
				case "tax evasion": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for tax evasion.";
					r += "is incarcerated for tax evasion.";
					slave.devotion = jsRandom(-20, 20);
					slave.trust = jsRandom(0, 60);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.intelligence = Intelligence.random({limitIntelligence: [0, 100]});
					setHealth(slave, jsRandom(0, 60), Math.max(normalRandInt(0, 2), 0), Math.max(normalRandInt(0, 2), 0), undefined, jsRandom(20, 70));
					break;
				}
				case "rape": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for rape.";
					r += "is incarcerated for rape.";
					slave.devotion = jsRandom(-100, -50);
					slave.trust = jsRandom(-20, 80);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					setHealth(slave, jsRandom(-10, 40), undefined, undefined, undefined, jsRandom(20, 70));
					slave.weight = jsRandom(-10, 10);
					slave.waist = jsRandom(-10, 10);
					slave.muscles = jsRandom(30, 60);
					slave.fetish = "sadist";
					slave.fetishStrength = 80;
					break;
				}
				case "child molestation": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for child molestation.";
					r += "is incarcerated for child molestation.";
					if (V.minimumSlaveAge < 13) {
						slave.devotion = jsRandom(-20, 0);
						slave.trust = jsRandom(-20, 0);
					} else {
						slave.devotion = jsRandom(-50, -20);
						slave.trust = jsRandom(-100, 0);
					}
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					setHealth(slave, jsRandom(-30, 10), Math.max(normalRandInt(5, 4), 0), undefined, undefined, jsRandom(70, 100));
					slave.muscles = jsRandom(10, 40);
					slave.fetish = "sadist";
					slave.fetishStrength = 80;
					break;
				}
				case "child abuse": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for child abuse.";
					r += "is incarcerated for child abuse.";
					if (V.minimumSlaveAge < 13) {
						slave.devotion = jsRandom(-20, 0);
						slave.trust = jsRandom(-20, 50);
					} else {
						slave.devotion = jsRandom(-50, -20);
						slave.trust = jsRandom(-50, 50);
					}
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					setHealth(slave, jsRandom(-30, 10), undefined, undefined, undefined, jsRandom(50, 100));
					slave.muscles = jsRandom(10, 40);
					slave.fetish = "sadist";
					slave.fetishStrength = 100;
					slave.sexualFlaw = "malicious";
					break;
				}
				case "domestic abuse": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for domestic abuse.";
					r += "is incarcerated for domestic abuse.";
					slave.devotion = jsRandom(-50, -20);
					slave.trust = jsRandom(-100, 50);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					setHealth(slave, jsRandom(-10, 40), undefined, undefined, undefined, jsRandom(20, 70));
					slave.muscles = jsRandom(10, 40);
					slave.fetish = "sadist";
					slave.fetishStrength = 50;
					break;
				}
				case "illegal immigrant": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for illegal immigration.";
					r += "is incarcerated for illegally entering the Free City.";
					slave.career = "a refugee";
					slave.devotion = jsRandom(0, 20);
					slave.trust = jsRandom(-100, -50);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					setHealth(slave, jsRandom(-50, -40), Math.max(normalRandInt(10, 4), 0), Math.max(normalRandInt(10, 4), 0), undefined, jsRandom(40, 90));
					break;
				}
				case "mule": {
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for smuggling illegal contraband inside $his body.";
					r += "is incarcerated for smuggling drugs in $his body.";
					slave.career = "a drug mule";
					slave.devotion = jsRandom(-20, 20);
					slave.trust = jsRandom(0, 25);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					setHealth(slave, jsRandom(-50, 20), undefined, undefined, undefined, jsRandom(20, 70));
					if (slave.ovaries === 1 && slave.vagina > 0) {
						slave.vagina = 4;
						slave.bellySag += 5;
					}
					slave.anus = 4;
					slave.bellySag += 5;
					slave.chem = 10 * jsRandom(1, 3);
					slave.addict = 100;
					break;
				}
			}
			break;
		}
		case "juvenile detention": {
			// age of criminal responsibility/minimum age of incarceration is currently:
			//  7-9 in most of the Middle East, India, Burma, Thailand, Indonesia, and Ethiopia
			//  10 in most US states, Australia, New Zealand, Malaysia, the UK, Ireland, and Switzerland
			//  11 in Japan, and for federal crimes in the US
			//  12-14 in Canada, China, Saudi Arabia, Egypt, and most of Europe and Latin America
			// that's the Old World, though; an argument could be made for just using minimum slave age here...
			SGProp.minAge = Math.max(V.minimumSlaveAge, 10);
			SGProp.maxAge = 16;
			SGProp.disableDisability = 1;
			if (random(0, 100) > 80 && (V.continent === "North America" || V.continent === "South America" || V.continent === "Australia")) {
				// indigenous kids are substantially more likely to end up in juvenile detention
				SGProp.race = V.continent === "Australia" ? "pacific islander" : "amerindian";
			}
			slave = GenerateNewSlave(null, SGProp);
			// detained kids are fed and given medical attention by the facility
			setHealth(slave, jsRandom(0, 60));
			if (!slave.weight.isBetween(-60, 60)) {
				slave.weight = jsRandom(-30, 15);
			}

			const criminal = App.Data.misc.juvenileCriminalPool.random();
			switch (criminal) {
				case "theft":
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for theft.";
					r += "is detained for theft.";
					slave.career = either("a street urchin", "an orphan", "a juvenile delinquent");
					slave.devotion = jsRandom(-70, -20);
					slave.trust = jsRandom(-100, -60);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					break;
				case "robbery":
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for robbery.";
					r += "is detained for robbery.";
					slave.career = either("a street urchin", "a juvenile delinquent");
					slave.devotion = jsRandom(-70, -20);
					slave.trust = jsRandom(-100, -60);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					break;
				case "pickpocketing":
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for repeat pick-pocketing.";
					r += "is detained for pick-pocketing.";
					slave.career = "a pick-pocket";
					slave.devotion = jsRandom(-50, 0);
					slave.trust = jsRandom(-100, -60);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					if (slave.weight > 10) {
						slave.weight = jsRandom(-50, 0);
					}
					break;
				case "assault":
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for assault.";
					r += "is detained for assault.";
					slave.career = either("a bully", "a bully hunter");
					slave.devotion = jsRandom(-70, -20);
					slave.trust = jsRandom(-100, -60);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					if (slave.muscles < 10) {
						slave.muscles = jsRandom(10, 45);
					}
					slave.skill.combat = 40;
					break;
				case "manslaughter":
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for manslaughter.";
					r += "is detained for manslaughter.";
					slave.devotion = jsRandom(-70, -20);
					slave.trust = jsRandom(-100, -60);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					break;
				case "smuggling":
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for smuggling goods into the Free City.";
					r += "is detained for smuggling goods.";
					slave.career = "a sweatshop worker";
					slave.devotion = jsRandom(-50, 0);
					slave.trust = jsRandom(-50, 0);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					break;
				case "mule":
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for smuggling illegal contraband inside $his body.";
					r += "is detained for being a drug mule.";
					slave.career = "a drug mule";
					slave.devotion = jsRandom(-20, 20);
					slave.trust = jsRandom(0, 20);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					slave.anus = 4;
					slave.bellySag += 5;
					slave.chem = 10 * jsRandom(1, 3);
					slave.addict = 100;
					break;
				case "prostitution": // the gem of the bunch
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for child prostitution.";
					r += "is detained for child prostitution, ironically.";
					slave.career = "a child prostitute";
					slave.devotion = jsRandom(0, 40); // likes the cut of your jib
					slave.trust = jsRandom(0, 20);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					if (slave.anus === 0) {
						slave.anus = jsRandom(2, 3);
					}
					if (slave.vagina === 0) {
						slave.vagina = jsRandom(2, 3);
					}
					slave.skill.whoring = jsRandom(15, 30);
					slave.skill.anal = jsRandom(15, 30);
					slave.skill.oral = jsRandom(15, 30);
					slave.skill.penetrative = jsRandom(15, 30);
					if (slave.vagina > 0) {
						slave.skill.vaginal = jsRandom(15, 30);
						if (slave.vaginaLube === 0) {
							slave.vaginaLube = 1;
						}
					}
					if (slave.energy < 20) {
						slave.energy = jsRandom(40, 95);
					}
					break;
				case "truancy":
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for repeated truancy.";
					r += "is detained for repeated truancy.";
					slave.career = either("a student from a public school", "a student from a private school");
					slave.devotion = jsRandom(-70, -20);
					slave.trust = jsRandom(-50, 0);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					if (slave.intelligenceImplant === 0) {
						slave.intelligenceImplant = 15;
					}
					break;
				case "curfew":
					slave.origin = "You purchased $his life at a prison sale. $He was locked away for repeated curfew violations.";
					r += "is detained for repeated curfew violations.";
					slave.career = either("a party girl", "a juvenile delinquent");
					slave.devotion = jsRandom(-70, -20);
					slave.trust = jsRandom(-50, 0);
					slave.hStyle = "buzzcut";
					slave.hLength = 0;
					if (slave.vagina === 0) {
						slave.vagina = jsRandom(1, 3);
						slave.skill.vaginal = jsRandom(5, 20);
					}
					if (slave.energy < 20) {
						slave.energy = jsRandom(20, 80);
					}
					break;
			}
			break;
		}
		default: {
			r += "Someone messed up. Market is not known.";
			break;
		}
	}
	return {text: r, slave: getGingeredSlave(slave, market, numArcology)};
};
