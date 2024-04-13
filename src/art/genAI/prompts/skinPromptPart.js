App.Art.GenAI.SkinPromptPart = class SkinPromptPart extends App.Art.GenAI.PromptPart {
	/**
	 * @override
	 */
	positive() {
		if (this.slave.geneticQuirks.albinism === 2) {
			return "albino";
		}

		if (this.slave.race === "catgirl") {
			return `covered in ${this.slave.skin} fur`;
		}

		switch (this.slave.skin) {
			case "pure white":
			case "ivory":
			case "white":
				return "white skin";
			case "extremely pale":
			case "very pale":
			case "pale":
				return "pale skin";
			case "extremely fair":
			case "very fair":
			case "fair":
			case "light":
			case "light olive":
				return "fair skin";
			case "sun tanned":
			case "spray tanned":
			case "tan":
			case "olive":
			case "bronze":
			case "dark olive":
			case "dark":
			case "light beige":
			case "beige":
			case "dark beige":
			case "light brown":
			case "brown":
				return "tan skin";
			case "dark brown":
			case "black":
			case "ebony":
				return "dark skin";
			case "pure black":
				return "black skin";
			default:
				return `${this.slave.skin} skin`;
		}
	}

	/**
	 * @override
	 */
	negative() {
		switch (this.slave.skin) {
			case "pure white":
			case "ivory":
			case "white":
			case "extremely pale":
			case "very pale":
			case "pale":
			case "extremely fair":
			case "very fair":
			case "fair":
			case "light":
			case "light olive":
				return "dark skin";
			case "sun tanned":
			case "spray tanned":
			case "tan":
			case "olive":
				return "black skin";
			case "bronze":
			case "dark olive":
			case "dark":
			case "light beige":
			case "beige":
			case "dark beige":
			case "light brown":
			case "brown":
			case "dark brown":
			case "black":
			case "ebony":
			case "pure black":
				return "light skin";
		}
	}
};

