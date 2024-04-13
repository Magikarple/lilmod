App.Facilities.AttendantSelect = function() {
	const f = document.createDocumentFragment();

	if (S.Attendant) {
		f.append(`${SlaveFullName(S.Attendant)} is working as your Attendant, pampering and counseling your slaves. `);
		f.append(App.UI.DOM.link("Remove Attendant", () => {
			removeJob(S.Attendant, Job.ATTENDANT);
		},
		[], "Spa"
		));
	} else {
		f.append(`No Attendant assigned, appoint one from your devoted slaves.`);
	}

	f.append(App.UI.SlaveList.facilityManagerSelection(App.Entity.facilities.spa, "Spa"));
	return f;
};
