App.Art.GenAI.CustomPromptPart = class CustomPromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		let positive = "";
		const slave = asSlave(this.slave);
		if (slave.useRulesAssistant === 1 && slave.custom.aiPrompts?.positiveRA) {
			positive += slave.custom.aiPrompts?.positiveRA;
		}

		if (slave.custom.aiPrompts?.positive) {
			if (positive !== "" && positive.charAt(positive.length-1) !== ",") {
				positive += ",";
			}
			positive += slave.custom.aiPrompts?.positive;
		}

		if (positive !== "") {
			return positive;
		} else {
			return undefined;
		}
	}

	/**
	 * @override
	 */
	negative() {
		let negative = "";
		const slave = asSlave(this.slave);
		if (slave.useRulesAssistant === 1 && slave.custom.aiPrompts?.negativeRA) {
			negative += slave.custom.aiPrompts?.negativeRA;
		}

		if (slave.custom.aiPrompts?.negative) {
			if (negative !== "" && negative.charAt(negative.length-1) !== ",") {
				negative += ",";
			}
			negative += slave.custom.aiPrompts?.negative;
		}

		if (negative !== "") {
			return negative;
		} else {
			return undefined;
		}
	}
};
