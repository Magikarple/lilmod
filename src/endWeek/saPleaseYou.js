/**
 * @param {FC.ReportSlave} slave
 * @returns {DocumentFragment|string}
 */
App.SlaveAssignment.pleaseYou = function saPleaseYou(slave) {
	/** @type {(string|HTMLElement|DocumentFragment)[]} */
	const r = [];

	const {
		he, him, his, himself, girl, He, His, wife
	} = getPronouns(slave);
	const playerPronouns = getPronouns(V.PC);
	const pcHands = hasBothArms(V.PC) ? "hands" : "hand";

	const fetishChange = fetishChangeChance(slave);
	const arcology = V.arcologies[0];
	const fuckSlavesCount = fuckSlavesLength() || 1; // don't divide by zero
	const energyPerSlave = Math.max(Math.ceil((V.PC.need - (V.PCSlutContacts === 2 ? 50 : 0) + (V.personalAttention.task === PersonalAttention.SEX ? 20 : 0)) / fuckSlavesCount), 0); // lets say about 2~3 need per act?
	const cumPerSlave = cumAmount(V.PC) / fuckSlavesCount; // deciliters per week
	let trainingEfficiency = 3 + Math.trunc(slave.devotion / 30) + ((slave.intelligence + slave.intelligenceImplant) / 32) + Math.trunc((V.PC.intelligence + V.PC.intelligenceImplant) / 64);
	const pMod = App.SlaveAssignment.PartTime.efficiencyModifier(slave);
	trainingEfficiency *= pMod;
	const canFuck = slave.rules.release.master !== 0 && !isPlayerFrigid() && energyPerSlave > 0;
	const nullPC = V.PC.dick === 0 && V.PC.vagina === -1;
	const PCNoTool = V.PC.dick === 0 && V.PC.vagina === 0 && V.PC.clit < 3;
	const hasAnyFluids = V.PC.balls > 0 || V.PC.prostate > 0 || (V.PC.vagina >= 0 && V.PC.dick === 0);
	const PlayerAggroSperm = V.PC.geneMods.aggressiveSperm === 1 && isVirile(V.PC);
	const initialNeed = V.PC.deferredNeed;

	let oralUse = 0;
	let oralQuality = 0;
	let oralPleasure = 0;
	let analUse = 0;
	let analQuality = 0;
	let analPleasure = 0;
	let vaginalUse = 0;
	let vaginalQuality = 0;
	let vaginalPleasure = 0;
	let mammaryUse = 0;
	let mammaryQuality = 0;
	let mammaryPleasure = 0;
	let penetrativeUse = 0;
	let penetrativeQuality = 0;
	let penetrativePleasure = 0;
	let cervixPump = 0;
	let acts = 0; // this might be able to become a const and set here. Depends on useAllHoles.
	let qualitySex = 0; // you want this to be equal or higher than your sex count, otherwise it will be unsatisfying
	let excessSex = 0; // unsatisfying sex from overfucking a slave. Too much of this causes damage to your girls' health and libido.
	let slaveNeed = 0;
	let playerNeed = 0;
	let dickSize = 0;
	let tinyDick = false;

	// controller variables used for fine tuning and other tweaks
	const libidoToActs = energyPerSlave / 2; // Amount of sex you want from the fucktoy this week.
	const baseQualitySexActs = slave.need / 5; // Base amount of sex the fucktoy wants (does not apply to oral and mammary, which divide by 2 and 1 respectively.
	const excessSexLimit = 15; // At what point a slave gets bitchy about being raped.
	const globalNeedMult = 1 + ((3 - V.baseDifficulty) / 10); // Controls how difficulty affects satisfaction

	// TODO: review saRules to make sure MS slaves are getting off enough. They should be availing themselves to the amenities available in your absence if permitted. They already will use the fuckpit, so consider use of the toys and other present slaves.
	// Footnote: somehow devising a system to allow them to join in on sexual acts to threesomes/etc to piggyback on other slaves' usage would work well. Tough due to the individual nature of the slave report though.

	jobPreface(slave);
	checkHoleAvailability(slave);
	if (!canFuck) {
		return useNone();
	}

	switch (slave.toyHole) {
		case ToyHole.PUSSY:
			// good for each
			useVagina(slave);
			break;
		case ToyHole.ASS:
			// good for each
			// more effective on slaves with prostates.
			useAnus(slave);
			break;
		case ToyHole.MOUTH:
			// highly favors player
			// cumsluts get off from it
			// cumsluts can get nulls off
			// good for virgin PCs
			useMouth(slave);
			break;
		case ToyHole.BOOBS:
			// low intensity
			// favors dick/clit PC
			// mediocre for femPC
			// boob fetishists get off from it
			// effective on slaves with huge nips or lactation
			// ineffective on oversized implants or small nips
			useBoobs(slave);
			break;
		case ToyHole.DICK:
			// reverse of pussy/ass
			if (V.PC.vagina < 1 && V.PC.anus === 0) {
				useDickVirgin(slave);
			} else {
				useDick(slave);
			}
			break;
		default:
			useAllHoles(slave);
	}
	cleanupSlaveNeed(slave);
	physicalEffects(slave);
	const familyMult = familyBonus(slave);
	addRep(slave, familyMult);
	if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
		mentalEffects(slave);
	}
	cleanupPlayerNeed();
	if (V.debugMode && slave.toyHole !== ToyHole.ALL) { // Due to scoping.
		showDebugDetails();
	}

	return App.Events.makeNode(r);

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function jobPreface(slave) {
		r.push(`serves you this week.`);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function checkHoleAvailability(slave) {
		if (slave.toyHole === ToyHole.PUSSY) {
			if (!canDoVaginal(slave)) {
				slave.toyHole = ToyHole.ALL;
			} else if (V.PC.dick > 0 && !canAchieveErection(V.PC)) {
				slave.toyHole = ToyHole.ALL;
			}
		} else if (slave.toyHole === ToyHole.ASS) {
			if (!canDoAnal(slave)) {
				slave.toyHole = ToyHole.ALL;
			} else if (V.PC.dick > 0 && !canAchieveErection(V.PC)) {
				slave.toyHole = ToyHole.ALL;
			}
		} else if (slave.toyHole === ToyHole.DICK) {
			if (!canPenetrate(slave)) {
				slave.toyHole = ToyHole.ALL;
			}
		}
	}

	function useNone() {
		r.push(`Since you've decided not to fuck ${him}, ${he} has to`);

		if (slave.devotion > 20) {
			r.push(`be content with simply keeping you company${slave.assignment === Job.MASTERSUITE ? ` and warming your bed` : ``} for now.`);
		} else if (slave.devotion > -50) {
			r.push(`keep you company${slave.assignment === Job.MASTERSUITE ? ` and warm your bed at night` : ``}, a job ${he} doesn't mind too much.`);
		} else {
			r.push(`keep you company${slave.assignment === Job.MASTERSUITE ? ` and warm your bed at night` : ``}, a job ${he} loathes. Still, it could be worse – you could decide you want to fuck ${him} after all.`);
		}

		physicalEffects(slave);
		const familyMult = familyBonus(slave);
		addRep(slave, familyMult);
		if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN) {
			mentalEffects(slave);
		}

		return r.join(' ');
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.SlaveActs|"penetrativeTease"} target
	 */
	function evaluateSexQuality(slave, target) {
		let quality = 1;
		if (target === "mammary") {
			if (slave.nipples === NippleShape.FUCKABLE && (canPenetrate(V.PC) || V.PC.clit >= 3)) {
				if (isHorny(slave)) {
					quality = 1.5;
				} else {
					quality = 1.2;
				}
			/*
			} else if (slave.nipples === NippleShape.DICKNIPS && V.PC.vagina > 0 && isPlayerReceptive()) {
				quality = 1.2;
			*/
			} else {
				if (slave.boobs >= 500) {
					quality = 1.0;
				} else if (slave.boobs < 300) {
					quality = 0.6;
				} else {
					quality = 0.8;
				}
			}
		} else if (target === "penetrativeTease") {
			if (slave.skill.penetrative >= 100) {
				quality = 1.5;
			} else if (slave.skill.penetrative > 60) {
				quality = 1;
			} else if (slave.skill.penetrative > 30) {
				quality = 0.7;
			} else if (slave.skill.penetrative > 10) {
				quality = 0.4;
			} else {
				quality = 0.2;
			}
		} else {
			if (slave.skill[target] >= 100) {
				quality = 2;
			} else if (slave.skill[target] > 60) {
				quality = 1.5;
			} else if (slave.skill[target] > 30) {
				quality = 1.2;
			} else if (slave.skill[target] > 10) {
				quality = 1;
			} else {
				quality = 0.8;
			}
		}
		if (target === "vaginal") {
			if (V.PC.dick > 0 && !canPenetrate(V.PC)) {
				quality -= 0.5;
			} else {
				quality += Math.max(.3 - (slave.vagina / 10), -0.3);
			}
			if (V.PC.vagina >= 0) {  // smart strapon WIP - reminder, this needs the text blurb to reflect that you can't put it on yourself if too pregnant (15000+)
				// quality *= 1.2;
			}
			if (slave.sexualFlaw === SexualFlaw.HATESPEN) {
				quality -= 0.1;
			}
			if (nullPC || PCNoTool) {
				quality -= 1.2;
			}
		} else if (target === "anal") {
			if (V.PC.dick > 0 && !canPenetrate(V.PC)) {
				quality -= 0.5;
			} else {
				quality += Math.max(.2 - (slave.anus / 10), -0.3);
			}
			if (V.PC.vagina >= 0) {  // smart strapon WIP
				// quality *= 1.2;
			}
			if (slave.sexualFlaw === SexualFlaw.HATESANAL) {
				quality -= 0.1;
			}
		} else if (target === "oral") {
			if (V.PC.dick !== 0 || nullPC) {
				quality += -0.1 + slave.lips / 200;
			}
			if (slave.teeth === "pointy") {
				quality -= 0.3;
			} else if ((slave.teeth === "fangs" || slave.teeth === "fang") && V.PC.dick !== 0) {
				quality -= 0.3;
			} else if ((slave.teeth === "straightening braces" || slave.teeth === "cosmetic braces") && V.PC.dick !== 0) {
				quality -= 0.1;
			} else if ((slave.teeth === "removable") && V.PC.dick !== 0) {
				quality += 0.1;
			}
			if (slave.sexualFlaw === SexualFlaw.HATESORAL) {
				quality -= 0.1;
			}
		} else if (target === "penetrative") {
			if (canDoVaginal(V.PC)) {
				dickSize = relativeDickSize(V.PC, slave, "vagina");
			} else {
				dickSize = relativeDickSize(V.PC, slave, "anus");
			}
			if (V.PC.prostate > 0) {
				quality += 0.5;
				if (PlayerAggroSperm) {
					quality += 1.5;
				}
			}
			if (dickSize > 0) {
				quality += 0.2;
			} else if (dickSize < 0) {
				quality -= 0.5;
			}
		}
		if (slave.sexualFlaw === SexualFlaw.APATHETIC) {
			quality -= 0.1;
		}
		if (slave.fetish === Fetish.MINDBROKEN) {
			quality -= 0.3;
		}
		return Math.max(quality, 0.2);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.SlaveActs|"penetrativeTease"} target
	 */
	function evaluateSlavePleasure(slave, target) {
		let pleasure = 1;
		if (target === "mammary") {
			// slaves do not gain equivalent release to a dicked PC, so have their own calcs.
			pleasure = Math.max((slave.fetish === Fetish.BOOBS ? slave.fetishStrength / 50 : 0.3), 0.3);
			if (slave.lactation > 0) { // convenient to do here so we can get an accurate breast size for the implant check
				if (slave.toyHole !== ToyHole.ALL) { // but it is handled differently in this case, as mammaryUse is not a guarantee
					slave.lactationDuration = 2;
					if (slave.boobsMilk > 0) {
						slave.boobs -= slave.boobsMilk;
						slave.boobsMilk = 0;
					}
				}
				pleasure += 1;
			}
			if (slave.boobsImplant / slave.boobs >= 0.90) {
				pleasure -= 0.3;
			} else if (slave.boobsImplant / slave.boobs >= 0.75) {
				pleasure -= 0.2;
			}
			if (slave.nipples === NippleShape.HUGE || slave.nipples === NippleShape.FUCKABLE) { // || slave.nipples === NippleShape.DICKNIPS
				pleasure += 0.7;
			} else if (slave.nipples === NippleShape.PUFFY || slave.nipples === NippleShape.INVERTED || slave.nipples === NippleShape.PARTIAL) {
				pleasure += 0.4;
			} else if (slave.nipples === NippleShape.CUTE) {
				pleasure += 0.2;
			} else if (slave.nipples === NippleShape.TINY) {
				pleasure += 0.1;
			}
			// everything else lacks enough sensitivity to give a bonus
		} else if (target === "penetrativeTease") {
			pleasure = 1.2 + (isPCCareerInCategory("escort") ? 0.5 : 0);
			pleasure += -0.1 + V.PC.lips / 200;
			if (slave.geneMods.aggressiveSperm === 1 && slave.balls > 0 && slave.vasectomy !== 1 && isVirile(slave)) { // does not affect sex counts here. PC takes it until slave orgasms?
				pleasure *= 1.2;
			}
		} else if (target === "vaginal") {
			pleasure = 1.2; // base player skill
			if (V.PC.dick > 0) {
				if (canPenetrate(V.PC)) {
					dickSize = relativeDickSize(slave, V.PC, "vagina");
					if (dickSize > 0) {
						pleasure += 0.2;
					} else if (dickSize < 0) {
						pleasure -= 0.5;
						tinyDick = true;
					}
				} else {
					pleasure -= 0.7;
				}
			} else { // smart strapon WIP
				// pleasure += 0.5
			}
			if (slave.prostate > 0) {
				pleasure += 0.5;
			}
			if (slave.skill[target] >= 100) {
				pleasure += 0.6;
			} else if (slave.skill[target] > 60) {
				pleasure += 0.3;
			} else if (slave.skill[target] > 30) {
				pleasure += 0.1;
			}
		} else if (target === "anal") {
			pleasure = 1.2; // base player skill
			if (V.PC.dick > 0) {
				if (canPenetrate(V.PC)) {
					dickSize = relativeDickSize(slave, V.PC, "anus");
					if (dickSize > 0) {
						pleasure += 0.2;
					} else if (dickSize < 0) {
						pleasure -= 0.5;
						tinyDick = true;
					}
				} else {
					pleasure -= 0.7;
				}
			} else { // smart strapon WIP
				// pleasure += 0.5
			}
			if (slave.prostate > 0) {
				pleasure += 0.5;
			}
			if (slave.skill[target] >= 100) {
				pleasure += 0.6;
			} else if (slave.skill[target] > 60) {
				pleasure += 0.3;
			} else if (slave.skill[target] > 30) {
				pleasure += 0.1;
			}
		} else if (target === "oral") {
			// slave does not gain release from sucking/eating you off. They only do if it is their fetish.
			pleasure = (slave.fetish === Fetish.CUMSLUT ? slave.fetishStrength / 50 : -0.4);
			// and if they are a cum addict, you had better have fluids for them
			if (slave.sexualFlaw === SexualFlaw.CUMADDICT) {
				if (hasAnyFluids) {
					pleasure += 1;
				} else {
					pleasure -= 2.5;
				}
			} else {
				if (slave.skill[target] >= 100) {
					pleasure += 0.5;
				} else if (slave.skill[target] > 60) {
					pleasure += 0.2;
				}
			}
		} else if (target === "penetrative") {
			// this might need to be adjusted based off pregmood, so placing it here for now
			pleasure = 1.5 + (isPCCareerInCategory("escort") ? 0.7 : 0);
			if (V.PC.vagina > 0) {
				pleasure += Math.max(.3 - (V.PC.vagina / 10), -0.3);
			} else {
				pleasure += Math.max(.3 - (V.PC.anus / 10), -0.3);
			}
		}
		return Math.max(pleasure, 0.1);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function useVagina(slave) {
		vaginalQuality = evaluateSexQuality(slave, "vaginal");
		vaginalPleasure = evaluateSlavePleasure(slave, "vaginal");
		acts = libidoToActs;
		if (acts > 200) {
			vaginalUse = random(acts, acts + 35);
		} else if (acts > 100) {
			vaginalUse = random(acts, acts + 30);
		} else if (acts > 50) {
			vaginalUse = random(acts, acts + 15);
		} else if (acts > 25) { // at around this point, the slave is not going to be keeping up
			vaginalUse = random(acts, acts + 8);
		} else if (acts > 10) {
			vaginalUse = random(acts, acts + 5);
		} else if (acts > 5) {
			vaginalUse = random(acts, acts + 3);
		} else {
			vaginalUse = random(acts, acts + 2);
		}
		if (PlayerAggroSperm) {
			vaginalUse = Math.round(vaginalUse / 2);
		} else {
			vaginalUse = Math.round(vaginalUse);
		}
		if (isHorny(slave)) { // unless she is also a sex maniac
			qualitySex = vaginalUse;
		} else {
			qualitySex = baseQualitySexActs;
			qualitySex *= (100 + slave.muscles) / 100;
			if (slave.assignment === Job.FUCKTOY) {
				qualitySex = Math.ceil(qualitySex * restEffects(slave, 11));
			} else {
				qualitySex = Math.ceil(qualitySex * healthPenalty(slave));
			}
		}
		if (slave.fuckdoll === 0) {
			r.push(`${He} spends the week`);
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`unaware of your intent to use ${his} pussy.`);
				qualitySex = 1;
			} else if (slave.trust < -20) {
				r.push(`in terrified compliance with your use of ${his} pussy.`);
				qualitySex--;
			} else if (slave.trust > 20 && slave.devotion <= 20) {
				r.push(`defiantly attempting to make your use of ${his} pussy unpleasant.`);
				qualitySex -= 10;
			} else if (slave.devotion < -20) {
				r.push(`alternately struggling and lying corpse-like as you use ${his} pussy.`);
				qualitySex -= 5;
			} else if (slave.devotion <= 20) {
				r.push(`reluctantly accepting your use of ${his} pussy.`);
				qualitySex--;
			} else if (slave.fetishKnown === 1 && slave.fetish === Fetish.SUBMISSIVE) {
				r.push(`as your adoring submissive, seeing to your pleasure with ${his} womanhood.`);
				qualitySex += 3;
			} else if (slave.devotion <= 50) {
				r.push(`obediently serving you in the classical way, taking you into ${his} womanhood.`);
				qualitySex++;
			} else {
				r.push(`serving you in the classical way, warming your bed and lovingly taking you into ${his} womanhood.`);
				qualitySex += 3;
			}
			if (slave.assignment === Job.CONCUBINE) {
				qualitySex += 6;
			} else if (slave.assignment === Job.MASTERSUITE) {
				qualitySex += 3;
			}
			if (FutureSocieties.isActive('FSSlaveProfessionalism') && slave.devotion > 20 && slave.energy < 40 && slave.skill.vaginal > 60) {
				qualitySex += 20;
			}
			qualitySex = Math.max(qualitySex, 0);
			excessSex = vaginalUse - qualitySex;
			if (slave.assignment === Job.CONCUBINE || slave.assignment === Job.HEADGIRL) {
				if (excessSex > 0) {
					r.push(`You choose to fuck ${him}`);
					excessSex = 0;
				} else {
					r.push(`You have the sexual energy to fuck ${him}`);
				}
				vaginalUse = qualitySex;
			} else if (slave.assignment === Job.MASTERSUITE) {
				if (excessSex >= excessSexLimit) {
					r.push(`You choose to fuck ${him}`);
					vaginalUse = qualitySex + excessSexLimit -1;
				} else {
					r.push(`You have the sexual energy to fuck ${him}`);
				}
			} else {
				r.push(`You have the sexual energy to fuck ${him}`);
			}
			// cull excess if satisfied
			if (excessSex > 0) {
				if (qualitySex * vaginalQuality >= energyPerSlave) {
					vaginalUse = vaginalUse - excessSex;
					excessSex = 0;
				}
			}
			if (slave.fetish === Fetish.MINDBROKEN) {
				if (vaginalUse >= 200) {
					r.push(`constantly.`);
				} else if (vaginalUse >= 100) {
					r.push(`about once an hour.`);
				} else if (vaginalUse >= 50) {
					r.push(`throughout the day.`);
				} else if (vaginalUse >= 14) {
					r.push(`several times a day.`);
				} else if (vaginalUse >= 7) {
					r.push(`at least once a day.`);
				} else {
					r.push(`on occasion.`);
				}
				r.push(`${He} doesn't react, even if ${his} body does, so the sex isn't very satisfying.`);
				excessSex = 0;
			} else if (slave.trust >= -20 && slave.devotion <= 20) {
				if (vaginalUse >= 200) {
					r.push(`constantly; the eternal`);
					slave.devotion -= 15;
					slave.trust -= 30;
				} else if (vaginalUse >= 100) {
					r.push(`about once an hour; the unending`);
					slave.devotion -= 10;
					slave.trust -= 20;
				} else if (vaginalUse >= 50) {
					r.push(`throughout the day; the constant`);
					slave.devotion -= 7;
					slave.trust -= 15;
				} else if (vaginalUse >= 14) {
					r.push(`several times a day; the frequent`);
					slave.devotion -= 5;
					slave.trust -= 15;
				} else if (vaginalUse >= 7) {
					r.push(`at least once a day; the regular`);
					slave.devotion -= 3;
					slave.trust -= 9;
				} else {
					r.push(`on occasion; the threat of`);
					slave.devotion -= 3;
					slave.trust -= 3;
				}
				r.push(`rape fills ${him} with <span class="devotion dec">revulsion</span> and <span class="trust dec">fear.</span>`);
				if (excessSex > 0) {
					if (qualitySex > 0) {
						r.push(`You were sexually too much for ${him}, and once ${he} fell behind, you were stuck unsatisfyingly fucking ${his} inert body.`);
					} else {
						r.push(`The sex was terrible, so you ${V.PC.balls > 0 ? `mostly just ended up using ${him} as a cum dump` : `took whatever pleasure you could extract from ${him} and moved on to better things`}.`);
					}
				}
			} else if (slave.devotion <= 20) {
				if (vaginalUse >= 200) {
					r.push(`constantly; submitting to always having you inside ${him}`);
					slave.devotion += 6;
				} else if (vaginalUse >= 100) {
					r.push(`about once an hour; submitting to your seemingly endless use`);
					slave.devotion += 5;
				} else if (vaginalUse >= 50) {
					r.push(`throughout the day; submitting to your constant use`);
					slave.devotion += 4;
				} else if (vaginalUse >= 14) {
					r.push(`several times a day; submitting to your frequent use`);
					slave.devotion += 3;
				} else if (vaginalUse >= 7) {
					r.push(`at least once a day; submitting to your regular use`);
					slave.devotion += 2;
				} else {
					r.push(`on occasion; submitting to your use`);
					slave.devotion += 1;
				}
				r.push(`<span class="devotion inc">habituates ${him}</span> to being your sex slave.`);
				if (excessSex > 0) {
					if (qualitySex > 0) {
						r.push(`You were sexually too much for ${him}, and once ${he} fell behind, you were stuck unsatisfyingly fucking ${his} inert body.`);
					} else {
						r.push(`The sex was terrible, so you ${V.PC.balls > 0 ? `mostly just ended up using ${him} as a cum dump` : `took whatever pleasure you could extract from ${him} and moved on to better things`}.`);
					}
				}
			} else {
				if (vaginalUse >= 200) {
					r.push(`constantly; non-stop`);
					slave.devotion += 3;
					slave.trust += 1;
				} else if (vaginalUse >= 100) {
					r.push(`about once an hour; the seemingly endless`);
					slave.devotion += 3;
					slave.trust += 1;
				} else if (vaginalUse >= 50) {
					r.push(`throughout the day; constant,`);
					slave.devotion += 3;
					slave.trust += 1;
				} else if (vaginalUse >= 14) {
					r.push(`several times a day; frequent,`);
					slave.devotion += 3;
					slave.trust += 1;
				} else if (vaginalUse >= 7) {
					r.push(`several times a day; regular,`);
					slave.devotion += 2;
					slave.trust += 1;
				} else {
					r.push(`on occasion;`);
					slave.devotion += 1;
					slave.trust += 1;
				}
				if (excessSex < excessSexLimit) {
					r.push(`enjoyable sex with you draws ${him} <span class="devotion inc">closer to you</span> and encourages ${him} to <span class="trust inc">trust you.</span>`);
					if (excessSex > 0) { // qualitySex should always be at least 1 here
						r.push(`${He} was unable to keep up with your libido, so to prevent it from turning into an unpleasant series of rapes, you played up the intimacy of the acts to keep ${his} faith unblemished.`);
					}
				} else if (slave.sexualFlaw === SexualFlaw.SELFHATING) { // it becomes rape
					r.push(`sex with you draws ${him} <span class="devotion inc">closer to you,</span> but there is no way for ${him} to keep up with your libido. You continue taking pleasure from ${him} without regard, and since ${his} life holds no value to ${him}, ${he} <span class="trust inc">wouldn't want it any other way.</span>`);
					slave.trust += 2;
				} else if (slave.sexualFlaw === SexualFlaw.NEGLECT) {
					r.push(`enjoyable sex with you draws ${him} <span class="devotion inc">closer to you.</span> Most slaves wouldn't be able to keep up with your libido, but since your needs are paramount, ${he} is happy to be <span class="trust inc">relied upon</span> to service you for as along as you require.`);
					slave.trust += 1;
				} else {
					r.push(`sex with you draws ${him} <span class="devotion inc">closer to you,</span> but there is no way for ${him} to keep up with your libido. You continue taking pleasure from ${him} without regard, even after ${he} has given you everything ${he} can manage, utterly <span class="trust dec">shattering the illusion</span> that ${he} is anything more than a toy for your amusement.`);
					slave.trust -= Math.min(Math.trunc(excessSex / 3), 20);
				}
			}
			if (qualitySex >= vaginalUse || slave.fetish === Fetish.MINDBROKEN) {
				slaveNeed -= (vaginalUse * (5 * vaginalPleasure));
				playerNeed -= (vaginalUse * vaginalQuality);
			} else {
				slaveNeed -= (qualitySex * (5 * vaginalPleasure));
				playerNeed -= (qualitySex * vaginalQuality);
				if ((slave.sexualFlaw === SexualFlaw.SELFHATING || slave.sexualFlaw === SexualFlaw.NEGLECT) && excessSex >= excessSexLimit) {
					if (nullPC || PCNoTool) {
						playerNeed -= (excessSex * .1);
					} else {
						playerNeed -= excessSex;
					}
					slave.need = 0;
				} else {
					slaveNeed -= (excessSex * .5);
					if (nullPC || PCNoTool) {
						playerNeed -= (excessSex * .1);
					} else {
						playerNeed -= (excessSex * .5);
					}
				}
			}
			if (nullPC || PCNoTool) {
				r.push(`You <span class="warning">aren't properly equipped to get sexual release from penetration,</span> so your efforts were more for show than relief.`);
				if (initialNeed < playerNeed) {
					r.push(`In fact, all the action has you more hot and bothered than you started.`);
				}
			} else if (qualitySex > 0) {
				if (slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.skill.vaginal >= 100) {
						r.push(`${His} masterful skill makes every thrust worthwhile.`);
					} else if (slave.skill.vaginal > 60) {
						r.push(`${His} expert skill leaves you feeling wonderfully drained post-coitus.`);
					} else if (slave.skill.vaginal > 30) {
						r.push(`${His} skill helps you reach those especially powerful climaxes.`);
					} else if (slave.skill.vaginal > 10) {
						r.push(`${He}'s skilled enough to be an enjoyable fuck, but not enough to stand out as a great one.`);
					} else {
						r.push(`${He}'s clueless at how to properly use ${his} womanhood to please a dick, making sex with ${him} awkward and lacking.`);
					}
				}
				if (V.PC.dick > 0 && !canPenetrate(V.PC)) {
					r.push(`Your penis can't exactly fit into a ${girl}, so you're forced to settle for grinding the length of it against ${his} crotch.`);
				} else {
					if (slave.vagina > 4) {
						r.push(`${He}'s very loose, making things far less pleasurable.`);
					} else if (slave.vagina > 3) {
						r.push(`${He}'s unpleasantly loose, making things less pleasurable.`);
					} else if (slave.vagina > 2) {
						r.push(`${He}'s a little loose, but not overly so.`);
					} else if (slave.vagina > 1) {
						r.push(`${He}'s reasonably tight, amplifying your pleasure.`);
					} else {
						r.push(`${He}'s nice and tight, amplifying your pleasure.`);
					}
				}
				if (V.PC.vagina >= 0 && V.PC.clit < 3) {
					// r.push(`Your smart strap-on dynamically adjusts itself to maximize your fun.`);
				}
				if (slave.sexualFlaw === SexualFlaw.HATESPEN) {
					r.push(`${He} hates being penetrated and the resulting panic over the thought is detrimental to your enjoyment.`);
				}
				if (slave.sexualFlaw === SexualFlaw.APATHETIC) {
					r.push(`${He} just lies there and takes it, even if ${he} enjoys it.`);
				}
				if (vaginalQuality < 1) {
					r.push(`Simply put, ${he} is <span class="noteworthy">a bad lay.</span>`);
				}
				if (PlayerAggroSperm) {
					r.push(`Your gene therapy makes getting off take nearly twice as long as it used to, but the payoff when you finally blow that backed up load is well worth it.`);
					if (V.PC.dick === 0) {
						tryKnockMeUp(V.PC, (.1 * vaginalUse) - 50, 2, V.PC);
					}
				}
				if (slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.sexualFlaw === SexualFlaw.HATESPEN && slave.devotion > 50 && excessSex < excessSexLimit) {
						r.push(`The emotional closeness <span class="flaw break">resolves ${his} hatred of penetration.</span>`);
						slave.sexualFlaw = SexualFlaw.NONE;
					} else if (slave.sexualFlaw === SexualFlaw.NONE && slave.sexualQuirk !== SexualQuirk.STRUGGLE && excessSex >= excessSexLimit && excessSex >= random(-100, 100)) {
						r.push(`${His} sore, abused vagina leaves ${him} <span class="flaw gain">dreading further penetration.</span>`);
						slave.sexualFlaw = SexualFlaw.HATESPEN;
					}
					if (slave.skill.vaginal < 100) {
						r.push(`After a lot of time spent having vanilla sex, ${his} <span class="skill inc">vaginal skill improves.</span>`);
						r.push(slaveSkillIncrease('vaginal', slave, trainingEfficiency));
					}
				}
			}
			if (V.PC.dick !== 0 && canPenetrate(V.PC)) {
				if (slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.fetish === Fetish.SUBMISSIVE) {
						r.push(`${He} frequently climaxes with your`);
						if (perceivedGender(V.PC) < -1) {
							r.push(`strong`);
						} else {
							r.push(`soft`);
						}
						r.push(`${pcHands} holding ${him} and your cock spreading heat through ${his} core,`);
						if (slave.fetishKnown === 1) {
							r.push(`<span class="devotion inc">fulfilling ${his} life's role completely.</span>`);
						} else {
							r.push(`${he} <span class="devotion inc">seems to enjoy</span> being your fucktoy.`);
						}
						slave.devotion += 2;
					} else if (fetishChange > random(0, 100)) {
						slave.fetish = Fetish.SUBMISSIVE;
						slave.fetishKnown = 1;
						slave.fetishStrength = 10;
						r.push(`${He} frequently climaxes with your`);
						if (perceivedGender(V.PC) < -1) {
							r.push(`strong`);
						} else {
							r.push(`soft`);
						}
						r.push(`${pcHands} holding ${him} and your cock spreading heat through ${his} core, teaching ${him} that <span class="fetish gain">a ${girl}'s role is to please a ${playerPronouns.woman}.</span>`);
					}
				}
			}
		} else {
			r.push(`You keep ${him} with you all week, using ${him} as your personal sex toy`);
			if (vaginalUse >= 200) {
				r.push(`constantly.`);
			} else if (vaginalUse >= 100) {
				r.push(`about once an hour.`);
			} else if (vaginalUse >= 50) {
				r.push(`throughout the day.`);
			} else if (vaginalUse >= 14) {
				r.push(`several times a day.`);
			} else if (vaginalUse >= 7) {
				r.push(`at least once a day.`);
			} else {
				r.push(`on occasion.`);
			}
			r.push(`When you're not using ${him}, ${he}`);
			if (!canStand(slave)) {
				r.push(`rests`);
			} else {
				r.push(`stands`);
			}
			r.push(`nearby, waiting silently for your order to present ${his} pussy.`);
			if (nullPC || PCNoTool) {
				playerNeed -= (vaginalUse * .2);
			} else {
				playerNeed -= vaginalUse;
			}
			slaveNeed -= (vaginalUse * vaginalPleasure);
			excessSex = 0;
		}
		if (V.PC.dick !== 0 && canPenetrate(V.PC)) {
			tryKnockMeUp(slave, vaginalUse, 0, V.PC);
		}
		seX(slave, "vaginal", V.PC, "penetrative", vaginalUse);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function useAnus(slave) {
		analQuality = evaluateSexQuality(slave, "anal");
		analPleasure = evaluateSlavePleasure(slave, "anal");
		acts = libidoToActs;
		if (acts > 200) {
			analUse = random(acts, acts + 35);
		} else if (acts > 100) {
			analUse = random(acts, acts + 30);
		} else if (acts > 50) {
			analUse = random(acts, acts + 15);
		} else if (acts > 25) { // at around this point, the slave is not going to be keeping up
			analUse = random(acts, acts + 8);
		} else if (acts > 10) {
			analUse = random(acts, acts + 5);
		} else if (acts > 5) {
			analUse = random(acts, acts + 3);
		} else {
			analUse = random(acts, acts + 2);
		}
		if (PlayerAggroSperm) {
			analUse = Math.round(analUse / 2);
		} else {
			analUse = Math.round(analUse);
		}
		if (isHorny(slave)) { // unless she is also a sex maniac
			qualitySex = analUse;
		} else {
			qualitySex = baseQualitySexActs;
			qualitySex *= (100 + slave.muscles) / 100;
			if (slave.assignment === Job.FUCKTOY) {
				qualitySex = Math.ceil(qualitySex * restEffects(slave, 11));
			} else {
				qualitySex = Math.ceil(qualitySex * healthPenalty(slave));
			}
		}
		if (slave.fuckdoll === 0) {
			r.push(`${He} spends the week`);
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`unaware of your intent to use ${his} anus.`);
				qualitySex = 1;
			} else if (slave.trust < -20) {
				r.push(`in terrified compliance with your use of ${his} anus.`);
				qualitySex--;
			} else if (slave.trust > 20 && slave.devotion <= 20) {
				r.push(`defiantly attempting to make your use of ${his} anus unpleasant.`);
				qualitySex -= 10;
			} else if (slave.devotion < -20) {
				r.push(`struggling and screaming as you sodomize ${him}.`);
				qualitySex -= 5;
			} else if (slave.devotion <= 20) {
				r.push(`writhing in pain as you sodomize ${him}.`);
				qualitySex--;
			} else if (slave.devotion <= 50) {
				r.push(`obediently submitting to your use of ${his} butthole.`);
				qualitySex++;
			} else if (slave.fetishKnown === 1 && slave.fetish === Fetish.BUTTSLUT) {
				r.push(`as your adoring anal slave, orgasming to the feel of`);
				if (V.PC.dick !== 0 && canPenetrate(V.PC)) {
					r.push(`you shooting your seed up`);
				} else if (V.PC.dick !== 0) {
					r.push(`your turgid erection rubbing against`);
				} else if (V.PC.clit >= 3) {
					r.push(`your clit up`);
				} else {
					r.push(`your favorite strap-on up`);
				}
				r.push(`${his} ass.`);
				qualitySex += 3;
			} else {
				r.push(`warming your bed and devotedly serving your sexual needs with ${his} anus.`);
				qualitySex += 2;
			}
			if (slave.assignment === Job.CONCUBINE) {
				qualitySex += 6;
			} else if (slave.assignment === Job.MASTERSUITE) {
				qualitySex += 3;
			}
			if (FutureSocieties.isActive('FSSlaveProfessionalism') && slave.devotion > 20 && slave.energy < 40 && slave.skill.anal > 60) {
				qualitySex += 20;
			}
			qualitySex = Math.max(qualitySex, 0);
			excessSex = analUse - qualitySex;
			if (slave.assignment === Job.CONCUBINE || slave.assignment === Job.HEADGIRL) {
				if (excessSex > 0) {
					r.push(`You choose to fuck ${his} butt`);
					excessSex = 0;
				} else {
					r.push(`You have the sexual energy to fuck ${his} butt`);
				}
				analUse = qualitySex;
			} else if (slave.assignment === Job.MASTERSUITE) {
				if (excessSex >= excessSexLimit) {
					r.push(`You choose to fuck ${his} butt`);
					analUse = qualitySex + excessSexLimit -1;
				} else {
					r.push(`You have the sexual energy to fuck ${his} butt`);
				}
			} else {
				r.push(`You have the sexual energy to fuck ${his} butt`);
			}
			// cull excess if satisfied
			if (excessSex > 0) {
				if (qualitySex * analQuality >= energyPerSlave) {
					analUse = analUse - excessSex;
					excessSex = 0;
				}
			}
			if (slave.fetish === Fetish.MINDBROKEN) {
				if (analUse >= 200) {
					r.push(`constantly.`);
				} else if (analUse >= 100) {
					r.push(`about once an hour.`);
				} else if (analUse >= 50) {
					r.push(`throughout the day.`);
				} else if (analUse >= 14) {
					r.push(`several times a day.`);
				} else if (analUse >= 7) {
					r.push(`at least once a day.`);
				} else {
					r.push(`on occasion.`);
				}
				r.push(`${He} doesn't react, even if ${his} body does, so the sex isn't very satisfying.`);
				excessSex = 0;
			} else if (slave.trust >= -20 && slave.devotion <= 20) {
				if (analUse >= 200) {
					r.push(`constantly; the eternal`);
					slave.devotion -= 15;
					slave.trust -= 30;
				} else if (analUse >= 100) {
					r.push(`about once an hour; the unending`);
					slave.devotion -= 10;
					slave.trust -= 20;
				} else if (analUse >= 50) {
					r.push(`throughout the day; the constant`);
					slave.devotion -= 7;
					slave.trust -= 15;
				} else if (analUse >= 14) {
					r.push(`several times a day; the frequent`);
					slave.devotion -= 5;
					slave.trust -= 15;
				} else if (analUse >= 7) {
					r.push(`at least once a day; the regular`);
					slave.devotion -= 3;
					slave.trust -= 9;
				} else {
					r.push(`on occasion; the threat of`);
					slave.devotion -= 3;
					slave.trust -= 3;
				}
				r.push(`anal rape fills ${him} with <span class="devotion dec">revulsion</span> and <span class="trust dec">fear.</span>`);
				if (excessSex > 0) {
					if (qualitySex > 0) {
						r.push(`You were sexually too much for ${him}, and once ${he} fell behind, you were stuck unsatisfyingly fucking ${his} inert body.`);
					} else {
						r.push(`The sex was terrible, so you ${V.PC.balls > 0 ? `mostly just ended up using ${him} as a cum dump` : `took whatever pleasure you could extract from ${him} and moved on to better things`}.`);
					}
				}
			} else if (slave.devotion <= 20) {
				if (analUse >= 200) {
					r.push(`constantly; having you always inside ${his} rear`);
					slave.devotion += 6;
				} else if (analUse >= 100) {
					r.push(`about once an hour; having ${his} rear endlessly penetrated by you`);
					slave.devotion += 5;
				} else if (analUse >= 50) {
					r.push(`throughout the day; constantly allowing you to penetrate ${his} rear`);
					slave.devotion += 4;
				} else if (analUse >= 14) {
					r.push(`several times a day; frequently allowing you to penetrate ${his} rear`);
					slave.devotion += 3;
				} else if (analUse >= 7) {
					r.push(`at least once a day; regularly allowing you to penetrate ${his} rear`);
					slave.devotion += 2;
				} else {
					r.push(`on occasion; allowing you to penetrate ${his} rear`);
					slave.devotion += 1;
				}
				r.push(`<span class="devotion inc">habituates ${him}</span> to being your sex slave.`);
				if (excessSex > 0) {
					if (qualitySex > 0) {
						r.push(`You were sexually too much for ${him}, and once ${he} fell behind, you were stuck unsatisfyingly fucking ${his} inert body.`);
					} else {
						r.push(`The sex was terrible, so you ${V.PC.balls > 0 ? `mostly just ended up using ${him} as a cum dump` : `took whatever pleasure you could extract from ${him} and moved on to better things`}.`);
					}
				}
			} else {
				if (analUse >= 200) {
					r.push(`constantly; chain`);
					slave.devotion += 3;
					slave.trust += 1;
				} else if (analUse >= 100) {
					r.push(`about once an hour; endlessly`);
					slave.devotion += 3;
					slave.trust += 1;
				} else if (analUse >= 50) {
					r.push(`throughout the day; constantly`);
					slave.devotion += 3;
					slave.trust += 1;
				} else if (analUse >= 14) {
					r.push(`several times a day; frequently`);
					slave.devotion += 3;
					slave.trust += 1;
				} else if (analUse >= 7) {
					r.push(`at least once a day; regularly`);
					slave.devotion += 2;
					slave.trust += 1;
				} else {
					r.push(`on occasion;`);
					slave.devotion += 1;
					slave.trust += 1;
				}
				if (slave.sexualFlaw === SexualFlaw.ANALADDICT) {
					r.push(`climaxing to your penetration of ${his} rear <span class="devotion inc">binds ${him} to you.</span>`);
					if (excessSex >= excessSexLimit) {
						r.push(`Most slaves wouldn't be able to keep up with your libido, but since any moment spent without something up ${his} ass is a moment wasted, ${he} is thrilled that ${he} can <span class="trust inc"> rely on you</span> to keep ${him} filled.`);
					} else {
						r.push(`By feeding ${his} addiction to anal sex, you foster a <span class="trust inc">trust in you</span> to keep the void in ${his} rear filled.`);
					}
					slave.trust += 3;
				} else if (excessSex < excessSexLimit) {
					r.push(`climaxing to your penetration of ${his} rear brings ${him} <span class="devotion inc">closer to you</span> and encourages ${him} to <span class="trust inc">trust you.</span>`);
					if (excessSex > 0) { // qualitySex should always be at least 1 here
						r.push(`${He} was unable to keep up with your libido, so to prevent it from turning into an unpleasant series of anal rapes, you played up the intimacy of the acts to keep ${his} faith unblemished.`);
					}
				} else if (slave.sexualFlaw === SexualFlaw.SELFHATING) { // it becomes rape
					r.push(`climaxing to your penetration of ${his} rear brings ${him} <span class="devotion inc">closer to you,</span> but there is no way for ${him} to keep up with your libido. You continue taking pleasure from ${him} without regard, and since ${his} life holds no value to ${him}, ${he} <span class="trust inc">wouldn't want it any other way.</span>`);
					slave.trust += 2;
				} else if (slave.sexualFlaw === SexualFlaw.NEGLECT) {
					r.push(`climaxing to your penetration of ${his} rear draws ${him} <span class="devotion inc">closer to you.</span> Most slaves wouldn't be able to keep up with your libido, but since your needs are paramount, ${he} is happy to be <span class="trust inc">relied upon</span> to service you for as along as you require.`);
					slave.trust += 1;
				} else {
					r.push(`climaxing to your penetration of ${his} rear draws ${him} <span class="devotion inc">closer to you,</span> but there is no way for ${him} to keep up with your libido. You continue taking pleasure from ${him} without regard, even after ${he} has given you everything ${he} can manage, utterly <span class="trust dec">shattering the illusion</span> that ${he} is anything more than a toy for your amusement.`);
					slave.trust -= Math.min(Math.trunc(excessSex / 3), 20);
				}
			}
			if (qualitySex >= analUse || slave.sexualFlaw === SexualFlaw.ANALADDICT || slave.fetish === Fetish.MINDBROKEN) {
				slaveNeed -= (analUse * (5 * analPleasure));
				playerNeed -= (analUse * analQuality);
			} else {
				slaveNeed -= (qualitySex * (5 * analPleasure));
				playerNeed -= (qualitySex * analQuality);
				if ((slave.sexualFlaw === SexualFlaw.SELFHATING || slave.sexualFlaw === SexualFlaw.NEGLECT) && excessSex >= excessSexLimit) {
					if (nullPC || PCNoTool) {
						playerNeed -= (excessSex * .1);
					} else {
						playerNeed -= excessSex;
					}
					slave.need = 0;
				} else {
					slaveNeed -= (excessSex * .5);
					if (nullPC || PCNoTool) {
						playerNeed -= (excessSex * .1);
					} else {
						playerNeed -= (excessSex * .5);
					}
				}
			}
			if (nullPC || PCNoTool) {
				r.push(`You <span class="warning">aren't properly equipped to get sexual release from penetration,</span> so your efforts were more for show than relief.`);
				if (initialNeed < playerNeed) {
					r.push(`In fact, all the action has you more hot and bothered than you started.`);
				}
			} else if (qualitySex > 0) {
				if (slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.skill.anal >= 100) {
						r.push(`${His} masterful skill makes every thrust worthwhile.`);
					} else if (slave.skill.anal > 60) {
						r.push(`${His} expert skill leaves you feeling wonderfully drained post-coitus.`);
					} else if (slave.skill.anal > 30) {
						r.push(`${His} skill helps you reach those especially powerful climaxes.`);
					} else if (slave.skill.anal > 10) {
						r.push(`${He}'s skilled enough to be an enjoyable fuck, but not enough to stand out as a great one.`);
					} else {
						r.push(`${He}'s clueless at how to properly use ${his} anus to please a dick, making sex with ${him} awkward and lacking.`);
					}
				}
				if (V.PC.dick > 0 && !canPenetrate(V.PC)) {
					r.push(`Your penis can't exactly fit into ${his} rectum, so you're forced to settle for hotdogging ${his} buns.`);
				} else {
					if (slave.anus > 4) {
						r.push(`${He}'s very loose, making things far less pleasurable.`);
					} else if (slave.anus > 3) {
						r.push(`${He}'s unpleasantly loose, making things less pleasurable.`);
					} else if (slave.anus > 2) {
						r.push(`${He}'s a little loose, but not overly so.`);
					} else if (slave.anus > 1) {
						r.push(`${He}'s reasonably tight, amplifying your pleasure.`);
					} else {
						r.push(`${He}'s nice and tight, amplifying your pleasure.`);
					}
				}
				if (V.PC.vagina >= 0 && V.PC.clit < 3) {
					// r.push(`Your smart strap-on dynamically adjusts itself to maximize your fun.`);
				}
				if (slave.sexualFlaw === SexualFlaw.HATESANAL) {
					r.push(`${He} hates being anally penetrated and the resulting panic over the thought is detrimental to your enjoyment.`);
				}
				if (slave.sexualFlaw === SexualFlaw.APATHETIC) {
					r.push(`${He} just lies there and takes it, even if ${he} enjoys it.`);
				}
				if (analQuality < 1) {
					r.push(`Simply put, ${he} is <span class="noteworthy">a bad lay.</span>`);
				}
			}
			if (PlayerAggroSperm) {
				r.push(`Your gene therapy makes getting off take nearly twice as long as it used to, but the payoff when you finally blow that backed up load is well worth it.`);
				if (V.PC.dick === 0) {
					tryKnockMeUp(V.PC, (.1 * analUse) - 50, 2, V.PC);
				}
			}
			if (slave.fetish !== Fetish.MINDBROKEN) {
				if (slave.sexualFlaw === SexualFlaw.HATESANAL && slave.devotion > 50 && excessSex < excessSexLimit) {
					r.push(`${He}'s devoted enough to derive emotional closeness from buttsex, which <span class="flaw break">resolves ${his} hatred of the act.</span>`);
					slave.sexualFlaw = SexualFlaw.NONE;
				} else if (slave.sexualFlaw === SexualFlaw.NONE && slave.sexualQuirk !== SexualQuirk.PAINAL && excessSex >= excessSexLimit && excessSex >= random(-100, 100)) {
					r.push(`${His} torn up and abused anus leaves ${him} <span class="flaw gain">dreading further anal penetration.</span>`);
					slave.sexualFlaw = SexualFlaw.HATESANAL;
				}
				if (slave.skill.anal < 100) {
					r.push(`After a lot of time spent getting buttfucked, ${his} <span class="skill inc">anal skill improves.</span>`);
					r.push(slaveSkillIncrease('anal', slave, trainingEfficiency));
				}
			}
			if (slave.fetish === Fetish.BUTTSLUT) {
				if (slave.fetishKnown === 1) {
					r.push(`${He} <span class="devotion inc">takes great pleasure</span> in ${his} rear being used as your personal`);
					if (V.PC.dick !== 0) {
						if (canPenetrate(V.PC)) {
							r.push(`cock holster.`);
						} else {
							r.push(`cocksleeve.`);
						}
					} else if (V.PC.clit >= 3) {
						r.push(`clit holster.`);
					} else {
						r.push(`plaything.`);
					}
				} else {
					r.push(`${He} <span class="devotion inc">seems to enjoy</span> anal sex more than the usual slave.`);
				}
				slave.devotion += 2;
			} else if (fetishChange > random(0, 100)) {
				slave.fetishKnown = 1;
				slave.fetishStrength = 10;
				slave.fetish = Fetish.BUTTSLUT;
				r.push(`After repeated anal orgasms, <span class="fetish gain">${he} begins to crave ${his} next buttfuck.</span>`);
			}
		} else {
			r.push(`You keep ${him} with you all week, using ${him} as your personal sex toy`);
			if (analUse >= 200) {
				r.push(`constantly.`);
			} else if (analUse >= 100) {
				r.push(`about once an hour.`);
			} else if (analUse >= 50) {
				r.push(`throughout the day.`);
			} else if (analUse >= 14) {
				r.push(`several times a day.`);
			} else if (analUse >= 7) {
				r.push(`at least once a day.`);
			} else {
				r.push(`on occasion.`);
			}
			r.push(`When you're not using ${him}, ${he}`);
			if (!canStand(slave)) {
				r.push(`rests`);
			} else {
				r.push(`stands`);
			}
			r.push(`nearby, waiting silently for your order to present ${his} asshole.`);
			if (nullPC || PCNoTool) {
				playerNeed -= (analUse * .2);
			} else {
				playerNeed -= analUse;
			}
			slaveNeed -= (analUse * analPleasure);
			excessSex = 0;
		}
		if (V.PC.dick !== 0 && canPenetrate(V.PC)) {
			tryKnockMeUp(slave, analUse, 1, V.PC);
		}
		seX(slave, "anal", V.PC, "penetrative", analUse);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function useMouth(slave) {
		oralQuality = evaluateSexQuality(slave, "oral");
		oralPleasure = evaluateSlavePleasure(slave, "oral");
		acts = libidoToActs;
		if (acts > 200) {
			oralUse = random(acts, acts + 35);
		} else if (acts > 100) {
			oralUse = random(acts, acts + 30);
		} else if (acts > 50) {
			oralUse = random(acts, acts + 15);
		} else if (acts > 25) { // at around this point, the slave is not going to be keeping up
			oralUse = random(acts, acts + 8);
		} else if (acts > 10) {
			oralUse = random(acts, acts + 5);
		} else if (acts > 5) {
			oralUse = random(acts, acts + 3);
		} else {
			oralUse = random(acts, acts + 2);
		}
		if (PlayerAggroSperm) {
			oralUse = Math.round(oralUse / 2);
		} else {
			oralUse = Math.round(oralUse);
		}
		if (isHorny(slave) || nullPC) { // unless she is also a sex maniac
			qualitySex = oralUse;
		} else {
			qualitySex = slave.need / 2;
			if (slave.sexualQuirk === SexualFlaw.GAGFUCK) {
				qualitySex *= 2;
			} else {
				qualitySex += Math.trunc(slave.skill.oral / 10);
			}
			if (slave.assignment === Job.FUCKTOY) {
				qualitySex = Math.ceil(qualitySex * restEffects(slave, 11));
			} else {
				qualitySex = Math.ceil(qualitySex * healthPenalty(slave));
			}
		}
		if (slave.fuckdoll === 0) {
			r.push(`${He} spends the week`);
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`unaware of your intent to use ${his} mouth.`);
				qualitySex = 1;
			} else if (slave.trust < -20) {
				r.push(`in terrified compliance with your use of ${his}`);
				if (V.PC.dick !== 0 && canPenetrate(V.PC)) {
					r.push(`throat.`);
				} else {
					r.push(`mouth.`);
				}
				qualitySex -= 2;
			} else if (slave.trust > 20 && slave.devotion <= 20) {
				r.push(`defiantly attempting to make`);
				if (V.PC.dick !== 0 && canPenetrate(V.PC)) {
					r.push(`throatfucking ${him}`);
				} else if (nullPC) {
					r.push(`making out with ${him}`);
				} else {
					r.push(`your use of ${his} mouth`);
				}
				r.push(`unpleasant.`);
				qualitySex -= 10;
			} else if (slave.devotion < -20) {
				r.push(`struggling and gagging as you`);
				if (V.PC.dick !== 0 && canPenetrate(V.PC)) {
					r.push(`throatfuck ${him}.`);
				} else if (V.PC.dick !== 0) {
					r.push(`stuff ${his} face.`);
				} else if (nullPC) {
					r.push(`make out with ${him}.`);
				} else {
					r.push(`${isMovable(V.PC) ? "ride" : "grind"} ${his} face.`);
				}
				qualitySex -= 5;
			} else if (slave.devotion <= 20) {
				r.push(`reluctantly`);
				if (V.PC.dick !== 0) {
					r.push(`servicing your cock with ${his} mouth.`);
				} else if (nullPC) {
					r.push(`making out with you.`);
				} else {
					r.push(`licking your pussy.`);
				}
				qualitySex--;
			} else if (slave.devotion <= 50) {
				r.push(`obediently`);
				if (V.PC.dick !== 0) {
					r.push(`sucking your cock.`);
				} else if (nullPC) {
					r.push(`making out with you.`);
				} else {
					r.push(`eating you out.`);
				}
				qualitySex++;
			} else if (slave.fetishKnown === 1 && slave.fetish === Fetish.CUMSLUT) {
				r.push(`as your adoring oral slave, orgasming when you`);
				if (nullPC && V.PC.balls === 0) {
					r.push(`start to lose composure to ${his} tongue revealing your smooth crotch's secrets.`);
				} else {
					r.push(`leave ${him} with a`);
					if (V.PC.balls !== 0) {
						r.push(`mouth full of`);
						if (V.PC.vagina !== -1) {
							r.push(`cum or a`);
						} else {
							r.push(`cum.`);
						}
					}
					if (V.PC.vagina !== -1) {
						r.push(`face covered in your pussy juice.`);
					}
				}
				if (V.PC.balls !== 0) {
					if (cumPerSlave > 14) {
						r.push(`Your balls produce so much cum for ${him} that ${he} has replaced half ${his} diet with your cum, and you often leave ${him} dizzy with a face and chest covered in your sticky pearly semen.`);
					} else if (cumPerSlave > 7) {
						r.push(`Your balls produce enough cum that ${he} usually gets facials after a mouthful of semen, and ${he} loves you for it.`);
					} else {
						r.push(`${He} usually has to fight for ${his} share of cum, making sure to milk cum from your`);
						if (fuckSlavesCount > 1) {
							r.push(`urethra or suck it out of a pussy.`);
						} else {
							r.push(`urethra.`);
						}
					}
				}
				qualitySex += 10;
			} else {
				r.push(`warming your bed and`);
				if (nullPC) {
					r.push(`devoting lavish attention to your loving make out sessions.`);
				} else {
					r.push(`lavishing devoted attention on your`);
					if (V.PC.dick !== 0) {
						r.push(`cock`);
						if (V.PC.vagina !== -1) {
							r.push(`and`);
						}
					}
					if (V.PC.vagina !== -1) {
						r.push(`pussy`);
					}
					r.push(`with ${his} loving mouth.`);
				}
				qualitySex += 5;
			}
			if (slave.assignment === Job.CONCUBINE) {
				qualitySex += 10;
			} else if (slave.assignment === Job.MASTERSUITE) {
				qualitySex += 5;
			}
			if (FutureSocieties.isActive('FSSlaveProfessionalism') && slave.devotion > 20 && slave.energy < 40 && slave.skill.oral > 60) {
				qualitySex += 30;
			}
			qualitySex = Math.max(qualitySex, 0);
			excessSex = oralUse - qualitySex;
			if (slave.assignment === Job.CONCUBINE || slave.assignment === Job.HEADGIRL) {
				if (excessSex > 0) {
					r.push(`You choose to`);
					excessSex = 0;
				} else {
					r.push(`You have the sexual energy to`);
				}
				oralUse = qualitySex;
			} else if (slave.assignment === Job.MASTERSUITE) {
				if (excessSex >= excessSexLimit) {
					r.push(`You choose to`);
					oralUse = qualitySex + excessSexLimit -1;
				} else {
					r.push(`You have the sexual energy to`);
				}
			} else {
				r.push(`You have the sexual energy to`);
			}
			// cull excess if satisfied
			if (excessSex > 0) {
				if (qualitySex * oralQuality >= energyPerSlave) {
					oralUse = oralUse - excessSex;
					excessSex = 0;
				}
			}
			if (slave.fetish === Fetish.MINDBROKEN) {
				if (V.PC.dick !== 0 || nullPC) {
					r.push(`use ${his} mouth`);
				} else {
					r.push(`make ${him} eat you out`);
				}
				if (oralUse >= 200) {
					r.push(`constantly.`);
				} else if (oralUse >= 100) {
					r.push(`about once an hour.`);
				} else if (oralUse >= 50) {
					r.push(`throughout the day.`);
				} else if (oralUse >= 14) {
					r.push(`several times a day.`);
				} else if (oralUse >= 7) {
					r.push(`at least once a day.`);
				} else {
					r.push(`on occasion.`);
				}
				r.push(`${He} absentmindedly follows your lead.`);
				slave.need = 0;
				// maybe inflate her with cum?
			} else if (slave.trust >= -20 && slave.devotion <= 20) {
				if (V.PC.dick !== 0) {
					r.push(`rape ${his} face`);
				} else if (nullPC) {
					r.push(`invade ${his} mouth`);
				} else {
					r.push(`force ${him} to eat you out`);
				}
				if (oralUse >= 200) {
					r.push(`constantly; the eternal`);
					slave.devotion -= 15;
					slave.trust -= 30;
				} else if (oralUse >= 100) {
					r.push(`about once an hour; the unending`);
					slave.devotion -= 10;
					slave.trust -= 20;
				} else if (oralUse >= 50) {
					r.push(`throughout the day; the constant`);
					slave.devotion -= 7;
					slave.trust -= 15;
				} else if (oralUse >= 14) {
					r.push(`several times a day; the frequent`);
					slave.devotion -= 5;
					slave.trust -= 15;
				} else if (oralUse >= 7) {
					r.push(`at least once a day; the regular`);
					slave.devotion -= 3;
					slave.trust -= 9;
				} else {
					r.push(`on occasion; the threat of`);
					slave.devotion -= 3;
					slave.trust -= 3;
				}
				r.push(`sexual abuse fills ${him} with <span class="devotion dec">revulsion</span> and <span class="trust dec">fear.</span>`);
				if (excessSex > 0) {
					if (qualitySex > 0) {
						r.push(`You were sexually too much for ${him} and once ${he} tired out, ${his} slack lips and limp tongue offered you very little pleasure.`);
					} else {
						r.push(`You found little joy between ${his} slack lips and limp tongue.`);
					}
				}
			} else if (slave.devotion <= 20) {
				if (V.PC.dick !== 0) {
					r.push(`use ${his} mouth`);
				} else if (nullPC) {
					r.push(`go tongue to tongue with ${him}`);
				} else {
					r.push(`make ${him} eat you out`);
				}
				if (oralUse >= 200) {
					r.push(`constantly; always`);
					slave.devotion += 6;
				} else if (oralUse >= 100) {
					r.push(`about once an hour; endlessly`);
					slave.devotion += 5;
				} else if (oralUse >= 50) {
					r.push(`throughout the day; constantly`);
					slave.devotion += 4;
				} else if (oralUse >= 14) {
					r.push(`several times a day; frequently`);
					slave.devotion += 3;
				} else if (oralUse >= 7) {
					r.push(`at least once a day; regularly`);
					slave.devotion += 2;
				} else {
					r.push(`on occasion;`);
					slave.devotion += 1;
				}
				r.push(`performing oral on you <span class="devotion inc">habituates ${him}</span> to being your sex slave.`);
				if (excessSex > 0) {
					if (qualitySex > 0) {
						r.push(`You were sexually too much for ${him} and once ${he} tired out, ${his} slack lips and limp tongue offered you very little pleasure.`);
					} else {
						r.push(`You find little joy between ${his} slack lips and limp tongue.`);
					}
				}
			} else {
				if (V.PC.dick !== 0) {
					r.push(`get a blowjob`);
					if (V.PC.vagina !== -1) {
						r.push(`and some pussy licking`);
					}
					r.push(`from ${him}`);
				} else if (nullPC) {
					if (slave.fetishKnown === 1 && slave.fetish === Fetish.CUMSLUT && V.PC.balls !== 0) {
						r.push(`have your urethral hole licked`);
					} else {
						r.push(`go tongue to tongue with ${him}`);
					}
				} else {
					r.push(`get eaten out by ${him}`);
				}
				if (oralUse >= 200) {
					r.push(`constantly; always`);
					slave.devotion += 3;
					slave.trust += 1;
				} else if (oralUse >= 100) {
					r.push(`about once an hour; endlessly`);
					slave.devotion += 3;
					slave.trust += 1;
				} else if (oralUse >= 50) {
					r.push(`throughout the day; constantly`);
					slave.devotion += 3;
					slave.trust += 1;
				} else if (oralUse >= 14) {
					r.push(`several times a day; frequently`);
					slave.devotion += 3;
					slave.trust += 1;
				} else if (oralUse >= 7) {
					r.push(`several times a day; regularly`);
					slave.devotion += 2;
					slave.trust += 1;
				} else {
					r.push(`on occasion;`);
					slave.devotion += 1;
					slave.trust += 1;
				}
				if (slave.sexualFlaw === SexualFlaw.CUMADDICT) {
					if (!hasAnyFluids) {
						r.push(`giving you pleasure with no reward leaves ${him} <span class="devotion dec">spiteful;</span> <span class="trust inc">how can ${he} trust you</span> if you won't even give ${him} a splash of cum in return for all ${his} service to you?`);
						slave.devotion -= 5;
						slave.trust -= 2;
					} else {
						r.push(`giving you pleasure brings ${him} <span class="devotion inc">closer to you</span> and encourages ${him} to <span class="trust inc">trust you</span> each time you reward ${him} with a splash of delicious cum.`);
						if (excessSex > 0) {
							r.push(`It doesn't matter how tired ${his} mouth becomes; ${he}'ll keep going as long as you keep paying out.`);
						}
						slave.devotion += 1;
						slave.trust += 3;
					}
				} else if (excessSex < excessSexLimit) {
					r.push(`giving you pleasure brings ${him} <span class="devotion inc">closer to you</span> and encourages ${him} to <span class="trust inc">trust you.</span>`);
					if (excessSex > 0) { // qualitySex should always be at least 1 here
						r.push(`${He} was unable to keep up with your libido, so to prevent it from turning into a series of facerapes, you played up the intimacy of the acts to keep ${his} faith unblemished.`);
					}
				} else if (slave.sexualFlaw === SexualFlaw.SELFHATING) { // it becomes rape
					r.push(`giving you pleasure brings ${him} <span class="devotion inc">closer to you,</span> but there is no way for ${him} to realistically keep up with your libido. That doesn't stop ${him} from doing everything in ${his} power to force ${his} mouth to action, and even though it's agonizing, ${he} <span class="trust inc">wouldn't have it any other way.</span>`);
					slave.trust += 2;
				} else if (slave.sexualFlaw === SexualFlaw.NEGLECT) {
					r.push(`giving you pleasure brings ${him} <span class="devotion inc">closer to you.</span> Most slaves wouldn't be able to keep up with your libido, but since your needs are paramount, ${he} is more than <span class="trust inc">willing</span> to do anything for you even if it physically agonizing.`);
					slave.trust += 1;
				} else {
					r.push(`giving you pleasure brings ${him} <span class="devotion inc">closer to you,</span> but there is no way for ${him} to keep up with your libido. You need more from ${him}, even after ${he} has given you ${his} all, forcing you to take it from ${him} and utterly <span class="trust dec">shattering the illusion</span> that ${he} is anything more than a toy for your amusement.`);
					slave.trust -= Math.min(Math.trunc(excessSex / 3), 20);
				}
			}
			if (qualitySex >= oralUse || slave.fetish === Fetish.MINDBROKEN || slave.sexualFlaw === SexualFlaw.CUMADDICT) {
				if (!nullPC || slave.sexualFlaw === SexualFlaw.CUMADDICT) {
					playerNeed -= (oralUse * oralQuality);
				} else { // No release due to null, so builds arousal.
					playerNeed += (oralUse * oralQuality * 0.05);
				}
				slaveNeed -= (oralUse * oralPleasure);
			} else {
				if (!nullPC) {
					playerNeed -= (qualitySex * oralQuality);
				} else { // No release due to null, so builds arousal.
					playerNeed += (qualitySex * oralQuality * 0.05);
				}
				slaveNeed -= (qualitySex * oralPleasure);
				if ((slave.sexualFlaw === SexualFlaw.SELFHATING || slave.sexualFlaw === SexualFlaw.NEGLECT) && excessSex >= excessSexLimit) {
					if (nullPC) {
						playerNeed -= (excessSex * .05);
					} else {
						playerNeed -= excessSex;
					}
					slaveNeed -= excessSex;
				} else {
					if (nullPC) {
						playerNeed -= (excessSex * .05);
					} else {
						playerNeed -= (excessSex * .1);
					}
					// no slave need change
				}
			}
			if (nullPC) {
				if (slave.sexualFlaw === SexualFlaw.CUMADDICT) {
					r.push(`Normally you would have trouble getting off due to your lack of equipment, but this ${girl} is something else.`);
				} else {
					r.push(`Locking lips won't get you off, so your efforts were more for show than relief.`);
					if (initialNeed < playerNeed) {
						r.push(`In fact, all the action has you more wound up than you started.`);
					}
				}
			}
			if (qualitySex > 0 && (!nullPC || slave.sexualFlaw === SexualFlaw.CUMADDICT)) {
				if (slave.fetish !== Fetish.MINDBROKEN) {
					if (slave.skill.oral >= 100) {
						r.push(`${His} masterful skill can draw out an orgasm so strong it leaves you light-headed.`);
					} else if (slave.skill.oral > 60) {
						r.push(`${His} expert skill leaves you feeling wonderfully drained post-coitus.`);
					} else if (slave.skill.oral > 30) {
						r.push(`${His} skill helps you reach those especially powerful climaxes.`);
					} else if (slave.skill.oral > 10) {
						r.push(`${He}'s skilled enough to give an enjoyable blow, but not enough to stand out as a great one.`);
					} else {
						r.push(`${He}'s clueless at how to properly use ${his} mouth and tongue to please you, making oral sex with ${him} awkward and lacking.`);
					}
				}
				if (V.PC.dick > 0 && !canPenetrate(V.PC)) {
					r.push(`Your penis can't exactly fit into ${his} mouth without popping ${his} jaw out, but having the tip sucked works all the same.`);
				}
				if (V.PC.dick !== 0 || nullPC) {
					if (slave.lips >= 100) {
						r.push(`${His} facepussy forms an inescapable seal around your dick as ${he} sucks you off.`);
					} else if (slave.lips >= 80) {
						r.push(`${His} huge lips apply a lovely seal to anything they wrap around.`);
					} else if (slave.lips >= 60) {
						r.push(`${His} plump lips offer a lovely balance of cushioning and suction to ${his} blowjobs.`);
					} else if (slave.lips >= 40) {
						r.push(`${His} plump lips feel wonderful wrapped around your dick.`);
					} else if (slave.lips >= 20) {
						r.push(`${His} full lips feel nice wrapped around your dick.`);
					} else if (slave.lips > 0) {
						r.push(`${His} thin lips offer you little cushion for your blowjob.`);
					} else {
						r.push(`${He} has so little lip, you're not convinced they exist at all. Needless to say, they offer no cushion whatsoever.`);
					}
				}
				if (slave.teeth === "pointy") {
					r.push(`You have to pay close attention to not rub against ${his} sharp teeth or accidentally get bitten, keeping you from fully immersing yourself in the act.`);
				} else if ((slave.teeth === "fangs" || slave.teeth === "fang") && V.PC.dick !== 0) {
					r.push(`You have to pay close attention to not ${V.PC.foreskin > 0 ? "snag your foreskin on" : "scrape yourself against"} ${slave.teeth === "fangs" ? `one of ${his} sharp fangs` : `${his} pointy fang`}.`);
				} else if ((slave.teeth === "straightening braces" || slave.teeth === "cosmetic braces") && V.PC.dick !== 0) {
					r.push(`You have to pay a little attention to not ${V.PC.foreskin > 0 ? "snag your foreskin on" : "scrape yourself against"} ${his} braces.`);
				} else if (slave.teeth === "removable" && V.PC.dick !== 0) {
					r.push(`You can facefuck ${him} without a care since ${he} has no teeth to ${slave.devotion >= -20 ? "bite you with" : "get in the way"}.`);
				}
				if (slave.sexualFlaw === SexualFlaw.HATESORAL) {
					r.push(`${He} hates having ${his} mouth near genitals, let alone on them, and the resulting breakdown is detrimental to your enjoyment.`);
				}
				if (slave.sexualFlaw === SexualFlaw.APATHETIC) {
					r.push(`${He} puts in the bare minimum amount of effort, even if ${he} enjoys it.`);
				}
				if (oralQuality < 1) {
					r.push(`Simply put, ${he} <span class="noteworthy">sucks at ${V.PC.dick !== 0 ? "giving head" : "munching carpet"}.</span>`);
				}
			}
			if (PlayerAggroSperm) {
				r.push(`Your gene therapy makes getting off take nearly twice as long as it used to, but the payoff when you finally blow that backed up load is well worth it.`);
				if (V.PC.dick === 0) {
					tryKnockMeUp(V.PC, (.1 * oralUse) - 50, 2, V.PC);
				}
			}
			if (slave.fetish !== Fetish.MINDBROKEN) {
				if ((slave.devotion >= -20 || slave.trust > 20) && slave.sexualFlaw !== SexualFlaw.HATESORAL && ((slave.need - slaveNeed) > slave.energy / 4) && slave.rules.release.masturbation === 1) { // aroused slave will masturbate if allowed
					r.push(`The sexual action gets ${him} hot and bothered, so ${he} takes advantage of ${his} permission to masturbate to blow off steam while servicing you.`);
					slaveNeed -= oralUse;
				}
				if (slave.sexualFlaw === SexualFlaw.HATESORAL && slave.devotion > 50 && excessSex < excessSexLimit && !nullPC) {
					r.push(`${He}'s devoted enough to derive emotional closeness from giving you oral, which <span class="flaw break">resolves ${his} hatred of the act.</span>`);
					slave.sexualFlaw = SexualFlaw.NONE;
				}
				if (slave.behavioralFlaw === BehavioralFlaw.HATESMEN && V.PC.dick !== 0 && perceivedGender(V.PC) < -1  && slave.devotion > 20) { // 5.0.0?
					r.push(`Spending so much time in close proximity to your dick <span class="flaw break">reconciles ${him} to serving cocks.</span>`);
					slave.behavioralFlaw = BehavioralFlaw.NONE;
				} else if (slave.behavioralFlaw === BehavioralFlaw.HATESWOMEN && V.PC.vagina !== -1 && perceivedGender(V.PC) >= 0 && slave.devotion > 20) {
					r.push(`Spending so much time in close proximity to your womanhood <span class="flaw break">reconciles ${him} to serving a pussy.</span>`);
					slave.behavioralFlaw = BehavioralFlaw.NONE;
				}
				if (!nullPC || slave.sexualFlaw === SexualFlaw.CUMADDICT) {
					if (slave.skill.oral < 100) {
						r.push(`After a lot of time spent`);
						if (V.PC.dick !== 0) {
							r.push(`sucking you`);
							if (V.PC.vagina !== -1) {
								r.push(`off and eating you out,`);
							} else {
								r.push(`off,`);
							}
						} else if (nullPC) {
							r.push(`sounding your urethra,`);
						} else {
							r.push(`eating you out,`);
						}
						r.push(`${his} <span class="skill inc">oral skill improves.</span>`);
						r.push(slaveSkillIncrease('oral', slave, trainingEfficiency));
					}
				}
				if (V.PC.balls > 0 || V.PC.vagina >= 0) {
					if (slave.fetish === Fetish.CUMSLUT) {
						if (slave.fetishKnown === 1) {
							r.push(`${He} <span class="devotion inc">quivers with ecstasy</span> just from the`);
							if (canTaste(slave)) {
								r.push(`taste`);
							} else {
								r.push(`feeling`);
							}
							r.push(`of your`);
							if (V.PC.dick === 0) {
								r.push(`girl`);
							}
							r.push(`cum on ${his} tongue.`);
						} else {
							r.push(`${He} <span class="devotion inc">seems to enjoy</span> ${his} role as a cum receptacle more than you'd expect.`);
						}
						slave.devotion += 2;
					} else if (fetishChange > random(0, 100)) {
						slave.fetish = Fetish.CUMSLUT;
						slave.fetishKnown = 1;
						slave.fetishStrength = 10;
						r.push(`${He} frequently climaxes with`);
						if (V.PC.dick !== 0) {
							r.push(`your dick in ${his} mouth,`);
						} else if (nullPC) {
							r.push(`${his} mouth over your urethra,`);
						} else {
							r.push(`${his} mouth on your cunt,`);
						}
						r.push(`learning that giving <span class="fetish gain">blowjobs is a lot of fun.</span>`);
					}
				}
			}
		} else {
			r.push(`You keep ${him} with you all week, using ${him} as your personal sex toy`);
			if (oralUse >= 200) {
				r.push(`constantly.`);
			} else if (oralUse >= 100) {
				r.push(`about once an hour.`);
			} else if (oralUse >= 50) {
				r.push(`throughout the day.`);
			} else if (oralUse >= 14) {
				r.push(`several times a day.`);
			} else if (oralUse >= 7) {
				r.push(`at least once a day.`);
			} else {
				r.push(`on occasion.`);
			}
			r.push(`When you're not using ${him}, ${he}`);
			if (!canStand(slave)) {
				r.push(`rests`);
			} else {
				r.push(`stands`);
			}
			r.push(`nearby, waiting silently for your order to open ${his} mouth.`);
			if (!nullPC) {
				playerNeed -= (oralUse * oralQuality);
			} else { // No release due to null, so builds arousal.
				playerNeed += (oralUse * oralQuality * 0.05);
			}
			slaveNeed -= oralUse;
			excessSex = 0;
		}
		if (V.PC.dick > 0) {
			seX(slave, "oral", V.PC, "penetrative", oralUse);
		} else if (V.PC.vagina >= 0) {
			seX(slave, "oral", V.PC, "vaginal", oralUse);
		} else if (hasAnyFluids && slave.sexualFlaw === SexualFlaw.CUMADDICT) {
			seX(slave, "oral", V.PC, "penetrative", oralUse); // should be something else other than penetrative
		} else if (slave.fetish === Fetish.CUMSLUT) {
			seX(slave, "oral", V.PC, "oral", oralUse);
		} // kissing not counted as a sex act UNLESS she is way too into it.
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function useBoobs(slave) {
		let pcBoobsException = false;
		let playerMammaryPleasure = 1;
		mammaryQuality = evaluateSexQuality(slave, "mammary");
		mammaryPleasure = evaluateSlavePleasure(slave, "mammary");
		acts = libidoToActs;
		if (acts > 200) {
			mammaryUse = random(acts, acts + 35);
		} else if (acts > 100) {
			mammaryUse = random(acts, acts + 30);
		} else if (acts > 50) {
			mammaryUse = random(acts, acts + 15);
		} else if (acts > 25) {
			mammaryUse = random(acts, acts + 8);
		} else if (acts > 10) {
			mammaryUse = random(acts, acts + 5);
		} else if (acts > 5) {
			mammaryUse = random(acts, acts + 3);
		} else {
			mammaryUse = random(acts, acts + 2);
		}
		if (PlayerAggroSperm && V.PC.dick !== 0) {
			mammaryUse = Math.round(mammaryUse / 2);
		} else {
			mammaryUse = Math.round(mammaryUse);
		}
		// a very low intensity act, for the most part
		if (isHorny(slave) || (V.PC.dick === 0 && V.PC.clit < 3) || slave.fetish === Fetish.MINDBROKEN || slave.fetish === Fetish.BOOBS || slave.devotion > 20) {
			qualitySex = mammaryUse;
		} else {
			// even considering fuckable nipples, she would have two to split the load between.
			qualitySex = slave.need;
			if (slave.assignment === Job.FUCKTOY) {
				qualitySex = Math.ceil(qualitySex * restEffects(slave, 11));
			} else {
				qualitySex = Math.ceil(qualitySex * healthPenalty(slave));
			}
		}
		const boobTerm = slave.boobs >= 300 ? "boobs" : slave.boobs < 300 && perceivedGender(slave) >= -1 ? "flat chest" : "chest";
		if (slave.fuckdoll === 0) {
			r.push(`${He} spends the week`);
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`unaware of your intent to use ${his} ${slave.boobs < 300 && perceivedGender(slave) < -1 ? "chest" : "breasts"}.`);
			} else if (slave.trust < -20) {
				r.push(`in terrified compliance with your use of ${his} ${slave.boobs < 300 && perceivedGender(slave) < -1 ? "chest" : "breasts"}.`);
				qualitySex = Math.round(qualitySex * 0.75);
			} else if (slave.trust > 20 && slave.devotion <= 20) {
				r.push(`defiantly making the use of ${his} ${slave.boobs < 300 && perceivedGender(slave) < -1 ? "chest" : "tits"} difficult.`);
				qualitySex = Math.round(qualitySex * 0.5);
			} else if (slave.devotion < -20) {
				r.push(`trying to keep ${his} ${slave.boobs < 300 && perceivedGender(slave) < -1 ? "chest" : "tits"} away from your grasping ${pcHands}.`);
				qualitySex = Math.round(qualitySex * 0.6);
			} else if (slave.devotion <= 20) {
				r.push(`reluctantly presenting ${his} ${slave.boobs < 300 && perceivedGender(slave) < -1 ? "chest" : "tits"} for your use.`);
				qualitySex = Math.round(qualitySex * 0.8);
			} else if (slave.devotion <= 50) {
				r.push(`obediently offering ${his} ${slave.boobs < 300 && perceivedGender(slave) < -1 ? "chest" : "tits"} for your use.`);
			} else if (slave.fetishKnown === 1 && slave.fetish === Fetish.BOOBS) {
				r.push(`moaning and shivering as you give it to ${him} where ${he} likes it best: ${his} ${slave.boobs < 300 && perceivedGender(slave) < -1 ? "chest" : "tits"}.`);
			} else {
				r.push(`keeping ${his} ${slave.boobs < 300 && perceivedGender(slave) < -1 ? "chest" : "tits"} in constant contact with you,`);
				if (V.PC.dick !== 0 || V.PC.clit >= 3) {
					if (slave.boobs >= 300) {
						r.push(`giving you titjobs,`);
					} else if (slave.boobs < 300 && perceivedGender(slave) >= -1) {
						r.push(`giving you naizuri,`);
					}
				} else {
					r.push(`presenting ${his} ${slave.nipples} nipples for your amusement,`);
				}
				if (slave.nipples === NippleShape.FUCKABLE) {
					r.push(`savoring your enjoyment of ${his} nipplecunts,`);
				}
				r.push(`resting ${slave.boobs >= 300 ? "them" : "it"} against you as you work, and serving as a`);
				if (slave.boobs >= 300) {
					r.push(`comfortable`);
				} else if (slave.boobs < 300 && perceivedGender(slave) < -1) {
					r.push(`rugged`);
				}
				r.push(`pillow at bedtime.`);
			}
			if (slave.assignment === Job.CONCUBINE) {
				qualitySex += 20;
			} else if (slave.assignment === Job.MASTERSUITE) {
				qualitySex += 10;
			}
			if (FutureSocieties.isActive('FSSlaveProfessionalism') && slave.devotion > 20 && slave.energy < 40) {
				qualitySex += 200;
			}
			qualitySex = Math.max(qualitySex, 0);
			excessSex = mammaryUse - qualitySex;
			if (slave.assignment === Job.CONCUBINE || slave.assignment === Job.HEADGIRL) {
				if (excessSex > 0) {
					r.push(`You choose to`);
					excessSex = 0;
				} else {
					r.push(`You have the sexual energy to`);
				}
				mammaryUse = qualitySex;
			} else if (slave.assignment === Job.MASTERSUITE) {
				if (excessSex >= excessSexLimit) {
					r.push(`You choose to`);
					mammaryUse = qualitySex + excessSexLimit -1;
				} else {
					r.push(`You have the sexual energy to`);
				}
			} else {
				r.push(`You have the sexual energy to`);
			}
			// cull excess if satisfied
			if (excessSex > 0) {
				if (qualitySex * mammaryQuality >= energyPerSlave) {
					mammaryUse = mammaryUse - excessSex;
					excessSex = 0;
				}
			}
			if (slave.fetish === Fetish.MINDBROKEN) {
				if (V.PC.dick !== 0) {
					if (slave.nipples === NippleShape.FUCKABLE && canPenetrate(V.PC)) {
						r.push(`fuck ${his} ${boobTerm}`);
					} else {
						r.push(`cum on ${his} ${boobTerm}`);
					}
				} else if (V.PC.clit >= 3) {
					r.push(`rub your clit against ${his} ${boobTerm}`);
				} else {
					r.push(`thoroughly grope ${his} ${boobTerm}`);
				}
				if (mammaryUse >= 200) {
					r.push(`constantly.`);
				} else if (mammaryUse >= 100) {
					r.push(`about once an hour.`);
				} else if (mammaryUse >= 50) {
					r.push(`throughout the day.`);
				} else if (mammaryUse >= 14) {
					r.push(`several times a day.`);
				} else if (mammaryUse >= 7) {
					r.push(`at least once a day.`);
				} else {
					r.push(`on occasion.`);
				}
				r.push(`${He} absentmindedly follows your lead.`);
			} else if (slave.trust >= -20 && slave.devotion <= 20) {
				if (V.PC.dick !== 0) {
					if (slave.nipples === NippleShape.FUCKABLE && canPenetrate(V.PC)) {
						r.push(`fuck ${his} ${boobTerm}`);
					} else {
						r.push(`cum on ${his} ${boobTerm}`);
					}
				} else if (V.PC.clit >= 3) {
					r.push(`rub your clit against ${his} ${boobTerm}`);
				} else {
					r.push(`thoroughly grope ${his} ${boobTerm}`);
				}
				if (mammaryUse >= 200) {
					r.push(`constantly; the eternal`);
					slave.devotion -= 15;
					slave.trust -= 30;
				} else if (mammaryUse >= 100) {
					r.push(`about once an hour; the unending`);
					slave.devotion -= 10;
					slave.trust -= 20;
				} else if (mammaryUse >= 50) {
					r.push(`throughout the day; the constant`);
					slave.devotion -= 7;
					slave.trust -= 15;
				} else if (mammaryUse >= 14) {
					r.push(`several times a day; the frequent`);
					slave.devotion -= 5;
					slave.trust -= 15;
				} else if (mammaryUse >= 7) {
					r.push(`at least once a day; the regular`);
					slave.devotion -= 3;
					slave.trust -= 9;
				} else {
					r.push(`on occasion; the threat of`);
					slave.devotion -= 3;
					slave.trust -= 3;
				}
				r.push(`sexual abuse fills ${him} with <span class="devotion dec">revulsion</span> and <span class="trust dec">fear.</span>`);
				if (excessSex > 0) {
					if (qualitySex > 0) {
						r.push(`You were sexually too much for ${him} and, once tired out, ${he} couldn't continue putting forth effort to bolster your pleasure.`);
					} else {
						r.push(`You were forced to do all the work, but it's not like ${his} lack of effort would deter your use of ${him}`);
					}
				}
			} else if (slave.devotion <= 20) {
				r.push(`play with ${his} ${boobTerm}`);
				if (mammaryUse >= 200) {
					r.push(`constantly; always`);
					slave.devotion += 6;
				} else if (mammaryUse >= 100) {
					r.push(`about once an hour; endlessly`);
					slave.devotion += 5;
				} else if (mammaryUse >= 50) {
					r.push(`throughout the day; constantly`);
					slave.devotion += 4;
				} else if (mammaryUse >= 14) {
					r.push(`several times a day; frequently`);
					slave.devotion += 3;
				} else if (mammaryUse >= 7) {
					r.push(`at least once a day; regularly`);
					slave.devotion += 2;
				} else {
					r.push(`on occasion;`);
					slave.devotion += 1;
				}
				r.push(`submitting to your games <span class="devotion inc">habituates ${him}</span> to being your sex slave.`);
				if (excessSex > 0) {
					if (qualitySex > 0) {
						r.push(`You were sexually too much for ${him} and, once tired out, ${he} couldn't continue putting forth effort to bolster your pleasure.`);
					} else {
						r.push(`You were forced to do all the work, but it's not like ${his} lack of effort would deter your use of ${him}`);
					}
				}
			} else {
				if (V.PC.dick !== 0 || V.PC.clit >= 3) {
					r.push(`have mammary intercourse with ${him}`);
				} else if (V.PC.boobs >= 300) {
					pcBoobsException = true; // because of course there is an exception
					r.push(`have mutual mammary intercourse until you both orgasm to nipple stimulation`);
				} else if (!nullPC && hasAnyArms(slave)) {
					r.push(`play with ${his} ${boobTerm} while ${he} gets you off`);
				} else {
					r.push(`play with ${his} ${boobTerm}`);
				}
				if (mammaryUse >= 200) {
					r.push(`constantly; always`);
					slave.devotion += 3;
					slave.trust += 1;
				} else if (mammaryUse >= 100) {
					r.push(`about once an hour; endlessly`);
					slave.devotion += 3;
					slave.trust += 1;
				} else if (mammaryUse >= 50) {
					r.push(`throughout the day; constantly`);
					slave.devotion += 3;
					slave.trust += 1;
				} else if (mammaryUse >= 14) {
					r.push(`several times a day; frequently`);
					slave.devotion += 3;
					slave.trust += 1;
				} else if (mammaryUse >= 7) {
					r.push(`several times a day; regularly`);
					slave.devotion += 2;
					slave.trust += 1;
				} else {
					r.push(`on occasion;`);
					slave.devotion += 1;
					slave.trust += 1;
				}
				r.push(`giving you pleasure brings ${him} <span class="devotion inc">closer to you</span> and encourages ${him} to <span class="trust inc">trust you.</span>`);
			}
			if (pcBoobsException) {
				playerMammaryPleasure = 0.3;
				if (V.PC.lactation > 0) {
					V.PC.lactationDuration = 2;
					if (V.PC.boobsMilk > 0) {
						V.PC.boobs -= V.PC.boobsMilk;
						V.PC.boobsMilk = 0;
					}
					playerMammaryPleasure += 1;
				}
				if (V.PC.boobsImplant / V.PC.boobs >= 0.90) {
					playerMammaryPleasure -= 0.3;
				} else if (V.PC.boobsImplant / V.PC.boobs >= 0.75) {
					playerMammaryPleasure -= 0.2;
				}
				if (V.PC.nipples === NippleShape.HUGE || V.PC.nipples === NippleShape.FUCKABLE) { // || V.PC.nipples === NippleShape.DICKNIPS
					playerMammaryPleasure += 0.7;
				} else if (V.PC.nipples === NippleShape.PUFFY || V.PC.nipples === NippleShape.INVERTED || V.PC.nipples === NippleShape.PARTIAL) {
					playerMammaryPleasure += 0.4;
				} else if (V.PC.nipples === NippleShape.CUTE) {
					playerMammaryPleasure += 0.2;
				} else if (V.PC.nipples === NippleShape.TINY) {
					playerMammaryPleasure += 0.1;
				}
			}
			if (qualitySex >= mammaryUse || slave.fetish === Fetish.MINDBROKEN) {
				if (pcBoobsException) {
					playerNeed -= playerMammaryPleasure * mammaryUse;
				} else if (V.PC.dick !== 0 || V.PC.clit >= 3) {
					playerNeed -= mammaryUse * (mammaryQuality + 0.2);
				} else if (slave.devotion > 20 && !nullPC && hasAnyArms(slave)) {
					playerNeed -= mammaryUse;
				} else {
					playerNeed += (mammaryUse * 0.05);
				}
				slaveNeed -= (mammaryUse * mammaryPleasure);
			} else {
				if (V.PC.dick !== 0 || V.PC.clit >= 3) {
					playerNeed -= qualitySex * (mammaryQuality + 0.2);
				} else {
					playerNeed += (qualitySex * 0.05);
				}
				slaveNeed -= (qualitySex * mammaryPleasure);
				if (slave.sexualFlaw === SexualFlaw.SELFHATING || slave.sexualFlaw === SexualFlaw.NEGLECT) {
					if (V.PC.dick !== 0 || V.PC.clit >= 3) {
						playerNeed -= excessSex * (mammaryQuality + 0.2);
					} else {
						playerNeed += (excessSex * 0.05);
					}
				} else {
					if (V.PC.dick !== 0 || V.PC.clit >= 3) {
						playerNeed -= excessSex * mammaryQuality;
					} else {
						playerNeed += (excessSex * 0.05);
					}
				}
			}
			if (initialNeed < playerNeed) {
				r.push(`While ${he} is fun to play with, getting no sexual release ends with you more aroused than you started.`);
			}
			if (pcBoobsException) {
				if (V.PC.lactation > 0) {
					r.push(`Mixing the high of a climax with the release of being milked leaves you feeling satisfyingly drained—in both boobs and body.`);
				}
				if (V.PC.boobsImplant / V.PC.boobs >= 0.90) {
					r.push(`Your breasts are stretched so thin by your oversized implants that you've lost most of the feeling in them.`);
				} else if (V.PC.boobsImplant / V.PC.boobs >= 0.75) {
					r.push(`Your breasts are stretched by your oversized implants, stretching the skin and dulling your sense of touch in them.`);
				}
				if (V.PC.nipples === NippleShape.HUGE || V.PC.nipples === NippleShape.FUCKABLE) { // || V.PC.nipples === NippleShape.DICKNIPS
					r.push(`Your huge nipples${V.PC.nipples === NippleShape.FUCKABLE ? ", even if they are facing the wrong way," : ""} are ripe with sensitive nerves, making every touch send shivers down your spine.`);
					mammaryPleasure += 0.7;
				} else if (V.PC.nipples === NippleShape.PUFFY || V.PC.nipples === NippleShape.INVERTED || V.PC.nipples === NippleShape.PARTIAL) {
					r.push(`Your big nipples are very sensitive, making playing with them send shivers down your spine.`);
				} else if (V.PC.nipples === NippleShape.CUTE) {
					r.push(`It feels nice to have your nipples toyed with.`);
				} else if (V.PC.nipples === NippleShape.TINY) {
					r.push(`Your tiny nipples aren't very sensitive, but you can still feel something enjoyable when they're worked over.`);
				} else {
					r.push(`The nerves in your nipples have been damaged enough that touching them feels no different from touching anywhere else on your breasts.`);
				}
				if (V.PC.lactation === 0) {
					r.push(induceLactation(V.PC, Math.max(Math.ceil(mammaryUse / 50), 2)));
				}
			} else if (V.PC.dick !== 0 || V.PC.clit >= 3) {
				if (slave.boobs >= 500) {
					r.push(`${His} cleavage welcomes your ${V.PC.dick !== 0 ? "dick" : "clit"} into its depths.`);
				} else if (slave.boobs < 300) {
					r.push(`${He} has no cleavage to speak of, leaving you to rub your ${V.PC.dick !== 0 ? "dick" : "clit"} against ${his} sternum.`);
				} else {
					r.push(`${He} doesn't have much cleavage to work with, but you make do.`);
				}
				if (slave.sexualFlaw === SexualFlaw.APATHETIC) {
					r.push(`${He} puts in the barest amount of effort, even if ${he} enjoys it.`);
				}
				if (mammaryQuality < 1) {
					r.push(`Simply put, ${he} <span class="noteworthy">sucks at boobjobs.</span>`);
				}
				if (PlayerAggroSperm && V.PC.dick !== 0) {
					r.push(`Your gene therapy makes getting off take nearly twice as long as it used to, but the payoff when you finally blow that backed up load is well worth it.`);
				}
			}
			if (slave.fetish !== Fetish.MINDBROKEN) {
				if ((slave.devotion >= -20 || slave.trust > 20) && hasBothArms(slave) && ((slave.need - slaveNeed) > slave.energy / 4) && slave.rules.release.masturbation === 1) { // aroused slave will masturbate if allowed
					r.push(`The sexual action gets ${him} hot and bothered, so ${he} takes advantage of ${his} permission to masturbate to blow off steam while servicing you.`);
					slaveNeed -= oralUse;
				}
				if (slave.behavioralFlaw === BehavioralFlaw.HATESMEN && slave.devotion > 20 && perceivedGender(V.PC) < -1) {
					r.push(`Spending so much time in close proximity to your masculinity <span class="flaw break">reconciles ${him} to serving the male gender.</span>`);
					slave.behavioralFlaw = BehavioralFlaw.NONE;
				} else if (slave.behavioralFlaw === BehavioralFlaw.HATESWOMEN && perceivedGender(V.PC) >= 0 && slave.devotion > 20 && pcBoobsException) {
					r.push(`Spending so much time in close proximity to your femininity <span class="flaw break">reconciles ${him} to serving the female gender.</span>`);
					slave.behavioralFlaw = BehavioralFlaw.NONE;
				}
				if (slave.fetish === Fetish.BOOBS) {
					if (slave.fetishKnown === 1) {
						r.push(`${He} <span class="devotion inc">quivers with ecstasy</span> just from the touch of your`);
						if (perceivedGender(V.PC) < -1) {
							r.push(`strong`);
						} else {
							r.push(`soft`);
						}
						r.push(`${pcHands} against ${his}`);
						if (slave.boobs >= 300) {
							r.push(`breasts.`);
						} else if (perceivedGender(slave) >= -1) {
							r.push(`flat chest.`);
						} else {
							r.push(`chest`);
						}
					} else {
						r.push(`${He} <span class="devotion inc">seems to enjoy</span> having ${his}`);
						if (slave.boobs >= 300) {
							r.push(`breasts`);
						} else {
							r.push(`chest`);
						}
						r.push(`fondled more than the average ${girl}.`);
					}
					slave.devotion += 2;
				} else if (fetishChange > random(0, 100)) {
					slave.fetish = Fetish.BOOBS;
					slave.fetishKnown = 1;
					slave.fetishStrength = 10;
					r.push(`${He} climaxes to nipple stimulation alone, and starts acting as though`);
					if (slave.clit > 0 && slave.nipples !== NippleShape.FUCKABLE) {
						r.push(`${he} has <span class="fetish gain">three pleasure buttons</span> rather than just one.`);
					} else if (slave.vagina > -1 && slave.nipples === NippleShape.FUCKABLE) {
						r.push(`${he} has <span class="fetish gain">a trio of pussies</span> rather than just one.`);
					} else {
						r.push(`${his} tits are ${his} <span class="fetish gain">primary erogenous zone.</span>`);
					}
				}
			}
		} else {
			r.push(`You keep ${him} with you all week, using ${him} as your personal sex toy`);
			if (mammaryUse >= 200) {
				r.push(`constantly.`);
			} else if (mammaryUse >= 100) {
				r.push(`about once an hour.`);
			} else if (mammaryUse >= 50) {
				r.push(`throughout the day.`);
			} else if (mammaryUse >= 14) {
				r.push(`several times a day.`);
			} else if (mammaryUse >= 7) {
				r.push(`at least once a day.`);
			} else {
				r.push(`on occasion.`);
			}
			r.push(`When you're not using ${him}, ${he}`);
			if (!canStand(slave)) {
				r.push(`rests`);
			} else {
				r.push(`stands`);
			}
			r.push(`nearby, waiting silently for your order to present ${his} chest.`);
			if (V.PC.dick !== 0 || V.PC.clit >= 3) {
				playerNeed -= mammaryUse * (mammaryQuality + 0.2);
			} else {
				playerNeed += (mammaryUse * 0.05);
			}
			slaveNeed -= (mammaryUse * mammaryPleasure);
		}
		if (slave.lactation === 0) {
			r.push(induceLactation(slave, 2));
		}
		if (pcBoobsException) {
			seX(slave, "mammary", V.PC, "mammary", mammaryUse);
		} else if (V.PC.dick !== 0 || V.PC.clit >= 3) {
			seX(slave, "mammary", V.PC, "penetrative", mammaryUse);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function useDick(slave) {
		let straponUse = 0; // for normal cases where a slave cannot continue but the player demands more.
		penetrativeQuality = evaluateSexQuality(slave, "penetrative");
		penetrativePleasure = evaluateSlavePleasure(slave, "penetrative");
		if (slave.geneMods.aggressiveSperm === 1 && slave.balls > 0 && slave.vasectomy !== 1 && isVirile(slave)) { // does not affect sex counts here. PC takes it until slave orgasms?
			penetrativeQuality *= 1.2;
			penetrativePleasure *= 1.2;
		}
		acts = libidoToActs;
		if (acts > 200) {
			penetrativeUse = random(acts, acts + 35);
		} else if (acts > 100) {
			penetrativeUse = random(acts, acts + 30);
		} else if (acts > 50) {
			penetrativeUse = random(acts, acts + 15);
		} else if (acts > 25) {
			penetrativeUse = random(acts, acts + 8);
		} else if (acts > 10) {
			penetrativeUse = random(acts, acts + 5);
		} else if (acts > 5) {
			penetrativeUse = random(acts, acts + 3);
		} else {
			penetrativeUse = random(acts, acts + 2);
		}
		penetrativeUse = Math.round(penetrativeUse);
		// qualitySex behaves differently here; it governs how many times she can go before she can no longer get it up for you.
		if (isHorny(slave) || slave.career === "a breeding bull") {
			qualitySex = penetrativeUse;
		} else {
			qualitySex = baseQualitySexActs;
			qualitySex *= (100 + slave.muscles) / 100;
			if (slave.assignment === Job.FUCKTOY) {
				qualitySex = Math.ceil(qualitySex * restEffects(slave, 11));
			} else {
				qualitySex = Math.ceil(qualitySex * healthPenalty(slave));
			}
		}
		if (slave.fuckdoll === 0) {
			if (slave.fetish === Fetish.MINDBROKEN) {
				if (slave.career === "a breeding bull") {
					if (canGetPregnant(V.PC)) {
						r.push(`${He} spends the week eagerly trying to breed you. You have the sexual energy to take ${him}`);
					} else {
						r.push(`You spend the week getting humped by ${him} after you've managed to encourage ${him} to mount you. You have the sexual energy to use ${his} dick`);
					}
					if (penetrativeUse >= 200) {
						r.push(`constantly.`);
					} else if (penetrativeUse >= 100) {
						r.push(`about once an hour.`);
					} else if (penetrativeUse >= 50) {
						r.push(`throughout the day.`);
					} else if (penetrativeUse >= 14) {
						r.push(`several times a day.`);
					} else if (penetrativeUse >= 7) {
						r.push(`at least once a day.`);
					} else {
						r.push(`on occasion.`);
					}
					if (canGetPregnant(V.PC)) {
						r.push(`${He} happily mounts you and humps away, but ${he} has no sense of what's pleasurable to you and just excitedly thrusts until ${he} cums inside you.`);
					} else {
						r.push(`${His} conditioning tells ${him} to impregnate others, and since ${he} sees you as already pregnant, just cums inside you for ${his} own pleasure.`);
					}
				} else {
					r.push(`You spend the week using ${his} dick after you've stimulated ${him} enough to get ${him} hard. You have the sexual energy to ${isMovable(V.PC) ? "ride" : "leg lock"} ${him}`);
					if (penetrativeUse >= 200) {
						r.push(`constantly.`);
					} else if (penetrativeUse >= 100) {
						r.push(`about once an hour.`);
					} else if (penetrativeUse >= 50) {
						r.push(`throughout the day.`);
					} else if (penetrativeUse >= 14) {
						r.push(`several times a day.`);
					} else if (penetrativeUse >= 7) {
						r.push(`at least once a day.`);
					} else {
						r.push(`on occasion.`);
					}
					r.push(`${He} sometimes thrusts out of instinct, but most of the work in the endeavor falls to you.`);
					qualitySex = Math.min(Math.max(qualitySex, 7), penetrativeUse);
					excessSex = penetrativeUse - qualitySex;
					if (excessSex > 0) {
						r.push(`Unfortunately, you wanted more from ${him} than ${his} body could give, rendering ${excessSex > 20 ? " a lot" : "some"} of your attempts to entice ${him} ineffective.`);
					}
				}
			} else if (V.PC.preg > V.PC.pregData.normalBirth * .66 && V.PC.pregMood === 1) {
				r.push(`${He} spends the week`);
				if (slave.trust < -20) {
					r.push(`cautiously fucking you in the missionary position. It takes a gentle touch to let ${him} know it's safe to get hard, but after that ${he} knows what to do.`);
					qualitySex -= 10;
				} else if (slave.devotion < -20) {
					r.push(`aggressively fucking your ${V.PC.vagina > 0 ? "pussy" : "asshole"} with little regard for you or your child${V.PC.pregType > 1 ? 'ren' : ''}.`);
					qualitySex += 10;
				} else if (slave.devotion <= 20) {
					r.push(`obediently fucking you in the missionary position while putting up with your attempts to breast feed ${him}.`);
				} else if (slave.fetishKnown === 1 && slave.fetish === Fetish.DOM) {
					r.push(`as your adoring dom, giving you exactly what you need and treating you like a woman.`);
					qualitySex += 10;
				} else if (slave.career === "a breeding bull" || (slave.fetishKnown === 1 && slave.fetish === Fetish.PREGNANCY)) {
					r.push(`eagerly driving ${his} cock into your ${V.PC.vagina > 0 ? "pussy" : "asshole"}, and shooting cum as deep as ${he} can.`);
					qualitySex += 5;
				} else if (slave.devotion <= 50) {
					r.push(`obediently driving ${his} shaft into your ${V.PC.vagina > 0 ? "womanhood" : "backdoor"} as you knead your aching breasts.`);
				} else {
					r.push(`eagerly driving ${his} shaft into your ${V.PC.vagina > 0 ? "womanhood" : "backdoor"} as you knead your aching breasts.`);
					qualitySex += 10;
				}
				if (slave.assignment === Job.CONCUBINE) {
					qualitySex += 10;
				} else if (slave.assignment === Job.MASTERSUITE) {
					qualitySex += 5;
				}
				if (FutureSocieties.isActive('FSSlaveProfessionalism') && slave.devotion > 20 && slave.energy < 40 && slave.skill.penetrative > 60) {
					qualitySex += 20;
				}
				qualitySex = Math.min(Math.max(qualitySex, 7), penetrativeUse);
				excessSex = penetrativeUse - qualitySex;
				// cull excess if satisfied
				if (excessSex > 0) {
					if (qualitySex * penetrativeQuality >= energyPerSlave) {
						penetrativeUse = penetrativeUse - excessSex;
						excessSex = 0;
					}
				}
				r.push(`You have the sexual energy to desire ${his} dick in you`);
				if (slave.trust >= -20 && slave.devotion <= 20) {
					if (penetrativeUse >= 200) {
						r.push(`non-stop;`);
						slave.devotion -= 25;
						slave.trust += 15;
					} else if (penetrativeUse >= 100) {
						r.push(`about once an hour;`);
						slave.devotion -= 20;
						slave.trust += 10;
					} else if (penetrativeUse >= 50) {
						r.push(`all throughout the day;`);
						slave.devotion -= 15;
						slave.trust += 10;
					} else if (penetrativeUse >= 14) {
						r.push(`several times a day;`);
						slave.devotion -= 15;
						slave.trust += 9;
					} else if (penetrativeUse >= 7) {
						r.push(`at least once a day;`);
						slave.devotion -= 10;
						slave.trust += 8;
					} else {
						r.push(`on occasion;`);
						slave.devotion -= 5;
						slave.trust += 7;
					}
					r.push(`getting to dominantly fuck ${his} '${getWrittenTitle(slave)}' <span class="devotion dec">builds ${his} self-confidence</span> and <span class="trust inc">lessens ${his} fear</span> of you.`);
					if (excessSex > 0) {
						r.push(`Unfortunately for you, you wanted more from ${him} than ${his} body could give; ${excessSex > 20 ? "far more than you'd like" : "every so often"} your request for sex is met with a shrug and a gesture towards ${his} very satisfied cock.`);
					}
				} else if (slave.devotion <= 20) {
					if (penetrativeUse >= 200) {
						r.push(`non-stop;`);
						slave.devotion -= 10;
						slave.trust += 10;
					} else if (penetrativeUse >= 100) {
						r.push(`about once an hour;`);
						slave.devotion -= 8;
						slave.trust += 8;
					} else if (penetrativeUse >= 50) {
						r.push(`all throughout the day;`);
						slave.devotion -= 6;
						slave.trust += 6;
					} else if (penetrativeUse >= 14) {
						r.push(`several times a day;`);
						slave.devotion -= 5;
						slave.trust += 5;
					} else if (penetrativeUse >= 7) {
						r.push(`at least once a day;`);
						slave.devotion -= 4;
						slave.trust += 4;
					} else {
						r.push(`on occasion;`);
						slave.devotion -= 3;
						slave.trust += 3;
					}
					r.push(`getting to dominantly fuck ${his} '${getWrittenTitle(slave)}' <span class="devotion dec">builds ${his} self-confidence,</span> yet <span class="trust inc">makes ${him} more trusting</span> of you.`);
					if (excessSex > 0) {
						r.push(`Unfortunately for you, you wanted more from ${him} than ${his} body could give; ${excessSex > 20 ? "far more than you'd like" : "every so often"} your request for sex is met with an apology and a promise that next time will be better.`);
					}
				} else {
					if (penetrativeUse >= 200) {
						r.push(`constantly; non-stop`);
						slave.devotion += 3;
						slave.trust += 1;
					} else if (penetrativeUse >= 100) {
						r.push(`about once an hour; the seemingly endless`);
						slave.devotion += 3;
						slave.trust += 1;
					} else if (penetrativeUse >= 50) {
						r.push(`throughout the day; constant,`);
						slave.devotion += 3;
						slave.trust += 1;
					} else if (penetrativeUse >= 14) {
						r.push(`several times a day; frequent,`);
						slave.devotion += 3;
						slave.trust += 1;
					} else if (penetrativeUse >= 7) {
						r.push(`several times a day; regular,`);
						slave.devotion += 2;
						slave.trust += 1;
					} else {
						r.push(`on occasion;`);
						slave.devotion += 1;
						slave.trust += 1;
					}
					r.push(`enjoyable sex with you draws ${him} <span class="devotion inc">closer to you</span> and encourages ${him} to <span class="trust inc">trust you.</span>`);
					if (excessSex > 0) {
						r.push(`Unfortunately for you, you wanted more from ${him} than ${his} body could give; ${excessSex > 20 ? "far more than you'd like," : "every so often"} you discover that ${he} can't get hard for you. You reassure ${him} that ${he}'s not in trouble and that you can wait for next time as long as ${he} spends a moment cuddling with you.`);
					}
				}
			} else if (V.PC.preg > V.PC.pregData.normalBirth * .66 && V.PC.pregMood === 2) {
				r.push(`${He} spends the week`);
				if (slave.trust < -20) {
					r.push(`in fear under your gravid bulk as you forcibly ride ${his} dick in a futile attempt to cool your raging hormones.`);
					qualitySex -= 15;
				} else if (slave.devotion < -20) {
					r.push(`alternately struggling or lying corpse-like under your gravid bulk as you forcibly ride ${his} dick in a futile attempt to cool your raging hormones.`);
					qualitySex -= 10;
				} else if (slave.devotion <= 20) {
					r.push(`reluctantly trying to avoid having to take all of your pregnancy weight while not pissing you off whenever you ride ${his} dick in a futile attempt to cool your raging hormones.`);
					qualitySex -= 5;
				} else if (slave.fetishKnown === 1 && slave.fetish === Fetish.SUBMISSIVE) {
					r.push(`doing ${his} best to be a good belly support as ${he} submissively gives you what you want.`);
				} else if (slave.devotion <= 50) {
					r.push(`obediently bearing your weight as you aggressively ride ${his} dick in a futile attempt to cool your raging hormones.`);
					qualitySex += 5;
				} else {
					r.push(`happily pampering and supporting your gravid bulk as you ride ${his} dick in a futile attempt to cool your raging hormones.`);
					qualitySex += 10;
				}
				if (slave.assignment === Job.CONCUBINE) {
					qualitySex += 10;
				} else if (slave.assignment === Job.MASTERSUITE) {
					qualitySex += 5;
				}
				if (FutureSocieties.isActive('FSSlaveProfessionalism') && slave.devotion > 20 && slave.energy < 40 && slave.skill.penetrative > 60) {
					qualitySex += 20;
				}
				qualitySex = Math.min(Math.max(qualitySex, 7), penetrativeUse);
				excessSex = penetrativeUse - qualitySex;
				// cull excess if satisfied
				if (excessSex > 0) {
					if (qualitySex * penetrativeQuality >= energyPerSlave) {
						penetrativeUse = penetrativeUse - excessSex;
						excessSex = 0;
					}
				}
				r.push(`You have the sexual energy to aggressively mount ${him}`);
				if (slave.trust >= -20 && slave.devotion <= 20) {
					if (penetrativeUse >= 200) {
						r.push(`constantly; the eternal,`);
						slave.devotion -= 15;
						slave.trust -= 20;
					} else if (penetrativeUse >= 100) {
						r.push(`about once an hour; the unending,`);
						slave.devotion -= 12;
						slave.trust -= 20;
					} else if (penetrativeUse >= 50) {
						r.push(`throughout the day; the constant,`);
						slave.devotion -= 10;
						slave.trust -= 20;
					} else if (penetrativeUse >= 14) {
						r.push(`several times a day; the frequent,`);
						slave.devotion -= 8;
						slave.trust -= 20;
					} else if (penetrativeUse >= 7) {
						r.push(`at least once a day; the regular,`);
						slave.devotion -= 5;
						slave.trust -= 15;
					} else {
						r.push(`on occasion; the threat of`);
						slave.devotion -= 3;
						slave.trust -= 5;
					}
					r.push(`violent rape fills ${him} with <span class="devotion dec">revulsion</span> and <span class="trust dec">fear.</span>`);
					if (excessSex > 0) {
						r.push(`Unfortunately for ${him}, you wanted more than ${his} body could give you; ${excessSex > 20 ? "far more than you'd like," : "every so often"} you'd find that ${he} just couldn't get it up for you. The resulting <span class="devotion dec">emasculation</span> and <span class="trust dec">torment</span> you levy on ${him} may make you feel better, but leaves a lasting impression on ${him}.`);
						slave.devotion -= 10;
						slave.trust -= 5;
					}
				} else if (slave.devotion <= 20) {
					if (penetrativeUse >= 200) {
						r.push(`non-stop; submitting to your eternal,`);
						slave.devotion += 6;
						slave.trust -= 8;
					} else if (penetrativeUse >= 100) {
						r.push(`about once an hour; submitting to the unending,`);
						slave.devotion += 5;
						slave.trust -= 7;
					} else if (penetrativeUse >= 50) {
						r.push(`all throughout the day; submitting to your constant,`);
						slave.devotion += 4;
						slave.trust -= 6;
					} else if (penetrativeUse >= 14) {
						r.push(`several times a day; submitting to your frequent,`);
						slave.devotion += 3;
						slave.trust -= 5;
					} else if (penetrativeUse >= 7) {
						r.push(`at least once a day; submitting to your regular,`);
						slave.devotion += 2;
						slave.trust -= 4;
					} else {
						r.push(`on occasion; submitting to your rather`);
						slave.devotion++;
						slave.trust -= 3;
					}
					r.push(`forceful use <span class="devotion inc">habituates ${him}</span> to being a sex slave, though ${he} learns to <span class="trust dec">fear</span> your bottomless lust.`);
					if (excessSex > 0) {
						r.push(`Unfortunately for ${him}, you wanted more than ${his} body could give you; ${excessSex > 20 ? "far more than you'd like," : "every so often"} you'd find that ${he} just couldn't get it up for you. To avoid further emasculation, ${he} begs for mercy, only to find there <span class="trust dec">isn't any to be had.</span>`);
						slave.trust -= 5;
					}
				} else {
					if (penetrativeUse >= 200) {
						r.push(`constantly; non-stop`);
						slave.devotion += 3;
					} else if (penetrativeUse >= 100) {
						r.push(`about once an hour; the seemingly endless`);
						slave.devotion += 3;
					} else if (penetrativeUse >= 50) {
						r.push(`throughout the day; constant,`);
						slave.devotion += 3;
					} else if (penetrativeUse >= 14) {
						r.push(`several times a day; frequent,`);
						slave.devotion += 3;
					} else if (penetrativeUse >= 7) {
						r.push(`several times a day; regular,`);
						slave.devotion += 2;
					} else {
						r.push(`on occasion;`);
						slave.devotion += 1;
					}
					r.push(`rough sex with you teaches ${him} that <span class="devotion inc">${his} place is under your stomach.</span>`);
					if (excessSex > 0) {
						r.push(`Unfortunately for ${him}, you wanted more than ${his} body could give you; ${excessSex > 20 ? "far more than you'd like," : "every so often"} you'd find that ${he} just couldn't get it up for you. ${He} knows it's mostly your hormones talking, but it still <span class="devotion dec">stings.</span>`);
						slave.devotion -= 5;
					}
				}
			} else {
				r.push(`${He} spends the week`);
				if (slave.trust < -20) {
					r.push(`in terrified compliance with your use of ${his} dick.`);
					qualitySex -= 5;
				} else if (slave.devotion < -20) {
					r.push(`alternately struggling or lying corpse-like as you ${isMovable(V.PC) ? `ride ${his} dick` : `force ${him} to penetrate you.`}.`);
					qualitySex -= 10;
				} else if (slave.trust > 20 && slave.devotion <= 20) {
					r.push(`eagerly fucking your ${V.PC.vagina > 0 ? "pussy" : "asshole"} with little regard for your enjoyment.`);
					qualitySex += 10;
				} else if (slave.devotion <= 20) {
					r.push(`reluctantly accepting your use of ${his} dick.`);
				} else if (slave.fetishKnown === 1 && slave.fetish === Fetish.SUBMISSIVE) {
					r.push(`as your adoring submissive, seeing to your pleasure with ${his} shaft.`);
					qualitySex += 5;
				} else if (slave.devotion <= 50 && V.PC.vagina > 0) {
					r.push(`obediently serving you in the classical way, driving into your womanhood.`);
				} else if (slave.devotion <= 50) {
					r.push(`obediently serving you by driving into your backdoor.`);
				} else if (V.PC.vagina > 0 && (slave.career === "a breeding bull" || (slave.fetishKnown === 1) && (slave.fetish === Fetish.PREGNANCY))) {
					r.push(`eagerly driving ${his} cock into your pussy, thoroughly enjoying fucking pussy bareback and cumming deep inside.`);
					qualitySex += 30;
				} else if (V.PC.vagina > 0) {
					r.push(`serving you in the classical way, warming your bed and lovingly driving ${his} shaft into your womanhood.`);
					qualitySex += 10;
				} else {
					r.push(`serving you in the classical way, warming your bed and lovingly driving ${his} shaft into your backdoor.`);
					qualitySex += 10;
				}
				if (slave.assignment === Job.CONCUBINE) {
					qualitySex += 10;
				} else if (slave.assignment === Job.MASTERSUITE) {
					qualitySex += 5;
				}
				if (FutureSocieties.isActive('FSSlaveProfessionalism') && slave.devotion > 20 && slave.energy < 40 && slave.skill.penetrative > 60) {
					qualitySex += 20;
				}
				qualitySex = Math.min(Math.max(qualitySex, 7), penetrativeUse);
				excessSex = penetrativeUse - qualitySex;
				// cull excess if satisfied
				if (excessSex > 0) {
					if (qualitySex * penetrativeQuality >= energyPerSlave) {
						penetrativeUse = penetrativeUse - excessSex;
						excessSex = 0;
					}
				}
				if (slave.trust > 20 && slave.devotion <= 20) {
					r.push(`You have the sexual energy to get fucked by ${him}`);
					if (penetrativeUse >= 200) {
						r.push(`non-stop;`);
						slave.devotion -= 5;
						slave.trust += 10;
					} else if (penetrativeUse >= 100) {
						r.push(`about once an hour;`);
						slave.devotion -= 5;
						slave.trust += 10;
					} else if (penetrativeUse >= 50) {
						r.push(`all throughout the day;`);
						slave.devotion -= 5;
						slave.trust += 9;
					} else if (penetrativeUse >= 14) {
						r.push(`several times a day;`);
						slave.devotion -= 5;
						slave.trust += 8;
					} else if (penetrativeUse >= 7) {
						r.push(`at least once a day;`);
						slave.devotion -= 4;
						slave.trust += 8;
					} else {
						r.push(`on occasion;`);
						slave.devotion -= 3;
						slave.trust += 7;
					}
					r.push(`getting to stick ${his} dick in you while controlling the pace <span class="devotion dec">builds ${his} self-confidence</span> and <span class="trust inc">lessens ${his} overall fear</span> of you.`);
					if (excessSex > 0) {
						r.push(`${excessSex > 20 ? "Far too many times" : "Every so often"} you find ${him} trying to weasel out of servicing you by claiming ${he}'s 'had enough', so you remind ${him} of ${his} place by grabbing ${his} ${slave.scrotum > 0 ? "balls" : "dick"} and forcing ${him} to prostrate ${himself} before you. Only once the <span class="trust dec">fear sets in</span> over ${his} <span class="devotion inc">tarnished pride</span> do you allow ${him} to right ${himself}.`);
						slave.devotion += 5;
						slave.trust -= 10;
					}
				} else if (slave.trust >= -20 && slave.devotion <= 20) {
					r.push(`You have the sexual energy to ${isMovable(V.PC) ? "ride" : "leg lock"} ${him}`);
					if (penetrativeUse >= 200) {
						r.push(`constantly; the eternal`);
						slave.devotion -= 8;
						slave.trust -= 8;
					} else if (penetrativeUse >= 100) {
						r.push(`about once an hour; the unending`);
						slave.devotion -= 7;
						slave.trust -= 7;
					} else if (penetrativeUse >= 50) {
						r.push(`throughout the day; the constant`);
						slave.devotion -= 6;
						slave.trust -= 6;
					} else if (penetrativeUse >= 14) {
						r.push(`several times a day; the frequent`);
						slave.devotion -= 5;
						slave.trust -= 5;
					} else if (penetrativeUse >= 7) {
						r.push(`at least once a day; the regular`);
						slave.devotion -= 4;
						slave.trust -= 4;
					} else {
						r.push(`on occasion; the threat of`);
						slave.devotion -= 3;
						slave.trust -= 3;
					}
					r.push(`rape fills ${him} with <span class="devotion dec">revulsion</span> and <span class="trust dec">fear.</span>`);
					if (excessSex > 0) {
						r.push(`${excessSex > 20 ? "Far more than you'd like" : "Every so often"} you find that ${he} can't get it up anymore. In those cases, you toss a strap-on at ${him} so ${he} can get back to servicing you, <span class="devotion inc">undermining any pride</span> ${he} may be harboring.`);
						slave.devotion += 5;
						straponUse = excessSex;
					}
				} else if (slave.devotion <= 20) {
					r.push(`You have the sexual energy to ${isMovable(V.PC) ? "ride" : "leg lock"} ${him}`);
					if (penetrativeUse >= 200) {
						r.push(`constantly; submitting to always being inside you`);
						slave.devotion += 6;
					} else if (penetrativeUse >= 100) {
						r.push(`about once an hour; submitting to your seemingly endless use`);
						slave.devotion += 5;
					} else if (penetrativeUse >= 50) {
						r.push(`throughout the day; submitting to your constant use`);
						slave.devotion += 4;
					} else if (penetrativeUse >= 14) {
						r.push(`several times a day; submitting to your frequent use`);
						slave.devotion += 3;
					} else if (penetrativeUse >= 7) {
						r.push(`at least once a day; submitting to your regular use`);
						slave.devotion += 2;
					} else {
						r.push(`on occasion; submitting to your use`);
						slave.devotion += 1;
					}
					r.push(`<span class="devotion inc">habituates ${him}</span> to being your sex slave.`);
					if (excessSex > 0) {
						r.push(`${excessSex > 20 ? "Far more than you'd like" : "Every so often"} you find that ${he} can't get it up anymore. In those cases, you toss a strap-on at ${him} so ${he} can get back to pleasing you, <span class="devotion inc">codifying</span> ${his} place as a sexual servant.`);
						slave.devotion += 2;
						straponUse = excessSex;
					}
				} else {
					r.push(`You have the sexual energy to get fucked by ${him}`);
					if (penetrativeUse >= 200) {
						r.push(`constantly; non-stop`);
						slave.devotion += 3;
						slave.trust += 3;
					} else if (penetrativeUse >= 100) {
						r.push(`about once an hour; the seemingly endless`);
						slave.devotion += 3;
						slave.trust += 3;
					} else if (penetrativeUse >= 50) {
						r.push(`throughout the day; constant,`);
						slave.devotion += 3;
						slave.trust += 3;
					} else if (penetrativeUse >= 14) {
						r.push(`several times a day; frequent,`);
						slave.devotion += 3;
						slave.trust += 3;
					} else if (penetrativeUse >= 7) {
						r.push(`at least once a day; regular,`);
						slave.devotion += 2;
						slave.trust += 2;
					} else {
						r.push(`on occasion;`);
						slave.devotion += 1;
						slave.trust += 1;
					}
					r.push(`enjoyable sex with you draws ${him} <span class="devotion inc">closer to you</span> and encourages ${him} to <span class="trust inc">trust you.</span>`);
					if (excessSex > 0) {
						r.push(`${excessSex > 20 ? "More often than you'd like," : "Every so often"} you find that ${he} can't get it up anymore. In those cases, you toss a strap-on to ${him} so ${he} can continue satisfying you. ${He} carries out ${his} role with gusto, even if ${his} body refuses.`);
						straponUse = excessSex;
					}
				}
			}
			playerNeed -= ((qualitySex + straponUse) * penetrativeQuality);
			slaveNeed -= (qualitySex * penetrativePleasure);
			if (qualitySex > 0) {
				if (slave.skill.penetrative >= 100) {
					r.push(`${His} masterful skill can draw out orgasm after orgasm from you.`);
				} else if (slave.skill.penetrative > 60) {
					r.push(`${His} expert skill leaves you feeling wonderfully drained post-coitus.`);
				} else if (slave.skill.penetrative > 30) {
					r.push(`${His} skill helps you reach those especially powerful climaxes.`);
				} else if (slave.skill.penetrative > 10) {
					r.push(`${He}'s skilled enough to bring you to orgasm, but not enough to make it a remarkable one.`);
				} else {
					r.push(`${He}'s clueless at how to properly fuck a ${playerPronouns.girl}, making sex with ${him} awkward and unpleasant.`);
				}
				if (dickSize > 0) {
					r.push(`${His} dick absolutely stuffs your`);
				} else if (dickSize < 0) {
					r.push(`${His} dick is too small for your`);
				} else {
					r.push(`${His} dick fits nicely in your`);
				}
				if (canDoVaginal(V.PC)) {
					r.push(`pussy.`);
				} else {
					r.push(`anus.`);
				}
				if (V.PC.prostate > 0) {
					r.push(`The feeling of ${him} stimulating your prostate is just exquisite.`);
					if (PlayerAggroSperm) {
						r.push(`But it only gets better as your modified sperm slowly wriggle through your urethra, building anticipation until the pleasure dam bursts and you nearly pass out from the sensation.`);
					}
				}
				if (slave.sexualFlaw === SexualFlaw.APATHETIC) {
					r.push(`Even when ${he}'s into it, you can feel ${he}'d prefer to let you do all the work.`);
				}
			}
			if (slave.fetish !== Fetish.MINDBROKEN) {
				if (slave.behavioralFlaw === BehavioralFlaw.HATESWOMEN && perceivedGender(V.PC) >= 0 && V.PC.vagina !== -1 && V.PC.dick === 0 && slave.devotion > 20) {
					r.push(`Spending so much intimate time with an attractive woman <span class="flaw break">reconciles ${him} to serving the fairer sex.</span>`);
					slave.behavioralFlaw = BehavioralFlaw.NONE;
				}
				if (slave.skill.penetrative < 100 && (slave.devotion >= -20 || slave.trust > 20)) {
					r.push(`You find ${his} ability to fuck you unsatisfactory, so you work to <span class="skill inc">improve ${his} penetrative skills.</span>`);
					r.push(slaveSkillIncrease("penetrative", slave, trainingEfficiency));
				}
			}
		} else {
			r.push(`All it takes is a simple command to force ${his} dick to attention. You have the sexual energy to ${isMovable(V.PC) ? "ride" : "be penetrated by"} ${him}`);
			if (penetrativeUse >= 200) {
				r.push(`constantly.`);
			} else if (penetrativeUse >= 100) {
				r.push(`about once an hour.`);
			} else if (penetrativeUse >= 50) {
				r.push(`throughout the day.`);
			} else if (penetrativeUse >= 14) {
				r.push(`several times a day.`);
			} else if (penetrativeUse >= 7) {
				r.push(`at least once a day.`);
			} else {
				r.push(`on occasion.`);
			}
			r.push(`You have to do all the work, unfortunately.`);
			qualitySex = penetrativeUse;
			playerNeed -= qualitySex * penetrativeQuality;
			slaveNeed -= (penetrativeUse * 10);
		}
		if (canDoVaginal(V.PC)) {
			seX(slave, "penetrative", V.PC, "vaginal", qualitySex + straponUse);
			tryKnockMeUp(V.PC, qualitySex, 0, slave);
		} else {
			seX(slave, "penetrative", V.PC, "anal", qualitySex + straponUse);
			tryKnockMeUp(V.PC, qualitySex, 1, slave);
		}
		if (V.policies.sexualOpenness === 0) {
			r.push(`Rumors spread that you <span class="warning">enjoy taking it from slaves.</span>`);
			V.PC.degeneracy += 2;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function useDickVirgin(slave) {
		const loadSize = cumLoad(slave);
		penetrativeQuality = evaluateSexQuality(slave, "penetrativeTease");
		penetrativePleasure = evaluateSlavePleasure(slave, "penetrativeTease");
		acts = libidoToActs;
		if (acts > 200) {
			penetrativeUse = random(acts, acts + 35);
		} else if (acts > 100) {
			penetrativeUse = random(acts, acts + 30);
		} else if (acts > 50) {
			penetrativeUse = random(acts, acts + 15);
		} else if (acts > 25) {
			penetrativeUse = random(acts, acts + 8);
		} else if (acts > 10) {
			penetrativeUse = random(acts, acts + 5);
		} else if (acts > 5) {
			penetrativeUse = random(acts, acts + 3);
		} else {
			penetrativeUse = random(acts, acts + 2);
		}
		if (PlayerAggroSperm && V.PC.dick !== 0) {
			penetrativeUse = Math.round(penetrativeUse / 2);
		} else {
			penetrativeUse = Math.round(penetrativeUse);
		}
		// qualitySex behaves differently here; it governs how many times she can go before she can no longer get it up for you.
		if (isHorny(slave) || slave.career === "a breeding bull") {
			qualitySex = penetrativeUse;
		} else {
			qualitySex = baseQualitySexActs;
			qualitySex *= (100 + slave.muscles) / 100;
			if (slave.assignment === Job.FUCKTOY) {
				qualitySex = Math.ceil(qualitySex * restEffects(slave, 11));
			} else {
				qualitySex = Math.ceil(qualitySex * healthPenalty(slave));
			}
		}
		// work some cumflation into this but only AFTER you are certain that prInflation can handle it.
		if (slave.fuckdoll === 0) {
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`You spend the week sucking ${his} dick after you've stimulated ${him} enough to get ${him} hard. You have the sexual energy to`);
				if (V.PC.belly >= 15000 && !nullPC) {
					r.push(`use an egg vibrator on yourself`);
				} else {
					r.push(`touch yourself`);
				}
				r.push(`while blowing ${him}`);
				if (penetrativeUse >= 200) {
					r.push(`constantly.`);
				} else if (penetrativeUse >= 100) {
					r.push(`about once an hour.`);
				} else if (penetrativeUse >= 50) {
					r.push(`throughout the day.`);
				} else if (penetrativeUse >= 14) {
					r.push(`several times a day.`);
				} else if (penetrativeUse >= 7) {
					r.push(`at least once a day.`);
				} else {
					r.push(`on occasion.`);
				}
				r.push(`${He} sometimes thrusts out of instinct, but you usually have to do all the work until ${he} unloads in ${slave.dick > 3 ? "your throat" : "your mouth"}${loadSize >= 250 ? " and fills your stomach" : ""}.`);
				qualitySex = Math.min(Math.max(qualitySex, 7), penetrativeUse);
				excessSex = penetrativeUse - qualitySex;
				// cull excess if satisfied
				if (excessSex > 0) {
					if (qualitySex * penetrativeQuality >= energyPerSlave) {
						penetrativeUse = penetrativeUse - excessSex;
						excessSex = 0;
					}
				}
				if (excessSex > 0) {
					r.push(`${excessSex > 20 ? "Quite frequently" : "Sometimes"} you find yourself playing with ${his} limp dick after sexually exhausting ${him}, but it's still fun to see just how much cum you can manage to extract from ${him}.`);
				}
				if (!nullPC) {
					playerNeed -= ((qualitySex * 0.7) + (excessSex * 0.4));
				} else {
					playerNeed += ((qualitySex * 0.1) + (excessSex * 0.1));
				}
				slaveNeed -= ((qualitySex * penetrativePleasure) + (excessSex * penetrativePleasure * 0.5));
			} else {
				r.push(`${He} spends the week`);
				if (slave.trust < -20) {
					r.push(`in terrified compliance with your use of ${his} dick as a masturbation aid.`);
					qualitySex -= 5;
				} else if (slave.devotion < -20) {
					r.push(`alternately struggling or lying corpse-like as you suck ${his} dick and`);
					if (V.PC.belly >= 15000 && !nullPC) {
						r.push(`use an egg vibrator on yourself.`);
					} else {
						r.push(`touch yourself.`);
					}
					qualitySex -= 10;
				} else if (slave.trust > 20 && slave.devotion <= 20) {
					r.push(`happily facefucking you while you`);
					if (V.PC.belly >= 15000 && !nullPC) {
						r.push(`use an egg vibrator on yourself.`);
					} else {
						r.push(`touch yourself.`);
					}
					qualitySex += 10;
				} else if (slave.devotion <= 20) {
					r.push(`reluctantly accepting your use of ${his} dick as a masturbation aid.`);
				} else if (slave.fetishKnown === 1 && slave.fetish === Fetish.CUMSLUT) {
					r.push(`happy to know that <span class="devotion inc">${his} ${getWrittenTitle(slave)} has the same tastes as ${him}.</span>`);
					slave.devotion += 2;
					qualitySex += 30;
				} else if (slave.devotion <= 50) {
					r.push(`obediently letting you suck ${him} dry while you`);
					if (V.PC.belly >= 15000 && !nullPC) {
						r.push(`use an egg vibrator on yourself.`);
					} else {
						r.push(`touch yourself.`);
					}
				} else {
					r.push(`serving you in the classical way, staying by your side and lovingly letting you take`);
					if (isPCCareerInCategory("escort")) {
						if (canPenetrate(slave)) {
							r.push(`the entirety`);
						} else {
							r.push(`the head`);
						}
					} else {
						if (slave.dick < 4) {
							r.push(`all`);
						} else {
							r.push(`the head`);
						}
					}
					r.push(`of ${his} shaft into your mouth while you`);
					if (V.PC.belly >= 15000 && !nullPC) {
						r.push(`toy with an egg vibrator.`);
					} else {
						r.push(`fondle yourself.`);
					}
					qualitySex += 10;
				}
				if (slave.assignment === Job.CONCUBINE) {
					qualitySex += 15;
				} else if (slave.assignment === Job.MASTERSUITE) {
					qualitySex += 7;
				}
				if (FutureSocieties.isActive('FSSlaveProfessionalism') && slave.devotion > 20 && slave.energy < 40 && slave.skill.penetrative > 60) {
					qualitySex += 30;
				}
				qualitySex = Math.min(Math.max(qualitySex, 7), penetrativeUse);
				excessSex = penetrativeUse - qualitySex;
				// cull excess if satisfied
				if (excessSex > 0) {
					if (qualitySex * penetrativeQuality >= energyPerSlave) {
						penetrativeUse = penetrativeUse - excessSex;
						excessSex = 0;
					}
				}
				if (slave.trust > 20 && slave.devotion <= 20) {
					r.push(`${He}'s not about to turn down a free blowjob, and you have the desire to suck ${him} off`);
					if (penetrativeUse >= 200) {
						r.push(`all the time;`);
						slave.devotion -= 5;
						slave.trust += 10;
					} else if (penetrativeUse >= 100) {
						r.push(`almost every hour;`);
						slave.devotion -= 5;
						slave.trust += 10;
					} else if (penetrativeUse >= 50) {
						r.push(`throughout the day;`);
						slave.devotion -= 5;
						slave.trust += 9;
					} else if (penetrativeUse >= 14) {
						r.push(`several times a day;`);
						slave.devotion -= 5;
						slave.trust += 8;
					} else if (penetrativeUse >= 7) {
						r.push(`daily;`);
						slave.devotion -= 4;
						slave.trust += 8;
					} else {
						r.push(`on occasion;`);
						slave.devotion -= 3;
						slave.trust += 7;
					}
					if (V.PC.inflationMethod !== 1 && canSee(slave)) {
						if (loadSize >= 10000 && V.PC.weight <= 160) {
							r.push(`the sight of your belly steadily growing until you fill to capacity and backflow, forcing ${him} to shower you with the rest of ${his} load`);
						} else if (loadSize >= 5000 && V.PC.weight <= 130) {
							r.push(`watching your belly balloon out as you suck down ${his} cum`);
						} else if (loadSize >= 1000 && V.PC.bellySag > Math.trunc(loadSize / 100) && V.PC.weight <= 95) {
							r.push(`watching you stagger back with a belly full of ${his} cum`);
						} else if (loadSize >= 250 && V.PC.bellySag > Math.trunc(loadSize / 100) && V.PC.weight <= 95) {
							r.push(`seeing the little belly you sport after swallowing ${his} load`);
						} else {
							r.push(`getting to blow ${his} load down your throat`);
						}
					} else {
						r.push(`getting to blow ${his} load down your throat`);
					}
					r.push(`<span class="devotion dec">builds ${his} confidence</span> and <span class="trust inc">alleviates some of the threat</span> you hold over ${him} as ${his} owner.`);
					if (excessSex > 0) {
						r.push(`${excessSex > 20 ? "Far too many times" : "Every so often"} you find ${him} trying to weasel out of getting blown by claiming ${he}'s 'had enough', so you remind ${him} of ${his} place by grabbing ${his} hips and deepthroating ${him}; you plan on draining every last drop out of ${him}, whether ${he} likes it or not. You leave ${him} <span class="trust inc">beyond satisfied,</span> if a little exhausted, to <span class="devotion inc">rethink how good ${he} actually has it.</span>`);
						slave.devotion += 2;
						slave.trust += 1;
					}
				} else if (slave.trust >= -20 && slave.devotion <= 20) {
					r.push(`Although he feels deep revulsion towards you, he doesn't resist you`);
					if (penetrativeUse >= 200) {
						r.push(`constantly sucking ${his} cock`);
						slave.devotion -= 5;
						slave.trust += 15;
					} else if (penetrativeUse >= 100) {
						r.push(`when you give ${him} {his} hourly blowjob`);
						slave.devotion -= 4;
						slave.trust += 14;
					} else if (penetrativeUse >= 50) {
						r.push(`giving ${him} frequent blowjobs`);
						slave.devotion -= 3;
						slave.trust += 12;
					} else if (penetrativeUse >= 14) {
						r.push(`giving ${him} blowjobs several times a day`);
						slave.devotion -= 2;
						slave.trust += 10;
					} else if (penetrativeUse >= 7) {
						r.push(`giving ${him} at least one blowjob a day`);
						slave.devotion -= 1;
						slave.trust += 6;
					} else {
						r.push(`giving ${him} a sporadic blowjob`);
						slave.devotion -= 1;
						slave.trust += 3;
					}
					r.push(`with the promise that ${he}'ll be allowed to <span class="trust inc">unload ${his} semen down the throat of who ${he} hates most.</span>`);
					if (excessSex > 0) {
						r.push(`${excessSex > 20 ? "Far more than you'd like" : "Every so often"} you find that ${he} can't get it up anymore, but that doesn't stop you from sucking every last drop out of ${him}. ${He} ends ${his} days <span class="trust inc">more satisfied</span> than ${he} knew ${he} could be.`);
						slave.trust += 2;
					}
				} else if (slave.devotion <= 20) {
					r.push(`You have the sexual energy to suck ${him}`);
					if (penetrativeUse >= 200) {
						r.push(`off constantly; the non-stop blowjob makes`);
						slave.trust += 10;
					} else if (penetrativeUse >= 100) {
						r.push(`off about once an hour; the chain blowjobs make`);
						slave.trust += 10;
					} else if (penetrativeUse >= 50) {
						r.push(`off throughout the day; your constant blowjobs make`);
						slave.trust += 10;
					} else if (penetrativeUse >= 14) {
						r.push(`off several times a day; your frequent blowjobs make`);
						slave.trust += 10;
					} else if (penetrativeUse >= 7) {
						r.push(`at least once a day; your regular blowjobs make`);
						slave.trust += 6;
					} else {
						r.push(`on occasion; your blowjobs make`);
						slave.trust += 3;
					}
					r.push(`${him} believe that <span class="trust inc">${he} is valuable</span> to you.`);
					if (excessSex > 0) {
						r.push(`${excessSex > 20 ? "Far more than you'd like" : "Every so often"} you find that ${he} can't get it up anymore, but that doesn't stop you from sucking every last drop out of ${him}. ${He} ends ${his} days <span class="trust inc">more satisfied</span> than ${he} knew ${he} could be.`);
						slave.trust += 2;
					}
				} else {
					r.push(`You have the sexual energy to suck ${him} off`);
					if (penetrativeUse >= 200) {
						r.push(`constantly; non-stop`);
						slave.devotion += 3;
						slave.trust += 3;
					} else if (penetrativeUse >= 100) {
						r.push(`about once an hour; the seemingly endless`);
						slave.devotion += 3;
						slave.trust += 3;
					} else if (penetrativeUse >= 50) {
						r.push(`throughout the day; constant,`);
						slave.devotion += 3;
						slave.trust += 3;
					} else if (penetrativeUse >= 14) {
						r.push(`several times a day; frequent,`);
						slave.devotion += 3;
						slave.trust += 3;
					} else if (penetrativeUse >= 7) {
						r.push(`at least once a day; regular,`);
						slave.devotion += 2;
						slave.trust += 2;
					} else {
						r.push(`on occasion;`);
						slave.devotion += 1;
						slave.trust += 1;
					}
					r.push(`enjoyable blowjobs with you brings ${him} <span class="devotion inc">closer to you</span> and encourages ${him} to <span class="trust inc">trust you.</span>`);
					if (excessSex > 0) {
						r.push(`${excessSex > 20 ? "More often than you'd like," : "Every so often"} you find that ${he} can't get it up anymore, so you take it slow and just play with ${his} dick instead of trying to drain ${him} dry. The intimacy serves to <span class="devotion inc">strengthen ${his} bond</span> with you.`);
						slave.devotion += 1;
					}
				}
			}
			if (!nullPC) {
				playerNeed -= ((qualitySex * penetrativeQuality) + (excessSex * 0.4));
			} else {
				playerNeed += ((qualitySex * 0.1) + (excessSex * 0.1));
			}
			slaveNeed -= ((qualitySex * penetrativePleasure) + (excessSex * penetrativePleasure * 0.5));
			if (nullPC) {
				r.push(`Sucking cock with no means to truly get yourself off leaves you hot and bothered.`);
				if (initialNeed < playerNeed) {
					r.push(`In fact, all the action has you more wound up than you started; perhaps losing your anal virginity wouldn't be all that bad?`);
				}
			} else if (qualitySex > 0) {
				if (slave.skill.penetrative >= 100) {
					r.push(`${His} masterful skill lets ${him} draw out the length of your blowjobs, giving you more time to enjoy yourself while elevating ${his} enjoyment to new heights.`);
				} else if (slave.skill.penetrative > 60) {
					r.push(`${His} expert skill gives ${him} some control over when ${he} cums, limiting the number of surprises you get.`);
				} else if (slave.skill.penetrative > 30) {
					r.push(`${His} skill helps you bring ${him} to even more powerful climaxes.`);
				} else if (slave.skill.penetrative > 10) {
					r.push(`${He}'s skilled enough to make sucking ${him} off enjoyable.`);
				} else {
					r.push(`${He}'s clueless at how to properly use ${his} dick and somehow makes giving ${him} head awkward.`);
				}
				if (V.PC.belly >= 15000 && !nullPC) {
					r.push(`You'd prefer to not have to have ${him} attach the vibrator to your`);
					if (V.PC.dick !== 0) {
						r.push(`dick`);
					}
					if (V.PC.vagina >= 0) {
						r.push(`clit`);
					}
					r.push(`so you can masturbate.`);
				}
				if (PlayerAggroSperm) {
					r.push(`Your gene therapy makes getting off take nearly twice as long as it used to, but the payoff when you finally blow that backed up load is well worth it.`);
					if (V.PC.dick === 0) {
						tryKnockMeUp(V.PC, (.1 * penetrativeUse) - 50, 2, V.PC);
					}
				}
				if (slave.sexualFlaw === SexualFlaw.APATHETIC) {
					r.push(`Even when ${he}'s into it, you can feel ${he}'d prefer to ${canStand(slave) ? "stand" : "sit"} there and let you do all the work.`);
				}
			}
			if (slave.fetish !== Fetish.MINDBROKEN) {
				if (slave.behavioralFlaw === BehavioralFlaw.HATESWOMEN && perceivedGender(V.PC) >= 0 && V.PC.dick === 0 && slave.devotion > 20) {
					r.push(`Spending so much intimate time with an attractive woman <span class="flaw break">reconciles ${him} to serving the fairer sex.</span>`);
					slave.behavioralFlaw = BehavioralFlaw.NONE;
				}
				if (slave.skill.penetrative < 100 && (slave.devotion >= -20 || slave.trust > 20)) {
					r.push(`You find ${his} technique lacks refinement, so you work to <span class="flaw break">improve ${his} penetrative skills.</span>`);
					r.push(slaveSkillIncrease("penetrative", slave, trainingEfficiency));
				}
			}
		} else {
			r.push(`All it takes is a simple command to force ${his} dick to attention. You have the sexual energy to suck ${him}`);
			if (penetrativeUse >= 200) {
				r.push(`constantly.`);
			} else if (penetrativeUse >= 100) {
				r.push(`about once an hour.`);
			} else if (penetrativeUse >= 50) {
				r.push(`throughout the day.`);
			} else if (penetrativeUse >= 14) {
				r.push(`several times a day.`);
			} else if (penetrativeUse >= 7) {
				r.push(`at least once a day.`);
			} else {
				r.push(`on occasion.`);
			}
			r.push(`You have to do all the work, unfortunately.`);
			if (!nullPC) {
				playerNeed -= ((qualitySex * 1) + (excessSex * 0.4));
			} else {
				playerNeed += ((qualitySex * 0.1) + (excessSex * 0.1));
			}
			slaveNeed -= ((qualitySex * penetrativePleasure) + (excessSex * penetrativePleasure * 0.5));
		}
		seX(slave, "penetrative", V.PC, "oral", penetrativeUse);
		if (V.policies.sexualOpenness === 0) {
			r.push(`Rumors spread that you <span class="warning">enjoy taking it from slaves.</span>`);
			V.PC.degeneracy += 2;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function playerFuckAmountDescription(slave) {
		if (excessSex > 0) {
			r.push(`You choose to fuck ${him}`);
		} else {
			r.push(`You have the sexual energy to fuck ${him}`);
		}
		if (acts >= 200) {
			r.push(`constantly; non-stop`);
			slave.devotion += 3;
			slave.trust += 1;
		} else if (acts >= 100) {
			r.push(`about once an hour; the seemingly endless`);
			slave.devotion += 3;
			slave.trust += 1;
		} else if (acts >= 50) {
			r.push(`throughout the day; constant,`);
			slave.devotion += 3;
			slave.trust += 1;
		} else if (acts >= 14) {
			r.push(`several times a day; frequent,`);
			slave.devotion += 3;
			slave.trust += 1;
		} else if (acts >= 7) {
			r.push(`several times a day; regular,`);
			slave.devotion += 2;
			slave.trust += 1;
		} else {
			r.push(`on occasion;`);
			slave.devotion += 1;
			slave.trust += 1;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function useAllHoles(slave) {
		let showExcessReport = false;
		let oralUseQuality = 1;
		let analUseQuality = 1;
		let vaginalUseQuality = 1;
		let mammaryUseQuality = 1;
		let sumQuality = 0;
		let oralUseExcess = 0;
		let analUseExcess = 0;
		let vaginalUseExcess = 0;
		let mammaryUseExcess = 0;

		const totalActs = libidoToActs;
		if (totalActs > 200) {
			acts = random(totalActs, totalActs + 35);
		} else if (totalActs > 100) {
			acts = random(totalActs, totalActs + 30);
		} else if (totalActs > 50) {
			acts = random(totalActs, totalActs + 15);
		} else if (totalActs > 25) {
			acts = random(totalActs, totalActs + 8);
		} else if (totalActs > 10) {
			acts = random(totalActs, totalActs + 5);
		} else if (totalActs > 5) {
			acts = random(totalActs, totalActs + 3);
		} else {
			acts = random(totalActs, totalActs + 2);
		}
		if (PlayerAggroSperm && V.PC.dick !== 0) {
			acts = Math.round(acts / 2);
		} else {
			acts = Math.round(acts);
		}

		determineSexActQualities(slave);
		determineTotalSexActCounts(slave);

		/**
		 * @param {App.Entity.SlaveState} slave
		 */
		function determineSexActQualities(slave) {
			if (canDoVaginal(slave) && slave.vagina > 0) {
				vaginalQuality = evaluateSexQuality(slave, "vaginal");
				vaginalPleasure = evaluateSlavePleasure(slave, "vaginal");
			}
			if (canDoAnal(slave) && slave.anus > 0) {
				analQuality = evaluateSexQuality(slave, "anal");
				analPleasure = evaluateSlavePleasure(slave, "anal");
			}
			oralQuality = evaluateSexQuality(slave, "oral");
			oralPleasure = evaluateSlavePleasure(slave, "oral");
			mammaryQuality = evaluateSexQuality(slave, "mammary");
			mammaryPleasure = evaluateSlavePleasure(slave, "mammary");
			if (slave.lactation > 0) {
				mammaryPleasure += 1;
			}
			if (slave.boobsImplant / (slave.boobs - slave.boobsMilk) >= 0.90) {
				mammaryPleasure -= 0.3;
			} else if (slave.boobsImplant / (slave.boobs - slave.boobsMilk) >= 0.75) {
				mammaryPleasure -= 0.2;
			}
			if (slave.nipples === NippleShape.HUGE || slave.nipples === NippleShape.FUCKABLE) { // || slave.nipples === NippleShape.DICKNIPS
				mammaryPleasure += 0.7;
			} else if (slave.nipples === NippleShape.PUFFY || slave.nipples === NippleShape.INVERTED || slave.nipples === NippleShape.PARTIAL) {
				mammaryPleasure += 0.4;
			} else if (slave.nipples === NippleShape.CUTE) {
				mammaryPleasure += 0.2;
			} else if (slave.nipples === NippleShape.TINY) {
				mammaryPleasure += 0.1;
			}
		}

		/** This function MUST come after all sex act counts are finalized!
		 * @param {App.Entity.SlaveState} slave
		 */
		function determineIndividualSexActCounts(slave) {
			const oralWeight = 1 + Math.max(V.oralUseWeight - 5, 0) + Math.trunc(oralQuality);
			let analWeight = 0;
			if (canDoAnal(slave) && slave.anus > 0) {
				analWeight = 1 + Math.max(V.analUseWeight - 5, 0) + Math.trunc(analQuality);
			}
			let vaginalWeight = 0;
			if (canDoVaginal(slave) && slave.vagina > 0) {
				vaginalWeight = 1 + Math.max(V.vaginalUseWeight - 5, 0) + Math.trunc(vaginalQuality);
			}
			const mammaryWeight = random(0, V.mammaryUseWeight) + Math.trunc(mammaryQuality);

			const demand = oralWeight + analWeight + vaginalWeight + mammaryWeight;
			oralUse = Math.trunc((oralWeight / demand) * acts);
			analUse = Math.trunc((analWeight / demand) * acts);
			vaginalUse = Math.trunc((vaginalWeight / demand) * acts);
			mammaryUse = Math.trunc((mammaryWeight / demand) * acts);
			// make certain that there are no rounding issues
			if (oralUse + analUse + vaginalUse + mammaryUse < acts) {
				oralUse += acts - (oralUse + analUse + vaginalUse + mammaryUse);
			}

			oralUseQuality = Math.trunc((oralWeight / demand) * qualitySex);
			analUseQuality = Math.trunc((analWeight / demand) * qualitySex);
			vaginalUseQuality = Math.trunc((vaginalWeight / demand) * qualitySex);
			mammaryUseQuality = Math.trunc((mammaryWeight / demand) * qualitySex);
			oralUseExcess = Math.trunc((oralWeight / demand) * excessSex);
			analUseExcess = Math.trunc((analWeight / demand) * excessSex);
			vaginalUseExcess = Math.trunc((vaginalWeight / demand) * excessSex);
			mammaryUseExcess = Math.trunc((mammaryWeight / demand) * excessSex);
			// make certain that there are no rounding issues
			if (oralUse !== oralUseQuality + oralUseExcess) {
				oralUseQuality += oralUse - (oralUseQuality + oralUseExcess);
			}
			if (analUse !== analUseQuality + analUseExcess) {
				analUseQuality += analUse - (analUseQuality + analUseExcess);
			}
			if (vaginalUse !== vaginalUseQuality + vaginalUseExcess) {
				vaginalUseQuality += vaginalUse - (vaginalUseQuality + vaginalUseExcess);
			}
			if (mammaryUse !== mammaryUseQuality + mammaryUseExcess) {
				mammaryUseQuality += mammaryUse - (mammaryUseQuality + mammaryUseExcess);
			}
			sumQuality = (oralUseQuality * oralQuality) + (analUseQuality * analQuality) + (vaginalUseQuality * vaginalQuality) + (mammaryUseQuality * mammaryQuality);
		}

		function cullExcessSexWhenSatisfied() {
			if (excessSex > 0) {
				if (qualitySex * sumQuality >= energyPerSlave) {
					acts = acts - excessSex;
					oralUse = oralUse - oralUseExcess;
					analUse = analUse - analUseExcess;
					vaginalUse = vaginalUse - vaginalUseExcess;
					mammaryUse = mammaryUse - mammaryUseExcess;
					excessSex = 0;
					oralUseExcess = 0;
					analUseExcess = 0;
					vaginalUseExcess = 0;
					mammaryUseExcess = 0;
				}
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 */
		function determineTotalSexActCounts(slave) {
			if (isHorny(slave)) { // unless she is also a sex maniac
				qualitySex = acts;
			} else {
				qualitySex = baseQualitySexActs;
				qualitySex *= (100 + slave.muscles) / 100;
				if (slave.assignment === Job.FUCKTOY) {
					qualitySex = Math.ceil(qualitySex * restEffects(slave, 11));
				} else {
					qualitySex = Math.ceil(qualitySex * healthPenalty(slave));
				}
			}
			if (slave.fuckdoll > 0) {
				qualitySex = acts;
				determineIndividualSexActCounts(slave);
			} else if (slave.fetish === Fetish.MINDBROKEN) {
				qualitySex = 1;
				determineIndividualSexActCounts(slave);
			} else if (slave.anus === 0 && slave.vagina === 0) {
				if (slave.assignment !== Job.CONCUBINE && slave.assignment !== Job.HEADGIRL) {
					excessSex = acts - qualitySex;
				}
				if (excessSex > 0) { // observe this!
					showExcessReport = true;
				}
				qualitySex += 15;
				if (slave.assignment === Job.CONCUBINE) {
					qualitySex += 6;
				} else if (slave.assignment === Job.MASTERSUITE) {
					qualitySex += 3;
				}
				if (FutureSocieties.isActive('FSSlaveProfessionalism') && slave.devotion > 20 && slave.energy < 40 && slave.skill.penetrative > 60) {
					qualitySex += 20;
				}
				excessSex = acts - qualitySex;
				if (slave.assignment === Job.CONCUBINE || slave.assignment === Job.HEADGIRL) {
					if (excessSex > 0) {
						excessSex = 0;
					}
					acts = qualitySex;
				} else if (slave.assignment === Job.MASTERSUITE) {
					if (excessSex >= excessSexLimit) {
						acts = qualitySex + excessSexLimit -1;
					}
				}
				determineIndividualSexActCounts(slave);
				cullExcessSexWhenSatisfied();
			} else if (slave.vagina === 0) {
				if (slave.assignment !== Job.CONCUBINE && slave.assignment !== Job.HEADGIRL) {
					excessSex = acts - qualitySex;
				}
				if (excessSex > 0) { // observe this!
					showExcessReport = true;
				}
				qualitySex += 10;
				if (slave.assignment === Job.CONCUBINE) {
					qualitySex += 6;
				} else if (slave.assignment === Job.MASTERSUITE) {
					qualitySex += 3;
				}
				if (FutureSocieties.isActive('FSSlaveProfessionalism') && slave.devotion > 20 && slave.energy < 40 && slave.skill.penetrative > 60) {
					qualitySex += 20;
				}
				excessSex = acts - qualitySex;
				if (slave.assignment === Job.CONCUBINE || slave.assignment === Job.HEADGIRL) {
					if (excessSex > 0) {
						excessSex = 0;
					}
					acts = qualitySex;
				} else if (slave.assignment === Job.MASTERSUITE) {
					if (excessSex >= excessSexLimit) {
						acts = qualitySex + excessSexLimit -1;
					}
				}
				determineIndividualSexActCounts(slave);
				cullExcessSexWhenSatisfied();
			} else if (slave.anus === 0) {
				if (slave.assignment !== Job.CONCUBINE && slave.assignment !== Job.HEADGIRL) {
					excessSex = acts - qualitySex;
				}
				if (excessSex > 0) { // observe this!
					showExcessReport = true;
				}
				qualitySex += 10;
				if (slave.assignment === Job.CONCUBINE) {
					qualitySex += 6;
				} else if (slave.assignment === Job.MASTERSUITE) {
					qualitySex += 3;
				}
				if (FutureSocieties.isActive('FSSlaveProfessionalism') && slave.devotion > 20 && slave.energy < 40) {
					if (slave.skill.vaginal + slave.skill.anal + slave.skill.oral > 60) {
						qualitySex += 20;
					}
				}
				excessSex = acts - qualitySex;
				if (slave.assignment === Job.CONCUBINE || slave.assignment === Job.HEADGIRL) {
					if (excessSex > 0) {
						excessSex = 0;
					}
					acts = qualitySex;
				} else if (slave.assignment === Job.MASTERSUITE) {
					if (excessSex >= excessSexLimit) {
						acts = qualitySex + excessSexLimit -1;
					}
				}
				determineIndividualSexActCounts(slave);
				cullExcessSexWhenSatisfied();
			} else if (!canWalk(slave)) {
				qualitySex += 5;
				if (slave.assignment === Job.CONCUBINE) {
					qualitySex += 6;
				} else if (slave.assignment === Job.MASTERSUITE) {
					qualitySex += 3;
				}
				if (FutureSocieties.isActive('FSSlaveProfessionalism') && slave.devotion > 20 && slave.energy < 40) {
					if (slave.skill.vaginal + slave.skill.anal + slave.skill.oral > 60) {
						qualitySex += 20;
					}
				}
				excessSex = acts - qualitySex;
				if (slave.assignment === Job.CONCUBINE || slave.assignment === Job.HEADGIRL) {
					if (excessSex > 0) {
						excessSex = 0;
					}
					acts = qualitySex;
				} else if (slave.assignment === Job.MASTERSUITE) {
					if (excessSex >= excessSexLimit) {
						acts = qualitySex + excessSexLimit -1;
					}
				}
				determineIndividualSexActCounts(slave);
				cullExcessSexWhenSatisfied();
			} else if (slave.devotion > 50) {
				qualitySex += 10;
				if (slave.assignment === Job.CONCUBINE) {
					qualitySex += 6;
				} else if (slave.assignment === Job.MASTERSUITE) {
					qualitySex += 3;
				}
				if (FutureSocieties.isActive('FSSlaveProfessionalism') && slave.devotion > 20 && slave.energy < 40) {
					if (slave.skill.vaginal + slave.skill.anal + slave.skill.oral > 60) {
						qualitySex += 20;
					}
				}
				excessSex = acts - qualitySex;
				if (slave.assignment === Job.CONCUBINE || slave.assignment === Job.HEADGIRL) {
					if (excessSex > 0) {
						excessSex = 0;
					}
					acts = qualitySex;
				} else if (slave.assignment === Job.MASTERSUITE) {
					if (excessSex >= excessSexLimit) {
						acts = qualitySex + excessSexLimit -1;
					}
				}
				determineIndividualSexActCounts(slave);
				cullExcessSexWhenSatisfied();
			} else if (slave.devotion > 20) {
				qualitySex += 5;
				if (slave.assignment === Job.CONCUBINE) {
					qualitySex += 6;
				} else if (slave.assignment === Job.MASTERSUITE) {
					qualitySex += 3;
				}
				if (FutureSocieties.isActive('FSSlaveProfessionalism') && slave.devotion > 20 && slave.energy < 40) {
					if (slave.skill.vaginal + slave.skill.anal + slave.skill.oral > 60) {
						qualitySex += 20;
					}
				}
				excessSex = acts - qualitySex;
				if (slave.assignment === Job.CONCUBINE || slave.assignment === Job.HEADGIRL) {
					if (excessSex > 0) {
						excessSex = 0;
					}
					acts = qualitySex;
				} else if (slave.assignment === Job.MASTERSUITE) {
					if (excessSex >= excessSexLimit) {
						acts = qualitySex + excessSexLimit -1;
					}
				}
				determineIndividualSexActCounts(slave);
				cullExcessSexWhenSatisfied();
			} else if (slave.trust < -20) {
				if (slave.assignment === Job.CONCUBINE) {
					qualitySex += 6;
				} else if (slave.assignment === Job.MASTERSUITE) {
					qualitySex += 3;
				}
				if (FutureSocieties.isActive('FSSlaveProfessionalism') && slave.devotion > 20 && slave.energy < 40) {
					if (slave.skill.vaginal + slave.skill.anal + slave.skill.oral > 60) {
						qualitySex += 20;
					}
				}
				excessSex = acts - qualitySex;
				if (slave.assignment === Job.CONCUBINE || slave.assignment === Job.HEADGIRL || slave.assignment === Job.MASTERSUITE) {
					determineIndividualSexActCounts(slave);
					cullExcessSexWhenSatisfied();
					if (slave.assignment === Job.CONCUBINE || slave.assignment === Job.HEADGIRL) {
						if (excessSex > 0) {
							excessSex = 0;
							showExcessReport = true;
						}
						acts = qualitySex;
					} else {
						if (excessSex >= excessSexLimit) {
							acts = qualitySex + excessSexLimit -1;
							showExcessReport = true;
						}
					}
				}
				determineIndividualSexActCounts(slave);
				cullExcessSexWhenSatisfied();
			} else {
				qualitySex -= 5;
				excessSex = acts - qualitySex;
				if (slave.assignment === Job.MASTERSUITE) {
					determineIndividualSexActCounts(slave);
					cullExcessSexWhenSatisfied();
					if (excessSex >= excessSexLimit) {
						acts = qualitySex + excessSexLimit -1;
						showExcessReport = true;
					}
				}
				determineIndividualSexActCounts(slave);
				cullExcessSexWhenSatisfied();
			}
		}

		if (slave.fuckdoll > 0) {
			r.push(`You keep ${him} with you all week, using ${him} as your personal sex toy. When you're not using ${him}, ${he}`);
			if (!canStand(slave)) {
				r.push(`rests`);
			} else {
				r.push(`stands`);
			}
			r.push(`nearby, waiting silently.`);
		} else if (slave.fetish === Fetish.MINDBROKEN) {
			r.push(`You keep ${him} around you all week, using ${him} as your personal sex toy and bedwarmer. You have the energy to fuck ${him}`);
			if (acts >= 200) {
				r.push(`constantly,`);
			} else if (acts >= 100) {
				r.push(`about once an hour,`);
			} else if (acts >= 50) {
				r.push(`throughout the day,`);
			} else if (acts >= 14) {
				r.push(`several times a day,`);
			} else if (acts >= 7) {
				r.push(`at least once a day,`);
			} else {
				r.push(`on occasion,`);
			}
			r.push(`though ${he} doesn't show much of a reaction to it, stifling your enjoyment.`);
		} else if (slave.anus === 0 && slave.vagina === 0) {
			r.push(`Since you haven't yet decided to sell or take ${his} virginity or ${his} tight little anus, you let ${him} please you with ${his}`);
			if (slave.nipples === NippleShape.FUCKABLE && (canPenetrate(V.PC) || V.PC.clit >= 3)) {
				r.push(`mouth and tits.`);
			} else {
				r.push(`mouth.`);
			}
			r.push(`${He} is <span class="trust inc">duly grateful</span> you let ${him} keep ${his} innocence for another `);
			if (showExcessReport && slave.sexualQuirk !== SexualFlaw.GAGFUCK) {
				r.push(`week, though ${his}`);
				if (slave.nipples === NippleShape.FUCKABLE && (canPenetrate(V.PC) || V.PC.clit >= 3)) {
					r.push(`throat and breasts get a little sore picking up the slack.`);
				} else {
					r.push(`throat gets a little sore doing the work of three holes.`);
				}
			} else {
				r.push(`week and takes it like a champ using ${his}`);
				if (slave.nipples === NippleShape.FUCKABLE && (canPenetrate(V.PC) || V.PC.clit >= 3)) {
					r.push(`throat and breasts`);
				} else {
					r.push(`throat`);
				}
				r.push(`to show you ${his} appreciation.`);
			}
			slave.trust += 1;
			if (excessSex > 0) {
				showExcessReport = true;
			} else {
				showExcessReport = false;
			}
		} else if (slave.vagina === 0) {
			r.push(`Since you haven't yet decided to sell or take ${his} virginity, you let ${him} confine ${his} efforts to ${his}`);
			if (canDoAnal(slave) && slave.nipples === NippleShape.FUCKABLE && (canPenetrate(V.PC) || V.PC.clit >= 3)) {
				r.push(`anus, nipples and mouth. ${He} is <span class="trust inc">duly grateful</span> you let ${him} keep ${his} innocence for another`);
				if (showExcessReport) {
					r.push(`week, though ${his} butt, boobs and throat get a little sore.`);
				} else {
					r.push(`week.`);
				}
			} else if (canDoAnal(slave)) {
				r.push(`anus and mouth. ${He} is <span class="trust inc">duly grateful</span> you let ${him} keep ${his} innocence for another`);
				if (showExcessReport) {
					r.push(`week, though ${his} butt and throat get a little sore.`);
				} else {
					r.push(`week.`);
				}
			} else if (slave.nipples === NippleShape.FUCKABLE && (canPenetrate(V.PC) || V.PC.clit >= 3)) {
				r.push(`nipples and mouth. ${He} is <span class="trust inc">duly grateful</span> you let ${him} keep ${his} innocence for another`);
				if (showExcessReport && slave.sexualQuirk !== SexualFlaw.GAGFUCK) {
					r.push(`week, though ${his} boobs and throat get a little sore.`);
				} else {
					r.push(`week.`);
				}
			} else {
				r.push(`mouth. ${He} is <span class="trust inc">duly grateful</span> you ${his} keep let ${him} innocence for another`);
				if (showExcessReport && slave.sexualQuirk !== SexualFlaw.GAGFUCK) {
					r.push(`week, though ${his} throat gets a little sore.`);
				} else {
					r.push(`week.`);
				}
			}
			slave.trust += 1;
			if (excessSex > 0) {
				showExcessReport = true;
			} else {
				showExcessReport = false;
			}
		} else if (slave.anus === 0) {
			r.push(`Since you haven't yet decided to sell or take ${his} tight little anus, you let ${him} confine ${his} efforts to ${his}`);
			if (canDoVaginal(slave) && slave.nipples === NippleShape.FUCKABLE && (canPenetrate(V.PC) || V.PC.clit >= 3)) {
				r.push(`pussy, nipples and mouth. ${He} is <span class="trust inc">duly grateful</span> you let ${him} put off taking it up the butt another`);
				if (showExcessReport && slave.sexualQuirk !== SexualFlaw.GAGFUCK) {
					r.push(`week, though ${his} boobs and throat get a little sore.`);
				} else {
					r.push(`week.`);
				}
			} else if (canDoVaginal(slave)) {
				r.push(`pussy and mouth. ${He} is <span class="trust inc">duly grateful</span> you let ${him} put off taking it up the butt another`);
				if (showExcessReport && slave.sexualQuirk !== SexualFlaw.GAGFUCK) {
					r.push(`week, though ${his} throat gets a little sore.`);
				} else {
					r.push(`week.`);
				}
			} else if (slave.nipples === NippleShape.FUCKABLE && (canPenetrate(V.PC) || V.PC.clit >= 3)) {
				r.push(`nipples and mouth. ${He} is <span class="trust inc">duly grateful</span> you let ${him} put off taking it up the butt another`);
				if (showExcessReport && slave.sexualQuirk !== SexualFlaw.GAGFUCK) {
					r.push(`week, though ${his} boobs and throat get a little sore.`);
				} else {
					r.push(`week.`);
				}
			} else {
				r.push(`mouth. ${He} is <span class="trust inc">duly grateful</span> you let ${him} put off taking it up the butt another`);
				if (showExcessReport && slave.sexualQuirk !== SexualFlaw.GAGFUCK) {
					r.push(`week, though ${his} throat gets a little sore.`);
				} else {
					r.push(`week.`);
				}
			}
			slave.trust += 1;
			if (excessSex > 0) {
				showExcessReport = true;
			} else {
				showExcessReport = false;
			}
		} else if (!canWalk(slave)) {
			r.push(`You keep ${him} around you all week, using ${him} as your personal sex toy and bedwarmer.`);
			if (isAmputee(slave)) {
				r.push(`Without arms and legs,`);
			} else if (!hasAnyLegs(slave)) {
				r.push(`Without legs,`);
			} else if (!hasBothLegs(slave)) {
				r.push(`With just one leg,`);
			} else if (!isQuadrupedal(slave) && hasAnyQuadrupedLegs(slave)) {
				r.push(`With ${his} mismatched limbs,`);
			} else if (tooFatSlave(slave)) {
				r.push(`Immobilized by ${his} own weight,`);
			} else if (!canMove(slave)) {
				r.push(`Immobilized by ${his} own swollen body,`);
			} else if (tooBigBreasts(slave)) {
				r.push(`Restricted by ${his} own tits,`);
			} else if (tooBigBelly(slave)) {
				r.push(`Restricted by ${his} own swollen orb of a midsection,`);
			} else if (tooBigBalls(slave)) {
				r.push(`Restricted by ${his} own oversized testicles,`);
			} else if (tooBigDick(slave)) {
				r.push(`Restricted by ${his} own oversized cock,`);
			} else if (tooBigButt(slave)) {
				r.push(`Restricted by ${his} own massive ass,`);
			} else {
				r.push(`With ${his} clipped heels,`);
			}
			r.push(`${he} is your <span class="devotion inc">helpless sexual appliance</span> and is <span class="trust inc">forced to trust you.</span>`);
			slave.trust += 4;
			slave.devotion += 4;
			if (excessSex > 0) {
				showExcessReport = true;
			}
		} else if (slave.devotion > 50) {
			r.push(`${He} devotedly accompanies you all week, keeping ${his}`);
			if (canDoAnal(slave) && canDoVaginal(slave)) {
				r.push(`mouth,`);
				if ((canPenetrate(V.PC) || V.PC.clit >= 3) && slave.nipples === NippleShape.FUCKABLE) {
					r.push(`vagina, nipples`);
				} else {
					r.push(`vagina`);
				}
				r.push(`and asshole`);
			} else if (!canDoVaginal(slave) && canDoAnal(slave)) {
				if ((canPenetrate(V.PC) || V.PC.clit >= 3) && slave.nipples === NippleShape.FUCKABLE) {
					r.push(`mouth, nipples`);
				} else {
					r.push(`mouth`);
				}
				r.push(`and`);
				if (slave.chastityVagina > 0) {
					r.push(r.pop() + ",");
					r.push(`since ${his} pussy is covered by ${his} chastity belt,`);
				}
				r.push(`asshole`);
			} else if (canDoVaginal(slave) && !canDoAnal(slave)) {
				if ((canPenetrate(V.PC) || V.PC.clit >= 3) && slave.nipples === NippleShape.FUCKABLE) {
					r.push(`mouth, nipples`);
				} else {
					r.push(`mouth`);
				}
				r.push(`and vagina`);
			} else {
				r.push(`mouth`);
				if ((canPenetrate(V.PC) || V.PC.clit >= 3) && slave.nipples === NippleShape.FUCKABLE) {
					r.push(`and nipples`);
				}
			}
			r.push(`available for you at all times.`);
			if (canAchieveErection(slave) && !slave.chastityPenis) {
				r.push(`Every time ${his} beloved ${getWrittenTitle(slave)} fucks ${him}, ${he} gets a hard-on.`);
			} else if (slave.dick !== 0 && slave.prostate > 0 && canDoVaginal(slave)) {
				r.push(`${He} doesn't get a hard-on as you use ${him}, but ${he} comes from the prostate stimulation when ${his} beloved ${getWrittenTitle(slave)} uses ${his} pussy.`);
			} else if (slave.dick !== 0 && slave.prostate > 0 && canDoAnal(slave)) {
				r.push(`${He} doesn't get a hard-on as you use ${him}, but ${he} comes from the prostate stimulation when ${his} beloved ${getWrittenTitle(slave)} uses ${his} butt.`);
			} else {
				r.push(`${He} comes indecently hard whenever ${his} beloved ${getWrittenTitle(slave)} uses ${his} body.`);
			}
			playerFuckAmountDescription(slave);
			r.push(`loving sex with you draws ${him} <span class="devotion inc">closer to you</span> and encourages ${him} to <span class="trust inc">trust you.</span>`);
			if (excessSex > 0) {
				showExcessReport = true;
			}
		} else if (slave.devotion > 20) {
			r.push(`Whenever you feel the need, you use whichever of ${his} available holes that appears most appealing at the moment, since ${he}'s up for anything.`);
			if (slave.dick !== 0 && canAchieveErection(slave) && !slave.chastityPenis) {
				r.push(`By the end of the week ${he} gets a hard-on when you use ${him}.`);
			}
			playerFuckAmountDescription(slave);
			r.push(`enjoyable sex with you draws ${him} <span class="devotion inc">closer to you</span> and encourages ${him} to <span class="trust inc">trust you.</span>`);
			if (excessSex > 0) {
				showExcessReport = true;
			}
		} else if (slave.trust < -20) {
			r.push(`${He} is afraid of you and does ${his} best to offer you ${his}`);
			if (canDoAnal(slave) && canDoVaginal(slave)) {
				r.push(`mouth,`);
				if ((canPenetrate(V.PC) || V.PC.clit >= 3) && slave.nipples === NippleShape.FUCKABLE) {
					r.push(`vagina, nipples`);
				} else {
					r.push(`vagina`);
				}
				r.push(`and asshole`);
			} else if (slave.vagina === -1 && canDoAnal(slave)) {
				if ((canPenetrate(V.PC) || V.PC.clit >= 3) && slave.nipples === NippleShape.FUCKABLE) {
					r.push(`mouth, nipples`);
				} else {
					r.push(`mouth`);
				}
				r.push(`and asshole`);
			} else if (slave.vagina > -1 && !canDoVaginal(slave) && canDoAnal(slave)) {
				if ((canPenetrate(V.PC) || V.PC.clit >= 3) && slave.nipples === NippleShape.FUCKABLE) {
					r.push(`mouth, nipples`);
				} else {
					r.push(`mouth`);
				}
				r.push(`and, since ${his} pussy is covered by ${his} chastity belt, asshole`);
			} else {
				r.push(`mouth`);
				if ((canPenetrate(V.PC) || V.PC.clit >= 3) && slave.nipples === NippleShape.FUCKABLE) {
					r.push(`and nipples`);
				}
			}
			r.push(`to save ${himself} from worse treatment than mere rape.`);
			if (slave.dick !== 0 && canAchieveErection(slave) && !slave.chastityPenis) {
				r.push(`By the end of the week ${he} gets a hard-on when you use ${him}.`);
			}
			if (slave.assignment === Job.CONCUBINE || slave.assignment === Job.HEADGIRL) {
				if (showExcessReport) {
					r.push(`You choose to fuck ${him}`);
				} else {
					r.push(`You have the sexual energy to fuck ${him}`);
				}
			} else if (slave.assignment === Job.MASTERSUITE) {
				if (showExcessReport) {
					r.push(`You choose to fuck ${him}`);
				} else {
					r.push(`You have the sexual energy to fuck ${him}`);
				}
			} else {
				r.push(`You have the sexual energy to fuck ${him}`);
			}
			if (acts >= 200) {
				r.push(`constantly; submitting to your endless`);
				slave.devotion += 6;
			} else if (acts >= 100) {
				r.push(`about once an hour; submitting to your seemingly endless`);
				slave.devotion += 5;
			} else if (acts >= 50) {
				r.push(`throughout the day; submitting to your constant`);
				slave.devotion += 4;
			} else if (acts >= 14) {
				r.push(`several times a day; submitting to your frequent`);
				slave.devotion += 3;
			} else if (acts >= 7) {
				r.push(`at least once a day; submitting to your regular`);
				slave.devotion += 2;
			} else {
				r.push(`on occasion; submitting to your`);
				slave.devotion += 1;
			}
			r.push(`use <span class="devotion inc">habituates ${him}</span> to being your sex slave.`);
			if (excessSex > 0) {
				showExcessReport = true;
			} else {
				showExcessReport = false;
			}
		} else {
			r.push(`Whenever you feel the need, you grab ${him} and use whichever of ${his} available holes that appears most appealing at the moment.`);
			if (slave.dick !== 0 && canAchieveErection(slave)) {
				r.push(`${His} dick stays limp as you rape ${him}.`);
			}
			if (slave.assignment === Job.MASTERSUITE) {
				if (showExcessReport) {
					r.push(`You choose to fuck ${him}`);
				} else {
					r.push(`You have the sexual energy to fuck ${him}`);
				}
			} else {
				r.push(`You have the sexual energy to fuck ${him}`);
			}
			if (acts >= 200) {
				r.push(`constantly; the eternal`);
				slave.devotion -= 15;
				slave.trust -= 30;
			} else if (acts >= 100) {
				r.push(`about once an hour; the unending`);
				slave.devotion -= 10;
				slave.trust -= 20;
			} else if (acts >= 50) {
				r.push(`throughout the day; the constant`);
				slave.devotion -= 7;
				slave.trust -= 15;
			} else if (acts >= 14) {
				r.push(`several times a day; the frequent`);
				slave.devotion -= 5;
				slave.trust -= 15;
			} else if (acts >= 7) {
				r.push(`at least once a day; the regular`);
				slave.devotion -= 3;
				slave.trust -= 9;
			} else {
				r.push(`on occasion; the threat of`);
				slave.devotion -= 3;
				slave.trust -= 3;
			}
			r.push(`rape fills ${him} with <span class="devotion dec">revulsion</span> and <span class="trust dec">fear.</span>`);
			showExcessReport = false;
		}

		if (showExcessReport && excessSex >= excessSexLimit) {
			if (slave.sexualFlaw !== SexualFlaw.SELFHATING && slave.sexualFlaw !== SexualFlaw.NEGLECT) {
				if (slave.devotion > 50) {
					r.push(`However, you were sexually too much for ${him}, and once ${he} fell behind, the veneer of passion was quickly <span class="trust dec">shattered</span> by the reminder that ${his} whole point of being is to satisfy your carnal needs <span class="devotion dec">regardless of ${his} enjoyment.</span>`);
					slave.devotion -= 3;
					slave.trust -= 5;
				} else if (slave.devotion > 20) {
					r.push(`However, you are sexually too much for ${him}, and once ${he} falls behind, ${he} is quickly reminded that ${he} is <span class="trust dec">nothing more than a fucktoy.</span>`);
					slave.trust -= 3;
				} else if (slave.trust < -20) {
					r.push(`However, you are sexually too much for ${him}, and once ${he} falls behind, ${he} is quickly reminded that you will <span class="devotion dec">rape ${him} for your amusement</span> <span class="trust dec">no matter the emotional consequences.</span>`);
					slave.devotion -= 5;
					slave.trust -= 5;
				}
			}
		}

		if (slave.fuckdoll === 0) {
			if (qualitySex >= acts || slave.fetish === Fetish.MINDBROKEN) {
				if (!nullPC || slave.sexualFlaw === SexualFlaw.CUMADDICT) {
					playerNeed -= (oralUse * oralQuality);
				} else { // No release due to null, so builds arousal.
					playerNeed += (oralUse * oralQuality * 0.05);
				}
				playerNeed -= (vaginalUse * vaginalQuality);
				playerNeed -= (analUse * analQuality);
				if (V.PC.dick !== 0 || V.PC.clit >= 3) {
					playerNeed -= mammaryUse * (mammaryQuality + 0.2);
				} else if (!nullPC) {
					playerNeed -= mammaryUse * 0.5;
				} else {
					playerNeed += (mammaryUse * 0.05);
				}
				slaveNeed -= (oralUse * oralPleasure);
				slaveNeed -= (vaginalUse * (5 * vaginalPleasure));
				slaveNeed -= (analUse * (5 * analPleasure));
				slaveNeed -= (mammaryUse * mammaryPleasure);
			} else {
				slaveNeed -= (oralUseQuality * oralPleasure);
				slaveNeed -= (vaginalUseQuality * (5 * vaginalPleasure));
				slaveNeed -= (analUseQuality * (5 * analPleasure));
				slaveNeed -= (mammaryUseQuality * mammaryPleasure);
				if (!nullPC || slave.sexualFlaw === SexualFlaw.CUMADDICT) {
					playerNeed -= (oralUseQuality * oralQuality);
				} else { // No release due to null, so builds arousal.
					playerNeed += (oralUseQuality * oralQuality * 0.05);
				}
				playerNeed -= (vaginalUseQuality * vaginalQuality);
				playerNeed -= (analUseQuality * analQuality);
				if (V.PC.dick !== 0 || V.PC.clit >= 3) {
					playerNeed -= mammaryUseQuality * (mammaryQuality + 0.2);
				} else if (!nullPC) {
					playerNeed -= mammaryUseQuality * 0.5;
				} else {
					playerNeed += mammaryUseQuality * 0.05;
				}
				if (slave.sexualFlaw === SexualFlaw.SELFHATING || slave.sexualFlaw === SexualFlaw.NEGLECT) {
					if (nullPC) {
						playerNeed -= (oralUseExcess * .05);
					} else {
						playerNeed -= oralUseExcess;
					}
					if (nullPC || PCNoTool) {
						playerNeed -= (vaginalUseExcess * .1);
						playerNeed -= (analUseExcess * .1);
					} else {
						playerNeed -= vaginalUseExcess;
						playerNeed -= analUseExcess;
					}
					if (V.PC.dick !== 0 || V.PC.clit >= 3) {
						playerNeed -= mammaryUseExcess * (mammaryQuality + 0.2);
					} else {
						playerNeed += (mammaryUseExcess * 0.05);
					}
					slave.need = 0;
				} else {
					slaveNeed -= (vaginalUseExcess * .5);
					slaveNeed -= (analUseExcess * .5);
					if (nullPC) {
						playerNeed -= (oralUseExcess * .05);
					} else {
						playerNeed -= (oralUseExcess * .1);
					}
					if (nullPC || PCNoTool) {
						playerNeed -= (vaginalUseExcess * .1);
						playerNeed -= (analUseExcess * .1);
					} else {
						playerNeed -= (vaginalUseExcess * .5);
						playerNeed -= (analUseExcess * .5);
					}
					if (V.PC.dick !== 0 || V.PC.clit >= 3) {
						playerNeed -= mammaryUseExcess * mammaryQuality;
					} else {
						playerNeed += (mammaryUseExcess * 0.05);
					}
				}
			}
			if (slave.fetish !== Fetish.MINDBROKEN && qualitySex > 0) {
				if (slave.skill.oral < 100 && !nullPC) {
					r.push(`After a lot of time spent with`);
					if (V.PC.dick !== 0) {
						r.push(`your dick in ${his} mouth,`);
					} else {
						r.push(`${his} mouth on your cunt,`);
					}
					r.push(`${his} <span class="skill inc">oral skill improves.</span>`);
					r.push(slaveSkillIncrease('oral', slave, trainingEfficiency));
				} else if (slave.skill.vaginal < 100 && slave.vagina > 0 && canDoVaginal(slave)) {
					r.push(`After a lot of time spent getting fucked, ${his} <span class="skill inc">vaginal skill improves.</span>`);
					r.push(slaveSkillIncrease('vaginal', slave, trainingEfficiency));
				} else if (slave.skill.anal < 100 && slave.anus !== 0 && canDoAnal(slave)) {
					r.push(`After a lot of time spent taking it up the ass, ${his} <span class="skill inc">anal skill improves.</span>`);
					r.push(slaveSkillIncrease('anal', slave, trainingEfficiency));
				}
			}
		} else {
			if (!nullPC) {
				playerNeed -= (oralUse * oralQuality);
			} else { // No release due to null, so builds arousal.
				playerNeed += (oralUse * oralQuality * 0.05);
			}
			slaveNeed -= oralUse;
			if (vaginalUse > 0) {
				if (nullPC || PCNoTool) {
					playerNeed -= (vaginalUse * .2);
				} else {
					playerNeed -= vaginalUse;
				}
				slaveNeed -= (vaginalUse * vaginalPleasure);
			}
			if (analUse > 0) {
				if (nullPC || PCNoTool) {
					playerNeed -= (analUse * .2);
				} else {
					playerNeed -= analUse;
				}
				slaveNeed -= (analUse * analPleasure);
			}
			if (mammaryUse > 0) {
				if (V.PC.dick !== 0 || V.PC.clit >= 3) {
					playerNeed -= mammaryUse * (mammaryQuality + 0.2);
				} else {
					playerNeed += (mammaryUse * 0.05);
				}
				slaveNeed -= (mammaryUse * mammaryPleasure);
			}
		}

		if (PlayerAggroSperm) {
			if (V.PC.dick === 0) {
				tryKnockMeUp(V.PC, (.1 * acts) - 50, 2, V.PC);
			}
		}
		if (V.PC.dick !== 0 && canPenetrate(V.PC)) {
			if (vaginalUse > 0) {
				tryKnockMeUp(slave, vaginalUse, 0, V.PC);
			}
			if (analUse > 0) {
				tryKnockMeUp(slave, analUse, 1, V.PC);
			}
		}

		if (slave.lactation > 0 && mammaryUse > 0) {
			slave.lactationDuration = 2;
			if (slave.boobsMilk > 0) {
				slave.boobs -= slave.boobsMilk;
				slave.boobsMilk = 0;
			}
		}

		seX(slave, "vaginal", V.PC, "penetrative", vaginalUse);
		seX(slave, "anal", V.PC, "penetrative", analUse);
		if (V.PC.dick > 0) {
			seX(slave, "oral", V.PC, "penetrative", oralUse);
		} else if (V.PC.vagina >= 0) {
			seX(slave, "oral", V.PC, "vaginal", oralUse);
		} else if (hasAnyFluids && slave.sexualFlaw === SexualFlaw.CUMADDICT) {
			seX(slave, "oral", V.PC, "penetrative", oralUse); // should be something else other than penetrative
		} else if (slave.fetish === Fetish.CUMSLUT) {
			seX(slave, "oral", V.PC, "oral", oralUse);
		}
		seX(slave, "mammary", V.PC, "penetrative", mammaryUse);

		if (V.debugMode) {
			r.push(`Expected .need delta: ${-energyPerSlave}. Actual .need delta: ${-(initialNeed - V.PC.deferredNeed - playerNeed)}.`);
			r.push(`Slave .need reduction: ${slaveNeed * globalNeedMult}.`);
			r.push(`Total acts: ${acts}. Quality Acts: ${qualitySex}. Excess acts: ${excessSex}.`);
			r.push(`Vaginal: U—${vaginalUse} UQ—${vaginalUseQuality} UE—${vaginalUseExcess} Q—${vaginalQuality} P—${vaginalPleasure}.`);
			r.push(`Anal: U—${analUse} UQ—${analUseQuality} UE—${analUseExcess} Q—${analQuality} P—${analPleasure}.`);
			r.push(`Oral: U—${oralUse} UQ—${oralUseQuality} UE—${oralUseExcess} Q—${oralQuality} P—${oralPleasure}.`);
			r.push(`Boob: U—${mammaryUse} UQ—${mammaryUseQuality} UE—${mammaryUseExcess} Q—${mammaryQuality} P—${mammaryPleasure}.`);
			r.push(`Total .need: ${V.PC.need}. Current total .need to be removed: ${-V.PC.deferredNeed + playerNeed}.`);
		}
	}

	/**
	 * @param {FC.ReportSlave} slave
	 *
	 */
	function cleanupSlaveNeed(slave) {
		if (slave.geneMods.aggressiveSperm === 1 && slave.balls > 0 && slave.vasectomy !== 1 && isVirile(slave)) {
			slaveNeed *= 2.1;
		}
		slave.need += slaveNeed * globalNeedMult;
	}

	/**
	 * @param {FC.ReportSlave} slave
	 *
	 */
	function physicalEffects(slave) {
		if (slave.health.illness > 0 || slave.health.tired > 60) {
			r.push(`${He} is<span class="health dec">`);
			if (slave.health.tired > 60) {
				if (slave.health.illness === 1) {
					r.push(`feeling under the weather and`);
				} else if (slave.health.illness === 2) {
					r.push(`somewhat ill and`);
				} else if (slave.health.illness === 3) {
					r.push(`sick and`);
				} else if (slave.health.illness === 4) {
					r.push(`very sick and`);
				} else if (slave.health.illness === 5) {
					r.push(`terribly ill and`);
				}
			} else {
				if (slave.health.illness === 1) {
					r.push(`feeling under the weather,`);
				} else if (slave.health.illness === 2) {
					r.push(`somewhat ill,`);
				} else if (slave.health.illness === 3) {
					r.push(`sick,`);
				} else if (slave.health.illness === 4) {
					r.push(`very sick,`);
				} else if (slave.health.illness === 5) {
					r.push(`terribly ill,`);
				}
			}
			if (slave.health.tired > 90) {
				r.push(`exhausted,`);
			} else if (slave.health.tired > 60) {
				r.push(`fatigued,`);
			}
			if (!canFuck) {
				r.push(`</span> though the fact that ${his} job isn't very strenuous helps.`);
			} else {
				if (slave.health.illness !== 0) {
					r.push(`</span> making ${him} rather unappealing to use.`);
				} else {
					r.push(`</span> making ${him} less enjoyable to fuck.`);
				}
			}
		}
		if (slave.health.condition < 0 && random(1, 100) > 50) {
			r.push(`Under your personal supervision, <span class="health inc">${his} health improves.</span>`);
			improveCondition(slave, 10);
		}
		if (slave.assignment === Job.MASTERSUITE) {
			if (!canFuck) {
				r.push(`You don't ask a lot of ${him} other than to look good and join you in bed at night, so ${he} is always well rested.`);
			} else {
				r.push(`${He} has plenty of time to rest during the day to recover from your physically demanding visits, even though ${he} sometimes has to work long nights.`);
			}
			tired(slave);
		} else if (slave.assignment === Job.FUCKTOY) {
			if (slaveResting(slave)) {
				r.push(`${He} spends reduced hours serving you in order to <span class="health inc">offset ${his} lack of rest.</span>`);
			} else if (slave.health.tired + 11 >= 90 && !willWorkToDeath(slave)) {
				r.push(`${He} attempts to`);
				if (!canFuck) {
					r.push(`refuse your requests due to ${his} exhaustion, and is <span class="trust dec">rightfully punished</span> for ${his} disobedience. When you do get ${him} to comply, the entertainment, if it can even be called such, <span class="devotion dec">lacks any effort at all,</span> making it`);
				} else {
					r.push(`rebuke your advances due to ${his} exhaustion, but can do little to avoid them or the resulting <span class="trust dec">severe punishment.</span> It still feels like <span class="devotion dec">fucking a dead fish,</span> since it's`);
				}
				r.push(`obvious that ${he} has chosen ${his} overall well-being over angering you.`);
				slave.devotion -= 10;
				slave.trust -= 5;
			} else {
				r.push(`${He} spends a considerable portion of ${his} shift`);
				if (!canFuck) {
					if (slave.devotion > 20) {
						r.push(`by your side, so even after your most demanding requests, ${he}'s ready for more.`);
					} else {
						r.push(`uncomfortably by your side. You don't ask much of ${him}, so it's rather annoying that ${he} <span class="health dec">wears ${himself} out</span> over nothing.`);
					}
				} else {
					if (hasAnyLegs(slave)) {
						r.push(`off ${his} feet,`);
					} else {
						r.push(`lying down,`);
					}
					if (slave.devotion > 20) {
						r.push(`so despite ending ${his} days out of breath and soaked with sweat, ${he} doesn't find ${himself} that tired in the morning.`);
					} else {
						r.push(`but just doesn't understand that <span class="health dec">${he}'d be less tired</span> if ${he} simply gave you what you want.`);
					}
				}
			}
			tired(slave);
		}
		if (excessSex > 0) {
			if (excessSex >= excessSexLimit && slave.toyHole !== ToyHole.DICK) {
				r.push(`Oversexing ${him} <span class="health dec">leaves a lasting fatigue on ${his} body;</span>`);
				slave.health.tired += excessSex;
				r.push(`it <span class="health dec">isn't great for ${his} health,</span> either.`);
				healthDamage(slave, 1 + excessSex - excessSexLimit);
				if (slave.energy > 0) {
					r.push(`Such excessive stimulation causes <span class="libido dec">lasting damage to ${his} libido.</span>`);
					slave.energy = Math.clamp(slave.energy - (1 + excessSex - excessSexLimit), 0, 100);
				}
			} else {
				if (slave.energy <= 95) {
					r.push(`The excess sexual stimulation helps <span class="libido inc">train ${his} libido</span> to better handle you.`);
					slave.energy += 2;
					if (slave.energy > 95) {
						slave.energy = 100;
					}
				}
			}
		}
		if (V.seeStretching === 1) {
			if (V.PC.dick > 0 && canPenetrate(V.PC)) {
				// maybe raise chance?
				if (slave.vagina < 3 && relativeDickSize(slave, V.PC, "vagina") > 0) {
					if (random(1, 100) > ((110 - vaginalUse) + (slave.vagina * 10) + (slave.skill.vaginal / 3))) {
						r.push(`Getting stuffed by your big cock so often <span class="change negative">stretches out ${his} pussy;</span>`);
						slave.vagina += 1;
						if (relativeDickSize(slave, V.PC, "vaginal") > 0) {
							r.push(`you're so huge that ${he}'s still feels tight around your dick.`);
						} else {
							r.push(`you'll miss ${his} tightness hugging your dick.`);
						}
					}
				}
				if (slave.anus < 3 && relativeDickSize(slave, V.PC, "anus") > 0) {
					if (random(1, 100) > ((110 - analUse) + (slave.anus * 10) + (slave.skill.anal / 3))) {
						r.push(`Having ${his} sphincter spread wide by your penis so much <span class="change negative">leaves ${his} anus gaping;</span>`);
						slave.anus += 1;
						if (relativeDickSize(slave, V.PC, "anus") > 0) {
							r.push(`you're so huge that ${his} ring still tightly hugs your cock.`);
						} else {
							r.push(`you'll miss how tight ${he} was.`);
						}
					}
				}
			}
		}
		if (V.PC.dick !== 0) {
			if (slave.cervixImplant === 1 || slave.cervixImplant === 3) {
				cervixPump += (cumPerSlave / acts) * vaginalUse;
			}
			if (slave.cervixImplant === 2 || slave.cervixImplant === 3) {
				cervixPump += (cumPerSlave / acts) * analUse;
			}
		}
		if (cervixPump > 0) {
			if (slave.fuckdoll === 0) {
				if (slave.fetish === Fetish.MINDBROKEN) {
					r.push(`${He} is completely oblivious to ${his} <span class="change positive">increasingly swollen belly</span> and stands no chance of linking it to`);
				} else {
					r.push(`${He} notices ${his} <span class="change positive">belly has swollen</span> after`);
				}
				r.push(`all the`);
				if (slave.cervixImplant === 1) {
					r.push(`vaginal`);
				} else if (slave.cervixImplant === 2) {
					r.push(`anal`);
				}
				r.push(`sex ${he}'s had with you.`);
				slave.bellyImplant += cervixPump;
			} else {
				r.push(`With each deposit of your seed into ${him}, ${his} <span class="change positive">stomach swells a little larger.</span>`);
				slave.bellyImplant += cervixPump;
			}
		} // do cumflation here if you blow enough loads up her ass so frequently that she can't drain

		if (slave.need > 0) {
			if (slave.energy > 95 && V.masterSuiteUpgradeLuxury === 2 && fuckSlavesCount > 1) {
				r.push(`${He}'s a nymphomaniac and very difficult to sate, but the fuckpit allows ${him} all the sex even ${he} could ever want.`);
				slave.need = 0;
			} else if (slave.fetishKnown) {
				switch (slave.fetish) {
					case Fetish.MASOCHIST:
						if (dickSize > 0) {
							r.push(`${He} got tremendous sexual satisfaction from the ${num(analUse + vaginalUse)} times you stuffed ${him} to ${his} limit this week.`);
							slave.need = 0;
						}
						break;
					case Fetish.SUBMISSIVE:
						if (analUse + vaginalUse > 0) {
							r.push(`${He} got tremendous sexual satisfaction from the ${num(analUse + vaginalUse)} times you really fucked ${him} this week.`);
							slave.need = 0;
						}
						break;
					case Fetish.DOM:
						if (penetrativeUse > 0) {
							r.push(`${He} got tremendous sexual satisfaction from the ${num(penetrativeUse)} times ${he} got to fuck you this week.`);
							slave.need = 0;
						}
						break;
					case Fetish.BOOBS:
						if (mammaryUse > 0) {
							r.push(`${He} got tremendous sexual satisfaction from the ${num(mammaryUse)} times you groped ${his} breasts to orgasm this week.`);
							slave.need = 0;
						}
						break;
					case Fetish.CUMSLUT:
						if (oralUse > 0) {
							r.push(`${He} got tremendous sexual satisfaction from the ${num(oralUse)} times you fucked ${his} face this week.`);
							slave.need = 0;
						}
						break;
					case Fetish.BUTTSLUT:
						if (analUse > 0) {
							r.push(`${He} got tremendous sexual satisfaction from the ${num(analUse)} times you fucked ${his} ass this week.`);
							slave.need = 0;
						}
						break;
					case Fetish.PREGNANCY:
						if (vaginalUse > 0 && slave.mpreg === 0 && canPenetrate(V.PC) && isVirile(V.PC)) {
							r.push(`${He} got tremendous sexual satisfaction from the ${num(vaginalUse)} times you creampied ${his} pussy this week.`);
							slave.need = 0;
						} else if (analUse > 0 && slave.mpreg === 1 && canPenetrate(V.PC) && isVirile(V.PC)) {
							r.push(`${He} got tremendous sexual satisfaction from the ${num(analUse)} times you creampied ${his} butt this week.`);
							slave.need = 0;
						}
						break;
					case Fetish.SADIST:
					case Fetish.HUMILIATION:
						// nothing here
						break;
				}
			}
			if (slave.devotion > 95 && slave.need > 0) {
				r.push(`${He}'s so devoted to you that any intimacy with you at all gives ${him} some sexual satisfaction.`);
				slave.need -= 20;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {number} rep multiplier
	 */
	function familyBonus(slave) {
		let multiplier = 0;
		const isFucktoy = (s) => [Job.CONCUBINE, Job.MASTERSUITE, Job.FUCKTOY].includes(s.assignment);
		const fucktoys = V.slaves.filter(s => isFucktoy(s));

		if (areRelated(V.PC, slave)) {
			r.push(`Keeping your own ${relativeTerm(V.PC, slave)} as a personal ${canFuck ? `fucktoy` : `bedwarmer`} leaves quite a public impression.`);
			multiplier += 0.01; // 1% base
			if (FutureSocieties.isActive('FSEgyptianRevivalist') || V.arcologies[0].FSEgyptianRevivalistIncestPolicy === 1) {
				multiplier += 0.04; // 5% if such behavior aligns with your societal goals
			}
		}

		if (slave.father > 0 && slave.mother !== slave.father) {
			const dad = getSlave(slave.father);
			if (dad && isFucktoy(dad)) {
				r.push(`Since you are also keeping ${his} father as a sexual servant, you often use them together, which leaves quite a public impression.`);
			}
		}

		if (slave.mother > 0) {
			const mom = getSlave(slave.mother);
			if (mom && isFucktoy(mom)) {
				r.push(`Since you are also keeping ${his} mother as a sexual servant, you often use them together, which leaves quite a public impression.`);
			}
		}

		const children = fucktoys.filter(s => s.father === slave.ID || s.mother === slave.ID);
		if (children.length > 1) {
			const childPronouns = getPronouns(children[0]);
			const groupNoun = children.every(s => getPronouns(s).daughter === childPronouns.daughter) ? asPlural(childPronouns.daughter) : "children"; // daughters, sons, or children, as appropriate
			r.push(`Since you are also keeping ${his} ${groupNoun}, ${toSentence(children.map(s => s.slaveName))}, as sexual servants, you often enjoy them all at once, which leaves quite a public impression.`);
		} else if (children.length > 0) {
			const childPronouns = getPronouns(children[0]);
			r.push(`Since you are also keeping ${his} ${childPronouns.daughter}, ${children[0].slaveName}, as a sexual servant, you often use them together, which leaves quite a public impression.`);
		}

		const siblings = fucktoys.filter(s => areSisters(slave, s) > 0);
		if (siblings.length > 1) {
			const sibPronouns = getPronouns(siblings[0]);
			const groupNoun = siblings.every(s => getPronouns(s).sister === sibPronouns.sister) ? asPlural(sibPronouns.sister) : "siblings"; // sisters, brothers, or siblings, as appropriate
			r.push(`Since you are also keeping ${his} ${groupNoun}, ${toSentence(siblings.map(s => s.slaveName))}, as sexual servants, you often enjoy them all at once, which leaves quite a public impression.`);
		} else if (siblings.length > 0) {
			const sibPronouns = getPronouns(siblings[0]);
			r.push(`Since you are also keeping ${his} ${sibPronouns.sister}, ${siblings[0].slaveName}, as a sexual servant, you often use them together, which leaves quite a public impression.`);
		}

		return multiplier;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} familyMult
	 */
	function addRep(slave, familyMult) {
		let multiplier = 0.1 + familyMult;
		if (slave.fuckdoll === 0) {
			if (slave.fetish !== Fetish.MINDBROKEN) {
				if (slave.relationship === -2) {
					multiplier += 0.04;
				} else if (slave.relationship === -3 && slave.devotion > 50) {
					multiplier += 0.06;
				}
			}
			if (V.arcologies[0].FSSlaveProfessionalism > 50 && slave.intelligence + slave.intelligenceImplant >= 100 && slave.skill.entertainment >= 100 && slave.skill.whoring >= 100 && slave.skill.anal >= 100 && slave.skill.oral >= 100) {
				multiplier += 0.04;
				if (slave.vagina >= 0 && slave.skill.vaginal >= 100) {
					multiplier += 0.01;
				}
			}
			if (V.arcologies[0].FSRestart > 50 && slave.breedingMark === 1 && V.propOutcome === 1) {
				multiplier += 0.04;
			}
			if (V.arcologies[0].FSRepopulationFocus > 50 && slave.bellyPreg >= 5000) {
				multiplier += 0.02;
			}
			if (slave.prestige > 0) {
				multiplier += 0.03 * slave.prestige;
			}
			if (slave.porn.prestige > 2) {
				multiplier += 0.1;
			} else if (slave.porn.prestige > 1) {
				multiplier += 0.03;
			}
		} else {
			if (slave.porn.fameType === "fuckdoll") {
				multiplier += 0.1 * slave.porn.prestige;
			} else {
				multiplier += 0.04;
			}
		}
		if (slave.ID === V.ConcubineID) {
			multiplier += 0.05;
		} else if ((slave.ID === V.HeadGirlID) && (V.arcologies[0].FSEgyptianRevivalistLaw === 1)) {
			multiplier += 0.05;
		}

		repX(Math.trunc((Beauty(slave) * FResult(slave)) * multiplier / 4), "fucktoy", slave);

		r.push(`Keeping ${him} as nothing but your personal`);
		if (!canFuck) {
			r.push(`bedwarmer and arm candy`);
		} else if (slave.toyHole === ToyHole.PUSSY) {
			r.push(`pussy toy`);
		} else if (slave.toyHole === ToyHole.ASS) {
			r.push(`anal toy`);
		} else if (slave.toyHole === ToyHole.MOUTH) {
			r.push(`oral toy`);
		} else if (slave.toyHole === ToyHole.BOOBS) {
			r.push(`pair of boobs`);
		} else if (slave.devotion <= 20) {
			r.push(`rapebait`);
		} else {
			r.push(`fucktoy`);
		}
		if (slave.prestige > 0 && slave.fuckdoll === 0) {
			r.push(`<span class="reputation inc">adds considerably to your reputation,</span> since ${he}'s prestigious.`);
		} else {
			r.push(`<span class="reputation inc">adds slightly to your reputation</span> as a prosperous citizen.`);
		}

		if (slave.fuckdoll === 0) {
			if (slave.porn.prestige > 2) {
				r.push(`Having your every urge attended to by a famous porn star <span class="reputation inc">is not lost on the citizenry.</span>`);
			} else if (slave.porn.prestige > 1) {
				r.push(`Having a rising porn star to sate your urges with <span class="reputation inc">demonstrates how well off you are.</span>`);
			}
			if (slave.fetish !== Fetish.MINDBROKEN) {
				if (slave.relationship === -2) {
					r.push(`${His} satisfaction with ${his} place near you is obvious, <span class="reputation inc">bringing attention</span> to how completely you've broken ${him}.`);
				} else if (slave.relationship === -3 && slave.devotion > 50) {
					r.push(`${His} satisfaction with ${his} ${wife}ly duties is obvious, <span class="reputation inc">bringing attention</span> to the slave future you're building.`);
				}
			}
			if (V.arcologies[0].FSSlaveProfessionalism > 50 && slave.intelligence + slave.intelligenceImplant >= 100 && slave.skill.entertainment >= 100 && slave.skill.whoring >= 100 && slave.skill.anal >= 100 && slave.skill.oral >= 100) {
				r.push(`Keeping an ideal courtesan to attend to your needs <span class="reputation inc">is the definition of high class.</span>`);
			}
			if (V.arcologies[0].FSRestart > 50 && slave.breedingMark === 1 && V.propOutcome === 1) {
				r.push(`${His} breeding mark and ${his} place near you as a breeding toy is obvious, <span class="reputation inc">bringing attention</span> to how beautiful a pairing you make.`);
			}
			if (V.arcologies[0].FSRepopulationFocus > 50 && slave.bellyPreg >= 5000) {
				r.push(`${His} advanced pregnancy and role as your gravid breeder is obvious, <span class="reputation inc">bringing attention</span> to a woman's ideal role in ${arcology.name}.`);
			}
		} else {
			if (slave.porn.fameType === "fuckdoll") {
				if (slave.porn.prestige > 2) {
					r.push(`Keeping a legendary fuckdoll as your personal plaything <span class="reputation inc">is not lost on the citizenry.</span>`);
				} else if (slave.porn.prestige > 1) {
					r.push(`Keeping a well-known fuckdoll to sate your urges with <span class="reputation inc">demonstrates how well off you are.</span>`);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 *
	 */
	function mentalEffects(slave) {
		if (V.PC.visualAge <= 12 && V.PC.visualAge < V.minimumSlaveAge && !acceptsUnderage(slave)) {
			if (canFuck) {
				r.push(`${slave.slaveName} is <span class="trust dec">absolutely disgusted at ${himself}</span> for having sex with a child and ${he} knows ${he} has <span class="devotion dec">nobody to blame for it but you.</span>`);
				slave.devotion -= 5;
				slave.trust -= 5;
			} else {
				r.push(`${slave.slaveName} is <span class="trust dec">visibly uncomfortable</span> at being arm candy for a child and <span class="devotion dec">hates ${himself}</span> for taking advantage of the situation.`);
				slave.devotion -= 3;
				slave.trust -= 2;
			}
		} else {
			if (slave.behavioralQuirk === BehavioralQuirk.CONFIDENT) {
				r.push(`${slave.slaveName} <span class="trust inc">confidently enjoys</span> the prestige within the slave hierarchy that comes with being your ${canFuck ? `fucktoy` : `arm candy`}.`);
				slave.trust += 1;
			} else if (slave.behavioralQuirk === BehavioralQuirk.INSECURE) {
				r.push(`${slave.slaveName} <span class="trust inc">constantly reassures ${himself}</span> that ${he} must be pretty, since you keep ${him} as ${canFuck ? `a fucktoy` : `arm candy`}.`);
				slave.trust += 1;
			}
			if (slave.behavioralQuirk === BehavioralQuirk.ADORESMEN) {
				if (V.PC.dick !== 0 && perceivedGender(V.PC) < -1) {
					r.push(`${slave.slaveName} <span class="devotion inc">adores your company,</span> and is happy to spend time with you, even ${canFuck ? `when` : `if`} you don't have your cock in ${him}.`);
					slave.devotion += 1;
				}
			} else if (slave.behavioralQuirk === BehavioralQuirk.ADORESWOMEN) {
				if (V.PC.dick === 0 && perceivedGender(V.PC) >= 0) {
					r.push(`${slave.slaveName} <span class="devotion inc">adores your company,</span> and is happy to spend time with you, even ${canFuck ? `when` : `if`} you aren't fucking.`);
					slave.devotion += 1;
				}
			} else if (slave.sexualQuirk === SexualQuirk.ROMANTIC) {
				r.push(`${slave.slaveName} knows being ${slave.ID === V.ConcubineID ? `at the top` : `part`}  of your harem is the best romance ${he} can realistically expect, and does ${his} best to <span class="trust inc">be content</span> with it.`);
				slave.trust += 1;
			}
		}
		if (slave.sexualFlaw === SexualFlaw.NONE && slave.sexualQuirk !== SexualQuirk.CARING && excessSex >= excessSexLimit && random(1, 100) < excessSex - 15) {
			r.push(`Taking you into ${his} overwhelmed, inert body begins to translate into ${slave.slaveName}'s normal sexual activities; <span class="flaw gain">${he} has become apathetic towards sex.</span>`);
			slave.sexualFlaw = SexualFlaw.APATHETIC;
		}
		if (V.PC.visualAge >= 16 && canPenetrate(V.PC) && V.PC.dick > 0 && excessSex < excessSexLimit && tinyDick && canFuck) {
			if (slave.devotion.isBetween(50, 95)) {
				r.push(`${slave.slaveName} is a little disappointed by just how small you are, <span class="devotion dec">weakening ${his} regard for you.</span>`);
				slave.devotion -= 3;
			} else if (slave.devotion <= 20 && slave.trust >= -20) {
				r.push(`${slave.slaveName} considers your penis size to be laughable, something ${he} uses to <span class="trust inc">soften the impact</span> of you raping ${him}.`);
				slave.trust += 5;
			}
		}
		if (V.PC.visualAge > 12 || V.PC.visualAge >= V.minimumSlaveAge || acceptsUnderage(slave)) {
			if (slave.fetish === Fetish.PREGNANCY && V.PC.bellyPreg >= 1500) { // .belly
				r.push(`${slave.slaveName} <span class="devotion inc">enjoys being so close to ${his} gravid ${getWrittenTitle(slave)}.</span>`);
				slave.devotion += 1;
				if (slave.fetishKnown === 0) {
					r.push(`${He} enjoys being tasked with servicing a pregnant ${playerPronouns.woman} far more than a normal slave would; <span class="fetish gain">${he}'s harboring a pregnancy fetish!</span>`);
					slave.fetishKnown = 1;
				} else if (slave.fetishStrength < 95) {
					r.push(`Being tasked with servicing a lusty pregnant ${playerPronouns.woman} <span class="fetish inc">strengthens ${his} pregnancy fetish.</span>`);
					slave.fetishStrength += 4;
				}
			} else if (fetishChange > random(0, 100) && V.PC.bellyPreg >= 1500) {
				r.push(`At first ${he} found the prospect of being used by ${his} increasingly pregnant ${getWrittenTitle(slave)} a turn off, but being so close to your gravid form serves to be more erotic than ${he} anticipated. Soon ${he} finds ${himself} aroused less from the prospect of sex and more <span class="fetish gain">the chance to be near your child-laden belly.</span>`);
				slave.fetish = Fetish.PREGNANCY;
				slave.fetishKnown = 1;
				slave.fetishStrength = 10;
			}
		} // underage fetish here
	}

	function showDebugDetails() {
		r.push(`Expected .need delta: ${-energyPerSlave}. Actual .need delta: ${-(initialNeed - V.PC.deferredNeed - playerNeed)}.`);
		r.push(`Slave .need reduction: ${slaveNeed * globalNeedMult}.`);
		r.push(`Total acts: ${acts}. Quality Acts: ${qualitySex}. Excess acts: ${excessSex}.`);
		r.push(`Vaginal: U—${vaginalUse} Q—${vaginalQuality} P—${vaginalPleasure}.`);
		r.push(`Anal: U—${analUse} Q—${analQuality} P—${analPleasure}.`);
		r.push(`Oral: U—${oralUse} Q—${oralQuality} P—${oralPleasure}.`);
		r.push(`Boob: U—${mammaryUse} Q—${mammaryQuality} P—${mammaryPleasure}.`);
		r.push(`Penetrative: U—${penetrativeUse} Q—${penetrativeQuality} P—${penetrativePleasure}.`);
		r.push(`Total .need: ${V.PC.need}. Current total .need to be removed: ${-(V.PC.deferredNeed + playerNeed)}.`);

		if (vaginalUse + analUse + oralUse + mammaryUse + penetrativeUse < acts) {
			r.push(`<span class="red">Something wrong with act count math!</span>`);
		}
		if (vaginalUse + analUse + oralUse + mammaryUse + penetrativeUse !== qualitySex + excessSex) {
			if (slave.assignment === Job.FUCKTOY) { // Concubine and MS slaves have sex count modifiers, so they can easily flag this.
				r.push(`<span class="red">Sex count mismatch!</span>`);
			}
		}
	}

	function cleanupPlayerNeed() {
		if (PlayerAggroSperm) {
			playerNeed *= 2.1;
		}
		playerNeed *= globalNeedMult;
		V.PC.deferredNeed += playerNeed;
	}
};
