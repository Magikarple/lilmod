App.Facilities.WardenessSelect = function() {
	const f = document.createDocumentFragment();

	if (S.Wardeness) {
		f.append(`Wardeness: ${SlaveFullName(S.Wardeness)}, helps breaking your prisoners. `);
		f.append(App.UI.DOM.link("Remove Wardeness", () => {
			removeJob(S.Wardeness, Job.WARDEN);
		},
		[], "Cellblock"
		));
	} else {
		f.append(`No Wardeness assigned, appoint one from your devoted slaves.`);
	}

	f.append(App.UI.SlaveList.facilityManagerSelection(App.Entity.facilities.cellblock, "Cellblock"));
	return f;
};
