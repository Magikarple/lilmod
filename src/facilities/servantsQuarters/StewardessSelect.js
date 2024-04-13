App.Facilities.StewardessSelect = function() {
	const f = document.createDocumentFragment();

	if (S.Stewardess) {
		f.append(`${SlaveFullName(S.Stewardess)} is working as your Stewardess, managing the Servants' Quarters. `);
		f.append(App.UI.DOM.link("Remove Stewardess", () => {
			removeJob(S.Stewardess, Job.STEWARD);
		},
		[], "Servants' Quarters"
		));
	} else {
		f.append(`No Stewardess assigned, appoint one from your devoted slaves.`);
	}

	f.append(App.UI.SlaveList.facilityManagerSelection(App.Entity.facilities.servantsQuarters, "Servants' Quarters"));
	return f;
};
