App.UI.SlaveInteract.importSlave = function() {
	const el = new DocumentFragment();
	App.UI.DOM.appendNewElement("span", el, `Paste the code into the text box and press enter: `);
	el.append(
		App.UI.DOM.makeTextBox(
			"",
			v => {
				if (v) {
					const slave = JSON.parse(`{${v}}`);
					slave.ID = generateSlaveID();
					App.Update.Slave(slave);
					App.Entity.Utils.SlaveDataSchemeCleanup(slave);
					newSlave(slave);
					SlaveDatatypeCleanup(slave);
					removeJob(slave, slave.assignment);
					V.AS = slave.ID;
					Engine.play("Slave Interact");
				}
			}
		)
	);
	return el;
};

/** @param {App.Entity.SlaveState} slave */
App.UI.SlaveInteract.exportSlave = function(slave) {
	const el = new DocumentFragment();
	App.UI.DOM.appendNewElement("p", el, `Copy the following block of code for importing: `, "note");
	App.UI.DOM.appendNewElement("textarea", el, toJson(slave), ["export-field"]);
	return el;
};
