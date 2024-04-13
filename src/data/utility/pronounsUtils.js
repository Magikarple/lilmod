App.Data.Pronouns = {};

/**
 * @readonly
 * @enum {number}
 */
App.Data.Pronouns.Kind = Object.freeze({
	female: 0,
	male: 1,
	neutral: 2,
	toy: 2,
	epicene: 3,
	plural: 3,
	ai: 4,
	custom: 1000
});

/**
 * @param {string} pronoun
 * @param {string} possessive
 * @param {string} possessivePronoun
 * @param {string} object
 * @param {string} objectReflexive
 * @param {string} noun
 * @returns {FC.Data.Pronouns.Definition}
 */
App.Data.Pronouns.makePronounsData = function(
	pronoun, possessive, possessivePronoun, object, objectReflexive, noun) {
	return {
		pronoun: pronoun,
		possessive: possessive,
		possessivePronoun: possessivePronoun,
		object: object,
		objectReflexive: objectReflexive,
		noun: noun
	};
};

App.Data.Pronouns.Std = {
	0: App.Data.Pronouns.makePronounsData("she", "her", "hers", "her", "herself", "girl"),
	1: App.Data.Pronouns.makePronounsData("he", "his", "his", "him", "himself", "boy"),
	2: App.Data.Pronouns.makePronounsData("it", "its", "its", "it", "itself", "toy"),
	3: App.Data.Pronouns.makePronounsData("they", "their", "theirs", "them", "themselves", "toys"),
	4: App.Data.Pronouns.makePronounsData("it", "its", "its", "it", "itself", "program"),
};
