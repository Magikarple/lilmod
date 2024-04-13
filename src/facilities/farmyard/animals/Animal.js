/** The base animal class. */
App.Entity.Animal = class Animal extends App.Entity.Serializable {
	/**
	 * @param {string} name
	 * @param {string} species
	 * @param {'canine'|'hooved'|'feline'} type
	 * @param {'domestic'|'exotic'} rarity
	 * @param {boolean} [custom]
	 */
	constructor(name, species, type, rarity, custom) {
		super();
		this.name = name;
		this.species = species;
		this.type = type;
		this.rarity = rarity;
		if (custom) {
			this.custom = custom;
		} else {
			this.custom = false;
		}
		this.articleAn = 'a';
		this.dick = {
			/** Corresponds directly to the sizes in SlaveState. */
			size: this.species === 'cat' ? 2 : 4,
			desc: this.species === 'cat' ? 'little' : 'large',
		};
		this.deadliness = this.type === 'feline' ? this.species === 'cat' ? 1 : 4 : 3;
	}

	/** @returns {boolean} */
	get purchased() {
		return V.animals[this.type].includes(this);
	}

	/** @returns {boolean} */
	get isActive() {
		return V.active[this.type] === this.name;
	}

	/** @returns {boolean} */
	get isCustom() {
		return this.custom;
	}

	/** @returns {string} */
	get ballType() {
		return this.species;
	}

	/** @returns {this} */
	purchase() {
		V.animals[this.type].push(this.name);
		/*
		if (V.pit && !V.pit.animal) {
			V.pit.animal = this.name;
		}
		*/
		return this;
	}

	/** @returns {this} */
	sell() {
		V.animals[this.type] = V.animals[this.type].filter(animal => animal !== this.name);

		if (this.isActive) {
			V.active[this.type] = V.animals[this.type].random() || null;
		}
		/*
		if (V.pit && V.pit.animal === this.name) {
			V.pit.animal = null;
		}
		*/

		return this;
	}

	remove() {
		V.customAnimals.delete(this.name);
	}

	/** @param {string} name */
	setName(name) {
		this.name = name;

		return this;
	}

	/** @param {string} species */
	setSpecies(species) {
		this.species = species;

		return this;
	}

	/** @param {'canine'|'hooved'|'feline'} type */
	setType(type) {
		this.type = type;

		return this;
	}

	/** @param {'domestic'|'exotic'} rarity */
	setRarity(rarity) {
		this.rarity = rarity;

		return this;
	}

	/** @returns {this} */
	setActive() {
		V.active[this.type] = this.name;

		return this;
	}

	/** @param {'a'|'an'} setter */
	setArticle(setter) {
		this.articleAn = setter;

		return this;
	}

	/**
	 * @param {number} size
	 * @param {string} desc
	 */
	setDick(size = 2, desc = null) {
		this.dick.size = size;
		this.dick.desc = desc;

		return this;
	}

	/** @param {number} setter */
	setDeadliness(setter) {
		this.deadliness = setter;

		return this;
	}

	static _cleanupConfigScheme(config) {
		super._cleanupConfigScheme(config);
		// BC code
	}

	/** @returns {Animal} */
	clone() {
		// @ts-ignore
		return (new Animal)._init(this);
	}

	get className() { return "App.Entity.Animal"; }
};
