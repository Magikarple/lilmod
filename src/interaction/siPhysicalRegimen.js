/**
 * @param {App.Entity.SlaveState} slave
 * @param {function():void} refresh
 * @returns {DocumentFragment}
 */
App.UI.SlaveInteract.physicalRegimen = function(slave, refresh) {
	const {
		he,
		him,
		his,
		himself,
		He,
		His
	} = getPronouns(slave);

	const el = new DocumentFragment();

	el.append(
		drugs(),
		curatives(),
		aphrodisiacs(),
		fertility(),
		incubator(),
		nursery(),
		breederEligibility(),
		bloating(),
		hormones(),
		diet(),
		dietBase(),
		snacks()
	);

	return el;

	function drugs() {
		let el = document.createElement('div');

		const drugLevelOptions = [];
		const lips = [];
		const breasts = [];
		const nipples = [];
		const butt = [];
		const dick = [];
		const balls = [];
		const fertility = [];
		const hormones = [];
		const psych = [];
		const misc = [];

		if (slave.drugs !== "no drugs") {
			drugLevelOptions.push({text: `None`, updateSlave: {drugs: `no drugs`}});
		}
		if (slave.indentureRestrictions < 2) {
			// Psych
			if (slave.intelligence > -100 && slave.indentureRestrictions < 1) {
				psych.push({text: `Psychosuppressants`, updateSlave: {drugs: `psychosuppressants`}});
			} else if (slave.intelligence > -100) {
				psych.push({text: `Psychosuppressants`, disabled: `Cannot suppress indentured slave`});
			} else if (slave.indentureRestrictions < 1) {
				psych.push({text: `Psychosuppressants`, disabled: `Too stupid to suppress`});
			} else {
				psych.push({text: `Psychosuppressants`, disabled: `Too stupid and indentured to suppress`});
			}
			if (V.arcologies[0].FSSlaveProfessionalismResearch === 1) {
				if (canImproveIntelligence(slave)) {
					psych.push({text: `Psychostimulants`, updateSlave: {drugs: `psychostimulants`}});
				} else {
					psych.push({text: `Psychostimulants`, disabled: `Cannot improve intelligence`});
				}
			}

			// Breasts
			if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
				if (App.Medicine.fleshSize(slave, 'boobs') > 100) {
					breasts.push({text: `Reducers`, updateSlave: {drugs: `breast redistributors`}});
				} else {
					breasts.push({text: `Reducers`, disabled: `Boobs are too small`});
				}
			}
			if (slave.boobs < 50000) {
				breasts.push({text: `Enhancement`, updateSlave: {drugs: `breast injections`}});
				breasts.push({text: `Intensive enhancement`, updateSlave: {drugs: `intensive breast injections`}});
			} else {
				breasts.push({text: `Enhancement`, disabled: `Boobs are too large`});
			}
			if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
				if (slave.boobs < 50000) {
					breasts.push({text: `Hyper enhancement`, updateSlave: {drugs: `hyper breast injections`}});
				} else {
					breasts.push({text: `Hyper enhancement`, disabled: `Boobs are too large`});
				}
			}

			// Nipples
			if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
				if (slave.nipples === "huge" || slave.nipples === "puffy" || slave.nipples === "cute") {
					nipples.push({text: `Reducers`, updateSlave: {drugs: `nipple atrophiers`}});
				} else {
					nipples.push({text: `Reducers`, disabled: `Nipples are ${slave.nipples}`});
				}
			}
			if (V.dispensary) {
				if (["inverted", "partially inverted", "cute", "tiny", "puffy", "flat"].includes(slave.nipples)) {
					nipples.push({text: `Enhancement`, updateSlave: {drugs: `nipple enhancers`}});
				} else if (slave.nipples === "huge") {
					nipples.push({text: `Enhancement`, disabled: `Nipples are already huge`});
				} else {
					nipples.push({text: `Enhancement`, disabled: `Has no effect on ${slave.nipples} nipples`});
				}
			}

			// Butt
			if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
				if (slave.butt - slave.buttImplant > 0) {
					butt.push({text: `Reducers`, updateSlave: {drugs: `butt redistributors`}});
				} else {
					butt.push({text: `Reducers`, disabled: `Butt is too small`});
				}
			}
			if (slave.butt < 9) {
				butt.push({text: `Enhancement`, updateSlave: {drugs: `butt injections`}});
				butt.push({text: `Intensive enhancement`, updateSlave: {drugs: `intensive butt injections`}});
			} else {
				butt.push({text: `Enhancement`, disabled: `Butt is too large`});
			}
			if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
				if (slave.butt < 20) {
					butt.push({text: `Hyper enhancement`, updateSlave: {drugs: `hyper butt injections`}});
				} else {
					butt.push({text: `Hyper enhancement`, disabled: `Butt is too large`});
				}
			}

			// Lips
			if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
				if (slave.lips - slave.lipsImplant > 0) {
					lips.push({text: `Reducers`, updateSlave: {drugs: `lip atrophiers`}});
				} else {
					lips.push({text: `Reducers`, disabled: `Lips are too small`});
				}
			}
			if (slave.lips <= 95 || (slave.lips <= 85 && V.seeExtreme !== 1)) {
				lips.push({text: `Enhancement`, updateSlave: {drugs: `lip injections`}});
			} else {
				lips.push({text: `Enhancement`, disabled: `Lips are too large`});
			}

			// Fertility
			fertility.push({text: `Fertility`, updateSlave: {drugs: `fertility drugs`}});
			if (V.seeHyperPreg === 1 && slave.indentureRestrictions < 1 && V.superFertilityDrugs === 1 && (slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart'))) {
				fertility.push({text: `Fertility+`, updateSlave: {drugs: `super fertility drugs`}});
			}

			// Dick/clit
			if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
				if (slave.dick > 1) {
					dick.push({text: `Reducers`, updateSlave: {drugs: `penis atrophiers`}});
				} else if (slave.dick === 1) {
					dick.push({text: `Reducers`, disabled: `Dick is already at minimum size`});
				}
				if (slave.clit > 0) {
					dick.push({text: `Reducers`, updateSlave: {drugs: `clitoris atrophiers`}});
				}
			}
			if (slave.dick > 0) {
				if (slave.dick < 10) {
					dick.push({text: `Enhancement`, updateSlave: {drugs: `penis enhancement`}});
					dick.push({text: `Intensive enhancement`, updateSlave: {drugs: `intensive penis enhancement`}});
				} else {
					dick.push({text: `Enhancement`, disabled: `Dick is too large`});
				}
			} else {
				if (slave.clit < 5) {
					dick.push({text: `Enhancement`, updateSlave: {drugs: `penis enhancement`}});
					dick.push({text: `Intensive enhancement`, updateSlave: {drugs: `intensive penis enhancement`}});
				} else {
					dick.push({text: `Enhancement`, disabled: `Clit is too large`});
				}
			}
			if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
				if (slave.dick > 0) {
					if (slave.dick < 31) {
						dick.push({text: `Hyper enhancement`, updateSlave: {drugs: `hyper penis enhancement`}});
					} else {
						dick.push({text: `Hyper enhancement`, disabled: `Dick is too large`});
					}
				} else {
					if (slave.clit < 5) {
						dick.push({text: `Hyper enhancement`, updateSlave: {drugs: `penis enhancement`}});
					} else {
						dick.push({text: `Hyper enhancement`, disabled: `Clit is too large`});
					}
				}
			}
			if (slave.dick.isBetween(0, 11) && !canAchieveErection(slave) && slave.chastityPenis !== 1) {
				dick.push({text: `Erectile dysfunction circumvention`, updateSlave: {drugs: `priapism agents`}});
			}

			// Balls
			if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
				if (slave.balls > 1) {
					balls.push({text: `Reducers`, updateSlave: {drugs: `testicle atrophiers`}});
				} else if (slave.balls === 1) {
					balls.push({text: `Reducers`, disabled: `Balls are already at minimum size`});
				}
			}
			if (slave.balls > 0) {
				balls.push({text: `Enhancement`, updateSlave: {drugs: `testicle enhancement`}});
				balls.push({text: `Intensive enhancement`, updateSlave: {drugs: `intensive testicle enhancement`}});
				if (V.arcologies[0].FSAssetExpansionistResearch === 1) {
					balls.push({text: `Hyper enhancement`, updateSlave: {drugs: `hyper testicle enhancement`}});
				}
			}

			// Hormones
			if (V.precociousPuberty === 1 && V.pubertyHormones === 1 && (slave.breedingMark !== 1 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart'))) {
				if ((slave.ovaries === 1 || slave.mpreg === 1) && slave.pubertyXX === 0) {
					hormones.push({text: `Female injections`, updateSlave: {drugs: `female hormone injections`}});
				}
				if (slave.balls > 0 && slave.pubertyXY === 0) {
					hormones.push({text: `Male injections`, updateSlave: {drugs: `male hormone injections`}});
				}
			}
			hormones.push({text: `Blockers`, updateSlave: {drugs: `hormone blockers`}});
			hormones.push({text: `Enhancement`, updateSlave: {drugs: `hormone enhancers`}});

			// Misc
			if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
				if (slave.labia > 0) {
					misc.push({text: `Labia reducers`, updateSlave: {drugs: `labia atrophiers`}});
				}
			}
			if (V.growthStim === 1) {
				if (canImproveHeight(slave)) {
					misc.push({text: `Growth stimulants`, updateSlave: {drugs: `growth stimulants`}});
				} else {
					misc.push({text: `Growth stimulants`, disabled: `Cannot increase height further`});
				}
			}
			if (V.arcologies[0].FSSlimnessEnthusiastResearch === 1) {
				if (slave.weight > -95) {
					misc.push({text: `Weight loss pills`, updateSlave: {drugs: `appetite suppressors`}});
				} else {
					misc.push({text: `Weight loss pills`, disabled: `Slave is already at low weight`});
				}
			}
			misc.push({text: `Steroids`, updateSlave: {drugs: `steroids`}});
			if (slave.boobs > 250 && slave.boobShape !== "saggy" && V.purchasedSagBGone === 1) {
				misc.push({text: `Sag-B-Gone breast lifting cream`, updateSlave: {drugs: `sag-B-gone`}});
			}
			if (V.arcologies[0].FSYouthPreferentialistResearch === 1) {
				if (slave.visualAge > 18) {
					misc.push({text: `Anti-aging cream`, updateSlave: {drugs: `anti-aging cream`}});
				} else {
					misc.push({text: `Anti-aging cream`, disabled: `Slave already looks young enough`});
				}
			}
		}

		let title = document.createElement('div');
		title.textContent = `Drugs: `;
		let chosenDrug = document.createElement('span');
		chosenDrug.textContent = `${capFirstChar(slave.drugs)}. `;
		chosenDrug.style.fontWeight = "bold";
		title.append(chosenDrug);
		title.appendChild(App.UI.SlaveInteract.generateRows(drugLevelOptions, slave, "", false, refresh));
		el.append(title);

		// Put mod added drugs into categories:
		const modDrugs = new Map();
		App.Mods.Drugs.list.filter(drug => !drug.isPCDrug && drug.available(slave)).forEach(drug => {
			let typeArray;
			// Allow drugs to be added to vanilla categories
			switch (drug.type) {
				case "Lips": typeArray = lips; break;
				case "Breasts": typeArray = breasts; break;
				case "Nipples": typeArray = nipples; break;
				case "Butt": typeArray = butt; break;
				case "Dick":
				case "Clit": typeArray = dick; break;
				case "Fertility": typeArray = fertility; break;
				case "Hormones": typeArray = hormones; break;
				case "Psych": typeArray = psych; break;
				case "Misc": typeArray = misc; break;
				default:
					if (!modDrugs.has(drug.type)) {
						modDrugs.set(drug.type, []);
					}
					typeArray = modDrugs.get(drug.type);
			}
			// Test if drug should be enabled and push to array
			if (drug.enable(slave) === true) {
				typeArray.push({text: drug.text, updateSlave: {drugs: drug.name}});
			} else {
				typeArray.push({text: drug.text, disabled: drug.enable(slave)});
			}
		});

		appendLabeledChoiceRow("Lips", lips, el);
		appendLabeledChoiceRow("Breasts", breasts, el);
		appendLabeledChoiceRow("Nipples", nipples, el);
		appendLabeledChoiceRow("Butt", butt, el);
		appendLabeledChoiceRow(slave.dick > 0 ? "Dick" : "Clit", dick, el);
		appendLabeledChoiceRow("Balls", balls, el);
		appendLabeledChoiceRow("Fertility", fertility, el);
		appendLabeledChoiceRow("Hormones", hormones, el);
		appendLabeledChoiceRow("Psych", psych, el);
		appendLabeledChoiceRow("Misc", misc, el);

		// Add modded rows
		modDrugs.forEach((drugArray, drugType) => appendLabeledChoiceRow(drugType, drugArray, el));

		return el;
	}

	function curatives() {
		const curativeOptions = [];

		curativeOptions.push({text: `None`, updateSlave: {curatives: 0}});
		curativeOptions.push({text: `Preventatives`, updateSlave: {curatives: 1}});
		curativeOptions.push({text: `Curatives`, updateSlave: {curatives: 2}});

		let el = document.createElement('div');
		let title = document.createElement('div');
		title.append(`Health: `);
		let chosenOption = document.createElement('span');
		chosenOption.style.fontWeight = "bold";
		if (slave.curatives > 1) {
			chosenOption.textContent = `curatives`;
		} else if (slave.curatives > 0) {
			chosenOption.textContent = `preventatives`;
		} else {
			chosenOption.textContent = `none`;
		}
		title.appendChild(chosenOption);
		title.append(`.`);
		let link = document.createElement('div');
		link.className = "choices";
		link.appendChild(App.UI.SlaveInteract.generateRows(curativeOptions, slave, "", false, refresh));
		el.append(title);
		el.append(link);
		return el;
	}

	function aphrodisiacs() {
		const aphrodisiacOptions = [];

		aphrodisiacOptions.push({text: `None`, updateSlave: {aphrodisiacs: 0}});
		aphrodisiacOptions.push({text: `Aphrodisiacs`, updateSlave: {aphrodisiacs: 1}});
		aphrodisiacOptions.push({text: `Extreme aphrodisiacs`, updateSlave: {aphrodisiacs: 2}});
		aphrodisiacOptions.push({text: `Anaphrodisiacs`, updateSlave: {aphrodisiacs: -1}, note: `Suppresses libido`});

		let el = document.createElement('div');
		let title = document.createElement('div');
		title.append(`Aphrodisiacs: `);
		let chosenOption = document.createElement('span');
		chosenOption.style.fontWeight = "bold";
		if (slave.aphrodisiacs > 1) {
			chosenOption.textContent = `extreme`;
		} else if (slave.aphrodisiacs > 0) {
			chosenOption.textContent = `applied`;
		} else if (slave.aphrodisiacs === -1) {
			chosenOption.textContent = `anaphrodisiacs`;
		} else {
			chosenOption.textContent = `none`;
		}
		title.appendChild(chosenOption);
		title.append(`.`);
		let link = document.createElement('div');
		link.className = "choices";
		link.appendChild(App.UI.SlaveInteract.generateRows(aphrodisiacOptions, slave, "", false, refresh));
		el.append(title);
		el.append(link);
		return el;
	}

	function fertility() {
		let fertilityBlock = document.createElement('span');
		let linkArray = [];
		if (slave.ovaries === 1 || slave.mpreg === 1 || slave.preg > 0) {
			let note = "";
			if (slave.preg < -2) {
				note += `${He} has been sterilized`;
			} else if (slave.preg < -1) {
				note += `${He} is sterile`;
			} else if (slave.pubertyXX === 0 && slave.preg < 1) {
				note += `${He} is not yet fertile`;
			} else if (slave.ovaryAge >= 47 && slave.preg < 1) {
				note += `${He} is too old to become pregnant`;
				if (slave.preg === -1) {
					slave.preg = 0;
					SetBellySize(slave);
				}
			} else if (slave.broodmotherOnHold === 1) {
				note += `${His} pregnancy implant is turned off`;
				if (slave.broodmotherCountDown > 0) {
					note += `; ${he} is expected to be completely emptied of ${his} remaining brood in ${slave.broodmotherCountDown} week`;
					if (slave.broodmotherCountDown > 1) {
						note += `s`;
					}
					note += `.`;
					linkArray.push(App.UI.DOM.link(
						`Turn on implant`,
						() => {
							slave.broodmotherOnHold = 0;
							slave.broodmotherCountDown = 0;
							refresh();
						},
					));
				}
			} else if (slave.preg >= -1) {
				fertilityBlock.append("Contraception and fertility: ");
				/** @type {string} */
				let fertility;
				// fertility.id = "fertility";
				if (slave.preg === -1) {
					fertility = "using contraceptives";
				} else if (slave.pregWeek < 0) {
					fertility = "postpartum";
				} else if (slave.preg === 0) {
					fertility = "fertile";
				} else if (slave.preg < 4 && (slave.broodmother === 0 || slave.broodmotherOnHold === 1)) {
					fertility = "may be pregnant";
				} else if (slave.preg < 2) {
					fertility = "1 week pregnant";
				} else {
					fertility = `${Math.trunc(slave.preg * 1000) / 1000} weeks pregnant`; // * and / needed to avoid seeing something like 20.1000000008 in some cases.
					if (slave.broodmother > 0) {
						fertility += " broodmother";
					}
				}
				fertility += ". ";
				App.UI.DOM.appendNewElement("span", fertilityBlock, fertility, "bold");

				if (slave.preg === 0) {
					linkArray.push(App.UI.DOM.link(
						`Use contraceptives`,
						() => {
							slave.preg = -1;
							refresh();
						},
					));
				} else if (slave.preg === -1) {
					linkArray.push(App.UI.DOM.link(
						`Let ${him} get pregnant`,
						() => {
							slave.preg = 0;
							refresh();
						},
					));
				} else if (isInduced(slave)) {
					note += `Hormones are being slipped into ${his} food; ${he} will give birth suddenly and rapidly this week`;
				} else if (
					slave.preg > slave.pregData.normalBirth - 2 &&
					slave.preg > slave.pregData.minLiveBirth &&
					slave.broodmother === 0 &&
					!isInLabor(slave)
				) {
					linkArray.push(App.UI.DOM.link(
						`Induce labor`,
						() => {
							induce(slave);
							refresh();
						},
					));
					linkArray.push(App.UI.DOM.passageLink(`Give ${him} a cesarean section`, "csec"));
				} else if (slave.broodmother > 0) {
					if (slave.broodmotherOnHold !== 1) {
						linkArray.push(App.UI.DOM.link(
							`Turn off implant`,
							() => {
								slave.broodmotherOnHold = 1;
								slave.broodmotherCountDown = 38 - WombMinPreg(slave);
								refresh();
							},
						));
					}
					if (slave.preg >= 36) {
						linkArray.push(App.UI.DOM.passageLink(`Induce mass childbirth`, "BirthStorm"));
					}
				} else if (slave.preg > slave.pregData.minLiveBirth) {
					linkArray.push(App.UI.DOM.link(
						`Give ${him} a cesarean section`,
						() => {
							slave.broodmotherOnHold = 0;
							slave.broodmotherCountDown = 0;
						},
						[],
						"csec"
					));
				} else if (slave.preg > 0 && slave.breedingMark === 1 && V.propOutcome === 1 && FutureSocieties.isActive('FSRestart') && V.eugenicsFullControl !== 1 && (slave.pregSource === -1 || slave.pregSource === -6)) {
					note += "You are forbidden from aborting an Elite child";
				} else if (slave.preg > 0) {
					linkArray.push(App.UI.DOM.link(
						`Abort ${his} pregnancy`,
						() => {
							slave.broodmotherOnHold = 0;
							slave.broodmotherCountDown = 0;
						},
						[],
						"Abort"
					));
				}
			}
			App.UI.DOM.appendNewElement("span", fertilityBlock, note, "note");
			App.UI.DOM.appendNewElement("div", fertilityBlock, App.UI.DOM.generateLinksStrip(linkArray), "choices");
		}
		if (
			slave.pregKnown === 1 &&
			V.pregSpeedControl === 1 &&
			(
				slave.breedingMark !== 1 ||
				V.propOutcome === 0 ||
				V.eugenicsFullControl === 1 ||
				!FutureSocieties.isActive('FSRestart')
			) &&
			slave.indentureRestrictions < 1 &&
			slave.broodmother === 0 &&
			V.seePreg !== 0
		) {
			let title = document.createElement('div');
			let underline = document.createElement('span');
			underline.style.textDecoration = "underline";
			underline.textContent = "Pregnancy control";
			title.appendChild(underline);
			title.append(": ");

			if (slave.pregControl === "labor suppressors") {
				title.append("Labor is suppressed. ");
			} else if (slave.pregControl === "slow gestation") {
				title.append("Slowed gestation speed. ");
			} else if (slave.pregControl === "speed up") {
				title.append("Faster gestation speed, staffed clinic recommended. ");
			} else {
				title.append("Normal gestation and birth. ");
			}
			fertilityBlock.appendChild(title);

			linkArray = [];
			if (slave.pregControl !== "none") {
				linkArray.push(App.UI.DOM.link(
					`Normal ${slave.preg < slave.pregData.normalBirth ? "Gestation" : "Birth"}`,
					() => {
						slave.pregControl = "none";
						refresh();
					},
				));
			}
			if (slave.preg < slave.pregData.normalBirth) {
				if (slave.pregControl !== "slow gestation") {
					linkArray.push(App.UI.DOM.link(
						`Slow Gestation`,
						() => {
							slave.pregControl = "slow gestation";
							refresh();
						},
					));
				}
				if (slave.pregControl !== "speed up") {
					linkArray.push(App.UI.DOM.link(
						`Fast Gestation`,
						() => {
							slave.pregControl = "speed up";
							refresh();
						},
					));
				}
			}
			if (slave.preg >= slave.pregData.minLiveBirth) {
				if (slave.pregControl !== "labor suppressors") {
					linkArray.push(App.UI.DOM.link(
						`Suppress Labor`,
						() => {
							slave.pregControl = "labor suppressors";
							refresh();
						},
					));
				}
			}
			App.UI.DOM.appendNewElement("div", fertilityBlock, App.UI.DOM.generateLinksStrip(linkArray), "choices");
		}
		return fertilityBlock;
	}

	function incubator() {
		const reservedChildren = FetusGlobalReserveCount("incubator");
		let reservedIncubator = WombReserveCount(slave, "incubator");
		let reservedNursery = WombReserveCount(slave, "nursery");
		let WL = slave.womb.length;
		let el = document.createElement('div');
		const linkArray = [];

		if (V.incubator.capacity > 0) {
			if (slave.preg > 0 && slave.broodmother === 0 && slave.pregKnown === 1 && slave.eggType === "human") {
				if ((slave.assignment !== Job.DAIRY || V.dairyPregSetting === 0) && (slave.assignment !== Job.FARMYARD || V.farmyardBreeding === 0)) {
					let title = document.createElement('div');
					if (WL - reservedNursery === 0) {
						title.textContent = `${His} children are already reserved for ${V.nurseryName}`;
						title.style.fontStyle = "italic";
					} else {
						const freeTanks = (V.incubator.capacity - V.incubator.tanks.length);
						if (reservedIncubator > 0) {
							if (WL === 1) {
								title.textContent = `${His} child `;
							} else if (reservedIncubator < WL) {
								title.textContent = `${reservedIncubator} of ${his} children `;
							} else if (WL === 2) {
								title.textContent = `Both of ${his} children `;
							} else {
								title.textContent = `All ${reservedIncubator} of ${his} children `;
							}
							title.textContent += ` will be placed in ${V.incubator.name}. `;
							if ((reservedIncubator + reservedNursery < WL) && (reservedChildren < freeTanks)) {
								linkArray.push(
									App.UI.DOM.link(`Keep another child`, () => wombUpdateIncubator(1, true))
								);
								if (reservedIncubator > 0) {
									linkArray.push(
										App.UI.DOM.link(`Keep one less child`, () => wombUpdateIncubator(1, false))
									);
								}
								if (reservedIncubator > 1) {
									linkArray.push(
										App.UI.DOM.link(`Keep none of ${his} children`, () => wombUpdateIncubator(9999, false))
									);
								}
								if ((reservedChildren + WL - reservedIncubator) <= freeTanks) {
									linkArray.push(
										App.UI.DOM.link(`Keep the rest of ${his} children`, () => wombUpdateIncubator(9999, true))
									);
								}
							} else if ((reservedIncubator === WL) || (reservedChildren === freeTanks) || (reservedIncubator - reservedNursery >= 0)) {
								linkArray.push(
									App.UI.DOM.link(`Keep one less child`, () => wombUpdateIncubator(1, false))
								);
								if (reservedIncubator > 1) {
									linkArray.push(
										App.UI.DOM.link(`Keep none of ${his} children`, () => wombUpdateIncubator(9999, false))
									);
								}
							}
						} else if (reservedChildren < freeTanks) {
							title.textContent = `${He} is pregnant and you have `;
							if (freeTanks === 1) {
								title.textContent += `an `;
							}
							let tank = document.createElement('span');
							tank.className = "lime";
							tank.textContent = `available aging tank`;
							if (freeTanks > 1) {
								tank.textContent += `s`;
							}
							tank.textContent += `.`;
							let cCount = (WL > 1 ? "a" : "the");
							linkArray.push(
								App.UI.DOM.link(`Keep ${cCount} child`, () => wombUpdateIncubator(1, true))
							);
							title.appendChild(tank);
							if ((WL > 1) && (reservedChildren + WL) <= freeTanks) {
								linkArray.push(
									App.UI.DOM.link(`Keep all of ${his} children`, () => wombUpdateIncubator(9999, true))
								);
							}
						} else if (reservedChildren === freeTanks) {
							title.textContent = `You have no available tanks for ${his} children. `;
						}
					}
					el.append(title);
					App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
				}
			}
		}

		function wombUpdateIncubator(count, addToWomb) {
			if (addToWomb) {
				WombAddToGenericReserve(slave, "incubator", count);
			} else {
				WombCleanGenericReserve(slave, "incubator", count);
			}
			refresh();
		}

		return el;
	}

	function nursery() {
		let el = document.createElement('div');
		if (V.nursery > 0) {
			const reservedChildrenNursery = FetusGlobalReserveCount("nursery");
			let reservedIncubator = WombReserveCount(slave, "incubator");
			let reservedNursery = WombReserveCount(slave, "nursery");
			let WL = slave.womb.length;
			if (slave.preg > 0 && slave.broodmother === 0 && slave.pregKnown === 1 && slave.eggType === "human") {
				if ((slave.assignment !== Job.DAIRY || V.dairyPregSetting === 0) && (slave.assignment !== Job.FARMYARD || V.farmyardBreeding === 0)) {
					let title = document.createElement('div');
					const linkArray = [];
					if (WL - reservedIncubator === 0) {
						title.textContent = `${His} children are already reserved for ${V.incubator.name}`;
						title.style.fontStyle = "italic";
					} else {
						const freeCribs = (V.nurseryCribs - V.cribs.length);
						if (reservedNursery > 0) {
							if (WL === 1) {
								title.textContent = `${His} child will be placed in ${V.nurseryName}. `;
							} else if (reservedNursery < WL) {
								title.textContent = `${reservedNursery} of ${his} children will be placed in ${V.nurseryName}.`;
							} else if (WL === 2) {
								title.textContent = `Both of ${his} children will be placed in ${V.nurseryName}. `;
							} else {
								title.textContent = `All ${reservedNursery} of ${his} children will be placed in ${V.nurseryName}. `;
							}
							if ((reservedIncubator + reservedNursery < WL) && (reservedChildrenNursery < freeCribs)) {
								linkArray.push(
									App.UI.DOM.link(`Keep another child`, () => wombUpdateNursery(1, true))
								);

								if (reservedNursery > 0) {
									linkArray.push(
										App.UI.DOM.link(`Keep one less child`, () => wombUpdateNursery(1, false))
									);
								}
								if (reservedNursery > 1) {
									linkArray.push(
										App.UI.DOM.link(`Keep none of ${his} children`, () => wombUpdateNursery(9999, false))
									);
								}
								if ((reservedChildrenNursery + WL - reservedNursery) <= freeCribs) {
									linkArray.push(
										App.UI.DOM.link(`Keep the rest of ${his} children`, () => wombUpdateNursery(9999, true))
									);
								}
							} else if ((reservedNursery === WL) || (reservedChildrenNursery === freeCribs) || (reservedNursery - reservedIncubator >= 0)) {
								linkArray.push(
									App.UI.DOM.link(`Keep one less child`, () => wombUpdateNursery(1, false))
								);

								if (reservedNursery > 1) {
									linkArray.push(
										App.UI.DOM.link(`Keep none of ${his} children`, () => wombUpdateNursery(9999, false))
									);
								}
							}
						} else if (reservedChildrenNursery < freeCribs) {
							title.textContent = `${He} is pregnant and you have `;
							if (freeCribs === 1) {
								title.textContent += `an `;
							}
							let crib = document.createElement('span');
							crib.className = "lime";
							crib.textContent = `available room`;
							if (freeCribs > 1) {
								crib.textContent += `s`;
							}
							crib.textContent += `.`;
							let cCount = (WL > 1 ? "a" : "the");
							linkArray.push(
								App.UI.DOM.link(`Keep ${cCount} child`, () => wombUpdateNursery(1, true))
							);
							title.appendChild(crib);
							if ((WL > 1) && (reservedChildrenNursery + WL) <= freeCribs) {
								linkArray.push(
									App.UI.DOM.link(`Keep all of ${his} children`, () => wombUpdateNursery(9999, true))
								);
							}
						} else if (reservedChildrenNursery === freeCribs) {
							title.textContent = `You have no available rooms for ${his} children. `;
						}
					}
					el.append(title);
					App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
				}
			}
		}

		function wombUpdateNursery(count, addToWomb) {
			if (addToWomb) {
				WombAddToGenericReserve(slave, "nursery", count);
			} else {
				WombCleanGenericReserve(slave, "nursery", count);
			}
			refresh();
		}

		return el;
	}

	function breederEligibility() {
		const el = document.createElement("div");
		if (V.propOutcome === 1 && FutureSocieties.isActive('FSRestart')) {
			if (slave.breedingMark === 0 && slave.fuckdoll === 0 && slave.eggType === "human" && isFertile(slave) && slave.preg <= 0) {
				el.classList.add("choices");
				el.append(
					App.UI.DOM.passageLink(
						`Breeder Eligibility Exam`,
						`BreedingTest`
					)
				);
			}
		}
		return el;
	}

	function bloating() {
		let bloating = document.createElement('div');
		if (slave.inflation > 0) {
			let intro = document.createElement('span');
			intro.textContent = "Required Bloating";
			intro.style.textDecoration = "underline";
			bloating.append(intro);

			bloating.append(": ");

			let requirement = document.createElement('span');
			requirement.style.fontWeight = "bold";
			requirement.id = "inflate";
			if (slave.inflation === 3) {
				requirement.textContent = `${He} is required to keep 2 gallons of ${slave.inflationType} in ${him} at all times`;
			} else if (slave.inflation === 2) {
				requirement.textContent = `${He} is required to keep 4 liters of ${slave.inflationType} in ${him} at all times`;
			} else if (slave.inflation === 1) {
				requirement.textContent = `${He} is required to keep 2 liters of ${slave.inflationType} in ${him} at all times`;
			}
			bloating.append(requirement);
			bloating.append(". ");

			let link = App.UI.DOM.link(
				`Let ${him} deflate`,
				() => {
					deflate(slave);
					refresh();
				},
			);
			bloating.append(link);
		}
		// make sure it updates itself after run
		return bloating;
	}

	function hormones() {
		let el = document.createElement('div');
		const options = [];
		const level = [];

		if (slave.hormones !== 0) {
			level.push({text: `None`, updateSlave: {hormones: 0}});
		}

		if (slave.indentureRestrictions < 2) {
			options.push({text: `Intensive Female`, updateSlave: {hormones: 2}});
		} else {
			options.push({text: `Intensive Female`, disabled: `Cannot use intensive hormones on indentured slaves`});
		}
		options.push({text: `Female`, updateSlave: {hormones: 1}});
		options.push({text: `Male`, updateSlave: {hormones: -1}});
		if (slave.indentureRestrictions < 2) {
			options.push({text: `Intensive Male`, updateSlave: {hormones: -2}});
		} else {
			options.push({text: `Intensive Male`, disabled: `Cannot use intensive hormones on indentured slaves`});
		}

		let title = document.createElement('div');
		title.textContent = `Hormones: `;
		let choice = document.createElement('span');
		choice.style.fontWeight = "bold";
		switch (slave.hormones) {
			case 2: {
				choice.textContent = `intensive female. `;
				break;
			}
			case 1: {
				choice.textContent = `female. `;
				break;
			}
			case 0: {
				choice.textContent = `none. `;
				break;
			}
			case -1: {
				choice.textContent = `male. `;
				break;
			}
			case -2: {
				choice.textContent = `intensive male. `;
				break;
			}
			default: {
				choice.textContent = `Not set. `;
			}
		}

		title.append(choice);
		title.appendChild(App.UI.SlaveInteract.generateRows(level, slave, "", false, refresh));
		el.append(title);

		let links = document.createElement('div');
		links.appendChild(App.UI.SlaveInteract.generateRows(options, slave, "", false, refresh));
		links.className = "choices";
		el.append(links);

		return el;
	}

	function diet() {
		let el = document.createElement('div');

		let title = document.createElement('div');
		title.textContent = `Diet: `;
		let choice = document.createElement('span');
		choice.style.fontWeight = "bold";
		choice.textContent = `${capFirstChar(slave.diet)}. `;

		title.append(choice);
		el.append(title);

		const health = [];
		health.push({text: `Healthy`, updateSlave: {diet: "healthy"}});
		if (V.dietCleanse === 1) {
			if (slave.health.condition < 90 || slave.chem >= 10) {
				health.push({text: `Cleanse`, updateSlave: {diet: "cleansing"}});
			} else {
				health.push({text: `Cleanse`, disabled: `${He} is already healthy`});
			}
		}

		const weight = [];
		if (slave.weight >= -95) {
			weight.push({text: `Lose weight`, updateSlave: {diet: "restricted"}});
		} else {
			weight.push({text: `Lose weight`, disabled: `${He} is already underweight`});
		}
		if (slave.fuckdoll === 0 && slave.fetish !== Fetish.MINDBROKEN && V.feeder === 1) {
			if (slave.weight > 10 || slave.weight < -10) {
				weight.push({text: `Correct weight`, updateSlave: {diet: "corrective"}});
			} else {
				weight.push({text: `Correct weight`, disabled: `${He} is already a healthy weight`});
			}
		}
		if (slave.weight <= 200) {
			weight.push({text: `Fatten`, updateSlave: {diet: "fattening"}});
		} else {
			weight.push({text: `Fatten`, disabled: `${He} is already overweight`});
		}

		const muscle = [];
		if (slave.muscles < 100 && !isAmputee(slave)) {
			muscle.push({text: `Build muscle`, updateSlave: {diet: "muscle building"}});
		} else if (!isAmputee(slave)) {
			muscle.push({text: `Build muscle`, disabled: `${He} is maintaining ${his} enormous musculature`});
		} else {
			muscle.push({text: `Build muscle`, disabled: `${He} has no limbs and thus can't effectively build muscle`});
		}

		if ((slave.muscles > 0 || slave.fuckdoll === 0) && canWalk(slave)) {
			muscle.push({text: `Slim down`, updateSlave: {diet: "slimming"}});
		} else if (!canWalk(slave)) {
			muscle.push({text: `Slim down`, disabled: `${He} can't walk and thus can't trim down`});
		} else if (slave.fuckdoll > 0) {
			muscle.push({text: `Slim down`, disabled: `${He} has no muscles left to lose`});
		}

		const production = [];
		if (slave.balls > 0 && V.cumProDiet === 1) {
			production.push({text: `Cum production`, updateSlave: {diet: "cum production"}});
		}
		if (((isFertile(slave) && slave.preg === 0) || (slave.geneticQuirks.superfetation === 2 && canGetPregnant(slave) && V.geneticMappingUpgrade !== 0)) && V.dietFertility === 1) {
			production.push({text: `Fertility`, updateSlave: {diet: "fertility"}});
		}

		const hormone = [];
		if (V.feeder === 1) {
			hormone.push({text: `Estrogen enriched`, updateSlave: {diet: "XX"}});
			hormone.push({text: `Testosterone enriched`, updateSlave: {diet: "XY"}});
			if (V.dietXXY === 1 && slave.balls > 0 && (slave.ovaries === 1 || slave.mpreg === 1)) {
				hormone.push({text: `Herm hormone blend`, updateSlave: {diet: "XXY"}});
			}
		}

		appendLabeledChoiceRow("Health", health, el);
		appendLabeledChoiceRow("Weight", weight, el);
		appendLabeledChoiceRow("Muscle", muscle, el);
		appendLabeledChoiceRow("Production", production, el);
		appendLabeledChoiceRow("Hormone", hormone, el);

		return el;
	}

	function dietBase() {
		let el = document.createElement('div');
		const milk = [];
		const cum = [];

		// Milk
		if (slave.dietCum < 2) {
			milk.push({text: `Milk added`, updateSlave: {dietMilk: 1}});
			if (slave.dietCum < 2) {
				milk.push({text: `Milk based`, updateSlave: {dietMilk: 2, dietCum: 0}});
			}
			if (slave.dietMilk) {
				milk.push({text: `Remove milk`, updateSlave: {dietMilk: 0}});
			}
		} else {
			milk.push({text: `Milk`, disabled: `Diet is based entirely on cum`});
		}

		// Cum
		if (slave.dietMilk < 2) {
			cum.push({text: `Cum added`, updateSlave: {dietCum: 1}});
			cum.push({text: `Cum based`, updateSlave: {dietCum: 2, dietMilk: 0}});
			if (slave.dietCum) {
				cum.push({text: `Remove cum`, updateSlave: {dietCum: 0}});
			}
		} else {
			cum.push({text: `Cum`, disabled: `Diet is based entirely on milk`});
		}

		let title = document.createElement('div');
		title.textContent = `Diet base: `;
		let choice = document.createElement('span');
		choice.style.fontWeight = "bold";
		if (slave.dietCum === 2) {
			choice.textContent = `cum based. `;
		} else if (slave.dietCum === 1 && slave.dietMilk === 0) {
			choice.textContent = `cum added. `;
		} else if (slave.dietCum === 1 && slave.dietMilk === 1) {
			choice.textContent = `cum and milk added. `;
		} else if (slave.dietMilk === 1 && slave.dietCum === 0) {
			choice.textContent = `milk added. `;
		} else if (slave.dietMilk === 2) {
			choice.textContent = `milk based. `;
		} else if (slave.dietCum === 0 && slave.dietMilk === 0) {
			choice.textContent = `normal. `;
		} else {
			choice.textContent = `THERE HAS BEEN AN ERROR.`;
		}

		title.append(choice);
		el.append(title);

		appendLabeledChoiceRow("Milk", milk, el);
		appendLabeledChoiceRow("Cum", cum, el);

		return el;
	}

	function snacks() {
		let el = document.createElement('div');
		let options = [];

		if (V.arcologies[0].FSHedonisticDecadenceResearch === 1) {
			let title = document.createElement('div');
			title.textContent = `Solid Slave Food Access: `;
			let choice = document.createElement('span');
			choice.style.fontWeight = "bold";
			if (slave.onDiet === 0) {
				choice.textContent = `Free to stuff ${himself}.`;
			} else {
				choice.textContent = `On a strict diet.`;
			}
			title.append(choice);
			el.append(title);

			options.push({text: `No access`, updateSlave: {onDiet: 1}});
			options.push({text: `Full access`, updateSlave: {onDiet: 0}});

			let links = document.createElement('div');
			links.appendChild(App.UI.SlaveInteract.generateRows(options, slave, "", false, refresh));
			links.className = "choices";
			el.append(links);
		}

		return el;
	}

	/** Append a simple row of choices with a label to a container, if there are choices to be made.
	 * @param {string} label
	 * @param {RowItem[]} array
	 * @param {HTMLElement} el
	 */
	function appendLabeledChoiceRow(label, array, el) {
		if (array.length > 0) {
			const links = document.createElement('div');
			links.append(`${label}: `);
			links.appendChild(App.UI.SlaveInteract.generateRows(array, slave, "", false, refresh));
			links.className = "choices";
			return el.appendChild(links);
		}
	}
};
