App.Art.GenAI.EyePromptPart = class EyePromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		if (asSlave(this.slave)?.fuckdoll > 0) {
			return undefined; // eyes are not visible behind fuckdoll mask
		}
		if (hasBothEyes(this.slave)) {
			if (!canSee(this.slave) && V.aiLoraPack) {
				return `<lora:eye-allsclera:1>`;
			} else if (this.slave.eye.left.iris === this.slave.eye.right.iris) {
				return `${this.slave.eye.left.iris} eyes`;
			} else {
				return `heterochromia, ${this.slave.eye.left.iris} left eye, ${this.slave.eye.right.iris} right eye`;
			}
		} else if (hasLeftEye(this.slave)) { // one-eyed prompts don't seem to work well regardless of wording (no/empty/missing/etc)
			return `no right eye, ${this.slave.eye.left.iris} left eye`;
		} else if (hasRightEye(this.slave)) {
			return `no left eye, ${this.slave.eye.right.iris} right eye`;
		} else {
			return `closed eyes`;
		}
	}

	/**
	 * @override
	 */
	negative() {
		return undefined;
	}
};
