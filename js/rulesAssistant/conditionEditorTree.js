// cSpell:ignore bcontext

/**
 * All functions should only be called from z1-conditionEditorController.js
 */
App.RA.Activation.TreeEditor = (function() {
	/**
	 * @type {HTMLDivElement}
	 */
	let editorNode = null;
	/**
	 * @type {Map<string, RulePart>}
	 */
	let rulePartMap = null;
	/**
	 * @type {RuleGroup}
	 */
	let currentRule = null;

	/**
	 * @param {FC.RA.PostFixRule} rule
	 * @param {HTMLDivElement}parent
	 */
	function editor(rule, parent) {
		rulePartMap = new Map();
		currentRule = deserializeRule(rule);
		editorNode = parent;
		editorNode.append(buildEditor());
	}

	function refreshEditor() {
		if (editorNode !== null) {
			$(editorNode).empty().append(buildEditor());
		}
	}

	/**
	 * If the rule is valid, returns the serialized rule, otherwise null.
	 *
	 * @returns {FC.RA.PostFixRule}
	 */
	function saveEditor() {
		if (currentRule == null) {
			return null;
		}
		const error = currentRule.validate([]) === "error";
		if (!error) {
			return serializeRule(currentRule);
		}
		return null;
	}

	function resetEditor() {
		rulePartMap = null;
		currentRule = null;
		editorNode = null;
	}

	/**
	 * @returns {HTMLElement}
	 */
	function buildEditor() {
		const outerDiv = document.createElement("div");
		outerDiv.classList.add("rule-builder");

		const ruleDiv = document.createElement("div");
		ruleDiv.classList.add("condition-viewer");
		const errors = [];
		if (currentRule.validate(errors) === "error") {
			ruleDiv.append("Condition has errors:");
			for (const error of errors) {
				ruleDiv.append(" ", error);
			}
			ruleDiv.append(" Changes have NOT been saved!");
		} else {
			ruleDiv.append("Condition saved.");
		}
		ruleDiv.append(currentRule.render());
		outerDiv.append(ruleDiv);

		outerDiv.append(buildPartBrowser());

		return outerDiv;
	}

	/**
	 * @returns {HTMLDivElement}
	 */
	function buildPartBrowser() {
		const container = document.createElement("div");
		App.UI.DOM.appendNewElement("h3", container, "Part Browser");
		const div = document.createElement("div");
		div.classList.add("rule-part-browser");
		div.append(new RulePartTrash().render());
		div.append(new RulePartProvider(() => new RuleGroup("and")).render());
		div.append(new RulePartProvider(() => new RuleGroup("add")).render());
		div.append(new RulePartProvider(() => new RuleNegate()).render());
		div.append(new RulePartProvider(() => new RulePair("eq")).render());
		div.append(new RulePartProvider(() => new RuleTernary()).render());
		div.append(new RulePartProvider(() => new RuleMapCheck(App.RA.Activation.getterManager.booleanDefault)).render());
		div.append(new RulePartProvider(() => new RuleMapCheck(App.RA.Activation.getterManager.numberDefault)).render());
		div.append(new RulePartProvider(() => new RuleMapCheck(App.RA.Activation.getterManager.stringDefault)).render());
		div.append(new RulePartProvider(() => new RuleMapCheck(App.RA.Activation.getterManager.assignmentDefault)).render());
		div.append(new RulePartProvider(() => new RuleConstant(0)).render());
		div.append(new RulePartProvider(() => new RuleBooleanConstant(true)).render());
		div.append(new RulePartProvider(() => new RuleConstant("some text")).render());
		div.append(new RulePartProvider(() => new RuleCustomCheck("bcontext => false")).render());
		div.append(new RulePartTrash().render());
		container.append(div);
		return container;
	}

	/**
	 * @abstract
	 */
	class RulePart {
		constructor() {
			this.id = generateNewID();
			rulePartMap.set(this.id, this);

			/**
			 * @type {?RuleContainer}
			 */
			this.parent = null;

			/**
			 * @type {HTMLElement}
			 * @protected
			 */
			this._dragElement = null;

			/**
			 * @type {boolean}
			 * @private
			 */
			this._showValidationError = true;
		}

		/**
		 * @abstract
		 * @returns {HTMLElement}
		 */
		render() {
			throw new Error("Method 'render()' must be implemented.");
		}

		/**
		 * Validate the rule, gives the expected return type or "error".
		 * @abstract
		 * @param {Array<string>} errorList
		 * @returns {"number"|"string"|"error"}
		 */
		validate(errorList) {
			throw new Error("Method 'validate()' must be implemented.");
		}

		/**
		 * Makes the element not draggable
		 */
		disableDragging() {
			if (this._dragElement != null) {
				this._dragElement.draggable = false;
			}
			if (this.parent != null) {
				this.parent.disableDragging();
			}
		}

		/**
		 * Makes the element draggable again.
		 */
		enableDragging() {
			if (this.parent != null) {
				if (this._dragElement != null) {
					this._dragElement.draggable = true;
				}
				this.parent.enableDragging();
			}
		}

		/**
		 * @protected
		 * @param {HTMLElement} element
		 */
		_markValidationError(element) {
			if (this._showValidationError && this.validate([]) === "error") {
				element.classList.add("validation-error");
			}
		}

		/**
		 * @param {boolean} value
		 */
		set showValidationError(value) {
			this._showValidationError = value;
		}
	}

	/**
	 * @abstract
	 */
	class RuleContainer extends RulePart {
		/**
		 * @abstract
		 * @param {RulePart} rulePart
		 */
		removeChild(rulePart) {
			throw new Error("Method 'removeChild()' must be implemented.");
		}

		/**
		 * @abstract
		 * @param {RuleContainer} maybeChild
		 * @returns {boolean}
		 */
		isParent(maybeChild) {
			throw new Error("Method 'isParent()' must be implemented.");
		}

		/**
		 * @param {HTMLElement} element
		 * @param {(child:RulePart)=>void} setChild
		 * @protected
		 */
		_allowDroppingOn(element, setChild) {
			element.ondragover = ev => {
				if (canDrop(ev, this)) {
					// show that it can be dropped
					ev.preventDefault();
				}
				// stop containers further out from capturing the event.
				ev.stopPropagation();
			};
			element.ondrop = ev => {
				ev.preventDefault();
				// stop groups further out from capturing the event.
				ev.stopPropagation();
				const rulePart = rulePartMap.get(ev.dataTransfer.getData("text/plain"));
				setChild(rulePart);
				refreshEditor();
			};
		}

		/**
		 * @param {HTMLElement} container
		 * @param {?RulePart} child
		 * @param {(child:RulePart)=>void} setChild
		 * @protected
		 */
		_conditionalDropLocation(container, child, setChild) {
			if (child == null) {
				const span = document.createElement("span");
				span.classList.add("rule-drop-location");
				this._allowDroppingOn(span, setChild);
				container.append(span);
			} else {
				container.append(child.render());
			}
		}
	}

	class RulePartProvider extends RuleContainer {
		/**
		 * @param {()=>RulePart} partFactory
		 */
		constructor(partFactory) {
			super();
			this._partFactory = partFactory;
		}

		render() {
			const part = this._partFactory();
			part.parent = this;
			part.showValidationError = false;
			const element = part.render();
			part.showValidationError = true;
			return element;
		}

		/**
		 * @returns {"error"}
		 */
		validate(errorList) {
			return "error";
		}

		removeChild(rulePart) {
		}

		isParent(maybeChild) {
			return false;
		}
	}

	class RulePartTrash extends RuleContainer {
		render() {
			const div = document.createElement("div");
			div.classList.add("rule-trash");
			div.ondragover = ev => {
				// show that it can be dropped
				ev.preventDefault();
				// stop groups further out from capturing the event.
				ev.stopPropagation();
			};
			div.ondrop = ev => {
				ev.preventDefault();
				// stop groups further out from capturing the event.
				ev.stopPropagation();
				const rulePartID = ev.dataTransfer.getData("text/plain");
				const rulePart = rulePartMap.get(rulePartID);
				rulePart.parent.removeChild(rulePart);
				refreshEditor();
			};
			return div;
		}

		/**
		 * @returns {"error"}
		 */
		validate(errorList) {
			return "error";
		}

		removeChild(rulePart) {
		}

		isParent(maybeChild) {
			return false;
		}
	}

	/**
	 * @typedef {"and"|"or"|"add"|"mul"|"max"|"min"} RuleGroupAggregators
	 * @type {Map<RuleGroupAggregators, string>}
	 */
	const ruleGroupAggregators = new Map([
		["and", "And"],
		["or", "Or"],
		["add", "Sum all"],
		["mul", "Multiply all"],
		["max", "Maximum"],
		["min", "Minimum"],
	]);

	class RuleGroup extends RuleContainer {
		/**
		 * @param {RuleGroupAggregators} mode
		 */
		constructor(mode) {
			super();
			this.mode = mode;
			/**
			 * @type {RulePart[]}
			 * @private
			 */
			this._children = [];
		}

		render() {
			const div = document.createElement("div");
			div.classList.add("rule-part");
			div.append(ruleGroupAggregators.get(this.mode));
			const button = App.UI.DOM.appendNewElement("button", div, "<->");
			button.onclick = () => {
				if (this.mode === "and") {
					this.mode = "or";
				} else if (this.mode === "or") {
					this.mode = "and";
				} else if (this.mode === "add") {
					this.mode = "mul";
				} else if (this.mode === "mul") {
					this.mode = "max";
				} else if (this.mode === "max") {
					this.mode = "min";
				} else {
					this.mode = "add";
				}
				refreshEditor();
			};
			for (const rulePart of this._children) {
				div.append(rulePart.render());
			}
			let span = document.createElement("span");
			span.classList.add("rule-drop-location");
			div.append(span);
			// interactions
			this._allowDroppingOn(div, (child => this.addChild(child)));
			if (this.parent !== null) {
				// if null, it's the outermost and that can't be draggable
				makeDraggable(div, this);
				this._dragElement = div;
			}
			this._markValidationError(div);
			return div;
		}

		validate(errorList) {
			if (this._children.length === 0) {
				errorList.push("Condition group needs at least 1 condition.");
				return "error";
			}
			const expectedType = "number";
			for (const rulePart of this.children) {
				if (rulePart.validate(errorList) !== expectedType) {
					errorList.push("Condition group only accepts boolean and number conditions.");
					return "error";
				}
			}
			return expectedType;
		}

		/**
		 * @param {RulePart} rulePart
		 */
		addChild(rulePart) {
			if (rulePart.parent != null) {
				rulePart.parent.removeChild(rulePart);
			}
			this._children.push(rulePart);
			rulePart.parent = this;
		}

		/**
		 * @override
		 * @param {RulePart} rulePart
		 */
		removeChild(rulePart) {
			this._children.delete(rulePart);
			rulePart.parent = null;
		}

		/**
		 * @override
		 * @param {RuleContainer} maybeChild
		 */
		isParent(maybeChild) {
			for (const child of this._children) {
				if (isSameOrParent(child, maybeChild)) {
					return true;
				}
			}
			return false;
		}

		/**
		 * @returns {ReadonlyArray<RulePart>}
		 */
		get children() {
			return this._children;
		}
	}

	class RuleNegate extends RuleContainer {
		constructor() {
			super();
			/**
			 * @type {?RulePart}
			 * @private
			 */
			this._child = null;
		}

		render() {
			const div = document.createElement("div");
			div.classList.add("rule-part");
			div.append("Not");

			if (this.child == null) {
				let span = document.createElement("span");
				span.classList.add("rule-drop-location");
				div.append(span);
				this._allowDroppingOn(div, child => this.child = child);
			} else {
				div.append(this.child.render());
				div.ondragover = ev => {
					// stop groups further out from capturing the event.
					ev.stopPropagation();
				};
			}

			makeDraggable(div, this);
			this._dragElement = div;
			this._markValidationError(div);

			return div;
		}

		validate(errorList) {
			if (this._child == null) {
				errorList.push("Negation needs a condition to negate.");
				return "error";
			}
			if (this._child.validate(errorList) === "number") {
				return "number";
			} else {
				errorList.push("Negation accepts only boolean and number conditions.");
				return "error";
			}
		}

		/**
		 * @param {RulePart} rulePart
		 */
		set child(rulePart) {
			if (rulePart.parent != null) {
				rulePart.parent.removeChild(rulePart);
			}
			this._child = rulePart;
			rulePart.parent = this;
		}

		/**
		 * @returns {RulePart}
		 */
		get child() {
			return this._child;
		}

		/**
		 * @override
		 * @param {RulePart} rulePart
		 */
		removeChild(rulePart) {
			this._child = null;
			rulePart.parent = null;
		}

		/**
		 * @override
		 * @param {RuleContainer} maybeChild
		 */
		isParent(maybeChild) {
			if (this._child == null) {
				return false;
			}
			return (isSameOrParent(this._child, maybeChild));
		}
	}

	/**
	 * @typedef {"sub" | "div" | "eq" | "neq" | "gt" | "gte" | "lt" | "lte"| "substr" | "match"} RulePairComparators
	 * @typedef {object} RulePairComparatorDisplay
	 * @property {RulePairComparators} key
	 * @property {string} name
	 * @type {RulePairComparatorDisplay[]}
	 */
	const rulePairComparators = [
		{key: "eq", name: "="},
		{key: "neq", name: "≠"},
		{key: "lt", name: "<"},
		{key: "gt", name: ">"},
		{key: "lte", name: "⩽"},
		{key: "gte", name: "⩾"},
		{key: "sub", name: "-"},
		{key: "div", name: "/"},
		{key: "substr", name: "Contains"},
		{key: "match", name: "Matches"},
	];

	class RulePair extends RuleContainer {
		/**
		 * @param {RulePairComparators} mode
		 */
		constructor(mode) {
			super();
			this.mode = mode;
			/**
			 * @type {RulePart}
			 */
			this._child1 = null;
			/**
			 * @type {RulePart}
			 */
			this._child2 = null;
		}

		render() {
			const div = document.createElement("div");
			div.classList.add("rule-part");
			// drag element
			makeNotDraggable(div);
			div.append(createDragElement(this));
			// element 1
			this._conditionalDropLocation(div, this._child1, child => this.child1 = child);

			// operator
			div.append(App.UI.DOM.makeSelect(rulePairComparators, this.mode, mode => {
				// @ts-ignore
				this.mode = mode;
				refreshEditor();
			}));

			// element 2
			this._conditionalDropLocation(div, this._child2, child => this.child2 = child);

			this._markValidationError(div);
			return div;
		}

		validate(errorList) {
			if (this._child1 == null || this._child2 == null) {
				errorList.push("Comparator conditions need a condition on both sides.");
				return "error";
			}
			if (this.mode === "eq" || this.mode === "neq") {
				const expectedType = this._child1.validate(errorList);
				if (expectedType === this._child2.validate(errorList)) {
					return "number";
				} else {
					errorList.push("Both sides need to return the same type.");
					return "error";
				}
			} else if (this.mode === "substr" || this.mode === "match") {
				if (this._child1.validate(errorList) === "string" && this._child2.validate(errorList) === "string") {
					return "number";
				} else {
					errorList.push("Both sides need to return string.");
					return "error";
				}
			} else {
				if (this._child1.validate(errorList) === "number" && this._child2.validate(errorList) === "number") {
					return "number";
				} else {
					errorList.push("Both sides need to return number.");
					return "error";
				}
			}
		}

		/**
		 * @param {RulePart} child
		 */
		set child1(child) {
			if (child.parent != null) {
				child.parent.removeChild(child);
			}
			child.parent = this;
			this._child1 = child;
		}

		/**
		 * @returns {RulePart}
		 */
		get child1() {
			return this._child1;
		}

		/**
		 * @param {RulePart} child
		 */
		set child2(child) {
			if (child.parent != null) {
				child.parent.removeChild(child);
			}
			child.parent = this;
			this._child2 = child;
		}

		/**
		 * @returns {RulePart}
		 */
		get child2() {
			return this._child2;
		}

		/**
		 * @override
		 * @param {RulePart} rulePart
		 */
		removeChild(rulePart) {
			if (this._child1 === rulePart) {
				this._child1 = null;
			} else if (this._child2 === rulePart) {
				this._child2 = null;
			}
			rulePart.parent = null;
		}

		/**
		 * @override
		 * @param {RuleContainer} maybeChild
		 */
		isParent(maybeChild) {
			return isSameOrParent(this._child1, maybeChild) || isSameOrParent(this._child2, maybeChild);
		}
	}

	class RuleTernary extends RuleContainer {
		constructor() {
			super();
			/**
			 * @type {RulePart}
			 */
			this._condition = null;
			/**
			 * @type {RulePart}
			 */
			this._ifTrue = null;
			/**
			 * @type {RulePart}
			 */
			this._ifFalse = null;
		}

		render() {
			const div = document.createElement("div");
			div.classList.add("rule-part");
			// drag element
			makeDraggable(div, this);
			div.append(createDragElement(this));

			// condition
			App.UI.DOM.appendNewElement("span", div, "If", ["rule-left-margin"]);
			this._conditionalDropLocation(div, this.condition, child => this.condition = child);
			// ifTrue
			div.append("Then");
			this._conditionalDropLocation(div, this.ifTrue, child => this.ifTrue = child);
			// ifFalse
			div.append("Else");
			this._conditionalDropLocation(div, this.ifFalse, child => this.ifFalse = child);

			this._markValidationError(div);
			return div;
		}

		validate(errorList) {
			if (this._condition === null) {
				errorList.push("Ternaries need a condition.");
				return "error";
			}
			if (this._condition.validate(errorList) !== "number") {
				errorList.push("Ternaries conditions accepts only booleans or numbers.");
				return "error";
			}
			if (this._ifTrue == null || this._ifFalse == null) {
				errorList.push("Ternaries need values on both sides.");
				return "error";
			}
			const expectedType = this._ifTrue.validate(errorList);
			if (expectedType === this._ifFalse.validate(errorList)) {
				return "number";
			} else {
				errorList.push("Both sides need to return the same type.");
				return "error";
			}
		}

		/**
		 * @param {RulePart} child
		 */
		set condition(child) {
			if (child.parent != null) {
				child.parent.removeChild(child);
			}
			child.parent = this;
			this._condition = child;
		}

		/**
		 * @returns {RulePart}
		 */
		get condition() {
			return this._condition;
		}

		/**
		 * @param {RulePart} child
		 */
		set ifTrue(child) {
			if (child.parent != null) {
				child.parent.removeChild(child);
			}
			child.parent = this;
			this._ifTrue = child;
		}

		/**
		 * @returns {RulePart}
		 */
		get ifTrue() {
			return this._ifTrue;
		}

		/**
		 * @param {RulePart} child
		 */
		set ifFalse(child) {
			if (child.parent != null) {
				child.parent.removeChild(child);
			}
			child.parent = this;
			this._ifFalse = child;
		}

		/**
		 * @returns {RulePart}
		 */
		get ifFalse() {
			return this._ifFalse;
		}

		/**
		 * @override
		 * @param {RulePart} rulePart
		 */
		removeChild(rulePart) {
			if (this._condition === rulePart) {
				this._condition = null;
			} else if (this._ifTrue === rulePart) {
				this._ifTrue = null;
			} else if (this._ifFalse === rulePart) {
				this._ifFalse = null;
			}
			rulePart.parent = null;
		}

		/**
		 * @override
		 * @param {RuleContainer} maybeChild
		 */
		isParent(maybeChild) {
			return isSameOrParent(this._condition, maybeChild) ||
				isSameOrParent(this._ifTrue, maybeChild) ||
				isSameOrParent(this._ifFalse, maybeChild);
		}
	}

	class RuleBooleanConstant extends RulePart {
		/**
		 * @param {boolean} mode
		 */
		constructor(mode) {
			super();
			this.mode = mode;
		}

		render() {
			const b = App.UI.DOM.makeElement("button", this.mode ? "Always" : "Never", ["rule-part"]);
			b.onclick = () => {
				this.mode = !this.mode;
				refreshEditor();
			};
			makeDraggable(b, this);
			return b;
		}

		/**
		 * @returns {"number"}
		 */
		validate() {
			return "number";
		}
	}

	class RuleConstant extends RulePart {
		/**
		 * @param {number|string} value
		 */
		constructor(value) {
			super();
			this.value = value;
			this._stringMode = typeof value === "string";
		}

		render() {
			const div = App.UI.DOM.makeElement("div", createDragElement(this), ["rule-part"]);
			div.append(this._stringMode ? " String" : " Number");
			div.append(makeTextBoxDragSafe(App.UI.DOM.makeTextBox(this.value, (v) => {
				this.value = v;
				refreshEditor();
			}, !this._stringMode), this));
			return div;
		}

		/**
		 * @returns {"number"|"string"}
		 */
		validate() {
			return this._stringMode ? "string" : "number";
		}
	}

	class RuleMapCheck extends RulePart {
		/**
		 * @param {string} key
		 */
		constructor(key) {
			super();
			/**
			 * @type {"boolean"|"assignment"|"number"|"string"}
			 */
			this.mode = App.RA.Activation.getterManager.isBoolean(key) ? "boolean"
				: App.RA.Activation.getterManager.isAssignment(key) ? "assignment"
					: App.RA.Activation.getterManager.isNumber(key) ? "number"
						: "string";
			this.key = key;
		}

		render() {
			// make container
			const span = document.createElement("span");
			span.classList.add("rule-part");
			makeDraggable(span, this);

			// fill container
			// name
			App.UI.DOM.appendNewElement("span", span, this.mode === "assignment" ? "Assignment" : "Slave", ["rule-right-margin"]);

			// values
			/**
			 * @type {selectOption[]}
			 */
			const options = [];
			this._getterMap.forEach((getter, key) => {
				if (!getter.visible || getter.visible()) {
					options.push({
						key: key, name: getter.name, enabled: !getter.enabled || getter.enabled()
					});
				}
			});
			span.append(App.UI.DOM.makeSelect(options, this.key, key => {
				this.key = key;
				refreshEditor();
			}));
			return span;
		}

		validate() {
			if (this.mode === "boolean" || this.mode === "assignment") {
				return "number";
			}
			return this.mode;
		}

		/**
		 * @returns {ReadonlyMap<string, Getter<*>>}
		 * @private
		 */
		get _getterMap() {
			return this.mode === "boolean" ? App.RA.Activation.getterManager.booleanGetters
				: this.mode === "assignment" ? App.RA.Activation.getterManager.assignmentGetters
					: this.mode === "number" ? App.RA.Activation.getterManager.numberGetters
						: App.RA.Activation.getterManager.stringGetters;
		}
	}

	class RuleCustomCheck extends RulePart {
		/**
		 * @param {string} check
		 */
		constructor(check) {
			super();
			this.check = check;
			/**
			 * @type {"boolean"|"number"|"string"}
			 * @private
			 */
			this._expectedType = check.first() === "b" ? "boolean"
				: check.first() === "n" ? "number"
					: "string";
		}

		render() {
			const outerDiv = App.UI.DOM.makeElement("div", null, ["rule-part"]);
			const leftDiv = document.createElement("div");
			leftDiv.classList.add("rule-custom-controls");

			const upperDiv = document.createElement("div");
			upperDiv.append(createDragElement(this), " Custom Getter");
			leftDiv.append(upperDiv);

			const lowerDiv = document.createElement("div");
			lowerDiv.classList.add("rule-custom-mode");
			lowerDiv.append("Mode:", this._makeToggleButton());
			leftDiv.append(lowerDiv);

			outerDiv.append(leftDiv);

			const textArea = document.createElement("textarea");
			textArea.append(this.check.slice(1));
			textArea.onchange = ev => {
				// @ts-ignore
				this.check = this._expectedType.first() + ev.target.value;
				refreshEditor();
			};
			outerDiv.append(makeTextBoxDragSafe(textArea, this));
			this._markValidationError(outerDiv);
			return outerDiv;
		}

		_makeToggleButton() {
			const button = document.createElement("button");
			button.append(capFirstChar(this._expectedType));
			button.onclick = () => {
				if (this._expectedType === "boolean") {
					this._expectedType = "number";
				} else if (this._expectedType === "number") {
					this._expectedType = "string";
				} else {
					this._expectedType = "boolean";
				}
				this.check = this._expectedType.first() + this.check.slice(1);
				refreshEditor();
			};
			return button;
		}

		validate(errorList) {
			try {
				runWithReadonlyProxy(() => this._validateRule(this.check.slice(1)));
			} catch (e) {
				errorList.push(e.message + ".");
				return "error";
			}
			return this._expectedType === "boolean" ? "number" : this._expectedType;
		}

		_validateRule(check) {
			const slave = createReadonlyProxy(V.slaves[0]);
			const context = new App.RA.Activation.Context(slave);
			(new Function("c", `return (${check})(c)`))(context);
			return true;
		}
	}

	/**
	 * @param {HTMLInputElement|HTMLTextAreaElement} textBox
	 * @param {RulePart} rulePart
	 * @returns {HTMLSpanElement}
	 */
	function makeTextBoxDragSafe(textBox, rulePart) {
		textBox.onfocus = () => rulePart.disableDragging();
		textBox.onmouseover = () => rulePart.disableDragging();
		textBox.onblur = () => rulePart.enableDragging();
		textBox.onmouseout = () => rulePart.enableDragging();
		return textBox;
	}

	/**
	 * @param {RulePart} rulePart
	 */
	function createDragElement(rulePart) {
		const element = document.createElement("div");
		element.classList.add("rule-drag-element");
		makeDraggable(element, rulePart);
		return element;
	}

	/**
	 * @param {HTMLElement} node
	 * @param {RulePart} rulePart
	 */
	function makeDraggable(node, rulePart) {
		node.draggable = true;
		node.classList.add("rule-draggable");
		node.ondragstart = ev => {
			ev.stopPropagation();
			editorNode.classList.add("part-dragging");
			ev.dataTransfer.setData("text/plain", rulePart.id);
		};
		node.ondragend = _ => {
			editorNode.classList.remove("part-dragging");
		};
	}

	/**
	 * @param {HTMLElement} node
	 */
	function makeNotDraggable(node) {
		node.ondragstart = ev => {
			ev.stopPropagation();
		};
	}

	/**
	 * @param {DragEvent} event
	 * @param {RuleContainer} targetPart
	 * @returns {boolean}
	 * @private
	 */
	function canDrop(event, targetPart) {
		const movedPartID = event.dataTransfer.getData("text/plain");
		const movedPart = rulePartMap.get(movedPartID);
		// if it can't have children, any place is valid
		if (!(movedPart instanceof RuleContainer)) {
			return true;
		}
		// don't allow dragging onto itself
		if (movedPart === targetPart) {
			return false;
		}
		// don't allow dragging onto children
		return !movedPart.isParent(targetPart);
	}

	/**
	 * @param {RulePart} parent
	 * @param {RuleContainer} maybeChild
	 * @returns {boolean}
	 */
	function isSameOrParent(parent, maybeChild) {
		if (parent === maybeChild) {
			return true;
		}
		return (parent instanceof RuleContainer) && parent.isParent(maybeChild);
	}

	/**
	 * @param {FC.RA.PostFixRule} rule
	 * @returns {RuleGroup}
	 */
	function deserializeRule(rule) {
		let stack = new RuleFactoryStack();

		/**
		 * @param {"and"|"or"|"add"|"mul"|"max"|"min"} mode
		 */
		function makeGroup(mode) {
			const length = stack.popNumber();
			const group = new RuleGroup(mode);
			const children = [];
			for (let i = 0; i < length; i++) {
				children.unshift(stack.popRulePart());
			}
			for (const child of children) {
				group.addChild(child);
			}
			stack.pushRulePart(group);
		}

		/**
		 * @param {"sub" | "div" | "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "substr" | "match"} mode
		 */
		function makePair(mode) {
			const pair = new RulePair(mode);
			pair.child2 = stack.popRulePart();
			pair.child1 = stack.popRulePart();
			stack.pushRulePart(pair);
		}

		function makeTernary() {
			const ternary = new RuleTernary();
			ternary.ifFalse = stack.popRulePart();
			ternary.ifTrue = stack.popRulePart();
			ternary.condition = stack.popRulePart();
			stack.pushRulePart(ternary);
		}

		/**
		 * @type {Map<string, function(): void>}
		 */
		const operators = new Map([
			// and, or, +, * can take arbitrarily many arguments, so the first one describes the argument count
			["and", () => makeGroup("and")],
			["or", () => makeGroup("or")],
			["add", () => makeGroup("add")],
			["mul", () => makeGroup("mul")],
			["max", () => makeGroup("max")],
			["min", () => makeGroup("min")],
			["sub", () => makePair("sub")],
			["div", () => makePair("div")],
			["eqstr", () => makePair("eq")],
			["neqstr", () => makePair("neq")],
			["eqnum", () => makePair("eq")],
			["neqnum", () => makePair("neq")],
			["gt", () => makePair("gt")],
			["gte", () => makePair("gte")],
			["lt", () => makePair("lt")],
			["lte", () => makePair("lte")],
			["substr", () => makePair("substr")],
			["match", () => makePair("match")],
			["not", () => {
				const negate = new RuleNegate();
				negate.child = stack.popRulePart();
				stack.pushRulePart(negate);
			}],
			["ternarystr", makeTernary],
			["ternarynum", makeTernary],
		]);

		for (let i = 0; i < rule.length; i++) {
			const rulePart = rule[i];
			if (typeof rulePart === "string") {
				const operation = operators.get(rulePart);
				if (operation !== undefined) {
					operation();
				} else if (App.RA.Activation.getterManager.has(rulePart)) {
					stack.pushRulePart(new RuleMapCheck(rulePart));
				} else if (rulePart.startsWith("?")) {
					stack.pushRulePart(new RuleCustomCheck(rulePart.slice(1)));
				} else {
					stack.pushRulePart(new RuleConstant(rulePart.slice(1)));
				}
			} else if (typeof rulePart === "number") {
				// check if this is a length counter
				const next = rule[i + 1];
				if (["and", "or", "add", "mul"].includes(next)) {
					stack.pushNumber(rulePart);
				} else {
					stack.pushRulePart(new RuleConstant(rulePart));
				}
			} else {
				stack.pushRulePart(new RuleBooleanConstant(rulePart));
			}
		}

		// @ts-ignore
		return stack.popRulePart();
	}

	/**
	 * Expects a valid RulePart structure
	 *
	 * @param {RuleGroup} rulePart
	 * @returns {FC.RA.PostFixRule}
	 */
	function serializeRule(rulePart) {
		/**
		 * @type {FC.RA.PostFixRule}
		 */
		const rule = [];
		_serializeRulePart(rulePart);
		return rule;

		/**
		 * @param {RulePart} rulePart
		 */
		function _serializeRulePart(rulePart) {
			if (rulePart instanceof RuleGroup) {
				for (const ruleChild of rulePart.children) {
					_serializeRulePart(ruleChild);
				}
				rule.push(rulePart.children.length, rulePart.mode);
			} else if (rulePart instanceof RulePair) {
				_serializeRulePart(rulePart.child1);
				_serializeRulePart(rulePart.child2);
				let mode = rulePart.mode;
				if (rulePart.mode === "eq" || rulePart.mode === "neq") {
					if (rulePart.child1.validate([]) === "string") {
						mode += "str";
					} else {
						mode += "num";
					}
				}
				rule.push(mode);
			} else if (rulePart instanceof RuleBooleanConstant) {
				rule.push(rulePart.mode);
			} else if (rulePart instanceof RuleMapCheck) {
				rule.push(rulePart.key);
			} else if (rulePart instanceof RuleConstant) {
				rule.push(typeof rulePart.value === "string" ? "!" + rulePart.value : rulePart.value);
			} else if (rulePart instanceof RuleNegate) {
				_serializeRulePart(rulePart.child);
				rule.push("not");
			} else if (rulePart instanceof RuleTernary) {
				_serializeRulePart(rulePart.condition);
				_serializeRulePart(rulePart.ifTrue);
				_serializeRulePart(rulePart.ifFalse);
				let mode = "ternary";
				if (rulePart.ifTrue.validate([]) === "string") {
					mode += "str";
				} else {
					mode += "num";
				}
				rule.push(mode);
			} else if (rulePart instanceof RuleCustomCheck) {
				rule.push("?" + rulePart.check);
			}
		}
	}

	class RuleFactoryStack extends App.RA.Activation.Stack {
		constructor() {
			super();
			/**
			 * @private
			 * @type {RulePart[]}
			 */
			this._ruleParts = [];
		}

		/**
		 * @param {RulePart} v
		 */
		pushRulePart(v) {
			this._ruleParts.push(v);
		}

		/**
		 * @returns {RulePart}
		 */
		popRulePart() {
			return this._ruleParts.pop();
		}
	}

	/**
	 * @param {FC.RA.PostFixRule} rule
	 */
	function validate(rule) {
		let mapExists = rulePartMap !== null;
		if (!mapExists) {
			rulePartMap = new Map();
		}
		const rulePart = deserializeRule(rule);
		if (!(rulePart instanceof RuleGroup)) {
			console.log("validation error", rule, rulePart, "Outermost is not RuleGroup!");
		}
		if (rulePart.mode !== "and" && rulePart.mode !== "or") {
			console.log("validation error", rule, rulePart, "Outermost has to be \"and\" or \"or\" mode RuleGroup!");
		}
		const errors = [];
		const result = rulePart.validate(errors);
		if (result === "error") {
			console.log("validation error", rule, rulePart, errors);
		}
		if (!mapExists) {
			rulePartMap = null;
		}
		return result !== "error";
	}

	return {
		build: editor,
		save: saveEditor,
		reset: resetEditor,
		validateRule: validate,
	};
})();
