App.Facilities.MilkmaidSelect = function() {
	const f = document.createDocumentFragment();

	if (S.Milkmaid) {
		f.append(`${SlaveFullName(S.Milkmaid)} is working as your Milkmaid, looking after your livestock, helping them give milk${V.seeDicks > 0 ? ' and semen' : ''}. `);
		f.append(App.UI.DOM.link("Remove Milkmaid", () => {
			removeJob(S.Milkmaid, Job.MILKMAID);
		},
		[], "Dairy"
		));
	} else {
		f.append(`No Milkmaid assigned, appoint one from your devoted slaves.`);
	}

	f.append(App.UI.SlaveList.facilityManagerSelection(App.Entity.facilities.dairy, "Dairy"));
	return f;
};
