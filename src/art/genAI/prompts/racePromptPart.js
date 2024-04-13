App.Art.GenAI.RacePromptPart = class RacePromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		if (this.slave.race === "white") {
			return "caucasian";
		} else if (this.slave.race === "black") {
			return "african";
		} else if (this.slave.race === "catgirl") {
			return undefined; // catgirl/catboy race is covered by gender prompt
		}
		return this.slave.race;
	}

	/**
	 * @override
	 */
	negative() {
		if (this.slave.race !== "asian" && this.slave.race !== "catgirl") {
			return "asian";
		}
		return;
	}
};
