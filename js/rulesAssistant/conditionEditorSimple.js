/**
 * All functions should only be called from z1-conditionEditorController.js
 */
App.RA.Activation.SimpleEditor = (function() {
	/**
	 * @typedef {object} RuleState
	 * @property {"always"|"never"|"boolean"|"number"|"string"|"custom"} activeRuleType
	 * @property {string} boolGetter
	 * @property {boolean} negateBool
	 * @property {string} stringGetter
	 * @property {string} stringComparator
	 * @property {string} stringValue
	 * @property {string} numberGetter
	 * @property {number} numberUpperValue
	 * @property {"lt"|"lte"|""} numberUpperComparator
	 * @property {number} numberLowerValue
	 * @property {"gt"|"gte"|""} numberLowerComparator
	 * @property {string[]} assignments
	 * @property {"include"|"exclude"|"ignore"} assignmentMode
	 * @property {string} customGetter
	 * @property {"b"|"s"|"n"} customMode
	 */

	/**
	 * @type {HTMLDivElement}
	 */
	let editorNode = null;
	/**
	 * @type {RuleState}
	 */
	let currentRule = null;

	/**
	 * @param {FC.RA.PostFixRule} rule
	 * @param {HTMLDivElement}parent
	 */
	function editor(rule, parent) {
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
		return serializeRule(currentRule);
	}

	function resetEditor() {
		currentRule = null;
		editorNode = null;
	}

	/**
	 * @returns {HTMLElement}
	 */
	function buildEditor() {
		const outerDiv = document.createElement("div");
		// selector
		const selectorDiv = document.createElement("div");
		selectorDiv.classList.add("button-group");
		outerDiv.append(selectorDiv);
		App.UI.DOM.appendNewElement("button", selectorDiv, "Always", currentRule.activeRuleType === "always" ? ["selected", "disabled"] : []).onclick = () => {
			currentRule.activeRuleType = "always";
			refreshEditor();
		};
		App.UI.DOM.appendNewElement("button", selectorDiv, "Never", currentRule.activeRuleType === "never" ? ["selected", "disabled"] : []).onclick = () => {
			currentRule.activeRuleType = "never";
			refreshEditor();
		};
		App.UI.DOM.appendNewElement("button", selectorDiv, "Boolean", currentRule.activeRuleType === "boolean" ? ["selected", "disabled"] : []).onclick = () => {
			currentRule.activeRuleType = "boolean";
			refreshEditor();
		};
		App.UI.DOM.appendNewElement("button", selectorDiv, "Number", currentRule.activeRuleType === "number" ? ["selected", "disabled"] : []).onclick = () => {
			currentRule.activeRuleType = "number";
			refreshEditor();
		};
		App.UI.DOM.appendNewElement("button", selectorDiv, "String", currentRule.activeRuleType === "string" ? ["selected", "disabled"] : []).onclick = () => {
			currentRule.activeRuleType = "string";
			refreshEditor();
		};
		App.UI.DOM.appendNewElement("button", selectorDiv, "Custom", currentRule.activeRuleType === "custom" ? ["selected", "disabled"] : []).onclick = () => {
			currentRule.activeRuleType = "custom";
			refreshEditor();
		};

		// add bool
		if (currentRule.activeRuleType === "boolean") {
			const boolDiv = document.createElement("div");
			boolDiv.classList.add("button-group");
			outerDiv.append(boolDiv);
			/**
			 * @type {selectOption[]}
			 */
			const options = [];
			App.RA.Activation.getterManager.booleanGetters.forEach((getter, key) => {
				if (!getter.visible || getter.visible()) {
					options.push({
						key: key, name: getter.name, enabled: !getter.enabled || getter.enabled()
					});
				}
			});
			boolDiv.append(App.UI.DOM.makeSelect(options, currentRule.boolGetter, key => {
				currentRule.boolGetter = key;
				refreshEditor();
			}));
			boolDiv.append(" should be ");
			App.UI.DOM.appendNewElement("button", boolDiv, "True", currentRule.negateBool ? [] : ["selected", "disabled"]).onclick = () => {
				currentRule.negateBool = false;
				refreshEditor();
			};
			App.UI.DOM.appendNewElement("button", boolDiv, "False", currentRule.negateBool ? ["selected", "disabled"] : []).onclick = () => {
				currentRule.negateBool = true;
				refreshEditor();
			};
		} else if (currentRule.activeRuleType === "number") {
			const numberDiv = document.createElement("div");
			outerDiv.append(numberDiv);
			/**
			 * @type {selectOption[]}
			 */
			const options = [];
			App.RA.Activation.getterManager.numberGetters.forEach((getter, key) => {
				if (!getter.visible || getter.visible()) {
					options.push({
						key: key, name: getter.name, enabled: !getter.enabled || getter.enabled()
					});
				}
			});
			numberDiv.append(App.UI.DOM.makeSelect(options, currentRule.numberGetter, key => {
				currentRule.numberGetter = key;
				refreshEditor();
			}));
			numberDiv.append(" should be ");
			numberDiv.append(App.UI.DOM.makeSelect(
				[{key: "gt", name: "greater than"}, {key: "gte", name: "greater than or equal to"},
					{key: "", name: "ignored"}],
				currentRule.numberLowerComparator, key => {
					currentRule.numberLowerComparator = key;
					refreshEditor();
				}));
			if (currentRule.numberLowerComparator !== "") {
				numberDiv.append(" ", App.UI.DOM.makeTextBox(currentRule.numberLowerValue, val => {
					currentRule.numberLowerValue = val;
				}, true));
			}
			numberDiv.append(" and ");
			numberDiv.append(App.UI.DOM.makeSelect(
				[{key: "lt", name: "less than"}, {key: "lte", name: "less than or equal to"},
					{key: "", name: "ignored"}],
				currentRule.numberUpperComparator, key => {
					currentRule.numberUpperComparator = key;
					refreshEditor();
				}));
			if (currentRule.numberUpperComparator !== "") {
				numberDiv.append(" ", App.UI.DOM.makeTextBox(currentRule.numberUpperValue, val => {
					currentRule.numberUpperValue = val;
				}, true));
			}
		} else if (currentRule.activeRuleType === "string") {
			const stringDiv = document.createElement("div");
			outerDiv.append(stringDiv);
			/**
			 * @type {selectOption[]}
			 */
			const options = [];
			App.RA.Activation.getterManager.stringGetters.forEach((getter, key) => {
				if (!getter.visible || getter.visible()) {
					options.push({
						key: key, name: getter.name, enabled: !getter.enabled || getter.enabled()
					});
				}
			});
			stringDiv.append(App.UI.DOM.makeSelect(options, currentRule.stringGetter, key => {
				currentRule.stringGetter = key;
				refreshEditor();
			}));
			stringDiv.append(" should ");
			stringDiv.append(App.UI.DOM.makeSelect(
				[{key: "eqstr", name: "equal"}, {key: "substr", name: "contain"}, {key: "match", name: "match"}],
				currentRule.stringComparator, key => {
					currentRule.stringComparator = key;
					refreshEditor();
				}));
			stringDiv.append(" ", App.UI.DOM.makeTextBox(currentRule.stringValue, val => {
				currentRule.stringValue = val;
			}));
		} else if (currentRule.activeRuleType === "custom") {
			const options = new App.UI.OptionsGroup();
			options.addOption("Mode", "customMode", currentRule)
				.addValueList([["Boolean", "b"], ["Number", "n"], ["String", "s"]]).addGlobalCallback(refreshEditor);
			outerDiv.append(options.render());
			const textArea = document.createElement("textarea");
			textArea.classList.add("condition-custom");
			textArea.append(currentRule.customGetter);
			textArea.onchange = ev => {
				// @ts-ignore
				currentRule.customGetter = ev.target.value;
				refreshEditor();
			};
			App.UI.DOM.appendNewElement("div", outerDiv, textArea);
		}

		// Assignments
		outerDiv.append("Assignments: ");
		outerDiv.append(App.UI.DOM.makeSelect(
			[{key: "ignore", name: "Ignored"}, {key: "include", name: "Include"}, {key: "exclude", name: "Exclude"}],
			currentRule.assignmentMode, key => {
				currentRule.assignmentMode = key;
				refreshEditor();
			}
		));
		if (currentRule.assignmentMode !== "ignore") {
			for (const [key, getter] of App.RA.Activation.getterManager.assignmentGetters) {
				if (getter.enabled && !getter.enabled()) {
					continue;
				}
				const checkbox = document.createElement("input");
				checkbox.setAttribute("type", "checkbox");
				checkbox.checked = currentRule.assignments.includes(key);
				checkbox.onchange = () => {
					if (!currentRule.assignments.includes(key)) {
						currentRule.assignments.push(key);
					} else {
						const index = currentRule.assignments.indexOf(key);
						currentRule.assignments.splice(index, 1);
					}
				};
				outerDiv.append(` ${getter.name}: `, checkbox);
			}
		}

		return outerDiv;
	}

	/**
	 * @param {FC.RA.PostFixRule} rule
	 * @returns {RuleState}
	 */
	function deserializeRule(rule) {
		// About the TS errors in this function: we can assume a lot about the rule composition because we know it's in
		// the simple format. The rule itself is still a normal FC.RA.PostFixRule which would allow a lot more.
		// Therefore, TS is not happy even though we know everything's fine.
		/**
		 * @type {RuleState}
		 */
		const ruleState = {
			activeRuleType: "always",
			boolGetter: "isfertile",
			negateBool: false,
			stringGetter: "label",
			stringValue: "",
			stringComparator: "eqstr",
			numberGetter: "devotion",
			numberUpperValue: 100,
			numberUpperComparator: "",
			numberLowerValue: -100,
			numberLowerComparator: "",
			assignments: [],
			assignmentMode: "ignore",
			customGetter: "context => false",
			customMode: "b",
		};
		// we know there is only main one rule.
		let i = 0;
		const rulePart = rule[i];
		if (rulePart === true) {
			ruleState.activeRuleType = "always";
		} else if (rulePart === false) {
			ruleState.activeRuleType = "never";
		} else if (App.RA.Activation.getterManager.isBoolean(rulePart)) {
			ruleState.activeRuleType = "boolean";
			ruleState.boolGetter = rulePart;
			if (rule[i + 1] === "not") {
				ruleState.negateBool = true;
				i++;
			}
		} else if (App.RA.Activation.getterManager.isNumber(rulePart)) {
			ruleState.activeRuleType = "number";
			ruleState.numberGetter = rulePart;
			// check if there is a lower rule:
			if (rule[i + 2].startsWith("g")) {
				ruleState.numberLowerValue = rule[i + 1];
				ruleState.numberLowerComparator = rule[i + 2];
				// check if there is also an upper value:
				if (rule[i + 3] === ruleState.numberGetter) {
					ruleState.numberUpperValue = rule[i + 4];
					ruleState.numberUpperComparator = rule[i + 5];
					i += 3;
				}
			} else {
				ruleState.numberUpperValue = rule[i + 1];
				ruleState.numberUpperComparator = rule[i + 2];
			}
			i += 2;
		} else if (App.RA.Activation.getterManager.isString(rulePart)) {
			ruleState.activeRuleType = "string";
			ruleState.stringGetter = rulePart;
			ruleState.stringValue = rule[i + 1].slice(1);
			ruleState.stringComparator = rule[i + 2];
			i += 2;
		} else if (typeof rulePart === "string" && rulePart.startsWith("?")) {
			ruleState.activeRuleType = "custom";
			ruleState.customMode = rulePart.charAt(1);
			ruleState.customGetter = rulePart.slice(2);
		} else {
			throw new Error("Rule is not in simple mode format!");
		}
		i++;

		// check for assignment rules
		let any = false;
		while (App.RA.Activation.getterManager.isAssignment(rule[i])) {
			any = true;
			ruleState.assignments.push(rule[i]);
			i++;
		}
		if (any) {
			i += 2;
			if (rule[i] === "not") {
				ruleState.assignmentMode = "exclude";
				i++;
			} else {
				ruleState.assignmentMode = "include";
			}
		}

		return ruleState;
	}

	/**
	 * Expects a valid RulePart structure
	 *
	 * @param {RuleState} ruleState
	 * @returns {FC.RA.PostFixRule}
	 */
	function serializeRule(ruleState) {
		/**
		 * @type {FC.RA.PostFixRule}
		 */
		const rule = [];
		let counter = 0;

		switch (ruleState.activeRuleType) {
			case "always":
				rule.push(true);
				counter++;
				break;
			case "never":
				rule.push(false);
				counter++;
				break;
			case "boolean":
				rule.push(ruleState.boolGetter);
				if (ruleState.negateBool) {
					rule.push("not");
				}
				counter++;
				break;
			case "number": {
				let any = false;
				if (ruleState.numberLowerComparator !== "") {
					any = true;
					rule.push(ruleState.numberGetter);
					rule.push(ruleState.numberLowerValue);
					rule.push(ruleState.numberLowerComparator);
					counter++;
				}
				if (ruleState.numberUpperComparator !== "") {
					any = true;
					rule.push(ruleState.numberGetter);
					rule.push(ruleState.numberUpperValue);
					rule.push(ruleState.numberUpperComparator);
					counter++;
				}
				if (!any) {
					rule.push(true);
					counter++;
				}
			}
				break;
			case "string":
				rule.push(ruleState.stringGetter);
				rule.push("!" + ruleState.stringValue);
				rule.push(ruleState.stringComparator);
				counter++;
				break;
			case "custom":
				rule.push("?" + ruleState.customMode + ruleState.customGetter);
				counter++;
		}

		if (ruleState.assignmentMode !== "ignore" && ruleState.assignments.length > 0) {
			rule.push(...ruleState.assignments);
			rule.push(ruleState.assignments.length, "or");
			if (ruleState.assignmentMode === "exclude") {
				rule.push("not");
			}
			counter++;
		}

		rule.push(counter, "and");
		return rule;
	}

	return {
		build: editor,
		save: saveEditor,
		reset: resetEditor,
	};
})();
