// cSpell:ignore pregslut

/** @typedef {App.Entity.SlaveState|"assistant"} EventArtObject */

App.Events.drawEventArt = (function() {
	const validSingleOutfits = Array.from(App.Data.clothes.keys());

	/** draw event art, with the option to dress the slave in a particular way
	 * @param {Node} node - DOM node to attach art to
	 * @param {EventArtObject|EventArtObject[]} slaves - one or several objects (slave object or "assistant") to draw art for
	 * @param {FC.Clothes|FC.Clothes[]} [clothesMode] - if the slaves' clothing should be overridden, what should they be wearing?
	 * @param {object|object[]} [extraClothes] - if other parts of the slaves' clothing should be overridden, what should they be wearing? For slave.vaginalAccessory, use [{"vaginalAccessory": "dildo"}]
	 * @param {boolean} [forceMedium=false] - if true then we will use the medium image size regardless of slave count
	 */
	function draw(node, slaves, clothesMode, extraClothes, forceMedium = false) {
		// do nothing if the player doesn't want images
		if (!V.seeImages) {
			return;
		}

		// ensure that slaves is an array
		if (!Array.isArray(slaves)) {
			slaves = [slaves];
		}

		// if we were asked to change the slave's clothing, do it now
		let originalClothes = [];
		if (clothesMode || extraClothes) {
			// if clothesMode is just a single string (or null/undefined), apply the same clothes to all the slaves
			if (!Array.isArray(clothesMode)) {
				clothesMode = new Array(slaves.length).fill(clothesMode);
			}
			extraClothes = extraClothes || {}; // must be defined
			if (!Array.isArray(extraClothes)) {
				extraClothes = new Array(slaves.length).fill(extraClothes);
			}

			// if the arrays are not the right length now, throw. it's all or nothing.
			if (clothesMode.length !== slaves.length || extraClothes.length !== slaves.length) {
				throw Error("Incorrect number of outfits specified for slaves in event art");
			}

			// clothes have been specified - copy the slaves and change their clothing (a bit slow, but means we don't need housekeeping to change them back)
			slaves.forEach((s, i) => {
				if (s !== "assistant") { // assistant can't change clothes
					// if there are "themes" of clothes that multiple events want to use ("swimwear", "athletic", "casual", etc), they can be added as special cases here instead of duplicating the logic in every event
					if (validSingleOutfits.includes(clothesMode[i])) {
						extraClothes[i].clothes = clothesMode[i];
					} else if (!clothesMode[i]) {
						// no change of outfit, leave them dressed as they were
					} else {
						// unrecognized outfit - leave them dressed as they were, but error
						console.error(`Unrecognized clothes mode for event art: ${clothesMode[i]}`);
					}
					originalClothes[i] = equipClothing(s, extraClothes[i]);
				}
			});
		}

		const artSpan = document.createElement("span");
		artSpan.id = "art-frame";

		if (forceMedium === false && slaves.length === 1) {
			const slave = slaves[0];
			const custom = typeof slave !== "string" && slave.custom.image && slave.custom.image.filename !== "";
			if (!V.seeCustomImagesOnly ||
			(slaves[0] === "assistant" && V.assistant.customImage) ||
			(custom)) {
				let refDiv = document.createElement("div");
				refDiv.classList.add("imageRef", V.imageChoice === 1 ? "lrgVector" : "lrgRender");

				if (custom) {
					refDiv.classList.add("custom");
				}
				if (slaves[0] === "assistant") {
					refDiv.appendChild(App.Art.assistantArt(3));
				} else {
					refDiv.appendChild(App.Art.SlaveArtElement(slaves[0], 3, 0));
				}
				artSpan.appendChild(refDiv);
			}
		} else {
			const colDiv = document.createElement("div");

			colDiv.classList.add("imageColumn");

			for (const slave of slaves) {
				if (!V.seeCustomImagesOnly ||
					(slave === "assistant" && V.assistant.customImage) ||
					(typeof slave !== "string" && slave.custom.image && slave.custom.image.filename !== "")) {
					let refDiv = document.createElement("div");
					refDiv.classList.add("imageRef", "medImg");
					if (slave === "assistant") {
						refDiv.appendChild(App.Art.assistantArt(2));
					} else {
						refDiv.appendChild(App.Art.SlaveArtElement(slave, 2, 0));
					}
					colDiv.appendChild(refDiv);
				}
			}
			artSpan.appendChild(colDiv);
		}
		node.appendChild(artSpan);

		// change clothing back, if necessary
		if (originalClothes.length > 0) {
			slaves.forEach((s, i) => {
				if (s !== "assistant") { // assistant can't change clothes
					Object.assign(s, originalClothes[i]);
				}
			});
		}

		return artSpan;
	}

	return draw;

	/**
	 * @param {App.Entity.SlaveState} s - one or several slaves to draw art for
	 * @param {object} newClothes
	 */
	function equipClothing(s, newClothes) {
		let oldClothes = {};
		if (typeof newClothes === "object") {
			for (const extra in newClothes) {
				oldClothes[extra] = s[extra];
				s[extra] = newClothes[extra];
			}
		} else {
			throw Error("Extra clothes must be in the form of an object.");
		}
		return oldClothes;
	}
})();

/** Refresh previously drawn event art with new slaves or clothing
 * @param {EventArtObject|EventArtObject[]} slaves - one or several objects (slave object or "assistant") to draw art for
 * @param {FC.Clothes|FC.Clothes[]} [clothesMode] - if the slaves' clothing should be overridden, what should they be wearing?
 * @param {object|object[]} [extraClothes] - if other parts of the slaves' clothing should be overridden, what should they be wearing? For slave.vaginalAccessory, use [{"vaginalAccessory": "dildo"}]
 */
App.Events.refreshEventArt = function(slaves, clothesMode, extraClothes) {
	// do nothing if the player doesn't want images
	if (!V.seeImages) {
		return;
	}

	// draw new event art, and replace the old with the new
	const node = new DocumentFragment();
	App.Events.drawEventArt(node, slaves, clothesMode, extraClothes);
	$("#art-frame").replaceWith(node);
};

/** intelligently adds spaces to an array of mixed strings and DOM nodes, merging consecutive strings in the process
 * @param {Array<string|HTMLElement|DocumentFragment>} sentences
 * @returns {Array<string|HTMLElement|DocumentFragment>}
 */
App.Events.spaceSentences = function(sentences) {
	if (sentences.length <= 1) {
		return sentences;
	}
	return sentences.reduce((res, cur) => {
		if (res.length === 0) {
			res.push(cur);
		} else if (typeof (res[res.length - 1]) === "string") {
			if (typeof (cur) === "string") {
				res[res.length - 1] += " " + cur;
			} else {
				res[res.length - 1] += " ";
				res.push(cur);
			}
		} else {
			if (typeof (cur) === "string") {
				res.push(" " + cur);
			} else {
				res.push(" ");
				res.push(cur);
			}
		}
		return res;
	}, []);
};

/** assemble a DOM node from an array of DOM nodes, sentences or sentence fragments (which may contain HTML)
 * @param {Array<string|HTMLElement|DocumentFragment>} sentences
 * @returns {DocumentFragment}
 */
App.Events.makeNode = function(sentences) {
	let node = new DocumentFragment();
	$(node).append(...App.Events.spaceSentences(sentences));
	return node;
};

/** assemble a DOM paragraph from an array of DOM nodes, sentences or sentence fragments (which may contain HTML) and append it to the first argument
 * @param {Node} node
 * @param {Array<string|HTMLElement|DocumentFragment>} sentences
 */
App.Events.addParagraph = function(node, sentences) {
	let para = document.createElement("p");
	$(para).append(...App.Events.spaceSentences(sentences));
	node.appendChild(para);
};

/** assemble an element from an array of DOM nodes, sentences or sentence fragments (which may contain HTML)
 * @template {keyof HTMLElementTagNameMap} K
 * @param {Node} node
 * @param {Array<string|HTMLElement|DocumentFragment>} sentences
 * @param {K} [element]
 * @param {string|Array<string>} [classNames]
 */
App.Events.addNode = function(node, sentences, element, classNames) {
	const el = (element) ? App.UI.DOM.makeElement(element, null, classNames) : new DocumentFragment();
	$(el).append(...App.Events.spaceSentences(sentences));
	node.appendChild(el);
};

/** result handler callback - process the result and return an array of mixed strings and DOM nodes, or a single string or DOM node
 * @callback resultHandler
 * @returns {Array<string|HTMLElement|DocumentFragment>|string|HTMLElement|DocumentFragment|Void}
 */
/** a response to an event, and its result */
App.Events.Result = class {
	/**
	 * @param {string} [text] - the link text for the response
	 * @param {resultHandler} [handler] - the function to call to generate the result when the link is clicked
	 * @param {string|HTMLElement|DocumentFragment} [note] - a note to provide alongside the link (for example, a cost or virginity loss warning)
	 * To mark an option as disabled, construct the result with only the note. String may NOT contain HTML, but a WARNING# tag may be included in the note string to add a warning text ("This is the information note. WARNING# This is a warning text.").
	 */
	constructor(text, handler, note) {
		this.text = text;
		this.handler = handler;
		this.note = note;
	}

	/** call the result handler, replacing the contents of the node
	 * @param {HTMLElement} node
	 */
	handle(node) {
		let dest = $(node).empty();
		let contents = this.handler();
		if (Array.isArray(contents)) {
			dest.append(...App.Events.spaceSentences(contents));
		} else {
			dest.append(contents);
		}
	}

	/** build the response DOM (for use by addResponses)
	 * @param {HTMLElement} node
	 * @returns {boolean} - true if something was written, false if not
	 */
	makeResponse(node) {
		let wrote = false;
		if (this.text && this.handler) {
			node.appendChild(App.UI.DOM.link(this.text, () => this.handle(node)));
			wrote = true;
		}
		if (wrote && this.note) {
			node.append(" ");
		}
		if (this.note) {
			if (typeof this.note === "string" && this.note.includes("WARNING#")) {
				let warning = "";
				let subnote = "";
				warning = this.note.substring(this.note.indexOf("WARNING#") + 8);
				subnote = this.note.substring(0, this.note.indexOf("WARNING#"));
				if (subnote.length) {
					node.appendChild(App.UI.DOM.makeElement("span", subnote, ["detail"]));
				}
				if (warning.length) {
					node.appendChild(App.UI.DOM.makeElement("span", warning, ["detail", "warning"]));
				}
			} else {
				node.appendChild(App.UI.DOM.makeElement("span", this.note, ["detail"]));
			}
			wrote = true;
		}
		return wrote;
	}
};

/** add a list of results for an event
 * @param {Node} node
 * @param {Array<App.Events.Result>} results
 */
App.Events.addResponses = function(node, results) {
	let resultSpan = document.createElement("span");
	for (const result of results) {
		if (result.makeResponse(resultSpan)) {
			resultSpan.appendChild(document.createElement("br"));
		}
	}
	node.appendChild(resultSpan);
};

/**
 * @param {App.Entity.SlaveState} slave
 * @param {string} fetish
 * @returns {Node}
 */
App.Events.eventFetish = function(slave, fetish) {
	const el = new DocumentFragment();
	const {his, him, he} = getPronouns(slave);
	let text = "";
	if (slave.fetish === fetish) {
		el.append(`This experience `);
		if (slave.fetishKnown === 1) {
			if (slave.fetishStrength <= 95) {
				switch (slave.fetish) {
					case "submissive":
						text = `deepens ${his} sexual need to submit.`;
						break;
					case "cumslut":
						text = `increases ${his} appetite for oral sex.`;
						break;
					case "humiliation":
						text = `makes ${him} even more eager to be humiliated.`;
						break;
					case "buttslut":
						text = `encourages ${him} to focus on anal sex.`;
						break;
					case "boobs":
						text = `focuses ${his} sexuality on ${his} breasts and nipples.`;
						break;
					case "sadist":
						text = `titillates the sadistic part of ${him}.`;
						break;
					case "masochist":
						text = `helps conflate pain and sexual pleasure for ${him}.`;
						break;
					case "dom":
						text = `strengthens ${his} desire to top other slaves.`;
						break;
					case "pregnancy":
						text = `further confuses lust and pregnancy in ${his} mind.`;
						break;
					default:
						throw Error(`ERROR: bad fetish "${slave.fetish}"`);
				}
				App.UI.DOM.appendNewElement("span", el, text, "lightsalmon");
				slave.fetishStrength += 10;
			} else {
				el.append(`is `);
				App.UI.DOM.appendNewElement("span", el, `especially enjoyable for ${him},`, "hotpink");
				el.append(` since `);
				switch (slave.fetish) {
					case "submissive":
						el.append(`${he}'s an utterly submissive little slut.`);
						break;
					case "cumslut":
						el.append(`${his} `);
						if (slave.vagina > -1) {
							el.append(`clit`);
						} else {
							el.append(`frenulum`);
						}
						el.append(` might as well be located in ${his} throat.`);
						break;
					case "humiliation":
						el.append(`${he} has a hopeless need to be humiliated and degraded.`);
						break;
					case "buttslut":
						el.append(`${he}'s completely in love with having ${his} ass fucked.`);
						break;
					case "boobs":
						el.append(`${he} loves breast play more than any other kind of sex.`);
						break;
					case "sadist":
						el.append(`nothing is as titillating to ${him} as another slave's pain can be.`);
						break;
					case "masochist":
						el.append(`${he} loves pain more than ${he} likes pleasure.`);
						break;
					case "dom":
						el.append(`${he} lives for the times ${he}'s allowed to fuck someone.`);
						break;
					case "pregnancy":
						el.append(`all ${his} deepest sexual desires involve `);
						if (slave.vagina > -1 || slave.mpreg === 1) {
							el.append(`pregnancy.`);
						} else {
							el.append(`impregnation.`);
						}
						break;
					default:
						throw Error(`ERROR: bad fetish "${slave.fetish}"`);
				}
				slave.devotion += 3;
			}
		} else {
			el.append(`was surprisingly appealing for ${him}, revealing that ${he}'s a `);
			switch (slave.fetish) {
				case "submissive":
					text = `sexual submissive!`;
					break;
				case "humiliation":
					text = `humiliation slut!`;
					break;
				case "boobs":
					text = `slut for breast play!`;
					break;
				case "pregnancy":
					text = `pregslut!`;
					break;
				default:
					text = `slave!`;
			}
			App.UI.DOM.appendNewElement("span", el, text, "lightsalmon");
			slave.fetishKnown = 1;
		}
	}
	return el;
};

App.Events.effectiveWeek = function() {
	return V.week - V.nationHate;
};

/** Returns whether a particular event can execute right now or not. Performs actor casting.
 * @param {App.Events.BaseEvent} event - event to test
 * @param {App.Entity.SlaveState} [eventSlave] - slave which must be used as the first actor. omit if no first slave requirement.
 * @returns {boolean}
 */
App.Events.canExecute = function(event, eventSlave) {
	return (event instanceof App.Events.BaseEvent) &&		// is an event (and deserialized correctly)
		event.eventPrerequisites().every(p => p()) &&	// passes prerequisites
		event.castActors(eventSlave);				// casts actors successfully
};

/** Qualifies for REFI eventSlave event?
 * @param {App.Entity.SlaveState} slave
 * @returns {boolean}
 */
App.Events.qualifiesForREFIeventSlave = function(slave) {
	return slave.rules.speech !== "restrictive" && isSlaveAvailable(slave) && (slave.fetish === Fetish.NONE || slave.fetishStrength <= 60) && (canSee(slave) || canHear(slave)) && (canTalk(slave) || hasAnyArms(slave));
};

/** Qualifies for REFI subSlave event?
 * @param {App.Entity.SlaveState} slave
 * @param {FC.Fetish} fetish
 * @returns {boolean}
 */
App.Events.qualifiesForREFIsubSlave = function(slave, fetish) {
	return slave.fetishKnown === 1 && slave.fetishStrength > 95 && isSlaveAvailable(slave) && slave.fetish === fetish;
};

/** Auction the artifact from an REFS Artifact event
 * @param {number} basePrice price of artifact
 * @returns {string}
 */
App.Events.auctionREFSArtifact = function(basePrice) {
	const result = jsRandom(0, 100);
	const tradeRatio = 1 + V.PC.skill.trading / 400; // 0.75 at -100 trading skill, 1.0 at 0, 1.25 at +100
	if (result < 25) { // lost a little money
		const loss = Math.trunc(basePrice * 0.1 * (1 / tradeRatio));
		cashX(-loss, "event");
		return `Unfortunately, you have trouble finding an interested buyer, and overall you end up losing ${cashFormatColor(loss, true)} on the deal.`;
	} else if (result < 75) { // small profit
		const profit = Math.trunc(basePrice * 0.1 * tradeRatio);
		cashX(profit, "event");
		return `You quickly find a buyer, and make a modest commission of ${cashFormatColor(profit)}.`;
	} else { // windfall profit
		const windfall = Math.trunc(basePrice * 0.5 * tradeRatio);
		cashX(windfall, "event");
		return `Luckily, you manage to get two potential buyers into a bidding war, and walk off ${cashFormatColor(windfall)} richer.`;
	}
};

/** Queue an event for scheduled execution on a later week. Queued events are executed automatically at the end of Nonrandom Event on the chosen week.
 * @param {number} weeks - the number of weeks to wait before executing the event. 0 means execute this week, 1 execute next week, etc. Note that events generally cannot safely queue other events for the same week; they should always pass 1 or more in this parameter. Other parts of the game (Slave Interact, etc) can safely queue events for this week (i.e. the upcoming End Week cycle) by passing 0.
 * @param {App.Events.BaseEvent} event - the event to execute. note that this event is serialized normally, so changes to the class name or parameter structure will break the event in saved games!
 * @param {object} [params] - any parameters to serialize with the event. when the event executes, these will be accessible in "this.params".
 */
App.Events.queueEvent = function(weeks, event, params = {}) {
	Object.assign(event.params, params);
	if (!V.eventQueue[weeks]) {
		V.eventQueue[weeks] = [];
	}
	V.eventQueue[weeks].push(event);
};

/** Returns whether an event with the given type is already in the queue.
 * Useful if you want to prevent multiple copies of a followup event from being queued.
 * @param {Function} type - the class or constructor of the event to test for (i.e. 'App.Events.PESomeEvent')
 * @returns {boolean}
 */
App.Events.isInQueue = function(type) {
	return V.eventQueue.some(q => q.some(e => (e instanceof type)));
};

/** Safely execute an event to conclude the passage, using a given node.
 * @param {App.Events.BaseEvent} event
 * @param {ParentNode} node
 */
App.Events.runPassageEvent = function(event, node) {
	const eventName = event.eventName;

	// clear event global, if set, when leaving the passage
	if (App.Utils.PassageSwitchHandler.get()) {
		throw new Error(`Passage switch handler already installed trying to run event ${eventName}`);
	}
	App.Utils.PassageSwitchHandler.set(() => { V.event = null; });

	// actually run the event
	try {
		event.execute(node);
	} catch (ex) {
		// add the event name to any exceptions thrown from events, without altering the stack or other error data
		const addEventName = (/** @type {object} */e) => { e.event = eventName; };
		if (ex instanceof Error) {
			addEventName(ex);
			throw ex;
		} else {
			const err = new Error(`Event ${eventName} threw without Error (${String(ex)})`);
			addEventName(err);
			throw err;
		}
	}
};
