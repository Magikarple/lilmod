App.Art.GenAI.WeightPromptPart = class WeightPromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		if (this.slave.weight < -95) {
			return `emaciated, very thin, skinny`;
		} else if (this.slave.weight < -30) {
			return `very thin, skinny`;
		} else if (this.slave.weight < -10) {
			return `slim`;
		} else if (this.slave.weight < 10) {
			return null;
		} else if (this.slave.weight < 30) {
			return `curvy`;
		} else if (this.slave.weight < 95) {
			return `plump, chubby`;
		} else {
			return `fat, obese, plump`;
		}
	}

	/**
	 * @override
	 */
	negative() {
		if (this.slave.weight < -30) {
			return `plump, chubby`;
		} else if (this.slave.weight < 50) {
			return null;
		} else {
			return `thin, skinny`;
		}
	}
};
