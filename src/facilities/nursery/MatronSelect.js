App.Facilities.MatronSelect = function() {
	const f = document.createDocumentFragment();

	if (S.Matron) {
		f.append(`${SlaveFullName(S.Matron)} is working as your Matron, managing the nursery. `);
		f.append(App.UI.DOM.link("Remove Matron", () => {
			removeJob(S.Matron, Job.MATRON);
		},
		[], "Nursery"
		));
	} else {
		f.append(`No Matron assigned, appoint one from your devoted slaves.`);
	}

	f.append(App.UI.SlaveList.facilityManagerSelection(App.Entity.facilities.nursery, "Nursery"));
	return f;
};
