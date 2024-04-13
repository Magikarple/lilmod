App.Art.GenAI.MusclesPromptPart = class MusclesPromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		if (this.slave.muscles > 95) {
			return `(very muscular:1.3), bodybuilder`;
		} else if (this.slave.muscles > 50) {
			return `(muscular:1.3)`;
		} else if (this.slave.muscles > 30) {
			return `(muscular:1.2)`;
		} else if (this.slave.muscles > 10) {
			return `muscular`;
		} else if (this.slave.muscles > -10) {
			return null;
		} else if (this.slave.muscles > -95) {
			return `soft`;
		} else {
			return `frail, weak`;
		}
	}

	/**
	 * @override
	 */
	negative() {
		if (this.slave.muscles < -30) {
			return `muscular`;
		}
	}
};
