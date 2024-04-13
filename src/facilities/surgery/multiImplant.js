App.UI.multipleOrganImplant = function() {
	const node = new DocumentFragment();

	node.append(intro(), organs());

	App.UI.DOM.appendNewElement("h1", node, "Implant Prosthetics");

	/* prosthetics */
	for (const slave of V.slaves) {
		/* count for estimating health impact */
		const prostheticCount = V.adjustProsthetics.filter(p => p.slaveID === slave.ID && p.workLeft <= 0).length;

		/* since we already have count, skip slaves that don't need work */
		if (prostheticCount < 1) {
			continue;
		}
		/*
		Ensures that a slave can never die during the execution of this passage.
		Calculation based on worst case, so when changing worst case change it here too.
		*/
		if (slave.health.health - (prostheticCount * 20) < -75) {
			App.UI.DOM.appendNewElement("hr", node);
			App.UI.DOM.appendNewElement("div", node, `Estimated health impact too great; ${slave.slaveName} skipped.`, ["health", "dec"]);
			continue;
		}

		const {
			he,
		} = getPronouns(slave);

		for (let k = 0; k < V.adjustProsthetics.length; k++) {
			const p = V.adjustProsthetics[k];
			if (p.slaveID === slave.ID && p.workLeft <= 0) {
				V.adjustProsthetics.splice(k, 1);
				k--;
				V.adjustProstheticsCompleted--;
				addProsthetic(slave, p.id);
				const div = App.UI.DOM.appendNewElement("div", node, document.createElement("hr"));
				switch (p.id) {
					case "ocular":
						if (getBestVision(slave) === 0) {
							applyProcedure(new App.Medicine.Surgery.Procedures.OcularImplant(slave, "both"));
						} else {
							App.UI.DOM.appendNewElement("span", div, `Since ${he} has working eyes the ${App.Data.prosthetics.ocular.name} will be put into storage.`, "note");
						}
						break;
					case "cochlear":
						if (slave.hears !== 0) {
							applyProcedure(new App.Medicine.Surgery.Procedures.CochlearImplant(slave));
						} else {
							App.UI.DOM.appendNewElement("span", div, `Since ${he} has working ears the ${App.Data.prosthetics.cochlear.name} will be put into storage.`, "note");
						}
						break;
					case "electrolarynx":
						if (slave.voice <= 0) {
							applyProcedure(new App.Medicine.Surgery.Procedures.Electrolarynx(slave));
						} else {
							App.UI.DOM.appendNewElement("span", div, `Since ${he} has a voice the ${App.Data.prosthetics.electrolarynx.name} will be put into storage.`, "note");
						}
						break;
					case "interfaceP1":
						if (hasAllNaturalLimbs(slave)) {
							App.UI.DOM.appendNewElement("span", div, `Since ${he} has no amputated limbs the ${App.Data.prosthetics.interfaceP2.name} will be put into storage.`, "note");
						} else if (slave.PLimb === 2) {
							App.UI.DOM.appendNewElement("span", div, `Since ${he} already has ${addA(App.Data.prosthetics.interfaceP2.name)} installed the ${App.Data.prosthetics.interfaceP1.name} will be put into storage.`, "note");
						} else {
							applyProcedure(new App.Medicine.Surgery.Procedures.BasicPLimbInterface(slave));
						}
						break;
					case "interfaceP2":
						if (hasAllNaturalLimbs(slave)) {
							App.UI.DOM.appendNewElement("span", div, `Since ${he} has no amputated limbs the ${App.Data.prosthetics.interfaceP2.name} will be put into storage.`, "note");
						} else {
							applyProcedure(new App.Medicine.Surgery.Procedures.AdvancedPLimbInterface(slave));
						}
						break;
					case "interfaceP3":
						if (hasAnyLimbs(slave)) {
							App.UI.DOM.appendNewElement("span", div, `Since ${he} still has limbs attached, the ${App.Data.prosthetics.interfaceP3.name} will be put into storage.`, "note");
						} else {
							applyProcedure(new App.Medicine.Surgery.Procedures.QuadrupedalPLimbInterface(slave));
						}
						break;
					case "basicL":
					case "sexL":
					case "beautyL":
					case "combatL":
					case "felidaeL":
					case "canidaeL":
					case "felidaeCL":
					case "canidaeCL":
					case "cyberneticL":
						if (slave.fuckdoll !== 0) {
							App.UI.DOM.appendNewElement("span", div, `Since a Fuckdoll can't use prosthetic limbs the ${App.Data.prosthetics[p.id].name} will be put into storage.`, "note");
						} else if (hasAllNaturalLimbs(slave)) {
							App.UI.DOM.appendNewElement("span", div, `Since ${he} needs an amputated limb to attach prosthetics the ${App.Data.prosthetics[p.id].name} will be put into storage.`, "note");
						} else if (slave.PLimb === 0) {
							App.UI.DOM.appendNewElement("span", div, `Since ${he} must have a prosthetic interface installed to attach prosthetic limbs the ${App.Data.prosthetics[p.id].name} will be put into storage.`, "note");
						} else {
							if (p.id === "basicL" && slave.PLimb < 3) {
								const state = App.Medicine.Limbs.currentLimbs(slave);
								const change = upgradeLimbs(slave, 2);
								if (change) {
									node.append(App.Medicine.Limbs.reaction(slave, state));
								} else {
									App.UI.DOM.appendNewElement("span", div, `Since ${he} already has more advanced prosthetic limbs attached the ${App.Data.prosthetics.basicL.name} will be put into storage.`, "note");
								}
							} else if (p.id === "sexL" && slave.PLimb < 3) {
								const state = App.Medicine.Limbs.currentLimbs(slave);
								const change = upgradeLimbs(slave, 3);
								if (change) {
									node.append(App.Medicine.Limbs.reaction(slave, state));
								} else {
									App.UI.DOM.appendNewElement("span", div, `Since ${he} already has advanced prosthetic limbs attached the ${App.Data.prosthetics.sexL.name} will be put into storage.`, "note");
								}
							} else if (p.id === "beautyL" && slave.PLimb < 3) {
								const state = App.Medicine.Limbs.currentLimbs(slave);
								const change = upgradeLimbs(slave, 4);
								if (change) {
									node.append(App.Medicine.Limbs.reaction(slave, state));
								} else {
									App.UI.DOM.appendNewElement("span", div, `Since ${he} already has advanced prosthetic limbs attached the ${App.Data.prosthetics.beautyL.name} will be put into storage.`, "note");
								}
							} else if (p.id === "combatL" && slave.PLimb < 3) {
								const state = App.Medicine.Limbs.currentLimbs(slave);
								const change = upgradeLimbs(slave, 5);
								if (change) {
									node.append(App.Medicine.Limbs.reaction(slave, state));
								} else {
									App.UI.DOM.appendNewElement("span", div, `Since ${he} already has advanced prosthetic limbs attached the ${App.Data.prosthetics.combatL.name} will be put into storage.`, "note");
								}
							} else if (p.id === "cyberneticL") {
								if (slave.PLimb === 2) {
									const state = App.Medicine.Limbs.currentLimbs(slave);
									const change = upgradeLimbs(slave, 6);
									if (change) {
										node.append(App.Medicine.Limbs.reaction(slave, state));
									}
								} else {
									App.UI.DOM.appendNewElement("span", div, `Since ${he} must have ${addA(App.Data.prosthetics.interfaceP2.name)} installed to attach cybernetic limbs the ${App.Data.prosthetics.cyberneticL.name} will be put into storage.`, "note");
								}
							} else if (p.id === "felidaeL") {
								if (slave.PLimb === 3) {
									const state = App.Medicine.Limbs.currentLimbs(slave);
									const change = upgradeLimbs(slave, 7);
									if (change) {
										node.append(App.Medicine.Limbs.reaction(slave, state));
									}
								} else {
									App.UI.DOM.appendNewElement("span", div, `Since ${he} must have ${addA(App.Data.prosthetics.interfaceP3.name)} installed to attach quadrupedal limbs, the ${App.Data.prosthetics.felidaeL.name} will be put into storage.`, "note");
								}
							} else if (p.id === "canidaeL") {
								if (slave.PLimb === 3) {
									const state = App.Medicine.Limbs.currentLimbs(slave);
									const change = upgradeLimbs(slave, 8);
									if (change) {
										node.append(App.Medicine.Limbs.reaction(slave, state));
									}
								} else {
									App.UI.DOM.appendNewElement("span", div, `Since ${he} must have ${addA(App.Data.prosthetics.interfaceP3.name)} installed to attach quadrupedal limbs, the ${App.Data.prosthetics.canidaeL.name} will be put into storage.`, "note");
								}
							} else if (p.id === "felidaeCL") {
								if (slave.PLimb === 3) {
									const state = App.Medicine.Limbs.currentLimbs(slave);
									const change = upgradeLimbs(slave, 9);
									if (change) {
										node.append(App.Medicine.Limbs.reaction(slave, state));
									}
								} else {
									App.UI.DOM.appendNewElement("span", div, `Since ${he} must have ${addA(App.Data.prosthetics.interfaceP3.name)} installed to attach quadrupedal limbs, the ${App.Data.prosthetics.felidaeCL.name} will be put into storage.`, "note");
								}
							} else if (p.id === "canidaeCL") {
								if (slave.PLimb === 3) {
									const state = App.Medicine.Limbs.currentLimbs(slave);
									const change = upgradeLimbs(slave, 10);
									if (change) {
										node.append(App.Medicine.Limbs.reaction(slave, state));
									}
								} else {
									App.UI.DOM.appendNewElement("span", div, `Since ${he} must have ${addA(App.Data.prosthetics.interfaceP3.name)} installed to attach quadrupedal limbs, the ${App.Data.prosthetics.canidaeCL.name} will be put into storage.`, "note");
								}
							}
						}
						break;
					case "interfaceTail":
						applyProcedure(new App.Medicine.Surgery.Procedures.TailInterface(slave));
						break;
					case "modT":
					case "sexT":
					case "combatT":
					case "combatT2":
						if (slave.PTail === 0) {
							App.UI.DOM.appendNewElement("span", div, `Since ${he} must have ${addA(App.Data.prosthetics.interfaceTail.name)} installed to attach tails the ${App.Data.prosthetics[p.id].name} will be put into storage.`, "note");
						} else if (slave.tail !== "none") {
							App.UI.DOM.appendNewElement("span", div, `Since ${he} currently has a tail attached the ${App.Data.prosthetics[p.id].name} will be put into storage.`, "note");
						} else if (p.id === "modT") {
							App.UI.DOM.appendNewElement("span", div, `Since installing ${addA(App.Data.prosthetics.modT.name)} is complicated it can't be automated.`, "note");
							/* Reason: there are different designs player can choose from.*/
						} else if (p.id === "combatT") {
							V.prostheticsConfig = "attachTail";
							slave.tail = "combat";
							slave.tailColor = "jet black";
							node.append(App.UI.prostheticsConfigPassage(slave));
						} else if (p.id === "combatT2") {
							V.prostheticsConfig = "attachTail";
							slave.tail = "stinger";
							slave.tailColor = "purple";
							node.append(App.UI.prostheticsConfigPassage(slave));
						} else if (p.id === "sexT") {
							V.prostheticsConfig = "attachTail";
							slave.tail = "sex";
							slave.tailColor = "pink";
							node.append(App.UI.prostheticsConfigPassage(slave));
						}
						break;
					case "interfaceBack":
						applyProcedure(new App.Medicine.Surgery.Procedures.BackInterface(slave));
						break;
					case "modW":
					case "flightW":
					case "sexA":
					case "combatW":
					case "combatA1":
					case "combatA2":
						if (slave.PBack === 0) {
							App.UI.DOM.appendNewElement("span", div, `Since ${he} must have ${addA(App.Data.prosthetics.interfaceBack.name)} installed to attach dorsal appendages the ${App.Data.prosthetics[p.id].name} will be put into storage.`, "note");
						} else if (slave.appendages !== "none") {
							App.UI.DOM.appendNewElement("span", div, `Since ${he} currently has dorsal appendages attached the ${App.Data.prosthetics[p.id].name} will be put into storage.`, "note");
						} else if (p.id === "modW") {
							App.UI.DOM.appendNewElement("span", div, `Since installing ${addA(App.Data.prosthetics.modT.name)} is complicated it can't be automated.`, "note");
							/* Reason: there are different designs player can choose from.*/
						} else if (p.id === "combatW") {
							V.prostheticsConfig = "attachWings";
							slave.appendages = "falcon";
							node.append(App.UI.prostheticsConfigPassage(slave));
						} else if (p.id === "combatA1") {
							V.prostheticsConfig = "attachAppendages";
							slave.appendages = "arachnid";
							slave.appendagesColor = "jet black";
							node.append(App.UI.prostheticsConfigPassage(slave));
						} else if (p.id === "combatA2") {
							V.prostheticsConfig = "attachAppendages";
							slave.appendages = "kraken";
							slave.appendagesColor = "jet black";
							node.append(App.UI.prostheticsConfigPassage(slave));
						} else if (p.id === "flightW") {
							V.prostheticsConfig = "attachAppendages";
							slave.appendages = "flight";
							slave.appendagesColor = "silver";
							node.append(App.UI.prostheticsConfigPassage(slave));
						} else if (p.id === "sexA") {
							V.prostheticsConfig = "attachAppendages";
							slave.appendages = "sex";
							slave.appendagesColor = "pink";
							node.append(App.UI.prostheticsConfigPassage(slave));
						}
						break;
					default:
						// @ts-expect-error - p.id must be inferred as `never` if the switch is exhaustive
						App.UI.DOM.appendNewElement("span", div, `Since there is no automated procedure to implant/attach ${App.Data.prosthetics[p.id].name} it will be put into storage.`, "note");
				}
			}
		}
	}

	/* This needs to be down here to over-ride any Surgery Degradation calls */
	V.nextButton = "Continue";
	V.nextLink = "Main";

	return node;

	/**
	 * @param {App.Medicine.Surgery.Procedure} procedure
	 */
	function applyProcedure(procedure) {
		// TODO: dedupe with organfarm and main surgery
		const result = App.Medicine.Surgery.apply(procedure, false);
		if (result === null) {
			App.UI.DOM.includePassage(node, "Surgery Death");
			return;
		}

		const [diff, reaction] = result;

		const f = App.Medicine.Surgery.makeSlaveReaction(procedure.originalSlave, diff, reaction);

		App.Utils.Diff.applyDiff(procedure.originalSlave, diff);

		node.append(f);
	}

	function intro() {
		const frag = document.createDocumentFragment();

		// Get the slaves with ready organs/prosthetics to have a count
		const ids = new Set();
		for (const organ of V.completedOrgans) {
			ids.add(organ.ID);
		}
		for (const p of V.adjustProsthetics) {
			if (p.workLeft <= 0) {
				ids.add(p.slaveID);
			}
		}

		let r = [];
		r.push("You head down to your");
		if (V.surgeryUpgrade === 1) {
			r.push("heavily upgraded and customized");
		}
		r.push(`remote surgery and start having the ${ids.size > 1 ? "slaves" : "slave"} with`);
		if (V.completedOrgans.length > 0 && V.adjustProstheticsCompleted > 0) {
			r.push("organs or prosthetics");
		} else if (V.completedOrgans.length > 1) {
			r.push("organs");
		} else if (V.adjustProstheticsCompleted > 1) {
			r.push("prosthetics");
		}
		r.push("which are ready be sent down.");

		App.UI.DOM.appendNewElement("p", frag, r.join(" "));

		return frag;
	}

	function organs() {
		const f = new DocumentFragment();

		let F = App.Medicine.OrganFarm;
		for (const slave of V.slaves) {
			let sortedOrgans = F.getSortedOrgans(slave);
			if (sortedOrgans.length === 0) {
				continue;
			}

			App.UI.DOM.appendNewElement("h2", f, slave.slaveName);

			for (let j = 0; j < sortedOrgans.length; j++) {
				App.UI.DOM.appendNewElement("h3", f, F.Organs.get(sortedOrgans[j]).name);

				let actions = F.Organs.get(sortedOrgans[j]).implantActions;
				let manual = false;
				let success = false;
				let cancel = false;
				for (let k = 0; k < actions.length; k++) {
					if (!actions[k].autoImplant) {
						if (actions[k].canImplant(slave)) {
							manual = true;
						}
						continue;
					}
					if (!actions[k].canImplant(slave)) {
						let error = actions[k].implantError(slave);
						if (error !== "") {
							App.UI.DOM.appendNewElement("div", f, error, "warning");
						}
					} else {
						const procedure = App.Medicine.OrganFarm.instantiateProcedure(slave, actions[k]);
						if (slave.health.health - procedure.healthCost < -75) {
							App.UI.DOM.appendNewElement("div", f, "Estimated health impact too great, skipping further surgeries.", "warning");
							cancel = true;
							break;
						} else {
							f.append(App.Medicine.OrganFarm.implant(sortedOrgans[j], procedure));
							success = true;
						}
					}
				}
				if (cancel) {
					break;
				}
				if (!success && manual) {
					App.UI.DOM.appendNewElement("div", f, `Cannot implant ${F.Organs.get(sortedOrgans[j]).name.toLowerCase()} automatically, try implanting manually in the remote surgery.`, "note");
				}
			}
		}
		return f;
	}
};
