/**
 * @param {{ rivalry: number }} actor
 * @returns {string}
 */
globalThis.rivalryTerm = function(actor) {
	if (actor.rivalry === 1) {
		return "growing rival";
	} else if (actor.rivalry === 2) {
		return "rival";
	} else {
		return "bitter rival";
	}
};

/**
 * @param {{ relationship: number, pronoun: number }} actor
 * @returns {string}
 */
globalThis.relationshipTerm = function(actor) {
	if (actor.relationship === 1) {
		return "friend";
	} else if (actor.relationship === 2) {
		return "best friend";
	} else if (actor.relationship === 3) {
		return "friend with benefits";
	} else if (actor.relationship === 4) {
		return "lover";
	} else {
		return `slave ${getPronouns(actor).wife}`;
	}
};

/**
 * @param {{ relationship: number, pronoun: number }} actor
 * @returns {string}
 */
globalThis.relationshipTermShort = function(actor) {
	if (actor.relationship === 1) {
		return "friend";
	} else if (actor.relationship === 2) {
		return "BFF";
	} else if (actor.relationship === 3) {
		return "FWB";
	} else if (actor.relationship === 4) {
		return "lover";
	} else {
		return `${getPronouns(actor).wife}`;
	}
};

/**
 * @param {{ relationship: number, pronoun: number }} id
 * @returns {string}
 */
globalThis.PCrelationshipTerm = function(id) {
	if (id.relationship === -2) {
		return "lover";
	} else if (id.relationship === -3) {
		return `${getPronouns(id).wife}`;
	}
};

/**
 * Introduces an actor by using any meaningful relationship(s) with an already on-screen actor, and their name.
 * Returns strings like: "your husband John", "his growing rival and mother Alice", or "her best friend and twin sister Carla".
 * If there is no known relationship between them, returns the name alone.
 * Use this function instead of just printing the slave's name when you'd like to let the player to know if two actors are related,
 * even though it's not going to have any mechanical impact on the scene.
 * @param {FC.HumanState} context
 * @param {FC.HumanState} actor
 * @param {boolean} [asLink] When true, instead of using the slave's first name, use their full name with a link to the slave description dialog.
 * @param {boolean} [insertComma] When true, if a relationship is found, it will be separated from the actor's name by a comma ("her father, Dave" instead of "her father Dave")
 * @param {boolean} [capitalize] When true, capitalizes the first letter of the intro. Use if called at the beginning of a sentence.
 * @returns {string|DocumentFragment}
 */
globalThis.contextualIntro = function(context, actor, asLink = false, insertComma = false, capitalize = false) {
	let r = ``;
	const preamble = (context === V.PC) ? "your" : getPronouns(context).possessive;

	let terms = [];
	const contextSlave = asSlave(context);
	const actorSlave = asSlave(actor);
	if (contextSlave && contextSlave.relationship > 0 && contextSlave.relationshipTarget === actor.ID) {
		terms.push(relationshipTerm(contextSlave));
	} else if (context === V.PC && actorSlave && actorSlave.relationship < -1) {
		terms.push(PCrelationshipTerm(actorSlave));
	} else if (actor === V.PC && contextSlave && contextSlave.relationship < -1) {
		terms.push(PCrelationshipTerm(contextSlave));
	} else if (contextSlave && contextSlave.rivalry > 0 && contextSlave.rivalryTarget === actor.ID) {
		terms.push(rivalryTerm(contextSlave));
	}

	terms = terms.concat(relativeTerms(context, actor));

	if (terms.length > 0) {
		r = (capitalize ? capFirstChar(preamble) : preamble) + " " + toSentence(terms);
	}

	if (r !== ``) {
		r += (insertComma || actor === V.PC) ? ", " : " ";
	}

	if (asLink && actorSlave) {
		const frag = document.createDocumentFragment();
		frag.append(r, App.UI.DOM.slaveDescriptionDialog(actorSlave));
		return frag;
	} else {
		r += actor === V.PC ? "you" : actor.slaveName;
		return r;
	}
};
