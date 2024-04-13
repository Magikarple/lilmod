/**
 * If you want to include a SugarCube passage in a JS function use this. The result must be printed using the <<print>>
 * macro.
 * @param {string} passageTitle
 * @returns {string}
 */
globalThis.jsInclude = function(passageTitle) {
	if (Story.has(passageTitle)) {
		return Story.get(passageTitle).processText();
	} else {
		return `<span class="red">Error: Passage ${passageTitle} does not exist.</span>`;
	}
};

/**
 * Creates a HTML element with custom SugarCube attributes which works as a passage link
 *
 * The result works in the same way as the wiki markup in the SugarCube
 * @see https://www.motoslave.net/sugarcube/2/docs/#markup-html-attribute
 * @param {string} linkText link text
 * @param {string} passage the passage name to link to
 * @param {string} [setter=''] setter text (optional)
 * @param {string} [tooltip=''] tooltip text (optional)
 * @param {string} [elementType='a'] element type (optional) default is 'a'.
 * Could be any of 'a', 'audio', img', 'source', 'video'
 * @returns {string} element text
 *
 * @example
 * // equal to [[Go to town|Town]]
 * App.UI.passageLink("Go to town", "Town")
 */
App.UI.passageLink = function(linkText, passage, setter = '', tooltip = '', elementType = 'a') {
	let res = `<${elementType} data-passage="${passage}"`;
	if (setter) {
		res += ` data-setter="${App.Utils.escapeHtml(setter)}"`;
	}
	if (tooltip) {
		res += ` title="${tooltip}"`;
	}
	res += `>${linkText}</${elementType}>`;
	return res;
};

App.UI.link = function() {
	let counter = 0;

	// reset all handlers for each passage
	$(document).on(':passageinit', function() {
		State.temporary.linkHandlers = {};
		counter = 0;
	});

	return makeLink;

	/**
	 * Creates a markup for a SugarCube link which executes given function with given arguments
	 * @template {function(...any):void} F
	 * @param {string} linkText link text
	 * @param {F} handler callable object
	 * @param {Parameters<F>} [args] arguments
	 * @param {string} [passage] the passage name to link to
	 * @param {string} [tooltip]
	 * @returns {string} link in SC markup
	 */
	function makeLink(linkText, handler, args = [], passage = '', tooltip = '') {
		// pack handler and data
		State.temporary.linkHandlers[counter] = {
			f: handler,
			args: Array.isArray(args) ? args : [args]
		};

		// can't say _linkHandlers here because SC does not recognize its own notation in "..._varName"
		let SCHandlerText =
			`State.temporary.linkHandlers[${counter}].f(...State.temporary.linkHandlers[${counter}].args);`;
		++counter;

		if (passage) {
			return App.UI.passageLink(linkText, passage, SCHandlerText, tooltip);
		} else {
			if (tooltip) {
				throw Error("Tooltips are not supported by the <<link>> markup.");
			}
			// data-passage scheme does not work with empty passage name
			return `<<link "${linkText}">><<run ${SCHandlerText}>><</link>>`;
		}
	}
}();

/**
 * Replaces contents of the element, identified by the given selector, with wiki'ed new content
 *
 * The function is an analogue to the SugarCube <<replace>> macro (and is a simplified version of it)
 * @param {string} selector
 * @param {string} newContent
 */
App.UI.replace = function(selector, newContent) {
	let ins = jQuery(document.createDocumentFragment());
	ins.wiki(newContent);
	const target = $(selector);
	target.empty();
	target.append(ins);
};

/**
 * @typedef {object} App.UI.DOM.slaveDescriptionDialogOptions
 * @property {boolean} [noButtons] if true then we won't add the favorite toggle or the reminder button
 * @property {string[]} [linkClasses] a list of classes to add to the link element
 */

/**
 * Generates a link which shows a slave description dialog for a specified slave.
 * Do not call from within another dialog.
 * @param {App.Entity.SlaveState} slave
 * @param {string} [text] link text to use instead of slave name
 * @param {FC.Desc.LongSlaveOptions} [longSlaveOptions]
 * @param {App.UI.DOM.slaveDescriptionDialogOptions} [options]
 * @returns {HTMLElement} link
 */
App.UI.DOM.slaveDescriptionDialog = function(
	slave, text,
	longSlaveOptions = {descType: DescType.EVENT, noArt: true},
	options = {
		noButtons: false,
		linkClasses: [],
	}
) {
	const span = App.UI.DOM.makeElement("span");
	if ((!text || text === SlaveFullName(slave)) && !options.noButtons && V.addButtonsToSlaveLinks) {
		// text = [favorite button] [reminder button] [slave name]
		span.append(
			App.UI.favoriteToggle(slave),
			App.Reminders.slaveLink(slave.ID),
		);
	}
	const link = App.UI.DOM.link(text ? text: SlaveFullName(slave), () => {
		Dialog.setup(SlaveFullName(slave));
		App.UI.DOM.drawOneSlaveRight(Dialog.body(), slave);
		Dialog.append(App.Desc.longSlave(slave, longSlaveOptions));
		Dialog.open();
	});
	if (options.linkClasses && Array.isArray(options.linkClasses)) {
		link.classList.add(...options.linkClasses);
	}
	span.append(link);
	return span;
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} text
 * @returns {HTMLSpanElement}
 */
App.UI.DOM.referenceSlaveWithPreview = function(slave, text) {
	const res = App.UI.DOM.makeElement("span", text, "has-tooltip");
	tippy(res, {
		content: App.UI.DOM.generateLinksStrip([
			App.UI.DOM.slaveDescriptionDialog(slave, "Pop-up", {noArt: true}),
			App.UI.SlaveList.SlaveInteract.stdInteract(slave, "Go to")
		]),
		interactive: true,
		appendTo: document.getElementById("story")
	});
	return res;
};

/**
 * Reloads the passage and stays at the same height.
 */
App.UI.reload = function() {
	const position = window.pageYOffset;
	Engine.play(passage());
	window.scrollTo(0, position);
};

/**
 * Renders passage into a document fragment
 * NOTE: This is a greatly simplified version of the SC Passage.render() private function
 * This function does not trigger :passagestart and :passagedisplay events
 * @param {string} passageTitle
 * @returns {DocumentFragment} document fragment with passage contents
 */
App.UI.DOM.renderPassage = function(passageTitle) {
	const res = document.createDocumentFragment();
	if (ProfileInclude.IsEnabled) {
		ProfileInclude.IncludeBegins(passageTitle);
	}
	$(res).wiki(jsInclude(passageTitle));
	if (ProfileInclude.IsEnabled) {
		ProfileInclude.IncludeEnds();
	}
	return res;
};

/**
 * Render passage and append the rendered content to the container
 * @param {Node} container
 * @param {string} passageTitle
 */
App.UI.DOM.includePassage = function(container, passageTitle) {
	return $(container).append(this.renderPassage(passageTitle));
};

/**
 * The passage switch handler is executed upon leaving BEFORE cloning the state. This means any change will be kept even
 * if the game is saved and reloaded or the page refreshed.
 *
 * @type {Readonly<{
 *          set: function(function():void):void,
 *          get: (function(): function(): void),
 *          clear: function():void,
 *          execute: function():void}>}
 */
App.Utils.PassageSwitchHandler = (function() {
	/** @type {function():void} */
	let handler = null;

	/**
	 * @param {function():void} newHandler
	 */
	function setHandler(newHandler) {
		handler = newHandler;
	}

	/**
	 * @returns {function(): void}
	 */
	function getHandler() {
		return handler;
	}

	function clearHandler() {
		handler = null;
	}

	function executeHandler() {
		if (handler) {
			handler();
		}
		clearHandler();
	}

	return Object.freeze({
		set: setHandler,
		get: getHandler,
		clear: clearHandler,
		execute: executeHandler,
	});
}());
