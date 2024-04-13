App.Art.GenAI.BreastsPromptPart = class BreastsPromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		if (this.slave.boobs < 300) {
			return `flat chest`;
		} else if (this.slave.boobs < 400) {
			return `small breasts, flat chest`;
		} else if (this.slave.boobs < 500) {
			return `small breasts`;
		} else if (this.slave.boobs < 650) {
			return `medium breasts`;
		} else if (this.slave.boobs < 800) {
			return `large breasts`;
		} else if (this.slave.boobs < 1000) {
			return `huge breasts`;
		} else if (this.slave.boobs < 1400) {
			return `huge breasts, large breasts`;
		} else { // bigger than H cup: best to use the LoRA if we can
			if (V.aiLoraPack) {
				return `<lora:BEReaction:1>, bereaction, breast expansion, (gigantic breasts:1.2)`;
			} else {
				return `(huge breasts:1.2), large breasts`;
			}
		}
	}

	/**
	 * @override
	 */
	negative() {
		if (this.slave.boobs < 300) {
			return `medium breasts, large breasts, huge breasts`;
		} else if (this.slave.boobs < 650) {
			return;
		} else {
			return `small breasts, flat chest`;
		}
	}
};
