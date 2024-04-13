App.StartingGirls.passage = function() {
	V.activeSlave = V.activeSlave || App.StartingGirls.generate();
	if (!jsDef(V.applyCareerBonus)) {
		V.applyCareerBonus = 1;
	}
	const el = new DocumentFragment();
	let r = [];
	let linkArray = [];
	if (V.slaves.length === 0) {
		r.push(`You're no stranger to the Free Cities, which means you're no stranger to slavery. If you wish, you can bring slaves from your past life with you to your arcology. You can spend your cash reserves on slaves here, or bring it with you to start the game. Slaves created here will be much cheaper than if they were purchased on the market.`);
		if (V.PC.dick !== 0 && V.PC.vagina !== -1 && (V.seeDicks !== 0 || V.makeDicks === 1)) {
			r.push(`Since you have both a penis and a vagina yourself, you've obviously had access to a source of advanced surgery and organ farming. <span class="skill player">Slaves get a smaller cost increase here for having both penises and vaginas, and for having both testicles and ovaries.</span>`);
		}
		if (isPCCareerInCategory("slaver")) {
			r.push(`Since you`);
			if (V.PC.career === "slaver") {
				r.push(`personally saw to the capture, breaking and or training of`);
			} else if (V.PC.career === "slave overseer") {
				r.push(`managed the slave pits that processed`);
			} else if (V.PC.career === "slave tender") {
				r.push(`helped train`);
			}
			r.push(`these slaves, <span class="skill player">they cost half of what they normally would have here.</span>`);
		}
	} else {
		const pronoun = V.slaves.length > 1 ? "they" : getPronouns(V.slaves[0]).he;
		r.push(`The following slave records have been finalized; ${pronoun} will arrive with you when you take over your new arcology.`);
	}
	r.push(App.UI.DOM.makeElement("div", "Current cash reserves can be found on the far left sidebar."));
	App.Events.addNode(el, r, "p");
	if (V.slaves.length > 0) {
		for (const slave of V.slaves) {
			const cost = slave.slaveCost;
			App.Events.addNode(el, [
				App.UI.DOM.slaveDescriptionDialog(slave),
				`costing: ${cashFormatColor(cost)}`,
				App.UI.DOM.generateLinksStrip([
					App.UI.DOM.link("Delete", () => {
						cashX(Math.abs(cost), "slaveTransfer", slave);
						removeSlave(slave);
						App.UI.reload();
					})
				])
			], "div");
		}
		App.Events.addNode(el, [], "p");
	}

	const headerLinks = App.UI.DOM.appendNewElement("div", el);
	linkArray.push(
		App.UI.DOM.makeElement(
			"span",
			App.UI.DOM.passageLink("Refresh", "Starting Girls"),
			["major-link"]
		)
	);
	linkArray.push(
		App.UI.DOM.link(
			"Randomize career",
			() => {
				V.activeSlave.career = randomCareer(V.activeSlave);
				App.UI.reload();
			}
		)
	);

	linkArray.push(
		App.UI.DOM.link(
			"Randomize name",
			() => {
				nationalityToName(V.activeSlave);
				V.activeSlave.slaveName = V.activeSlave.birthName;
				App.UI.reload();
			}
		)
	);

	linkArray.push(
		App.UI.DOM.link(
			"Start over with a random slave",
			() => {
				V.activeSlave = App.StartingGirls.generate();
				App.UI.reload();
			}
		)
	);

	linkArray.push(
		App.UI.DOM.link(
			"Start over by selecting an archetype",
			() => {
				const el = new DocumentFragment();
				App.UI.DOM.appendNewElement("div", el, "Convenient combinations of slave attributes", "note");
				App.UI.DOM.appendNewElement("div", el, App.UI.DOM.link(
					"Irish Rose",
					() => {
						V.activeSlave = App.StartingGirls.generate({nationality: "Irish", race: "white"});
						V.activeSlave.eye.origColor = "green";
						V.activeSlave.origSkin = "fair";
						V.activeSlave.origHColor = "red";
						V.activeSlave.markings = "heavily freckled";
						V.activeSlave.face = 55;
						App.UI.reload();
					}
				), "indent")
					.append(App.UI.DOM.makeElement("span", " A beautiful flower from the Emerald Isle", "note"));

				App.UI.DOM.appendNewElement("div", el, App.UI.DOM.link(
					"Cali Girl",
					() => {
						V.activeSlave = App.StartingGirls.generate({nationality: "American", race: "white"});
						V.activeSlave.eye.origColor = "blue";
						V.activeSlave.skin = "sun tanned";
						V.activeSlave.override_Skin = 1;
						V.activeSlave.origHColor = "blonde";
						V.activeSlave.markings = "none";
						V.activeSlave.face = 55;
						V.activeSlave.muscles = 20;
						V.activeSlave.weight = -20;
						V.activeSlave.natural.height = 190;
						V.activeSlave.height = Height.forAge(V.activeSlave.natural.height, V.activeSlave);
						App.UI.reload();
					}
				), "indent")
					.append(App.UI.DOM.makeElement("span", " Tall, taut, and tan", "note"));

				App.UI.DOM.appendNewElement("div", el, App.UI.DOM.link(
					"Novice",
					() => {
						V.activeSlave = App.StartingGirls.generate({minAge: 18, maxAge: 18});
						V.activeSlave.skill.anal = 0;
						V.activeSlave.skill.oral = 0;
						V.activeSlave.skill.vaginal = 0;
						V.activeSlave.skill.penetrative = 0;
						V.activeSlave.skill.whoring = 0;
						V.activeSlave.skill.entertainment = 0;
						V.activeSlave.skill.combat = 0;
						V.activeSlave.fetishKnown = 0;
						V.activeSlave.attrKnown = 0;
						App.UI.reload();
					}
				), "indent")
					.append(App.UI.DOM.makeElement("span", " Train your own and save", "note"));

				App.UI.DOM.appendNewElement("div", el, App.UI.DOM.link(
					"Head Girl Prospect",
					() => {
						V.activeSlave = App.StartingGirls.generate({minAge: 36, maxAge: 44});
						V.activeSlave.career = App.Data.Careers.Leader.HG.random();
						V.activeSlave.intelligence = 70;
						V.activeSlave.intelligenceImplant = 0;
						App.UI.reload();
					}
				), "indent")
					.append(App.UI.DOM.makeElement("span", " Inexpensive potential to become a great right hand woman", "note"));

				if (V.seeExtreme !== 0) {
					App.UI.DOM.appendNewElement("div", el, App.UI.DOM.link(
						"Wellspring",
						() => {
							V.activeSlave = App.StartingGirls.generate({minAge: 18, maxAge: 18});
							V.activeSlave.skill.anal = 0;
							V.activeSlave.skill.oral = 0;
							V.activeSlave.skill.vaginal = 0;
							V.activeSlave.skill.penetrative = 0;
							V.activeSlave.skill.whoring = 0;
							V.activeSlave.skill.entertainment = 0;
							V.activeSlave.skill.combat = 0;
							V.activeSlave.fetishKnown = 0;
							V.activeSlave.attrKnown = 0;
							V.activeSlave.health.condition = 10;
							V.activeSlave.intelligence = -100;
							V.activeSlave.intelligenceImplant = 0;
							V.activeSlave.vagina = 3;
							V.activeSlave.anus = 3;
							V.activeSlave.ovaries = 1;
							V.activeSlave.dick = 5;
							V.activeSlave.balls = 5;
							V.activeSlave.prostate = 1;
							V.activeSlave.lactation = 2;
							V.activeSlave.lactationDuration = 2;
							V.activeSlave.nipples = "huge";
							V.activeSlave.boobs = 10000;
							App.UI.reload();
						}
					), "indent")
						.append(App.UI.DOM.makeElement("span", " Capable of producing all kinds of useful fluids", "note"));

					App.UI.DOM.appendNewElement("div", el, App.UI.DOM.link(
						"Onahole",
						() => {
							V.activeSlave = App.StartingGirls.generate();
							applyMindbroken(V.activeSlave);
							V.activeSlave.voice = 0;
							V.activeSlave.hears = 0;
							removeLimbs(V.activeSlave, "all");
							eyeSurgery(V.activeSlave, "both", "normal");
							App.UI.reload();
						}
					), "indent")
						.append(App.UI.DOM.makeElement("span", " A living cocksleeve", "note"));
				}

				App.UI.DOM.appendNewElement("div", el, App.UI.DOM.passageLink("Back", "Starting Girls"), "indent");
				jQuery(headerLinks).empty().append(el);
			}
		)
	);

	linkArray.push(
		App.UI.DOM.link(
			"Start over by selecting a nationality",
			() => {
				const el = new DocumentFragment();
				const linkArray = [];
				App.UI.DOM.appendNewElement("h3", el, "Start over by selecting a nationality:");
				for (const nation of App.Data.misc.baseNationalities) {
					linkArray.push(
						App.UI.DOM.link(
							nation,
							() => {
								V.activeSlave = App.StartingGirls.generate({nationality: nation});
								App.UI.reload();
							}
						)
					);
				}
				el.append(App.UI.DOM.generateLinksStrip(linkArray));
				App.UI.DOM.appendNewElement("div", el, App.UI.DOM.passageLink("Back", "Starting Girls"));
				jQuery(headerLinks).empty().append(el);
			}
		)
	);

	/**
	 * @param {FC.HumanState} source
	 * @param {App.Entity.SlaveState} template
	 * @param {function(App.Entity.SlaveState): void} [afterCreateCB]
	 * */
	function relativeLinkStrip(source, template, afterCreateCB) {
		const relatives = [];
		const finish = (slave) => {
			App.StartingGirls.randomizeUnknowns(slave);
			if (typeof afterCreateCB === "function") {
				afterCreateCB(slave);
			}
		};
		const makeSiblingLink = (sibling) => {
			return App.UI.DOM.link(capFirstChar(sibling), () => {
				setMissingParents(source);
				template.mother = source.mother;
				template.father = source.father;
				V.activeSlave = generateRelatedSlave(template, sibling);
				finish(V.activeSlave);
				App.UI.reload();
			});
		};
		if (source) {
			relatives.push(makeSiblingLink("twin"));
			if (V.seeDicks !== 100 && source.mother === 0) {
				const ageRange = getParentAgeRange(source, false);
				if (ageRange.min <= ageRange.max) {
					relatives.push(
						App.UI.DOM.link("Mother", () => {
							V.activeSlave = generateRelatedSlave(template, "mother");
							finish(V.activeSlave);
							source.mother = V.activeSlave.ID;
							App.UI.reload();
						})
					);
				}
			}
			if (V.seeDicks !== 0 && source.father === 0) {
				const ageRange = getParentAgeRange(source, true);
				if (ageRange.min <= ageRange.max) {
					relatives.push(
						App.UI.DOM.link("Father", () => {
							V.activeSlave = generateRelatedSlave(template, "father");
							finish(V.activeSlave);
							source.father = V.activeSlave.ID;
							App.UI.reload();
						})
					);
				}
			}
			if (source.actualAge < V.retirementAge - 2) {
				if (V.seeDicks !== 100) {
					relatives.push(makeSiblingLink("older sister"));
				}
				if (V.seeDicks !== 0) {
					relatives.push(makeSiblingLink("older brother"));
				}
			}
			if (source.actualAge > V.minimumSlaveAge + 2) {
				if (V.seeDicks !== 100) {
					relatives.push(makeSiblingLink("younger sister"));
				}
				if (V.seeDicks !== 0) {
					relatives.push(makeSiblingLink("younger brother"));
				}
			}
			if (source.actualAge > V.minimumSlaveAge + 11) {
				if (V.seeDicks !== 100) {
					relatives.push(
						App.UI.DOM.link("Daughter", () => {
							V.activeSlave = generateRelatedSlave(template, "daughter");
							finish(V.activeSlave);
							App.UI.reload();
						})
					);
				}
				if (V.seeDicks !== 0) {
					relatives.push(
						App.UI.DOM.link("Son", () => {
							V.activeSlave = generateRelatedSlave(template, "son");
							finish(V.activeSlave);
							App.UI.reload();
						})
					);
				}
			}
		}
		return App.UI.DOM.generateLinksStrip(relatives);
	}

	linkArray.push(
		App.UI.DOM.link(
			"Start over with your relative",
			() => {
				const pcAsSlave = convertPlayerToSlave(V.PC, "none");
				pcAsSlave.ID = -1; // cheesy but works...DO NOT try to use this abomination for anything else
				App.UI.DOM.appendNewElement("div", el, relativeLinkStrip(V.PC, pcAsSlave, (rel) => {
					// reset some stuff that shouldn't be copied from player conversion onto relatives
					rel.career = randomCareer(rel); // not arcology owners
					rel.skill = new App.Entity.SlaveSkillsState();
					rel.trust = 0;
					rel.devotion = 0;
					rel.origin = "$auto"; // TODO: maybe want custom automatic origins for PC relatives?
				}));
				App.UI.DOM.appendNewElement("div", el, App.UI.DOM.passageLink("Back", "Starting Girls"));
				jQuery(headerLinks).empty().append(el);
			}
		)
	);

	const newSlaves = V.slaves.filter(s => s.newGamePlus === 0);
	if (newSlaves.length > 0) {
		linkArray.push(
			App.UI.DOM.link(
				`Start over with a finalized slave's relative`,
				() => {
					const el = new DocumentFragment();

					const options = [];
					for (const slave of newSlaves) {
						options.push({
							key: slave.ID.toString(),
							name: `${SlaveFullName(slave)} (${slave.genes}, ${slave.actualAge})`
						});
					}
					const select = App.UI.DOM.makeSelect(options, null, slaveID => {
						const srcSlave = getSlave(Number.parseInt(slaveID));
						jQuery(linkDiv).empty().append(relativeLinkStrip(srcSlave, srcSlave));
					});
					App.UI.DOM.appendNewElement("div", el, App.UI.DOM.combineNodes(`Relative of slave: `, select));

					const linkDiv = App.UI.DOM.appendNewElement("div", el, ``);
					App.UI.DOM.appendNewElement("div", el, "Warning: related slaves will influence each other's opinion of you, and may become difficult to control if not properly broken.", "note");
					App.UI.DOM.appendNewElement("div", el, App.UI.DOM.passageLink("Back", "Starting Girls"));
					jQuery(headerLinks).empty().append(el);
				}
			)
		);
	}

	linkArray.push(App.UI.DOM.passageLink("Take control of your arcology", "Acquisition"));
	headerLinks.append(App.UI.DOM.generateLinksStrip(linkArray));
	el.append(headerLinks);
	App.UI.DOM.appendNewElement("hr", el);

	App.StartingGirls.cleanup(V.activeSlave);
	SlaveDatatypeCleanup(V.activeSlave);

	if (V.activeSlave.father === -1) {
		if (V.PC.dick === 0) {
			V.activeSlave.father = 0;
		} else if ((V.PC.actualAge - V.activeSlave.actualAge) < V.minimumSlaveAge || ((V.PC.actualAge - V.activeSlave.actualAge) < V.potencyAge)) {
			V.activeSlave.father = 0;
		}
		if (V.saveImported === 1) {
			V.activeSlave.father = 0;
		}
	}
	if (V.activeSlave.mother === -1) {
		if (V.PC.vagina === -1) {
			V.activeSlave.mother = 0;
		} else if (((V.PC.actualAge - V.activeSlave.actualAge) < V.minimumSlaveAge) || ((V.PC.actualAge - V.activeSlave.actualAge) < V.fertilityAge)) {
			V.activeSlave.mother = 0;
		}
		if (V.saveImported === 1) {
			V.activeSlave.mother = 0;
		}
	}

	App.UI.DOM.appendNewElement("h2", el, "You are customizing this slave:");
	el.append(App.Desc.longSlave(V.activeSlave, {market: "starting"}));

	const tabBar = new App.UI.Tabs.TabBar("StartingGirls");
	tabBar.addTab("Profile", "profile", App.StartingGirls.profile(V.activeSlave));
	tabBar.addTab("Physical", "physical", App.StartingGirls.physical(V.activeSlave));
	tabBar.addTab("Upper", "upper", App.StartingGirls.upper(V.activeSlave));
	tabBar.addTab("Lower", "lower", App.StartingGirls.lower(V.activeSlave));
	tabBar.addTab("Genetic Quirks", "genes", App.StartingGirls.genes(V.activeSlave));
	tabBar.addTab("Mental", "mental", App.StartingGirls.mental(V.activeSlave));
	tabBar.addTab("Skills", "skills", App.StartingGirls.skills(V.activeSlave));
	tabBar.addTab("Stats", "stats", App.StartingGirls.stats(V.activeSlave));
	tabBar.addTab("Family", "family", App.Intro.editFamily(V.activeSlave));
	tabBar.addTab("Body Mods", "body-mods", App.UI.bodyModification(V.activeSlave, true));
	tabBar.addTab("Salon", "salon", App.UI.salon(V.activeSlave, true, true));
	tabBar.addTab("Import / Export", "import-export", importExportContent());
	tabBar.addTab("Finalize", "finalize", App.StartingGirls.finalize(V.activeSlave),
		startingSlaveCost(V.activeSlave) > V.cash ? "show-warning" : undefined);
	el.append(tabBar.render());

	return el;

	/**
	 * @returns {DocumentFragment}
	 */
	function importExportContent() {
		const el = new DocumentFragment();

		App.UI.DOM.appendNewElement("div", el, "This functionality is currently experimental.", ["warning"]);

		const textareaElement = App.UI.DOM.makeElement("textarea", JSON.stringify(V.activeSlave, null, 2));

		App.UI.DOM.appendNewElement("div", el,
			App.UI.DOM.link("Export this slave", () => {
				textareaElement.value = JSON.stringify(V.activeSlave, null, 2);
			})
		);

		App.UI.DOM.appendNewElement("div", el,
			App.UI.DOM.link(
				"Import this slave",
				() => {
					const slave = JSON.parse(textareaElement.value);
					App.Update.Slave(slave);
					App.Entity.Utils.SlaveDataSchemeCleanup(slave);
					SlaveDatatypeCleanup(slave);
					removeJob(slave, slave.assignment);
					V.activeSlave = slave;
					App.UI.reload();
				},
			)
		);

		el.append(textareaElement);

		return el;
	}
};
