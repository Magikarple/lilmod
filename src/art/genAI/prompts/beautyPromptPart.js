App.Art.GenAI.BeautyPromptPart = class BeautyPromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		if (asSlave(this.slave)?.fuckdoll > 0) {
			return undefined; // face not visible
		}

		if (this.slave.face < -95) {
			return "ugly, low quality";
		} else if (this.slave.face < -50) {
			return "unattractive, low quality";
		} else if (this.slave.face < 10) { /* empty */ } else if (this.slave.face < 50) {
			return "best quality";
		} else if (this.slave.face < 95) {
			return "masterpiece, best quality";
		} else {
			return "(masterpiece, best quality:1.1)";
		}
	}

	/**
	 * @override
	 */
	negative() {
		if (asSlave(this.slave)?.fuckdoll > 0) {
			return undefined; // face not visible
		}

		return "low quality";
	}
};
