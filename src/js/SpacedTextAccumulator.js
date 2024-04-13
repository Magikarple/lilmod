/**
 * @typedef {HTMLElement|DocumentFragment} ContainerT
 */
globalThis.SpacedTextAccumulator = class SpacedTextAccumulator {
	/** @param {ContainerT} [container] */
	constructor(container) {
		/** @type {ContainerT} */
		this._container = container || new DocumentFragment();
		/** @type {(string|HTMLElement|DocumentFragment)[]} */
		this._accumulator = [];
		this._checked = false;

		this._checkScope();
	}

	/** check that the accumulator isn't carrying strings outside of a single render pass, since that's almost certainly a bug */
	_checkScope() {
		if (V.debugMode && !this._checked) {
			this._checked = true;
			setTimeout(() => {
				if (this._accumulator.length > 0) {
					throw new Error(`Text accumulator contains stray fragments: ${toSentence(this._accumulator.map(e => `'${e.toString()}'`))}`);
				}
				this._checked = false; // reset
			}, 0);
		}
	}

	container() {
		this._checkScope();
		return this._container;
	}

	/** add new sentences or sentence fragments to the accumulator; may contain HTML strings or DOM objects
	 * @param {(string|HTMLElement|DocumentFragment)[]} items
	 */
	push(...items) {
		this._checkScope();
		return this._accumulator.push(...items);
	}

	/** write the contents of the accumulator to a container and clear the accumulator
	 * @param {ParentNode} container
	 * @private
	 */
	_accumulatorToContainer(container) {
		this._checkScope();
		$(container).append(...App.Events.spaceSentences(this._accumulator));
		this._accumulator = [];
	}

	/** write the accumulated sentence or sentence fragments directly into the underlying container, separated by spaces */
	toChildren() {
		this._accumulatorToContainer(this._container);
	}

	/** assemble an element from the accumulated sentences or sentence fragments, separated by spaces
	 * @template {keyof HTMLElementTagNameMap} K
	 * @param {K} element
	 * @param {Array<string>} [classNames]
	 */
	toNode(element, classNames) {
		const el = App.UI.DOM.makeElement(element, null, classNames);
		this._accumulatorToContainer(el);
		this._container.append(el);
	}

	/** assemble a paragraph from the accumulated sentences or sentence fragments, separated by spaces */
	toParagraph() {
		return this.toNode("p");
	}

	/** modify the last element in the accumulator to add some text, WITHOUT adding a space between them (i.e. for punctuation)
	 * @param {string} text - strings only!
	 */
	addToLast(text) {
		const lastEl = this._accumulator.pop();
		if (!lastEl) {
			// add to WHAT now? just stick it in there (that's what she said)
			this._accumulator.push(text);
		} else if (typeof lastEl === 'string') {
			// fast case - concatenate two strings
			this._accumulator.push(lastEl + text);
		} else if (lastEl instanceof DocumentFragment) {
			// fast case - if it's already a fragment, just append to it - can't do this for ParentNode in general because of styles, etc
			$(lastEl).append(text);
			this._accumulator.push(lastEl);
		} else {
			// slow case - parse the text and push it into a DocumentFragment with the existing Node
			const frag = new DocumentFragment();
			$(frag).append(lastEl, text);
			this._accumulator.push(frag);
		}
	}
};
