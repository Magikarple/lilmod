App.RA.Activation.Editor = (function() {
	/**
	 * Should the advanced mode (tree editor) be used?
	 * @type {boolean}
	 */
	let advanced = false;
	/**
	 * Keep a reference to the outermost node, so we can refresh it when needed.
	 * @type {HTMLDivElement}
	 */
	let outerNode = null;

	/**
	 * @param {FC.RA.RuleConditionEditorArguments} args
	 * @returns {HTMLDivElement}
	 */
	function editor(args) {
		outerNode = document.createElement("div");
		fillOuterNode(args);
		return outerNode;
	}

	/**
	 * @param {FC.RA.RuleConditionEditorArguments} args
	 */
	function fillOuterNode(args) {
		advanced = args.advancedMode;
		let editorNode = document.createElement("div");
		let switchNode = document.createElement("div");
		outerNode.append(switchNode);
		if (advanced) {
			switchNode.append(App.UI.DOM.link("Reset to simple mode", () => {
				if (SugarCube.Dialog.isOpen()) {
					SugarCube.Dialog.close();
				}
				SugarCube.Dialog.setup("Reset RA to simple mode");
				$(SugarCube.Dialog.body()).empty().append(
					"<p>Resetting will delete your current conditions. Do you want to continue?</p>",
					App.UI.DOM.link("Yes, delete conditions.", () => {
						args.advancedMode = false;
						args.activation = App.RA.newRule.conditions().activation;
						SugarCube.Dialog.close();
						$(outerNode).empty();
						fillOuterNode(args);
					}), " ",
					App.UI.DOM.makeElement("p", App.UI.DOM.link("Abort.", () => {
						SugarCube.Dialog.close();
					})));
				SugarCube.Dialog.open();
			}));
			App.RA.Activation.TreeEditor.build(args.activation, editorNode);
		} else {
			switchNode.append(App.UI.DOM.link("Switch to advanced mode", () => {
				args.advancedMode = true;
				$(outerNode).empty();
				fillOuterNode(args);
			}));
			App.RA.Activation.SimpleEditor.build(args.activation, editorNode);
		}
		switchNode.append(" / ", App.Encyclopedia.link("Help", "RA Condition Editor"));
		outerNode.append(editorNode);
	}

	/**
	 * Save the rule, if it is valid.
	 *
	 * @param {FC.RA.RuleConditionEditorArguments} args
	 */
	function saveEditor(args) {
		if (advanced) {
			let rule = App.RA.Activation.TreeEditor.save();
			if (rule == null) {
				return;
			}
			args.advancedMode = advanced;
			args.activation = rule;
		} else {
			let rule = App.RA.Activation.SimpleEditor.save();
			if (rule == null) {
				return;
			}
			args.advancedMode = advanced;
			args.activation = rule;
		}
	}

	function resetEditor() {
		App.RA.Activation.TreeEditor.reset();
		App.RA.Activation.SimpleEditor.reset();
		outerNode = null;
		advanced = false;
	}

	return {
		build: editor,
		save: saveEditor,
		reset: resetEditor,
		// Because of this reference we need to load after conditionEditorTree.js
		validateRule: App.RA.Activation.TreeEditor.validateRule,
	};
})();
