App.Arcology.Cell.Manufacturing = class extends App.Arcology.Cell.BaseCell {
	/**
	 * @param {number} owner
	 * @param {string} type
	 */
	constructor(owner, type = "Manufacturing") {
		super(owner);
		this.type = type;
	}

	static get cellName() {
		return "Manufacturing";
	}

	/**
	 * @returns {string}
	 */
	get colorClass() {
		switch (this.type) {
			case "Manufacturing":
				return "manufacturing";
			case "Dairy":
				return "dairy";
			case "Farmyard":
				return "farmyard";
			case "Barracks":
				return "barracks";
			case "Weapon Manufacturing":
				return "weaponsManufacturing";
			case "Pens":
				return "pens";
			case "Sweatshops":
				return "sweatshops";
			default:
				return super.colorClass;
		}
	}

	/**
	 * @override
	 * @returns {string}
	 */
	get name() {
		return this.type;
	}

	/**
	 * @returns {boolean}
	 */
	isBaseType() {
		return this.type === "Manufacturing";
	}

	/**
	 * @param {Array<number>} path
	 * @returns {Node}
	 */
	cellContent(path) {
		switch (this.type) {
			case "Dairy":
				return App.Arcology.facilityCellContent(App.Entity.facilities.dairy);
			case "Farmyard":
				return App.Arcology.facilityCellContent(App.Entity.facilities.farmyard);
			case "Manufacturing":
			case "Pens":
			case "Sweatshops":
				return App.Arcology.getCellLinkFromPath(path, this.type);
			case "Barracks":
				return App.UI.DOM.passageLink("Barracks", "Barracks");
			case "Weapon Manufacturing":
				return App.UI.DOM.passageLink("Weapons Manufacturing", "Weapons Manufacturing");
			default:
				return App.UI.DOM.makeElement("span", `ERROR: invalid type: ${this.type}`, ["error"]);
		}
	}

	/**
	 * @returns {string|Node}
	 * @protected @override
	 */
	_setting() {
		let r = "";

		switch (this.type) {
			case "Manufacturing":
				r = "rented to a variety of tenants for manufacturing purposes";
				if (this.owner === 1) {
					r += ". You control this part of the arcology and all these tenants pay you rent";
				}
				break;
			case "Sweatshops":
				if (this.owner === 1) {
					r = "designed for labor intensive manufacturing by menial slaves";
				} else {
					r = "rented to a variety of tenants for manufacturing purposes";
				}
				break;
			case "Pens":
				r = "designed to house hundreds of slaves for paying owners";
				if (this.owner === 1) {
					r += ". You control this part of the arcology. If you own menial slaves, they will be kept here; otherwise, unused space will be rented to other slave brokers";
				}
				break;
		}

		if (this.owner === 1) {
			return `This is a space in the arcology's service areas, ${r}.`;
		}
		return `This is a privately-owned space in the arcology's service areas, ${r}.`;
	}

	/**
	 * @returns {Node}
	 * @protected @override
	 */
	_body(containingBuilding) {
		const fragment = document.createDocumentFragment();

		const pensDOM = pens(this);
		if (pensDOM !== null) {
			fragment.append(pensDOM);

			const p = document.createElement("p");
			p.append(upgrades(this));
			fragment.append(p);
		} else {
			fragment.append(upgrades(this));
		}

		return fragment;

		/**
		 * @param {App.Arcology.Cell.Manufacturing} thisCell this is apparently undefined inside???
		 * @returns {null|HTMLParagraphElement}
		 */
		function pens(thisCell) {
			if (thisCell.type !== "Pens") {
				return null;
			}

			const paragraph = document.createElement("p");

			const popCap = menialPopCap();
			paragraph.append(App.UI.DOM.makeElement("div", popCap.text),
				App.UI.DOM.makeElement("div", `In total you are able to personally house a total of ${num(popCap.value)} menial slaves.`));

			if (V.menials + V.menialBioreactors + V.fuckdolls > 0) {
				let r = "You own ";
				let list = [];
				if (V.menials > 0) {
					list.push(numberWithPluralOne(V.menials, "menial slave"));
				}
				if (V.menialBioreactors > 0) {
					list.push(numberWithPluralOne(V.menialBioreactors, "standard bioreactor"));
				}
				if (V.fuckdolls > 0) {
					list.push(numberWithPluralOne(V.fuckdolls, "standard Fuckdoll"));
				}

				r += `${toSentence(list)}, `;

				if (V.menials + V.menialBioreactors + V.fuckdolls > 500) {
					r += "partially ";
				}

				r += "housed in this sector.";

				if (V.menials > 0 && sweatshopCount() > 0) {
					r += ` The simple labor slaves toil in ${V.arcologies[0].name}'s sweatshops, and only return here to sleep.`;
				}
				if (V.fuckdolls > 0 && V.arcade > 0) {
					r += ` The menial Fuckdolls are endlessly cycled through ${V.arcadeName}. They're restrained there and used by the public until their holes are no longer appealing, and then cycled back down here to rest until they've tightened up again.`;
				}
				if (V.menialBioreactors && V.dairyUpgradeMenials) {
					r += ` Whenever there's space in ${V.dairyName}, menial Bioreactors are taken out of storage here and restrained there, with ${V.dairyName}'s powerful hookups draining them of their useful fluids and feeding them generously so they can produce more.`;
				}

				paragraph.append(r);
			}

			return paragraph;
		}

		/**
		 * @param {App.Arcology.Cell.Manufacturing} thisCell
		 * @returns {DocumentFragment}
		 */
		function upgrades(thisCell) {
			const fragment = document.createDocumentFragment();
			const cost = Math.trunc(10000 * V.upgradeMultiplierArcology);

			if (V.dairy === 0) {
				fragment.append(thisCell._makeExternalUpgrade(
					`Construct a dairy to milk slaves on an industrial scale`,
					() => {
						V.dairy = 5;
						thisCell.type = "Dairy";
					}, cost, "Dairy", [`will incur upkeep costs`]
				));
			}

			if (V.farmyard === 0) {
				fragment.append(thisCell._makeExternalUpgrade(
					`Construct a farming facility to grow food for your arcology and house animals`,
					() => {
						V.farmyard = 5;
						thisCell.type = "Farmyard";
					}, cost, "Farmyard", [`will incur upkeep costs`]
				));
			}

			if (V.mercenaries) {
				if (V.barracks !== 1) {
					fragment.append(thisCell._makeExternalUpgrade(
						`Build a barracks to properly house your mercenaries`,
						() => {
							V.barracks = 1;
							thisCell.type = "Barracks";
						}, cost, "Barracks", [`will reduce mercenary upkeep`]
					));
				}
			}

			if (V.secExpEnabled > 0 && !V.SecExp.buildings.weapManu) {
				fragment.append(thisCell._makeExternalUpgrade(
					`Convert this sector to weapons manufacturing`,
					() => {
						App.Mods.SecExp.weapManu.Init();
						thisCell.type = "Weapon Manufacturing";
					}, cost, "Weapons Manufacturing", [`will provide a weekly income`]
				));
			}

			if (thisCell.type !== "Pens") {
				fragment.append(thisCell._makeInternalUpgrade(
					`Convert to pens to increase the number of menial slaves you can house`,
					() => {
						thisCell.type = "Pens";
					}, cost, containingBuilding
				));
			}

			if (thisCell.type !== "Sweatshops") {
				fragment.append(thisCell._makeInternalUpgrade(
					`Convert these facilities to use the labor of menial slaves`,
					() => {
						thisCell.type = "Sweatshops";
					}, cost, containingBuilding
				));
			}

			if (thisCell.type !== "Manufacturing") {
				fragment.append(thisCell._makeInternalUpgrade(
					`Return this sector to standard manufacturing`,
					() => {
						thisCell.type = "Manufacturing";
					}, cost, containingBuilding
				));
			}

			return fragment;
		}
	}

	/**
	 * @returns {boolean}
	 */
	canBeSold() {
		return ["Manufacturing", "Sweatshops", "Pens"].includes(this.type);
	}

	static _cleanupConfigScheme(config) {
		super._cleanupConfigScheme(config);
		// BC code
	}

	/** @returns {App.Arcology.Cell.Manufacturing} */
	clone() {
		return (new App.Arcology.Cell.Manufacturing(this.owner))._init(this);
	}

	get className() {
		return "App.Arcology.Cell.Manufacturing";
	}
};
