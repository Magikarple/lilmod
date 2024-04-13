App.Art.GenAI.HairPromptPart = class HairPromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		if (this.slave.hStyle === "bald" || this.slave.hStyle === "shaved" || this.slave.hLength === 0) {
			return `bald`;
		}

		const styleObj = App.Medicine.Modification.hairStyles.Normal.find(hs => hs.value === this.slave.hStyle);
		let styleStr = (styleObj?.title || this.slave.hStyle).toLowerCase();
		const stylePostfix = styleStr.startsWith("in") || styleStr === "up";

		const heightVhLength = this.slave.hLength / this.slave.height;
		let hairLength = '';
		if (heightVhLength > 0.9) {
			hairLength = `(very long:1.2)`;
		} else if (heightVhLength > 0.7) {
			hairLength = `(very long:1.1)`;
		} else if (heightVhLength >= 0.4) {
			hairLength = `very long`;
		} else if (heightVhLength >= 0.2) {
			hairLength = `long`;
		} else if (this.slave.hLength >= 15) {
			hairLength = `medium`;
		} else {
			hairLength = `short`;
		}
		if (stylePostfix) {
			return `${hairLength} ${this.slave.hColor} hair ${styleStr}`;
		} else {
			return `${this.slave.hStyle} hair, ${hairLength} ${this.slave.hColor} hair`;
		}
	}

	/**
	 * @override
	 */
	negative() {
		if (this.slave.hStyle === "bald" || this.slave.hStyle === "shaved" || this.slave.hLength === 0) {
			return `hair, long hair, short hair`;
		}
		return;
	}
};
