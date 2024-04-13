/** @enum {boolean} */
App.UI.SlaveInteract.Position = {
	STANDING: true,
	KNEELING: false,
	LAYING: false,
};

/** @enum {string} */
App.UI.SlaveInteract.SexAct = {
	ANAL: 'anal',
	ORAL: 'oral',
	PENETRATING: 'penetrating',
	RECEIVING: 'receiving',
	VAGINAL: 'vaginal',
};

/** @enum {string} */
App.UI.SlaveInteract.Action = {
	FINGERING: 'fingering',
	KISSING: 'kissing',
	RECEIVING: 'receiving',
	TOUCHING: 'touching',
};

App.UI.SlaveInteract.Option = class Option {
	/**
	 * @param {string} link
	 * @param {string} desc
	 * @param {string} tooltip
	 * @param {() => boolean} prereq
	 * @param {() => void} effect
	 * @param {string} reaction
	 */
	constructor(link, desc, tooltip, prereq, effect, reaction) {
		this.link = link;
		this.desc = desc;
		this.tooltip = tooltip;
		this.prereq = prereq;
		this.effect = effect;
		this.reaction = reaction;
	}
};

/** A class containing the different temporary variables and states for each participant. */
App.UI.SlaveInteract.CharacterState = class CharacterState {
	constructor() {
		/** @type {number} The character's lust. */
		this.lust = 0;
		/** @type {number} The lust level when the character's last orgasm occurred */
		this.previousOrgasm = 0;
		/** @type {App.UI.SlaveInteract.Action} Which primary sex act the character is currently doing. */
		this.sexAct = null;
		/** @type {App.UI.SlaveInteract.Action} What other actions the character is currently doing. */
		this.action = null;
		/** @type {App.UI.SlaveInteract.Position} Whether the character is standing, kneeling, or laying down. */
		this.position = null;
		/** @type {boolean} Whether the character is pressed up close to the other actor. */
		this.close = false;
		/** @type {boolean} Whether the character is on the other actor's lap. */
		this.onLap = false;
		/** Properties relating to the character's clothing. */
		this.clothing = {
			/** Properties relating to the character's clothing top. */
			top: {
				/** @type {boolean} Whether the top is pulled up. */
				pulledUp: false,
				/** @type {boolean} Whether the top is off. */
				isOff: false,
			},
			/** Properties relating to the character's clothing bottom. */
			bottom: {
				/**
				 * @type {boolean}
				 * Whether the bottom is pulled down.
				 *
				 * If the clothing is a dress, whether the bottom is pulled up over the character's waist. */
				pulledDown: false,
				/** @type {boolean} Whether the bottom is off. */
				isOff: false,
			},
			/** @type {boolean} Whether the character is wearing a bra. */
			bra: true,
			/** @type {boolean} Whether the character is wearing underwear. */
			underwear: true,
			/** @type {boolean} Whether the character is wearing a strapon. */
			strapon: false,
		};
		/** @type {boolean} Whether the character has performed or received oral sex or not. */
		this.hasDoneOral = false;
		/** @type {boolean} Whether the character has performed or received vaginal sex or not. */
		this.hasDoneVaginal = false;
		/** @type {boolean} Whether the character has performed or received anal sex or not. */
		this.hasDoneAnal = false;
	}

	/** @param {App.UI.SlaveInteract.Clone} actor The actor to assign the state to. */
	assign(actor) {
		actor.state = this;

		return this;
	}

	/** @type {boolean} Whether the character is standing up. */
	get isStanding() {
		return this.position === App.UI.SlaveInteract.Position.STANDING;
	}

	/** @type {boolean} Whether the character is kneeling. */
	get isKneeling() {
		return this.position === App.UI.SlaveInteract.Position.KNEELING;
	}

	/** @type {boolean} Whether the character is laying down. */
	get isLaying() {
		return this.position === App.UI.SlaveInteract.Position.LAYING;
	}

	/** @type {boolean} Whether the character is completely naked. */
	get isNaked() {
		return this.clothing.top.isOff &&
			this.clothing.bottom.isOff &&
			!this.clothing.bra &&
			!this.clothing.underwear;
	}

	/** @type {boolean} Whether the character's chest is accessible. */
	get topFree() {
		return this.clothing.top.isOff || this.clothing.top.pulledUp;
	}

	/** @type {boolean} Whether the character's crotch is accessible. */
	get bottomFree() {
		return this.clothing.bottom.isOff || this.clothing.bottom.pulledDown;
	}
};

/**
 * A class for creating a temporary clone of the slave.
 * Not to be confused with SlaveState's `.clone` property.
 */
App.UI.SlaveInteract.Clone = class Clone {
	/** @param {App.Entity.SlaveState} slave The slave to clone. */
	constructor(slave) {
		this.slave = _.cloneDeep(slave);
		/** @type {App.UI.SlaveInteract.CharacterState} */
		this.state = null;
	}

	/** @param {App.UI.SlaveInteract.CharacterState} state The state to assign to the clone. */
	assign(state) {
		this.state = state;

		return this;
	}

	/** @returns {App.Entity.SlaveState} */
	getSlave() {
		return this.slave;
	}
};
