App.UI.DressingRoom = {};

App.UI.DressingRoom.modelDevotion = 0;
App.UI.DressingRoom.modelTrust = 0;
App.UI.DressingRoom.modelId = App.UI.DressingRoom.modelId || false;

App.UI.DressingRoom.render = function() {
	// If modelId isn't set or the model no longer exists, set it from existing slaves
	if (!App.UI.DressingRoom.modelId || !getSlave(App.UI.DressingRoom.modelId)) {
		// If favorites exist, choose from them, otherwise choose from all slaves
		const defaultModelChoices = V.favorites?.length ? V.favorites.map(slaveId => getSlave(slaveId)) : V.slaves;
		const defaultModel = defaultModelChoices.sort((a, b) => Beauty(b) - Beauty(a))[0];
		App.UI.DressingRoom.modelId = defaultModel?.ID;
	}

	let customClothesPrompts = V.customClothesPrompts;

	const el = document.createElement("p");
	el.id = "dressing-room";

	App.UI.DOM.appendNewElement("h1", el, `Slave Dressing room`);

	App.UI.DOM.appendNewElement('h2', el, "Select your slave");

	if (!App.UI.DressingRoom.modelId) {
		App.UI.DOM.appendNewElement('h2', el, "No slaves to model");
		return el;
	}

	const model = structuredClone(getSlave(App.UI.DressingRoom.modelId));
	if (V.aiCachingStrategy === 'static') {
		model.ID = 0;
	}
	App.UI.DOM.appendNewElement('p', el, `${SlaveFullName(model)} is the model.`);

	for (const slave of V.slaves) {
		const div = App.UI.DOM.appendNewElement("div", el, App.UI.DOM.referenceSlaveWithPreview(slave, SlaveFullName(slave)));
		div.append(" ", App.UI.DOM.link(
			"Select",
			() => {
				App.UI.DressingRoom.modelId = slave.ID;
				App.UI.reload();
			}
		));
	}

	// App.UI.DOM.appendNewElement('h2', el, "Set Slave Accessories");
	// App.UI.DOM.appendNewElement('p', el, "[todo put ui here]");

	App.UI.DOM.appendNewElement('h2', el, "Set Slave Temperament");
	App.UI.DOM.appendNewElement('p', el, "Set level of devotion, trust, etc.");
	let options = new App.UI.OptionsGroup();
	options.addOption("Devotion", "modelDevotion", App.UI.DressingRoom).showTextBox()
		.addComment("The model's devotion");
	options.addOption("Trust", "modelTrust", App.UI.DressingRoom).showTextBox()
		.addComment("The model's trust");
	model.devotion = App.UI.DressingRoom.modelDevotion;
	model.trust = App.UI.DressingRoom.modelTrust;

	el.append(options.render());

	App.UI.DOM.appendNewElement("h2", el, `Outfits`);

	el.append(clothesSearch());

	if (V.imageChoice === 6 || V.seeCustomImagesOnly && V.aiCustomImagePrompts) {
		el.append(aiImageExtras());
	}
	el.append(clothesBlock());

	return el;

	function clothesBlock() {
		// const data = App.Data.WardrobeShopping.Clothing[category];

		const data = App.Data.clothes;

		const el = document.createElement("p");
		el.classList.add("dressing-room-square");
		el.id = `id-dressing-room`;

		for (const [k, v] of data.entries()) {
			const cell = document.createElement("span");
			cell.id = k;
			cell.append(createCell(k, v));
			el.append(cell);
		}
		return el;




		/**
		 * Create individual cell for a piece of clothing, including the display model
		 * @param {FC.Clothes} clothingName
		 * @param {clothes} clothesProperties The outfit last worn by the slave. This means that on cycling outfits, we won't immediately repeat
		 */
		function createCell(clothingName, clothesProperties) {
			const el = document.createElement("div");
			el.classList.add("dressing-room-cell");

			// TODO: randomize seeds maybe?
			// Also paritally randomize devotion and trust?



			// Get a randomly chosen piece of clothing from the set to display
			// This piece will also later be checked to see if we can purchase it or not.
			model.clothes = clothingName;
			if (V.seeImages === 1) {
				el.appendChild(createImage());
			}

			el.appendChild(createLabel());

			return el;

			/** Retrieves an image for this clothing set*/
			function createImage() {
				let aiArtElem;
				// AI deals with stuff async so we would run into a race condition.
				if (V.imageChoice === 6) {
					// For reactive, all images are saved anyways. Persist them to save processing power in future.
					const isTempImage = V.aiCachingStrategy !== 'reactive';
					const cellModel = structuredClone(model);
					// cellModel.clothes = clothingName;
					aiArtElem = App.UI.DOM.makeElement("div", App.Art.aiArtElement(cellModel, App.Art.ArtSizes.LARGE, isTempImage), ["imageRef"]);
					if (isTempImage) { aiArtElem.querySelector('[title*="Replace"]').remove(); }
				} else {
					aiArtElem = App.UI.DOM.makeElement("div", App.Art.SlaveArtElement(model, 1, 0), ["imageRef", "smlImg"]);
				}

				return aiArtElem;
			}

			/** @returns {HTMLDivElement} The name and custom prompt options of the cell */
			function createLabel() {
				const label = document.createElement('div');
				label.className = 'dressing-room-label';

				label.append(createTitle());

				if (customClothesPrompts[clothingName] && (V.imageChoice === 6 || (V.seeCustomImagesOnly && V.aiCustomImagePrompts))) {
					jQuery(label).append(createOptions());
				}

				return label;

				/**
				 * Container for clothing name and links
				 * @returns {HTMLDivElement} The created title element
				 */
				function createTitle() {
					const title = document.createElement('div');
					title.className = 'dressing-room-title';
					title.textContent = clothesProperties.name;

					if (V.imageChoice === 6 || (V.seeCustomImagesOnly && V.aiCustomImagePrompts)) {
						let hidden = !customClothesPrompts[clothingName];
						let optElem;

						const links = [
							App.UI.DOM.link(
								` Advanced`,
								() => {
									if (hidden) {
										if (!customClothesPrompts[clothingName]) {
											optElem = createOptions();
											jQuery(label).append(optElem);
										}
										jQuery(label).children(".options-group").show();
										hidden = false;
									} else {
										jQuery(label).children(".options-group").hide();
										hidden = true;
									}
								}
							),
							App.UI.DOM.link(
								` Reset`,
								() => {
									if (customClothesPrompts[clothingName]) {
										delete customClothesPrompts[clothingName];
										jQuery(label).children(".options-group").remove();
										hidden = true;
									}
								}
							)
						];

						const linkStrip = App.UI.DOM.generateLinksStrip(links);

						title.append(linkStrip);
					}

					return title;
				}

				/**
				 * Create prompt changing options
				 * @returns {HTMLDivElement} The created option element
				 */
				function createOptions() {
					const optGroup = new App.UI.OptionsGroup();
					optGroup.customRefresh(() => {
						jQuery(label).children(".options-group").remove();
						jQuery(label).append(createOptions());
					});

					optGroup.addOption(
						"Pos Prompt", 'positive',
						promptPart()).showTextBox()
						.addComment(createComment('positive'));

					optGroup.addOption(
						"Neg Prompt", 'negative',
						promptPart()).showTextBox()
						.addComment(createComment('negative'));


					let optElem = optGroup.render();

					optElem.id = clothesProperties.name + " options";

					return optElem;

					/** If a customClothingPrompt doesn't exist creates a new empty one*/
					function promptPart() {
						if (!customClothesPrompts[clothingName]) {
							customClothesPrompts[clothingName] = {
								"positive": "",
								"negative": "",
							};
						}
						return customClothesPrompts[clothingName];
					}
				}

				/**
				 * @param {string} type positive | negative
				 * @returns {string} prompts
				 */
				function createComment(type) {
					let comment = 'no prompts';
					if (customClothesPrompts[clothingName] && customClothesPrompts[clothingName][type] !== '') {
						comment = customClothesPrompts[clothingName][type];
					} else if (clothesPrompts[clothingName]) {
						comment = clothesPrompts[clothingName][type];
					}
					comment = comment.replace(/</g, '&lt;');
					return comment;
				}
			}
		}
	}

	/**
	 * @returns {HTMLDivElement} A textbox and link strip to filter the clothes list
	 */
	function clothesSearch() {
		const el = document.createElement("div");
		App.UI.DOM.appendNewElement("h4", el, "Search clothes: ");

		const searchBar = document.createElement("input");
		searchBar.type = "text";
		searchBar.addEventListener("change", updateSearch);
		searchBar.addEventListener("submit", updateSearch);

		el.appendChild(searchBar);

		let searchMode;

		el.appendChild(createModesStrip());

		return el;

		/**
		 * @param {Event} [ev] Search bar event
		 */
		function updateSearch(ev) {
			// @ts-ignore
			const query = ev?.target.value.toLowerCase() ? ev.target.value.toLowerCase() : searchBar.value.toLowerCase();

			jQuery('#id-dressing-room').children().show().not((i, elem) => {
				return ifClothesMatch(elem);
			}).hide();

			/**
			 * will match for:
			 * clothing name, presence in prompts
			 * FS Conformance, purchase status
			 * Returns true if the element matches the search query
			 * @param {any} elem The clothing cell to be matched
			 */
			function ifClothesMatch(elem) {
				let match = false;
				switch (searchMode) {
					case 'names':
						match = !!elem.id.toLowerCase().match(query);
						break;
					case 'positive prompts':
						match = !!customClothesPrompts[elem.id]?.positive.toLowerCase().match(query) || !!clothesPrompts[elem.id]?.positive.toLowerCase().match(query);
						break;
					case 'negative prompts':
						match = !!clothesPrompts[elem.id]?.negative.toLowerCase().match(query) || !!customClothesPrompts[elem.id]?.negative.toLowerCase().match(query);
						break;
					case 'fs loves':
						App.Data.clothes.get(elem.id)?.fs?.loves?.forEach((fs) => {
							match = FutureSocieties.activeFSes(V.arcologies[0]).some((afs) => {
								return fs === afs;
							});
							if (match) {
								return match = !!elem.id.toLowerCase().match(query);
							}
						});
						break;
					case 'fs tolerates':
						App.Data.clothes.get(elem.id)?.fs?.tolerates?.forEach((fs) => {
							match = FutureSocieties.activeFSes(V.arcologies[0]).some((afs) => {
								return fs === afs;
							});
							if (match) {
								return match = !!elem.id.toLowerCase().match(query);
							}
						});
						break;
					/* case 'fs search': old fs loves/tolerates
						App.Data.clothes.get(elem.id)?.fs?.loves?.forEach((fs) => {
							return match = !!fs.toLowerCase().match(query);
						});
						App.Data.clothes.get(elem.id)?.fs?.tolerates?.forEach((fs) => {
							return match = !!fs.toLowerCase().match(query);
						});
						break; */
					case 'unlocked':
						match = (!!V.arcologies[0][App.Data.clothes.get(elem.id)?.fs?.unlocks] || !!App.Data.clothes.get(elem.id).requirements || !App.Data.clothes.get(elem.id).hasOwnProperty('requirements')) && !!elem.id.toLowerCase().match(query);
						break;
					case 'locked':
						match = (!V.cheatMode && !App.Data.clothes.get(elem.id).requirements && App.Data.clothes.get(elem.id).hasOwnProperty('requirements')) && !!elem.id.toLowerCase().match(query);
						break;
					case 'customized':
						match = customClothesPrompts[elem.id] && !!elem.id.toLowerCase().match(query);
						break;
					default:
						match = false;
						break;
				}

				return match;
			}
		}
		/**
		 * @returns {HTMLUListElement} linkStrip element populated with searchModes
		 */
		function createModesStrip() {
			const searchModes = ['unlocked', 'locked', 'names'];
			let linkStrip;

			if (!searchMode) {
				searchMode = searchModes[1];
			}

			if (V.imageChoice === 6 || (V.seeCustomImagesOnly && V.aiCustomImagePrompts)) {
				searchModes.push('positive prompts', 'negative prompts', 'customized');
			}

			if (FutureSocieties.activeCount(V.arcologies[0]) > 0) {
				searchModes.push('fs loves', 'fs tolerates');
			}

			return createLinks();

			/**
			 * @returns {HTMLUListElement} A linkstrip containing search filters/ prompt exporting/importing
			 */
			function createLinks() {
				const links = [
					App.UI.DOM.disabledLink(
						searchMode.toUpperFirst(),
						['Already selected']
					)
				];

				searchModes.filter((v) => {
					return v !== searchMode;
				}).forEach((v) => {
					links.push(
						App.UI.DOM.link(
							v.toUpperFirst(),
							() => {
								searchMode = v;
								jQuery('#search-modes').empty().append(createLinks());
								updateSearch();
							}
						));
				});

				linkStrip = App.UI.DOM.generateLinksStrip(links);
				linkStrip.id = 'search-modes';
				return linkStrip;
			}
		}
	}

	/**
	 * @returns {HTMLDivElement} Contains a few extra features for ai image users
	 */
	function aiImageExtras() {
		const cont = document.createElement('div');
		let links = [
			App.UI.DOM.link(
				'Export Prompts',
				() => {
					let element = document.getElementById("exportfield");
					if (element === null) {
						element = document.createElement("textarea");
						element.id = "exportfield";
						cont.appendChild(element);
					}
					// @ts-ignore
					element.value = JSON.stringify(V.customClothesPrompts, null, 2);
				}
			),
			App.UI.DOM.link(
				'Import Prompts',
				() => {
					let element = document.getElementById("importfield");
					if (element === null) {
						element = document.createElement("textarea");
						element.id = "importfield";

						let submitBtn;

						submitBtn = document.createElement("input");
						submitBtn.id = "import-submit";
						submitBtn.value = "Import";
						submitBtn.type = "submit";
						submitBtn.onclick = () => {
							try {
								// @ts-ignore
								V.customClothesPrompts = JSON.parse(element.value);
								options.refresh();
							} catch (e) {
								alert(`Couldn't import prompts:\n${e.message}`);
							}
						};

						cont.appendChild(element);
						cont.appendChild(document.createElement("br"));
						cont.appendChild(submitBtn);
					}
				}
			)
		];

		if (V.aiCachingStrategy === 'reactive') {
			links.push(
				App.UI.DOM.link(
					'Interrupt image queue',
					() => {
						App.Art.GenAI.sdQueue.interrupt();
					}
				),
				App.UI.DOM.link(
					'Retrieve shown clothing',
					() => {
						jQuery('#id-dressing-room').children(':visible').each((i, elem) => {
							let cellModel = structuredClone(model);
							// @ts-ignore
							cellModel.clothes = elem.id;
							jQuery(elem).find('.imageRef').empty().append(App.Art.aiArtElement(cellModel, App.Art.ArtSizes.LARGE, false));
						});
					}
				)
			);
		}

		cont.append(App.UI.DOM.generateLinksStrip(links));
		App.UI.DOM.appendNewElement('br', cont);

		App.UI.DOM.appendNewElement(
			'span',
			cont,
			`Clothing prompts are also responsible for prompting genitalia and nipples, if the clothing does not cover them. Genitalia should always be prompted as "pussy", since the system will automatically switch that specific keyword out for an appropriate penis or futa lora depending on the slave's actual genital configuration.`
		);

		App.UI.DOM.appendNewElement('br', cont);

		return cont;
	}
};
