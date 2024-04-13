App.Art.GenAI.HealthPromptPart = class HealthPromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		if (asSlave(this.slave)?.fuckdoll > 0) {
			return undefined;
		}
		if (this.slave.health.condition < -90) {
			return `(very sick, ill:1.1)`;
		} else if (this.slave.health.condition < -50) {
			return `sick, ill`;
		} else if (this.slave.health.condition < -10) {
			return `tired`;
		} else if (this.slave.health.condition < 90) {
			return null;
		} else {
			return `healthy`;
		}
	}

	/**
	 * @override
	 */
	negative() {
		if (asSlave(this.slave)?.fuckdoll > 0) {
			return undefined;
		}
		if (this.slave.health.condition > 50) {
			return `sick, ill`;
		}
		return;
	}
};
