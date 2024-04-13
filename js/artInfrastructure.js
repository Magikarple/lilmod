// cSpell:ignore URLID

/**
 * @type {string}
 - Status codes map
 - 0: Success
 - 1: Failed to start WebGL engine.
 - 2: Could not find art assets.
 - 3: Version mismatch. Update the assets using the link in Game Options.
 */
App.Art.webglErrorMessage = "";

App.Art.cacheArtData = function() {
	/**
	 * @param {NodeListOf<Element>} imagePassages
	 * @returns {Map<string, Element>}
	 */
	function makeCache(imagePassages) {
		const dict = new Map();

		for (const ip of imagePassages) {
			const name = ip.attributes.getNamedItem("name").value;
			let div = document.createElement("div");
			const svgData = atob(ip.innerHTML.replace(/data:image\/svg\+xml;base64,/, ''));
			div.innerHTML = svgData.trim();
			dict.set(name, div.children.item(0));
		}

		return dict;
	}

	App.Data.Art.Vector = makeCache(document.querySelectorAll('[tags="Twine.image"][name^="Art_Vector"]:not([name^="Art_Vector_Revamp"])'));
	App.Data.Art.VectorRevamp = makeCache(document.querySelectorAll('[tags="Twine.image"][name^="Art_Vector_Revamp"]'));
};

App.Art.URLIDMatcher = /url\(#(.*)\)/g;
App.Art.SvgQueue = class {
	/**
	 * @param {{trigger:string, action:string, value:string}[]} transformRules - when a 'data-transform' attribute with value "trigger" is seen on an element, perform 'action' with 'value'
	 * @param {Map<string, Element>} cache
	 * @param {string} displayClass
	 */
	constructor(transformRules, cache, displayClass) {
		this._transformRules = transformRules;
		/** @type {{attrs: NamedNodeMap, nodes: Element[]}[]} */
		this._container = [];
		this._cache = cache;
		this._displayClass = displayClass;
		this._rndID = Math.floor(Math.random() * 9007199254740991);
	}

	/** transform a node via the transform rules
	 * @param {Element} node
	 */
	_transform(node) {
		const trigger = node.getAttribute("data-transform");
		if (trigger) {
			const rule = this._transformRules.find((r) => r.trigger === trigger);
			if (rule && rule.value) {
				if (rule.action === "text-content") {
					node.textContent = rule.value;
				} else {
					// by default, set attribute (usually 'transform')
					node.setAttribute(rule.action, rule.value);
				}
			}
		}
	}

	/** select clip-path via the transform rules
	 * @param {Element} node
	 */
	_setclip(node) {
		const trigger = node.getAttribute("select_clip");
		if (trigger) {
			const rule = this._transformRules.find((r) => r.trigger === trigger);
			if (rule && rule.value) {
				// by default, set attribute (usually 'clip-path')
				node.setAttribute(rule.action, this._replaceURLRefs(rule.value));
			}
		}
	}

	/** Turn a single fixed ID into a unique one
	 * @param {string} id
	 */
	_makeUniqueID(id) {
		return `${id}_rndID_${this._rndID}`;
	}

	/** Turn any ID URL references in the target attribute string into unique ones
	 * @param {string} attr
	 * @returns {string}
	 */
	_replaceURLRefs(attr) {
		return attr.replace(App.Art.URLIDMatcher, (a, b) => `url(#${this._makeUniqueID(b)})`);
	}

	/** Append unique IDs to clip-path and filter references
	 * @param {Element} node
	 */
	_replaceIDs(node) {
		const cp = node.getAttribute('clip-path');
		if (cp) {
			node.setAttribute('clip-path', this._replaceURLRefs(cp));
		}
		const style = node.getAttribute('style');
		if (style && style.search("filter") > -1) {
			node.setAttribute('style', this._replaceURLRefs(style));
		}
		for (const nodeChild of node.children) {
			this._replaceIDs(nodeChild);
		}
	}

	/** add an SVG from the cache to the render queue
	 * @param {string} id
	 */
	add(id) {
		const res = this._cache.get(id);
		let clones = [];
		if (!res) {
			console.error(`Missing art resource: ${id}`);
			return;
		}
		for (const srcNode of res.children) {
			const node = /** @type {Element} */ (srcNode.cloneNode(true));
			if (node.nodeName === "defs") {
				for (const defNode of node.children) {
					defNode.setAttribute("id", this._makeUniqueID(defNode.id));
				}
			} else {
				this._replaceIDs(node);
			}
			this._transform(node);
			this._setclip(node);
			let transformNodes = node.querySelectorAll('g[data-transform]');
			for (const child of transformNodes) {
				this._transform(child);
			}
			let clipNodes = node.querySelectorAll('g[select_clip]');
			for (const child of clipNodes) {
				this._setclip(child);
			}
			clones.push(node);
		}
		this._container.push({attrs: res.attributes, nodes: clones});
	}

	/** concatenate the contents of a second queue into this one.
	 * displayClass must match. cache and transformFunc may differ (they are used only by add).
	 * @param {App.Art.SvgQueue} queue
	 */
	concat(queue) {
		if (this._displayClass !== queue._displayClass) {
			throw Error("Incompatible SVG queues. displayClass must match.");
		}
		this._container.push(...queue._container);
	}

	/** merge consecutive svg child nodes in the queue with the same svg attributes into bigger svg nodes, and write them out
	 * this prevents re-evaluating viewboxes and classes unnecessarily and improves layout performance with lots of art
	 * @returns {DocumentFragment}
	 */
	output() {
		/** evaluate whether an attribute list is equivalent or not
		 * @param {NamedNodeMap} left
		 * @param {NamedNodeMap} right
		 */
		function equalAttributes(left, right) {
			/** get all the attribute names from an attribute list
			 * @param {NamedNodeMap} attrs
			 * @returns {string[]}
			 */
			function attrNames(attrs) {
				let names = [];
				for (let index = 0; index < attrs.length; ++index) {
					names.push(attrs[index].nodeName);
				}
				return names;
			}

			if (!left && !right) {
				return true; // both are nullish, treat as equal
			} else if (!left || !right) {
				return false; // only one is nullish, not equal
			}

			const leftNames = attrNames(left);
			const rightNames = attrNames(right);
			const intersectionLength = _.intersection(leftNames, rightNames).length;
			if (leftNames.length !== intersectionLength || rightNames.length !== intersectionLength) {
				return false; // contain different attributes, not equal
			}
			// are all values equal?
			return leftNames.every((attr) => left.getNamedItem(attr).nodeValue === right.getNamedItem(attr).nodeValue);
		}

		let frag = document.createDocumentFragment();
		let currentAttributes;
		let outSvg;
		for (const svg of this._container) {
			if (!equalAttributes(currentAttributes, svg.attrs)) {
				outSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				outSvg.setAttribute("class", this._displayClass);
				frag.appendChild(outSvg);
				for (let index = 0; index < svg.attrs.length; ++index) {
					outSvg.setAttribute(svg.attrs[index].nodeName, svg.attrs[index].nodeValue);
				}
				currentAttributes = svg.attrs;
			}
			outSvg.append(...svg.nodes);
		}
		return frag;
	}
};
