App.Art.GenAI.HeightPromptPart = class HeightPromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		if (this.slave.height < 150) {
			return `short`;
		} else if (this.slave.height > 180) {
			return `tall`;
		}
	}

	/**
	 * @override
	 */
	negative() {
		if (this.slave.height < 150) {
			return `tall`;
		} else if (this.slave.height > 180) {
			return `short`;
		}
	}
};
