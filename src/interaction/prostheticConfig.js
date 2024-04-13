/**
 * @param {App.Entity.SlaveState} slave
 */
App.UI.prostheticsConfig = function(slave) {
	/* get all prosthetics that are ready for this slave */
	if (V.adjustProstheticsCompleted > 0) {
		V.adjustProsthetics = V.adjustProsthetics.filter(function(p) {
			if (p.workLeft <= 0 && p.slaveID === slave.ID) {
				addProsthetic(slave, p.id);
				V.adjustProstheticsCompleted--;
				return false;
			}
			return true;
		});
	}

	const {He, his, him} = getPronouns(slave);

	const fragment = document.createDocumentFragment();

	App.UI.DOM.appendNewElement("h1", fragment, "Prosthetic Configuration");
	const introP = App.UI.DOM.makeElement("p", "This room is lined with shelves and cabinets; it could be easily mistaken for a storage room if it were not for the examination table in its center.", "scene-intro");

	if (hasBothLegs(slave)) {
		App.UI.DOM.appendNewElement("div", introP, `${slave.slaveName} is obediently waiting for your instructions.`);
	} else {
		App.UI.DOM.appendNewElement("div", introP, `${slave.slaveName} is lying on the table, waiting for your instructions.`);
	}

	fragment.append(introP);

	fragment.append(eyes());
	fragment.append(ears());
	fragment.append(voice());
	fragment.append(limbs());
	fragment.append(tail());
	fragment.append(appendages());

	fragment.append(buyScreen());

	return fragment;

	/**
	 * @returns {DocumentFragment}
	 */
	function eyes() {
		const f = document.createDocumentFragment();

		if (hasAnyCyberneticEyes(slave)) {
			App.UI.DOM.appendNewElement("h2", f, "Eyes");
			const p = document.createElement("p");

			p.append(`${He} has ${hasBothCyberneticEyes(slave) ? "ocular implants" : "an ocular implant"} installed. You can change ${hasBothCyberneticEyes(slave) ? "their" : "its"} settings:`);

			const eyeContainer = document.createElement("div");
			eyeContainer.classList.add("eyeContainer", "choices");

			let on = 0;
			let blur = 0;
			let off = 0;
			if (getLeftEyeType(slave) === 3) {
				App.UI.DOM.appendNewElement("div", eyeContainer, "Left:");
				let div = document.createElement("div");
				if (getLeftEyeVision(slave) !== 2) {
					on++;
					div.append(App.UI.DOM.passageLink("[ON]", "Prosthetics Configuration", () => eyeSurgery(slave, "left", "fix")));
				} else {
					div.append("[ON]");
				}
				eyeContainer.append(div);
				div = document.createElement("div");

				if (getLeftEyeVision(slave) !== 1) {
					blur++;
					div.append(App.UI.DOM.passageLink("[BLUR]", "Prosthetics Configuration", () => eyeSurgery(slave, "left", "blur")));
				} else {
					div.append("[BLUR]");
				}
				eyeContainer.append(div);
				div = document.createElement("div");
				if (getLeftEyeVision(slave) !== 0) {
					off++;
					div.append(App.UI.DOM.passageLink("[OFF]", "Prosthetics Configuration", () => eyeSurgery(slave, "left", "blind")));
				} else {
					div.append("[OFF]");
				}
				eyeContainer.append(div);
			}
			if (getRightEyeType(slave) === 3) {
				App.UI.DOM.appendNewElement("div", eyeContainer, "Right:");
				let div = document.createElement("div");
				if (getRightEyeVision(slave) !== 2) {
					on++;
					div.append(App.UI.DOM.passageLink("[ON]", "Prosthetics Configuration", () => eyeSurgery(slave, "right", "fix")));
				} else {
					div.append("[ON]");
				}
				eyeContainer.append(div);
				div = document.createElement("div");

				if (getRightEyeVision(slave) !== 1) {
					blur++;
					div.append(App.UI.DOM.passageLink("[BLUR]", "Prosthetics Configuration", () => eyeSurgery(slave, "right", "blur")));
				} else {
					div.append("[BLUR]");
				}
				eyeContainer.append(div);
				div = document.createElement("div");
				if (getRightEyeVision(slave) !== 0) {
					off++;
					div.append(App.UI.DOM.passageLink("[OFF]", "Prosthetics Configuration", () => eyeSurgery(slave, "right", "blind")));
				} else {
					div.append("[OFF]");
				}
				eyeContainer.append(div);
			}
			if (hasBothCyberneticEyes(slave)) {
				App.UI.DOM.appendNewElement("div", eyeContainer, "Both:");
				let div = document.createElement("div");
				if (on > 0) {
					div.append(App.UI.DOM.passageLink("[ON]", "Prosthetics Configuration", () => eyeSurgery(slave, "both", "fix")));
				} else {
					div.append("[ON]");
				}
				eyeContainer.append(div);
				div = document.createElement("div");

				if (blur > 0) {
					div.append(App.UI.DOM.passageLink("[BLUR]", "Prosthetics Configuration", () => eyeSurgery(slave, "both", "blur")));
				} else {
					div.append("[BLUR]");
				}
				eyeContainer.append(div);
				div = document.createElement("div");
				if (off > 0) {
					div.append(App.UI.DOM.passageLink("[OFF]", "Prosthetics Configuration", () => eyeSurgery(slave, "both", "blind")));
				} else {
					div.append("[OFF]");
				}
				eyeContainer.append(div);
			}
			p.append(eyeContainer);

			const colorDiv = document.createElement("div");
			colorDiv.append(`${He} has ${App.Desc.eyesColor(slave)}. To change ${his} eye color visit the `, App.UI.DOM.passageLink("auto salon", "Salon"), ".");
			p.append(colorDiv);

			f.append(p);
		}
		return f;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function ears() {
		const f = document.createDocumentFragment();
		if (slave.earImplant === 1) {
			App.UI.DOM.appendNewElement("h2", f, "Ears");

			const p = document.createElement("p");
			p.append(`${He} has cochlear implants installed.`);
			if (slave.hears === 0) {
				p.append("They are operating normally.");
			} else if (slave.hears === -1) {
				p.append(`They are set to muffle ${his} hearing.`);
			} else {
				p.append("They are turned off.");
			}

			const links = [];
			if (slave.hears !== 0) {
				links.push(App.UI.DOM.passageLink("Restore hearing", "Prosthetics Configuration", () => {
					slave.hears = 0;
					V.prostheticsConfig = "hearing";
				}));
			}
			if (slave.hears !== -1) {
				links.push(App.UI.DOM.passageLink("Muffle hearing", "Prosthetics Configuration", () => {
					slave.hears = -1;
					V.prostheticsConfig = "hearing";
				}));
			}
			if (slave.hears !== -2) {
				links.push(App.UI.DOM.passageLink("Disable", "Prosthetics Configuration", () => {
					slave.hears = -2;
					V.prostheticsConfig = "hearing";
				}));
			}
			App.UI.DOM.appendNewElement("div", p, linkStrip(links), "choices");

			f.append(p);
		}
		return f;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function voice() {
		const f = document.createDocumentFragment();

		if (slave.electrolarynx === 1) {
			App.UI.DOM.appendNewElement("h2", f, "Voice");
			const p = document.createElement("p");
			p.append(`${He} has an electrolarynx installed. `);
			if (slave.voice === 0) {
				p.append("It is turned off.");
			} else if (slave.voice === 1) {
				p.append(`It is set to its "deep voice" setting.`);
			} else if (slave.voice === 2) {
				p.append(`It is set to its "normal voice" setting.`);
			} else if (slave.voice === 3) {
				p.append(`It is set to its "high voice" setting.`);
			}

			const links = [];
			if (slave.voice !== 0) {
				links.push(App.UI.DOM.passageLink("Disable", "Prosthetics Configuration", () => {
					slave.voice = 0;
					V.prostheticsConfig = "voice";
				}));
			}
			if (slave.voice !== 1) {
				links.push(App.UI.DOM.passageLink("Deep voice setting", "Prosthetics Configuration", () => {
					slave.voice = 1;
					V.prostheticsConfig = "voice";
				}));
			}
			if (slave.voice !== 2) {
				links.push(App.UI.DOM.passageLink("Standard voice setting", "Prosthetics Configuration", () => {
					slave.voice = 2;
					V.prostheticsConfig = "voice";
				}));
			}
			if (slave.voice !== 3) {
				links.push(App.UI.DOM.passageLink("High voice setting", "Prosthetics Configuration", () => {
					slave.voice = 3;
					V.prostheticsConfig = "voice";
				}));
			}
			App.UI.DOM.appendNewElement("div", p, linkStrip(links), "choices");

			f.append(p);
		}
		return f;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function limbs() {
		const f = document.createDocumentFragment();
		App.UI.DOM.appendNewElement("h2", f, "Limbs");

		App.UI.DOM.appendNewElement("p", f, App.Medicine.Limbs.selector(slave, App.Medicine.Limbs.currentLimbs(slave)));

		return f;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function tail() {
		const f = document.createDocumentFragment();
		App.UI.DOM.appendNewElement("h2", f, "Tail");

		const p = document.createElement("p");

		if (slave.PTail === 1) {
			App.UI.DOM.appendNewElement("div", p, `${He} has a neural tail interface installed. You can assign and adjust ${his} tail here.`);

			if (slave.tail === "none") {
				const div = App.UI.DOM.appendNewElement("div", p);
				if (isProstheticAvailable(slave, "modT")) {
					App.Events.addNode(div, [
						"Attach a modular tail designed to look like the tail of a:",
						tailSelect()
					]);
				}
				const links = [];
				if (isProstheticAvailable(slave, "combatT") && slave.fuckdoll === 0) {
					links.push(App.UI.DOM.passageLink("Attach Combat Tail", "Prosthetics Configuration", () => {
						V.prostheticsConfig = "attachTail";
						slave.tail = "combat";
						slave.tailColor = "jet black";
					}));
				}
				if (isProstheticAvailable(slave, "combatT2") && slave.fuckdoll === 0) {
					links.push(App.UI.DOM.passageLink("Attach Combat Tail Scorpio", "Prosthetics Configuration", () => {
						V.prostheticsConfig = "attachTail";
						slave.tail = "stinger";
						slave.tailColor = "purple";
					}));
				}
				if (isProstheticAvailable(slave, "sexT")) {
					links.push(App.UI.DOM.passageLink("Attach Pleasure Tail", "Prosthetics Configuration", () => {
						V.prostheticsConfig = "attachTail";
						slave.tail = "sex";
						slave.tailColor = "pink";
					}));
				}
				App.UI.DOM.appendNewElement("div", div, linkStrip(links), "choices");
			} else {
				App.UI.DOM.appendNewElement("div", p, `${He} currently has a tail attached, if you wish to change it you first need to detach it.`);
				App.UI.DOM.appendNewElement("div", p,
					App.UI.DOM.passageLink("Detach", "Prosthetics Configuration", () => {
						V.prostheticsConfig = "detachTail";
						V.nextButton = "Continue";
						V.nextLink = "Prosthetics Configuration";
					}), "choices");

				if (slave.tail === "mod") {
					App.Events.addNode(p, [
						`${He} currently has a modular tail, styled to look like ${App.Data.modTails.get(slave.tailShape).desc}. Modify ${his} tail's appearance:`,
						tailSelect()
					], "div");
				}
			}
		} else {
			App.UI.DOM.appendNewElement("span", p, `${He} does not have a neural tail interface installed so you cannot attach a tail.`, "note");
		}
		f.append(p);
		return f;

		function tailSelect() {
			const sortedTails = Array.from(App.Data.modTails.keys())
				.sort((a, b) => a > b ? 1 : -1)
				.map(tail => {
					return {key: tail, name: App.Data.modTails.get(tail).animal};
				});
			return App.UI.DOM.makeSelect(sortedTails, slave.tailShape, tail => {
				V.prostheticsConfig = "attachTail";
				slave.tail = "mod";
				slave.tailShape = /** @type {FC.TailShape} */ (tail);
				slave.tailColor = (slave.tailColor === "none") ? slave.hColor : slave.tailColor; // if color not set yet, match hair.
				cashX(forceNeg(V.modCost), "slaveMod", slave);
				App.UI.reload();
			});
		}
	}

	function appendages() {
		const f = document.createDocumentFragment();
		App.UI.DOM.appendNewElement("h2", f, "Back");

		const p = document.createElement("p");

		if (slave.PBack === 1) {
			App.UI.DOM.appendNewElement("div", p, `${He} has a neural back interface installed. You can assign and adjust ${his} back appendages here.`);

			if (slave.appendages !== "none") {
				App.UI.DOM.appendNewElement("div", p, `${He} currently has back appendages attached, if you wish to change them you first need to detach them.`);
				App.UI.DOM.appendNewElement("div", p,
					App.UI.DOM.passageLink("Detach", "Prosthetics Configuration", () => {
						V.prostheticsConfig = "detachAppendages";
						V.nextButton = "Continue";
						V.nextLink = "Prosthetics Configuration";
					}), "choices");
			} else {
				if (isProstheticAvailable(slave, "modW")) {
					App.UI.DOM.appendNewElement("div", p, "Attach a pair of modular wings designed to look like a:");

					const links = [];
					App.Data.modWings.forEach((value, key) => {
						links.push(App.UI.DOM.passageLink(`${value.animal}'s Wings`, "Prosthetics Configuration",
							() => {
								V.prostheticsConfig = "attachAppendages";
								slave.appendages = "mod";
								slave.wingsShape = key;
								slave.appendagesColor = "white";
							}
						));
					});
					App.UI.DOM.appendNewElement("div", p, linkStrip(links), "choices");
				}
				const links = [];
				if (isProstheticAvailable(slave, "combatW") && slave.fuckdoll === 0) {
					links.push(App.UI.DOM.passageLink("Attach a pair of Combat Wings", "Prosthetics Configuration", () => {
						V.prostheticsConfig = "attachAppendages";
						slave.appendages = "falcon";
						slave.appendagesColor = "jet black";
					}));
				}
				if (isProstheticAvailable(slave, "combatA1") && slave.fuckdoll === 0) {
					links.push(App.UI.DOM.passageLink(`Attach the "Arachnid" Combat Appendages`, "Prosthetics Configuration", () => {
						V.prostheticsConfig = "attachAppendages";
						slave.appendages = "arachnid";
						slave.appendagesColor = "jet black";
					}));
				}
				if (isProstheticAvailable(slave, "combatA2") && slave.fuckdoll === 0) {
					links.push(App.UI.DOM.passageLink(`Attach the "Kraken" Combat Appendages`, "Prosthetics Configuration", () => {
						V.prostheticsConfig = "attachAppendages";
						slave.appendages = "kraken";
						slave.appendagesColor = "jet black";
					}));
				}
				if (isProstheticAvailable(slave, "flightW") && slave.fuckdoll === 0) {
					links.push(App.UI.DOM.passageLink("Attach a pair of Wings capable of flight", "Prosthetics Configuration", () => {
						V.prostheticsConfig = "attachAppendages";
						slave.appendages = "flight";
						slave.appendagesColor = "silver";
					}));
				}
				if (isProstheticAvailable(slave, "sexA")) {
					links.push(App.UI.DOM.passageLink("Attach a set of Pleasure Appendages", "Prosthetics Configuration", () => {
						V.prostheticsConfig = "attachAppendages";
						slave.appendages = "sex";
						slave.appendagesColor = "pink";
					}));
				}
				App.UI.DOM.appendNewElement("div", p, linkStrip(links), "choices");
			}

			if (slave.appendages === "mod") {
				App.UI.DOM.appendNewElement("div", p,
					`${He} currently has a pair of modular wings, styled to look like ${App.Data.modWings.get(slave.wingsShape).desc}. Modify the appearance of ${his} wings:`);

				const links = [];
				App.Data.modWings.forEach((value, key) => {
					links.push(App.UI.DOM.passageLink(value.animal, "Prosthetics Configuration", () => {
						slave.wingsShape = key;
						cashX(forceNeg(V.modCost), "slaveMod", slave);
					}));
				});
				App.UI.DOM.appendNewElement("div", p, linkStrip(links), "choices");
			}
		} else {
			App.UI.DOM.appendNewElement("span", p, `${He} does not have a neural back interface installed so you cannot attach appendages.`, "note");
		}
		f.append(p);
		return f;
	}

	/**
	 * @returns {DocumentFragment}
	 */
	function buyScreen() {
		const f = document.createDocumentFragment();
		App.UI.DOM.appendNewElement("h2", f, "Prosthetics");

		const p = document.createElement("p");
		App.UI.DOM.appendNewElement("span", p, `Fit prosthetics to ${him}:`, "note");

		const gridDiv = document.createElement("div");
		gridDiv.classList.add("buy-prosthetics");

		gridDiv.append(document.createElement("div"));

		App.UI.DOM.appendNewElement("div", gridDiv, "Buy and fit");

		let tooltip;
		if (V.researchLab.level > 0) {
			tooltip = `Depending on lab speed, it might be faster than fitting an existing prosthetic, but should almost always be faster than first building and then fitting it to ${him}.`;
		} else {
			tooltip = "With a lab you could both increase speed and decrease cost.";
		}
		App.UI.DOM.appendNewElement("div", gridDiv, App.UI.DOM.spanWithTooltip("Construct in lab", tooltip));

		tooltip = "";
		if (V.researchLab.speed >= 300) { /* max speed */
			tooltip = "Your lab is so fast that fitting prosthetics to your slave can be done instantly, though you will sacrifice some efficiency.";
		} else if (V.researchLab.level > 0) {
			tooltip = "Your lab is not fast enough to fit prosthetics instantly.";
		}

		const fastDiv = document.createElement("div");
		if (tooltip !== "") {
			fastDiv.append(App.UI.DOM.spanWithTooltip("Fast assembly", tooltip));
			fastDiv.style.textAlign = "right";
		}
		gridDiv.append(fastDiv);

		for (const prostheticID of App.Data.prostheticIDs) {
			addBuyRow(prostheticID, gridDiv);
		}
		p.append(gridDiv);
		f.append(p);

		return f;
	}

	/**
	 * @param {FC.prostheticID} prosthetic
	 * @param {HTMLDivElement} container
	 */
	function addBuyRow(prosthetic, container) {
		App.UI.DOM.appendNewElement("div", container, capFirstChar(App.Data.prosthetics[prosthetic].name));

		if (V.adjustProsthetics.findIndex(function(p) { return p.id === prosthetic && p.slaveID === slave.ID; }) !== -1 ||
			V.researchLab.tasks.findIndex(function(p) { return p.type === "craftFit" && p.id === prosthetic && p.slaveID === slave.ID; }) !== -1) {
			App.UI.DOM.appendNewElement("div", container, `Currently being fitted to ${him}.`, ["full", "note"]);
		} else if (App.Data.prosthetics[prosthetic].level > V.prostheticsUpgrade) {
			App.UI.DOM.appendNewElement("div", container, `Better contracts are needed to buy these.`, ["full", "note"]);
		} else if (isProstheticAvailable(slave, prosthetic)) {
			App.UI.DOM.appendNewElement("div", container, `Completed.`, ["full", "note"]);
		} else {
			if (V.prosthetics[prosthetic].amount > 0) {
				App.UI.DOM.appendNewElement("div", container,
					App.UI.DOM.passageLink("From storage", "Prosthetics Configuration", () => {
						V.adjustProsthetics.push({
							id: prosthetic,
							workLeft: App.Data.prosthetics[prosthetic].adjust,
							slaveID: slave.ID
						});
						V.prosthetics[prosthetic].amount -= 1;
					}));
			} else {
				App.UI.DOM.appendNewElement("div", container,
					App.UI.DOM.passageLink(cashFormat(App.Data.prosthetics[prosthetic].costs), "Prosthetics Configuration", () => {
						V.adjustProsthetics.push({
							id: prosthetic,
							workLeft: App.Data.prosthetics[prosthetic].adjust,
							slaveID: slave.ID
						});
						cashX(forceNeg(App.Data.prosthetics[prosthetic].costs), "slaveMod", slave);
					}));
			}

			if (V.prosthetics[prosthetic].research > 0) {
				const craftDiv = document.createElement("div");
				craftDiv.style.textAlign = "center";
				if (V.researchLab.level > 0 && V.prosthetics[prosthetic].research > 0) {
					craftDiv.append(App.UI.DOM.passageLink("Construct", "Prosthetics Configuration", () => {
						V.researchLab.tasks.push({
							type: "craftFit",
							id: prosthetic,
							/* 1.5: longer than adjust, but faster than adjust+craft. */
							workLeft: (App.Data.prosthetics[prosthetic].adjust + App.Data.prosthetics[prosthetic].craft) / 1.5,
							slaveID: slave.ID
						});
					}));
				}
				container.append(craftDiv);

				const instantDiv = document.createElement("div");
				instantDiv.style.textAlign = "right";
				if (V.researchLab.speed >= 300 && V.prosthetics[prosthetic].research > 0) { /* max speed */
					if (V.prosthetics[prosthetic].amount > 0) {
						const cost = App.Data.prosthetics[prosthetic].adjust * 50;
						instantDiv.append(App.UI.DOM.passageLink(`From storage: ${cashFormat(cost)}`,
							"Prosthetics Configuration", () => {
								cashX(-cost, "slaveMod", slave);
								addProsthetic(slave, prosthetic);
							}));
					} else {
						const cost = App.Data.prosthetics[prosthetic].costs * 2 + App.Data.prosthetics[prosthetic].adjust * 50;
						instantDiv.append(App.UI.DOM.passageLink(cashFormat(cost), "Prosthetics Configuration", () => {
							cashX(-cost, "slaveMod", slave);
							addProsthetic(slave, prosthetic);
						}));
					}
				}
				container.append(instantDiv);
			} else if (V.researchLab.level > 0) {
				App.UI.DOM.appendNewElement("div", container, "Not researched.", ["research", "note"]);
			} else {
				App.UI.DOM.appendNewElement("div", container, "You need to construct a lab first.", ["research", "note"]);
			}
		}
	}

	/**
	 * @param {Array<Element>} links
	 * @returns {DocumentFragment}
	 */
	function linkStrip(links) {
		const f = document.createDocumentFragment();
		if (links.length > 0) {
			f.append(links[0]);
			for (let i = 1; i < links.length; i++) {
				f.append(" | ", links[i]);
			}
		}
		return f;
	}
};

/**
 * @param {App.Entity.SlaveState} slave
 */
App.UI.prostheticsConfigPassage = function(slave) {
	const node = new DocumentFragment();
	const r = [];
	const {
		He,
		he, his, him, himself
	} = getPronouns(slave);

	switch (V.prostheticsConfig) {
		case "main":
			V.nextButton = "Confirm changes";
			V.nextLink = "Slave Interact";
			node.append(App.UI.prostheticsConfig(slave));
			break;
		case "hearing":
			V.prostheticsConfig = "main";
			V.nextButton = "Continue";
			V.nextLink = "Prosthetics Configuration";
			if (slave.hears === 0) {
				r.push(`${He} tilts ${his} head as ${his} hearing returns.`);
			} else if (slave.hears === -1) {
				r.push(`${He} shakes ${his} head as ${his} hearing becomes muffled.`);
			} else {
				r.push(`${He} has a panicked expression when ${his} hearing is suddenly silenced.`);
			}
			break;
		case "voice":
			V.prostheticsConfig = "main";
			V.nextButton = "Continue";
			V.nextLink = "Prosthetics Configuration";
			if (slave.voice === 0) {
				r.push(`${He} tries testing out ${his} new voice, only to discover ${he}'s been made mute.`);
			} else if (slave.voice === 1) {
				r.push(`${He} tests out the`);
				if (canHear(slave)) {
					r.push(`sound`);
				} else {
					r.push(`feeling`);
				}
				r.push(`of ${his} new, deep voice.`);
			} else if (slave.voice === 2) {
				r.push(`${He} tests out the`);
				if (canHear(slave)) {
					r.push(`sound`);
				} else {
					r.push(`feeling`);
				}
				r.push(`of ${his} new, normal voice.`);
			} else if (slave.voice === 3) {
				r.push(`${He} tests out the`);
				if (canHear(slave)) {
					r.push(`sound`);
				} else {
					r.push(`feeling`);
				}
				r.push(`of ${his} new, high voice.`);
			}
			break;
		case "detachTail":
			V.prostheticsConfig = "main";
			V.nextButton = "Continue";
			V.nextLink = "Prosthetics Configuration";
			slave.tail = "none";
			slave.tailShape = "none";
			slave.tailColor = "none";
			r.push(`You send the release signal and the mechanical lock disengages allowing the artificial tail to pop right off.`);
			break;
		case "attachTail":
			V.prostheticsConfig = "main";
			V.nextButton = "Continue";
			V.nextLink = "Prosthetics Configuration";
			App.UI.DOM.appendNewElement("div", node, `Attaching ${his} tail is a simple procedure, you simply push the connector into a socket, right where ${his} tailbone ends, until the lock engages.`);
			r.push(`When you are done, ${he} looks back and`);
			if (["cat", "leopard", "tiger", "jaguar", "lion"].includes(slave.tailShape)) {
				r.push(`sways ${his} tail side to side enigmatically.`);
			} else if (["dog", "wolf", "jackal"].includes(slave.tailShape)) {
				r.push(`wags ${his} tail side to side energetically.`);
			} else if (slave.tailShape === "fox") {
				r.push(`slowly sways ${his} tail feeling the soft fur brush against ${his} skin.`);
			} else if (slave.tailShape === "kitsune") {
				r.push(`slowly sways ${his} tails luxuriating in the incredibly soft, fluffy fur brushing against ${his} skin.`);
			} else if (slave.tailShape === "raccoon") {
				r.push(`admires ${his} long, thick fluffy tail.`);
			} else if (slave.tailShape === "rabbit") {
				r.push(`wiggles ${his} little tail a bit.`);
			} else if (slave.tailShape === "squirrel") {
				r.push(`admires ${his} the size of ${his} fluffy tail.`);
			} else if (slave.tailShape === "horse") {
				r.push(`sways ${his} tail back and forth.`);
			} else if (slave.tailShape === "bird") {
				r.push(`ruffles ${his} tail feathers.`);
			} else if (slave.tailShape === "phoenix") {
				r.push(`ruffles ${his} tail feathers.`);
			} else if (slave.tailShape === "peacock") {
				r.push(`ruffles ${his} tail feathers.`);
			} else if (slave.tailShape === "raven") {
				r.push(`ruffles ${his} tail feathers.`);
			} else if (slave.tailShape === "swan") {
				r.push(`wiggles ${his} small bundle of tail feathers.`);
			} else if (slave.tailShape === "sheep") {
				r.push(`wiggles ${his} short, wooly tail.`);
			} else if (slave.tailShape === "cow") {
				r.push(`swats ${himself} playfully.`);
			} else if (slave.tailShape === "gazelle") {
				r.push(`wiggles ${his} little tail a bit.`);
			} else if (slave.tailShape === "deer") {
				r.push(`wiggles ${his} little tail a bit.`);
			} else if (slave.tailShape === "succubus") {
				r.push(`waves ${his} tail at you, showing considerable dexterity with it.`);
			} else if (slave.tailShape === "dragon") {
				r.push(`strokes the scales of ${his} tail.`);
			} else if (slave.tail === "combat") {
				r.push(`experimentally whips the long tail side to side then takes aim at a prepared fruit, lashes out with blinding speed and smiles as it explodes into chunks.`);
			} else if (slave.tail === "stinger") {
				r.push(`experimentally whips the long, segmented tail side to side and tries lashing out with it. ${He} then aims its stinger towards a prepared fruit, fires a projectile and smiles as it accurately strikes ${his} target.`);
			} else if (slave.tail === "sex") {
				r.push(`accidentally engages the vibrating and lube functions, startling ${him} and making quite a mess.`);
			} else {
				r.push(`admires ${his} new tail.`);
			}
			break;
		case "detachAppendages":
			V.prostheticsConfig = "main";
			V.nextButton = "Continue";
			V.nextLink = "Prosthetics Configuration";
			slave.appendages = "none";
			slave.wingsShape = "none";
			slave.appendagesColor = "none";
			r.push(`You send the release signal and the mechanical locks disengage allowing the dorsal appendages to be removed.`);
			break;
		case "attachAppendages":
			V.prostheticsConfig = "main";
			V.nextButton = "Continue";
			V.nextLink = "Prosthetics Configuration";
			App.UI.DOM.appendNewElement("div", node, `Attaching ${his} dorsal appendages is a simple procedure, you simply push the connectors into their socket, on either side of the vertebrae located between ${his} shoulder blades, until they lock in place.`);
			r.push(`When you are done, ${he} looks back and`);
			if (slave.wingsShape === "angel") {
				r.push(`tries flapping ${his} wings.`);
			} else if (slave.wingsShape === "seraph") {
				r.push(`tries flapping ${his} six wings.`);
			} else if (slave.wingsShape === "demon") {
				r.push(`tries flapping ${his} wings.`);
			} else if (slave.wingsShape === "dragon") {
				r.push(`tries beating ${his} wings.`);
			} else if (slave.wingsShape === "phoenix") {
				r.push(`tries flapping ${his} wings.`);
			} else if (slave.wingsShape === "bird") {
				r.push(`tries flapping ${his} wings.`);
			} else if (slave.wingsShape === "fairy") {
				r.push(`flutters ${his} wings.`);
			} else if (slave.wingsShape === "butterfly") {
				r.push(`flutters ${his} wings.`);
			} else if (slave.wingsShape === "moth") {
				r.push(`flutters ${his} wings.`);
			} else if (slave.wingsShape === "insect") {
				r.push(`flutters ${his} wings.`);
			} else if (slave.wingsShape === "evil") {
				r.push(`tries beating ${his} wings.`);
			} else if (slave.appendages === "falcon") {
				r.push(`admires ${his} sleek, sharp-edged wings.`);
			} else if (slave.appendages === "arachnid") {
				r.push(`tries extending and contracting ${his} menacing spider legs. Eventually ${he} manages to lift ${himself} off the ground and moves around using the legs.`);
			} else if (slave.appendages === "kraken") {
				r.push(`tries extending and contracting ${his} new tentacles. Eventually ${he} manages to lift ${himself} off the ground and moves around using the tentacles.`);
			} else if (slave.appendages === "sex") {
				r.push(`tries examining the many different tips of ${his} new pleasure appendages before accidentally engaging their vibrating and lube functions, startling ${him} and making a huge mess.`);
			} else if (slave.appendages === "flight") {
				r.push(`tries engaging ${his} wing thrusters. Feeling ${his} feet leave the ground, ${he} hurriedly disengages the thrusters before flying too high.`);
			} else {
				r.push(`admires ${his} new dorsal appendages.`);
			}
			break;
	}
	App.Utils.scheduleSidebarRefresh();
	if (r.length > 0) {
		App.Events.addParagraph(node, r);
	}
	return node;
};
