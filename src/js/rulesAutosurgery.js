globalThis.rulesAutosurgery = (function() {
	"use strict";

	return rulesAutoSurgery;

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSurgerySettings} [overrideRules]
	 * @returns {string}
	 */
	function rulesAutoSurgery(slave, overrideRules) {
		let r = "";
		const surgeries = [];
		const thisSurgery = overrideRules || surgeryFromRules(slave);
		if (slave.health.health >= -20) {
			CommitSurgery(slave, thisSurgery, surgeries);
		}
		if (surgeries.length > 0) {
			r += `${capFirstChar(V.assistant.name)}, ordered to apply surgery, gives ${slave.slaveName} ${surgeries.length > 1 ? `${surgeries.length} surgeries` : 'a single operation'}: <span class="lime">${capFirstChar(toSentence(surgeries))}.</span>`;
		}
		return r;
	}

	/**
	 * @param {FC.RA.RuleSetters[]} ruleset
	 * @returns {FC.RA.RuleSurgerySettings}
	 */
	function autoSurgerySelector(ruleset) {
		const surgery = App.RA.newRule.surgery();
		ruleset.forEach(rule => {
			Object.keys(rule.surgery)
				.filter(key => rule.surgery[key] !== null)
				.forEach(key => {
					surgery[key] = rule.surgery[key];
				});
		});
		return surgery;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {FC.RA.RuleSurgerySettings}
	 */
	function surgeryFromRules(slave) {
		let thisSurgery = autoSurgerySelector(
			V.defaultRules
				.filter(x => ruleApplied(slave, x))
				.map(x => x.set));
		if ((thisSurgery.hips !== null) && (thisSurgery.butt !== null)) {
			if (slave.hips < -1) {
				if (App.Utils.distanceToRange(2, thisSurgery.butt) > 0) {
					thisSurgery.butt = App.Utils.makeRange(2, 2);
				}
			} else if (slave.hips < 0) {
				if (App.Utils.distanceToRange(4, thisSurgery.butt) > 0) {
					thisSurgery.butt = App.Utils.makeRange(4, 4);
				}
			} else if (slave.hips > 0) {
				if (App.Utils.distanceToRange(8, thisSurgery.butt) > 0) {
					thisSurgery.butt = App.Utils.makeRange(8, 8);
				}
			} else if (slave.hips > 1) {
				// true
			} else {
				if (App.Utils.distanceToRange(6, thisSurgery.butt) > 0) {
					thisSurgery.butt = App.Utils.makeRange(8, 6);
				}
			}
		}
		return thisSurgery;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSurgerySettings} thisSurgery
	 * @param {string[]} surgeries
	 */
	function CommitSurgery(slave, thisSurgery, surgeries) {
		const {his, him} = getPronouns(slave);

		/**
		 * Performs an individual surgery procedure
		 * @param {string} desc
		 * @param {slaveOperation | App.Medicine.Surgery.Procedure} proc
		 * @param {number} [healthCost=10] normal health cost
		 */
		function commitProcedure(desc, proc, healthCost = 10) {
			if (slave.health.health >= -20) {
				surgeries.push(desc);
				if ( (typeof proc) === "function" ) {
					// @ts-ignore
					proc(slave);
				} else {
					// @ts-ignore
					const result = App.Medicine.Surgery.apply(proc, V.cheatMode);
					const [diff, ] = result;
					App.Utils.Diff.applyDiff(slave, diff);
				}

				cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
				surgeryDamage(slave, healthCost);
			}
		}

		/**
		 * Performs an individual genenetic modification
		 * @param {string} desc
		 * @param {App.Medicine.Surgery.Procedure} procedure
		 */
		function geneModProcedure(desc, procedure) {
			if (slave.health.health >= 0) {
				surgeries.push(desc);
				const [diff, ] = App.Medicine.Surgery.apply(procedure, V.cheatMode === 1);
				App.Utils.Diff.applyDiff(slave, diff);
			}
		}

		/**
		 * Computes procedure efficiency for selecting the best one
		 * @param {App.Medicine.Surgery.Procedure} proc
		 */
		function procedureEfficiency(proc) {
			const value = typeof proc.changeValue === "number" ? Math.abs(proc.changeValue) : 1.;
			return (value / proc.cost + value / proc.healthCost);
		}

		/**
		 * @param {FC.SizingImplantTarget} bodyPart
		 * @param {!FC.NumericRange} range
		 * @param {FC.SizingImplantType[]} implantTypes
		 * @param {boolean} replaceImplants
		 */
		function bodyPartSizing(bodyPart, range, implantTypes, replaceImplants) {
			const current = App.Medicine.implantInfo(slave, bodyPart);
			const distance = App.Utils.distanceToRange(current.volume, range);
			const shallShrink = distance < 0;
			const shallGrow = distance > 0;
			const shallReplaceImplantType = replaceImplants && (current.volume > 0) &&
				(implantTypes !== null && !implantTypes.some(v => v === current.type));

			if (!shallShrink && !shallGrow && !shallReplaceImplantType) {
				return;
			}

			let surgeryOptions = App.Medicine.Surgery.sizingProcedures.bodyPart(bodyPart, slave, {
				allowedTypes: implantTypes ? new Set(implantTypes) : null,
				replace: shallReplaceImplantType,
				targetSize: range
			});
			surgeryOptions = surgeryOptions
				.filter(surgery => surgery.disabledReasons.length === 0);
			if (!surgeryOptions.length) {
				return;
			}

			surgeryOptions.sort((a, b) => procedureEfficiency(b) - procedureEfficiency(a));

			const so = surgeryOptions[0];
			const surgeryResult = App.Medicine.Surgery.apply(so, false);
			if (!surgeryResult) {
				return;
			}

			const [diff, reaction] = surgeryResult;
			const result1 = reaction.reaction(slave, diff);
			const result2 = reaction.outro(slave, diff, result1);

			App.Utils.Diff.applyDiff(slave, diff);

			slave.devotion += result1.devotion + result2.devotion;
			slave.trust += result1.trust + result2.trust;

			// TODO: shortReaction and devotion/trust changes

			surgeries.push(`${so.description}`);
		}

		/**
		 *
		 * @param {string} label
		 * @param {"hips"|"shoulders"} target
		 */
		function pelvisShouldersImplants(label, target){
			const request = thisSurgery[`${target}Implant`];
			if (Math.abs(request) > 0) {
				if (Math.abs(request) < 2 || V.surgeryUpgrade) {
					const change = request > 0 ? 1 : -1;
					commitProcedure(`surgery to ${request > 0 ? "broaden" : "narrow"} ${his} ${label}`,
						s => { s[target] += change; s[`${target}Implant`] += change; },
						40);
				}
			}
		}

		if (slave.health.health < -20 && surgeries.length >= 3) {
			return `<span class='red'>Either this slave is extremely unwell or they are assigned to have more than two surgeries.</span>`;
		}

		// start with most damaging procedures

		// No idea where NCS is right now but i don't think its far enough along right now to implement it
		/* if (thisSurgery.genes.NCS === 1 && slave.geneMods.NCS !== 1) {
			/*const ImmortalityTreatment = new App.Medicine.Surgery.Procedures.ncs(slave)
			surgeries.push(`surgery to alter ${his} genetic code to encourage ${his} body to stretch`);
			App.Medicine.Surgery.apply(ImmortalityTreatment, V.cheatMode === 1);
		}*/
		if (thisSurgery.genes.aggressiveSperm === 1 && slave.geneMods.aggressiveSperm !== 1 && V.optimizedSpermFormula === 1) {
			geneModProcedure(`surgery to alter ${his} genetic code to encourage ${his} body to produce far more aggressive sperm cells`,
				new App.Medicine.Surgery.Procedures.OptimizedSpermTreatment(slave));
		} else if (thisSurgery.genes.flavoring === 1 && slave.geneMods.flavoring !== 1 && V.bioEngineeredFlavoringResearch === 1) {
			geneModProcedure(`surgery to alter ${his} genetics to allow flavored milk`,
				new App.Medicine.Surgery.Procedures.milkFlavoring(slave));
		} else if (thisSurgery.genes.immortality === 1 && slave.geneMods.immortality !== 1 && V.immortalityFormula === 1) {
			geneModProcedure(`surgery to alter ${his} genetic code to reverse and prevent aging, effectively thwarting the rigors of old age`,
				new App.Medicine.Surgery.Procedures.ImmortalityTreatment(slave));
		} else if (thisSurgery.genes.livestock === 1 && slave.geneMods.livestock !== 1 && V.enhancedProductionFormula === 1) {
			geneModProcedure(`surgery to alter ${his} genetic code to encourage ${his} body to produce larger volumes of sellable resources`,
				new App.Medicine.Surgery.Procedures.EnhancedProductionTreatment(slave));
		} else if (thisSurgery.genes.progenitor === 1 && slave.geneMods.progenitor !== 1 && V.optimizedBreedingFormula === 1) {
			geneModProcedure(`surgery to alter ${his} genetic code to be far more efficient at bearing children`,
				new App.Medicine.Surgery.Procedures.OptimizedBreedingTreatment(slave));
		} else if (thisSurgery.genes.rapidCellGrowth === 1 && slave.geneMods.rapidCellGrowth !== 1 && V.RapidCellGrowthFormula === 1) {
			geneModProcedure(`surgery to alter ${his} genetic code to encourage ${his} body to stretch`,
				new App.Medicine.Surgery.Procedures.ElasticityTreatment(slave));
		}

		for (const [key, obj] of App.Data.geneticQuirks) {
			if (obj.hasOwnProperty("requirements") && !obj.requirements || obj.restricted) {
				continue;
			}
			if (V.geneticMappingUpgrade >= 2 && slave.health.health >= 0) {
				if (thisSurgery.genes[key] === 2 && slave.geneticQuirks[key] !== 2) {
					const add = new App.Medicine.Surgery.Procedures.AddGene(slave, key);
					surgeries.push(`surgery to add ${key} to ${his} genetic code`);
					App.Medicine.Surgery.apply(add, V.cheatMode === 1);
				} else if (thisSurgery.genes[key] === 0 && slave.geneticQuirks[key] !== 0 && V.geneticFlawLibrary === 1) {
					const remove = new App.Medicine.Surgery.Procedures.RemoveGene(slave, key, "");
					surgeries.push(`surgery to remove ${key} from ${his} genetic code`);
					App.Medicine.Surgery.apply(remove, V.cheatMode === 1);
				}
			}
		}

		pelvisShouldersImplants("pelvis", "hips");
		pelvisShouldersImplants("shoulders", "shoulders");

		if (thisSurgery.eyes === 1 && anyVisionEquals(slave, 1)) {
			// possibly two surgeries at once, in turn health cost is halved
			if (getLeftEyeVision(slave) === 1) {
				commitProcedure(`surgery to correct ${his} left vision`, s => { eyeSurgery(s, "left", "fix"); }, 5);
			}
			if (getRightEyeVision(slave) === 1) {
				commitProcedure(`surgery to correct ${his} right vision`, s => { eyeSurgery(s, "right", "fix"); }, 5);
			}
		} else if (thisSurgery.eyes === -1 && anyVisionEquals(slave, 2)) {
			// possibly two surgeries at once, in turn health cost is halved
			if (getLeftEyeVision(slave) === 2) {
				commitProcedure(`surgery to blur ${his} left vision`, s => { eyeSurgery(s, "left", "blur"); }, 5);
			}
			if (getRightEyeVision(slave) === 2) {
				commitProcedure(`surgery to blur ${his} right vision`, s => { eyeSurgery(s, "right", "blur"); }, 5);
			}
		} else if (slave.heels === 1 && thisSurgery.heels === 1) {
			commitProcedure(`surgery to repair ${his} tendons`, new App.Medicine.Surgery.Procedures.ReplaceTendons(slave));
		} else if (slave.heels === 0 && thisSurgery.heels === -1) {
			commitProcedure(`surgery to shorten ${his} tendons`, new App.Medicine.Surgery.Procedures.ShortenTendons(slave));
		} else if (slave.hears === -1 && thisSurgery.hears === 0) {
			commitProcedure(`surgery to correct ${his} hearing`, new App.Medicine.Surgery.Procedures.EarFix(slave));
		} else if (slave.hears === 0 && thisSurgery.hears === -1) {
			commitProcedure(`surgery to muffle ${his} hearing`, new App.Medicine.Surgery.Procedures.EarMuffle(slave));
		} else if (slave.smells === -1 && thisSurgery.smells === 0) {
			commitProcedure(`surgery to correct ${his} sense of smell`, new App.Medicine.Surgery.Procedures.Resmell(slave));
		} else if (slave.smells === 0 && thisSurgery.smells === -1) {
			commitProcedure(`surgery to muffle ${his} sense of smell`, new App.Medicine.Surgery.Procedures.Desmell(slave));
		} else if (slave.tastes === -1 && thisSurgery.tastes === 0) {
			commitProcedure(`surgery to correct ${his} sense of taste`, new App.Medicine.Surgery.Procedures.Retaste(slave));
		} else if (slave.tastes === 0 && thisSurgery.tastes === -1) {
			commitProcedure(`surgery to muffle ${his} sense of taste`, new App.Medicine.Surgery.Procedures.Detaste(slave));
		} else if (_.isNumber(thisSurgery.voice) && slave.voice !== thisSurgery.voice) {
			const voiceDifference = thisSurgery.voice - slave.voice;
			commitProcedure(`surgery to ${(voiceDifference < 0) ? "lower" : "raise"} ${his} voice`, s => {
				s.voice += voiceDifference;
				s.voiceImplant += voiceDifference;
			});
		}

		if (slave.lactation === 2 && thisSurgery.lactation === 0) {
			commitProcedure(`surgery to remove ${his} lactation implants`, s => { s.lactation = 0; });
		} else if (slave.lactation !== 2 && (thisSurgery.lactation === 1)) {
			commitProcedure("lactation inducing implanted drugs", s => {
				s.lactation = 2;
				s.rules.lactation = "none";
			});
		} else if ((slave.boobShape === "saggy" || slave.boobShape === "downward-facing") && thisSurgery.cosmetic > 0 && slave.breastMesh !== 1) {
			commitProcedure("a breast lift", s => { s.boobShape = "normal"; });
		} else if ((slave.boobShape === "normal" || slave.boobShape === "wide-set") && thisSurgery.cosmetic > 0 && slave.breastMesh !== 1) {
			commitProcedure("more interestingly shaped breasts", () => {
				if (slave.boobs > 800) {
					slave.boobShape = "torpedo-shaped";
				} else {
					slave.boobShape = "perky";
				}
			});
		} else if (thisSurgery.boobs) {
			bodyPartSizing("boobs", thisSurgery.boobs, thisSurgery.boobsImplantTypes, thisSurgery.boobsImplantAllowReplacing);
		}

		if (thisSurgery.butt !== null) {
			bodyPartSizing("butt", thisSurgery.butt, thisSurgery.buttImplantTypes, thisSurgery.buttImplantAllowReplacing);
		}

		if (thisSurgery.lips != null) {
			bodyPartSizing("lips", thisSurgery.lips, null, true);
		}

		if (slave.anus > 3 && thisSurgery.cosmetic > 0) {
			commitProcedure("a restored anus", new App.Medicine.Surgery.Procedures.RepairAnus(slave));
		} else if (slave.vagina > 3 && thisSurgery.cosmetic > 0) {
			commitProcedure("a restored pussy", new App.Medicine.Surgery.Procedures.RepairVagina(slave));
		} else if (slave.anus > 0 && V.surgeryUpgrade === 1 && thisSurgery.holes === 2) {
			commitProcedure("a virgin anus", new App.Medicine.Surgery.Procedures.RestoreAnalVirginity(slave));
		} else if (slave.vagina > 0 && V.surgeryUpgrade === 1 && thisSurgery.holes === 2) {
			commitProcedure("a virgin pussy", () => {
				slave.vagina = 0;
				slave.trueVirgin = 0;
				slave.counter.reHymen = slave.counter.reHymen ? slave.counter.reHymen + 1 : 1;
				if (slave.skill.vaginal > 10) {
					slave.skill.vaginal -= 10;
				}
			});
		} else if (slave.anus > 1 && thisSurgery.holes === 1) {
			commitProcedure("a tighter anus", () => {
				slave.anus = 1;
				if (slave.skill.anal > 10) {
					slave.skill.anal -= 10;
				}
			});
		} else if (slave.vagina > 1 && thisSurgery.holes === 1) {
			commitProcedure("a tighter pussy", () => {
				slave.vagina = 1;
				if (slave.skill.vaginal > 10) {
					slave.skill.vaginal -= 10;
				}
			});
		}

		if (slave.prostate === 2 && thisSurgery.prostate === 1) {
			commitProcedure(`surgery to remove ${his} prostate implant`, new App.Medicine.Surgery.Procedures.RemoveProstate(slave));
		} else if (slave.prostate === 1 && thisSurgery.prostate === 2) {
			commitProcedure("a precum production enhancing drug implant", new App.Medicine.Surgery.Procedures.Precum(slave));
		} else if (slave.balls > 0 && slave.vasectomy === 0 && thisSurgery.vasectomy === true) {
			commitProcedure("vasectomy", s => { s.vasectomy = 1; });
		} else if (slave.balls > 0 && slave.vasectomy === 1 && thisSurgery.vasectomy === false) {
			commitProcedure("undo vasectomy", new App.Medicine.Surgery.Procedures.VasectomyUndo(slave));
		}

		// Since currently there's no way of changing the autosurgery cost, when replacing, the cost is 300 instead of 600
		if ((slave.ovaries === 1 || slave.mpreg === 1) && slave.ovaImplant !== "asexual") {
			if (thisSurgery.ovaImplant === 2 && V.sympatheticOvaries === 1) {
				if (slave.ovaImplant === 0) {
					commitProcedure(`surgery to link ${his} ovaries via implant`, s => { s.ovaImplant = "sympathy"; });
				} else if (slave.ovaImplant === "fertility" && thisSurgery.ovaImplantAllowReplacing) {
					commitProcedure(`surgery to remove the fertility implants and link ${his} ovaries via implant`, s => { s.ovaImplant = "sympathy"; }, 20);
				}
			} else if (thisSurgery.ovaImplant === 1 && V.fertilityImplant === 1) {
				if (slave.ovaImplant === 0) {
					commitProcedure(`surgery to attach fertility implants to ${his} ovaries`, s => { s.ovaImplant = "fertility"; });
				} else if (slave.ovaImplant === "sympathy" && thisSurgery.ovaImplantAllowReplacing) {
					commitProcedure(`surgery to unlink ${his} ovaries and attach fertility implants`, s => { s.ovaImplant = "fertility"; }, 20);
				}
			} else if (thisSurgery.ovaImplant === 0 && slave.ovaImplant !== 0) {
				if (slave.ovaImplant === "sympathy") {
					commitProcedure(`surgery to unlink ${his} ovaries`, s => { s.ovaImplant = 0; });
				} else if (slave.ovaImplant === "fertility") {
					commitProcedure(`surgery to remove the fertility implants from ${his} ovaries`, s => { s.ovaImplant = 0; });
				}
			}
		}

		if (slave.faceImplant <= 15 && slave.face <= 95 && thisSurgery.cosmetic > 0) {
			commitProcedure("a nicer face", () => {
				if (slave.faceShape === "masculine") { slave.faceShape = "androgynous"; }
				slave.faceImplant += 25 - 5 * Math.trunc(V.PC.skill.medicine / 50) - 5 * V.surgeryUpgrade;
				slave.face = Math.clamp(slave.face + 20, -100, 100);
			});
		} else if (slave.faceImplant <= 15 && slave.ageImplant !== 1 && slave.visualAge >= 25 && thisSurgery.cosmetic > 0) {
			commitProcedure("an age lift", () => {
				slave.faceImplant += 25 - 5 * Math.trunc(V.PC.skill.medicine / 50) - 5 * V.surgeryUpgrade;
				applyAgeImplant(slave);
			});
		} else if (thisSurgery.bodyhair === 2 && (
			(slave.underArmHStyle !== "bald" && slave.underArmHStyle !== "hairless") ||
			(slave.pubicHStyle !== "bald" && slave.pubicHStyle !== "hairless")
		)) {
			commitProcedure("body hair removal", () => {
				if (slave.underArmHStyle !== "hairless") { slave.underArmHStyle = "bald"; }
				if (slave.pubicHStyle !== "hairless") { slave.pubicHStyle = "bald"; }
			}, 0);
		} else if ((slave.bald === 0 || slave.hStyle !== "bald" || slave.eyebrowHStyle !== "bald") && thisSurgery.hair === 2) {
			commitProcedure("hair removal", () => {
				slave.eyebrowHStyle = "bald";
				slave.hStyle = "bald";
				slave.bald = 1;
			}, 0);
		} else if (slave.weight >= 60 && thisSurgery.cosmetic > 0) {
			commitProcedure("liposuction", new App.Medicine.Surgery.Procedures.Liposuction(slave));
		} else if ((slave.bellySagPreg > 0 || slave.bellySag > 0) && (thisSurgery.cosmetic > 0 || thisSurgery.tummy > 0 )) {
			commitProcedure("a tummy tuck", new App.Medicine.Surgery.Procedures.TummyTuck(slave), 20);
		} else if (slave.voice === 1 && slave.voiceImplant === 0 && thisSurgery.cosmetic > 0) {
			commitProcedure("a feminine voice", new App.Medicine.Surgery.Procedures.VoiceRaise(slave));
		} else if (slave.scar.hasOwnProperty("belly") && slave.scar.belly["c-section"] > 0 && thisSurgery.cosmetic > 0) {
			commitProcedure("surgery to remove a c-section scar", s => { App.Medicine.Modification.removeScar(s, "belly", "c-section"); });
		} else if (slave.faceImplant <= 45 && slave.face <= 95 && thisSurgery.cosmetic === 2) {
			commitProcedure("a nicer face", () => {
				if (slave.faceShape === "masculine") { slave.faceShape = "androgynous"; }
				slave.faceImplant += 25 - 5 * Math.trunc(V.PC.skill.medicine / 50) - 5 * V.surgeryUpgrade;
				slave.face = Math.clamp(slave.face + 20, -100, 100);
			});
		} else if (slave.faceImplant <= 45 && slave.ageImplant !== 1 && slave.visualAge >= 25 && thisSurgery.cosmetic === 2) {
			commitProcedure("an age lift", () => {
				applyAgeImplant(slave);
				slave.faceImplant += 25 - 5 * Math.trunc(V.PC.skill.medicine / 50) - 5 * V.surgeryUpgrade;
			});
		} else if (slave.voice < 3 && slave.voiceImplant === 0 && thisSurgery.cosmetic === 2) {
			commitProcedure("a bimbo's voice", new App.Medicine.Surgery.Procedures.VoiceRaise(slave));
		}

		if (slave.waist >= -10 && thisSurgery.cosmetic > 0) {
			commitProcedure("a narrower waist", new App.Medicine.Surgery.Procedures.WaistReduction(slave));
		} else if (slave.waist >= -95 && V.seeExtreme === 1 && thisSurgery.cosmetic === 2) {
			commitProcedure("a narrower waist", s => { s.waist = Math.clamp(s.waist - 20, -100, 100); });
		} else if (thisSurgery.hips !== null && slave.hips < 3 && V.surgeryUpgrade === 1 && (slave.hips < thisSurgery.hips)) {
			commitProcedure("wider hips", new App.Medicine.Surgery.Procedures.BroadenPelvis(slave));
		}

		if (slave.bellyImplant < 0 && V.bellyImplants > 0 && thisSurgery.bellyImplant === "install" && slave.womb.length === 0 && slave.broodmother === 0) {
			const proc = () => {
				slave.bellyImplant = 100;
				slave.preg = -2;
			};
			if (slave.ovaries === 1 || slave.mpreg === 1) {
				commitProcedure("belly implant", proc, 10);
			} else {
				commitProcedure("male belly implant", proc, 50);
			}
			bellyIn(slave);
		} else if (slave.bellyImplant >= 0 && thisSurgery.bellyImplant === "remove") {
			commitProcedure("belly implant removal", () => {
				slave.preg = 0;
				slave.bellyImplant = -1;
				slave.cervixImplant = 0;
			});
		}

		/**
		 * @type {FC.HornType[]}
		 */
		const hornTypes = [ "none", "curved succubus horns", "backswept horns", "cow horns", "one long oni horn", "two long oni horns", "small horns" ];
		const hornType = hornTypes[thisSurgery.horn - 1];
		if (hornType && slave.horn !== hornType) {
			if (hornType === "none") {
				commitProcedure(`surgery to remove ${his} implanted horns`, new App.Medicine.Surgery.Procedures.HornGone(slave));
			} else {
				commitProcedure(`surgery to implant ${him} with ${hornType}`, new App.Medicine.Surgery.Procedures.Horn(slave, hornType, hornType, "white"));
			}
		}

		if (slave.earShape !== "normal" && thisSurgery.earShape === 1) {
			commitProcedure(`surgery to restore ${his} modified ears`, new App.Medicine.Surgery.Procedures.EarRestore(slave));
		} else if (slave.earShape !== "pointy" && thisSurgery.earShape === 2) {
			commitProcedure(`surgery to modify ${his} ears into a pair of small pointy ears`, new App.Medicine.Surgery.Procedures.EarMinorReshape(slave, "pointy", "pointy"));
		} else if (slave.earShape !== "elven" && thisSurgery.earShape === 3) {
			commitProcedure(`surgery to modify ${his} ears into a pair of elven ears`, new App.Medicine.Surgery.Procedures.EarMajorReshape(slave, "elven", "elven"));
		} else if (slave.earShape !== "cow" && thisSurgery.earShape === 4) {
			commitProcedure(`surgery to modify ${his} ears into a pair of bovine-like ears`, new App.Medicine.Surgery.Procedures.EarMajorReshape(slave, "cow", "cow"));
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 */
	function bellyIn(slave) {
		// less hacky version of calling surgery degradation silently
		if (slave.devotion > 50) {
			slave.devotion += 4;
		} else if (slave.devotion >= -20) {
			slave.trust -= 5;
		} else {
			slave.trust -= 5;
			slave.devotion -= 5;
		}
	}
})();
