App.Facilities.SchoolTeacherSelect = function() {
	const f = document.createDocumentFragment();

	if (S.Schoolteacher) {
		f.append(`${SlaveFullName(S.Schoolteacher)} is working as your Schoolteacher, helping to teach your slaves. `);
		f.append(App.UI.DOM.link("Remove Schoolteacher", () => {
			removeJob(S.Schoolteacher, Job.TEACHER);
		},
		[], "Schoolroom"
		));
	} else {
		f.append(`No Schoolteacher assigned, appoint one from your devoted slaves.`);
	}

	f.append(App.UI.SlaveList.facilityManagerSelection(App.Entity.facilities.schoolroom, "Schoolroom"));
	return f;
};
