App.Art.GenAI.AmputationPromptPart = class AmputationPromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		if (V.aiLoraPack) {
			if (isAmputee(this.slave)) {
				return `<lora:amputee-000003:1>`;
			}
		}
	}

	/**
	 * @override
	 */
	negative() {
		if (V.aiLoraPack) {
			if (isAmputee(this.slave)) {
				return undefined; // Space for negative prompt if needed NG
			}
		}
		return;
	}
};
