App.UI.geneLab = function() {
	const node = new DocumentFragment();
	const PCSkillCheck = Math.min(V.upgradeMultiplierMedicine, V.HackingSkillMultiplier);

	App.UI.DOM.appendNewElement("h1", node, `The Gene Lab`);

	if (V.geneticMappingUpgrade === 2) {
		App.UI.DOM.appendNewElement("div", node, `The gene lab is fully operational. It is capable of mapping a slave's genes, identifying genetic traits and abnormalities. It can be used to modify a slave's genome should you obtain the data necessary to adjust it.`, ["note"]);
		const cost = Math.trunc(500000 * V.upgradeMultiplierArcology);
		App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
			"Upgrade the genome mapper",
			() => {
				cashX(forceNeg(cost), "capEx");
				V.geneticMappingUpgrade = 3;
				App.UI.reload();
			}, [], "",
			`Costs ${cashFormat(cost)}`
		));
	} else if (V.geneticMappingUpgrade === 3) {
		App.UI.DOM.appendNewElement("div", node, `The gene lab is fully operational. It is capable of fully mapping a slave's genes, identifying genetic traits and abnormalities. It can be used to correct (or flaw) a slave's genome, as well as modify it should you obtain the data necessary to adjust it.`, ["note"]);
	}

	App.UI.DOM.appendNewElement("h2", node, `Genetic Modification`);
	const immortalityCost = 50000000;
	const flavoringCost = 150000;
	const enhancedProductionFormulaCost = 150000 * PCSkillCheck;
	if (V.dispensaryUpgrade === 0) {
		App.UI.DOM.appendNewElement("div", node, `The fabricator must be upgraded before it can produce treatments to alter genes`, ["note"]);
	} else {
		App.UI.DOM.appendNewElement("div", node, `The fabricator is capable of producing treatments to alter a slave's genetic code.`);
		if (V.arcologies[0].childhoodFertilityInducedNCSResearch === 1) {
			App.UI.DOM.appendNewElement("div", node, `The fabricator is capable of producing treatments to induce NCS.`);
		}
		if (V.RapidCellGrowthFormula === 1) {
			App.UI.DOM.appendNewElement("div", node, `The fabricator is capable of producing treatments to accelerate cellular reproduction.`);
		}
		if (V.enhancedProductionFormula === 1) {
			App.UI.DOM.appendNewElement("div", node, `The fabricator is capable of producing treatments to permanently enhance the production of harvestable resources from dairy slaves. Side effects include, but are not limited to, increased appetite, weight gain, dehydration, and other complications related to overproduction of fluids.`);
		} else if (V.cash >= enhancedProductionFormulaCost) {
			App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
				"Purchase designs for optimizing dairy slaves",
				() => {
					cashX(forceNeg(enhancedProductionFormulaCost), "capEx");
					V.enhancedProductionFormula = 1;
					App.UI.reload();
				}, [], "",
				`Costs ${cashFormat(enhancedProductionFormulaCost)}. Will boost production of harvestable slave resources`
			));
		}
		if (V.immortalityFormula === 1) {
			App.UI.DOM.appendNewElement("div", node, `The fabricator is capable of producing treatments to permanently reverse aging.`);
		} else if (V.cash >= immortalityCost) {
			App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
				"Fund the immortality project",
				() => {
					cashX(forceNeg(immortalityCost), "capEx");
					V.immortalityFormula = 1;
					App.UI.reload();
				}, [], "",
				`Costs ${cashFormat(immortalityCost)}. Will keep a slave at their prime physical age`
			));
		}
		if (V.geneticMappingUpgrade >= 2) {
			if (V.geneticFlawLibrary !== 1) {
				const anomaliesCost = 100000 * PCSkillCheck;
				App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
					"Purchase designs for inducing genetic anomalies",
					() => {
						cashX(forceNeg(anomaliesCost), "capEx");
						V.geneticFlawLibrary = 1;
						App.UI.reload();
					}, [], "",
					`Costs ${cashFormat(anomaliesCost)}. Will allow genetic flaws and quirks to be injected into a slave's genome`
				));
			} else {
				App.UI.DOM.appendNewElement("div", node, `The fabricator is capable of producing treatments to induce various genetic anomalies.`);
			}

			if (V.bioEngineeredFlavoringResearch === 1) {
				App.UI.DOM.appendNewElement("div", node, `The fabricator is capable of producing treatments to change the flavor of a slave's milk.`);
			} else if (V.cash >= flavoringCost) {
				App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
					"Fund research into bio-engineered human milk flavoring",
					() => {
						cashX(forceNeg(flavoringCost), "capEx");
						V.bioEngineeredFlavoringResearch = 1;
						App.UI.reload();
					}, [], "",
					`Costs ${cashFormat(flavoringCost)}. This will allow changing the flavor of a slave's milk`
				));
			}
		}
		if (V.seeCats === 1) {
			let r = [];
			if (V.geneticMappingUpgrade >= 2 && V.projectN.status === 0) {
				const catCost = 150000 * PCSkillCheck;
				App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
					"Hire a team of renowned bioengineers and geneticists to splice the human genome with cat DNA and fulfill the destiny of mankind - creating catgirls",
					() => {
						cashX(forceNeg(catCost), "capEx");
						V.projectN.status = 1;
						App.UI.reload();
					}, [], "",
					`Costs ${cashFormat(catCost)}. Will begin a long-term project to push the boundaries of science and genetically engineer the world's first catgirl`
				));
			} else if (V.projectN.status === 1) {
				App.UI.DOM.appendNewElement("div", node, `You've started to get into contact with a number of renowned old-world biologists and genetic engineers to pursue the creation of a biological catgirl. They should be arriving soon.`);
			} else if (V.projectN.status === 2) {
				App.UI.DOM.appendNewElement("div", node, `You've gathered together a team of some of the old world's foremost scientific minds in the fields of genetic engineering, who've turned your gene lab into a workplace for what they've dubbed "Project N", or the "Cat Project". One white-bearded man looks up from a large computer screen showing a series of complicated genetic sequences as you enter.`);
			} else if (V.projectN.status === 3) {
				App.UI.DOM.appendNewElement("div", node, `The geneticist team has started to make serious progress on project N. In a central tube filled with thick green liquid, a small mass of pinkish material floats in suspended animation, referred to by the biologists as "Subject Delta". A series of screens next to the tube read out low-functioning vitals and other essential information.`);
			} else if (V.projectN.status === 4) {
				App.UI.DOM.appendNewElement("div", node, `The pinkish blob of flesh has become a small, hairless humanoid body with twitchy cat ears atop its head, unconsciously floating while suspended in the green tube. You've tentatively named the growing catgirl ${V.subjectDeltaName}, and she occasionally kicks around slightly in the tube, producing a little stream of floating bubbles. The Project N bioengineers carefully monitor her vitals at all times, aided by the lab's integrated AI.`);
			} else if (V.projectN.status === 5) {
				App.UI.DOM.appendNewElement("div", node, `${V.subjectDeltaName} looks like an almost fully grown catgirl now, complete with a thin but soft layer of pure white fur that puffs up in the thick green liquid of her tube. The Project N geneticists seem a little rattled after the attack by the Sons of Sekhmet, but they're more determined than ever to finish their job and ensure that subject Delta makes it out of this tube and into the real world, a possibility that looks closer day by day.`);
			} else if (V.projectN.status === 6) {
				App.UI.DOM.appendNewElement("div", node, `Project N is complete. Dr. Nieskowitz and his team are currently monitoring various functions of the genetic laboratory, though you could set them to work engineering another catgirl if you give them the funding to do so. It will take approximately a month to create another catgirl. The genetic engineering tube is currently empty.`);
				const engineerCatCost = 20000 * PCSkillCheck;
				App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
					"Engineer me a Catgirl",
					() => {
						cashX(forceNeg(engineerCatCost), "capEx");
						V.projectN.status = 7;
						V.growingNewCat = 4;
						App.UI.reload();
					}, [], "",
					`Costs ${cashFormat(engineerCatCost)}`
				));
				App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
					"Engineer me a Catboy",
					() => {
						cashX(forceNeg(engineerCatCost), "capEx");
						V.projectN.status = 8;
						V.growingNewCat = 4;
						App.UI.reload();
					}, [], "",
					`Costs ${cashFormat(engineerCatCost)}`
				));
			} else if (V.projectN.status === 7) {
				r.push(`Dr. Nieskowitz and his team are currently hard at working growing you another catgirl, who rapidly develops in the central tube of thick green liquid you once used to create ${V.subjectDeltaName}. Nieskowitz assures you that he'll have your new catgirl finished`);
				if (V.growingNewCat >= 2) {
					r.push(`in ${V.growingNewCat} weeks.`);
				}
				if (V.growingNewCat <= 1) {
					r.push(`by next week.`);
				}
			} else if (V.projectN.status === 8) {
				r.push(`Dr. Nieskowitz and his team are currently hard at working growing you another catboy, who rapidly develops in the central tube of thick green liquid you once used to create ${V.subjectDeltaName}. Nieskowitz assures you that he'll have your new catboy finished`);
				if (V.growingNewCat >= 2) {
					r.push(`in ${V.growingNewCat} weeks.`);
				}
				if (V.growingNewCat <= 1) {
					r.push(`by next week.`);
				}
			} else if (V.projectN.status === 9) {
				r.push(`The bomb set by the Sons of Sekhmet destroyed large parts of the gene lab and killed most of the personnel, including ${V.subjectDeltaName}'s tube. After the death of Doctor Nieskowitz, you haven't just lost ${V.subjectDeltaName} herself, but also the knowledge used to create her. It's doubtful that there's anyone left in the world who can finish what he started.`);
			}
			App.Events.addParagraph(node, r);
		}
	}

	App.UI.DOM.appendNewElement("h2", node, `Genetic Harvesting`);

	const humanCloning = 100000 * PCSkillCheck;
	if (V.cloningSystem !== 1 && V.rep <= 18000 * PCSkillCheck) {
		App.UI.DOM.appendNewElement("div", node, `You lack the reputation needed to access methods for human cloning`, ["note"]);
	} else if ((V.cloningSystem !== 1) && (V.rep > 18000 * PCSkillCheck)) {
		if (V.organFarmUpgrade === 0) {
			App.UI.DOM.appendNewElement("div", node, `An organ farm is needed to grow the blank embryo to serve as a clone base`, ["note"]);
		} else {
			App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
				"Purchase methods for human cloning",
				() => {
					cashX(forceNeg(humanCloning), "capEx");
					V.cloningSystem = 1;
					App.UI.reload();
				}, [], "",
				`Costs ${cashFormat(humanCloning)}. Will allow children to be created with identical base genetics as the source DNA`
			));
		}
	} else if (V.cloningSystem > 0) {
		App.UI.DOM.appendNewElement("div", node, `The gene lab is capable of implanting a slave's genetic sequence into a blank embryo to produce a basic clone.`);
		App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
			"Make a clone",
			() => {
				V.donatrix = 0;
				V.receptrix = 0;
			}, [], "Cloning Workaround",
		));
	}
	return node;
};
