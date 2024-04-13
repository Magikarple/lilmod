App.Art.GenAI.AgePromptPart = class AgePromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		let ageTags = ``;
		if (this.slave.visualAge < 10) {
			ageTags = `child`;
		} else if (this.slave.visualAge < 13) {
			ageTags = `pre-teen`;
		} else if (this.slave.visualAge < 18) {
			ageTags = `teen, teenager`;
		} else if (this.slave.visualAge < 25) {
			ageTags = `youthful adult, college age`;
		} else if (this.slave.visualAge < 40) {
			ageTags = `adult`;
		} else if (this.slave.visualAge < 60) {
			ageTags = `middle age`;
		} else {
			ageTags = `elderly`;
		}

		return `${ageTags}, ${this.slave.visualAge} year old`;
	}

	/**
	 * @override
	 */
	negative() {
		if (this.slave.visualAge < 20) {
			return `elderly, adult, 30 year old, 40 year old`;
		} else if (this.slave.visualAge < 30) {
			/* empty */
		} else if (this.slave.visualAge < 40) {
			return `child, teen`;
		} else {
			return `child, young, teen, college age`;
		}
	}
};
