/**
 * @callback passageLinkHandler
 * @returns {void}
 */
/**
 * Creates a HTML element with custom SugarCube attributes which works as a passage link
 *
 * The result works in the same way as the wiki markup in the SugarCube
 * @see https://www.motoslave.net/sugarcube/2/docs/#markup-html-attribute
 * @template {keyof PassageLinkMap} K
 * @param {string} linkText link text
 * @param {string} passage the passage name to link to
 * @param {passageLinkHandler} [handler] setter text (optional)
 * @param {string} [tooltip] tooltip text (optional)
 * @param {K} [elementType] element type (optional) default is 'a'.
 * Could be any of 'a', 'audio', img', 'source', 'video'
 * @returns {PassageLinkMap[K]} element text
 *
 * @example
 * // equal to [[Go to town|Town]]
 * App.UI.passageLink("Go to town", "Town")
 */
App.UI.DOM.passageLink = function(linkText, passage, handler, tooltip = '', elementType = 'a') {
	let res = document.createElement(elementType);
	res.setAttribute("data-passage", passage);
	res.onclick = (ev) => {
		ev.preventDefault();
		if (handler) {
			handler();
		}
		Engine.play(passage);
	};

	if (tooltip) {
		res.title = tooltip;
	}
	res.textContent = linkText;
	return res;
};

/**
 * Returns link element for an assignment
 * @param {App.Entity.SlaveState} slave
 * @param {FC.Assignment} assignment
 * @param {string} [passage] passage to go to
 * @param {assignmentCallback} [action] action that changes slave state. The default one is a call to assignJob()
 * @param {string} [linkText]
 * @returns {HTMLAnchorElement}
 */
App.UI.DOM.assignmentLink = function(slave, assignment, passage, action, linkText) {
	let res = document.createElement("a");
	res.textContent = linkText;
	res.onclick = (e) => {
		e.preventDefault();
		if (action) {
			action(slave, assignment);
		} else {
			assignJob(slave, assignment);
		}
		if (passage !== '') {
			SugarCube.Engine.play(passage);
		}
	};
	return res;
};

/**
 * Creates a markup for a SugarCube link which executes given function with given arguments
 *
 * @template {function(...any):void} F
 * @param {string} linkText link text
 * @param {F} handler callable object
 * @param {Parameters<F>} [args] arguments
 * @param {string} [passage] the passage name to link to
 * @param {string|HTMLElement|DocumentFragment} [tooltip]
 * @returns {HTMLAnchorElement} link in SC markup
 */
App.UI.DOM.link = function(linkText, handler, args = [], passage = "", tooltip = "") {
	const hArgs = Array.isArray(args) ? args : [args];
	const link = document.createElement("a");
	link.textContent = linkText;
	link.onclick = () => {
		handler(...hArgs);
		if (passage !== '') {
			SugarCube.Engine.play(passage);
		}
	};

	if (tooltip) {
		link.classList.add("has-tooltip");
		tippy(link, {
			content: tooltip,
		});
	}

	return link;
};

/**
 * Creates a span for an link with tooltip containing the reasons why it is disabled
 * @param {string} link
 * @param {(string|DocumentFragment|HTMLElement)[]} reasons
 * @returns {HTMLSpanElement}
 */
App.UI.DOM.disabledLink = function(link, reasons) {
	/** @type {HTMLElement} */
	let tooltip;
	if (reasons.length === 1) {
		tooltip = document.createElement("span");
		tooltip.append(reasons[0]);
	} else {
		tooltip = document.createElement("ul");
		for (const li of reasons.map(r => {
			const li = document.createElement("li");
			li.append(r);
			return li;
		})) {
			tooltip.appendChild(li);
		}
	}
	return App.UI.DOM.spanWithTooltip(link, tooltip);
};

/**
 * @param {string} text
 * @param {string|HTMLElement} tooltip
 * @param {string[]} [classNames]
 * @returns {HTMLSpanElement}
 */
App.UI.DOM.spanWithTooltip = function(text, tooltip, classNames) {
	/** @type {HTMLSpanElement} */
	const span = App.UI.DOM.makeElement("span", text, ["has-tooltip"]);
	if (classNames) {
		if (Array.isArray(classNames)) {
			span.classList.add(...classNames);
		} else {
			span.classList.add(classNames);
		}
	}
	// Make the span focusable, allows showing the tooltip on mobile
	span.tabIndex = 0;
	tippy(span, {content: tooltip});
	return span;
};

// /**
//  * @template {keyof HTMLElementTagNameMap} K
//  * @param {K} tag - valid HTML tag
//  * @param {string|Node} [content]
//  * @param {string[]} [classNames]
//  * @returns {HTMLElementTagNameMap[K]}
//  */

// This is a workaround to mark one of the overloads as deprecated.
// When done, remove declarations in devTools/types/FC/workaround.d.ts
/** @type {App.UI.DOM.makeElementTS} */
App.UI.DOM.makeElement = function(tag, content, classNames) {
	const element = document.createElement(tag);
	if (classNames) {
		if (Array.isArray(classNames)) {
			element.classList.add(...classNames);
		} else {
			element.classList.add(classNames);
		}
	}
	if (content !== undefined && content !== null) {
		element.append(content);
	}
	return element;
};


// /**
//  * @template {keyof HTMLElementTagNameMap} K
//  * @param {K} tag - valid HTML tag
//  * @param {ParentNode} parent
//  * @param {string|Node} [content]
//  * @param {string[]} [classNames]
//  * @returns {HTMLElementTagNameMap[K]}
//  */

// This is a workaround to mark one of the overloads as deprecated.
// When done, remove declarations in devTools/types/FC/workaround.d.ts
/** @type {App.UI.DOM.appendNewElementTS} */
App.UI.DOM.appendNewElement = function(tag, parent, content, classNames) {
	const element = App.UI.DOM.makeElement(tag, content, classNames);
	parent.append(element);
	return element;
};

/**
 * @param {string} linkText
 * @param {string|Node} newContent
 * @returns {HTMLSpanElement}
 */
App.UI.DOM.linkReplace = function(linkText, newContent) {
	const span = document.createElement("span");
	span.append(App.UI.DOM.link(linkText, () => {
		span.innerHTML = "";
		span.append(newContent);
	}));
	return span;
};

/**
 * Replaces a given element with the given text or node.
 *
 * @param {HTMLElement|DocumentFragment|JQuery.Selector} el The element to be replaced.
 * @param {string|HTMLElement|DocumentFragment|function():HTMLElement} newContent The text or node to replace with. Can be a function returning a node.
 *
 * @example
 *  const div = document.createElement("div");
 *  const text = `Any text, including template literals`;
 *  div.append(App.UI.DOM.link("Link text", () => { // this link will be replaced with the given text
 *      App.UI.DOM.replace(div, text);
 *  }));
 *
 *  function example() {
 *      const div = document.createElement("div");
 * 		let condition = false;
 * 		if (condition) {
 *      	div.append(App.UI.DOM.link("Link text", () => {	// this link will then be replaced with second link
 * 				let text = `Some text`;
 *          	App.UI.DOM.replace(div, example);
 *      	}));
 * 		} else {
 *			div.append(App.UI.DOM.link("Different link text", () => {	// this link will be replaced with first link
	 			let text = `Some other text`;
 *          	App.UI.DOM.replace(div, example);
 *      	}));
 * 		}
 *      return div;
 *  }
 *
 * @see For more examples, see killSlave.js and pit.js
 */
App.UI.DOM.replace = function(el, newContent) {
	$(el).empty().append(newContent);
};

/**
 * @param {string} passage
 * @returns {Element}
 */
App.Utils.passageElement = function(passage) {
	return document.querySelector(`tw-passagedata[name="${passage}"]`);
};

/**
 * @param {(Node|string)[]} content
 * @returns {DocumentFragment}
 */
App.UI.DOM.combineNodes = function(...content) {
	let fragment = document.createDocumentFragment();
	fragment.append(...content);
	return fragment;
};

/**
 * @template {string|number} T
 * @template {WidenLiterals<T>} Value
 * @param {T} defaultValue
 * @param {function(Value):void} onEnter - accepts number if numberOnly = true, otherwise string
 * @param {boolean} [numberOnly]
 * @returns {HTMLInputElement}
 */
App.UI.DOM.makeTextBox = function(defaultValue, onEnter, numberOnly = false) {
	const input = document.createElement("input");
	input.type = "text";
	input.value = defaultValue.toString();

	/** @type {Parameters<typeof input.addEventListener>[1]} */
	let updateValue;
	if (numberOnly) {
		/*
		We could use input.type = "number", but at least in firefox submitting an invalid value will set input.value
		to 0 and trigger a change event we can't distinguish from setting the value to 0 explicitly.
		The workaround is resetting the value to the last known valid value and not triggering onEnter.
		*/
		input.classList.add("number");
		let oldValue = defaultValue;
		updateValue = event => {
			const newValue = Number(event.target.value);
			if (!Number.isNaN(newValue)) {
				onEnter(newValue);
				oldValue = newValue;
			} else {
				// reset the value to the last known valid value
				event.target.value = oldValue;
			}
		};
	} else {
		updateValue = e => {
			onEnter(e.target.value);
		};
	}
	input.addEventListener('change', updateValue);

	return input;
};

/**
 * @param {string|number} defaultValue
 * @param {function(string):void} onEnter
 * @returns {HTMLInputElement}
 */
App.UI.DOM.colorInput = function(defaultValue, onEnter) {
	const input = document.createElement("input");
	input.type = "color";
	input.value = String(defaultValue);

	input.addEventListener("change", e => { onEnter(e.target.value); });

	return input;
};

/**
 * Concats an array of DOM nodes or strings into a human readable list.
 *
 * @param {Iterable<Node|string>} content
 * @param {Node|string} [delimiter]
 * @param {Node|string} [lastDelimiter]
 * @returns {DocumentFragment}
 */
App.UI.DOM.toSentence = function(content, delimiter = ", ", lastDelimiter = " and ") {
	const itr = content[Symbol.iterator]();
	let output = document.createDocumentFragment();
	let result = itr.next();
	if (!result.done) {
		// output first element
		output.append(result.value);
		result = itr.next();
		if (!result.done) {
			// output elements (1...n-1)
			let previous = result.value;
			result = itr.next();
			while (!result.done) {
				output.append(delimiter, previous);
				previous = result.value;
				result = itr.next();
			}
			// output final element
			output.append(lastDelimiter, previous);
		}
	}
	return output;
};

/**
 * @param {string} text
 * @returns {HTMLElement}
 */
App.Utils.htmlToElement = function(text) {
	const template = document.createElement("template");
	text = text.trim(); // Never return a text node of whitespace as the result
	template.innerHTML = text;
	// @ts-ignore
	return template.content.firstChild;
};

/**
 * Show a list of links (or disabled links) as a delimited strip
 * @param {Array<Node|string>} links
 * @returns {HTMLUListElement}
 */
App.UI.DOM.generateLinksStrip = function(links) {
	const strip = document.createElement('ul');
	strip.className = "choices-strip";

	links.reduce((/** @type {HTMLUListElement} */ list, lnk) => {
		const li = document.createElement("li");
		li.append(lnk);
		list.appendChild(li);
		return list;
	}, strip);
	return strip;
};

/**
 * @param {Node|string} head
 * @param {HTMLDivElement} [content]
 * @param {boolean} [collapsed]
 * @returns {DocumentFragment}
 */
App.UI.DOM.accordion = function(head, content, collapsed = true) {
	const fragment = document.createDocumentFragment();
	const button = App.UI.DOM.appendNewElement("button", fragment, head, ["accordion"]);

	if (content) {
		App.UI.DOM.elementToggle(button, [content], collapsed);
		fragment.append(content);
	} else {
		button.classList.add("empty");
	}

	return fragment;
};

/**
 * @param {HTMLElement} toggleElement
 * @param {Array<HTMLElement>} content
 * @param {boolean} [startHidden=true]
 */
App.UI.DOM.elementToggle = function(toggleElement, content, startHidden = true) {
	toggleElement.classList.add("accordion");
	for (let htmlElement of content) {
		htmlElement.classList.add("accordion-content");
	}
	const toggle = () => {
		toggleElement.classList.toggle("closed");
		for (let htmlElement of content) {
			htmlElement.classList.toggle("hidden");
		}
	};
	toggleElement.onclick = toggle;
	if (startHidden) {
		toggle();
	}
};

/*
	<<includeDOM element>>
	Simply inserts a given DOM element.
 */
Macro.add("includeDOM", {
	handler() {
		// Basically the same as <<set>>, we just use whatever Scripting.evalJavaScript(this.args.full) returns instead
		// of discarding it.
		try {
			this.output.append(Scripting.evalJavaScript(this.args.full));
		} catch (ex) {
			// @ts-ignore
			return this.error(`bad evaluation: ${typeof ex === 'object' ? `${ex.name}: ${ex.message}` : ex}`, null,
				ex.stack);
		}
	}
});

/**
 * Formats the given number as currency.
 *
 * Positive values returns in green, negative values return in red, unless the invert parameter is set.
 * @param {number} s The number to format.
 * @param {boolean} [invert] Whether or not to invert the numbers (i.e. display positive numbers in red, and negative numbers in green).
 * @returns {HTMLSpanElement}
 */
App.UI.DOM.cashFormat = function(s, invert) {
	const span = document.createElement("span");
	if ((invert && s > 0) || s < 0) {
		// Display in red (WITHOUT a negative sign) if the value is negative, unless invert is true
		span.classList.add("cash", "dec");
	} else if (s !== 0) {
		// Yellow for positive
		span.classList.add("cash", "inc");
	}
	span.textContent = cashFormat(Math.trunc(s));
	return span;
};

/**
 * Renders an exception to DOM.
 * Tries it's best to not fail itself.
 *
 * @param {any} ex Exception - normally of type Error, but JavaScript literally lets you throw anything
 * @param {boolean} recursion set if formatException() called itself, never set from outside
 * @returns {DocumentFragment|HTMLParagraphElement}
 */
App.UI.DOM.formatException = function formatException(ex, recursion = false) {
	/**
	 * In case the normal rendering failed attempts to provide some information on it.
	 * In the worst case gives back a default error message.
	 *
	 * @param {Error} exception
	 * @returns {DocumentFragment|HTMLParagraphElement}
	 */
	function failSafe(exception) {
		if (!recursion) {
			return formatException(exception, true);
		} else {
			// Not using custom functions here, as they may be the cause of the error
			const p = document.createElement("p");
			p.classList.add("bold", "error");
			p.append("Unrecoverable error in App.UI.DOM.formatException()! Please report this.");
			return p;
		}
	}

	/**
	 * Renders the exception to DOM
	 *
	 * @returns {DocumentFragment}
	 */
	function render() {
		const fragment = document.createDocumentFragment();

		const header = document.createElement("p");
		header.classList.add("error");
		App.UI.DOM.appendNewElement("div", header, `\`\`\``);
		App.UI.DOM.appendNewElement("div", header, `Apologies! An error has occurred. Please report this.`, ["bold"]);
		App.UI.DOM.appendNewElement("div", header, `Please provide a screenshot of the error message, a save file and any other relevant information.`);
		fragment.append(header);

		const eventLabel = () => {
			if (ex instanceof Error && "event" in ex) {
				const eventErr = /** @type {Error & {event: string}} @see App.Events.runPassageEvent */(ex);
				if (typeof eventErr.event === "string") {
					return ` Event: ${eventErr.event};`;
				}
			}
			return ``;
		};

		App.UI.DOM.appendNewElement("p", fragment, `Passage: ${passage()};${eventLabel()} Version: ${Config.saves.version}`, ["bold"]);

		const error = document.createElement("p");
		if (ex instanceof Error) {
			App.UI.DOM.appendNewElement("div", error, `${ex.name}: ${ex.message}`, ["bold"]);
			const body = document.createElement("div");
			if (ex.stack) {
				const lines = ex.stack.split("\n");
				for (const ll of lines) {
					const div = document.createElement("div");
					// remove file path from error message
					div.append(ll.replace(/file:.*\//, "<path>/"));
					body.append(div);
				}
			} else {
				body.append("No stack available.");
			}
			error.append(body);
		} else {
			App.UI.DOM.appendNewElement("div", error, ex.toString(), ["bold"]);
		}

		fragment.append(error, `\`\`\``);

		return fragment;
	}

	try {
		if (!ex) {
			// Create a new Error so we have access to a stacktrace.
			return failSafe(new Error("No exception provided!"));
		}
		return render();
	} catch (ex) {
		return failSafe(ex);
	}
};

/**
 * Adds a row to a table. Each param after the table itself will be appended as a cell.
 * @param {HTMLTableElement|HTMLTableSectionElement} table
 * @param {...string} items
 */
App.UI.DOM.makeRow = function(table, ...items) {
	const row = table.insertRow();
	for (const item of items) {
		const cell = row.insertCell();
		cell.innerHTML = item;
	}
};

/**
 * Creates a checkbox.
 * @param {string} arg - item to be checked. Currently only designed to with items that have values of 0 - 1.
 */
App.UI.DOM.makeCheckbox = function(arg) {
	const checkbox = document.createElement("input");
	checkbox.setAttribute("type", "checkbox");
	checkbox.checked = (V[arg] === 1);

	checkbox.onchange = () => {
		V[arg] = checkbox.checked ? 1 : 0;
	};
	return checkbox;
};

/**
 * Draw a single medium-sized slave image, floating to the right of a block of text.
 * If you're rendering simple scene-wide art where the relationship between text and image location isn't important, @see App.Events.drawEventArt instead.
 * @param {ParentNode} node
 * @param {App.Entity.SlaveState} slave
 * @param {App.Art.SlaveArtBatch} [batchRenderer] an initialized batch renderer with the preamble already output; if omitted, the entire art block will be output inline
 * @returns {HTMLDivElement|DocumentFragment}
 */
App.UI.DOM.drawOneSlaveRight = function(node, slave, batchRenderer) {
	if (!V.seeImages || (V.seeCustomImagesOnly && !slave.custom.image) || !slave) {
		return new DocumentFragment();
	}
	const artElement = batchRenderer ? batchRenderer.render(slave) : App.Art.SlaveArtElement(slave, 2, 0);
	return App.UI.DOM.appendNewElement("div", node, artElement, ["imageRef", "medImg"]);
};
