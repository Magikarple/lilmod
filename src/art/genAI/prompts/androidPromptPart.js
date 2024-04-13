App.Art.GenAI.AndroidPromptPart = class AndroidPromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		if (asSlave(this.slave)?.fuckdoll > 0) {
			return; // limbs covered by fuckdoll suit
		}
		if (V.aiLoraPack) {
			if (hasBothProstheticArms(this.slave) && hasBothProstheticLegs(this.slave)) {
				return `<lora:hololive_roboco-san:1>, android, mechanical arms, mechanical legs`;
			} else if (hasBothProstheticArms(this.slave)) {
				return `<lora:hololive_roboco-san:1>, android, mechanical arms`;
			} else if (hasBothProstheticLegs(this.slave)) {
				return `<lora:hololive_roboco-san:1>, android, mechanical legs`;
			}
		}
	}

	/**
	 * @override
	 */
	negative() {
		if (asSlave(this.slave)?.fuckdoll > 0) {
			return; // limbs covered by fuckdoll suit
		}
		if (V.aiLoraPack) {
			if (hasBothProstheticArms(this.slave) && hasBothProstheticLegs(this.slave)) {
				return; // space for negative prompt if needed NG
			} else if (hasBothProstheticArms(this.slave)) {
				return `mechanical legs`;
			} else if (hasBothProstheticLegs(this.slave)) {
				return `mechanical arms`;
			}
		}
		return;
	}
};
