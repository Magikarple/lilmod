App.UI.WardrobeShopping = function() {
	const el = document.createElement("p");
	let p;
	el.id = "wardrobe-shopping";

	App.UI.DOM.appendNewElement("h1", el, `Slave Wardrobe`);

	let r = [];
	r.push(`The room containing all the clothes and accessories you have available to dress your slaves in, as well as the supplies and tools your tailor needs to resize them to better fit your slaves. Several mirrors are set up for a slave to try on outfits should they be allowed to dress themselves. The selection includes`);
	const ownItAll = Array.from(App.Data.clothes.keys()).every((key) => isItemAccessible.entry(key, "clothes"));

	if (ownItAll) {
		r.push(`outfits from all manner of cultures and societies; not a single style eludes you.`);
	} else {
		r.push(`many styles of clothing ranging from exciting to mundane and sexy to practical.`);
	}
	if (V.boughtItem.shoes.heels === 1) {
		r.push(`A large variety of shoes are available to select from.`);
	}
	if (V.boughtItem.clothing.dildos === 1 && V.boughtItem.toys.gags === 1 && V.boughtItem.clothing.buttPlugs === 1) {
		r.push(`Sex toys of all kinds and shapes line the shelves.`);
	} else if (V.boughtItem.clothing.dildos === 1 || V.boughtItem.toys.gags === 1 || V.boughtItem.clothing.buttPlugs === 1 || V.boughtItem.clothing.buttPlugTails === 1 || V.boughtItem.clothing.vaginalAttachments === 1) {
		r.push(`Some sex toys line the shelves.`);
	}
	if (V.boughtItem.toys.buckets === 1) {
		r.push(`Several buckets of various sizes and a sturdy cup have been set aside for you in feeding slaves to their limit.`);
	}
	if (V.boughtItem.toys.enema === 1) {
		r.push(`A number of drums of specially formulated water for use in enemas line one of the walls.`);
	}
	if (V.boughtItem.toys.medicalEnema === 1) {
		r.push(`Alongside them, multiple drums of mixtures for use in medical enemas.`);
	}
	App.UI.DOM.appendNewElement("p", el, r.join(" "), "scene-intro");

	App.UI.DOM.appendNewElement("h2", el, `Future Society styles`);

	el.append(categoryBlock("FS"));

	App.UI.DOM.appendNewElement("h2", el, `Future Society Revivalist styles`);

	el.append(categoryBlock("FSrevivalist"));

	App.UI.DOM.appendNewElement("h2", el, `Other`);

	el.append(categoryBlock("other"));

	App.UI.DOM.appendNewElement("h2", el, `Accessories`);

	p = document.createElement("p");
	p.id = "accessory-block";
	p.append(accessoryBlock());
	el.append(p);

	return el;

	/**
	 *
	 * @param {*} category FS, FSrevivalist, or "other"
	 */

	function categoryBlock(category) {
		const data = App.Data.WardrobeShopping.Clothing[category];
		/**
		 * @type {App.Entity.SlaveState[]}
		 */
		let modelChoices = [];
		/**
		 * @type {App.Entity.SlaveState}
		 */
		let model;
		if (V?.favorites.length > 0) {
			modelChoices = V.favorites.map(slaveId => getSlave(slaveId));
		} else if (V.slaves?.length > 0) {
			modelChoices = V.slaves;
		}

		if (modelChoices.length > 1) {
			model = structuredClone(modelChoices.map(slave => {
				// calculate beauty score for all slaves
				return {
					slave,
					beauty: Beauty(slave)
				};
			}).reduce((mostBeautiful, slave) => {
				// find the most beautify slave
				if (mostBeautiful.beauty >= slave.beauty) {
					return mostBeautiful;
				} else {
					return slave;
				}
			}).slave);
		} else if (modelChoices.length === 1) {
			model = structuredClone(modelChoices[0]);
		} else {
			model = (V.seeDicks === 100) ? GenerateNewSlave("XY") : GenerateNewSlave("XX");
		}

		const el = document.createElement("p");
		el.classList.add("wardrobe-shopping-block");
		el.id = `id${category}`;
		Object.keys(data).forEach(
			(clothing) => {
				const cell = document.createElement("span");
				cell.id = clothing;
				cell.append(createCell(clothing));
				el.append(cell);
			});
		return el;

		/**
		 * Create individual cell for a piece of clothing, including the display model
		 * @param {string} clothing
		 * @param {string} oldOutfit The outfit last worn by the slave. This means that on cycling outfits, we won't immediately repeat
		 */
		function createCell(clothing, oldOutfit = "") {
			const el = document.createElement("div");
			el.classList.add("wardrobe-shopping-cell");
			el.onclick = () => {
				// Not AI
				if (V.imageChoice !== 6) {
					// Randomize devotion and trust a bit, so the model moves their arms and "poses" for the player.
					model.devotion = random(-10, 70);
					model.trust = random(30, 100);
				}
				jQuery(`#${clothing}`).empty().append(createCell(clothing, model.clothes));
			};

			/** @type {wardrobeItem} */
			const clothingObj = App.Data.WardrobeShopping.Clothing[category][clothing];
			const cost = Math.trunc(clothingObj.cost * V.upgradeMultiplierTrade);
			let div;

			// If we have more than one possible outfit to showcase, make sure not to show the outfit we did last time.
			const clothesArray = clothingObj.contains.length > 1
				? clothingObj.contains.filter(item => item !== oldOutfit)
				: clothingObj.contains;

			// Get a randomly chosen piece of clothing from the set to display
			// This piece will also later be checked to see if we can purchase it or not.
			model.clothes = clothesArray[Math.floor(Math.random() * clothesArray.length)];

			if (V.seeImages === 1) {
				// Some clothing is weird (looking at you, Egyptian necklace)
				if (clothingObj.hasOwnProperty("modelUpdate")) {
					Object.assign(model, clothingObj.modelUpdate);
				}

				// AI deals with stuff async so we would run into a race condition.
				if (V.imageChoice === 6) {
					// For reactive, all images are saved anyways. Persist them to save processing power in future.
					const isTempImage = V.aiCachingStrategy !== 'reactive';
					const cellModel = structuredClone(model);
					const aiArtElem = App.UI.DOM.appendNewElement("div", el, App.Art.aiArtElement(cellModel, App.Art.ArtSizes.SMALL, isTempImage), ["imageRef", "smlImg"]);
					if (isTempImage) { aiArtElem.querySelector('[title*="Replace"]').remove(); }
				} else {
					App.UI.DOM.appendNewElement("div", el, App.Art.SlaveArtElement(model, 1, 0), ["imageRef", "smlImg"]);
				}


				// Clean up our model. Fuck you, Egypt.
				if (clothingObj.hasOwnProperty("modelUpdate")) {
					for (const prop in clothingObj.modelUpdate) {
						model[prop] = "none";
					}
				}
			}
			if (clothing !== "egypt" && !isItemAccessible.entry(model.clothes, "clothes") ||
				(clothing === "egypt" && !isItemAccessible.entry("ancient Egyptian", "collar")) // Fuck Egypt
			) {
				if (cost < V.cash) {
					App.UI.DOM.appendNewElement(
						"div",
						el,
						App.UI.DOM.link(
							`Order ${clothingObj.title}`,
							() => {
								if (cost < V.cash) { // Check again on click in case the link has become stale
									cashX(forceNeg(cost), "capEx");
									V.boughtItem.clothing[clothing] = 1;
								}
							}
						)
					);
					App.UI.DOM.appendNewElement("div", el, ` Costs ${cashFormat(cost)}`, ["detail"]);
				} else {
					div = App.UI.DOM.disabledLink(
						`Order ${clothingObj.title}`,
						[`Cannot afford ${cashFormat(cost)}`]
					);
					div.style.display = "inline"; // Fixes disabledLink
					el.append(div);
					App.UI.DOM.appendNewElement("div", el, `Costs ${cashFormat(cost)}`, ["red", "detail"]);
				}
			} else {
				App.UI.DOM.appendNewElement("div", el, clothingObj.owned);
			}

			return el;
		}
	}

	function accessoryBlock() {
		const el = document.createElement("p");

		for (const name in App.Data.WardrobeShopping.Accessories) {
			el.append(createLine(name));
		}
		return el;

		function createLine(name) {
			const line = document.createElement("div");
			const purchased = _.get(V.boughtItem, name);
			const obj = (App.Data.WardrobeShopping.Accessories[name]);
			const cost = Math.trunc(obj.cost * V.upgradeMultiplierTrade);
			let div = document.createElement("div");

			if (purchased !== 0 && purchased !== 1) {
				throw Error(`${name} set incorrectly or not found`);
			}

			if (obj.hasOwnProperty("requirements") && obj.requirements !== true) {
				return line;
			}

			if (!purchased) {
				if (cost < V.cash) {
					div.append(
						App.UI.DOM.link(
							`Order ${obj.title}`,
							() => {
								if (cost < V.cash) { // Check again on click in case the link has become stale
									cashX(forceNeg(cost), "capEx");
									_.set(V.boughtItem, name, 1);
								}
								jQuery(`#accessory-block`).empty().append(accessoryBlock());
							}
						)
					);
					if (cost > 0) {
						App.UI.DOM.appendNewElement("span", div, ` Costs ${cashFormat(cost)}`, ["detail"]);
					}
				} else {
					div.append(
						App.UI.DOM.disabledLink(
							`Order ${obj.title}`,
							[`Cannot afford ${cashFormat(cost)}`]
						)
					);
					App.UI.DOM.appendNewElement("span", div, ` Costs ${cashFormat(cost)}`, ["red", "detail"]);
				}
				if (obj.hasOwnProperty("note")) {
					App.UI.DOM.appendNewElement("span", div, ` ${obj.note}`, "note");
				}
			} else {
				div.append(obj.owned);
			}
			line.append(div);

			return line;
		}
	}
};
