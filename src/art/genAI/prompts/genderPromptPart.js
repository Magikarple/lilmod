App.Art.GenAI.GenderPromptPart = class GenderPromptPart extends App.Art.GenAI.PromptPart {
	get isFeminine() {
		if (V.aiGenderHint === 1) { // Hormone balance
			const hormoneTransitionThreshold = 100;
			if (this.slave.hormoneBalance >= hormoneTransitionThreshold) {
				return true; // transwoman (or hormone-boosted natural woman)
			}
			return this.slave.genes === "XX" && (this.slave.hormoneBalance > -hormoneTransitionThreshold); // natural woman, and NOT transman
		} else if (V.aiGenderHint === 2) { // Perceived gender
			return perceivedGender(this.slave) > 1;
		} else if (V.aiGenderHint === 3) { // Pronouns
			return this.slave.pronoun === App.Data.Pronouns.Kind.female;
		} else {
			return false;
		}
	}

	get isMasculine() {
		if (V.aiGenderHint === 1) { // Hormone balance
			return !this.isFeminine;
		} else if (V.aiGenderHint === 2) { // Perceived gender
			return perceivedGender(this.slave) < -1;
		} else if (V.aiGenderHint === 3) { // Pronouns
			return this.slave.pronoun === App.Data.Pronouns.Kind.male;
		} else {
			return false;
		}
	}

	/**
	 * @override
	 */
	positive() {
		if (this.isFeminine) {
			if (this.slave.race === "catgirl") {
				return "catgirl, catperson <lora:CatgirlLoraV7:0.8>";
			} else if (this.slave.visualAge >= 20) {
				return "woman";
			} else {
				return "girl";
			}
		} else if (this.isMasculine) {
			if (this.slave.race === "catgirl") {
				return "catboy, catperson <lora:CatgirlLoraV7:0.8>";
			} else if (this.slave.visualAge >= 20) {
				return "man";
			} else {
				return "boy";
			}
		} else {
			if (this.slave.race === "catgirl") {
				return "catperson <lora:CatgirlLoraV7:0.8>";
			} else {
				return undefined;
			}
		}
	}

	/**
	 * @override
	 */
	negative() {
		let facialHair = this.slave.hormoneBalance > -20 ? "beard, mustache, " : ""; // NG make permanent part of negative prompt?
		if (this.isFeminine) {
			if (perceivedGender(this.slave) < -1) {  // Feminine hormone but Masculine appearing
				return undefined;
			} else { // Feminine hormone, Feminine appearing
				return `${facialHair}boy, man`;
			}
		} else if (this.isMasculine) {
			if (perceivedGender(this.slave) > 1) { // Masculine hormone but Feminine appearing
				return undefined;
			} else { // Masculine hormone, Masculine appearing
				return `${facialHair}woman, girl`;
			}
		} else {
			return undefined;
		}
	}
};
