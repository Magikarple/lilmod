/**
 * @param {FC.HumanState} mother
 * @param {boolean} cheat
 * @returns {DocumentFragment}
 */
globalThis.analyzePregnancies = function(mother, cheat) {
	const el = new DocumentFragment();
	for (let i = 0; i < mother.womb.length; i++) {
		el.append(scanFetus(i));
		App.UI.DOM.appendNewElement("hr", el);
	}
	return el;

	function scanFetus(i) {
		const el = new DocumentFragment();
		const fetus = mother.womb[i];
		const genes = fetus.genetics;

		const canTerminate = canTerminateFetus(mother, fetus);
		const canTransplant = canTransplantFetus(mother, fetus);

		let option;
		const options = new App.UI.OptionsGroup();
		if (fetus.age >= 2 || cheat) {
			option = options.addOption(`Ova: ${genes.name}`, "name", genes);
			if (cheat) {
				option.showTextBox();
			}
			option = options.addOption(`Age: ${num(Math.trunc(fetus.age * 1000) / 1000)} weeks`, "age", fetus);
			if (cheat) {
				option.showTextBox();
			}
			if (V.geneticMappingUpgrade >= 1 || cheat) {
				option = options.addOption(`Gender: ${geneToGender(genes.gender, {keepKaryotype: true, lowercase: false})}`, "gender", genes);
				if (cheat) {
					option.addValue("Female", "XX");
					option.addValue("Male", "XY");
				}
				option = options.addOption(`Father name: ${(genes.fatherName) ? genes.fatherName : `name not registered`}; ID: ${genes.father}`, "father", genes);
				if (cheat) {
					option.showTextBox();
				}
				option = options.addOption(`Mother name: ${(genes.motherName) ? genes.motherName : `name not registered`}; ID: ${genes.mother}`, "mother", genes);
				if (cheat) {
					option.showTextBox();
				}
				option = options.addOption(`Nationality: ${genes.nationality}`, "nationality", genes);
				if (cheat) {
					option.showTextBox();
				}
				if (V.seeRace === 1) {
					option = options.addOption(`Race: ${capFirstChar(genes.race)}`, "race", genes);
					if (cheat) {
						option.showTextBox().pulldown().addValueList(Array.from(App.Data.misc.filterRaces, (k => [k[1], k[0]])));
					}
				}
				option = options.addOption(`Skin tone: ${capFirstChar(genes.skin)}`, "skin", genes);
				if (cheat) {
					option.showTextBox().pulldown().addValueList(genes.race === "catgirl" ? App.Medicine.Modification.catgirlNaturalSkins : App.Medicine.Modification.naturalSkins);
				}
				option = options.addOption(`Intelligence index: ${genes.intelligence} out of 100`, "intelligence", genes);
				if (cheat) {
					option.showTextBox();
				}
				option = options.addOption(`Face index: ${genes.face} out of 100`, "face", genes);
				if (cheat) {
					option.showTextBox();
				}
				option = options.addOption(`Expected adult height: ${heightToEitherUnit(genes.adultHeight)}`, "adultHeight", genes);
				if (cheat) {
					option.showTextBox();
				}
				option = options.addOption(`Estimated potential breast size: ${genes.boobPotential}cc`, "boobPotential", genes);
				if (cheat) {
					option.showTextBox();
				}
				option = options.addOption(`Eye Color: ${capFirstChar(genes.eyeColor)}`, "eyeColor", genes);
				if (cheat) {
					option.showTextBox().pulldown();
					for (const color of App.Medicine.Modification.eyeColor.map(color => color.value)) {
						option.addValue(capFirstChar(color), color);
					}
				}
				option = options.addOption(`Hair Color: ${capFirstChar(genes.hColor)}`, "hColor", genes);
				if (cheat) {
					option.showTextBox().pulldown();
					for (const color of App.Medicine.Modification.Color.Primary.map(color => color.value)) {
						option.addValue(capFirstChar(color), color);
					}
				}
				option = options.addOption(`Pubic hair: ${capFirstChar(genes.pubicHStyle)}`, "pubicHStyle", genes);
				if (cheat) {
					option.showTextBox().pulldown()
						.addValue("hairless")
						.addValue("bushy");
				}
				option = options.addOption(`Armpit hair: ${capFirstChar(genes.underArmHStyle)}`, "underArmHStyle", genes);
				if (cheat) {
					option.showTextBox().pulldown()
						.addValue("hairless")
						.addValue("bushy");
				}
				if (genes.markings === "freckles" || genes.markings === "heavily freckled") {
					option = options.addOption(`Markings: ${capFirstChar(genes.markings)}`, "markings", genes);
					if (cheat) {
						option.addValueList([
							["None", "none"],
							["Freckles", "freckles"],
							["Heavily freckled", "heavily freckled"],
							["Beauty mark", "beauty mark"],
							["Birthmark", "birthmark"],
						]);
					}
				}
				if (cheat) {
					const geneQuirks = App.UI.DOM.appendNewElement("div", el, App.UI.DOM.link(
						"Show Genetic Quirks",
						() => jQuery(geneQuirks).empty().append(App.UI.SlaveInteract.geneticQuirks(genes, true, null, true))
					));
				} else {
					el.append(fetusAbnormalities());
				}
				if (V.inbreeding && genes.inbreedingCoeff !== undefined) {
					option = options.addOption(`Inbreeding coefficient: ${genes.inbreedingCoeff}`, "inbreedingCoeff", genes);
					if (cheat) {
						option.showTextBox();
					}
				}
			} else {
				if (fetus.age > 13) {
					App.UI.DOM.appendNewElement("div", el, `Gender: ${genes.gender}`);
				}
				if (fetus.age > 5) {
					App.UI.DOM.appendNewElement("div", el, `Father ID: ${genes.father}`);
					App.UI.DOM.appendNewElement("div", el, `Father Name: ${genes.fatherName}`);
					App.UI.DOM.appendNewElement("div", el, `Mother ID: ${genes.mother}`);
					App.UI.DOM.appendNewElement("div", el, `Mother Name: ${genes.motherName}`);
				}
			}
			if (V.incubator.capacity > 0 || V.nurseryCribs > 0) {
				App.UI.DOM.appendNewElement("div", el, `Reserved: ${fetus.reserve}`);
			}

			ovumSurgery();

			if (V.incubator.capacity > 0) {
				if (fetus.reserve === "incubator") {
					App.UI.DOM.appendNewElement("div", el, App.UI.DOM.link(
						`Don't keep this child in ${V.incubator.name}`,
						() => {
							fetus.reserve = "";
							delete fetus.tankSetting;
						},
						[],
						passage()
					));
					let linkArray = [];
					if ("tankSetting" in fetus) {
						linkArray.push(App.UI.DOM.link(
							`Inspect incubator settings`,
							() => {
								V.AS = mother.ID;			// Undefined if mother is PC, but harmlessly so
								V.activeFetus = i;
							},
							[],
							(mother === V.PC ? `Inspect PC Fetus Tank Settings` : `Inspect Fetus Tank Settings`)
						));
						linkArray.push(App.UI.DOM.link(
							`Clear custom incubator settings`,
							() => {
								delete fetus.tankSetting;
							},
							[],
							passage()
						));
					} else {
						linkArray.push(App.UI.DOM.link(
							`Set custom incubator settings`,
							() => {
								V.AS = mother.ID;
								V.activeFetus = i;
							},
							[],
							(mother === V.PC ? `Inspect PC Fetus Tank Settings` : `Inspect Fetus Tank Settings`)
						));
					}
					App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray));
				} else if ((V.incubator.capacity - V.incubator.tanks.length) - FetusGlobalReserveCount("incubator") > 0) {
					App.UI.DOM.appendNewElement("div", el, App.UI.DOM.link(
						`Keep this child in ${V.incubator.name}`,
						() => {
							fetus.reserve = "incubator";
						},
						[],
						passage()
					));
				} else {
					App.UI.DOM.appendNewElement("div", el, `There is not enough free space to keep this child in ${V.incubator.name}.`);
				}
			}
			if (V.nursery > 0) {
				if (fetus.reserve === "nursery") {
					App.UI.DOM.appendNewElement("div", el, App.UI.DOM.link(
						`Don't keep this child in ${V.nurseryName}`,
						() => {
							fetus.reserve = "";
						},
						[],
						passage()
					));
				} else if ((V.nurseryCribs - V.cribs.length) - FetusGlobalReserveCount("nursery") > 0) {
					App.UI.DOM.appendNewElement("div", el, App.UI.DOM.link(
						`Keep this child in ${V.nurseryName}`,
						() => {
							fetus.reserve = "nursery";
							delete fetus.tankSetting;
						},
						[],
						passage()
					));
				} else {
					App.UI.DOM.appendNewElement("div", el, `There is not enough free space to keep this child in ${V.nurseryName}.`);
				}
			}
		} else {
			App.UI.DOM.appendNewElement("div", el, `Unidentified ova found, no detailed data available.`);
			App.UI.DOM.appendNewElement("div", el, `Age: too early for scan.`);

			ovumSurgery();
		}
		el.append(options.render());

		return el;

		function fetusAbnormalities() {
			const div = App.UI.DOM.makeElement("div", null);

			const abnormalitySpans = [];
			for (const gene in genes.geneticQuirks) {
				const geneObj = App.Data.geneticQuirks.get(gene);
				const quirkName = (geneObj && geneObj.abbreviation) ? geneObj.abbreviation : gene;
				const quirkColor = (geneObj && geneObj.goodTrait) ? "green" : "red";
				if (genes.geneticQuirks[gene] >= 2 || typeof genes.geneticQuirks[gene] === "string") { // String check is for heterochromia
					abnormalitySpans.push(App.UI.DOM.makeElement("span", quirkName, quirkColor));
				} else if (genes.geneticQuirks[gene] === 1 && V.geneticMappingUpgrade >= 3) {
					abnormalitySpans.push(App.UI.DOM.makeElement("span", quirkName, "yellow"));
				}
			}
			if (abnormalitySpans.length > 0) {
				div.append("Detected abnormalities: ");
				App.Events.addNode(div, abnormalitySpans);
			}
			return div;
		}

		/**
		 * Adds buttons for transplanting and/or termination if they are allowable
		 */
		function ovumSurgery() {
			if (canTerminate || canTransplant === 1) {
				el.append(App.UI.DOM.makeElement("h2", "Surgical Options"));
				transplantAndTerminateButtons(mother, el, {
					terminateText: "Terminate fetus",
					transplantText: "Transplant fetus",
					fetus: fetus,
				});
			}
		}
	}
};

App.UI.analyzePregnancy = function() {
	const node = new DocumentFragment();
	if (lastVisited("Incubator") === 1) {
		V.storedLink = "Incubator";
	} else if (lastVisited("Slave Interact") === 1) {
		V.storedLink = "Slave Interact";
	}
	V.nextLink = V.storedLink;
	const slave = getSlave(V.AS);

	const WL = slave.womb.length;
	const incubatorReservations = WombReserveCount(slave, "incubator");
	const nurseryReservations = WombReserveCount(slave, "nursery");
	const freeTanks = V.incubator.capacity - V.incubator.tanks.length;
	const freeCribs = V.nurseryCribs - V.cribs.length;
	const reservedChildren = FetusGlobalReserveCount("incubator");
	let linkArray = [];

	const {
		His, He,
		his
	} = getPronouns(slave);

	App.UI.DOM.appendNewElement("p", node, `${slave.slaveName} is ${(slave.devotion < 20) ? `restrained` : `comfortably reclined`} with ${his} stomach prepped for examination. ${He} shudders slightly at the cold touch of the sensor against ${his} skin.`, "scene-intro");

	App.Events.addParagraph(node, [App.Desc.pregnancy(slave)]);

	App.UI.DOM.appendNewElement("h2", node, "Overall statistics");
	let p = App.UI.DOM.appendNewElement("p", node);
	const cc = Math.round(slave.bellyPreg);
	const safeCC = Math.round(slave.pregAdaptation * 2000);
	if (V.geneticMappingUpgrade > 0) {
		App.UI.DOM.appendNewElement("div", p, `Estimated physical degree of pregnancy adaptation: ${num(Math.round(slave.pregAdaptation))}`);
		App.UI.DOM.appendNewElement("div", p, `Estimated safe ${(slave.ovaries === 1 || slave.mpreg === 1) ? `womb` : `abdominal`} volume: ${num(safeCC)}cc`);
	}
	App.UI.DOM.appendNewElement("div", p, `Current fetal count: ${slave.womb.length}`);
	App.Events.addNode(p, [
		`Estimated ${(slave.ovaries === 1 || slave.mpreg === 1) ? `womb` : `abdominal`} volume: ${(safeCC < cc && V.geneticMappingUpgrade > 0) ? `<span class="red">${num(cc)}</span>` : num(cc)}cc`
	], "div");


	if (slave.womb.length > 0) {
		App.UI.DOM.appendNewElement("h2", node, "Furthest developed pregnancy");
		App.UI.DOM.appendNewElement("p", node, `Fetal development week: ${Math.trunc(slave.preg * 1000) / 1000}`);

		p = App.UI.DOM.appendNewElement("p", node);
		if (V.incubator.capacity > 0 || V.nurseryCribs > 0) {
			let div = App.UI.DOM.appendNewElement("div", p);
			if (V.incubator.capacity > 0) {
				if (incubatorReservations > 0) {
					linkArray.push(App.UI.DOM.link(
						`Remove all of ${his} children from ${V.incubator.name}`,
						() => WombChangeReserveType(slave, "incubator", ""),
						[],
						"Analyze Pregnancy"
					));
				}
				if (incubatorReservations < WL && (reservedChildren + WL - incubatorReservations <= freeTanks)) {
					linkArray.push(App.UI.DOM.link(
						`Keep all of ${his} children in ${V.incubator.name}`,
						() => {
							WombChangeReserveType(slave, "nursery", "incubator");
							WombChangeReserveType(slave, "", "incubator");
						},
						[],
						"Analyze Pregnancy"
					));
				} else if (incubatorReservations < WL) {
					App.UI.DOM.appendNewElement("span", div, `There is not enough free space in ${V.incubator.name} for the rest of ${his} children.`);
				}
				div.append(App.UI.DOM.generateLinksStrip(linkArray));
			}

			linkArray = [];
			div = App.UI.DOM.appendNewElement("div", p);
			if (V.nursery > 0) {
				if (nurseryReservations > 0) {
					linkArray.push(App.UI.DOM.link(
						`Remove all of ${his} children from ${V.nurseryName}`,
						() => WombChangeReserveType(slave, "nursery", ""),
						[],
						"Analyze Pregnancy"
					));
				}
				if (nurseryReservations < WL && (FetusGlobalReserveCount("nursery") + WL - nurseryReservations <= freeCribs)) {
					linkArray.push(App.UI.DOM.link(
						`Keep all of ${his} children in ${V.nurseryName}`,
						() => {
							WombChangeReserveType(slave, "incubator", "nursery");
							WombChangeReserveType(slave, "", "nursery");
						},
						[],
						"Analyze Pregnancy"
					));
				} else if (nurseryReservations < WL) {
					App.UI.DOM.appendNewElement("span", div, `There is not enough free space in ${V.nurseryName} for the rest of ${his} children.`);
				}
				div.append(App.UI.DOM.generateLinksStrip(linkArray));
			}
		}
		App.UI.DOM.appendNewElement("h2", node, "Deep scan");
		App.UI.DOM.appendNewElement("p", node, analyzePregnancies(slave, false));
		transplantAndTerminateButtons(slave, node, {
			terminateAllText: "Terminate all fetuses",
			terminateText: "Terminate #terminatable terminatable #fetuses",
			transplantAllText: "Transplant all fetuses",
			transplantText: "Transplant #transplantable transplantable #fetuses",
		});
	} else if (slave.preg === -3) { // special states
		App.UI.DOM.appendNewElement("div", node, `Failure to locate any ova. Subject is infertile.`);
	} else if (slave.ovaryAge >= 47) {
		App.UI.DOM.appendNewElement("div", node, `${His} infertility is due to menopausal ovaries.`);
	} else if (slave.ovaries === 0 && slave.mpreg === 0 && slave.vagina > -1) {
		App.UI.DOM.appendNewElement("div", node, `${His} infertility is due to missing ovaries.`);
	} else if (slave.preg === -2) { // special states
		App.UI.DOM.appendNewElement("div", node, `${His} infertility is due to sterilization; ${his} ovaries could still work.`);
	} else if (slave.pregWeek < 0) { // special states
		App.UI.DOM.appendNewElement("div", node, `Subject is in the postpartum period, and will regain fertility in ${num(slave.pregWeek * -1)} ${slave.pregWeek === -1 ? `week` : `weeks`}.`);
	} else if (slave.preg === -1) { // special states
		App.UI.DOM.appendNewElement("div", node, `Contraceptive agents detected in subject.`);
	}

	return node;
};
