App.Neighbor.Interact = function() {
	const node = new DocumentFragment();

	App.UI.DOM.appendNewElement("h1", node, `Diplomacy`);

	if (V.cheatMode === 1) {
		App.UI.DOM.appendNewElement("div", node,
			App.UI.DOM.passageLink("Cheat Edit Neighboring Arcologies", "Neighbor Arcology Cheat"),
			["cheat-menu"]);
	}
	App.UI.DOM.appendNewElement("p", node, `You have ${V.arcologies.length - 1} neighbors.`);

	/** Return how much resources are being put towards the current choice.
	 * @param {string} option
	 */
	function affect(option) {
		if (V.arcologies[0][option] === 3) {
			return App.UI.DOM.makeElement("span", "widespread", "bold");
		} else if (V.arcologies[0][option] === 2) {
			return App.UI.DOM.makeElement("span", "limited", "bold");
		} else {
			return App.UI.DOM.makeElement("span", "nominal", "bold");
		}
	}

	/** Return a list of links based off how much resources are being put towards the current choice.
	 * @param {string} option
	 */
	function makeLinkList(option) {
		let linkArray = [];
		if (V.arcologies[0][option] < 3) {
			linkArray.push(App.UI.DOM.link(
				"Intensify",
				() => {
					V.arcologies[0][option]++;
					App.UI.reload();
				}
			));
		}
		if (V.arcologies[0][option] > 1) {
			linkArray.push(App.UI.DOM.link(
				"Moderate",
				() => {
					V.arcologies[0][option]--;
					App.UI.reload();
				}
			));
		}
		linkArray.push(App.UI.DOM.link(
			"Cancel",
			() => {
				V.arcologies[0][option + "Target"] = -1;
				App.UI.reload();
			}
		));
		return App.UI.DOM.generateLinksStrip(linkArray);
	}

	let nei = V.arcologies.find(function(s) { return s.direction === V.arcologies[0].embargoTarget; });
	if (!nei) {
		App.UI.DOM.appendNewElement("div", node, `You are not engaged in economic warfare against a neighboring arcology.`);
	} else {
		App.Events.addNode(node, [
			`You have targeted`,
			App.UI.DOM.makeElement("span", nei.name, "bold"),
			`for`,
			affect("embargo"),
			`economic warfare.`
		], "div");
		App.UI.DOM.appendNewElement("div", node, makeLinkList("embargo"), "indent");
	}

	nei = V.arcologies.find(function(s) { return s.direction === V.arcologies[0].influenceTarget; });
	if (!nei) {
		App.UI.DOM.appendNewElement("div", node, `You are not using your arcology's culture to attempt to influence neighboring arcologies' development.`);
	} else {
		App.Events.addNode(node, [
			`You have targeted`,
			App.UI.DOM.makeElement("span", nei.name, "bold"),
			`for cultural influence.`,
			App.UI.DOM.link("Stop",
				() => {
					V.arcologies[0].influenceTarget = -1;
					App.UI.reload();
				}
			)
		], "div");
	}

	if (V.PC.skill.hacking > 0) {
		nei = V.arcologies.find(function(s) { return s.direction === V.arcologies[0].CyberEconomicTarget; });
		if (!nei) {
			App.UI.DOM.appendNewElement("div", node, `You are not engaged in cyber warfare against a neighboring arcology.`);
		} else {
			App.Events.addNode(node, [
				`You have targeted`,
				App.UI.DOM.makeElement("span", nei.name, "bold"),
				`for`,
				affect("CyberEconomic"),
				`cyber economic warfare.`
			], "div");
			App.UI.DOM.appendNewElement("div", node, makeLinkList("CyberEconomic"), "indent");
		}

		nei = V.arcologies.find(function(s) { return s.direction === V.arcologies[0].CyberReputationTarget; });
		if (!nei) {
			App.UI.DOM.appendNewElement("div", node, `You are not engaged in character assassination against a neighboring arcology.`);
		} else {
			App.Events.addNode(node, [
				`You have targeted the leadership of`,
				App.UI.DOM.makeElement("span", nei.name, "bold"),
				`for`,
				affect("CyberReputation"),
				`character assassination.`
			], "div");
			App.UI.DOM.appendNewElement("div", node, makeLinkList("CyberReputation"), "indent");
		}
	}

	const interact = (function() {
		let nd = new App.Neighbor.Display((id) => replaceDetails(id));
		const DEMAND_PER_PERCENT = 2;

		return list;

		/** Output the arcology list
		 * @returns {DocumentFragment}
		 */
		function list() {
			for (let i = 1; i < V.arcologies.length; i++) {
				V.arcologies[i].prosperity = Math.clamp(V.arcologies[i].prosperity, 1, 400);
			}
			if (!V.activeArcologyIdx) {
				V.activeArcologyIdx = 0;
			}

			let frag = document.createDocumentFragment();

			// set up the neighbor display list itself
			frag.append(nd.render());
			$(document).one(':passagedisplay', () => nd.select(V.activeArcologyIdx));

			// empty container for details
			const detailSpan = App.UI.DOM.appendNewElement("span", frag, "", "margin-top");
			detailSpan.id = "neighbor-details";

			return frag;
		}

		/** Replace the details block with an updated one for the given arcology
		 * Used both as a refresh and as a selection handler
		 * @param {number} arcID
		 */
		function replaceDetails(arcID) {
			V.activeArcologyIdx = arcID;
			const container = $("#neighbor-details").empty();
			container.append(App.UI.neighborDescription(arcID));
			container.append(details(arcID));
		}

		/** Re-render most of the page because some important arcology property (FS, government, ownership) may have changed
		 * @param {number} arcID for reselection
		 */
		function arcChanged(arcID) {
			nd.rerender();
			nd.select(arcID);
		}

		/** Create a fragment containing all the details for a given arcology
		 * @param {number} arcID
		 * @returns {DocumentFragment}
		 */
		function details(arcID) {
			let frag = document.createDocumentFragment();
			if (arcID === 0) {
				const desc = FutureSocieties.activeFSes(V.arcologies[0]).map((f) => FutureSocieties.displayName(f));
				if (desc.length === 0) {
					App.UI.DOM.appendNewElement("p", frag, `Your arcology's culture has not developed to the point where it can meaningfully influence other arcologies.`);
				} else if (desc.length > 2) {
					App.UI.DOM.appendNewElement("p", frag, `Your arcology's mature culture is capable of exerting great cultural sway over other arcologies. It can readily project ${toSentence(desc)}.`);
				} else if (desc.length === 2) {
					App.UI.DOM.appendNewElement("p", frag, `Your arcology's culture is capable of exerting some cultural sway over other arcologies. It can effectively project ${desc[0]} and ${desc[1]}.`);
				} else {
					App.UI.DOM.appendNewElement("p", frag, `Your arcology's culture is capable of starting to exert cultural sway over other arcologies. It can project ${desc[0]}.`);
				}
			} else {
				frag.append(`A 1% interest in this arcology is worth ${cashFormat(buyValue(V.arcologies[arcID], 1))}. `);
				if (V.arcologies[arcID].ownership + V.arcologies[arcID].PCminority + V.arcologies[arcID].minority < 100) {
					frag.append(`The transaction fee is ${cashFormat(10000)}.`);
				}

				if (V.arcologies[arcID].ownership + V.arcologies[arcID].PCminority + V.arcologies[arcID].minority < 100) {
					let links = [];
					links.push(App.UI.DOM.link("Buy", () => {
						cashX(-(buyValue(V.arcologies[arcID], 1) + 10000), "war");
						V.arcologies[arcID].PCminority += 1;
						V.arcologies[arcID].demandFactor += DEMAND_PER_PERCENT;
					}, [], "Neighbor Interact"));
					if (V.arcologies[arcID].ownership + V.arcologies[arcID].PCminority + V.arcologies[arcID].minority <= 90) {
						if (V.cash > buyValue(V.arcologies[arcID], 10) + 10000) {
							const link = App.UI.DOM.link("10%", () => {
								cashX(-(buyValue(V.arcologies[arcID], 10) + 10000), "war");
								V.arcologies[arcID].PCminority += 10;
								V.arcologies[arcID].demandFactor += DEMAND_PER_PERCENT * 10;
							}, [], "Neighbor Interact");
							links.push(link);
						}
					}
					const div = App.UI.DOM.appendNewElement("div", frag, App.UI.DOM.generateLinksStrip(links));
					if (links.length > 1) {
						App.UI.DOM.appendNewElement("span", div, " Transaction costs will only be paid once.", ["detail"]);
					}
				}

				if (V.arcologies[arcID].PCminority > 0) {
					let links = [];
					links.push(App.UI.DOM.link("Sell", () => {
						cashX(sellValue(V.arcologies[arcID], 1), "war");
						V.arcologies[arcID].PCminority -= 1;
						V.arcologies[arcID].demandFactor -= DEMAND_PER_PERCENT;
						if (V.arcologies[arcID].government !== "your agent" && V.arcologies[arcID].government !== "your trustees" && V.arcologies[arcID].rival !== 1) {
							if (V.arcologies[arcID].ownership + V.arcologies[arcID].PCminority + V.arcologies[arcID].minority < 10) {
								V.arcologies[arcID].ownership += 10;
							}
						}
						arcChanged(arcID);
					}, [], "Neighbor Interact"));
					if (V.arcologies[arcID].PCminority >= 10) {
						links.push(App.UI.DOM.link("10%", () => {
							cashX(sellValue(V.arcologies[arcID], 10), "war");
							V.arcologies[arcID].PCminority -= 10;
							V.arcologies[arcID].demandFactor -= DEMAND_PER_PERCENT * 10;
							if (V.arcologies[arcID].government !== "your agent" && V.arcologies[arcID].government !== "your trustees" && V.arcologies[arcID].rival !== 1) {
								if (V.arcologies[arcID].ownership + V.arcologies[arcID].PCminority + V.arcologies[arcID].minority < 10) {
									V.arcologies[arcID].ownership += 10;
								}
							}
						}, [], "Neighbor Interact"));
					}
					App.UI.DOM.appendNewElement("div", frag, App.UI.DOM.generateLinksStrip(links));
				}

				if (V.arcologies[arcID].direction !== V.arcologies[0].embargoTarget) {
					frag.append(document.createElement("br"));
					frag.append(App.UI.DOM.passageLink("Target them for economic warfare", "Neighbor Interact", () => V.arcologies[0].embargoTarget = V.arcologies[arcID].direction));
				}

				if (V.PC.skill.hacking > 0) {
					if (V.arcologies[arcID].direction !== V.arcologies[0].CyberEconomicTarget) {
						frag.append(document.createElement("br"));
						frag.append(App.UI.DOM.passageLink("Target them for cyber economic warfare", "Neighbor Interact", () => V.arcologies[0].CyberEconomicTarget = V.arcologies[arcID].direction));
					}
					if (V.arcologies[arcID].direction !== V.arcologies[0].CyberReputationTarget) {
						frag.append(document.createElement("br"));
						frag.append(App.UI.DOM.passageLink("Target their leadership for character assassination", "Neighbor Interact", () => V.arcologies[0].CyberReputationTarget = V.arcologies[arcID].direction));
					}
				}
				if (FutureSocieties.influenceSources(0).length > 0) {
					if (V.arcologies[arcID].direction !== V.arcologies[0].influenceTarget) {
						frag.append(document.createElement("br"));
						frag.append(App.UI.DOM.passageLink("Set as influence target", "Neighbor Interact", () => V.arcologies[0].influenceTarget = V.arcologies[arcID].direction));
					}
				}

				if (V.arcologies[arcID].government === "your trustees" || V.arcologies[arcID].government === "your agent") {
					frag.append(controlActions(arcID));
				}

				frag.append(fsGoods(arcID));
			}
			return frag;
		}

		/**
		 * How much does it cost to buy x percent of a given arcology
		 * @param {FC.ArcologyState} arc
		 * @param {number} percent
		 * @returns {number}
		 */
		function buyValue(arc, percent) {
			const baseValue = 500 * arc.prosperity;
			// scale the demand in such a way that buying twice in a row costs the same as buying double once.
			const scaledDemand = arc.demandFactor + (DEMAND_PER_PERCENT * (percent / 2));
			const scalingFactor = 1 + (scaledDemand / 100);
			return Math.round(baseValue * scalingFactor * percent);
		}

		/**
		 * How much does the player get when selling x percent of a given arcology
		 * @param {FC.ArcologyState} arc
		 * @param {number} percent
		 * @returns {number}
		 */
		function sellValue(arc, percent) {
			const baseValue = 500 * arc.prosperity;
			// scale the demand in such a way that selling twice in a row gives the same as selling double once.
			const scaledDemand = arc.demandFactor - (DEMAND_PER_PERCENT * (percent / 2));
			const scalingFactor = 1 + (scaledDemand / 100);
			return Math.round(baseValue * scalingFactor * percent);
		}

		/** Create a div containing actions specific to arcologies that are under the player's control
		 * @param {number} arcID
		 * @returns {Element}
		 */
		function controlActions(arcID) {
			const container = document.createElement("div");
			const agent = App.currentAgent(arcID);
			const him = agent ? getPronouns(agent).him : "them";
			container.append(document.createElement("br"));
			if (V.arcologies[arcID].government === "your trustees") {
				container.append(App.UI.DOM.passageLink("Appoint an agent", "Agent Select"));
			} else {
				let linkText = `Recall and reenslave ${him}`;
				const residentList = [agent.ID];
				const agentPartner = V.slaves.find((s) => s.assignment === Job.AGENTPARTNER && s.relationshipTarget === agent.ID);
				if (agentPartner) {
					linkText = `Recall them and reenslave your agent`;
					residentList.push(agentPartner.ID);
				}
				container.append(App.UI.SlaveList.render(residentList, [], App.UI.SlaveList.SlaveInteract.stdInteract));
				container.append(App.UI.DOM.link(linkText, () => {
					removeJob(agent, "be your agent");
					arcChanged(arcID);
				}));
			}
			container.append(" | ");
			const rename = App.UI.DOM.appendNewElement("span", container, '');
			rename.id = "rename";
			rename.append(App.UI.DOM.link(`Instruct ${him} to rename the arcology`, () => $("#rename").replaceWith([
				App.UI.DOM.makeTextBox(V.arcologies[arcID].name, (s) => {
					V.arcologies[arcID].name = s;
				}, false),
				App.UI.DOM.link("Confirm name", arcChanged, [arcID])
			])));

			if (V.arcologies[arcID].government === "your agent") {
				const {His, his, he, himself /* him is already set */} = getPronouns(agent);
				let r = [];
				r.push(`${His} ${agent.intelligence > 95 ? `brilliance` : `intelligence`} and education are the most important qualities for ${him}.`);
				if (agent.actualAge > 35) {
					r.push(`As with the Head Girl position, ${his} age and experience lend ${him} leadership weight.`);
				}
				if (agent.career === "an arcology owner") {
					r.push(`${His} career as an arcology owner ${himself} is, obviously, useful to ${him}.`);
				} else if (App.Data.Careers.Leader.HG.includes(agent.career)) {
					r.push(`${His} career in leadership helps ${him}.`);
				}
				if (agent.fetishStrength > 95) {
					if ((agent.fetish === "dom") || (agent.fetish === "sadist")) {
						r.push(`${His} sexually dominant fetish helps ${him} fill a leadership role.`);
					} else if ((agent.fetish === Fetish.SUBMISSIVE) || (agent.fetish === "masochist")) {
						r.push(`Unfortunately, ${he} has an inappropriate fetish for a leader.`);
					} else {
						r.push(`${His} sexual fetishes will influence how ${he} leads the arcology.`);
					}
				}
				if (agent.energy > 95) {
					r.push(`Finally, ${his} sexual depravity lets ${him} fit into arcology society naturally.`);
				}
				App.UI.DOM.appendNewElement("div", container, r.join(' '));
			}

			container.append(document.createElement("br"));
			const forceAbandonment = (fs) => {
				V.arcologies[arcID][fs] = null;
				arcChanged(arcID);
			};
			for (const fs of FutureSocieties.activeFSes(V.arcologies[arcID])) {
				App.UI.DOM.appendNewElement("div", container, App.UI.DOM.link(`Force abandonment of ${FutureSocieties.displayName(fs)}`, forceAbandonment, [fs]));
			}

			return container;
		}

		/** Create an element containing all the society-dependent stuff you can buy from this arcology.
		 * @param {number} arcID
		 * @returns {Element}
		 */
		function fsGoods(arcID) {
			const container = document.createElement("div");
			const arcology = V.arcologies[arcID];
			let r = [];
			r.push(`If ${arcology.name} has developed enough to begin exporting worthwhile goods, it may be of interest to acquire some.`);
			const opinionDiscount = App.Neighbor.opinion(arcology, V.arcologies[0]) * 10;
			const basePrice = Math.trunc((7500 - opinionDiscount) * V.upgradeMultiplierTrade);
			const controlled = (arcology.government === "your trustees") || (arcology.government === "your agent");
			if (controlled) {
				r.push(`Since it is under your control, it is no problem at all to request the transfer of goods to ${V.arcologies[0].name}.`);
			} else if (V.PC.skill.hacking >= 50) {
				r.push(`It is within your skills to redirect an outgoing shipment to ${V.arcologies[0].name} for your retrieval.`);
			} else if (arcology.direction === V.arcologies[0].embargoTarget) {
				r.push(`However, due to your active embargo, trade with ${arcology.name} is not possible.`);
			}
			App.UI.DOM.appendNewElement("p", container, r.join(' '));

			let exports = 0;

			/** Build a link or text block describing how to acquire a specific good from this arcology
			 * @param {string} fsRequired - the FS that the arcology has to have for this block to appear
			 * @param {string} itemName - the item name to check to see if the player already has this item
			 * @param {string} category - the category to check to see if the player already has this item
			 * @param {string} itemDisplay - a display name for a group of the item; as in, "a shipment of XXX" or "enough XXX"
			 * @param {function(): void} property - adjusts the global property controlling whether this item has been acquired
			 * @param {number} [itemPrice] - the price the player should pay for the item; by default, basePrice (computed above)
			 */
			function addAcquisitionBlock(fsRequired, itemName, category, itemDisplay, property, itemPrice = basePrice) {
				if (arcology[fsRequired] > 95) {
					if (!isItemAccessible.entry(itemName, category)) {
						if (controlled) {
							const link = App.UI.DOM.link(`Request a shipment of ${itemDisplay}`, () => {
								property();
								replaceDetails(arcID);
							});
							App.UI.DOM.appendNewElement("div", container, link);
						} else if (V.PC.skill.hacking >= 50) {
							const link = App.UI.DOM.link(`Divert an outgoing shipment of ${itemDisplay}`, () => {
								property();
								replaceDetails(arcID);
							});
							App.UI.DOM.appendNewElement("div", container, link);
						} else if (arcology.direction !== V.arcologies[0].embargoTarget) {
							const link = App.UI.DOM.link(`Divert an outgoing shipment of ${itemDisplay}`, () => {
								property();
								cashX(forceNeg(itemPrice), "capEx");
								replaceDetails(arcID);
							});
							const div = App.UI.DOM.appendNewElement("div", container, link);
							App.UI.DOM.appendNewElement("span", div, `Will cost ${cashFormat(itemPrice)}`, ["detail"]);
						}
					} else {
						App.UI.DOM.appendNewElement("div", container, `You already have enough ${itemDisplay}.`);
					}
					exports = 1;
				}
			}

			addAcquisitionBlock("FSRomanRevivalist", "a toga", "clothes", "togas", () => { V.boughtItem.clothing.toga = 1; });
			addAcquisitionBlock("FSEdoRevivalist", "a kimono", "clothes", "kimonos", () => { V.boughtItem.clothing.kimono = 1; });
			addAcquisitionBlock("FSArabianRevivalist", "harem gauze", "clothes", "silken harem garb", () => { V.boughtItem.clothing.harem = 1; });
			addAcquisitionBlock("FSAztecRevivalist", "a huipil", "clothes", "huipils", () => { V.boughtItem.clothing.huipil = 1; });
			addAcquisitionBlock("FSChineseRevivalist", "a slutty qipao", "clothes", "skimpy qipaos", () => { V.boughtItem.clothing.qipao = 1; });
			addAcquisitionBlock("FSEgyptianRevivalist", "ancient Egyptian", "collar", "Egyptian necklace replicas", () => { V.boughtItem.clothing.egypt = 1; });
			addAcquisitionBlock("FSPaternalist", "conservative clothing", "clothes", "conservative clothing", () => { V.boughtItem.clothing.conservative = 1; });
			addAcquisitionBlock("FSDegradationist", "chains", "clothes", "binding chains", () => { V.boughtItem.clothing.chains = 1; });
			addAcquisitionBlock("FSGenderFundamentalist", "a bunny outfit", "clothes", "bunny suits", () => { V.boughtItem.clothing.bunny = 1; });
			addAcquisitionBlock("FSIntellectualDependency", "a bimbo outfit", "clothes", "bimbo attire", () => { V.boughtItem.clothing.bimbo = 1; });
			addAcquisitionBlock("FSSlaveProfessionalism", "a courtesan dress", "clothes", "courtesan dresses", () => { V.boughtItem.clothing.courtesan = 1; });
			// addAcquisitionBlock("FSPetiteAdmiration", "petite dress", "clothes", "petite-sized dresses", () => { V.boughtItem.clothing.petite = 1; });
			addAcquisitionBlock("FSPhysicalIdealist", "body oil", "clothes", "body oil", () => { V.boughtItem.clothing.oil = 1; });
			addAcquisitionBlock("FSHedonisticDecadence", "stretch pants and a crop-top", "clothes", "stretch pants and crop-tops", () => { V.boughtItem.clothing.lazyClothes = 1; });
			addAcquisitionBlock("FSChattelReligionist", "a chattel habit", "clothes", "chattel religionist habits", () => { V.boughtItem.clothing.habit = 1; });
			addAcquisitionBlock("FSPastoralist", "Western clothing", "clothes", "Western clothing", () => { V.boughtItem.clothing.western = 1; });
			addAcquisitionBlock("FSRepopulationFocus", "a maternity dress", "clothes", "maternity dresses", () => { V.boughtItem.clothing.maternityDress = 1; });
			addAcquisitionBlock("FSRepopulationFocus", "attractive lingerie for a pregnant woman", "clothes", "maternity lingerie", () => { V.boughtItem.clothing.maternityLingerie = 1; });
			addAcquisitionBlock("FSRepopulationFocus", "a small empathy belly", "bellyAccessory", "empathy bellies", () => { V.boughtItem.clothing.belly = 1; });
			addAcquisitionBlock("FSStatuesqueGlorification", "platform heels", "shoes", "platform shoes", () => { V.boughtItem.shoes.heels = 1; });

			if (exports !== 1) {
				const luck = (arcology.direction === V.arcologies[0].embargoTarget) ? `Fortunately` : `Unfortunately`;
				App.UI.DOM.appendNewElement("p", container, `${luck}, they have nothing of value.`);
			}

			return container;
		}
	})();

	node.append(interact());

	return node;
};
