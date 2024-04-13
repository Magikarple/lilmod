App.Encyclopedia.addArticle("RA Condition Editor", function() {
	/**
	 * @param {HTMLElement} container
	 * @param {string} col1
	 * @param {string} col2
	 * @param {string} col3
	 */
	function tableHead(container, col1, col2, col3) {
		App.UI.DOM.appendNewElement("div", container, col1, "head");
		App.UI.DOM.appendNewElement("div", container, col2, "head");
		App.UI.DOM.appendNewElement("div", container, col3, "head");
	}

	/**
	 * @param {ReadonlyMap<string, Getter<*>>} getters
	 */
	function getterTable(getters) {
		const container = document.createElement("p");
		container.classList.add("rule-help-table");

		tableHead(container, "Name", "Description", "Requirements");

		for (const getter of getters.values()) {
			if (getter.visible && !getter.visible()) {
				continue;
			}
			App.UI.DOM.appendNewElement("div", container, getter.name);
			App.UI.DOM.appendNewElement("div", container, getter.description);
			const div = document.createElement("div");
			if (getter.requirements) {
				div.append(getter.requirements);
			}
			container.append(div);
		}

		return container;
	}

	/**
	 * @param {HTMLElement} container
	 * @param {string} name
	 * @param {string} description
	 * @param {string} dataTypes
	 */
	function transformerRow(container, name, description, dataTypes) {
		App.UI.DOM.appendNewElement("div", container, name);
		App.UI.DOM.appendNewElement("div", container, description);
		App.UI.DOM.appendNewElement("div", container, dataTypes);
	}

	function transformerTable() {
		const el = document.createElement("p");
		el.classList.add("rule-help-table");

		tableHead(el, "Name", "Description", "Data types");

		transformerRow(el, "And", "True, if all input values are true.", "Boolean");
		transformerRow(el, "Or", "True, if at least one input value is true.", "Boolean");
		transformerRow(el, "Sum all", "Sums up all input values", "Number");
		transformerRow(el, "Multiply all", "Multiplies all input values", "Number");
		transformerRow(el, "Maximum", "Gives the largest input value", "Number");
		transformerRow(el, "Minimum", "Gives the smallest input value", "Number");
		transformerRow(el, "=, ≠", "Compares the input values based on the comparator in " +
			"the middle. Both sides need to have the same data type.", "Boolean, Number, String");
		transformerRow(el, "<, ⩽, >, ⩾", "Compares the input values based on the comparator in " +
			"the middle. Both sides need to have the same data type.", "Boolean, Number");
		transformerRow(el, "-", "Subtracts the second value from the first value", "Number");
		transformerRow(el, "/", "Divides the second value by the first value", "Number");
		transformerRow(el, "Contains", "True, if the second value is somewhere in the first value",
			"String");
		transformerRow(el, "Matches", "True, if the first value matches the regular expression in the second value",
			"String");
		transformerRow(el, "Not …", "Negates the input value.", "Boolean");
		transformerRow(el, "If … Then … Else …",
			"If the first value is true, returns the second value, otherwise the third value. The second " +
			"and third input value have to be the same data type.", "Boolean / Any");

		return el;
	}

	const acc = new SpacedTextAccumulator();

	acc.push("<span class='bold'>Note:</span> For the simple mode only the section <span class='bold'>Data getters</span> is relevant.");
	acc.toParagraph();

	acc.push("Rule conditions consist of two types of elements, data getters and data transformers. Data getters can " +
		"read out values from various places, which can then be used to base conditions on. Data transformers " +
		"take one or more elements as input and transform the input values into a single new value. Together they " +
		"can create complex conditions for activating rules.");
	acc.toParagraph();

	acc.push("To build a new condition drag the elements you need from the part browser into the main condition " +
		"field next to it.");
	acc.toParagraph();

	App.UI.DOM.appendNewElement("h2", acc.container(), "Finding errors");
	acc.push("It is possible to create element trees which are invalid, for example because the input value of an " +
		"element has the wrong data type. When this is the case there will be an error message above the rule " +
		"editor and the broken elements are marked. As long as there are errors the rule cannot be saved and will " +
		"revert to it's previous state when leaving the RA or editing another rule. In the error message the first " +
		"error corresponds to the innermost broken element. When solving errors it is advised to work from inside to " +
		"outside, as outer errors are often caused by errors further inside.");
	acc.toParagraph();

	App.UI.DOM.appendNewElement("h2", acc.container(), "Data transformers");
	acc.push("Data transformers can handle 3 different data types: Boolean, Number and String. Not all transformers " +
		"accept all data types. Number and Boolean can be used interchangeably, the conversion is as follows: " +
		"Putting a Number into a boolean transformer will interpret 0 as false and all other values as true. " +
		"Putting a Boolean into a number transformer will interpret false as 0 and true as 1.");
	acc.toParagraph();
	acc.container().append(transformerTable());

	App.UI.DOM.appendNewElement("h2", acc.container(), "Data getters");

	acc.push("There are a number of predefined getters which read values either from a slave or from the global " +
		"state. They always have a predefined data type.");
	acc.toParagraph();

	let c = acc.container();
	App.UI.DOM.appendNewElement("h3", c, "Boolean getters");
	c.append(getterTable(App.RA.Activation.getterManager.booleanGetters));
	App.UI.DOM.appendNewElement("h3", c, "Assignment getters");
	acc.push("A special type of boolean getters checking if the slave has the given assignment");
	acc.toParagraph();
	c = acc.container();
	c.append(getterTable(App.RA.Activation.getterManager.assignmentGetters));
	App.UI.DOM.appendNewElement("h3", c, "Number getters");
	c.append(getterTable(App.RA.Activation.getterManager.numberGetters));
	App.UI.DOM.appendNewElement("h3", c, "String getters");
	c.append(getterTable(App.RA.Activation.getterManager.stringGetters));

	App.UI.DOM.appendNewElement("h3", c, "Custom getters");
	acc.push("If greater freedom is required for the conditions needed, a custom data getter can be used.",
		"It operates on a context object with the following properties:",
		"<ul>",
		"<li>slave: The slave currently tested against.</li>",
		"</ul>",
		"It is required to explicitly set the return type. If the set type does not match the actual return type, the condition evaluation will fail!");
	acc.toParagraph();
	acc.push("For example to get the slave name you can use");
	acc.push(App.UI.DOM.makeElement("span", "context => context.slave.slaveName", ["monospace"]));
	acc.push("and set the getter type to string.");
	acc.toParagraph();
	acc.push("Documentation for slave attributes can be found",
		"<a target='_blank' class='link-external' href='https://gitgud.io/pregmodfan/fc-pregmod/-/raw/pregmod-master/devNotes/legacy files/slave%20variables%20documentation.md'>here.</a>",
		"Alternatively you can look up the properties needed in the", "" +
		"<a target='_blank' class='link-external' href='https://gitgud.io/pregmodfan/fc-pregmod/-/blob/pregmod-master/src/js/SlaveState.js'>actual definitions.</a>");
	acc.toParagraph();

	return acc.container();
}, "beingInCharge");
