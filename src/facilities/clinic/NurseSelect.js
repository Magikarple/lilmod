App.Facilities.NurseSelect = function() {
	const f = document.createDocumentFragment();

	if (S.Nurse) {
		f.append(`${SlaveFullName(S.Nurse)} is working as your Nurse, helping to heal your slaves. `);
		f.append(App.UI.DOM.link("Remove Nurse", () => {
			removeJob(S.Nurse, Job.NURSE);
		},
		[], "Clinic"
		));
	} else {
		f.append(`No Nurse assigned, appoint one from your devoted slaves.`);
	}

	f.append(App.UI.SlaveList.facilityManagerSelection(App.Entity.facilities.clinic, "Clinic"));
	return f;
};
