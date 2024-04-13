/** base class for prompt parts */
App.Art.GenAI.PromptPart = class PromptPart {
	/**
	 * @param {FC.HumanState} slave
	 */
	constructor(slave) {
		this.slave = slave;
	}

	/**
	 * Define any relevant keywords for the positive prompt
	 * @returns {string|undefined}
	 * @abstract
	 */
	positive() {
		throw new Error("not implemented");
	}

	/**
	 * Define any relevant keywords for the negative prompt
	 * @returns {string|undefined}
	 * @abstract
	 */
	negative() {
		throw new Error("not implemented");
	}
};

App.Art.GenAI.Prompt = class Prompt {
	/**
	 * @param {App.Art.GenAI.PromptPart[]} parts
	 */
	constructor(parts) {
		this.parts = parts;
	}

	/**
	 * @returns {string}
	 */
	positive() {
		let parts = this.parts.map(part => part.positive());
		parts = parts.filter(part => part);
		return parts.join(", ");
	}

	/**
	 * @returns {string}
	 */
	negative() {
		let parts = this.parts.map(part => part.negative());
		parts = parts.filter(part => part);
		return parts.join(", ");
	}
};
