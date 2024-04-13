App.Art.GenAI.ArousalPromptPart = class ArousalPromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		let prompt = {terms: [], weight: 1};
		if (asSlave(this.slave)?.fuckdoll > 0) {
			// fuckdolls are kept in a state of permanent arousal, with genitals exposed
			if (this.slave.vagina >= 0) {
				prompt.terms.push("pussy juice");
			}
			if (this.slave.dick > 0 && canAchieveErection(this.slave)) {
				prompt.terms.push("precum, erection");
			}
		} else {
			const genitalsCovered = App.Data.clothes.get(this.slave.clothes).exposure < 3;
			if (!genitalsCovered && this.slave.vagina >= 0 && this.slave.vaginaLube === 2) {
				prompt.terms.push("pussy juice"); // no equivalent for penises
			}
			if (this.slave.energy > 60) {
				prompt.terms.push("blush");
				if (this.slave.dick > 0 && canAchieveErection(this.slave)) {
					prompt.terms.push("erection");
				} else if (this.slave.dick > 0) {
					prompt.terms.push("flaccid");
				}
			}
			if (this.slave.energy > 80) {
				prompt.terms.push("sweat", "heavy breathing");
				if (!genitalsCovered && this.slave.dick > 0) { // // NG add male precum (check gen), remove pussy mention if slave has penis
					prompt.terms.push("precum");
				} else if (!genitalsCovered && this.slave.vagina >= 0 && this.slave.vaginaLube === 1) {
					prompt.terms.push("pussy juice");
				}
			}
			if (this.slave.energy > 95) {
				prompt.weight = 1.1;
			}
		}
		if (prompt.terms) {
			if (prompt.weight !== 1) {
				return `(${prompt.terms.join(", ")}:${prompt.weight})`;
			}
			return `${prompt.terms.join(", ")}`;
		}
		return;
	}

	/**
	 * @override
	 */
	negative() {
		return undefined;
	}
};
