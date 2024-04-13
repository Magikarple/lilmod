/* map some tiny nationalities that AI models haven't been trained on to a larger neighbor or region with similar-looking people */
const microstateFix = {
	// European Microstates
	"a Liechtensteiner": "Swiss",
	"Andorran": "Catalan",
	"Luxembourgian": "Belgian",
	// "Monégasque": "French", // Monégasque works fine in testing, strangely
	"Sammarinese": "Italian",
	"Vatican": "Italian",

	// Caribbean islands
	"Antiguan": "Caribbean",
	"Aruban": "Caribbean",
	"Curaçaoan": "Caribbean",
	"Dominiquais": "Caribbean",
	"Grenadian": "Caribbean",
	"Kittitian": "Caribbean",
	"Saint Lucian": "Caribbean",
	"Vincentian": "Caribbean",

	// Oceania - micronesian nations and major tourist destinations all seem to do ok as-is, so just a couple to map
	"French Polynesian": "Polynesian",
	"Niuean": "Polynesian",
	"a Cook Islander": "Polynesian",
};

App.Art.GenAI.NationalityPromptPart = class NationalityPromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		if (["Stateless", "none", "slave", ""].includes(this.slave.nationality) || asSlave(this.slave)?.fuckdoll > 0) {
			return;
		}
		if (this.slave.nationality.endsWith("Revivalist")) {
			return;
		}
		const nationalityPrompt = microstateFix[this.slave.nationality] || this.slave.nationality;
		switch (V.aiNationality) {
			case 0: return; // disabled
			case 1: return `[${nationalityPrompt}]`; // weak
			case 2: return nationalityPrompt; // strong;
			default: throw new Error(`Unexpected value for aiNationality: ${V.aiNationality}` );
		}
	}

	/**
	 * @override
	 */
	negative() {
		return undefined;
	}
};
