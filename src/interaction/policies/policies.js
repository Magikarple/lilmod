globalThis.policies = (function() {
	return {
		countEugenicsSMRs: countEugenicsSMRs,
		cost: cost,
	};

	function countEugenicsSMRs() {
		let value = 0;
		if (V.policies.SMR.eugenics.faceSMR === 1) {
			value++;
		}
		if (V.policies.SMR.eugenics.heightSMR === 1) {
			value++;
		}
		if (V.policies.SMR.eugenics.intelligenceSMR === 1) {
			value++;
		}
		return value;
	}

	function cost() { return 5000; }
})();
/**
 * @param {string} category
 * @returns {Array}
 */
globalThis.policy = function(category) {
	const validPolicies = [];
	for (let policyString in App.Data.Policies.Selection[category]) {
		policyElement(policyString);
	}
	return validPolicies;

	/** @param {string} policyString */
	function policyElement(policyString) {
		const policyValue = _.get(V, policyString);
		/** @type {PolicySelector[]} */
		const policies = App.Data.Policies.Selection[category][policyString];
		if (policyValue === 0) {
			// apply
			for (const p of policies) {
				const el = document.createElement("p");
				const enable = p.enable || 1;
				if (
					(p.hasOwnProperty("requirements") && p.requirements === false) || // requirements fail
					(p.hasOwnProperty("hide") && p.hide.ifActivated === 0) // policy cannot be unlocked by hand here, may be done by event.
				) {
					continue;
				}

				// title
				const classArray = ["bold"];
				if (p.hasOwnProperty("titleClass")) {
					classArray.push(p.titleClass);
				}
				App.UI.DOM.appendNewElement("span", el, p.title, classArray).append(`: `);

				// Description text
				el.append(p.text);

				// link
				if (!(p.hasOwnProperty("hide") && p.hide.button === 1)) {
					el.append(` `, implement(p, enable));
				}
				validPolicies.push(el);
			}
		} else if (typeof policyValue === "string" || typeof policyValue === "number") {
			const el = document.createElement("p");
			// repeal
			const p = policies.find(pol => pol.hasOwnProperty("enable") && pol.enable === policyValue) || policies[0];
			if (p.hasOwnProperty("hide") && p.hide.ifActivated === 1) {
				return;
			}

			// title
			const title = (p.hasOwnProperty("activatedTitle")) ? p.activatedTitle : p.title;
			App.UI.DOM.appendNewElement("span", el, title, "bold").append(`: `);

			// Description text
			el.append((p.hasOwnProperty("activatedText")) ? p.activatedText : p.text);

			// link
			el.append(` `, repeal(p));
			validPolicies.push(el);
		} else {
			throw Error(`V.${policyString} not initialized properly, "${policyValue}"`);
		}

		/**
		 * @param {PolicySelector} p The data object that describes the policy being considered.
		 * @returns {Node} Link to repeal.
		 */
		function repeal(p) {
			const frag = new DocumentFragment();
			let check = canAfford();
			let link;
			if (!(p.hasOwnProperty("hide") && p.hide.button === 1)) {
				if (check === true) {
					link = App.UI.DOM.link(
						"Repeal",
						() => {
							if (V.rep >= 1000) {
								_.set(V, policyString, 0);
								applyCost();
								if (p.hasOwnProperty("onRepeal")) {
									p.onRepeal();
								}
							}
							App.UI.reload();
						}
					);
					link.style.color = "yellow";
				} else {
					link = App.UI.DOM.disabledLink("Repeal", [`You do not have enough ${check}`]);
					link.style.color = "red";
				}
				frag.append(link);
			}

			if (p.hasOwnProperty("activatedNote")) {
				frag.append(App.UI.DOM.makeElement("div", p.activatedNote, ["note", "indent"]));
			}
			return frag;
		}
		/**
		 * @param {PolicySelector} p The data object that describes the policy being considered.
		 * @param {number|string} enable value to set the policy to in order to switch it on.
		 * @returns {Node} Link to implement.
		 */
		function implement(p, enable) {
			let check = canAfford();
			const frag = new DocumentFragment();
			const linkArray = [];
			let link;
			if (check === true) {
				link = App.UI.DOM.link(
					"Implement",
					() => {
						if (V.rep >= 1000) {
							_.set(V, policyString, enable);
							applyCost();
							if (p.hasOwnProperty("onImplementation")) {
								p.onImplementation();
							}
						}
						App.UI.reload();
					}
				);
				link.style.color = "green";
			} else {
				link = App.UI.DOM.disabledLink("Implement", [`You do not have enough ${check}`]);
				link.style.color = "red";
			}
			linkArray.push(link);
			if (V.cheatMode) {
				linkArray.push(App.UI.DOM.link(
					"Cheat apply",
					() => {
						_.set(V, policyString, enable);
						if (p.hasOwnProperty("onImplementation")) {
							p.onImplementation();
						}
						App.UI.reload();
					}
				));
			}
			frag.append(App.UI.DOM.generateLinksStrip(linkArray));
			if (p.hasOwnProperty("note")) {
				frag.append(App.UI.DOM.makeElement("div", p.note, ["note", "indent"]));
			}
			return frag;
		}

		function canAfford() {
			if (V.cash < 5000) {
				return "cash";
			} else if (V.rep < 1000 && !["EducationPolicies"].includes(category)) {
				return "reputation";
			}
			return true;
		}

		function applyCost() {
			cashX(-5000, "policies");
			if (!["EducationPolicies"].includes(category)) {
				repX(-1000, "policies");
			}
		}
	}
};

globalThis.checkPolicyGameover = function() {
	const arc = V.arcologies[0];
	if (arc.FSSupremacistLawME && V.PC.race !== arc.FSSupremacistRace) {
		V.nextLink = "Gameover";
		V.gameover = "Idiot Ball 2 The Dumbassening";
	} else if (arc.FSSubjugationistLawME && V.PC.race === arc.FSSubjugationistRace) {
		V.nextLink = "Gameover";
		V.gameover = "Idiot Ball 3 Totally Not Idiot Ball 2 Again";
	} else {
		V.nextLink = "Main";
	}
};
