App.Facilities.ConcubineSelect = function() {
	const f = document.createDocumentFragment();

	if (S.Concubine) {
		f.append(`${SlaveFullName(S.Concubine)} is your Concubine, taking the lead in seeing to your pleasure. `);
		f.append(App.UI.DOM.link("Remove Concubine", () => {
			removeJob(S.Concubine, Job.CONCUBINE);
		},
		[], "Master Suite"
		));
	} else {
		f.append(`No Concubine assigned, appoint one from your devoted slaves.`);
	}

	f.append(App.UI.SlaveList.facilityManagerSelection(App.Entity.facilities.masterSuite, "Master Suite"));
	return f;
};
