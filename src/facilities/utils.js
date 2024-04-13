/**
 * Adds a new "Rename Facility" textbox.
 *
 * Allows the use of custom handler functions.
 * @param {App.Entity.Facilities.Facility} facility The entity form of the facility. Typical denoted as `App.Entity.facilities.*`.
 * @param {function():void} [handler] Any custom function to be run upon entering a new name.
 */
App.Facilities.rename = function rename(facility, handler) {
	const renameDiv = App.UI.DOM.makeElement("div", `Rename ${facility.name}: `);
	const renameNote = App.UI.DOM.makeElement("span", ` Use a noun or similar short phrase`, ['note']);

	renameDiv.appendChild(App.UI.DOM.makeTextBox(facility.name, newName => {
		facility.name = newName;

		App.UI.DOM.replace(renameDiv, App.Facilities.rename(facility));

		if (handler) {
			handler();
		}
	}));

	renameDiv.appendChild(renameNote);

	return renameDiv;
};
