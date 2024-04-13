/**
 * this code applies RA rules onto slaves
 * @param {App.Entity.SlaveState} slave
 * @returns {string}
 */
globalThis.DefaultRules = function(slave, options) {
	if (slave.useRulesAssistant === 0) {
		return ""; // exempted
	}

	let r = "";
	const slaveReadOnly = createReadonlyProxy(slave);
	const {rule, ruleIds, sourceRecord} = runWithReadonlyProxy(() => ProcessSlaveRules(slaveReadOnly));
	slave.currentRules = ruleIds;

	const pronouns = getPronouns(slave);
	const {he, him, his} = pronouns;

	if (ruleIds.length !== 0 && !options?.aiRulesOnly) {
		AssignJobToSlave(slave, rule);
		if (slave.fuckdoll === 0) {
			ProcessClothing(slave, rule);
			ProcessCollar(slave, rule);
			ProcessMask(slave, rule);
			ProcessGag(slave, rule);
			ProcessEyewear(slave, rule);
			ProcessEarwear(slave, rule);
			ProcessDildos(slave, rule);
			ProcessDickAccessories(slave, rule);
			ProcessAnalAccessories(slave, rule);
			ProcessChastity(slave, rule);
			ProcessShoes(slave, rule);
			ProcessBellyAccessories(slave, rule);
			ProcessArmAccessory(slave, rule);
			ProcessLegAccessory(slave, rule);
		}
		ProcessPit(slave, rule);
		ProcessBellyImplant(slave, rule);
		if (isFertile(slave) || slave.pregWeek < 0) {
			ProcessContraceptives(slave, rule);
		}
		if (slave.preg > 0 && slave.pregKnown === 1 && slave.broodmother === 0) {
			ProcessAbortions(slave, rule);
		}
		ProcessDrugs(slave, rule);
		ProcessEnema(slave, rule);
		ProcessDiet(slave, rule);
		ProcessCuratives(slave, rule);
		ProcessAphrodisiacs(slave, rule);
		ProcessPenisHormones(slave, rule);
		ProcessFemaleHormones(slave, rule);
		ProcessPregnancyDrugs(slave, rule);
		if (slave.fuckdoll === 0) {
			ProcessLivingStandard(slave, rule);
			ProcessRest(slave, rule);
			ProcessSpeech(slave, rule);
			ProcessRelationship(slave, rule);
			ProcessRelease(slave, rule);
			ProcessLactation(slave, rule);
			if (!canWalk(slave) && canMove(slave)) {
				ProcessMobility(slave, rule);
			}
			ProcessPunishment(slave, rule);
			ProcessReward(slave, rule);
		}
		ProcessToyHole(slave, rule);
		ProcessDietCum(slave, rule);
		ProcessDietMilk(slave, rule);
		if (V.arcologies[0].FSHedonisticDecadenceResearch === 1) {
			ProcessSolidFood(slave, rule);
		}
		ProcessTeeth(slave, rule);
		ProcessStyle(slave, rule);
		ProcessPiercings(slave, rule);
		ProcessSmartPiercings(slave, rule);
		ProcessTattoos(slave, rule);
		ProcessBrands(slave, rule);
		ProcessPornFeedEnabled(slave, rule);
		ProcessPorn(slave, rule);
		ProcessLabel(slave, rule);
		ProcessOther(slave, rule);
	}

	// AI prompts might still have to be removed if no rules apply
	if (V.imageChoice === 6) {
		ProcessPrompts(slave, rule);
	}

	return r;


	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {{ruleIds: string[], rule: FC.RA.RuleSetters, sourceRecord: object}}
	 */
	function ProcessSlaveRules(slave) {
		// merge all rules applying on a slave into one big rule
		/** @type {FC.RA.Rule[]} */
		const rules = V.defaultRules.filter((rule) => ruleAppliesP(rule, slave));
		const ruleIds = [];
		/**
		 * @type {Array<[FC.RA.RuleSetters, string]>}
		 */
		const assignments = [];
		for (const rule of rules) {
			ruleIds.push(rule.ID);
			assignments.push([ProcessAssignments(slave, Object.assign({}, rule.set)), rule.name]);
		}
		const [combinedRule, sourceRecord] = mergeRules(assignments);
		return {ruleIds, rule: combinedRule, sourceRecord};
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 * @returns {FC.RA.RuleSetters}
	 */
	function ProcessAssignments(slave, rule) {
		// Before merging rules, we process assignments for each rule separately, so we can remove slaves from
		// facilities when they no longer qualify, even if the final "winning" rule assigns them elsewhere.
		// We also ignore inapplicable assignments for the current slave, so we only merge assignments that are valid.
		if (rule.setAssignment === null) {
			delete rule.setAssignment;
			return rule;
		}
		const job = App.Utils.jobForAssignment(rule.setAssignment);
		if (job === undefined) {
			r += `<span class="red">No job for assignment '${rule.setAssignment}'.</span>`;
			return rule;
		}
		const removeAssignment = () => {
			if (job.facility !== App.Entity.facilities.penthouse) {
				RAFacilityRemove(slave, rule); // before deleting rule.setAssignment
			}
			delete rule.setAssignment;
		};
		switch (rule.setAssignment) {
			case Job.REST:
			case Job.FUCKTOY:
				// slaves always qualify for this assignment
				break;
			default:
				if (job.checkRequirements(slave).length !== 0) {
					// no message to prevent spam
					removeAssignment();
				} else if (job instanceof App.Entity.Facilities.ManagingJob && job.facility.manager.employeesIDs().size !== 0 && slave.assignment !== rule.setAssignment) {
					r += "<br>" + getAssignmentDescription({
						rule, slave, assignmentResult: "unable", append: " because the position was already occupied"
					});
					removeAssignment();
				} else if (!(job instanceof App.Entity.Facilities.ManagingJob) && !job.facility.hasFreeSpace && slave.assignment !== rule.setAssignment) {
					r += "<br>" + getAssignmentDescription({
						rule, slave, assignmentResult: "unable", append: " because it was full"
					});
					removeAssignment();
				}
				break;
		}
		return rule;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function AssignJobToSlave(slave, rule) {
		// place slave on assignment defined by the rule
		if (rule.setAssignment !== undefined && rule.setAssignment !== null) {
			if (((rule.setAssignment === Job.CHOICE && !slave.choosesOwnAssignment) || rule.setAssignment !== slave.assignment)) {
				message(getAssignmentDescription(
					{rule, slave, assignmentResult: "success"}), sourceRecord.setAssignment);
				assignJob(slave, rule.setAssignment);
			}
		}
	}

	/**
	 * @param {object} params
	 * @param {FC.RA.RuleSetters} params.rule
	 * @param {App.Entity.SlaveState} params.slave
	 * @param {"success"|"unable"} params.assignmentResult
	 * @param {string} [params.append]
	 * @returns {string}
	 */
	function getAssignmentDescription({rule, slave, assignmentResult, append = null}) {
		const assignment = rule.setAssignment === Job.CHOICE ? {
			work: `select ${pronouns.his} own assignments`,
			success: "is allowed",
			unable: "could not be allowed"
		} : {
			work: App.Utils.jobForAssignment(rule.setAssignment).assignment,
			success: "has been automatically assigned",
			unable: "could not be assigned"
		};

		const hasBeenAssigned = assignment[assignmentResult];
		return `${slave.slaveName} ${hasBeenAssigned} to ${assignment.work}${append || ''}.`;
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessClothing(slave, rule) {
		// apply clothes to slave
		if ((rule.clothes !== undefined) && (rule.clothes !== null) && (!rule.choosesOwnClothes)) {
			if (slave.clothes !== rule.clothes) {
				slave.clothes = rule.clothes;
				slave.choosesOwnClothes = 0;
				message(`${slave.slaveName} is now wearing ${slave.clothes}.`, sourceRecord.clothes);
			}
		}
		if ((rule.choosesOwnClothes !== undefined) && (rule.choosesOwnClothes !== null)) {
			if (slave.choosesOwnClothes !== rule.choosesOwnClothes) {
				slave.choosesOwnClothes = rule.choosesOwnClothes;
				if (slave.choosesOwnClothes) {
					message(`${slave.slaveName} is now allowed to choose ${his} own clothes.`, sourceRecord.choosesOwnClothes);
				} else {
					message(`${slave.slaveName} is now forbidden from choosing ${his} own clothes.`, sourceRecord.choosesOwnClothes);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessCollar(slave, rule) {
		// apply collar to slave
		if ((rule.collar !== undefined) && (rule.collar !== null)) {
			if (slave.collar !== rule.collar) {
				let m = "";
				if (rule.collar === "preg biometrics" && slave.preg <= -1 && slave.ovaries === 0 && slave.mpreg === 0) {
					slave.collar = "none";
					m = `${slave.slaveName} cannot utilize preg biometrics. `;
				} else {
					slave.collar = rule.collar;
				}
				if (slave.collar === "none") {
					message(`${m}${slave.slaveName} has been given no collar.`, sourceRecord.collar);
				} else if (slave.collar === "pretty jewelry") {
					message(`${m}${slave.slaveName} has been given ${slave.collar}.`, sourceRecord.collar);
				} else if ((["bell collar", "bowtie", "neck corset", "neck tie"].includes(slave.collar))) {
					message(`${m}${slave.slaveName} has been given a ${slave.collar}.`, sourceRecord.collar);
				} else {
					message(`${m}${slave.slaveName} has been given a ${slave.collar} collar.`, sourceRecord.collar);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessMask(slave, rule) {
		// apply faceAccessory to slave
		if ((rule.faceAccessory !== undefined) && (rule.faceAccessory !== null)) {
			if (slave.faceAccessory !== rule.faceAccessory) {
				slave.faceAccessory = rule.faceAccessory;
				if (slave.faceAccessory === "none") {
					message(`${slave.slaveName} has had their mask removed.`, sourceRecord.faceAccessory);
				} else {
					message(`${slave.slaveName} has been given a ${slave.faceAccessory}.`, sourceRecord.faceAccessory);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessGag(slave, rule) {
		// apply mouthAccessory to slave
		if ((rule.mouthAccessory !== undefined) && (rule.mouthAccessory !== null)) {
			if (slave.mouthAccessory !== rule.mouthAccessory) {
				let m = "";
				if (rule.mouthAccessory === "massive dildo gag" && slave.skill.oral <= 50) {
					slave.mouthAccessory = "none";
					m = `${slave.slaveName} lacks the oral skill to successfully keep the massive dildo gag in ${his} throat. `;
				} else {
					slave.mouthAccessory = rule.mouthAccessory;
				}
				if (slave.mouthAccessory === "none") {
					message(`${m}${slave.slaveName} has been given no gag.`, sourceRecord.mouthAccessory);
				} else {
					message(`${m}${slave.slaveName} has been given a ${slave.mouthAccessory}.`, sourceRecord.mouthAccessory);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessEyewear(slave, rule) {
		// apply glasses, contacts to slave
		if ((rule.eyewear !== undefined) && (rule.eyewear !== null)) {
			switch (rule.eyewear) {
				case "correct with glasses":
					if (anyVisionEquals(slave, 1)) {
						if (slave.eyewear !== "corrective glasses") {
							slave.eyewear = "corrective glasses";
							cashX(forceNeg(V.modCost), "slaveMod", slave);
							message(`${slave.slaveName} has been given corrective glasses.`, sourceRecord.eyewear);
						}
					} else {
						if (slave.eyewear !== "none") {
							slave.eyewear = "none";
							message(`${slave.slaveName}'s eyewear has been removed.`, sourceRecord.eyewear);
						}
					}
					break;

				case "correct with contacts":
					if (anyVisionEquals(slave, 1)) {
						if (slave.eyewear !== "corrective contacts") {
							slave.eyewear = "corrective contacts";
							cashX(forceNeg(V.modCost), "slaveMod", slave);
							message(`${slave.slaveName} has been given corrective contacts.`, sourceRecord.eyewear);
						}
					} else {
						if (slave.eyewear !== "none") {
							slave.eyewear = "none";
							message(`${slave.slaveName}'s eyewear has been removed.`, sourceRecord.eyewear);
						}
					}
					break;

				case "blur with glasses":
					if (anyVisionEquals(slave, 2)) {
						if (slave.eyewear !== "blurring glasses") {
							slave.eyewear = "blurring glasses";
							cashX(forceNeg(V.modCost), "slaveMod", slave);
							message(`${slave.slaveName} has been given blurring glasses.`, sourceRecord.eyewear);
						}
					} else {
						if (slave.eyewear !== "none") {
							slave.eyewear = "none";
							message(`${slave.slaveName}'s eyewear has been removed.`, sourceRecord.eyewear);
						}
					}
					break;

				case "blur with contacts":
					if (anyVisionEquals(slave, 2)) {
						if (slave.eyewear !== "blurring contacts") {
							slave.eyewear = "blurring contacts";
							cashX(forceNeg(V.modCost), "slaveMod", slave);
							message(`${slave.slaveName} has been given blurring contacts.`, sourceRecord.eyewear);
						}
					} else {
						if (slave.eyewear !== "none") {
							slave.eyewear = "none";
							message(`${slave.slaveName}'s eyewear has been removed.`, sourceRecord.eyewear);
						}
					}
					break;

				case "universal glasses":
					if (anyVisionEquals(slave, 1)) {
						if (slave.eyewear !== "corrective glasses") {
							slave.eyewear = "corrective glasses";
							cashX(forceNeg(V.modCost), "slaveMod", slave);
							message(`${slave.slaveName} has been given corrective glasses.`, sourceRecord.eyewear);
						}
					} else {
						if (slave.eyewear !== "glasses") {
							slave.eyewear = "glasses";
							cashX(forceNeg(V.modCost), "slaveMod", slave);
							message(`${slave.slaveName} has been given decorative glasses.`, sourceRecord.eyewear);
						}
					}
					break;

				default:
					if (slave.eyewear !== "none") {
						slave.eyewear = "none";
						message(`${slave.slaveName}'s eyewear has been removed.`, sourceRecord.eyewear);
					}
					break;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessEarwear(slave, rule) {
		// apply earplugs to slave
		if ((rule.earwear !== undefined) && (rule.earwear !== null)) {
			switch (rule.earwear) {
				case "correct with hearing aids":
					if (slave.hears === -1) {
						if (slave.earwear !== "hearing aids") {
							slave.earwear = "hearing aids";
							cashX(forceNeg(V.modCost), "slaveMod", slave);
							message(`${slave.slaveName} has been given hearing aids.`, sourceRecord.earwear);
						}
					} else {
						if (slave.earwear !== "none") {
							slave.earwear = "none";
							message(`${slave.slaveName}'s earwear has been removed.`, sourceRecord.earwear);
						}
					}
					break;

				case "muffle with ear plugs":
					if (slave.hears > -1) {
						if (slave.earwear !== "muffling ear plugs") {
							slave.earwear = "muffling ear plugs";
							cashX(forceNeg(V.modCost), "slaveMod", slave);
							message(`${slave.slaveName} has been given muffling ear plugs.`, sourceRecord.earwear);
						}
					} else {
						if (slave.earwear !== "none") {
							slave.earwear = "none";
							message(`${slave.slaveName}'s earwear has been removed.`, sourceRecord.earwear);
						}
					}
					break;

				case "deafen with ear plugs":
					if (slave.hears > -2) {
						if (slave.earwear !== "deafening ear plugs") {
							slave.earwear = "deafening ear plugs";
							cashX(forceNeg(V.modCost), "slaveMod", slave);
							message(`${slave.slaveName} has been given deafening ear plugs.`, sourceRecord.earwear);
						}
					} else {
						if (slave.earwear !== "none") {
							slave.earwear = "none";
							message(`${slave.slaveName}'s earwear has been removed.`, sourceRecord.earwear);
						}
					}
					break;

				default:
					if (slave.earwear !== "none") {
						slave.earwear = "none";
						message(`${slave.slaveName}'s earwear has been removed.`, sourceRecord.earwear);
					}
					break;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessDildos(slave, rule) {
		// apply vaginal dildos to slave
		if (slave.vagina === 0) {
			ProcessVVirginDildos(slave, rule);
		} else if ((slave.vagina > 0) && (slave.anus === 0)) {
			ProcessAVirginDildos(slave, rule);
		} else if (slave.vagina > 0) {
			ProcessNonVirginDildos(slave, rule);
			ProcessVaginalAttachments(slave, rule);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessVVirginDildos(slave, rule) {
		// apply vaginal dildos to vaginal virgins
		if ((rule.virginAccessory !== undefined) && (rule.virginAccessory !== null)) {
			if (slave.vaginalAccessory !== rule.virginAccessory) {
				slave.vaginalAccessory = rule.virginAccessory;
				const m = `${slave.slaveName} is a virgin and has been given a`;
				switch (slave.vaginalAccessory) {
					case "huge dildo":
						if (slave.vagina >= 2) {
							message(`${m} massive dildo to permanently gape ${his} cunt.`, sourceRecord.virginAccessory);
						} else {
							message(`${m} large dildo for ${his} pussy, since it must be stretched before it can accommodate a huge one.`, sourceRecord.virginAccessory);
							slave.vaginalAccessory = "large dildo";
						}
						break;

					case "long dildo":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && FutureSocieties.isActive('FSRestart')) {
							message(`Breeding regulations forbid the use of cervix penetrating dildos on marked slaves, so the virgin ${slave.slaveName} has been given a standard length dildo for ${his} pussy.`, sourceRecord.virginAccessory);
							slave.vaginalAccessory = "dildo";
						}
						break;

					case "long, large dildo":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && FutureSocieties.isActive('FSRestart')) {
							message(`Breeding regulations forbid the use of cervix penetrating dildos on marked slaves, so the virgin ${slave.slaveName} has been given a standard length large dildo for ${his} pussy.`, sourceRecord.virginAccessory);
							slave.vaginalAccessory = "large dildo";
						}
						break;

					case "long, huge dildo":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && FutureSocieties.isActive('FSRestart')) {
							message(`Breeding regulations forbid the use of cervix penetrating dildos on marked slaves, so the virgin ${slave.slaveName} has been given a standard length huge dildo for ${his} pussy.`, sourceRecord.virginAccessory);
							slave.vaginalAccessory = "huge dildo";
						} else {
							const m = `${slave.slaveName} is a virgin and has been given a`;
							if (slave.vagina >= 2) {
								message(`${m} massive and oversized dildo to permanently gape ${his} cunt.`, sourceRecord.virginAccessory);
							} else {
								message(`${m} long, large dildo for ${his} pussy, since it must be stretched before it can accommodate a huge one.`, sourceRecord.virginAccessory);
								slave.vaginalAccessory = "long, large dildo";
							}
						}
						break;

					case "none":
						message(`${slave.slaveName} is a virgin and has been instructed not to use a vaginal accessory.`, sourceRecord.virginAccessory);
						break;

					default:
						message(`${slave.slaveName} is a virgin and has been given a ${slave.vaginalAccessory} for ${his} pussy.`, sourceRecord.virginAccessory);
						break;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessAVirginDildos(slave, rule) {
		// apply vaginal dildos to anal virgins
		if ((rule.aVirginAccessory !== undefined) && (rule.aVirginAccessory !== null)) {
			if (slave.vaginalAccessory !== rule.aVirginAccessory) {
				slave.vaginalAccessory = rule.aVirginAccessory;
				const m = `${slave.slaveName} is a virgin and has been given a`;
				switch (slave.vaginalAccessory) {
					case "huge dildo":
						if (slave.vagina >= 2) {
							message(`${m} massive dildo to permanently gape ${his} cunt.`, sourceRecord.aVirginAccessory);
						} else {
							message(`${m} large dildo for ${his} pussy, since it must be stretched before it can accommodate a huge one.`, sourceRecord.aVirginAccessory);
							slave.vaginalAccessory = "large dildo";
						}
						break;

					case "long dildo":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && FutureSocieties.isActive('FSRestart')) {
							message(`Breeding regulations forbid the use of cervix penetrating dildos on marked slaves, so the virgin ${slave.slaveName} has been given a standard length dildo for ${his} pussy.`, sourceRecord.aVirginAccessory);
							slave.vaginalAccessory = "dildo";
						}
						break;

					case "long, large dildo":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && FutureSocieties.isActive('FSRestart')) {
							message(`Breeding regulations forbid the use of cervix penetrating dildos on marked slaves, so the virgin ${slave.slaveName} has been given a standard length large dildo for ${his} pussy.`, sourceRecord.aVirginAccessory);
							slave.vaginalAccessory = "large dildo";
						}
						break;

					case "long, huge dildo":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && FutureSocieties.isActive('FSRestart')) {
							message(`Breeding regulations forbid the use of cervix penetrating dildos on marked slaves, so the virgin ${slave.slaveName} has been given a standard length huge dildo for ${his} pussy.`, sourceRecord.aVirginAccessory);
							slave.vaginalAccessory = "huge dildo";
						} else {
							if (slave.vagina >= 2) {
								message(`${m} massive and oversized dildo to permanently gape ${his} cunt.`, sourceRecord.aVirginAccessory);
							} else {
								message(`${m} long, large dildo for ${his} pussy, since it must be stretched before it can accommodate a huge one.`, sourceRecord.aVirginAccessory);
								slave.vaginalAccessory = "long, large dildo";
							}
						}
						break;

					case "none":
						message(`${slave.slaveName} is a virgin and has been instructed not to use a vaginal accessory.`, sourceRecord.aVirginAccessory);
						break;

					default:
						message(`${slave.slaveName} is a virgin and has been given a ${slave.vaginalAccessory} for ${his} pussy.`, sourceRecord.aVirginAccessory);
						break;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessNonVirginDildos(slave, rule) {
		// apply vaginal dildos to non-virgins
		if ((rule.vaginalAccessory !== undefined) && (rule.vaginalAccessory !== null)) {
			if (slave.vaginalAccessory !== rule.vaginalAccessory) {
				slave.vaginalAccessory = rule.vaginalAccessory;
				switch (slave.vaginalAccessory) {
					case "huge dildo": {
						const m = `${slave.slaveName} has been given a`;
						if (slave.vagina >= 2) {
							message(`${m} massive dildo to permanently gape ${his} cunt.`, sourceRecord.vaginalAccessory);
						} else {
							message(`${m} large dildo for ${his} pussy, since it must be stretched before it can accommodate a huge one.`, sourceRecord.vaginalAccessory);
							slave.vaginalAccessory = "large dildo";
						}
						break;
					}

					case "long dildo":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && FutureSocieties.isActive('FSRestart')) {
							message(`Breeding regulations forbid the use of cervix penetrating dildos on marked slaves, so ${slave.slaveName} has been given a standard length dildo for ${his} pussy.`, sourceRecord.vaginalAccessory);
							slave.vaginalAccessory = "dildo";
						}
						break;

					case "long, large dildo":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && FutureSocieties.isActive('FSRestart')) {
							message(`Breeding regulations forbid the use of cervix penetrating dildos on marked slaves, so ${slave.slaveName} has been given a standard length large dildo for ${his} pussy.`, sourceRecord.vaginalAccessory);
							slave.vaginalAccessory = "large dildo";
						}
						break;

					case "long, huge dildo":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && FutureSocieties.isActive('FSRestart')) {
							message(`Breeding regulations forbid the use of cervix penetrating dildos on marked slaves, so ${slave.slaveName} has been given a standard length huge dildo for ${his} pussy.`, sourceRecord.vaginalAccessory);
							slave.vaginalAccessory = "huge dildo";
						} else {
							const m = `${slave.slaveName} has been given a`;
							if (slave.vagina >= 2) {
								message(`${m} massive and oversized dildo to permanently gape ${his} cunt.`, sourceRecord.vaginalAccessory);
							} else {
								message(`${m} long, large dildo for ${his} pussy, since it must be stretched before it can accommodate a huge one.`, sourceRecord.vaginalAccessory);
								slave.vaginalAccessory = "long, large dildo";
							}
						}
						break;
					case "none":
						message(`${slave.slaveName} has been instructed not to use a vaginal accessory.`, sourceRecord.vaginalAccessory);
						break;

					default:
						message(`${slave.slaveName} has been given a ${slave.vaginalAccessory} for ${his} pussy.`, sourceRecord.vaginalAccessory);
						break;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessVaginalAttachments(slave, rule) {
		// apply vaginal accessories to slaves
		if (slave.vaginalAccessory === "none" && slave.vaginalAttachment !== "none") {
			slave.vaginalAttachment = "none"; // clears dildo attachment when dildos are removed above
		} else if ((rule.vaginalAttachment !== undefined) && (rule.vaginalAttachment !== null)) {
			if (slave.vaginalAttachment !== rule.vaginalAttachment) {
				slave.vaginalAttachment = rule.vaginalAttachment;
				if (slave.vaginalAccessory !== "none") {
					switch (slave.vaginalAttachment) {
						case "none":
							message(`${slave.slaveName} has been instructed not to use an attachment for ${his} dildo.`, sourceRecord.vaginalAttachment);
							break;

						case "vibrator":
							message(`${slave.slaveName}'s dildo has been replaced with a vibrating model.`, sourceRecord.vaginalAttachment);
							break;

						case "smart vibrator":
							message(`${slave.slaveName}'s dildo has been replaced with a smart vibrating model.`, sourceRecord.vaginalAttachment);
							break;

						default:
							message(`${slave.slaveName} has been given a ${slave.vaginalAttachment}.`, sourceRecord.vaginalAttachment);
							break;
					}
				} else {
					switch (slave.vaginalAttachment) {
						case "none":
							message(`${slave.slaveName} has been instructed not to use any vaginal accessories.`, sourceRecord.vaginalAttachment);
							break;

						default:
							message(`${slave.slaveName} has been given a ${slave.vaginalAttachment}.`, sourceRecord.vaginalAttachment);
							break;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessDickAccessories(slave, rule) {
		// apply dick accessories to slave
		if (slave.dick > 0) {
			if (slave.anus === 0) {
				if ((rule.aVirginDickAccessory !== undefined) && (rule.aVirginDickAccessory !== null)) {
					if (slave.dickAccessory !== rule.aVirginDickAccessory) {
						slave.dickAccessory = rule.aVirginDickAccessory;
						if (slave.dickAccessory === "none") {
							message(`${slave.slaveName} is a virgin and has been instructed not to wear a dick accessory.`, sourceRecord.aVirginDickAccessory);
						} else {
							message(`${slave.slaveName} is a virgin and has been given a ${slave.dickAccessory} accessory for ${his} cock.`, sourceRecord.aVirginDickAccessory);
						}
					}
				}
			} else {
				if ((rule.dickAccessory !== undefined) && (rule.dickAccessory !== null)) {
					if (slave.dickAccessory !== rule.dickAccessory) {
						slave.dickAccessory = rule.dickAccessory;
						if (slave.dickAccessory === "none") {
							message(`${slave.slaveName} has been instructed not to wear a dick accessory.`, sourceRecord.aVirginDickAccessory);
						} else {
							message(`${slave.slaveName} has been given a ${slave.dickAccessory} accessory for ${his} cock.`, sourceRecord.aVirginDickAccessory);
						}
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessChastity(slave, rule) {
		// apply chastity to slave
		if (rule.chastityVagina !== undefined && rule.chastityVagina !== null) {
			if (slave.vagina > -1) {
				const shouldHaveChastity = rule.chastityVagina === 1 || (rule.chastityVagina === 2 && slave.vagina === 0);
				if (slave.chastityVagina === 0) {
					if (shouldHaveChastity) {
						slave.chastityVagina = 1;
						message(`${slave.slaveName} has been given a chastity belt to wear.`, sourceRecord.chastityVagina);
					}
				} else {
					if (!shouldHaveChastity) {
						slave.chastityVagina = 0;
						message(`${slave.slaveName}'s vaginal chastity has been removed.`, sourceRecord.chastityVagina);
					}
				}
			}
		}
		if (rule.chastityPenis !== undefined && rule.chastityPenis !== null) {
			if (slave.dick > 0) {
				if (slave.chastityPenis !== rule.chastityPenis) {
					slave.chastityPenis = rule.chastityPenis;
					if (rule.chastityPenis === 1) {
						message(`${slave.slaveName} has been given a chastity cage to wear.`, sourceRecord.chastityPenis);
					} else {
						message(`${slave.slaveName}'s chastity cage has been removed.`, sourceRecord.chastityPenis);
					}
				}
			}
		}
		if (rule.chastityAnus !== undefined && rule.chastityAnus !== null) {
			const shouldHaveChastity = rule.chastityAnus === 1 || (rule.chastityAnus === 2 && slave.anus === 0);
			if (slave.chastityAnus === 0) {
				if (shouldHaveChastity) {
					slave.chastityAnus = 1;
					message(`${slave.slaveName} has been given anal chastity to wear.`, sourceRecord.chastityAnus);
				}
			} else {
				if (!shouldHaveChastity) {
					slave.chastityAnus = 0;
					message(`${slave.slaveName}'s anal chastity has been removed.`, sourceRecord.chastityAnus);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessShoes(slave, rule) {
		// apply shoes to slave
		if ((rule.shoes !== undefined) && (rule.shoes !== null) && (!rule.choosesOwnClothes)) {
			if (slave.shoes !== rule.shoes) {
				if (hasAnyLegs(slave)) {
					slave.shoes = rule.shoes;
					message(`${slave.slaveName}'s shoes have been set to ${slave.shoes}.`, sourceRecord.shoes);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessBellyAccessories(slave, rule) {
		// apply belly accessories to slave
		if ((rule.bellyAccessory !== undefined) && (rule.bellyAccessory !== null)) {
			if (slave.bellyAccessory !== rule.bellyAccessory) {
				if ((slave.belly >= 1500 || slave.weight >= 130) && App.Data.misc.fakeBellies.includes(rule.bellyAccessory)) {
					message(`${slave.slaveName}'s natural belly is too big to properly wear an empathy belly.`, sourceRecord.bellyAccessory);
					slave.bellyAccessory = "none";
				} else {
					slave.bellyAccessory = rule.bellyAccessory;
					if (slave.bellyAccessory === "none") {
						message(`${slave.slaveName} has been instructed not to wear a torso accessory.`, sourceRecord.bellyAccessory);
					} else {
						message(`${slave.slaveName} has been given ${slave.bellyAccessory} to wear.`, sourceRecord.bellyAccessory);
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessArmAccessory(slave, rule) {
		if (rule.armAccessory !== undefined && rule.armAccessory !== null && hasAnyArms(slave) && slave.armAccessory !== rule.armAccessory) {
			slave.armAccessory = rule.armAccessory;
			message(`${slave.slaveName}'s arm accessory was set to ${rule.armAccessory}.`, sourceRecord.armAccessory);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessLegAccessory(slave, rule) {
		if (rule.legAccessory !== undefined && rule.legAccessory !== null && hasAnyLegs(slave) && slave.legAccessory !== rule.legAccessory) {
			slave.legAccessory = rule.legAccessory;
			message(`${slave.slaveName}'s leg accessory was set to ${rule.legAccessory}.`, sourceRecord.legAccessory);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessAnalAccessories(slave, rule) {
		// apply buttplugs and buttplug accessories to slave
		if (slave.chastityAnus !== 1) {
			if (slave.anus === 0) {
				ProcessAnalVirginButtplugs(slave, rule);
			} else {
				ProcessNonVirginButtplugs(slave, rule);
			}
		}
		ProcessButtplugAttachments(slave, rule);
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessAnalVirginButtplugs(slave, rule) {
		// apply buttplugs to virgins
		if ((rule.aVirginButtplug !== undefined) && (rule.aVirginButtplug !== null)) {
			if (slave.buttplug !== rule.aVirginButtplug) {
				slave.buttplug = rule.aVirginButtplug;
				const m = `${slave.slaveName} is an anal virgin and has been given a`;
				switch (slave.buttplug) {
					case "huge plug":
						if (slave.anus >= 2) {
							message(`${m} massive plug to permanently gape ${his} asshole.`, sourceRecord.aVirginButtplug);
						} else {
							slave.buttplug = "large plug";
							message(`${m} large buttplug for ${his} asshole, since it must be stretched before it can accommodate a huge one.`, sourceRecord.aVirginButtplug);
						}
						break;

					case "long plug":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && FutureSocieties.isActive('FSRestart')) {
							message(`Breeding regulations forbid the use of anal plugs that can damage a growing fetus on marked slaves, so the anal virgin ${slave.slaveName} has been given a standard length plug for ${his} anus.`, sourceRecord.aVirginButtplug);
							slave.buttplug = "plug";
						}
						break;

					case "long, large plug":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && FutureSocieties.isActive('FSRestart')) {
							message(`Breeding regulations forbid the use of anal plugs that can damage a growing fetus on marked slaves, so the anal virgin ${slave.slaveName} has been given a standard length large plug for ${his} anus.`, sourceRecord.aVirginButtplug);
							slave.buttplug = "large plug";
						}
						break;

					case "long, huge plug":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && FutureSocieties.isActive('FSRestart')) {
							message(`Breeding regulations forbid the use of anal plugs that can damage a growing fetus on marked slaves, so the anal virgin ${slave.slaveName} has been given a standard length huge plug for ${his} anus.`, sourceRecord.aVirginButtplug);
							slave.buttplug = "huge plug";
						} else {
							const m = `${slave.slaveName} is an anal virgin and has been given a`;
							if (slave.anus >= 2) {
								message(`${m} massive and oversized plug to permanently gape ${his} asshole.`, sourceRecord.aVirginButtplug);
							} else {
								message(`${m} long, large buttplug for ${his} asshole, since it must be stretched before it can accommodate a huge one.`, sourceRecord.aVirginButtplug);
								slave.buttplug = "long, large plug";
							}
						}
						break;

					case "none":
						message(`${slave.slaveName} is an anal virgin and has been instructed not to use an anal accessory.`, sourceRecord.aVirginButtplug);
						break;

					default:
						message(`${slave.slaveName} is an anal virgin and has been given a ${slave.buttplug} for ${his} asshole.`, sourceRecord.aVirginButtplug);
						break;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessNonVirginButtplugs(slave, rule) {
		// apply buttplugs to non-virgins
		if ((rule.buttplug !== undefined) && (rule.buttplug !== null)) {
			if (slave.buttplug !== rule.buttplug) {
				slave.buttplug = rule.buttplug;
				const m = `${slave.slaveName} has been given a`;
				switch (slave.buttplug) {
					case "huge plug":
						if (slave.anus >= 2) {
							message(`${m} massive plug to permanently gape ${his} asshole.`, sourceRecord.buttplug);
						} else {
							slave.buttplug = "large plug";
							message(`${m} large buttplug for ${his} asshole, since it must be stretched before it can accommodate a huge one.`, sourceRecord.buttplug);
						}
						break;

					case "long plug":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && FutureSocieties.isActive('FSRestart')) {
							message(`Breeding regulations forbid the use of anal plugs that can damage a growing fetus on marked slaves, so ${slave.slaveName} has been given a standard length plug for ${his} anus.`, sourceRecord.buttplug);
							slave.buttplug = "plug";
						}
						break;

					case "long, large plug":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && FutureSocieties.isActive('FSRestart')) {
							message(`Breeding regulations forbid the use of anal plugs that can damage a growing fetus on marked slaves, so ${slave.slaveName} has been given a standard length large plug for ${his} anus.`, sourceRecord.buttplug);
							slave.buttplug = "large plug";
						}
						break;

					case "long, huge plug":
						if (slave.breedingMark === 1 && V.propOutcome === 1 && V.eugenicsFullControl !== 1 && FutureSocieties.isActive('FSRestart')) {
							message(`Breeding regulations forbid the use of anal plugs that can damage a growing fetus on marked slaves, so ${slave.slaveName} has been given a standard length huge plug for ${his} anus.`, sourceRecord.buttplug);
							slave.buttplug = "huge plug";
						} else {
							const m = `${slave.slaveName} has been given a`;
							if (slave.anus >= 2) {
								message(`${m} massive and oversized plug to permanently gape ${his} asshole.`, sourceRecord.buttplug);
							} else {
								message(`${m} long, large buttplug for ${his} asshole, since it must be stretched before it can accommodate a huge one.`, sourceRecord.buttplug);
								slave.buttplug = "long, large plug";
							}
						}
						break;

					case "none":
						message(`${slave.slaveName} has been instructed not to use an anal accessory.`, sourceRecord.buttplug);
						break;

					default:
						message(`${slave.slaveName} has been given a ${slave.buttplug} for ${his} asshole.`, sourceRecord.buttplug);
						break;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessButtplugAttachments(slave, rule) {
		// apply buttplug accessories to slaves
		if (slave.buttplug === "none") {
			if (slave.buttplugAttachment !== "none") {
				slave.buttplugAttachment = "none"; // clears buttplug attachments when buttplugs are removed above
			} // otherwise ignores the rule since the slave is not wearing a buttplug
		} else if ((rule.buttplugAttachment !== undefined) && (rule.buttplugAttachment !== null)) {
			if (slave.buttplugAttachment !== rule.buttplugAttachment) {
				slave.buttplugAttachment = rule.buttplugAttachment;
				switch (slave.buttplugAttachment) {
					case "none":
						message(`${slave.slaveName} has been instructed not to use an attachment for ${his} anal accessory.`, sourceRecord.buttplugAttachment);
						break;

					default:
						message(`${slave.slaveName} has been given a ${slave.buttplugAttachment} to attach to ${his} buttplug.`, sourceRecord.buttplugAttachment);
						break;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessBellyImplant(slave, rule) {
		// Here is belly implant size control, it's used in Surgery Degradation passage to set up devotion and trust changes.
		// silent calls to surgery degradation have been replaced with a js function, which is less hacky
		if ((rule.bellyImplantVol !== undefined) && slave.bellyImplant >= 0 && rule.bellyImplantVol >= 0) {
			if (slave.health.condition > -10) {
				let diff = rule.bellyImplantVol - slave.bellyImplant;
				if (diff >= 5000 && slave.bellyPain === 0 && slave.health.condition > 50) {
					message(`${slave.slaveName}'s belly is way too small, so ${he} has been directed to have intensive belly implant filling procedures throughout this week.`, sourceRecord.bellyImplantVol);
					slave.bellyImplant += 1000;
					slave.bellyPain += 2;
					BellySurgery(slave, diff);
				} else if (diff >= 500 && slave.bellyPain < 2) {
					message(`${slave.slaveName}'s belly has not reached the desired size, so ${he} has been directed to have belly implant filling procedures throughout this week.`, sourceRecord.bellyImplantVol);
					slave.bellyImplant += 500;
					slave.bellyPain += 1;
					BellySurgery(slave, diff);
				} else if (diff <= -5000) {
					message(`${slave.slaveName}'s belly is way too big, so ${he} has been directed to have intensive belly implant draining procedures throughout this week.`, sourceRecord.bellyImplantVol);
					slave.bellyImplant -= 1000;
					BellySurgery(slave, diff);
				} else if (diff <= -500) {
					message(`${slave.slaveName}'s belly is too big, so ${he} has been directed to have belly implant draining procedures throughout this week.`, sourceRecord.bellyImplantVol);
					slave.bellyImplant -= 500;
					BellySurgery(slave, diff);
				}
			} else {
				message(`${slave.slaveName} is not healthy enough to safely adjust ${his} belly implant.`, sourceRecord.bellyImplantVol);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {number} volume
	 */
	function BellySurgery(slave, volume) {
		// this is a port of the belly implant portion of surgeryDegradation.tw
		// that way, we don't have to use ugly hacks
		// the original still exists, and may be worth replacing
		if (volume > 0) { // bellyUp
			SetBellySize(slave);
			if (slave.bellyPain === 1) {
				if (slave.devotion > 50) {
					slave.devotion += 4;
				} else if (slave.devotion >= -20) {
					slave.trust -= 5;
				} else {
					slave.trust -= 10;
					slave.devotion -= 5;
				}
			} else if (slave.bellyPain === 2) {
				if (slave.devotion > 50) {
					slave.devotion += 2;
				} else if (slave.devotion >= -20) {
					slave.trust -= 7;
				} else {
					slave.trust -= 12;
					slave.devotion -= 7;
				}
			}
		} else { // bellyDown
			if (slave.bellyImplant < 0) {
				slave.bellyImplant = 0;
			}
			SetBellySize(slave);
			if (slave.devotion > 50) {
				slave.devotion += 3;
				slave.trust += 3;
			} else if (slave.devotion >= -20) {
				slave.trust += 2;
			} else {
				slave.devotion += 1;
				slave.trust -= 10;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessContraceptives(slave, rule) {
		if ((rule.preg !== undefined) && (rule.preg !== null)) {
			if (rule.preg === true && slave.preg === 0 && slave.pubertyXX === 1) {
				message(`${slave.slaveName} is being given contraceptives.`, sourceRecord.preg);
				slave.preg = -1;
			} else if (slave.preg === -1 && rule.preg === false) {
				message(`${slave.slaveName} is no longer being put on contraceptives.`, sourceRecord.preg);
				slave.preg = 0;
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessAbortions(slave, rule) {
		function conditionalTermination(slave, predicate) {
			let res = false;
			if (slave.preg < 4) {
				let WL = slave.womb.length;
				for (let index = 0; index < WL; index++) {
					if (predicate(slave.womb[index])) {
						WombRemoveFetus(slave, index);
						index--;
						WL--;
						res = true;
					}
				}
				if (WL === 0) {
					TerminatePregnancy(slave);
					actX(slave, "abortions");
				}
			}
			return res;
		}

		if ((rule.abortion !== undefined) && (rule.abortion !== null)) {
			for (const ar of rule.abortion) {
				if (ar === "all") {
					if (slave.preg < 4 || (slave.fetish === Fetish.MINDBROKEN || slave.fuckdoll !== 0)) {
						message(`${slave.slaveName}'s pregnancy has been terminated.`, sourceRecord.abortion);
					} else {
						const m = `${slave.slaveName}'s pregnancy has been terminated;`;
						if (slave.sexualFlaw === "breeder") {
							message(`${m} it broke ${his} mind.`, sourceRecord.abortion);
							applyMindbroken(slave);
						} else if (slave.devotion < -50) {
							message(`${m} ${he} did not handle it well.`, sourceRecord.abortion);
							slave.trust -= 10;
							slave.devotion -= 25;
						} else if (slave.devotion < -20) {
							message(`${m} ${he} did not handle it well.`, sourceRecord.abortion);
							slave.trust -= 10;
							slave.devotion -= 10;
						} else if (slave.fetish === "pregnancy") {
							message(`${m} ${he} did not handle it well.`, sourceRecord.abortion);
							let fetishModifier = slave.fetishStrength / 2;
							slave.devotion -= fetishModifier;
							slave.trust -= fetishModifier;
						} else if (slave.devotion <= 20) {
							message(`${m} ${he} did not handle it well.`, sourceRecord.abortion);
							slave.trust -= 10;
							slave.devotion -= 5;
						} else if (slave.devotion <= 50) {
							message(`${m} ${he} did not handle it well.`, sourceRecord.abortion);
							slave.trust -= 10;
						} else {
							message(`${m} it had little mental effect.`, sourceRecord.abortion);
						}
					}

					if (rulesDemandContraceptives(slave, V.defaultRules)) {
						slave.preg = -1;
					} else {
						slave.preg = 0;
					}
					if (slave.abortionTat > -1) {
						slave.abortionTat++;
						cashX(forceNeg(V.modCost), "slaveMod", slave);
					}
					TerminatePregnancy(slave);
					actX(slave, "abortions");
				} else if (ar === "male") {
					if (conditionalTermination(slave, fetus => fetus.genetics.gender === "XY")) {
						message(`${slave.slaveName}'s male fetuses have been terminated.`, sourceRecord.abortion);
					}
				} else if (ar === "female") {
					if (conditionalTermination(slave, fetus => fetus.genetics.gender === "XX")) {
						message(`${slave.slaveName}'s female fetuses have been terminated.`, sourceRecord.abortion);
					}
				} else if (ar.startsWith("race:")) { // ar is the race name in the notation "race:<lowercase_race_name>"
					const race = ar.substr("race:".length);
					if (conditionalTermination(slave, fetus => fetus.genetics.race === race)) {
						message(`${slave.slaveName}'s ${race} fetuses have been terminated.`, sourceRecord.abortion);
					}
				}
				SetBellySize(slave);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessDrugs(slave, rule) {
		// First we check AssetGrowthDrugs, then if 1. no growth targets or 2. targets have been hit, we check other drugs.
		if (slave.indentureRestrictions === 2) {
			return;
		}
		if ((slave.drugs === "super fertility drugs" || slave.drugs === "fertility drugs") && isFertile(slave)) {
			message(`${slave.slaveName} is on ${slave.drugs} and will not be considered for drug enhancement until that regime is complete.`);
			ProcessOtherDrugs(slave, rule);
			return;
		} else if (
			[
				rule.growth.boobs,
				rule.growth.butt,
				rule.growth.lips,
				rule.growth.dick,
				rule.growth.balls
			].every(r => r === null) // Check if all objects in list equal null
		) {
			ProcessOtherDrugs(slave, rule);
			return;
		}

		// Asset Growth
		const growthDrugs = new Set(["breast injections", "breast redistributors", "butt injections", "butt redistributors", "hyper breast injections", "hyper butt injections", "hyper penis enhancement", "hyper testicle enhancement", "intensive breast injections", "intensive butt injections", "intensive penis enhancement", "intensive testicle enhancement", "lip atrophiers", "lip injections", "penis atrophiers", "penis enhancement", "testicle atrophiers", "testicle enhancement"]);

		// WARNING: property names in growDrugs, and shrinkDrugs must be identical and this fact is used by the drugs() below
		/** @type {Record<FC.SizableBodyPart, FC.Drug>} */
		const growDrugs = {
			lips: "lip injections",
			boobs: "breast injections",
			butt: "butt injections",
			dick: null,
			balls: null
		};

		if (slave.dick > 0) {
			growDrugs.dick = "penis enhancement";
		}
		if (slave.balls > 0) {
			growDrugs.balls = "testicle enhancement";
		}

		if (V.arcologies[0].FSAssetExpansionistResearch === 1 && rule.hyper_drugs === 1) {
			growDrugs.boobs = "hyper breast injections";
			growDrugs.butt = "hyper butt injections";
			if (slave.dick > 0) {
				growDrugs.dick = "hyper penis enhancement";
			}
			if (slave.balls > 0) {
				growDrugs.balls = "hyper testicle enhancement";
			}
		} else if (rule.growth.intensity && slave.indentureRestrictions < 2 && slave.health.condition > 0) {
			growDrugs.boobs = "intensive breast injections";
			growDrugs.butt = "intensive butt injections";
			if (slave.dick > 0) {
				growDrugs.dick = "intensive penis enhancement";
			}
			if (slave.balls > 0) {
				growDrugs.balls = "intensive testicle enhancement";
			}
		}

		/** @type {Record<FC.SizableBodyPart, FC.Drug>} */
		const shrinkDrugs = {
			lips: null,
			boobs: null,
			butt: null,
			dick: null,
			balls: null
		};

		if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
			shrinkDrugs.lips = "lip atrophiers";
			if (slave.dick > 0) {
				shrinkDrugs.dick = "penis atrophiers";
			}
			if (slave.balls > 0) {
				shrinkDrugs.balls = "testicle atrophiers";
			}
			if (slave.weight < 100) {
				shrinkDrugs.boobs = "breast redistributors";
				shrinkDrugs.butt = "butt redistributors";
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {FC.SizableBodyPart} asset
		 * @param {FC.RA.ExpressiveNumericTarget} target
		 * @param {{drug: FC.Drug, weight: number, source:string}[]} priorities
		 * @param {number} step
		 * @param {object} source
		 */
		function drugs(slave, asset, target, priorities, step, source) {
			if (target === null || (growDrugs[asset] === null && shrinkDrugs[asset] === null)) {
				return;
			}

			if (typeof target.val === 'string') {
				const interpreter = new Function("slave", "return (" + target.val + ");");
				const newVal = runWithReadonlyProxy(() => interpreter(createReadonlyProxy(slave)));
				if (V.debugMode) {
					console.log(asset + " expression for '" + slave.slaveName + "' resolves to " + newVal.toString());
				}
				drugsImpl(slave, asset, {cond: target.cond, val: newVal}, priorities, step, source.cond);
			} else {
				drugsImpl(slave, asset, {cond: target.cond, val: target.val}, priorities, step, source.cond);
			}
		}

		/**
		 * @param {App.Entity.SlaveState} slave
		 * @param {FC.SizableBodyPart} asset
		 * @param {FC.RA.NumericTarget} target
		 * @param {{drug: FC.Drug, weight: number, source:string}[]} priorities
		 * @param {number} step
		 * @param {string} source
		 */
		function drugsImpl(slave, asset, target, priorities, step, source) {
			const flesh = App.Medicine.fleshSize(slave, asset);
			if (growDrugs[asset] !== null && App.RA.shallGrow(flesh, target, step) && App.Medicine.maxAssetSize(asset) > slave[asset]) {
				priorities.push({
					drug: growDrugs[asset], weight: 1.0 - (flesh / target.val), source
				});
			} else if (shrinkDrugs[asset] !== null && App.RA.shallShrink(flesh, target, step)) {
				priorities.push({
					drug: shrinkDrugs[asset], weight: flesh / target.val - 1.0, source
				});
			}
		}

		/** @type {{drug: FC.Drug, weight: number, source:string}[]} */
		let priorities = [];
		drugs(slave, "boobs", rule.growth.boobs, priorities, 200, sourceRecord.growth.boobs);
		drugs(slave, "butt", rule.growth.butt, priorities, 1, sourceRecord.growth.butt);
		drugs(slave, "lips", rule.growth.lips, priorities, 1, sourceRecord.growth.lips);
		drugs(slave, "dick", rule.growth.dick, priorities, 1, sourceRecord.growth.dick);
		drugs(slave, "balls", rule.growth.balls, priorities, 1, sourceRecord.growth.balls);

		if (priorities.length > 0) {
			const action = priorities.reduce((acc, cur) => (acc.weight > cur.weight) ? acc : cur);
			if (slave.drugs !== action.drug) {
				slave.drugs = action.drug;
				let m = `${slave.slaveName} has been put on ${slave.drugs}, since `;
				if (action.drug.startsWith("intensive")) {
					m += `${he}'s healthy enough to take them, and `;
				}
				if (priorities.length > 1) {
					m += `that part of ${his} body is `;
					if (!isNaN(action.weight)) {
						m += `${Math.trunc(action.weight * 100)}% `;
					}
					if (action.weight < 1) {
						m += "below ";
					} else {
						m += "above ";
					}
					m += "the targeted size.";
				} else {
					m += `that is the only part of ${his} body that does not meet the targeted size.`;
				}
				message(m, action.source);
			}
		} else if (slave.drugs !== rule.drug) {
			if (growthDrugs.has(slave.drugs)) {
				message(`${slave.slaveName}'s body has met all relevant growth targets, so ${his} pharmaceutical regime has been ended.`, sourceRecord.drug);
				if (rule.drug === null) {
					slave.drugs = "no drugs";
					message(`${slave.slaveName} has been defaulted to ${slave.drugs}`, sourceRecord.drug);
				}
			}
			ProcessOtherDrugs(slave, rule);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessOtherDrugs(slave, rule) {
		// Other Drugs
		if (rule.drug !== undefined && rule.drug !== null && slave.drugs !== rule.drug) {
			let flag = true;
			switch (rule.drug) {
				case "anti-aging cream":
					if (V.arcologies[0].FSYouthPreferentialistResearch !== 1 || slave.visualAge < 18) {
						flag = false;
					}
					break;

				case "growth stimulants":
					if (V.growthStim !== 1 || !canImproveHeight(slave)) {
						flag = false;
					}
					break;

				case "sag-B-gone":
					if (V.purchasedSagBGone !== 1 || (!(slave.boobs > 250 && slave.boobShape !== "saggy"))) {
						flag = false;
					}
					break;

				case "female hormone injections":
					if (!((slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart')) && (slave.ovaries === 1 || slave.mpreg === 1) && slave.pubertyXX === 0)) {
						flag = false;
					}
					break;

				case "male hormone injections":
					if (!((slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart')) && slave.balls > 0 && slave.pubertyXY === 0)) {
						flag = false;
					}
					break;

				case "psychosuppressants":
					if (!(slave.intelligence > -100 && slave.indentureRestrictions < 1)) {
						flag = false;
					}
					break;

				case "psychostimulants":
					if (V.arcologies[0].FSSlaveProfessionalismResearch !== 1 || !canImproveIntelligence(slave)) {
						flag = false;
					}
					break;

				case "breast injections":
					if (slave.boobs >= 50000) {
						flag = false;
					}
					break;

				case "hyper breast injections":
					if (V.arcologies[0].FSAssetExpansionistResearch !== 1 || slave.boobs >= 50000) {
						flag = false;
					}
					break;

				case "nipple enhancers":
					if (!(["inverted", "partially inverted", "cute", "tiny", "puffy", "flat"].includes(slave.nipples))) {
						flag = false;
					}
					break;
				case "breast redistributors":
					if (V.arcologies[0].FSSlimnessEnthusiastResearch !== 1 || (slave.boobs - slave.boobsImplant <= 100)) {
						flag = false;
					}
					break;

				case "butt injections":
					if (slave.butt >= 9) {
						flag = false;
					}
					break;

				case "hyper butt injections":
					if (V.arcologies[0].FSAssetExpansionistResearch !== 1 || slave.butt >= 20) {
						flag = false;
					}
					break;

				case "nipple atrophiers":
					if (V.arcologies[0].FSSlimnessEnthusiastResearch !== 1 || !(["cute", "huge", "puffy"].includes(slave.nipples))) {
						flag = false;
					}
					break;

				case "butt redistributors":
					if (V.arcologies[0].FSSlimnessEnthusiastResearch !== 1 || slave.butt - slave.buttImplant <= 0) {
						flag = false;
					}
					break;

				case "lip injections":
					if (!(slave.lips <= 95 || (slave.lips <= 85 && V.seeExtreme !== 1))) {
						flag = false;
					}
					break;

				case "lip atrophiers":
					if (V.arcologies[0].FSSlimnessEnthusiastResearch !== 1 || slave.lips - slave.lipsImplant <= 0) {
						flag = false;
					}
					break;

				case "super fertility drugs":
					if ((V.seeHyperPreg !== 1 || V.superFertilityDrugs !== 1) || !(slave.indentureRestrictions < 1 && (slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart')))) {
						flag = false;
					}
					break;

				case "penis enhancement":
					if (!((slave.dick.isBetween(0, 10)) || slave.clit < 5)) {
						flag = false;
					}
					break;

				case "hyper penis enhancement":
					if (V.arcologies[0].FSAssetExpansionistResearch !== 1 || !((slave.dick.isBetween(0, 31)) || slave.clit < 5)) {
						flag = false;
					}
					break;

				case "penis atrophiers":
					if (V.arcologies[0].FSSlimnessEnthusiastResearch !== 1 || slave.dick <= 1) {
						flag = false;
					}
					break;

				case "testicle enhancement":
					if (slave.balls <= 0) {
						flag = false;
					}
					break;

				case "hyper testicle enhancement":
					if (V.arcologies[0].FSAssetExpansionistResearch !== 1 || slave.balls <= 0) {
						flag = false;
					}
					break;

				case "testicle atrophiers":
					if (V.arcologies[0].FSSlimnessEnthusiastResearch !== 1 || slave.balls <= 1) {
						flag = false;
					}
					break;

				case "clitoris atrophiers":
					if (V.arcologies[0].FSSlimnessEnthusiastResearch !== 1 || slave.clit <= 0) {
						flag = false;
					}
					break;

				case "labia atrophiers":
					if (V.arcologies[0].FSSlimnessEnthusiastResearch !== 1 || slave.labia <= 0) {
						flag = false;
					}
					break;

				case "appetite suppressors":
					if (V.arcologies[0].FSSlimnessEnthusiastResearch !== 1 || slave.weight <= -95) {
						flag = false;
					}
					break;

				case "priapism agents":
					if (slave.dick === 0 || slave.dick > 10 || slave.chastityPenis === 1 || (canAchieveErection(slave))) {
						flag = false;
					}
					break;
			}
			if (flag) {
				slave.drugs = rule.drug;
				message(`${slave.slaveName} has been put on ${slave.drugs}.`, sourceRecord.drug);
			} else if (slave.drugs !== "no drugs") {
				slave.drugs = "no drugs";
				message(`${slave.slaveName} cannot benefit from ${his} assigned drug and has been defaulted to ${slave.drugs}`, sourceRecord.drug);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessEnema(slave, rule) {
		if ((rule.inflationType !== undefined) && (rule.inflationType !== null)) {
			if (slave.inflationType !== rule.inflationType) {
				if ((slave.inflationType === "curative" && slave.health.condition > 90) || (slave.inflationType === "tightener" && slave.anus <= 1 && slave.vagina <= 1)) {
					message(`${slave.slaveName} cannot benefit from ${his} assigned enema and has been defaulted to none.`, sourceRecord.inflationType);
					deflate(slave);
				} else if ((rule.inflationType === "curative" && slave.health.condition > 90) || (rule.inflationType === "tightener" && slave.anus <= 1 && slave.vagina <= 1)) {
					// empty block
				} else {
					message(`${slave.slaveName}'s current enema regimen has been set to ${rule.inflationType}.`, sourceRecord.inflationType);
					slave.inflation = 1;
					slave.inflationType = rule.inflationType;
					slave.inflationMethod = 2;
					slave.milkSource = 0;
					slave.cumSource = 0;
					SetBellySize(slave);
				}
			}
			if (slave.inflationType !== "none" && slave.inflation > 1 && slave.health.condition < -50) {
				message(`${slave.slaveName}'s current enema regimen risks death, so it has been reduced to a less threatening level.`, sourceRecord.inflationType);
				slave.inflation = 1;
				SetBellySize(slave);
			} else if (slave.inflation > 1 && (slave.bellyPreg >= 1500 || slave.bellyImplant >= 1500)) {
				message(`${slave.slaveName}'s current enema is too much for ${his} body, so it has been reduced.`, sourceRecord.inflationType);
				slave.inflation = 1;
				SetBellySize(slave);
			} else if (slave.inflationType === "none") {
				deflate(slave);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessPit(slave, rule) {
		if (V.pit) {
			if (rule.arenaRules !== undefined && rule.arenaRules !== null) {
				if (rule.arenaRules === 0) {
					if (App.Entity.facilities.pit.job("trainee").isEmployed(slave)) {
						removeJob(slave, Job.ARENA, true);
						message(`${slave.slaveName} has been removed from the arena.`, sourceRecord.arenaRules);
					}
				} else {
					if (App.Entity.facilities.pit.job("trainee").checkRequirements(slave).length !== 0) {
						removeJob(slave, Job.ARENA, true);
						message(`${slave.slaveName} is not eligible to train.`, sourceRecord.arenaRules);
					} else if (!App.Entity.facilities.pit.job("trainee").isEmployed(slave)) {
						assignJob(slave, Job.ARENA);
						message(`${slave.slaveName} has been automatically assigned to train at the arena.`, sourceRecord.arenaRules);
					}
				}
			}
			if (rule.pitRules !== undefined && rule.pitRules !== null) {
				if (rule.pitRules === 0) {
					if (App.Entity.facilities.pit.job("fighter").isEmployed(slave)) {
						removeJob(slave, Job.PIT, true);
						message(`${slave.slaveName} has been removed from the pit.`, sourceRecord.pitRules);
					}
				} else {
					if (App.Entity.facilities.pit.job("fighter").checkRequirements(slave).length !== 0) {
						removeJob(slave, Job.PIT, true);
						message(`${slave.slaveName} is not eligible to fight.`, sourceRecord.pitRules);
					} else if (!App.Entity.facilities.pit.job("fighter").isEmployed(slave)) {
						assignJob(slave, Job.PIT);
						message(`${slave.slaveName} has been automatically assigned to fight in the pit.`, sourceRecord.pitRules);
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessDiet(slave, rule) {
		/* Here the slave's diets are processed, with the following priorities:
		1. Attractive Weight
		2. Weight Based Rule
		3. Muscle Rule
		4. Specific Diet Rule
		?. TODO: appetite suppressors
		*/

		function weightRule(slave, rule) {
			if (rule.diet === "attractive") {
				if (((slave.weight > 95) || ((slave.weight > 30) && (slave.hips < 2)))) {
					if (slave.diet !== "restricted") {
						slave.diet = "restricted";
						message(`${slave.slaveName} is unreasonably fat so ${his} diet has been set to restricted.`, sourceRecord.diet);
					}
					dietPills(slave);
				} else if (((slave.weight < -95) || ((slave.weight < -30) && (slave.hips > -2)))) {
					if (slave.diet !== "fattening") {
						slave.diet = "fattening";
						message(`${slave.slaveName} is unreasonably skinny so ${his} diet has been set to fattening.`, sourceRecord.diet);
						dietPills(slave);
					}
				} else if (["restricted", "fattening"].includes(slave.diet)) {
					message(`${slave.slaveName} is at an acceptable weight, so ${his} diet has been normalized.`, sourceRecord.diet);
					slave.diet = "healthy";
					dietPills(slave);
					muscleRule(slave, rule);
				} else {
					muscleRule(slave, rule);
				}
			} else {
				if (slave.weight > rule.weight.max) {
					if (slave.diet !== "restricted") {
						slave.diet = "restricted";
						message(`${slave.slaveName} is too fat so ${his} diet has been set to restricted.`, sourceRecord.weight.max);
					}
					dietPills(slave);
				} else if (slave.weight < rule.weight.min) {
					if (slave.diet !== "fattening") {
						slave.diet = "fattening";
						message(`${slave.slaveName} is too skinny so ${his} diet has been set to fattening.`, sourceRecord.weight.min);
						dietPills(slave);
					}
				} else if (["restricted", "fattening"].includes(slave.diet)) {
					message(`${slave.slaveName} is at the target weight, so ${his} diet has been normalized.`, [sourceRecord.weight.max, sourceRecord.weight.min]);
					slave.diet = "healthy";
					dietPills(slave);
					muscleRule(slave, rule);
				} else {
					muscleRule(slave, rule);
				}
			}
		}

		function muscleRule(slave, rule) {
			if (!isAmputee(slave) && App.RA.shallShrink(slave.muscles, rule.muscles, 8)) {
				if (slave.diet !== "slimming") {
					slave.diet = "slimming";
					message(`${slave.slaveName} has been put on a slimming exercise regime.`, sourceRecord.muscles.val);
				}
			} else if (!isAmputee(slave) && App.RA.shallGrow(slave.muscles, rule.muscles, 2)) {
				if (slave.diet !== "muscle building") {
					slave.diet = "muscle building";
					message(`${slave.slaveName} has been put on a muscle building exercise regime.`, sourceRecord.muscles.val);
				}
			} else if (!isAmputee(slave) && ["slimming", "muscle building"].includes(slave.diet)) {
				message(`${slave.slaveName} is at the target musculature, so ${his} diet has been normalized.`, sourceRecord.diet);
				dietRule(slave, rule);
			} else {
				dietRule(slave, rule);
			}
		}

		function dietRule(slave, rule) {
			if (rule.diet === "healthy" && slave.diet !== "healthy") {
				slave.diet = "healthy";
				message(`${slave.slaveName} has been assigned to a healthy diet.`, sourceRecord.diet);
			} else if ((slave.boobs >= 1600) && (slave.muscles > 5) && (slave.diet === "muscle building") && ((rule.muscles === null) || (rule.muscles.val < 5))) {
				slave.diet = "healthy";
				message(`${slave.slaveName} has huge boobs, but ${he} already has the back muscles to bear them, so ${he}'s been assigned to stop working out so hard.`, sourceRecord.diet);
			} else if ((rule.dietGrowthSupport === 1) && ((slave.drugs === "breast injections") || (slave.drugs === "butt injections")) && (slave.weight <= 95)) {
				if (slave.diet !== "fattening") {
					slave.diet = "fattening";
					message(`${slave.slaveName} is on drugs designed to expand major body parts, so ${he}'s been put on a fattening diet to provide ${his} body as much fuel for growth as possible.`, sourceRecord.diet);
				}
			} else if (rule.diet === "XX") {
				if (slave.diet !== "XX") {
					slave.diet = "XX";
					message(`${slave.slaveName} has been put on a diet that favors feminine development.`, sourceRecord.diet);
				}
			} else if (rule.diet === "XY") {
				if (slave.diet !== "XY") {
					slave.diet = "XY";
					message(`${slave.slaveName} has been put on a diet that favors masculine development.`, sourceRecord.diet);
				}
			} else if (rule.diet === "XXY") {
				if (slave.balls > 0 && (slave.ovaries === 1 || slave.mpreg === 1)) {
					if (slave.diet !== "XXY") {
						slave.diet = "XXY";
						message(`${slave.slaveName} has been put on a diet that enhances a herm's unique sexuality.`, sourceRecord.diet);
					}
				} else {
					if (slave.diet !== "healthy") {
						slave.diet = "healthy";
						message(`${slave.slaveName} has been put on a standard diet since ${he} is not a hermaphrodite.`, sourceRecord.diet);
					}
				}
			} else if (V.dietCleanse === 1 && (rule.diet === "cleansing")) {
				if (slave.health.condition < 90 || slave.chem >= 10) {
					if (slave.diet !== "cleansing") {
						slave.diet = "cleansing";
						message(`${slave.slaveName} has been put on a diet of cleansers.`, sourceRecord.diet);
					}
				} else {
					if (slave.diet !== "healthy") {
						slave.diet = "healthy";
						message(`${slave.slaveName} has been put on a standard diet since ${he} is already in good health.`, sourceRecord.diet);
					}
				}
			} else if (rule.diet === "fertility") {
				if ((isFertile(slave) && slave.preg === 0) || (slave.geneticQuirks.superfetation === 2 && canGetPregnant(slave) && V.geneticMappingUpgrade !== 0)) {
					if (slave.diet !== "fertility") {
						slave.diet = "fertility";
						message(`${slave.slaveName} has been put on a diet to enhance fertility.`, sourceRecord.diet);
					}
				} else {
					if (slave.diet !== "healthy") {
						slave.diet = "healthy";
						if (slave.pregKnown === 0 && slave.preg > 0) {
							message(`${slave.slaveName} has been put on a standard diet since tests reveal ${he} has become pregnant.`, sourceRecord.diet);
							slave.pregKnown = 1;
						} else {
							message(`${slave.slaveName} has been put on a standard diet since ${he} is currently unable to become pregnant.`, sourceRecord.diet);
						}
					}
				}
			} else if (rule.diet === "cum production") {
				if (slave.balls > 0) {
					if (slave.diet !== "cum production") {
						slave.diet = "cum production";
						message(`${slave.slaveName} has been put on a diet to promote cum production.`, sourceRecord.diet);
					}
				} else {
					if (slave.diet !== "healthy") {
						slave.diet = "healthy";
						message(`${slave.slaveName} has been put on a standard diet since ${he} is no longer able to produce cum.`, sourceRecord.diet);
					}
				}
			} else {
				if (slave.diet !== "healthy") {
					slave.diet = "healthy";
					message(`${slave.slaveName} has been put on a standard diet.`, sourceRecord.diet);
				}
			}
		}

		if (rule.weight !== null || (rule.diet === "attractive")) {
			weightRule(slave, rule);
		}
		if (rule.weight === null && rule.diet !== "attractive" && rule.muscles !== null) {
			muscleRule(slave, rule);
		}
		if (rule.weight === null && rule.muscles === null && (rule.diet !== undefined && rule.diet !== null && rule.diet !== "attractive")) {
			dietRule(slave, rule);
		}

		function dietPills(slave) {
			if (slave.drugs === "appetite suppressors" && slave.diet !== "restricted") {
				slave.drugs = "no drugs";
				message(`${slave.slaveName} no longer needs to lose weight, so ${he}'s no longer being given appetite suppressors.`, [sourceRecord.diet, sourceRecord.weight?.max, sourceRecord.weight?.min]);
			} else if (slave.diet === "restricted" && V.arcologies[0].FSSlimnessEnthusiastResearch === 1 && slave.drugs === "no drugs" && slave.indentureRestrictions < 2) {
				slave.drugs = "appetite suppressors";
				message(`${slave.slaveName} needs to lose weight, so ${he} will be given weight loss pills.`, [sourceRecord.diet, sourceRecord.weight?.max, sourceRecord.weight?.min]);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessCuratives(slave, rule) {
		if ((rule.curatives !== undefined) && (rule.curatives !== null)) {
			if (slave.curatives !== rule.curatives) {
				if (rule.curatives === 2) {
					if (slave.health.condition > 100 && slave.health.illness < 1) {
						if (slave.curatives !== 1) {
							message(`${slave.slaveName} has been put on preventatives, since curatives cannot improve ${his} health further.`, sourceRecord.curatives);
							slave.curatives = 1;
						}
					} else {
						message(`${slave.slaveName} has been put on curatives.`, sourceRecord.curatives);
						slave.curatives = rule.curatives;
					}
				} else {
					message(`${slave.slaveName} has been ${rule.curatives > 0 ? "put on preventatives" : "taken off health drugs"}`, sourceRecord.curatives);
					slave.curatives = rule.curatives;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessAphrodisiacs(slave, rule) {
		if ((rule.aphrodisiacs !== undefined) && (rule.aphrodisiacs !== null)) {
			if (slave.aphrodisiacs !== rule.aphrodisiacs) {
				message(`${slave.slaveName} has been ${rule.aphrodisiacs > 0 ? "put on the proper" : "taken off"} aphrodisiacs.`, sourceRecord.aphrodisiacs);
				slave.aphrodisiacs = rule.aphrodisiacs;
			}
		}
	}

	/**
	 * @param {FC.SlaveState} slave
	 * @param {number} hormones
	 * @param {string} slaveClass
	 * @param {string} source
	 */
	function applyHormones(slave, hormones, slaveClass, source) {
		if (!_.isNil(hormones)) {
			const newHormones = slave.indentureRestrictions >= 2 ? Math.clamp(hormones, -1, 1) : hormones;
			if (slave.hormones !== newHormones) {
				slave.hormones = newHormones;
				message(`${slave.slaveName} is ${slaveClass}, so ${he} has been put on the appropriate hormonal regime.`, source);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessPenisHormones(slave, rule) {
		if (slave.dick > 0) {
			if (slave.balls === 0) {
				applyHormones(slave, rule.gelding, "a gelding", sourceRecord.gelding);
			} else if (slave.balls > 0) {
				applyHormones(slave, rule.XY, "a shemale", sourceRecord.XY);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessFemaleHormones(slave, rule) {
		if ((slave.vagina > -1) && (slave.dick === 0)) {
			applyHormones(slave, rule.XX, "a female", sourceRecord.XX);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessPregnancyDrugs(slave, rule) {
		if (slave.pregKnown === 1 && rule.pregSpeed !== null && (slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart')) && slave.indentureRestrictions < 1 && slave.broodmother === 0) {
			if (rule.pregSpeed === "slow" && slave.preg < slave.pregData.normalBirth && slave.pregControl !== "slow gestation") {
				slave.pregControl = "slow gestation";
				message(`${slave.slaveName} is pregnant, so ${he} has been put on the gestation slowing agents.`, sourceRecord.pregSpeed);
			} else if (rule.pregSpeed === "fast" && slave.preg < slave.pregData.normalBirth && slave.health.condition > -50 && slave.pregControl !== "speed up") {
				slave.pregControl = "speed up";
				message(`${slave.slaveName} is pregnant, so ${he} has been put on rapid gestation agents. CAUTION! Can be dangerous. Clinic supervision is recommended.`, sourceRecord.pregSpeed);
			} else if (rule.pregSpeed === "suppress" && slave.preg >= slave.pregData.minLiveBirth && slave.health.condition > -50 && slave.pregControl !== "labor suppressors") {
				slave.pregControl = "labor suppressors";
				message(`${slave.slaveName} is ready to birth, so ${he} has been put on labor suppressing agents.`, sourceRecord.pregSpeed);
			} else if (rule.pregSpeed === "stimulate" && slave.preg > slave.pregData.normalBirth - 2 && slave.preg > slave.pregData.minLiveBirth && slave.health.condition > -50) {
				induce(slave);
				message(`${slave.slaveName} is ready to birth, so ${his} labor has been stimulated.`, sourceRecord.pregSpeed);
			} else if (rule.pregSpeed === "fast" && slave.pregControl === "speed up" && slave.health.condition <= -50) {
				slave.pregControl = "none";
				message(`${slave.slaveName} is on rapid gestation agents and dangerously unhealthy, so ${his} agent regimen has been stopped.`, sourceRecord.pregSpeed);
			} else if (rule.pregSpeed === "suppress" && slave.pregControl === "labor suppressors" && slave.health.condition <= -50) {
				slave.pregControl = "none";
				message(`${slave.slaveName} is on labor suppression agents and unhealthy, so ${his} agent regimen has been stopped.`, sourceRecord.pregSpeed);
			} else if (rule.pregSpeed === "none" && slave.pregControl !== "none") {
				slave.pregControl = "none";
				message(`${slave.slaveName}'s pregnancy control regimen has been stopped.`, sourceRecord.pregSpeed);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessLivingStandard(slave, rule) {
		if (rule.livingRules !== undefined && rule.livingRules !== null && slave.rules.living !== rule.livingRules) {
			if (App.Data.misc.facilityCareers.includes(slave.assignment)) {
				// Handled in Rules tab of SI now.
				// message(`${slave.slaveName}'s living standards are controlled by ${his} assignment.`);
			} else if (((slave.assignment === Job.HEADGIRL) && (V.HGSuite === 1)) || ((slave.assignment === Job.BODYGUARD) && (V.dojo > 1))) {
				// message(`${slave.slaveName} has a private room.`);
			} else if (slave.fetish === Fetish.MINDBROKEN) {
				if (slave.rules.living !== "spare") {
					slave.rules.living = "spare";
					message(`Since ${slave.slaveName} is mindbroken, ${his} living standard has been set to spare.`, sourceRecord.livingRules);
				}
			} else {
				if (rule.livingRules === "luxurious") {
					if (canMoveToRoom(slave)) {
						slave.rules.living = rule.livingRules;
						message(`${slave.slaveName}'s living standard has been set to ${rule.livingRules}.`, sourceRecord.livingRules);
					} else {
						slave.rules.living = "normal";
						message(`${slave.slaveName}'s living standard has been set to normal, since there is no room for ${him} to occupy.`, sourceRecord.livingRules);
					}
				} else {
					slave.rules.living = rule.livingRules;
					message(`${slave.slaveName}'s living standard has been set to ${rule.livingRules}.`, sourceRecord.livingRules);
				}
			}
			penthouseCensus();
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessRest(slave, rule) {
		if ((rule.restRules !== undefined) && (rule.restRules !== null)) {
			if (slave.rules.rest !== rule.restRules) {
				if ([Job.NURSE, Job.HEADGIRL, Job.TEACHER, Job.STEWARD, Job.MATRON, Job.FARMER, Job.MADAM, Job.WARDEN, Job.DJ, Job.MILKMAID].includes(slave.assignment)) {
					// These assignments enforce "restrictive", do not let RA attempt to change it.
				} else {
					slave.rules.rest = rule.restRules;
					message(`${slave.slaveName}'s resting time has been set to ${rule.restRules}.`, sourceRecord.restRules);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessSpeech(slave, rule) {
		if ((rule.speechRules !== undefined) && (rule.speechRules !== null) && (slave.rules.speech !== rule.speechRules)) {
			if (slave.fetish === Fetish.MINDBROKEN) {
				if (slave.rules.speech !== "restrictive") {
					slave.rules.speech = "restrictive";
					message(`Since ${slave.slaveName} is mindbroken, ${his} speech rules have been set to restrictive.`, sourceRecord.speechRules);
				}
			} else if (slave.accent === 4) {
				if ((rule.speechRules === "accent elimination" || rule.speechRules === "permissive") && slave.rules.speech !== "language lessons") {
					slave.rules.speech = "language lessons";
					message(`Since ${slave.slaveName} does not know how to talk, ${his} speech rules have been set to language learning.`, sourceRecord.speechRules);
				} else if (slave.rules.speech !== "language lessons" && slave.rules.speech !== "restrictive") {
					slave.rules.speech = "restrictive";
					message(`Since ${slave.slaveName} does not know how to talk, ${his} speech rules have been set to restrictive.`, sourceRecord.speechRules);
				}
			} else if (rule.speechRules === "accent elimination") {
				if (slave.accent > 0) {
					slave.rules.speech = "accent elimination";
					message(`${slave.slaveName}'s speech rules have been set to ${rule.speechRules}.`, sourceRecord.speechRules);
				} else {
					slave.rules.speech = "restrictive";
					message(`Since ${slave.slaveName} has no accent, ${his} speech rules have been set to restrictive.`, sourceRecord.speechRules);
				}
			} else if (slave.rules.speech !== rule.speechRules) {
				slave.rules.speech = rule.speechRules;
				message(`${slave.slaveName}'s speech rules have been set to ${rule.speechRules}.`, sourceRecord.speechRules);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessRelationship(slave, rule) {
		if (slave.fetish !== Fetish.MINDBROKEN) {
			if ((rule.relationshipRules !== undefined) && (rule.relationshipRules !== null)) {
				if (slave.rules.relationship !== rule.relationshipRules) {
					slave.rules.relationship = rule.relationshipRules;
					message(`${slave.slaveName}'s relationship rules have been set to ${rule.relationshipRules}.`, sourceRecord.relationshipRules);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessRelease(slave, rule) {
		const releaseProperties = [
			'masturbation',
			'partner',
			'facilityLeader',
			'family',
			'slaves',
			'master',
		];
		if ((rule.releaseRules !== undefined) && (rule.releaseRules !== null)) {
			const source = processReleaseProp(releaseProperties);
			if (source !== "") {
				message(`${slave.slaveName}'s release rules have been set to: ${App.Utils.releaseSummaryLong(slave)}.`, source);
			}
		}

		function processReleaseProp(releaseProperties) {
			let source = "";
			for (const property of releaseProperties) {
				if (rule.releaseRules[property] !== undefined && rule.releaseRules[property] !== null) {
					if (slave.rules.release[property] !== rule.releaseRules[property]) {
						slave.rules.release[property] = rule.releaseRules[property];
						source = sourceRecord.releaseRules[property];
					}
				}
			}
			return source;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessLactation(slave, rule) {
		if ((rule.lactationRules !== undefined) && (rule.lactationRules !== null)) {
			if (slave.rules.lactation !== rule.lactationRules) {
				if ((rule.lactationRules === "induce" && slave.lactation === 0) || (rule.lactationRules === "maintain" && slave.lactation === 1) || (rule.lactationRules === "none")) {
					slave.rules.lactation = rule.lactationRules;
					message(`${slave.slaveName}'s lactation rules have been set to ${rule.lactationRules}.`, sourceRecord.lactationRules);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessMobility(slave, rule) {
		if ((rule.mobilityRules !== undefined) && (rule.mobilityRules !== null)) {
			if (slave.rules.mobility !== rule.mobilityRules) {
				slave.rules.mobility = rule.mobilityRules;
				message(`${slave.slaveName}'s usage of mobility aids has been set to ${rule.mobilityRules}.`, sourceRecord.mobilityRules);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessPunishment(slave, rule) {
		if ((rule.standardPunishment !== undefined) && (rule.standardPunishment !== null)) {
			if (slave.rules.punishment !== rule.standardPunishment) {
				slave.rules.punishment = rule.standardPunishment;
				message(`${slave.slaveName}'s typical punishment has been updated to ${rule.standardPunishment}.`, sourceRecord.standardPunishment);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessReward(slave, rule) {
		if ((rule.standardReward !== undefined) && (rule.standardReward !== null)) {
			if (slave.rules.reward !== rule.standardReward) {
				slave.rules.reward = rule.standardReward;
				message(`${slave.slaveName}'s typical reward has been updated to ${rule.standardReward}.`, sourceRecord.standardReward);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessToyHole(slave, rule) {
		if ((rule.toyHole !== undefined) && (rule.toyHole !== null) && slave.toyHole !== rule.toyHole) {
			if (rule.toyHole === "pussy") {
				if (slave.vagina > 0 && canDoVaginal(slave)) {
					slave.toyHole = rule.toyHole;
					message(`${slave.slaveName} has been instructed to use ${his} ${rule.toyHole} to please you.`, sourceRecord.toyHole);
				} else if (slave.toyHole !== "all her holes") {
					slave.toyHole = "all her holes";
					message(`${slave.slaveName}'s hole preference has defaulted to all ${his} holes.`, sourceRecord.toyHole);
				}
			} else if (rule.toyHole === "ass") {
				if (slave.anus > 0 && canDoAnal(slave)) {
					slave.toyHole = rule.toyHole;
					message(`${slave.slaveName} has been instructed to use ${his} ${rule.toyHole} to please you.`, sourceRecord.toyHole);
				} else if (slave.toyHole !== "all her holes") {
					slave.toyHole = "all her holes";
					message(`${slave.slaveName}'s hole preference has defaulted to all ${his} holes.`, sourceRecord.toyHole);
				}
			} else if (rule.toyHole === "dick") {
				if (slave.dick > 0 && canPenetrate(slave)) {
					slave.toyHole = rule.toyHole;
					message(`${slave.slaveName} has been instructed to use ${his} ${rule.toyHole} to please you.`, sourceRecord.toyHole);
				} else if (slave.toyHole !== "all her holes") {
					slave.toyHole = "all her holes";
					message(`${slave.slaveName}'s hole preference has defaulted to all ${his} holes.`, sourceRecord.toyHole);
				}
			} else {
				slave.toyHole = rule.toyHole;
				message(`${slave.slaveName} has been instructed to use ${his} ${rule.toyHole} to please you.`, sourceRecord.toyHole);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessDietCum(slave, rule) {
		if ((rule.dietCum !== undefined) && (rule.dietCum !== null)) {
			if (slave.dietCum !== rule.dietCum) {
				slave.dietCum = rule.dietCum;
				if (slave.dietCum === 2) {
					message(`${slave.slaveName} has been put on a diet based on cum.`, sourceRecord.dietCum);
					slave.dietMilk = 0;
				} else if (slave.dietCum === 1) {
					message(`${slave.slaveName} has had cum added to ${his} diet.`, sourceRecord.dietCum);
				} else {
					message(`${slave.slaveName} has had cum removed from ${his} diet.`, sourceRecord.dietCum);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessDietMilk(slave, rule) {
		if ((rule.dietMilk !== undefined) && (rule.dietMilk !== null)) {
			if (slave.dietMilk !== rule.dietMilk) {
				slave.dietMilk = rule.dietMilk;
				if (slave.dietMilk === 2) {
					message(`${slave.slaveName} has been put on a diet based on human milk.`, sourceRecord.dietMilk);
					slave.dietCum = 0;
				} else if (slave.dietMilk === 1) {
					message(`${slave.slaveName} has had human milk added to ${his} diet.`, sourceRecord.dietMilk);
				} else {
					message(`${slave.slaveName} has had human milk removed from ${his} diet.`, sourceRecord.dietMilk);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessSolidFood(slave, rule) {
		if ((rule.onDiet !== undefined) && (rule.onDiet !== null)) {
			if (slave.onDiet !== rule.onDiet) {
				slave.onDiet = rule.onDiet;
				if (slave.onDiet === 1) {
					message(`${slave.slaveName} is not permitted to eat the solid slave food.`, sourceRecord.onDiet);
				} else {
					message(`${slave.slaveName} is permitted to eat the solid slave food.`, sourceRecord.onDiet);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessTeeth(slave, rule) {
		if ((rule.teeth !== undefined) && (rule.teeth !== null)) {
			if (rule.teeth === "universal") {
				if (slave.teeth === "crooked") {
					slave.teeth = "straightening braces";
					cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
					message(`${slave.slaveName} has been given braces for ${his} crooked teeth.`, sourceRecord.teeth);
				} else if (slave.teeth === "gapped") {
					slave.teeth = "straightening braces";
					cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
					message(`${slave.slaveName} has been given braces to close the gap in ${his} teeth.`, sourceRecord.teeth);
				} else if (slave.teeth === "normal") {
					slave.teeth = "cosmetic braces";
					cashX(forceNeg(V.modCost), "slaveSurgery", slave);
					message(`${slave.slaveName} has been given cosmetic braces.`, sourceRecord.teeth);
				}
			} else if (rule.teeth === "straighten") {
				if (slave.teeth === "crooked") {
					slave.teeth = "straightening braces";
					cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
					message(`${slave.slaveName} has been given braces for ${his} crooked teeth.`, sourceRecord.teeth);
				} else if (slave.teeth === "gapped") {
					slave.teeth = "straightening braces";
					cashX(forceNeg(V.surgeryCost), "slaveSurgery", slave);
					message(`${slave.slaveName} has been given braces to close the gap in ${his} teeth.`, sourceRecord.teeth);
				} else if (slave.teeth === "cosmetic braces") {
					slave.teeth = "normal";
					message(`${slave.slaveName} has had ${his} braces removed, since ${his} teeth are straight.`, sourceRecord.teeth);
				}
			} else if (rule.teeth === "none") {
				if (slave.teeth === "straightening braces") {
					slave.teeth = "crooked";
					message(`${slave.slaveName} has had ${his} braces removed.`, sourceRecord.teeth);
				} else if (slave.teeth === "cosmetic braces") {
					slave.teeth = "normal";
					message(`${slave.slaveName} has had ${his} braces removed.`, sourceRecord.teeth);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function processEyeColor(slave, rule) {
		if (!hasAnyEyes(slave)) {
			return;
		}
		// calculate our goals
		// iris
		let leftIris = getLeftEyeColor(slave);
		let rightIris = getRightEyeColor(slave);
		if (rule.iris === "natural") {
			leftIris = getGeneticEyeColor(slave, "left", "iris");
			rightIris = getGeneticEyeColor(slave, "right", "iris");
		} else if (rule.iris) {
			leftIris = rule.iris;
			rightIris = rule.iris;
		}

		// pupil
		let leftPupil = getLeftEyePupil(slave);
		let rightPupil = getRightEyePupil(slave);
		if (rule.pupil === "natural") {
			leftPupil = getGeneticEyeColor(slave, "left", "pupil");
			rightPupil = getGeneticEyeColor(slave, "right", "pupil");
		} else if (rule.pupil) {
			leftPupil = rule.pupil;
			rightPupil = rule.pupil;
		}

		// sclera
		let leftSclera = getLeftEyeSclera(slave);
		let rightSclera = getRightEyeSclera(slave);
		if (rule.sclera === "natural") {
			leftSclera = getGeneticEyeColor(slave, "left", "sclera");
			rightSclera = getGeneticEyeColor(slave, "right", "sclera");
		} else if (rule.sclera) {
			leftSclera = rule.sclera;
			rightSclera = rule.sclera;
		}

		const leftNeedsChange = hasLeftEye(slave) &&
			(getLeftEyeColor(slave) !== leftIris || getLeftEyePupil(slave) !== leftPupil ||
				getLeftEyeSclera(slave) !== leftSclera);
		const rightNeedsChange = hasRightEye(slave) &&
			(getRightEyeColor(slave) !== rightIris || getRightEyePupil(slave) !== rightPupil ||
				getRightEyeSclera(slave) !== rightSclera);

		if (leftNeedsChange || rightNeedsChange) {
			if (leftNeedsChange) {
				setEyeColorFull(slave, leftIris, leftPupil, leftSclera, "left");
			}
			if (rightNeedsChange) {
				setEyeColorFull(slave, rightIris, rightPupil, rightSclera, "right");
			}

			cashX(forceNeg(V.modCost), "slaveMod", slave);
			const lensDesc = [];
			if (rule.iris) {
				if (hasBothEyes(slave)) {
					lensDesc.push(`${leftIris === rightIris ? leftIris : (rightIris + " " + leftIris)} irises`);
				} else {
					lensDesc.push(`a ${hasLeftEye(slave) ? leftIris : rightIris} iris`);
				}
			}
			if (rule.pupil) {
				if (hasBothEyes(slave)) {
					lensDesc.push(`${leftPupil === rightPupil ? leftPupil : (rightPupil + " " + leftPupil)} pupils`);
				} else {
					lensDesc.push(`a ${hasLeftEye(slave) ? leftPupil : rightPupil} pupil`);
				}
			}
			if (rule.sclera) {
				if (hasBothEyes(slave)) {
					lensDesc.push(`${leftSclera === rightSclera ? leftSclera : (rightSclera + " " + leftSclera)} sclera`);
				} else {
					lensDesc.push(`a ${hasLeftEye(slave) ? leftSclera : rightSclera} sclera`);
				}
			}
			const lens = toSentence(lensDesc);
			message(`${slave.slaveName} has been given ${hasBothEyes(slave) ? `contact lenses` : `a contact lens`} with ${lens}.`, [sourceRecord.iris, sourceRecord.pupil, sourceRecord.sclera]);
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessStyle(slave, rule) {
		processEyeColor(slave, rule);

		if (rule.makeup !== undefined && (rule.makeup !== null)) {
			if (slave.makeup !== rule.makeup) {
				slave.makeup = rule.makeup;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				message(`${slave.slaveName} has been assigned the standard makeup.`, sourceRecord.makeup);
			}
		}

		if (hasAnyArms(slave)) {
			if (rule.nails !== undefined && (rule.nails !== null)) {
				if (slave.nails !== rule.nails) {
					slave.nails = rule.nails;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName} has been assigned the standard nails.`, sourceRecord.nails);
				}
			}
		}

		if (rule.hColor !== undefined && (rule.hColor !== null)) {
			if (slave.bald !== 1) {
				if (slave.hColor !== rule.hColor) {
					slave.hColor = rule.hColor;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s hair has been dyed ${rule.hColor}.`, sourceRecord.hColor);
				}
			}
		}

		if (rule.hornColor !== undefined && (rule.hornColor !== null)) {
			if (slave.horn !== "none") {
				if (slave.hornColor !== rule.hornColor) {
					slave.hornColor = rule.hornColor;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s horns has been dyed ${rule.hornColor}.`, sourceRecord.hornColor);
				}
			}
		}

		if (rule.hStyle !== undefined && (rule.hStyle !== null)) {
			if (slave.bald !== 1) {
				if (slave.hStyle !== rule.hStyle) {
					slave.hStyle = rule.hStyle;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					if (rule.hStyle === "shaved") {
						slave.hLength = 0;
						message(`${slave.slaveName}'s hair has been shaved.`, sourceRecord.hStyle);
					} else {
						let m = `${slave.slaveName}'s hair has been restyled`;
						// Cut hair if needed
						for (const style of App.Medicine.Modification.hairStyles.Cut) {
							if (style.value === rule.hStyle) {
								if (slave.hLength > style.hLength) {
									slave.hLength = style.hLength;
									m += ` and shortened`;
								}
								break;
							}
						}
						message(`${m}.`, sourceRecord.hStyle);
					}
				}
			}
		}

		if (rule.hLength !== undefined && (rule.hLength !== null)) {
			if (slave.bald !== 1) {
				if (slave.hLength !== rule.hLength) {
					if (slave.hLength > rule.hLength) {
						cashX(forceNeg(V.modCost), "slaveMod", slave);
						message(`${slave.slaveName}'s hair has been cut; it `, sourceRecord.hLength);
					} else {
						cashX(forceNeg(V.modCost * Math.trunc((rule.hLength - slave.hLength) / 10)), "slaveMod", slave);
						message(`${slave.slaveName} has been given extensions; ${his} hair `, sourceRecord.hLength);
					}
					r += `is now ${lengthToEitherUnit(rule.hLength)} long.`;
					slave.hLength = rule.hLength;
				}
			}
		}

		if (rule.haircuts !== undefined && (rule.haircuts !== null)) {
			if (slave.bald !== 1) {
				if (rule.haircuts === 1 && slave.haircuts !== 1) {
					message(`${slave.slaveName}'s hair will now be maintained at ${lengthToEitherUnit(slave.hLength)} long.`, sourceRecord.haircuts);
					slave.haircuts = 1;
				} else if (rule.haircuts === 0 && slave.haircuts !== 0) {
					message(`${slave.slaveName}'s hair length will no longer be maintained.`, sourceRecord.haircuts);
					slave.haircuts = 0;
				}
			}
		}

		if (rule.eyebrowHColor !== undefined && (rule.eyebrowHColor !== null)) {
			if (slave.eyebrowHStyle !== "bald" && slave.eyebrowHStyle !== "hairless") {
				if (slave.eyebrowHColor !== rule.eyebrowHColor) {
					slave.eyebrowHColor = rule.eyebrowHColor;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s eyebrow hair, if present, has been dyed ${rule.eyebrowHColor}.`, sourceRecord.eyebrowHColor);
				}
			}
		}

		if (rule.eyebrowHStyle !== undefined && (rule.eyebrowHStyle !== null)) {
			if (slave.eyebrowHStyle !== "bald" && slave.eyebrowHStyle !== "hairless") {
				if (slave.eyebrowHStyle !== rule.eyebrowHStyle) {
					slave.eyebrowHStyle = rule.eyebrowHStyle;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s eyebrow hair has been restyled; they are now ${rule.eyebrowHStyle}.`, sourceRecord.eyebrowHStyle);
				}
			}
		}

		if (rule.eyebrowFullness !== undefined && (rule.eyebrowFullness !== null)) {
			if (slave.eyebrowHStyle !== "bald" && slave.eyebrowHStyle !== "hairless") {
				if (slave.eyebrowFullness !== rule.eyebrowFullness) {
					slave.eyebrowFullness = rule.eyebrowFullness;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s eyebrow hair thickness has been adjusted; they are now ${rule.eyebrowFullness}.`, sourceRecord.eyebrowFullness);
				}
			}
		}

		if (rule.pubicHColor !== undefined && (rule.pubicHColor !== null)) {
			if (slave.pubicHStyle !== "bald" && slave.pubicHStyle !== "hairless") {
				if (slave.pubicHColor !== rule.pubicHColor) {
					slave.pubicHColor = rule.pubicHColor;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s pubic hair, if present, has been dyed ${rule.pubicHColor}.`, sourceRecord.pubicHColor);
				}
			}
		}

		if (rule.pubicHStyle !== undefined && (rule.pubicHStyle !== null)) {
			if (slave.pubicHStyle !== "bald" && slave.pubicHStyle !== "hairless") {
				if (slave.pubicHStyle !== rule.pubicHStyle) {
					slave.pubicHStyle = rule.pubicHStyle;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s pubic hair has been restyled; it is now ${rule.pubicHStyle}.`, sourceRecord.pubicHStyle);
				}
			}
		}

		if (rule.underArmHColor !== undefined && (rule.underArmHColor !== null)) {
			if (slave.underArmHStyle !== "bald" && slave.underArmHStyle !== "hairless") {
				if (slave.underArmHColor !== rule.underArmHColor) {
					slave.underArmHColor = rule.underArmHColor;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s underarm hair, if present, has been dyed ${rule.underArmHColor}.`, sourceRecord.underArmHColor);
				}
			}
		}

		if (rule.underArmHStyle !== undefined && (rule.underArmHStyle !== null)) {
			if (slave.underArmHStyle !== "bald" && slave.underArmHStyle !== "hairless") {
				if (slave.underArmHStyle !== rule.underArmHStyle) {
					slave.underArmHStyle = rule.underArmHStyle;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s underarm hair has been restyled; it is now ${rule.underArmHStyle}.`, sourceRecord.underArmHStyle);
				}
			}
		}

		if (rule.eyebrowHColor !== undefined && (rule.eyebrowHColor !== null)) {
			if (slave.eyebrowHStyle !== "bald") {
				if (slave.eyebrowHColor !== rule.eyebrowHColor) {
					slave.eyebrowHColor = rule.eyebrowHColor;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s eyebrow hair, if present, has been dyed ${rule.eyebrowHColor}.`, sourceRecord.eyebrowHColor);
				}
			}
		}

		if (rule.eyebrowHStyle !== undefined && (rule.eyebrowHStyle !== null)) {
			if (slave.eyebrowHStyle !== "bald") {
				if (slave.eyebrowHStyle !== rule.eyebrowHStyle) {
					slave.eyebrowHStyle = rule.eyebrowHStyle;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s eyebrow hair has been restyled; it is now ${rule.eyebrowHStyle}.`, sourceRecord.eyebrowHStyle);
				}
			}
		}

		if (rule.eyebrowFullness !== undefined && (rule.eyebrowFullness !== null)) {
			if (slave.eyebrowHStyle !== "bald") {
				if (slave.eyebrowFullness !== rule.eyebrowFullness) {
					slave.eyebrowFullness = rule.eyebrowFullness;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s eyebrow hair has been reshaped; it is now ${rule.eyebrowFullness}.`, sourceRecord.eyebrowFullness);
				}
			}
		}

		if (rule.markings !== undefined && (rule.markings !== null)) {
			if (slave.markings === "beauty mark" && (rule.markings === "remove beauty marks" || rule.markings === "remove both")) {
				message(`${slave.slaveName}'s beauty mark has been removed.`, sourceRecord.markings);
				slave.markings = "none";
				cashX(forceNeg(V.modCost), "slaveMod", slave);
			}
			if (slave.markings === "birthmark" && (rule.markings === "remove birthmarks" || rule.markings === "remove both")) {
				message(`${slave.slaveName}'s birthmark has been bleached away.`, sourceRecord.markings);
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				slave.markings = "none";
			}
		}

		if (rule.skinColor !== undefined && rule.skinColor !== null && rule.skinColor !== slave.skin) {
			if (rule.skinColor === "natural") {
				if (slave.skin !== slave.origSkin) {
					slave.skin = slave.origSkin;
					message(`${slave.slaveName}'s skin color has been returned to ${slave.origSkin}.`, sourceRecord.skinColor);
				}
			} else {
				slave.skin = rule.skinColor;
				message(`${slave.slaveName}'s skin color has been set to ${rule.skinColor}.`, sourceRecord.skinColor);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessPiercings(slave, rule) {
		if (rule.piercing.nipple.weight !== undefined && (rule.piercing.nipple.weight !== null)) {
			if (slave.piercing.nipple.weight !== rule.piercing.nipple.weight) {
				if (rule.piercing.nipple.weight === 0) {
					slave.piercing.nipple.weight = 0;
					message(`${slave.slaveName}'s nipple piercings have been removed.`, sourceRecord.piercing.nipple.weight);
				} else if (slave.nipples !== "fuckable") {
					slave.piercing.nipple.weight = rule.piercing.nipple.weight;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s nipples have been pierced.`, sourceRecord.piercing.nipple.weight);
				} else {
					message(`${slave.slaveName}'s nipples are inverted and cannot be pierced.`, sourceRecord.piercing.nipple.weight);
				}
			}
		}

		if (rule.piercing.areola.weight !== undefined && (rule.piercing.areola.weight !== null)) {
			if (slave.piercing.areola.weight !== rule.piercing.areola.weight) {
				if (rule.piercing.areola.weight === 0) {
					slave.piercing.areola.weight = 0;
					message(`${slave.slaveName}'s areolae piercings have been removed.`, sourceRecord.piercing.areola.weight);
				} else {
					slave.piercing.areola.weight = rule.piercing.areola.weight;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s areolae have been given stud piercings.`, sourceRecord.piercing.areola.weight);
				}
			}
		}

		if (rule.piercing.genitals.weight !== undefined && (rule.piercing.genitals.weight !== null)) {
			if (slave.piercing.genitals.weight !== rule.piercing.genitals.weight) {
				if (rule.piercing.genitals.weight === 0) {
					slave.piercing.genitals.weight = 0;
					slave.piercing.genitals.smart = false;
					if (slave.dick > 0) {
						message(`${slave.slaveName}'s frenulum piercing has been removed.`, sourceRecord.piercing.genitals.weight);
					} else {
						message(`${slave.slaveName}'s clit piercing has been removed.`, sourceRecord.piercing.genitals.weight);
					}
				} else if ((slave.vagina !== -1) || (slave.dick !== 0)) {
					slave.piercing.genitals.weight = rule.piercing.genitals.weight;
					cashX(forceNeg(V.SPcost), "slaveMod", slave);
					if (slave.dick > 0) {
						message(`${slave.slaveName}'s frenulum has been pierced.`, sourceRecord.piercing.genitals.weight);
					} else {
						message(`${slave.slaveName}'s clit has been pierced.`, sourceRecord.piercing.genitals.weight);
					}
				}
			}
		}

		if (slave.vagina !== -1) {
			if (rule.piercing.vagina.weight !== undefined && (rule.piercing.vagina.weight !== null)) {
				if (slave.piercing.vagina.weight !== rule.piercing.vagina.weight) {
					if (rule.piercing.vagina.weight === 0) {
						slave.piercing.vagina.weight = 0;
						message(`${slave.slaveName}'s labia piercings have been removed.`, sourceRecord.piercing.vagina.weight);
					} else {
						slave.piercing.vagina.weight = rule.piercing.vagina.weight;
						cashX(forceNeg(V.modCost), "slaveMod", slave);
						message(`${slave.slaveName}'s pussylips have been pierced.`, sourceRecord.piercing.vagina.weight);
					}
				}
			}
		}

		if (slave.dick > 0) {
			if (rule.piercing.dick.weight !== undefined && (rule.piercing.dick.weight !== null)) {
				if (slave.piercing.dick.weight !== rule.piercing.dick.weight) {
					if (rule.piercing.dick.weight === 0) {
						slave.piercing.dick.weight = 0;
						message(`${slave.slaveName}'s shaft piercings have been removed.`, sourceRecord.piercing.dick.weight);
					} else {
						slave.piercing.dick.weight = rule.piercing.dick.weight;
						cashX(forceNeg(V.modCost), "slaveMod", slave);
						message(`${slave.slaveName}'s shaft has been pierced.`, sourceRecord.piercing.dick.weight);
					}
				}
			}
		}

		if (rule.piercing.genitals.smart !== undefined && rule.piercing.genitals.smart !== null) {
			if (slave.piercing.genitals.smart !== rule.piercing.genitals.smart) {
				if (rule.piercing.genitals.smart === false) {
					slave.piercing.genitals.smart = false;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s ${slave.dick > 0 ? "frenulum" : "clit"} piercing's smart vibe capability has been removed.`, sourceRecord.piercing.genitals.smart);
				} else if (slave.piercing.genitals.weight) {
					slave.piercing.genitals.smart = true;
					cashX(forceNeg(V.SPcost), "slaveMod", slave);
					slave.clitSetting = "all";
					message(`${slave.slaveName}'s ${slave.dick > 0 ? "frenulum" : "clit"} piercing has been upgraded with smart vibe functionality.`, sourceRecord.piercing.genitals.smart);
				}
			}
		}

		if (rule.piercing.anus.weight !== undefined && (rule.piercing.anus.weight !== null)) {
			if (slave.piercing.anus.weight !== rule.piercing.anus.weight) {
				if (rule.piercing.anus.weight === 0) {
					slave.piercing.anus.weight = 0;
					message(`${slave.slaveName}'s asshole piercings have been removed.`, sourceRecord.piercing.anus.weight);
				} else {
					slave.piercing.anus.weight = rule.piercing.anus.weight;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s asshole has been pierced.`, sourceRecord.piercing.anus.weight);
				}
			}
		}

		if (rule.piercing.lips.weight !== undefined && (rule.piercing.lips.weight !== null)) {
			if (slave.piercing.lips.weight !== rule.piercing.lips.weight) {
				if (rule.piercing.lips.weight === 0) {
					slave.piercing.lips.weight = 0;
					message(`${slave.slaveName}'s lip piercings have been removed.`, sourceRecord.piercing.lips.weight);
				} else {
					slave.piercing.lips.weight = rule.piercing.lips.weight;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s lips have been pierced.`, sourceRecord.piercing.lips.weight);
				}
			}
		}

		if (rule.piercing.tongue.weight !== undefined && (rule.piercing.tongue.weight !== null)) {
			if (slave.piercing.tongue.weight !== rule.piercing.tongue.weight) {
				if (rule.piercing.tongue.weight === 0) {
					slave.piercing.tongue.weight = 0;
					message(`${slave.slaveName}'s tongue piercings have been removed.`, sourceRecord.piercing.tongue.weight);
				} else {
					slave.piercing.tongue.weight = rule.piercing.tongue.weight;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s tongue has been pierced.`, sourceRecord.piercing.tongue.weight);
				}
			}
		}

		if (rule.piercing.ear.weight !== undefined && (rule.piercing.ear.weight !== null)) {
			if (slave.piercing.ear.weight !== rule.piercing.ear.weight) {
				if (rule.piercing.ear.weight === 0) {
					slave.piercing.ear.weight = 0;
					message(`${slave.slaveName}'s ear piercings have been removed.`, sourceRecord.piercing.ear.weight);
				} else {
					slave.piercing.ear.weight = rule.piercing.ear.weight;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s ears have been pierced.`, sourceRecord.piercing.ear.weight);
				}
			}
		}

		if (rule.piercing.nose.weight !== undefined && (rule.piercing.nose.weight !== null)) {
			if (slave.piercing.nose.weight !== rule.piercing.nose.weight) {
				if (rule.piercing.nose.weight === 0) {
					slave.piercing.nose.weight = 0;
					message(`${slave.slaveName}'s nose piercing has been removed.`, sourceRecord.piercing.nose.weight);
				} else {
					slave.piercing.nose.weight = rule.piercing.nose.weight;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s nose has been pierced.`, sourceRecord.piercing.nose.weight);
				}
			}
		}

		if (rule.piercing.eyebrow.weight !== undefined && (rule.piercing.eyebrow.weight !== null)) {
			if (slave.piercing.eyebrow.weight !== rule.piercing.eyebrow.weight) {
				if (rule.piercing.eyebrow.weight === 0) {
					slave.piercing.eyebrow.weight = 0;
					message(`${slave.slaveName}'s eyebrow piercings have been removed.`, sourceRecord.piercing.eyebrow.weight);
				} else {
					slave.piercing.eyebrow.weight = rule.piercing.eyebrow.weight;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s eyebrows have been pierced.`, sourceRecord.piercing.eyebrow.weight);
				}
			}
		}

		if (rule.piercing.navel.weight !== undefined && (rule.piercing.navel.weight !== null)) {
			if (slave.piercing.navel.weight !== rule.piercing.navel.weight) {
				if (rule.piercing.navel.weight === 0) {
					slave.piercing.navel.weight = 0;
					message(`${slave.slaveName}'s navel piercing have been removed.`, sourceRecord.piercing.navel.weight);
				} else {
					slave.piercing.navel.weight = rule.piercing.navel.weight;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s navel has been pierced.`, sourceRecord.piercing.navel.weight);
				}
			}
		}

		if (rule.piercing.corset.weight !== undefined && (rule.piercing.corset.weight !== null)) {
			if (slave.piercing.corset.weight !== rule.piercing.corset.weight) {
				if (rule.piercing.corset.weight === 0) {
					slave.piercing.corset.weight = 0;
					message(`${slave.slaveName}'s corset piercings have been removed.`, sourceRecord.piercing.corset.weight);
				} else {
					slave.piercing.corset.weight = rule.piercing.corset.weight;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName} has been given a set of corset piercings.`, sourceRecord.piercing.corset.weight);
				}
			}
		}

		for (const p in slave.piercing) {
			if (slave.piercing[p].weight) {
				if (rule.piercing[p].desc !== undefined && (rule.piercing[p].desc !== null)) {
					if (slave.piercing[p].desc !== rule.piercing[p].desc) {
						if (rule.piercing[p].desc === "") {
							message(`${slave.slaveName}'s ${p} piercings will use the default design.`, sourceRecord.piercing[p].desc);
						} else {
							message(`${slave.slaveName}'s ${p} piercings have been updated to a different design.`, sourceRecord.piercing[p].desc);
						}
						slave.piercing[p].desc = rule.piercing[p].desc;
					}
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessSmartPiercings(slave, rule) {
		const hasSmartVibe = dildoVibeLevel(slave) > 1 || slave.dickAccessory === "smart bullet vibrator";
		const smartThing = (slave.piercing.genitals.smart) ? "smart piercing" : "smart vibrator";
		if (slave.piercing.genitals.smart || hasSmartVibe) {
			if (rule.clitSetting !== undefined && rule.clitSetting !== null) {
				let fetish = rule.clitSetting;
				if (fetish === "random") {
					fetish = either("vanilla", "oral", "anal", "boobs", "submissive", "dom", "humiliation", "pregnancy", "masochist", "sadist");
				}
				// check if already full fetish
				// FIXME - this is wrong for some cases; see smartPiercingReinforcesFetish
				if (slave.fetish !== fetish || slave.fetishStrength < 100) {
					// Set the smart thingy to the correct fetish
					if (slave.clitSetting !== fetish) {
						slave.clitSetting = fetish;
						message(`${slave.slaveName}'s ${smartThing} has been set to ${slave.clitSetting}.`, sourceRecord.clitSetting);
					}
					// We haven't reached full fetish yet, don't allow changing to something else
					return;
				}
			}
			if (rule.clitSettingEnergy !== undefined && (rule.clitSettingEnergy !== null)) {
				if (slave.energy < rule.clitSettingEnergy) {
					if (slave.clitSetting !== "all") {
						message(`${slave.slaveName}'s ${smartThing} has been set to enhance libido.`, sourceRecord.clitSettingEnergy);
					}
					slave.clitSetting = "all";
					return;
				} else if (slave.energy >= rule.clitSettingEnergy + 10 && rule.clitSettingEnergy <= 90) {
					if (slave.clitSetting !== "none") {
						message(`${slave.slaveName}'s ${smartThing} has been set to suppress libido.`, sourceRecord.clitSettingEnergy);
					}
					slave.clitSetting = "none";
					return;
				}
			}
			if (rule.clitSettingXY !== undefined && (rule.clitSettingXY !== null)) {
				if (slave.attrXY < rule.clitSettingXY) {
					if (slave.clitSetting !== "men") {
						message(`${slave.slaveName}'s ${smartThing} has been set to encourage attraction to men.`, sourceRecord.clitSettingXY);
					}
					slave.clitSetting = "men";
					return;
				} else if (slave.attrXY >= rule.clitSettingXY + 10 && rule.clitSettingXY <= 90) {
					if (slave.clitSetting !== "anti-men") {
						message(`${slave.slaveName}'s ${smartThing} has been set to discourage attraction to men.`, sourceRecord.clitSettingXY);
					}
					slave.clitSetting = "anti-men";
					return;
				}
			}
			if (rule.clitSettingXX !== undefined && (rule.clitSettingXX !== null)) {
				if (slave.attrXX < rule.clitSettingXX) {
					if (slave.clitSetting !== "women") {
						message(`${slave.slaveName}'s ${smartThing} has been set to encourage attraction to women.`, sourceRecord.clitSettingXX);
					}
					slave.clitSetting = "women";
					return;
				} else if (slave.attrXX >= rule.clitSettingXX + 10 && rule.clitSettingXX <= 90) {
					if (slave.clitSetting !== "anti-women") {
						message(`${slave.slaveName}'s ${smartThing} has been set to discourage attraction to women.`, sourceRecord.clitSettingXX);
					}
					slave.clitSetting = "anti-women";
					return;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessTattoos(slave, rule) {
		if (rule.boobsTat !== undefined && (rule.boobsTat !== null)) {
			if (slave.boobsTat !== rule.boobsTat) {
				slave.boobsTat = rule.boobsTat;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				message(`${slave.slaveName}'s chest has been tattooed.`, sourceRecord.boobsTat);
			}
		}

		if (rule.buttTat !== undefined && (rule.buttTat !== null)) {
			if (slave.buttTat !== rule.buttTat) {
				slave.buttTat = rule.buttTat;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				message(`${slave.slaveName}'s butt has been tattooed.`, sourceRecord.buttTat);
			}
		}

		if (rule.vaginaTat !== undefined && (rule.vaginaTat !== null)) {
			if (slave.vaginaTat !== rule.vaginaTat) {
				slave.vaginaTat = rule.vaginaTat;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				message(`${slave.slaveName}'s abdomen has been tattooed.`, sourceRecord.vaginaTat);
			}
		}

		if (slave.dick > 0) {
			if (rule.dickTat !== undefined && (rule.dickTat !== null)) {
				if (slave.dickTat !== rule.dickTat) {
					slave.dickTat = rule.dickTat;
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s dick has been tattooed.`, sourceRecord.dickTat);
				}
			}
		}

		if (rule.lipsTat !== undefined && (rule.lipsTat !== null)) {
			if (slave.lipsTat !== rule.lipsTat) {
				slave.lipsTat = rule.lipsTat;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				message(`${slave.slaveName}'s face has been tattooed.`, sourceRecord.lipsTat);
			}
		}

		if (rule.anusTat !== undefined && (rule.anusTat !== null)) {
			if (slave.anusTat !== rule.anusTat) {
				slave.anusTat = rule.anusTat;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				message(`${slave.slaveName}'s asshole has been modded.`, sourceRecord.anusTat);
			}
		}

		if (rule.backTat !== undefined && (rule.backTat !== null)) {
			if (slave.backTat !== rule.backTat) {
				slave.backTat = rule.backTat;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				message(`${slave.slaveName}'s back has been tattooed.`, sourceRecord.backTat);
			}
		}

		if (rule.shouldersTat !== undefined && (rule.shouldersTat !== null)) {
			if (slave.shouldersTat !== rule.shouldersTat) {
				slave.shouldersTat = rule.shouldersTat;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				message(`${slave.slaveName}'s shoulders have been tattooed.`, sourceRecord.shouldersTat);
			}
		}

		if (rule.armsTat !== undefined && (rule.armsTat !== null)) {
			if (hasAnyArms(slave) && slave.armsTat !== rule.armsTat) {
				slave.armsTat = rule.armsTat;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				let m = `${slave.slaveName}'s `;
				if (hasBothArms(slave)) {
					m += `arms have`;
				} else {
					m += `arm has`;
				}
				message(`${m} been tattooed.`, sourceRecord.armsTat);
			}
		}

		if (rule.legsTat !== undefined && (rule.legsTat !== null)) {
			if (slave.legsTat !== rule.legsTat) {
				slave.legsTat = rule.legsTat;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				message(`${slave.slaveName}'s legs have been tattooed.`, sourceRecord.legsTat);
			}
		}

		if (rule.stampTat !== undefined && (rule.stampTat !== null)) {
			if (slave.stampTat !== rule.stampTat) {
				slave.stampTat = rule.stampTat;
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				message(`${slave.slaveName}'s lower back has been tattooed.`, sourceRecord.stampTat);
			}
		}
		if (rule.birthsTat !== undefined && (rule.birthsTat !== null)) {
			if (rule.birthsTat === "remove") {
				if (slave.birthsTat > 0) {
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s birth tallies have been removed.`, sourceRecord.birthsTat);
				} else if (slave.birthsTat > -1) {
					message(`${slave.slaveName} will no longer be tattooed with each birth.`, sourceRecord.birthsTat);
				}
				slave.birthsTat = -1;
			} else if (rule.birthsTat === "tally") {
				if (slave.birthsTat < 0) {
					message(`${slave.slaveName} will be tattooed with each birth.`, sourceRecord.birthsTat);
					slave.birthsTat = 0;
				}
			} else if (rule.birthsTat === "total tally") {
				if (slave.birthsTat < 0 && (slave.counter.births > 0)) {
					message(`${slave.slaveName} has been tattooed with ${his} total births (${slave.counter.births}).`, sourceRecord.birthsTat);
					slave.birthsTat = slave.counter.births;
				} else if (slave.birthsTat >= 0 && (slave.birthsTat !== slave.counter.births)) {
					message(`${slave.slaveName} has been tattooed with additional tallies to match ${his} total births (${slave.counter.births}).`, sourceRecord.birthsTat);
					slave.birthsTat = slave.counter.births;
				}
			}
		}
		if (rule.abortionTat !== undefined && (rule.abortionTat !== null)) {
			if (rule.abortionTat === "remove") {
				if (slave.abortionTat > 0) {
					cashX(forceNeg(V.modCost), "slaveMod", slave);
					message(`${slave.slaveName}'s abortion tallies have been removed.`, sourceRecord.abortionTat);
				} else if (slave.abortionTat > -1) {
					message(`${slave.slaveName} will no longer be tattooed with each abortion and miscarriage.`, sourceRecord.abortionTat);
				}
				slave.abortionTat = -1;
			} else if (rule.abortionTat === "tally") {
				if (slave.abortionTat < 0) {
					message(`${slave.slaveName} will be tattooed with each abortion and miscarriage.`, sourceRecord.abortionTat);
					slave.abortionTat = 0;
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessBrands(slave, rule) {
		if (rule.autoBrand !== 1 || slave.health.condition <= -20) {
			return;
		}

		if (rule.brandTarget == null) {
			message(`${slave.slaveName} was scheduled for branding, but no location had been specified.`, sourceRecord.autoBrand);
			return;
		}
		if (rule.brandDesign == null) {
			message(`${slave.slaveName} was scheduled for branding, but no design had been specified.`, sourceRecord.autoBrand);
			return;
		}

		const brands = App.Medicine.Modification.brandRecord(slave);
		let brandPlace = "";
		let left;
		let right;

		// Brand location needs to be split into a left and right
		if (["ankles", "calves", "feet", "hands", "lower arms", "shoulders", "upper arms", "wrists", "cheeks", "ears", "buttocks", "breasts"].includes(rule.brandTarget)) {
			if (rule.brandTarget === "ankles") {
				left = "left ankle";
				right = "right ankle";
			} else if (rule.brandTarget === "calves") {
				left = "left calf";
				right = "right calf";
			} else if (rule.brandTarget === "feet") {
				left = "left foot";
				right = "right foot";
			} else if (rule.brandTarget === "hands") {
				left = "left hand";
				right = "right hand";
			} else if (rule.brandTarget === "lower arms") {
				left = "left lower arm";
				right = "right lower arm";
			} else if (rule.brandTarget === "shoulders") {
				left = "left shoulder";
				right = "right shoulder";
			} else if (rule.brandTarget === "upper arms") {
				left = "left upper arm";
				right = "right upper arm";
			} else if (rule.brandTarget === "wrists") {
				left = "left wrist";
				right = "right wrist";
			} else if (rule.brandTarget === "cheeks") {
				left = "left cheek";
				right = "right cheek";
			} else if (rule.brandTarget === "ears") {
				left = "left ear";
				right = "right ear";
			} else if (rule.brandTarget === "buttocks") {
				left = "left buttock";
				right = "right buttock";
			} else if (rule.brandTarget === "breasts") {
				left = "left breast";
				right = "right breast";
			}
			if (rule.brandDesign !== brands[left] && rule.brandDesign !== brands[right]) {
				brandPlace = "both";
			} else if (rule.brandDesign !== brands[left]) {
				brandPlace = "left";
			} else if (rule.brandDesign !== brands[right]) {
				brandPlace = "right";
			}

			// Check for amputations:
			if (["upper arms", "lower arms", "wrists", "hands"].includes(rule.brandTarget)) {
				// Arms
				if (!hasAnyArms(slave)) {
					brandPlace = "";
				} else if (!hasLeftArm(slave)) {
					if (brandPlace === "both") {
						brandPlace = "right";
					}
					if (brandPlace === "left") {
						brandPlace = "";
					}
				} else if (!hasRightArm(slave)) {
					if (brandPlace === "both") {
						brandPlace = "left";
					}
					if (brandPlace === "right") {
						brandPlace = "";
					}
				}
			} else if (["thighs", "calves", "ankles", "feet"].includes(rule.brandTarget)) {
				// Legs
				if (!hasAnyLegs(slave)) {
					brandPlace = "";
				} else if (!hasLeftLeg(slave)) {
					if (brandPlace === "both") {
						brandPlace = "right";
					}
					if (brandPlace === "left") {
						brandPlace = "";
					}
				} else if (!hasRightLeg(slave)) {
					if (brandPlace === "both") {
						brandPlace = "left";
					}
					if (brandPlace === "right") {
						brandPlace = "";
					}
				}
			} else if (["ears"].includes(rule.brandTarget)) {
				// Ears
				if (slave.earShape === "none") {
					brandPlace = "";
				}
			}

			// Brand location does NOT need to be split into a left and right, (and may or may not contain left OR right already.)
		} else if (brands[rule.brandTarget] !== rule.brandDesign) {
			if (
				(!hasLeftArm(slave) && ["left upper arm", "left lower arm", "left wrist", "left hand"].includes(rule.brandTarget)) ||
				(!hasRightArm(slave) && ["right upper arm", "right lower arm", "right wrist", "right hand"].includes(rule.brandTarget)) ||
				(!hasLeftLeg(slave) && ["left thigh", "left calf", "left ankle", "left foot"].includes(rule.brandTarget)) ||
				(!hasRightLeg(slave) && ["right thigh", "right calf", "right ankle", "right foot"].includes(rule.brandTarget)) ||
				(slave.earShape === "none" && ["left ear"].includes(rule.brandTarget)) ||
				(slave.earShape === "none" && ["right ear"].includes(rule.brandTarget))
			) {
				brandPlace = "";
			} else {
				brandPlace = "anywhere";
			}
		}

		// Apply brands:
		if (["left", "right", "anywhere"].includes(brandPlace)) {
			healthDamage(slave, 10);
			let m = `${slave.slaveName} has been branded on the `;
			if (brandPlace === "left") {
				App.Medicine.Modification.addBrand(slave, left, rule.brandDesign);
				m += `${left}`;
			} else if (brandPlace === "right") {
				App.Medicine.Modification.addBrand(slave, right, rule.brandDesign);
				m += `${right}`;
			} else if (brandPlace === "anywhere") {
				App.Medicine.Modification.addBrand(slave, rule.brandTarget, rule.brandDesign);
				m += `${rule.brandTarget}`;
			}
			message(`${m}, with <span class="trust dec">fear</span>${slave.devotion < 18 ? `, <span class="devotion dec">regard,</span>` : ``} and <span class="health dec">health</span> consequences.`, sourceRecord.brandDesign);
			if (slave.devotion < 18) {
				slave.devotion -= 5;
			}
			slave.trust -= 5;
		} else if (brandPlace === "both") {
			App.Medicine.Modification.addBrand(slave, left, rule.brandDesign);
			App.Medicine.Modification.addBrand(slave, right, rule.brandDesign);
			healthDamage(slave, 20);
			message(`${slave.slaveName} has been branded on both ${rule.brandTarget}, with <span class="trust dec">fear</span>${slave.devotion < 18 ? `, <span class="devotion dec">regard,</span>` : ``} and <span class="health dec">health</span> consequences.`, sourceRecord.brandDesign);
			if (slave.devotion < 18) {
				slave.devotion -= 10;
			}
			slave.trust -= 10;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessPornFeedEnabled(slave, rule) {
		if (rule.pornFeed === undefined || rule.pornFeed == null) {
			return;
		}
		if (rule.pornFeed === slave.porn.feed) {
			return;
		}
		slave.porn.feed = rule.pornFeed;
		let yesNo = slave.porn.feed ? "are now" : "are no longer";
		if (slave.porn.feed === 0) {
			slave.porn.spending = 0;
		}
		message(`Highlights of ${slave.slaveName}'s sex life ${yesNo} being released.`, sourceRecord.pornFeed);
	}

	/** @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessPorn(slave, rule) {
		if ((rule.pornFameSpending !== undefined) && (rule.pornFameSpending !== null)) {
			if (slave.porn.prestige < 3) {
				if (slave.porn.spending !== rule.pornFameSpending) {
					slave.porn.spending = rule.pornFameSpending;
					message(`${slave.slaveName}'s porn publicity has been corrected.`, sourceRecord.pornFameSpending);
				}
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessLabel(slave, rule) {
		// mass removal of old tags, variant from '*' mask.
		if (rule.removeLabel !== null && rule.removeLabel === '*') {
			slave.custom.label = slave.custom.label.replace(/(?:\[.+\])+/, "");
			message(`All of ${slave.slaveName}'s tags have been removed.`, sourceRecord.removeLabel);
		}

		// mass removal of old tags, variant from GUI switch.
		if (rule.labelTagsClear === true) {
			slave.custom.label = slave.custom.label.replace(/(?:\[.+\])+/, "");
			message(`All of ${slave.slaveName}'s tags have been removed.`, sourceRecord.removeLabel);
		}

		// removing tags selected for removal.
		let removeTags = [];
		let i;
		if (rule.removeLabel != null && rule.removeLabel !== '') {
			removeTags = rule.removeLabel.split("|");
		}

		// finally adding new tags.
		let addTags = [];
		if (rule.label != null && rule.label !== '') {
			addTags = rule.label.split("|");
		}

		// Don't remove tags we re-add again anyway.
		removeTags = removeTags.filter(tag => !addTags.includes(tag));

		for (i in removeTags) {
			if (removeTags[i] !== null && removeTags[i] !== '' && slave.custom.label.includes(`[${removeTags[i]}]`)) {
				slave.custom.label = slave.custom.label.replace(`[${removeTags[i]}]`, "");
				message(`${slave.slaveName}'s tag [${removeTags[i]}] is removed.`, sourceRecord.removeLabel);
			}
		}

		for (i in addTags) {
			if (addTags[i] != null && addTags[i] !== '' && !slave.custom.label.includes(`[${addTags[i]}]`)) {
				slave.custom.label = `${slave.custom.label}[${addTags[i]}]`;
				message(`${slave.slaveName} has been tagged as ${addTags[i]}`, sourceRecord.label);
			}
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessOther(slave, rule) {
		if (typeof (rule.pronoun) === "number" && isFinite(rule.pronoun) && slave.pronoun !== rule.pronoun) {
			slave.pronoun = rule.pronoun;
		}
	}

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @param {FC.RA.RuleSetters} rule
	 */
	function ProcessPrompts(slave, rule) {
		/**
		 * @param {string[]} newPrompts
		 * @param {string[]} oldPrompts
		 */
		function promptsEqual(newPrompts, oldPrompts) {
			if (!rule.overridePrompts) { // if using append + no new prompts
				return oldPrompts.length === newPrompts.length && oldPrompts.every((value, idx) => value === newPrompts[idx]);
			}
			return newPrompts.slice(0).sort().toString() === oldPrompts.slice(0).sort().toString();
		}

		/**
		 * @param {"positive"|"negative"} promptField
		 */
		function assignPrompts(promptField) {
			let newPrompts;
			let oldPrompts;
			let override;

			if (rule.overridePrompts) {
				override = 'overwritten';
			} else {
				override = 'updated';
			}

			if (promptField === "positive") {
				newPrompts = rule.positivePrompt.split(/ *, */g);
				oldPrompts = slave.custom.aiPrompts?.positiveRA.split(/ *, */g) ?? [];
			} else {
				newPrompts = rule.negativePrompt.split(/ *, */g);
				oldPrompts = slave.custom.aiPrompts?.negativeRA.split(/ *, */g) ?? [];
			}
			if (promptsEqual(newPrompts, oldPrompts)) {
				return;
			}
			if (promptField === "positive" && rule.positivePrompt) {
				if (!slave.custom.aiPrompts) {
					slave.custom.aiPrompts = new App.Entity.SlaveCustomAIPrompts();
				}
				slave.custom.aiPrompts.positiveRA = newPrompts.toString();
				// toString is used partially as a lazy solution and as a way to differentiate prompts added by rules assistant
				message(`${slave.slaveName} has had positive prompts ${override}`, sourceRecord.positivePrompt);
			} else if (promptField === "negative" && rule.negativePrompt) {
				if (!slave.custom.aiPrompts) {
					slave.custom.aiPrompts = new App.Entity.SlaveCustomAIPrompts();
				}
				slave.custom.aiPrompts.negativeRA = newPrompts.toString();
				// toString is used partially as a lazy solution and as a way to differentiate prompts added by rules assistant
				message(`${slave.slaveName} has had negative prompts ${override}`, sourceRecord.negativePrompt);
			}
		}

		// custom prompts setup
		const hasPrompt = !!(rule.posePrompt || rule.expressionNegativePrompt || rule.expressionPositivePrompt || rule.positivePrompt || rule.negativePrompt);
		if (hasPrompt && slave.custom.aiPrompts == null) {
			slave.custom.aiPrompts = new App.Entity.SlaveCustomAIPrompts();
		}

		// custom pose prompt
		if (rule.posePrompt != null && rule.posePrompt !== '') {
			if (slave.custom.aiPrompts.pose !== rule.posePrompt) {
				slave.custom.aiPrompts.pose = rule.posePrompt;
				message(`${slave.slaveName} has had ${his} posture set.`, sourceRecord.posePrompt);
			}
		}

		// custom expression positive prompt
		if (rule.expressionPositivePrompt != null && rule.expressionPositivePrompt !== '') {
			if (slave.custom.aiPrompts.expressionPositive !== rule.expressionPositivePrompt) {
				slave.custom.aiPrompts.expressionPositive = rule.expressionPositivePrompt;
				message(`${slave.slaveName} has had ${his} positive expression prompt set.`, sourceRecord.expressionPositivePromptPrompt);
			}
		}

		// custom expression negative prompt
		if (rule.expressionNegativePrompt != null && rule.expressionNegativePrompt !== '') {
			if (slave.custom.aiPrompts.expressionNegative !== rule.expressionNegativePrompt) {
				slave.custom.aiPrompts.expressionNegative = rule.expressionNegativePrompt;
				message(`${slave.slaveName} has had ${his} negative expression prompt set.`, sourceRecord.expressionNegativePromptPrompt);
			}
		}

		// custom positive prompts
		if (rule.positivePrompt == null) { rule.positivePrompt = ''; }
		assignPrompts("positive");

		// custom negative prompts
		if (rule.negativePrompt == null) { rule.negativePrompt = ''; }
		assignPrompts("negative");

		// OpenPose set
		if (rule.openPoseType != null) {
			const c = slave.custom;

			if (rule.openPoseName == null) {
				if (c.aiPose) {
					message(`${slave.slaveName} is no longer being posed with OpenPose.`, sourceRecord.openPoseType);
				}
				c.aiPose = null;
				return;
			}

			if (!c.aiPose) {
				c.aiPose = new App.Entity.SlaveCustomAIPose();
				c.aiPose.type = rule.openPoseType;
			} else {
				c.aiPose.type = rule.openPoseType;
			}

			if (rule.openPoseType === 'Library') {
				if (c.aiPose.name === rule.openPoseName) { return; }
				message(`${slave.slaveName} has been posed with the OpenPose Library.`, sourceRecord.openPoseName);
				c.aiPose.name = rule.openPoseName;
			} else {
				if (rule.openPoseName === '') {
					message(`${slave.slaveName} has NOT been posed with OpenPose ("Resource is missing").`, sourceRecord.openPoseName);
					c.aiPose = null;
				} else {
					let success;
					if (c.aiPose.filename === rule.openPoseName) { return; }
					// TODO: fetch cannot be used from a local file system to find files
					fetch(`resources/poses/${rule.openPoseName}.${c.aiPose.type.toLowerCase()}`)
						.then(r => {
							success = true;
							c.aiPose.filename = rule.openPoseName;
						}).catch(r => {
							success = false;
							c.aiPose = null;
						});
					if (!success) {
						message(`${slave.slaveName} has NOT been posed with OpenPose ("Unable to fetch the requested resource").`);
					} else {
						message(`${slave.slaveName} has been posed with a custom OpenPose image.`, sourceRecord.openPoseName);
					}
				}
			}
		}

		// auto generation exclusion set
		if (rule.aiAutoRegenExclude != null && slave.custom.aiAutoRegenExclude !== rule.aiAutoRegenExclude) {
			if (rule.aiAutoRegenExclude) {
				slave.custom.aiAutoRegenExclude = 1;
				message(`${slave.slaveName} will not have new images auto generated`, sourceRecord.aiAutoRegenExclude);
			} else {
				slave.custom.aiAutoRegenExclude = 0;
				message(`${slave.slaveName} will have new images auto generated`, sourceRecord.aiAutoRegenExclude);
			}
		}
	}

	/**
	 * @param {string} text
	 * @param {string|string[]} [origin]
	 */
	function message(text, origin = null) {
		r += "<br>";
		if (origin) {
			if (_.isArray(origin)) {
				origin = removeDuplicates(origin.filter(v => !!v));
			}
			r += `[${origin}] `;
		} else {
			r += "[Default] ";
		}
		r += text;
	}
};


/**
 * @param {App.Entity.SlaveState} slave
 */
globalThis.removeFromRulesToApplyOnce = function(slave) {
	for (const rule of Object.keys(V.rulesToApplyOnce)) {
		if (V.rulesToApplyOnce[rule].includes(slave.ID)) {
			V.rulesToApplyOnce[rule].delete(slave.ID);
		}
	}
};
