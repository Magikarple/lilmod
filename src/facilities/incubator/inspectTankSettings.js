App.UI.inspectTankSettings = function(isFetus, isPCMother = false) {
	let tankSetting;
	let child;
	let fetus;

	if (!isFetus) {
		child = V.incubator.tanks[V.AS];
		tankSetting = child.incubatorSettings;
	} else {
		if (isPCMother) {
			fetus = V.PC.womb[V.activeFetus];
		} else {
			fetus = getSlave(V.AS).womb[V.activeFetus];
		}
		if ("tankSetting" in fetus === false) {
			fetus.tankSetting = fetus.genetics.gender === "XX" ? {...V.incubator.femaleSetting} : {...V.incubator.maleSetting};
		}
		tankSetting = fetus.tankSetting;
	}
	const {
		He,
		he, him, his
	} = (isFetus ? getPronouns(fetus.age >= 2 ? (fetus.genetics.gender === "XX" ? {pronoun: 0} : {pronoun: 1}) : {pronoun: 3}) : getPronouns(child));

	const container = App.UI.DOM.makeElement('span', content());

	return container;

	/**
	 * @returns {DocumentFragment}
	 */
	function content() {
		const node = new DocumentFragment();
		let section;
		let linkArray;

		App.UI.DOM.appendNewElement("h2", node, "Tank settings:");

		/* Age */
		if (isFetus) {
			let target = Math.round(tankSetting.targetAge);		// This is fine because it will only be displayed when growTime has not been depleted
			let r = [];
			r.push("Target age for release:");
			r.push(
				App.UI.DOM.makeTextBox(
					target,
					(v) => {
						target = v || V.minimumSlaveAge;
						target = Math.clamp(target, V.minimumSlaveAge, V.retirementAge);
						tankSetting.targetAge = target;
						jQuery(container).empty().append(content());
					},
					true
				)
			);

			linkArray = [];
			linkArray.push(
				App.UI.DOM.link(
					`Minimum Legal Age`,
					() => {
						target = V.minimumSlaveAge;
						tankSetting.targetAge = target;
						jQuery(container).empty().append(content());
					}
				)
			);
			linkArray.push(
				App.UI.DOM.link(
					`Average Age of Fertility`,
					() => {
						target = V.fertilityAge;
						tankSetting.targetAge = target;
						jQuery(container).empty().append(content());
					}
				)
			);
			linkArray.push(
				App.UI.DOM.link(
					`Average Age of Potency`,
					() => {
						target = V.potencyAge;
						tankSetting.targetAge = target;
						jQuery(container).empty().append(content());
					}
				)
			);
			linkArray.push(
				App.UI.DOM.link(
					`Legal Adulthood`,
					() => {
						target = 18;
						tankSetting.targetAge = target;
						jQuery(container).empty().append(content());
					}
				)
			);
			r.push(App.UI.DOM.generateLinksStrip(linkArray));

			App.Events.addNode(node, r, "p");
		} else {
			section = App.UI.DOM.makeElement("p");
			if (isFetus) {
				section.append(`Target age for release: ${tankSetting.targetAge}`);
			} else {
				section.append(`Target age for release: ${child.physicalAge}`);		// This is already set, apparently
			}
			section.append(App.UI.DOM.makeElement("div", `Cannot be changed on tanks in use`));
			node.append(section);
		}

		/* Weight */
		section = App.UI.DOM.makeElement("p");
		if (V.incubator.upgrade.weight === 1) {
			linkArray = [];

			if (tankSetting.weight === 1) {
				section.append(`Weight ${isFetus ? `will not be` : `is not being`} properly managed; excessive weight gain is likely.`);
			} else {
				linkArray.push(makeLink(`Estimate only`, () => { tankSetting.weight = 1; }));
			}

			if (tankSetting.weight === 2) {
				section.append(`Weight ${isFetus ? `will be` : `is`} being carefully managed; ${he} will be released at a healthy weight.`);
			} else {
				linkArray.push(makeLink(`Activate`, () => { tankSetting.weight = 2; }));
			}

			if (tankSetting.weight === 0) {
				section.append(`Weight management systems ${isFetus ? `will be` : `are`} offline; ${he} will likely be malnourished.`);
			} else {
				linkArray.push(makeLink(`Disable`, () => { tankSetting.weight = 0; }));
			}

			section.append(" ", App.UI.DOM.generateLinksStrip(linkArray));
		} else {
			section.append(`There are no systems in place to control a growing child's weight; ${he} will likely come out emaciated from the rapid growth.`);
		}
		node.append(section);


		/* Muscles */
		section = App.UI.DOM.makeElement("p");
		if (V.incubator.upgrade.muscles === 1) {
			linkArray = [];

			if (tankSetting.muscles === 2) {
				section.append(`Strength levels ${isFetus ? `will be` : `are`} purposefully set higher than recommended; excessive muscle gain is likely.`);
			} else {
				linkArray.push(makeLink(`Overload`, () => { tankSetting.muscles = 2; }));
			}

			if (tankSetting.muscles === 1) {
				section.append(`Musculature ${isFetus ? `will be` : `is`} being carefully managed; ${he} will be released with near normal strength.`);
			} else {
				linkArray.push(makeLink(`Activate`, () => { tankSetting.muscles = 1; }));
			}

			if (tankSetting.muscles === 0) {
				section.append(`Strength management systems ${isFetus ? `will be` : `are`} offline; ${he} will likely be released extremely weak.`);
			} else {
				linkArray.push(makeLink(`Disable`, () => { tankSetting.muscles = 0; }));
			}

			section.append(" ", App.UI.DOM.generateLinksStrip(linkArray));
		} else {
			section.append(`There are no systems in place to control a growing child's musculature; ${he} will likely come out frail and weak from the rapid growth.`);
		}
		node.append(section);


		/* Height */
		section = App.UI.DOM.makeElement("p");
		if (V.incubator.upgrade.growthStims === 1) {
			linkArray = [];

			if (tankSetting.growthStims === 2) {
				section.append(`${He} will be injected with higher than recommended doses of stimulants; exceeding expected final height is likely. `);
			} else {
				linkArray.push(makeLink(`Overload`, () => { tankSetting.growthStims = 2; }));
			}

			if (tankSetting.growthStims === 1) {
				section.append(`${He} will be injected with the recommended dosage of stimulants; ${he} will grow to ${his} full expected height. `);
			} else {
				linkArray.push(makeLink(`Limit`, () => { tankSetting.growthStims = 1; }));
			}

			if (tankSetting.growthStims === 0) {
				section.append(`Growth stimulant injection systems ${isFetus ? `will be` : `are`} offline; ${he} will develop normally. `);
			} else {
				linkArray.push(makeLink(`Disable`, () => { tankSetting.growthStims = 0; }));
			}
			section.append(App.UI.DOM.generateLinksStrip(linkArray));
		} else {
			section.append(`There are no systems in place to control a growing child's height.`);
		}
		node.append(section);


		/* Reproduction */
		section = App.UI.DOM.makeElement("p");
		if (V.incubator.upgrade.reproduction === 1) {
			linkArray = [];

			if (tankSetting.reproduction === 2) {
				section.append(`Hormone levels ${isFetus ? `will be` : `are`} purposefully set higher than recommended; an over-active reproductive system is likely.`);
			} else {
				linkArray.push(makeLink(`Overload`, () => { tankSetting.reproduction = 2; }));
			}

			if (tankSetting.reproduction === 1) {
				section.append(`Hormone levels ${isFetus ? `will be` : `are`} being carefully managed; ${he} will be released with fully functional reproductive organs.`);
			} else {
				linkArray.push(makeLink(`Limit`, () => { tankSetting.reproduction = 1; }));
			}

			if (tankSetting.reproduction === 0) {
				section.append(`Reproduction management systems ${isFetus ? `will be` : `are`} offline; ${he} will undergo normal puberty.`);
			} else {
				linkArray.push(makeLink(`Disable`, () => { tankSetting.reproduction = 0; }));
			}
			section.append(" ", App.UI.DOM.generateLinksStrip(linkArray));
		} else {
			section.append(`There are no systems in place to control a growing child's reproductive capability.`);
		}
		node.append(section);


		/* Pregnancy Adaptation */
		if (V.incubator.upgrade.reproduction === 1 && V.incubator.upgrade.pregAdaptation === 1) {
			section = App.UI.DOM.makeElement("div");
			linkArray = [];

			if (tankSetting.pregAdaptation === 1) {
				section.append(`Pregnancy adaptation system online.`);
			} else {
				linkArray.push(makeLink(`Enable`, () => { tankSetting.pregAdaptation = 1; }));
			}

			if (tankSetting.pregAdaptation === 0) {
				section.append(`Pregnancy adaptation system offline.`);
			} else {
				linkArray.push(makeLink(`Disable`, () => { tankSetting.pregAdaptation = 0; }));
			}

			if (isFetus) {
				section.append(" ", App.UI.DOM.generateLinksStrip(linkArray));
			}
			node.append(section);
		}

		section = App.UI.DOM.makeElement("div");
		if (V.incubator.upgrade.reproduction === 1 && V.incubator.upgrade.pregAdaptation === 1 && tankSetting.pregAdaptation === 1) {
			linkArray = [];

			if (tankSetting.pregAdaptationPower === 0) {
				section.append(`Pregnancy adaptation programmed to standard procedures. Normal pregnancy should be safe for ${him}.`);
			} else {
				linkArray.push(makeLink(`Standard`, () => { tankSetting.pregAdaptationPower = 0; }));
			}

			if (tankSetting.pregAdaptationPower === 1) {
				section.append(`Pregnancy adaptation programmed to advanced procedures. Up to triplet pregnancy should be safe for ${him}.`);
			} else {
				linkArray.push(makeLink(`Advanced`, () => { tankSetting.pregAdaptationPower = 1; }));
			}

			if (tankSetting.pregAdaptationPower === 2) {
				section.append(`Pregnancy adaptation programmed to intensive procedures. Up to octuplet pregnancy should be possible for ${him}. Warning! Side effects may occur to health and mental condition.`);
			} else {
				linkArray.push(makeLink(`Intensive`, () => { tankSetting.pregAdaptationPower = 2; }));
			}

			if (tankSetting.pregAdaptationPower === 3) {
				section.append(`Pregnancy adaptation programmed to extreme procedures. Normally unsustainable pregnancies may be possible for ${him}. Actual capacity will vary with genetic and other individual conditions. WARNING! Extreme side effects may occur to health and mental condition! `);
			} else {
				linkArray.push(makeLink(`Extreme`, () => { tankSetting.pregAdaptationPower = 3; }));
			}

			if (isFetus) {
				section.append(" ", App.UI.DOM.generateLinksStrip(linkArray));
			}
		}

		if (V.incubator.upgrade.reproduction === 1 && V.incubator.upgrade.pregAdaptation === 1 && !isFetus) {
			section.append(App.UI.DOM.makeElement("div", `Due to the high complexity and steep risks of the procedure, these settings cannot be changed on tanks in use.`));
		}
		node.append(section);

		/* Imprinting */
		section = App.UI.DOM.makeElement("p");
		linkArray = [];
		if (tankSetting.imprint === "terror") {
			section.append(`The imprinting system ${isFetus ? `will be` : `is`} focused on making ${him} devoted but fearful of you.`);
			if (isFetus) {
				if (V.bodyswapAnnounced === 1) {
					section.append(
						choice(
							`Switch the system to focus on preparation for body-swapping`,
							() => {
								tankSetting.imprint = "husk";
								jQuery(container).empty().append(content());
							}
						)
					);
				}
				section.append(
					choice(
						`Switch the system to focus on attachment`,
						() => {
							tankSetting.imprint = "trust";
							jQuery(container).empty().append(content());
						}
					)
				);
			} else {
				section.append(App.UI.DOM.makeElement("div", `You cannot alter this setting after ${he} has started growing.`));
			}
		} else if (tankSetting.imprint === "trust") {
			section.append(`The imprinting system ${isFetus ? `will be` : `is`} focused on making ${him} devoted and trusting of you.`);
			if (isFetus) {
				if (V.bodyswapAnnounced === 1) {
					section.append(
						choice(
							`Switch the system to focus preparation for body-swapping`,
							() => {
								tankSetting.imprint = "husk";
								jQuery(container).empty().append(content());
							}
						)
					);
				}
				section.append(
					choice(
						`Switch the system to focus on dependence`,
						() => {
							tankSetting.imprint = "terror";
							jQuery(container).empty().append(content());
						}
					)
				);
			} else {
				section.append(App.UI.DOM.makeElement("div", `You cannot alter this setting after the ${he} has started growing.`));
			}
		} else {
			section.append(`The imprinting system ${isFetus ? `will be` : `is`} focused on producing a complete vegetable ready to be used as a host for body swapping.`);
			if (isFetus) {
				section.append(
					choice(
						`Switch the system to focus on dependence`,
						() => {
							tankSetting.imprint = "terror";
							jQuery(container).empty().append(content());
						}
					)
				);
				section.append(
					choice(
						`Switch the system to focus on attachment`,
						() => {
							tankSetting.imprint = "trust";
							jQuery(container).empty().append(content());
						}
					)
				);
			} else {
				section.append(App.UI.DOM.makeElement("div", `You cannot alter this setting after the ${he} has started growing.`));
			}
		}
		node.append(section);

		return node;
	}

	/**
	 *
	 * @param {string} title
	 * @param {function():void} func
	 * @param {string} [passage=""]
	 * @param {string} [note=""]
	 * @returns {HTMLElement}
	 */
	function choice(title, func, passage = "", note = "") {
		const div = document.createElement("div");
		div.classList.add("choices");
		div.append(
			App.UI.DOM.link(
				title,
				func,
				[],
				passage,
				note
			)
		);
		return div;
	}

	/**
	 *
	 * @param {string} title
	 * @param {function():void} func
	 */
	function makeLink(title, func) {
		return App.UI.DOM.link(
			title,
			() => {
				func();
				jQuery(container).empty().append(content());
			}
		);
	}
};
