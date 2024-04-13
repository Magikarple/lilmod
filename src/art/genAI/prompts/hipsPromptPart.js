App.Art.GenAI.HipsPromptPart = class HipsPromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		if (this.slave.hips <= -2) {
			return `(narrow hips:1.1)`;
		} else if (this.slave.hips === -1) {
			return `narrow hips`;
		} else if (this.slave.hips === 0) {
			return null;
		} else if (this.slave.hips === 1) {
			return `hips`;
		} else if (this.slave.hips === 2) {
			return `wide hips`;
		} else {
			return `(wide hips:1.1)`;
		}
	}

	/**
	 * @override
	 */
	negative() {
		if (this.slave.hips <= -2) {
			return `wide hips`;
		} else if (this.slave.hips <= 1) {
			return null;
		} else {
			return `narrow hips`;
		}
	}
};
