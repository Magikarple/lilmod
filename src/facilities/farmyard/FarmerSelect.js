App.Facilities.FarmerSelect = function() {
	const f = document.createDocumentFragment();

	if (S.Farmer) {
		f.append(`Farmer: ${SlaveFullName(S.Farmer)}, tends to your crops and animals. `);
		f.append(App.UI.DOM.link("Remove Farmer", () => {
			removeJob(S.Farmer, Job.FARMER);
		},
		[], "Farmyard"
		));
	} else {
		f.append(`No Farmer assigned, appoint one from your devoted slaves.`);
	}

	f.append(App.UI.SlaveList.facilityManagerSelection(App.Entity.facilities.farmyard, "Farmyard"));
	return f;
};
