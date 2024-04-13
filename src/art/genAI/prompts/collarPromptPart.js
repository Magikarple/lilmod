App.Art.GenAI.CollarPromptPart = class CollarPromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		if (asSlave(this.slave)?.fuckdoll > 0) {
			return undefined; // fuckdolls can't wear collars
		}

		if (this.slave.collar === "bell collar") {  // Doesn't work well, better than "bell collar collar"
			return "bell collar";
		} else if (this.slave.collar === "bowtie") {
			return "bowtie, collar";
		} else if (this.slave.collar === "leather with cowbell") {  // Doesn't work well, better than "leather with cowbell collar"
			return "leather collar, cowbell around neck";
		} else if (this.slave.collar === "neck corset") { // Doesn't work well, but doesn't add real corsets
			return "tall leather collar, tight collar";
		} else if (this.slave.collar === "neck tie") {
			return "(necktie:1.2), collar";
		} else if (this.slave.collar === "satin choker") {
			return "satin choker";
		} else if (this.slave.collar !== "none") {
			return `${this.slave.collar} collar`;
		}
	}

	/**
	 * @override
	 */
	negative() {
		return undefined;
	}
};
