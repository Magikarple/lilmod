App.Art.GenAI.PubicHairPromptPart = class PubicHairPromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		if (this.slave.pubicHStyle === "waxed" || this.slave.pubicHStyle === "bald" || this.slave.pubicHStyle === "hairless" || this.slave.physicalAge < Math.min(this.slave.pubertyAgeXX, this.slave.pubertyAgeXY)) {
			return;
		}
		if (App.Data.clothes.get(this.slave.clothes).exposure < 3 || asSlave(this.slave)?.fuckdoll > 0) {
			return; // pubic region should be covered by clothes
		}
		const style = (this.slave.pubicHStyle === "bushy in the front and neat in the rear" ? "bushy" : this.slave.pubicHStyle); // less complicated prompt works better for the long style
		return `${this.slave.pubicHColor} ${style} pubic hair`;
	}

	/**
	 * @override
	 */
	negative() {
		if (this.slave.pubicHStyle === "waxed" || this.slave.pubicHStyle === "bald" || this.slave.pubicHStyle === "hairless" || this.slave.physicalAge < Math.min(this.slave.pubertyAgeXX, this.slave.pubertyAgeXY)) {
			return "pubic hair";
		}
		return;
	}
};
