/** base class for class-based events */
App.Events.BaseEvent = class BaseEvent {
	/**
	 * build a new event
	 * parameters are necessary for serialization (so that saving with the event active will work correctly) and should not normally be used directly
	 * child classes will inherit this implementation automatically, and should not normally need their own constructor implementation
	 * @param {Array<number>} [actors]
	 * @param {object} [params]
	 */
	constructor(actors, params) {
		/** @member {Array<number>} actors - a list of IDs for the actors participating in this event. */
		this.actors = actors || [];
		/** @member {object} params - a set of parameters to pass to the event. */
		this.params = params || {};
	}

	/** Event predicates determine whether the event will occur or not.
	 * @callback eventPredicate
	 * @returns {boolean}
	 */
	/** generate an array of zero or more predicates which must all return true in order for the event to be valid.
	 * lambda predicates may add properties to {@link App.Events.BaseEvent#params the params member} in order to pass information on to the event.
	 * child classes should implement this.
	 * @returns {Array<eventPredicate>}
	 */
	eventPrerequisites() {
		return [];
	}

	/** Actor predicates determine whether an actor is qualified for an event or not.
	 * @callback actorPredicate
	 * @param {App.Entity.SlaveState} slave
	 * @returns {boolean}
	 */
	/** generate an array of zero or more arrays, each corresponding to an actor in the event, which contain zero or more predicates which must be satisfied by the actor.
	 * child classes should implement this, unless they don't need any actors, or are overriding castActors.
	 * @returns {Array<Array<actorPredicate>>}
	 */
	actorPrerequisites() {
		return [];
	}

	/** get the choice weight for the event. Weights should be integral; higher weight means higher probability of selection.
	 * @returns {number}
	 */
	get weight() {
		return 1;
	}

	/** run the event and attach DOM output to the event passage.
	 * child classes must implement this.
	 * @param {ParentNode} node - Document fragment which event output should be attached to
	 */
	execute(node) {
	}

	/** clone the event (needed for serialization).
	 * default implementation should suffice for child classes */
	clone() {
		return _.cloneDeep(this);
	}

	/** serialize the event instance so it persists through saves.
	 * default implementation should suffice for child classes assigned to App.Events */
	toJSON() {
		const reviveData = {actors: this.actors, params: this.params};
		return JSON.reviveWrapper(`new App.Events.${this.constructor.name}($ReviveData$.actors, $ReviveData$.params)`, reviveData);
	}

	/** get the event's (human-readable) name. must not include ":".
	 * default implementation should generally suffice (though we might want to de-camelcase here or something).
	 * @returns {string}
	 */
	get eventName() {
		return this.constructor.name;
	}

	/** build the actual list of actors that will be involved in this event.
	 * default implementation should suffice for child classes with a fixed number of actors; may be overridden for events with variable actor count.
	 * @param {App.Entity.SlaveState} [firstActor] - if supplied, the first actor should be this slave (fail if she is not qualified)
	 * @returns {boolean} - return false if sufficient qualified actors could not be found (cancel the event)
	 */
	castActors(firstActor) {
		const prereqs = this.actorPrerequisites();

		// if casting is already complete and still valid, don't do it again
		if (this.actors.length === prereqs.length) {
			let recast = false;
			for (let i = 0; i < this.actors.length; ++i) {
				const actor = getSlave(this.actors[i]);
				recast = actor && prereqs[i].some(p => !p(actor));
			}
			if (!recast) {
				return true; // all roles previously cast & prereqs still met
			}
		}

		this.actors = [];

		let i = 0;
		if (firstActor && prereqs.length > 0) {
			if (prereqs[0].every(p => p(firstActor))) {
				this.actors.push(firstActor.ID);
			} else {
				return false; // preselected first actor was not qualified
			}
			i = 1; // first actor is cast
		}

		for (; i < prereqs.length; ++i) {
			const qualified = V.slaves.filter(s => !this.actors.includes(s.ID) && prereqs[i].every(p => p(s)));
			if (qualified.length === 0) {
				return false; // a required actor was not found
			}
			this.actors.push(qualified.pluck().ID);
		}

		return true; // all actors cast
	}
};

/** This is a trivial event for use as an example. */
App.Events.TestEvent = class TestEvent extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[] // one actor, no requirements
		];
	}

	execute(node) {
		let [eventSlave] = this.actors.map(a => getSlave(a)); // mapped deconstruction of actors into local slave variables
		App.Events.drawEventArt(node, eventSlave);
		node.appendChild(document.createTextNode(`This test event for ${eventSlave.slaveName} was successful.`));
	}
};
