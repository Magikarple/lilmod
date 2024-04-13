App.Facilities.MadamSelect = function() {
	const f = document.createDocumentFragment();

	if (S.Madam) {
		f.append(`Madam: ${SlaveFullName(S.Madam)}, manages the brothel. `);
		f.append(App.UI.DOM.link("Remove Madam", () => {
			removeJob(S.Madam, Job.MADAM);
		},
		[], "Brothel"
		));
	} else {
		f.append(`No Madam assigned, appoint one from your devoted slaves.`);
	}

	f.append(App.UI.SlaveList.facilityManagerSelection(App.Entity.facilities.brothel, "Brothel"));
	return f;
};
