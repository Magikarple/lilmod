App.UI.OptionsGroup = (function() {
	class Row {
		/**
		 * @param {HTMLDivElement} container
		 * @param {function():void} refresh
		 */
		render(container, refresh) {} // jshint ignore:line
	}

	/**
	 * @typedef value
	 * @property {*} value
	 * @property {string} [name]
	 * @property {string} mode
	 * @property {number} [compareValue]
	 * @property {string} [descAppend] can be SC markup
	 * @property {boolean} [on]
	 * @property {boolean} [off]
	 * @property {boolean} [neutral]
	 * @property {Function} [callback]
	 */

	class OptionButtonRow extends Row {
		/**
		 * @param {string|HTMLElement} description string can be HTML markup
		 * @param {string} property
		 * @param {object} [object=V]
		 */
		constructor(description, property, object = V) {
			super();
			this.description = description;
			this.property = property;
			this.object = object;
			/**
			 * @type {Array<value>}
			 */
			this.valuePairs = [];
			/**
			 * @type {function(any):void}
			 * @private
			 */
			this._globalCallback = undefined;
		}

		/**
		 * @template {any} T
		 * @param {string} name
		 * @param {T|string} [value=name]
		 * @param {function(T|string):void} [callback]
		 * @returns {OptionButtonRow}
		 */
		addValue(name, value = name, callback = undefined) {
			this.valuePairs.push({
				name: name, value: value, mode: "=", callback: callback
			});
			return this;
		}

		/**
		 * @param {Array<*|Array>} values
		 * @returns {OptionButtonRow}
		 */
		addValueList(values) {
			for (const value of values) {
				if (Array.isArray(value)) {
					this.addValue(value[0], value[1], value[2]);
				} else {
					this.addValue(value);
				}
			}
			return this;
		}

		/**
		 * @param {Map} values
		 * @returns {OptionButtonRow}
		 */
		addValueMap(values) {
			for (const [key, value] of values) {
				this.addValue(key, value);
			}
			return this;
		}

		/**
		 * @param {*} value
		 * @param {number} compareValue
		 * @param {string} mode on of: "<", "<=", ">", ">="
		 * @param {string} [name=value]
		 */
		addRange(value, compareValue, mode, name = value) {
			this.valuePairs.push({
				name: name, value: value, mode: mode, compareValue: compareValue
			});
			return this;
		}

		/**
		 * @param {object} [params]
		 * @param {string} [params.unit]
		 * @param {boolean} [params.large=false]
		 * @param {boolean} [params.forceString=false]
		 * @returns {OptionButtonRow}
		 */
		showTextBox({unit, large = false, forceString = false} = {}) {
			this.textbox = {unit: unit, large: large, forceString: forceString};
			return this;
		}

		/**
		 * @param {string|DocumentFragment|HTMLElement} comment string can be HTML
		 * @returns {OptionButtonRow}
		 */
		addComment(comment) {
			this.comment = comment;
			return this;
		}

		/**
		 * Adds a button that executes the callback when clicked AND reloads the passage
		 *
		 * @param {string} name
		 * @param {function():void} callback
		 * @param {string} passage
		 */
		customButton(name, callback, passage) {
			this.valuePairs.push({
				name: name, value: passage, callback: callback, mode: "custom"
			});
			return this;
		}

		/**
		 * @param {Node} node
		 * @returns {OptionButtonRow}
		 */
		addCustomDOM(node) {
			this.valuePairs.push({
				value: node, mode: "DOM"
			});
			return this;
		}

		/* modify last added option */

		/**
		 * Added to the description if last added value is selected.
		 * example use: addValue(...).customDescription(...).addValue(...).customDescription(...)
		 * @param {string} description can be SC markup
		 */
		customDescription(description) {
			this.valuePairs.last().descAppend = description; // technical impossible according to documentation, but it works and the solution below breaks things
			// let value = this.valuePairs.pop();
			// value.descAppend = description;
			// this.valuePairs.push();
			return this;
		}

		/**
		 * @param {function(any):void} callback gets executed on every button click. Selected value is given as argument.
		 */
		addCallback(callback) {
			let value = this.valuePairs.pop();
			value.callback = callback;
			this.valuePairs.push(value);
			return this;
		}

		/**
		 * Only executed if no specific callback for this option exists.
		 * @param {function(any):void} callback gets executed on every button click. Selected value is given as argument.
		 */
		addGlobalCallback(callback) {
			this._globalCallback = callback;
			return this;
		}

		/**
		 * Mark option as on to style differently.
		 * @returns {OptionButtonRow}
		 */
		on() {
			let value = this.valuePairs.pop();
			value.on = true;
			this.valuePairs.push(value);
			return this;
		}

		/**
		 * Mark option as off to style differently.
		 * @returns {OptionButtonRow}
		 */
		off() {
			let value = this.valuePairs.pop();
			value.off = true;
			this.valuePairs.push(value);
			return this;
		}

		/**
		 * Puts the options in side a pulldown if there are at least 6.
		 * Not counting text boxes or comments.
		 * @returns {OptionButtonRow}
		 */
		pulldown() {
			this.enablePulldown = true;
			return this;
		}

		/**
		 * @param {HTMLDivElement} container
		 * @param {function():void} refresh
		 */
		render(container, refresh) {
			/* left side */
			const desc = document.createElement("div");
			desc.className = "description";
			$(desc).append(this.description);
			container.append(desc);

			/* right side */
			const currentValue = this.object[this.property];
			if (currentValue === undefined) {
				throw new TypeError(`Current value is undefined for option row "${this.description}"`);
			}
			let anySelected = false;

			const buttonGroup = document.createElement("div");
			buttonGroup.classList.add("button-group");
			if (!this.enablePulldown || this.valuePairs.length < 6) {
				for (const value of this.valuePairs) {
					if (value.mode === "DOM") {
						/* insert DOM and go to next element */
						buttonGroup.append(value.value);
						continue;
					}
					const button = document.createElement("button");
					button.append(value.name);
					if (value.on) {
						button.classList.add("on");
					} else if (value.off) {
						button.classList.add("off");
					}
					if (value.mode === "custom") {
						button.onclick = () => {
							value.callback();
							if (value.value) {
								Engine.play(value.value);
							} else {
								refresh();
							}
						};
					} else {
						if (value.mode === "=" && _.isEqual(currentValue, value.value)) {
							button.classList.add("selected", "disabled");
							anySelected = true;
							if (value.descAppend !== undefined) {
								desc.append(" ");
								$(desc).wiki(value.descAppend);
							}
						} else if (!anySelected && inRange(value.mode, value.compareValue, currentValue)) {
							button.classList.add("selected");
							// disable the button if clicking it won't change the variable value
							if (_.isEqual(currentValue, value.value)) {
								button.classList.add("disabled");
							}
							anySelected = true;
							if (value.descAppend !== undefined) {
								desc.append(" ");
								$(desc).wiki(value.descAppend);
							}
						}
						button.onclick = () => {
							this.object[this.property] = value.value;
							if (value.callback) {
								value.callback(value.value);
							} else if (this._globalCallback) {
								this._globalCallback(value.value);
							}
							refresh();
						};
					}
					buttonGroup.append(button);
				}
			} else {
				const options = this.valuePairs.map(value => {
					return {key: value.value, name: value.name};
				});
				buttonGroup.append(App.UI.DOM.makeSelect(options, this.object[this.property], value => {
					if (!isNaN(Number(value))) {
						// @ts-ignore
						value = Number(value);
					}
					this.object[this.property] = value;
					const originalObj = this.valuePairs.find(obj => obj.value === value);
					if (originalObj && typeof originalObj.callback === "function") {
						originalObj.callback(originalObj.value);
					} else if (this._globalCallback) {
						this._globalCallback(originalObj.value);
					}
					refresh();
				}));
			}

			if (this.textbox) {
				const onlyNumber = !this.textbox.forceString && typeof currentValue === "number";
				const textbox = App.UI.DOM.makeTextBox(currentValue, input => {
					this.object[this.property] = input;
					if (this._globalCallback) {
						this._globalCallback(input);
					}
					refresh();
				}, onlyNumber);
				if (onlyNumber) {
					textbox.classList.add("number");
				}
				if (this.textbox.large) {
					textbox.classList.add("full-width");
				}
				buttonGroup.append(textbox);
				if (this.textbox.unit) {
					buttonGroup.append(" ", this.textbox.unit);
				}
			}

			if (this.comment) {
				const comment = document.createElement("span");
				comment.classList.add("comment");
				$(comment).append(this.comment);
				buttonGroup.append(comment);
			}
			container.append(buttonGroup);

			function inRange(mode, compareValue, value) {
				if (mode === "<") {
					return value < compareValue;
				} else if (mode === "<=") {
					return value <= compareValue;
				} else if (mode === ">") {
					return value > compareValue;
				} else if (mode === ">=") {
					return value >= compareValue;
				}
				return false;
			}
		}
	}

	class CustomButtonRow extends Row {
		/**
		 * @typedef CustomButton
		 * @property {string} name
		 * @property {function():void} callback
		 * @property {string} [passage] if undefined reloads current passage
		 */

		/**
		 * @param {string} description may be HTML markup
		 */
		constructor(description) {
			super();
			/**
			 * @private
			 */
			this._description = description;
			/**
			 * @type {string}
			 * @private
			 */
			this._comment = undefined;
			/**
			 * @type {Array<CustomButton>}
			 * @private
			 */
			this._buttons = [];
		}

		/**
		 * @param {string} name
		 * @param {function():void} callback
		 * @param {string} [passage] if undefined reloads current passage
		 * @returns {CustomButtonRow}
		 */
		addButton(name, callback, passage) {
			this._buttons.push({
				name: name,
				callback: callback,
				passage: passage
			});
			return this;
		}

		/**
		 * @param {string} comment may be HTML markup
		 * @returns {CustomButtonRow}
		 */
		addComment(comment) {
			this._comment = comment;
			return this;
		}

		/**
		 * @param {HTMLDivElement} container
		 * @param {function():void} refresh
		 */
		render(container, refresh) {
			/* left side */
			const desc = document.createElement("div");
			desc.className = "description";
			$(desc).append(this._description);
			container.append(desc);

			/* right side */
			const buttonGroup = document.createElement("div");
			buttonGroup.classList.add("button-group");

			for (const button of this._buttons) {
				const buttonElement = document.createElement("button");
				buttonElement.append(button.name);
				buttonElement.onclick = () => {
					button.callback();
					if (button.passage) {
						Engine.play(button.passage);
					} else {
						refresh();
					}
				};
				buttonGroup.append(buttonElement);
			}

			if (this._comment) {
				const comment = document.createElement("span");
				comment.classList.add("comment");
				$(comment).append(this._comment);
				buttonGroup.append(comment);
			}

			container.append(buttonGroup);
		}
	}

	class Comment extends Row {
		/**
		 * @param {string} comment can be SC markup
		 */
		constructor(comment) {
			super();
			this.comment = comment;
			this.long = false;
		}

		/**
		 * @param {HTMLDivElement} container
		 * @param {function():void} refresh
		 */
		render(container, refresh) {
			/* left */
			container.append(document.createElement("div"));

			/* right */
			const comment = document.createElement("div");
			comment.classList.add("comment");
			$(comment).wiki(this.comment);
			container.append(comment);
		}
	}

	class CustomRow extends Row {
		/**
		 * @param {HTMLElement|string|DocumentFragment} element
		 */
		constructor(element) {
			super();
			this.element = element;
		}

		/**
		 * @param {HTMLDivElement} container
		 */
		render(container) {
			/** @type {HTMLDivElement} */
			const div = App.UI.DOM.makeElement("div", this.element, "custom-row");
			container.append(div);
		}
	}

	return class OptionsGroup {
		constructor() {
			/**
			 * @type {Array<Row>}
			 */
			this.rows = [];
			this.doubleColumn = false;
			this.refresh = App.UI.reload;
		}

		/**
		 * @returns {OptionsGroup}
		 */
		enableDoubleColumn() {
			this.doubleColumn = true;
			return this;
		}

		/**
		 * Adds a custom function to be executed when changing an option. By default App.UI.reload() is executed.
		 * Can be overwritten by some options, the behaviour is the same as with the default function.
		 *
		 * @param {function():void} refresh
		 * @returns {OptionsGroup}
		 */
		customRefresh(refresh) {
			this.refresh = refresh;
			return this;
		}

		/**
		 * @template {Row} T
		 * @param {T} row
		 * @returns {T}
		 * @private
		 */
		_addRow(row) {
			this.rows.push(row);
			return row;
		}

		/**
		 * @param {string|HTMLElement} name
		 * @param {string} property
		 * @param {object} [object=V]
		 * @returns {OptionButtonRow}
		 */
		addOption(name, property, object = V) {
			const option = new OptionButtonRow(name, property, object);
			return this._addRow(option);
		}

		/**
		 * @param {string} name
		 * @returns {CustomButtonRow}
		 */
		addCustomOption(name) {
			return this._addRow(new CustomButtonRow(name));
		}

		/**
		 * @param {string} comment may contain SC markup
		 * @returns {Comment}
		 */
		addComment(comment) {
			return this._addRow(new Comment(comment));
		}

		/**
		 * Adds a custom element taking up both rows
		 *
		 * @param {HTMLElement|string|DocumentFragment} element
		 * @returns {CustomRow}
		 */
		addCustom(element) {
			return this._addRow(new CustomRow(element));
		}

		/**
		 * @returns {HTMLDivElement}
		 */
		render() {
			const container = document.createElement("div");
			container.className = "options-group";
			if (this.doubleColumn) {
				container.classList.add("double");
			}

			for (const row of this.rows) {
				row.render(container, this.refresh);
			}

			return container;
		}
	};
})();

/** A wrapper for option handlers that shows a dialog with the results of setting the option.
 * @template T
 * @param {function(T): string|HTMLElement|DocumentFragment} contentGenerator
 * @param {string} [caption]
 * @returns {function(T): void}
 */
App.UI.DialogHandler = function(contentGenerator, caption) {
	return (arg) => {
		const dialogContent = contentGenerator(arg);
		if (dialogContent) {
			if (Dialog.isOpen()) {
				Dialog.close();
			}
			if (caption) {
				Dialog.setup(caption);
			}
			$(Dialog.body()).empty().append(dialogContent);
			Dialog.open();
		}
	};
};
