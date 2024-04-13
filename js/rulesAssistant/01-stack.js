App.RA.Activation.Stack = class Stack {
	constructor() {
		/**
		 * @private
		 * @type {number[]}
		 */
		this._numbers = [];
		/**
		 * @private
		 * @type {string[]}
		 */
		this._strings = [];
	}

	/**
	 * @param {boolean} v
	 */
	pushBoolean(v) {
		this._numbers.push(v ? 1 : 0);
	}

	/**
	 * @returns {FC.Bool}
	 */
	popAsBoolean() {
		return this._numbers.pop() ? 1 : 0;
	}

	/**
	 * @param {number} v
	 */
	pushNumber(v) {
		this._numbers.push(v);
	}

	/**
	 * @returns {number}
	 */
	popNumber() {
		return this._numbers.pop();
	}

	/**
	 * @param {string} v
	 */
	pushString(v) {
		this._strings.push(v);
	}

	/**
	 * @returns {string}
	 */
	popString() {
		return this._strings.pop();
	}
};
