App.Facilities.Farmyard.animals = function() {
	if (App.Data.Animals.size === 0) {
		App.Facilities.Farmyard.animals.init();
	}

	const frag = new DocumentFragment();
	const hrMargin = '0';

	App.UI.DOM.appendNewElement("h1", frag, 'Animals');

	const activeDiv = App.UI.DOM.appendNewElement("div", frag, activeAnimals(), ['margin-bottom']);

	App.UI.DOM.appendNewElement("div", frag, domestic(), ['margin-bottom']);
	App.UI.DOM.appendNewElement("div", frag, exotic(), ['margin-bottom']);
	frag.append(addAnimal());

	V.nextButton = "Back";
	V.nextLink = "Farmyard";
	V.returnTo = "Farmyard Animals";
	App.UI.StoryCaption.encyclopedia = "Farmyard";

	return frag;

	// Active Animals

	function activeAnimals() {
		if (V.active.canine || V.active.hooved || V.active.feline) {
			const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);
			const hr = document.createElement("hr");

			hr.style.margin = hrMargin;

			App.UI.DOM.appendNewElement("h2", div, 'Active Animals');

			div.append(hr);

			if (V.active.canine) {
				div.append(canine());
			}
			if (V.active.hooved) {
				div.append(hooved());
			}
			if (V.active.feline) {
				div.append(feline());
			}

			return div;
		}

		return new DocumentFragment();

		function canine() {
			const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);
			const options = new App.UI.OptionsGroup();

			App.UI.DOM.appendNewElement("h3", div, 'Canine');

			const option = options.addOption(null, "canine", V.active);
			V.animals.canine.forEach(canine => {
				const _canine = getAnimal(canine);

				if (_canine) {
					option.addValue(capFirstChar(_canine.name), _canine.name).pulldown();
				}
			});

			div.append(`Your ${V.active.canine} is currently set as your active canine.`, options.render());

			return div;
		}

		function hooved() {
			const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);
			const options = new App.UI.OptionsGroup();

			App.UI.DOM.appendNewElement("h3", div, 'Hooved');

			const option = options.addOption(null, "hooved", V.active);
			V.animals.hooved.forEach(hooved => {
				const _hooved = getAnimal(hooved);

				if (_hooved) {
					option.addValue(capFirstChar(_hooved.name), _hooved.name).pulldown();
				}
			});

			div.append(`Your ${V.active.hooved} is currently set as your active hooved animal.`, options.render());

			return div;
		}

		function feline() {
			const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);
			const options = new App.UI.OptionsGroup();

			App.UI.DOM.appendNewElement("h3", div, 'Feline');

			const option = options.addOption(null, "feline", V.active);
			V.animals.feline.forEach(feline => {
				const _felines = getAnimal(feline);

				if (_felines) {
					option.addValue(capFirstChar(_felines.name), _felines.name).pulldown();
				}
			});

			div.append(`Your ${V.active.feline} is currently set as your active feline.`, options.render());

			return div;
		}
	}

	// Domestic Animals

	function domestic() {
		const frag = new DocumentFragment();

		App.UI.DOM.appendNewElement("h2", frag, 'Domestic Animals');

		frag.append(
			canine(),
			hooved(),
			feline(),
		);

		return frag;

		function canine() {
			if (V.farmyardKennels) {
				const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);
				const hr = document.createElement("hr");

				hr.style.margin = hrMargin;

				App.UI.DOM.appendNewElement("span", div, 'Dogs', ['bold']);
				div.append(hr, animalList('canine', 'domestic', 5000, 'canine', 'dog'));

				if ([...App.Data.animals].some(animal =>
					animal.type === 'canine' &&
					animal.rarity === 'domestic' &&
					animal.species !== 'dog')) {
					const hr = document.createElement("hr");

					hr.style.margin = hrMargin;

					App.UI.DOM.appendNewElement("span", div, 'Other Canines', ['bold']);
					div.append(hr, animalList('canine', 'domestic', 5000, 'canine', null, 'dog'));
				}

				return div;
			}

			return new DocumentFragment();
		}

		function hooved() {
			if (V.farmyardStables) {
				const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);
				const hr = document.createElement("hr");

				hr.style.margin = hrMargin;

				App.UI.DOM.appendNewElement("span", div, 'Hooved Animals', ['bold']);
				div.append(hr, animalList('hooved', 'domestic', 20000, 'hooved'));

				return div;
			}

			return new DocumentFragment();
		}

		function feline() {
			if (V.farmyardCages) {
				const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);
				const hr = document.createElement("hr");

				hr.style.margin = hrMargin;

				App.UI.DOM.appendNewElement("span", div, 'Cats', ['bold']);
				div.append(hr, animalList('feline', 'domestic', 1000, 'feline', 'cat'));

				if ([...App.Data.animals].some(animal =>
					animal.type === 'feline' &&
					animal.rarity === 'domestic' &&
					animal.species !== 'cat')) {
					const hr = document.createElement("hr");

					hr.style.margin = hrMargin;

					App.UI.DOM.appendNewElement("span", div, 'Other Felines', ['bold']);
					div.append(hr, animalList('feline', 'domestic', 5000, 'feline', null, 'cat'));
				}

				return div;
			}

			return new DocumentFragment();
		}
	}

	// Exotic Animals

	function exotic() {
		const frag = new DocumentFragment();

		if (V.farmyardKennels > 1 || V.farmyardStables > 1 || V.farmyardCages > 1) {
			App.UI.DOM.appendNewElement("h2", frag, 'Exotic Animals');
		}

		frag.append(
			canine(),
			hooved(),
			feline(),
		);

		return frag;

		function canine() {
			if (V.farmyardKennels > 1) {
				const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);
				const hr = document.createElement("hr");

				hr.style.margin = hrMargin;

				App.UI.DOM.appendNewElement("span", div, 'Canines', ['bold']);

				div.append(hr, animalList('canine', 'exotic', 50000, 'canine'));

				return div;
			}

			return new DocumentFragment();
		}

		function hooved() {
			if (V.farmyardStables > 1) {
				const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);
				const hr = document.createElement("hr");

				hr.style.margin = hrMargin;

				App.UI.DOM.appendNewElement("span", div, 'Hooved Animals', ['bold']);

				div.append(hr, animalList('hooved', 'exotic', 75000, 'hooved'));

				return div;
			}

			return new DocumentFragment();
		}

		function feline() {
			if (V.farmyardCages > 1) {
				const div = App.UI.DOM.makeElement("div", null, ['margin-bottom']);
				const hr = document.createElement("hr");

				hr.style.margin = hrMargin;

				App.UI.DOM.appendNewElement("span", div, 'Felines', ['bold']);

				div.append(hr, animalList('feline', 'exotic', 100000, 'feline'));

				return div;
			}

			return new DocumentFragment();
		}
	}

	// Helper Functions

	/**
	 * Creates either a link or note text depending on parameters given
	 * @param {object} param
	 * @param {App.Entity.Animal} param.animal
	 * @param {string} param.active
	 * @param {string} param.type
	 * @param {number} param.price
	 * @param {function():void} param.setActiveHandler
	 * @param {function():void} param.purchaseHandler
	 * @param {function():void} param.sellHandler
	 * @param {function():void} param.removeCustomHandler
	 * @returns {string|HTMLElement}
	 */
	function animalLink({
		animal, active, type, price, setActiveHandler, purchaseHandler, sellHandler, removeCustomHandler
	}) {
		const div = document.createElement("div");
		const options = [];

		if (animal.purchased || V.animals[animal.type].some(a => a === animal.name)) {
			if (V.active[active] && animal.isActive) {
				options.push(App.UI.DOM.disabledLink(`Set as active ${type}`, ['Already set as active']));
			} else {
				options.push(App.UI.DOM.link(`Set as active ${type}`, setActiveHandler));
			}
			options.push(App.UI.DOM.link(`Sell`, sellHandler));
		} else {
			div.append(makePurchase(`Purchase ${animal.articleAn} ${animal.name}`, price, "farmyard", {notes: [`will incur upkeep costs`], handler: purchaseHandler}));
		}

		if (animal.isCustom) {
			options.push(App.UI.DOM.link(`Remove custom ${type}`, removeCustomHandler));
		}

		if (options.length) {
			div.append(App.UI.DOM.generateLinksStrip(options));
		}
		return div;
	}

	/**
	 * Creates a list of the specified animal type from the main animal array.
	 * @param {'canine'|'hooved'|'feline'} type One of 'canine', 'hooved', or 'feline', also used to determine the active animal type.
	 * @param {'domestic'|'exotic'} rarity One of 'domestic' or 'exotic'.
	 * @param {number} price
	 * @param {string} active The name of the current active animal of the given type.
	 * @param {string} [species] Any specific species to filter by,
	 * @param {string} [exclude] Any species to exclude.
	 * @returns {HTMLDivElement}
	 */
	function animalList(type, rarity, price, active, species, exclude) {
		const div = document.createElement("div");
		[...App.Data.animals]
			.filter(animal => animal.rarity === rarity && animal.type === type && animal.species !== exclude)
			.forEach(animal => {
				if (species && animal.species !== species) {
					return div;
				}

				const animalDiv = document.createElement("div");
				const optionDiv = App.UI.DOM.makeElement("div", null, ['indent']);

				const args = {
					animal: animal,
					active: active,
					type: type,
					price: price,
					setActiveHandler() {
						animal.setActive();
						App.UI.DOM.replace(div, animalList(type, rarity, price, active, species, exclude));
						App.UI.DOM.replace(activeDiv, activeAnimals());
					},
					purchaseHandler() {
						animal.purchase();
						if (!V.active[animal.type]) {
							animal.setActive();
						}
						App.UI.DOM.replace(activeDiv, activeAnimals());
						App.UI.DOM.replace(div, animalList(type, rarity, price, active, species, exclude));
					},
					sellHandler() {
						cashX(price * 0.75, "farmyard");
						animal.sell();
						App.UI.DOM.replace(activeDiv, activeAnimals());
						App.UI.DOM.replace(div, animalList(type, rarity, price, active, species, exclude));
					},
					removeCustomHandler() {
						if (animal.purchased || V.animals[animal.type].some(a => a === animal.name)) {
							cashX(price * 0.75, "farmyard");
							animal.sell();
						}
						animal.remove();
						App.UI.DOM.replace(activeDiv, activeAnimals());
						App.UI.DOM.replace(div, animalList(type, rarity, price, active, species, exclude));
					}
				};

				optionDiv.append(animalLink(args));
				animalDiv.append(capFirstChar(animal.name), optionDiv);

				div.append(animalDiv);
			});

		return div;
	}

	function addAnimal() {
		const frag = new DocumentFragment();

		const nameDiv = document.createElement("div");
		const speciesDiv = document.createElement("div");
		const typeDiv = document.createElement("div");
		const rarityDiv = document.createElement("div");
		const articleDiv = document.createElement("div");
		const dickDiv = document.createElement("div");
		const deadlinessDiv = document.createElement("div");
		const addDiv = App.UI.DOM.makeElement("div", null, ['margin-top']);

		const animal = new App.Entity.Animal(null, null, "canine", "domestic", true);
		let animalName = animal.name || 'animal';

		App.UI.DOM.appendNewElement("h2", frag, `Custom Animals`);

		frag.append(
			name(),
			species(),
			type(),
			rarity(),
			article(),
			dick(),
			deadliness(),
			add(),
		);

		return frag;

		function name() {
			nameDiv.append(
				`Name: `,
				App.UI.DOM.makeTextBox(animal.name || '', value => {
					animal.setName(value);
					animal.setSpecies(value);
					animalName = animal.name;

					refresh();
				}),
				App.UI.DOM.makeElement("span", ` Can be lowercase.`, ['note']),
			);

			return nameDiv;
		}

		function species() {
			speciesDiv.append(
				`Species: `,
				App.UI.DOM.makeTextBox(animal.species || animal.name || '', value => {
					animal.setSpecies(value);

					refresh();
				}),
				App.UI.DOM.makeElement("span", ` Can be different than the animal's name.`, ['note']),
			);

			return speciesDiv;
		}

		function type() {
			const options = new App.UI.OptionsGroup().customRefresh(refresh);
			options.addOption(null, "type", animal)
				.addValue('Canine', 'canine')
				.addValue('Hooved', 'hooved')
				.addValue('Feline', 'feline');

			if (animal.type === "canine") {
				typeDiv.append(`The ${animalName} is a canine.`, options.render());
			} else if (animal.type === "hooved") {
				typeDiv.append(`The ${animalName} is a hooved animal.`, options.render());
			} else {
				typeDiv.append(`The ${animalName} is a feline.`, options.render());
			}

			return typeDiv;
		}

		function rarity() {
			const options = new App.UI.OptionsGroup().customRefresh(refresh);
			options.addOption(null, "rarity", animal)
				.addValue('Domestic', 'domestic')
				.addValue('Exotic', 'exotic');

			if (animal.rarity === "domestic") {
				rarityDiv.append(`The ${animalName} is domesticated.`, options.render());
			} else {
				rarityDiv.append(`The ${animalName} is exotic and tamed.`, options.render());
			}

			return rarityDiv;
		}

		function article() {
			const options = new App.UI.OptionsGroup().customRefresh(refresh);
			options.addOption(null, "articleAn", animal)
				.addValue('Yes', 'an')
				.addValue('No', 'a');

			articleDiv.append(`Is the ${animalName}'s name preceded by an 'an'?`, options.render());

			return articleDiv;
		}

		function dick() {
			dickDiv.append(dickSize(), phallusDesc());

			return dickDiv;

			function dickSize() {
				const dickSizeDiv = document.createElement("div");

				dickSizeDiv.append(
					`How large is a male${animal.name ? ` ${animalName}` : ``}'s penis? `,
					App.UI.DOM.makeTextBox(animal.dick.size || 2, value => {
						animal.setDick(value, animal.dick.desc || null);

						refresh();
					}, true),
					App.UI.DOM.makeElement("span", ` 1 is smallest and default is 2.`, ['note']),
				);

				return dickSizeDiv;
			}

			function phallusDesc() {
				const dickDescDiv = document.createElement("div");

				dickDescDiv.append(
					`What does the penis look like? `,
					App.UI.DOM.makeTextBox(animal.dick.desc || '', value => {
						animal.setDick(animal.dick.size || 2, value);

						refresh();
					}),
					App.UI.DOM.makeElement("span", ` Default is 'large', but you can use any descriptor.`, ['note']),
				);

				return dickDescDiv;
			}
		}

		function deadliness() {
			deadlinessDiv.append(
				`How deadly is ${animal.name ? `${animal.articleAn} ${animal.name}` : `the animal`}? `,
				App.UI.DOM.makeTextBox(5, value => {
					animal.setDick(value);
				}, true),
				App.UI.DOM.makeElement("span", ` Default is 5.`, ['note']),
			);

			return deadlinessDiv;
		}

		function add() {
			const disabledReasons = [];

			if (!animal.name) {
				disabledReasons.push(`Animal must have a name.`);
			}

			if (!animal.species) {
				disabledReasons.push(`Animal must have a species.`);
			}

			if (getAnimal(animal.name)) {
				disabledReasons.push(`Animal with the same name already exists.`);
			}

			if (disabledReasons.length > 0) {
				App.UI.DOM.appendNewElement("div", addDiv, App.UI.DOM.disabledLink(`Add`, disabledReasons), ['margin-top']);
			} else {
				App.UI.DOM.appendNewElement("div", addDiv, App.UI.DOM.link(`Add`, () => {
					V.customAnimals.set(animal.name, animal);

					App.UI.reload();
				}), ['margin-top']);
			}

			return addDiv;
		}

		function refresh() {
			App.UI.DOM.replace(nameDiv, name);
			App.UI.DOM.replace(speciesDiv, species);
			App.UI.DOM.replace(typeDiv, type);
			App.UI.DOM.replace(rarityDiv, rarity);
			App.UI.DOM.replace(articleDiv, article);
			App.UI.DOM.replace(dickDiv, dick);
			App.UI.DOM.replace(deadlinessDiv, deadliness);
			App.UI.DOM.replace(addDiv, add);
		}
	}
};

/**
 *
 * @param {string} name
 * @returns {App.Entity.Animal}
 */
globalThis.getAnimal = function(name) {
	if (App.Data.Animals.size === 0) {
		App.Facilities.Farmyard.animals.init();
	}

	return V.customAnimals.get(name) ?? App.Data.Animals.get(name);
};

App.Facilities.Farmyard.animals.init = function() {
	if (App.Data.Animals.size === 0) {
		class Animal extends App.Entity.Animal { }

		const dog = 'dog';
		const cat = 'cat';
		const canine = 'canine';
		const hooved = 'hooved';
		const feline = 'feline';
		const domestic = 'domestic';
		const exotic = 'exotic';
		const an = 'an';

		/** @type {Animal[]} */
		[
			new Animal("beagle", dog, canine, domestic)
				.setDeadliness(2),
			new Animal("bulldog", dog, canine, domestic),
			new Animal("French bulldog", dog, canine, domestic)
				.setDeadliness(2),
			new Animal("German shepherd", dog, canine, domestic),
			new Animal("golden retriever", dog, canine, domestic),
			new Animal("labrador retriever", dog, canine, domestic),
			new Animal("poodle", dog, canine, domestic)
				.setDeadliness(2),
			new Animal("rottweiler", dog, canine, domestic),
			new Animal("Siberian husky", dog, canine, domestic),
			new Animal("Yorkshire terrier", dog, canine, domestic)
				.setDeadliness(2),

			new Animal("dingo", "dingo", canine, exotic),
			new Animal("fox", "fox", canine, exotic),
			new Animal("jackal", "jackal", canine, exotic),
			new Animal("wolf", "wolf", canine, exotic)
				.setDeadliness(4),

			new Animal("bull", "bull", hooved, domestic)
				.setDick(5, 'huge'),
			new Animal("horse", "horse", hooved, domestic)
				.setDick(5, 'huge'),
			new Animal("pig", "pig", hooved, domestic),

			new Animal("zebra", "zebra", hooved, exotic)
				.setDick(5, 'huge'),
			new Animal("elephant", "elephant", hooved, exotic)
				.setArticle(an)
				.setDick(6, 'enormous'),	// not exactly true to life, but more interesting

			new Animal("Abbysinian", cat, feline, domestic)
				.setArticle(an),
			new Animal("Bengal", cat, feline, domestic),
			new Animal("Birman", cat, feline, domestic),
			new Animal("Maine coon", cat, feline, domestic),
			new Animal("Oriental shorthair", cat, feline, domestic)
				.setArticle(an),
			new Animal("Persian", cat, feline, domestic),
			new Animal("Ragdoll", cat, feline, domestic),
			new Animal("Russian blue", cat, feline, domestic),
			new Animal("Siamese", cat, feline, domestic),
			new Animal("Sphynx", cat, feline, domestic),

			new Animal("cougar", "cougar", feline, exotic),
			new Animal("jaguar", "jaguar", feline, exotic),
			new Animal("leopard", "leopard", feline, exotic),
			new Animal("lion", "lion", feline, exotic),
			new Animal("lynx", "lynx", feline, exotic),
			new Animal("puma", "puma", feline, exotic),
			new Animal("tiger", "tiger", feline, exotic),
		].forEach(animal => App.Data.Animals.set(animal.name, animal));
	}
};

/** @type {Map<string, App.Entity.Animal>} */
App.Data.Animals = new Map;

Object.defineProperty(App.Data, 'animals', {
	get() {
		return [...App.Data.Animals.values(), ...V.customAnimals.values()];
	}
});
