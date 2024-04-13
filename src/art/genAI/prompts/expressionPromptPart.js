App.Art.GenAI.ExpressionPromptPart = class ExpressionPromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		const customPrompt = asSlave(this.slave)?.custom.aiPrompts?.expressionPositive;
		if (customPrompt) {
			return customPrompt;
		}

		if (V.aiLoraPack && asSlave(this.slave)?.fuckdoll !== 0) {
			if (asSlave(this.slave)?.fuckdoll < 50) {
				return `open mouth, clenched fists`; // NG proxy for terrified for early adaptation
			} else {
				return undefined;
			}
		} else if (V.aiLoraPack && this.slave.fetish === Fetish.MINDBROKEN) {
			 return `<lora:Empty Eyes - Drooling v5 - 32dim:1> empty eyes, drooling`;
		} else {
			let devotionPart;
			if (this.slave.devotion < -50) {
				devotionPart = `angry expression, hateful`;
			} else if (this.slave.devotion < -20) {
				devotionPart = `angry`;
			} else if (this.slave.devotion < 51) {
				devotionPart = null;
			} else if (this.slave.devotion < 95) {
				devotionPart = `smile`;
			} else {
				devotionPart = `smile, grin, loving expression`;
			}

			let trustPart;
			const slaveWithTrust = asSlave(this.slave);
			if (slaveWithTrust) {
				if (slaveWithTrust.trust < -90) {
					trustPart = `(scared expression:1.2), looking down, crying, tears`;
				}
				if (slaveWithTrust.trust < -50) {
					trustPart = `(scared expression:1.1), looking down, crying`;
				} else if (slaveWithTrust.trust < -20) {
					trustPart = `scared expression, looking down`;
				} else if (slaveWithTrust.trust < 51) {
					trustPart = `looking at viewer`;
					if (!devotionPart) {
						trustPart += `, neutral expression`;
					}
				} else if (slaveWithTrust.trust < 95) {
					trustPart = `looking at viewer, confident`;
				} else {
					trustPart = `looking at viewer, confident, smirk`;
				}
			}

			if (devotionPart && trustPart) {
				return `(${devotionPart}, ${trustPart})`;
			} else if (devotionPart) {
				return `(${devotionPart})`;
			} else if (trustPart) {
				return `(${trustPart})`;
			}
		}
	}

	/**
	 * @override
	 */
	negative() {
		const customPrompt = asSlave(this.slave)?.custom.aiPrompts?.expressionNegative;
		if (customPrompt) {
			return customPrompt;
		}

		if (V.aiLoraPack && asSlave(this.slave)?.fuckdoll !== 0) {
			 return `smile, angry, confident`;
		} else if (V.aiLoraPack && this.slave.fetish === Fetish.MINDBROKEN) {
			 return `smile, angry, looking at viewer, confident`;
		} else {
			let devotionPart;
			if (this.slave.devotion < -50) {
				devotionPart = `smile, loving expression`;
			} else if (this.slave.devotion < -20) {
				devotionPart = `smile`;
			} else if (this.slave.devotion < 51) {
				devotionPart = null;
			} else {
				devotionPart = `angry`;
			}

			let trustPart;
			const slaveWithTrust = asSlave(this.slave);
			if (slaveWithTrust) {
				if (slaveWithTrust.trust < -50) {
					trustPart = `looking at viewer, confident`;
				} else if (slaveWithTrust.trust < -20) {
					trustPart = null;
				} else {
					trustPart = `looking away`;
				}
			}

			if (devotionPart && trustPart) {
				return `${devotionPart}, ${trustPart}`;
			} else if (devotionPart) {
				return devotionPart;
			} else if (trustPart) {
				return trustPart;
			}
		}
	}
};
