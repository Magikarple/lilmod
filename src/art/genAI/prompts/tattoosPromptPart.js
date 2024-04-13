App.Art.GenAI.TattoosPromptPart = class TattoosPromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		if (asSlave(this.slave)?.fuckdoll > 0 || this.slave.race === "catgirl") {
			return undefined; // fuckdoll suit covers all possible tattoo locations, catgirl covered with fur
		}
		// TODO: clothes can cover limbs/belly/boobs.
		let tattooParts = [];
		if (this.slave.armsTat) {
			tattooParts.push(`${this.slave.armsTat} arm tattoo`);
		}
		if (this.slave.legsTat) {
			tattooParts.push(`${this.slave.legsTat} leg tattoo`);
		}
		if (this.slave.bellyTat) {
			tattooParts.push(`${this.slave.bellyTat} belly tattoo`);
		}
		if (this.slave.boobsTat) { // TODO: needs exposure check
			tattooParts.push(`${this.slave.boobsTat} breast tattoo`);
		}

		if (tattooParts.length > 0) {
			return tattooParts.join(', ');
		}
	}

	/**
	 * @override
	 */
	negative() {
		if (!this.slave.armsTat && !this.slave.legsTat && !this.slave.bellyTat && !this.slave.boobsTat) {
			return `tattoo`;
		}
	}
};
