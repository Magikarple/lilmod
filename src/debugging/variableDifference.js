/**
 * This widget will find which properties were changed in a specific passage (State.bottom.title to be precise), and display their original values and current values.
 * It's somewhat awkward if a stored variable changes types to/from an object or array.
 * The included "Go Back" link is intended to replace the usual NextButton.
 * @returns {DocumentFragment}
 */
App.UI.variableDifference = function() {
	const node = new DocumentFragment();
	const T = State.temporary;
	T.oldVariables = clone(State.bottom.variables);
	T.newVariables = clone(State.variables);
	T.newDiff = diffFlatten(difference(T.oldVariables, T.newVariables)); // Returns a flattened object containing the names of the changed variables, and the new values of those variables.
	T.oldDiff = diffFlatten(difference(T.newVariables, T.oldVariables)); // Returns a flattened object containing the names of the changed variables, and the old values of those variables.
	T.diffArrayFromNew = generateDiffArray(T.newDiff); // This function requires the existence of the specific variables T.newDiff AND T.oldDiff to work.
	T.diffArrayFromOld = generateDiffArray(T.oldDiff);
	App.UI.DOM.appendNewElement("div", node, App.UI.DOM.link(
		"Go Back",
		() => {
			Engine.backward(); // Moves the save state one state backwards.
			State.history.splice(-1, 1); // Removes the latest save state. Necessary to allow the option of displaying the changed variables again immediately without screwing everything up.
			Config.history.maxStates = 1; // Reset the max number of states so as not to explode save file sizes.
		}
	));

	const testSet = new Set(["nextButton", "nextLink", "args"]);

	App.UI.DOM.appendNewElement("div", node, `Differences:`);
	if (T.diffArrayFromNew.length > 0) {
		for (const dif of T.diffArrayFromNew) { // Print variable names, and changed values. Will output the new values correctly, may not output old values correctly
			if (!testSet.has(dif.variable)) {
				App.UI.DOM.appendNewElement("div", node, `Variable: ${dif.variable}, Original Value: ${dif.oldVal}, New Value: ${dif.newVal}`, "indent");
			}
		}

		App.Events.addResponses(node, [
			new App.Events.Result(`Show more`, showMore, `This should only be necessary if a variable changes type to/from an object or array. In that case this will display the correct original value, but incorrect current value.`)
		]);
	} else {
		App.UI.DOM.appendNewElement("div", node, `Nothing changed!`, "indent");
	}
	return node;

	function showMore() {
		const frag = new DocumentFragment();
		App.UI.DOM.appendNewElement("div", frag, `Alternate display:`);
		for (const dif of T.diffArrayFromOld) { // Print variable names, and changed values. Will output the old values correctly, may not output new values correctly
			if (!testSet.has(dif.variable)) {
				App.UI.DOM.appendNewElement("div", frag, `Variable: ${dif.variable}, Original Value: ${dif.oldVal}, New Value: ${dif.newVal}`, "indent");
			}
		}
		return frag;
	}
};
