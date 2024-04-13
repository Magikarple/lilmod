App.Art.GenAI.PregPromptPart = class PregPromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		if (this.slave.belly >= 10000) {
			return "pregnant, full term";
		} else if (this.slave.belly >= 5000) {
			return "[pregnant:0.3]";
		} else if (this.slave.belly >= 1500) {
			return "[pregnant:0.5]";
		} else if (this.slave.belly >= 100) {
			return "bloated, [pregnant:0.8]";
		}
	}

	/**
	 * @override
	 */
	negative() {
		return undefined;
	}
};
