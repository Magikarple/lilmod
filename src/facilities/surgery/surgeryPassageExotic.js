/**
 * UI for performing surgery. Refreshes without refreshing the passage.
 * @param {App.Entity.SlaveState} slave
 * @param {()=>void} refresh
 * @param {boolean} [cheat=false]
 * @returns {HTMLElement}
 */

App.UI.surgeryPassageExotic = function(slave, refresh, cheat = false) {
	const container = document.createElement("span");
	container.append(content());
	return container;

	function content() {
		const frag = new DocumentFragment();
		const {
			His, He,
			his, him
		} = getPronouns(slave);

		if (V.geneticMappingUpgrade > 0) {
			App.UI.DOM.appendNewElement("h3", frag, "Genetic Testing:");
			frag.append(geneTesting());
		}

		frag.append(race());
		if (V.geneticMappingUpgrade > 1) {
			App.UI.DOM.appendNewElement("h3", frag, `Retro-virus treatments:`);
			frag.append(geneTherapy());
			if (slave.milkFlavor !== "none") {
				frag.append(milkFlavoring());
			}
		}
		frag.append(bodySwap());

		return frag;
		function geneTesting() {
			const el = new DocumentFragment();
			const slaveGeneTest = App.UI.DOM.appendNewElement("ul", el);

			App.UI.DOM.appendNewElement("li", slaveGeneTest, `Sex: ${slave.genes}`);
			App.UI.DOM.appendNewElement("li", slaveGeneTest, `Age: ${slave.actualAge} years old`);
			App.UI.DOM.appendNewElement("li", slaveGeneTest, `Father: ${slave.father ? getParent(slave.father) : `father unknown`}; ID: ${slave.father}`);
			App.UI.DOM.appendNewElement("li", slaveGeneTest, `Mother: ${slave.mother ? getParent(slave.mother) : `mother unknown`}; ID: ${slave.mother}`);
			App.UI.DOM.appendNewElement("li", slaveGeneTest, `Nationality: ${slave.nationality}`);
			// App.UI.DOM.appendNewElement("li", slaveGeneTest, `Race: ${capFirstChar(slave.origRace)}`); this is already present lower down in race()
			App.UI.DOM.appendNewElement("li", slaveGeneTest, `Skin tone: ${capFirstChar(slave.origSkin)}`);
			App.UI.DOM.appendNewElement("li", slaveGeneTest, `Intelligence index: ${slave.intelligence} out of 100`);
			App.UI.DOM.appendNewElement("li", slaveGeneTest, `Face index: ${slave.face} out of 100`);
			App.UI.DOM.appendNewElement("li", slaveGeneTest, `Expected height: ${heightToEitherUnit(slave.natural.height)}`);
			App.UI.DOM.appendNewElement("li", slaveGeneTest, `Expected breast size: ${slave.natural.boobs}cc`);
			App.UI.DOM.appendNewElement("li", slaveGeneTest, `Eye color: ${capFirstChar(slave.eye.origColor)}`);
			App.UI.DOM.appendNewElement("li", slaveGeneTest, `Hair color: ${capFirstChar(slave.origHColor)}`);

			return el;
		}

		function race() {
			const el = new DocumentFragment();
			const linkArray = [];
			App.UI.DOM.appendNewElement("div", el, `${He} is ${slave.race}${(slave.race !== slave.origRace) ? `, but was originally ${slave.origRace}` : ``}. Surgically alter ${him} to look more:`);
			if (slave.indentureRestrictions > 1) {
				App.UI.DOM.appendNewElement("div", el, `${His} indenture forbids elective surgery`, ["choices", "note"]);
			} else {
				for (const race of App.Data.misc.filterRacesBase.keys()) {
					if (slave.race === race) {
						continue;
					}
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.Race(slave, race),
						refresh, cheat));
				}
			}

			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), ["choices"]);
			return el;
		}

		function geneTherapy() {
			const el = new DocumentFragment();
			if (slave.indentureRestrictions >= 1) {
				App.UI.DOM.appendNewElement("div", el, `${His} indenture forbids elective surgery`, ["choices", "note"]);
			} else if (slave.health.health < 0) {
				App.UI.DOM.appendNewElement("div", el, `${He}'s too unhealthy to undergo gene therapy`, ["choices", "note"]);
			} else {
				const linkArray = [];
				if (V.arcologies[0].childhoodFertilityInducedNCSResearch === 1) {
					if (slave.geneMods.NCS === 0) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.RetrogradeVirusInjectionNCS(slave),
							refresh, cheat));
					} else {
						App.UI.DOM.appendNewElement("div", el, `${He} already has Induced NCS`, ["choices", "note"]);
					}
				}

				if (V.RapidCellGrowthFormula === 1) {
					if (slave.geneMods.rapidCellGrowth === 0) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.ElasticityTreatment(slave),
							refresh, cheat));
					} else {
						App.UI.DOM.appendNewElement("div", el, `${He} already has received the plasticity increasing elasticity treatment`, ["choices", "note"]);
					}
				}

				if (V.bioEngineeredFlavoringResearch === 1){
					if (slave.geneMods.flavoring === 0) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.milkFlavoring(slave),
							refresh, cheat));
					} else {
						App.UI.DOM.appendNewElement("div", el, `${His} milk can already be flavored`, ["choices", "note"]);
					}
				}

				if (V.optimizedSpermFormula === 1) {
					if (slave.geneMods.aggressiveSperm === 0) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.OptimizedSpermTreatment(slave),
							refresh, cheat));
					} else {
						App.UI.DOM.appendNewElement("div", el, `${His} body has already been altered to produce more aggressive sperm.`, ["choices", "note"]);
					}
				}

				if (V.enhancedProductionFormula === 1) {
					if (slave.geneMods.livestock === 0) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.EnhancedProductionTreatment(slave),
							refresh, cheat));
					} else {
						App.UI.DOM.appendNewElement("div", el, `${His} body has already been altered to produce more usable products.`, ["choices", "note"]);
					}
				}

				if (V.optimizedBreedingFormula === 1) {
					if (slave.geneMods.progenitor === 0) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.OptimizedBreedingTreatment(slave),
							refresh, cheat));
					} else {
						App.UI.DOM.appendNewElement("div", el, `${His} body has already been altered to better carry children.`, ["choices", "note"]);
					}
				}

				if (V.immortalityFormula === 1) {
					if (slave.geneMods.immortality === 0) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.ImmortalityTreatment(slave),
							refresh, cheat));
					} else {
						App.UI.DOM.appendNewElement("div", el, `${He} is already immortal`, ["choices", "note"]);
					}
				}

				App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), ["choices"]);
			}
			el.append(retroVirus());
			return el;

			function retroVirus() {
				const el = new DocumentFragment();
				const slaveGeneList = App.UI.DOM.appendNewElement("ul", el);
				const canEditGenes = slave.indentureRestrictions === 0 && slave.health.health >= 0;
				const description = App.UI.DOM.appendNewElement("div", el, null);

				const options = /** @type {selectOption[]} */ [];
				for (const gene in slave.geneticQuirks) {
					const geneData = App.Data.geneticQuirks.get(gene);

					// Continue if player settings do not allow them to even see it described
					if (geneData.hasOwnProperty("requirements") && !geneData.requirements) {
						continue;
					}

					if (slave.geneticQuirks[gene] === 2 || (slave.geneticQuirks[gene] === 1 && V.geneticMappingUpgrade > 2)) {
						const strength = (slave.geneticQuirks[gene] === 1) ? "Carrier for " : "Activated ";
						App.UI.DOM.appendNewElement("li", slaveGeneList, strength)
							.append(App.UI.DOM.makeElement("span", geneData.title, ["orange"]));
					}

					// Some of these can be described, but not tweaked in certain ways and circumstances
					if (canEditGenes && !geneData.restricted) {
						options.push({key: gene, name: capFirstChar(geneData.title)});
					}
				}
				if (canEditGenes) {
					el.append(App.UI.DOM.makeSelect(options, null, gene => {
						jQuery(description).empty().append(describeGene(gene));
					}));
				}

				return el;

				function describeGene(selectedGene) {
					const el = new DocumentFragment();
					const linkArray = [];
					const geneData = App.Data.geneticQuirks.get(selectedGene);
					App.Events.addNode(el, [
						`Selected gene is`,
						App.UI.DOM.makeElement("span", `${geneData.title}:`, ["orange"]),
						`${geneData.description}.`
					], "div");
					if (["pFace", "uFace"].includes(selectedGene)) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.RemoveGene(slave, selectedGene, `Prevent passing of ${geneData.title}s`),
							refresh, cheat));
					} else if (slave.geneticQuirks[selectedGene] === 2) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.RemoveGene(slave, selectedGene, `Correct ${geneData.title}`),
							refresh, cheat));
					} else if (slave.geneticQuirks[selectedGene] === 1 && V.geneticMappingUpgrade > 2) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.AddGene(slave, selectedGene, true),
							refresh, cheat));
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.RemoveGene(slave, selectedGene, `${geneData.title} carrier corrective treatment`),
							refresh, cheat));
					} else if (V.geneticFlawLibrary === 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(
							new App.Medicine.Surgery.Procedures.AddGene(slave, selectedGene),
							refresh, cheat));
					}
					App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), ["choices"]);
					return el;
				}
			}
		}

		function milkFlavoring() {
			const el = new DocumentFragment();
			App.UI.DOM.appendNewElement("h2", el, "Milk Flavor");
			const options = new App.UI.OptionsGroup();
			let option;
			let title;
			let showChoices = true;

			if (slave.milkFlavor === "natural") {
				title = `${His} milk is natural.`;
			} else {
				title = `${His} milk is ${slave.milkFlavor}-flavored.`;
			}
			App.UI.DOM.appendNewElement("div", el, title);

			if (showChoices) {
				if (slave.milkFlavor !== "natural") {
					options.addCustomOption("")
						.addButton("Remove flavoring", () => {
							slave.milkFlavor = "natural";
							App.UI.reload();
						});
				}

				option = options.addOption("Flavors", "milkFlavor", slave);
				for (const flavor of App.Data.milk.Flavors) {
					option.addValue(capFirstChar(flavor.value), flavor.value, billMod);
				}
				option.pulldown();
			}
			el.append(options.render());

			return el;

			function billMod() {
				if (!cheat) {
					cashX(forceNeg(V.modCost), "slaveMod", slave);
				}
			}
		}

		function bodySwap() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			if (V.bodyswapAnnounced === 1 && slave.indenture < 0) {
				if (slave.bodySwap === 0) {
					r.push(`${He} is in ${his} native body.`);
				} else if (slave.origBodyOwner !== "") {
					r.push(`${He} currently occupies ${slave.origBodyOwner}'s body.`);
				} else {
					r.push(`${He} is no longer in ${his} native body.`);
				}
				if (slave.indenture === -1) {
					linkArray.push(App.UI.DOM.passageLink(
						`Swap ${his} body with another of your stock`,
						"Slave Slave Swap Workaround",
					));
				} else {
					App.UI.DOM.appendNewElement("div", el, `Indentured servants must remain in their own bodies.`, ["choices", "note"]);
				}
			} else if (V.cheatMode === 1) {
				linkArray.push(App.UI.DOM.link(
					`Force enable bodyswapping`,
					() => {
						V.bodyswapAnnounced = 1;
					},
					[],
					"Remote Surgery",
				));
			}
			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), ["choices"]);
			return el;
		}
	}
};
