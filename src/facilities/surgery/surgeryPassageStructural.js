/**
 * UI for performing surgery. Refreshes without refreshing the passage.
 * @param {App.Entity.SlaveState} slave
 * @param {function():void} refresh
 * @param {boolean} [cheat=false]
 * @returns {HTMLElement}
 */

App.UI.surgeryPassageStructural = function(slave, refresh, cheat = false) {
	const container = document.createElement("span");
	container.append(content());
	return container;

	function content() {
		const frag = new DocumentFragment();
		const {
			His, He,
			he, him
		} = getPronouns(slave);

		frag.append(shoulders(), hips());
		if (hasAnyNaturalLegs(slave)) {
			frag.append(limbLength(), tendons());
		} else if (hasAnyNaturalArms(slave)) {
			frag.append(limbLength());
		}
		App.UI.DOM.appendNewElement("h3", frag, `Amputation`);
		if (slave.indenture < 0) {
			frag.append(amputate());
		} else {
			App.UI.DOM.appendNewElement("div", frag, `${His} indenture forbids disfiguring surgery.`);
		}
		App.UI.DOM.appendNewElement("h3", frag, `Prosthetics`);
		frag.append(prostheticInterface(), tail(), back(), App.Medicine.OrganFarm.fullMenu(slave, refresh, cheat));

		return frag;

		function shoulders() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];

			if (slave.shoulders < -1) {
				r.push(`${He} has very narrow shoulders.`);
			} else if (slave.shoulders < 0) {
				r.push(`${He} has narrow shoulders.`);
			} else if (slave.shoulders < 1) {
				r.push(`${He} has average shoulders.`);
			} else if (slave.shoulders < 2) {
				r.push(`${He} has broad shoulders.`);
			} else if (slave.shoulders === 2) {
				r.push(`${He} has very broad shoulders.`);
			}
			if (slave.shouldersImplant === 0) {
				r.push(`${He} has a natural shoulder structure.`);
			} else if (slave.shouldersImplant > 3) {
				r.push(`${His} shoulders have been completely rebuilt to be massively wider.`);
			} else if (slave.shouldersImplant > 2) {
				r.push(`${His} shoulders have been heavily restructured to broaden them.`);
			} else if (slave.shouldersImplant > 1) {
				r.push(`${His} shoulders have been repeatedly restructured to broaden them.`);
			} else if (slave.shouldersImplant > 0) {
				r.push(`${His} shoulders have been restructured to broaden them.`);
			} else if (slave.shouldersImplant < -3) {
				r.push(`${His} shoulders have been completely rebuilt to be massively narrower.`);
			} else if (slave.shouldersImplant < -2) {
				r.push(`${His} shoulders have been heavily restructured to narrow them.`);
			} else if (slave.shouldersImplant < -1) {
				r.push(`${His} shoulders have been repeatedly restructured to narrow them.`);
			} else if (slave.shouldersImplant < 0) {
				r.push(`${His} shoulders have been restructured to narrow them.`);
			}
			if (slave.indentureRestrictions > 0) {
				App.UI.DOM.appendNewElement("div", el, `${His} indenture forbids elective surgery`, ["choices", "note"]);
			} else {
				if (slave.shouldersImplant === 0 || V.surgeryUpgrade === 1) {
					if (slave.shoulders < 2) {
						linkArray.push(App.Medicine.Surgery.makeLink(new App.Medicine.Surgery.Procedures.BroadenShoulders(slave), refresh, cheat));
					}
					if (slave.shoulders > -2) {
						linkArray.push(App.Medicine.Surgery.makeLink(new App.Medicine.Surgery.Procedures.NarrowShoulders(slave), refresh, cheat));
					}
				}
			}
			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function hips() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			if (slave.hips < -1) {
				r.push(`${He} has very narrow hips.`);
			} else if (slave.hips < 0) {
				r.push(`${He} has narrow hips.`);
			} else if (slave.hips < 1) {
				r.push(`${He} has average hips.`);
			} else if (slave.hips < 2) {
				r.push(`${He} has broad hips.`);
			} else if (slave.hips < 3) {
				r.push(`${He} has very broad hips.`);
			} else if (slave.hips === 3) {
				r.push(`${He} has doorway-jamming hips.`);
			}
			if (slave.hipsImplant === 0) {
				r.push(`They have not been altered.`);
			} else if (slave.hipsImplant > 3) {
				r.push(`${His} pelvis has been completely rebuilt to be massively wider.`);
			} else if (slave.hipsImplant > 2) {
				r.push(`${His} pelvis has been heavily broadened.`);
			} else if (slave.hipsImplant > 1) {
				r.push(`${His} pelvis has been repeatedly broadened.`);
			} else if (slave.hipsImplant > 0) {
				r.push(`${His} pelvis has been broadened.`);
			} else if (slave.hipsImplant < -3) {
				r.push(`${His} pelvis has been completely rebuilt to be massively narrower.`);
			} else if (slave.hipsImplant < -2) {
				r.push(`${His} pelvis has heavily narrowed.`);
			} else if (slave.hipsImplant < -1) {
				r.push(`${His} pelvis has been repeatedly narrowed.`);
			} else if (slave.hipsImplant < 0) {
				r.push(`${His} pelvis has been narrowed.`);
			}
			if (slave.indentureRestrictions > 0) {
				App.UI.DOM.appendNewElement("div", el, `${His} indenture forbids elective surgery`, ["choices", "note"]);
			} else {
				if (slave.hipsImplant === 0) {
					if (slave.hips < 2 || (slave.hips < 3 && V.surgeryUpgrade === 1)) {
						linkArray.push(App.Medicine.Surgery.makeLink(new App.Medicine.Surgery.Procedures.BroadenPelvis(slave), refresh, cheat));
					}
					if (slave.hips > -2) {
						linkArray.push(App.Medicine.Surgery.makeLink(new App.Medicine.Surgery.Procedures.NarrowPelvis(slave), refresh, cheat));
					}
				} else if (V.surgeryUpgrade === 1) {
					if (slave.hips < 3) {
						linkArray.push(App.Medicine.Surgery.makeLink(new App.Medicine.Surgery.Procedures.BroadenPelvis(slave), refresh, cheat));
					}
					if (slave.hips > -1) {
						linkArray.push(App.Medicine.Surgery.makeLink(new App.Medicine.Surgery.Procedures.NarrowPelvis(slave), refresh, cheat));
					}
				}
			}

			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function limbLength() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];

			if (slave.heightImplant === 0) {
				r.push(`${He} has normal femurs and humeri.`);
			} else if (slave.heightImplant > 0) {
				r.push(`${His} femurs, humeri, and other major bones have been `);
				if (slave.heightImplant >= 1) {
					r.push(`considerably `);
				}
				r.push(`lengthened.`);
			} else if (slave.heightImplant < 0) {
				r.push(`${His} femurs, humeri, and other major bones have been `);
				if (slave.heightImplant <= -1) {
					r.push(`considerably `);
				}
				r.push(`shortened.`);
			}
			if (slave.indentureRestrictions < 1) {
				if (slave.heightImplant === 0) {
					linkArray.push(App.Medicine.Surgery.makeLink(new App.Medicine.Surgery.Procedures.IncreaseHeight(slave), refresh, cheat));
					linkArray.push(App.Medicine.Surgery.makeLink(new App.Medicine.Surgery.Procedures.DecreaseHeight(slave), refresh, cheat));
				} else if (slave.heightImplant >= 1) {
					if (slave.height < (Height.mean(slave) + 15) && V.surgeryUpgrade === 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(new App.Medicine.Surgery.Procedures.IncreaseHeight(slave), refresh, cheat));
					}
					if (slave.heightImplant === 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(new App.Medicine.Surgery.Procedures.DecreaseHeight(slave), refresh, cheat));
					} else if (V.surgeryUpgrade === 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(new App.Medicine.Surgery.Procedures.DecreaseHeight(slave), refresh, cheat));
					}
				} else if (slave.heightImplant <= -1) {
					if (slave.height >= (Height.mean(slave) - 15) && V.surgeryUpgrade === 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(new App.Medicine.Surgery.Procedures.DecreaseHeight(slave), refresh, cheat));
					}
					if (slave.heightImplant === -1) {
						linkArray.push(App.Medicine.Surgery.makeLink(new App.Medicine.Surgery.Procedures.IncreaseHeight(slave), refresh, cheat));
					} else if (V.surgeryUpgrade === 1) {
						linkArray.push(App.Medicine.Surgery.makeLink(new App.Medicine.Surgery.Procedures.IncreaseHeight(slave), refresh, cheat));
					}
				}
			}

			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function tendons() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			if (slave.heels === 0 && hasAnyNaturalLegs(slave)) {
				r.push(`${He} has healthy calves.`);
			} else if (slave.heels === 1 && hasAnyNaturalLegs(slave)) {
				r.push(`${His} calves have been altered so that ${he} cannot walk in anything but very high heels.`);
			}
			if (slave.heels === 0 && hasAnyNaturalLegs(slave) && V.seeExtreme === 1) {
				if (slave.indentureRestrictions < 1) {
					linkArray.push(App.Medicine.Surgery.makeLink(new App.Medicine.Surgery.Procedures.ShortenTendons(slave), refresh, cheat));
				}
			}
			if (slave.heels === 1) {
				linkArray.push(App.Medicine.Surgery.makeLink(new App.Medicine.Surgery.Procedures.ReplaceTendons(slave), refresh, cheat));
			}
			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function amputate() {
			const el = new DocumentFragment();
			const r = [];
			r.push(App.Desc.limbs(slave));
			if (isAmputee(slave)) {
				if (slave.PLimb === 1) {
					r.push(`${He} has been implanted with a basic PLimb interface.`);
				} else if (slave.PLimb === 2) {
					r.push(`${He} has been implanted with an advanced PLimb interface.`);
				} else if (slave.PLimb === 3) {
					r.push(`${He} has been implanted with an Quadrupedal Prosthetic interface.`);
				}
			}
			App.Events.addNode(el, r, "div");

			if (V.seeExtreme === 1 && slave.indentureRestrictions < 1 && hasAnyNaturalLimbs(slave)) {
				el.append(amputateSelector());
			}
			return el;
		}

		/**
		 * @returns {HTMLDivElement}
		 */
		function amputateSelector() {
			const outerDiv = document.createElement("div");
			outerDiv.classList.add("choices");
			const linkContainer = document.createElement("div");

			const allLimbs = makeCheckbox("all-limbs");
			/**
			 * @type {Array<HTMLInputElement>}
			 */
			const limbs = [];
			if (getLeftArmID(slave) === 1) {
				limbs.push(makeCheckbox("left-arm"));
			}
			if (getRightArmID(slave) === 1) {
				limbs.push(makeCheckbox("right-arm"));
			}
			if (getLeftLegID(slave) === 1) {
				limbs.push(makeCheckbox("left-leg"));
			}
			if (getRightLegID(slave) === 1) {
				limbs.push(makeCheckbox("right-leg"));
			}

			allLimbs.onchange = () => {
				const checked = allLimbs.checked;
				limbs.forEach(l => l.checked = checked);
				App.UI.DOM.replace(linkContainer, link(limbs.length));
			};

			const checkAllBox = function() {
				let checkedCount = 0;
				limbs.forEach(l => {
					if (l.checked) {
						checkedCount++;
					}
				});

				if (checkedCount === 0) {
					allLimbs.checked = false;
					allLimbs.indeterminate = false;
				} else if (checkedCount === limbs.length) {
					allLimbs.checked = true;
					allLimbs.indeterminate = false;
				} else {
					allLimbs.checked = false;
					allLimbs.indeterminate = true;
				}
				App.UI.DOM.replace(linkContainer, link(checkedCount));
			};

			limbs.forEach(l => l.onchange = checkAllBox);

			/**
			 * @type {Map<string, string>}
			 */
			const idToName = new Map([
				["left-arm", "Left arm"],
				["right-arm", "Right arm"],
				["left-leg", "Left leg"],
				["right-leg", "Right leg"]
			]);

			appendCheckBox(outerDiv, allLimbs, "All limbs");
			const div = document.createElement("div");
			div.classList.add("choices");
			limbs.forEach(l => appendCheckBox(div, l, idToName.get(l.id)));
			outerDiv.append(div);

			linkContainer.append(link(0));
			outerDiv.append(linkContainer);

			/**
			 * @param {number} checkedCount
			 * @returns {HTMLAnchorElement|HTMLSpanElement}
			 */
			function link(checkedCount) {
				const newLimbs = {
					"left-arm": false,
					"right-arm": false,
					"left-leg": false,
					"right-leg": false,
				};
				limbs.forEach(l => {
					newLimbs[l.id] = l.checked;
				});
				return App.Medicine.Surgery.makeLink(
					new App.Medicine.Surgery.Procedures.Amputate(slave,
						newLimbs["left-arm"], newLimbs["right-arm"], newLimbs["left-leg"], newLimbs["right-leg"]),
					refresh, cheat);
			}

			/**
			 * @param {string} id must be unique
			 * @returns {HTMLInputElement}
			 */
			function makeCheckbox(id) {
				const checkbox = document.createElement("input");
				checkbox.id = id;
				checkbox.setAttribute("type", "checkbox");
				checkbox.checked = false;
				return checkbox;
			}

			/**
			 * @param {HTMLElement} container
			 * @param {HTMLInputElement} box
			 * @param {string} name
			 */
			function appendCheckBox(container, box, name) {
				const label = document.createElement("label");
				label.append(box, " ", name);
				App.UI.DOM.appendNewElement("div", container, label);
			}

			return outerDiv;
		}

		function prostheticInterface() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			if (!hasAllNaturalLimbs(slave)) {
				if (slave.PLimb === 0 && isProstheticAvailable(slave, "interfaceP1")) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.BasicPLimbInterface(slave), refresh, cheat));
				}
				if (slave.PLimb !== 2 && isProstheticAvailable(slave, "interfaceP2")) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.AdvancedPLimbInterface(slave), refresh, cheat));
				}
				if (slave.PLimb !== 3 && isProstheticAvailable(slave, "interfaceP3")) {
					linkArray.push(App.Medicine.Surgery.makeLink(
						new App.Medicine.Surgery.Procedures.QuadrupedalPLimbInterface(slave), refresh, cheat));
				}
			}
			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function tail() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			if (slave.PTail === 1) {
				r.push(`${He} has a neural interface allowing attachment of tails.`);
			} else if (isProstheticAvailable(slave, "interfaceTail")) {
				r.push(`${He} lacks a neural interface allowing attachment of tails.`);
				linkArray.push(App.Medicine.Surgery.makeLink(
					new App.Medicine.Surgery.Procedures.TailInterface(slave),
					refresh, cheat));
			} else {
				r.push(`${He} lacks a neural interface allowing attachment of tails and you have none ready for ${him}.`);
			}
			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}

		function back() {
			const el = new DocumentFragment();
			const r = [];
			const linkArray = [];
			if (slave.PBack === 1) {
				r.push(`${He} has a neural back interface allowing attachment of dorsal appendages.`);
			} else if (isProstheticAvailable(slave, "interfaceBack")) {
				r.push(`${He} lacks a neural back interface allowing attachment of dorsal appendages.`);
				linkArray.push(App.Medicine.Surgery.makeLink(
					new App.Medicine.Surgery.Procedures.BackInterface(slave),
					refresh, cheat));
			} else {
				r.push(`${He} lacks a neural back interface allowing attachment of dorsal appendages and you have none ready for ${him}.`);
			}
			App.Events.addNode(el, r, "div");
			App.UI.DOM.appendNewElement("div", el, App.UI.DOM.generateLinksStrip(linkArray), "choices");
			return el;
		}
	}
};
