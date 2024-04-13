App.Art.GenAI.PosturePromptPart = class PosturePromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		const customPrompt = asSlave(this.slave)?.custom.aiPrompts?.pose;
		if (customPrompt) {
			return customPrompt;
		}

		const parts = [];

		if (isAmputee(this.slave)) {
			parts.push(`sitting in chair`); // posture change prevents genning arms/legs, looks more natural
		} else if (asSlave(this.slave)?.fuckdoll !== 0) {
			if (V.aiLoraPack && !V.aiOpenPose) { // always prefer OpenPose over lora; less side effects
				parts.push(`<lora:Standing straight  - arms at sides - legs together - v1 - locon 32dim:1>`);
			}
			parts.push(`standing straight`);
		} else if (canStand(this.slave)) {
			parts.push(`standing`);
		} else {
			parts.push(`kneeling`);
		}

		if (this.slave.devotion < -50) {
			parts.push(`from side, arms crossed`);
		} else if (this.slave.devotion < -20) {
			parts.push(`arms crossed`);
		} else if (this.slave.devotion < 21) {
			// parts.push(`standing`);
		} else {
			parts.push(`arms behind back, from front`);
		}

		if (asSlave(this.slave)?.fuckdoll !== 0) {
			// trustPart = ``;
		} else if (asSlave(this.slave)?.trust < -50) {
			parts.push(`trembling, head down`);
		} else if (asSlave(this.slave)?.trust < -20) {
			parts.push(`trembling`);
		}

		return parts.join(`, `);
	}

	/**
	 * @override
	 */
	negative() {
		if (asSlave(this.slave)?.custom.aiPrompts?.pose) {
			return undefined;
		}

		if (!isAmputee(this.slave) && !canWalk(this.slave)) {
			return 'from above';
		}

		return undefined;
	}
};
