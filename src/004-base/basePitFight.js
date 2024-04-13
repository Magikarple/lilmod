App.Facilities.Pit.Fights.BaseFight = class BaseFight {
	/**
	 * build a new fight
	 */
	constructor() {
		/** @member {Array<number>} actors - a list of IDs for the actors participating in this fight. */
		this.actors = [];
		/** @member {object} params - a set of parameters to pass to the fight. */
		this.params = {};
	}

	/** A unique key, so we can queue the fight.
	 * @returns {string}
	 */
	get key() {
		return "base fight";
	}

	/**
	 * Whether slaves training at the arena are allowed in this fight. If yes, they will be preferred.
	 * @returns {boolean}
	 */
	get allowTrainees() {
		return false;
	}

	/**
	 * At least one slave is expected to die.
	 * @returns {boolean}
	 */
	get lethal() {
		return false;
	}

	/**
	 * How high the impact of this fight on the total event is. A flat multiplier. Used in descriptions.
	 * 1 is a nonlethal 1-vs-1 fight. May not be negative
	 * @returns {number}
	 */
	get impact() {
		return 1;
	}

	/** Get a short description to show when selecting the fight during the event.
	 * Assumes fight can be run and actors have been cast already
	 * @returns {DocumentFragment}
	 */
	fightDescription() {
		return new DocumentFragment();
	}

	/** Fight predicates determine whether the fight can be shown/executed
	 * @callback pitFightPredicate
	 * @returns {boolean}
	 */
	/** generate an array of zero or more predicates which must all return true in order for the fight to be valid.
	 * lambda predicates may add properties to {@link App.Facilities.Pit.Fights.BaseFight#params the params member} in order to pass information on to the fight.
	 * child classes should implement this.
	 * @returns {Array<pitFightPredicate>}
	 */
	fightPrerequisites() {
		return [
			() =>
				(V.pit.lethal === 0 && !this.lethal) ||
				(V.pit.lethal === 1) ||
				(V.pit.lethal === 2 && this.lethal)
		];
	}

	/**
	 * Actors that are forced to be a specific slave
	 * @returns {Array<number>}
	 */
	forcedActors() {
		return [];
	}

	/** generate an array of zero or more arrays, each corresponding to an actor in the fight, which contain zero or more predicates which must be satisfied by the actor.
	 * child classes should implement this, unless they are overriding castActors.
	 * @returns {Array<Array<actorPredicate>>}
	 */
	actorPrerequisites() {
		return [];
	}

	/** run the fight and attach DOM output to the pit fight passage.
	 * child classes must implement this.
	 * @param {ParentNode} node - Document fragment which fight output should be attached to
	 * @param {App.Facilities.Pit.Fights.FighterMap} fighterMap
	 * @returns {number} - How successful the fight was for prestige/cash.
	 *          The expected value should be between -1 and 1 inclusive. May go more extreme for unexpected outcomes.
	 *          At least one maximum/minimum value should be used, and then scaled to other events with the
	 *          {@link App.Facilities.Pit.Fights.BaseFight#impact impact property}.
	 */
	execute(node, fighterMap) {
		return 0;
	}

	/** build the actual list of actors that will be involved in this fight.
	 * default implementation should suffice for child classes with a fixed number of actors; may be overridden for fights with variable actor count.
	 * @returns {boolean} - return false if sufficient qualified actors could not be found (cancel the fight)
	 */
	castActors() {
		const prereqs = this.actorPrerequisites();

		this.actors = [...this.forcedActors()];

		for (let i = 0; i < prereqs.length; ++i) {
			if (this.allowTrainees) {
				if (this._selectActor(prereqs[i], ...App.Entity.facilities.pit.job("trainee").employeesIDs())) {
					continue;
				}
			}
			if (!this._selectActor(prereqs[i], ...App.Entity.facilities.pit.job("fighter").employeesIDs())) {
				return false;
			}
		}

		return true; // all actors cast
	}

	/**
	 * @param {Array<actorPredicate>} prereqs
	 * @param {...number} ids
	 * @returns {boolean} False, if no actor could be selected
	 * @private
	 */
	_selectActor(prereqs, ...ids) {
		const qualified = ids
			.filter(si => !this.actors.includes(si) && prereqs.every(p => p(getSlave(si))) && this._validActor(si));
		if (qualified.length === 0) {
			return false; // a required actor was not found
		}
		this.actors.push(qualified.pluck());
		return true;
	}

	/**
	 * @param {number} si - Slave ID
	 * @returns {boolean} True, if the slave is allowed to fight
	 * @private
	 */
	_validActor(si) {
		if (!V.pit.minimumHealth) {
			return true;
		}
		const slave = getSlave(si);
		return canWalk(slave) && slave.health.condition >= -20;
	}
};

/** This is a trivial fight for use as an example. */
App.Facilities.Pit.Fights.TestFight = class extends App.Facilities.Pit.Fights.BaseFight {
	get key() {
		return "test";
	}

	actorPrerequisites() {
		return [
			[], // actor one, no requirements
			[] // actor two, no requirements
		];
	}

	execute(node) {
		let [slave1, slave2] = this.actors.map(a => getSlave(a)); // mapped deconstruction of actors into local slave variables
		node.appendChild(document.createTextNode(`This test fight for ${slave1.slaveName} and ${slave2.slaveName} was successful.`));
		return 0;
	}
};

App.Facilities.Pit.Fights.FighterMap = class {
	constructor() {
		/**
		 * @type {Map<number, number>}
		 */
		this.map = new Map();
	}

	fightCount(slaveId) {
		const count = this.map.get(slaveId);
		if (count === undefined) {
			return 0;
		} else {
			return count;
		}
	}

	addFight(slaveId) {
		const oldCount = this.fightCount(slaveId);
		this.map.set(slaveId, oldCount + 1);
	}

	fighterCount() {
		return this.map.size;
	}

	fightsCount() {
		let count = 0;
		this.map.forEach((v, k) => {
			count += v;
		});
		return count;
	}
};

