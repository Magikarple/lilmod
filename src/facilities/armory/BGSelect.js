App.Facilities.BGSelect = function() {
	let div = document.createElement("div");
	const f = document.createDocumentFragment();

	App.UI.DOM.appendNewElement("h1", f, "Bodyguard Management");

	if (S.Bodyguard) {
		f.append(`${SlaveFullName(S.Bodyguard)} is working as your Bodyguard, remaining close to you at all times and guards your person. `);
		f.append(App.UI.DOM.link("Remove Bodyguard", () => {
			removeJob(S.Bodyguard, Job.BODYGUARD);
		},
		[], "Main"
		));

		div.append(App.UI.DOM.makeCheckbox("bodyguardTrains"), " Can train potential successors.");
		f.append(div);
	} else {
		f.append(`No Bodyguard assigned, appoint one from your devoted slaves.`);
	}

	f.append(App.UI.SlaveList.facilityManagerSelection(App.Entity.facilities.armory, "BG Select", deadlinessNote));
	return f;

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {HTMLDivElement}
	 */
	function deadlinessNote(slave) {
		const div = document.createElement("div");
		div.append("Deadliness: ", DeadlinessTooltip(slave));
		return div;
	}
};
