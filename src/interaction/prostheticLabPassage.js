App.UI.prostheticLab = function() {
	const node = new DocumentFragment();

	let r = [];
	V.researchLab.speed = ((V.researchLab.hired * 3) + V.researchLab.menials) * V.researchLab.aiModule;
	const staff = V.researchLab.hired + V.researchLab.menials;
	let linkArray = [];

	App.UI.DOM.appendNewElement("h1", node, "The Prosthetics Lab");

	if (V.adjustProsthetics.length > V.adjustProstheticsCompleted) {
		App.UI.DOM.appendNewElement("h2", node, "External contract workers");
		App.UI.DOM.appendNewElement("div", node, `Currently adjusting these prosthetics:`);
		for (const p of V.adjustProsthetics) {
			if (p.workLeft > 0) {
				App.UI.DOM.appendNewElement("div", node,
					`${capFirstChar(App.Data.prosthetics[p.id].name)} for ${SlaveFullName(getSlave(p.slaveID))}`,
					"indent"
				);
			}
		}
	}

	if (V.researchLab.level > 0) {
		App.UI.DOM.appendNewElement("h2", node, "Research Department");
		App.UI.DOM.appendNewElement("div", node, "You switch one of the screens in your office to the feed from your research facility.", "note");

		App.UI.DOM.appendNewElement("h3", node, "Personnel");

		if (V.researchLab.aiModule === 1) {
			const div = document.createElement("div");
			div.append(App.UI.DOM.link("Buy and install research module", () => {
				cashX(forceNeg(35000 * V.upgradeMultiplierArcology), "capEx");
				V.researchLab.aiModule = 2;
				App.UI.reload();
			}));
			App.Events.addNode(div, [` Costs ${cashFormatColor(35000 * V.upgradeMultiplierArcology)}`]);
			node.append(div);
			App.UI.DOM.appendNewElement("div", node,
				`This module enables your personal assistant to assist staff and direct menials assigned to your research facility, increasing efficiency.`,
				["note", "indent"]);
		}
		if ((staff) === 0) {
			App.UI.DOM.appendNewElement("div", node, "Facility is currently not staffed.");
		} else {
			r.push(`You have`);
			if (V.researchLab.hired === 1) {
				r.push(`one scientist`);
			} else if (V.researchLab.hired > 1) {
				r.push(`${V.researchLab.hired} scientists`);
			}
			if (V.researchLab.hired > 0 && V.researchLab.menials > 0) {
				r.push(`and`);
			}
			if (V.researchLab.menials === 1) {
				r.push(`one menial slave`);
			} else if (V.researchLab.menials > 1) {
				r.push(`${V.researchLab.menials} menials`);
			}
			r.push(`working in your lab.`);
			const {
				heA
			} = getPronouns(assistant.pronouns().main).appendSuffix("A");
			if (V.researchLab.aiModule > 1) {
				r.push(`Occasionally you hear the voice of your assistant as ${heA} helps direct and organize work.`);
			}
			App.Events.addNode(node, r, "div");
			r = [];
		}

		App.UI.DOM.appendNewElement("div", node, `Currently, this facility can employ ${V.researchLab.maxSpace} people.`, ["indent",
			"note"]);
		if (V.researchLab.maxSpace >= 5) { // Exists
			if (V.researchLab.maxSpace < 50) { // Can upgrade
				const maxSpace = [5, 10, 20, 30, 40, 50];
				const upgrade = maxSpace[maxSpace.indexOf(V.researchLab.maxSpace) + 1];
				App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
					"Expand facility",
					() => {
						cashX(forceNeg(Math.trunc(500 * upgrade * V.upgradeMultiplierArcology)), "capEx");
						V.researchLab.maxSpace = upgrade;
						App.UI.reload();
					}), ["indent"]
				);
			}
		}

		// <div style="padding-top:1em">
		if (staff < V.researchLab.maxSpace) {
			const space = (V.researchLab.maxSpace - (staff));
			linkArray = [];
			for (const num of [1, 5, 10]) {
				if (space >= num) {
					linkArray.push(App.UI.DOM.link(
						`${num}x`,
						() => {
							V.researchLab.hired += num;
							cashX(forceNeg(2000 * num), "labScientistsTransfer");
							App.UI.reload();
						}
					));
				} else {
					break;
				}
			}
			App.Events.addNode(node, ["Hire", App.UI.DOM.generateLinksStrip(linkArray), "scientists."]);
			App.Events.addNode(node, [`Each scientist will require an initial fee of ${cashFormatColor(2000)} and incur ${cashFormatColor(300)} weekly.`], "div", ["indent",
				"note"]);

			if (V.menials > 0) {
				const space = (V.researchLab.maxSpace - (staff));
				linkArray = [];
				for (const num of [1, 5, 10]) {
					if (space >= num && V.menials >= num) {
						linkArray.push(App.UI.DOM.link(
							`${num}x`,
							() => {
								V.researchLab.menials += num;
								V.menials -= num;
								App.UI.reload();
							}
						));
					} else {
						break;
					}
				}
				App.Events.addNode(node, ["Assign", App.UI.DOM.generateLinksStrip(linkArray), "menial slaves to lab."]);
			} else {
				App.UI.DOM.appendNewElement("div", node, `You do not own any unassigned menial slaves.`);
			}
			App.Events.addNode(node, [`Using menial slaves is much cheaper than hiring scientists, but they are less effective. Costs ${cashFormatColor(100)} per slave each week.`],
				"div", ["indent", "note"]);
		} else {
			App.UI.DOM.appendNewElement("div", node, "Facility is fully staffed.", ["indent", "note"]);
		}

		if (V.researchLab.hired > 0) {
			linkArray = [];
			for (const num of [1, 5, 10]) {
				if (V.researchLab.hired >= num) {
					linkArray.push(App.UI.DOM.link(
						`${num}x`,
						() => {
							V.researchLab.hired -= num;
							App.UI.reload();
						}
					));
				} else {
					break;
				}
			}
			App.Events.addNode(node, ["Fire", App.UI.DOM.generateLinksStrip(linkArray), "scientists."]);
		}
		if (V.researchLab.menials > 0) {
			linkArray = [];
			for (const num of [1, 5, 10]) {
				if (V.researchLab.menials >= num) {
					linkArray.push(App.UI.DOM.link(
						`${num}x`,
						() => {
							V.researchLab.menials -= num;
							V.menials += num;
							App.UI.reload();
						}
					));
				} else {
					break;
				}
			}
			App.Events.addNode(node, ["Dismiss", App.UI.DOM.generateLinksStrip(linkArray), "menial slaves."]);
		}

		App.UI.DOM.appendNewElement("h3", node, "Tasks");

		if (V.researchLab.tasks.length > 0) {
			let j = 0;
			if (V.researchLab.speed > 0) {
				App.UI.DOM.appendNewElement("div", node, `The following tasks are queued:`);
			} else {
				App.UI.DOM.appendNewElement("div", node, `You have projects planned but without researchers you won't be able to work on them:`);
			}

			const taskDiv = document.createElement("div");
			taskDiv.classList.add("grid-3columns-auto");

			for (let i = 0; i < V.researchLab.tasks.length; i++) {
				let r = [];
				switch (V.researchLab.tasks[i].type) {
					case "research":
						r.push(`You`);
						if (i === 0) {
							r.push(`are researching`);
						} else {
							r.push(`plan to research`);
						}
						break;
					case "craft":
						r.push(`You`);
						if (i === 0) {
							r.push(`are constructing`);
						} else {
							r.push(`plan to construct`);
						}
						break;
					case "craftFit":
						r.push(`For <span class="noteworthy">${SlaveFullName(getSlave(V.researchLab.tasks[i].slaveID))}</span> you`);
						if (i === 0) {
							r.push(`are constructing`);
						} else {
							r.push(`plan to construct`);
						}
						break;
					default:
						r.push(`<span class="error">Error: Unknown V.researchLab.tasks[_i].type: ${V.researchLab.tasks[i].type}</span > `);
				}
				j += V.researchLab.tasks[i].workLeft;
				r.push(`<span class="noteworthy">${capFirstChar(App.Data.prosthetics[V.researchLab.tasks[i].id].name)}.</span>`);
				App.Events.addNode(taskDiv, r, "div", "indent");
				r = [];
				if (V.researchLab.speed > 0) {
					r.push(`Finished in approximately ${(Math.floor(j / V.researchLab.speed) + 1)} week(s).`);
				}
				App.Events.addNode(taskDiv, r, "div");
				r = [];

				r.push(App.UI.DOM.link(
					(V.researchLab.tasks[i].type === "research") ? "Cancel: Will not return investments." : "Cancel",
					() => {
						if (V.researchLab.tasks[i].type === "research") {
							V.prosthetics[V.researchLab.tasks[i].id].research = 0;
						}
						V.researchLab.tasks.deleteAt(i);
						App.UI.reload();
					}
				));
				App.Events.addNode(taskDiv, r, "div");
			}

			node.append(taskDiv);
		} else {
			App.UI.DOM.appendNewElement("div", node, `Currently the research lab has no tasks planned.`, "note");
		}

		App.UI.DOM.appendNewElement("h3", node, "Research");

		App.UI.DOM.appendNewElement("div", node, `Available research projects:`);
		const researchDiv = document.createElement("div");
		researchDiv.classList.add("grid-2columns-auto");
		for (let p of App.Data.prostheticIDs) {
			if (V.prosthetics[p].research === 0) {
				if (App.Data.prosthetics[p].level <= V.prostheticsUpgrade) {
					App.UI.DOM.appendNewElement("div", researchDiv, App.UI.DOM.link(`Reverse engineer ${addA(App.Data.prosthetics[p].name)}`,
						() => {
							cashX(forceNeg(App.Data.prosthetics[p].costs), "labResearch");
							V.prosthetics[p].research = -1;
							V.researchLab.tasks.push({
								type: "research",
								id: p,
								workLeft: App.Data.prosthetics[p].research
							});
							App.UI.reload();
						}
					), ["indent"]);
					App.Events.addNode(researchDiv, [` Costs ${cashFormatColor(App.Data.prosthetics[p].costs)} of initial investment.`], "div");
				} else {
					App.UI.DOM.appendNewElement("div", researchDiv, `You need better contracts to get the required research material for reverse engineering ${addA(App.Data.prosthetics[p].name)}.`, ["note",
						"grid-all-columns"]);
				}
			}
		}
		node.append(researchDiv);

		App.UI.DOM.appendNewElement("h3", node, "Manufacture");

		r.push(`Available building projects:`);
		for (let p of App.Data.prostheticIDs) {
			if (V.prosthetics[p].research === 1) {
				App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
					`Build ${addA(App.Data.prosthetics[p].name)}`,
					() => {
						V.researchLab.tasks.push({type: "craft", id: p, workLeft: App.Data.prosthetics[p].craft});
						App.UI.reload();
					}
				), "indent");
			}
		}

		App.UI.DOM.appendNewElement("h3", node, "Prepared prosthetics");
		App.Events.addParagraph(node, [getProstheticsStockpile()]);
	}

	return node;
};
